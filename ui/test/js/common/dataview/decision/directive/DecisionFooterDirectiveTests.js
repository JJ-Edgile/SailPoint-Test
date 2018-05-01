System.register(['test/js/TestInitializer', 'common/dataview/decision/directive/DecisionDirectiveModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var decisionDirectiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewDecisionDirectiveDecisionDirectiveModule) {
            decisionDirectiveModule = _commonDataviewDecisionDirectiveDecisionDirectiveModule['default'];
        }],
        execute: function () {

            describe('spDecisionFooter', function () {

                var def = '<sp-decision-footer sp-decision-store="decisionStore" sp-save-decisions-func="saveFunc()" />',
                    element = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    decisionStore = undefined,
                    decisionCount = undefined,
                    saveSuccess = undefined,
                    saveFunc = undefined;

                beforeEach(module(decisionDirectiveModule));

                beforeEach(inject(function ($rootScope, _$compile_, $q) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;

                    decisionStore = {
                        clearDecisions: jasmine.createSpy('clearDecisions'),
                        getDecisionCount: jasmine.createSpy('getDecisionCount').and.callFake(function () {
                            return decisionCount;
                        })
                    };

                    saveFunc = jasmine.createSpy('saveFunc').and.callFake(function () {
                        return saveSuccess ? $q.when() : $q.reject();
                    });

                    decisionCount = 0;
                    saveSuccess = true;
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement(decisionStore, count) {
                    var elementDef = arguments.length <= 2 || arguments[2] === undefined ? def : arguments[2];

                    decisionCount = count;
                    $scope.decisionStore = decisionStore;
                    $scope.saveFunc = saveFunc;
                    element = angular.element($compile(elementDef)($scope));
                    $scope.$apply();
                }

                it('throws with no decision store', function () {
                    expect(function () {
                        return createElement(undefined, 0);
                    }).toThrow();
                });

                it('throws with no save function', function () {
                    expect(function () {
                        return createElement(decisionStore, 0, '<sp-decision-footer sp-decision-store="decisionStore" />');
                    }).toThrow();
                });

                describe('clear button', function () {
                    function findClearButton() {
                        var clearButton = element.find('#clearDecisionsBtn');
                        expect(clearButton.length).toEqual(1);
                        return angular.element(clearButton[0]);
                    }

                    it('is not visible if there are no decisions', function () {
                        createElement(decisionStore, 0);
                        expect(findClearButton().hasClass('ng-hide')).toEqual(true);
                    });

                    it('is visible if there are decisions', function () {
                        createElement(decisionStore, 10);
                        expect(findClearButton().hasClass('ng-hide')).toEqual(false);
                    });

                    it('clears the decisions when clicked', function () {
                        createElement(decisionStore, 10);
                        var clearButton = findClearButton();
                        angular.element(clearButton).click();
                        $scope.$apply();
                        expect(decisionStore.clearDecisions).toHaveBeenCalled();
                    });
                });

                describe('save button', function () {
                    function findSaveButton() {
                        var saveButton = element.find('#saveDecisionsBtn');
                        expect(saveButton.length).toEqual(1);
                        return angular.element(saveButton[0]);
                    }

                    it('is disabled if there are no decisions', function () {
                        createElement(decisionStore, 0);
                        expect(findSaveButton().attr('disabled')).toEqual('disabled');
                    });

                    it('is enabled if there are decisions', function () {
                        createElement(decisionStore, 5);
                        expect(findSaveButton().attr('disabled')).not.toEqual('disabled');
                    });

                    it('calls through to saveDecisionsFunc when clicked', function () {
                        createElement(decisionStore, 5);
                        findSaveButton().click();
                        $scope.$apply();
                        expect(saveFunc).toHaveBeenCalled();
                        expect(decisionStore.clearDecisions).toHaveBeenCalled();
                    });

                    it('does not clear decisions if save func fails', function () {
                        saveSuccess = false;
                        createElement(decisionStore, 5);
                        findSaveButton().click();
                        $scope.$apply();
                        expect(saveFunc).toHaveBeenCalled();
                        expect(decisionStore.clearDecisions).not.toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9kZWNpc2lvbi9kaXJlY3RpdmUvRGVjaXNpb25Gb290ZXJEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsK0RBQStELFVBQVUsU0FBUzs7O0lBRzFIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5REFBeUQ7WUFDL0csMEJBQTBCLHdEQUF3RDs7UUFFdEYsU0FBUyxZQUFZOztZQUw3QixTQUFTLG9CQUFvQixZQUFNOztnQkFFL0IsSUFBSSxNQUFHO29CQUNILFVBQU87b0JBQUUsU0FBTTtvQkFBRSxXQUFRO29CQUFFLGdCQUFhO29CQUFFLGdCQUFhO29CQUFFLGNBQVc7b0JBQUUsV0FBUTs7Z0JBRWxGLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLFlBQVksWUFBWSxJQUFPO29CQUM5QyxTQUFTLFdBQVc7b0JBQ3BCLFdBQVc7O29CQUVYLGdCQUFnQjt3QkFDWixnQkFBZ0IsUUFBUSxVQUFVO3dCQUNsQyxrQkFBa0IsUUFBUSxVQUFVLG9CQUFvQixJQUFJLFNBQVMsWUFBQTs0QkFjckQsT0FkMkQ7Ozs7b0JBRy9FLFdBQVcsUUFBUSxVQUFVLFlBQVksSUFBSSxTQUFTLFlBQU07d0JBQ3hELE9BQVEsY0FBZSxHQUFHLFNBQVMsR0FBRzs7O29CQUcxQyxnQkFBZ0I7b0JBQ2hCLGNBQWM7OztnQkFHbEIsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLGNBQWMsZUFBZSxPQUF5QjtvQkFnQi9DLElBaEI2QixhQUFVLFVBQUEsVUFBQSxLQUFBLFVBQUEsT0FBQSxZQUFHLE1BQUcsVUFBQTs7b0JBQ3pELGdCQUFnQjtvQkFDaEIsT0FBTyxnQkFBZ0I7b0JBQ3ZCLE9BQU8sV0FBVztvQkFDbEIsVUFBVSxRQUFRLFFBQVEsU0FBUyxZQUFZO29CQUMvQyxPQUFPOzs7Z0JBR1gsR0FBRyxpQ0FBaUMsWUFBTTtvQkFDdEMsT0FBTyxZQUFBO3dCQWtCUyxPQWxCSCxjQUFjLFdBQVc7dUJBQUk7OztnQkFHOUMsR0FBRyxnQ0FBZ0MsWUFBTTtvQkFDckMsT0FBTyxZQUFBO3dCQW9CUyxPQXBCSCxjQUFjLGVBQWUsR0FBQzt1QkFDdEM7OztnQkFHVCxTQUFTLGdCQUFnQixZQUFNO29CQUMzQixTQUFTLGtCQUFrQjt3QkFDdkIsSUFBSSxjQUFjLFFBQVEsS0FBSzt3QkFDL0IsT0FBTyxZQUFZLFFBQVEsUUFBUTt3QkFDbkMsT0FBTyxRQUFRLFFBQVEsWUFBWTs7O29CQUd2QyxHQUFHLDRDQUE0QyxZQUFXO3dCQUN0RCxjQUFjLGVBQWU7d0JBQzdCLE9BQU8sa0JBQWtCLFNBQVMsWUFBWSxRQUFROzs7b0JBRzFELEdBQUcscUNBQXFDLFlBQVc7d0JBQy9DLGNBQWMsZUFBZTt3QkFDN0IsT0FBTyxrQkFBa0IsU0FBUyxZQUFZLFFBQVE7OztvQkFHMUQsR0FBRyxxQ0FBcUMsWUFBTTt3QkFDMUMsY0FBYyxlQUFlO3dCQUM3QixJQUFJLGNBQWM7d0JBQ2xCLFFBQVEsUUFBUSxhQUFhO3dCQUM3QixPQUFPO3dCQUNQLE9BQU8sY0FBYyxnQkFBZ0I7Ozs7Z0JBSTdDLFNBQVMsZUFBZSxZQUFXO29CQUMvQixTQUFTLGlCQUFpQjt3QkFDdEIsSUFBSSxhQUFhLFFBQVEsS0FBSzt3QkFDOUIsT0FBTyxXQUFXLFFBQVEsUUFBUTt3QkFDbEMsT0FBTyxRQUFRLFFBQVEsV0FBVzs7O29CQUd0QyxHQUFHLHlDQUF5QyxZQUFXO3dCQUNuRCxjQUFjLGVBQWU7d0JBQzdCLE9BQU8saUJBQWlCLEtBQUssYUFBYSxRQUFROzs7b0JBR3RELEdBQUcscUNBQXFDLFlBQVc7d0JBQy9DLGNBQWMsZUFBZTt3QkFDN0IsT0FBTyxpQkFBaUIsS0FBSyxhQUFhLElBQUksUUFBUTs7O29CQUcxRCxHQUFHLG1EQUFtRCxZQUFNO3dCQUN4RCxjQUFjLGVBQWU7d0JBQzdCLGlCQUFpQjt3QkFDakIsT0FBTzt3QkFDUCxPQUFPLFVBQVU7d0JBQ2pCLE9BQU8sY0FBYyxnQkFBZ0I7OztvQkFHekMsR0FBSSwrQ0FBK0MsWUFBTTt3QkFDckQsY0FBYzt3QkFDZCxjQUFjLGVBQWU7d0JBQzdCLGlCQUFpQjt3QkFDakIsT0FBTzt3QkFDUCxPQUFPLFVBQVU7d0JBQ2pCLE9BQU8sY0FBYyxnQkFBZ0IsSUFBSTs7Ozs7O0dBMEJsRCIsImZpbGUiOiJjb21tb24vZGF0YXZpZXcvZGVjaXNpb24vZGlyZWN0aXZlL0RlY2lzaW9uRm9vdGVyRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGVjaXNpb25EaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L2RlY2lzaW9uL2RpcmVjdGl2ZS9EZWNpc2lvbkRpcmVjdGl2ZU1vZHVsZSc7XG5cbmRlc2NyaWJlKCdzcERlY2lzaW9uRm9vdGVyJywgKCkgPT4ge1xuXG4gICAgbGV0IGRlZiA9IGA8c3AtZGVjaXNpb24tZm9vdGVyIHNwLWRlY2lzaW9uLXN0b3JlPVwiZGVjaXNpb25TdG9yZVwiIHNwLXNhdmUtZGVjaXNpb25zLWZ1bmM9XCJzYXZlRnVuYygpXCIgLz5gLFxuICAgICAgICBlbGVtZW50LCAkc2NvcGUsICRjb21waWxlLCBkZWNpc2lvblN0b3JlLCBkZWNpc2lvbkNvdW50LCBzYXZlU3VjY2Vzcywgc2F2ZUZ1bmM7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShkZWNpc2lvbkRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKCRyb290U2NvcGUsIF8kY29tcGlsZV8sICRxKSA9PiB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG5cbiAgICAgICAgZGVjaXNpb25TdG9yZSA9IHtcbiAgICAgICAgICAgIGNsZWFyRGVjaXNpb25zOiBqYXNtaW5lLmNyZWF0ZVNweSgnY2xlYXJEZWNpc2lvbnMnKSxcbiAgICAgICAgICAgIGdldERlY2lzaW9uQ291bnQ6IGphc21pbmUuY3JlYXRlU3B5KCdnZXREZWNpc2lvbkNvdW50JykuYW5kLmNhbGxGYWtlKCgpID0+IGRlY2lzaW9uQ291bnQpXG4gICAgICAgIH07XG5cbiAgICAgICAgc2F2ZUZ1bmMgPSBqYXNtaW5lLmNyZWF0ZVNweSgnc2F2ZUZ1bmMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChzYXZlU3VjY2VzcykgPyAkcS53aGVuKCkgOiAkcS5yZWplY3QoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVjaXNpb25Db3VudCA9IDA7XG4gICAgICAgIHNhdmVTdWNjZXNzID0gdHJ1ZTtcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChkZWNpc2lvblN0b3JlLCBjb3VudCwgZWxlbWVudERlZiA9IGRlZikge1xuICAgICAgICBkZWNpc2lvbkNvdW50ID0gY291bnQ7XG4gICAgICAgICRzY29wZS5kZWNpc2lvblN0b3JlID0gZGVjaXNpb25TdG9yZTtcbiAgICAgICAgJHNjb3BlLnNhdmVGdW5jID0gc2F2ZUZ1bmM7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGNvbXBpbGUoZWxlbWVudERlZikoJHNjb3BlKSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9XG5cbiAgICBpdCgndGhyb3dzIHdpdGggbm8gZGVjaXNpb24gc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVFbGVtZW50KHVuZGVmaW5lZCwgMCkpLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBzYXZlIGZ1bmN0aW9uJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudChkZWNpc2lvblN0b3JlLCAwLCBgPHNwLWRlY2lzaW9uLWZvb3RlciBzcC1kZWNpc2lvbi1zdG9yZT1cImRlY2lzaW9uU3RvcmVcIiAvPmApKVxuICAgICAgICAgICAgLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjbGVhciBidXR0b24nLCAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIGZpbmRDbGVhckJ1dHRvbigpIHtcbiAgICAgICAgICAgIGxldCBjbGVhckJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnI2NsZWFyRGVjaXNpb25zQnRuJyk7XG4gICAgICAgICAgICBleHBlY3QoY2xlYXJCdXR0b24ubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudChjbGVhckJ1dHRvblswXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnaXMgbm90IHZpc2libGUgaWYgdGhlcmUgYXJlIG5vIGRlY2lzaW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChkZWNpc2lvblN0b3JlLCAwKTtcbiAgICAgICAgICAgIGV4cGVjdChmaW5kQ2xlYXJCdXR0b24oKS5oYXNDbGFzcygnbmctaGlkZScpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaXMgdmlzaWJsZSBpZiB0aGVyZSBhcmUgZGVjaXNpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlY2lzaW9uU3RvcmUsIDEwKTtcbiAgICAgICAgICAgIGV4cGVjdChmaW5kQ2xlYXJCdXR0b24oKS5oYXNDbGFzcygnbmctaGlkZScpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NsZWFycyB0aGUgZGVjaXNpb25zIHdoZW4gY2xpY2tlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZGVjaXNpb25TdG9yZSwgMTApO1xuICAgICAgICAgICAgbGV0IGNsZWFyQnV0dG9uID0gZmluZENsZWFyQnV0dG9uKCk7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoY2xlYXJCdXR0b24pLmNsaWNrKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb25TdG9yZS5jbGVhckRlY2lzaW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzYXZlIGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiBmaW5kU2F2ZUJ1dHRvbigpIHtcbiAgICAgICAgICAgIGxldCBzYXZlQnV0dG9uID0gZWxlbWVudC5maW5kKCcjc2F2ZURlY2lzaW9uc0J0bicpO1xuICAgICAgICAgICAgZXhwZWN0KHNhdmVCdXR0b24ubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudChzYXZlQnV0dG9uWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiB0aGVyZSBhcmUgbm8gZGVjaXNpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlY2lzaW9uU3RvcmUsIDApO1xuICAgICAgICAgICAgZXhwZWN0KGZpbmRTYXZlQnV0dG9uKCkuYXR0cignZGlzYWJsZWQnKSkudG9FcXVhbCgnZGlzYWJsZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lzIGVuYWJsZWQgaWYgdGhlcmUgYXJlIGRlY2lzaW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChkZWNpc2lvblN0b3JlLCA1KTtcbiAgICAgICAgICAgIGV4cGVjdChmaW5kU2F2ZUJ1dHRvbigpLmF0dHIoJ2Rpc2FibGVkJykpLm5vdC50b0VxdWFsKCdkaXNhYmxlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBzYXZlRGVjaXNpb25zRnVuYyB3aGVuIGNsaWNrZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlY2lzaW9uU3RvcmUsIDUpO1xuICAgICAgICAgICAgZmluZFNhdmVCdXR0b24oKS5jbGljaygpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNhdmVGdW5jKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb25TdG9yZS5jbGVhckRlY2lzaW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCAoJ2RvZXMgbm90IGNsZWFyIGRlY2lzaW9ucyBpZiBzYXZlIGZ1bmMgZmFpbHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBzYXZlU3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChkZWNpc2lvblN0b3JlLCA1KTtcbiAgICAgICAgICAgIGZpbmRTYXZlQnV0dG9uKCkuY2xpY2soKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzYXZlRnVuYykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uU3RvcmUuY2xlYXJEZWNpc2lvbnMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
