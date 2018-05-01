System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/certification/IdentityDifferenceTestData'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsCertificationIdentityDifferenceTestData) {}],
        execute: function () {

            describe('CertificationDifferenceDirective', function () {

                var eltDef = '<sp-certification-differences sp-differences="diffs"></sp-certification-differences>',
                    multiValues = ['one banana', 'two banana'],
                    element = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    diffs = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_$compile_, $rootScope, IdentityDifference, identityDifferenceTestData) {
                    $compile = _$compile_;

                    $scope = $rootScope.$new();
                    diffs = new IdentityDifference(identityDifferenceTestData.DIFFERENCE);
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile() {
                    element = angular.element(eltDef);

                    $scope.diffs = diffs;

                    $compile(element)($scope);
                    $scope.$digest();
                }

                function countTables() {
                    return element.find('table').length;
                }

                it('renders five tables for full diffs', function () {
                    compile();
                    expect(countTables()).toEqual(5);
                });

                it('hides a table if there are no differences of that category', function () {
                    diffs.attributeDifferences = null;
                    compile();
                    expect(countTables()).toEqual(4);
                    var table = element.find('table p.h4:contains(\'ui_identity_attr_diffs_title\')');
                    expect(table.length).toEqual(0);
                });

                function getTable(idx) {
                    return angular.element(element.find('table')[idx]);
                }

                function getValues(tableIdx, colIdx) {
                    var values = [];
                    var table = getTable(tableIdx);
                    var rows = table.find('tbody tr');
                    for (var i = 0; i < rows.length; i++) {
                        var row = angular.element(rows[i]);
                        var col = row.find('td')[colIdx];
                        values.push(angular.element(col).text());
                    }
                    return values;
                }

                it('puts assigned and detected roles in a single table', function () {
                    compile();
                    // Second table ... first column is the role name.
                    var attrNames = getValues(1, 0);
                    expect(attrNames.length).toEqual(2);
                    expect(attrNames[0]).toEqual('Hype guy');
                    expect(attrNames[1]).toEqual('Front man');
                });

                function setupMultiValuedAttr(isAdd) {
                    var attrDiff = diffs.attributeDifferences[0];
                    var singleAttrName = isAdd ? 'newValue' : 'oldValue';
                    var multiAttrName = isAdd ? 'addedValues' : 'removedValues';

                    attrDiff[singleAttrName] = null;
                    attrDiff[multiAttrName] = multiValues;
                }

                function testMultiValuedValueColumn(isAdd) {
                    // Make our attribute request a multi-valued request.
                    setupMultiValuedAttr(isAdd);

                    compile();
                    // Attributes is the first table - should have both values.
                    var values = getValues(0, 1);
                    expect(values.length).toEqual(2);
                    expect(values).toEqual(multiValues);
                }

                it('splits multi-valued adds into multiple rows', function () {
                    testMultiValuedValueColumn(true);
                });

                it('splits multi-valued removes into multiple rows', function () {
                    testMultiValuedValueColumn(false);
                });

                function testSingleValueChangeType(attrToNull, expectedValue) {
                    if (attrToNull) {
                        diffs.policyViolationDifferences[0][attrToNull] = null;
                    }
                    compile();
                    var changeTypes = getValues(2, 1);
                    expect(changeTypes).toEqual([expectedValue]);
                }

                it('renders the correct change type for a single-valued attribute add', function () {
                    testSingleValueChangeType('oldValue', 'ui_difference_added');
                });

                it('renders the correct change type for a single-valued attribute remove', function () {
                    testSingleValueChangeType('newValue', 'ui_difference_removed');
                });

                it('renders the correct change type for a single-valued attribute modify', function () {
                    testSingleValueChangeType(null, 'ui_difference_modified');
                });

                it('renders the correct change type for a multi-valued attribute add', function () {
                    // The second role is added.
                    compile();
                    var changeTypes = getValues(1, 1);
                    expect(changeTypes[1]).toEqual('ui_difference_added');
                });

                it('renders the correct change type for a multi-valued attribute remove', function () {
                    // The first role is removed.
                    compile();
                    var changeTypes = getValues(1, 1);
                    expect(changeTypes[0]).toEqual('ui_difference_removed');
                });

                it('re-renders if the differences change', function () {
                    // Render the directive.
                    compile();
                    expect(countTables()).toEqual(5);

                    // Change the differences.
                    diffs.attributeDifferences = null;

                    // Cycle ... and make sure that the table is removed.
                    $scope.$digest();
                    expect(countTables()).toEqual(4);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkRpZmZlcmVuY2VzRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxxREFBcUQsVUFBVSxTQUFTO0lBQ3JKOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLGdEQUFnRDtRQUM3RCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsb0NBQW9DLFlBQU07O2dCQUUvQyxJQUFJLFNBQVM7b0JBQ1QsY0FBYyxDQUFFLGNBQWM7b0JBQzlCLFVBQU87b0JBQUUsV0FBUTtvQkFBRSxTQUFNO29CQUFFLFFBQUs7O2dCQUVwQyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxZQUFZLFlBQVksb0JBQW9CLDRCQUErQjtvQkFDMUYsV0FBVzs7b0JBRVgsU0FBUyxXQUFXO29CQUNwQixRQUFRLElBQUksbUJBQW1CLDJCQUEyQjs7O2dCQUc5RCxVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVE7Ozs7Z0JBSWhCLFNBQVMsVUFBVTtvQkFDZixVQUFVLFFBQVEsUUFBUTs7b0JBRTFCLE9BQU8sUUFBUTs7b0JBRWYsU0FBUyxTQUFTO29CQUNsQixPQUFPOzs7Z0JBR1gsU0FBUyxjQUFjO29CQUNuQixPQUFPLFFBQVEsS0FBSyxTQUFTOzs7Z0JBR2pDLEdBQUcsc0NBQXNDLFlBQU07b0JBQzNDO29CQUNBLE9BQU8sZUFBZSxRQUFROzs7Z0JBR2xDLEdBQUcsOERBQThELFlBQU07b0JBQ25FLE1BQU0sdUJBQXVCO29CQUM3QjtvQkFDQSxPQUFPLGVBQWUsUUFBUTtvQkFDOUIsSUFBSSxRQUFRLFFBQVEsS0FBSTtvQkFDeEIsT0FBTyxNQUFNLFFBQVEsUUFBUTs7O2dCQUdqQyxTQUFTLFNBQVMsS0FBSztvQkFDbkIsT0FBTyxRQUFRLFFBQVEsUUFBUSxLQUFLLFNBQVM7OztnQkFHakQsU0FBUyxVQUFVLFVBQVUsUUFBUTtvQkFDakMsSUFBSSxTQUFTO29CQUNiLElBQUksUUFBUSxTQUFTO29CQUNyQixJQUFJLE9BQU8sTUFBTSxLQUFLO29CQUN0QixLQUFLLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLEtBQUs7d0JBQ2xDLElBQUksTUFBTSxRQUFRLFFBQVEsS0FBSzt3QkFDL0IsSUFBSSxNQUFNLElBQUksS0FBSyxNQUFNO3dCQUN6QixPQUFPLEtBQUssUUFBUSxRQUFRLEtBQUs7O29CQUVyQyxPQUFPOzs7Z0JBR1gsR0FBRyxzREFBc0QsWUFBTTtvQkFDM0Q7O29CQUVBLElBQUksWUFBWSxVQUFVLEdBQUc7b0JBQzdCLE9BQU8sVUFBVSxRQUFRLFFBQVE7b0JBQ2pDLE9BQU8sVUFBVSxJQUFJLFFBQVE7b0JBQzdCLE9BQU8sVUFBVSxJQUFJLFFBQVE7OztnQkFHakMsU0FBUyxxQkFBcUIsT0FBTztvQkFDakMsSUFBSSxXQUFXLE1BQU0scUJBQXFCO29CQUMxQyxJQUFJLGlCQUFpQixRQUFVLGFBQWE7b0JBQzVDLElBQUksZ0JBQWdCLFFBQVUsZ0JBQWdCOztvQkFFOUMsU0FBUyxrQkFBa0I7b0JBQzNCLFNBQVMsaUJBQWlCOzs7Z0JBRzlCLFNBQVMsMkJBQTJCLE9BQU87O29CQUV2QyxxQkFBcUI7O29CQUVyQjs7b0JBRUEsSUFBSSxTQUFTLFVBQVUsR0FBRztvQkFDMUIsT0FBTyxPQUFPLFFBQVEsUUFBUTtvQkFDOUIsT0FBTyxRQUFRLFFBQVE7OztnQkFHM0IsR0FBRywrQ0FBK0MsWUFBTTtvQkFDcEQsMkJBQTJCOzs7Z0JBRy9CLEdBQUcsa0RBQWtELFlBQU07b0JBQ3ZELDJCQUEyQjs7O2dCQUcvQixTQUFTLDBCQUEwQixZQUFZLGVBQWU7b0JBQzFELElBQUksWUFBWTt3QkFDWixNQUFNLDJCQUEyQixHQUFHLGNBQWM7O29CQUV0RDtvQkFDQSxJQUFJLGNBQWMsVUFBVSxHQUFHO29CQUMvQixPQUFPLGFBQWEsUUFBUSxDQUFFOzs7Z0JBR2xDLEdBQUcscUVBQXFFLFlBQU07b0JBQzFFLDBCQUEwQixZQUFZOzs7Z0JBRzFDLEdBQUcsd0VBQXdFLFlBQU07b0JBQzdFLDBCQUEwQixZQUFZOzs7Z0JBRzFDLEdBQUcsd0VBQXdFLFlBQU07b0JBQzdFLDBCQUEwQixNQUFNOzs7Z0JBR3BDLEdBQUcsb0VBQW9FLFlBQU07O29CQUV6RTtvQkFDQSxJQUFJLGNBQWMsVUFBVSxHQUFHO29CQUMvQixPQUFPLFlBQVksSUFBSSxRQUFROzs7Z0JBR25DLEdBQUcsdUVBQXVFLFlBQU07O29CQUU1RTtvQkFDQSxJQUFJLGNBQWMsVUFBVSxHQUFHO29CQUMvQixPQUFPLFlBQVksSUFBSSxRQUFROzs7Z0JBR25DLEdBQUcsd0NBQXdDLFlBQU07O29CQUU3QztvQkFDQSxPQUFPLGVBQWUsUUFBUTs7O29CQUc5QixNQUFNLHVCQUF1Qjs7O29CQUc3QixPQUFPO29CQUNQLE9BQU8sZUFBZSxRQUFROzs7OztHQWNuQyIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25EaWZmZXJlbmNlc0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9jZXJ0aWZpY2F0aW9uL0lkZW50aXR5RGlmZmVyZW5jZVRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uRGlmZmVyZW5jZURpcmVjdGl2ZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgZWx0RGVmID0gJzxzcC1jZXJ0aWZpY2F0aW9uLWRpZmZlcmVuY2VzIHNwLWRpZmZlcmVuY2VzPVwiZGlmZnNcIj48L3NwLWNlcnRpZmljYXRpb24tZGlmZmVyZW5jZXM+JyxcclxuICAgICAgICBtdWx0aVZhbHVlcyA9IFsgJ29uZSBiYW5hbmEnLCAndHdvIGJhbmFuYScgXSxcclxuICAgICAgICBlbGVtZW50LCAkY29tcGlsZSwgJHNjb3BlLCBkaWZmcztcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sICRyb290U2NvcGUsIElkZW50aXR5RGlmZmVyZW5jZSwgaWRlbnRpdHlEaWZmZXJlbmNlVGVzdERhdGEpID0+IHtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcblxyXG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG4gICAgICAgIGRpZmZzID0gbmV3IElkZW50aXR5RGlmZmVyZW5jZShpZGVudGl0eURpZmZlcmVuY2VUZXN0RGF0YS5ESUZGRVJFTkNFKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcGlsZSgpIHtcclxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsdERlZik7XHJcblxyXG4gICAgICAgICRzY29wZS5kaWZmcyA9IGRpZmZzO1xyXG5cclxuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY291bnRUYWJsZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZmluZCgndGFibGUnKS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ3JlbmRlcnMgZml2ZSB0YWJsZXMgZm9yIGZ1bGwgZGlmZnMnLCAoKSA9PiB7XHJcbiAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgIGV4cGVjdChjb3VudFRhYmxlcygpKS50b0VxdWFsKDUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2hpZGVzIGEgdGFibGUgaWYgdGhlcmUgYXJlIG5vIGRpZmZlcmVuY2VzIG9mIHRoYXQgY2F0ZWdvcnknLCAoKSA9PiB7XHJcbiAgICAgICAgZGlmZnMuYXR0cmlidXRlRGlmZmVyZW5jZXMgPSBudWxsO1xyXG4gICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICBleHBlY3QoY291bnRUYWJsZXMoKSkudG9FcXVhbCg0KTtcclxuICAgICAgICBsZXQgdGFibGUgPSBlbGVtZW50LmZpbmQoYHRhYmxlIHAuaDQ6Y29udGFpbnMoJ3VpX2lkZW50aXR5X2F0dHJfZGlmZnNfdGl0bGUnKWApO1xyXG4gICAgICAgIGV4cGVjdCh0YWJsZS5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRUYWJsZShpZHgpIHtcclxuICAgICAgICByZXR1cm4gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQuZmluZCgndGFibGUnKVtpZHhdKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRWYWx1ZXModGFibGVJZHgsIGNvbElkeCkge1xyXG4gICAgICAgIGxldCB2YWx1ZXMgPSBbXTtcclxuICAgICAgICBsZXQgdGFibGUgPSBnZXRUYWJsZSh0YWJsZUlkeCk7XHJcbiAgICAgICAgbGV0IHJvd3MgPSB0YWJsZS5maW5kKCd0Ym9keSB0cicpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gYW5ndWxhci5lbGVtZW50KHJvd3NbaV0pO1xyXG4gICAgICAgICAgICBsZXQgY29sID0gcm93LmZpbmQoJ3RkJylbY29sSWR4XTtcclxuICAgICAgICAgICAgdmFsdWVzLnB1c2goYW5ndWxhci5lbGVtZW50KGNvbCkudGV4dCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgIH1cclxuXHJcbiAgICBpdCgncHV0cyBhc3NpZ25lZCBhbmQgZGV0ZWN0ZWQgcm9sZXMgaW4gYSBzaW5nbGUgdGFibGUnLCAoKSA9PiB7XHJcbiAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgIC8vIFNlY29uZCB0YWJsZSAuLi4gZmlyc3QgY29sdW1uIGlzIHRoZSByb2xlIG5hbWUuXHJcbiAgICAgICAgbGV0IGF0dHJOYW1lcyA9IGdldFZhbHVlcygxLCAwKTtcclxuICAgICAgICBleHBlY3QoYXR0ck5hbWVzLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICBleHBlY3QoYXR0ck5hbWVzWzBdKS50b0VxdWFsKCdIeXBlIGd1eScpO1xyXG4gICAgICAgIGV4cGVjdChhdHRyTmFtZXNbMV0pLnRvRXF1YWwoJ0Zyb250IG1hbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXBNdWx0aVZhbHVlZEF0dHIoaXNBZGQpIHtcclxuICAgICAgICBsZXQgYXR0ckRpZmYgPSBkaWZmcy5hdHRyaWJ1dGVEaWZmZXJlbmNlc1swXTtcclxuICAgICAgICBsZXQgc2luZ2xlQXR0ck5hbWUgPSAoaXNBZGQpID8gJ25ld1ZhbHVlJyA6ICdvbGRWYWx1ZSc7XHJcbiAgICAgICAgbGV0IG11bHRpQXR0ck5hbWUgPSAoaXNBZGQpID8gJ2FkZGVkVmFsdWVzJyA6ICdyZW1vdmVkVmFsdWVzJztcclxuXHJcbiAgICAgICAgYXR0ckRpZmZbc2luZ2xlQXR0ck5hbWVdID0gbnVsbDtcclxuICAgICAgICBhdHRyRGlmZlttdWx0aUF0dHJOYW1lXSA9IG11bHRpVmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RNdWx0aVZhbHVlZFZhbHVlQ29sdW1uKGlzQWRkKSB7XHJcbiAgICAgICAgLy8gTWFrZSBvdXIgYXR0cmlidXRlIHJlcXVlc3QgYSBtdWx0aS12YWx1ZWQgcmVxdWVzdC5cclxuICAgICAgICBzZXR1cE11bHRpVmFsdWVkQXR0cihpc0FkZCk7XHJcblxyXG4gICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAvLyBBdHRyaWJ1dGVzIGlzIHRoZSBmaXJzdCB0YWJsZSAtIHNob3VsZCBoYXZlIGJvdGggdmFsdWVzLlxyXG4gICAgICAgIGxldCB2YWx1ZXMgPSBnZXRWYWx1ZXMoMCwgMSk7XHJcbiAgICAgICAgZXhwZWN0KHZhbHVlcy5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgZXhwZWN0KHZhbHVlcykudG9FcXVhbChtdWx0aVZhbHVlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ3NwbGl0cyBtdWx0aS12YWx1ZWQgYWRkcyBpbnRvIG11bHRpcGxlIHJvd3MnLCAoKSA9PiB7XHJcbiAgICAgICAgdGVzdE11bHRpVmFsdWVkVmFsdWVDb2x1bW4odHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc3BsaXRzIG11bHRpLXZhbHVlZCByZW1vdmVzIGludG8gbXVsdGlwbGUgcm93cycsICgpID0+IHtcclxuICAgICAgICB0ZXN0TXVsdGlWYWx1ZWRWYWx1ZUNvbHVtbihmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0U2luZ2xlVmFsdWVDaGFuZ2VUeXBlKGF0dHJUb051bGwsIGV4cGVjdGVkVmFsdWUpIHtcclxuICAgICAgICBpZiAoYXR0clRvTnVsbCkge1xyXG4gICAgICAgICAgICBkaWZmcy5wb2xpY3lWaW9sYXRpb25EaWZmZXJlbmNlc1swXVthdHRyVG9OdWxsXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICBsZXQgY2hhbmdlVHlwZXMgPSBnZXRWYWx1ZXMoMiwgMSk7XHJcbiAgICAgICAgZXhwZWN0KGNoYW5nZVR5cGVzKS50b0VxdWFsKFsgZXhwZWN0ZWRWYWx1ZSBdKTtcclxuICAgIH1cclxuXHJcbiAgICBpdCgncmVuZGVycyB0aGUgY29ycmVjdCBjaGFuZ2UgdHlwZSBmb3IgYSBzaW5nbGUtdmFsdWVkIGF0dHJpYnV0ZSBhZGQnLCAoKSA9PiB7XHJcbiAgICAgICAgdGVzdFNpbmdsZVZhbHVlQ2hhbmdlVHlwZSgnb2xkVmFsdWUnLCAndWlfZGlmZmVyZW5jZV9hZGRlZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JlbmRlcnMgdGhlIGNvcnJlY3QgY2hhbmdlIHR5cGUgZm9yIGEgc2luZ2xlLXZhbHVlZCBhdHRyaWJ1dGUgcmVtb3ZlJywgKCkgPT4ge1xyXG4gICAgICAgIHRlc3RTaW5nbGVWYWx1ZUNoYW5nZVR5cGUoJ25ld1ZhbHVlJywgJ3VpX2RpZmZlcmVuY2VfcmVtb3ZlZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JlbmRlcnMgdGhlIGNvcnJlY3QgY2hhbmdlIHR5cGUgZm9yIGEgc2luZ2xlLXZhbHVlZCBhdHRyaWJ1dGUgbW9kaWZ5JywgKCkgPT4ge1xyXG4gICAgICAgIHRlc3RTaW5nbGVWYWx1ZUNoYW5nZVR5cGUobnVsbCwgJ3VpX2RpZmZlcmVuY2VfbW9kaWZpZWQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZW5kZXJzIHRoZSBjb3JyZWN0IGNoYW5nZSB0eXBlIGZvciBhIG11bHRpLXZhbHVlZCBhdHRyaWJ1dGUgYWRkJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIFRoZSBzZWNvbmQgcm9sZSBpcyBhZGRlZC5cclxuICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgbGV0IGNoYW5nZVR5cGVzID0gZ2V0VmFsdWVzKDEsIDEpO1xyXG4gICAgICAgIGV4cGVjdChjaGFuZ2VUeXBlc1sxXSkudG9FcXVhbCgndWlfZGlmZmVyZW5jZV9hZGRlZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JlbmRlcnMgdGhlIGNvcnJlY3QgY2hhbmdlIHR5cGUgZm9yIGEgbXVsdGktdmFsdWVkIGF0dHJpYnV0ZSByZW1vdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gVGhlIGZpcnN0IHJvbGUgaXMgcmVtb3ZlZC5cclxuICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgbGV0IGNoYW5nZVR5cGVzID0gZ2V0VmFsdWVzKDEsIDEpO1xyXG4gICAgICAgIGV4cGVjdChjaGFuZ2VUeXBlc1swXSkudG9FcXVhbCgndWlfZGlmZmVyZW5jZV9yZW1vdmVkJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmUtcmVuZGVycyBpZiB0aGUgZGlmZmVyZW5jZXMgY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIFJlbmRlciB0aGUgZGlyZWN0aXZlLlxyXG4gICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICBleHBlY3QoY291bnRUYWJsZXMoKSkudG9FcXVhbCg1KTtcclxuXHJcbiAgICAgICAgLy8gQ2hhbmdlIHRoZSBkaWZmZXJlbmNlcy5cclxuICAgICAgICBkaWZmcy5hdHRyaWJ1dGVEaWZmZXJlbmNlcyA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIEN5Y2xlIC4uLiBhbmQgbWFrZSBzdXJlIHRoYXQgdGhlIHRhYmxlIGlzIHJlbW92ZWQuXHJcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICBleHBlY3QoY291bnRUYWJsZXMoKSkudG9FcXVhbCg0KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
