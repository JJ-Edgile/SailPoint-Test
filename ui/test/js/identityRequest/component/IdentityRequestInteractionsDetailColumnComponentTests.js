System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }],
        execute: function () {

            describe('spIdentityRequestInteractionsDetailColumn', function () {

                var elementDefinition = '<sp-identity-request-interactions-detail-column sp-model="item" />',
                    $scope = undefined,
                    $compile = undefined,
                    $componentController = undefined,
                    element = undefined,
                    item = undefined,
                    identityRequestTestData = undefined,
                    navigationService = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_$rootScope_, _$compile_, _identityRequestTestData_, _$componentController_, _navigationService_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $componentController = _$componentController_;
                    identityRequestTestData = _identityRequestTestData_;
                    item = identityRequestTestData.IDENTITY_REQUEST_APPROVAL_SUMMARY_1;
                    navigationService = _navigationService_;
                }));

                afterEach(function () {
                    if (element) {
                        angular.element(element).remove();
                    }
                });

                function createElement(item) {
                    element = angular.element(elementDefinition);
                    $scope.item = item;
                    $compile(element)($scope);
                    $scope.$apply();
                }

                function createController() {
                    var bindings = {
                        item: item
                    };
                    var ctrl = $componentController('spIdentityRequestInteractionsDetailColumn', null, bindings);
                    ctrl.$onInit();
                    return ctrl;
                }

                function getButtonSelector(item) {
                    var id = item.workItemArchiveId || item.workItemId;
                    return '#interactionsDetailBtn-' + id;
                }

                describe('controller', function () {

                    it('throws without an item', function () {
                        item = null;
                        expect(function () {
                            return createController();
                        }).toThrow();
                    });
                });

                describe('details button', function () {

                    it('shows the details button if user has access', function () {
                        createElement(item);
                        var commentElement = angular.element(element);
                        var icons = commentElement.find('i');
                        expect(icons.length).toEqual(1);
                        expect(icons[0].classList.contains('fa-chevron-right')).toEqual(true);
                        var detailsButton = element.find(getButtonSelector(item));
                        expect(detailsButton.length).toEqual(1);
                    });

                    it('calls through the navigationService', function () {

                        spyOn(navigationService, 'go');
                        var ctrl = createController();
                        ctrl.goToWorkItemPage();
                        expect(navigationService.go).toHaveBeenCalled();
                    });

                    it('navigates to the workItem details page', function () {

                        spyOn(navigationService, 'go');
                        createElement(item);
                        var detailsButton = element.find(getButtonSelector(item));
                        detailsButton.click();
                        $scope.$apply();
                        expect(navigationService.go).toHaveBeenCalled();
                        var args = navigationService.go.calls.mostRecent().args;
                        expect(args[0].outcome).toEqual('viewWorkItem?id=1&reset=true');
                        expect(args[0].navigationHistory).toContain('viewAccessRequests#/request');
                    });

                    it('navigates to the workItemArchive details page', function () {

                        spyOn(navigationService, 'go');
                        var anotherItem = {
                            workItemId: '11',
                            workItemArchiveId: '22',
                            ownerDisplayName: 'Joe Smith',
                            status: 'status_message_key',
                            openDate: 1496352411768,
                            completeDate: 1496352411768,
                            description: 'approving',
                            approvalItemCount: 1,
                            comments: [{
                                author: 'Test User',
                                date: 1496352411768,
                                comment: 'some comments here'
                            }],
                            hasWorkItemAccess: true
                        };
                        createElement(anotherItem);
                        var detailsButton = element.find(getButtonSelector(anotherItem));
                        detailsButton.click();
                        $scope.$apply();
                        expect(navigationService.go).toHaveBeenCalled();
                        var args = navigationService.go.calls.mostRecent().args;
                        expect(args[0].outcome).toEqual('viewWorkItemArchive?id=22');
                        expect(args[0].navigationHistory).toContain('viewAccessRequests#/request');
                    });
                });

                it('shows message instead of user has no access to view work item', function () {
                    item.hasWorkItemAccess = false;
                    createElement(item);
                    expect(element.find('button').length).toEqual(0);
                });

                it('shows message instead of there is no work item or archive to navigate to', function () {
                    delete item.workItemId;
                    delete item.workItemArchiveId;
                    createElement(item);
                    expect(element.find('button').length).toEqual(0);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SW50ZXJhY3Rpb25zRGV0YWlsQ29sdW1uQ29tcG9uZW50VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBDQUEwQyxVQUFVLFNBQVM7OztJQUdyRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyw2Q0FBNkMsWUFBVzs7Z0JBRTdELElBQUksb0JBQWlCO29CQUVqQixTQUFNO29CQUFFLFdBQVE7b0JBQUUsdUJBQW9CO29CQUFFLFVBQU87b0JBQUUsT0FBSTtvQkFBRSwwQkFBdUI7b0JBQzlFLG9CQUFpQjs7Z0JBRXJCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWSwyQkFDakQsd0JBQXdCLHFCQUFxQjtvQkFDN0MsU0FBUyxhQUFhO29CQUN0QixXQUFXO29CQUNYLHVCQUF1QjtvQkFDdkIsMEJBQTBCO29CQUMxQixPQUFPLHdCQUF3QjtvQkFDL0Isb0JBQW9COzs7Z0JBSXhCLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUSxRQUFRLFNBQVM7Ozs7Z0JBSWpDLFNBQVMsY0FBYyxNQUFNO29CQUN6QixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsT0FBTyxPQUFPO29CQUNkLFNBQVMsU0FBUztvQkFDbEIsT0FBTzs7O2dCQUdYLFNBQVMsbUJBQW1CO29CQUN4QixJQUFJLFdBQVc7d0JBQ1gsTUFBTTs7b0JBRVYsSUFBSSxPQUFPLHFCQUNQLDZDQUE2QyxNQUFNO29CQUN2RCxLQUFLO29CQUNMLE9BQU87OztnQkFHWCxTQUFTLGtCQUFrQixNQUFNO29CQUM3QixJQUFJLEtBQUssS0FBSyxxQkFBcUIsS0FBSztvQkFDeEMsT0FBQSw0QkFBaUM7OztnQkFHckMsU0FBUyxjQUFjLFlBQU07O29CQUV6QixHQUFHLDBCQUEwQixZQUFNO3dCQUMvQixPQUFPO3dCQUNQLE9BQU8sWUFBQTs0QkFTUyxPQVRIOzJCQUFvQjs7OztnQkFLekMsU0FBUyxrQkFBa0IsWUFBTTs7b0JBRTdCLEdBQUcsK0NBQStDLFlBQU07d0JBQ3BELGNBQWM7d0JBQ2QsSUFBSSxpQkFBaUIsUUFBUSxRQUFRO3dCQUNyQyxJQUFJLFFBQVEsZUFBZSxLQUFLO3dCQUNoQyxPQUFPLE1BQU0sUUFBUSxRQUFRO3dCQUM3QixPQUFPLE1BQU0sR0FBRyxVQUFVLFNBQVMscUJBQXFCLFFBQVE7d0JBQ2hFLElBQUksZ0JBQWdCLFFBQVEsS0FBSyxrQkFBa0I7d0JBQ25ELE9BQU8sY0FBYyxRQUFRLFFBQVE7OztvQkFHekMsR0FBRyx1Q0FBdUMsWUFBTTs7d0JBRTVDLE1BQU0sbUJBQW1CO3dCQUN6QixJQUFJLE9BQU87d0JBQ1gsS0FBSzt3QkFDTCxPQUFPLGtCQUFrQixJQUFJOzs7b0JBR2pDLEdBQUcsMENBQTBDLFlBQU07O3dCQUUvQyxNQUFNLG1CQUFtQjt3QkFDekIsY0FBYzt3QkFDZCxJQUFJLGdCQUFnQixRQUFRLEtBQUssa0JBQWtCO3dCQUNuRCxjQUFjO3dCQUNkLE9BQU87d0JBQ1AsT0FBTyxrQkFBa0IsSUFBSTt3QkFDN0IsSUFBSSxPQUFPLGtCQUFrQixHQUFHLE1BQU0sYUFBYTt3QkFDbkQsT0FBTyxLQUFLLEdBQUcsU0FBUyxRQUFRO3dCQUNoQyxPQUFPLEtBQUssR0FBRyxtQkFBbUIsVUFBVTs7O29CQUdoRCxHQUFHLGlEQUFpRCxZQUFNOzt3QkFFdEQsTUFBTSxtQkFBbUI7d0JBQ3pCLElBQUksY0FBYzs0QkFDVixZQUFZOzRCQUNaLG1CQUFtQjs0QkFDbkIsa0JBQWtCOzRCQUNsQixRQUFROzRCQUNSLFVBQVU7NEJBQ1YsY0FBYzs0QkFDZCxhQUFhOzRCQUNiLG1CQUFtQjs0QkFDbkIsVUFBVSxDQUFDO2dDQUNQLFFBQVE7Z0NBQ1IsTUFBTTtnQ0FDTixTQUFTOzs0QkFFYixtQkFBbUI7O3dCQUUzQixjQUFjO3dCQUNkLElBQUksZ0JBQWdCLFFBQVEsS0FBSyxrQkFBa0I7d0JBQ25ELGNBQWM7d0JBQ2QsT0FBTzt3QkFDUCxPQUFPLGtCQUFrQixJQUFJO3dCQUM3QixJQUFJLE9BQU8sa0JBQWtCLEdBQUcsTUFBTSxhQUFhO3dCQUNuRCxPQUFPLEtBQUssR0FBRyxTQUFTLFFBQVE7d0JBQ2hDLE9BQU8sS0FBSyxHQUFHLG1CQUFtQixVQUFVOzs7O2dCQUlwRCxHQUFHLGlFQUFpRSxZQUFNO29CQUN0RSxLQUFLLG9CQUFvQjtvQkFDekIsY0FBYztvQkFDZCxPQUFPLFFBQVEsS0FBSyxVQUFVLFFBQVEsUUFBUTs7O2dCQUdsRCxHQUFHLDRFQUE0RSxZQUFNO29CQUNqRixPQUFPLEtBQUs7b0JBQ1osT0FBTyxLQUFLO29CQUNaLGNBQWM7b0JBQ2QsT0FBTyxRQUFRLEtBQUssVUFBVSxRQUFRLFFBQVE7Ozs7O0dBY25EIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SW50ZXJhY3Rpb25zRGV0YWlsQ29sdW1uQ29tcG9uZW50VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ3NwSWRlbnRpdHlSZXF1ZXN0SW50ZXJhY3Rpb25zRGV0YWlsQ29sdW1uJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbGV0IGVsZW1lbnREZWZpbml0aW9uID1cclxuICAgICAgICBgPHNwLWlkZW50aXR5LXJlcXVlc3QtaW50ZXJhY3Rpb25zLWRldGFpbC1jb2x1bW4gc3AtbW9kZWw9XCJpdGVtXCIgLz5gLFxyXG4gICAgICAgICRzY29wZSwgJGNvbXBpbGUsICRjb21wb25lbnRDb250cm9sbGVyLCBlbGVtZW50LCBpdGVtLCBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSxcclxuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eVJlcXVlc3RNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV8sXHJcbiAgICAgICAgXyRjb21wb25lbnRDb250cm9sbGVyXywgX25hdmlnYXRpb25TZXJ2aWNlXykge1xyXG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XHJcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xyXG4gICAgICAgICRjb21wb25lbnRDb250cm9sbGVyID0gXyRjb21wb25lbnRDb250cm9sbGVyXztcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSA9IF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV87XHJcbiAgICAgICAgaXRlbSA9IGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfQVBQUk9WQUxfU1VNTUFSWV8xO1xyXG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcclxuXHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChpdGVtKSB7XHJcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XHJcbiAgICAgICAgJHNjb3BlLml0ZW0gPSBpdGVtO1xyXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgbGV0IGJpbmRpbmdzID0ge1xyXG4gICAgICAgICAgICBpdGVtOiBpdGVtXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgY3RybCA9ICRjb21wb25lbnRDb250cm9sbGVyKFxyXG4gICAgICAgICAgICAnc3BJZGVudGl0eVJlcXVlc3RJbnRlcmFjdGlvbnNEZXRhaWxDb2x1bW4nLCBudWxsLCBiaW5kaW5ncyk7XHJcbiAgICAgICAgY3RybC4kb25Jbml0KCk7XHJcbiAgICAgICAgcmV0dXJuIGN0cmw7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QnV0dG9uU2VsZWN0b3IoaXRlbSkge1xyXG4gICAgICAgIGxldCBpZCA9IGl0ZW0ud29ya0l0ZW1BcmNoaXZlSWQgfHwgaXRlbS53b3JrSXRlbUlkO1xyXG4gICAgICAgIHJldHVybiBgI2ludGVyYWN0aW9uc0RldGFpbEJ0bi0ke2lkfWA7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnRyb2xsZXInLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aG91dCBhbiBpdGVtJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtID0gbnVsbDtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUNvbnRyb2xsZXIoKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdkZXRhaWxzIGJ1dHRvbicsICgpID0+IHtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIHRoZSBkZXRhaWxzIGJ1dHRvbiBpZiB1c2VyIGhhcyBhY2Nlc3MnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIGxldCBjb21tZW50RWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICAgICAgbGV0IGljb25zID0gY29tbWVudEVsZW1lbnQuZmluZCgnaScpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWNvbnMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWNvbnNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS1jaGV2cm9uLXJpZ2h0JykpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGxldCBkZXRhaWxzQnV0dG9uID0gZWxlbWVudC5maW5kKGdldEJ1dHRvblNlbGVjdG9yKGl0ZW0pKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRldGFpbHNCdXR0b24ubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0aGUgbmF2aWdhdGlvblNlcnZpY2UnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihuYXZpZ2F0aW9uU2VydmljZSwgJ2dvJyk7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBjdHJsLmdvVG9Xb3JrSXRlbVBhZ2UoKTtcclxuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCduYXZpZ2F0ZXMgdG8gdGhlIHdvcmtJdGVtIGRldGFpbHMgcGFnZScsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHNweU9uKG5hdmlnYXRpb25TZXJ2aWNlLCAnZ28nKTtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChpdGVtKTtcclxuICAgICAgICAgICAgbGV0IGRldGFpbHNCdXR0b24gPSBlbGVtZW50LmZpbmQoZ2V0QnV0dG9uU2VsZWN0b3IoaXRlbSkpO1xyXG4gICAgICAgICAgICBkZXRhaWxzQnV0dG9uLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGxldCBhcmdzID0gbmF2aWdhdGlvblNlcnZpY2UuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdLm91dGNvbWUpLnRvRXF1YWwoJ3ZpZXdXb3JrSXRlbT9pZD0xJnJlc2V0PXRydWUnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0ubmF2aWdhdGlvbkhpc3RvcnkpLnRvQ29udGFpbigndmlld0FjY2Vzc1JlcXVlc3RzIy9yZXF1ZXN0Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCduYXZpZ2F0ZXMgdG8gdGhlIHdvcmtJdGVtQXJjaGl2ZSBkZXRhaWxzIHBhZ2UnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihuYXZpZ2F0aW9uU2VydmljZSwgJ2dvJyk7XHJcbiAgICAgICAgICAgIGxldCBhbm90aGVySXRlbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB3b3JrSXRlbUlkOiAnMTEnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtQXJjaGl2ZUlkOiAnMjInLFxyXG4gICAgICAgICAgICAgICAgICAgIG93bmVyRGlzcGxheU5hbWU6ICdKb2UgU21pdGgnLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ3N0YXR1c19tZXNzYWdlX2tleScsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbkRhdGU6IDE0OTYzNTI0MTE3NjgsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVEYXRlOiAxNDk2MzUyNDExNzY4LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnYXBwcm92aW5nJyxcclxuICAgICAgICAgICAgICAgICAgICBhcHByb3ZhbEl0ZW1Db3VudDogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb21tZW50czogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yOiAnVGVzdCBVc2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogMTQ5NjM1MjQxMTc2OCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudDogJ3NvbWUgY29tbWVudHMgaGVyZSdcclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICBoYXNXb3JrSXRlbUFjY2VzczogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChhbm90aGVySXRlbSk7XHJcbiAgICAgICAgICAgIGxldCBkZXRhaWxzQnV0dG9uID0gZWxlbWVudC5maW5kKGdldEJ1dHRvblNlbGVjdG9yKGFub3RoZXJJdGVtKSk7XHJcbiAgICAgICAgICAgIGRldGFpbHNCdXR0b24uY2xpY2soKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgbGV0IGFyZ3MgPSBuYXZpZ2F0aW9uU2VydmljZS5nby5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0ub3V0Y29tZSkudG9FcXVhbCgndmlld1dvcmtJdGVtQXJjaGl2ZT9pZD0yMicpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXJnc1swXS5uYXZpZ2F0aW9uSGlzdG9yeSkudG9Db250YWluKCd2aWV3QWNjZXNzUmVxdWVzdHMjL3JlcXVlc3QnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG93cyBtZXNzYWdlIGluc3RlYWQgb2YgdXNlciBoYXMgbm8gYWNjZXNzIHRvIHZpZXcgd29yayBpdGVtJywgKCkgPT4ge1xyXG4gICAgICAgIGl0ZW0uaGFzV29ya0l0ZW1BY2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICBjcmVhdGVFbGVtZW50KGl0ZW0pO1xyXG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ2J1dHRvbicpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG93cyBtZXNzYWdlIGluc3RlYWQgb2YgdGhlcmUgaXMgbm8gd29yayBpdGVtIG9yIGFyY2hpdmUgdG8gbmF2aWdhdGUgdG8nLCAoKSA9PiB7XHJcbiAgICAgICAgZGVsZXRlIGl0ZW0ud29ya0l0ZW1JZDtcclxuICAgICAgICBkZWxldGUgaXRlbS53b3JrSXRlbUFyY2hpdmVJZDtcclxuICAgICAgICBjcmVhdGVFbGVtZW50KGl0ZW0pO1xyXG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ2J1dHRvbicpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
