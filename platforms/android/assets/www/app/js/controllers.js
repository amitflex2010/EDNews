(function () {
    'use strict';

    angular.module('app.controllers', ['app.services'])
        .controller('AppCtrl', ['$scope', '$rootScope', '$cordovaPushV5','$timeout','settingsApi','storeDeviceTokenForPushNotificationApi', 'newsApi',
            '$ionicSideMenuDelegate','$ionicPlatform','$cordovaAppAvailability',  '$state', 'debugApi','securityIndicatorApi','rssUtil','rssApi','securityIndicatorUtil', 'xitiApi','CONFIG_ENV','$ionicLoading','$interval',
            function ($scope, $rootScope, $cordovaPushV5, $timeout, settingsApi,storeDeviceTokenForPushNotificationApi, newsApi, $ionicSideMenuDelegate, $ionicPlatform, $cordovaAppAvailability, $state,
                      debugApi,securityIndicatorApi,rssUtil,rssApi,securityIndicatorUtil, xitiApi,CONFIG_ENV,$ionicLoading,$interval) {

                function initView() {
                    $rootScope.userPreferences = settingsApi.getUserPreferences();
                    // verify that the cache is correctly set, else clear cache
                    debugApi.checkUserPreference($rootScope.userPreferences);
                    $ionicSideMenuDelegate.canDragContent(true);
                  
                }

                
                $ionicPlatform.ready(function ()
                {     
                 //  console.log(rssApi.getNewsUrl(debugApi.getDebugPreferences().liveRootUrl));
                    if(ionic.Platform.isIOS)
                    {
                         //registerDeviceForPushNotification();
                    }

                   // navigator.splashscreen.hide();
					setValidEmagURL();

					
                   
              
                }); 


                function registerDeviceForPushNotification()
                {
                    
                    $cordovaPushV5.initialize( 
                     {
                            android: {
                                senderID: ""
                            },
                            ios: {
                                alert: 'true',
                                badge: true,
                                sound: 'true',
                                clearBadge: true,
                                expiry:Math.floor(Date.now() / 1000) + 3600
                            },
                            windows: {}
                        }
                    ).then(function (result) {
                        $cordovaPushV5.onNotification();
                        $cordovaPushV5.onError();
                        console.log("About to register push notification");
                        $cordovaPushV5.register().then(function (device_token) {
                            console.log("Register success with device_token " + device_token);
                          
                            storeDeviceToken(device_token);
                        }, function (err) {
                            // handle error
                            console.log("Error registering device");
                        });
                    });
                }

                // Notification Received
             $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, notification) 
             {
                //Never reaches here for Android in background, but works fine for iOS when in background
                //Reaches here for Android when in foreground
                
               console.log('Received some notification: ', JSON.stringify([notification]));

                if (ionic.Platform.isAndroid())
                {
                // handleAndroid(notification);
                }
                else if (ionic.Platform.isIOS)
                {
                    $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                    });
                    setTimeout(function()
                    { handleIOS(notification) },3000);
                    //handleIOS(notification);
                }

                $cordovaPushV5.finish().then(function (result) {
                        console.log('finished notificationReceived RESULT: ' + result);
                        

                    }, function (err) {
                        // handle error
                        console.log('finished notificationReceived ERROR: ' + err);

                    });
            });

            $rootScope.$on('$cordovaPushV5:errorOccurred', function(event, error) {
                // handle error
                console.log('cordovaPushV5:errorOccurred ERROR: ' + error);
                

            });

            function convertLanguageIDtoString()
            {
                var convertedString = "";
                if(settingsApi.getUserLCID() == "1036")
                {
                    convertedString = "FR"
                }
                else
                {
                    convertedString = "EN"
                }  

                return convertedString;
            }

            function handleIOS(notification)
            {
           

                var jsonNotification = (notification);
                var additionaldata = jsonNotification.additionalData;
                var nObjCount = 0;
                var  link = null;
                for(var key in additionaldata)
                {
                    if(additionaldata.hasOwnProperty(key))
                    {
                        if(key != "foreground" && key != "coldstart")
                        {
                            link = additionaldata[key]
                        }
                        nObjCount++;
                    }
                }
                  
                if(nObjCount == 3 && link !=null)
                {
                    showSelectedNotificationDetail(link);
                }
                else
                {
                    console.log("Safety Indicator Notification");
                    console.log("connection status :"+$rootScope.ConnectedtoVPN)
                   //if($rootScope.ConnectedtoVPN)
                    var deviceTokenFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
                    var thematicId = settingsApi.getGroupThematicID();
                    var sampleQueryParam = "SafetyIndicator=true&GrpLanguage="+settingsApi.getUserLCID();
                    var vpnPromise = securityIndicatorApi.isConnectedtoVPN("http://10.27.63.154:84/rss_isg.xml");
                   

                    vpnPromise.then(function(){

                          $ionicSideMenuDelegate.toggleLeft(false);
                           $state.go("app.carousel-group");
                        setTimeout(function()
                               { $rootScope.$broadcast('rootScope:openSecurityIndicatorPopup', 'securityIndicator');},3000);
                    },
                    function(error)
                    {
                        $ionicLoading.hide();
                    }).finally(function (data) {
                        $ionicLoading.hide();
                    });         
                }

            }

            

            function showSelectedNotificationDetail(link)
            {
                    var deviceTokenFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
                    var thematicId = settingsApi.getGroupThematicID();
                  
                    var sampleQueryParam = "SafetyIndicator=true&GrpLanguage="+settingsApi.getUserLCID();
                    var vpnPromise = securityIndicatorApi.isConnectedtoVPN("http://10.27.63.154:84/rss_isg.xml");


                    vpnPromise.then(function()
                    {
                        console.log("Connected Inside New VPN check ..");
                        var siteItemsPromise = rssApi.getAllSiteItemFromThematicId();
                        var matchFound = false;
                        siteItemsPromise.then(function(data)
                        {
                            var newsItem = getNewsDataForSelectedNotification(data.data);

                            for(var key in newsItem)
                            {
                                if(newsItem.hasOwnProperty(key))
                                {
                                if(newsItem[key]['link'] == link )
                                    {
                                        matchFound = true;
                                        $state.go("app.notification-news-detail");
                                        setTimeout(function()
                                        { $rootScope.$broadcast('rootScope:broadcast-showDetail', newsItem[key]);},1000);
                                        break;
                                    }
                                }
                                
                            }

                            if(!matchFound)
                            {
                                 $state.go("app.carousel-group"); 
                            }
                        },
                        function(error)
                        {
                            $ionicLoading.hide();
                        }).finally(function (data) {
                            $ionicLoading.hide();
                        });                
                    },
                    function(error)
                    {
                       
                        console.log("Not Connected Inside new VPN check..");
                        $ionicLoading.hide();
                        $state.go("app.carousel-group"); 
                    
                    });
                
            }

            

            function getNewsDataForSelectedNotification(rssFeed)
            {

                var allItems = rssUtil.xml_str2json(rssFeed);

                    if (!allItems.rss.channel) return null;
                    if (!allItems.rss.channel.item) return "";


                 return _.chain([].concat(allItems.rss.channel.item)) // convert object to array if single value
                .map(function (item) {
                  //  console.log(item.link)
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

            function storeDeviceToken(token)
            {
 
                $rootScope.deviceToken = token;

                var deviceTokenFeedUrl = settingsApi.getWatNewsFeedURLs().DEVICE_TOKEN_FEED;
                var addTokenURL = CONFIG_ENV.URL.feedUrl+deviceTokenFeedUrl+"deviceid="+token+"&lang="+convertLanguageIDtoString()+ buildURLforSecurityIndicatorNotification();
                
                storeDeviceTokenForPushNotificationApi.addDeviceToken(addTokenURL).then(function (data) {
                    //success
                },
                function(error, status, headers, config) 
                {
                    //error
                }).finally(function (data) {

                 });
                           
                

            }

             function buildURLforSecurityIndicatorNotification()
             {
                    var safetyIndicatorNotificationData = settingsApi.getUserPreferences().display; 
                    var url = "";
                    if(safetyIndicatorNotificationData.safetyindicatordaily.checked)
                    {
                        url += "&siwa=y";
                    }
                    else
                    {
                        url += "&siwa=n";
                    }

                    if(safetyIndicatorNotificationData.safetyindicatormajoraccident.checked)
                    {
                        url += "&sia=y";
                    }
                    else
                    {
                        url += "&sia=n";
                    }

                    if(safetyIndicatorNotificationData.majornews.checked)
                    {
                        url += "&wn=y";
                    }
                    else
                    {
                        url += "&wn=n";
                    }

                    return url;
                }

                function checkVPNConnection()
                {

                   
                    var deviceTokenFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
                    var thematicId = settingsApi.getGroupThematicID();
                  
                    var sampleQueryParam = "SafetyIndicator=true&GrpLanguage="+settingsApi.getUserLCID();
                   // var vpnPromise = securityIndicatorApi.isConnectedtoVPN(CONFIG_ENV.URL.feedUrl+deviceTokenFeedUrl+sampleQueryParam);
                   var vpnPromise = securityIndicatorApi.isConnectedtoVPN(settingsApi.getConnectionEndpointURL().CONNECTION_URL);

                
                    var ConnectedtoVPN = true;


                    vpnPromise.then(function()
                    {
                      
                        ConnectedtoVPN = true;
                        $rootScope.ConnectedtoVPN = ConnectedtoVPN;
                        setTimeout(function()
                                { $rootScope.$broadcast('rootScope:disconnected-from-total',ConnectedtoVPN );},3000);
                    
                    },
                    function(error)
                    {
                       
                        ConnectedtoVPN = false;
                        $rootScope.ConnectedtoVPN = ConnectedtoVPN;
                        setTimeout(function()
                                { $rootScope.$broadcast('rootScope:disconnected-from-total',ConnectedtoVPN );},3000);
                    
                    });
                }

                function setValidEmagURL()
                {
                    var emagURLPromise = securityIndicatorApi.fetchEmagURLFromFeed();
                    
                    emagURLPromise.then(
                        function(data)
                        {
                            setTimeout(function()
                                { $rootScope.$broadcast('rootScope:setsecurityindicator-data','securityIndicatordata' );},3000); 
                        },
                        function(error)
                        {

                        }
                    );

                   checkVPNConnection();
                    
                }

                

                
            $scope.openMyWat = function()
            {
                  $cordovaAppAvailability.check('mywat://')
                .then(function() {
                    window.open('mywat://', '_system', 'location=no');
                    console.log('mywat is available');
                    }, function () {
                        window.open('', '_system', 'location=no');
                        console.log('mywat is not available');

                    });
                 
            }

                document.addEventListener("resume", onResume, false);

                function onResume()
                {
                   $rootScope.$broadcast('rootScope:broadcast-resume', 'resume'); 
                }
                
                $ionicPlatform.on('resume', function()
                {
                   $rootScope.$broadcast('rootScope:broadcast-resume', 'resume'); 
                   checkVPNConnection();
                 
                });

                $ionicPlatform.on('pause', function()
                {
                     $rootScope.$broadcast('rootScope:broadcast-pause', 'pause'); 
                });

                $scope.$on('$ionicView.beforeEnter', function () {
                    initView();
                });

                $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    initView();
                    // update nav bar Title from state
                    $rootScope.MenuTitle = newsApi.getMenuTitle(fromState.name, toState.name);

                    if (toState.name.indexOf("detail") == -1) // home page of universe
                        $rootScope.PageTitle = toState.name;
                    xitiApi.setMenuTitle($rootScope.MenuTitle);
                    xitiApi.setPageTitle($rootScope.PageTitle);
                    $rootScope.xitiURL = xitiApi.getXitiURL($rootScope.userPreferences);
                });

                $scope.$on('$ionicView.loaded', function () {
                    if (settingsApi.getUserPreferences().firstConnexion)
                    {
                        $state.go('intro');
                        $rootScope.$broadcast('rootScope:broadcast-firstConnection', 'firstConnection');
                    }

                });

            }])

        .controller('StockCtrl', ['$scope', 'stockApi', '$timeout',
            function ($scope, stockApi, $timeout) {
                var stockDataRefreshed;
                $scope.$on('$ionicView.loaded', function () {
                    $scope.onPulling = false;
                    $scope.loadStockData();
                    stockDataRefreshed = false;
                });

                $scope.onMyPulling = function () {
                    if (stockApi.getLastRefreshTime())
                        $scope.onPulling = true;
                };
                $scope.loadStockData = function () {
                    var stockIndicators = ["TOTALFR", "TOTALUS", "BRENT", "CAC", "DOWJONES", "EURUSD"];
                    var stockData;
                    var stockDataUrl = {};
                    $scope.stockData = {};

                    angular.forEach(stockIndicators, function (value) {
                        stockDataUrl[value] = stockApi.getUrlLastStock(value);
                        stockApi.getStockData(stockDataUrl[value]).then(function () {
                            stockDataRefreshed = true;
                        }).finally(function () {
                            $scope.$broadcast('scroll.refreshComplete');
                            stockData = stockApi.getCachedStockData(stockDataUrl[value]);
                            if (stockData) {
                                $scope[value] = stockData;
                                $scope.refreshTime = stockApi.getLastRefreshTime();
                            }
                            $timeout(function () {
                                $scope.onPulling = false;
                            }, 700); // delay 700 ms
                        });
                    })

                };
            }])

        .controller('StockDetailCtrl', ['$rootScope', '$scope', '$stateParams', '$sce',
            function ($rootScope, $scope, $stateParams, $sce) {
                $scope.title = $stateParams.code;

                $scope.iframestockgridurl =
                    $sce.trustAsResourceUrl("http://www.totalsa.show.mdgms.com/widgets/historique5jours.php?ID="
                    + $stateParams.code + "&LANG=" + $rootScope.userPreferences.language);
            }])
        .controller('NewsCtrl', ['$rootScope', '$scope', '$state','$ionicModal','$ionicLoading', 'rssApi', 'newsApi', 'debugApi', 'settingsApi','securityIndicatorApi','securityIndicatorUtil',
            '$timeout','CONFIG_ENV',
            function ($rootScope, $scope, $state,  $ionicModal, $ionicLoading, rssApi, newsApi, debugApi, settingsApi,securityIndicatorApi,securityIndicatorUtil, $timeout,CONFIG_ENV) {
                var rssDataRefreshed, rssData;
                var urlNewsCarousel = [];
                var newsCarouselToRefresh = true;
                var lastUserPreferencesUpdateTime;
                 $scope.fisrtConnection = false;
               

                 var baseURL = CONFIG_ENV.URL.feedUrl;
                 var deviceTokenFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED; 
                 var thematicId = settingsApi.getGroupThematicID();
                    
                 var sampleQueryParam = "SafetyIndicator=true&GrpLanguage="+settingsApi.getUserLCID();
                 
                var vpnPromise = securityIndicatorApi.isConnectedtoVPN(settingsApi.getConnectionEndpointURL().CONNECTION_URL);
           
                vpnPromise.then(function()
                {
                    $rootScope.ConnectedtoVPN = true;
                },
                function(error)
                {
                    $rootScope.ConnectedtoVPN = false
                   
                    $scope.setSecurityIndicator("true")
                });
                
                $scope.$on('rootScope:broadcast-firstConnection', function (evnt,data)
                {
                    if($scope.secIndicatorData == null || $scope.secIndicatorData == undefined)
                    {
                        $scope.fisrtConnection = true;
                    }   
                });

                $scope.$on('rootScope:broadcast-resume', function (event, data)
                 {
                   $scope.setSecurityIndicator("true");
                    
                });
                
                $scope.$on('rootScope:openSecurityIndicatorPopup', function (event, data)
                 {
                           console.log("securityinicator called opening")
                   $scope.showAccidentDetails();
                    
                });

                $scope.showAccidentDetails = function()
                {
                    var modalOpened = false;
                    if(settingsApi.getUserPreferences().firstConnexion && ( $scope.secIndicatorData == null &&  $scope.secIndicatorData == undefined))
                    {
                          return; 
                    }
 
                    $scope.setSecurityIndicator("true");
                    

                     $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                 $scope.$on('rootScope:broadcast-datafetched', function (evnt,data)
                {
                   
                    if(!modalOpened)
                    {
                        modalOpened = true;
                        openModalPopup();

                    }
                });

                 $scope.$on('rootScope:broadcast-disconnected', function (evnt,data)
                {
                    console.log("disconnected")
                });

                if(!$rootScope.ConnectedtoVPN)
                {
                    
                    if(!modalOpened)
                    {
                        modalOpened = true;
                        openModalPopup();
                        

                    }
                }
               }
            
              $scope.$on('rootScope:disconnected-from-total', function (evnt,data)
                {
                    $scope.ConnectedtoVPN = data;
                    
                        $scope.processDataForSecurityIndicator($scope.secIndicatorData);
                   
                  
                     
                });

                $scope.$on('rootScope:setsecurityindicator-data', function (evnt,data)
                {
                    $scope.setSecurityIndicator("true");
                });

                function openModalPopup()
                {
                                 
                     console.log("opened")
                    $ionicLoading.hide();

                    var templateUrl = "";

                    var secItemkey = "safetyindicator";
                    var secIndicatorValue = securityIndicatorApi.getCachedSecurityItem(secItemkey);
                    
                    if(secIndicatorValue != null && secIndicatorValue != undefined)
                    {   
                        if($scope.indicatorType == "group_safety")
                        {
                            templateUrl = "app/views/template/group-safety-indicator.html";
                        }
                        else
                        {
                            templateUrl = "app/views/template/security-indicator.html";
                            
                        }

                        var instance = $ionicModal.fromTemplateUrl(templateUrl, {
                        scope: $scope,
                        animation: 'slide-in-up',
                        backdropClickToClose: true,
                        hardwareBackButtonClose: true,
                        
                        }).then(function(modal)
                        {
                            $scope.modal = modal;
                            $scope.modal.show();
                            $scope.secIndicatorData = secIndicatorValue;
                           
                        });
                         $scope.$on('$destroy', function() {

                             $scope.modal.remove();
                        });
                        
                    }
                    else
                    {
                        console.log("No data available")
                    }
                   
                }
                $scope.closeModalPopup = function()
                {
                    if( $scope.modal)
                    {
                        $scope.modal.hide();
                        $scope.modal.remove();
                    }
                }

                
               

                
                
                 $scope.setSecurityIndicator = function(showSafetyIndicator)
                 {
                     
                         var secItemkey = "safetyindicator";
                         var emagItemURL = "secItemURL";
                        
                         var url = securityIndicatorApi.getEmagURLFromCache(emagItemURL);
                      
                         if(!$rootScope.ConnectedtoVPN)
                         {
                                $scope.disconnected = true;
                               
                                setTimeout(function()
                                { $rootScope.$broadcast('rootScope:broadcast-disconnected',$scope.disconnected );},1000); 
                         }
                         else
                         {
                                if(!settingsApi.getUserPreferences().firstConnexion && (url != null || url != undefined) )
                                {
                                securityIndicatorApi.getUrlForSafetyIndicator(url,showSafetyIndicator).then(function (data) {
                                $scope.datafetched = true;
                                $scope.disconnected = false; 
                                
                                
                                $scope.secIndicatorData =  securityIndicatorApi.getCachedSecurityItem(secItemkey);
                            
                                $rootScope.$broadcast('rootScope:broadcast-datafetched',  $scope.datafetched);
                                if($scope.secIndicatorData != null && $scope.secIndicatorData != undefined)
                                {
                                  
                                    $scope.processDataForSecurityIndicator($scope.secIndicatorData);
                                    $scope.getlastUpdateTimeStamp = securityIndicatorUtil.formatTiemStamp(securityIndicatorApi.getlastUpdateTimeForSecurityIndicator());
                                }
                            
                                }, function(error, status, headers, config) {

                                
                                $scope.disconnected = true;
                                $rootScope.$broadcast('rootScope:broadcast-disconnected',  $scope.disconnected);
                                
                                }).finally(function (data) {
                                    
                                    $ionicLoading.hide();
                                    if(! $scope.datafetched)
                                    {
                                        $scope.disconnected = true;
                                        $scope.secIndicatorData  = securityIndicatorApi.getCachedSecurityItem(secItemkey);
                                        if($scope.secIndicatorData != null && $scope.secIndicatorData != undefined)
                                        {
                                            $scope.processDataForSecurityIndicator($scope.secIndicatorData);
                                            $scope.getlastUpdateTimeStamp = securityIndicatorUtil.formatTiemStamp(securityIndicatorApi.getlastUpdateTime());
                                        }
                                        
                                    }

                                    
                                
                                });
                            }
                            else
                            {
                                $scope.disconnected = true;
                                $rootScope.$broadcast('rootScope:broadcast-disconnected',  $scope.disconnected);
                            }
                         }
                        
                        
                    }

                    $scope.processDataForSecurityIndicator = function (secItemdata) 
                    {

                        if( $scope.secIndicatorData != null &&  $scope.secIndicatorData != undefined)
                        {
                           var incident_date =  $scope.secIndicatorData.DateIncident;
                           
                            $scope.date_diff = Number(securityIndicatorUtil.getDateDiffrence(incident_date)) - Number(1);
                       
                            $scope.style_name = getReqClassFromLength($scope.date_diff);
                      
                      if( $scope.showSecurityIndicator)
                      {
                            if($rootScope.ConnectedtoVPN)
                            {
                                if($scope.date_diff < 8)
                                {
                                    $scope.indicatorType = "group_safety";
                                }
                                else
                                {
                                    $scope.indicatorType = "num_days";
                                }
                            }
                            else
                            {
                                $scope.indicatorType = "";
                            }
                        }
                        else
                        {
                             $scope.indicatorType = "";
                        }
                            

                            if(settingsApi.getUserLCID() == 1036)
                            {
                                $scope.LangStyleSafety = 'safety_fr_style';
                                $scope.LangStyleIndict = 'indcat_fr_style';
                                $scope.LangStyleSafetypopup = 'safety_frpopup_style';
                                $scope.LangStyleIndictpopup = 'indcat_frpopup_style';
                            }
                            else
                            {
                                $scope.LangStyleSafety = '';
                                $scope.LangStyleIndict = '';
                                $scope.LangStyleSafetypopup = '';
                                $scope.LangStyleIndictpopup = '';
                            }

                            if(($scope.secIndicatorData.TRIR_value).startsWith('+'))
                            {
                                $scope.trir_style = "trir_color_red";
                            }
                            else if(($scope.secIndicatorData.TRIR_value).startsWith('-'))
                            {
                                $scope.trir_style = "trir_color_green";
                            }

                          } 

                        
                    }

                    function getReqClassFromLength(value)
                    {
                        var str = value.toString();
                        var str_len = str.length;
                        var class_name ="";
                        var lang = settingsApi.getUserLCID();
                       
                        if(str_len == 2 && lang == 1033)
                        {
                            class_name = "length_2_pad";
                        }
                        else if(str_len == 1 && lang == 1033)
                        {
                            class_name = "length_1_pad";
                        }
                        else if(str_len == 2 && lang == 1036)
                        {
                            class_name = "length_2_padfr";
                            $scope.fr_len3_pad = "length_2_padfrsubscript";
                        }
                        else if(str_len == 1 && lang == 1036)
                        {
                            class_name = "length_1_padfr";
                        }
                        else if(str_len == 3 && lang == 1036)
                        {
                            class_name = "length_3_padfr";
                            $scope.fr_len3_pad = "length_3_padfrsubscript";
                        }
                        else
                        {
                            class_name="";
                            $scope.fr_len3_pad ="";
                        }
                        
                        return class_name;
                    }


                    function initNews() {
                    var newsFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
                    var newsURL = "";
                    if(debugApi.getDebugPreferences().debugMode.checked)
                    {
                        newsURL = rssApi.getNewsUrl(debugApi.getDebugPreferences().liveRootUrl);
                    }
                    else
                    {
                        newsURL = rssApi.getNewsUrl(CONFIG_ENV.URL.feedUrl+newsFeedUrl);
                       
                    }
                    $scope.debug = {
                        'debugMode': debugApi.getDebugPreferences().debugMode,
                        'rssFeedUrl': rssApi.getNewsUrl(newsURL)
                    };
                    $rootScope.debugMode = $scope.debug.debugMode.checked;
                    $rootScope.userPreferences = settingsApi.getUserPreferences();

                    $scope.onPulling = false;
                    
                    $scope.datafetched = false;
                    
                    $scope.disconnected = false;
                   
                      
  
                    var secItemkey = "safetyindicator";
                     var showSafetyIndicator = "false";
                   

                    if($state.current.name == settingsApi.getSafetyIndicatorPages().CAROUSEL_NEWS || 
                    $state.current.name == settingsApi.getSafetyIndicatorPages().WATSUP || 
                    $state.current.name == settingsApi.getSafetyIndicatorPages().WATSNEW)
                    {
                        $scope.showSecurityIndicator = true;
                        var secdata = securityIndicatorApi.getCachedSecurityItem(secItemkey);

                        if(securityIndicatorUtil.checkCacheForSecurityIndicator() == true && secdata != null)
                        {
                            showSafetyIndicator = "true";
                            $scope.setSecurityIndicator(showSafetyIndicator);
                    
                        }
                        else if(secdata == null)
                        {
                           showSafetyIndicator = "true";
                            $scope.setSecurityIndicator(showSafetyIndicator); 
                    
                        }
                        else
                        {
                          
                                $scope.secIndicatorData  = securityIndicatorApi.getCachedSecurityItem(secItemkey);
                    
                                if(securityIndicatorApi.getCachedSecurityItem(secItemkey) != null && securityIndicatorApi.getCachedSecurityItem(secItemkey) != undefined)
                                {
                                    
                                    $scope.processDataForSecurityIndicator($scope.secIndicatorData);
                                    $scope.getlastUpdateTimeStamp = securityIndicatorUtil.formatTiemStamp(securityIndicatorApi.getlastUpdateTimeForSecurityIndicator())
                                }
                    
                        }

                        
                    }
                    else
                    {
                        $scope.showSecurityIndicator = false;
                    }
                     
                    

                    // for $state app.news-branch or app.nominations-branch
                    if ($state.current.name.indexOf('-branch') != -1) {
                        $scope.branches = settingsApi.getBranches();
                        $scope.selectedBranch = settingsApi.getSelectedBranchObjet(settingsApi.getSelectedBranch());
                       
                        $scope.updateBranch = function (branch) {

                            
                            $scope.newsItems = {};
                            settingsApi.updateSelectedBranch(branch);
                            
                            var newsFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
                            if($rootScope.debugMode)
                            {
                                $scope.debug.rssFeedUrl = rssApi.getNewsUrl(debugApi.getDebugPreferences().liveRootUrl);
                            }
                            else
                            {
                                $scope.debug.rssFeedUrl = rssApi.getNewsUrl(CONFIG_ENV.URL.feedUrl+newsFeedUrl);
                                console.log("hre2")
                            }
                            
                            $scope.loadNews();
                        };
                       

                         $scope.$watch(
                    "selectedBranch", function(){ $scope.updateBranch($scope.selectedBranch)}
                         );
                    }

                    // for $state app.news-professionalfield or app.nominations-professionalfield
                    if ($state.current.name.indexOf('-professionalfield') != -1) {
                       
                        $scope.professionalFields = settingsApi.getProfessionalFields();
                         
                        $scope.selectedProfessionalField = settingsApi.getSelectedProfessionalFieldObjet(settingsApi.getSelectedProfessionalField());
                        
                        $scope.updateProfessionalField = function (professionalField) {
                            $scope.newsItems = {};
                            settingsApi.updateSelectedProfessionalField(professionalField);
                            var newsFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
                            if($rootScope.debugMode)
                            {
                                $scope.debug.rssFeedUrl = rssApi.getNewsUrl(debugApi.getDebugPreferences().liveRootUrl);
                            }
                            else
                            {
                                $scope.debug.rssFeedUrl = rssApi.getNewsUrl(CONFIG_ENV.URL.feedUrl+newsFeedUrl);
                                console.log("hre3")
                            }
                            
                            $scope.loadNews();
                        }

                        $scope.$watch(
                    "selectedProfessionalField", function(){ $scope.updateProfessionalField($scope.selectedProfessionalField)}
                         );
                    }

                   
                };
                $scope.$on('$ionicView.loaded', function () {
                    $scope.carouselItemsLimit = 8;
                    $scope.scrollDownCount=-1;
                });
                $scope.$on('$ionicView.beforeEnter', function () {
                    initNews();
                });
                $scope.$on('$ionicView.afterEnter', function () {
                    // timeout loading
                    $timeout(function () {
                        $scope.onPulling = false;
                        $scope.loading = false;
                        $scope.$broadcast('scroll.refreshComplete');
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, 90000);
                    $scope.loadLazyNews(); // default: manual refresh

                });

                $scope.showNewsDetail = function (event, item, newState) {
                    event.preventDefault();
                    newsApi.updateCurrentNewsDetail(item);
                    $state.transitionTo(newState);
                };
                $scope.openExternalLink = function (url) {
                    newsApi.openExternalLink(url);
                };

                $scope.onMyPulling = function () {
                    $scope.loading = false;
                    $scope.onPulling = true;

                };

                // load when entering view
                $scope.loadLazyNews = function () {
                    var carosuelUrl = ""
                   
                    try {
                        var now = (new Date()).getTime();
                        var lastRefreshedTime = now;
                        var oldLastUserPreferencesUpdateTime = lastUserPreferencesUpdateTime;
                        lastUserPreferencesUpdateTime = settingsApi.getLastUserPreferencesUpdateTime();
                        if ($scope.newsItems) {
                            lastRefreshedTime = lastRefreshedTime - $scope.newsItems.refreshTime;
                        }
                        var newsToRefresh = (lastRefreshedTime > 900000) || (lastUserPreferencesUpdateTime &&
                            (now - lastUserPreferencesUpdateTime < 900000));
                        //newsCarouselToRefresh = lastUserPreferencesUpdateTime > 900000;

                        // refresh only if no news or news refresh > 15 min or language has changed since last 15 min.
                        if ( ! $scope.newsItems || newsToRefresh) {
                           
                            
                            var newsFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
                            if($rootScope.debugMode)
                            {
                                $scope.debug.rssFeedUrl = rssApi.getNewsUrl(debugApi.getDebugPreferences().liveRootUrl);
                            }
                            else
                            {
                                $scope.debug.rssFeedUrl = rssApi.getNewsUrl(CONFIG_ENV.URL.feedUrl+newsFeedUrl);
                                console.log("hre4")
                            }

                            $scope.loadNews();
                            if ($state.current.name.indexOf('carousel') != -1) {
                                newsCarouselToRefresh = (lastUserPreferencesUpdateTime && (!oldLastUserPreferencesUpdateTime ||
                                (oldLastUserPreferencesUpdateTime != lastUserPreferencesUpdateTime)));
                                if (!$scope.newsCarousel || (newsToRefresh && newsCarouselToRefresh )) {
                                    $scope.newsCarousel = [];
                                    $scope.scrollDownCount=-1;
                                    urlNewsCarousel = [];

                                    // initialize url News for other universe
                                    var newsFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
                                    if($rootScope.debugMode)
                                    {
                                       carosuelUrl = rssApi.getNewsUrl(debugApi.getDebugPreferences().liveRootUrl);
                                    }
                                    else
                                    {
                                        carosuelUrl = rssApi.getNewsUrl(CONFIG_ENV.URL.feedUrl+newsFeedUrl);
                                        console.log("hre5")
                                    }

                                    for (var i = 0; i < 4; i++) {
                                        urlNewsCarousel.push(rssApi.getUrlCarouselNews(carosuelUrl, i));
                                    }

                                  
                                }

                                $scope.loadMoreData = function () {
                                    loadNewsCarousel();
                                }
                            }

                        } else {
                            $scope.$broadcast('scroll.refreshComplete');
                            $scope.loading = false;
                        }
                    } catch ( e) {}

                };



               //
              /* var gentities = settingsApi.getEntities();
               var gbranch = settingsApi.getSelectedBranch();
               var selectedObject = null;
                for(var key in gentities)
                {
                    if(gentities.hasOwnProperty(key))
                    {
                        console.log(gentities[key]['branch'])
                        if(gentities[key]['branch'] == gbranch)
                        {
                            selectedObject =gentities[key] ;
                        }
                    }
                }

               */
                $scope.loadNews = function () {
                  
                    rssDataRefreshed = false;
                    $scope.loading = true;
                    var title_nodata = "No information within the last "+ settingsApi.getUserPreferences().depth +" days."

                    rssApi.getNews($scope.debug.rssFeedUrl).then(function () {
                        rssDataRefreshed = true;
                       
                    }).finally(function () {
                        $scope.$broadcast('scroll.refreshComplete');
                        $scope.loading = false;

                        rssData = rssApi.getCachedNews($scope.debug.rssFeedUrl);
                     

                        if (rssData) {
                            $scope.newsItems = {
                                'newsData': rssData,
                                'refreshTime': rssApi.getLastRefreshTime($scope.debug.rssFeedUrl)
                            };
                            $scope.nodata = ($scope.newsItems.newsData.length == 0);
                             
                            $scope.newsItems.newsData = rssData;
                        }
                        
                        if(!rssData)
                        {
                            if(navigator.notification)
                            {
                                
                                navigator.notification.alert(
                                title_nodata,  // message
                                    function alertDismissed() {},         // callback
                                    'No Data',            // title
                                    'OK'                  // buttonName
                                ); 
                            } 
                            else
                            {
                               // alert(title_nodata)
                            }

                            
                         }
                        $timeout(function () {
                            $scope.onPulling = false;
                        }, 700); // delay 700 ms
                    });
                     
                };


                // called when on carousel page, append other news
                function loadNewsCarousel() {
                    $scope.scrollDownCount++;
                    // check if Branch is HLD
                    if ($scope.scrollDownCount == 0 && $rootScope.userPreferences.branch == "HLD") {
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        return;
                    }
                    var url = urlNewsCarousel[$scope.scrollDownCount];

                    console.log(url)
                    rssApi.getNews(url).then(function () {
                        rssDataRefreshed = true;
                    }).finally(function () {
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        var pos = urlNewsCarousel.map(function (urlCheck) {
                            return urlCheck
                        }).indexOf(url);
                        $scope.newsCarousel[pos] = rssApi.getCachedNews(url);
                    });
                }
            }])

        // general controller for detail views
        .controller('DetailCtrl', ['$scope', '$rootScope', 'newsApi','xitiApi', 'settingsApi',
            function ($scope, $rootScope, newsApi, xitiApi, settingsApi) {
                $scope.newsDetail = newsApi.getCurrentNewsDetail();
                $rootScope.PageTitle = $scope.newsDetail.title + '-' +
                    $scope.newsDetail.publicationDate.substring(5);

                String.prototype.replaceAll =  function (search, replacement) 
               {
                    var target = this;
                    return target.replace(new RegExp(search, 'g'), replacement);
               };
                //alert($scope.newsDetail)
               //adjusted the image size to be fit with in the app.
               $scope.fixedImageContent =  ($scope.newsDetail.content).replaceAll("<img","<img class='image_alignment_style'");

               //console.log($scope.fixedImageContent);
                $rootScope.userPreferences = settingsApi.getUserPreferences();

                xitiApi.setPageTitle($rootScope.PageTitle);
                $rootScope.xitiURL = xitiApi.getXitiURL($rootScope.userPreferences);

                $scope.openExternalLink = function (url) {
                    newsApi.openExternalLink(url);
                };

               
            }])
            // general controller for detail views
        .controller('NotificationDetailCtrl', ['$scope', '$rootScope','newsApi','xitiApi', 'settingsApi',
            function ($scope, $rootScope,newsApi, xitiApi, settingsApi) {
               
                $scope.$on('rootScope:broadcast-showDetail', function (evnt,data)
                {
                    $scope.newsDetail = data;
                    $rootScope.PageTitle = $scope.newsDetail.title + '-' +
                    $scope.newsDetail.publicationDate.substring(5);

                    String.prototype.replaceAll =  function (search, replacement) 
                    {
                            var target = this;
                            return target.replace(new RegExp(search, 'g'), replacement);
                    };
                        //alert($scope.newsDetail)
                    //adjusted the image size to be fit with in the app.
                    $scope.fixedImageContent =  ($scope.newsDetail.content).replaceAll("<img","<img class='image_alignment_style'");

                    //console.log($scope.fixedImageContent);
                        $rootScope.userPreferences = settingsApi.getUserPreferences();

                        xitiApi.setPageTitle($rootScope.PageTitle);
                        $rootScope.xitiURL = xitiApi.getXitiURL($rootScope.userPreferences);

                        $scope.openExternalLink = function (url) {
                            newsApi.openExternalLink(url);
                     };
                });
            }])

        .controller('DebugCtrl', ['$scope', 'debugApi','settingsApi', 'rssApi', '$state','CONFIG_ENV',
            function ($scope, debugApi,settingsApi, rssApi, $state,CONFIG_ENV) {
                $scope.debugPreferences = debugApi.getDebugPreferences();
                $scope.debugRssData = "after submition, select all text here and copy result";
                $scope.updateDebugPreferences = function () {
                    debugApi.updateDebugPreferences($scope.debugPreferences);
                };

                $scope.getRssData = function () {
                    var newsFeedUrl = settingsApi.getWatNewsFeedURLs().NEWS_FEED;
                    var carosuelUrl = "";
                    if(debugApi.getDebugPreferences().debugMode.checked)
                    {
                        carosuelUrl = rssApi.getNewsUrl(debugApi.getDebugPreferences().liveRootUrl);
                    }
                    else
                    {
                        carosuelUrl = rssApi.getNewsUrl(CONFIG_ENV.URL.feedUrl+newsFeedUrl);
                        console.log("hre6")
                    }
                    debugApi.getDebugRssData(carosuelUrl + $scope.debugPreferences.queryParameters, $scope.debugPreferences.jsonFormat.checked).then(function (data) {
                        $scope.debugRssData = data;
                    });
                };
                $scope.clearCache = function () {
                    debugApi.clearCache($state);
                };
            }])

        .controller('SettingsCtrl', ['$rootScope', '$scope', 'settingsApi','debugApi','storeDeviceTokenForPushNotificationApi', 'securityIndicatorApi', '$ionicScrollDelegate','CONFIG_ENV',
            function ($rootScope, $scope, settingsApi, debugApi,storeDeviceTokenForPushNotificationApi, securityIndicatorApi, $ionicScrollDelegate,CONFIG_ENV) {

                
               
                $rootScope.userPreferences = settingsApi.getUserPreferences();
                $scope.branches = settingsApi.getBranches();
                $scope.languages = settingsApi.getLanguages();
                $scope.preferrdlanguage = settingsApi.getPreferredLanguage();
                $scope.professionalFields = settingsApi.getProfessionalFields();
                $scope.geographicalSites = settingsApi.getGeographicalSites();
                $scope.entities = settingsApi.getEntities();
                $scope.depth = settingsApi.getDepth();
                $scope.selectedLanguage = settingsApi.getUserLCID();

               
                //$scope.favoriteNews = settingsApi.getFavoriteNews();
                var deviceTokenFeedUrl = settingsApi.getWatNewsFeedURLs().DEVICE_TOKEN_FEED;
                var addTokenURL = CONFIG_ENV.URL.feedUrl+deviceTokenFeedUrl+"deviceid="+$rootScope.deviceToken+"&lang="+convertLanguageIDtoString()+buildURLforSecurityIndicatorNotification();
                
                
                $scope.updateUserPreferences = function (reload) {
                    $rootScope.selectedPrevLanguage = settingsApi.getUserLCID();
                    settingsApi.updateUserPreferences($rootScope.userPreferences);
                   
                };

                $scope.updateUserPreferenceForSecurityNotificatioSettings = function()
                {
                        settingsApi.updateUserPreferences($rootScope.userPreferences);
                       
                       if($rootScope.deviceToken != undefined)
                       {
                            var addTokenURL = CONFIG_ENV.URL.feedUrl+deviceTokenFeedUrl+"deviceid="+$rootScope.deviceToken+"&lang="+convertLanguageIDtoString()+buildURLforSecurityIndicatorNotification();
                            var vpnUrl = CONFIG_ENV.URL.feedUrl+settingsApi.getWatNewsFeedURLs().NEWS_FEED+"SafetyIndicator=true&GrpLanguage="+settingsApi.getUserLCID();

                            var prmise = securityIndicatorApi.isConnectedtoVPN(settingsApi.getConnectionEndpointURL().CONNECTION_URL)
                            prmise.then(function()
                            {
                                
                                storeDeviceTokenForPushNotificationApi.addDeviceToken(addTokenURL).then(function (data) 
                                {},
                                function(error, status, headers, config) 
                                {}).finally(function (data) {});
                            },
                            function(error)
                            {
                                
                            });
                        }
                       
                }
                function buildURLforSecurityIndicatorNotification()
                {

                    var url = "";
                    if($rootScope.userPreferences.display.safetyindicatordaily.checked)
                    {
                        url += "&siwa=y";
                    }
                    else
                    {
                        url += "&siwa=n";
                    }

                    if($rootScope.userPreferences.display.safetyindicatormajoraccident.checked)
                    {
                        url += "&sia=y";
                    }
                    else
                    {
                        url += "&sia=n";
                    }

                    if($rootScope.userPreferences.display.majornews.checked)
                    {
                        url += "&wn=y";
                    }
                    else
                    {
                        url += "&wn=n";
                    }

                    return url;
                }  
               
               function convertLanguageIDtoString()
               {
                    var convertedString = "";
                    if(settingsApi.getUserLCID() == "1036")
                    {
                        convertedString = "FR"
                    }
                    else
                    {
                        convertedString = "EN"
                    } 

                    return convertedString; 
               }
                
                 $scope.$watch(
                    "selectedLanguage",
                    function ( newValue, oldValue ) {
                       
                        
                      if(newValue != $rootScope.selectedPrevLanguage && $rootScope.selectedPrevLanguage != undefined)
                      {
                  
                        securityIndicatorApi.fetchEmagURLFromFeed();

                        if($rootScope.deviceToken != undefined)
                        {
                            var prmise = securityIndicatorApi.isConnectedtoVPN(settingsApi.getConnectionEndpointURL().CONNECTION_URL)
                            prmise.then(function()
                            {
                                
                                storeDeviceTokenForPushNotificationApi.addDeviceToken(addTokenURL).then(function (data) 
                                {

                                },
                                function(error, status, headers, config) 
                                {

                                }).finally(function (data) {

                                });
                            },
                            function(error)
                            {

                                
                            });
                        }
                      }
                       
                });
               

                $scope.toggleGroup = function (group) {
                    if ($scope.isGroupShown(group)) {
                        $scope.shownGroup = null;
                    } else {
                        $scope.shownGroup = group;
                    }
                    $ionicScrollDelegate.resize();
                };
                $scope.isGroupShown = function (group) {
                    return $scope.shownGroup === group;
                };

                var count = 0;
                var count1 = 0;
                $scope.debugMode1 = function () {
                    count1 = count1 + 1;
                };
                $scope.debugMode = function () {
                    count = count + 1;
                    if (count > 9 && count1 == 2) {
                        $rootScope.userPreferences.display.debug.checked = true;
                        $scope.updateUserPreferences();
                    }
                }
            }])

        .controller('IntroSettingsCtrl', ['$rootScope', '$scope', 'settingsApi','$ionicScrollDelegate',
            function ($rootScope, $scope, settingsApi,$ionicScrollDelegate) {
                $rootScope.userPreferences = settingsApi.getUserPreferences();
                $scope.branches = settingsApi.getBranches();
                $scope.languages = settingsApi.getLanguages();
                $scope.preferrdlanguage = settingsApi.getPreferredLanguage();
                $scope.professionalFields = settingsApi.getProfessionalFields();
                $scope.geographicalSites = settingsApi.getGeographicalSites();
                $scope.entities = settingsApi.getEntities();
                $scope.depth = settingsApi.getDepth();
                $scope.favoriteNews = settingsApi.getFavoriteNews();
                $scope.updateUserPreferences = function (reload) {
                    settingsApi.updateUserPreferences($rootScope.userPreferences);
                };

                $scope.toggleGroup = function (group) {
                    if ($scope.isGroupShown(group)) {
                        $scope.shownGroup = null;
                    } else {
                        $scope.shownGroup = group;
                    }
                    $ionicScrollDelegate.resize();
                };
                $scope.isGroupShown = function (group) {
                    return $scope.shownGroup === group;
                };

                $scope.saveFirstUserPreference = function () {
                    $rootScope.userPreferences.firstConnexion = false;
                    $scope.updateUserPreferences();
                };
            }])

})();

