/*
 * Replace the content of this file by other file suffixed with environment
 * ex: -environment-ppr
 */

(function () {
    'use strict';
    angular.module('app.config-env', [])
        .constant('CONFIG_ENV', {
            'URL': {
               feedUrl: 'http://rec4-wat-content.hd.corp.local/_layouts/15/total/wat/'
               
            },
            'STOCKURL': {
                feedUrl: 'http://www.totalsa.mdgms.com/json/feed.php?'
            },
            'DEBUG': {
                'debugMode': {checked: true},
                'liveData': {checked: false},
                'jsonFormat': {checked: true},
                'queryParameters': 'Content=1&Universe=1&thematicId=100e2656-a99e-4c1b-a209-b21cc4eca5bf&Language=1033'
            },
            

            'XITI': {
                "mainUrl": "http://logc406.xiti.com/hit.xiti?s=553545"
            }
        })
})();

//http://wat-content.hd.corp.local/_layouts/15/total/wat/watnewsfeed.aspx?
