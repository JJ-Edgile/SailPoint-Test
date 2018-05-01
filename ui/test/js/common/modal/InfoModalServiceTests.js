System.register(['test/js/TestInitializer', 'common/modal/ModalModule'], function (_export) {

    /**
     * Tests for the InfoModalService.
     */
    'use strict';

    var modalModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModalModalModule) {
            modalModule = _commonModalModalModule['default'];
        }],
        execute: function () {
            describe('InfoModalService', function () {

                var $rootScope,
                    $uibModal,
                    scope,
                    infoModalService,
                    config,
                    title = 'My Title',
                    content = '<h1>Hi mom!</h1>',
                    id = '123456';

                // Let the tests know we'll use the component module.
                beforeEach(module(modalModule));

                /**
                 * Setup the mocks for our tests.
                 */
                beforeEach(inject(function (_$rootScope_, _$uibModal_, _infoModalService_) {
                    var rootScopeInitialized;
                    $rootScope = _$rootScope_;
                    $uibModal = _$uibModal_;
                    infoModalService = _infoModalService_;

                    // Create a new scope that will be returned when $new is called.
                    scope = $rootScope.$new();
                    $rootScope._$new = $rootScope.$new;
                    spyOn($rootScope, '$new').and.callFake(function () {
                        if (!rootScopeInitialized) {
                            rootScopeInitialized = true;
                            return scope;
                        }
                        return this._$new();
                    });

                    // Spy on the open function of modal.
                    spyOn($uibModal, 'open').and.callThrough();

                    // Create the default config
                    config = {
                        title: title,
                        content: content,
                        id: id
                    };
                }));

                // After each test remove the modal dialog
                afterEach(function () {
                    angular.element('.modal-dialog').remove();
                });

                describe('open', function () {
                    var title = 'My Title',
                        content = '<h1>Hi mom!</h1>',
                        id = '123456';

                    it('allows a null id', function () {
                        infoModalService.open(title, content, null);
                        expect(scope.dialogId).toEqual('infoModal');
                    });

                    it('throws with no title', function () {
                        expect(function () {
                            infoModalService.open(null, content, id);
                        }).toThrow();
                    });

                    it('throws with no content', function () {
                        expect(function () {
                            infoModalService.open(title, null, id);
                        }).toThrow();
                    });

                    it('creates a new scope', function () {
                        infoModalService.open(title, content, id);
                        expect($rootScope.$new).toHaveBeenCalled();
                    });

                    it('populates the new scope', function () {
                        infoModalService.open(title, content, id);
                        expect(scope.title).toEqual(title);
                        expect(scope.content).toEqual(content);
                        expect(scope.dialogId).toEqual(id);
                    });

                    it('opens a modal', function () {
                        var args;

                        infoModalService.open(title, content, id);

                        expect($uibModal.open).toHaveBeenCalled();
                        args = $uibModal.open.calls.mostRecent().args[0];
                        expect(args.scope).toEqual(scope);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RhbC9JbmZvTW9kYWxTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZCQUE2QixVQUFVLFNBQVM7Ozs7O0lBS3hGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7O1FBRTFDLFNBQVMsWUFBWTtZQU43QixTQUFTLG9CQUFvQixZQUFXOztnQkFFcEMsSUFBSTtvQkFBWTtvQkFBVztvQkFBTztvQkFBa0I7b0JBQ2hELFFBQVE7b0JBQ1IsVUFBVTtvQkFDVixLQUFLOzs7Z0JBR1QsV0FBVyxPQUFPOzs7OztnQkFLbEIsV0FBVyxPQUFPLFVBQVMsY0FBYyxhQUFhLG9CQUFvQjtvQkFDdEUsSUFBSTtvQkFDSixhQUFhO29CQUNiLFlBQVk7b0JBQ1osbUJBQW1COzs7b0JBR25CLFFBQVEsV0FBVztvQkFDbkIsV0FBVyxRQUFRLFdBQVc7b0JBQzlCLE1BQU0sWUFBWSxRQUFRLElBQUksU0FBUyxZQUFXO3dCQUM5QyxJQUFHLENBQUMsc0JBQXNCOzRCQUN0Qix1QkFBdUI7NEJBQ3ZCLE9BQU87O3dCQUVYLE9BQU8sS0FBSzs7OztvQkFJaEIsTUFBTSxXQUFXLFFBQVEsSUFBSTs7O29CQUc3QixTQUFTO3dCQUNMLE9BQU87d0JBQ1AsU0FBUzt3QkFDVCxJQUFJOzs7OztnQkFLWixVQUFVLFlBQVc7b0JBQ2pCLFFBQVEsUUFBUSxpQkFBaUI7OztnQkFHckMsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLElBQUksUUFBUTt3QkFDUixVQUFVO3dCQUNWLEtBQUs7O29CQUVULEdBQUcsb0JBQW9CLFlBQVc7d0JBQzlCLGlCQUFpQixLQUFLLE9BQU8sU0FBUzt3QkFDdEMsT0FBTyxNQUFNLFVBQVUsUUFBUTs7O29CQUduQyxHQUFHLHdCQUF3QixZQUFXO3dCQUNsQyxPQUFPLFlBQVc7NEJBQUUsaUJBQWlCLEtBQUssTUFBTSxTQUFTOzJCQUFROzs7b0JBR3JFLEdBQUcsMEJBQTBCLFlBQVc7d0JBQ3BDLE9BQU8sWUFBVzs0QkFBRSxpQkFBaUIsS0FBSyxPQUFPLE1BQU07MkJBQVE7OztvQkFHbkUsR0FBRyx1QkFBdUIsWUFBVzt3QkFDakMsaUJBQWlCLEtBQUssT0FBTyxTQUFTO3dCQUN0QyxPQUFPLFdBQVcsTUFBTTs7O29CQUc1QixHQUFHLDJCQUEyQixZQUFXO3dCQUNyQyxpQkFBaUIsS0FBSyxPQUFPLFNBQVM7d0JBQ3RDLE9BQU8sTUFBTSxPQUFPLFFBQVE7d0JBQzVCLE9BQU8sTUFBTSxTQUFTLFFBQVE7d0JBQzlCLE9BQU8sTUFBTSxVQUFVLFFBQVE7OztvQkFHbkMsR0FBRyxpQkFBaUIsWUFBVzt3QkFDM0IsSUFBSTs7d0JBRUosaUJBQWlCLEtBQUssT0FBTyxTQUFTOzt3QkFFdEMsT0FBTyxVQUFVLE1BQU07d0JBQ3ZCLE9BQU8sVUFBVSxLQUFLLE1BQU0sYUFBYSxLQUFLO3dCQUM5QyxPQUFPLEtBQUssT0FBTyxRQUFROzs7Ozs7R0FxQnBDIiwiZmlsZSI6ImNvbW1vbi9tb2RhbC9JbmZvTW9kYWxTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IG1vZGFsTW9kdWxlIGZyb20gJ2NvbW1vbi9tb2RhbC9Nb2RhbE1vZHVsZSc7XHJcblxyXG4vKipcclxuICogVGVzdHMgZm9yIHRoZSBJbmZvTW9kYWxTZXJ2aWNlLlxyXG4gKi9cclxuZGVzY3JpYmUoJ0luZm9Nb2RhbFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgJHJvb3RTY29wZSwgJHVpYk1vZGFsLCBzY29wZSwgaW5mb01vZGFsU2VydmljZSwgY29uZmlnLFxyXG4gICAgICAgIHRpdGxlID0gJ015IFRpdGxlJyxcclxuICAgICAgICBjb250ZW50ID0gJzxoMT5IaSBtb20hPC9oMT4nLFxyXG4gICAgICAgIGlkID0gJzEyMzQ1Nic7XHJcblxyXG4gICAgLy8gTGV0IHRoZSB0ZXN0cyBrbm93IHdlJ2xsIHVzZSB0aGUgY29tcG9uZW50IG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1vZGFsTW9kdWxlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCB0aGUgbW9ja3MgZm9yIG91ciB0ZXN0cy5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJHVpYk1vZGFsXywgX2luZm9Nb2RhbFNlcnZpY2VfKSB7XHJcbiAgICAgICAgdmFyIHJvb3RTY29wZUluaXRpYWxpemVkO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICAgICAgJHVpYk1vZGFsID0gXyR1aWJNb2RhbF87XHJcbiAgICAgICAgaW5mb01vZGFsU2VydmljZSA9IF9pbmZvTW9kYWxTZXJ2aWNlXztcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHNjb3BlIHRoYXQgd2lsbCBiZSByZXR1cm5lZCB3aGVuICRuZXcgaXMgY2FsbGVkLlxyXG4gICAgICAgIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgJHJvb3RTY29wZS5fJG5ldyA9ICRyb290U2NvcGUuJG5ldztcclxuICAgICAgICBzcHlPbigkcm9vdFNjb3BlLCAnJG5ldycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoIXJvb3RTY29wZUluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICByb290U2NvcGVJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NvcGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXyRuZXcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU3B5IG9uIHRoZSBvcGVuIGZ1bmN0aW9uIG9mIG1vZGFsLlxyXG4gICAgICAgIHNweU9uKCR1aWJNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbFRocm91Z2goKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGNvbmZpZ1xyXG4gICAgICAgIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICBpZDogaWRcclxuICAgICAgICB9O1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIEFmdGVyIGVhY2ggdGVzdCByZW1vdmUgdGhlIG1vZGFsIGRpYWxvZ1xyXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnLm1vZGFsLWRpYWxvZycpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ29wZW4nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdGl0bGUgPSAnTXkgVGl0bGUnLFxyXG4gICAgICAgICAgICBjb250ZW50ID0gJzxoMT5IaSBtb20hPC9oMT4nLFxyXG4gICAgICAgICAgICBpZCA9ICcxMjM0NTYnO1xyXG5cclxuICAgICAgICBpdCgnYWxsb3dzIGEgbnVsbCBpZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpbmZvTW9kYWxTZXJ2aWNlLm9wZW4odGl0bGUsIGNvbnRlbnQsIG51bGwpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGlhbG9nSWQpLnRvRXF1YWwoJ2luZm9Nb2RhbCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gdGl0bGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBpbmZvTW9kYWxTZXJ2aWNlLm9wZW4obnVsbCwgY29udGVudCwgaWQpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBjb250ZW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgaW5mb01vZGFsU2VydmljZS5vcGVuKHRpdGxlLCBudWxsLCBpZCk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NyZWF0ZXMgYSBuZXcgc2NvcGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaW5mb01vZGFsU2VydmljZS5vcGVuKHRpdGxlLCBjb250ZW50LCBpZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgkcm9vdFNjb3BlLiRuZXcpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3BvcHVsYXRlcyB0aGUgbmV3IHNjb3BlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGluZm9Nb2RhbFNlcnZpY2Uub3Blbih0aXRsZSwgY29udGVudCwgaWQpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUudGl0bGUpLnRvRXF1YWwodGl0bGUpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuY29udGVudCkudG9FcXVhbChjb250ZW50KTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRpYWxvZ0lkKS50b0VxdWFsKGlkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ29wZW5zIGEgbW9kYWwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGFyZ3M7XHJcblxyXG4gICAgICAgICAgICBpbmZvTW9kYWxTZXJ2aWNlLm9wZW4odGl0bGUsIGNvbnRlbnQsIGlkKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdCgkdWliTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBhcmdzID0gJHVpYk1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XHJcbiAgICAgICAgICAgIGV4cGVjdChhcmdzLnNjb3BlKS50b0VxdWFsKHNjb3BlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
