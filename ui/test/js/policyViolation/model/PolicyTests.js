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

            describe('Policy', function () {
                var Policy = undefined,
                    policyTestData = undefined;

                beforeEach(module(policyViolationModule));

                beforeEach(inject(function (_Policy_, _policyTestData_) {
                    Policy = _Policy_;
                    policyTestData = _policyTestData_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = policyTestData.POLICY_DATA_1,
                            test = new Policy(data);
                        expect(test.id).toEqual(data.id);
                        expect(test.name).toEqual(data.name);
                        expect(test.description).toEqual(data.description);
                        expect(test.ruleDescription).toEqual(data.ruleDescription);
                        expect(test.type).toEqual(data.type);
                    });

                    it('should throw if no data is provided', function () {
                        expect(function () {
                            new Policy();
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUNBQXlDLHNCQUFzQixVQUFVLFNBQVM7Ozs7O0lBSzFIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQztXQUMvRCxVQUFVLGlCQUFpQjtRQUM5QixTQUFTLFlBQVk7O1lBSjdCLFNBQVMsVUFBVSxZQUFXO2dCQUMxQixJQUFJLFNBQU07b0JBQUUsaUJBQWM7O2dCQUUxQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVLGtCQUFrQjtvQkFDbkQsU0FBUztvQkFDVCxpQkFBaUI7OztnQkFHckIsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELElBQUksT0FBTyxlQUFlOzRCQUN0QixPQUFPLElBQUksT0FBTzt3QkFDdEIsT0FBTyxLQUFLLElBQUksUUFBUSxLQUFLO3dCQUM3QixPQUFPLEtBQUssTUFBTSxRQUFRLEtBQUs7d0JBQy9CLE9BQU8sS0FBSyxhQUFhLFFBQVEsS0FBSzt3QkFDdEMsT0FBTyxLQUFLLGlCQUFpQixRQUFRLEtBQUs7d0JBQzFDLE9BQU8sS0FBSyxNQUFNLFFBQVEsS0FBSzs7O29CQUduQyxHQUFHLHVDQUF1QyxZQUFXO3dCQUNqRCxPQUFPLFlBQU07NEJBQUUsSUFBSTsyQkFBYTs7Ozs7O0dBZXpDIiwiZmlsZSI6InBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcG9saWN5VmlvbGF0aW9uTW9kdWxlIGZyb20gJ3BvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICcuLi9Qb2xpY3lUZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdQb2xpY3knLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgUG9saWN5LCBwb2xpY3lUZXN0RGF0YTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBvbGljeVZpb2xhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1BvbGljeV8sIF9wb2xpY3lUZXN0RGF0YV8pIHtcbiAgICAgICAgUG9saWN5ID0gX1BvbGljeV87XG4gICAgICAgIHBvbGljeVRlc3REYXRhID0gX3BvbGljeVRlc3REYXRhXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnaW5pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCBwcm92aWRlZCBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHBvbGljeVRlc3REYXRhLlBPTElDWV9EQVRBXzEsXG4gICAgICAgICAgICAgICAgdGVzdCA9IG5ldyBQb2xpY3koZGF0YSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5pZCkudG9FcXVhbChkYXRhLmlkKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0Lm5hbWUpLnRvRXF1YWwoZGF0YS5uYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmRlc2NyaXB0aW9uKS50b0VxdWFsKGRhdGEuZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QucnVsZURlc2NyaXB0aW9uKS50b0VxdWFsKGRhdGEucnVsZURlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnR5cGUpLnRvRXF1YWwoZGF0YS50eXBlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBubyBkYXRhIGlzIHByb3ZpZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBuZXcgUG9saWN5KCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
