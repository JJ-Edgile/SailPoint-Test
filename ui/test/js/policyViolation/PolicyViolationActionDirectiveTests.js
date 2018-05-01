System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }],
        execute: function () {

            describe('PolicyViolationActionDirective', function () {

                var elementDefinition = '<sp-policy-violation-action sp-action="{{ action }}" />',
                    $scope = undefined,
                    $compile = undefined;

                beforeEach(module(policyViolationModule));

                beforeEach(inject(function ($rootScope, _$compile_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                }));

                function createElement(action) {
                    var element = angular.element(elementDefinition);
                    $scope.action = action;
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                it('is hidden if there is no action', function () {
                    var element = createElement(null);
                    expect(element.children().hasClass('ng-hide')).toEqual(true);
                });

                it('uses the action for the CSS class', function () {
                    var element = createElement('Allowed');
                    expect(element.children().hasClass('Allowed')).toEqual(true);
                });

                it('uses the action to construct the message to display', function () {
                    var element = createElement('Delegated');
                    expect(element.text().trim()).toEqual('policy_violation_action_delegated');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25BY3Rpb25EaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMENBQTBDLFVBQVUsU0FBUzs7Ozs7SUFLckc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDOztRQUVsRSxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsa0NBQWtDLFlBQVc7O2dCQUVsRCxJQUFJLG9CQUFvQjtvQkFDcEIsU0FBTTtvQkFBRSxXQUFROztnQkFFcEIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxZQUFZO29CQUMvQyxTQUFTLFdBQVc7b0JBQ3BCLFdBQVc7OztnQkFHZixTQUFTLGNBQWMsUUFBUTtvQkFDM0IsSUFBSSxVQUFVLFFBQVEsUUFBUTtvQkFDOUIsT0FBTyxTQUFTO29CQUNoQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLEdBQUcsbUNBQW1DLFlBQU07b0JBQ3hDLElBQUksVUFBVSxjQUFjO29CQUM1QixPQUFPLFFBQVEsV0FBVyxTQUFTLFlBQVksUUFBUTs7O2dCQUczRCxHQUFHLHFDQUFxQyxZQUFNO29CQUMxQyxJQUFJLFVBQVUsY0FBYztvQkFDNUIsT0FBTyxRQUFRLFdBQVcsU0FBUyxZQUFZLFFBQVE7OztnQkFHM0QsR0FBRyx1REFBdUQsWUFBTTtvQkFDNUQsSUFBSSxVQUFVLGNBQWM7b0JBQzVCLE9BQU8sUUFBUSxPQUFPLFFBQVEsUUFBUTs7Ozs7R0FZM0MiLCJmaWxlIjoicG9saWN5VmlvbGF0aW9uL1BvbGljeVZpb2xhdGlvbkFjdGlvbkRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qXHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICovXHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IHBvbGljeVZpb2xhdGlvbk1vZHVsZSBmcm9tICdwb2xpY3lWaW9sYXRpb24vUG9saWN5VmlvbGF0aW9uTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdQb2xpY3lWaW9sYXRpb25BY3Rpb25EaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPSAnPHNwLXBvbGljeS12aW9sYXRpb24tYWN0aW9uIHNwLWFjdGlvbj1cInt7IGFjdGlvbiB9fVwiIC8+JyxcclxuICAgICAgICAkc2NvcGUsICRjb21waWxlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBvbGljeVZpb2xhdGlvbk1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRyb290U2NvcGUsIF8kY29tcGlsZV8pIHtcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChhY3Rpb24pIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XHJcbiAgICAgICAgJHNjb3BlLmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBpdCgnaXMgaGlkZGVuIGlmIHRoZXJlIGlzIG5vIGFjdGlvbicsICgpID0+IHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQobnVsbCk7XHJcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5oYXNDbGFzcygnbmctaGlkZScpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3VzZXMgdGhlIGFjdGlvbiBmb3IgdGhlIENTUyBjbGFzcycsICgpID0+IHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ0FsbG93ZWQnKTtcclxuICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpLmhhc0NsYXNzKCdBbGxvd2VkJykpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgndXNlcyB0aGUgYWN0aW9uIHRvIGNvbnN0cnVjdCB0aGUgbWVzc2FnZSB0byBkaXNwbGF5JywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnRGVsZWdhdGVkJyk7XHJcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQudGV4dCgpLnRyaW0oKSkudG9FcXVhbCgncG9saWN5X3Zpb2xhdGlvbl9hY3Rpb25fZGVsZWdhdGVkJyk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
