System.register(['home/widget/certifications/CertificationsWidgetModule', 'home/widget/certifications/AbstractCertificationsWidgetCtrl'], function (_export) {

    /**
     * Stub a controller to test the abstract certifications widget controller.
     */
    'use strict';

    TestCertificationsWidgetCtrl.$inject = ["$scope", "spTranslateFilter", "spDateService"];
    var certWidgetModule, AbstractCertificationsWidgetCtrl;
    function TestCertificationsWidgetCtrl($scope, spTranslateFilter, spDateService) {

        TestCertificationsWidgetCtrl._super.call(this, $scope, spTranslateFilter, spDateService);
    }

    return {
        setters: [function (_homeWidgetCertificationsCertificationsWidgetModule) {
            certWidgetModule = _homeWidgetCertificationsCertificationsWidgetModule['default'];
        }, function (_homeWidgetCertificationsAbstractCertificationsWidgetCtrl) {
            AbstractCertificationsWidgetCtrl = _homeWidgetCertificationsAbstractCertificationsWidgetCtrl['default'];
        }],
        execute: function () {
            SailPoint.extend(TestCertificationsWidgetCtrl, AbstractCertificationsWidgetCtrl);

            angular.module(certWidgetModule).controller('TestCertificationWidgetCtrl', TestCertificationsWidgetCtrl);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L2NlcnRpZmljYXRpb25zL1Rlc3RDZXJ0aWZpY2F0aW9uc1dpZGdldEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMseURBQXlELGdFQUFnRSxVQUFVLFNBQVM7Ozs7O0lBQTdKOzs7SUFPSSxJQUFJLGtCQUFrQjtJQUMxQixTQUFTLDZCQUE2QixRQUFRLG1CQUFtQixlQUFlOztRQUU1RSw2QkFBNkIsT0FBTyxLQUFLLE1BQU0sUUFBUSxtQkFBbUI7OztJQUcxRSxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUscURBQXFEO1lBQ3JFLG1CQUFtQixvREFBb0Q7V0FDeEUsVUFBVSwyREFBMkQ7WUFDcEUsbUNBQW1DLDBEQUEwRDs7UUFFakcsU0FBUyxZQUFZO1lBTDdCLFVBQVUsT0FBTyw4QkFBOEI7O1lBRS9DLFFBQVEsT0FBTyxrQkFDWCxXQUFXLCtCQUErQjs7O0dBUTNDIiwiZmlsZSI6ImhvbWUvd2lkZ2V0L2NlcnRpZmljYXRpb25zL1Rlc3RDZXJ0aWZpY2F0aW9uc1dpZGdldEN0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBjZXJ0V2lkZ2V0TW9kdWxlIGZyb20gJ2hvbWUvd2lkZ2V0L2NlcnRpZmljYXRpb25zL0NlcnRpZmljYXRpb25zV2lkZ2V0TW9kdWxlJztcbmltcG9ydCBBYnN0cmFjdENlcnRpZmljYXRpb25zV2lkZ2V0Q3RybCBmcm9tICdob21lL3dpZGdldC9jZXJ0aWZpY2F0aW9ucy9BYnN0cmFjdENlcnRpZmljYXRpb25zV2lkZ2V0Q3RybCc7XG5cbi8qKlxuICogU3R1YiBhIGNvbnRyb2xsZXIgdG8gdGVzdCB0aGUgYWJzdHJhY3QgY2VydGlmaWNhdGlvbnMgd2lkZ2V0IGNvbnRyb2xsZXIuXG4gKi9cbmZ1bmN0aW9uIFRlc3RDZXJ0aWZpY2F0aW9uc1dpZGdldEN0cmwoJHNjb3BlLCBzcFRyYW5zbGF0ZUZpbHRlciwgc3BEYXRlU2VydmljZSkge1xuXG4gICAgVGVzdENlcnRpZmljYXRpb25zV2lkZ2V0Q3RybC5fc3VwZXIuY2FsbCh0aGlzLCAkc2NvcGUsIHNwVHJhbnNsYXRlRmlsdGVyLCBzcERhdGVTZXJ2aWNlKTtcblxufVxuXG5TYWlsUG9pbnQuZXh0ZW5kKFRlc3RDZXJ0aWZpY2F0aW9uc1dpZGdldEN0cmwsIEFic3RyYWN0Q2VydGlmaWNhdGlvbnNXaWRnZXRDdHJsKTtcblxuYW5ndWxhci5tb2R1bGUoY2VydFdpZGdldE1vZHVsZSkuXG4gICAgY29udHJvbGxlcignVGVzdENlcnRpZmljYXRpb25XaWRnZXRDdHJsJywgVGVzdENlcnRpZmljYXRpb25zV2lkZ2V0Q3RybCk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
