System.register(['workitem/pamApproval/PamApprovalModule', 'test/js/TestInitializer', 'test/js/workitem/pamApproval/PamTestData'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var pamApprovalModule, TEST_DATA;
    return {
        setters: [function (_workitemPamApprovalPamApprovalModule) {
            pamApprovalModule = _workitemPamApprovalPamApprovalModule['default'];
        }, function (_testJsTestInitializer) {}, function (_testJsWorkitemPamApprovalPamTestData) {
            TEST_DATA = _testJsWorkitemPamApprovalPamTestData['default'];
        }],
        execute: function () {

            describe('PamApproval', function () {
                var APPROVAL = TEST_DATA.approval;

                var PamApproval = undefined,
                    PamRequest = undefined;

                beforeEach(module(pamApprovalModule));

                beforeEach(inject(function (_PamApproval_, _PamRequest_) {
                    PamApproval = _PamApproval_;
                    PamRequest = _PamRequest_;
                }));

                describe('constructor', function () {
                    it('implodes under its own nothingness with no data', function () {
                        expect(function () {
                            return new PamApproval(null);
                        }).toThrow();
                    });

                    it('sets values correctly', function () {
                        var approval = new PamApproval(APPROVAL);

                        expect(approval.id).toEqual(APPROVAL.id);
                        expect(approval.workItemType).toEqual(APPROVAL.workItemType);
                        expect(approval.request instanceof PamRequest).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL3BhbUFwcHJvdmFsL1BhbUFwcHJvdmFsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMENBQTBDLDJCQUEyQiw2Q0FBNkMsVUFBVSxTQUFTOzs7SUFHbEo7O0lBRUEsSUFBSSxtQkFBbUI7SUFDdkIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHVDQUF1QztZQUN2RCxvQkFBb0Isc0NBQXNDO1dBQzNELFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDdEYsWUFBWSxzQ0FBc0M7O1FBRXRELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxlQUFlLFlBQU07Z0JBQzFCLElBQU0sV0FBVyxVQUFVOztnQkFFM0IsSUFBSSxjQUFXO29CQUFFLGFBQVU7O2dCQUUzQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxlQUFlLGNBQWlCO29CQUMvQyxjQUFjO29CQUNkLGFBQWE7OztnQkFHakIsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsbURBQW1ELFlBQU07d0JBQ3hELE9BQU8sWUFBQTs0QkFTUyxPQVRILElBQUksWUFBWTsyQkFBTzs7O29CQUd4QyxHQUFHLHlCQUF5QixZQUFNO3dCQUM5QixJQUFJLFdBQVcsSUFBSSxZQUFZOzt3QkFFL0IsT0FBTyxTQUFTLElBQUksUUFBUSxTQUFTO3dCQUNyQyxPQUFPLFNBQVMsY0FBYyxRQUFRLFNBQVM7d0JBQy9DLE9BQU8sU0FBUyxtQkFBbUIsWUFBWSxRQUFROzs7Ozs7R0FnQmhFIiwiZmlsZSI6IndvcmtpdGVtL3BhbUFwcHJvdmFsL1BhbUFwcHJvdmFsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCBwYW1BcHByb3ZhbE1vZHVsZSBmcm9tICd3b3JraXRlbS9wYW1BcHByb3ZhbC9QYW1BcHByb3ZhbE1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgVEVTVF9EQVRBIGZyb20gJ3Rlc3QvanMvd29ya2l0ZW0vcGFtQXBwcm92YWwvUGFtVGVzdERhdGEnO1xyXG5cclxuXHJcbmRlc2NyaWJlKCdQYW1BcHByb3ZhbCcsICgpID0+IHtcclxuICAgIGNvbnN0IEFQUFJPVkFMID0gVEVTVF9EQVRBLmFwcHJvdmFsO1xyXG5cclxuICAgIGxldCBQYW1BcHByb3ZhbCwgUGFtUmVxdWVzdDtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwYW1BcHByb3ZhbE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUGFtQXBwcm92YWxfLCBfUGFtUmVxdWVzdF8pID0+IHtcclxuICAgICAgICBQYW1BcHByb3ZhbCA9IF9QYW1BcHByb3ZhbF87XHJcbiAgICAgICAgUGFtUmVxdWVzdCA9IF9QYW1SZXF1ZXN0XztcclxuICAgIH0pKTtcclxuXHJcbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2ltcGxvZGVzIHVuZGVyIGl0cyBvd24gbm90aGluZ25lc3Mgd2l0aCBubyBkYXRhJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbmV3IFBhbUFwcHJvdmFsKG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHZhbHVlcyBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhcHByb3ZhbCA9IG5ldyBQYW1BcHByb3ZhbChBUFBST1ZBTCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWwuaWQpLnRvRXF1YWwoQVBQUk9WQUwuaWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWwud29ya0l0ZW1UeXBlKS50b0VxdWFsKEFQUFJPVkFMLndvcmtJdGVtVHlwZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbC5yZXF1ZXN0IGluc3RhbmNlb2YgUGFtUmVxdWVzdCkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
