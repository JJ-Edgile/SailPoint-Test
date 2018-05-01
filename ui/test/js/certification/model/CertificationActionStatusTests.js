System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationActionStatus', function () {
                var CertificationActionStatus = undefined,
                    certificationTestData = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationActionStatus_, _certificationTestData_) {
                    CertificationActionStatus = _CertificationActionStatus_;
                    certificationTestData = _certificationTestData_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = certificationTestData.CERT_ITEMS[1].decisionStatus.decisions[0],
                            test = new CertificationActionStatus(data);

                        expect(test.name).toEqual(data.name);
                        expect(test.promptKey).toEqual(data.promptKey);
                    });

                    it('should throw with no config data', function () {
                        expect(function () {
                            new CertificationActionStatus();
                        }).toThrow();
                    });
                });

                describe('isDecided()', function () {
                    it('returns false for a null status', function () {
                        expect(CertificationActionStatus.isDecided(null)).toEqual(false);
                    });

                    it('returns false for Clear', function () {
                        expect(CertificationActionStatus.isDecided(CertificationActionStatus.Name.Cleared)).toEqual(false);
                    });

                    it('returns true for non-undo decisions', function () {
                        expect(CertificationActionStatus.isDecided(CertificationActionStatus.Name.Approved)).toEqual(true);
                    });
                });

                describe('isAccount()', function () {
                    it('returns false for a null status', function () {
                        expect(CertificationActionStatus.isAccount(null)).toEqual(false);
                    });

                    it('returns false for a non account status', function () {
                        expect(CertificationActionStatus.isAccount(CertificationActionStatus.Name.Approved)).toEqual(false);
                    });

                    it('returns true for revoke account decisions', function () {
                        expect(CertificationActionStatus.isAccount(CertificationActionStatus.Name.RevokeAccount)).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1c1Rlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7SUFLN0g7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyw2QkFBNkIsWUFBVztnQkFDN0MsSUFBSSw0QkFBeUI7b0JBQUUsd0JBQXFCOztnQkFFcEQsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsNkJBQTZCLHlCQUF5QjtvQkFDN0UsNEJBQTRCO29CQUM1Qix3QkFBd0I7OztnQkFHNUIsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELElBQUksT0FBTyxzQkFBc0IsV0FBVyxHQUFHLGVBQWUsVUFBVTs0QkFDcEUsT0FBTyxJQUFJLDBCQUEwQjs7d0JBRXpDLE9BQU8sS0FBSyxNQUFNLFFBQVEsS0FBSzt3QkFDL0IsT0FBTyxLQUFLLFdBQVcsUUFBUSxLQUFLOzs7b0JBR3hDLEdBQUcsb0NBQW9DLFlBQVc7d0JBQzlDLE9BQU8sWUFBVzs0QkFDZCxJQUFJOzJCQUNMOzs7O2dCQUlYLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLG1DQUFtQyxZQUFNO3dCQUN4QyxPQUFPLDBCQUEwQixVQUFVLE9BQU8sUUFBUTs7O29CQUc5RCxHQUFHLDJCQUEyQixZQUFNO3dCQUNoQyxPQUFPLDBCQUEwQixVQUFVLDBCQUEwQixLQUFLLFVBQ3RFLFFBQVE7OztvQkFHaEIsR0FBRyx1Q0FBdUMsWUFBTTt3QkFDNUMsT0FBTywwQkFBMEIsVUFBVSwwQkFBMEIsS0FBSyxXQUN0RSxRQUFROzs7O2dCQUlwQixTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyxtQ0FBbUMsWUFBTTt3QkFDeEMsT0FBTywwQkFBMEIsVUFBVSxPQUFPLFFBQVE7OztvQkFHOUQsR0FBRywwQ0FBMEMsWUFBTTt3QkFDL0MsT0FBTywwQkFBMEIsVUFBVSwwQkFBMEIsS0FBSyxXQUFXLFFBQVE7OztvQkFHakcsR0FBRyw2Q0FBNkMsWUFBTTt3QkFDbEQsT0FBTywwQkFBMEIsVUFBVSwwQkFBMEIsS0FBSyxnQkFBZ0IsUUFBUTs7Ozs7O0dBVzNHIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1c1Rlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4uL0NlcnRpZmljYXRpb25UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMsIGNlcnRpZmljYXRpb25UZXN0RGF0YTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9DZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzXywgX2NlcnRpZmljYXRpb25UZXN0RGF0YV8pIHtcbiAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyA9IF9DZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzXztcbiAgICAgICAgY2VydGlmaWNhdGlvblRlc3REYXRhID0gX2NlcnRpZmljYXRpb25UZXN0RGF0YV87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2luaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcHJvdmlkZWQgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVF9JVEVNU1sxXS5kZWNpc2lvblN0YXR1cy5kZWNpc2lvbnNbMF0sXG4gICAgICAgICAgICAgICAgdGVzdCA9IG5ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKGRhdGEpO1xuXG4gICAgICAgICAgICBleHBlY3QodGVzdC5uYW1lKS50b0VxdWFsKGRhdGEubmFtZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5wcm9tcHRLZXkpLnRvRXF1YWwoZGF0YS5wcm9tcHRLZXkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gY29uZmlnIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cygpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc0RlY2lkZWQoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGEgbnVsbCBzdGF0dXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5pc0RlY2lkZWQobnVsbCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgQ2xlYXInLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5pc0RlY2lkZWQoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkNsZWFyZWQpKS5cbiAgICAgICAgICAgICAgICB0b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3Igbm9uLXVuZG8gZGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuaXNEZWNpZGVkKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCkpLlxuICAgICAgICAgICAgICAgIHRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzQWNjb3VudCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYSBudWxsIHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLmlzQWNjb3VudChudWxsKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhIG5vbiBhY2NvdW50IHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLmlzQWNjb3VudChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgcmV2b2tlIGFjY291bnQgZGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuaXNBY2NvdW50KENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZXZva2VBY2NvdW50KSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
