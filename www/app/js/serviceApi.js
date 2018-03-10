(function () {
    'use strict';
    angular.module('app.services',['app.config','app.config-env'])
        .factory('rssUtil', ['$state', rssUtil])
        .factory('rssApi', ['$http', '$q', '$state', 'DSCacheFactory', 'rssUtil', 'settingsApi', 'debugApi','CONFIG_ENV' ,getRss])
        .factory('newsApi', ['settingsApi','DSCacheFactory', newsApi])
        .factory('stockApi', ['$http', '$q', 'DSCacheFactory', 'CONFIG_ENV','debugApi', stockApi])
        .factory('settingsApi', ['DSCacheFactory', '$translate','CONFIG_SETTINGS', 'amMoment','$state', settingsApi])
        .factory('debugApi', ['DSCacheFactory', '$q', '$http', 'rssUtil', 'CONFIG_ENV', '$state', 'settingsApi', debugApi])
        .factory('xitiApi', ['DSCacheFactory', '$http', 'CONFIG_ENV', 'settingsApi','$filter', xitiApi])
        .factory('securityIndicatorApi',['$http', '$q', '$state', 'DSCacheFactory', 'rssUtil','settingsApi','debugApi','CONFIG_ENV',securityIndicatorApi])
        .factory('storeDeviceTokenForPushNotificationApi',['$http', '$q', '$state', 'settingsApi',storeDeviceTokenForPushNotificationApi])
        .factory('securityIndicatorUtil',['securityIndicatorApi',securityIndicatorUtil]);


        
        function storeDeviceTokenForPushNotificationApi($http, $q, $state, settingsApi)
        {

            function addDeviceToken(url)
            {

                
                var promise;

                promise =
                    $http({
                        method: 'get',
                        url: url,
                         timeout: 5000
                    }).success(function (data) {
                        console.log("added device token -- " + url);
                        // convert rss to json format and filter unnecessary values
                        
                       

                    })
                    .error(function (data) {
                        console.log("Error adding device token " + url );

                    });
                    
                    return (promise);
            }

            return {
                addDeviceToken:addDeviceToken,
            };

        }

        function securityIndicatorUtil(securityIndicatorApi)
        {
            
            function getDateDiffrence(currdate)
            {
                var dt = currdate.split("/").join("-")
                var date_passed = new Date( dt.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") )
               
                
                
                var date_now = new Date();
                var timeDiff = Math.abs(date_passed.getTime() - date_now.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
              
                return diffDays
            }
                
            function checkCacheForSecurityIndicator()
            {
                var previousUpdateTime = new Date(securityIndicatorApi.getlastUpdateTimeForSecurityIndicator());
                var date_now = new Date();
                var toRefresh = false;
                
                var timeDiff = Math.abs(previousUpdateTime.getTime() - date_now.getTime());
                var diff_min =   Math.ceil(timeDiff / (1000 * 60));
             
                if(diff_min >= 3)
                {
                    toRefresh = true;
                } 
                
                return toRefresh;
            }

            function checkCacheValidForEmagURL()
            {
                var previousUpdateTime = new Date(securityIndicatorApi.getlastUpdateTimeForEmagURL());
                var date_now = new Date();
                var clearEmagURL = false;
                
                var timeDiff = Math.abs(previousUpdateTime.getTime() - date_now.getTime());
                var diff_hour =   Math.ceil(timeDiff / (1000 * 60*60));
             
                if(diff_min > 12)
                {
                    clearEmagURL = true;
                } 
                
                return clearEmagURL;
            }

          function getDateString (date, format) 
          {

             
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            getPaddedComp = function(comp) {
                return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
            },
            formatTimeAt12 = function(hour)
            {
                if(hour == 0)
                {
                    return 12;
                }
                else
                {
                   return hour
                }
            },
            formattedDate = format, 
            o = {
                "y+": date.getFullYear(), // year
                "M+": months[date.getMonth()], //month
                "d+": getPaddedComp(date.getDate()), //day
                "h+": getPaddedComp((date.getHours() > 12) ? date.getHours() % 12 : formatTimeAt12(date.getHours())), //hour
                "H+": getPaddedComp(date.getHours()), //hour
                "m+": getPaddedComp(date.getMinutes()), //minute
                "s+": getPaddedComp(date.getSeconds()), //second
                "S+": getPaddedComp(date.getMilliseconds()), //millisecond,
                "b+": (date.getHours() >= 12) ? 'PM' : 'AM'
            };

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    formattedDate = formattedDate.replace(RegExp.$1, o[k]);
                }
            }
            return formattedDate;
        };


        function formatTiemStamp(ts)
        {
            var dateString = new Date(ts).toLocaleDateString();
            
            var timeString = new Date(ts).toLocaleTimeString();
            
            var obj = new Object();
            obj.datestr = dateString;
            obj.timestr = tConvert(ts);
            
            return obj; 

        }

        function tConvert (timeValue) 
        {   
            var datetime  = "";
            var dt = new Date(timeValue);
            return getDateString(dt,"hh:m b");
            
        }

        return {
                tconvert:tConvert,
                formatTiemStamp:formatTiemStamp,
                checkCacheForSecurityIndicator:checkCacheForSecurityIndicator,
                getDateDiffrence:getDateDiffrence,
                checkCacheValidForEmagURL:checkCacheValidForEmagURL

            };
        }
        
        function securityIndicatorApi($http, $q, $state, DSCacheFactory, rssUtil,settingsApi,debugApi,CONFIG_ENV)
        {
            var securityIndicatorDataCache = DSCacheFactory.get("WatNews-secutiryIndicatorData");

            function getCachedSecurityItem(url) 
            {
                var secKey = url;
                 
                return securityIndicatorDataCache.get(secKey);
            }

            function getEmagURLFromCache(key)
            {
                return securityIndicatorDataCache.get(key);
            }

            function clearEmagURLFromCache()
            {
                var emagItemURL = "secItemURL";
                var emagURLTimeStamp = "secItemURLTimeStamp";

                securityIndicatorDataCache.put(emagItemURL, null);
                
                securityIndicatorDataCache.put(emagURLTimeStamp,null);
            }

            function getlastUpdateTimeForSecurityIndicator()
            {
                var secIncidentTS = "IncidentTimeStamp";
               
                return securityIndicatorDataCache.get(secIncidentTS);
            }

            function getlastUpdateTimeForEmagURL()
            {
                var emagURLTimeStamp = "secItemURLTimeStamp";
               
                return securityIndicatorDataCache.get(emagURLTimeStamp);
            }

            function isConnectedtoVPN(url)
            {
              var promise;
              var isConnected = true;
                promise =
                    $http({
                        method: 'get',
                        url: url,
                         timeout: 5000 
                    }).success(function (data) {
                        console.log("connected to VPN " + url);
                        // convert rss to json format and filter unnecessary values
                        
                        isConnected = true;

                    })
                    .error(function (data) {
                        console.log("Error connecting to VPN" + url );
                         isConnected = false;
                    });

                    return promise;
                  
            }
            function checkDataForSecurityIndicator(url)
            {
                var secItemkey = "safetyindicator";
                var secIncidentTimeStamp = "IncidentTimeStamp";
                var promise;

                promise =
                    $http({
                        method: 'get',
                        url: url,
                         timeout: 5000
                    }).success(function (data) {
                        console.log("received SecurityIndicator  data from " + url);
                        // convert rss to json format and filter unnecessary values
                        
                        var secItem = rssUtil.getSecurityIndicatorData(data);
                      
                        if(secItem != null && secItem != undefined && secItem != "")
                        {
                            securityIndicatorDataCache.put(secItemkey, secItem);
                            var dt = new Date();
                            var utcDate = dt;
                            securityIndicatorDataCache.put(secIncidentTimeStamp,utcDate);
                        }

                    })
                    .error(function (data) {
                        console.log("Error receiving SecurityIndicator data from " + url + " using cache");

                    });
                    
                    return (promise);
            }

             function checkCacheValidForEmagURL()
            {
                var previousUpdateTime = new Date(getlastUpdateTimeForEmagURL());
                var date_now = new Date();
                var clearEmagURL = false;
                
                var timeDiff = Math.abs(previousUpdateTime.getTime() - date_now.getTime());
                var diff_hour =   Math.ceil(timeDiff / (1000 * 60*60));
               
                if(diff_hour > 12)
                {
                    clearEmagURL = true;
                } 
                
                return clearEmagURL;
            }

            function getURLPerLanguage()
            {
                var newsFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
                var baseURL = CONFIG_ENV.URL.feedUrl;
                
                var finalUrl= baseURL+newsFeedUrl+"SafetyIndicator=true&GrpLanguage="+settingsApi.getUserLCID();
                return finalUrl;
            }

            function fetchEmagURLFromFeed()
            {
                var emagRRLPromise;
                var feedUrl = getURLPerLanguage();
                var emagItemURL = "secItemURL";
                var emagURLTimeStamp = "secItemURLTimeStamp";
                
                var isEmagURLValid = checkCacheValidForEmagURL();

                if(isEmagURLValid)
                {
                    clearEmagURLFromCache();

                }
                emagRRLPromise =
                        $http({
                            method: 'get',
                            url: feedUrl,
                            headers: { "content-type":"application/json" },
                            timeout: 5000
                        }).success(function (data) {
                            console.log("received emag url from " + feedUrl);
                            // convert rss to json format and filter unnecessary values
                            
                            var emagItem = rssUtil.getEmagItemData(data);
                        
                            if(emagItem != null && emagItem != undefined && emagItem != "")
                            {
                                securityIndicatorDataCache.put(emagItemURL, emagItem);
                                var dt = new Date();
                                var utcDate = dt;
                                securityIndicatorDataCache.put(emagURLTimeStamp,utcDate);
                            }

                        })
                        .error(function (data) {
                            console.log("Error receiving emag url data from " + feedUrl + " using cache");

                        });

                        return (emagRRLPromise);
            }

            function getUrlForSafetyIndicator(safetyIndicatorUrl,safetyindicatorValue)
            {
                var promise = checkDataForSecurityIndicator(safetyIndicatorUrl);
                return promise
            }

             return {
                 getCachedSecurityItem:getCachedSecurityItem,
                 getUrlForSafetyIndicator:getUrlForSafetyIndicator,
                 getlastUpdateTimeForSecurityIndicator:getlastUpdateTimeForSecurityIndicator,
                 isConnectedtoVPN:isConnectedtoVPN,
                 fetchEmagURLFromFeed:fetchEmagURLFromFeed,
                 getEmagURLFromCache:getEmagURLFromCache,
                 getlastUpdateTimeForEmagURL:getlastUpdateTimeForEmagURL,
                 clearEmagURLFromCache:clearEmagURLFromCache
          
        };

        }

    function rssUtil($state) {
        var x2js = new X2JS();

        function getSecurityIndicatorData(data)
        {
          var secItemObj = new Object();
            var securityIndicatorItem = xml_str2json(data);
         
            if(!securityIndicatorItem) return null;
            if(!securityIndicatorItem.rss) return null;
            if (!securityIndicatorItem.rss.channel) return null;
            if (!securityIndicatorItem.rss.channel.item) return "";

              (securityIndicatorItem.rss.channel.item) // convert object to array if single value
                .map(function (item,index) { 
                    if(index==2)
                    {
                        secItemObj["incident_title"] = item.title;
                        secItemObj["incident_description"] = item.description.__cdata;
                    }
                    else
                    {
                     secItemObj[item.title] = item.description.__cdata;
                    }
                });
            
            return secItemObj;
        }

        function getEmagItemData(data)
        {
            var emagItem = xml_str2json(data);
            
            return emagItem.rss.channel.safetyindicator.EmagUrl;
        }
        function getJsonNews(rssFeed) {
            var jsonNews = xml_str2json(rssFeed);

            if (!jsonNews.rss.channel) return null;
            if (!jsonNews.rss.channel.item) return "";

            return _.chain([].concat(jsonNews.rss.channel.item)) // convert object to array if single value
                .map(function (item) {
                    var nominationData = null;
                    var publicationDate = item.pubDate.substring(0, item.pubDate.length - 7);
                    // check if state correspond to nomination in order to add nomination data
                    if ($state.current.name.indexOf('app.nominations') == 0) {
                        var nominationUser = xml_str2json(item.userprop.__text) || ''; // handle null value
                        var nominationImageUrl = (item.publishingrollupimage.__text!='#')?item.publishingrollupimage.__text:
                            ((nominationUser!= "")?nominationUser.User.ImageUrl:"");
                        // use default local image
                        if (nominationImageUrl == "" || nominationImageUrl.indexOf('nomination-big') > -1 ||
                            nominationImageUrl.indexOf('nomination-group') > -1 || nominationImageUrl.indexOf('nomination-note-big') > -1 ) {
                            switch (item.nomination.__text) {
                                case "2 - Nomination":
                                    nominationImageUrl = "app/img/NOMINATION-BIG.PNG"
                                    break;
                                case "3 - Note organisation":
                                    nominationImageUrl = "app/img/nomination-note-big.png";
                                    break;
                                case "4 - Nomination groupee":
                                    nominationImageUrl = "app/img/nomination-group-big.png";
                                    break;
                                default:
                                    nominationImageUrl = "app/img/nomination-note-big.png";
                            }
                        }

                        nominationData = {
                            'type': item.nomination.__text,
                            'date': item.nominationdate.__text,
                            'user': nominationUser.User,
                            'image' : nominationImageUrl
                        }
                    }
                    return {
                        image: item.publishingrollupimage.__text,
                        title: item.title,
                        subtitle: item.subtitle.__text,
                        description: item.description,
                        content: item.publishingpagecontent.__cdata,
                        link: item.link,
                        publicationDate: publicationDate,
                        theme: item.theme.__text,
                        keywords: item.keywords.__text,
                        newspaperlink: item.originalnewspaperlink.__text,
                        entity: item.entity.__text,
                        nominationData: nominationData
                    };
                })
                .value();
        }

        function xml2json(args) {
            return angular.bind(x2js, x2js.xml2json, args)();
        }
        function xml_str2json(args) {
            return angular.bind(x2js, x2js.xml_str2json, args)();
        }
        function json2xml_str(args) {
            return angular.bind(x2js, x2js.json2xml_str, args)();
        }

        return {
            getJsonNews: getJsonNews,
            getSecurityIndicatorData:getSecurityIndicatorData,
            getEmagItemData:getEmagItemData,
            xml2json: xml2json,
            xml_str2json: xml_str2json,
            json2xml_str: json2xml_str
        }
    }


    function getRss($http, $q, $state, DSCacheFactory, rssUtil, settingsApi, debugApi,CONFIG_ENV) {
        var rssDataCache = DSCacheFactory.get("WatNews-rssData");

        rssDataCache.setOptions({
            onExpire: function (key, value) {
                var finalURL = "";
               

                var newsFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
                if(debugApi.getDebugPreferences().debugMode.checked)
                {
                    finalURL = debugApi.getDebugPreferences().liveRootUrl;
                }
                else
                {
                    finalURL = rssApi.getNewsUrl(CONFIG_ENV.URL.feedUrl+newsFeedUrl);
                }

                var url = getNewsUrl(finalURL)
                getNews(url).
                    then(function () {
                        console.log("News was refreshed after cache expiration");

                    }, function () { // offline mode
                        console.log("Error getting news Data. Extend cache duration", new Date());
                        rssDataCache.put(key, value);
                    });
            }
        })

        var newsKey = "news";

        function getAllSiteItemFromThematicId()
        {

            var thematicId =  settingsApi.getGroupThematicID();
            var baseURL = CONFIG_ENV.URL.feedUrl;
            var newsFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
            var siteUrl = baseURL+newsFeedUrl+"thematicId=" + thematicId + "&GrpLanguage=" + settingsApi.getUserLCID() +"&PrefLanguage="+ settingsApi.getUserPrefLanguageLCID()+"&days="+settingsApi.getUserPreferences().depth;

            var promise;
             promise =
                $http({
                    method: 'get',
                    url: siteUrl
                }).success(function (data) {
                    console.log("received all sites data from " + siteUrl);
                    // convert rss to json format and filter unnecessary values
                   
                })
                .error(function (data) {
                    console.log("Error receiving received all sites data from " + siteUrl );
                });

                return promise;
        }

        function getNewsUrl(baseUrl) {

            var queryParameters = {};

            // to get Universe: group = 2, branch = 1
            if ($state.current.name.indexOf("-branch") != -1) {
                // if Branch = Holding, select Group universe for News
                queryParameters.universe = (settingsApi.getSelectedBranch()=="HLD" &&
                $state.current.name.indexOf("news") != -1 ) ? 2:1;
            }
            else if ($state.current.name.indexOf("-group") != -1) queryParameters.universe = 2;
            else if ($state.current.name.indexOf("professionalfield") != -1) queryParameters.universe = -1;
            else if ($state.current.name.indexOf("humanresources") != -1) queryParameters.universe = -2;
            else if ($state.current.name.indexOf("geographicalsite") != -1) queryParameters.universe = -3;
            else if ($state.current.name.indexOf("entity") != -1) queryParameters.universe = -4;
            else queryParameters.universe = 0;

            // get Content Type: News = 1, Carousel = 2, Panorama = 3,
            //                   Press release = 4, Nominations = 5, Wat's new = 6
            if ($state.current.name.indexOf(".news-") != -1) queryParameters.content = 1;
            if ($state.current.name.indexOf("carousel") != -1 || $state.current.name.indexOf("watsup") != -1
                || ( ($state.current.name.indexOf("news-branch")!= -1) &&  settingsApi.getSelectedBranch()=="HLD"))
                queryParameters.content = 2;
            else if ($state.current.name.indexOf("panorama") != -1) queryParameters.content = 3;
            else if ($state.current.name.indexOf("release") != -1) queryParameters.content = 4;
            else if ($state.current.name.indexOf("nominations") != -1) queryParameters.content = 5;
            else if ($state.current.name.indexOf("watsnew") != -1) queryParameters.content = 6;

            var thematicId = settingsApi.getThematicId(queryParameters.universe);

            queryParameters.url = "Content=" + queryParameters.content +
                ((queryParameters.universe > 0 )? ("&Universe=" + queryParameters.universe) : "") +
                "&thematicId=" + thematicId + "&GrpLanguage=" + settingsApi.getUserLCID() +"&PrefLanguage="+ settingsApi.getUserPrefLanguageLCID();
            if (debugApi.getDebugPreferences().liveData.checked) {
                // if panorama, restrict to 2 days
                queryParameters.url = queryParameters.url +
                "&days="+ ((queryParameters.content == 3)? 2 : settingsApi.getUserPreferences().depth);
            }
           
            return baseUrl + queryParameters.url;
        }

        function getUrlCarouselNews(baseUrl, position) {

            var queryParameters = {};

            queryParameters.content = 1; // News

            switch (position) {
                /*case 0: // Wat's up (group)
                    queryParameters.universe = 2;
                    break;*/
                case 0: // Branch
                    queryParameters.universe = 1;
                    break;
                case 1: // Professional Field
                    queryParameters.universe = -1;
                    break;
                case 2: // geographical site
                    queryParameters.universe = -3;
                    break;
                case 3: // human resources
                    queryParameters.universe = -2;
                    break;
            }

            // handle the case of preferred branch vs selected branch
            var thematicId = settingsApi.getThematicId(
                (position == 0)?3:queryParameters.universe);

            queryParameters.url = "Content=" + queryParameters.content +
            ((queryParameters.universe > 0 )? ("&Universe=" + queryParameters.universe) : "") +
            "&thematicId=" + thematicId + "&GrpLanguage=" + settingsApi.getUserLCID() + "&PrefLanguage=" + settingsApi.getUserPrefLanguageLCID();;
            if (debugApi.getDebugPreferences().liveData.checked) {
                // if panorama, restrict to 2 days
                queryParameters.url = queryParameters.url + "&days="+ settingsApi.getUserPreferences().depth;
            }

            
            return baseUrl + queryParameters.url;
        }

        function getCachedNews(url) {
            var newsKey = url;
            return rssDataCache.get(newsKey);
        }

       

        function getNews(url) {

            
            var rssUrl = url;
            var newsKey = url;
            var now = (new Date()).getTime();

           
            var promise;
            
            // make http call only if no cache, or cache is more than 1 minutes old or user has changed since last 15 min
            if (!rssDataCache.info(newsKey) || (rssDataCache.info(newsKey) && (now - rssDataCache.info(newsKey).created > 60000)) ||
                ((new Date()).getTime() - settingsApi.getLastUserPreferencesUpdateTime()) < 900000)
            promise =
                $http({
                    method: 'get',
                    url: rssUrl
                }).success(function (data) {
                    console.log("received news data from " + rssUrl);
                    // convert rss to json format and filter unnecessary values
                   
                     
                    var jsonNews = rssUtil.getJsonNews(data);
                    
                     
                    rssDataCache.put(newsKey, jsonNews);

                })
                .error(function (data) {
                    console.log("Error receiving news data from " + rssUrl + " using cache");
                });

            // return cache if exists, else return http promise
            return (rssDataCache.info(newsKey)  ? $q.when():promise);
        }

        
        function getLastRefreshTime (url) {
            var newsKey = url;
            // get cache
            var rssCache = rssDataCache.info(newsKey);
            if (rssCache) {
                var created = rssCache.created;
                return created;
            }
            return null;
        }

        return {
            getCachedNews: getCachedNews,
            
            getNews: getNews,
            getAllSiteItemFromThematicId:getAllSiteItemFromThematicId,
            
            getNewsUrl: getNewsUrl,
            getUrlCarouselNews: getUrlCarouselNews,
            getLastRefreshTime: getLastRefreshTime
        };
    }


    function newsApi(settingsApi, DSCacheFactory) {
        var newsDetailCache = DSCacheFactory.get("WatNews-newsDetailData");
        var newsDetailKey = "newsDetail";
        var sessionCache = DSCacheFactory.get("WatNews-sessionData");
        var sessionMenuKey = "sessionMenu";

        return {
            getCurrentNewsDetail: function () {
                return newsDetailCache.get(newsDetailKey);
            },
            updateCurrentNewsDetail: function (newsDetailData) {
                newsDetailCache.put(newsDetailKey, newsDetailData);
            },

            // open in navigator instead of cordova webView
            openExternalLink : function (url) {
                window.open(encodeURI(url), '_system', 'location=yes');
            },
            // current Menu Item Name
            getMenuTitle: function (fromState, toState) {
                // if detail view, or coming from carousel display from State
                return (toState.indexOf("detail") != -1)? fromState : toState;
            }

        }
    }

    function stockApi ($http, $q, DSCacheFactory, CONFIG_ENV,debugApi) {
        var stockDataCache = DSCacheFactory.get("WatNews-stockData");

        function getUrlLastStock(stockType) {
            var feedUrl = debugApi.getDebugPreferences().liveData.checked? CONFIG_ENV.STOCKURL.feedUrl:"app/data/";
            // stockType = TOTALFR | TOTALUS | DOWJONES | CAC | BRENT |EURUSD
            return feedUrl + "ID=" + stockType + "&PERIOD=LAST";
        }

        function getStockData(url) {
            var stockFeedUrl = url;
            var stockKey = url;

            var now = (new Date()).getTime();
            // if last fetch is less than a minute, return cache, else emit request
            if (stockDataCache.info(stockKey) && (now - stockDataCache.info(stockKey).created < 50000))
                return $q.when();


            return $http({
                method: 'get',
                url: stockFeedUrl
            }).success(function (data) {
                console.log("received news data from " + stockFeedUrl);
                stockDataCache.put(stockKey, data);
            })
            .error(function (data) {
                console.log("Error receiving stock data from " + url + ", using cache");
            });

        }

        function getLastRefreshTime () {
            // get cache keys
            var stockKeys = stockDataCache.keys();
            // use first key
            var stockCache = stockDataCache.info(stockKeys[0]);
            if (stockCache) {
                var created = stockCache.created;
                return created;
            }
            return null;
        }

        function getCachedStockData(stockDataUrl) {
            var stockKey = stockDataUrl;
            return stockDataCache.get(stockKey);
        }
        return {
            getUrlLastStock: getUrlLastStock,
            getStockData: getStockData,
            getLastRefreshTime: getLastRefreshTime,
            getCachedStockData: getCachedStockData
        }

    }

    function debugApi(DSCacheFactory, $q, $http, rssUtil,CONFIG_ENV,$state, settingsApi) {
        var debugPreferencesDataCache = DSCacheFactory.get("WatNews-debugData");
        var debugCacheKey = "debugPreferences";
        
        return {
            getDebugPreferences: function () {
                var debugPreferencesData = debugPreferencesDataCache.get(debugCacheKey);
                 
                if (!debugPreferencesData) {
                    // first connection, default values
                    debugPreferencesData = CONFIG_ENV.DEBUG;
                    debugPreferencesData.liveRootUrl =
                        debugPreferencesData.liveData.checked ? CONFIG_ENV.URL.feedUrl: "app/data/";
                    
                   
                    debugPreferencesDataCache.put(debugCacheKey, debugPreferencesData);
                }

                 
                return debugPreferencesData;
            },
            updateDebugPreferences: function (debugPreferencesData) {
                debugPreferencesData.liveRootUrl =
                    debugPreferencesData.liveData.checked ? CONFIG_ENV.URL.feedUrl: "app/data/";
                    
                    
                debugPreferencesDataCache.put(debugCacheKey, debugPreferencesData);
            },
            getDebugRssData: function (url, jsonFormat) {
                var deferred = $q.defer();
                $http.get(url)
                    .success(function (data) {
                        console.log("received data from " + url);
                        if (jsonFormat) {
                            // convert rss to json format and filter unnecessary values
                            data = rssUtil.getJsonNews(data);
                        }
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        console.log("Error receiving news data from " + url);
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            clearCache: function() {
               
                var keys = DSCacheFactory.keySet();
                var cacheFactory = null;
                angular.forEach(keys, function(value, key) {

                cacheFactory = DSCacheFactory.get(value);
                if(value != "WatNews-secutiryIndicatorData")
                {
                    cacheFactory.removeAll();
                }   
                });
                $state.go('intro');

            },
            checkUserPreference: function(userPreferences) {
                 
                if (!userPreferences.hasOwnProperty('firstConnexion') ||
                    !userPreferences.hasOwnProperty('depth') ||
                    !userPreferences.hasOwnProperty('branch') ||
                    !userPreferences.hasOwnProperty('language') ||
                    !userPreferences.hasOwnProperty('display') ||
                    !userPreferences.hasOwnProperty('professionalField') ||
                    !userPreferences.hasOwnProperty('preferrdlanguage')||
                    !userPreferences.hasOwnProperty('entity')||
                    !userPreferences.hasOwnProperty('userId')
                )
                {
                    this.clearCache();
                    return;
                }

                // check if user's preference exists in referential
                if (! (_.filter(settingsApi.getProfessionalFields(),
                    {'text': userPreferences.professionalField})[0]) ||
                    ! (_.filter(settingsApi.getLanguages(),
                        {'value': userPreferences.language})[0]) ||
                    ! (_.filter(settingsApi.getBranches(),
                        {'text': userPreferences.branch})[0]))
                {

                    this.clearCache();
                }
//

            }
        };

    }

    function settingsApi(DSCacheFactory, $translate, SETTINGS_API, amMoment, $state) {
        var settingsDataCache = DSCacheFactory.get("WatNews-settingsData");
        var userPreferencesKey = "userPreferences";
        var selectedBranch = getUserPreferences().branch; // can be updated by user's navigation
        var selectedProfessionalField = getUserPreferences().professionalField; // can be updated by user's navigation
        var lastUserPreferenceModifiedDateTime;

        function getRandomUserID () {
            return Math.floor((Math.random() * 100000) + 1);
        }

        function getUserPreferences  () {
            var userPreferencesData = settingsDataCache.get(userPreferencesKey);
            if (!userPreferencesData) {
                // first connection, default values
                userPreferencesData = SETTINGS_API.DEFAULT_USER_SETTINGS;
                // set random user id
                userPreferencesData.userId = getRandomUserID ();
                settingsDataCache.put(userPreferencesKey, userPreferencesData);
            }
            $translate.use(userPreferencesData.language);
            amMoment.changeLocale(userPreferencesData.language);
            return userPreferencesData;
        }


        return {
            getBranches: function () {
                return _.rest(SETTINGS_API.BRANCHES);
            },
            getProfessionalFields: function () {
                return SETTINGS_API.PROFESSIONAL_FIELDS;
            },
            getGeographicalSites: function () {
                return SETTINGS_API.GEOGRAPHICAL_SITES;
            },
            getEntities: function () {
                return SETTINGS_API.ENTITIES;
            },
            getLanguages: function () {
                return SETTINGS_API.LANGUAGES;
            },
            getPreferredLanguage:function () {
                return SETTINGS_API.PREFERRD_LANGUAGES;
            },
            getSafetyIndicatorPages: function()
            {
                return SETTINGS_API.SAFETY_INDICATOR_PAGES;
            },
            getConnectionEndpointURL: function()
            {
                return SETTINGS_API.CONNECTION_ENDPOINT_URL;
            },
            getWatNewsFeedURLs: function()
            {
                return SETTINGS_API.WAT_FEED_URLS;
            },
            getFavoriteNews: function () {
                return SETTINGS_API.FAVORITE_NEWS;
            },
            getUserPreferences: getUserPreferences,
            updateUserPreferences: function (userPreferencesData) {
                
                this.updateSelectedBranch(userPreferencesData.branch);
                this.updateSelectedProfessionalField(userPreferencesData.professionalField);
                settingsDataCache.put(userPreferencesKey, userPreferencesData);
                $translate.use(userPreferencesData.language);
                amMoment.changeLocale(userPreferencesData.language);
                lastUserPreferenceModifiedDateTime = (new Date()).getTime();
            },

            getLastUserPreferencesUpdateTime: function () {
                return (lastUserPreferenceModifiedDateTime);
            },
            getUserLCID: function () {
                return _.filter(this.getLanguages(),
                    {'value': this.getUserPreferences().language})[0].LCID;
            },
            getUserPrefLanguageLCID: function () {
                return _.filter(this.getPreferredLanguage(),
                    {'value': this.getUserPreferences().preferrdlanguage})[0].LCID;
            },
            
            getPreferredBranch: function() {
                return getUserPreferences().branch;
            },
            getSelectedBranch: function() {
                return selectedBranch;
            },
            getSelectedBranchObjet: function(branch) {
                return _.filter(this.getBranches(),
                    {'text': branch})[0];
            },
            updateSelectedBranch: function(newBranch) {
                
                selectedBranch = newBranch;
            },
            getSelectedProfessionalFieldObjet: function(professionalField) {
                return _.filter(this.getProfessionalFields(),
                    {'text': professionalField})[0];
            },
            getSelectedProfessionalField: function() {
                return selectedProfessionalField;
            },
            updateSelectedProfessionalField: function (professionalField) {
                selectedProfessionalField = professionalField;
            },

            getThematicId: function(universe) {
                switch (universe) {
                    case 1: // selected branch
                        return this.getSelectedBranchThematicID();
                   case 2: // group
                        return this.getGroupThematicID();
                    case 3: // preferred Branch
                        return this.getPreferredBranchThematicID();
                    case -1: // professional field
                        return this.getSelectedProfessionalFieldThematicID();
                    case -2: // human resources
                        return this.getHRThematicID();
                    case -3: // geographical site
                        return this.getGeographicalSiteThematicID();
                    case -4: // entity
                        return this.getEntityThematicID();
                    default:
                       /* return this.getGroupThematicID();*/
                }
            },
            getSelectedBranchThematicID: function () {
               return _.filter(this.getBranches(), {'text': selectedBranch})[0].thematicId;
            },
            getPreferredBranchThematicID: function() {
                return _.filter(this.getBranches(),
                    {'text': this.getPreferredBranch()})[0].thematicId;
            },
            getSelectedProfessionalFieldThematicID: function () {
                return _.filter(this.getProfessionalFields(),
                    {'text': selectedProfessionalField})[0].thematicId;
            },
            getHRThematicID: function () {
                return SETTINGS_API.HR[0].thematicId;
            },
            getGroupThematicID: function () {
                return _.filter(SETTINGS_API.BRANCHES, {'text': 'GROUP'})[0].thematicId;
            },
            getGeographicalSiteThematicID: function () {
                var preferredSite = this.getUserPreferences().geographicalSite;
                var thematicGeographicalSite = null;
                _.forEach(this.getGeographicalSites(), function(country) {
                    var geographicalSite = _.filter(country.sites, {'text': preferredSite} )
                    if (geographicalSite.length > 0) {
                        thematicGeographicalSite =  geographicalSite[0].thematicId;
                    }
                });
                return thematicGeographicalSite;
            },
            getEntityThematicID: function () {
                var preferredEntity = this.getUserPreferences().entity;
                var thematicEntity = null;

                _.forEach(this.getEntities(), function(branch) {
                        var entity = _.filter(branch.entities, {'text': preferredEntity} )
                        if (entity.length > 0) {
                            thematicEntity =  entity[0].thematicId;
                        }
                });
                return thematicEntity;
            },
	    
	        getDepth: function () {
                return SETTINGS_API.DEPTH;
            },
            getUserId: function() {
                return getUserPreferences().userId;
            }


        };
    }

    function xitiApi(DSCacheFactory, $http, CONFIG_ENV, settingsApi, $filter) {
        // set userID if not exists

        var xitiMenuTitle;
        var xitiPageTitle;
        function sanitize(parameter){
            if (parameter) {

                var translatedParameter = $filter('translate')(parameter);
                translatedParameter = translatedParameter.split('');
                var sanitizedParameter = new Array();
                var strAccentsLen = translatedParameter.length;
                var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽžŒ';
                var accentsOut = ['A','A','A','A','A','A','a','a','a','a','a','a','O','O','O','O','O','O','O','o','o','o','o','o','o','E','E','E','E','e','e','e','e','e','C','c','D','I','I','I','I','i','i','i','i','U','U','U','U','u','u','u','u','N','n','S','s','Y','y','y','Z','z','oe'];
                for (var y = 0; y < strAccentsLen; y++) {
                    if (accents.indexOf(translatedParameter[y]) != -1) {
                        sanitizedParameter[y] = accentsOut[accents.indexOf(translatedParameter[y])];
                    }
                    else
                        sanitizedParameter[y] = translatedParameter[y];
                }
                sanitizedParameter = sanitizedParameter.join('');
                sanitizedParameter = sanitizedParameter.replace(/^\s+|\s+$/g, '').replace(/ /g,'_');
                sanitizedParameter = sanitizedParameter.replace("&amp;", '-').replace("&quot;", '_').replace("&gt;", '_').replace("&gt;", '_').replace("&oelig;", '_').replace("&nbsp;", '_').replace("&acute;", '_').replace(":", '_');

                return sanitizedParameter;
            }
            return "";

        }

        return {
            setMenuTitle: function (menuTitle) {
                xitiMenuTitle = menuTitle;
            },
            setPageTitle: function (pageTitle) {
                xitiPageTitle = pageTitle;
            },
            getXitiURL: function (userPreferences) {
                var params = {
                    'page': userPreferences.language + "::" + sanitize(xitiMenuTitle) + "::" +  sanitize(xitiPageTitle),
                    'x1': userPreferences.language,
                    'x2': userPreferences.branch,
                    'x3': '',
                    'x4': '',
                    'x5': sanitize(userPreferences.geographicalSite),
                    'x6': '',
                    'x7': '',
                    'lng': userPreferences.language,
                    'idclient': settingsApi.getUserId()
                };

                var xitiUrl = CONFIG_ENV.XITI.mainUrl +
                    "&idclient=" + params.idclient + "&s2=4&p=" + params.page +
                    "&x1=[" + params.x1 + "]&x2=[" + params.x2 + "]&x3=[" + params.x3 + "]&x4=[" + params.x4 +
                    "]&x5=[" + params.x5 + "]&x6=[" + params.x6 + "]&x7=[" + params.x7 + "]&lng=" + params.lng
                    + "&na";
                return xitiUrl;

            },
            sanitize : sanitize
        }
    }
})();


