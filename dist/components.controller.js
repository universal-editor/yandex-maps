(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('ComponentsController', ComponentsController);

    function ComponentsController($timeout, $rootScope) {
        'ngInject';
        var vm = this;
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
                                    label: 'ue-yandex-maps Одиночный режим',
                                    hint: 'Компонент по работе с картой',
                                    required: false,
                                    readonly: false,
                                    multiple: false,
                                    width: 8,
                                    mapHeight: 400,
                                    mapWidth: 400,
                                    mapCenter: [37.620393, 55.765575],
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
                                    label: 'ue-yandex-maps Множественный режим (multiname)',
                                    hint: 'Компонент по работе с картой',
                                    required: false,
                                    readonly: false,
                                    multiname: 'new_value',
                                    multiple: true,
                                    width: 8,
                                    mapHeight: 400,
                                    mapWidth: 400,
                                    mapCenter: [37.620393, 55.765575],
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
                                    label: 'ue-yandex-maps Множественный режим',
                                    hint: 'Компонент по работе с картой',
                                    required: false,
                                    readonly: false,
                                    multiple: true,
                                    width: 8,
                                    mapHeight: 400,
                                    mapWidth: 400,
                                    mapCenter: [37.620393, 55.765575],
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
                                    label: 'ue-yandex-maps Одиночный режим (Только для чтения)',
                                    hint: 'Компонент по работе с картой',
                                    required: true,
                                    readonly: true,
                                    multiple: false,
                                    width: 8,
                                    mapHeight: 400,
                                    mapWidth: 400,
                                    mapCenter: [37.620393, 55.765575],
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
                                    label: 'ue-yandex-maps Множественный режим (Только для чтения)',
                                    hint: 'Компонент по работе с картой',
                                    required: true,
                                    readonly: true,
                                    multiple: true,
                                    width: 12,
                                    mapCenter: [37.620393, 55.765575],
                                    mapZoom: 5,
                                    defaultValue: [[37.617313,55.756039], [40.617313,55.756039]]
                                }
                            }
                        }, {
                            name: 'map',
                            component: {
                                name: 'ue-yandex-maps',
                                settings: {
                                    label: 'ue-yandex-maps Множественный режим (Disabled)',
                                    hint: 'Компонент по работе с картой',
                                    required: true,
                                    disabled: true,
                                    multiple: true,
                                    width: 12,
                                    mapCenter: [37.620393, 55.765575],
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