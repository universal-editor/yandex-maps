(function() {
  'use strict';

  angular
    .module('ue-yandex-maps')
    .config(LocalizationMessage);

  function LocalizationMessage($translateProvider) {
    'ngInject';
    var config = { };

    var baseConfig = $translateProvider.translations('ru');
    $translateProvider.translations('ru', angular.merge(config, baseConfig));
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.preferredLanguage('ru');
  }

})();
