(function() {
    'use strict';

    angular
        .module('cosSearchApp', [
            'cosSearchServices',
            'cosSearchControllers',
            'ngSanitize',
            'ui.bootstrap',
            'ui.select',
            'velirSearchMapper',
            'velirSkip'
        ])
        .constant('apiEndpoints' ,{
            API_BASE: '', //'/api',
            SEARCH_ENDPOINT: 'js/angular/testJson.json'//'/search'
        })
        .config(['$logProvider', function($logProvider) {
            $logProvider.debugEnabled(false);
        }])
        .config(['$compileProvider', function ($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        }])
        .config(['uiSelectConfig', function(uiSelectConfig) {
            uiSelectConfig.theme = 'select2';
        }])
    ;
})();

