System.register(['certification/CertificationModule', 'test/js/TestInitializer', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule, testModule;
    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestInitializer) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('spCertificationDecisionColumn', function () {

                var elementDefinition = '<sp-certification-decision-column sp-model="item" />',
                    CertificationItem = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    $controller = undefined,
                    certificationDataService = undefined,
                    certificationService = undefined,
                    testService = undefined,
                    CertificationActionStatus = undefined,
                    CertificationConfig = undefined;

                beforeEach(module(certificationModule, testModule));

                /* jshint maxparams: 9 */
                beforeEach(inject(function (_$rootScope_, _$compile_, _CertificationItem_, _CertificationActionStatus_, _certificationDataService_, _certificationService_, _testService_, _$controller_, _CertificationConfig_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $controller = _$controller_;
                    CertificationItem = _CertificationItem_;
                    CertificationActionStatus = _CertificationActionStatus_;
                    CertificationConfig = _CertificationConfig_;

                    certificationDataService = _certificationDataService_;
                    certificationService = _certificationService_;
                    testService = _testService_;
                }));

                function createElement(item) {
                    var element = angular.element(elementDefinition);
                    $scope.item = item;
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function createCertificationItem(statuses, decisionState) {
                    var decisionStatus = {
                        decisions: []
                    };
                    if (statuses) {
                        statuses.forEach(function (status) {
                            return decisionStatus.decisions.push(new CertificationActionStatus({
                                name: status,
                                status: status,
                                promptKey: status
                            }));
                        });
                    }

                    if (decisionState) {
                        decisionStatus.currentState = new CertificationActionStatus({
                            name: decisionState,
                            status: decisionState,
                            messageKey: decisionState
                        });
                    }

                    return new CertificationItem({
                        id: '1234',
                        decisionStatus: decisionStatus,
                        roleName: 'Role1'
                    });
                }

                it('throws with no spModel specified', function () {
                    expect(function () {
                        return createElement(null);
                    }).toThrow();
                });

                it('shows cert-action-current-decision-state span that shows saved decision', function () {
                    var item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated], CertificationActionStatus.Name.Approved);

                    var approvedElement = createElement(item);
                    var decisionStateSpan = approvedElement.find('span.cert-action-current-decision-state');

                    expect(decisionStateSpan.length).toEqual(1);
                    expect(decisionStateSpan[0].innerText.trim()).toEqual(CertificationActionStatus.Name.Approved);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkRlY2lzaW9uQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMscUNBQXFDLDJCQUEyQix1QkFBdUIsVUFBVSxTQUFTOzs7SUFHdkg7O0lBRUEsSUFBSSxxQkFBcUI7SUFDekIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLG1DQUFtQztZQUNuRCxzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQkFBbUI7WUFDbEUsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxpQ0FBaUMsWUFBVzs7Z0JBRWpELElBQUksb0JBQWlCO29CQUNqQixvQkFBaUI7b0JBQUUsU0FBTTtvQkFBRSxXQUFRO29CQUFFLGNBQVc7b0JBQUUsMkJBQXdCO29CQUMxRSx1QkFBb0I7b0JBQUUsY0FBVztvQkFBRSw0QkFBeUI7b0JBQzVELHNCQUFtQjs7Z0JBRXZCLFdBQVcsT0FBTyxxQkFBcUI7OztnQkFHdkMsV0FBVyxPQUFPLFVBQVMsY0FBYyxZQUFZLHFCQUFxQiw2QkFDL0MsNEJBQTRCLHdCQUM1QixlQUFlLGVBQWUsdUJBQXVCO29CQUM1RSxTQUFTLGFBQWE7b0JBQ3RCLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxvQkFBb0I7b0JBQ3BCLDRCQUE0QjtvQkFDNUIsc0JBQXNCOztvQkFFdEIsMkJBQTJCO29CQUMzQix1QkFBdUI7b0JBQ3ZCLGNBQWM7OztnQkFHbEIsU0FBUyxjQUFjLE1BQU07b0JBQ3pCLElBQUksVUFBVSxRQUFRLFFBQVE7b0JBQzlCLE9BQU8sT0FBTztvQkFDZCxTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFNBQVMsd0JBQXdCLFVBQVUsZUFBZTtvQkFDdEQsSUFBSSxpQkFBaUI7d0JBQ2pCLFdBQVc7O29CQUVmLElBQUksVUFBVTt3QkFDVixTQUFTLFFBQVEsVUFBQyxRQUFNOzRCQWFSLE9BYmEsZUFBZSxVQUFVLEtBQUssSUFBSSwwQkFBMEI7Z0NBQ3JGLE1BQU07Z0NBQ04sUUFBUTtnQ0FDUixXQUFXOzs7OztvQkFJbkIsSUFBSSxlQUFlO3dCQUNmLGVBQWUsZUFBZSxJQUFJLDBCQUEwQjs0QkFDeEQsTUFBTTs0QkFDTixRQUFROzRCQUNSLFlBQVk7Ozs7b0JBSXBCLE9BQU8sSUFBSSxrQkFBa0I7d0JBQ3pCLElBQUk7d0JBQ0osZ0JBQWdCO3dCQUNoQixVQUFVOzs7O2dCQUlsQixHQUFJLG9DQUFvQyxZQUFXO29CQUMvQyxPQUFPLFlBQUE7d0JBZVMsT0FmSCxjQUFjO3VCQUFPOzs7Z0JBR3RDLEdBQUcsMkVBQTJFLFlBQU07b0JBQ2hGLElBQUksT0FBTyx3QkFBd0IsQ0FBQywwQkFBMEIsS0FBSyxVQUMzRCwwQkFBMEIsS0FBSyxhQUNuQywwQkFBMEIsS0FBSzs7b0JBRW5DLElBQUksa0JBQWtCLGNBQWM7b0JBQ3BDLElBQUksb0JBQW9CLGdCQUFnQixLQUFLOztvQkFFN0MsT0FBTyxrQkFBa0IsUUFBUSxRQUFRO29CQUN6QyxPQUFPLGtCQUFrQixHQUFHLFVBQVUsUUFBUSxRQUFRLDBCQUEwQixLQUFLOzs7OztHQW1CMUYiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uRGVjaXNpb25Db2x1bW5EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnc3BDZXJ0aWZpY2F0aW9uRGVjaXNpb25Db2x1bW4nLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBlbGVtZW50RGVmaW5pdGlvbiA9IGA8c3AtY2VydGlmaWNhdGlvbi1kZWNpc2lvbi1jb2x1bW4gc3AtbW9kZWw9XCJpdGVtXCIgLz5gLFxuICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbSwgJHNjb3BlLCAkY29tcGlsZSwgJGNvbnRyb2xsZXIsIGNlcnRpZmljYXRpb25EYXRhU2VydmljZSxcbiAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UsIHRlc3RTZXJ2aWNlLCBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLFxuICAgICAgICBDZXJ0aWZpY2F0aW9uQ29uZmlnO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogOSAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRjb21waWxlXywgX0NlcnRpZmljYXRpb25JdGVtXywgX0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXNfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfLCBfY2VydGlmaWNhdGlvblNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90ZXN0U2VydmljZV8sIF8kY29udHJvbGxlcl8sIF9DZXJ0aWZpY2F0aW9uQ29uZmlnXykge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0gPSBfQ2VydGlmaWNhdGlvbkl0ZW1fO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzID0gX0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXNfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uQ29uZmlnID0gX0NlcnRpZmljYXRpb25Db25maWdfO1xuXG4gICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uU2VydmljZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGl0ZW0pIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xuICAgICAgICAkc2NvcGUuaXRlbSA9IGl0ZW07XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oc3RhdHVzZXMsIGRlY2lzaW9uU3RhdGUpIHtcbiAgICAgICAgbGV0IGRlY2lzaW9uU3RhdHVzID0ge1xuICAgICAgICAgICAgZGVjaXNpb25zOiBbXVxuICAgICAgICB9O1xuICAgICAgICBpZiAoc3RhdHVzZXMpIHtcbiAgICAgICAgICAgIHN0YXR1c2VzLmZvckVhY2goKHN0YXR1cykgPT4gZGVjaXNpb25TdGF0dXMuZGVjaXNpb25zLnB1c2gobmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICBwcm9tcHRLZXk6IHN0YXR1c1xuICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWNpc2lvblN0YXRlKSB7XG4gICAgICAgICAgICBkZWNpc2lvblN0YXR1cy5jdXJyZW50U3RhdGUgPSBuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7XG4gICAgICAgICAgICAgICAgbmFtZTogZGVjaXNpb25TdGF0ZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGRlY2lzaW9uU3RhdGUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZUtleTogZGVjaXNpb25TdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IENlcnRpZmljYXRpb25JdGVtKHtcbiAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICBkZWNpc2lvblN0YXR1czogZGVjaXNpb25TdGF0dXMsXG4gICAgICAgICAgICByb2xlTmFtZTogJ1JvbGUxJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpdCAoJ3Rocm93cyB3aXRoIG5vIHNwTW9kZWwgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVFbGVtZW50KG51bGwpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvd3MgY2VydC1hY3Rpb24tY3VycmVudC1kZWNpc2lvbi1zdGF0ZSBzcGFuIHRoYXQgc2hvd3Mgc2F2ZWQgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgIGxldCBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0sXG4gICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQpO1xuXG4gICAgICAgIGxldCBhcHByb3ZlZEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGl0ZW0pO1xuICAgICAgICBsZXQgZGVjaXNpb25TdGF0ZVNwYW4gPSBhcHByb3ZlZEVsZW1lbnQuZmluZCgnc3Bhbi5jZXJ0LWFjdGlvbi1jdXJyZW50LWRlY2lzaW9uLXN0YXRlJyk7XG5cbiAgICAgICAgZXhwZWN0KGRlY2lzaW9uU3RhdGVTcGFuLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGRlY2lzaW9uU3RhdGVTcGFuWzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkKTtcbiAgICB9KTtcblxuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
