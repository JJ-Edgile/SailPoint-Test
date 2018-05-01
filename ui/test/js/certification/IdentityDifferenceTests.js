System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/certification/IdentityDifferenceTestData'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsCertificationIdentityDifferenceTestData) {}],
        execute: function () {

            describe('IdentityDifference', function () {

                var IdentityDifference = undefined,
                    diffData = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_IdentityDifference_, identityDifferenceTestData) {
                    IdentityDifference = _IdentityDifference_;
                    diffData = identityDifferenceTestData.DIFFERENCE;
                }));

                function checkDifferences(actualDiffs, expectedDiffs) {
                    expect(actualDiffs.length).toEqual(expectedDiffs.length);

                    for (var i = 0; i < actualDiffs.length; i++) {
                        checkDifference(actualDiffs[i], expectedDiffs[i]);
                    }
                }

                function checkDifference(actual, expected) {
                    expect(actual.addedValues).toEqual(expected.addedValues);
                    expect(actual.removedValues).toEqual(expected.removedValues);
                    expect(actual.application).toEqual(expected.context);
                    expect(actual.attribute).toEqual(expected.attribute);
                    expect(actual.displayName).toEqual(expected.displayName);
                    expect(actual.oldValue).toEqual(expected.oldValue);
                    expect(actual.newValue).toEqual(expected.newValue);
                }

                describe('constructor', function () {
                    it('throws with no data', function () {
                        expect(function () {
                            return new IdentityDifference(null);
                        }).toThrow();
                    });

                    it('handles null properties', function () {
                        expect(function () {
                            return new IdentityDifference({});
                        }).not.toThrow();
                    });

                    it('sets properties correct', function () {
                        var diff = new IdentityDifference(diffData);

                        // Assigned and detected roles have non-array properties.
                        expect(diff.assignedRoleDifferences.length).toEqual(1);
                        expect(diff.detectedRoleDifferences.length).toEqual(1);
                        expect(diff.linkDifferences.length).toEqual(2);
                        expect(diff.permissionDifferences.length).toEqual(2);
                        expect(diff.attributeDifferences.length).toEqual(1);
                        expect(diff.policyViolationDifferences.length).toEqual(1);

                        // Spot check a couple differences.
                        checkDifferences(diff.assignedRoleDifferences, [diffData.assignedRoleDifferences]);
                        checkDifferences(diff.attributeDifferences, diffData.attributeDifferences);

                        // Permission differences get converted - check them out.
                        var permDiff = diff.permissionDifferences[0];
                        var expectedPermDiff = diffData.permissionDifferences[0];
                        expect(permDiff.application).toEqual(expectedPermDiff.application);
                        expect(permDiff.attribute).toEqual(expectedPermDiff.target);
                        expect(permDiff.newValue).toEqual(expectedPermDiff.rights);

                        permDiff = diff.permissionDifferences[1];
                        expectedPermDiff = diffData.permissionDifferences[1];
                        expect(permDiff.application).toEqual(expectedPermDiff.application);
                        expect(permDiff.attribute).toEqual(expectedPermDiff.target);
                        expect(permDiff.oldValue).toEqual(expectedPermDiff.rights);
                    });
                });

                describe('Difference', function () {
                    it('clones correctly', function () {
                        var diffs = new IdentityDifference(diffData);
                        var diff = diffs.assignedRoleDifferences[0];
                        var cloned = diff.clone();
                        checkDifference(cloned, diffData.assignedRoleDifferences);
                    });

                    describe('hasMultipleValues()', function () {
                        it('returns true if there are added or removed values', function () {
                            var diff = new IdentityDifference(diffData);
                            expect(diff.assignedRoleDifferences[0].hasMultipleValues()).toEqual(true);
                            expect(diff.detectedRoleDifferences[0].hasMultipleValues()).toEqual(true);
                        });

                        it('returns false if there are no added or removed values lists', function () {
                            var diff = new IdentityDifference(diffData);
                            expect(diff.attributeDifferences[0].hasMultipleValues()).toEqual(false);
                        });
                    });

                    describe('getDisplayableName()', function () {
                        it('returns the display name if available', function () {
                            var diff = new IdentityDifference(diffData);
                            var displayName = diffData.attributeDifferences[0].displayName;
                            expect(diff.attributeDifferences[0].getDisplayableName()).toEqual(displayName);
                        });

                        it('returns the attribute if there is no display name', function () {
                            var diff = new IdentityDifference(diffData);
                            var attrName = diffData.assignedRoleDifferences.attribute;
                            expect(diff.assignedRoleDifferences[0].getDisplayableName()).toEqual(attrName);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vSWRlbnRpdHlEaWZmZXJlbmNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxxREFBcUQsVUFBVSxTQUFTO0lBQ3JKOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLGdEQUFnRDtRQUM3RCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsc0JBQXNCLFlBQU07O2dCQUVqQyxJQUFJLHFCQUFrQjtvQkFBRSxXQUFROztnQkFFaEMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsc0JBQXNCLDRCQUErQjtvQkFDcEUscUJBQXFCO29CQUNyQixXQUFXLDJCQUEyQjs7O2dCQUcxQyxTQUFTLGlCQUFpQixhQUFhLGVBQWU7b0JBQ2xELE9BQU8sWUFBWSxRQUFRLFFBQVEsY0FBYzs7b0JBRWpELEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxZQUFZLFFBQVEsS0FBSzt3QkFDekMsZ0JBQWdCLFlBQVksSUFBSSxjQUFjOzs7O2dCQUl0RCxTQUFTLGdCQUFnQixRQUFRLFVBQVU7b0JBQ3ZDLE9BQU8sT0FBTyxhQUFhLFFBQVEsU0FBUztvQkFDNUMsT0FBTyxPQUFPLGVBQWUsUUFBUSxTQUFTO29CQUM5QyxPQUFPLE9BQU8sYUFBYSxRQUFRLFNBQVM7b0JBQzVDLE9BQU8sT0FBTyxXQUFXLFFBQVEsU0FBUztvQkFDMUMsT0FBTyxPQUFPLGFBQWEsUUFBUSxTQUFTO29CQUM1QyxPQUFPLE9BQU8sVUFBVSxRQUFRLFNBQVM7b0JBQ3pDLE9BQU8sT0FBTyxVQUFVLFFBQVEsU0FBUzs7O2dCQUc3QyxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyx1QkFBdUIsWUFBTTt3QkFDNUIsT0FBTyxZQUFBOzRCQVFTLE9BUkgsSUFBSSxtQkFBbUI7MkJBQU87OztvQkFHL0MsR0FBRywyQkFBMkIsWUFBTTt3QkFDaEMsT0FBTyxZQUFBOzRCQVVTLE9BVkgsSUFBSSxtQkFBbUI7MkJBQUssSUFBSTs7O29CQUdqRCxHQUFHLDJCQUEyQixZQUFNO3dCQUNoQyxJQUFJLE9BQU8sSUFBSSxtQkFBbUI7Ozt3QkFHbEMsT0FBTyxLQUFLLHdCQUF3QixRQUFRLFFBQVE7d0JBQ3BELE9BQU8sS0FBSyx3QkFBd0IsUUFBUSxRQUFRO3dCQUNwRCxPQUFPLEtBQUssZ0JBQWdCLFFBQVEsUUFBUTt3QkFDNUMsT0FBTyxLQUFLLHNCQUFzQixRQUFRLFFBQVE7d0JBQ2xELE9BQU8sS0FBSyxxQkFBcUIsUUFBUSxRQUFRO3dCQUNqRCxPQUFPLEtBQUssMkJBQTJCLFFBQVEsUUFBUTs7O3dCQUd2RCxpQkFBaUIsS0FBSyx5QkFBeUIsQ0FBRSxTQUFTO3dCQUMxRCxpQkFBaUIsS0FBSyxzQkFBc0IsU0FBUzs7O3dCQUdyRCxJQUFJLFdBQVcsS0FBSyxzQkFBc0I7d0JBQzFDLElBQUksbUJBQW1CLFNBQVMsc0JBQXNCO3dCQUN0RCxPQUFPLFNBQVMsYUFBYSxRQUFRLGlCQUFpQjt3QkFDdEQsT0FBTyxTQUFTLFdBQVcsUUFBUSxpQkFBaUI7d0JBQ3BELE9BQU8sU0FBUyxVQUFVLFFBQVEsaUJBQWlCOzt3QkFFbkQsV0FBVyxLQUFLLHNCQUFzQjt3QkFDdEMsbUJBQW1CLFNBQVMsc0JBQXNCO3dCQUNsRCxPQUFPLFNBQVMsYUFBYSxRQUFRLGlCQUFpQjt3QkFDdEQsT0FBTyxTQUFTLFdBQVcsUUFBUSxpQkFBaUI7d0JBQ3BELE9BQU8sU0FBUyxVQUFVLFFBQVEsaUJBQWlCOzs7O2dCQUkzRCxTQUFTLGNBQWMsWUFBTTtvQkFDekIsR0FBRyxvQkFBb0IsWUFBTTt3QkFDekIsSUFBSSxRQUFRLElBQUksbUJBQW1CO3dCQUNuQyxJQUFJLE9BQU8sTUFBTSx3QkFBd0I7d0JBQ3pDLElBQUksU0FBUyxLQUFLO3dCQUNsQixnQkFBZ0IsUUFBUSxTQUFTOzs7b0JBR3JDLFNBQVMsdUJBQXVCLFlBQU07d0JBQ2xDLEdBQUcscURBQXFELFlBQU07NEJBQzFELElBQUksT0FBTyxJQUFJLG1CQUFtQjs0QkFDbEMsT0FBTyxLQUFLLHdCQUF3QixHQUFHLHFCQUFxQixRQUFROzRCQUNwRSxPQUFPLEtBQUssd0JBQXdCLEdBQUcscUJBQXFCLFFBQVE7Ozt3QkFHeEUsR0FBRywrREFBK0QsWUFBTTs0QkFDcEUsSUFBSSxPQUFPLElBQUksbUJBQW1COzRCQUNsQyxPQUFPLEtBQUsscUJBQXFCLEdBQUcscUJBQXFCLFFBQVE7Ozs7b0JBSXpFLFNBQVMsd0JBQXdCLFlBQU07d0JBQ25DLEdBQUcseUNBQXlDLFlBQU07NEJBQzlDLElBQUksT0FBTyxJQUFJLG1CQUFtQjs0QkFDbEMsSUFBSSxjQUFjLFNBQVMscUJBQXFCLEdBQUc7NEJBQ25ELE9BQU8sS0FBSyxxQkFBcUIsR0FBRyxzQkFBc0IsUUFBUTs7O3dCQUd0RSxHQUFHLHFEQUFxRCxZQUFNOzRCQUMxRCxJQUFJLE9BQU8sSUFBSSxtQkFBbUI7NEJBQ2xDLElBQUksV0FBVyxTQUFTLHdCQUF3Qjs0QkFDaEQsT0FBTyxLQUFLLHdCQUF3QixHQUFHLHNCQUFzQixRQUFROzs7Ozs7O0dBa0JsRiIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0lkZW50aXR5RGlmZmVyZW5jZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9jZXJ0aWZpY2F0aW9uL0lkZW50aXR5RGlmZmVyZW5jZVRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdJZGVudGl0eURpZmZlcmVuY2UnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IElkZW50aXR5RGlmZmVyZW5jZSwgZGlmZkRhdGE7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfSWRlbnRpdHlEaWZmZXJlbmNlXywgaWRlbnRpdHlEaWZmZXJlbmNlVGVzdERhdGEpID0+IHtcclxuICAgICAgICBJZGVudGl0eURpZmZlcmVuY2UgPSBfSWRlbnRpdHlEaWZmZXJlbmNlXztcclxuICAgICAgICBkaWZmRGF0YSA9IGlkZW50aXR5RGlmZmVyZW5jZVRlc3REYXRhLkRJRkZFUkVOQ0U7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tEaWZmZXJlbmNlcyhhY3R1YWxEaWZmcywgZXhwZWN0ZWREaWZmcykge1xyXG4gICAgICAgIGV4cGVjdChhY3R1YWxEaWZmcy5sZW5ndGgpLnRvRXF1YWwoZXhwZWN0ZWREaWZmcy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdHVhbERpZmZzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNoZWNrRGlmZmVyZW5jZShhY3R1YWxEaWZmc1tpXSwgZXhwZWN0ZWREaWZmc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrRGlmZmVyZW5jZShhY3R1YWwsIGV4cGVjdGVkKSB7XHJcbiAgICAgICAgZXhwZWN0KGFjdHVhbC5hZGRlZFZhbHVlcykudG9FcXVhbChleHBlY3RlZC5hZGRlZFZhbHVlcyk7XHJcbiAgICAgICAgZXhwZWN0KGFjdHVhbC5yZW1vdmVkVmFsdWVzKS50b0VxdWFsKGV4cGVjdGVkLnJlbW92ZWRWYWx1ZXMpO1xyXG4gICAgICAgIGV4cGVjdChhY3R1YWwuYXBwbGljYXRpb24pLnRvRXF1YWwoZXhwZWN0ZWQuY29udGV4dCk7XHJcbiAgICAgICAgZXhwZWN0KGFjdHVhbC5hdHRyaWJ1dGUpLnRvRXF1YWwoZXhwZWN0ZWQuYXR0cmlidXRlKTtcclxuICAgICAgICBleHBlY3QoYWN0dWFsLmRpc3BsYXlOYW1lKS50b0VxdWFsKGV4cGVjdGVkLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICBleHBlY3QoYWN0dWFsLm9sZFZhbHVlKS50b0VxdWFsKGV4cGVjdGVkLm9sZFZhbHVlKTtcclxuICAgICAgICBleHBlY3QoYWN0dWFsLm5ld1ZhbHVlKS50b0VxdWFsKGV4cGVjdGVkLm5ld1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGRhdGEnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgSWRlbnRpdHlEaWZmZXJlbmNlKG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdoYW5kbGVzIG51bGwgcHJvcGVydGllcycsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IG5ldyBJZGVudGl0eURpZmZlcmVuY2Uoe30pKS5ub3QudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyBwcm9wZXJ0aWVzIGNvcnJlY3QnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkaWZmID0gbmV3IElkZW50aXR5RGlmZmVyZW5jZShkaWZmRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBc3NpZ25lZCBhbmQgZGV0ZWN0ZWQgcm9sZXMgaGF2ZSBub24tYXJyYXkgcHJvcGVydGllcy5cclxuICAgICAgICAgICAgZXhwZWN0KGRpZmYuYXNzaWduZWRSb2xlRGlmZmVyZW5jZXMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGlmZi5kZXRlY3RlZFJvbGVEaWZmZXJlbmNlcy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkaWZmLmxpbmtEaWZmZXJlbmNlcy5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgIGV4cGVjdChkaWZmLnBlcm1pc3Npb25EaWZmZXJlbmNlcy5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgIGV4cGVjdChkaWZmLmF0dHJpYnV0ZURpZmZlcmVuY2VzLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRpZmYucG9saWN5VmlvbGF0aW9uRGlmZmVyZW5jZXMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG5cclxuICAgICAgICAgICAgLy8gU3BvdCBjaGVjayBhIGNvdXBsZSBkaWZmZXJlbmNlcy5cclxuICAgICAgICAgICAgY2hlY2tEaWZmZXJlbmNlcyhkaWZmLmFzc2lnbmVkUm9sZURpZmZlcmVuY2VzLCBbIGRpZmZEYXRhLmFzc2lnbmVkUm9sZURpZmZlcmVuY2VzIF0pO1xyXG4gICAgICAgICAgICBjaGVja0RpZmZlcmVuY2VzKGRpZmYuYXR0cmlidXRlRGlmZmVyZW5jZXMsIGRpZmZEYXRhLmF0dHJpYnV0ZURpZmZlcmVuY2VzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBlcm1pc3Npb24gZGlmZmVyZW5jZXMgZ2V0IGNvbnZlcnRlZCAtIGNoZWNrIHRoZW0gb3V0LlxyXG4gICAgICAgICAgICBsZXQgcGVybURpZmYgPSBkaWZmLnBlcm1pc3Npb25EaWZmZXJlbmNlc1swXTtcclxuICAgICAgICAgICAgbGV0IGV4cGVjdGVkUGVybURpZmYgPSBkaWZmRGF0YS5wZXJtaXNzaW9uRGlmZmVyZW5jZXNbMF07XHJcbiAgICAgICAgICAgIGV4cGVjdChwZXJtRGlmZi5hcHBsaWNhdGlvbikudG9FcXVhbChleHBlY3RlZFBlcm1EaWZmLmFwcGxpY2F0aW9uKTtcclxuICAgICAgICAgICAgZXhwZWN0KHBlcm1EaWZmLmF0dHJpYnV0ZSkudG9FcXVhbChleHBlY3RlZFBlcm1EaWZmLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwZXJtRGlmZi5uZXdWYWx1ZSkudG9FcXVhbChleHBlY3RlZFBlcm1EaWZmLnJpZ2h0cyk7XHJcblxyXG4gICAgICAgICAgICBwZXJtRGlmZiA9IGRpZmYucGVybWlzc2lvbkRpZmZlcmVuY2VzWzFdO1xyXG4gICAgICAgICAgICBleHBlY3RlZFBlcm1EaWZmID0gZGlmZkRhdGEucGVybWlzc2lvbkRpZmZlcmVuY2VzWzFdO1xyXG4gICAgICAgICAgICBleHBlY3QocGVybURpZmYuYXBwbGljYXRpb24pLnRvRXF1YWwoZXhwZWN0ZWRQZXJtRGlmZi5hcHBsaWNhdGlvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdChwZXJtRGlmZi5hdHRyaWJ1dGUpLnRvRXF1YWwoZXhwZWN0ZWRQZXJtRGlmZi50YXJnZXQpO1xyXG4gICAgICAgICAgICBleHBlY3QocGVybURpZmYub2xkVmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWRQZXJtRGlmZi5yaWdodHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ0RpZmZlcmVuY2UnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2Nsb25lcyBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkaWZmcyA9IG5ldyBJZGVudGl0eURpZmZlcmVuY2UoZGlmZkRhdGEpO1xyXG4gICAgICAgICAgICBsZXQgZGlmZiA9IGRpZmZzLmFzc2lnbmVkUm9sZURpZmZlcmVuY2VzWzBdO1xyXG4gICAgICAgICAgICBsZXQgY2xvbmVkID0gZGlmZi5jbG9uZSgpO1xyXG4gICAgICAgICAgICBjaGVja0RpZmZlcmVuY2UoY2xvbmVkLCBkaWZmRGF0YS5hc3NpZ25lZFJvbGVEaWZmZXJlbmNlcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdoYXNNdWx0aXBsZVZhbHVlcygpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBhZGRlZCBvciByZW1vdmVkIHZhbHVlcycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBkaWZmID0gbmV3IElkZW50aXR5RGlmZmVyZW5jZShkaWZmRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZGlmZi5hc3NpZ25lZFJvbGVEaWZmZXJlbmNlc1swXS5oYXNNdWx0aXBsZVZhbHVlcygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGRpZmYuZGV0ZWN0ZWRSb2xlRGlmZmVyZW5jZXNbMF0uaGFzTXVsdGlwbGVWYWx1ZXMoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBhcmUgbm8gYWRkZWQgb3IgcmVtb3ZlZCB2YWx1ZXMgbGlzdHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlmZiA9IG5ldyBJZGVudGl0eURpZmZlcmVuY2UoZGlmZkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGRpZmYuYXR0cmlidXRlRGlmZmVyZW5jZXNbMF0uaGFzTXVsdGlwbGVWYWx1ZXMoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnZ2V0RGlzcGxheWFibGVOYW1lKCknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRoZSBkaXNwbGF5IG5hbWUgaWYgYXZhaWxhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZmYgPSBuZXcgSWRlbnRpdHlEaWZmZXJlbmNlKGRpZmZEYXRhKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaXNwbGF5TmFtZSA9IGRpZmZEYXRhLmF0dHJpYnV0ZURpZmZlcmVuY2VzWzBdLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGRpZmYuYXR0cmlidXRlRGlmZmVyZW5jZXNbMF0uZ2V0RGlzcGxheWFibGVOYW1lKCkpLnRvRXF1YWwoZGlzcGxheU5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRoZSBhdHRyaWJ1dGUgaWYgdGhlcmUgaXMgbm8gZGlzcGxheSBuYW1lJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpZmYgPSBuZXcgSWRlbnRpdHlEaWZmZXJlbmNlKGRpZmZEYXRhKTtcclxuICAgICAgICAgICAgICAgIGxldCBhdHRyTmFtZSA9IGRpZmZEYXRhLmFzc2lnbmVkUm9sZURpZmZlcmVuY2VzLmF0dHJpYnV0ZTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChkaWZmLmFzc2lnbmVkUm9sZURpZmZlcmVuY2VzWzBdLmdldERpc3BsYXlhYmxlTmFtZSgpKS50b0VxdWFsKGF0dHJOYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
