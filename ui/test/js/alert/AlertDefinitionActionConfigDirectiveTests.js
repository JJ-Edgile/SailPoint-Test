System.register(['test/js/TestInitializer', 'alert/AlertModule'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var alertModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_alertAlertModule) {
            alertModule = _alertAlertModule['default'];
        }],
        execute: function () {

            describe('AlertDefinitionMatchConfigDirective', function () {

                var $compile = undefined,
                    $scope = undefined,
                    element = undefined,
                    AlertActionConfig = undefined;

                beforeEach(module(alertModule));

                beforeEach(inject(function (_$compile_, _$rootScope_, _AlertActionConfig_) {
                    $compile = _$compile_;
                    $scope = _$rootScope_;
                    AlertActionConfig = _AlertActionConfig_;
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile(alertActionConfig) {
                    var eltDef = '<sp-alert-definition-action-config\n                    sp-alert-action-config="alertActionConfig"></<sp-alert-definition-action-config/>';

                    if (alertActionConfig) {
                        $scope.alertActionConfig = alertActionConfig;
                    }

                    element = angular.element(eltDef);
                    $compile(element)($scope);
                    $scope.$digest();
                }

                it('throws if no sp-alert-match-config defined', function () {
                    expect(function () {
                        return compile();
                    }).toThrow();
                });

                it('should show certification selector if certification selected', function () {
                    var actConfig = new AlertActionConfig({
                        actionType: {
                            id: 'CERTIFICATION',
                            name: 'CERTIFICATION',
                            displayName: 'Certification'
                        }
                    });

                    compile(actConfig);
                    var msg = element.find('#certificationSuggest');
                    expect(msg.length).toEqual(1);
                    msg = element.find('#workflowSuggest');
                    expect(msg.length).toEqual(0);
                    msg = element.find('#emailTemplate');
                    expect(msg.length).toEqual(1);
                    msg = element.find('#emailRecipients');
                    expect(msg.length).toEqual(1);
                });

                it('should show workflow selector if certification selected', function () {
                    var actConfig = new AlertActionConfig({
                        actionType: {
                            id: 'WORKFLOW',
                            name: 'WORKFLOW',
                            displayName: 'Workflow'
                        }
                    });
                    compile(actConfig);
                    var msg = element.find('#workflowSuggest');
                    expect(msg.length).toEqual(1);
                    msg = element.find('#certificationSuggest');
                    expect(msg.length).toEqual(0);
                    msg = element.find('#emailTemplate');
                    expect(msg.length).toEqual(1);
                    msg = element.find('#emailRecipients');
                    expect(msg.length).toEqual(1);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0RGVmaW5pdGlvbkFjdGlvbkNvbmZpZ0RpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQkFBc0IsVUFBVSxTQUFTOzs7OztJQUtqRjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUJBQW1CO1lBQ3pFLGNBQWMsa0JBQWtCOztRQUVwQyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsdUNBQXVDLFlBQU07O2dCQUVsRCxJQUFJLFdBQVE7b0JBQUUsU0FBTTtvQkFBRSxVQUFPO29CQUFFLG9CQUFpQjs7Z0JBRWhELFdBQVcsT0FBTzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFDLFlBQVksY0FBYSxxQkFBd0I7b0JBQ2hFLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxvQkFBb0I7OztnQkFHeEIsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLFFBQVEsbUJBQW1CO29CQUNoQyxJQUFJLFNBQU07O29CQUlWLElBQUksbUJBQW1CO3dCQUNuQixPQUFPLG9CQUFvQjs7O29CQUcvQixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixPQUFPOzs7Z0JBR1gsR0FBRyw4Q0FBOEMsWUFBTTtvQkFDbkQsT0FBTyxZQUFBO3dCQVFTLE9BUkg7dUJBQVc7OztnQkFHNUIsR0FBRyxnRUFBZ0UsWUFBTTtvQkFDckUsSUFBSSxZQUFZLElBQUksa0JBQWtCO3dCQUNsQyxZQUFZOzRCQUNSLElBQUk7NEJBQ0osTUFBTTs0QkFDTixhQUFhOzs7O29CQUlyQixRQUFRO29CQUNSLElBQUksTUFBTSxRQUFRLEtBQUs7b0JBQ3ZCLE9BQU8sSUFBSSxRQUFRLFFBQVE7b0JBQzNCLE1BQU0sUUFBUSxLQUFLO29CQUNuQixPQUFPLElBQUksUUFBUSxRQUFRO29CQUMzQixNQUFNLFFBQVEsS0FBSztvQkFDbkIsT0FBTyxJQUFJLFFBQVEsUUFBUTtvQkFDM0IsTUFBTSxRQUFRLEtBQUs7b0JBQ25CLE9BQU8sSUFBSSxRQUFRLFFBQVE7OztnQkFHL0IsR0FBRywyREFBMkQsWUFBTTtvQkFDaEUsSUFBSSxZQUFZLElBQUksa0JBQWtCO3dCQUNsQyxZQUFZOzRCQUNSLElBQUk7NEJBQ0osTUFBTTs0QkFDTixhQUFhOzs7b0JBR3JCLFFBQVE7b0JBQ1IsSUFBSSxNQUFNLFFBQVEsS0FBSztvQkFDdkIsT0FBTyxJQUFJLFFBQVEsUUFBUTtvQkFDM0IsTUFBTSxRQUFRLEtBQUs7b0JBQ25CLE9BQU8sSUFBSSxRQUFRLFFBQVE7b0JBQzNCLE1BQU0sUUFBUSxLQUFLO29CQUNuQixPQUFPLElBQUksUUFBUSxRQUFRO29CQUMzQixNQUFNLFFBQVEsS0FBSztvQkFDbkIsT0FBTyxJQUFJLFFBQVEsUUFBUTs7Ozs7R0FjaEMiLCJmaWxlIjoiYWxlcnQvQWxlcnREZWZpbml0aW9uQWN0aW9uQ29uZmlnRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIChjKSBDb3B5cmlnaHQgMjAwOCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFsZXJ0TW9kdWxlIGZyb20gJ2FsZXJ0L0FsZXJ0TW9kdWxlJztcblxuZGVzY3JpYmUoJ0FsZXJ0RGVmaW5pdGlvbk1hdGNoQ29uZmlnRGlyZWN0aXZlJywgKCkgPT4ge1xuXG4gICAgbGV0ICRjb21waWxlLCAkc2NvcGUsIGVsZW1lbnQsIEFsZXJ0QWN0aW9uQ29uZmlnO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWxlcnRNb2R1bGUpKTtcblxuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sIF8kcm9vdFNjb3BlXyxfQWxlcnRBY3Rpb25Db25maWdfKSA9PiB7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBBbGVydEFjdGlvbkNvbmZpZyA9IF9BbGVydEFjdGlvbkNvbmZpZ187XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNvbXBpbGUoYWxlcnRBY3Rpb25Db25maWcpIHtcbiAgICAgICAgbGV0IGVsdERlZiA9XG4gICAgICAgICAgICAgICAgYDxzcC1hbGVydC1kZWZpbml0aW9uLWFjdGlvbi1jb25maWdcbiAgICAgICAgICAgICAgICAgICAgc3AtYWxlcnQtYWN0aW9uLWNvbmZpZz1cImFsZXJ0QWN0aW9uQ29uZmlnXCI+PC88c3AtYWxlcnQtZGVmaW5pdGlvbi1hY3Rpb24tY29uZmlnLz5gO1xuXG4gICAgICAgIGlmIChhbGVydEFjdGlvbkNvbmZpZykge1xuICAgICAgICAgICAgJHNjb3BlLmFsZXJ0QWN0aW9uQ29uZmlnID0gYWxlcnRBY3Rpb25Db25maWc7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsdERlZik7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgfVxuXG4gICAgaXQoJ3Rocm93cyBpZiBubyBzcC1hbGVydC1tYXRjaC1jb25maWcgZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IGNvbXBpbGUoKSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzaG93IGNlcnRpZmljYXRpb24gc2VsZWN0b3IgaWYgY2VydGlmaWNhdGlvbiBzZWxlY3RlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IGFjdENvbmZpZyA9IG5ldyBBbGVydEFjdGlvbkNvbmZpZyh7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdDRVJUSUZJQ0FUSU9OJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnQ0VSVElGSUNBVElPTicsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdDZXJ0aWZpY2F0aW9uJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb21waWxlKGFjdENvbmZpZyk7XG4gICAgICAgIGxldCBtc2cgPSBlbGVtZW50LmZpbmQoJyNjZXJ0aWZpY2F0aW9uU3VnZ2VzdCcpO1xuICAgICAgICBleHBlY3QobXNnLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgbXNnID0gZWxlbWVudC5maW5kKCcjd29ya2Zsb3dTdWdnZXN0Jyk7XG4gICAgICAgIGV4cGVjdChtc2cubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICBtc2cgPSBlbGVtZW50LmZpbmQoJyNlbWFpbFRlbXBsYXRlJyk7XG4gICAgICAgIGV4cGVjdChtc2cubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBtc2cgPSBlbGVtZW50LmZpbmQoJyNlbWFpbFJlY2lwaWVudHMnKTtcbiAgICAgICAgZXhwZWN0KG1zZy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNob3cgd29ya2Zsb3cgc2VsZWN0b3IgaWYgY2VydGlmaWNhdGlvbiBzZWxlY3RlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IGFjdENvbmZpZyA9IG5ldyBBbGVydEFjdGlvbkNvbmZpZyh7XG4gICAgICAgICAgICBhY3Rpb25UeXBlOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdXT1JLRkxPVycsXG4gICAgICAgICAgICAgICAgbmFtZTogJ1dPUktGTE9XJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1dvcmtmbG93J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29tcGlsZShhY3RDb25maWcpO1xuICAgICAgICBsZXQgbXNnID0gZWxlbWVudC5maW5kKCcjd29ya2Zsb3dTdWdnZXN0Jyk7XG4gICAgICAgIGV4cGVjdChtc2cubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBtc2cgPSBlbGVtZW50LmZpbmQoJyNjZXJ0aWZpY2F0aW9uU3VnZ2VzdCcpO1xuICAgICAgICBleHBlY3QobXNnLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgbXNnID0gZWxlbWVudC5maW5kKCcjZW1haWxUZW1wbGF0ZScpO1xuICAgICAgICBleHBlY3QobXNnLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgbXNnID0gZWxlbWVudC5maW5kKCcjZW1haWxSZWNpcGllbnRzJyk7XG4gICAgICAgIGV4cGVjdChtc2cubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
