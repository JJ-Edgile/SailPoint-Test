System.register(['test/js/TestInitializer', 'workitem/WorkItemModule'], function (_export) {

    /**
     * Violation Details Dialog Controller tests
     */

    'use strict';

    var workItemModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }],
        execute: function () {
            describe('ViolationDetailDialogCtrl', function () {
                var violationService, dialogController;

                // Let the tests know we'll use the workitem module.
                beforeEach(module(workItemModule));

                describe('isViolationSummaryDisplayable', function () {
                    beforeEach(inject(function (_$controller_, _violationService_) {
                        violationService = _violationService_;
                        dialogController = _$controller_('ViolationDetailDialogCtrl', {
                            violationDetails: { violationSummary: 'foo bar', ruleDescription: 'foo bar' }
                        });
                    }));

                    it('should be false when violation summary and rule description are the same', function () {
                        expect(dialogController.isViolationSummaryDisplayable()).toBeFalsy();
                    });
                });

                describe('isViolationSummaryDisplayable', function () {
                    beforeEach(inject(function (_$controller_, _violationService_) {
                        violationService = _violationService_;

                        dialogController = _$controller_('ViolationDetailDialogCtrl', {
                            violationDetails: { violationSummary: 'foo bar', ruleDescription: 'foo bazz' }
                        });
                    }));

                    it('should be true when violation summary and rule description are different', function () {
                        expect(dialogController.isViolationSummaryDisplayable()).toBeTruthy();
                    });
                });

                describe('isViolationSummaryDisplayable', function () {
                    beforeEach(inject(function (_$controller_, _violationService_) {
                        violationService = _violationService_;

                        dialogController = _$controller_('ViolationDetailDialogCtrl', {
                            violationDetails: {}
                        });
                    }));

                    it('should be false when violation summary is undefined', function () {
                        expect(dialogController.isViolationSummaryDisplayable()).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1Zpb2xhdGlvbkRldGFpbERpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLFVBQVUsU0FBUzs7Ozs7O0lBQTNGOztJQVFJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZO1lBSjdCLFNBQVMsNkJBQTZCLFlBQVc7Z0JBQzdDLElBQUksa0JBQWtCOzs7Z0JBR3RCLFdBQVcsT0FBTzs7Z0JBRWxCLFNBQVMsaUNBQWlDLFlBQVc7b0JBQ2pELFdBQVcsT0FBTyxVQUFTLGVBQWUsb0JBQW9CO3dCQUMxRCxtQkFBbUI7d0JBQ25CLG1CQUFtQixjQUFjLDZCQUE2Qjs0QkFDMUQsa0JBQWtCLEVBQUMsa0JBQWtCLFdBQVcsaUJBQWlCOzs7O29CQUl6RSxHQUFHLDRFQUE0RSxZQUFXO3dCQUN0RixPQUFPLGlCQUFpQixpQ0FBaUM7Ozs7Z0JBSWpFLFNBQVMsaUNBQWlDLFlBQVc7b0JBQ2pELFdBQVcsT0FBTyxVQUFTLGVBQWUsb0JBQW9CO3dCQUMxRCxtQkFBbUI7O3dCQUVuQixtQkFBbUIsY0FBYyw2QkFBNkI7NEJBQzFELGtCQUFrQixFQUFDLGtCQUFrQixXQUFXLGlCQUFpQjs7OztvQkFJekUsR0FBRyw0RUFBNEUsWUFBVzt3QkFDdEYsT0FBTyxpQkFBaUIsaUNBQWlDOzs7O2dCQUlqRSxTQUFTLGlDQUFpQyxZQUFXO29CQUNqRCxXQUFXLE9BQU8sVUFBUyxlQUFlLG9CQUFvQjt3QkFDMUQsbUJBQW1COzt3QkFFbkIsbUJBQW1CLGNBQWMsNkJBQTZCOzRCQUMxRCxrQkFBa0I7Ozs7b0JBSTFCLEdBQUcsdURBQXVELFlBQVc7d0JBQ2pFLE9BQU8saUJBQWlCLGlDQUFpQzs7Ozs7O0dBV2xFIiwiZmlsZSI6IndvcmtpdGVtL1Zpb2xhdGlvbkRldGFpbERpYWxvZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgd29ya0l0ZW1Nb2R1bGUgZnJvbSAnd29ya2l0ZW0vV29ya0l0ZW1Nb2R1bGUnO1xuXG4vKipcbiAqIFZpb2xhdGlvbiBEZXRhaWxzIERpYWxvZyBDb250cm9sbGVyIHRlc3RzXG4gKi9cblxuZGVzY3JpYmUoJ1Zpb2xhdGlvbkRldGFpbERpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmlvbGF0aW9uU2VydmljZSwgZGlhbG9nQ29udHJvbGxlcjtcblxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIHdvcmtpdGVtIG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3b3JrSXRlbU1vZHVsZSkpO1xuXG4gICAgZGVzY3JpYmUoJ2lzVmlvbGF0aW9uU3VtbWFyeURpc3BsYXlhYmxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF92aW9sYXRpb25TZXJ2aWNlXykge1xuICAgICAgICAgICAgdmlvbGF0aW9uU2VydmljZSA9IF92aW9sYXRpb25TZXJ2aWNlXztcbiAgICAgICAgICAgIGRpYWxvZ0NvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfKCdWaW9sYXRpb25EZXRhaWxEaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIHZpb2xhdGlvbkRldGFpbHM6IHt2aW9sYXRpb25TdW1tYXJ5OiAnZm9vIGJhcicsIHJ1bGVEZXNjcmlwdGlvbjogJ2ZvbyBiYXInfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIGZhbHNlIHdoZW4gdmlvbGF0aW9uIHN1bW1hcnkgYW5kIHJ1bGUgZGVzY3JpcHRpb24gYXJlIHRoZSBzYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZGlhbG9nQ29udHJvbGxlci5pc1Zpb2xhdGlvblN1bW1hcnlEaXNwbGF5YWJsZSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNWaW9sYXRpb25TdW1tYXJ5RGlzcGxheWFibGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgX3Zpb2xhdGlvblNlcnZpY2VfKSB7XG4gICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlID0gX3Zpb2xhdGlvblNlcnZpY2VfO1xuXG4gICAgICAgICAgICBkaWFsb2dDb250cm9sbGVyID0gXyRjb250cm9sbGVyXygnVmlvbGF0aW9uRGV0YWlsRGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgICAgICB2aW9sYXRpb25EZXRhaWxzOiB7dmlvbGF0aW9uU3VtbWFyeTogJ2ZvbyBiYXInLCBydWxlRGVzY3JpcHRpb246ICdmb28gYmF6eid9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgdHJ1ZSB3aGVuIHZpb2xhdGlvbiBzdW1tYXJ5IGFuZCBydWxlIGRlc2NyaXB0aW9uIGFyZSBkaWZmZXJlbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChkaWFsb2dDb250cm9sbGVyLmlzVmlvbGF0aW9uU3VtbWFyeURpc3BsYXlhYmxlKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNWaW9sYXRpb25TdW1tYXJ5RGlzcGxheWFibGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgX3Zpb2xhdGlvblNlcnZpY2VfKSB7XG4gICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlID0gX3Zpb2xhdGlvblNlcnZpY2VfO1xuXG4gICAgICAgICAgICBkaWFsb2dDb250cm9sbGVyID0gXyRjb250cm9sbGVyXygnVmlvbGF0aW9uRGV0YWlsRGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgICAgICB2aW9sYXRpb25EZXRhaWxzOiB7fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIGZhbHNlIHdoZW4gdmlvbGF0aW9uIHN1bW1hcnkgaXMgdW5kZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZGlhbG9nQ29udHJvbGxlci5pc1Zpb2xhdGlvblN1bW1hcnlEaXNwbGF5YWJsZSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
