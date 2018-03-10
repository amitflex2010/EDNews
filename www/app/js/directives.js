(function () {
    'use strict';

    angular.module('app.directives', [])
        .directive('cachedImage', function () {
            return {
                restrict: 'A',
                scope: {
                    class: '@',
                    image: '@',
                    transclude: '@'
                },
                link: function ($scope, $element, $attr) {
                    var inside = angular.element($element.children()[0]);

                    $attr.$observe('ngSrc', function (src) {
                        if (src) {
                            if (ImgCache.ready) {
                                // Check if image is cached
                                ImgCache.isCached(src, function (path, success) {
                                    if (success) {
                                        // Remove spinner
                                        removeLoadingIndicator();
                                        inside.css('content', 'url("' + src + '")');
                                        ImgCache.useCachedBackground(inside);
                                    } else {
                                        download(src);
                                    }
                                });
                            } else {
                                download(src);
                            }
                        }
                    });

                    function download(src) {
                        // Add loading indicator
                        if (!$scope.transclude)
                            inside.html('<i class="icon icon-md ion-ios7-reloading"></i>');

                        if (ImgCache.ready) {
                            inside.css('content', 'url("' + src + '")');
                            ImgCache.cacheBackground(inside, function () {
                                // Use cached image
                                removeLoadingIndicator();
                                ImgCache.useCachedBackground(inside);
                            }, function () {
                                console.error('Could not download image (ImgCache).');
                                removeLoadingIndicator();
                            });
                        } else {
                            var img = new Image();
                            img.src = src;

                            img.onload = function () {
                                removeLoadingIndicator();
                                inside.css('content', 'url("' + src + '")');
                            };

                            img.onerror = function () {
                                console.error('Could not download image.');
                                removeLoadingIndicator();
                            };
                        }
                    }

                    function removeLoadingIndicator() {
                        if (!$scope.transclude)
                            inside.html('');
                    }
                },
                transclude: true,
                template: '<div class="" ng-transclude></div>',
            };
        })


        .directive('showWhen', ['$window', function ($window) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attr) {

                    function checkExpose() {
                        var mq = $attr.showWhen == 'large' ? '(min-width:768px)' : $attr.showWhen;
                        if ($window.matchMedia(mq).matches) {
                            $element.removeClass('ng-hide');
                        } else {
                            $element.addClass('ng-hide');
                        }
                    }

                    function onResize() {
                        debouncedCheck();
                    }

                    var debouncedCheck = ionic.debounce(function () {
                        $scope.$apply(function () {
                            checkExpose();
                        });
                    }, 300, false);

                    checkExpose();

                    ionic.on('resize', onResize, $window);

                    $scope.$on('$destroy', function () {
                        ionic.off('resize', onResize, $window);
                    });

                }
            };
        }])

})();