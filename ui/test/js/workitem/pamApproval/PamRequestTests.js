System.register(['angular', 'workitem/pamApproval/PamApprovalModule', 'test/js/TestInitializer', 'test/js/workitem/pamApproval/PamTestData'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var angular, pamApprovalModule, TEST_DATA;
    return {
        setters: [function (_angular) {
            angular = _angular['default'];
        }, function (_workitemPamApprovalPamApprovalModule) {
            pamApprovalModule = _workitemPamApprovalPamApprovalModule['default'];
        }, function (_testJsTestInitializer) {}, function (_testJsWorkitemPamApprovalPamTestData) {
            TEST_DATA = _testJsWorkitemPamApprovalPamTestData['default'];
        }],
        execute: function () {

            describe('PamRequest', function () {

                var PamRequest = undefined,
                    requestData = undefined;

                beforeEach(module(pamApprovalModule));

                beforeEach(inject(function (_PamRequest_) {
                    PamRequest = _PamRequest_;

                    requestData = angular.copy(TEST_DATA.request);
                }));

                describe('constructor', function () {
                    it('yaks with no data', function () {
                        expect(function () {
                            return new PamRequest(null);
                        }).toThrow();
                    });

                    it('sets values correctly', function () {
                        var request = new PamRequest(requestData);

                        expect(request.identityName).toEqual(requestData.identityName);
                        expect(request.identityDisplayName).toEqual(requestData.identityDisplayName);
                        expect(request.containerName).toEqual(requestData.containerName);
                        expect(request.containerDisplayName).toEqual(requestData.containerDisplayName);
                        expect(request.containerDescription).toEqual(requestData.containerDescription);

                        expect(request.accountRequests.length).toEqual(requestData.accountRequests.length);
                        expect(request.accountRequests[0].application).toEqual(requestData.accountRequests[0].application);
                        expect(request.accountRequests[0].nativeIdentity).toEqual(requestData.accountRequests[0].nativeIdentity);
                        expect(request.accountRequests[0].displayName).toEqual(requestData.accountRequests[0].displayName);
                        expect(request.accountRequests[0].addedRights).toEqual(requestData.accountRequests[0].addedRights);
                        expect(request.accountRequests[0].removedRights).toEqual(requestData.accountRequests[0].removedRights);
                    });
                });

                function getRequest(includeAddedRights, includeRemovedRights) {
                    var addedRights = includeAddedRights ? ['a', 'b', 'c'] : [];
                    var removedRights = includeRemovedRights ? ['a', 'b', 'c'] : [];
                    requestData.accountRequests[0].addedRights = addedRights;
                    requestData.accountRequests[0].removedRights = removedRights;
                    return requestData;
                }

                describe('hasAddedRights()', function () {
                    it('returns true if there are added rights', function () {
                        var request = new PamRequest(getRequest(true, false));
                        expect(request.hasAddedRights()).toEqual(true);
                    });

                    it('returns false if there are not added rights', function () {
                        var request = new PamRequest(getRequest(false, true));
                        expect(request.hasAddedRights()).toEqual(false);
                    });
                });

                describe('hasRemovedRights()', function () {
                    it('returns true if there are removed rights', function () {
                        var request = new PamRequest(getRequest(false, true));
                        expect(request.hasRemovedRights()).toEqual(true);
                    });

                    it('returns false if there are not reoved rights', function () {
                        var request = new PamRequest(getRequest(true, false));
                        expect(request.hasRemovedRights()).toEqual(false);
                    });
                });

                function getMultiAccountRequest() {
                    var acctReq1 = requestData.accountRequests[0];
                    var acctReq2 = angular.copy(acctReq1);
                    requestData.accountRequests.push(acctReq2);

                    acctReq1.addedRights = ['a', 'b', 'c'];
                    acctReq1.removedRights = ['x', 'y'];
                    acctReq2.addedRights = ['e', 'f', 'g'];
                    acctReq2.removedRights = ['q', 'r'];

                    return requestData;
                }

                it('getAddedRights() returns all added rights', function () {
                    var request = new PamRequest(getMultiAccountRequest());
                    expect(request.getAddedRights()).toEqual(['a', 'b', 'c', 'e', 'f', 'g']);
                });

                it('getRemovedRights() returns all removed rights', function () {
                    var request = new PamRequest(getMultiAccountRequest());
                    expect(request.getRemovedRights()).toEqual(['x', 'y', 'q', 'r']);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL3BhbUFwcHJvdmFsL1BhbVJlcXVlc3RUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQyxXQUFXLDBDQUEwQywyQkFBMkIsNkNBQTZDLFVBQVUsU0FBUzs7O0lBRzdKOztJQUVBLElBQUksU0FBUyxtQkFBbUI7SUFDaEMsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLFVBQVU7WUFDMUIsVUFBVSxTQUFTO1dBQ3BCLFVBQVUsdUNBQXVDO1lBQ2hELG9CQUFvQixzQ0FBc0M7V0FDM0QsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUN0RixZQUFZLHNDQUFzQzs7UUFFdEQsU0FBUyxZQUFZOztZQVA3QixTQUFTLGNBQWMsWUFBTTs7Z0JBRXpCLElBQUksYUFBVTtvQkFBRSxjQUFXOztnQkFFM0IsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsY0FBaUI7b0JBQ2hDLGFBQWE7O29CQUViLGNBQWMsUUFBUSxLQUFLLFVBQVU7OztnQkFHekMsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcscUJBQXFCLFlBQU07d0JBQzFCLE9BQU8sWUFBQTs0QkFXUyxPQVhILElBQUksV0FBVzsyQkFBTzs7O29CQUd2QyxHQUFHLHlCQUF5QixZQUFNO3dCQUM5QixJQUFJLFVBQVUsSUFBSSxXQUFXOzt3QkFFN0IsT0FBTyxRQUFRLGNBQWMsUUFBUSxZQUFZO3dCQUNqRCxPQUFPLFFBQVEscUJBQXFCLFFBQVEsWUFBWTt3QkFDeEQsT0FBTyxRQUFRLGVBQWUsUUFBUSxZQUFZO3dCQUNsRCxPQUFPLFFBQVEsc0JBQXNCLFFBQVEsWUFBWTt3QkFDekQsT0FBTyxRQUFRLHNCQUFzQixRQUFRLFlBQVk7O3dCQUV6RCxPQUFPLFFBQVEsZ0JBQWdCLFFBQVEsUUFBUSxZQUFZLGdCQUFnQjt3QkFDM0UsT0FBTyxRQUFRLGdCQUFnQixHQUFHLGFBQWEsUUFBUSxZQUFZLGdCQUFnQixHQUFHO3dCQUN0RixPQUFPLFFBQVEsZ0JBQWdCLEdBQUcsZ0JBQWdCLFFBQVEsWUFBWSxnQkFBZ0IsR0FBRzt3QkFDekYsT0FBTyxRQUFRLGdCQUFnQixHQUFHLGFBQWEsUUFBUSxZQUFZLGdCQUFnQixHQUFHO3dCQUN0RixPQUFPLFFBQVEsZ0JBQWdCLEdBQUcsYUFBYSxRQUFRLFlBQVksZ0JBQWdCLEdBQUc7d0JBQ3RGLE9BQU8sUUFBUSxnQkFBZ0IsR0FBRyxlQUFlLFFBQVEsWUFBWSxnQkFBZ0IsR0FBRzs7OztnQkFJaEcsU0FBUyxXQUFXLG9CQUFvQixzQkFBc0I7b0JBQzFELElBQUksY0FBZSxxQkFBc0IsQ0FBRSxLQUFLLEtBQUssT0FBUTtvQkFDN0QsSUFBSSxnQkFBZ0IsdUJBQXlCLENBQUUsS0FBSyxLQUFLLE9BQVE7b0JBQ2pFLFlBQVksZ0JBQWdCLEdBQUcsY0FBYztvQkFDN0MsWUFBWSxnQkFBZ0IsR0FBRyxnQkFBZ0I7b0JBQy9DLE9BQU87OztnQkFHWCxTQUFTLG9CQUFvQixZQUFNO29CQUMvQixHQUFHLDBDQUEwQyxZQUFNO3dCQUMvQyxJQUFJLFVBQVUsSUFBSSxXQUFXLFdBQVcsTUFBTTt3QkFDOUMsT0FBTyxRQUFRLGtCQUFrQixRQUFROzs7b0JBRzdDLEdBQUcsK0NBQStDLFlBQU07d0JBQ3BELElBQUksVUFBVSxJQUFJLFdBQVcsV0FBVyxPQUFPO3dCQUMvQyxPQUFPLFFBQVEsa0JBQWtCLFFBQVE7Ozs7Z0JBSWpELFNBQVMsc0JBQXNCLFlBQU07b0JBQ2pDLEdBQUcsNENBQTRDLFlBQU07d0JBQ2pELElBQUksVUFBVSxJQUFJLFdBQVcsV0FBVyxPQUFPO3dCQUMvQyxPQUFPLFFBQVEsb0JBQW9CLFFBQVE7OztvQkFHL0MsR0FBRyxnREFBZ0QsWUFBTTt3QkFDckQsSUFBSSxVQUFVLElBQUksV0FBVyxXQUFXLE1BQU07d0JBQzlDLE9BQU8sUUFBUSxvQkFBb0IsUUFBUTs7OztnQkFJbkQsU0FBUyx5QkFBeUI7b0JBQzlCLElBQUksV0FBVyxZQUFZLGdCQUFnQjtvQkFDM0MsSUFBSSxXQUFXLFFBQVEsS0FBSztvQkFDNUIsWUFBWSxnQkFBZ0IsS0FBSzs7b0JBRWpDLFNBQVMsY0FBYyxDQUFFLEtBQUssS0FBSztvQkFDbkMsU0FBUyxnQkFBZ0IsQ0FBRSxLQUFLO29CQUNoQyxTQUFTLGNBQWMsQ0FBRSxLQUFLLEtBQUs7b0JBQ25DLFNBQVMsZ0JBQWdCLENBQUUsS0FBSzs7b0JBRWhDLE9BQU87OztnQkFHWCxHQUFHLDZDQUE2QyxZQUFNO29CQUNsRCxJQUFJLFVBQVUsSUFBSSxXQUFXO29CQUM3QixPQUFPLFFBQVEsa0JBQWtCLFFBQVEsQ0FBRSxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUs7OztnQkFHeEUsR0FBRyxpREFBaUQsWUFBTTtvQkFDdEQsSUFBSSxVQUFVLElBQUksV0FBVztvQkFDN0IsT0FBTyxRQUFRLG9CQUFvQixRQUFRLENBQUUsS0FBSyxLQUFLLEtBQUs7Ozs7O0dBaUJqRSIsImZpbGUiOiJ3b3JraXRlbS9wYW1BcHByb3ZhbC9QYW1SZXF1ZXN0VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgcGFtQXBwcm92YWxNb2R1bGUgZnJvbSAnd29ya2l0ZW0vcGFtQXBwcm92YWwvUGFtQXBwcm92YWxNb2R1bGUnO1xyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IFRFU1RfREFUQSBmcm9tICd0ZXN0L2pzL3dvcmtpdGVtL3BhbUFwcHJvdmFsL1BhbVRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdQYW1SZXF1ZXN0JywgKCkgPT4ge1xyXG5cclxuICAgIGxldCBQYW1SZXF1ZXN0LCByZXF1ZXN0RGF0YTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwYW1BcHByb3ZhbE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUGFtUmVxdWVzdF8pID0+IHtcclxuICAgICAgICBQYW1SZXF1ZXN0ID0gX1BhbVJlcXVlc3RfO1xyXG5cclxuICAgICAgICByZXF1ZXN0RGF0YSA9IGFuZ3VsYXIuY29weShURVNUX0RBVEEucmVxdWVzdCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCd5YWtzIHdpdGggbm8gZGF0YScsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IG5ldyBQYW1SZXF1ZXN0KG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHZhbHVlcyBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFBhbVJlcXVlc3QocmVxdWVzdERhdGEpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3QuaWRlbnRpdHlOYW1lKS50b0VxdWFsKHJlcXVlc3REYXRhLmlkZW50aXR5TmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0LmlkZW50aXR5RGlzcGxheU5hbWUpLnRvRXF1YWwocmVxdWVzdERhdGEuaWRlbnRpdHlEaXNwbGF5TmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0LmNvbnRhaW5lck5hbWUpLnRvRXF1YWwocmVxdWVzdERhdGEuY29udGFpbmVyTmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0LmNvbnRhaW5lckRpc3BsYXlOYW1lKS50b0VxdWFsKHJlcXVlc3REYXRhLmNvbnRhaW5lckRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3QuY29udGFpbmVyRGVzY3JpcHRpb24pLnRvRXF1YWwocmVxdWVzdERhdGEuY29udGFpbmVyRGVzY3JpcHRpb24pO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3QuYWNjb3VudFJlcXVlc3RzLmxlbmd0aCkudG9FcXVhbChyZXF1ZXN0RGF0YS5hY2NvdW50UmVxdWVzdHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3QuYWNjb3VudFJlcXVlc3RzWzBdLmFwcGxpY2F0aW9uKS50b0VxdWFsKHJlcXVlc3REYXRhLmFjY291bnRSZXF1ZXN0c1swXS5hcHBsaWNhdGlvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0LmFjY291bnRSZXF1ZXN0c1swXS5uYXRpdmVJZGVudGl0eSkudG9FcXVhbChyZXF1ZXN0RGF0YS5hY2NvdW50UmVxdWVzdHNbMF0ubmF0aXZlSWRlbnRpdHkpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVxdWVzdC5hY2NvdW50UmVxdWVzdHNbMF0uZGlzcGxheU5hbWUpLnRvRXF1YWwocmVxdWVzdERhdGEuYWNjb3VudFJlcXVlc3RzWzBdLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3QuYWNjb3VudFJlcXVlc3RzWzBdLmFkZGVkUmlnaHRzKS50b0VxdWFsKHJlcXVlc3REYXRhLmFjY291bnRSZXF1ZXN0c1swXS5hZGRlZFJpZ2h0cyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0LmFjY291bnRSZXF1ZXN0c1swXS5yZW1vdmVkUmlnaHRzKS50b0VxdWFsKHJlcXVlc3REYXRhLmFjY291bnRSZXF1ZXN0c1swXS5yZW1vdmVkUmlnaHRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFJlcXVlc3QoaW5jbHVkZUFkZGVkUmlnaHRzLCBpbmNsdWRlUmVtb3ZlZFJpZ2h0cykge1xyXG4gICAgICAgIGxldCBhZGRlZFJpZ2h0cyA9IChpbmNsdWRlQWRkZWRSaWdodHMpID8gWyAnYScsICdiJywgJ2MnIF0gOiBbXTtcclxuICAgICAgICBsZXQgcmVtb3ZlZFJpZ2h0cyA9IChpbmNsdWRlUmVtb3ZlZFJpZ2h0cykgPyBbICdhJywgJ2InLCAnYycgXSA6IFtdO1xyXG4gICAgICAgIHJlcXVlc3REYXRhLmFjY291bnRSZXF1ZXN0c1swXS5hZGRlZFJpZ2h0cyA9IGFkZGVkUmlnaHRzO1xyXG4gICAgICAgIHJlcXVlc3REYXRhLmFjY291bnRSZXF1ZXN0c1swXS5yZW1vdmVkUmlnaHRzID0gcmVtb3ZlZFJpZ2h0cztcclxuICAgICAgICByZXR1cm4gcmVxdWVzdERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2hhc0FkZGVkUmlnaHRzKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgYWRkZWQgcmlnaHRzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBQYW1SZXF1ZXN0KGdldFJlcXVlc3QodHJ1ZSwgZmFsc2UpKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3QuaGFzQWRkZWRSaWdodHMoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgYXJlIG5vdCBhZGRlZCByaWdodHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFBhbVJlcXVlc3QoZ2V0UmVxdWVzdChmYWxzZSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVxdWVzdC5oYXNBZGRlZFJpZ2h0cygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdoYXNSZW1vdmVkUmlnaHRzKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgcmVtb3ZlZCByaWdodHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFBhbVJlcXVlc3QoZ2V0UmVxdWVzdChmYWxzZSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVxdWVzdC5oYXNSZW1vdmVkUmlnaHRzKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZXJlIGFyZSBub3QgcmVvdmVkIHJpZ2h0cycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgUGFtUmVxdWVzdChnZXRSZXF1ZXN0KHRydWUsIGZhbHNlKSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0Lmhhc1JlbW92ZWRSaWdodHMoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNdWx0aUFjY291bnRSZXF1ZXN0KCkge1xyXG4gICAgICAgIGxldCBhY2N0UmVxMSA9IHJlcXVlc3REYXRhLmFjY291bnRSZXF1ZXN0c1swXTtcclxuICAgICAgICBsZXQgYWNjdFJlcTIgPSBhbmd1bGFyLmNvcHkoYWNjdFJlcTEpO1xyXG4gICAgICAgIHJlcXVlc3REYXRhLmFjY291bnRSZXF1ZXN0cy5wdXNoKGFjY3RSZXEyKTtcclxuXHJcbiAgICAgICAgYWNjdFJlcTEuYWRkZWRSaWdodHMgPSBbICdhJywgJ2InLCAnYycgXTtcclxuICAgICAgICBhY2N0UmVxMS5yZW1vdmVkUmlnaHRzID0gWyAneCcsICd5JyBdO1xyXG4gICAgICAgIGFjY3RSZXEyLmFkZGVkUmlnaHRzID0gWyAnZScsICdmJywgJ2cnIF07XHJcbiAgICAgICAgYWNjdFJlcTIucmVtb3ZlZFJpZ2h0cyA9IFsgJ3EnLCAncicgXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3REYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdnZXRBZGRlZFJpZ2h0cygpIHJldHVybnMgYWxsIGFkZGVkIHJpZ2h0cycsICgpID0+IHtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBQYW1SZXF1ZXN0KGdldE11bHRpQWNjb3VudFJlcXVlc3QoKSk7XHJcbiAgICAgICAgZXhwZWN0KHJlcXVlc3QuZ2V0QWRkZWRSaWdodHMoKSkudG9FcXVhbChbICdhJywgJ2InLCAnYycsICdlJywgJ2YnLCAnZycgXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZ2V0UmVtb3ZlZFJpZ2h0cygpIHJldHVybnMgYWxsIHJlbW92ZWQgcmlnaHRzJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFBhbVJlcXVlc3QoZ2V0TXVsdGlBY2NvdW50UmVxdWVzdCgpKTtcclxuICAgICAgICBleHBlY3QocmVxdWVzdC5nZXRSZW1vdmVkUmlnaHRzKCkpLnRvRXF1YWwoWyAneCcsICd5JywgJ3EnLCAncicgXSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
