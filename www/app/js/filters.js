(function () {
    'use strict';

    angular.module('app.filters',[])

        // filter to open link in browser instead of cordova webView
        .filter('hrefToExternal', function ($sce, $sanitize) {
            return function (text) {
                var regex = /href="([\S]+)"/g;
                var newString = $sanitize(text).replace(regex, "onClick=\"window.open('$1', '_system')\" class=\"xs-link-blank\"");
                return $sce.trustAsHtml(newString.replace(">a</a>", " style=\"display:none;\"></a>"));
            }
        })

        // filter Nomination / Appointment text from Appointment's title
        .filter('removeAppointmentText', function () {
            return function (text) {
                var regex = /Nominations|Nomination\ de|Nomination\ d'|nomination\ de|nomination\ d'|Nomination|Appointment\ of|Appointment|Notice\ of|Notice/g;
                var newString = text.replace(regex, "");
                return newString;
            }
        })

    .filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        
      if(a[attribute] < b[attribute]) return -1;
      if(a[attribute] > b[attribute]) return 1;
      return 0;
    });
   
    return array;
 }
})
 .filter('orderObjectBytranslate', function($filter){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
       
      if($filter('translate')(a[attribute]) < $filter('translate')(b[attribute])) return -1;
      if($filter('translate')(a[attribute]) > $filter('translate')(b[attribute])) return 1;
      return 0;
    });
   
    return array;
 }
});


})();