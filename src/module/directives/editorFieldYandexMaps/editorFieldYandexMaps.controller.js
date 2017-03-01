(function () {
    'use strict';

    angular
        .module('universalEditor.YandexMaps')
        .controller('EditorFieldYandexMapsController',EditorFieldYandexMapsController);

    EditorFieldYandexMapsController.$inject = ['$scope','EditEntityStorage','ArrayFieldStorage'];

    function EditorFieldYandexMapsController($scope,EditEntityStorage,ArrayFieldStorage){
        /* jshint validthis: true */
        var vm = this;
        var fieldErrorName;

        if($scope.parentField){
            if($scope.parentFieldIndex){
                fieldErrorName = $scope.parentField + "_" + $scope.parentFieldIndex + "_" + $scope.fieldName;
            } else {
                fieldErrorName = $scope.parentField + "_" + $scope.fieldName;
            }
        } else {
            fieldErrorName = $scope.fieldName;
        }
        vm.fieldName = $scope.field.name;
        vm.fieldValue = '';
        vm.readonly = $scope.field.readonly || false;
        $scope.$parent.vm.error = [];
        vm.parentFieldIndex = $scope.parentFieldIndex || false;
        vm.map = undefined;
        vm.mapParam = {
            height : $scope.field.mapHeight || "400",
            width : $scope.field.mapWidth || "400",
            center : $scope.field.mapCenter || [37.620393,55.765575],
            zoom : $scope.field.mapZoom || 5
        };
        if ($scope.field.hasOwnProperty("multiple") && $scope.field.multiple === true){
            vm.multiple = true;
            vm.fieldValue = [];
            if ($scope.field.multiname || angular.isString($scope.field.multiname)) {
                vm.multiname = ('' + $scope.field.multiname) || "value";
            }
        } else {
            vm.multiple = false;
            vm.fieldValue = '';
        }

        if(vm.parentFieldIndex){
            if(vm.multiple){
                vm.fieldValue = [];
                angular.forEach(ArrayFieldStorage.getFieldValue($scope.parentField,$scope.parentFieldIndex,$scope.field.name), function (item) {
                    if (vm.multiname) {
                        vm.fieldValue.push(item[vm.multiname]);
                    } else {
                        vm.fieldValue.push(item);
                    }
                });
            } else {
                vm.fieldValue = ArrayFieldStorage.getFieldValue($scope.parentField,$scope.parentFieldIndex,$scope.field.name) || vm.fieldValue;
            }
        }

        EditEntityStorage.addFieldController(this);

       



        vm.afterInit = function (map) {
            vm.map = map;
        };

        vm.mapDoubleClick = function (event) {
            var coords = event.get('coords');
            if(vm.multiple){
                vm.fieldValue.push(coords);
            } else {
                if(!vm.fieldValue){
                    vm.fieldValue = coords;
                }
            }
        };

        $scope.$on('editor:entity_loaded', function (event, data) {
            if(!$scope.parentField){
                if(!vm.multiple){
                    vm.fieldValue = data[$scope.field.name] ? data[$scope.field.name].split(',') : '';
                } else if (vm.multiname) {
                    vm.fieldValue = [];
                    angular.forEach(data[$scope.field.name], function (item) {
                        vm.fieldValue.push(item[vm.multiname].split(','));
                    });
                } else {
                    vm.fieldValue = [];
                    angular.forEach(data[$scope.field.name], function (item) {
                        vm.fieldValue.push(item.split(','));
                    });
                }
            } else {
                if(!vm.multiple){
                    vm.fieldValue = data[$scope.parentField][$scope.field.name] ?
                        data[$scope.parentField][$scope.field.name].split(',') : '';
                } else if (vm.multiname) {
                    vm.fieldValue = [];
                    angular.forEach(data[$scope.parentField][$scope.field.name], function (item) {
                        vm.fieldValue.push(item[vm.multiname].split(','));
                    });
                } else {
                    vm.fieldValue = [];
                    angular.forEach(data[$scope.parentField][$scope.field.name], function (item) {
                        vm.fieldValue.push(item.split(','));
                    });
                }
            }
        });

        /*
         * При обновлении / создании сущности может быть получена ошибка.
         * В таком случае происходит броадкаст следующего события.
         * Название события генерируется сервисом RestApiService.
         */

        $scope.$on("editor:api_error_field_"+ fieldErrorName, function (event,data) {
            if(angular.isArray(data)){
                angular.forEach(data, function (error) {
                    if($scope.$parent.vm.error.indexOf(error) < 0){
                        $scope.$parent.vm.error.push(error);
                    }
                });
            } else {
                if($scope.$parent.vm.error.indexOf(data) < 0){
                    $scope.$parent.vm.error.push(data);
                }
            }
        });

        /*
         * При удалении директивы она должна отправлять запрос в EditEntityStorage
         * чтобы последний удалил её из списка отслеживаемых полей.
         */

        $scope.$on('$destroy', function () {
            EditEntityStorage.deleteFieldController(vm);
            if(vm.parentFieldIndex){
                ArrayFieldStorage.fieldDestroy($scope.parentField,$scope.parentFieldIndex,$scope.field.name,vm.fieldValue);
            }
        });

        /* Очистка массива ошибок при внесении пользователем изменений в поле */

        $scope.$watch(function () {
            return vm.fieldValue;
        }, function () {
            $scope.$parent.vm.error = [];
        },true);
    }
})();