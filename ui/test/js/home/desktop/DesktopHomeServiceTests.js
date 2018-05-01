System.register(['test/js/TestInitializer', 'home/desktop/DesktopHomeModule'], function (_export) {
    'use strict';

    var desktopHomeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeDesktopDesktopHomeModule) {
            desktopHomeModule = _homeDesktopDesktopHomeModule['default'];
        }],
        execute: function () {

            describe('DesktopHomeService', function () {
                var $scope,
                    $httpBackend,
                    desktopHomeService,
                    DesktopHomePage,
                    url = '/ui/rest/me/home',
                    testHomePage = {
                    widgets: [{
                        name: 'widget1',
                        id: '1234'
                    }, {
                        name: 'widget2',
                        id: '0000'
                    }],
                    quickLinkCards: [{
                        name: 'card1',
                        id: '8888'
                    }],
                    contentOrder: ['Widget', 'QuickLinkCard']
                };

                beforeEach(module(desktopHomeModule));

                beforeEach(inject(function (_desktopHomeService_, _$rootScope_, _$httpBackend_, _DesktopHomePage_) {
                    $scope = _$rootScope_.$new();
                    desktopHomeService = _desktopHomeService_;
                    $httpBackend = _$httpBackend_;
                    DesktopHomePage = _DesktopHomePage_;
                }));

                describe('getHomePage', function () {
                    it('gets the home page', function () {
                        var homePage;

                        $httpBackend.expectGET(url).respond(200, testHomePage);
                        desktopHomeService.getHomePage().then(function (response) {
                            homePage = response;
                        });
                        $httpBackend.flush();
                        $scope.$apply();

                        expect(homePage).toEqual(new DesktopHomePage(testHomePage));
                    });

                    it('resolves to null if there is no data in the response', function () {
                        var homePage;

                        $httpBackend.expectGET(url).respond(200, undefined);
                        desktopHomeService.getHomePage().then(function (response) {
                            homePage = response;
                        });
                        $httpBackend.flush();
                        $scope.$apply();

                        expect(homePage).toEqual(null);
                    });
                });

                describe('saveHomPage', function () {
                    it('throws up with no home page', function () {
                        expect(function () {
                            desktopHomeService.saveHomePage();
                        }).toThrow();
                    });

                    it('puts the home page', function () {
                        $httpBackend.expect('PUT', url, testHomePage).respond(200);
                        desktopHomeService.saveHomePage(testHomePage);
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvZGVza3RvcC9EZXNrdG9wSG9tZVNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsbUNBQW1DLFVBQVUsU0FBUztJQUFsRzs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsK0JBQStCO1lBQ3JGLG9CQUFvQiw4QkFBOEI7O1FBRXRELFNBQVMsWUFBWTs7WUFIN0IsU0FBUyxzQkFBc0IsWUFBVztnQkFDdEMsSUFBSTtvQkFBUTtvQkFBYztvQkFBb0I7b0JBQzFDLE1BQU07b0JBQ04sZUFBZTtvQkFDWCxTQUFTLENBQUM7d0JBQ04sTUFBTTt3QkFDTixJQUFJO3VCQUNOO3dCQUNFLE1BQU07d0JBQ04sSUFBSTs7b0JBRVIsZ0JBQWdCLENBQUM7d0JBQ2IsTUFBTTt3QkFDTixJQUFJOztvQkFFUixjQUFjLENBQUMsVUFBVTs7O2dCQUdqQyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxzQkFBc0IsY0FBYyxnQkFBZ0IsbUJBQW1CO29CQUM5RixTQUFTLGFBQWE7b0JBQ3RCLHFCQUFxQjtvQkFDckIsZUFBZTtvQkFDZixrQkFBa0I7OztnQkFHdEIsU0FBUyxlQUFlLFlBQVc7b0JBQy9CLEdBQUksc0JBQXNCLFlBQVc7d0JBQ2pDLElBQUk7O3dCQUVKLGFBQWEsVUFBVSxLQUFLLFFBQVEsS0FBSzt3QkFDekMsbUJBQW1CLGNBQWMsS0FBSyxVQUFTLFVBQVU7NEJBQ3JELFdBQVc7O3dCQUVmLGFBQWE7d0JBQ2IsT0FBTzs7d0JBRVAsT0FBTyxVQUFVLFFBQVEsSUFBSSxnQkFBZ0I7OztvQkFHakQsR0FBSSx3REFBd0QsWUFBVzt3QkFDbkUsSUFBSTs7d0JBRUosYUFBYSxVQUFVLEtBQUssUUFBUSxLQUFLO3dCQUN6QyxtQkFBbUIsY0FBYyxLQUFLLFVBQVMsVUFBVTs0QkFDckQsV0FBVzs7d0JBRWYsYUFBYTt3QkFDYixPQUFPOzt3QkFFUCxPQUFPLFVBQVUsUUFBUTs7OztnQkFJakMsU0FBUyxlQUFlLFlBQVc7b0JBQy9CLEdBQUcsK0JBQStCLFlBQVc7d0JBQ3pDLE9BQU8sWUFBVzs0QkFDZCxtQkFBbUI7MkJBQ3BCOzs7b0JBR1AsR0FBRyxzQkFBc0IsWUFBVzt3QkFDaEMsYUFBYSxPQUFPLE9BQU8sS0FBSyxjQUFjLFFBQVE7d0JBQ3RELG1CQUFtQixhQUFhO3dCQUNoQyxhQUFhOzs7Ozs7R0FjdEIiLCJmaWxlIjoiaG9tZS9kZXNrdG9wL0Rlc2t0b3BIb21lU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBkZXNrdG9wSG9tZU1vZHVsZSBmcm9tICdob21lL2Rlc2t0b3AvRGVza3RvcEhvbWVNb2R1bGUnO1xuXG5kZXNjcmliZSgnRGVza3RvcEhvbWVTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRzY29wZSwgJGh0dHBCYWNrZW5kLCBkZXNrdG9wSG9tZVNlcnZpY2UsIERlc2t0b3BIb21lUGFnZSxcbiAgICAgICAgdXJsID0gJy91aS9yZXN0L21lL2hvbWUnLFxuICAgICAgICB0ZXN0SG9tZVBhZ2UgPSB7XG4gICAgICAgICAgICB3aWRnZXRzOiBbe1xuICAgICAgICAgICAgICAgIG5hbWU6ICd3aWRnZXQxJyxcbiAgICAgICAgICAgICAgICBpZDogJzEyMzQnXG4gICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnd2lkZ2V0MicsXG4gICAgICAgICAgICAgICAgaWQ6ICcwMDAwJ1xuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBxdWlja0xpbmtDYXJkczogW3tcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2FyZDEnLFxuICAgICAgICAgICAgICAgIGlkOiAnODg4OCdcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgY29udGVudE9yZGVyOiBbJ1dpZGdldCcsICdRdWlja0xpbmtDYXJkJ11cbiAgICAgICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRlc2t0b3BIb21lTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfZGVza3RvcEhvbWVTZXJ2aWNlXywgXyRyb290U2NvcGVfLCBfJGh0dHBCYWNrZW5kXywgX0Rlc2t0b3BIb21lUGFnZV8pIHtcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICAgICAgZGVza3RvcEhvbWVTZXJ2aWNlID0gX2Rlc2t0b3BIb21lU2VydmljZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBEZXNrdG9wSG9tZVBhZ2UgPSBfRGVza3RvcEhvbWVQYWdlXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0SG9tZVBhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQgKCdnZXRzIHRoZSBob21lIHBhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBob21lUGFnZTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVCh1cmwpLnJlc3BvbmQoMjAwLCB0ZXN0SG9tZVBhZ2UpO1xuICAgICAgICAgICAgZGVza3RvcEhvbWVTZXJ2aWNlLmdldEhvbWVQYWdlKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGhvbWVQYWdlID0gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3QoaG9tZVBhZ2UpLnRvRXF1YWwobmV3IERlc2t0b3BIb21lUGFnZSh0ZXN0SG9tZVBhZ2UpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQgKCdyZXNvbHZlcyB0byBudWxsIGlmIHRoZXJlIGlzIG5vIGRhdGEgaW4gdGhlIHJlc3BvbnNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaG9tZVBhZ2U7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGRlc2t0b3BIb21lU2VydmljZS5nZXRIb21lUGFnZSgpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBob21lUGFnZSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGhvbWVQYWdlKS50b0VxdWFsKG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzYXZlSG9tUGFnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgndGhyb3dzIHVwIHdpdGggbm8gaG9tZSBwYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZGVza3RvcEhvbWVTZXJ2aWNlLnNhdmVIb21lUGFnZSgpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHV0cyB0aGUgaG9tZSBwYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0KCdQVVQnLCB1cmwsIHRlc3RIb21lUGFnZSkucmVzcG9uZCgyMDApO1xuICAgICAgICAgICAgZGVza3RvcEhvbWVTZXJ2aWNlLnNhdmVIb21lUGFnZSh0ZXN0SG9tZVBhZ2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
