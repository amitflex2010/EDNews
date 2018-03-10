/*
 * preprod values. Copy paste to environment.js
 *
 */

(function () {
    'use strict';
    angular.module('app.config-env', [])
        .constant('CONFIG_ENV', {
            'URL': {
                feedUrl: 'http://ppr-wat-content.hd.corp.local/_layouts/15/total/wat/watnewsfeed.aspx?'
            },
            'DEBUG': {
                'debugMode': {checked: false},
                'liveData': {checked: true},
                'jsonFormat': {checked: true},
                'queryParameters': 'Content=1&Universe=1&thematicId=100e2656-a99e-4c1b-a209-b21cc4eca5bf&Language=1033'
            }
        })
})();
