System.register(['test/js/TestInitializer', 'test/js/common/model/ModelTestData', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Tests for the CertificationObjectResult model object.
     */
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_testJsCommonModelModelTestData) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {
            describe('CertificationObjectResult', function () {

                var objectResultData = undefined,
                    CertificationObjectResult = undefined,
                    certObjResult = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationObjectResult_, modelTestData) {
                    CertificationObjectResult = _CertificationObjectResult_;

                    objectResultData = modelTestData.GENERIC_OBJECT_RESULT;
                    certObjResult = new CertificationObjectResult(objectResultData);
                }));

                it('returns the certObjectResult', function () {
                    expect(certObjResult.getObject()).toEqual(objectResultData.object);
                    expect(certObjResult.getAttributes()).toEqual(new Map(Object.entries(objectResultData.attributes)));
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbk9iamVjdFJlc3VsdFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0Msc0NBQXNDLFVBQVUsU0FBUzs7Ozs7O0lBTXZJOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUMsSUFBSSxVQUFVLG1DQUFtQztZQUN4SSxzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7WUFKN0IsU0FBUyw2QkFBNkIsWUFBVzs7Z0JBRTdDLElBQUksbUJBQWdCO29CQUFFLDRCQUF5QjtvQkFBRSxnQkFBYTs7Z0JBRTlELFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLDZCQUE2QixlQUFlO29CQUNuRSw0QkFBNEI7O29CQUU1QixtQkFBbUIsY0FBYztvQkFDakMsZ0JBQWdCLElBQUksMEJBQTBCOzs7Z0JBR2xELEdBQUcsZ0NBQWdDLFlBQVc7b0JBQzFDLE9BQU8sY0FBYyxhQUFhLFFBQVEsaUJBQWlCO29CQUMzRCxPQUFPLGNBQWMsaUJBQWlCLFFBQVEsSUFBSSxJQUFJLE9BQU8sUUFBUSxpQkFBaUI7Ozs7O0dBWTNGIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbk9iamVjdFJlc3VsdFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0ICd0ZXN0L2pzL2NvbW1vbi9tb2RlbC9Nb2RlbFRlc3REYXRhJztcclxuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIENlcnRpZmljYXRpb25PYmplY3RSZXN1bHQgbW9kZWwgb2JqZWN0LlxyXG4gKi9cclxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25PYmplY3RSZXN1bHQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgb2JqZWN0UmVzdWx0RGF0YSwgQ2VydGlmaWNhdGlvbk9iamVjdFJlc3VsdCwgY2VydE9ialJlc3VsdDtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0NlcnRpZmljYXRpb25PYmplY3RSZXN1bHRfLCBtb2RlbFRlc3REYXRhKSB7XHJcbiAgICAgICAgQ2VydGlmaWNhdGlvbk9iamVjdFJlc3VsdCA9IF9DZXJ0aWZpY2F0aW9uT2JqZWN0UmVzdWx0XztcclxuXHJcbiAgICAgICAgb2JqZWN0UmVzdWx0RGF0YSA9IG1vZGVsVGVzdERhdGEuR0VORVJJQ19PQkpFQ1RfUkVTVUxUO1xyXG4gICAgICAgIGNlcnRPYmpSZXN1bHQgPSBuZXcgQ2VydGlmaWNhdGlvbk9iamVjdFJlc3VsdChvYmplY3RSZXN1bHREYXRhKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBpdCgncmV0dXJucyB0aGUgY2VydE9iamVjdFJlc3VsdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChjZXJ0T2JqUmVzdWx0LmdldE9iamVjdCgpKS50b0VxdWFsKG9iamVjdFJlc3VsdERhdGEub2JqZWN0KTtcclxuICAgICAgICBleHBlY3QoY2VydE9ialJlc3VsdC5nZXRBdHRyaWJ1dGVzKCkpLnRvRXF1YWwobmV3IE1hcChPYmplY3QuZW50cmllcyhvYmplY3RSZXN1bHREYXRhLmF0dHJpYnV0ZXMpKSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
