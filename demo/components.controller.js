(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('ComponentsController', ComponentsController);

    function ComponentsController($timeout, $rootScope) {
        'ngInject';
        var vm = this;
         $rootScope.$on('ue-yandex-maps: setAddress', function(event, value) {
             console.dir(value);
         });

        vm.ueConfig = {
            component: {
                name: 'ue-group',
                settings: {
                    label: 'Components',
                    fields: [
                        {
                            name: 'map',
                            component: {
                                name: 'ue-yandex-maps',
                                settings: {
                                    label: 'ue-yandex-maps Single mode (Volgograd centered)',
                                    hint: 'Component for work with maps',
                                    required: false,
                                    readonly: false,
                                    multiple: false,
                                    width: 8,
                                    mapWidth: 550,
                                    mapCenter: [44.5018300, 48.7193900],
                                    mapZoom: 1
                                }
                            }
                        },
                        {
                            name: 'map',
                            component: {
                                name: 'ue-yandex-maps',
                                settings: {
                                    label: 'ue-yandex-maps Multiple mode (multiname)',
                                    hint: 'Component for work with maps',
                                    required: false,
                                    readonly: false,
                                    multiname: 'new_value',
                                    multiple: true,
                                    width: 8,
                                    mapZoom: 5,
                                    defaultValue: [[37.617313,55.756039], [40.617313,55.756039]]
                                }
                            }
                        },
                        {
                            name: 'map',
                            component: {
                                name: 'ue-yandex-maps',
                                settings: {
                                    label: 'ue-yandex-maps Multiple mode',
                                    hint: 'Component for work with maps',
                                    required: false,
                                    readonly: false,
                                    multiple: true,
                                    width: 8,
                                    mapZoom: 5
                                }
                            }
                        }, 
                        {
                            name: 'map',
                            component: {
                                name: 'ue-yandex-maps',
                                settings: {
                                    label: 'ue-yandex-maps Single mode (readonly)',
                                    required: true,
                                    readonly: true,
                                    multiple: false,
                                    width: 8,
                                    mapZoom: 5,
                                    defaultValue: [37.617313,55.756039]
                                }
                            }
                        }, 
                        {
                            name: 'map',
                            component: {
                                name: 'ue-yandex-maps',
                                settings: {
                                    label: 'ue-yandex-maps Multiple mode (readonly)',
                                    required: true,
                                    readonly: true,
                                    multiple: true,
                                    width: 12,
                                    mapZoom: 5,
                                    defaultValue: [[37.617313,55.756039], [40.617313,55.756039]]
                                }
                            }
                        }, {
                            name: 'map',
                            component: {
                                name: 'ue-yandex-maps',
                                settings: {
                                    label: 'ue-yandex-maps Multiple mode (Disabled)',
                                    required: true,
                                    disabled: true,
                                    multiple: true,
                                    width: 12,
                                    mapZoom: 5,
                                    defaultValue: [[37.617313,55.756039], [40.617313,55.756039]]
                                }
                            }
                        }
                    ]
                }
            }
        }; 
    }
})();