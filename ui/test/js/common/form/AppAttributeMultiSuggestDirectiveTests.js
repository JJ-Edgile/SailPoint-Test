System.register(['test/js/TestInitializer', 'common/form/FormModule', 'test/js/TestModule'], function (_export) {

    /**
     * Unit tests for the spAppAttributeMultiSuggest directive.
     */
    'use strict';

    var formModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('spAppAttributeMultiSuggest', function () {

                var attributes = [{
                    id: '001',
                    attribute: 'Attribute 1',
                    'application-name': 'App1',
                    'application-id': 'A01'
                }, {
                    id: '002',
                    attribute: 'Attribute 2',
                    'application-name': 'App1',
                    'application-id': 'A01'
                }, {
                    id: '003',
                    attribute: 'Attribute 3',
                    'application-name': 'App2',
                    'application-id': 'A02'
                }],
                    applications = [{
                    id: 'A01',
                    displayName: 'App1'
                }, {
                    id: 'A02',
                    displayName: 'App2'
                }],
                    $compile,
                    $timeout,
                    scope,
                    appAttributeSuggestService,
                    objectSuggestService,
                    applicationSuggest,
                    suggestTestService;

                beforeEach(module(testModule, formModule));

                beforeEach(inject(function ($rootScope, _$compile_, _$timeout_, _appAttributeSuggestService_, _objectSuggestService_, _suggestTestService_) {
                    $compile = _$compile_;
                    $timeout = _$timeout_;
                    appAttributeSuggestService = _appAttributeSuggestService_;
                    objectSuggestService = _objectSuggestService_;
                    suggestTestService = _suggestTestService_;

                    scope = $rootScope.$new();
                    scope.attributes = [];
                    // Make ngModel a fake FilterValue with the array on the value property
                    scope.ngModel = {
                        value: []
                    };

                    spyOn(appAttributeSuggestService, 'getAttributes').and.callFake(function () {
                        return attributes;
                    });
                    spyOn(objectSuggestService, 'getObjects').and.callFake(function () {
                        return applications;
                    });

                    applicationSuggest = compile('<sp-object-multi-suggest ' + 'sp-object-multi-suggest-id="applicationSuggest" sp-object-multi-suggest-class="application"' + 'ng-model="ngModel">');
                }));

                /**
                 * Compile the given HTML and return the resulting element.
                 */
                var compile = function (inputTpl) {
                    var el = $compile(angular.element(inputTpl))(scope);
                    scope.$apply();
                    /* The attribute directive has an async function that links the application model */
                    $timeout.flush();
                    angular.element('body').append(el);
                    return el;
                };

                it('should require model', function () {
                    expect(function () {
                        compile('<sp-app-attribute-multi-suggest/>');
                    }).toThrow();
                });

                it('should have the specified id', function () {
                    var el,
                        id = 'someId';
                    el = compile('<sp-app-attribute-multi-suggest sp-app-attribute-multi-suggest-id="' + id + '" ' + 'ng-model="attributes"/>');
                    expect(el.find('#' + id).length).toBe(1);
                });

                it('should have the default id if none specified', function () {
                    var el;
                    el = compile('<sp-app-attribute-multi-suggest ng-model="attributes"/>');
                    expect(el.find('#attributeSuggestField').length).toBe(1);
                });

                it('should call appAttributeSuggestService.getAttributes when searching', function () {
                    var el;
                    el = compile('<sp-app-attribute-multi-suggest ng-model="attributes"/>');
                    suggestTestService.searchByTyping(el, 'foo', scope);
                    expect(appAttributeSuggestService.getAttributes).toHaveBeenCalledWith('foo', 5, undefined, undefined, undefined);
                });

                it('should update model when item selected', function () {
                    var el;
                    el = compile('<sp-app-attribute-multi-suggest ng-model="attributes"/>');
                    suggestTestService.selectSuggestItem(el, 0, scope);
                    expect(scope.attributes.length).toBe(1);
                    expect(scope.attributes[0]).toBe(attributes[0]);
                });

                it('should call backend with application if application selected', function () {
                    var el;
                    el = compile('<sp-app-attribute-multi-suggest ng-model="attributes" ' + 'sp-app-attribute-multi-suggest-application-suggest-id="applicationSuggest"/>');
                    scope.ngModel.value.push(applications[0]);
                    var isolatedScope = el.isolateScope();
                    suggestTestService.searchByTyping(el, 'foo', isolatedScope);
                    expect(appAttributeSuggestService.getAttributes).toHaveBeenCalledWith('foo', 5, [applications[0]], undefined, undefined);
                });

                it('should remove attributes for removed application', function () {
                    compile('<sp-app-attribute-multi-suggest ng-model="attributes" ' + 'sp-app-attribute-multi-suggest-application-suggest-id="applicationSuggest""/>');
                    scope.ngModel.value.push(applications[0]);
                    scope.ngModel.value.push(applications[1]);
                    /* Update applications */
                    scope.$digest();
                    scope.attributes.push(attributes[0]);
                    scope.attributes.push(attributes[2]);
                    /* Update attributes */
                    scope.$digest();
                    scope.ngModel.value.shift();
                    /* Remove an application */
                    scope.$digest();
                    expect(scope.ngModel.value.length).toBe(1);
                    expect(scope.ngModel.value[0]).toBe(applications[1]);
                    expect(scope.attributes.length).toBe(1);
                    expect(scope.attributes[0]).toBe(attributes[2]);
                });

                it('should not remove attributes if removing last application', function () {
                    compile('<sp-app-attribute-multi-suggest ng-model="attributes" ' + 'sp-app-attribute-multi-suggest-application-suggest-id="applicationSuggest"/>');
                    scope.ngModel.value.push(applications[0]);
                    /* Update applications */
                    scope.$digest();
                    scope.attributes.push(attributes[0]);
                    scope.attributes.push(attributes[2]);
                    /* Update attributes */
                    scope.$digest();
                    scope.ngModel.value.shift();
                    /* Remove last application */
                    scope.$digest();
                    expect(scope.ngModel.value.length).toBe(0);
                    expect(scope.attributes.length).toBe(2);
                });

                it('should call search function with extra params if specified', function () {
                    var el;
                    scope.suggestParams = {
                        'this': 'that'
                    };
                    el = compile('<sp-app-attribute-multi-suggest ng-model="attributes" ' + 'sp-app-attribute-multi-suggest-application-suggest-id="applicationSuggest" ' + 'sp-app-attribute-suggest-params="suggestParams"/>');
                    scope.ngModel.value.push(applications[0]);
                    var isolatedScope = el.isolateScope();
                    suggestTestService.searchByTyping(el, 'foo', isolatedScope);
                    expect(appAttributeSuggestService.getAttributes).toHaveBeenCalledWith('foo', 5, [applications[0]], undefined, scope.suggestParams);
                });

                afterEach(function () {
                    angular.element('sp-object-multi-suggest').remove();
                    angular.element('sp-app-attribute-multi-suggest').remove();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0FwcEF0dHJpYnV0ZU11bHRpU3VnZ2VzdERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQkFBMEIsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7SUFLNUc7O0lBRUEsSUFBSSxZQUFZO0lBQ2hCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjtXQUNwQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBUDdCLFNBQVMsOEJBQThCLFlBQVc7O2dCQUU5QyxJQUFJLGFBQWEsQ0FBQztvQkFDVixJQUFJO29CQUNKLFdBQVc7b0JBQ1gsb0JBQW9CO29CQUNwQixrQkFBa0I7bUJBQ25CO29CQUNDLElBQUk7b0JBQ0osV0FBVztvQkFDWCxvQkFBb0I7b0JBQ3BCLGtCQUFrQjttQkFDbkI7b0JBQ0MsSUFBSTtvQkFDSixXQUFXO29CQUNYLG9CQUFvQjtvQkFDcEIsa0JBQWtCOztvQkFFdEIsZUFBZSxDQUFDO29CQUNaLElBQUk7b0JBQ0osYUFBYTttQkFDZDtvQkFDQyxJQUFJO29CQUNKLGFBQWE7O29CQUVqQjtvQkFBVTtvQkFBVTtvQkFDcEI7b0JBQTRCO29CQUFzQjtvQkFBb0I7O2dCQUUxRSxXQUFXLE9BQU8sWUFBWTs7Z0JBRTlCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSxZQUN4Qiw4QkFBOEIsd0JBQXdCLHNCQUFzQjtvQkFDbkcsV0FBVztvQkFDWCxXQUFXO29CQUNYLDZCQUE2QjtvQkFDN0IsdUJBQXVCO29CQUN2QixxQkFBcUI7O29CQUVyQixRQUFRLFdBQVc7b0JBQ25CLE1BQU0sYUFBYTs7b0JBRW5CLE1BQU0sVUFBVTt3QkFDWixPQUFPOzs7b0JBR1gsTUFBTSw0QkFBNEIsaUJBQWlCLElBQUksU0FBUyxZQUFXO3dCQUN2RSxPQUFPOztvQkFFWCxNQUFNLHNCQUFzQixjQUFjLElBQUksU0FBUyxZQUFXO3dCQUM5RCxPQUFPOzs7b0JBR1gscUJBQXFCLFFBQVEsOEJBQ3pCLGdHQUNBOzs7Ozs7Z0JBTVIsSUFBSSxVQUFVLFVBQVMsVUFBVTtvQkFDN0IsSUFBSSxLQUFLLFNBQVMsUUFBUSxRQUFRLFdBQVc7b0JBQzdDLE1BQU07O29CQUVOLFNBQVM7b0JBQ1QsUUFBUSxRQUFRLFFBQVEsT0FBTztvQkFDL0IsT0FBTzs7O2dCQUlYLEdBQUcsd0JBQXdCLFlBQVc7b0JBQ2xDLE9BQU8sWUFBVzt3QkFDZCxRQUFRO3VCQUNUOzs7Z0JBR1AsR0FBRyxnQ0FBZ0MsWUFBVztvQkFDMUMsSUFBSTt3QkFBSSxLQUFLO29CQUNiLEtBQUssUUFBUSx3RUFBd0UsS0FBSyxPQUN0RjtvQkFDSixPQUFPLEdBQUcsS0FBSyxNQUFNLElBQUksUUFBUSxLQUFLOzs7Z0JBRzFDLEdBQUcsZ0RBQWdELFlBQVc7b0JBQzFELElBQUk7b0JBQ0osS0FBSyxRQUFRO29CQUNiLE9BQU8sR0FBRyxLQUFLLDBCQUEwQixRQUFRLEtBQUs7OztnQkFHMUQsR0FBRyx1RUFBdUUsWUFBVztvQkFDakYsSUFBSTtvQkFDSixLQUFLLFFBQVE7b0JBQ2IsbUJBQW1CLGVBQWUsSUFBSSxPQUFPO29CQUM3QyxPQUFPLDJCQUEyQixlQUM3QixxQkFBcUIsT0FBTyxHQUFHLFdBQVcsV0FBVzs7O2dCQUc5RCxHQUFHLDBDQUEwQyxZQUFXO29CQUNwRCxJQUFJO29CQUNKLEtBQUssUUFBUTtvQkFDYixtQkFBbUIsa0JBQWtCLElBQUksR0FBRztvQkFDNUMsT0FBTyxNQUFNLFdBQVcsUUFBUSxLQUFLO29CQUNyQyxPQUFPLE1BQU0sV0FBVyxJQUFJLEtBQUssV0FBVzs7O2dCQUdoRCxHQUFHLGdFQUFnRSxZQUFXO29CQUMxRSxJQUFJO29CQUNKLEtBQUssUUFBUSwyREFDVDtvQkFDSixNQUFNLFFBQVEsTUFBTSxLQUFLLGFBQWE7b0JBQ3RDLElBQUksZ0JBQWdCLEdBQUc7b0JBQ3ZCLG1CQUFtQixlQUFlLElBQUksT0FBTztvQkFDN0MsT0FBTywyQkFBMkIsZUFDN0IscUJBQXFCLE9BQU8sR0FBRyxDQUFDLGFBQWEsS0FBSyxXQUFXOzs7Z0JBR3RFLEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELFFBQVEsMkRBQ0o7b0JBQ0osTUFBTSxRQUFRLE1BQU0sS0FBSyxhQUFhO29CQUN0QyxNQUFNLFFBQVEsTUFBTSxLQUFLLGFBQWE7O29CQUV0QyxNQUFNO29CQUNOLE1BQU0sV0FBVyxLQUFLLFdBQVc7b0JBQ2pDLE1BQU0sV0FBVyxLQUFLLFdBQVc7O29CQUVqQyxNQUFNO29CQUNOLE1BQU0sUUFBUSxNQUFNOztvQkFFcEIsTUFBTTtvQkFDTixPQUFPLE1BQU0sUUFBUSxNQUFNLFFBQVEsS0FBSztvQkFDeEMsT0FBTyxNQUFNLFFBQVEsTUFBTSxJQUFJLEtBQUssYUFBYTtvQkFDakQsT0FBTyxNQUFNLFdBQVcsUUFBUSxLQUFLO29CQUNyQyxPQUFPLE1BQU0sV0FBVyxJQUFJLEtBQUssV0FBVzs7O2dCQUdoRCxHQUFHLDZEQUE2RCxZQUFXO29CQUN2RSxRQUFRLDJEQUNKO29CQUNKLE1BQU0sUUFBUSxNQUFNLEtBQUssYUFBYTs7b0JBRXRDLE1BQU07b0JBQ04sTUFBTSxXQUFXLEtBQUssV0FBVztvQkFDakMsTUFBTSxXQUFXLEtBQUssV0FBVzs7b0JBRWpDLE1BQU07b0JBQ04sTUFBTSxRQUFRLE1BQU07O29CQUVwQixNQUFNO29CQUNOLE9BQU8sTUFBTSxRQUFRLE1BQU0sUUFBUSxLQUFLO29CQUN4QyxPQUFPLE1BQU0sV0FBVyxRQUFRLEtBQUs7OztnQkFHekMsR0FBRyw4REFBOEQsWUFBVztvQkFDeEUsSUFBSTtvQkFDSixNQUFNLGdCQUFnQjt3QkFDbEIsUUFBTTs7b0JBRVYsS0FBSyxRQUFRLDJEQUNULGdGQUNBO29CQUNKLE1BQU0sUUFBUSxNQUFNLEtBQUssYUFBYTtvQkFDdEMsSUFBSSxnQkFBZ0IsR0FBRztvQkFDdkIsbUJBQW1CLGVBQWUsSUFBSSxPQUFPO29CQUM3QyxPQUFPLDJCQUEyQixlQUFlLHFCQUFxQixPQUFPLEdBQUcsQ0FBQyxhQUFhLEtBQUssV0FDL0YsTUFBTTs7O2dCQUdkLFVBQVUsWUFBVztvQkFDakIsUUFBUSxRQUFRLDJCQUEyQjtvQkFDM0MsUUFBUSxRQUFRLGtDQUFrQzs7Ozs7R0FNdkQiLCJmaWxlIjoiY29tbW9uL2Zvcm0vQXBwQXR0cmlidXRlTXVsdGlTdWdnZXN0RGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBmb3JtTW9kdWxlIGZyb20gJ2NvbW1vbi9mb3JtL0Zvcm1Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuLyoqXG4gKiBVbml0IHRlc3RzIGZvciB0aGUgc3BBcHBBdHRyaWJ1dGVNdWx0aVN1Z2dlc3QgZGlyZWN0aXZlLlxuICovXG5kZXNjcmliZSgnc3BBcHBBdHRyaWJ1dGVNdWx0aVN1Z2dlc3QnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBhdHRyaWJ1dGVzID0gW3tcbiAgICAgICAgICAgIGlkOiAnMDAxJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZTogJ0F0dHJpYnV0ZSAxJyxcbiAgICAgICAgICAgICdhcHBsaWNhdGlvbi1uYW1lJzogJ0FwcDEnLFxuICAgICAgICAgICAgJ2FwcGxpY2F0aW9uLWlkJzogJ0EwMSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICcwMDInLFxuICAgICAgICAgICAgYXR0cmlidXRlOiAnQXR0cmlidXRlIDInLFxuICAgICAgICAgICAgJ2FwcGxpY2F0aW9uLW5hbWUnOiAnQXBwMScsXG4gICAgICAgICAgICAnYXBwbGljYXRpb24taWQnOiAnQTAxJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJzAwMycsXG4gICAgICAgICAgICBhdHRyaWJ1dGU6ICdBdHRyaWJ1dGUgMycsXG4gICAgICAgICAgICAnYXBwbGljYXRpb24tbmFtZSc6ICdBcHAyJyxcbiAgICAgICAgICAgICdhcHBsaWNhdGlvbi1pZCc6ICdBMDInXG4gICAgICAgIH1dLFxuICAgICAgICBhcHBsaWNhdGlvbnMgPSBbe1xuICAgICAgICAgICAgaWQ6ICdBMDEnLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdBcHAxJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ0EwMicsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0FwcDInXG4gICAgICAgIH1dLFxuICAgICAgICAkY29tcGlsZSwgJHRpbWVvdXQsIHNjb3BlLFxuICAgICAgICBhcHBBdHRyaWJ1dGVTdWdnZXN0U2VydmljZSwgb2JqZWN0U3VnZ2VzdFNlcnZpY2UsIGFwcGxpY2F0aW9uU3VnZ2VzdCwgc3VnZ2VzdFRlc3RTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgZm9ybU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgXyRjb21waWxlXywgXyR0aW1lb3V0XyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYXBwQXR0cmlidXRlU3VnZ2VzdFNlcnZpY2VfLCBfb2JqZWN0U3VnZ2VzdFNlcnZpY2VfLCBfc3VnZ2VzdFRlc3RTZXJ2aWNlXykge1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICR0aW1lb3V0ID0gXyR0aW1lb3V0XztcbiAgICAgICAgYXBwQXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UgPSBfYXBwQXR0cmlidXRlU3VnZ2VzdFNlcnZpY2VfO1xuICAgICAgICBvYmplY3RTdWdnZXN0U2VydmljZSA9IF9vYmplY3RTdWdnZXN0U2VydmljZV87XG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZSA9IF9zdWdnZXN0VGVzdFNlcnZpY2VfO1xuXG4gICAgICAgIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgIHNjb3BlLmF0dHJpYnV0ZXMgPSBbXTtcbiAgICAgICAgLy8gTWFrZSBuZ01vZGVsIGEgZmFrZSBGaWx0ZXJWYWx1ZSB3aXRoIHRoZSBhcnJheSBvbiB0aGUgdmFsdWUgcHJvcGVydHlcbiAgICAgICAgc2NvcGUubmdNb2RlbCA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIHNweU9uKGFwcEF0dHJpYnV0ZVN1Z2dlc3RTZXJ2aWNlLCAnZ2V0QXR0cmlidXRlcycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBhdHRyaWJ1dGVzO1xuICAgICAgICB9KTtcbiAgICAgICAgc3B5T24ob2JqZWN0U3VnZ2VzdFNlcnZpY2UsICdnZXRPYmplY3RzJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGFwcGxpY2F0aW9ucztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXBwbGljYXRpb25TdWdnZXN0ID0gY29tcGlsZSgnPHNwLW9iamVjdC1tdWx0aS1zdWdnZXN0ICcgK1xuICAgICAgICAgICAgJ3NwLW9iamVjdC1tdWx0aS1zdWdnZXN0LWlkPVwiYXBwbGljYXRpb25TdWdnZXN0XCIgc3Atb2JqZWN0LW11bHRpLXN1Z2dlc3QtY2xhc3M9XCJhcHBsaWNhdGlvblwiJyArXG4gICAgICAgICAgICAnbmctbW9kZWw9XCJuZ01vZGVsXCI+Jyk7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogQ29tcGlsZSB0aGUgZ2l2ZW4gSFRNTCBhbmQgcmV0dXJuIHRoZSByZXN1bHRpbmcgZWxlbWVudC5cbiAgICAgKi9cbiAgICB2YXIgY29tcGlsZSA9IGZ1bmN0aW9uKGlucHV0VHBsKSB7XG4gICAgICAgIHZhciBlbCA9ICRjb21waWxlKGFuZ3VsYXIuZWxlbWVudChpbnB1dFRwbCkpKHNjb3BlKTtcbiAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIC8qIFRoZSBhdHRyaWJ1dGUgZGlyZWN0aXZlIGhhcyBhbiBhc3luYyBmdW5jdGlvbiB0aGF0IGxpbmtzIHRoZSBhcHBsaWNhdGlvbiBtb2RlbCAqL1xuICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKS5hcHBlbmQoZWwpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfTtcblxuXG4gICAgaXQoJ3Nob3VsZCByZXF1aXJlIG1vZGVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbXBpbGUoJzxzcC1hcHAtYXR0cmlidXRlLW11bHRpLXN1Z2dlc3QvPicpO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgdGhlIHNwZWNpZmllZCBpZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWwsIGlkID0gJ3NvbWVJZCc7XG4gICAgICAgIGVsID0gY29tcGlsZSgnPHNwLWFwcC1hdHRyaWJ1dGUtbXVsdGktc3VnZ2VzdCBzcC1hcHAtYXR0cmlidXRlLW11bHRpLXN1Z2dlc3QtaWQ9XCInICsgaWQgKyAnXCIgJyArXG4gICAgICAgICAgICAnbmctbW9kZWw9XCJhdHRyaWJ1dGVzXCIvPicpO1xuICAgICAgICBleHBlY3QoZWwuZmluZCgnIycgKyBpZCkubGVuZ3RoKS50b0JlKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIHRoZSBkZWZhdWx0IGlkIGlmIG5vbmUgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbDtcbiAgICAgICAgZWwgPSBjb21waWxlKCc8c3AtYXBwLWF0dHJpYnV0ZS1tdWx0aS1zdWdnZXN0IG5nLW1vZGVsPVwiYXR0cmlidXRlc1wiLz4nKTtcbiAgICAgICAgZXhwZWN0KGVsLmZpbmQoJyNhdHRyaWJ1dGVTdWdnZXN0RmllbGQnKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgYXBwQXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UuZ2V0QXR0cmlidXRlcyB3aGVuIHNlYXJjaGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWw7XG4gICAgICAgIGVsID0gY29tcGlsZSgnPHNwLWFwcC1hdHRyaWJ1dGUtbXVsdGktc3VnZ2VzdCBuZy1tb2RlbD1cImF0dHJpYnV0ZXNcIi8+Jyk7XG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZS5zZWFyY2hCeVR5cGluZyhlbCwgJ2ZvbycsIHNjb3BlKTtcbiAgICAgICAgZXhwZWN0KGFwcEF0dHJpYnV0ZVN1Z2dlc3RTZXJ2aWNlLmdldEF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2ZvbycsIDUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1cGRhdGUgbW9kZWwgd2hlbiBpdGVtIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbDtcbiAgICAgICAgZWwgPSBjb21waWxlKCc8c3AtYXBwLWF0dHJpYnV0ZS1tdWx0aS1zdWdnZXN0IG5nLW1vZGVsPVwiYXR0cmlidXRlc1wiLz4nKTtcbiAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlLnNlbGVjdFN1Z2dlc3RJdGVtKGVsLCAwLCBzY29wZSk7XG4gICAgICAgIGV4cGVjdChzY29wZS5hdHRyaWJ1dGVzLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLmF0dHJpYnV0ZXNbMF0pLnRvQmUoYXR0cmlidXRlc1swXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgYmFja2VuZCB3aXRoIGFwcGxpY2F0aW9uIGlmIGFwcGxpY2F0aW9uIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbDtcbiAgICAgICAgZWwgPSBjb21waWxlKCc8c3AtYXBwLWF0dHJpYnV0ZS1tdWx0aS1zdWdnZXN0IG5nLW1vZGVsPVwiYXR0cmlidXRlc1wiICcgK1xuICAgICAgICAgICAgJ3NwLWFwcC1hdHRyaWJ1dGUtbXVsdGktc3VnZ2VzdC1hcHBsaWNhdGlvbi1zdWdnZXN0LWlkPVwiYXBwbGljYXRpb25TdWdnZXN0XCIvPicpO1xuICAgICAgICBzY29wZS5uZ01vZGVsLnZhbHVlLnB1c2goYXBwbGljYXRpb25zWzBdKTtcbiAgICAgICAgdmFyIGlzb2xhdGVkU2NvcGUgPSBlbC5pc29sYXRlU2NvcGUoKTtcbiAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlLnNlYXJjaEJ5VHlwaW5nKGVsLCAnZm9vJywgaXNvbGF0ZWRTY29wZSk7XG4gICAgICAgIGV4cGVjdChhcHBBdHRyaWJ1dGVTdWdnZXN0U2VydmljZS5nZXRBdHRyaWJ1dGVzKVxuICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdmb28nLCA1LCBbYXBwbGljYXRpb25zWzBdXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgYXR0cmlidXRlcyBmb3IgcmVtb3ZlZCBhcHBsaWNhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb21waWxlKCc8c3AtYXBwLWF0dHJpYnV0ZS1tdWx0aS1zdWdnZXN0IG5nLW1vZGVsPVwiYXR0cmlidXRlc1wiICcgK1xuICAgICAgICAgICAgJ3NwLWFwcC1hdHRyaWJ1dGUtbXVsdGktc3VnZ2VzdC1hcHBsaWNhdGlvbi1zdWdnZXN0LWlkPVwiYXBwbGljYXRpb25TdWdnZXN0XCJcIi8+Jyk7XG4gICAgICAgIHNjb3BlLm5nTW9kZWwudmFsdWUucHVzaChhcHBsaWNhdGlvbnNbMF0pO1xuICAgICAgICBzY29wZS5uZ01vZGVsLnZhbHVlLnB1c2goYXBwbGljYXRpb25zWzFdKTtcbiAgICAgICAgLyogVXBkYXRlIGFwcGxpY2F0aW9ucyAqL1xuICAgICAgICBzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIHNjb3BlLmF0dHJpYnV0ZXMucHVzaChhdHRyaWJ1dGVzWzBdKTtcbiAgICAgICAgc2NvcGUuYXR0cmlidXRlcy5wdXNoKGF0dHJpYnV0ZXNbMl0pO1xuICAgICAgICAvKiBVcGRhdGUgYXR0cmlidXRlcyAqL1xuICAgICAgICBzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIHNjb3BlLm5nTW9kZWwudmFsdWUuc2hpZnQoKTtcbiAgICAgICAgLyogUmVtb3ZlIGFuIGFwcGxpY2F0aW9uICovXG4gICAgICAgIHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLm5nTW9kZWwudmFsdWUubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICBleHBlY3Qoc2NvcGUubmdNb2RlbC52YWx1ZVswXSkudG9CZShhcHBsaWNhdGlvbnNbMV0pO1xuICAgICAgICBleHBlY3Qoc2NvcGUuYXR0cmlidXRlcy5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgIGV4cGVjdChzY29wZS5hdHRyaWJ1dGVzWzBdKS50b0JlKGF0dHJpYnV0ZXNbMl0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgcmVtb3ZlIGF0dHJpYnV0ZXMgaWYgcmVtb3ZpbmcgbGFzdCBhcHBsaWNhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb21waWxlKCc8c3AtYXBwLWF0dHJpYnV0ZS1tdWx0aS1zdWdnZXN0IG5nLW1vZGVsPVwiYXR0cmlidXRlc1wiICcgK1xuICAgICAgICAgICAgJ3NwLWFwcC1hdHRyaWJ1dGUtbXVsdGktc3VnZ2VzdC1hcHBsaWNhdGlvbi1zdWdnZXN0LWlkPVwiYXBwbGljYXRpb25TdWdnZXN0XCIvPicpO1xuICAgICAgICBzY29wZS5uZ01vZGVsLnZhbHVlLnB1c2goYXBwbGljYXRpb25zWzBdKTtcbiAgICAgICAgLyogVXBkYXRlIGFwcGxpY2F0aW9ucyAqL1xuICAgICAgICBzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIHNjb3BlLmF0dHJpYnV0ZXMucHVzaChhdHRyaWJ1dGVzWzBdKTtcbiAgICAgICAgc2NvcGUuYXR0cmlidXRlcy5wdXNoKGF0dHJpYnV0ZXNbMl0pO1xuICAgICAgICAvKiBVcGRhdGUgYXR0cmlidXRlcyAqL1xuICAgICAgICBzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIHNjb3BlLm5nTW9kZWwudmFsdWUuc2hpZnQoKTtcbiAgICAgICAgLyogUmVtb3ZlIGxhc3QgYXBwbGljYXRpb24gKi9cbiAgICAgICAgc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICBleHBlY3Qoc2NvcGUubmdNb2RlbC52YWx1ZS5sZW5ndGgpLnRvQmUoMCk7XG4gICAgICAgIGV4cGVjdChzY29wZS5hdHRyaWJ1dGVzLmxlbmd0aCkudG9CZSgyKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBzZWFyY2ggZnVuY3Rpb24gd2l0aCBleHRyYSBwYXJhbXMgaWYgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbDtcbiAgICAgICAgc2NvcGUuc3VnZ2VzdFBhcmFtcyA9IHtcbiAgICAgICAgICAgIHRoaXM6ICd0aGF0J1xuICAgICAgICB9O1xuICAgICAgICBlbCA9IGNvbXBpbGUoJzxzcC1hcHAtYXR0cmlidXRlLW11bHRpLXN1Z2dlc3QgbmctbW9kZWw9XCJhdHRyaWJ1dGVzXCIgJyArXG4gICAgICAgICAgICAnc3AtYXBwLWF0dHJpYnV0ZS1tdWx0aS1zdWdnZXN0LWFwcGxpY2F0aW9uLXN1Z2dlc3QtaWQ9XCJhcHBsaWNhdGlvblN1Z2dlc3RcIiAnICtcbiAgICAgICAgICAgICdzcC1hcHAtYXR0cmlidXRlLXN1Z2dlc3QtcGFyYW1zPVwic3VnZ2VzdFBhcmFtc1wiLz4nKTtcbiAgICAgICAgc2NvcGUubmdNb2RlbC52YWx1ZS5wdXNoKGFwcGxpY2F0aW9uc1swXSk7XG4gICAgICAgIHZhciBpc29sYXRlZFNjb3BlID0gZWwuaXNvbGF0ZVNjb3BlKCk7XG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZS5zZWFyY2hCeVR5cGluZyhlbCwgJ2ZvbycsIGlzb2xhdGVkU2NvcGUpO1xuICAgICAgICBleHBlY3QoYXBwQXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UuZ2V0QXR0cmlidXRlcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2ZvbycsIDUsIFthcHBsaWNhdGlvbnNbMF1dLCB1bmRlZmluZWQsXG4gICAgICAgICAgICBzY29wZS5zdWdnZXN0UGFyYW1zKTtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KCdzcC1vYmplY3QtbXVsdGktc3VnZ2VzdCcpLnJlbW92ZSgpO1xuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ3NwLWFwcC1hdHRyaWJ1dGUtbXVsdGktc3VnZ2VzdCcpLnJlbW92ZSgpO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
