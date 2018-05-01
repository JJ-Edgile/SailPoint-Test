System.register(['test/js/TestInitializer', 'common/model/ModelModule', './ModelTestData'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }, function (_ModelTestData) {}],
        execute: function () {

            /**
             * Tests for the RoleEntitlementResultDTO model object.
             */
            describe('RoleEntitlementResultDTO', function () {

                var listResultData, RoleEntitlementItem, RoleEntitlementResultDTO, lrDTO;

                // Use the access request module.
                beforeEach(module(modelModule));

                /**
                 * Setup the RoleEntitlementResultDTO class and create some data to test with.
                 */
                beforeEach(inject(function (_RoleEntitlementResultDTO_, _RoleEntitlementItem_, modelTestData) {
                    RoleEntitlementItem = _RoleEntitlementItem_;
                    RoleEntitlementResultDTO = _RoleEntitlementResultDTO_;
                    listResultData = modelTestData.GENERIC_LIST_RESULT;
                    lrDTO = new RoleEntitlementResultDTO(listResultData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new RoleEntitlementResultDTO(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new RoleEntitlementResultDTO('hi mom');
                    }).toThrow();
                    expect(function () {
                        new RoleEntitlementResultDTO(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns the attributes from the data', function () {
                    expect(lrDTO.getAttributes()).toEqual(listResultData.attributes);
                });

                it('returns the correct value of complete', function () {
                    expect(lrDTO.isComplete()).toEqual(listResultData.complete);
                });

                it('returns the correct value of count', function () {
                    expect(lrDTO.getCount()).toEqual(listResultData.count);
                });

                it('returns the correct value of errors', function () {
                    expect(lrDTO.getErrors()).toEqual(listResultData.errors);
                });

                it('returns the correct value of metaData', function () {
                    expect(lrDTO.getMetaData()).toEqual(listResultData.metaData);
                });

                it('converts data in objects to array of RoleEntitlementItems', function () {
                    var RoleEntitlementItemArray = [];
                    RoleEntitlementItemArray.push(new RoleEntitlementItem(listResultData.objects[0]));
                    RoleEntitlementItemArray.push(new RoleEntitlementItem(listResultData.objects[1]));
                    expect(lrDTO.getObjects()).toEqual(RoleEntitlementItemArray);
                });

                it('returns the correct value of requestID', function () {
                    expect(lrDTO.getRequestID()).toEqual(listResultData.requestID);
                });

                it('returns the correct value of retry', function () {
                    expect(lrDTO.isRetry()).toEqual(listResultData.retry);
                });

                it('returns the correct value of retryWait', function () {
                    expect(lrDTO.getRetryWait()).toEqual(listResultData.retryWait);
                });

                it('returns the correct value of status', function () {
                    expect(lrDTO.getStatus()).toEqual(listResultData.status);
                });

                it('returns the correct value of success', function () {
                    expect(lrDTO.isSuccess()).toEqual(listResultData.success);
                });

                it('returns the correct value of warnings', function () {
                    expect(lrDTO.getWarnings()).toEqual(listResultData.warnings);
                });

                it('returns the correct value of the metaData totalEntitlementsCount', function () {
                    expect(lrDTO.getTotalEntitlementCount()).toEqual(listResultData.metaData.totalEntitlementCount);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9Sb2xlRW50aXRsZW1lbnRSZXN1bHREVE9UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLG9CQUFvQixVQUFVLFNBQVM7O0lBQy9HOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7V0FDdkMsVUFBVSxnQkFBZ0I7UUFDN0IsU0FBUyxZQUFZOzs7OztZQUM3QixTQUFTLDRCQUE0QixZQUFXOztnQkFFNUMsSUFBSSxnQkFDQSxxQkFDQSwwQkFDQTs7O2dCQUdKLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLDRCQUE0Qix1QkFBdUIsZUFBZTtvQkFDekYsc0JBQXNCO29CQUN0QiwyQkFBMkI7b0JBQzNCLGlCQUFpQixjQUFjO29CQUMvQixRQUFRLElBQUkseUJBQXlCOzs7Z0JBR3pDLEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELE9BQU8sWUFBVzt3QkFDZCxJQUFJLHlCQUF5Qjt1QkFDOUI7OztnQkFHUCxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQ2QsSUFBSSx5QkFBeUI7dUJBQzlCO29CQUNILE9BQU8sWUFBVzt3QkFDZCxJQUFJLHlCQUF5QixZQUFXOzRCQUNwQyxPQUFPOzt1QkFFWjs7O2dCQUdQLEdBQUcsd0NBQXdDLFlBQVc7b0JBQ2xELE9BQU8sTUFBTSxpQkFBaUIsUUFBUSxlQUFlOzs7Z0JBR3pELEdBQUcseUNBQXlDLFlBQVc7b0JBQ25ELE9BQU8sTUFBTSxjQUFjLFFBQVEsZUFBZTs7O2dCQUd0RCxHQUFHLHNDQUFzQyxZQUFXO29CQUNoRCxPQUFPLE1BQU0sWUFBWSxRQUFRLGVBQWU7OztnQkFHcEQsR0FBRyx1Q0FBdUMsWUFBVztvQkFDakQsT0FBTyxNQUFNLGFBQWEsUUFBUSxlQUFlOzs7Z0JBR3JELEdBQUcseUNBQXlDLFlBQVc7b0JBQ25ELE9BQU8sTUFBTSxlQUFlLFFBQVEsZUFBZTs7O2dCQUd2RCxHQUFHLDZEQUE2RCxZQUFXO29CQUN2RSxJQUFJLDJCQUEyQjtvQkFDL0IseUJBQXlCLEtBQUssSUFBSSxvQkFBb0IsZUFBZSxRQUFRO29CQUM3RSx5QkFBeUIsS0FBSyxJQUFJLG9CQUFvQixlQUFlLFFBQVE7b0JBQzdFLE9BQU8sTUFBTSxjQUFjLFFBQVE7OztnQkFHdkMsR0FBRywwQ0FBMEMsWUFBVztvQkFDcEQsT0FBTyxNQUFNLGdCQUFnQixRQUFRLGVBQWU7OztnQkFHeEQsR0FBRyxzQ0FBc0MsWUFBVztvQkFDaEQsT0FBTyxNQUFNLFdBQVcsUUFBUSxlQUFlOzs7Z0JBR25ELEdBQUcsMENBQTBDLFlBQVc7b0JBQ3BELE9BQU8sTUFBTSxnQkFBZ0IsUUFBUSxlQUFlOzs7Z0JBR3hELEdBQUcsdUNBQXVDLFlBQVc7b0JBQ2pELE9BQU8sTUFBTSxhQUFhLFFBQVEsZUFBZTs7O2dCQUdyRCxHQUFHLHdDQUF3QyxZQUFXO29CQUNsRCxPQUFPLE1BQU0sYUFBYSxRQUFRLGVBQWU7OztnQkFHckQsR0FBRyx5Q0FBeUMsWUFBVztvQkFDbkQsT0FBTyxNQUFNLGVBQWUsUUFBUSxlQUFlOzs7Z0JBR3ZELEdBQUcsb0VBQW9FLFlBQVc7b0JBQzlFLE9BQU8sTUFBTSw0QkFBNEIsUUFBUSxlQUFlLFNBQVM7Ozs7O0dBTTlFIiwiZmlsZSI6ImNvbW1vbi9tb2RlbC9Sb2xlRW50aXRsZW1lbnRSZXN1bHREVE9UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNSBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtb2RlbE1vZHVsZSBmcm9tICdjb21tb24vbW9kZWwvTW9kZWxNb2R1bGUnO1xuaW1wb3J0ICcuL01vZGVsVGVzdERhdGEnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUm9sZUVudGl0bGVtZW50UmVzdWx0RFRPIG1vZGVsIG9iamVjdC5cbiAqL1xuZGVzY3JpYmUoJ1JvbGVFbnRpdGxlbWVudFJlc3VsdERUTycsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGxpc3RSZXN1bHREYXRhLFxuICAgICAgICBSb2xlRW50aXRsZW1lbnRJdGVtLFxuICAgICAgICBSb2xlRW50aXRsZW1lbnRSZXN1bHREVE8sXG4gICAgICAgIGxyRFRPO1xuXG4gICAgLy8gVXNlIHRoZSBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBSb2xlRW50aXRsZW1lbnRSZXN1bHREVE8gY2xhc3MgYW5kIGNyZWF0ZSBzb21lIGRhdGEgdG8gdGVzdCB3aXRoLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9Sb2xlRW50aXRsZW1lbnRSZXN1bHREVE9fLCBfUm9sZUVudGl0bGVtZW50SXRlbV8sIG1vZGVsVGVzdERhdGEpIHtcbiAgICAgICAgUm9sZUVudGl0bGVtZW50SXRlbSA9IF9Sb2xlRW50aXRsZW1lbnRJdGVtXztcbiAgICAgICAgUm9sZUVudGl0bGVtZW50UmVzdWx0RFRPID0gX1JvbGVFbnRpdGxlbWVudFJlc3VsdERUT187XG4gICAgICAgIGxpc3RSZXN1bHREYXRhID0gbW9kZWxUZXN0RGF0YS5HRU5FUklDX0xJU1RfUkVTVUxUO1xuICAgICAgICBsckRUTyA9IG5ldyBSb2xlRW50aXRsZW1lbnRSZXN1bHREVE8obGlzdFJlc3VsdERhdGEpO1xuICAgIH0pKTtcblxuICAgIGl0KCdyZXF1aXJlcyBub24tbnVsbCBkYXRhIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXcgUm9sZUVudGl0bGVtZW50UmVzdWx0RFRPKG51bGwpO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXcgUm9sZUVudGl0bGVtZW50UmVzdWx0RFRPKCdoaSBtb20nKTtcbiAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXcgUm9sZUVudGl0bGVtZW50UmVzdWx0RFRPKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnd2hhdCB0aGE/JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgYXR0cmlidXRlcyBmcm9tIHRoZSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsckRUTy5nZXRBdHRyaWJ1dGVzKCkpLnRvRXF1YWwobGlzdFJlc3VsdERhdGEuYXR0cmlidXRlcyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCB2YWx1ZSBvZiBjb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QobHJEVE8uaXNDb21wbGV0ZSgpKS50b0VxdWFsKGxpc3RSZXN1bHREYXRhLmNvbXBsZXRlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHZhbHVlIG9mIGNvdW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsckRUTy5nZXRDb3VudCgpKS50b0VxdWFsKGxpc3RSZXN1bHREYXRhLmNvdW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHZhbHVlIG9mIGVycm9ycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QobHJEVE8uZ2V0RXJyb3JzKCkpLnRvRXF1YWwobGlzdFJlc3VsdERhdGEuZXJyb3JzKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHZhbHVlIG9mIG1ldGFEYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsckRUTy5nZXRNZXRhRGF0YSgpKS50b0VxdWFsKGxpc3RSZXN1bHREYXRhLm1ldGFEYXRhKTtcbiAgICB9KTtcblxuICAgIGl0KCdjb252ZXJ0cyBkYXRhIGluIG9iamVjdHMgdG8gYXJyYXkgb2YgUm9sZUVudGl0bGVtZW50SXRlbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIFJvbGVFbnRpdGxlbWVudEl0ZW1BcnJheSA9IFtdO1xuICAgICAgICBSb2xlRW50aXRsZW1lbnRJdGVtQXJyYXkucHVzaChuZXcgUm9sZUVudGl0bGVtZW50SXRlbShsaXN0UmVzdWx0RGF0YS5vYmplY3RzWzBdKSk7XG4gICAgICAgIFJvbGVFbnRpdGxlbWVudEl0ZW1BcnJheS5wdXNoKG5ldyBSb2xlRW50aXRsZW1lbnRJdGVtKGxpc3RSZXN1bHREYXRhLm9iamVjdHNbMV0pKTtcbiAgICAgICAgZXhwZWN0KGxyRFRPLmdldE9iamVjdHMoKSkudG9FcXVhbChSb2xlRW50aXRsZW1lbnRJdGVtQXJyYXkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIGNvcnJlY3QgdmFsdWUgb2YgcmVxdWVzdElEJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsckRUTy5nZXRSZXF1ZXN0SUQoKSkudG9FcXVhbChsaXN0UmVzdWx0RGF0YS5yZXF1ZXN0SUQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIGNvcnJlY3QgdmFsdWUgb2YgcmV0cnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGxyRFRPLmlzUmV0cnkoKSkudG9FcXVhbChsaXN0UmVzdWx0RGF0YS5yZXRyeSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCB2YWx1ZSBvZiByZXRyeVdhaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGxyRFRPLmdldFJldHJ5V2FpdCgpKS50b0VxdWFsKGxpc3RSZXN1bHREYXRhLnJldHJ5V2FpdCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCB2YWx1ZSBvZiBzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGxyRFRPLmdldFN0YXR1cygpKS50b0VxdWFsKGxpc3RSZXN1bHREYXRhLnN0YXR1cyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCB2YWx1ZSBvZiBzdWNjZXNzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsckRUTy5pc1N1Y2Nlc3MoKSkudG9FcXVhbChsaXN0UmVzdWx0RGF0YS5zdWNjZXNzKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHZhbHVlIG9mIHdhcm5pbmdzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsckRUTy5nZXRXYXJuaW5ncygpKS50b0VxdWFsKGxpc3RSZXN1bHREYXRhLndhcm5pbmdzKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHZhbHVlIG9mIHRoZSBtZXRhRGF0YSB0b3RhbEVudGl0bGVtZW50c0NvdW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsckRUTy5nZXRUb3RhbEVudGl0bGVtZW50Q291bnQoKSkudG9FcXVhbChsaXN0UmVzdWx0RGF0YS5tZXRhRGF0YS50b3RhbEVudGl0bGVtZW50Q291bnQpO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
