// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.controllers' is found in controllers.js
(function () {
    'use strict';

    angular.module('app',
        ['ionic','ngCordova', 'app.controllers', 'app.filters', 'app.directives',
            'pascalprecht.translate', 'angular-data.DSCacheFactory', 'app.config',
            'app.config-ressources', 'angularMoment','LocalForageModule', 'imagenie' ])

        .run(function ($ionicPlatform, DSCacheFactory) {
            ImgCache.options.debug = true;
            ImgCache.options.chromeQuota = 50*1024*1024;
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }


            });

           
            // one week cache for news
            //DSCacheFactory("WatNews-rssData", {storageMode: "localStorage", maxAge: 86400000, deleteOnExpire: "aggressive"});
            DSCacheFactory("WatNews-rssData", {storageMode: "localStorage", maxAge: 86400000});
            DSCacheFactory("WatNews-newsDetailData", {storageMode: "localStorage", maxAge: 86400000});
            DSCacheFactory("WatNews-settingsData", {storageMode: "localStorage"});
            DSCacheFactory("WatNews-debugData", {storageMode: "localStorage"});
            DSCacheFactory("WatNews-sessionData", {storageMode: "sessionStorage"});
            DSCacheFactory("WatNews-stockData", {storageMode: "localStorage"});
            DSCacheFactory("WatNews-secutiryIndicatorData", {storageMode: "localStorage"});

        })

        .config(['$translateProvider', '$stateProvider', '$urlRouterProvider', 'CONFIG_RESSOURCES',
            '$ionicConfigProvider',
            function ($translateProvider, $stateProvider, $urlRouterProvider, CONFIG_RESSOURCES, $ionicConfigProvider) {

            $translateProvider.translations('EN', CONFIG_RESSOURCES.EN);
            $translateProvider.translations('FR', CONFIG_RESSOURCES.FR);

            $ionicConfigProvider.navBar.alignTitle('left');
            $ionicConfigProvider.backButton.previousTitleText(false);
            $ionicConfigProvider.views.maxCache(30);

            $stateProvider

                .state('intro', {
                    url: "/intro",
                    templateUrl: "app/views/introsettings.html",
                    controller: 'IntroSettingsCtrl'
                })

                .state('intro-settings-branch', {
                    url: "/intro/branch",
                    templateUrl: "app/views/introsettingsbranch.html",
                    controller: 'IntroSettingsCtrl'
                })

                .state('intro-settings-language', {
                    url: "/intro/language",
                    templateUrl: "app/views/introsettingslanguage.html",
                    controller: 'IntroSettingsCtrl'
                })

                .state('intro-settings-professionalfield', {
                    url: "/intro/professionalfield",
                    templateUrl: "app/views/introsettingsprofessionalfield.html",
                    controller: 'IntroSettingsCtrl'
                })

                .state('intro-settings-geographicalsite', {
                    url: "/intro/geographicalsite",
                    templateUrl: "app/views/introsettingsgeographicalsite.html",
                    controller: 'IntroSettingsCtrl'
                })

                .state('intro-settings-entity', {
                    url: "/intro/entity",
                    templateUrl: "app/views/introsettingsentity.html",
                    controller: 'IntroSettingsCtrl'
                })

                .state('intro-settings-depth', {
                    url: "/intro/depth",
                    templateUrl: "app/views/introsettingsdepth.html",
                    controller: 'IntroSettingsCtrl'
                })

                .state('app', {
                    url: "/app",
                    abstract: true,
                    templateUrl: "app/views/menu.html",
                    controller: 'AppCtrl'
                })

                .state('app.carousel-group', {
                    url: "/news/carousel",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/carousel.html",
                            controller: 'NewsCtrl'
                            
                        }
                    }
                })

                .state('app.indicator-stock', {
                    url: "/indicator/stock",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/stock.html",
                            controller: 'StockCtrl'
                        }
                    }
                })

                .state('app.indicator-stock-detail', {
                    url: "/indicator/stockdetail/:code",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/stocktotaldetail.html",
                            controller: 'StockDetailCtrl'
                        }
                    }
                })

                .state('app.watsup-group', {
                    url: "/news/watsup",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/news.html",
                            controller: 'NewsCtrl'
                            
                        }
                    }
                })

                .state('app.news-detail', {
                    url: "/news/detail",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/newsdetail.html",
                            controller: 'DetailCtrl'
                        }
                    }
                })
                .state('app.notification-news-detail', {
                    url: "/notificationnews/detail",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/notificationnewsdetail.html",
                            controller: 'NotificationDetailCtrl'
                        }
                    }
                })
                .state('app.news-branch', {
                    url: "/news/branch",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/newsbranch.html",
                            controller: 'NewsCtrl'
                        }
                    }
                })

                .state('app.watsnew-group', {
                    url: "/watsnew/group",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/watsnew.html",
                            controller: 'NewsCtrl'
                        }
                    }

                })

                .state('app.pressrelease-group', {
                    url: "/news/pressrelease",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/pressrelease.html",
                            controller: 'NewsCtrl'
                        }
                    }
                })

                .state('app.pressrelease-detail', {
                    url: "/news/pressrelease/detail",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/pressreleasedetail.html",
                            controller: 'DetailCtrl'
                        }
                    }
                })

                .state('app.presspanorama-group', {
                    url: "/news/presspanorama",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/presspanorama.html",
                            controller: 'NewsCtrl'
                        }
                    }
                })
                /*
                .state('app.presspanorama-detail', {
                    url: "/news/presspanorama/detail",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/pressreleasedetail.html",
                            controller: 'DetailCtrl'
                        }
                    }
                })*/

                .state('app.nominations-group', {
                    url: "/nominations/group",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/nominations.html",
                            controller: 'NewsCtrl'
                        }
                    }
                })

                .state('app.nominations-branch', {
                    url: "/nominations/branch",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/nominationsbranch.html",
                            controller: 'NewsCtrl'
                        }
                    }
                })

                .state('app.nomination-detail', {
                    url: "/news/nomination/detail",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/nominationdetail.html",
                            controller: 'DetailCtrl'
                        }
                    }
                })

                .state('app.news-professionalfield', {
                    url: "/news/professionalfield",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/newsprofessionalfield.html",
                            controller: 'NewsCtrl'
                        }
                    }
                })

                .state('app.nominations-professionalfield', {
                    url: "/nominations/professionalfield",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/nominationsprofessionalfield.html",
                            controller: 'NewsCtrl'
                        }
                    }
                })

                .state('app.news-humanresources', {
                    url: "/news/humanresources",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/news.html",
                            controller: 'NewsCtrl'
                        }
                    }
                })

                .state('app.news-geographicalsite', {
                    url: "/news/geographicalsite",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/news.html",
                            controller: 'NewsCtrl'
                        }
                    }
                })

                .state('app.news-entity', {
                    url: "/news/entity",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/news.html",
                            controller: 'NewsCtrl'
                        }
                    }
                })

                .state('app.nominations-entity', {
                    url: "/nominations/entity",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/nominations.html",
                            controller: 'NewsCtrl'
                        }
                    }
                })

                .state('app.settings', {
                    url: "/settings",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/settings.html",
                            controller: 'SettingsCtrl'
                        }
                    }
                })

                .state('app.settings-branch-detail', {
                    url: "/settings/branch",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/settingsbranch.html",
                            controller: 'SettingsCtrl'
                        }
                    }
                })

                .state('app.settings-language-detail', {
                    url: "/settings/language",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/settingslanguage.html",
                            controller: 'SettingsCtrl'
                        }
                    }
                })

                .state('app.settings-professionalfield-detail', {
                    url: "/settings/professionalfield",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/settingsprofessionalfield.html",
                            controller: 'SettingsCtrl'
                        }
                    }
                })

                .state('app.settings-geographicalsite-detail', {
                    url: "/settings/geographicalsite",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/settingsgeographicalsite.html",
                            controller: 'SettingsCtrl'
                        }
                    }
                })
                .state('app.settings-groupItem-detail', {
                    url: "/settings/groupItem",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/groupItem.html",
                            controller: 'SettingsCtrl'
                        }
                    }
                })
                .state('app.settings-safetyindicator-detail', {
                    url: "/settings/safetyindicator",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/safetyIndicatorSettings.html",
                            controller: 'SettingsCtrl'
                        }
                    }
                })

                .state('app.settings-entity-detail', {
                    url: "/settings/entity",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/settingsentity.html",
                            controller: 'SettingsCtrl'
                        }
                    }
                })
		
		        .state('app.settings-depth-detail', {
                    url: "/settings/depth",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/settingsdepth.html",
                            controller: 'SettingsCtrl'
                        }
                    }
                })

                .state('app.debug', {
                    url: "/debug",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/debug.html",
                            controller: 'DebugCtrl'
                        }
                    }
                })

                .state('app.help', {
                    url: "/help",
                    views: {
                        'menuContent': {
                            templateUrl: "app/views/help.html",
                            controller: 'SettingsCtrl'
                        }
                    }
                });


            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/news/carousel');

        }]);
})();
