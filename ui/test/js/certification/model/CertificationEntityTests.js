System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/certification/CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsCertificationCertificationTestData) {}],
        execute: function () {

            describe('CertificationEntity', function () {

                var CertificationEntity = undefined,
                    certificationTestData = undefined,
                    CertificationItemStatusCount = undefined,
                    Scorecard = undefined,
                    IdentityDifference = undefined;

                // Use the module.
                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationEntity_, _CertificationItemStatusCount_, _Scorecard_, _IdentityDifference_, _certificationTestData_) {
                    CertificationEntity = _CertificationEntity_;
                    CertificationItemStatusCount = _CertificationItemStatusCount_;
                    Scorecard = _Scorecard_;
                    IdentityDifference = _IdentityDifference_;
                    certificationTestData = _certificationTestData_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = angular.copy(certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT.objects[0]),
                            test = undefined;

                        data.itemStatusCount = {
                            Bundle: {
                                Open: 10
                            }
                        };

                        data.differences = { i: 'am a difference' };
                        data.scorecard = { i: 'am a scorecard' };

                        test = new CertificationEntity(data);
                        expect(test.id).toEqual(data.id);
                        expect(test.displayableName).toEqual(data.displayableName);
                        expect(test.itemStatusCount).toEqual(new CertificationItemStatusCount(data.itemStatusCount));
                        expect(test.differences instanceof IdentityDifference).toEqual(true);
                        expect(test.scorecard instanceof Scorecard).toEqual(true);
                        expect(test.delegation).toEqual(data.delegation);
                        expect(test.isEntityDelegated()).toEqual(true);
                    });

                    it('should throw with no config data', function () {
                        expect(function () {
                            new CertificationEntity();
                        }).toThrow();
                    });

                    it('should throw with missing id', function () {
                        var data = certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT.objects[0];
                        delete data.id;
                        expect(function () {
                            new CertificationEntity(data);
                        }).toThrow();
                    });
                });

                describe('init', function () {
                    it('should initialize with provided entitlement data', function () {
                        var data = angular.copy(certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT2.objects[0]),
                            test = undefined;

                        data.itemStatusCount = {
                            Bundle: {
                                Open: 10
                            }
                        };

                        test = new CertificationEntity(data);
                        expect(test.id).toEqual(data.id);
                        expect(test.displayableName).toEqual(data.displayableName);
                        expect(test.description).toEqual(data.description);
                        expect(test.entitlement).toEqual('ui_cert_data_owner_entitlement_name');
                        expect(test.summaryStatus).toEqual(data.summaryStatus);
                        expect(test.certificationItemCount).toEqual(data.certificationItemCount);
                        expect(test.isChallengedState()).toEqual(false);
                        expect(test.isEntityDelegated()).toEqual(false);
                    });
                });

                describe('isComplete()', function () {
                    var entity = undefined,
                        total = undefined,
                        completeCount = undefined;

                    beforeEach(function () {
                        var data = certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT.objects[0];
                        entity = new CertificationEntity(data);

                        total = 10;

                        // Mock the item status count methods that are used by isComplete().
                        entity.itemStatusCount = {
                            getCountForStatus: jasmine.createSpy().and.callFake(function () {
                                return completeCount;
                            }),
                            getTotalCount: jasmine.createSpy().and.callFake(function () {
                                return total;
                            })
                        };
                    });

                    it('returns true if all items are complete', function () {
                        completeCount = total;
                        expect(entity.isComplete()).toEqual(true);
                    });

                    it('returns false if not all items are complete', function () {
                        completeCount = total - 1;
                        expect(entity.isComplete()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkVudGl0eVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsZ0RBQWdELFVBQVUsU0FBUzs7O0lBR2hKOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLDJDQUEyQztRQUN4RCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsdUJBQXVCLFlBQVc7O2dCQUV2QyxJQUFJLHNCQUFtQjtvQkFBRSx3QkFBcUI7b0JBQUUsK0JBQTRCO29CQUFFLFlBQVM7b0JBQUUscUJBQWtCOzs7Z0JBRzNHLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLHVCQUF1QixnQ0FBZ0MsYUFBYSxzQkFDcEUseUJBQXlCO29CQUNoRCxzQkFBc0I7b0JBQ3RCLCtCQUErQjtvQkFDL0IsWUFBWTtvQkFDWixxQkFBcUI7b0JBQ3JCLHdCQUF3Qjs7O2dCQUc1QixTQUFTLFFBQVEsWUFBVztvQkFDeEIsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsSUFBSSxPQUFPLFFBQVEsS0FBSyxzQkFBc0IsaUNBQWlDLFFBQVE7NEJBQ25GLE9BQUk7O3dCQUVSLEtBQUssa0JBQWtCOzRCQUNuQixRQUFRO2dDQUNKLE1BQU07Ozs7d0JBSWQsS0FBSyxjQUFjLEVBQUUsR0FBRzt3QkFDeEIsS0FBSyxZQUFZLEVBQUUsR0FBRzs7d0JBRXRCLE9BQU8sSUFBSSxvQkFBb0I7d0JBQy9CLE9BQU8sS0FBSyxJQUFJLFFBQVEsS0FBSzt3QkFDN0IsT0FBTyxLQUFLLGlCQUFpQixRQUFRLEtBQUs7d0JBQzFDLE9BQU8sS0FBSyxpQkFBaUIsUUFBUSxJQUFJLDZCQUE2QixLQUFLO3dCQUMzRSxPQUFPLEtBQUssdUJBQXVCLG9CQUFvQixRQUFRO3dCQUMvRCxPQUFPLEtBQUsscUJBQXFCLFdBQVcsUUFBUTt3QkFDcEQsT0FBTyxLQUFLLFlBQVksUUFBUSxLQUFLO3dCQUNyQyxPQUFPLEtBQUsscUJBQXFCLFFBQVE7OztvQkFHN0MsR0FBRyxvQ0FBb0MsWUFBVzt3QkFDOUMsT0FBTyxZQUFXOzRCQUNkLElBQUk7MkJBQ0w7OztvQkFHUCxHQUFHLGdDQUFnQyxZQUFXO3dCQUMxQyxJQUFJLE9BQU8sc0JBQXNCLGlDQUFpQyxRQUFRO3dCQUMxRSxPQUFPLEtBQUs7d0JBQ1osT0FBTyxZQUFXOzRCQUNkLElBQUksb0JBQW9COzJCQUN6Qjs7OztnQkFJWCxTQUFTLFFBQVEsWUFBVztvQkFDeEIsR0FBRyxvREFBb0QsWUFBVzt3QkFDOUQsSUFBSSxPQUFPLFFBQVEsS0FBSyxzQkFBc0Isa0NBQWtDLFFBQVE7NEJBQ3BGLE9BQUk7O3dCQUVSLEtBQUssa0JBQWtCOzRCQUNuQixRQUFRO2dDQUNKLE1BQU07Ozs7d0JBSWQsT0FBTyxJQUFJLG9CQUFvQjt3QkFDL0IsT0FBTyxLQUFLLElBQUksUUFBUSxLQUFLO3dCQUM3QixPQUFPLEtBQUssaUJBQWlCLFFBQVEsS0FBSzt3QkFDMUMsT0FBTyxLQUFLLGFBQWEsUUFBUSxLQUFLO3dCQUN0QyxPQUFPLEtBQUssYUFBYSxRQUFRO3dCQUNqQyxPQUFPLEtBQUssZUFBZSxRQUFRLEtBQUs7d0JBQ3hDLE9BQU8sS0FBSyx3QkFBd0IsUUFBUSxLQUFLO3dCQUNqRCxPQUFPLEtBQUsscUJBQXFCLFFBQVE7d0JBQ3pDLE9BQU8sS0FBSyxxQkFBcUIsUUFBUTs7OztnQkFJakQsU0FBUyxnQkFBZ0IsWUFBTTtvQkFDM0IsSUFBSSxTQUFNO3dCQUFFLFFBQUs7d0JBQUUsZ0JBQWE7O29CQUVoQyxXQUFXLFlBQU07d0JBQ2IsSUFBSSxPQUFPLHNCQUFzQixpQ0FBaUMsUUFBUTt3QkFDMUUsU0FBUyxJQUFJLG9CQUFvQjs7d0JBRWpDLFFBQVE7Ozt3QkFHUixPQUFPLGtCQUFrQjs0QkFDckIsbUJBQW1CLFFBQVEsWUFBWSxJQUFJLFNBQVMsWUFBQTtnQ0FZcEMsT0FaMEM7OzRCQUMxRCxlQUFlLFFBQVEsWUFBWSxJQUFJLFNBQVMsWUFBQTtnQ0FjaEMsT0Fkc0M7Ozs7O29CQUk5RCxHQUFHLDBDQUEwQyxZQUFNO3dCQUMvQyxnQkFBZ0I7d0JBQ2hCLE9BQU8sT0FBTyxjQUFjLFFBQVE7OztvQkFHeEMsR0FBRywrQ0FBK0MsWUFBTTt3QkFDcEQsZ0JBQWdCLFFBQVE7d0JBQ3hCLE9BQU8sT0FBTyxjQUFjLFFBQVE7Ozs7OztHQXFCN0MiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9tb2RlbC9DZXJ0aWZpY2F0aW9uRW50aXR5VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICd0ZXN0L2pzL2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvblRlc3REYXRhJztcblxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25FbnRpdHknLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBDZXJ0aWZpY2F0aW9uRW50aXR5LCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEsIENlcnRpZmljYXRpb25JdGVtU3RhdHVzQ291bnQsIFNjb3JlY2FyZCwgSWRlbnRpdHlEaWZmZXJlbmNlO1xuXG4gICAgLy8gVXNlIHRoZSBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0NlcnRpZmljYXRpb25FbnRpdHlfLCBfQ2VydGlmaWNhdGlvbkl0ZW1TdGF0dXNDb3VudF8sIF9TY29yZWNhcmRfLCBfSWRlbnRpdHlEaWZmZXJlbmNlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY2VydGlmaWNhdGlvblRlc3REYXRhXykge1xuICAgICAgICBDZXJ0aWZpY2F0aW9uRW50aXR5ID0gX0NlcnRpZmljYXRpb25FbnRpdHlfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbVN0YXR1c0NvdW50ID0gX0NlcnRpZmljYXRpb25JdGVtU3RhdHVzQ291bnRfO1xuICAgICAgICBTY29yZWNhcmQgPSBfU2NvcmVjYXJkXztcbiAgICAgICAgSWRlbnRpdHlEaWZmZXJlbmNlID0gX0lkZW50aXR5RGlmZmVyZW5jZV87XG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSA9IF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdpbml0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIHByb3ZpZGVkIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OX0VOVElUWV9MSVNUX1JFU1VMVC5vYmplY3RzWzBdKSxcbiAgICAgICAgICAgICAgICB0ZXN0O1xuXG4gICAgICAgICAgICBkYXRhLml0ZW1TdGF0dXNDb3VudCA9IHtcbiAgICAgICAgICAgICAgICBCdW5kbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgT3BlbjogMTBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkYXRhLmRpZmZlcmVuY2VzID0geyBpOiAnYW0gYSBkaWZmZXJlbmNlJyB9O1xuICAgICAgICAgICAgZGF0YS5zY29yZWNhcmQgPSB7IGk6ICdhbSBhIHNjb3JlY2FyZCcgfTtcblxuICAgICAgICAgICAgdGVzdCA9IG5ldyBDZXJ0aWZpY2F0aW9uRW50aXR5KGRhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuaWQpLnRvRXF1YWwoZGF0YS5pZCk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5kaXNwbGF5YWJsZU5hbWUpLnRvRXF1YWwoZGF0YS5kaXNwbGF5YWJsZU5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuaXRlbVN0YXR1c0NvdW50KS50b0VxdWFsKG5ldyBDZXJ0aWZpY2F0aW9uSXRlbVN0YXR1c0NvdW50KGRhdGEuaXRlbVN0YXR1c0NvdW50KSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5kaWZmZXJlbmNlcyBpbnN0YW5jZW9mIElkZW50aXR5RGlmZmVyZW5jZSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnNjb3JlY2FyZCBpbnN0YW5jZW9mIFNjb3JlY2FyZCkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmRlbGVnYXRpb24pLnRvRXF1YWwoZGF0YS5kZWxlZ2F0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmlzRW50aXR5RGVsZWdhdGVkKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aCBubyBjb25maWcgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uRW50aXR5KCk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aCBtaXNzaW5nIGlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OX0VOVElUWV9MSVNUX1JFU1VMVC5vYmplY3RzWzBdO1xuICAgICAgICAgICAgZGVsZXRlIGRhdGEuaWQ7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25FbnRpdHkoZGF0YSk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2luaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcHJvdmlkZWQgZW50aXRsZW1lbnQgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBhbmd1bGFyLmNvcHkoY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fRU5USVRZX0xJU1RfUkVTVUxUMi5vYmplY3RzWzBdKSxcbiAgICAgICAgICAgICAgICB0ZXN0O1xuXG4gICAgICAgICAgICBkYXRhLml0ZW1TdGF0dXNDb3VudCA9IHtcbiAgICAgICAgICAgICAgICBCdW5kbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgT3BlbjogMTBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0ZXN0ID0gbmV3IENlcnRpZmljYXRpb25FbnRpdHkoZGF0YSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5pZCkudG9FcXVhbChkYXRhLmlkKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmRpc3BsYXlhYmxlTmFtZSkudG9FcXVhbChkYXRhLmRpc3BsYXlhYmxlTmFtZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5kZXNjcmlwdGlvbikudG9FcXVhbChkYXRhLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmVudGl0bGVtZW50KS50b0VxdWFsKCd1aV9jZXJ0X2RhdGFfb3duZXJfZW50aXRsZW1lbnRfbmFtZScpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3Quc3VtbWFyeVN0YXR1cykudG9FcXVhbChkYXRhLnN1bW1hcnlTdGF0dXMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuY2VydGlmaWNhdGlvbkl0ZW1Db3VudCkudG9FcXVhbChkYXRhLmNlcnRpZmljYXRpb25JdGVtQ291bnQpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuaXNDaGFsbGVuZ2VkU3RhdGUoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5pc0VudGl0eURlbGVnYXRlZCgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNDb21wbGV0ZSgpJywgKCkgPT4ge1xuICAgICAgICBsZXQgZW50aXR5LCB0b3RhbCwgY29tcGxldGVDb3VudDtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fRU5USVRZX0xJU1RfUkVTVUxULm9iamVjdHNbMF07XG4gICAgICAgICAgICBlbnRpdHkgPSBuZXcgQ2VydGlmaWNhdGlvbkVudGl0eShkYXRhKTtcblxuICAgICAgICAgICAgdG90YWwgPSAxMDtcblxuICAgICAgICAgICAgLy8gTW9jayB0aGUgaXRlbSBzdGF0dXMgY291bnQgbWV0aG9kcyB0aGF0IGFyZSB1c2VkIGJ5IGlzQ29tcGxldGUoKS5cbiAgICAgICAgICAgIGVudGl0eS5pdGVtU3RhdHVzQ291bnQgPSB7XG4gICAgICAgICAgICAgICAgZ2V0Q291bnRGb3JTdGF0dXM6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKCgpID0+IGNvbXBsZXRlQ291bnQpLFxuICAgICAgICAgICAgICAgIGdldFRvdGFsQ291bnQ6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKCgpID0+IHRvdGFsKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBhbGwgaXRlbXMgYXJlIGNvbXBsZXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgY29tcGxldGVDb3VudCA9IHRvdGFsO1xuICAgICAgICAgICAgZXhwZWN0KGVudGl0eS5pc0NvbXBsZXRlKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vdCBhbGwgaXRlbXMgYXJlIGNvbXBsZXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgY29tcGxldGVDb3VudCA9IHRvdGFsIC0gMTtcbiAgICAgICAgICAgIGV4cGVjdChlbnRpdHkuaXNDb21wbGV0ZSgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
