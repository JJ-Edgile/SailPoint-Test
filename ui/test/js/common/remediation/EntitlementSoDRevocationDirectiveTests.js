System.register(['common/remediation/RemediationModule', 'test/js/TestInitializer', './RemediationTestData'], function (_export) {
    'use strict';

    var remediationModule;
    return {
        setters: [function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_testJsTestInitializer) {}, function (_RemediationTestData) {}],
        execute: function () {

            describe('EntitlementSoDRevocationDirective', function () {

                var elementDefinition = '<sp-entitlement-sod-revocation policy-tree="policyTree" />',
                    PolicyTreeNode = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    $controller = undefined,
                    remediationTestData = undefined,
                    policyTree = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function ($rootScope, _$compile_, _$controller_, _PolicyTreeNode_, _remediationTestData_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    $controller = _$controller_;
                    remediationTestData = _remediationTestData_;
                    PolicyTreeNode = _PolicyTreeNode_;

                    policyTree = new PolicyTreeNode(remediationTestData.POLICY_TREE_NODE);
                }));

                function makeSingleColumn() {
                    policyTree.children.push(new PolicyTreeNode(remediationTestData.POLICY_TREE_NODE));
                }

                describe('controller', function () {
                    function createController() {
                        var ctrl = $controller('EntitlementSoDRevocationDirectiveCtrl', null, {
                            policyTree: policyTree
                        });
                        ctrl.$onInit();
                        return ctrl;
                    }

                    it('throws without a policy tree', function () {
                        policyTree = null;
                        expect(function () {
                            return createController();
                        }).toThrow();
                    });

                    it('uses two columns when there are two children', function () {
                        var ctrl = createController();
                        expect(ctrl.isTwoColumns()).toEqual(true);
                    });

                    it('uses a single column when there are more than two children', function () {
                        makeSingleColumn();
                        var ctrl = createController();
                        expect(ctrl.isTwoColumns()).toEqual(false);
                    });
                });

                describe('html', function () {
                    function createElement() {
                        var element = angular.element(elementDefinition);
                        $scope.policyTree = policyTree;
                        $compile(element)($scope);
                        $scope.$apply();
                        return element;
                    }

                    it('throws without a policy tree', function () {
                        policyTree = null;
                        expect(function () {
                            return createElement();
                        }).toThrow();
                    });

                    function checkSingleColumn(element, numExpected) {
                        var columns = element.find('.row > .col-sm-12');

                        // There will always be one full width column with instruction text, so subtract it.
                        expect(columns.length - 1).toEqual(numExpected);
                    }

                    function checkTwoColumns(element, numExpected) {
                        var columns = element.find('.row > .col-sm-6');
                        expect(columns.length).toEqual(numExpected);
                    }

                    it('uses two columns when there are two children', function () {
                        var element = createElement();
                        checkSingleColumn(element, 0);
                        checkTwoColumns(element, 2);
                    });

                    it('uses a single column when there are more than two children', function () {
                        makeSingleColumn();
                        var element = createElement();
                        checkSingleColumn(element, 1);
                        checkTwoColumns(element, 0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9FbnRpdGxlbWVudFNvRFJldm9jYXRpb25EaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQyx3Q0FBd0MsMkJBQTJCLDBCQUEwQixVQUFVLFNBQVM7SUFDN0g7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSxxQ0FBcUM7WUFDckQsb0JBQW9CLG9DQUFvQztXQUN6RCxVQUFVLHdCQUF3QixJQUFJLFVBQVUsc0JBQXNCO1FBQ3pFLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyxxQ0FBcUMsWUFBVzs7Z0JBRXJELElBQUksb0JBQWlCO29CQUNqQixpQkFBYztvQkFBRSxTQUFNO29CQUFFLFdBQVE7b0JBQUUsY0FBVztvQkFBRSxzQkFBbUI7b0JBQUUsYUFBVTs7Z0JBRWxGLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSxlQUFlLGtCQUFrQix1QkFBdUI7b0JBQ3ZHLFNBQVMsV0FBVztvQkFDcEIsV0FBVztvQkFDWCxjQUFjO29CQUNkLHNCQUFzQjtvQkFDdEIsaUJBQWlCOztvQkFFakIsYUFBYSxJQUFJLGVBQWUsb0JBQW9COzs7Z0JBR3hELFNBQVMsbUJBQW1CO29CQUN4QixXQUFXLFNBQVMsS0FBSyxJQUFJLGVBQWUsb0JBQW9COzs7Z0JBR3BFLFNBQVMsY0FBYyxZQUFNO29CQUN6QixTQUFTLG1CQUFtQjt3QkFDeEIsSUFBSSxPQUFPLFlBQVkseUNBQXlDLE1BQU07NEJBQ2xFLFlBQVk7O3dCQUVoQixLQUFLO3dCQUNMLE9BQU87OztvQkFHWCxHQUFHLGdDQUFnQyxZQUFNO3dCQUNwQyxhQUFhO3dCQUNiLE9BQU8sWUFBQTs0QkFZUSxPQVpGOzJCQUFvQjs7O29CQUd0QyxHQUFHLGdEQUFnRCxZQUFNO3dCQUNyRCxJQUFJLE9BQU87d0JBQ1gsT0FBTyxLQUFLLGdCQUFnQixRQUFROzs7b0JBR3hDLEdBQUcsOERBQThELFlBQU07d0JBQ25FO3dCQUNBLElBQUksT0FBTzt3QkFDWCxPQUFPLEtBQUssZ0JBQWdCLFFBQVE7Ozs7Z0JBSTVDLFNBQVMsUUFBUSxZQUFNO29CQUNuQixTQUFTLGdCQUFnQjt3QkFDckIsSUFBSSxVQUFVLFFBQVEsUUFBUTt3QkFDOUIsT0FBTyxhQUFhO3dCQUNwQixTQUFTLFNBQVM7d0JBQ2xCLE9BQU87d0JBQ1AsT0FBTzs7O29CQUdYLEdBQUcsZ0NBQWdDLFlBQU07d0JBQ3JDLGFBQWE7d0JBQ2IsT0FBTyxZQUFBOzRCQWNTLE9BZEg7MkJBQWlCOzs7b0JBR2xDLFNBQVMsa0JBQWtCLFNBQVMsYUFBYTt3QkFDN0MsSUFBSSxVQUFVLFFBQVEsS0FBSzs7O3dCQUczQixPQUFPLFFBQVEsU0FBUyxHQUFHLFFBQVE7OztvQkFHdkMsU0FBUyxnQkFBZ0IsU0FBUyxhQUFhO3dCQUMzQyxJQUFJLFVBQVUsUUFBUSxLQUFLO3dCQUMzQixPQUFPLFFBQVEsUUFBUSxRQUFROzs7b0JBR25DLEdBQUcsZ0RBQWdELFlBQU07d0JBQ3JELElBQUksVUFBVTt3QkFDZCxrQkFBa0IsU0FBUzt3QkFDM0IsZ0JBQWdCLFNBQVM7OztvQkFHN0IsR0FBRyw4REFBOEQsWUFBTTt3QkFDbkU7d0JBQ0EsSUFBSSxVQUFVO3dCQUNkLGtCQUFrQixTQUFTO3dCQUMzQixnQkFBZ0IsU0FBUzs7Ozs7O0dBcUJsQyIsImZpbGUiOiJjb21tb24vcmVtZWRpYXRpb24vRW50aXRsZW1lbnRTb0RSZXZvY2F0aW9uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVtZWRpYXRpb25Nb2R1bGUgZnJvbSAnY29tbW9uL3JlbWVkaWF0aW9uL1JlbWVkaWF0aW9uTW9kdWxlJztcclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCAnLi9SZW1lZGlhdGlvblRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdFbnRpdGxlbWVudFNvRFJldm9jYXRpb25EaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPSBgPHNwLWVudGl0bGVtZW50LXNvZC1yZXZvY2F0aW9uIHBvbGljeS10cmVlPVwicG9saWN5VHJlZVwiIC8+YCxcclxuICAgICAgICBQb2xpY3lUcmVlTm9kZSwgJHNjb3BlLCAkY29tcGlsZSwgJGNvbnRyb2xsZXIsIHJlbWVkaWF0aW9uVGVzdERhdGEsIHBvbGljeVRyZWU7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocmVtZWRpYXRpb25Nb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCBfJGNvbXBpbGVfLCBfJGNvbnRyb2xsZXJfLCBfUG9saWN5VHJlZU5vZGVfLCBfcmVtZWRpYXRpb25UZXN0RGF0YV8pIHtcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgIHJlbWVkaWF0aW9uVGVzdERhdGEgPSBfcmVtZWRpYXRpb25UZXN0RGF0YV87XHJcbiAgICAgICAgUG9saWN5VHJlZU5vZGUgPSBfUG9saWN5VHJlZU5vZGVfO1xyXG5cclxuICAgICAgICBwb2xpY3lUcmVlID0gbmV3IFBvbGljeVRyZWVOb2RlKHJlbWVkaWF0aW9uVGVzdERhdGEuUE9MSUNZX1RSRUVfTk9ERSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFrZVNpbmdsZUNvbHVtbigpIHtcclxuICAgICAgICBwb2xpY3lUcmVlLmNoaWxkcmVuLnB1c2gobmV3IFBvbGljeVRyZWVOb2RlKHJlbWVkaWF0aW9uVGVzdERhdGEuUE9MSUNZX1RSRUVfTk9ERSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdjb250cm9sbGVyJywgKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gJGNvbnRyb2xsZXIoJ0VudGl0bGVtZW50U29EUmV2b2NhdGlvbkRpcmVjdGl2ZUN0cmwnLCBudWxsLCB7XHJcbiAgICAgICAgICAgICAgICBwb2xpY3lUcmVlOiBwb2xpY3lUcmVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjdHJsLiRvbkluaXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGN0cmw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgndGhyb3dzIHdpdGhvdXQgYSBwb2xpY3kgdHJlZScsICgpID0+IHtcclxuICAgICAgICAgICAgIHBvbGljeVRyZWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUNvbnRyb2xsZXIoKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgndXNlcyB0d28gY29sdW1ucyB3aGVuIHRoZXJlIGFyZSB0d28gY2hpbGRyZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1R3b0NvbHVtbnMoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3VzZXMgYSBzaW5nbGUgY29sdW1uIHdoZW4gdGhlcmUgYXJlIG1vcmUgdGhhbiB0d28gY2hpbGRyZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1ha2VTaW5nbGVDb2x1bW4oKTtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzVHdvQ29sdW1ucygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdodG1sJywgKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgJHNjb3BlLnBvbGljeVRyZWUgPSBwb2xpY3lUcmVlO1xyXG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGEgcG9saWN5IHRyZWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvbGljeVRyZWUgPSBudWxsO1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudCgpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrU2luZ2xlQ29sdW1uKGVsZW1lbnQsIG51bUV4cGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5zID0gZWxlbWVudC5maW5kKCcucm93ID4gLmNvbC1zbS0xMicpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhlcmUgd2lsbCBhbHdheXMgYmUgb25lIGZ1bGwgd2lkdGggY29sdW1uIHdpdGggaW5zdHJ1Y3Rpb24gdGV4dCwgc28gc3VidHJhY3QgaXQuXHJcbiAgICAgICAgICAgIGV4cGVjdChjb2x1bW5zLmxlbmd0aCAtIDEpLnRvRXF1YWwobnVtRXhwZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tUd29Db2x1bW5zKGVsZW1lbnQsIG51bUV4cGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5zID0gZWxlbWVudC5maW5kKCcucm93ID4gLmNvbC1zbS02Jyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjb2x1bW5zLmxlbmd0aCkudG9FcXVhbChudW1FeHBlY3RlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgndXNlcyB0d28gY29sdW1ucyB3aGVuIHRoZXJlIGFyZSB0d28gY2hpbGRyZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBjaGVja1NpbmdsZUNvbHVtbihlbGVtZW50LCAwKTtcclxuICAgICAgICAgICAgY2hlY2tUd29Db2x1bW5zKGVsZW1lbnQsIDIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgndXNlcyBhIHNpbmdsZSBjb2x1bW4gd2hlbiB0aGVyZSBhcmUgbW9yZSB0aGFuIHR3byBjaGlsZHJlbicsICgpID0+IHtcclxuICAgICAgICAgICAgbWFrZVNpbmdsZUNvbHVtbigpO1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgY2hlY2tTaW5nbGVDb2x1bW4oZWxlbWVudCwgMSk7XHJcbiAgICAgICAgICAgIGNoZWNrVHdvQ29sdW1ucyhlbGVtZW50LCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
