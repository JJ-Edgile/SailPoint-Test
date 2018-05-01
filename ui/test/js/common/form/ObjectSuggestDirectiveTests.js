System.register(['test/js/TestInitializer', 'common/form/FormModule', 'test/js/TestModule'], function (_export) {

    /**
     * Unit tests for the spObjectSuggest directive.
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
            describe('spObjectSuggest', function () {

                var objects = [{
                    displayName: 'Accounting General Access - IT',
                    id: '2c908a854d244cf6014d244e7a5c0494',
                    name: 'Accounting General Access - IT'
                }, {
                    displayName: 'Accounts Payable Access - IT',
                    id: '2c908a854d244cf6014d244e7a870495',
                    name: 'Accounts Payable Access - IT'
                }, {
                    displayName: 'Accounts Payable Approver',
                    id: '2c908a854d244cf6014d244e9195052b',
                    name: 'Accounts Payable Approver'
                }],
                    simpleSuggest = '<sp-object-suggest ' + 'ng-model="selectedObject"  ' + 'sp-object-suggest-class="sailpoint.object.Bundle"' + 'sp-object-suggest-id="suggest-id"/>',
                    simpleSuggestAllowedValues = '<sp-object-suggest ' + 'sp-object-suggest-allowed-values="getObjects()" ' + 'ng-model="selectedObject"  ' + 'sp-object-suggest-id="suggest-id"/>',
                    $compile,
                    scope,
                    objectSuggestService,
                    suggestTestService,
                    $templateCache;

                beforeEach(module(formModule, testModule));

                /**
                 * Setup the tests.
                 */
                beforeEach(inject(function ($q, $rootScope, _$templateCache_, _objectSuggestService_, _suggestTestService_, _$compile_) {

                    /**
                     * Return a promise that resolves to the objects list.
                     */
                    var returnObjects = function () {
                        return $q.when(objects);
                    };

                    // Save our dependencies for later use.
                    $compile = _$compile_;
                    $templateCache = _$templateCache_;
                    objectSuggestService = _objectSuggestService_;
                    suggestTestService = _suggestTestService_;

                    // Setup the scope to have the getObjects() function and a selected object.
                    scope = $rootScope;
                    scope.getObjects = function () {
                        return objects;
                    };
                    scope.selectedObject = null;

                    // Mock the objectSuggestService to return our objects.
                    spyOn(objectSuggestService, 'getObjects').and.callFake(returnObjects);
                }));

                /**
                 * Compile the given HTML and return the resulting element.
                 */
                var compile = function (inputTpl) {
                    var el = $compile(angular.element(inputTpl))(scope);
                    scope.$apply();
                    return el;
                };

                it('fails with no ng-model attribute', function () {
                    var elt = '<sp-object-suggest  sp-object-suggest-id="suggest-id"/>';
                    expect(function () {
                        compile(elt);
                    }).toThrow();
                });

                it('fails if class and sp-object-suggest-allowed-values are not specified', function () {
                    var elt = '<sp-object-suggest sp-object-suggest-id="suggest-id" ng-model="selectedObject" />';
                    expect(function () {
                        compile(elt);
                    }).toThrow();
                });

                it('fails if sp-object-suggest-id is not specified', function () {
                    var elt = '<sp-object-suggest ng-model="selectedObject" />';
                    expect(function () {
                        compile(elt);
                    }).toThrow();
                });

                it('fails if context and suggest-id are not specified', function () {
                    var elt = '<sp-object-suggest  sp-object-suggest-class="sailpoint.object.Identity" ' + 'ng-model="selectedObject" sp-object-suggest-id="suggest-id"/>';
                    expect(function () {
                        compile(elt);
                    }).toThrow();
                });

                it('fails if context is not specified', function () {
                    var elt = '<sp-object-suggest sp-object-suggest-class="sailpoint.object.Identity" ' + 'ng-model="selectedObject" sp-object-suggest-lookup-id="testId" sp-object-suggest-id="suggest-id"/>';
                    expect(function () {
                        compile(elt);
                    }).toThrow();
                });

                it('fails if context is not specified', function () {
                    var elt = '<sp-object-suggest sp-object-suggest-class="sailpoint.object.Identity" ' + 'ng-model="selectedObject" sp-object-suggest-context="context" sp-object-suggest-id="suggest-id"/>';
                    expect(function () {
                        compile(elt);
                    }).toThrow();
                });

                it('succeeds if context and suggest-lookup-id are specified', function () {
                    var elt = '<sp-object-suggest sp-object-suggest-class="sailpoint.object.Identity" ' + 'ng-model="selectedObject" sp-object-suggest-lookup-id="testId" sp-object-suggest-context="context" ' + 'sp-object-suggest-id="suggest-id"/>';
                    expect(function () {
                        compile(elt);
                    }).not.toThrow();
                });

                it('sets the object list to the sp-object-suggest attribute', function () {
                    var el = compile(simpleSuggest);
                    var isolatedScope = el.isolateScope();
                    expect(isolatedScope.objectList).toBeDefined();
                });

                it('sets extraParams to object if specified', function () {
                    scope.objectSuggestParams = { workgroup: 'someworkgroup' };
                    var elt = '<sp-object-suggest sp-object-suggest-class="sailpoint.object.Identity" ' + 'ng-model="selectedObject" sp-object-suggest-lookup-id="testId" sp-object-suggest-context="context" ' + 'sp-object-suggest-id="suggest-id" ' + 'sp-object-suggest-params="objectSuggestParams"/>';

                    var el = compile(elt);
                    var isolatedScope = el.isolateScope();
                    expect(isolatedScope.extraParams).toEqual(scope.objectSuggestParams);
                });

                it('defaults to a limit of 5 results', function () {
                    var el = compile(simpleSuggest);
                    var isolatedScope = el.isolateScope();
                    expect(isolatedScope.spObjectSuggestLimit).toEqual(5);
                });

                it('allows specifying a limit', function () {
                    var elt = '<sp-object-suggest ' + '     sp-object-suggest-allowed-values="getObjects()"' + '     sp-object-suggest-id="suggest-id"' + '     sp-object-suggest-limit="25"' + '     ng-model="selectedObject" />',
                        el = compile(elt);
                    var isolatedScope = el.isolateScope();
                    expect(isolatedScope.spObjectSuggestLimit).toEqual('25');
                });

                it('defaults editable to false if not specified', function () {
                    var el = compile(simpleSuggest);
                    var isolatedScope = el.isolateScope();
                    expect(isolatedScope.editable).toBeFalsy();
                });

                it('allows specifying an itemTemplate', function () {
                    $templateCache.put('template/my-suggest-item.html', 'test test test');
                    var elt = '<sp-object-suggest ' + '     sp-object-suggest-allowed-values="getObjects()"' + '     sp-object-suggest-id="suggest-id"' + '     sp-object-suggest-limit="25"' + '     sp-object-suggest-item-template="template/my-suggest-item.html"' + '     ng-model="selectedObject" />',
                        el = compile(elt);
                    var isolatedScope = el.isolateScope();
                    expect(isolatedScope.spObjectSuggestItemTemplate).toEqual('template/my-suggest-item.html');
                });

                it('fails compilation with an invalid item template', function () {
                    var elt = '<sp-object-suggest ' + '     sp-object-suggest-allowed-values="getObjects()"' + '     sp-object-suggest-id="suggest-id"' + '     sp-object-suggest-limit="25"' + '     sp-object-suggest-item-template="template/undefined-suggest.html"' + '     ng-model="selectedObject" />';
                    expect(function () {
                        compile(elt);
                    }).toThrow();
                });

                it('allows specifying a template', function () {
                    $templateCache.put('template/my-suggest.html', 'test test test');
                    var elt = '<sp-object-suggest ' + '     sp-object-suggest-allowed-values="getObjects()"' + '     sp-object-suggest-id="suggest-id"' + '     sp-object-suggest-limit="25"' + '     sp-object-suggest-item-template="template/my-suggest.html"' + '     ng-model="selectedObject" />',
                        el = compile(elt);
                    var isolatedScope = el.isolateScope();
                    expect(isolatedScope.spObjectSuggestItemTemplate).toEqual('template/my-suggest.html');
                });

                it('fails compilation with an invalid template', function () {
                    var elt = '<sp-object-suggest ' + '     sp-object-suggest-allowed-values="getObjects()"' + '     sp-object-suggest-id="suggest-id"' + '     sp-object-suggest-limit="25"' + '     sp-object-suggest-template="template/undefined-suggest.html"' + '     ng-model="selectedObject" />';
                    expect(function () {
                        compile(elt);
                    }).toThrow();
                });

                it('sets objectList to searchObjects() if a class is specified', function () {
                    var elt = '<sp-object-suggest ' + '     sp-object-suggest-id="suggest-id"' + '     sp-object-suggest-class="sailpoint.object.Bundle"' + '     ng-model="selectedObject" />',
                        el = compile(elt);
                    var isolatedScope = el.isolateScope();
                    expect(isolatedScope.objectList).toBeDefined();
                    expect(isolatedScope.spObjectSuggestClass).toEqual('sailpoint.object.Bundle');
                });

                it('defaults to required=false', function () {
                    var el = compile(simpleSuggest);
                    var isolatedScope = el.isolateScope();
                    expect(isolatedScope.ngRequired).toBeFalsy();
                });

                it('sets required using required without a value', function () {
                    var elt = '<sp-object-suggest ' + '     sp-object-suggest-allowed-values="getObjects()"' + '     sp-object-suggest-id="suggest-id"' + '     ng-required="true"' + '     ng-model="selectedObject" />',
                        el = compile(elt);
                    var isolatedScope = el.isolateScope();
                    expect(isolatedScope.ngRequired).toBeTruthy();
                });

                it('sets required using the ng-required attribute', function () {
                    var elt = '<sp-object-suggest ' + '     sp-object-suggest-allowed-values="getObjects()"' + '     sp-object-suggest-id="suggest-id"' + '     ng-required="isThisRequired"' + '     ng-model="selectedObject" />',
                        el;

                    scope.isThisRequired = true;
                    el = compile(elt);
                    var isolatedScope = el.isolateScope();
                    expect(isolatedScope.ngRequired).toBeTruthy();
                });

                it('does not call objectSuggestService if not querying', function () {
                    compile(simpleSuggest);
                    scope.$digest();
                    expect(objectSuggestService.getObjects).not.toHaveBeenCalled();
                });

                it('does not call objectSuggestService when allowed values specified', function () {
                    var el = compile(simpleSuggestAllowedValues);
                    suggestTestService.searchByTyping(el, 'acc', scope);
                    expect(objectSuggestService.getObjects).not.toHaveBeenCalled();
                });

                it('calls objectSuggestService when querying if class is specified', function () {
                    var elt = '<sp-object-suggest' + '     sp-object-suggest-id="suggest-id"' + '     sp-object-suggest-class="sailpoint.object.Bundle"' + '     sp-object-suggest-filter="foo" ' + '     ng-model="selectedObject" />',
                        el = compile(elt),
                        args;
                    suggestTestService.searchByTyping(el, 'acc', scope);
                    expect(objectSuggestService.getObjects).toHaveBeenCalled();

                    args = objectSuggestService.getObjects.calls.mostRecent().args;
                    expect(args[0]).toEqual('sailpoint.object.Bundle');
                    expect(args[1]).toEqual('acc');
                    expect(args[2]).toEqual(5);
                    expect(args[5]).toEqual('foo');
                });

                it('shows the object list when querying', function () {
                    var el = compile(simpleSuggest),
                        items;
                    suggestTestService.searchByTyping(el, 'acc', scope);
                    items = suggestTestService.getSuggestItems(el, scope);
                    expect(items.length).toEqual(3);
                });

                describe('clicking the drop-down arrow', function () {
                    var el;

                    // All of these tests use the same type of suggest.
                    beforeEach(function () {
                        el = compile(simpleSuggest);
                    });

                    it('shows the object list', function () {
                        var items;
                        suggestTestService.clickDropdownArrow(el, scope);
                        items = suggestTestService.getSuggestItems(el, scope);
                        expect(items.length).toEqual(3);
                    });

                    it('clears the input', function () {
                        var input = el.find('input');
                        input.val('foo');
                        suggestTestService.clickDropdownArrow(el, scope);
                        expect(input.val()).toEqual('');
                    });
                });

                describe('object list', function () {
                    var el;

                    // All of these tests use the same type of suggest.
                    beforeEach(function () {
                        el = compile(simpleSuggest);
                    });

                    it('shows the object display name', function () {
                        var item = suggestTestService.getSuggestItem(el, 0, scope),
                            nameEl = item.find('span')[0];
                        expect(nameEl.textContent).toEqual('Accounting General Access - IT');
                    });
                });

                describe('selecting an object', function () {
                    var el;

                    // All of these tests use the same type of suggest.
                    beforeEach(function () {
                        el = compile(simpleSuggest);
                    });

                    it('sets the model value', function () {
                        suggestTestService.selectSuggestItem(el, 0, scope);
                        expect(scope.selectedObject).toBe(objects[0]);
                    });

                    it('hides the object list', function () {
                        suggestTestService.selectSuggestItem(el, 0, scope);
                        expect(suggestTestService.isDropdownOpen(el)).toBeFalsy();
                    });

                    it('puts the display name of the object in the input', function () {
                        var input;
                        suggestTestService.selectSuggestItem(el, 0, scope);
                        input = el.find('input');
                        expect(input.val()).toEqual('Accounting General Access - IT');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL09iamVjdFN1Z2dlc3REaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMEJBQTBCLHVCQUF1QixVQUFVLFNBQVM7Ozs7O0lBSzVHOztJQUVBLElBQUksWUFBWTtJQUNoQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7V0FDcEMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTtZQVA3QixTQUFTLG1CQUFtQixZQUFXOztnQkFFbkMsSUFBSSxVQUFVLENBQUM7b0JBQ1AsYUFBYTtvQkFDYixJQUFJO29CQUNKLE1BQU07bUJBQ1A7b0JBQ0MsYUFBYTtvQkFDYixJQUFJO29CQUNKLE1BQU07bUJBQ1A7b0JBQ0MsYUFBYTtvQkFDYixJQUFJO29CQUNKLE1BQU07O29CQUVWLGdCQUFnQix3QkFDWixnQ0FDQSxzREFDQTtvQkFDSiw2QkFBNkIsd0JBQ3pCLHFEQUNBLGdDQUNBO29CQUNKO29CQUFVO29CQUFPO29CQUFzQjtvQkFBb0I7O2dCQUcvRCxXQUFXLE9BQU8sWUFBWTs7Ozs7Z0JBSzlCLFdBQVcsT0FBTyxVQUFTLElBQUksWUFBWSxrQkFBa0Isd0JBQ2xDLHNCQUFzQixZQUFZOzs7OztvQkFLekQsSUFBSSxnQkFBZ0IsWUFBVzt3QkFDM0IsT0FBTyxHQUFHLEtBQUs7Ozs7b0JBSW5CLFdBQVc7b0JBQ1gsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLHFCQUFxQjs7O29CQUdyQixRQUFRO29CQUNSLE1BQU0sYUFBYSxZQUFXO3dCQUMxQixPQUFPOztvQkFFWCxNQUFNLGlCQUFpQjs7O29CQUd2QixNQUFNLHNCQUFzQixjQUFjLElBQUksU0FBUzs7Ozs7O2dCQU0zRCxJQUFJLFVBQVUsVUFBUyxVQUFVO29CQUM3QixJQUFJLEtBQUssU0FBUyxRQUFR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Rzt3QkFDNUMsT0FBTyxtQkFBbUIsZUFBZSxLQUFLOzs7b0JBR2xELEdBQUcsb0RBQW9ELFlBQVc7d0JBQzlELElBQUk7d0JBQ0osbUJBQW1CLGtCQUFrQixJQUFJLEdBQUc7d0JBQzVDLFFBQVEsR0FBRyxLQUFLO3dCQUNoQixPQUFPLE1BQU0sT0FBTyxRQUFROzs7Ozs7R0FwQnJDIiwiZmlsZSI6ImNvbW1vbi9mb3JtL09iamVjdFN1Z2dlc3REaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGZvcm1Nb2R1bGUgZnJvbSAnY29tbW9uL2Zvcm0vRm9ybU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG4vKipcbiAqIFVuaXQgdGVzdHMgZm9yIHRoZSBzcE9iamVjdFN1Z2dlc3QgZGlyZWN0aXZlLlxuICovXG5kZXNjcmliZSgnc3BPYmplY3RTdWdnZXN0JywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgb2JqZWN0cyA9IFt7XG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0FjY291bnRpbmcgR2VuZXJhbCBBY2Nlc3MgLSBJVCcsXG4gICAgICAgICAgICBpZDogJzJjOTA4YTg1NGQyNDRjZjYwMTRkMjQ0ZTdhNWMwNDk0JyxcbiAgICAgICAgICAgIG5hbWU6ICdBY2NvdW50aW5nIEdlbmVyYWwgQWNjZXNzIC0gSVQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQWNjb3VudHMgUGF5YWJsZSBBY2Nlc3MgLSBJVCcsXG4gICAgICAgICAgICBpZDogJzJjOTA4YTg1NGQyNDRjZjYwMTRkMjQ0ZTdhODcwNDk1JyxcbiAgICAgICAgICAgIG5hbWU6ICdBY2NvdW50cyBQYXlhYmxlIEFjY2VzcyAtIElUJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0FjY291bnRzIFBheWFibGUgQXBwcm92ZXInLFxuICAgICAgICAgICAgaWQ6ICcyYzkwOGE4NTRkMjQ0Y2Y2MDE0ZDI0NGU5MTk1MDUyYicsXG4gICAgICAgICAgICBuYW1lOiAnQWNjb3VudHMgUGF5YWJsZSBBcHByb3ZlcidcbiAgICAgICAgfV0sXG4gICAgICAgIHNpbXBsZVN1Z2dlc3QgPSAnPHNwLW9iamVjdC1zdWdnZXN0ICcgK1xuICAgICAgICAgICAgJ25nLW1vZGVsPVwic2VsZWN0ZWRPYmplY3RcIiAgJyArXG4gICAgICAgICAgICAnc3Atb2JqZWN0LXN1Z2dlc3QtY2xhc3M9XCJzYWlscG9pbnQub2JqZWN0LkJ1bmRsZVwiJyArXG4gICAgICAgICAgICAnc3Atb2JqZWN0LXN1Z2dlc3QtaWQ9XCJzdWdnZXN0LWlkXCIvPicsXG4gICAgICAgIHNpbXBsZVN1Z2dlc3RBbGxvd2VkVmFsdWVzID0gJzxzcC1vYmplY3Qtc3VnZ2VzdCAnICtcbiAgICAgICAgICAgICdzcC1vYmplY3Qtc3VnZ2VzdC1hbGxvd2VkLXZhbHVlcz1cImdldE9iamVjdHMoKVwiICcgK1xuICAgICAgICAgICAgJ25nLW1vZGVsPVwic2VsZWN0ZWRPYmplY3RcIiAgJyArXG4gICAgICAgICAgICAnc3Atb2JqZWN0LXN1Z2dlc3QtaWQ9XCJzdWdnZXN0LWlkXCIvPicsXG4gICAgICAgICRjb21waWxlLCBzY29wZSwgb2JqZWN0U3VnZ2VzdFNlcnZpY2UsIHN1Z2dlc3RUZXN0U2VydmljZSwgJHRlbXBsYXRlQ2FjaGU7XG5cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZvcm1Nb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSB0ZXN0cy5cbiAgICAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcSwgJHJvb3RTY29wZSwgXyR0ZW1wbGF0ZUNhY2hlXywgX29iamVjdFN1Z2dlc3RTZXJ2aWNlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc3VnZ2VzdFRlc3RTZXJ2aWNlXywgXyRjb21waWxlXykge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIG9iamVjdHMgbGlzdC5cbiAgICAgICAgICovXG4gICAgICAgIHZhciByZXR1cm5PYmplY3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJHEud2hlbihvYmplY3RzKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTYXZlIG91ciBkZXBlbmRlbmNpZXMgZm9yIGxhdGVyIHVzZS5cbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkdGVtcGxhdGVDYWNoZSA9IF8kdGVtcGxhdGVDYWNoZV87XG4gICAgICAgIG9iamVjdFN1Z2dlc3RTZXJ2aWNlID0gX29iamVjdFN1Z2dlc3RTZXJ2aWNlXztcbiAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlID0gX3N1Z2dlc3RUZXN0U2VydmljZV87XG5cbiAgICAgICAgLy8gU2V0dXAgdGhlIHNjb3BlIHRvIGhhdmUgdGhlIGdldE9iamVjdHMoKSBmdW5jdGlvbiBhbmQgYSBzZWxlY3RlZCBvYmplY3QuXG4gICAgICAgIHNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgc2NvcGUuZ2V0T2JqZWN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdHM7XG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLnNlbGVjdGVkT2JqZWN0ID0gbnVsbDtcblxuICAgICAgICAvLyBNb2NrIHRoZSBvYmplY3RTdWdnZXN0U2VydmljZSB0byByZXR1cm4gb3VyIG9iamVjdHMuXG4gICAgICAgIHNweU9uKG9iamVjdFN1Z2dlc3RTZXJ2aWNlLCAnZ2V0T2JqZWN0cycpLmFuZC5jYWxsRmFrZShyZXR1cm5PYmplY3RzKTtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBDb21waWxlIHRoZSBnaXZlbiBIVE1MIGFuZCByZXR1cm4gdGhlIHJlc3VsdGluZyBlbGVtZW50LlxuICAgICAqL1xuICAgIHZhciBjb21waWxlID0gZnVuY3Rpb24oaW5wdXRUcGwpIHtcbiAgICAgICAgdmFyIGVsID0gJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KGlucHV0VHBsKSkoc2NvcGUpO1xuICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH07XG5cbiAgICBpdCgnZmFpbHMgd2l0aCBubyBuZy1tb2RlbCBhdHRyaWJ1dGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsdCA9ICc8c3Atb2JqZWN0LXN1Z2dlc3QgIHNwLW9iamVjdC1zdWdnZXN0LWlkPVwic3VnZ2VzdC1pZFwiLz4nO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGNvbXBpbGUoZWx0KTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZhaWxzIGlmIGNsYXNzIGFuZCBzcC1vYmplY3Qtc3VnZ2VzdC1hbGxvd2VkLXZhbHVlcyBhcmUgbm90IHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWx0ID0gJzxzcC1vYmplY3Qtc3VnZ2VzdCBzcC1vYmplY3Qtc3VnZ2VzdC1pZD1cInN1Z2dlc3QtaWRcIiBuZy1tb2RlbD1cInNlbGVjdGVkT2JqZWN0XCIgLz4nO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGNvbXBpbGUoZWx0KTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZhaWxzIGlmIHNwLW9iamVjdC1zdWdnZXN0LWlkIGlzIG5vdCBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsdCA9ICc8c3Atb2JqZWN0LXN1Z2dlc3QgbmctbW9kZWw9XCJzZWxlY3RlZE9iamVjdFwiIC8+JztcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjb21waWxlKGVsdCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdmYWlscyBpZiBjb250ZXh0IGFuZCBzdWdnZXN0LWlkIGFyZSBub3Qgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbHQgPSAnPHNwLW9iamVjdC1zdWdnZXN0ICBzcC1vYmplY3Qtc3VnZ2VzdC1jbGFzcz1cInNhaWxwb2ludC5vYmplY3QuSWRlbnRpdHlcIiAnICtcbiAgICAgICAgICAgICduZy1tb2RlbD1cInNlbGVjdGVkT2JqZWN0XCIgc3Atb2JqZWN0LXN1Z2dlc3QtaWQ9XCJzdWdnZXN0LWlkXCIvPic7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY29tcGlsZShlbHQpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmFpbHMgaWYgY29udGV4dCBpcyBub3Qgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbHQgPSAnPHNwLW9iamVjdC1zdWdnZXN0IHNwLW9iamVjdC1zdWdnZXN0LWNsYXNzPVwic2FpbHBvaW50Lm9iamVjdC5JZGVudGl0eVwiICcgK1xuICAgICAgICAgICAgJ25nLW1vZGVsPVwic2VsZWN0ZWRPYmplY3RcIiBzcC1vYmplY3Qtc3VnZ2VzdC1sb29rdXAtaWQ9XCJ0ZXN0SWRcIiBzcC1vYmplY3Qtc3VnZ2VzdC1pZD1cInN1Z2dlc3QtaWRcIi8+JztcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjb21waWxlKGVsdCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdmYWlscyBpZiBjb250ZXh0IGlzIG5vdCBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsdCA9ICc8c3Atb2JqZWN0LXN1Z2dlc3Qgc3Atb2JqZWN0LXN1Z2dlc3QtY2xhc3M9XCJzYWlscG9pbnQub2JqZWN0LklkZW50aXR5XCIgJyArXG4gICAgICAgICAgICAnbmctbW9kZWw9XCJzZWxlY3RlZE9iamVjdFwiIHNwLW9iamVjdC1zdWdnZXN0LWNvbnRleHQ9XCJjb250ZXh0XCIgc3Atb2JqZWN0LXN1Z2dlc3QtaWQ9XCJzdWdnZXN0LWlkXCIvPic7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY29tcGlsZShlbHQpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc3VjY2VlZHMgaWYgY29udGV4dCBhbmQgc3VnZ2VzdC1sb29rdXAtaWQgYXJlIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWx0ID0gJzxzcC1vYmplY3Qtc3VnZ2VzdCBzcC1vYmplY3Qtc3VnZ2VzdC1jbGFzcz1cInNhaWxwb2ludC5vYmplY3QuSWRlbnRpdHlcIiAnICtcbiAgICAgICAgICAgICduZy1tb2RlbD1cInNlbGVjdGVkT2JqZWN0XCIgc3Atb2JqZWN0LXN1Z2dlc3QtbG9va3VwLWlkPVwidGVzdElkXCIgc3Atb2JqZWN0LXN1Z2dlc3QtY29udGV4dD1cImNvbnRleHRcIiAnICtcbiAgICAgICAgICAgICdzcC1vYmplY3Qtc3VnZ2VzdC1pZD1cInN1Z2dlc3QtaWRcIi8+JztcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjb21waWxlKGVsdCk7IH0pLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2V0cyB0aGUgb2JqZWN0IGxpc3QgdG8gdGhlIHNwLW9iamVjdC1zdWdnZXN0IGF0dHJpYnV0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWwgPSBjb21waWxlKHNpbXBsZVN1Z2dlc3QpO1xuICAgICAgICB2YXIgaXNvbGF0ZWRTY29wZSA9IGVsLmlzb2xhdGVTY29wZSgpO1xuICAgICAgICBleHBlY3QoaXNvbGF0ZWRTY29wZS5vYmplY3RMaXN0KS50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NldHMgZXh0cmFQYXJhbXMgdG8gb2JqZWN0IGlmIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzY29wZS5vYmplY3RTdWdnZXN0UGFyYW1zID0geyB3b3JrZ3JvdXAgOiAnc29tZXdvcmtncm91cCcgfTtcbiAgICAgICAgdmFyIGVsdCA9ICc8c3Atb2JqZWN0LXN1Z2dlc3Qgc3Atb2JqZWN0LXN1Z2dlc3QtY2xhc3M9XCJzYWlscG9pbnQub2JqZWN0LklkZW50aXR5XCIgJyArXG4gICAgICAgICAgICAgICAgJ25nLW1vZGVsPVwic2VsZWN0ZWRPYmplY3RcIiBzcC1vYmplY3Qtc3VnZ2VzdC1sb29rdXAtaWQ9XCJ0ZXN0SWRcIiBzcC1vYmplY3Qtc3VnZ2VzdC1jb250ZXh0PVwiY29udGV4dFwiICcgK1xuICAgICAgICAgICAgICAgICdzcC1vYmplY3Qtc3VnZ2VzdC1pZD1cInN1Z2dlc3QtaWRcIiAnICtcbiAgICAgICAgICAgICAgICAnc3Atb2JqZWN0LXN1Z2dlc3QtcGFyYW1zPVwib2JqZWN0U3VnZ2VzdFBhcmFtc1wiLz4nO1xuXG4gICAgICAgIHZhciBlbCA9IGNvbXBpbGUoZWx0KTtcbiAgICAgICAgdmFyIGlzb2xhdGVkU2NvcGUgPSBlbC5pc29sYXRlU2NvcGUoKTtcbiAgICAgICAgZXhwZWN0KGlzb2xhdGVkU2NvcGUuZXh0cmFQYXJhbXMpLnRvRXF1YWwoc2NvcGUub2JqZWN0U3VnZ2VzdFBhcmFtcyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZGVmYXVsdHMgdG8gYSBsaW1pdCBvZiA1IHJlc3VsdHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsID0gY29tcGlsZShzaW1wbGVTdWdnZXN0KTtcbiAgICAgICAgdmFyIGlzb2xhdGVkU2NvcGUgPSBlbC5pc29sYXRlU2NvcGUoKTtcbiAgICAgICAgZXhwZWN0KGlzb2xhdGVkU2NvcGUuc3BPYmplY3RTdWdnZXN0TGltaXQpLnRvRXF1YWwoNSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHNwZWNpZnlpbmcgYSBsaW1pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWx0ID0gJzxzcC1vYmplY3Qtc3VnZ2VzdCAnICtcbiAgICAgICAgICAgICAgICAgICcgICAgIHNwLW9iamVjdC1zdWdnZXN0LWFsbG93ZWQtdmFsdWVzPVwiZ2V0T2JqZWN0cygpXCInICArXG4gICAgICAgICAgICAgICAgICAnICAgICBzcC1vYmplY3Qtc3VnZ2VzdC1pZD1cInN1Z2dlc3QtaWRcIicgK1xuICAgICAgICAgICAgICAgICAgJyAgICAgc3Atb2JqZWN0LXN1Z2dlc3QtbGltaXQ9XCIyNVwiJyArXG4gICAgICAgICAgICAgICAgICAnICAgICBuZy1tb2RlbD1cInNlbGVjdGVkT2JqZWN0XCIgLz4nLFxuICAgICAgICAgICAgZWwgPSBjb21waWxlKGVsdCk7XG4gICAgICAgIHZhciBpc29sYXRlZFNjb3BlID0gZWwuaXNvbGF0ZVNjb3BlKCk7XG4gICAgICAgIGV4cGVjdChpc29sYXRlZFNjb3BlLnNwT2JqZWN0U3VnZ2VzdExpbWl0KS50b0VxdWFsKCcyNScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RlZmF1bHRzIGVkaXRhYmxlIHRvIGZhbHNlIGlmIG5vdCBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsID0gY29tcGlsZShzaW1wbGVTdWdnZXN0KTtcbiAgICAgICAgdmFyIGlzb2xhdGVkU2NvcGUgPSBlbC5pc29sYXRlU2NvcGUoKTtcbiAgICAgICAgZXhwZWN0KGlzb2xhdGVkU2NvcGUuZWRpdGFibGUpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyBzcGVjaWZ5aW5nIGFuIGl0ZW1UZW1wbGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RlbXBsYXRlL215LXN1Z2dlc3QtaXRlbS5odG1sJywgJ3Rlc3QgdGVzdCB0ZXN0Jyk7XG4gICAgICAgIHZhciBlbHQgPSAnPHNwLW9iamVjdC1zdWdnZXN0ICcgK1xuICAgICAgICAgICAgICAgICcgICAgIHNwLW9iamVjdC1zdWdnZXN0LWFsbG93ZWQtdmFsdWVzPVwiZ2V0T2JqZWN0cygpXCInICArXG4gICAgICAgICAgICAgICAgJyAgICAgc3Atb2JqZWN0LXN1Z2dlc3QtaWQ9XCJzdWdnZXN0LWlkXCInICtcbiAgICAgICAgICAgICAgICAnICAgICBzcC1vYmplY3Qtc3VnZ2VzdC1saW1pdD1cIjI1XCInICtcbiAgICAgICAgICAgICAgICAnICAgICBzcC1vYmplY3Qtc3VnZ2VzdC1pdGVtLXRlbXBsYXRlPVwidGVtcGxhdGUvbXktc3VnZ2VzdC1pdGVtLmh0bWxcIicgK1xuICAgICAgICAgICAgICAgICcgICAgIG5nLW1vZGVsPVwic2VsZWN0ZWRPYmplY3RcIiAvPicsXG4gICAgICAgICAgICBlbCA9IGNvbXBpbGUoZWx0KTtcbiAgICAgICAgdmFyIGlzb2xhdGVkU2NvcGUgPSBlbC5pc29sYXRlU2NvcGUoKTtcbiAgICAgICAgZXhwZWN0KGlzb2xhdGVkU2NvcGUuc3BPYmplY3RTdWdnZXN0SXRlbVRlbXBsYXRlKS50b0VxdWFsKCd0ZW1wbGF0ZS9teS1zdWdnZXN0LWl0ZW0uaHRtbCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZhaWxzIGNvbXBpbGF0aW9uIHdpdGggYW4gaW52YWxpZCBpdGVtIHRlbXBsYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbHQgPSAnPHNwLW9iamVjdC1zdWdnZXN0ICcgK1xuICAgICAgICAgICAgJyAgICAgc3Atb2JqZWN0LXN1Z2dlc3QtYWxsb3dlZC12YWx1ZXM9XCJnZXRPYmplY3RzKClcIicgICtcbiAgICAgICAgICAgICcgICAgIHNwLW9iamVjdC1zdWdnZXN0LWlkPVwic3VnZ2VzdC1pZFwiJyArXG4gICAgICAgICAgICAnICAgICBzcC1vYmplY3Qtc3VnZ2VzdC1saW1pdD1cIjI1XCInICtcbiAgICAgICAgICAgICcgICAgIHNwLW9iamVjdC1zdWdnZXN0LWl0ZW0tdGVtcGxhdGU9XCJ0ZW1wbGF0ZS91bmRlZmluZWQtc3VnZ2VzdC5odG1sXCInICtcbiAgICAgICAgICAgICcgICAgIG5nLW1vZGVsPVwic2VsZWN0ZWRPYmplY3RcIiAvPic7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY29tcGlsZShlbHQpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHNwZWNpZnlpbmcgYSB0ZW1wbGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RlbXBsYXRlL215LXN1Z2dlc3QuaHRtbCcsICd0ZXN0IHRlc3QgdGVzdCcpO1xuICAgICAgICB2YXIgZWx0ID0gJzxzcC1vYmplY3Qtc3VnZ2VzdCAnICtcbiAgICAgICAgICAgICAgICAnICAgICBzcC1vYmplY3Qtc3VnZ2VzdC1hbGxvd2VkLXZhbHVlcz1cImdldE9iamVjdHMoKVwiJyAgK1xuICAgICAgICAgICAgICAgICcgICAgIHNwLW9iamVjdC1zdWdnZXN0LWlkPVwic3VnZ2VzdC1pZFwiJyArXG4gICAgICAgICAgICAgICAgJyAgICAgc3Atb2JqZWN0LXN1Z2dlc3QtbGltaXQ9XCIyNVwiJyArXG4gICAgICAgICAgICAgICAgJyAgICAgc3Atb2JqZWN0LXN1Z2dlc3QtaXRlbS10ZW1wbGF0ZT1cInRlbXBsYXRlL215LXN1Z2dlc3QuaHRtbFwiJyArXG4gICAgICAgICAgICAgICAgJyAgICAgbmctbW9kZWw9XCJzZWxlY3RlZE9iamVjdFwiIC8+JyxcbiAgICAgICAgICAgIGVsID0gY29tcGlsZShlbHQpO1xuICAgICAgICB2YXIgaXNvbGF0ZWRTY29wZSA9IGVsLmlzb2xhdGVTY29wZSgpO1xuICAgICAgICBleHBlY3QoaXNvbGF0ZWRTY29wZS5zcE9iamVjdFN1Z2dlc3RJdGVtVGVtcGxhdGUpLnRvRXF1YWwoJ3RlbXBsYXRlL215LXN1Z2dlc3QuaHRtbCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZhaWxzIGNvbXBpbGF0aW9uIHdpdGggYW4gaW52YWxpZCB0ZW1wbGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWx0ID0gJzxzcC1vYmplY3Qtc3VnZ2VzdCAnICtcbiAgICAgICAgICAgICAgICAnICAgICBzcC1vYmplY3Qtc3VnZ2VzdC1hbGxvd2VkLXZhbHVlcz1cImdldE9iamVjdHMoKVwiJyAgK1xuICAgICAgICAgICAgICAgICcgICAgIHNwLW9iamVjdC1zdWdnZXN0LWlkPVwic3VnZ2VzdC1pZFwiJyArXG4gICAgICAgICAgICAgICAgJyAgICAgc3Atb2JqZWN0LXN1Z2dlc3QtbGltaXQ9XCIyNVwiJyArXG4gICAgICAgICAgICAgICAgJyAgICAgc3Atb2JqZWN0LXN1Z2dlc3QtdGVtcGxhdGU9XCJ0ZW1wbGF0ZS91bmRlZmluZWQtc3VnZ2VzdC5odG1sXCInICtcbiAgICAgICAgICAgICAgICAnICAgICBuZy1tb2RlbD1cInNlbGVjdGVkT2JqZWN0XCIgLz4nO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGNvbXBpbGUoZWx0KTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NldHMgb2JqZWN0TGlzdCB0byBzZWFyY2hPYmplY3RzKCkgaWYgYSBjbGFzcyBpcyBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsdCA9ICc8c3Atb2JqZWN0LXN1Z2dlc3QgJyArXG4gICAgICAgICAgICAgICAgICAnICAgICBzcC1vYmplY3Qtc3VnZ2VzdC1pZD1cInN1Z2dlc3QtaWRcIicgK1xuICAgICAgICAgICAgICAgICAgJyAgICAgc3Atb2JqZWN0LXN1Z2dlc3QtY2xhc3M9XCJzYWlscG9pbnQub2JqZWN0LkJ1bmRsZVwiJyArXG4gICAgICAgICAgICAgICAgICAnICAgICBuZy1tb2RlbD1cInNlbGVjdGVkT2JqZWN0XCIgLz4nLFxuICAgICAgICAgICAgZWwgPSBjb21waWxlKGVsdCk7XG4gICAgICAgIHZhciBpc29sYXRlZFNjb3BlID0gZWwuaXNvbGF0ZVNjb3BlKCk7XG4gICAgICAgIGV4cGVjdChpc29sYXRlZFNjb3BlLm9iamVjdExpc3QpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChpc29sYXRlZFNjb3BlLnNwT2JqZWN0U3VnZ2VzdENsYXNzKS50b0VxdWFsKCdzYWlscG9pbnQub2JqZWN0LkJ1bmRsZScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RlZmF1bHRzIHRvIHJlcXVpcmVkPWZhbHNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbCA9IGNvbXBpbGUoc2ltcGxlU3VnZ2VzdCk7XG4gICAgICAgIHZhciBpc29sYXRlZFNjb3BlID0gZWwuaXNvbGF0ZVNjb3BlKCk7XG4gICAgICAgIGV4cGVjdChpc29sYXRlZFNjb3BlLm5nUmVxdWlyZWQpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NldHMgcmVxdWlyZWQgdXNpbmcgcmVxdWlyZWQgd2l0aG91dCBhIHZhbHVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbHQgPSAnPHNwLW9iamVjdC1zdWdnZXN0ICcgK1xuICAgICAgICAgICAgICAgICAgJyAgICAgc3Atb2JqZWN0LXN1Z2dlc3QtYWxsb3dlZC12YWx1ZXM9XCJnZXRPYmplY3RzKClcIicgICtcbiAgICAgICAgICAgICAgICAgICcgICAgIHNwLW9iamVjdC1zdWdnZXN0LWlkPVwic3VnZ2VzdC1pZFwiJyArXG4gICAgICAgICAgICAgICAgICAnICAgICBuZy1yZXF1aXJlZD1cInRydWVcIicgK1xuICAgICAgICAgICAgICAgICAgJyAgICAgbmctbW9kZWw9XCJzZWxlY3RlZE9iamVjdFwiIC8+JyxcbiAgICAgICAgICAgIGVsID0gY29tcGlsZShlbHQpO1xuICAgICAgICB2YXIgaXNvbGF0ZWRTY29wZSA9IGVsLmlzb2xhdGVTY29wZSgpO1xuICAgICAgICBleHBlY3QoaXNvbGF0ZWRTY29wZS5uZ1JlcXVpcmVkKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2V0cyByZXF1aXJlZCB1c2luZyB0aGUgbmctcmVxdWlyZWQgYXR0cmlidXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbHQgPSAnPHNwLW9iamVjdC1zdWdnZXN0ICcgK1xuICAgICAgICAgICAgICAgICAgJyAgICAgc3Atb2JqZWN0LXN1Z2dlc3QtYWxsb3dlZC12YWx1ZXM9XCJnZXRPYmplY3RzKClcIicgICtcbiAgICAgICAgICAgICAgICAgICcgICAgIHNwLW9iamVjdC1zdWdnZXN0LWlkPVwic3VnZ2VzdC1pZFwiJyArXG4gICAgICAgICAgICAgICAgICAnICAgICBuZy1yZXF1aXJlZD1cImlzVGhpc1JlcXVpcmVkXCInICtcbiAgICAgICAgICAgICAgICAgICcgICAgIG5nLW1vZGVsPVwic2VsZWN0ZWRPYmplY3RcIiAvPicsXG4gICAgICAgICAgICBlbDtcblxuICAgICAgICBzY29wZS5pc1RoaXNSZXF1aXJlZCA9IHRydWU7XG4gICAgICAgIGVsID0gY29tcGlsZShlbHQpO1xuICAgICAgICB2YXIgaXNvbGF0ZWRTY29wZSA9IGVsLmlzb2xhdGVTY29wZSgpO1xuICAgICAgICBleHBlY3QoaXNvbGF0ZWRTY29wZS5uZ1JlcXVpcmVkKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lcyBub3QgY2FsbCBvYmplY3RTdWdnZXN0U2VydmljZSBpZiBub3QgcXVlcnlpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29tcGlsZShzaW1wbGVTdWdnZXN0KTtcbiAgICAgICAgc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICBleHBlY3Qob2JqZWN0U3VnZ2VzdFNlcnZpY2UuZ2V0T2JqZWN0cykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCBjYWxsIG9iamVjdFN1Z2dlc3RTZXJ2aWNlIHdoZW4gYWxsb3dlZCB2YWx1ZXMgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbCA9IGNvbXBpbGUoc2ltcGxlU3VnZ2VzdEFsbG93ZWRWYWx1ZXMpO1xuICAgICAgICBzdWdnZXN0VGVzdFNlcnZpY2Uuc2VhcmNoQnlUeXBpbmcoZWwsICdhY2MnLCBzY29wZSk7XG4gICAgICAgIGV4cGVjdChvYmplY3RTdWdnZXN0U2VydmljZS5nZXRPYmplY3RzKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIG9iamVjdFN1Z2dlc3RTZXJ2aWNlIHdoZW4gcXVlcnlpbmcgaWYgY2xhc3MgaXMgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbHQgPSAnPHNwLW9iamVjdC1zdWdnZXN0JyArXG4gICAgICAgICAgICAgICAgICAnICAgICBzcC1vYmplY3Qtc3VnZ2VzdC1pZD1cInN1Z2dlc3QtaWRcIicgK1xuICAgICAgICAgICAgICAgICAgJyAgICAgc3Atb2JqZWN0LXN1Z2dlc3QtY2xhc3M9XCJzYWlscG9pbnQub2JqZWN0LkJ1bmRsZVwiJyArXG4gICAgICAgICAgICAgICAgICAnICAgICBzcC1vYmplY3Qtc3VnZ2VzdC1maWx0ZXI9XCJmb29cIiAnICtcbiAgICAgICAgICAgICAgICAgICcgICAgIG5nLW1vZGVsPVwic2VsZWN0ZWRPYmplY3RcIiAvPicsXG4gICAgICAgICAgICBlbCA9IGNvbXBpbGUoZWx0KSxcbiAgICAgICAgICAgIGFyZ3M7XG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZS5zZWFyY2hCeVR5cGluZyhlbCwgJ2FjYycsIHNjb3BlKTtcbiAgICAgICAgZXhwZWN0KG9iamVjdFN1Z2dlc3RTZXJ2aWNlLmdldE9iamVjdHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICBhcmdzID0gb2JqZWN0U3VnZ2VzdFNlcnZpY2UuZ2V0T2JqZWN0cy5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcbiAgICAgICAgZXhwZWN0KGFyZ3NbMF0pLnRvRXF1YWwoJ3NhaWxwb2ludC5vYmplY3QuQnVuZGxlJyk7XG4gICAgICAgIGV4cGVjdChhcmdzWzFdKS50b0VxdWFsKCdhY2MnKTtcbiAgICAgICAgZXhwZWN0KGFyZ3NbMl0pLnRvRXF1YWwoNSk7XG4gICAgICAgIGV4cGVjdChhcmdzWzVdKS50b0VxdWFsKCdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG93cyB0aGUgb2JqZWN0IGxpc3Qgd2hlbiBxdWVyeWluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWwgPSBjb21waWxlKHNpbXBsZVN1Z2dlc3QpLFxuICAgICAgICAgICAgaXRlbXM7XG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZS5zZWFyY2hCeVR5cGluZyhlbCwgJ2FjYycsIHNjb3BlKTtcbiAgICAgICAgaXRlbXMgPSBzdWdnZXN0VGVzdFNlcnZpY2UuZ2V0U3VnZ2VzdEl0ZW1zKGVsLCBzY29wZSk7XG4gICAgICAgIGV4cGVjdChpdGVtcy5sZW5ndGgpLnRvRXF1YWwoMyk7XG4gICAgfSk7XG5cblxuICAgIGRlc2NyaWJlKCdjbGlja2luZyB0aGUgZHJvcC1kb3duIGFycm93JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbDtcblxuICAgICAgICAvLyBBbGwgb2YgdGhlc2UgdGVzdHMgdXNlIHRoZSBzYW1lIHR5cGUgb2Ygc3VnZ2VzdC5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsID0gY29tcGlsZShzaW1wbGVTdWdnZXN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIHRoZSBvYmplY3QgbGlzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGl0ZW1zO1xuICAgICAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlLmNsaWNrRHJvcGRvd25BcnJvdyhlbCwgc2NvcGUpO1xuICAgICAgICAgICAgaXRlbXMgPSBzdWdnZXN0VGVzdFNlcnZpY2UuZ2V0U3VnZ2VzdEl0ZW1zKGVsLCBzY29wZSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbXMubGVuZ3RoKS50b0VxdWFsKDMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2xlYXJzIHRoZSBpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlucHV0ID0gZWwuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGlucHV0LnZhbCgnZm9vJyk7XG4gICAgICAgICAgICBzdWdnZXN0VGVzdFNlcnZpY2UuY2xpY2tEcm9wZG93bkFycm93KGVsLCBzY29wZSk7XG4gICAgICAgICAgICBleHBlY3QoaW5wdXQudmFsKCkpLnRvRXF1YWwoJycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvYmplY3QgbGlzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWw7XG5cbiAgICAgICAgLy8gQWxsIG9mIHRoZXNlIHRlc3RzIHVzZSB0aGUgc2FtZSB0eXBlIG9mIHN1Z2dlc3QuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbCA9IGNvbXBpbGUoc2ltcGxlU3VnZ2VzdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG93cyB0aGUgb2JqZWN0IGRpc3BsYXkgbmFtZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBzdWdnZXN0VGVzdFNlcnZpY2UuZ2V0U3VnZ2VzdEl0ZW0oZWwsIDAsIHNjb3BlKSxcbiAgICAgICAgICAgICAgICBuYW1lRWwgPSBpdGVtLmZpbmQoJ3NwYW4nKVswXTtcbiAgICAgICAgICAgIGV4cGVjdChuYW1lRWwudGV4dENvbnRlbnQpLnRvRXF1YWwoJ0FjY291bnRpbmcgR2VuZXJhbCBBY2Nlc3MgLSBJVCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZWxlY3RpbmcgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbDtcblxuICAgICAgICAvLyBBbGwgb2YgdGhlc2UgdGVzdHMgdXNlIHRoZSBzYW1lIHR5cGUgb2Ygc3VnZ2VzdC5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsID0gY29tcGlsZShzaW1wbGVTdWdnZXN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIG1vZGVsIHZhbHVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdWdnZXN0VGVzdFNlcnZpY2Uuc2VsZWN0U3VnZ2VzdEl0ZW0oZWwsIDAsIHNjb3BlKTtcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5zZWxlY3RlZE9iamVjdCkudG9CZShvYmplY3RzWzBdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2hpZGVzIHRoZSBvYmplY3QgbGlzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlLnNlbGVjdFN1Z2dlc3RJdGVtKGVsLCAwLCBzY29wZSk7XG4gICAgICAgICAgICBleHBlY3Qoc3VnZ2VzdFRlc3RTZXJ2aWNlLmlzRHJvcGRvd25PcGVuKGVsKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdwdXRzIHRoZSBkaXNwbGF5IG5hbWUgb2YgdGhlIG9iamVjdCBpbiB0aGUgaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dDtcbiAgICAgICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZS5zZWxlY3RTdWdnZXN0SXRlbShlbCwgMCwgc2NvcGUpO1xuICAgICAgICAgICAgaW5wdXQgPSBlbC5maW5kKCdpbnB1dCcpO1xuICAgICAgICAgICAgZXhwZWN0KGlucHV0LnZhbCgpKS50b0VxdWFsKCdBY2NvdW50aW5nIEdlbmVyYWwgQWNjZXNzIC0gSVQnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
