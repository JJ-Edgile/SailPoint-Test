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
             * Tests for the ListResultDTO model object.
             */
            describe('ListResultDTO', function () {

                var listResultData, ListResultDTO, lrDTO;

                beforeEach(module(modelModule));

                beforeEach(inject(function (_ListResultDTO_, modelTestData) {
                    ListResultDTO = _ListResultDTO_;

                    listResultData = modelTestData.GENERIC_LIST_RESULT;

                    lrDTO = new ListResultDTO(listResultData);
                }));

                it('returns the correct value of count', function () {
                    expect(lrDTO.getCount()).toEqual(listResultData.count);
                });

                it('returns the correct value of objects', function () {
                    expect(lrDTO.getObjects()).toEqual(listResultData.objects);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9MaXN0UmVzdWx0RFRPVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixvQkFBb0IsVUFBVSxTQUFTOztJQUMvRzs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGNBQWMsd0JBQXdCO1dBQ3ZDLFVBQVUsZ0JBQWdCO1FBQzdCLFNBQVMsWUFBWTs7Ozs7WUFDN0IsU0FBUyxpQkFBaUIsWUFBVzs7Z0JBRWpDLElBQUksZ0JBQ0EsZUFDQTs7Z0JBRUosV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsaUJBQWlCLGVBQWU7b0JBQ3ZELGdCQUFnQjs7b0JBRWhCLGlCQUFpQixjQUFjOztvQkFFL0IsUUFBUSxJQUFJLGNBQWM7OztnQkFHOUIsR0FBRyxzQ0FBc0MsWUFBVztvQkFDaEQsT0FBTyxNQUFNLFlBQVksUUFBUSxlQUFlOzs7Z0JBR3BELEdBQUcsd0NBQXdDLFlBQVc7b0JBQ2xELE9BQU8sTUFBTSxjQUFjLFFBQVEsZUFBZTs7Ozs7R0FPdkQiLCJmaWxlIjoiY29tbW9uL21vZGVsL0xpc3RSZXN1bHREVE9UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtb2RlbE1vZHVsZSBmcm9tICdjb21tb24vbW9kZWwvTW9kZWxNb2R1bGUnO1xuaW1wb3J0ICcuL01vZGVsVGVzdERhdGEnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgTGlzdFJlc3VsdERUTyBtb2RlbCBvYmplY3QuXG4gKi9cbmRlc2NyaWJlKCdMaXN0UmVzdWx0RFRPJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgbGlzdFJlc3VsdERhdGEsXG4gICAgICAgIExpc3RSZXN1bHREVE8sXG4gICAgICAgIGxyRFRPO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9MaXN0UmVzdWx0RFRPXywgbW9kZWxUZXN0RGF0YSkge1xuICAgICAgICBMaXN0UmVzdWx0RFRPID0gX0xpc3RSZXN1bHREVE9fO1xuXG4gICAgICAgIGxpc3RSZXN1bHREYXRhID0gbW9kZWxUZXN0RGF0YS5HRU5FUklDX0xJU1RfUkVTVUxUO1xuXG4gICAgICAgIGxyRFRPID0gbmV3IExpc3RSZXN1bHREVE8obGlzdFJlc3VsdERhdGEpO1xuICAgIH0pKTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHZhbHVlIG9mIGNvdW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChsckRUTy5nZXRDb3VudCgpKS50b0VxdWFsKGxpc3RSZXN1bHREYXRhLmNvdW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHZhbHVlIG9mIG9iamVjdHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGxyRFRPLmdldE9iamVjdHMoKSkudG9FcXVhbChsaXN0UmVzdWx0RGF0YS5vYmplY3RzKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
