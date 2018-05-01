System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule', '../PolicyTestData'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }, function (_PolicyTestData) {}],
        execute: function () {

            describe('PolicyViolationAction', function () {
                var PolicyViolationAction = undefined,
                    policyTestData = undefined;

                beforeEach(module(policyViolationModule));

                beforeEach(inject(function (_PolicyViolationAction_, _policyTestData_) {
                    PolicyViolationAction = _PolicyViolationAction_;
                    policyTestData = _policyTestData_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = policyTestData.POLICY_VIOLATION_DATA_1.allowedActions[0],
                            test = new PolicyViolationAction(data);

                        expect(test.status).toEqual(data.status);
                        expect(test.name).toEqual(data.name);
                        expect(test.promptKey).toEqual(data.promptKey);
                        expect(test.messageKey).toEqual(data.messageKey);
                    });

                    it('should throw with no config data', function () {
                        expect(function () {
                            new PolicyViolationAction();
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lWaW9sYXRpb25BY3Rpb25UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUNBQXlDLHNCQUFzQixVQUFVLFNBQVM7Ozs7O0lBSzFIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQztXQUMvRCxVQUFVLGlCQUFpQjtRQUM5QixTQUFTLFlBQVk7O1lBSjdCLFNBQVMseUJBQXlCLFlBQVc7Z0JBQ3pDLElBQUksd0JBQXFCO29CQUFFLGlCQUFjOztnQkFFekMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMseUJBQXlCLGtCQUFrQjtvQkFDbEUsd0JBQXdCO29CQUN4QixpQkFBaUI7OztnQkFHckIsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELElBQUksT0FBTyxlQUFlLHdCQUF3QixlQUFlOzRCQUM3RCxPQUFPLElBQUksc0JBQXNCOzt3QkFFckMsT0FBTyxLQUFLLFFBQVEsUUFBUSxLQUFLO3dCQUNqQyxPQUFPLEtBQUssTUFBTSxRQUFRLEtBQUs7d0JBQy9CLE9BQU8sS0FBSyxXQUFXLFFBQVEsS0FBSzt3QkFDcEMsT0FBTyxLQUFLLFlBQVksUUFBUSxLQUFLOzs7b0JBR3pDLEdBQUcsb0NBQW9DLFlBQVc7d0JBQzlDLE9BQU8sWUFBTTs0QkFBRSxJQUFJOzJCQUE0Qjs7Ozs7O0dBZXhEIiwiZmlsZSI6InBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lWaW9sYXRpb25BY3Rpb25UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcG9saWN5VmlvbGF0aW9uTW9kdWxlIGZyb20gJ3BvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICcuLi9Qb2xpY3lUZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdQb2xpY3lWaW9sYXRpb25BY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgUG9saWN5VmlvbGF0aW9uQWN0aW9uLCBwb2xpY3lUZXN0RGF0YTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBvbGljeVZpb2xhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1BvbGljeVZpb2xhdGlvbkFjdGlvbl8sIF9wb2xpY3lUZXN0RGF0YV8pIHtcbiAgICAgICAgUG9saWN5VmlvbGF0aW9uQWN0aW9uID0gX1BvbGljeVZpb2xhdGlvbkFjdGlvbl87XG4gICAgICAgIHBvbGljeVRlc3REYXRhID0gX3BvbGljeVRlc3REYXRhXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnaW5pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCBwcm92aWRlZCBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHBvbGljeVRlc3REYXRhLlBPTElDWV9WSU9MQVRJT05fREFUQV8xLmFsbG93ZWRBY3Rpb25zWzBdLFxuICAgICAgICAgICAgICAgIHRlc3QgPSBuZXcgUG9saWN5VmlvbGF0aW9uQWN0aW9uKGRhdGEpO1xuXG4gICAgICAgICAgICBleHBlY3QodGVzdC5zdGF0dXMpLnRvRXF1YWwoZGF0YS5zdGF0dXMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QubmFtZSkudG9FcXVhbChkYXRhLm5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QucHJvbXB0S2V5KS50b0VxdWFsKGRhdGEucHJvbXB0S2V5KTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0Lm1lc3NhZ2VLZXkpLnRvRXF1YWwoZGF0YS5tZXNzYWdlS2V5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIGNvbmZpZyBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBuZXcgUG9saWN5VmlvbGF0aW9uQWN0aW9uKCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
