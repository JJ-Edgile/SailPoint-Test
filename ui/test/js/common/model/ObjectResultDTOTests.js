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
             * Tests for the ObjectResultDTO model object.
             */
            describe('ObjectResultDTO', function () {

                var resultData, ObjectResultDTO, resultDTO;

                beforeEach(module(modelModule));

                beforeEach(inject(function (_ObjectResultDTO_, modelTestData) {
                    ObjectResultDTO = _ObjectResultDTO_;

                    resultData = modelTestData.GENERIC_OBJECT_RESULT;

                    resultDTO = new ObjectResultDTO(resultData);
                }));

                it('returns the correct value of object', function () {
                    expect(resultDTO.getObject()).toEqual(resultData.object);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9PYmplY3RSZXN1bHREVE9UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLG9CQUFvQixVQUFVLFNBQVM7OztJQUczRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGNBQWMsd0JBQXdCO1dBQ3ZDLFVBQVUsZ0JBQWdCO1FBQzdCLFNBQVMsWUFBWTs7Ozs7WUFEN0IsU0FBUyxtQkFBbUIsWUFBVzs7Z0JBRW5DLElBQUksWUFDQSxpQkFDQTs7Z0JBRUosV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsbUJBQW1CLGVBQWU7b0JBQ3pELGtCQUFrQjs7b0JBRWxCLGFBQWEsY0FBYzs7b0JBRTNCLFlBQVksSUFBSSxnQkFBZ0I7OztnQkFHcEMsR0FBRyx1Q0FBdUMsWUFBVztvQkFDakQsT0FBTyxVQUFVLGFBQWEsUUFBUSxXQUFXOzs7OztHQVN0RCIsImZpbGUiOiJjb21tb24vbW9kZWwvT2JqZWN0UmVzdWx0RFRPVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbW9kZWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGVsL01vZGVsTW9kdWxlJztcbmltcG9ydCAnLi9Nb2RlbFRlc3REYXRhJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIE9iamVjdFJlc3VsdERUTyBtb2RlbCBvYmplY3QuXG4gKi9cbmRlc2NyaWJlKCdPYmplY3RSZXN1bHREVE8nLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciByZXN1bHREYXRhLFxuICAgICAgICBPYmplY3RSZXN1bHREVE8sXG4gICAgICAgIHJlc3VsdERUTztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1vZGVsTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfT2JqZWN0UmVzdWx0RFRPXywgbW9kZWxUZXN0RGF0YSkge1xuICAgICAgICBPYmplY3RSZXN1bHREVE8gPSBfT2JqZWN0UmVzdWx0RFRPXztcblxuICAgICAgICByZXN1bHREYXRhID0gbW9kZWxUZXN0RGF0YS5HRU5FUklDX09CSkVDVF9SRVNVTFQ7XG5cbiAgICAgICAgcmVzdWx0RFRPID0gbmV3IE9iamVjdFJlc3VsdERUTyhyZXN1bHREYXRhKTtcbiAgICB9KSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCB2YWx1ZSBvZiBvYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlc3VsdERUTy5nZXRPYmplY3QoKSkudG9FcXVhbChyZXN1bHREYXRhLm9iamVjdCk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
