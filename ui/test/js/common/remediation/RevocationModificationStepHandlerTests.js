System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule', './RemediationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_RemediationTestData) {}],
        execute: function () {

            describe('RevocationModificationStepHandler', function () {
                var RevocationModificationStepHandler = undefined,
                    lineItems = undefined,
                    $rootScope = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function (_RevocationModificationStepHandler_, _RemediationSummary_, remediationTestData, _$rootScope_) {
                    RevocationModificationStepHandler = _RevocationModificationStepHandler_;
                    lineItems = new _RemediationSummary_(remediationTestData.REMEDIATION_ADVICE_RESULT.summary).remediationDetails;
                    $rootScope = _$rootScope_;
                }));

                describe('constructor', function () {
                    it('throws without lineItems', function () {
                        expect(function () {
                            new RevocationModificationStepHandler();
                        }).toThrow();
                    });

                    it('intializes line item groups', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems);
                        expect(stepHandler.lineItemGroups).toBeDefined();
                        expect(stepHandler.lineItemGroups.length).toEqual(1);
                        expect(stepHandler.lineItemGroups[0].application).toEqual(lineItems[0].application);
                        expect(stepHandler.lineItemGroups[0].nativeIdentity).toEqual(lineItems[0].nativeIdentity);
                        expect(stepHandler.lineItemGroups[0].account).toEqual(lineItems[0].account);
                        expect(stepHandler.lineItemGroups[0].attribute).toEqual(lineItems[0].attribute);
                        expect(stepHandler.lineItemGroups[0].items[0]).toEqual(lineItems[0]);
                    });

                    it('sets the new value and operation on matching line items from existing line items', function () {
                        var existingItems = angular.copy(lineItems);
                        existingItems[0].newValue = 'asdfasdfasdfadsfa';
                        existingItems[0].newOperation = 'Remove';
                        var stepHandler = new RevocationModificationStepHandler(lineItems, existingItems),
                            item = stepHandler.lineItemGroups[0].items[0];
                        expect(item.newValue).toEqual(existingItems[0].newValue);
                        expect(item.newOperation).toEqual(existingItems[0].newOperation);
                    });
                });

                describe('save()', function () {
                    it('resolves with the line items as remediationDetails', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems);
                        stepHandler.lineItemGroups[0].items[0].newValue = 'whatever';
                        var result = undefined;

                        stepHandler.save().then(function (stepResult) {
                            result = stepResult;
                        });
                        $rootScope.$apply();
                        expect(result).toBeDefined();
                        expect(result.remediationDetails).toEqual([stepHandler.lineItemGroups[0].items[0]]);
                    });

                    it('converts suggest object back to simple string for newValue', function () {
                        it('removes newValue from line items if operation is remove', function () {
                            var stepHandler = new RevocationModificationStepHandler(lineItems);
                            stepHandler.lineItemGroups[0].items[0].newValue = {
                                name: 'suggestName',
                                displayName: 'Some Attribute Name'
                            };

                            var result = undefined;

                            stepHandler.save().then(function (stepResult) {
                                result = stepResult;
                            });
                            $rootScope.$apply();
                            expect(result).toBeDefined();
                            expect(result.remediationDetails[0].newValue).toEqual('suggestName');
                        });
                    });
                });

                describe('isSaveDisabled()', function () {
                    it('returns true if any line item has Set operation with no value', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems);
                        delete stepHandler.lineItemGroups[0].items[0].newValue;
                        expect(stepHandler.isSaveDisabled()).toEqual(true);
                    });

                    it('returns false if all items have values', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems);
                        stepHandler.lineItemGroups[0].items[0].newValue = 'blah';
                        expect(stepHandler.isSaveDisabled()).toEqual(false);
                    });
                });

                describe('isManagedAttributeSuggest()', function () {
                    it('returns false if line item is not select', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems),
                            lineItem = stepHandler.lineItemGroups[0].items[0];
                        spyOn(lineItem, 'isSelect').and.returnValue(false);
                        spyOn(lineItem, 'isAttribute').and.returnValue(true);
                        expect(stepHandler.isLinkAttributeSuggest(lineItem)).toEqual(false);
                    });

                    it('returns false if not an attribute', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems),
                            lineItem = stepHandler.lineItemGroups[0].items[0];
                        spyOn(lineItem, 'isSelect').and.returnValue(true);
                        spyOn(lineItem, 'isAttribute').and.returnValue(false);
                        expect(stepHandler.isManagedAttributeSuggest(lineItem)).toEqual(false);
                    });

                    it('returns false if useLinkAttributeValueForRevocationModification is true', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems, undefined, true),
                            lineItem = stepHandler.lineItemGroups[0].items[0];
                        spyOn(lineItem, 'isSelect').and.returnValue(true);
                        spyOn(lineItem, 'isAttribute').and.returnValue(true);
                        expect(stepHandler.isManagedAttributeSuggest(lineItem)).toEqual(false);
                    });

                    it('returns true if attribute with select', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems),
                            lineItem = stepHandler.lineItemGroups[0].items[0];
                        spyOn(lineItem, 'isSelect').and.returnValue(true);
                        spyOn(lineItem, 'isAttribute').and.returnValue(true);
                        expect(stepHandler.isManagedAttributeSuggest(lineItem)).toEqual(true);
                    });
                });

                describe('isLinkAttributeSuggest()', function () {
                    it('returns false if line item is not select', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems),
                            lineItem = stepHandler.lineItemGroups[0].items[0];
                        spyOn(lineItem, 'isSelect').and.returnValue(false);
                        spyOn(lineItem, 'isPermission').and.returnValue(true);
                        expect(stepHandler.isLinkAttributeSuggest(lineItem)).toEqual(false);
                    });

                    it('returns false if line item is attribute', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems),
                            lineItem = stepHandler.lineItemGroups[0].items[0];
                        spyOn(lineItem, 'isSelect').and.returnValue(true);
                        spyOn(lineItem, 'isPermission').and.returnValue(false);
                        expect(stepHandler.isLinkAttributeSuggest(lineItem)).toEqual(false);
                    });

                    it('returns true if line item is permission', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems),
                            lineItem = stepHandler.lineItemGroups[0].items[0];
                        spyOn(lineItem, 'isSelect').and.returnValue(true);
                        spyOn(lineItem, 'isPermission').and.returnValue(true);
                        expect(stepHandler.isLinkAttributeSuggest(lineItem)).toEqual(true);
                    });

                    it('returns true if useLinkAttributeValueForRevocationModification is true', function () {
                        var stepHandler = new RevocationModificationStepHandler(lineItems, undefined, true),
                            lineItem = stepHandler.lineItemGroups[0].items[0];
                        spyOn(lineItem, 'isSelect').and.returnValue(true);
                        spyOn(lineItem, 'isPermission').and.returnValue(false);
                        expect(stepHandler.isLinkAttributeSuggest(lineItem)).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9SZXZvY2F0aW9uTW9kaWZpY2F0aW9uU3RlcEhhbmRsZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsd0NBQXdDLDBCQUEwQixVQUFVLFNBQVM7O0lBRTdIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxxQ0FBcUM7WUFDM0Ysb0JBQW9CLG9DQUFvQztXQUN6RCxVQUFVLHNCQUFzQjtRQUNuQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMscUNBQXFDLFlBQU07Z0JBQ2hELElBQUksb0NBQWlDO29CQUFFLFlBQVM7b0JBQUUsYUFBVTs7Z0JBRTVELFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLHFDQUFxQyxzQkFBc0IscUJBQzNELGNBQWlCO29CQUNoQyxvQ0FBb0M7b0JBQ3BDLFlBQ0ksSUFBSSxxQkFBcUIsb0JBQW9CLDBCQUEwQixTQUFTO29CQUNwRixhQUFhOzs7Z0JBR2pCLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLDRCQUE0QixZQUFNO3dCQUNqQyxPQUFPLFlBQU07NEJBQUUsSUFBSTsyQkFBd0M7OztvQkFHL0QsR0FBRywrQkFBK0IsWUFBTTt3QkFDcEMsSUFBSSxjQUFjLElBQUksa0NBQWtDO3dCQUN4RCxPQUFPLFlBQVksZ0JBQWdCO3dCQUNuQyxPQUFPLFlBQVksZUFBZSxRQUFRLFFBQVE7d0JBQ2xELE9BQU8sWUFBWSxlQUFlLEdBQUcsYUFBYSxRQUFRLFVBQVUsR0FBRzt3QkFDdkUsT0FBTyxZQUFZLGVBQWUsR0FBRyxnQkFBZ0IsUUFBUSxVQUFVLEdBQUc7d0JBQzFFLE9BQU8sWUFBWSxlQUFlLEdBQUcsU0FBUyxRQUFRLFVBQVUsR0FBRzt3QkFDbkUsT0FBTyxZQUFZLGVBQWUsR0FBRyxXQUFXLFFBQVEsVUFBVSxHQUFHO3dCQUNyRSxPQUFPLFlBQVksZUFBZSxHQUFH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LE9BQU8sWUFBWSwwQkFBMEIsV0FBVyxRQUFROzs7O2dCQUl4RSxTQUFTLDRCQUE0QixZQUFNO29CQUN2QyxHQUFHLDRDQUE0QyxZQUFNO3dCQUNqRCxJQUFJLGNBQWMsSUFBSSxrQ0FBa0M7NEJBQ3BELFdBQVcsWUFBWSxlQUFlLEdBQUcsTUFBTTt3QkFDbkQsTUFBTSxVQUFVLFlBQVksSUFBSSxZQUFZO3dCQUM1QyxNQUFNLFVBQVUsZ0JBQWdCLElBQUksWUFBWTt3QkFDaEQsT0FBTyxZQUFZLHVCQUF1QixXQUFXLFFBQVE7OztvQkFHakUsR0FBRywyQ0FBMkMsWUFBTTt3QkFDaEQsSUFBSSxjQUFjLElBQUksa0NBQWtDOzRCQUNwRCxXQUFXLFlBQVksZUFBZSxHQUFHLE1BQU07d0JBQ25ELE1BQU0sVUFBVSxZQUFZLElBQUksWUFBWTt3QkFDNUMsTUFBTSxVQUFVLGdCQUFnQixJQUFJLFlBQVk7d0JBQ2hELE9BQU8sWUFBWSx1QkFBdUIsV0FBVyxRQUFROzs7b0JBR2pFLEdBQUcsMkNBQTJDLFlBQU07d0JBQ2hELElBQUksY0FBYyxJQUFJLGtDQUFrQzs0QkFDcEQsV0FBVyxZQUFZLGVBQWUsR0FBRyxNQUFNO3dCQUNuRCxNQUFNLFVBQVUsWUFBWSxJQUFJLFlBQVk7d0JBQzVDLE1BQU0sVUFBVSxnQkFBZ0IsSUFBSSxZQUFZO3dCQUNoRCxPQUFPLFlBQVksdUJBQXVCLFdBQVcsUUFBUTs7O29CQUdqRSxHQUFHLDBFQUEwRSxZQUFNO3dCQUMvRSxJQUFJLGNBQWMsSUFBSSxrQ0FBa0MsV0FBVyxXQUFXOzRCQUMxRSxXQUFXLFlBQVksZUFBZSxHQUFHLE1BQU07d0JBQ25ELE1BQU0sVUFBVSxZQUFZLElBQUksWUFBWTt3QkFDNUMsTUFBTSxVQUFVLGdCQUFnQixJQUFJLFlBQVk7d0JBQ2hELE9BQU8sWUFBWSx1QkFBdUIsV0FBVyxRQUFROzs7Ozs7R0FhdEUiLCJmaWxlIjoiY29tbW9uL3JlbWVkaWF0aW9uL1Jldm9jYXRpb25Nb2RpZmljYXRpb25TdGVwSGFuZGxlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCByZW1lZGlhdGlvbk1vZHVsZSBmcm9tICdjb21tb24vcmVtZWRpYXRpb24vUmVtZWRpYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICcuL1JlbWVkaWF0aW9uVGVzdERhdGEnO1xuXG5kZXNjcmliZSgnUmV2b2NhdGlvbk1vZGlmaWNhdGlvblN0ZXBIYW5kbGVyJywgKCkgPT4ge1xuICAgIGxldCBSZXZvY2F0aW9uTW9kaWZpY2F0aW9uU3RlcEhhbmRsZXIsIGxpbmVJdGVtcywgJHJvb3RTY29wZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlbWVkaWF0aW9uTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX1Jldm9jYXRpb25Nb2RpZmljYXRpb25TdGVwSGFuZGxlcl8sIF9SZW1lZGlhdGlvblN1bW1hcnlfLCByZW1lZGlhdGlvblRlc3REYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICBfJHJvb3RTY29wZV8pID0+IHtcbiAgICAgICAgUmV2b2NhdGlvbk1vZGlmaWNhdGlvblN0ZXBIYW5kbGVyID0gX1Jldm9jYXRpb25Nb2RpZmljYXRpb25TdGVwSGFuZGxlcl87XG4gICAgICAgIGxpbmVJdGVtcyA9XG4gICAgICAgICAgICBuZXcgX1JlbWVkaWF0aW9uU3VtbWFyeV8ocmVtZWRpYXRpb25UZXN0RGF0YS5SRU1FRElBVElPTl9BRFZJQ0VfUkVTVUxULnN1bW1hcnkpLnJlbWVkaWF0aW9uRGV0YWlscztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aG91dCBsaW5lSXRlbXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBuZXcgUmV2b2NhdGlvbk1vZGlmaWNhdGlvblN0ZXBIYW5kbGVyKCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ludGlhbGl6ZXMgbGluZSBpdGVtIGdyb3VwcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGVwSGFuZGxlciA9IG5ldyBSZXZvY2F0aW9uTW9kaWZpY2F0aW9uU3RlcEhhbmRsZXIobGluZUl0ZW1zKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5saW5lSXRlbUdyb3VwcykudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5saW5lSXRlbUdyb3Vwcy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIubGluZUl0ZW1Hcm91cHNbMF0uYXBwbGljYXRpb24pLnRvRXF1YWwobGluZUl0ZW1zWzBdLmFwcGxpY2F0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5saW5lSXRlbUdyb3Vwc1swXS5uYXRpdmVJZGVudGl0eSkudG9FcXVhbChsaW5lSXRlbXNbMF0ubmF0aXZlSWRlbnRpdHkpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmxpbmVJdGVtR3JvdXBzWzBdLmFjY291bnQpLnRvRXF1YWwobGluZUl0ZW1zWzBdLmFjY291bnQpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmxpbmVJdGVtR3JvdXBzWzBdLmF0dHJpYnV0ZSkudG9FcXVhbChsaW5lSXRlbXNbMF0uYXR0cmlidXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5saW5lSXRlbUdyb3Vwc1swXS5pdGVtc1swXSkudG9FcXVhbChsaW5lSXRlbXNbMF0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2V0cyB0aGUgbmV3IHZhbHVlIGFuZCBvcGVyYXRpb24gb24gbWF0Y2hpbmcgbGluZSBpdGVtcyBmcm9tIGV4aXN0aW5nIGxpbmUgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdJdGVtcyA9IGFuZ3VsYXIuY29weShsaW5lSXRlbXMpO1xuICAgICAgICAgICAgZXhpc3RpbmdJdGVtc1swXS5uZXdWYWx1ZSA9ICdhc2RmYXNkZmFzZGZhZHNmYSc7XG4gICAgICAgICAgICBleGlzdGluZ0l0ZW1zWzBdLm5ld09wZXJhdGlvbiA9ICdSZW1vdmUnO1xuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IFJldm9jYXRpb25Nb2RpZmljYXRpb25TdGVwSGFuZGxlcihsaW5lSXRlbXMsIGV4aXN0aW5nSXRlbXMpLFxuICAgICAgICAgICAgICAgIGl0ZW0gPSBzdGVwSGFuZGxlci5saW5lSXRlbUdyb3Vwc1swXS5pdGVtc1swXTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLm5ld1ZhbHVlKS50b0VxdWFsKGV4aXN0aW5nSXRlbXNbMF0ubmV3VmFsdWUpO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0ubmV3T3BlcmF0aW9uKS50b0VxdWFsKGV4aXN0aW5nSXRlbXNbMF0ubmV3T3BlcmF0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2F2ZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmVzb2x2ZXMgd2l0aCB0aGUgbGluZSBpdGVtcyBhcyByZW1lZGlhdGlvbkRldGFpbHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RlcEhhbmRsZXIgPSBuZXcgUmV2b2NhdGlvbk1vZGlmaWNhdGlvblN0ZXBIYW5kbGVyKGxpbmVJdGVtcyk7XG4gICAgICAgICAgICBzdGVwSGFuZGxlci5saW5lSXRlbUdyb3Vwc1swXS5pdGVtc1swXS5uZXdWYWx1ZSA9ICd3aGF0ZXZlcic7XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgICBzdGVwSGFuZGxlci5zYXZlKCkudGhlbigoc3RlcFJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHN0ZXBSZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5yZW1lZGlhdGlvbkRldGFpbHMpLnRvRXF1YWwoW3N0ZXBIYW5kbGVyLmxpbmVJdGVtR3JvdXBzWzBdLml0ZW1zWzBdXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjb252ZXJ0cyBzdWdnZXN0IG9iamVjdCBiYWNrIHRvIHNpbXBsZSBzdHJpbmcgZm9yIG5ld1ZhbHVlJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3JlbW92ZXMgbmV3VmFsdWUgZnJvbSBsaW5lIGl0ZW1zIGlmIG9wZXJhdGlvbiBpcyByZW1vdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IFJldm9jYXRpb25Nb2RpZmljYXRpb25TdGVwSGFuZGxlcihsaW5lSXRlbXMpO1xuICAgICAgICAgICAgICAgIHN0ZXBIYW5kbGVyLmxpbmVJdGVtR3JvdXBzWzBdLml0ZW1zWzBdLm5ld1ZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc3VnZ2VzdE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWUgQXR0cmlidXRlIE5hbWUnXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICBzdGVwSGFuZGxlci5zYXZlKCkudGhlbigoc3RlcFJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBzdGVwUmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzdWx0LnJlbWVkaWF0aW9uRGV0YWlsc1swXS5uZXdWYWx1ZSkudG9FcXVhbCgnc3VnZ2VzdE5hbWUnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzU2F2ZURpc2FibGVkKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYW55IGxpbmUgaXRlbSBoYXMgU2V0IG9wZXJhdGlvbiB3aXRoIG5vIHZhbHVlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IFJldm9jYXRpb25Nb2RpZmljYXRpb25TdGVwSGFuZGxlcihsaW5lSXRlbXMpO1xuICAgICAgICAgICAgZGVsZXRlIHN0ZXBIYW5kbGVyLmxpbmVJdGVtR3JvdXBzWzBdLml0ZW1zWzBdLm5ld1ZhbHVlO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzU2F2ZURpc2FibGVkKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGFsbCBpdGVtcyBoYXZlIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGVwSGFuZGxlciA9IG5ldyBSZXZvY2F0aW9uTW9kaWZpY2F0aW9uU3RlcEhhbmRsZXIobGluZUl0ZW1zKTtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVyLmxpbmVJdGVtR3JvdXBzWzBdLml0ZW1zWzBdLm5ld1ZhbHVlID0gJ2JsYWgnO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzU2F2ZURpc2FibGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc01hbmFnZWRBdHRyaWJ1dGVTdWdnZXN0KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGxpbmUgaXRlbSBpcyBub3Qgc2VsZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IFJldm9jYXRpb25Nb2RpZmljYXRpb25TdGVwSGFuZGxlcihsaW5lSXRlbXMpLFxuICAgICAgICAgICAgICAgIGxpbmVJdGVtID0gc3RlcEhhbmRsZXIubGluZUl0ZW1Hcm91cHNbMF0uaXRlbXNbMF07XG4gICAgICAgICAgICBzcHlPbihsaW5lSXRlbSwgJ2lzU2VsZWN0JykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIHNweU9uKGxpbmVJdGVtLCAnaXNBdHRyaWJ1dGUnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuaXNMaW5rQXR0cmlidXRlU3VnZ2VzdChsaW5lSXRlbSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBub3QgYW4gYXR0cmlidXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IFJldm9jYXRpb25Nb2RpZmljYXRpb25TdGVwSGFuZGxlcihsaW5lSXRlbXMpLFxuICAgICAgICAgICAgICAgIGxpbmVJdGVtID0gc3RlcEhhbmRsZXIubGluZUl0ZW1Hcm91cHNbMF0uaXRlbXNbMF07XG4gICAgICAgICAgICBzcHlPbihsaW5lSXRlbSwgJ2lzU2VsZWN0JykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgc3B5T24obGluZUl0ZW0sICdpc0F0dHJpYnV0ZScpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuaXNNYW5hZ2VkQXR0cmlidXRlU3VnZ2VzdChsaW5lSXRlbSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB1c2VMaW5rQXR0cmlidXRlVmFsdWVGb3JSZXZvY2F0aW9uTW9kaWZpY2F0aW9uIGlzIHRydWUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RlcEhhbmRsZXIgPSBuZXcgUmV2b2NhdGlvbk1vZGlmaWNhdGlvblN0ZXBIYW5kbGVyKGxpbmVJdGVtcywgdW5kZWZpbmVkLCB0cnVlKSxcbiAgICAgICAgICAgICAgICBsaW5lSXRlbSA9IHN0ZXBIYW5kbGVyLmxpbmVJdGVtR3JvdXBzWzBdLml0ZW1zWzBdO1xuICAgICAgICAgICAgc3B5T24obGluZUl0ZW0sICdpc1NlbGVjdCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIHNweU9uKGxpbmVJdGVtLCAnaXNBdHRyaWJ1dGUnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuaXNNYW5hZ2VkQXR0cmlidXRlU3VnZ2VzdChsaW5lSXRlbSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGF0dHJpYnV0ZSB3aXRoIHNlbGVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGVwSGFuZGxlciA9IG5ldyBSZXZvY2F0aW9uTW9kaWZpY2F0aW9uU3RlcEhhbmRsZXIobGluZUl0ZW1zKSxcbiAgICAgICAgICAgICAgICBsaW5lSXRlbSA9IHN0ZXBIYW5kbGVyLmxpbmVJdGVtR3JvdXBzWzBdLml0ZW1zWzBdO1xuICAgICAgICAgICAgc3B5T24obGluZUl0ZW0sICdpc1NlbGVjdCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIHNweU9uKGxpbmVJdGVtLCAnaXNBdHRyaWJ1dGUnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuaXNNYW5hZ2VkQXR0cmlidXRlU3VnZ2VzdChsaW5lSXRlbSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzTGlua0F0dHJpYnV0ZVN1Z2dlc3QoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbGluZSBpdGVtIGlzIG5vdCBzZWxlY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RlcEhhbmRsZXIgPSBuZXcgUmV2b2NhdGlvbk1vZGlmaWNhdGlvblN0ZXBIYW5kbGVyKGxpbmVJdGVtcyksXG4gICAgICAgICAgICAgICAgbGluZUl0ZW0gPSBzdGVwSGFuZGxlci5saW5lSXRlbUdyb3Vwc1swXS5pdGVtc1swXTtcbiAgICAgICAgICAgIHNweU9uKGxpbmVJdGVtLCAnaXNTZWxlY3QnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgc3B5T24obGluZUl0ZW0sICdpc1Blcm1pc3Npb24nKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuaXNMaW5rQXR0cmlidXRlU3VnZ2VzdChsaW5lSXRlbSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBsaW5lIGl0ZW0gaXMgYXR0cmlidXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IFJldm9jYXRpb25Nb2RpZmljYXRpb25TdGVwSGFuZGxlcihsaW5lSXRlbXMpLFxuICAgICAgICAgICAgICAgIGxpbmVJdGVtID0gc3RlcEhhbmRsZXIubGluZUl0ZW1Hcm91cHNbMF0uaXRlbXNbMF07XG4gICAgICAgICAgICBzcHlPbihsaW5lSXRlbSwgJ2lzU2VsZWN0JykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgc3B5T24obGluZUl0ZW0sICdpc1Blcm1pc3Npb24nKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzTGlua0F0dHJpYnV0ZVN1Z2dlc3QobGluZUl0ZW0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBsaW5lIGl0ZW0gaXMgcGVybWlzc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGVwSGFuZGxlciA9IG5ldyBSZXZvY2F0aW9uTW9kaWZpY2F0aW9uU3RlcEhhbmRsZXIobGluZUl0ZW1zKSxcbiAgICAgICAgICAgICAgICBsaW5lSXRlbSA9IHN0ZXBIYW5kbGVyLmxpbmVJdGVtR3JvdXBzWzBdLml0ZW1zWzBdO1xuICAgICAgICAgICAgc3B5T24obGluZUl0ZW0sICdpc1NlbGVjdCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIHNweU9uKGxpbmVJdGVtLCAnaXNQZXJtaXNzaW9uJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzTGlua0F0dHJpYnV0ZVN1Z2dlc3QobGluZUl0ZW0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHVzZUxpbmtBdHRyaWJ1dGVWYWx1ZUZvclJldm9jYXRpb25Nb2RpZmljYXRpb24gaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGVwSGFuZGxlciA9IG5ldyBSZXZvY2F0aW9uTW9kaWZpY2F0aW9uU3RlcEhhbmRsZXIobGluZUl0ZW1zLCB1bmRlZmluZWQsIHRydWUpLFxuICAgICAgICAgICAgICAgIGxpbmVJdGVtID0gc3RlcEhhbmRsZXIubGluZUl0ZW1Hcm91cHNbMF0uaXRlbXNbMF07XG4gICAgICAgICAgICBzcHlPbihsaW5lSXRlbSwgJ2lzU2VsZWN0JykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgc3B5T24obGluZUl0ZW0sICdpc1Blcm1pc3Npb24nKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzTGlua0F0dHJpYnV0ZVN1Z2dlc3QobGluZUl0ZW0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
