(function () {
    'use strict';

    var ueYandexMaps = {
        bindings : {
            setting: '<',
            options: '='
        },
        template : ['$templateCache', function ($templateCache) {
            return $templateCache.get('module/components/ueYandexMaps/ueYandexMaps.html');
        }],
        controller: 'UeYandexMapsController',
        controllerAs : 'vm'
    };
    angular
        .module('ue-yandex-maps')
        .component('ueYandexMaps', ueYandexMaps);
})();