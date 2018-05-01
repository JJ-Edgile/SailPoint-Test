System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {

            describe('WorkItemFormCtrl', function () {

                var ctrl, formService, scope, testValue, workItemId, deferred, $controller;

                beforeEach(module(formModule));

                beforeEach(inject(function (_$controller_, $rootScope, $q, _formService_) {
                    $controller = _$controller_;
                    deferred = $q.defer();
                    scope = $rootScope.$new();
                    formService = _formService_;

                    workItemId = 'testId';
                    testValue = {};

                    spyOn(formService, 'getWorkItemForm').and.returnValue(deferred.promise);
                }));

                function createController(templateStyle) {
                    if (!templateStyle) {
                        templateStyle = 'full';
                    }

                    scope.spTemplateStyle = templateStyle;
                    scope.spWorkItem = { id: testValue };
                    scope.spCompletionCallback = jasmine.createSpy();

                    ctrl = $controller('WorkItemFormCtrl', {
                        $scope: scope,
                        formService: formService,
                        navigationService: {},
                        WorkItemHeaderDirectiveStates: { summary: 'summary' }
                    });

                    deferred.resolve({
                        data: testValue,
                        config: testValue
                    });

                    scope.$apply();
                }

                it('should call form service with id', function () {
                    createController();
                    expect(formService.getWorkItemForm).toHaveBeenCalledWith(scope.spWorkItem);
                });

                it('should not call form service when summary', function () {
                    createController('summary');
                    expect(formService.getWorkItemForm).not.toHaveBeenCalled();
                });

                it('should return data from work item', function () {
                    createController();
                    expect(ctrl.getData()).toBe(testValue);
                });

                it('should return config from work item', function () {
                    createController();
                    expect(ctrl.getForm()).toBe(testValue);
                });

                it('should call through to callback', function () {
                    createController();
                    expect(scope.spCompletionCallback).not.toHaveBeenCalledWith(testValue);
                    ctrl.sendCallback(testValue);
                    expect(scope.spCompletionCallback).toHaveBeenCalledWith(testValue);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL1dvcmtJdGVtRm9ybUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUztJQUExRjs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsb0JBQW9CLFlBQVc7O2dCQUVwQyxJQUFJLE1BQU0sYUFBYSxPQUFPLFdBQVcsWUFBWSxVQUFVOztnQkFFL0QsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsZUFBZSxZQUFZLElBQUksZUFBZTtvQkFDckUsY0FBYztvQkFDZCxXQUFXLEdBQUc7b0JBQ2QsUUFBUSxXQUFXO29CQUNuQixjQUFjOztvQkFFZCxhQUFhO29CQUNiLFlBQVk7O29CQUVaLE1BQU0sYUFBYSxtQkFBbUIsSUFBSSxZQUFZLFNBQVM7OztnQkFHbkUsU0FBUyxpQkFBaUIsZUFBZTtvQkFDckMsSUFBSSxDQUFDLGVBQWU7d0JBQ2hCLGdCQUFnQjs7O29CQUdwQixNQUFNLGtCQUFrQjtvQkFDeEIsTUFBTSxhQUFhLEVBQUUsSUFBSTtvQkFDekIsTUFBTSx1QkFBdUIsUUFBUTs7b0JBRXJDLE9BQU8sWUFBWSxvQkFBb0I7d0JBQ25DLFFBQVE7d0JBQ1IsYUFBYTt3QkFDYixtQkFBbUI7d0JBQ25CLCtCQUErQixFQUFFLFNBQVM7OztvQkFHOUMsU0FBUyxRQUFRO3dCQUNiLE1BQU07d0JBQ04sUUFBUTs7O29CQUdaLE1BQU07OztnQkFHVixHQUFHLG9DQUFvQyxZQUFXO29CQUM5QztvQkFDQSxPQUFPLFlBQVksaUJBQWlCLHFCQUFxQixNQUFNOzs7Z0JBR25FLEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELGlCQUFpQjtvQkFDakIsT0FBTyxZQUFZLGlCQUFpQixJQUFJOzs7Z0JBRzVDLEdBQUcscUNBQXFDLFlBQVc7b0JBQy9DO29CQUNBLE9BQU8sS0FBSyxXQUFXLEtBQUs7OztnQkFHaEMsR0FBRyx1Q0FBdUMsWUFBVztvQkFDakQ7b0JBQ0EsT0FBTyxLQUFLLFdBQVcsS0FBSzs7O2dCQUdoQyxHQUFHLG1DQUFtQyxZQUFXO29CQUM3QztvQkFDQSxPQUFPLE1BQU0sc0JBQXNCLElBQUkscUJBQXFCO29CQUM1RCxLQUFLLGFBQWE7b0JBQ2xCLE9BQU8sTUFBTSxzQkFBc0IscUJBQXFCOzs7OztHQVU3RCIsImZpbGUiOiJjb21tb24vZm9ybS9Xb3JrSXRlbUZvcm1DdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGZvcm1Nb2R1bGUgZnJvbSAnY29tbW9uL2Zvcm0vRm9ybU1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnV29ya0l0ZW1Gb3JtQ3RybCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBjdHJsLCBmb3JtU2VydmljZSwgc2NvcGUsIHRlc3RWYWx1ZSwgd29ya0l0ZW1JZCwgZGVmZXJyZWQsICRjb250cm9sbGVyO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZvcm1Nb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbnRyb2xsZXJfLCAkcm9vdFNjb3BlLCAkcSwgX2Zvcm1TZXJ2aWNlXykge1xyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgICAgICBmb3JtU2VydmljZSA9IF9mb3JtU2VydmljZV87XHJcblxyXG4gICAgICAgIHdvcmtJdGVtSWQgPSAndGVzdElkJztcclxuICAgICAgICB0ZXN0VmFsdWUgPSB7fTtcclxuXHJcbiAgICAgICAgc3B5T24oZm9ybVNlcnZpY2UsICdnZXRXb3JrSXRlbUZvcm0nKS5hbmQucmV0dXJuVmFsdWUoZGVmZXJyZWQucHJvbWlzZSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcih0ZW1wbGF0ZVN0eWxlKSB7XHJcbiAgICAgICAgaWYgKCF0ZW1wbGF0ZVN0eWxlKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlU3R5bGUgPSAnZnVsbCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzY29wZS5zcFRlbXBsYXRlU3R5bGUgPSB0ZW1wbGF0ZVN0eWxlO1xyXG4gICAgICAgIHNjb3BlLnNwV29ya0l0ZW0gPSB7IGlkOiB0ZXN0VmFsdWUgfTtcclxuICAgICAgICBzY29wZS5zcENvbXBsZXRpb25DYWxsYmFjayA9IGphc21pbmUuY3JlYXRlU3B5KCk7XHJcblxyXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignV29ya0l0ZW1Gb3JtQ3RybCcsIHtcclxuICAgICAgICAgICAgJHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZm9ybVNlcnZpY2U6IGZvcm1TZXJ2aWNlLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZToge30sXHJcbiAgICAgICAgICAgIFdvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzOiB7IHN1bW1hcnk6ICdzdW1tYXJ5JyB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUoe1xyXG4gICAgICAgICAgICBkYXRhOiB0ZXN0VmFsdWUsXHJcbiAgICAgICAgICAgIGNvbmZpZzogdGVzdFZhbHVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNjb3BlLiRhcHBseSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdzaG91bGQgY2FsbCBmb3JtIHNlcnZpY2Ugd2l0aCBpZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICBleHBlY3QoZm9ybVNlcnZpY2UuZ2V0V29ya0l0ZW1Gb3JtKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChzY29wZS5zcFdvcmtJdGVtKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgbm90IGNhbGwgZm9ybSBzZXJ2aWNlIHdoZW4gc3VtbWFyeScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoJ3N1bW1hcnknKTtcclxuICAgICAgICBleHBlY3QoZm9ybVNlcnZpY2UuZ2V0V29ya0l0ZW1Gb3JtKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZGF0YSBmcm9tIHdvcmsgaXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICBleHBlY3QoY3RybC5nZXREYXRhKCkpLnRvQmUodGVzdFZhbHVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvbmZpZyBmcm9tIHdvcmsgaXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICBleHBlY3QoY3RybC5nZXRGb3JtKCkpLnRvQmUodGVzdFZhbHVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIGNhbGxiYWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgIGV4cGVjdChzY29wZS5zcENvbXBsZXRpb25DYWxsYmFjaykubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRlc3RWYWx1ZSk7XHJcbiAgICAgICAgY3RybC5zZW5kQ2FsbGJhY2sodGVzdFZhbHVlKTtcclxuICAgICAgICBleHBlY3Qoc2NvcGUuc3BDb21wbGV0aW9uQ2FsbGJhY2spLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRlc3RWYWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
