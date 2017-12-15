(function() {
    'use strict';

    angular
        .module('ue-yandex-maps')
        .controller('UeYandexMapsController', UeYandexMapsController);

    function UeYandexMapsController($scope, $controller, $element, $rootScope, $timeout) {
        /* jshint validthis: true */
        'ngInject';
        var vm = this,
            componentSettings,
            baseController;
        vm.searchControl = null;
        vm.searchControlObjCoords = null;
        vm.zoom = null;

        vm.$onInit = function() {
            componentSettings = vm.setting.component.settings;
            baseController = $controller('FieldsController', { $scope: $scope, $element: $element });
            angular.extend(vm, baseController);

            vm.map = undefined;
            vm.zoom = componentSettings.mapZoom && componentSettings.mapZoom > 16 ? componentSettings.mapZoom : 16;
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

            vm.listeners.push($scope.$on('ue:componentDataLoaded', function(e, data) {
                if (vm.isParentComponent(data) && !vm.options.filter) {
                    $scope.onLoadDataHandler(e, data);
                    $scope.$evalAsync(centeredMap);
                    vm.equalPreviewValue();
                }
            }));

            vm.listeners.push($scope.$watch(function() { return vm.fieldValue; }, handlerChangeValue, true));
            
            vm.afterInit = function(map) {
                vm.map = map;
                if (vm.multiple && angular.isArray(vm.fieldValue) && vm.fieldValue.length > 1) {
                    map.container.fitToViewport();
                }

                vm.searchControl = map.controls.get('searchControl');
                
                vm.searchControl.events.add('resultselect', function (result) {
                    var index = vm.searchControl.getSelectedIndex();
                    var obj = vm.searchControl.getResultsArray()[index];
                    var street = obj.properties.get('name');
                    vm.searchControlObjCoords = obj.geometry.getCoordinates();
                    !vm.multiple ? vm.fieldValue = null : null;
                    $timeout(function() {saveMarker(vm.searchControlObjCoords)}, 100);
                }, this);
            };
    
            vm.objectCreated = function(geoObj) {
                var coords = geoObj.geometry.getCoordinates()
                getAddressByCoords(coords);
                setZoom(coords);
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

            vm.mapDoubleClick = function(event) {
                vm.searchControl && vm.searchControl.clear() ? vm.searchControl.clear() : null;
                var coords = event.get('coords');
                saveMarker(coords);
            };

            vm.removeItem = function(index) {
                if (vm.multiple) {
                    if (angular.isArray(vm.fieldValue)) {
                        if ( index == vm.fieldValue.length - 1) {
                            vm.searchControl && vm.searchControl.clear() ? 
                                vm.searchControl.clear() : 
                                null;
                        }
                        vm.fieldValue.forEach(function(value, key) {
                            if (key == index) {
                                vm.fieldValue.splice(index, 1);
                            }
                        });
                    }
                } else {
                    vm.fieldValue = '';
                    clearSearchControl();
                }
            }
        };
 
        
        function setZoom(coords) {
            vm.map.setZoom(vm.zoom);
            vm.map.setCenter(coords);
        }

        function clearSearchControl () {
            vm.searchControl && vm.searchControl.clear() ? vm.searchControl.clear() : null;
        }
        
        function getAddressByCoords(coords) {
            ymaps.geocode(coords, {kind: 'house'}).then((response) => {
                var address = response.geoObjects && 
                    response.geoObjects.get(0) && 
                    response.geoObjects.get(0).properties &&
                    response.geoObjects.get(0).properties.get('text') ? response.geoObjects.get(0).properties.get('text') : 'Неизвестный адрес';
                $rootScope.$broadcast('ue-yandex-maps:setAddress', {coords: coords, address: address});
                
                if (vm.searchControl.getRequestString() === null ) {
                    vm.searchControl.state.set('inputValue', address)
                }
            });
        }

        function saveMarker(coords) {
            setZoom(coords);
            if (!vm.readonly) {
                if (vm.multiple) {
                    vm.fieldValue.push(coords);
                } else {
                    if (!vm.fieldValue) {
                        vm.fieldValue = coords;
                    }
                }
            }
        }
        
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
    }
})();