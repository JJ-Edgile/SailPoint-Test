System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', '../AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the AssignedRole model object.
             */
            describe('AssignedRole', function () {

                var ambiguousRole1Data, AssignedRole, ambiguousRole1;

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                /**
                 * Setup the AssignedRole class and create some data to test with.
                 */
                beforeEach(inject(function (_AssignedRole_, accessRequestTestData) {
                    AssignedRole = _AssignedRole_;
                    ambiguousRole1Data = accessRequestTestData.AMBIGUOUS_ASSIGNED_ROLE1;
                    ambiguousRole1 = new AssignedRole(ambiguousRole1Data);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new AssignedRole(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new AssignedRole('whatever');
                    }).toThrow();
                });

                it('returns assignment ID from data', function () {
                    expect(ambiguousRole1.getAssignmentId()).toEqual(ambiguousRole1Data.assignmentId);
                });

                it('returns assignment note from data', function () {
                    expect(ambiguousRole1.getAssignmentNote()).toEqual(ambiguousRole1Data.assignmentNote);
                });

                it('returns assigner from data', function () {
                    expect(ambiguousRole1.getAssigner()).toEqual(ambiguousRole1Data.assigner);
                });

                it('returns role ID from data', function () {
                    expect(ambiguousRole1.getRoleId()).toEqual(ambiguousRole1Data.roleId);
                });

                it('returns role name from data', function () {
                    expect(ambiguousRole1.getName()).toEqual(ambiguousRole1Data.name);
                });

                it('returns created date from data', function () {
                    expect(ambiguousRole1.getCreated()).toEqual(new Date(ambiguousRole1Data.created));
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvbW9kZWwvQXNzaWduZWRSb2xlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw2QkFBNkIsVUFBVSxTQUFTO0lBQzdIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7Ozs7O1lBRDdCLFNBQVMsZ0JBQWdCLFlBQVc7O2dCQUVoQyxJQUFJLG9CQUFvQixjQUFjOzs7Z0JBR3RDLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLGdCQUFnQix1QkFBdUI7b0JBQzlELGVBQWU7b0JBQ2YscUJBQXFCLHNCQUFzQjtvQkFDM0MsaUJBQWlCLElBQUksYUFBYTs7O2dCQUd0QyxHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxhQUFhO3VCQUFVOzs7Z0JBR25ELEdBQUcsaUVBQWlFLFlBQVc7b0JBQzNFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLGFBQWE7dUJBQWdCOzs7Z0JBR3pELEdBQUcsbUNBQW1DLFlBQVc7b0JBQzdDLE9BQU8sZUFBZSxtQkFBbUIsUUFBUSxtQkFBbUI7OztnQkFHeEUsR0FBRyxxQ0FBcUMsWUFBVztvQkFDL0MsT0FBTyxlQUFlLHFCQUFxQixRQUFRLG1CQUFtQjs7O2dCQUcxRSxHQUFHLDhCQUE4QixZQUFXO29CQUN4QyxPQUFPLGVBQWUsZUFBZSxRQUFRLG1CQUFtQjs7O2dCQUdwRSxHQUFHLDZCQUE2QixZQUFXO29CQUN2QyxPQUFPLGVBQWUsYUFBYSxRQUFRLG1CQUFtQjs7O2dCQUdsRSxHQUFHLCtCQUErQixZQUFXO29CQUN6QyxPQUFPLGVBQWUsV0FBVyxRQUFRLG1CQUFtQjs7O2dCQUdoRSxHQUFHLGtDQUFrQyxZQUFXO29CQUM1QyxPQUFPLGVBQWUsY0FBYyxRQUFRLElBQUksS0FBSyxtQkFBbUI7Ozs7O0dBZTdFIiwiZmlsZSI6ImFjY2Vzc1JlcXVlc3QvbW9kZWwvQXNzaWduZWRSb2xlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhY2Nlc3NSZXF1ZXN0TW9kdWxlIGZyb20gJ2FjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZSc7XG5pbXBvcnQgJy4uL0FjY2Vzc1JlcXVlc3RUZXN0RGF0YSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBBc3NpZ25lZFJvbGUgbW9kZWwgb2JqZWN0LlxuICovXG5kZXNjcmliZSgnQXNzaWduZWRSb2xlJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYW1iaWd1b3VzUm9sZTFEYXRhLCBBc3NpZ25lZFJvbGUsIGFtYmlndW91c1JvbGUxO1xuXG4gICAgLy8gVXNlIHRoZSBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIEFzc2lnbmVkUm9sZSBjbGFzcyBhbmQgY3JlYXRlIHNvbWUgZGF0YSB0byB0ZXN0IHdpdGguXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0Fzc2lnbmVkUm9sZV8sIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSkge1xuICAgICAgICBBc3NpZ25lZFJvbGUgPSBfQXNzaWduZWRSb2xlXztcbiAgICAgICAgYW1iaWd1b3VzUm9sZTFEYXRhID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLkFNQklHVU9VU19BU1NJR05FRF9ST0xFMTtcbiAgICAgICAgYW1iaWd1b3VzUm9sZTEgPSBuZXcgQXNzaWduZWRSb2xlKGFtYmlndW91c1JvbGUxRGF0YSk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3JlcXVpcmVzIG5vbi1udWxsIGRhdGEgaW4gdGhlIGNvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IEFzc2lnbmVkUm9sZShudWxsKTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiB0aGUgZGF0YSBwYXNzZWQgdG8gdGhlIGNvbnN0cnVjdG9yIGlzIG5vdCBhbiBvYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgQXNzaWduZWRSb2xlKCd3aGF0ZXZlcicpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhc3NpZ25tZW50IElEIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoYW1iaWd1b3VzUm9sZTEuZ2V0QXNzaWdubWVudElkKCkpLnRvRXF1YWwoYW1iaWd1b3VzUm9sZTFEYXRhLmFzc2lnbm1lbnRJZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhc3NpZ25tZW50IG5vdGUgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChhbWJpZ3VvdXNSb2xlMS5nZXRBc3NpZ25tZW50Tm90ZSgpKS50b0VxdWFsKGFtYmlndW91c1JvbGUxRGF0YS5hc3NpZ25tZW50Tm90ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhc3NpZ25lciBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGFtYmlndW91c1JvbGUxLmdldEFzc2lnbmVyKCkpLnRvRXF1YWwoYW1iaWd1b3VzUm9sZTFEYXRhLmFzc2lnbmVyKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHJvbGUgSUQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChhbWJpZ3VvdXNSb2xlMS5nZXRSb2xlSWQoKSkudG9FcXVhbChhbWJpZ3VvdXNSb2xlMURhdGEucm9sZUlkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHJvbGUgbmFtZSBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGFtYmlndW91c1JvbGUxLmdldE5hbWUoKSkudG9FcXVhbChhbWJpZ3VvdXNSb2xlMURhdGEubmFtZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBjcmVhdGVkIGRhdGUgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChhbWJpZ3VvdXNSb2xlMS5nZXRDcmVhdGVkKCkpLnRvRXF1YWwobmV3IERhdGUoYW1iaWd1b3VzUm9sZTFEYXRhLmNyZWF0ZWQpKTtcbiAgICB9KTtcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
