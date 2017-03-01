(function() {
    'use strict';
    angular.module('demoApp', ['ui.router', 'universal-editor', 'ue-yandex-maps'])
        .run(demoAppRun)
        .config(routerConfig);

    function routerConfig($stateProvider, $urlRouterProvider) {
        'ngInject';
        $stateProvider
            .state('components', {
                url: '/components',
                template: '<universal-editor ue-config="vm.ueConfig"></universal-editor>',
                controllerAs: 'vm',
                controller: 'ComponentsController'
            });
        $urlRouterProvider.otherwise('/components');
    }
    function demoAppRun($rootScope) {
        'ngInject';
        var itemsSelector = document.querySelectorAll('.nav.nav-tabs li');
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            var stateParamEntityId = toState.name;
            angular.forEach(itemsSelector, function(item) {
                $(item).removeClass('active');
                if (~stateParamEntityId.indexOf($(item).find('a')[0].hash.split('/')[1])) {
                    $(item).addClass('active');
                }
            });
        });
    }
})();
