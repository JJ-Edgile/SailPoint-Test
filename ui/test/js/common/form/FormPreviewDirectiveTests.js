System.register(['test/js/TestInitializer', 'common/form/FormAppModule', 'test/js/common/form/FormPreviewTestData'], function (_export) {
    'use strict';

    var formAppModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormAppModule) {
            formAppModule = _commonFormFormAppModule['default'];
        }, function (_testJsCommonFormFormPreviewTestData) {}],
        execute: function () {

            describe('FormPreviewDirective', function () {
                var formService = undefined,
                    scope = undefined,
                    configService = undefined,
                    $compile = undefined,
                    formJson = undefined,
                    formObject = undefined,
                    element = undefined,
                    configKey = undefined,
                    elementDefinition = '<sp-form-preview sp-config-key="{{ configKey }}">';

                beforeEach(module(formAppModule));

                /* jshint maxparams: 9 */
                beforeEach(inject(function (_$controller_, $rootScope, $q, _$compile_, _formService_, _configService_, formPreviewTestData, Form, FormData) {
                    scope = $rootScope;
                    formService = _formService_;
                    configService = _configService_;
                    $compile = _$compile_;

                    formJson = angular.copy(formPreviewTestData.PREVIEW_FORM_JSON);
                    formObject = {
                        config: new Form(formPreviewTestData.PREVIEW_FORM_JSON),
                        data: new FormData(),
                        error: undefined
                    };
                    configKey = 'whatever';

                    spyOn(formService, 'getPreviewForm').and.returnValue($q.when(formObject));
                    spyOn(configService, 'getConfigValue').and.callFake(function () {
                        return formJson;
                    });
                }));

                function createElement() {
                    scope.configKey = configKey;
                    element = $compile(angular.element(elementDefinition))(scope);
                    scope.$apply();
                }

                it('should call form service with form json from configData', function () {
                    createElement();
                    expect(configService.getConfigValue).toHaveBeenCalledWith(configKey);
                    expect(formService.getPreviewForm).toHaveBeenCalledWith(formJson);
                });

                it('should reload form json when hidden button is clicked', function () {
                    createElement();
                    configService.getConfigValue.calls.reset();
                    formService.getPreviewForm.calls.reset();
                    formJson = 'whateverNewThing';
                    element.find('#spFormPreviewLoadBtn').click();
                    scope.$apply();
                    expect(configService.getConfigValue).toHaveBeenCalledWith(configKey);
                    expect(formService.getPreviewForm).toHaveBeenCalledWith(formJson);
                });

                it('throws if there is no form in the config', function () {
                    formJson = undefined;
                    expect(function () {
                        return createElement();
                    }).toThrow();
                });

                it('throws if config key not provided', function () {
                    configKey = undefined;
                    expect(function () {
                        return createElement();
                    }).toThrow();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0Zvcm1QcmV2aWV3RGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZCQUE2Qiw0Q0FBNEMsVUFBVSxTQUFTO0lBQXhJOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwwQkFBMEI7WUFDaEYsZ0JBQWdCLHlCQUF5QjtXQUMxQyxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBRjdCLFNBQVMsd0JBQXdCLFlBQVc7Z0JBQ3hDLElBQUksY0FBVztvQkFBRSxRQUFLO29CQUFFLGdCQUFhO29CQUFFLFdBQVE7b0JBQUUsV0FBUTtvQkFBRSxhQUFVO29CQUFFLFVBQU87b0JBQUUsWUFBUztvQkFDckYsb0JBQWlCOztnQkFFckIsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLGVBQWUsWUFBWSxJQUFJLFlBQVksZUFBZSxpQkFDMUQscUJBQXFCLE1BQU0sVUFBVTtvQkFDNUQsUUFBUTtvQkFDUixjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsV0FBVzs7b0JBRVgsV0FBVyxRQUFRLEtBQUssb0JBQW9CO29CQUM1QyxhQUFhO3dCQUNULFFBQVEsSUFBSSxLQUFLLG9CQUFvQjt3QkFDckMsTUFBTSxJQUFJO3dCQUNWLE9BQU87O29CQUVYLFlBQVk7O29CQUVaLE1BQU0sYUFBYSxrQkFBa0IsSUFBSSxZQUFZLEdBQUcsS0FBSztvQkFDN0QsTUFBTSxlQUFlLGtCQUFrQixJQUFJLFNBQVMsWUFBQTt3QkFXcEMsT0FYMEM7Ozs7Z0JBRzlELFNBQVMsZ0JBQWdCO29CQUNyQixNQUFNLFlBQVk7b0JBQ2xCLFVBQVUsU0FBUyxRQUFRLFFBQVEsb0JBQW9CO29CQUN2RCxNQUFNOzs7Z0JBR1YsR0FBRywyREFBMkQsWUFBTTtvQkFDaEU7b0JBQ0EsT0FBTyxjQUFjLGdCQUFnQixxQkFBcUI7b0JBQzFELE9BQU8sWUFBWSxnQkFBZ0IscUJBQXFCOzs7Z0JBRzVELEdBQUcseURBQXlELFlBQU07b0JBQzlEO29CQUNBLGNBQWMsZUFBZSxNQUFNO29CQUNuQyxZQUFZLGVBQWUsTUFBTTtvQkFDakMsV0FBVztvQkFDWCxRQUFRLEtBQUsseUJBQXlCO29CQUN0QyxNQUFNO29CQUNOLE9BQU8sY0FBYyxnQkFBZ0IscUJBQXFCO29CQUMxRCxPQUFPLFlBQVksZ0JBQWdCLHFCQUFxQjs7O2dCQUc1RCxHQUFHLDRDQUE0QyxZQUFNO29CQUNqRCxXQUFXO29CQUNYLE9BQU8sWUFBQTt3QkFhUyxPQWJIO3VCQUFpQjs7O2dCQUdsQyxHQUFHLHFDQUFxQyxZQUFNO29CQUMxQyxZQUFZO29CQUNaLE9BQU8sWUFBQTt3QkFlUyxPQWZIO3VCQUFpQjs7Ozs7R0FxQm5DIiwiZmlsZSI6ImNvbW1vbi9mb3JtL0Zvcm1QcmV2aWV3RGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGZvcm1BcHBNb2R1bGUgZnJvbSAnY29tbW9uL2Zvcm0vRm9ybUFwcE1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2Zvcm0vRm9ybVByZXZpZXdUZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdGb3JtUHJldmlld0RpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBmb3JtU2VydmljZSwgc2NvcGUsIGNvbmZpZ1NlcnZpY2UsICRjb21waWxlLCBmb3JtSnNvbiwgZm9ybU9iamVjdCwgZWxlbWVudCwgY29uZmlnS2V5LFxuICAgICAgICBlbGVtZW50RGVmaW5pdGlvbiA9IGA8c3AtZm9ybS1wcmV2aWV3IHNwLWNvbmZpZy1rZXk9XCJ7eyBjb25maWdLZXkgfX1cIj5gO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZm9ybUFwcE1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogOSAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sICRyb290U2NvcGUsICRxLCBfJGNvbXBpbGVfLCBfZm9ybVNlcnZpY2VfLCBfY29uZmlnU2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVByZXZpZXdUZXN0RGF0YSwgRm9ybSwgRm9ybURhdGEpIHtcbiAgICAgICAgc2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICBmb3JtU2VydmljZSA9IF9mb3JtU2VydmljZV87XG4gICAgICAgIGNvbmZpZ1NlcnZpY2UgPSBfY29uZmlnU2VydmljZV87XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcblxuICAgICAgICBmb3JtSnNvbiA9IGFuZ3VsYXIuY29weShmb3JtUHJldmlld1Rlc3REYXRhLlBSRVZJRVdfRk9STV9KU09OKTtcbiAgICAgICAgZm9ybU9iamVjdCA9IHtcbiAgICAgICAgICAgIGNvbmZpZzogbmV3IEZvcm0oZm9ybVByZXZpZXdUZXN0RGF0YS5QUkVWSUVXX0ZPUk1fSlNPTiksXG4gICAgICAgICAgICBkYXRhOiBuZXcgRm9ybURhdGEoKSxcbiAgICAgICAgICAgIGVycm9yOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICAgICAgY29uZmlnS2V5ID0gJ3doYXRldmVyJztcblxuICAgICAgICBzcHlPbihmb3JtU2VydmljZSwgJ2dldFByZXZpZXdGb3JtJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oZm9ybU9iamVjdCkpO1xuICAgICAgICBzcHlPbihjb25maWdTZXJ2aWNlLCAnZ2V0Q29uZmlnVmFsdWUnKS5hbmQuY2FsbEZha2UoKCkgPT4gZm9ybUpzb24pO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIHNjb3BlLmNvbmZpZ0tleSA9IGNvbmZpZ0tleTtcbiAgICAgICAgZWxlbWVudCA9ICRjb21waWxlKGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbikpKHNjb3BlKTtcbiAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgaXQoJ3Nob3VsZCBjYWxsIGZvcm0gc2VydmljZSB3aXRoIGZvcm0ganNvbiBmcm9tIGNvbmZpZ0RhdGEnLCAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnVmFsdWUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNvbmZpZ0tleSk7XG4gICAgICAgIGV4cGVjdChmb3JtU2VydmljZS5nZXRQcmV2aWV3Rm9ybSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoZm9ybUpzb24pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZWxvYWQgZm9ybSBqc29uIHdoZW4gaGlkZGVuIGJ1dHRvbiBpcyBjbGlja2VkJywgKCkgPT4ge1xuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnVmFsdWUuY2FsbHMucmVzZXQoKTtcbiAgICAgICAgZm9ybVNlcnZpY2UuZ2V0UHJldmlld0Zvcm0uY2FsbHMucmVzZXQoKTtcbiAgICAgICAgZm9ybUpzb24gPSAnd2hhdGV2ZXJOZXdUaGluZyc7XG4gICAgICAgIGVsZW1lbnQuZmluZCgnI3NwRm9ybVByZXZpZXdMb2FkQnRuJykuY2xpY2soKTtcbiAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChjb25maWdTZXJ2aWNlLmdldENvbmZpZ1ZhbHVlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjb25maWdLZXkpO1xuICAgICAgICBleHBlY3QoZm9ybVNlcnZpY2UuZ2V0UHJldmlld0Zvcm0pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGZvcm1Kc29uKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlcmUgaXMgbm8gZm9ybSBpbiB0aGUgY29uZmlnJywgKCkgPT4ge1xuICAgICAgICBmb3JtSnNvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUVsZW1lbnQoKSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiBjb25maWcga2V5IG5vdCBwcm92aWRlZCcsICgpID0+IHtcbiAgICAgICAgY29uZmlnS2V5ID0gdW5kZWZpbmVkO1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudCgpKS50b1Rocm93KCk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
