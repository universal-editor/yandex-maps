(function() {
    'use strict';
    require('../index.scss');
    if (IS_DEV) {
        require('../bootstrap_inject.scss');
    }
    require('./templates.module.js');
    angular
        .module('ue-yandex-maps', ['yaMap', 'ue-yandex-maps.templates']);

    require('./localizations.config.js');
    var context = require.context('./components', true, /\.js$/);
    context.keys().forEach(context);
})();
