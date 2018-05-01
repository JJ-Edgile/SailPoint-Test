System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule'], function (_export) {

    /**
     * Tests for the AccountInfo model object.
     */
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }],
        execute: function () {
            describe('AccountInfo', function () {
                var accountData = {
                    instance: 'tedsAccount',
                    nativeIdentity: 'ted',
                    displayName: 'Ted Tacular',
                    existingAssignment: 'being ted'
                },
                    AccountInfo,
                    account;

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                /**
                 * Setup the AccountInfo class and create some data to test with.
                 */
                beforeEach(inject(function (_AccountInfo_) {
                    AccountInfo = _AccountInfo_;
                    account = new AccountInfo(accountData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new AccountInfo(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new AccountInfo('hi mom');
                    }).toThrow();
                    expect(function () {
                        new AccountInfo(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('clones itself', function () {
                    var cloned = account.clone();
                    expect(cloned.getInstance()).toEqual(account.getInstance());
                    expect(cloned.getNativeIdentity()).toEqual(account.getNativeIdentity());
                    expect(cloned.getDisplayName()).toEqual(account.getDisplayName());
                    expect(cloned.getExistingAssignment()).toEqual(account.getExistingAssignment());
                });

                describe('equals()', function () {
                    function testNotEquals(propertyName) {
                        var other;
                        accountData[propertyName] = 'not the same';
                        other = new AccountInfo(accountData);
                        expect(account.equals(other)).toEqual(false);
                    }

                    it('returns false for null', function () {
                        expect(account.equals(null)).toEqual(false);
                    });

                    it('returns true for a clone', function () {
                        expect(account.equals(account.clone())).toEqual(true);
                    });

                    it('returns false if instance does not match', function () {
                        testNotEquals('instance');
                    });

                    it('returns false if native identity does not match', function () {
                        testNotEquals('nativeIdentity');
                    });

                    it('returns false if display name does not match', function () {
                        testNotEquals('displayName');
                    });

                    it('returns false if existing assignment does not match', function () {
                        testNotEquals('existingAssignment');
                    });
                });

                it('returns an instance read from data', function () {
                    expect(account.getInstance()).toEqual(accountData.instance);
                });

                it('returns a nativeIdentity read from data', function () {
                    expect(account.getNativeIdentity()).toEqual(accountData.nativeIdentity);
                });

                it('returns a display name read from data', function () {
                    expect(account.getDisplayName()).toEqual(accountData.displayName);
                });

                it('returns an existing assignment read from data', function () {
                    expect(account.getExistingAssignment()).toEqual(accountData.existingAssignment);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvbW9kZWwvQWNjb3VudEluZm9UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7Ozs7SUFLakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7WUFON0IsU0FBUyxlQUFlLFlBQVc7Z0JBQy9CLElBQUksY0FBYztvQkFDZCxVQUFVO29CQUNWLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixvQkFBb0I7O29CQUV4QjtvQkFDQTs7O2dCQUdBLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLGVBQWU7b0JBQ3RDLGNBQWM7b0JBQ2QsVUFBVSxJQUFJLFlBQVk7OztnQkFHOUIsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsT0FBTyxZQUFXO3dCQUFFLElBQUksWUFBWTt1QkFBVTs7O2dCQUdsRCxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQUUsSUFBSSxZQUFZO3VCQUFjO29CQUNsRCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxZQUFZLFlBQVc7NEJBQUUsT0FBTzs7dUJBQW9COzs7Z0JBR2hGLEdBQUcsaUJBQWlCLFlBQVc7b0JBQzNCLElBQUksU0FBUyxRQUFRO29CQUNyQixPQUFPLE9BQU8sZUFBZSxRQUFRLFFBQVE7b0JBQzdDLE9BQU8sT0FBTyxxQkFBcUIsUUFBUSxRQUFRO29CQUNuRCxPQUFPLE9BQU8sa0JBQWtCLFFBQVEsUUFBUTtvQkFDaEQsT0FBTyxPQUFPLHlCQUF5QixRQUFRLFFBQVE7OztnQkFHM0QsU0FBUyxZQUFZLFlBQVc7b0JBQzVCLFNBQVMsY0FBYyxjQUFjO3dCQUNqQyxJQUFJO3dCQUNKLFlBQVksZ0JBQWdCO3dCQUM1QixRQUFRLElBQUksWUFBWTt3QkFDeEIsT0FBTyxRQUFRLE9BQU8sUUFBUSxRQUFROzs7b0JBRzFDLEdBQUcsMEJBQTBCLFlBQVc7d0JBQ3BDLE9BQU8sUUFBUSxPQUFPLE9BQU8sUUFBUTs7O29CQUd6QyxHQUFHLDRCQUE0QixZQUFXO3dCQUN0QyxPQUFPLFFBQVEsT0FBTyxRQUFRLFVBQVUsUUFBUTs7O29CQUdwRCxHQUFJLDRDQUE0QyxZQUFXO3dCQUN2RCxjQUFjOzs7b0JBR2xCLEdBQUksbURBQW1ELFlBQVc7d0JBQzlELGNBQWM7OztvQkFHbEIsR0FBSSxnREFBZ0QsWUFBVzt3QkFDM0QsY0FBYzs7O29CQUdsQixHQUFJLHVEQUF1RCxZQUFXO3dCQUNsRSxjQUFjOzs7O2dCQUl0QixHQUFHLHNDQUFzQyxZQUFXO29CQUNoRCxPQUFPLFFBQVEsZUFBZSxRQUFRLFlBQVk7OztnQkFHdEQsR0FBRywyQ0FBMkMsWUFBVztvQkFDckQsT0FBTyxRQUFRLHFCQUFxQixRQUFRLFlBQVk7OztnQkFHNUQsR0FBRyx5Q0FBeUMsWUFBVztvQkFDbkQsT0FBTyxRQUFRLGtCQUFrQixRQUFRLFlBQVk7OztnQkFHekQsR0FBRyxpREFBaUQsWUFBVztvQkFDM0QsT0FBTyxRQUFRLHlCQUF5QixRQUFRLFlBQVk7Ozs7O0dBb0JqRSIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L21vZGVsL0FjY291bnRJbmZvVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIEFjY291bnRJbmZvIG1vZGVsIG9iamVjdC5cclxuICovXHJcbmRlc2NyaWJlKCdBY2NvdW50SW5mbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGFjY291bnREYXRhID0ge1xyXG4gICAgICAgIGluc3RhbmNlOiAndGVkc0FjY291bnQnLFxyXG4gICAgICAgIG5hdGl2ZUlkZW50aXR5OiAndGVkJyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogJ1RlZCBUYWN1bGFyJyxcclxuICAgICAgICBleGlzdGluZ0Fzc2lnbm1lbnQ6ICdiZWluZyB0ZWQnXHJcbiAgICB9LFxyXG4gICAgQWNjb3VudEluZm8sXHJcbiAgICBhY2NvdW50O1xyXG5cclxuICAgIC8vIFVzZSB0aGUgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIEFjY291bnRJbmZvIGNsYXNzIGFuZCBjcmVhdGUgc29tZSBkYXRhIHRvIHRlc3Qgd2l0aC5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0FjY291bnRJbmZvXykge1xyXG4gICAgICAgIEFjY291bnRJbmZvID0gX0FjY291bnRJbmZvXztcclxuICAgICAgICBhY2NvdW50ID0gbmV3IEFjY291bnRJbmZvKGFjY291bnREYXRhKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBpdCgncmVxdWlyZXMgbm9uLW51bGwgZGF0YSBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBBY2NvdW50SW5mbyhudWxsKTsgfSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Rocm93cyBpZiB0aGUgZGF0YSBwYXNzZWQgdG8gdGhlIGNvbnN0cnVjdG9yIGlzIG5vdCBhbiBvYmplY3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBBY2NvdW50SW5mbygnaGkgbW9tJyk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBBY2NvdW50SW5mbyhmdW5jdGlvbigpIHsgcmV0dXJuICd3aGF0IHRoYT8nOyB9KTsgfSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2Nsb25lcyBpdHNlbGYnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY2xvbmVkID0gYWNjb3VudC5jbG9uZSgpO1xyXG4gICAgICAgIGV4cGVjdChjbG9uZWQuZ2V0SW5zdGFuY2UoKSkudG9FcXVhbChhY2NvdW50LmdldEluc3RhbmNlKCkpO1xyXG4gICAgICAgIGV4cGVjdChjbG9uZWQuZ2V0TmF0aXZlSWRlbnRpdHkoKSkudG9FcXVhbChhY2NvdW50LmdldE5hdGl2ZUlkZW50aXR5KCkpO1xyXG4gICAgICAgIGV4cGVjdChjbG9uZWQuZ2V0RGlzcGxheU5hbWUoKSkudG9FcXVhbChhY2NvdW50LmdldERpc3BsYXlOYW1lKCkpO1xyXG4gICAgICAgIGV4cGVjdChjbG9uZWQuZ2V0RXhpc3RpbmdBc3NpZ25tZW50KCkpLnRvRXF1YWwoYWNjb3VudC5nZXRFeGlzdGluZ0Fzc2lnbm1lbnQoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZXF1YWxzKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBmdW5jdGlvbiB0ZXN0Tm90RXF1YWxzKHByb3BlcnR5TmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgb3RoZXI7XHJcbiAgICAgICAgICAgIGFjY291bnREYXRhW3Byb3BlcnR5TmFtZV0gPSAnbm90IHRoZSBzYW1lJztcclxuICAgICAgICAgICAgb3RoZXIgPSBuZXcgQWNjb3VudEluZm8oYWNjb3VudERhdGEpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjb3VudC5lcXVhbHMob3RoZXIpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBudWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2NvdW50LmVxdWFscyhudWxsKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGEgY2xvbmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY291bnQuZXF1YWxzKGFjY291bnQuY2xvbmUoKSkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ICgncmV0dXJucyBmYWxzZSBpZiBpbnN0YW5jZSBkb2VzIG5vdCBtYXRjaCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0Tm90RXF1YWxzKCdpbnN0YW5jZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCAoJ3JldHVybnMgZmFsc2UgaWYgbmF0aXZlIGlkZW50aXR5IGRvZXMgbm90IG1hdGNoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRlc3ROb3RFcXVhbHMoJ25hdGl2ZUlkZW50aXR5Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ICgncmV0dXJucyBmYWxzZSBpZiBkaXNwbGF5IG5hbWUgZG9lcyBub3QgbWF0Y2gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdE5vdEVxdWFscygnZGlzcGxheU5hbWUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQgKCdyZXR1cm5zIGZhbHNlIGlmIGV4aXN0aW5nIGFzc2lnbm1lbnQgZG9lcyBub3QgbWF0Y2gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdE5vdEVxdWFscygnZXhpc3RpbmdBc3NpZ25tZW50Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBhbiBpbnN0YW5jZSByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChhY2NvdW50LmdldEluc3RhbmNlKCkpLnRvRXF1YWwoYWNjb3VudERhdGEuaW5zdGFuY2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYSBuYXRpdmVJZGVudGl0eSByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChhY2NvdW50LmdldE5hdGl2ZUlkZW50aXR5KCkpLnRvRXF1YWwoYWNjb3VudERhdGEubmF0aXZlSWRlbnRpdHkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYSBkaXNwbGF5IG5hbWUgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoYWNjb3VudC5nZXREaXNwbGF5TmFtZSgpKS50b0VxdWFsKGFjY291bnREYXRhLmRpc3BsYXlOYW1lKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGFuIGV4aXN0aW5nIGFzc2lnbm1lbnQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoYWNjb3VudC5nZXRFeGlzdGluZ0Fzc2lnbm1lbnQoKSkudG9FcXVhbChhY2NvdW50RGF0YS5leGlzdGluZ0Fzc2lnbm1lbnQpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
