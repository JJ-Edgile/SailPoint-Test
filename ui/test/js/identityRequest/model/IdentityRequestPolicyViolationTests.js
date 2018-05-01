System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', '../IdentityRequestTestData'], function (_export) {
    /* (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_IdentityRequestTestData) {}],
        execute: function () {

            describe('IdentityRequestPolicyViolation', function () {
                var identityRequestTestData = undefined,
                    IdentityRequestPolicyViolation = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_identityRequestTestData_, _IdentityRequestPolicyViolation_) {
                    identityRequestTestData = _identityRequestTestData_;
                    IdentityRequestPolicyViolation = _IdentityRequestPolicyViolation_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = identityRequestTestData.IDENTITY_REQUEST_1.policyViolations[0],
                            identityRequestPolicyViolation = new IdentityRequestPolicyViolation(data);
                        expect(identityRequestPolicyViolation.policyName).toEqual(data.policyName);
                        expect(identityRequestPolicyViolation.policyType).toEqual(data.policyType);
                        expect(identityRequestPolicyViolation.ruleName).toEqual(data.ruleName);
                    });

                    it('should throw if no data is provided', function () {
                        expect(function () {
                            new IdentityRequestPolicyViolation();
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9tb2RlbC9JZGVudGl0eVJlcXVlc3RQb2xpY3lWaW9sYXRpb25UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUNBQXlDLCtCQUErQixVQUFVLFNBQVM7OztJQUduSTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7V0FDL0QsVUFBVSwwQkFBMEI7UUFDdkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLGtDQUFrQyxZQUFXO2dCQUNsRCxJQUFJLDBCQUF1QjtvQkFBRSxpQ0FBOEI7O2dCQUUzRCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUywyQkFBMkIsa0NBQWtDO29CQUNwRiwwQkFBMEI7b0JBQzFCLGlDQUFpQzs7O2dCQUdyQyxTQUFTLFFBQVEsWUFBVztvQkFDeEIsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsSUFBSSxPQUFPLHdCQUF3QixtQkFBbUIsaUJBQWlCOzRCQUNuRSxpQ0FBaUMsSUFBSSwrQkFBK0I7d0JBQ3hFLE9BQU8sK0JBQStCLFlBQVksUUFBUSxLQUFLO3dCQUMvRCxPQUFPLCtCQUErQixZQUFZLFFBQVEsS0FBSzt3QkFDL0QsT0FBTywrQkFBK0IsVUFBVSxRQUFRLEtBQUs7OztvQkFHakUsR0FBRyx1Q0FBdUMsWUFBVzt3QkFDakQsT0FBTyxZQUFNOzRCQUFFLElBQUk7MkJBQXFDOzs7Ozs7R0FlakUiLCJmaWxlIjoiaWRlbnRpdHlSZXF1ZXN0L21vZGVsL0lkZW50aXR5UmVxdWVzdFBvbGljeVZpb2xhdGlvblRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eVJlcXVlc3RNb2R1bGUgZnJvbSAnaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdE1vZHVsZSc7XHJcbmltcG9ydCAnLi4vSWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEnO1xyXG5cclxuZGVzY3JpYmUoJ0lkZW50aXR5UmVxdWVzdFBvbGljeVZpb2xhdGlvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLCBJZGVudGl0eVJlcXVlc3RQb2xpY3lWaW9sYXRpb247XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXywgX0lkZW50aXR5UmVxdWVzdFBvbGljeVZpb2xhdGlvbl8pIHtcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSA9IF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV87XHJcbiAgICAgICAgSWRlbnRpdHlSZXF1ZXN0UG9saWN5VmlvbGF0aW9uID0gX0lkZW50aXR5UmVxdWVzdFBvbGljeVZpb2xhdGlvbl87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2luaXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCBwcm92aWRlZCBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF8xLnBvbGljeVZpb2xhdGlvbnNbMF0sXHJcbiAgICAgICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RQb2xpY3lWaW9sYXRpb24gPSBuZXcgSWRlbnRpdHlSZXF1ZXN0UG9saWN5VmlvbGF0aW9uKGRhdGEpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0UG9saWN5VmlvbGF0aW9uLnBvbGljeU5hbWUpLnRvRXF1YWwoZGF0YS5wb2xpY3lOYW1lKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdFBvbGljeVZpb2xhdGlvbi5wb2xpY3lUeXBlKS50b0VxdWFsKGRhdGEucG9saWN5VHlwZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3RQb2xpY3lWaW9sYXRpb24ucnVsZU5hbWUpLnRvRXF1YWwoZGF0YS5ydWxlTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgbm8gZGF0YSBpcyBwcm92aWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBuZXcgSWRlbnRpdHlSZXF1ZXN0UG9saWN5VmlvbGF0aW9uKCk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
