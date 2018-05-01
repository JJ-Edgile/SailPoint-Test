System.register(['test/js/TestInitializer', 'test/js/TestModule', 'common/widget/WidgetModule'], function (_export) {
    'use strict';

    var testModule, widgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_commonWidgetWidgetModule) {
            widgetModule = _commonWidgetWidgetModule['default'];
        }],
        execute: function () {

            describe('spSelectButtonDirective', function () {
                var $scope,
                    $compile,
                    testService,
                    metadata = {
                    objectId: 'thisoldthing'
                },
                    label = 'Yo momma!',
                    elementWithOnClick = '<sp-select-button ' + 'sp-selected="{{isSelected}}" ' + 'sp-label="{{label}}" ' + 'sp-on-click="toggle(selected,metadata)" ' + 'sp-metadata="metadata" ' + 'sp-button-style="{{buttonStyle}}" ' + 'sp-disabled="isDisabled"/>',
                    elementWithOnSelect = '<sp-select-button ' + 'sp-selected="{{isSelected}}" ' + 'sp-label="{{label}}" ' + 'sp-on-select="select()" ' + 'sp-on-deselect="deselect()" ' + 'sp-metadata="metadata" ' + 'sp-button-style="{{buttonStyle}}" ' + 'sp-disabled="isDisabled"/>',
                    createElement = function (elementDefinition, selected, disabled) {
                    var element;
                    $scope.isSelected = selected;
                    $scope.isDisabled = disabled;
                    element = angular.element(elementDefinition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                };

                beforeEach(module(testModule, widgetModule));

                beforeEach(inject(function (_$compile_, $rootScope, _testService_) {
                    $scope = $rootScope;
                    $compile = _$compile_;
                    testService = _testService_;
                    $scope.select = jasmine.createSpy().and.returnValue(true);
                    $scope.deselect = jasmine.createSpy().and.returnValue(true);
                    $scope.toggle = jasmine.createSpy().and.returnValue(true);
                    $scope.metadata = metadata;
                    $scope.label = label;
                    $scope.buttonStyle = undefined;
                    $scope.disabled = false;
                }));

                it('should be white when not selected', function () {
                    var element = createElement(elementWithOnSelect, false, false);
                    expect(angular.element(element[0]).hasClass('btn-white')).toBeTruthy();
                    expect(angular.element(element[0]).hasClass('btn-success')).toBeFalsy();
                });

                it('should change style when selected', function () {
                    var element = createElement(elementWithOnSelect, true, false);
                    expect(angular.element(element[0]).hasClass('btn-white')).toBeFalsy();
                    expect(angular.element(element[0]).hasClass('btn-success')).toBeTruthy();
                    $scope.buttonStyle = 'Remove';
                    var otherelement = createElement(elementWithOnSelect, true, false);
                    expect(angular.element(otherelement[0]).hasClass('btn-danger')).toBeTruthy();
                });

                it('should not be aria-checked when not selected', function () {
                    var element = createElement(elementWithOnSelect, false, false);
                    expect(angular.element(element[0]).attr('aria-checked')).toEqual('false');
                });

                it('should be aria-checked when selected', function () {
                    var element = createElement(elementWithOnSelect, true, false);
                    expect(angular.element(element[0]).attr('aria-checked')).toEqual('true');
                });

                it('has a label for screen readers', function () {
                    var element = createElement(elementWithOnSelect, true, false),
                        ariaLabel = element[0].getAttribute('aria-label');
                    expect(ariaLabel).toBeDefined();
                    expect(ariaLabel).toEqual(label);
                });

                it('should call spOnSelect and spOnDeselect when selected and unselected', function () {
                    var element = createElement(elementWithOnSelect, false, false);
                    // Clicking will select
                    element.click();
                    $scope.$digest();
                    expect($scope.select).toHaveBeenCalled();
                    // Clicking will deselect
                    element.click();
                    $scope.$digest();
                    expect($scope.deselect).toHaveBeenCalled();
                });

                it('should not call spOnSelect and spOnDeselect when toggling a disabled button', function () {
                    var element = createElement(elementWithOnSelect, false, true);
                    // Clicking would select if not disabled.
                    element.click();
                    $scope.$digest();
                    expect($scope.select).not.toHaveBeenCalled();
                    // Clicking again would deselect if not disabled.
                    element.click();
                    $scope.$digest();
                    expect($scope.deselect).not.toHaveBeenCalled();
                });

                it('should call spOnClick with selected and metadata values', function () {
                    var element = createElement(elementWithOnClick, false, false);
                    element.click();
                    $scope.$digest();
                    expect($scope.toggle).toHaveBeenCalled();
                    expect($scope.toggle.calls.mostRecent().args[0]).toEqual(true);
                    expect($scope.toggle.calls.mostRecent().args[1]).toEqual(metadata);
                    element.click();
                    $scope.$digest();
                    expect($scope.toggle).toHaveBeenCalled();
                    expect($scope.toggle.calls.mostRecent().args[0]).toEqual(false);
                    var passedMetadata = $scope.toggle.calls.mostRecent().args[1];
                    expect(passedMetadata).not.toBeNull();
                    expect(passedMetadata.objectId).toEqual(metadata.objectId);
                });

                it('will not change selected if callback promise resolves to false', function () {
                    var element = createElement(elementWithOnSelect, false, false);
                    $scope.select = testService.createPromiseSpy(false, false);
                    element.click();
                    $scope.$digest();

                    // use aria-checked to find checked state
                    expect(angular.element(element[0]).attr('aria-checked')).toEqual('false');
                    $scope.select = testService.createPromiseSpy(false, true);
                    element.click();
                    $scope.$digest();
                    expect(angular.element(element[0]).attr('aria-checked')).toEqual('true');
                });

                it('should change icon based on spButtonStyle', function () {
                    var element = createElement(elementWithOnSelect, false, false);
                    expect(angular.element(element[0].firstChild).hasClass('fa-check'));
                    $scope.buttonStyle = 'Add';
                    element = createElement(elementWithOnSelect, false, false);
                    expect(angular.element(element[0].firstChild).hasClass('fa-check'));
                    $scope.buttonStyle = 'Remove';
                    element = createElement(elementWithOnSelect, false, false);
                    expect(angular.element(element[0].firstChild).hasClass('fa-times'));
                });

                it('should throw with invalid spButtonStyle', function () {
                    $scope.buttonStyle = 'Poop';
                    expect(function () {
                        createElement(elementWithOnSelect, false, false);
                    }).toThrow();
                });

                describe('disabled', function () {
                    it('should set disabled class', function () {
                        var element = createElement(elementWithOnSelect, false, true);
                        expect(element.hasClass('disabled'));
                    });

                    it('should set aria-disabled to true', function () {
                        var element = createElement(elementWithOnSelect, false, true);
                        expect(element.attr('aria-disabled')).toEqual('true');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvU2VsZWN0QnV0dG9uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNCQUFzQiwrQkFBK0IsVUFBVSxTQUFTO0lBQ2hIOztJQUVBLElBQUksWUFBWTtJQUNoQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQkFBbUI7WUFDekUsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSwyQkFBMkI7WUFDcEMsZUFBZSwwQkFBMEI7O1FBRTdDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUywyQkFBMkIsWUFBVztnQkFDM0MsSUFBSTtvQkFBUTtvQkFBVTtvQkFDbEIsV0FBVztvQkFDUCxVQUFVOztvQkFFZCxRQUFRO29CQUNSLHFCQUFxQix1QkFDakIsa0NBQ0EsMEJBQ0EsNkNBQ0EsNEJBQ0EsdUNBQ0E7b0JBQ0osc0JBQXNCLHVCQUNsQixrQ0FDQSwwQkFDQSw2QkFDQSxpQ0FDQSw0QkFDQSx1Q0FDQTtvQkFDSixnQkFBZ0IsVUFBUyxtQkFBbUIsVUFBVSxVQUFVO29CQUM1RCxJQUFJO29CQUNKLE9BQU8sYUFBYTtvQkFDcEIsT0FBTyxhQUFhO29CQUNwQixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHZixXQUFXLE9BQU8sWUFBWTs7Z0JBRTlCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSxlQUFlO29CQUM5RCxTQUFTO29CQUNULFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxPQUFPLFNBQVMsUUFBUSxZQUFZLElBQUksWUFBWTtvQkFDcEQsT0FBTyxXQUFXLFFBQVEsWUFBWSxJQUFJLFlBQVk7b0JBQ3RELE9BQU8sU0FBUyxRQUFRLFlBQVksSUFBSSxZQUFZO29CQUNwRCxPQUFPLFdBQVc7b0JBQ2xCLE9BQU8sUUFBUTtvQkFDZixPQUFPLGNBQWM7b0JBQ3JCLE9BQU8sV0FBVzs7O2dC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QUN2RCxPQUFPLGNBQWM7b0JBQ3JCLFVBQVUsY0FBYyxxQkFBcUIsT0FBTztvQkFDcEQsT0FBTyxRQUFRLFFBQVEsUUFBUSxHQUFHLFlBQVksU0FBUztvQkFDdkQsT0FBTyxjQUFjO29CQUNyQixVQUFVLGNBQWMscUJBQXFCLE9BQU87b0JBQ3BELE9BQU8sUUFBUSxRQUFRLFFBQVEsR0FBRyxZQUFZLFNBQVM7OztnQkFHM0QsR0FBRywyQ0FBMkMsWUFBVztvQkFDckQsT0FBTyxjQUFjO29CQUNyQixPQUFRLFlBQVc7d0JBQUUsY0FBYyxxQkFBcUIsT0FBTzt1QkFBVTs7O2dCQUc3RSxTQUFTLFlBQVksWUFBVztvQkFDNUIsR0FBRyw2QkFBNkIsWUFBVzt3QkFDdkMsSUFBSSxVQUFVLGNBQWMscUJBQXFCLE9BQU87d0JBQ3hELE9BQU8sUUFBUSxTQUFTOzs7b0JBRzVCLEdBQUcsb0NBQW9DLFlBQVc7d0JBQzlDLElBQUksVUFBVSxjQUFjLHFCQUFxQixPQUFPO3dCQUN4RCxPQUFPLFFBQVEsS0FBSyxrQkFBa0IsUUFBUTs7Ozs7O0dBSXZEIiwiZmlsZSI6ImNvbW1vbi93aWRnZXQvU2VsZWN0QnV0dG9uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgd2lkZ2V0TW9kdWxlIGZyb20gJ2NvbW1vbi93aWRnZXQvV2lkZ2V0TW9kdWxlJztcblxuXG5kZXNjcmliZSgnc3BTZWxlY3RCdXR0b25EaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHNjb3BlLCAkY29tcGlsZSwgdGVzdFNlcnZpY2UsXG4gICAgICAgIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgb2JqZWN0SWQ6ICd0aGlzb2xkdGhpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsID0gJ1lvIG1vbW1hIScsXG4gICAgICAgIGVsZW1lbnRXaXRoT25DbGljayA9ICc8c3Atc2VsZWN0LWJ1dHRvbiAnICtcbiAgICAgICAgICAgICdzcC1zZWxlY3RlZD1cInt7aXNTZWxlY3RlZH19XCIgJyArXG4gICAgICAgICAgICAnc3AtbGFiZWw9XCJ7e2xhYmVsfX1cIiAnICtcbiAgICAgICAgICAgICdzcC1vbi1jbGljaz1cInRvZ2dsZShzZWxlY3RlZCxtZXRhZGF0YSlcIiAnICtcbiAgICAgICAgICAgICdzcC1tZXRhZGF0YT1cIm1ldGFkYXRhXCIgJyArXG4gICAgICAgICAgICAnc3AtYnV0dG9uLXN0eWxlPVwie3tidXR0b25TdHlsZX19XCIgJyArXG4gICAgICAgICAgICAnc3AtZGlzYWJsZWQ9XCJpc0Rpc2FibGVkXCIvPicsXG4gICAgICAgIGVsZW1lbnRXaXRoT25TZWxlY3QgPSAnPHNwLXNlbGVjdC1idXR0b24gJyArXG4gICAgICAgICAgICAnc3Atc2VsZWN0ZWQ9XCJ7e2lzU2VsZWN0ZWR9fVwiICcgK1xuICAgICAgICAgICAgJ3NwLWxhYmVsPVwie3tsYWJlbH19XCIgJyArXG4gICAgICAgICAgICAnc3Atb24tc2VsZWN0PVwic2VsZWN0KClcIiAnICtcbiAgICAgICAgICAgICdzcC1vbi1kZXNlbGVjdD1cImRlc2VsZWN0KClcIiAnICtcbiAgICAgICAgICAgICdzcC1tZXRhZGF0YT1cIm1ldGFkYXRhXCIgJyArXG4gICAgICAgICAgICAnc3AtYnV0dG9uLXN0eWxlPVwie3tidXR0b25TdHlsZX19XCIgJyArXG4gICAgICAgICAgICAnc3AtZGlzYWJsZWQ9XCJpc0Rpc2FibGVkXCIvPicsXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50RGVmaW5pdGlvbiwgc2VsZWN0ZWQsIGRpc2FibGVkKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgICAgICRzY29wZS5pc1NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICAgICAgICAkc2NvcGUuaXNEaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCB3aWRnZXRNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29tcGlsZV8sICRyb290U2NvcGUsIF90ZXN0U2VydmljZV8pIHtcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICRzY29wZS5zZWxlY3QgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgJHNjb3BlLmRlc2VsZWN0ID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICRzY29wZS50b2dnbGUgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgJHNjb3BlLm1ldGFkYXRhID0gbWV0YWRhdGE7XG4gICAgICAgICRzY29wZS5sYWJlbCA9IGxhYmVsO1xuICAgICAgICAkc2NvcGUuYnV0dG9uU3R5bGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICRzY29wZS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgYmUgd2hpdGUgd2hlbiBub3Qgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnRXaXRoT25TZWxlY3QsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXSkuaGFzQ2xhc3MoJ2J0bi13aGl0ZScpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXSkuaGFzQ2xhc3MoJ2J0bi1zdWNjZXNzJykpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjaGFuZ2Ugc3R5bGUgd2hlbiBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudFdpdGhPblNlbGVjdCwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0pLmhhc0NsYXNzKCdidG4td2hpdGUnKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXSkuaGFzQ2xhc3MoJ2J0bi1zdWNjZXNzJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgJHNjb3BlLmJ1dHRvblN0eWxlID0gJ1JlbW92ZSc7XG4gICAgICAgIHZhciBvdGhlcmVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnRXaXRoT25TZWxlY3QsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChvdGhlcmVsZW1lbnRbMF0pLmhhc0NsYXNzKCdidG4tZGFuZ2VyJykpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IGJlIGFyaWEtY2hlY2tlZCB3aGVuIG5vdCBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudFdpdGhPblNlbGVjdCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdKS5hdHRyKCdhcmlhLWNoZWNrZWQnKSkudG9FcXVhbCgnZmFsc2UnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmUgYXJpYS1jaGVja2VkIHdoZW4gc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnRXaXRoT25TZWxlY3QsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdKS5hdHRyKCdhcmlhLWNoZWNrZWQnKSkudG9FcXVhbCgndHJ1ZScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhcyBhIGxhYmVsIGZvciBzY3JlZW4gcmVhZGVycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudFdpdGhPblNlbGVjdCwgdHJ1ZSwgZmFsc2UpLFxuICAgICAgICAgICAgYXJpYUxhYmVsID0gZWxlbWVudFswXS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKTtcbiAgICAgICAgZXhwZWN0KGFyaWFMYWJlbCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KGFyaWFMYWJlbCkudG9FcXVhbChsYWJlbCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgc3BPblNlbGVjdCBhbmQgc3BPbkRlc2VsZWN0IHdoZW4gc2VsZWN0ZWQgYW5kIHVuc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnRXaXRoT25TZWxlY3QsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIC8vIENsaWNraW5nIHdpbGwgc2VsZWN0XG4gICAgICAgIGVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgZXhwZWN0KCRzY29wZS5zZWxlY3QpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgLy8gQ2xpY2tpbmcgd2lsbCBkZXNlbGVjdFxuICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIGV4cGVjdCgkc2NvcGUuZGVzZWxlY3QpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IGNhbGwgc3BPblNlbGVjdCBhbmQgc3BPbkRlc2VsZWN0IHdoZW4gdG9nZ2xpbmcgYSBkaXNhYmxlZCBidXR0b24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnRXaXRoT25TZWxlY3QsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgLy8gQ2xpY2tpbmcgd291bGQgc2VsZWN0IGlmIG5vdCBkaXNhYmxlZC5cbiAgICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICBleHBlY3QoJHNjb3BlLnNlbGVjdCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgLy8gQ2xpY2tpbmcgYWdhaW4gd291bGQgZGVzZWxlY3QgaWYgbm90IGRpc2FibGVkLlxuICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIGV4cGVjdCgkc2NvcGUuZGVzZWxlY3QpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgc3BPbkNsaWNrIHdpdGggc2VsZWN0ZWQgYW5kIG1ldGFkYXRhIHZhbHVlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudFdpdGhPbkNsaWNrLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIGV4cGVjdCgkc2NvcGUudG9nZ2xlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdCgkc2NvcGUudG9nZ2xlLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdKS50b0VxdWFsKHRydWUpO1xuICAgICAgICBleHBlY3QoJHNjb3BlLnRvZ2dsZS5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1sxXSkudG9FcXVhbChtZXRhZGF0YSk7XG4gICAgICAgIGVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgZXhwZWN0KCRzY29wZS50b2dnbGUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KCRzY29wZS50b2dnbGUuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0pLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB2YXIgcGFzc2VkTWV0YWRhdGEgPSAkc2NvcGUudG9nZ2xlLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzFdO1xuICAgICAgICBleHBlY3QocGFzc2VkTWV0YWRhdGEpLm5vdC50b0JlTnVsbCgpO1xuICAgICAgICBleHBlY3QocGFzc2VkTWV0YWRhdGEub2JqZWN0SWQpLnRvRXF1YWwobWV0YWRhdGEub2JqZWN0SWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dpbGwgbm90IGNoYW5nZSBzZWxlY3RlZCBpZiBjYWxsYmFjayBwcm9taXNlIHJlc29sdmVzIHRvIGZhbHNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50V2l0aE9uU2VsZWN0LCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAkc2NvcGUuc2VsZWN0ID0gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG5cbiAgICAgICAgLy8gdXNlIGFyaWEtY2hlY2tlZCB0byBmaW5kIGNoZWNrZWQgc3RhdGVcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdKS5hdHRyKCdhcmlhLWNoZWNrZWQnKSkudG9FcXVhbCgnZmFsc2UnKTtcbiAgICAgICAgJHNjb3BlLnNlbGVjdCA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHRydWUpO1xuICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXSkuYXR0cignYXJpYS1jaGVja2VkJykpLnRvRXF1YWwoJ3RydWUnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgY2hhbmdlIGljb24gYmFzZWQgb24gc3BCdXR0b25TdHlsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudFdpdGhPblNlbGVjdCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdLmZpcnN0Q2hpbGQpLmhhc0NsYXNzKCdmYS1jaGVjaycpKTtcbiAgICAgICAgJHNjb3BlLmJ1dHRvblN0eWxlID0gJ0FkZCc7XG4gICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnRXaXRoT25TZWxlY3QsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXS5maXJzdENoaWxkKS5oYXNDbGFzcygnZmEtY2hlY2snKSk7XG4gICAgICAgICRzY29wZS5idXR0b25TdHlsZSA9ICdSZW1vdmUnO1xuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50V2l0aE9uU2VsZWN0LCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0uZmlyc3RDaGlsZCkuaGFzQ2xhc3MoJ2ZhLXRpbWVzJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIGludmFsaWQgc3BCdXR0b25TdHlsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuYnV0dG9uU3R5bGUgPSAnUG9vcCc7XG4gICAgICAgIGV4cGVjdCAoZnVuY3Rpb24oKSB7IGNyZWF0ZUVsZW1lbnQoZWxlbWVudFdpdGhPblNlbGVjdCwgZmFsc2UsIGZhbHNlKTt9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGlzYWJsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgZGlzYWJsZWQgY2xhc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50V2l0aE9uU2VsZWN0LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5oYXNDbGFzcygnZGlzYWJsZWQnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGFyaWEtZGlzYWJsZWQgdG8gdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnRXaXRoT25TZWxlY3QsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmF0dHIoJ2FyaWEtZGlzYWJsZWQnKSkudG9FcXVhbCgndHJ1ZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
