(function() {
    'use strict';

    angular
        .module('ue-yandex-maps')
        .controller('UeYandexMapsController', UeYandexMapsController);

    function UeYandexMapsController($scope, $controller) {
        /* jshint validthis: true */
        'ngInject';
        var vm = this,
            componentSettings,
            baseController;

        vm.$onInit = function() {
            componentSettings = vm.setting.component.settings;
            baseController = $controller('FieldsController', { $scope: $scope });
            angular.extend(vm, baseController);

            vm.map = undefined;
            vm.mapParam = {
                height: componentSettings.mapHeight || "400",
                width: componentSettings.mapWidth || "650",
                center: componentSettings.mapCenter || [37.620393, 55.765575],
                zoom: componentSettings.mapZoom || 5
            };
            if (vm.fieldValue) {
                vm.equalPreviewValue();
            }
            centeredMap();

            vm.removeItem = removeItem;
            vm.listeners.push($scope.$on('ue:componentDataLoaded', function(e, data) {
                if (vm.isParentComponent(data) && !vm.options.filter) {
                    $scope.onLoadDataHandler(e, data);
                    $scope.$evalAsync(centeredMap);
                    vm.equalPreviewValue();
                }
            }));

            function centeredMap() {
                if (vm.multiple) {
                    if (vm.fieldValue.length > 0) {
                        vm.mapParam.center = vm.fieldValue[0];
                    }
                } else {
                    if (vm.fieldValue) {
                        vm.mapParam.center = vm.fieldValue;
                    }
                }
            }

            vm.listeners.push($scope.$watch(function() { return vm.fieldValue; }, handlerChangeValue, true));

            function handlerChangeValue(value, v1) {
                if (angular.isArray(value)) {
                    if (vm.multiple) {
                        value.forEach(function(chain, index, array) {
                            if (angular.isString(chain) && chain.split(',').length === 2) {
                                array[index] = chain.split(',');
                            }
                        });
                    }
                }
                if (angular.isString(value) && value.split(',').length === 2) {
                    vm.fieldValue = value.split(',');
                }
            }

            vm.afterInit = function(map) {
                vm.map = map;
                if (vm.multiple && angular.isArray(vm.fieldValue) && vm.fieldValue.length > 1) {
                    map.container.fitToViewport();
                }
            };

            vm.mapDoubleClick = function(event) {
                var coords = event.get('coords');
                if (!vm.readonly) {
                    if (vm.multiple) {
                        vm.fieldValue.push(coords);
                    } else {
                        if (!vm.fieldValue) {
                            vm.fieldValue = coords;
                        }
                    }
                }
            };

            vm.getFieldValue = function() {
                var field = {},
                    wrappedFieldValue;
                if (vm.multiple) {
                    wrappedFieldValue = [];
                    if (angular.isArray(vm.fieldValue)) {
                        vm.fieldValue.forEach(function(value) {
                            var multinameValue;
                            var output = '';
                            if (angular.isArray(value)) {
                                output = value.join(",");
                            }
                            if (vm.multiname) {
                                multinameValue = {};
                                multinameValue[vm.multiname] = output;
                            }
                            wrappedFieldValue.push(multinameValue || output);
                        });
                    }
                } else if (angular.isArray(vm.fieldValue)) {
                    wrappedFieldValue = vm.fieldValue.join(",");
                }

                if (vm.parentField) {
                    field[vm.parentField] = {};
                    field[vm.parentField][vm.fieldName] = wrappedFieldValue;
                } else {
                    field[vm.fieldName] = wrappedFieldValue;
                }

                return field;
            };
        };

        function removeItem(index) {
            if (vm.multiple) {
                if (angular.isArray(vm.fieldValue)) {
                    vm.fieldValue.forEach(function(value, key) {
                        if (key == index) {
                            vm.fieldValue.splice(index, 1);
                        }
                    });
                }
            } else {
                vm.fieldValue = '';
            }
        }
    }
})();