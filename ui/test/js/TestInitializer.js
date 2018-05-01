System.register(['angular', 'angular-mocks', 'babel-polyfill', 'common/i18n/i18nModule'], function (_export) {
  // File to hold common imports and test initialization things.

  /**
   * Create a local translateProvider for testing purposes.
   * This will return the messageKey instead of the translation
   */
  'use strict';

  var angular, i18nModule;
  return {
    setters: [function (_angular) {
      angular = _angular['default'];
    }, function (_angularMocks) {}, function (_babelPolyfill) {}, function (_commonI18nI18nModule) {
      i18nModule = _commonI18nI18nModule['default'];
    }],
    execute: function () {
      angular.module(i18nModule).config(["$translateProvider", function ($translateProvider) {
        $translateProvider.translations('en', {});
        $translateProvider.preferredLanguage('en');
      }]);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRlc3RJbml0aWFsaXplci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQyxXQUFXLGlCQUFpQixrQkFBa0IsMkJBQTJCLFVBQVUsU0FBUzs7Ozs7OztFQU8zRzs7RUFFQSxJQUFJLFNBQVM7RUFDYixPQUFPO0lBQ0wsU0FBUyxDQUFDLFVBQVUsVUFBVTtNQUM1QixVQUFVLFNBQVM7T0FDbEIsVUFBVSxlQUFlLElBQUksVUFBVSxnQkFBZ0IsSUFBSSxVQUFVLHVCQUF1QjtNQUM3RixhQUFhLHNCQUFzQjs7SUFFckMsU0FBUyxZQUFZO01BSnpCLFFBQVEsT0FBTyxZQUNmLDhCQUFPLFVBQVMsb0JBQW9CO1FBQ2hDLG1CQUFtQixhQUFhLE1BQU07UUFDdEMsbUJBQW1CLGtCQUFrQjs7OztHQVF0QyIsImZpbGUiOiJUZXN0SW5pdGlhbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaWxlIHRvIGhvbGQgY29tbW9uIGltcG9ydHMgYW5kIHRlc3QgaW5pdGlhbGl6YXRpb24gdGhpbmdzLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCAnYW5ndWxhci1tb2Nrcyc7XG5pbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcblxuaW1wb3J0IGkxOG5Nb2R1bGUgZnJvbSAnY29tbW9uL2kxOG4vaTE4bk1vZHVsZSc7XG5cbi8qKlxuICogQ3JlYXRlIGEgbG9jYWwgdHJhbnNsYXRlUHJvdmlkZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMuXG4gKiBUaGlzIHdpbGwgcmV0dXJuIHRoZSBtZXNzYWdlS2V5IGluc3RlYWQgb2YgdGhlIHRyYW5zbGF0aW9uXG4gKi9cbmFuZ3VsYXIubW9kdWxlKGkxOG5Nb2R1bGUpLlxuY29uZmlnKGZ1bmN0aW9uKCR0cmFuc2xhdGVQcm92aWRlcikge1xuICAgICR0cmFuc2xhdGVQcm92aWRlci50cmFuc2xhdGlvbnMoJ2VuJywge30pO1xuICAgICR0cmFuc2xhdGVQcm92aWRlci5wcmVmZXJyZWRMYW5ndWFnZSgnZW4nKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
