System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', 'test/js/TestModule', './AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the AccessRequestCommentDialogCtrl.
             */
            describe('AccessRequestCommentDialogCtrl', function () {
                var ctrl, $uibModalInstance, requestedRoleItem, requestedEntItem, entItem, roleItem, $controller, $rootScope;

                beforeEach(module(testModule));

                beforeEach(module(accessRequestModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                beforeEach(inject(function (_$controller_, RequestedAccessItem, AccessRequestItem, _$rootScope_, accessRequestTestData) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;

                    $uibModalInstance = {
                        close: jasmine.createSpy(),
                        dismiss: jasmine.createSpy()
                    };

                    roleItem = new AccessRequestItem(accessRequestTestData.ROLE);
                    entItem = new AccessRequestItem(accessRequestTestData.ENTITLEMENT);

                    requestedRoleItem = new RequestedAccessItem(roleItem);
                    requestedEntItem = new RequestedAccessItem(entItem);
                }));

                it('initializes empty values correctly', function () {
                    ctrl = $controller('AccessRequestCommentDialogCtrl', {
                        requestedAccessItem: requestedRoleItem,
                        $uibModalInstance: $uibModalInstance
                    });

                    expect(ctrl.comment).toEqual(null);
                    expect(ctrl.assignmentNote).toEqual(null);
                });

                it('initializes non-empty values correctly', function () {
                    var comment = 'some comment',
                        note = 'some note';

                    requestedRoleItem.setComment(comment);
                    requestedRoleItem.setAssignmentNote(note);

                    ctrl = $controller('AccessRequestCommentDialogCtrl', {
                        requestedAccessItem: requestedRoleItem,
                        $uibModalInstance: $uibModalInstance
                    });

                    expect(ctrl.comment).toEqual(comment);
                    expect(ctrl.assignmentNote).toEqual(note);
                });

                it('should allow assignment note tab when requested item allows it', function () {
                    ctrl = $controller('AccessRequestCommentDialogCtrl', {
                        requestedAccessItem: requestedRoleItem,
                        $uibModalInstance: $uibModalInstance
                    });

                    expect(ctrl.isAssignmentNoteAllowed()).toEqual(requestedRoleItem.isAssignmentNoteAllowed());
                });

                describe('save', function () {
                    var comment = 'some comment',
                        note = 'some note',
                        newComment = 'new comment',
                        newNote = 'new note';

                    beforeEach(function () {
                        requestedRoleItem.setComment(comment);
                        requestedRoleItem.setAssignmentNote(note);

                        ctrl = $controller('AccessRequestCommentDialogCtrl', {
                            requestedAccessItem: requestedRoleItem,
                            $uibModalInstance: $uibModalInstance
                        });

                        ctrl.comment = newComment;
                        ctrl.assignmentNote = newNote;

                        ctrl.saveComment();
                    });

                    it('saves comment and assignment note', function () {
                        expect(requestedRoleItem.getComment()).toEqual(newComment);
                        expect(requestedRoleItem.getAssignmentNote()).toEqual(newNote);
                    });

                    it('closes modal', function () {
                        expect($uibModalInstance.close).toHaveBeenCalled();
                    });
                });

                describe('cancel', function () {
                    beforeEach(function () {
                        ctrl = $controller('AccessRequestCommentDialogCtrl', {
                            requestedAccessItem: requestedRoleItem,
                            $uibModalInstance: $uibModalInstance
                        });

                        ctrl.cancel();
                    });

                    it('should dismiss modal', function () {
                        expect($uibModalInstance.dismiss).toHaveBeenCalled();
                    });

                    it('should not modify requested item comment or note field', function () {
                        expect(requestedRoleItem.getComment()).toEqual(null);
                        expect(requestedRoleItem.getAssignmentNote()).toEqual(null);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdENvbW1lbnREaWFsb2dDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxzQkFBc0IsNEJBQTRCLFVBQVUsU0FBUztJQUF0Sjs7SUFHSSxJQUFJLHFCQUFxQjtJQUN6QixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjtXQUNoQyxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7Ozs7O1lBQTdCLFNBQVMsa0NBQWtDLFlBQVc7Z0JBQ2xELElBQUksTUFBTSxtQkFBbUIsbUJBQW1CLGtCQUFrQixTQUFTLFVBQVUsYUFBYTs7Z0JBRWxHLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLGVBQWUscUJBQXFCLG1CQUFtQixjQUN2RCx1QkFBdUI7b0JBQzlDLGNBQWM7b0JBQ2QsYUFBYTs7b0JBRWIsb0JBQW9CO3dCQUNoQixPQUFPLFFBQVE7d0JBQ2YsU0FBUyxRQUFROzs7b0JBR3JCLFdBQVcsSUFBSSxrQkFBa0Isc0JBQXNCO29CQUN2RCxVQUFVLElBQUksa0JBQWtCLHNCQUFzQjs7b0JBRXRELG9CQUFvQixJQUFJLG9CQUFvQjtvQkFDNUMsbUJBQW1CLElBQUksb0JBQW9COzs7Z0JBRy9DLEdBQUcsc0NBQXNDLFlBQVc7b0JBQ2hELE9BQU8sWUFBWSxrQ0FBa0M7d0JBQ2pELHFCQUFxQjt3QkFDckIsbUJBQW1COzs7b0JBR3ZCLE9BQU8sS0FBSyxTQUFTLFFBQVE7b0JBQzdCLE9BQU8sS0FBSyxnQkFBZ0IsUUFBUTs7O2dCQUd4QyxHQUFHLDBDQUEwQyxZQUFXO29CQUNwRCxJQUFJLFVBQVU7d0JBQ1YsT0FBTzs7b0JBRVgsa0JBQWtCLFdBQVc7b0JBQzdCLGtCQUFrQixrQkFBa0I7O29CQUVwQyxPQUFPLFlBQVksa0NBQWtDO3dCQUNqRCxxQkFBcUI7d0JBQ3JCLG1CQUFtQjs7O29CQUd2QixPQUFPLEtBQUssU0FBUyxRQUFRO29CQUM3QixPQUFPLEtBQUssZ0JBQWdCLFFBQVE7OztnQkFHeEMsR0FBRyxrRUFBa0UsWUFBVztvQkFDNUUsT0FBTyxZQUFZLGtDQUFrQzt3QkFDakQscUJBQXFCO3dCQUNyQixtQkFBbUI7OztvQkFHdkIsT0FBTyxLQUFLLDJCQUEyQixRQUFRLGtCQUFrQjs7O2dCQUdyRSxTQUFTLFFBQVEsWUFBVztvQkFDeEIsSUFBSSxVQUFVO3dCQUNWLE9BQU87d0JBQ1AsYUFBYTt3QkFDYixVQUFVOztvQkFFZCxXQUFXLFlBQVc7d0JBQ2xCLGtCQUFrQixXQUFXO3dCQUM3QixrQkFBa0Isa0JBQWtCOzt3QkFFcEMsT0FBTyxZQUFZLGtDQUFrQzs0QkFDakQscUJBQXFCOzRCQUNyQixtQkFBbUI7Ozt3QkFHdkIsS0FBSyxVQUFVO3dCQUNmLEtBQUssaUJBQWlCOzt3QkFFdEIsS0FBSzs7O29CQUdULEdBQUcscUNBQXFDLFlBQVc7d0JBQy9DLE9BQU8sa0JBQWtCLGNBQWMsUUFBUTt3QkFDL0MsT0FBTyxrQkFBa0IscUJBQXFCLFFBQVE7OztvQkFHMUQsR0FBRyxnQkFBZ0IsWUFBVzt3QkFDMUIsT0FBTyxrQkFBa0IsT0FBTzs7OztnQkFJeEMsU0FBUyxVQUFVLFlBQVc7b0JBQzFCLFdBQVcsWUFBVzt3QkFDbEIsT0FBTyxZQUFZLGtDQUFrQzs0QkFDakQscUJBQXFCOzRCQUNyQixtQkFBbUI7Ozt3QkFHdkIsS0FBSzs7O29CQUdULEdBQUcsd0JBQXdCLFlBQVc7d0JBQ2xDLE9BQU8sa0JBQWtCLFNBQVM7OztvQkFHdEMsR0FBRywwREFBMEQsWUFBVzt3QkFDcEUsT0FBTyxrQkFBa0IsY0FBYyxRQUFRO3dCQUMvQyxPQUFPLGtCQUFrQixxQkFBcUIsUUFBUTs7Ozs7O0dBVS9EIiwiZmlsZSI6ImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdENvbW1lbnREaWFsb2dDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgJy4vQWNjZXNzUmVxdWVzdFRlc3REYXRhJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIEFjY2Vzc1JlcXVlc3RDb21tZW50RGlhbG9nQ3RybC5cbiAqL1xuZGVzY3JpYmUoJ0FjY2Vzc1JlcXVlc3RDb21tZW50RGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdHJsLCAkdWliTW9kYWxJbnN0YW5jZSwgcmVxdWVzdGVkUm9sZUl0ZW0sIHJlcXVlc3RlZEVudEl0ZW0sIGVudEl0ZW0sIHJvbGVJdGVtLCAkY29udHJvbGxlciwgJHJvb3RTY29wZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFjY2Vzc1JlcXVlc3RNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cbiAgICAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbnRyb2xsZXJfLCBSZXF1ZXN0ZWRBY2Nlc3NJdGVtLCBBY2Nlc3NSZXF1ZXN0SXRlbSwgXyRyb290U2NvcGVfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSkge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG5cbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICBjbG9zZTogamFzbWluZS5jcmVhdGVTcHkoKSxcbiAgICAgICAgICAgIGRpc21pc3M6IGphc21pbmUuY3JlYXRlU3B5KClcbiAgICAgICAgfTtcblxuICAgICAgICByb2xlSXRlbSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuUk9MRSk7XG4gICAgICAgIGVudEl0ZW0gPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oYWNjZXNzUmVxdWVzdFRlc3REYXRhLkVOVElUTEVNRU5UKTtcblxuICAgICAgICByZXF1ZXN0ZWRSb2xlSXRlbSA9IG5ldyBSZXF1ZXN0ZWRBY2Nlc3NJdGVtKHJvbGVJdGVtKTtcbiAgICAgICAgcmVxdWVzdGVkRW50SXRlbSA9IG5ldyBSZXF1ZXN0ZWRBY2Nlc3NJdGVtKGVudEl0ZW0pO1xuICAgIH0pKTtcblxuICAgIGl0KCdpbml0aWFsaXplcyBlbXB0eSB2YWx1ZXMgY29ycmVjdGx5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQWNjZXNzUmVxdWVzdENvbW1lbnREaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbTogcmVxdWVzdGVkUm9sZUl0ZW0sXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZTogJHVpYk1vZGFsSW5zdGFuY2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXhwZWN0KGN0cmwuY29tbWVudCkudG9FcXVhbChudWxsKTtcbiAgICAgICAgZXhwZWN0KGN0cmwuYXNzaWdubWVudE5vdGUpLnRvRXF1YWwobnVsbCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaW5pdGlhbGl6ZXMgbm9uLWVtcHR5IHZhbHVlcyBjb3JyZWN0bHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvbW1lbnQgPSAnc29tZSBjb21tZW50JyxcbiAgICAgICAgICAgIG5vdGUgPSAnc29tZSBub3RlJztcblxuICAgICAgICByZXF1ZXN0ZWRSb2xlSXRlbS5zZXRDb21tZW50KGNvbW1lbnQpO1xuICAgICAgICByZXF1ZXN0ZWRSb2xlSXRlbS5zZXRBc3NpZ25tZW50Tm90ZShub3RlKTtcblxuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0FjY2Vzc1JlcXVlc3RDb21tZW50RGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgIHJlcXVlc3RlZEFjY2Vzc0l0ZW06IHJlcXVlc3RlZFJvbGVJdGVtLFxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2U6ICR1aWJNb2RhbEluc3RhbmNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV4cGVjdChjdHJsLmNvbW1lbnQpLnRvRXF1YWwoY29tbWVudCk7XG4gICAgICAgIGV4cGVjdChjdHJsLmFzc2lnbm1lbnROb3RlKS50b0VxdWFsKG5vdGUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBhc3NpZ25tZW50IG5vdGUgdGFiIHdoZW4gcmVxdWVzdGVkIGl0ZW0gYWxsb3dzIGl0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQWNjZXNzUmVxdWVzdENvbW1lbnREaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbTogcmVxdWVzdGVkUm9sZUl0ZW0sXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZTogJHVpYk1vZGFsSW5zdGFuY2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXhwZWN0KGN0cmwuaXNBc3NpZ25tZW50Tm90ZUFsbG93ZWQoKSkudG9FcXVhbChyZXF1ZXN0ZWRSb2xlSXRlbS5pc0Fzc2lnbm1lbnROb3RlQWxsb3dlZCgpKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb21tZW50ID0gJ3NvbWUgY29tbWVudCcsXG4gICAgICAgICAgICBub3RlID0gJ3NvbWUgbm90ZScsXG4gICAgICAgICAgICBuZXdDb21tZW50ID0gJ25ldyBjb21tZW50JyxcbiAgICAgICAgICAgIG5ld05vdGUgPSAnbmV3IG5vdGUnO1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXF1ZXN0ZWRSb2xlSXRlbS5zZXRDb21tZW50KGNvbW1lbnQpO1xuICAgICAgICAgICAgcmVxdWVzdGVkUm9sZUl0ZW0uc2V0QXNzaWdubWVudE5vdGUobm90ZSk7XG5cbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQWNjZXNzUmVxdWVzdENvbW1lbnREaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RlZEFjY2Vzc0l0ZW06IHJlcXVlc3RlZFJvbGVJdGVtLFxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlOiAkdWliTW9kYWxJbnN0YW5jZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGN0cmwuY29tbWVudCA9IG5ld0NvbW1lbnQ7XG4gICAgICAgICAgICBjdHJsLmFzc2lnbm1lbnROb3RlID0gbmV3Tm90ZTtcblxuICAgICAgICAgICAgY3RybC5zYXZlQ29tbWVudCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2F2ZXMgY29tbWVudCBhbmQgYXNzaWdubWVudCBub3RlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QocmVxdWVzdGVkUm9sZUl0ZW0uZ2V0Q29tbWVudCgpKS50b0VxdWFsKG5ld0NvbW1lbnQpO1xuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3RlZFJvbGVJdGVtLmdldEFzc2lnbm1lbnROb3RlKCkpLnRvRXF1YWwobmV3Tm90ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjbG9zZXMgbW9kYWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCgkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjYW5jZWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQWNjZXNzUmVxdWVzdENvbW1lbnREaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RlZEFjY2Vzc0l0ZW06IHJlcXVlc3RlZFJvbGVJdGVtLFxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlOiAkdWliTW9kYWxJbnN0YW5jZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGN0cmwuY2FuY2VsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZGlzbWlzcyBtb2RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KCR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgbW9kaWZ5IHJlcXVlc3RlZCBpdGVtIGNvbW1lbnQgb3Igbm90ZSBmaWVsZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3RlZFJvbGVJdGVtLmdldENvbW1lbnQoKSkudG9FcXVhbChudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRSb2xlSXRlbS5nZXRBc3NpZ25tZW50Tm90ZSgpKS50b0VxdWFsKG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
