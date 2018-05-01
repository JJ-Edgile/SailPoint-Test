System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {

            describe('ViolationReviewRequestedItem', function () {
                var ViolationReviewRequestedItem,
                    requestedItem,
                    STATE = {
                    Rejected: 'Rejected',
                    Finished: 'Finished'
                },
                    data = {
                    id: '1',
                    description: 'foo bar',
                    entitlementApplication: 'appName',
                    entitlementName: 'entitlementName',
                    entitlementValue: 'entitlementValue',
                    roleName: 'roleName',
                    roleId: '123',
                    accountName: 'accountName',
                    operation: 'op',
                    state: 'state'
                };

                // Use the access request module.
                beforeEach(module(modelModule));
                beforeEach(inject(function (_ViolationReviewRequestedItem_) {
                    ViolationReviewRequestedItem = _ViolationReviewRequestedItem_;
                    requestedItem = new ViolationReviewRequestedItem(data);
                }));

                it('should throw if constructed without data', function () {
                    expect(function () {
                        new ViolationReviewRequestedItem();
                    }).toThrow();
                });

                it('should populate values correctly', function () {
                    expect(requestedItem.getEntitlementApplication()).toEqual(data.entitlementApplication);
                    expect(requestedItem.getEntitlementName()).toEqual(data.entitlementName);
                    expect(requestedItem.getEntitlementValue()).toEqual(data.entitlementValue);
                    expect(requestedItem.getRoleName()).toEqual(data.roleName);
                    expect(requestedItem.getAccountName()).toEqual(data.accountName);
                    expect(requestedItem.getOperation()).toEqual(data.operation);
                    expect(requestedItem.getState()).toEqual(data.state);
                    expect(requestedItem.getId()).toEqual(data.id);
                    expect(requestedItem.getRoleId()).toEqual(data.roleId);
                    expect(requestedItem.getDescription()).toEqual(data.description);
                    expect(requestedItem.getDisplayableName()).toEqual(data.roleName);
                    expect(requestedItem.getType()).toEqual('Role');
                });

                it('should set state correctly', function () {
                    expect(requestedItem.getState()).toEqual(data.state);
                    requestedItem.setState(STATE.Rejected);
                    expect(requestedItem.getState()).toEqual(STATE.Rejected);
                    requestedItem.setState('foobar');
                    expect(requestedItem.getState()).toBeUndefined();
                });

                it('should toggle state correctly', function () {
                    expect(requestedItem.getState()).toEqual(data.state);
                    requestedItem.toggleRejectedState();
                    expect(requestedItem.getState()).toEqual(STATE.Rejected);
                    requestedItem.toggleRejectedState();
                    expect(requestedItem.getState()).toEqual(STATE.Finished);
                    requestedItem.toggleRejectedState();
                    expect(requestedItem.getState()).toEqual(STATE.Rejected);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9WaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZCQUE2QixVQUFVLFNBQVM7SUFBNUY7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3Qjs7UUFFMUMsU0FBUyxZQUFZOztZQUg3QixTQUFTLGdDQUFnQyxZQUFXO2dCQUNoRCxJQUFJO29CQUNBO29CQUNBLFFBQVE7b0JBQ0osVUFBVTtvQkFDVixVQUFVOztvQkFFZCxPQUFPO29CQUNILElBQUk7b0JBQ0osYUFBYTtvQkFDYix3QkFBd0I7b0JBQ3hCLGlCQUFpQjtvQkFDakIsa0JBQWtCO29CQUNsQixVQUFVO29CQUNWLFFBQVE7b0JBQ1IsYUFBYTtvQkFDYixXQUFXO29CQUNYLE9BQU87Ozs7Z0JBS2YsV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU8sVUFBUyxnQ0FBZ0M7b0JBQ3ZELCtCQUErQjtvQkFDL0IsZ0JBQWdCLElBQUksNkJBQTZCOzs7Z0JBR3JELEdBQUcsNENBQTRDLFlBQVc7b0JBQ3RELE9BQU8sWUFBVzt3QkFDZCxJQUFJO3VCQUNMOzs7Z0JBR1AsR0FBRyxvQ0FBb0MsWUFBVztvQkFDOUMsT0FBTyxjQUFjLDZCQUE2QixRQUFRLEtBQUs7b0JBQy9ELE9BQU8sY0FBYyxzQkFBc0IsUUFBUSxLQUFLO29CQUN4RCxPQUFPLGNBQWMsdUJBQXVCLFFBQVEsS0FBSztvQkFDekQsT0FBTyxjQUFjLGVBQWUsUUFBUSxLQUFLO29CQUNqRCxPQUFPLGNBQWMsa0JBQWtCLFFBQVEsS0FBSztvQkFDcEQsT0FBTyxjQUFjLGdCQUFnQixRQUFRLEtBQUs7b0JBQ2xELE9BQU8sY0FBYyxZQUFZLFFBQVEsS0FBSztvQkFDOUMsT0FBTyxjQUFjLFNBQVMsUUFBUSxLQUFLO29CQUMzQyxPQUFPLGNBQWMsYUFBYSxRQUFRLEtBQUs7b0JBQy9DLE9BQU8sY0FBYyxrQkFBa0IsUUFBUSxLQUFLO29CQUNwRCxPQUFPLGNBQWMsc0JBQXNCLFFBQVEsS0FBSztvQkFDeEQsT0FBTyxjQUFjLFdBQVcsUUFBUTs7O2dCQUc1QyxHQUFHLDhCQUE4QixZQUFXO29CQUN4QyxPQUFPLGNBQWMsWUFBWSxRQUFRLEtBQUs7b0JBQzlDLGNBQWMsU0FBUyxNQUFNO29CQUM3QixPQUFPLGNBQWMsWUFBWSxRQUFRLE1BQU07b0JBQy9DLGNBQWMsU0FBUztvQkFDdkIsT0FBTyxjQUFjLFlBQVk7OztnQkFHckMsR0FBRyxpQ0FBaUMsWUFBVztvQkFDM0MsT0FBTyxjQUFjLFlBQVksUUFBUSxLQUFLO29CQUM5QyxjQUFjO29CQUNkLE9BQU8sY0FBYyxZQUFZLFFBQVEsTUFBTTtvQkFDL0MsY0FBYztvQkFDZCxPQUFPLGNBQWMsWUFBWSxRQUFRLE1BQU07b0JBQy9DLGNBQWM7b0JBQ2QsT0FBTyxjQUFjLFlBQVksUUFBUSxNQUFNOzs7OztHQVNwRCIsImZpbGUiOiJjb21tb24vbW9kZWwvVmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtb2RlbE1vZHVsZSBmcm9tICdjb21tb24vbW9kZWwvTW9kZWxNb2R1bGUnO1xuXG5kZXNjcmliZSgnVmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBWaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtLFxuICAgICAgICByZXF1ZXN0ZWRJdGVtLFxuICAgICAgICBTVEFURSA9IHtcbiAgICAgICAgICAgIFJlamVjdGVkOiAnUmVqZWN0ZWQnLFxuICAgICAgICAgICAgRmluaXNoZWQ6ICdGaW5pc2hlZCdcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2ZvbyBiYXInLFxuICAgICAgICAgICAgZW50aXRsZW1lbnRBcHBsaWNhdGlvbjogJ2FwcE5hbWUnLFxuICAgICAgICAgICAgZW50aXRsZW1lbnROYW1lOiAnZW50aXRsZW1lbnROYW1lJyxcbiAgICAgICAgICAgIGVudGl0bGVtZW50VmFsdWU6ICdlbnRpdGxlbWVudFZhbHVlJyxcbiAgICAgICAgICAgIHJvbGVOYW1lOiAncm9sZU5hbWUnLFxuICAgICAgICAgICAgcm9sZUlkOiAnMTIzJyxcbiAgICAgICAgICAgIGFjY291bnROYW1lOiAnYWNjb3VudE5hbWUnLFxuICAgICAgICAgICAgb3BlcmF0aW9uOiAnb3AnLFxuICAgICAgICAgICAgc3RhdGU6ICdzdGF0ZSdcbiAgICAgICAgfTtcblxuXG4gICAgLy8gVXNlIHRoZSBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfVmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbV8pIHtcbiAgICAgICAgVmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbSA9IF9WaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtXztcbiAgICAgICAgcmVxdWVzdGVkSXRlbSA9IG5ldyBWaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtKGRhdGEpO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgY29uc3RydWN0ZWQgd2l0aG91dCBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5ldyBWaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtKCk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcG9wdWxhdGUgdmFsdWVzIGNvcnJlY3RseScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5nZXRFbnRpdGxlbWVudEFwcGxpY2F0aW9uKCkpLnRvRXF1YWwoZGF0YS5lbnRpdGxlbWVudEFwcGxpY2F0aW9uKTtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0RW50aXRsZW1lbnROYW1lKCkpLnRvRXF1YWwoZGF0YS5lbnRpdGxlbWVudE5hbWUpO1xuICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5nZXRFbnRpdGxlbWVudFZhbHVlKCkpLnRvRXF1YWwoZGF0YS5lbnRpdGxlbWVudFZhbHVlKTtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0Um9sZU5hbWUoKSkudG9FcXVhbChkYXRhLnJvbGVOYW1lKTtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0QWNjb3VudE5hbWUoKSkudG9FcXVhbChkYXRhLmFjY291bnROYW1lKTtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0T3BlcmF0aW9uKCkpLnRvRXF1YWwoZGF0YS5vcGVyYXRpb24pO1xuICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5nZXRTdGF0ZSgpKS50b0VxdWFsKGRhdGEuc3RhdGUpO1xuICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5nZXRJZCgpKS50b0VxdWFsKGRhdGEuaWQpO1xuICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5nZXRSb2xlSWQoKSkudG9FcXVhbChkYXRhLnJvbGVJZCk7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmdldERlc2NyaXB0aW9uKCkpLnRvRXF1YWwoZGF0YS5kZXNjcmlwdGlvbik7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmdldERpc3BsYXlhYmxlTmFtZSgpKS50b0VxdWFsKGRhdGEucm9sZU5hbWUpO1xuICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5nZXRUeXBlKCkpLnRvRXF1YWwoJ1JvbGUnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2V0IHN0YXRlIGNvcnJlY3RseScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5nZXRTdGF0ZSgpKS50b0VxdWFsKGRhdGEuc3RhdGUpO1xuICAgICAgICByZXF1ZXN0ZWRJdGVtLnNldFN0YXRlKFNUQVRFLlJlamVjdGVkKTtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0U3RhdGUoKSkudG9FcXVhbChTVEFURS5SZWplY3RlZCk7XG4gICAgICAgIHJlcXVlc3RlZEl0ZW0uc2V0U3RhdGUoJ2Zvb2JhcicpO1xuICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5nZXRTdGF0ZSgpKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRvZ2dsZSBzdGF0ZSBjb3JyZWN0bHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0U3RhdGUoKSkudG9FcXVhbChkYXRhLnN0YXRlKTtcbiAgICAgICAgcmVxdWVzdGVkSXRlbS50b2dnbGVSZWplY3RlZFN0YXRlKCk7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmdldFN0YXRlKCkpLnRvRXF1YWwoU1RBVEUuUmVqZWN0ZWQpO1xuICAgICAgICByZXF1ZXN0ZWRJdGVtLnRvZ2dsZVJlamVjdGVkU3RhdGUoKTtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0U3RhdGUoKSkudG9FcXVhbChTVEFURS5GaW5pc2hlZCk7XG4gICAgICAgIHJlcXVlc3RlZEl0ZW0udG9nZ2xlUmVqZWN0ZWRTdGF0ZSgpO1xuICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5nZXRTdGF0ZSgpKS50b0VxdWFsKFNUQVRFLlJlamVjdGVkKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
