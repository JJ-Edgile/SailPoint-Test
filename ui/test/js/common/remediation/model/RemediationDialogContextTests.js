System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }],
        execute: function () {

            describe('RemediationDialogContext', function () {
                var RemediationDialogContext = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function (_RemediationDialogContext_) {
                    RemediationDialogContext = _RemediationDialogContext_;
                }));

                describe('constructor', function () {
                    it('sets defaults with no data', function () {
                        var context = new RemediationDialogContext();
                        expect(context.itemDisplayName).not.toBeDefined();
                        expect(context.existingResult).not.toBeDefined();
                        expect(context.useLinkAttributeValueForRevocationModification).toEqual(false);
                        expect(context.readOnly).toEqual(false);
                    });

                    it('initializes data', function () {
                        var data = {
                            itemDisplayName: 'thing1',
                            existingResult: {},
                            useLinkAttributeValueForRevocationModification: true,
                            readOnly: true
                        },
                            context = new RemediationDialogContext(data);
                        expect(context.itemDisplayName).toEqual(data.itemDisplayName);
                        expect(context.existingResult).toEqual(data.existingResult);
                        expect(context.useLinkAttributeValueForRevocationModification).toEqual(data.useLinkAttributeValueForRevocationModification);
                        expect(context.readOnly).toEqual(data.readOnly);
                    });
                });

                describe('getRemediationSummary()', function () {
                    it('throws if not implemented', function () {
                        var context = new RemediationDialogContext();
                        expect(function () {
                            return context.getRemediationSummary();
                        }).toThrow();
                    });
                });

                describe('setupSoDRole()', function () {
                    it('returns false', function () {
                        var context = new RemediationDialogContext();
                        expect(context.setupSoDRole()).toEqual(false);
                    });
                });

                describe('isSoDRoleEditable()', function () {
                    it('returns true', function () {
                        var context = new RemediationDialogContext();
                        expect(context.isSoDRoleEditable()).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUNBQXlDLFVBQVUsU0FBUzs7O0lBR3BHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxxQ0FBcUM7WUFDM0Ysb0JBQW9CLG9DQUFvQzs7UUFFNUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLDRCQUE0QixZQUFNO2dCQUN2QyxJQUFJLDJCQUF3Qjs7Z0JBRTVCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLDRCQUErQjtvQkFDOUMsMkJBQTJCOzs7Z0JBRy9CLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLDhCQUE4QixZQUFNO3dCQUNuQyxJQUFJLFVBQVUsSUFBSTt3QkFDbEIsT0FBTyxRQUFRLGlCQUFpQixJQUFJO3dCQUNwQyxPQUFPLFFBQVEsZ0JBQWdCLElBQUk7d0JBQ25DLE9BQU8sUUFBUSxnREFBZ0QsUUFBUTt3QkFDdkUsT0FBTyxRQUFRLFVBQVUsUUFBUTs7O29CQUdyQyxHQUFHLG9CQUFvQixZQUFNO3dCQUN6QixJQUFJLE9BQU87NEJBQ1AsaUJBQWlCOzRCQUNqQixnQkFBZ0I7NEJBQ2hCLGdEQUFnRDs0QkFDaEQsVUFBVTs7NEJBQ1gsVUFBVSxJQUFJLHlCQUF5Qjt3QkFDMUMsT0FBTyxRQUFRLGlCQUFpQixRQUFRLEtBQUs7d0JBQzdDLE9BQU8sUUFBUSxnQkFBZ0IsUUFBUSxLQUFLO3dCQUM1QyxPQUFPLFFBQVEsZ0RBQ1YsUUFBUSxLQUFLO3dCQUNsQixPQUFPLFFBQVEsVUFBVSxRQUFRLEtBQUs7Ozs7Z0JBSTlDLFNBQVMsMkJBQTJCLFlBQU07b0JBQ3RDLEdBQUcsNkJBQTZCLFlBQU07d0JBQ2xDLElBQUksVUFBVSxJQUFJO3dCQUNsQixPQUFPLFlBQUE7NEJBUVMsT0FSSCxRQUFROzJCQUF5Qjs7OztnQkFJdEQsU0FBUyxrQkFBa0IsWUFBTTtvQkFDN0IsR0FBRyxpQkFBaUIsWUFBTTt3QkFDdEIsSUFBSSxVQUFVLElBQUk7d0JBQ2xCLE9BQU8sUUFBUSxnQkFBZ0IsUUFBUTs7OztnQkFJL0MsU0FBUyx1QkFBdUIsWUFBTTtvQkFDbEMsR0FBRyxnQkFBZ0IsWUFBTTt3QkFDckIsSUFBSSxVQUFVLElBQUk7d0JBQ2xCLE9BQU8sUUFBUSxxQkFBcUIsUUFBUTs7Ozs7O0dBZXJEIiwiZmlsZSI6ImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCByZW1lZGlhdGlvbk1vZHVsZSBmcm9tICdjb21tb24vcmVtZWRpYXRpb24vUmVtZWRpYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0JywgKCkgPT4ge1xuICAgIGxldCBSZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQ7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShyZW1lZGlhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHRfKSA9PiB7XG4gICAgICAgIFJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCA9IF9SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHRfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcbiAgICAgICAgaXQoJ3NldHMgZGVmYXVsdHMgd2l0aCBubyBkYXRhJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBuZXcgUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0KCk7XG4gICAgICAgICAgICBleHBlY3QoY29udGV4dC5pdGVtRGlzcGxheU5hbWUpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRleHQuZXhpc3RpbmdSZXN1bHQpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRleHQudXNlTGlua0F0dHJpYnV0ZVZhbHVlRm9yUmV2b2NhdGlvbk1vZGlmaWNhdGlvbikudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoY29udGV4dC5yZWFkT25seSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpbml0aWFsaXplcyBkYXRhJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgaXRlbURpc3BsYXlOYW1lOiAndGhpbmcxJyxcbiAgICAgICAgICAgICAgICBleGlzdGluZ1Jlc3VsdDoge30sXG4gICAgICAgICAgICAgICAgdXNlTGlua0F0dHJpYnV0ZVZhbHVlRm9yUmV2b2NhdGlvbk1vZGlmaWNhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZVxuICAgICAgICAgICAgfSwgY29udGV4dCA9IG5ldyBSZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQoZGF0YSk7XG4gICAgICAgICAgICBleHBlY3QoY29udGV4dC5pdGVtRGlzcGxheU5hbWUpLnRvRXF1YWwoZGF0YS5pdGVtRGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRleHQuZXhpc3RpbmdSZXN1bHQpLnRvRXF1YWwoZGF0YS5leGlzdGluZ1Jlc3VsdCk7XG4gICAgICAgICAgICBleHBlY3QoY29udGV4dC51c2VMaW5rQXR0cmlidXRlVmFsdWVGb3JSZXZvY2F0aW9uTW9kaWZpY2F0aW9uKVxuICAgICAgICAgICAgICAgIC50b0VxdWFsKGRhdGEudXNlTGlua0F0dHJpYnV0ZVZhbHVlRm9yUmV2b2NhdGlvbk1vZGlmaWNhdGlvbik7XG4gICAgICAgICAgICBleHBlY3QoY29udGV4dC5yZWFkT25seSkudG9FcXVhbChkYXRhLnJlYWRPbmx5KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UmVtZWRpYXRpb25TdW1tYXJ5KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0aHJvd3MgaWYgbm90IGltcGxlbWVudGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBuZXcgUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0KCk7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY29udGV4dC5nZXRSZW1lZGlhdGlvblN1bW1hcnkoKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZXR1cFNvRFJvbGUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IG5ldyBSZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjb250ZXh0LnNldHVwU29EUm9sZSgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNTb0RSb2xlRWRpdGFibGUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gbmV3IFJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRleHQuaXNTb0RSb2xlRWRpdGFibGUoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
