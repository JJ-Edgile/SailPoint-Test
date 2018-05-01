System.register(['test/js/TestInitializer', 'common/model/ModelModule', './ModelTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }, function (_ModelTestData) {}],
        execute: function () {

            /**
             * Tests for the RequestResultDTO model object.
             */
            describe('RequestResultDTO', function () {

                var resultData, RequestResultDTO, resultDTO;

                beforeEach(module(modelModule));

                beforeEach(inject(function (_RequestResultDTO_, modelTestData) {
                    RequestResultDTO = _RequestResultDTO_;

                    resultData = modelTestData.GENERIC_REQUEST_RESULT;

                    resultDTO = new RequestResultDTO(resultData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new RequestResultDTO(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new RequestResultDTO('hi mom');
                    }).toThrow();
                    expect(function () {
                        new RequestResultDTO(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns the attributes from the data', function () {
                    expect(resultDTO.getAttributes()).toEqual(resultData.attributes);
                });

                it('returns the correct value of complete', function () {
                    expect(resultDTO.isComplete()).toEqual(resultData.complete);
                });

                it('returns the correct value of errors', function () {
                    expect(resultDTO.getErrors()).toEqual(resultData.errors);
                });

                it('returns the correct value of metaData', function () {
                    expect(resultDTO.getMetaData()).toEqual(resultData.metaData);
                });

                it('returns the correct value of requestID', function () {
                    expect(resultDTO.getRequestID()).toEqual(resultData.requestID);
                });

                it('returns the correct value of retry', function () {
                    expect(resultDTO.isRetry()).toEqual(resultData.retry);
                });

                it('returns the correct value of retryWait', function () {
                    expect(resultDTO.getRetryWait()).toEqual(resultData.retryWait);
                });

                it('returns the correct value of status', function () {
                    expect(resultDTO.getStatus()).toEqual(resultData.status);
                });

                it('returns the correct value of success', function () {
                    expect(resultDTO.isSuccess()).toEqual(resultData.success);
                });

                it('returns the correct value of warnings', function () {
                    expect(resultDTO.getWarnings()).toEqual(resultData.warnings);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9SZXF1ZXN0UmVzdWx0RFRPVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixvQkFBb0IsVUFBVSxTQUFTOzs7SUFHM0c7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3QjtXQUN2QyxVQUFVLGdCQUFnQjtRQUM3QixTQUFTLFlBQVk7Ozs7O1lBRDdCLFNBQVMsb0JBQW9CLFlBQVc7O2dCQUVwQyxJQUFJLFlBQ0Esa0JBQ0E7O2dCQUVKLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLG9CQUFvQixlQUFlO29CQUMxRCxtQkFBbUI7O29CQUVuQixhQUFhLGNBQWM7O29CQUUzQixZQUFZLElBQUksaUJBQWlCOzs7Z0JBR3JDLEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELE9BQU8sWUFBVzt3QkFDZCxJQUFJLGlCQUFpQjt1QkFDdEI7OztnQkFHUCxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQ2QsSUFBSSxpQkFBaUI7dUJBQ3RCO29CQUNILE9BQU8sWUFBVzt3QkFDZCxJQUFJLGlCQUFpQixZQUFXOzRCQUM1QixPQUFPOzt1QkFFWjs7O2dCQUdQLEdBQUcsd0NBQXdDLFlBQVc7b0JBQ2xELE9BQU8sVUFBVSxpQkFBaUIsUUFBUSxXQUFXOzs7Z0JBR3pELEdBQUcseUNBQXlDLFlBQVc7b0JBQ25ELE9BQU8sVUFBVSxjQUFjLFFBQVEsV0FBVzs7O2dCQUd0RCxHQUFHLHVDQUF1QyxZQUFXO29CQUNqRCxPQUFPLFVBQVUsYUFBYSxRQUFRLFdBQVc7OztnQkFHckQsR0FBRyx5Q0FBeUMsWUFBVztvQkFDbkQsT0FBTyxVQUFVLGVBQWUsUUFBUSxXQUFXOzs7Z0JBR3ZELEdBQUcsMENBQTBDLFlBQVc7b0JBQ3BELE9BQU8sVUFBVSxnQkFBZ0IsUUFBUSxXQUFXOzs7Z0JBR3hELEdBQUcsc0NBQXNDLFlBQVc7b0JBQ2hELE9BQU8sVUFBVSxXQUFXLFFBQVEsV0FBVzs7O2dCQUduRCxHQUFHLDBDQUEwQyxZQUFXO29CQUNwRCxPQUFPLFVBQVUsZ0JBQWdCLFFBQVEsV0FBVzs7O2dCQUd4RCxHQUFHLHVDQUF1QyxZQUFXO29CQUNqRCxPQUFPLFVBQVUsYUFBYSxRQUFRLFdBQVc7OztnQkFHckQsR0FBRyx3Q0FBd0MsWUFBVztvQkFDbEQsT0FBTyxVQUFVLGFBQWEsUUFBUSxXQUFXOzs7Z0JBR3JELEdBQUcseUNBQXlDLFlBQVc7b0JBQ25ELE9BQU8sVUFBVSxlQUFlLFFBQVEsV0FBVzs7Ozs7R0FTeEQiLCJmaWxlIjoiY29tbW9uL21vZGVsL1JlcXVlc3RSZXN1bHREVE9UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtb2RlbE1vZHVsZSBmcm9tICdjb21tb24vbW9kZWwvTW9kZWxNb2R1bGUnO1xuaW1wb3J0ICcuL01vZGVsVGVzdERhdGEnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUmVxdWVzdFJlc3VsdERUTyBtb2RlbCBvYmplY3QuXG4gKi9cbmRlc2NyaWJlKCdSZXF1ZXN0UmVzdWx0RFRPJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgcmVzdWx0RGF0YSxcbiAgICAgICAgUmVxdWVzdFJlc3VsdERUTyxcbiAgICAgICAgcmVzdWx0RFRPO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9SZXF1ZXN0UmVzdWx0RFRPXywgbW9kZWxUZXN0RGF0YSkge1xuICAgICAgICBSZXF1ZXN0UmVzdWx0RFRPID0gX1JlcXVlc3RSZXN1bHREVE9fO1xuXG4gICAgICAgIHJlc3VsdERhdGEgPSBtb2RlbFRlc3REYXRhLkdFTkVSSUNfUkVRVUVTVF9SRVNVTFQ7XG5cbiAgICAgICAgcmVzdWx0RFRPID0gbmV3IFJlcXVlc3RSZXN1bHREVE8ocmVzdWx0RGF0YSk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3JlcXVpcmVzIG5vbi1udWxsIGRhdGEgaW4gdGhlIGNvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5ldyBSZXF1ZXN0UmVzdWx0RFRPKG51bGwpO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXcgUmVxdWVzdFJlc3VsdERUTygnaGkgbW9tJyk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbmV3IFJlcXVlc3RSZXN1bHREVE8oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd3aGF0IHRoYT8nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBhdHRyaWJ1dGVzIGZyb20gdGhlIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlc3VsdERUTy5nZXRBdHRyaWJ1dGVzKCkpLnRvRXF1YWwocmVzdWx0RGF0YS5hdHRyaWJ1dGVzKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHZhbHVlIG9mIGNvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXN1bHREVE8uaXNDb21wbGV0ZSgpKS50b0VxdWFsKHJlc3VsdERhdGEuY29tcGxldGUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIGNvcnJlY3QgdmFsdWUgb2YgZXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXN1bHREVE8uZ2V0RXJyb3JzKCkpLnRvRXF1YWwocmVzdWx0RGF0YS5lcnJvcnMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIGNvcnJlY3QgdmFsdWUgb2YgbWV0YURhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlc3VsdERUTy5nZXRNZXRhRGF0YSgpKS50b0VxdWFsKHJlc3VsdERhdGEubWV0YURhdGEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIGNvcnJlY3QgdmFsdWUgb2YgcmVxdWVzdElEJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXN1bHREVE8uZ2V0UmVxdWVzdElEKCkpLnRvRXF1YWwocmVzdWx0RGF0YS5yZXF1ZXN0SUQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIGNvcnJlY3QgdmFsdWUgb2YgcmV0cnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlc3VsdERUTy5pc1JldHJ5KCkpLnRvRXF1YWwocmVzdWx0RGF0YS5yZXRyeSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCB2YWx1ZSBvZiByZXRyeVdhaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlc3VsdERUTy5nZXRSZXRyeVdhaXQoKSkudG9FcXVhbChyZXN1bHREYXRhLnJldHJ5V2FpdCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCB2YWx1ZSBvZiBzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlc3VsdERUTy5nZXRTdGF0dXMoKSkudG9FcXVhbChyZXN1bHREYXRhLnN0YXR1cyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCB2YWx1ZSBvZiBzdWNjZXNzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXN1bHREVE8uaXNTdWNjZXNzKCkpLnRvRXF1YWwocmVzdWx0RGF0YS5zdWNjZXNzKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHZhbHVlIG9mIHdhcm5pbmdzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXN1bHREVE8uZ2V0V2FybmluZ3MoKSkudG9FcXVhbChyZXN1bHREYXRhLndhcm5pbmdzKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
