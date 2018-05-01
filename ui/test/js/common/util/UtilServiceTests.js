System.register(['test/js/TestInitializer', 'common/util/UtilModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {

            describe('utilService', function () {

                var $q = undefined,
                    utilService = undefined,
                    $scope = undefined;

                beforeEach(module(utilModule));

                beforeEach(inject(function (_utilService_, _$q_, $rootScope) {
                    $q = _$q_;
                    utilService = _utilService_;
                    $scope = $rootScope.$new();
                }));

                describe('getFunctionIfEnabled', function () {
                    var checkFunc = undefined,
                        actionFunc = undefined,
                        checkResult = undefined;
                    beforeEach(function () {
                        checkFunc = jasmine.createSpy('checkFunc').and.callFake(function () {
                            return $q.when(checkResult);
                        });
                        actionFunc = jasmine.createSpy('actionFunc');
                    });

                    it('throws with no checkFunc', function () {
                        expect(function () {
                            return utilService.getFunctionIfEnabled(undefined, actionFunc);
                        }).toThrow();
                    });

                    it('throws with non-function checkFunc', function () {
                        expect(function () {
                            return utilService.getFunctionIfEnabled('abc', actionFunc);
                        }).toThrow();
                    });

                    it('throws with no actionFunc', function () {
                        expect(function () {
                            return utilService.getFunctionIfEnabled(checkFunc, undefined);
                        }).toThrow();
                    });

                    it('throws with non-function actionFunc', function () {
                        expect(function () {
                            return utilService.getFunctionIfEnabled(checkFunc, '123');
                        }).toThrow();
                    });

                    it('returns actionFunc if checkFunc resolves with truthiness', function () {
                        var testResult = undefined;
                        checkResult = true;
                        utilService.getFunctionIfEnabled(checkFunc, actionFunc).then(function (result) {
                            return testResult = result;
                        });
                        $scope.$apply();
                        expect(testResult).toBe(actionFunc);
                    });

                    it('returns rejected promise if checkFunc resolves with falsehood', function () {
                        var testResult = undefined,
                            rejected = false;
                        checkResult = false;
                        utilService.getFunctionIfEnabled(checkFunc, actionFunc).then(function (result) {
                            return testResult = result;
                        })['catch'](function () {
                            return rejected = true;
                        });
                        $scope.$apply();
                        expect(testResult).not.toBeDefined();
                        expect(rejected).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL1V0aWxTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7OztJQUd0Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsZUFBZSxZQUFNOztnQkFFMUIsSUFBSSxLQUFFO29CQUFFLGNBQVc7b0JBQUUsU0FBTTs7Z0JBRTNCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGVBQWUsTUFBTSxZQUFjO29CQUNsRCxLQUFLO29CQUNMLGNBQWM7b0JBQ2QsU0FBUyxXQUFXOzs7Z0JBR3hCLFNBQVMsd0JBQXdCLFlBQU07b0JBQ25DLElBQUksWUFBUzt3QkFBRSxhQUFVO3dCQUFFLGNBQVc7b0JBQ3RDLFdBQVcsWUFBTTt3QkFDYixZQUFZLFFBQVEsVUFBVSxhQUFhLElBQUksU0FBUyxZQUFBOzRCQVl4QyxPQVo4QyxHQUFHLEtBQUs7O3dCQUN0RSxhQUFhLFFBQVEsVUFBVTs7O29CQUduQyxHQUFHLDRCQUE0QixZQUFNO3dCQUNqQyxPQUFPLFlBQUE7NEJBY1MsT0FkSCxZQUFZLHFCQUFxQixXQUFXOzJCQUFhOzs7b0JBRzFFLEdBQUcsc0NBQXNDLFlBQU07d0JBQzNDLE9BQU8sWUFBQTs0QkFnQlMsT0FoQkgsWUFBWSxxQkFBcUIsT0FBTzsyQkFBYTs7O29CQUd0RSxHQUFHLDZCQUE2QixZQUFNO3dCQUNsQyxPQUFPLFlBQUE7NEJBa0JTLE9BbEJILFlBQVkscUJBQXFCLFdBQVc7MkJBQVk7OztvQkFHekUsR0FBRyx1Q0FBdUMsWUFBTTt3QkFDNUMsT0FBTyxZQUFBOzRCQW9CUyxPQXBCSCxZQUFZLHFCQUFxQixXQUFXOzJCQUFROzs7b0JBR3JFLEdBQUcsNERBQTRELFlBQU07d0JBQ2pFLElBQUksYUFBVTt3QkFDZCxjQUFjO3dCQUNkLFlBQVkscUJBQXFCLFdBQVcsWUFBWSxLQUFLLFVBQUMsUUFBTTs0QkFzQnBELE9BdEJ5RCxhQUFhOzt3QkFDdEYsT0FBTzt3QkFDUCxPQUFPLFlBQVksS0FBSzs7O29CQUc1QixHQUFHLGlFQUFpRSxZQUFNO3dCQUN0RSxJQUFJLGFBQVU7NEJBQUUsV0FBVzt3QkFDM0IsY0FBYzt3QkFDZCxZQUFZLHFCQUFxQixXQUFXLFlBQ3ZDLEtBQUssVUFBQyxRQUFNOzRCQXdCRCxPQXhCTSxhQUFhOzJCQUFPLFNBQy9CLFlBQUE7NEJBeUJLLE9BekJDLFdBQVc7O3dCQUM1QixPQUFPO3dCQUNQLE9BQU8sWUFBWSxJQUFJO3dCQUN2QixPQUFPLFVBQVUsUUFBUTs7Ozs7O0dBZ0NsQyIsImZpbGUiOiJjb21tb24vdXRpbC9VdGlsU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHV0aWxNb2R1bGUgZnJvbSAnY29tbW9uL3V0aWwvVXRpbE1vZHVsZSc7XG5cbmRlc2NyaWJlKCd1dGlsU2VydmljZScsICgpID0+IHtcblxuICAgIGxldCAkcSwgdXRpbFNlcnZpY2UsICRzY29wZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHV0aWxNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfdXRpbFNlcnZpY2VfLCBfJHFfLCAkcm9vdFNjb3BlKT0+IHtcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICB1dGlsU2VydmljZSA9IF91dGlsU2VydmljZV87XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdnZXRGdW5jdGlvbklmRW5hYmxlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IGNoZWNrRnVuYywgYWN0aW9uRnVuYywgY2hlY2tSZXN1bHQ7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgY2hlY2tGdW5jID0gamFzbWluZS5jcmVhdGVTcHkoJ2NoZWNrRnVuYycpLmFuZC5jYWxsRmFrZSgoKSA9PiAkcS53aGVuKGNoZWNrUmVzdWx0KSk7XG4gICAgICAgICAgICBhY3Rpb25GdW5jID0gamFzbWluZS5jcmVhdGVTcHkoJ2FjdGlvbkZ1bmMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGNoZWNrRnVuYycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB1dGlsU2VydmljZS5nZXRGdW5jdGlvbklmRW5hYmxlZCh1bmRlZmluZWQsIGFjdGlvbkZ1bmMpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBub24tZnVuY3Rpb24gY2hlY2tGdW5jJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHV0aWxTZXJ2aWNlLmdldEZ1bmN0aW9uSWZFbmFibGVkKCdhYmMnLCBhY3Rpb25GdW5jKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gYWN0aW9uRnVuYycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB1dGlsU2VydmljZS5nZXRGdW5jdGlvbklmRW5hYmxlZChjaGVja0Z1bmMsIHVuZGVmaW5lZCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vbi1mdW5jdGlvbiBhY3Rpb25GdW5jJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHV0aWxTZXJ2aWNlLmdldEZ1bmN0aW9uSWZFbmFibGVkKGNoZWNrRnVuYywgJzEyMycpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGFjdGlvbkZ1bmMgaWYgY2hlY2tGdW5jIHJlc29sdmVzIHdpdGggdHJ1dGhpbmVzcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZXN0UmVzdWx0O1xuICAgICAgICAgICAgY2hlY2tSZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgdXRpbFNlcnZpY2UuZ2V0RnVuY3Rpb25JZkVuYWJsZWQoY2hlY2tGdW5jLCBhY3Rpb25GdW5jKS50aGVuKChyZXN1bHQpID0+IHRlc3RSZXN1bHQgPSByZXN1bHQpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RSZXN1bHQpLnRvQmUoYWN0aW9uRnVuYyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHJlamVjdGVkIHByb21pc2UgaWYgY2hlY2tGdW5jIHJlc29sdmVzIHdpdGggZmFsc2Vob29kJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRlc3RSZXN1bHQsIHJlamVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBjaGVja1Jlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgdXRpbFNlcnZpY2UuZ2V0RnVuY3Rpb25JZkVuYWJsZWQoY2hlY2tGdW5jLCBhY3Rpb25GdW5jKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHRlc3RSZXN1bHQgPSByZXN1bHQpXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHJlamVjdGVkID0gdHJ1ZSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QodGVzdFJlc3VsdCkubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QocmVqZWN0ZWQpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
