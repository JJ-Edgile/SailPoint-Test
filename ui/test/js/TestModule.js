System.register(['angular', 'angular-translate', 'angular-translate-loader-url', './SuggestTestService', './TestService'], function (_export) {

  /**
   * Create a module that has services that are useful for testing.
   */
  'use strict';

  var angular, SuggestTestService, TestService, testModule;
  return {
    setters: [function (_angular) {
      angular = _angular['default'];
    }, function (_angularTranslate) {}, function (_angularTranslateLoaderUrl) {}, function (_SuggestTestService) {
      SuggestTestService = _SuggestTestService['default'];
    }, function (_TestService) {
      TestService = _TestService['default'];
    }],
    execute: function () {
      testModule = angular.module('sailpoint.test', []);

      testModule.factory('suggestTestService', SuggestTestService);
      testModule.factory('testService', TestService);

      _export('default', testModule.name);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRlc3RNb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsV0FBVyxxQkFBcUIsZ0NBQWdDLHdCQUF3QixrQkFBa0IsVUFBVSxTQUFTOzs7OztFQUE5STs7RUFPRSxJQUFJLFNBQVMsb0JBQW9CLGFBTTdCO0VBTEosT0FBTztJQUNMLFNBQVMsQ0FBQyxVQUFVLFVBQVU7TUFDNUIsVUFBVSxTQUFTO09BQ2xCLFVBQVUsbUJBQW1CLElBQUksVUFBVSw0QkFBNEIsSUFBSSxVQUFVLHFCQUFxQjtNQUMzRyxxQkFBcUIsb0JBQW9CO09BQ3hDLFVBQVUsY0FBYztNQUN6QixjQUFjLGFBQWE7O0lBRTdCLFNBQVMsWUFBWTtNQUhuQixhQUFhLFFBQVEsT0FBTyxrQkFBa0I7O01BRXBELFdBQVcsUUFBUSxzQkFBc0I7TUFDekMsV0FBVyxRQUFRLGVBQWU7O01BTTVCLFFBQVEsV0FKQyxXQUFXOzs7R0FPdkIiLCJmaWxlIjoiVGVzdE1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgJ2FuZ3VsYXItdHJhbnNsYXRlJztcclxuaW1wb3J0ICdhbmd1bGFyLXRyYW5zbGF0ZS1sb2FkZXItdXJsJztcclxuXHJcbmltcG9ydCBTdWdnZXN0VGVzdFNlcnZpY2UgZnJvbSAnLi9TdWdnZXN0VGVzdFNlcnZpY2UnO1xyXG5pbXBvcnQgVGVzdFNlcnZpY2UgZnJvbSAnLi9UZXN0U2VydmljZSc7XHJcblxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG1vZHVsZSB0aGF0IGhhcyBzZXJ2aWNlcyB0aGF0IGFyZSB1c2VmdWwgZm9yIHRlc3RpbmcuXHJcbiAqL1xyXG5jb25zdCB0ZXN0TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3NhaWxwb2ludC50ZXN0JywgW10pO1xyXG5cclxudGVzdE1vZHVsZS5mYWN0b3J5KCdzdWdnZXN0VGVzdFNlcnZpY2UnLCBTdWdnZXN0VGVzdFNlcnZpY2UpO1xyXG50ZXN0TW9kdWxlLmZhY3RvcnkoJ3Rlc3RTZXJ2aWNlJywgVGVzdFNlcnZpY2UpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGVzdE1vZHVsZS5uYW1lOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
