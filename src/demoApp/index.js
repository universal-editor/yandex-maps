(function() {
    'use strict';
    angular.module('demoApp', ['ui.router', 'universal-editor', 'ue-yandex-maps'])
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
})();
