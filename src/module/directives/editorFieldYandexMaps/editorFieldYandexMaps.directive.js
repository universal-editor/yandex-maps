(function () {
    'use strict';

    /**
     * @desc Map field.
     * @example <div editor-field-yandex-maps=""></div>
     */
    angular
        .module('universalEditor.YandexMaps')
        .directive('editorFieldYandexMaps',editorFieldYandexMaps);

    editorFieldYandexMaps.$inject = ['$templateCache'];

    function editorFieldYandexMaps($templateCache){
        return {
            restrict : 'A',
            replace : true,
            scope : true,
            template : $templateCache.get('module/directives/editorFieldYandexMaps/editorFieldYandexMaps.html'),
            controller: 'EditorFieldYandexMapsController',
            controllerAs : 'vm',
            link : link
        };

        function link(scope, elem, attrs, ctrl){
            elem.on('$destroy', function () {
                scope.$destroy();
            });
        }
    }
})();