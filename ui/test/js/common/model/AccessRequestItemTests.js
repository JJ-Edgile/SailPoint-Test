System.register(['test/js/TestInitializer', 'common/model/ModelModule', './ModelTestData'], function (_export) {
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }, function (_ModelTestData) {}],
        execute: function () {

            /**
             * Tests for the AccessRequestItem model object.
             */
            describe('AccessRequestItem', function () {

                var roleData, entitlementData, identitySearchData, AccessRequestItem, role, extendedRoleData, extendedRole, entitlement, identitySearchItem;

                // Use the access request module.
                beforeEach(module(modelModule));

                /**
                 * Setup the AccessRequestItem class and create some data to test with.
                 */
                beforeEach(inject(function (_AccessRequestItem_, modelTestData) {
                    AccessRequestItem = _AccessRequestItem_;

                    roleData = modelTestData.ROLE;
                    entitlementData = modelTestData.ENTITLEMENT;
                    identitySearchData = modelTestData.IDENTITY_SEARCH_ROLE;

                    role = new AccessRequestItem(roleData);
                    entitlement = new AccessRequestItem(entitlementData);
                    identitySearchItem = new AccessRequestItem(identitySearchData);

                    extendedRoleData = angular.copy(roleData);
                    extendedRoleData.location = 'Austin';
                    extendedRoleData.department = 'Dept of Awesomeness';

                    extendedRole = new AccessRequestItem(extendedRoleData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new AccessRequestItem(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new AccessRequestItem('hi mom');
                    }).toThrow();
                    expect(function () {
                        new AccessRequestItem(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns an ID read from data', function () {
                    expect(role.getId()).toEqual(roleData.id);
                });

                it('returns a type from data', function () {
                    expect(role.getType()).toEqual(roleData.type);
                    expect(entitlement.getType()).toEqual(entitlementData.type);
                });

                it('returns an access type from data', function () {
                    expect(role.getAccessType()).toEqual(roleData.accessType);
                    expect(entitlement.getAccessType()).toEqual(entitlementData.accessType);
                });

                it('isRole() returns correct values', function () {
                    expect(role.isRole()).toEqual(true);
                    expect(entitlement.isRole()).toEqual(false);
                });

                it('isEntitlement() returns correct values', function () {
                    expect(role.isEntitlement()).toEqual(false);
                    expect(entitlement.isEntitlement()).toEqual(true);
                });

                it('returns a displayable access type from data', function () {
                    expect(role.getDisplayableAccessType()).toEqual(roleData.displayableAccessType);
                    expect(entitlement.getDisplayableAccessType()).toEqual(entitlementData.displayableAccessType);
                    role.displayableAccessType = undefined;
                    expect(role.getDisplayableAccessType()).toEqual(roleData.accessType);
                });

                it('returns a name read from data', function () {
                    expect(role.getName()).toEqual(roleData.name);
                });

                it('returns a displayable name read from data', function () {
                    expect(role.getDisplayableName()).toEqual(roleData.displayableName);
                    expect(entitlement.getDisplayableName()).toEqual(entitlementData.displayableName);
                });

                describe('getDisplayableNameOrName()', function () {
                    var displayableName = 'Malcomb blowers are number 1!!',
                        name = 'noPaperTowels';

                    it('returns displayable name if available', function () {
                        var item = new AccessRequestItem({
                            displayableName: displayableName,
                            name: name
                        });
                        expect(item.getDisplayableNameOrName()).toEqual(displayableName);
                    });

                    it('returns name if displayable name is not available', function () {
                        var item = new AccessRequestItem({
                            name: name
                        });
                        expect(item.getDisplayableNameOrName()).toEqual(name);
                    });
                });

                it('returns an owner read from data', function () {
                    expect(role.getOwner()).toEqual(roleData.owner);
                    expect(entitlement.getOwner()).toEqual(entitlementData.owner);
                });

                it('returns a description read from data', function () {
                    expect(role.getDescription()).toEqual(roleData.description);
                    expect(entitlement.getDescription()).toEqual(entitlementData.description);
                });

                it('returns an icon read from data', function () {
                    expect(entitlement.getIcon()).toEqual(entitlementData.icon);
                });

                it('returns an application read from data', function () {
                    expect(entitlement.getApplication()).toEqual(entitlementData.application);
                });

                it('returns an attribute read from data', function () {
                    expect(entitlement.getAttribute()).toEqual(entitlementData.attribute);
                });

                it('returns a value read from data', function () {
                    expect(entitlement.getValue()).toEqual(entitlementData.value);
                });

                it('returns a risk score weight read from data', function () {
                    expect(role.getRiskScoreWeight()).toEqual(roleData.riskScoreWeight);
                });

                it('returns a risk score color read from data', function () {
                    expect(role.getRiskScoreColor()).toEqual(roleData.riskScoreColor);
                    expect(role.getRiskScoreTextColor()).toEqual(roleData.riskScoreTextColor);
                });

                it('hasRiskScoreWeight() returns false with no risk score', function () {
                    expect(entitlement.hasRiskScoreWeight()).toEqual(false);
                });

                it('hasRiskScoreWeight() returns false with a risk score of 0', function () {
                    expect(identitySearchItem.hasRiskScoreWeight()).toEqual(false);
                });

                it('hasRiskScoreWeight() returns true with a risk score greater than 0', function () {
                    expect(role.hasRiskScoreWeight()).toEqual(true);
                });

                it('returns population statistics read from data', function () {
                    expect(identitySearchItem.getPopulationStatistics().count).toEqual(identitySearchData.populationStatistics.count);
                    expect(identitySearchItem.getPopulationStatistics().total).toEqual(identitySearchData.populationStatistics.total);
                    expect(identitySearchItem.getPopulationStatistics().highRisk).toEqual(identitySearchData.populationStatistics.highRisk);
                });

                it('returns permitted flag set from data', function () {
                    expect(identitySearchItem.isPermitted()).toEqual(true);
                });

                it('returns attributes read from data', function () {
                    expect(extendedRole.getAttributes().location).toEqual(extendedRoleData.location);
                    expect(extendedRole.getAttributes().department).toEqual(extendedRoleData.department);
                });

                it('getAttribute() returns data', function () {
                    expect(extendedRole.getAttributeValue('location')).toEqual(extendedRoleData.location);
                    expect(extendedRole.getAttributeValue('department')).toEqual(extendedRoleData.department);
                });

                it('getAttributeValue() returns undefined for non-existent attribute', function () {
                    expect(extendedRole.getAttributeValue('not there')).toBeUndefined();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9BY2Nlc3NSZXF1ZXN0SXRlbVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0QkFBNEIsb0JBQW9CLFVBQVUsU0FBUztJQUMzRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGNBQWMsd0JBQXdCO1dBQ3ZDLFVBQVUsZ0JBQWdCO1FBQzdCLFNBQVMsWUFBWTs7Ozs7WUFEN0IsU0FBUyxxQkFBcUIsWUFBVzs7Z0JBRXJDLElBQUksVUFDQSxpQkFDQSxvQkFDQSxtQkFDQSxNQUNBLGtCQUNBLGNBQ0EsYUFDQTs7O2dCQUdKLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLHFCQUFxQixlQUFlO29CQUMzRCxvQkFBb0I7O29CQUVwQixXQUFXLGNBQWM7b0JBQ3pCLGtCQUFrQixjQUFjO29CQUNoQyxxQkFBcUIsY0FBYzs7b0JBRW5DLE9BQU8sSUFBSSxrQkFBa0I7b0JBQzdCLGNBQWMsSUFBSSxrQkFBa0I7b0JBQ3BDLHFCQUFxQixJQUFJLGtCQUFrQjs7b0JBRTNDLG1CQUFtQixRQUFRLEtBQUs7b0JBQ2hDLGlCQUFpQixXQUFXO29CQUM1QixpQkFBaUIsYUFBYTs7b0JBRTlCLGVBQWUsSUFBSSxrQkFBa0I7OztnQkFHekMsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsT0FBTyxZQUFXO3dCQUFFLElBQUksa0JBQWtCO3VCQUFVOzs7Z0JBR3hELEdBQUcsaUVBQWlFLFlBQVc7b0JBQzNFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLGtCQUFrQjt1QkFBYztvQkFDeEQsT0FBTyxZQUFXO3dCQUFFLElBQUksa0JBQWtCLFlBQVc7NEJBQUUsT0FBTzs7dUJBQW9COzs7Z0JBR3RGLEdBQUcsZ0NBQWdDLFlBQVc7b0JBQzFDLE9BQU8sS0FBSyxTQUFTLFFBQVEsU0FBUzs7O2dCQUcxQyxHQUFH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QW1CLDBCQUEwQixVQUNoRCxRQUFRLG1CQUFtQixxQkFBcUI7OztnQkFHeEQsR0FBRyx3Q0FBd0MsWUFBVztvQkFDbEQsT0FBTyxtQkFBbUIsZUFBZSxRQUFROzs7Z0JBR3JELEdBQUcscUNBQXFDLFlBQVc7b0JBQy9DLE9BQU8sYUFBYSxnQkFBZ0IsVUFBVSxRQUFRLGlCQUFpQjtvQkFDdkUsT0FBTyxhQUFhLGdCQUFnQixZQUFZLFFBQVEsaUJBQWlCOzs7Z0JBRzdFLEdBQUcsK0JBQStCLFlBQVc7b0JBQ3pDLE9BQU8sYUFBYSxrQkFBa0IsYUFBYSxRQUFRLGlCQUFpQjtvQkFDNUUsT0FBTyxhQUFhLGtCQUFrQixlQUFlLFFBQVEsaUJBQWlCOzs7Z0JBR2xGLEdBQUcsb0VBQW9FLFlBQVc7b0JBQzlFLE9BQU8sYUFBYSxrQkFBa0IsY0FBYzs7Ozs7R0FRekQiLCJmaWxlIjoiY29tbW9uL21vZGVsL0FjY2Vzc1JlcXVlc3RJdGVtVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IG1vZGVsTW9kdWxlIGZyb20gJ2NvbW1vbi9tb2RlbC9Nb2RlbE1vZHVsZSc7XHJcbmltcG9ydCAnLi9Nb2RlbFRlc3REYXRhJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIEFjY2Vzc1JlcXVlc3RJdGVtIG1vZGVsIG9iamVjdC5cclxuICovXHJcbmRlc2NyaWJlKCdBY2Nlc3NSZXF1ZXN0SXRlbScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciByb2xlRGF0YSxcclxuICAgICAgICBlbnRpdGxlbWVudERhdGEsXHJcbiAgICAgICAgaWRlbnRpdHlTZWFyY2hEYXRhLFxyXG4gICAgICAgIEFjY2Vzc1JlcXVlc3RJdGVtLFxyXG4gICAgICAgIHJvbGUsXHJcbiAgICAgICAgZXh0ZW5kZWRSb2xlRGF0YSxcclxuICAgICAgICBleHRlbmRlZFJvbGUsXHJcbiAgICAgICAgZW50aXRsZW1lbnQsXHJcbiAgICAgICAgaWRlbnRpdHlTZWFyY2hJdGVtO1xyXG5cclxuICAgIC8vIFVzZSB0aGUgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIHRoZSBBY2Nlc3NSZXF1ZXN0SXRlbSBjbGFzcyBhbmQgY3JlYXRlIHNvbWUgZGF0YSB0byB0ZXN0IHdpdGguXHJcbiAgICAgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9BY2Nlc3NSZXF1ZXN0SXRlbV8sIG1vZGVsVGVzdERhdGEpIHtcclxuICAgICAgICBBY2Nlc3NSZXF1ZXN0SXRlbSA9IF9BY2Nlc3NSZXF1ZXN0SXRlbV87XHJcblxyXG4gICAgICAgIHJvbGVEYXRhID0gbW9kZWxUZXN0RGF0YS5ST0xFO1xyXG4gICAgICAgIGVudGl0bGVtZW50RGF0YSA9IG1vZGVsVGVzdERhdGEuRU5USVRMRU1FTlQ7XHJcbiAgICAgICAgaWRlbnRpdHlTZWFyY2hEYXRhID0gbW9kZWxUZXN0RGF0YS5JREVOVElUWV9TRUFSQ0hfUk9MRTtcclxuXHJcbiAgICAgICAgcm9sZSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShyb2xlRGF0YSk7XHJcbiAgICAgICAgZW50aXRsZW1lbnQgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oZW50aXRsZW1lbnREYXRhKTtcclxuICAgICAgICBpZGVudGl0eVNlYXJjaEl0ZW0gPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oaWRlbnRpdHlTZWFyY2hEYXRhKTtcclxuXHJcbiAgICAgICAgZXh0ZW5kZWRSb2xlRGF0YSA9IGFuZ3VsYXIuY29weShyb2xlRGF0YSk7XHJcbiAgICAgICAgZXh0ZW5kZWRSb2xlRGF0YS5sb2NhdGlvbiA9ICdBdXN0aW4nO1xyXG4gICAgICAgIGV4dGVuZGVkUm9sZURhdGEuZGVwYXJ0bWVudCA9ICdEZXB0IG9mIEF3ZXNvbWVuZXNzJztcclxuXHJcbiAgICAgICAgZXh0ZW5kZWRSb2xlID0gbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKGV4dGVuZGVkUm9sZURhdGEpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGl0KCdyZXF1aXJlcyBub24tbnVsbCBkYXRhIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKG51bGwpOyB9KS50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKCdoaSBtb20nKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKGZ1bmN0aW9uKCkgeyByZXR1cm4gJ3doYXQgdGhhPyc7IH0pOyB9KS50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBhbiBJRCByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChyb2xlLmdldElkKCkpLnRvRXF1YWwocm9sZURhdGEuaWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYSB0eXBlIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChyb2xlLmdldFR5cGUoKSkudG9FcXVhbChyb2xlRGF0YS50eXBlKTtcclxuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnQuZ2V0VHlwZSgpKS50b0VxdWFsKGVudGl0bGVtZW50RGF0YS50eXBlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGFuIGFjY2VzcyB0eXBlIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChyb2xlLmdldEFjY2Vzc1R5cGUoKSkudG9FcXVhbChyb2xlRGF0YS5hY2Nlc3NUeXBlKTtcclxuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnQuZ2V0QWNjZXNzVHlwZSgpKS50b0VxdWFsKGVudGl0bGVtZW50RGF0YS5hY2Nlc3NUeXBlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdpc1JvbGUoKSByZXR1cm5zIGNvcnJlY3QgdmFsdWVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KHJvbGUuaXNSb2xlKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmlzUm9sZSgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdpc0VudGl0bGVtZW50KCkgcmV0dXJucyBjb3JyZWN0IHZhbHVlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChyb2xlLmlzRW50aXRsZW1lbnQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmlzRW50aXRsZW1lbnQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGEgZGlzcGxheWFibGUgYWNjZXNzIHR5cGUgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KHJvbGUuZ2V0RGlzcGxheWFibGVBY2Nlc3NUeXBlKCkpLnRvRXF1YWwocm9sZURhdGEuZGlzcGxheWFibGVBY2Nlc3NUeXBlKTtcclxuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnQuZ2V0RGlzcGxheWFibGVBY2Nlc3NUeXBlKCkpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLmRpc3BsYXlhYmxlQWNjZXNzVHlwZSk7XHJcbiAgICAgICAgcm9sZS5kaXNwbGF5YWJsZUFjY2Vzc1R5cGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgZXhwZWN0KHJvbGUuZ2V0RGlzcGxheWFibGVBY2Nlc3NUeXBlKCkpLnRvRXF1YWwocm9sZURhdGEuYWNjZXNzVHlwZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBhIG5hbWUgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3Qocm9sZS5nZXROYW1lKCkpLnRvRXF1YWwocm9sZURhdGEubmFtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBhIGRpc3BsYXlhYmxlIG5hbWUgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3Qocm9sZS5nZXREaXNwbGF5YWJsZU5hbWUoKSkudG9FcXVhbChyb2xlRGF0YS5kaXNwbGF5YWJsZU5hbWUpO1xyXG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudC5nZXREaXNwbGF5YWJsZU5hbWUoKSkudG9FcXVhbChlbnRpdGxlbWVudERhdGEuZGlzcGxheWFibGVOYW1lKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXREaXNwbGF5YWJsZU5hbWVPck5hbWUoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBkaXNwbGF5YWJsZU5hbWUgPSAnTWFsY29tYiBibG93ZXJzIGFyZSBudW1iZXIgMSEhJyxcclxuICAgICAgICAgICAgbmFtZSA9ICdub1BhcGVyVG93ZWxzJztcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZGlzcGxheWFibGUgbmFtZSBpZiBhdmFpbGFibGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiBkaXNwbGF5YWJsZU5hbWUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBleHBlY3QoaXRlbS5nZXREaXNwbGF5YWJsZU5hbWVPck5hbWUoKSkudG9FcXVhbChkaXNwbGF5YWJsZU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBuYW1lIGlmIGRpc3BsYXlhYmxlIG5hbWUgaXMgbm90IGF2YWlsYWJsZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBleHBlY3QoaXRlbS5nZXREaXNwbGF5YWJsZU5hbWVPck5hbWUoKSkudG9FcXVhbChuYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGFuIG93bmVyIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KHJvbGUuZ2V0T3duZXIoKSkudG9FcXVhbChyb2xlRGF0YS5vd25lcik7XHJcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmdldE93bmVyKCkpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLm93bmVyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGEgZGVzY3JpcHRpb24gcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3Qocm9sZS5nZXREZXNjcmlwdGlvbigpKS50b0VxdWFsKHJvbGVEYXRhLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnQuZ2V0RGVzY3JpcHRpb24oKSkudG9FcXVhbChlbnRpdGxlbWVudERhdGEuZGVzY3JpcHRpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYW4gaWNvbiByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudC5nZXRJY29uKCkpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLmljb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYW4gYXBwbGljYXRpb24gcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnQuZ2V0QXBwbGljYXRpb24oKSkudG9FcXVhbChlbnRpdGxlbWVudERhdGEuYXBwbGljYXRpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYW4gYXR0cmlidXRlIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmdldEF0dHJpYnV0ZSgpKS50b0VxdWFsKGVudGl0bGVtZW50RGF0YS5hdHRyaWJ1dGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYSB2YWx1ZSByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudC5nZXRWYWx1ZSgpKS50b0VxdWFsKGVudGl0bGVtZW50RGF0YS52YWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBhIHJpc2sgc2NvcmUgd2VpZ2h0IHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KHJvbGUuZ2V0Umlza1Njb3JlV2VpZ2h0KCkpLnRvRXF1YWwocm9sZURhdGEucmlza1Njb3JlV2VpZ2h0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGEgcmlzayBzY29yZSBjb2xvciByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChyb2xlLmdldFJpc2tTY29yZUNvbG9yKCkpLnRvRXF1YWwocm9sZURhdGEucmlza1Njb3JlQ29sb3IpO1xyXG4gICAgICAgIGV4cGVjdChyb2xlLmdldFJpc2tTY29yZVRleHRDb2xvcigpKS50b0VxdWFsKHJvbGVEYXRhLnJpc2tTY29yZVRleHRDb2xvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnaGFzUmlza1Njb3JlV2VpZ2h0KCkgcmV0dXJucyBmYWxzZSB3aXRoIG5vIHJpc2sgc2NvcmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnQuaGFzUmlza1Njb3JlV2VpZ2h0KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2hhc1Jpc2tTY29yZVdlaWdodCgpIHJldHVybnMgZmFsc2Ugd2l0aCBhIHJpc2sgc2NvcmUgb2YgMCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChpZGVudGl0eVNlYXJjaEl0ZW0uaGFzUmlza1Njb3JlV2VpZ2h0KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2hhc1Jpc2tTY29yZVdlaWdodCgpIHJldHVybnMgdHJ1ZSB3aXRoIGEgcmlzayBzY29yZSBncmVhdGVyIHRoYW4gMCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChyb2xlLmhhc1Jpc2tTY29yZVdlaWdodCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgcG9wdWxhdGlvbiBzdGF0aXN0aWNzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VhcmNoSXRlbS5nZXRQb3B1bGF0aW9uU3RhdGlzdGljcygpLmNvdW50KS5cclxuICAgICAgICAgICAgdG9FcXVhbChpZGVudGl0eVNlYXJjaERhdGEucG9wdWxhdGlvblN0YXRpc3RpY3MuY291bnQpO1xyXG4gICAgICAgIGV4cGVjdChpZGVudGl0eVNlYXJjaEl0ZW0uZ2V0UG9wdWxhdGlvblN0YXRpc3RpY3MoKS50b3RhbCkuXHJcbiAgICAgICAgICAgIHRvRXF1YWwoaWRlbnRpdHlTZWFyY2hEYXRhLnBvcHVsYXRpb25TdGF0aXN0aWNzLnRvdGFsKTtcclxuICAgICAgICBleHBlY3QoaWRlbnRpdHlTZWFyY2hJdGVtLmdldFBvcHVsYXRpb25TdGF0aXN0aWNzKCkuaGlnaFJpc2spLlxyXG4gICAgICAgICAgICB0b0VxdWFsKGlkZW50aXR5U2VhcmNoRGF0YS5wb3B1bGF0aW9uU3RhdGlzdGljcy5oaWdoUmlzayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBwZXJtaXR0ZWQgZmxhZyBzZXQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VhcmNoSXRlbS5pc1Blcm1pdHRlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYXR0cmlidXRlcyByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChleHRlbmRlZFJvbGUuZ2V0QXR0cmlidXRlcygpLmxvY2F0aW9uKS50b0VxdWFsKGV4dGVuZGVkUm9sZURhdGEubG9jYXRpb24pO1xyXG4gICAgICAgIGV4cGVjdChleHRlbmRlZFJvbGUuZ2V0QXR0cmlidXRlcygpLmRlcGFydG1lbnQpLnRvRXF1YWwoZXh0ZW5kZWRSb2xlRGF0YS5kZXBhcnRtZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdnZXRBdHRyaWJ1dGUoKSByZXR1cm5zIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZXh0ZW5kZWRSb2xlLmdldEF0dHJpYnV0ZVZhbHVlKCdsb2NhdGlvbicpKS50b0VxdWFsKGV4dGVuZGVkUm9sZURhdGEubG9jYXRpb24pO1xyXG4gICAgICAgIGV4cGVjdChleHRlbmRlZFJvbGUuZ2V0QXR0cmlidXRlVmFsdWUoJ2RlcGFydG1lbnQnKSkudG9FcXVhbChleHRlbmRlZFJvbGVEYXRhLmRlcGFydG1lbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2dldEF0dHJpYnV0ZVZhbHVlKCkgcmV0dXJucyB1bmRlZmluZWQgZm9yIG5vbi1leGlzdGVudCBhdHRyaWJ1dGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZXh0ZW5kZWRSb2xlLmdldEF0dHJpYnV0ZVZhbHVlKCdub3QgdGhlcmUnKSkudG9CZVVuZGVmaW5lZCgpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
