System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationCardDirective', function () {

                var $compile = undefined,
                    $controller = undefined,
                    navigationService = undefined,
                    columnKey = undefined,
                    columns = undefined,
                    cert = undefined,
                    element = undefined,
                    $scope = undefined,
                    refreshTrigger = undefined,
                    certificationService = undefined,
                    configService = undefined,
                    bizRoleCert = undefined;

                beforeEach(module(certificationModule));

                /* jshint maxparams: 10 */
                beforeEach(inject(function (_$compile_, _$controller_, _navigationService_, Certification, certificationTestData, _configService_, $q, ColumnConfig, $rootScope, _certificationService_) {
                    $compile = _$compile_;
                    $controller = _$controller_;
                    navigationService = _navigationService_;
                    $scope = $rootScope.$new();
                    certificationService = _certificationService_;
                    configService = _configService_;

                    columnKey = 'thisColumnKey';
                    cert = new Certification(certificationTestData.CERTIFICATION_1);
                    bizRoleCert = new Certification(certificationTestData.CERTIFICATION_2);
                    columns = [new ColumnConfig({
                        dataIndex: 'expiration',
                        dateStyle: 'short',
                        headerKey: 'EXPIRATION'
                    }), new ColumnConfig({
                        dataIndex: 'name',
                        headerKey: 'NAME'
                    })];
                    var data = {};
                    data[columnKey] = columns;
                    spyOn(configService, 'getColumnConfigEntries').and.returnValue($q.when({ data: data }));

                    refreshTrigger = {
                        refresh: jasmine.createSpy('refresh')
                    };
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                    if ($scope) {
                        $scope.$destroy();
                    }
                });

                function compile(certification) {
                    var eltDef = '<sp-certification-card sp-certification="cert" sp-column-config-key="columnKey"' + ' sp-refresh-trigger="refreshTrigger" />';
                    element = angular.element(eltDef);

                    // use passed in cert if provided otherwise use default cert
                    $scope.cert = certification ? certification : cert;
                    $scope.columnKey = columnKey;
                    $scope.refreshTrigger = refreshTrigger;

                    $compile(element)($scope);
                    $scope.$digest();

                    return element;
                }

                describe('controller', function () {
                    function createController(cert, columnKey, refreshTrigger) {
                        var ctrl = $controller('CertificationCardDirectiveCtrl', null, {
                            certification: cert,
                            configKey: columnKey,
                            refreshTrigger: refreshTrigger
                        });
                        ctrl.$onInit();
                        return ctrl;
                    }

                    it('throws if not initialized correctly', function () {
                        expect(function () {
                            return createController(null, columnKey, refreshTrigger);
                        }).toThrow();
                        expect(function () {
                            return createController(cert, null, refreshTrigger);
                        }).toThrow();
                        expect(function () {
                            return createController(cert, columnKey, null);
                        }).toThrow();
                    });

                    it('updates main button label', function () {
                        var ctrl = createController(cert, columnKey, refreshTrigger);
                        cert.itemStatusCount.getCompleteCount = function () {
                            return 0;
                        };
                        expect(ctrl.getGoToCertificationButtonLabel()).toEqual('ui_cert_start');

                        cert.itemStatusCount.getCompleteCount = function () {
                            return 1;
                        };
                        expect(ctrl.getGoToCertificationButtonLabel()).toEqual('ui_cert_continue');

                        // cert is complete but not signedOff
                        cert.itemStatusCount.getCompleteCount = function () {
                            return 1;
                        };
                        cert.itemStatusCount.getTotalCount = function () {
                            return 1;
                        };
                        cert.signOffComplete = false;
                        expect(ctrl.getGoToCertificationButtonLabel()).toEqual('ui_cert_continue');

                        cert.itemStatusCount.getCompleteCount = function () {
                            return 1;
                        };
                        cert.itemStatusCount.getTotalCount = function () {
                            return 1;
                        };
                        cert.signOffComplete = true;
                        expect(ctrl.getGoToCertificationButtonLabel()).toEqual('ui_cert_view');
                    });

                    it('updates the phase label class according to phase', function () {
                        var ctrl = createController(cert, columnKey, refreshTrigger);
                        cert.phase = 'Active';
                        expect(ctrl.getPhaseLabelClass()).toEqual('label-success');
                        cert.phase = 'Challenge';
                        expect(ctrl.getPhaseLabelClass()).toEqual('label-info');
                        cert.phase = 'Remediation';
                        expect(ctrl.getPhaseLabelClass()).toEqual('label-info');
                        cert.phase = 'End';
                        expect(ctrl.getPhaseLabelClass()).toEqual('label-default');
                    });
                });

                it('only shows displayed columns', function () {
                    compile();
                    var lines = element.find('div.cert-data-item');
                    expect(lines.length).toEqual(2);
                    expect(lines[0].innerText).toContain(columns[0].headerKey);
                    expect(lines[1].innerText).toContain(columns[1].headerKey);
                });

                it('navigates to mobile nav target if mobile', function () {
                    spyOn(configService, 'isMobile').and.returnValue(true);
                    compile();
                    spyOn(navigationService, 'go');
                    element.find('button.view-btn').click();
                    $scope.$apply();
                    expect(navigationService.go).toHaveBeenCalled();
                    var args = navigationService.go.calls.mostRecent().args;
                    expect(args[0].state).toEqual('certification.view');
                });

                it('navigates to worksheet view for identity certs', function () {
                    compile();
                    spyOn(navigationService, 'go');
                    element.find('button.view-btn').click();
                    $scope.$apply();
                    expect(navigationService.go).toHaveBeenCalled();
                    var args = navigationService.go.calls.mostRecent().args;
                    expect(args[0].outcome.indexOf('viewWorksheet') !== -1).toBe(true);
                });

                it('navigates to entity list view for non-identity certs', function () {
                    compile(bizRoleCert);
                    spyOn(navigationService, 'go');
                    element.find('button.view-btn').click();
                    $scope.$apply();
                    expect(navigationService.go).toHaveBeenCalled();
                    var args = navigationService.go.calls.mostRecent().args;
                    expect(args[0].outcome.indexOf('viewEntityList') !== -1).toBe(true);
                });

                it('calls certificationService to forward certification if forward button is clicked', function () {
                    compile();
                    spyOn(certificationService, 'forwardCertification');
                    element.find('button.forward-btn').click();
                    $scope.$apply();
                    expect(certificationService.forwardCertification).toHaveBeenCalled();
                    var args = certificationService.forwardCertification.calls.mostRecent().args;
                    expect(args[0]).toEqual(cert);
                    expect(angular.isFunction(args[1])).toEqual(true);
                    refreshTrigger.refresh.calls.reset();
                    args[1]();
                    expect(refreshTrigger.refresh).toHaveBeenCalled();
                });

                it('shows esigned data only if cert is esigned', function () {
                    compile();
                    var lines = element.find('div.cert-data-item');
                    expect(lines.length).toEqual(2);

                    cert.esigned = true;
                    compile();
                    lines = element.find('div.cert-data-item');
                    expect(lines.length).toEqual(3);
                    expect(lines[2].innerText).toContain('ui_cert_electronically_signed');
                });

                it('shows complete text instead of due date when cert is complete and signed', function () {
                    cert.signOffComplete = true;

                    compile();
                    var completeText = element.find('.complete-text');
                    expect(completeText.length).toEqual(1);
                    expect(completeText[0].innerText.trim()).toEqual('ui_cert_complete');

                    var dueDate = element.find('sp-due-date');
                    expect(dueDate.length).toEqual(0);
                });

                it('does not show due date if no expiration date (i.e. continuous)', function () {
                    delete cert.expiration;
                    compile();
                    var completeText = element.find('.complete-text');
                    expect(completeText.length).toEqual(0);

                    var dueDate = element.find('sp-due-date');
                    expect(dueDate.length).toEqual(0);
                });

                describe('name', function () {
                    function checkName(expectedName) {
                        var nameElement = element.find('.cert-name');
                        expect(nameElement.length).toEqual(1);
                        expect(nameElement.text().trim()).toEqual(expectedName);
                    }

                    it('shows short name if defined', function () {
                        cert.shortName = 'this is a short name';
                        compile();
                        checkName(cert.shortName);
                    });

                    it('shows full name if short name is not defined', function () {
                        compile();
                        checkName(cert.name);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkNhcmREaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7SUFFakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsOEJBQThCLFlBQU07O2dCQUV6QyxJQUFJLFdBQVE7b0JBQUUsY0FBVztvQkFBRSxvQkFBaUI7b0JBQUUsWUFBUztvQkFBRSxVQUFPO29CQUFFLE9BQUk7b0JBQUUsVUFBTztvQkFBRSxTQUFNO29CQUFFLGlCQUFjO29CQUNuRyx1QkFBb0I7b0JBQUUsZ0JBQWE7b0JBQUUsY0FBVzs7Z0JBRXBELFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBQyxZQUFZLGVBQWUscUJBQXFCLGVBQWUsdUJBQy9ELGlCQUFpQixJQUFJLGNBQWMsWUFBWSx3QkFBMkI7b0JBQ3pGLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxvQkFBb0I7b0JBQ3BCLFNBQVMsV0FBVztvQkFDcEIsdUJBQXVCO29CQUN2QixnQkFBZ0I7O29CQUVoQixZQUFZO29CQUNaLE9BQU8sSUFBSSxjQUFjLHNCQUFzQjtvQkFDL0MsY0FBYyxJQUFJLGNBQWMsc0JBQXNCO29CQUN0RCxVQUFVLENBQ04sSUFBSSxhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsV0FBVzt3QkFDWCxXQUFXO3dCQUVmLElBQUksYUFBYTt3QkFDYixXQUFXO3dCQUNYLFdBQVc7O29CQUduQixJQUFJLE9BQU87b0JBQ1gsS0FBSyxhQUFhO29CQUNsQixNQUFNLGVBQWUsMEJBQTBCLElBQUksWUFBWSxHQUFHLEtBQUssRUFBRSxNQUFNOztvQkFFL0UsaUJBQWlCO3dCQUNiLFNBQVMsUUFBUSxVQUFVOzs7O2dC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QUFhLEdBQUcsVUFBVSxRQUFRLFFBQVE7O29CQUVqRCxJQUFJLFVBQVUsUUFBUSxLQUFLO29CQUMzQixPQUFPLFFBQVEsUUFBUSxRQUFROzs7Z0JBR25DLEdBQUcsa0VBQWtFLFlBQU07b0JBQ3ZFLE9BQU8sS0FBSztvQkFDWjtvQkFDQSxJQUFJLGVBQWUsUUFBUSxLQUFLO29CQUNoQyxPQUFPLGFBQWEsUUFBUSxRQUFROztvQkFFcEMsSUFBSSxVQUFVLFFBQVEsS0FBSztvQkFDM0IsT0FBTyxRQUFRLFFBQVEsUUFBUTs7O2dCQUduQyxTQUFTLFFBQVEsWUFBTTtvQkFDbkIsU0FBUyxVQUFVLGNBQWM7d0JBQzdCLElBQUksY0FBYyxRQUFRLEtBQUs7d0JBQy9CLE9BQU8sWUFBWSxRQUFRLFFBQVE7d0JBQ25DLE9BQU8sWUFBWSxPQUFPLFFBQVEsUUFBUTs7O29CQUc5QyxHQUFHLCtCQUErQixZQUFNO3dCQUNwQyxLQUFLLFlBQVk7d0JBQ2pCO3dCQUNBLFVBQVUsS0FBSzs7O29CQUduQixHQUFHLGdEQUFnRCxZQUFNO3dCQUNyRDt3QkFDQSxVQUFVLEtBQUs7Ozs7OztHQW9DeEIiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uQ2FyZERpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uQ2FyZERpcmVjdGl2ZScsICgpID0+IHtcblxuICAgIGxldCAkY29tcGlsZSwgJGNvbnRyb2xsZXIsIG5hdmlnYXRpb25TZXJ2aWNlLCBjb2x1bW5LZXksIGNvbHVtbnMsIGNlcnQsIGVsZW1lbnQsICRzY29wZSwgcmVmcmVzaFRyaWdnZXIsXG4gICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlLCBjb25maWdTZXJ2aWNlLCBiaXpSb2xlQ2VydDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDEwICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sIF8kY29udHJvbGxlcl8sIF9uYXZpZ2F0aW9uU2VydmljZV8sIENlcnRpZmljYXRpb24sIGNlcnRpZmljYXRpb25UZXN0RGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgX2NvbmZpZ1NlcnZpY2VfLCAkcSwgQ29sdW1uQ29uZmlnLCAkcm9vdFNjb3BlLCBfY2VydGlmaWNhdGlvblNlcnZpY2VfKSA9PiB7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZSA9IF9uYXZpZ2F0aW9uU2VydmljZV87XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uU2VydmljZV87XG4gICAgICAgIGNvbmZpZ1NlcnZpY2UgPSBfY29uZmlnU2VydmljZV87XG5cbiAgICAgICAgY29sdW1uS2V5ID0gJ3RoaXNDb2x1bW5LZXknO1xuICAgICAgICBjZXJ0ID0gbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSk7XG4gICAgICAgIGJpelJvbGVDZXJ0ID0gbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMik7XG4gICAgICAgIGNvbHVtbnMgPSBbXG4gICAgICAgICAgICBuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgICAgICBkYXRhSW5kZXg6ICdleHBpcmF0aW9uJyxcbiAgICAgICAgICAgICAgICBkYXRlU3R5bGU6ICdzaG9ydCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyS2V5OiAnRVhQSVJBVElPTidcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IENvbHVtbkNvbmZpZyh7XG4gICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgaGVhZGVyS2V5OiAnTkFNRSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgIF07XG4gICAgICAgIGxldCBkYXRhID0ge307XG4gICAgICAgIGRhdGFbY29sdW1uS2V5XSA9IGNvbHVtbnM7XG4gICAgICAgIHNweU9uKGNvbmZpZ1NlcnZpY2UsICdnZXRDb2x1bW5Db25maWdFbnRyaWVzJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oeyBkYXRhOiBkYXRhIH0pKTtcblxuICAgICAgICByZWZyZXNoVHJpZ2dlciA9IHtcbiAgICAgICAgICAgIHJlZnJlc2g6IGphc21pbmUuY3JlYXRlU3B5KCdyZWZyZXNoJylcbiAgICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJHNjb3BlKSB7XG4gICAgICAgICAgICAkc2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY29tcGlsZShjZXJ0aWZpY2F0aW9uKSB7XG4gICAgICAgIGxldCBlbHREZWYgPSAnPHNwLWNlcnRpZmljYXRpb24tY2FyZCBzcC1jZXJ0aWZpY2F0aW9uPVwiY2VydFwiIHNwLWNvbHVtbi1jb25maWcta2V5PVwiY29sdW1uS2V5XCInICtcbiAgICAgICAgICAgICcgc3AtcmVmcmVzaC10cmlnZ2VyPVwicmVmcmVzaFRyaWdnZXJcIiAvPic7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWx0RGVmKTtcblxuICAgICAgICAvLyB1c2UgcGFzc2VkIGluIGNlcnQgaWYgcHJvdmlkZWQgb3RoZXJ3aXNlIHVzZSBkZWZhdWx0IGNlcnRcbiAgICAgICAgJHNjb3BlLmNlcnQgPSBjZXJ0aWZpY2F0aW9uID8gY2VydGlmaWNhdGlvbiA6IGNlcnQ7XG4gICAgICAgICRzY29wZS5jb2x1bW5LZXkgPSBjb2x1bW5LZXk7XG4gICAgICAgICRzY29wZS5yZWZyZXNoVHJpZ2dlciA9IHJlZnJlc2hUcmlnZ2VyO1xuXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2NvbnRyb2xsZXInLCAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoY2VydCwgY29sdW1uS2V5LCByZWZyZXNoVHJpZ2dlcikge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSAkY29udHJvbGxlcignQ2VydGlmaWNhdGlvbkNhcmREaXJlY3RpdmVDdHJsJywgbnVsbCwge1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb246IGNlcnQsXG4gICAgICAgICAgICAgICAgY29uZmlnS2V5OiBjb2x1bW5LZXksXG4gICAgICAgICAgICAgICAgcmVmcmVzaFRyaWdnZXI6IHJlZnJlc2hUcmlnZ2VyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGN0cmwuJG9uSW5pdCgpO1xuICAgICAgICAgICAgcmV0dXJuIGN0cmw7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgndGhyb3dzIGlmIG5vdCBpbml0aWFsaXplZCBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcihudWxsLCBjb2x1bW5LZXksIHJlZnJlc2hUcmlnZ2VyKSkudG9UaHJvdygpO1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUNvbnRyb2xsZXIoY2VydCwgbnVsbCwgcmVmcmVzaFRyaWdnZXIpKS50b1Rocm93KCk7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcihjZXJ0LCBjb2x1bW5LZXksIG51bGwpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd1cGRhdGVzIG1haW4gYnV0dG9uIGxhYmVsJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGNlcnQsIGNvbHVtbktleSwgcmVmcmVzaFRyaWdnZXIpO1xuICAgICAgICAgICAgY2VydC5pdGVtU3RhdHVzQ291bnQuZ2V0Q29tcGxldGVDb3VudCA9ICgpID0+IDA7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRHb1RvQ2VydGlmaWNhdGlvbkJ1dHRvbkxhYmVsKCkpLnRvRXF1YWwoJ3VpX2NlcnRfc3RhcnQnKTtcblxuICAgICAgICAgICAgY2VydC5pdGVtU3RhdHVzQ291bnQuZ2V0Q29tcGxldGVDb3VudCA9ICgpID0+IDE7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRHb1RvQ2VydGlmaWNhdGlvbkJ1dHRvbkxhYmVsKCkpLnRvRXF1YWwoJ3VpX2NlcnRfY29udGludWUnKTtcblxuICAgICAgICAgICAgLy8gY2VydCBpcyBjb21wbGV0ZSBidXQgbm90IHNpZ25lZE9mZlxuICAgICAgICAgICAgY2VydC5pdGVtU3RhdHVzQ291bnQuZ2V0Q29tcGxldGVDb3VudCA9ICgpID0+IDE7XG4gICAgICAgICAgICBjZXJ0Lml0ZW1TdGF0dXNDb3VudC5nZXRUb3RhbENvdW50ID0gKCkgPT4gMTtcbiAgICAgICAgICAgIGNlcnQuc2lnbk9mZkNvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRHb1RvQ2VydGlmaWNhdGlvbkJ1dHRvbkxhYmVsKCkpLnRvRXF1YWwoJ3VpX2NlcnRfY29udGludWUnKTtcblxuICAgICAgICAgICAgY2VydC5pdGVtU3RhdHVzQ291bnQuZ2V0Q29tcGxldGVDb3VudCA9ICgpID0+IDE7XG4gICAgICAgICAgICBjZXJ0Lml0ZW1TdGF0dXNDb3VudC5nZXRUb3RhbENvdW50ID0gKCkgPT4gMTtcbiAgICAgICAgICAgIGNlcnQuc2lnbk9mZkNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEdvVG9DZXJ0aWZpY2F0aW9uQnV0dG9uTGFiZWwoKSkudG9FcXVhbCgndWlfY2VydF92aWV3Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd1cGRhdGVzIHRoZSBwaGFzZSBsYWJlbCBjbGFzcyBhY2NvcmRpbmcgdG8gcGhhc2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoY2VydCwgY29sdW1uS2V5LCByZWZyZXNoVHJpZ2dlcik7XG4gICAgICAgICAgICBjZXJ0LnBoYXNlID0gJ0FjdGl2ZSc7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQaGFzZUxhYmVsQ2xhc3MoKSkudG9FcXVhbCgnbGFiZWwtc3VjY2VzcycpO1xuICAgICAgICAgICAgY2VydC5waGFzZSA9ICdDaGFsbGVuZ2UnO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0UGhhc2VMYWJlbENsYXNzKCkpLnRvRXF1YWwoJ2xhYmVsLWluZm8nKTtcbiAgICAgICAgICAgIGNlcnQucGhhc2UgPSAnUmVtZWRpYXRpb24nO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0UGhhc2VMYWJlbENsYXNzKCkpLnRvRXF1YWwoJ2xhYmVsLWluZm8nKTtcbiAgICAgICAgICAgIGNlcnQucGhhc2UgPSAnRW5kJztcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFBoYXNlTGFiZWxDbGFzcygpKS50b0VxdWFsKCdsYWJlbC1kZWZhdWx0Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ29ubHkgc2hvd3MgZGlzcGxheWVkIGNvbHVtbnMnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBpbGUoKTtcbiAgICAgICAgbGV0IGxpbmVzID0gZWxlbWVudC5maW5kKCdkaXYuY2VydC1kYXRhLWl0ZW0nKTtcbiAgICAgICAgZXhwZWN0KGxpbmVzLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KGxpbmVzWzBdLmlubmVyVGV4dCkudG9Db250YWluKGNvbHVtbnNbMF0uaGVhZGVyS2V5KTtcbiAgICAgICAgZXhwZWN0KGxpbmVzWzFdLmlubmVyVGV4dCkudG9Db250YWluKGNvbHVtbnNbMV0uaGVhZGVyS2V5KTtcbiAgICB9KTtcblxuICAgIGl0KCduYXZpZ2F0ZXMgdG8gbW9iaWxlIG5hdiB0YXJnZXQgaWYgbW9iaWxlJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb25maWdTZXJ2aWNlLCAnaXNNb2JpbGUnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgIGNvbXBpbGUoKTtcbiAgICAgICAgc3B5T24obmF2aWdhdGlvblNlcnZpY2UsICdnbycpO1xuICAgICAgICBlbGVtZW50LmZpbmQoJ2J1dHRvbi52aWV3LWJ0bicpLmNsaWNrKCk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGxldCBhcmdzID0gbmF2aWdhdGlvblNlcnZpY2UuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XG4gICAgICAgIGV4cGVjdChhcmdzWzBdLnN0YXRlKS50b0VxdWFsKCdjZXJ0aWZpY2F0aW9uLnZpZXcnKTtcbiAgICB9KTtcblxuICAgIGl0KCduYXZpZ2F0ZXMgdG8gd29ya3NoZWV0IHZpZXcgZm9yIGlkZW50aXR5IGNlcnRzJywgKCkgPT4ge1xuICAgICAgICBjb21waWxlKCk7XG4gICAgICAgIHNweU9uKG5hdmlnYXRpb25TZXJ2aWNlLCAnZ28nKTtcbiAgICAgICAgZWxlbWVudC5maW5kKCdidXR0b24udmlldy1idG4nKS5jbGljaygpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBsZXQgYXJncyA9IG5hdmlnYXRpb25TZXJ2aWNlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICBleHBlY3QoYXJnc1swXS5vdXRjb21lLmluZGV4T2YoJ3ZpZXdXb3Jrc2hlZXQnKSAhPT0gLTEpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnbmF2aWdhdGVzIHRvIGVudGl0eSBsaXN0IHZpZXcgZm9yIG5vbi1pZGVudGl0eSBjZXJ0cycsICgpID0+IHtcbiAgICAgICAgY29tcGlsZShiaXpSb2xlQ2VydCk7XG4gICAgICAgIHNweU9uKG5hdmlnYXRpb25TZXJ2aWNlLCAnZ28nKTtcbiAgICAgICAgZWxlbWVudC5maW5kKCdidXR0b24udmlldy1idG4nKS5jbGljaygpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBsZXQgYXJncyA9IG5hdmlnYXRpb25TZXJ2aWNlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICBleHBlY3QoYXJnc1swXS5vdXRjb21lLmluZGV4T2YoJ3ZpZXdFbnRpdHlMaXN0JykgIT09IC0xKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIGNlcnRpZmljYXRpb25TZXJ2aWNlIHRvIGZvcndhcmQgY2VydGlmaWNhdGlvbiBpZiBmb3J3YXJkIGJ1dHRvbiBpcyBjbGlja2VkJywgKCkgPT4ge1xuICAgICAgICBjb21waWxlKCk7XG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZm9yd2FyZENlcnRpZmljYXRpb24nKTtcbiAgICAgICAgZWxlbWVudC5maW5kKCdidXR0b24uZm9yd2FyZC1idG4nKS5jbGljaygpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5mb3J3YXJkQ2VydGlmaWNhdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBsZXQgYXJncyA9IGNlcnRpZmljYXRpb25TZXJ2aWNlLmZvcndhcmRDZXJ0aWZpY2F0aW9uLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICBleHBlY3QoYXJnc1swXSkudG9FcXVhbChjZXJ0KTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuaXNGdW5jdGlvbihhcmdzWzFdKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgcmVmcmVzaFRyaWdnZXIucmVmcmVzaC5jYWxscy5yZXNldCgpO1xuICAgICAgICBhcmdzWzFdKCk7XG4gICAgICAgIGV4cGVjdChyZWZyZXNoVHJpZ2dlci5yZWZyZXNoKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvd3MgZXNpZ25lZCBkYXRhIG9ubHkgaWYgY2VydCBpcyBlc2lnbmVkJywgKCkgPT4ge1xuICAgICAgICBjb21waWxlKCk7XG4gICAgICAgIGxldCBsaW5lcyA9IGVsZW1lbnQuZmluZCgnZGl2LmNlcnQtZGF0YS1pdGVtJyk7XG4gICAgICAgIGV4cGVjdChsaW5lcy5sZW5ndGgpLnRvRXF1YWwoMik7XG5cbiAgICAgICAgY2VydC5lc2lnbmVkID0gdHJ1ZTtcbiAgICAgICAgY29tcGlsZSgpO1xuICAgICAgICBsaW5lcyA9IGVsZW1lbnQuZmluZCgnZGl2LmNlcnQtZGF0YS1pdGVtJyk7XG4gICAgICAgIGV4cGVjdChsaW5lcy5sZW5ndGgpLnRvRXF1YWwoMyk7XG4gICAgICAgIGV4cGVjdChsaW5lc1syXS5pbm5lclRleHQpLnRvQ29udGFpbigndWlfY2VydF9lbGVjdHJvbmljYWxseV9zaWduZWQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG93cyBjb21wbGV0ZSB0ZXh0IGluc3RlYWQgb2YgZHVlIGRhdGUgd2hlbiBjZXJ0IGlzIGNvbXBsZXRlIGFuZCBzaWduZWQnLCAoKSA9PiB7XG4gICAgICAgIGNlcnQuc2lnbk9mZkNvbXBsZXRlID0gdHJ1ZTtcblxuICAgICAgICBjb21waWxlKCk7XG4gICAgICAgIGxldCBjb21wbGV0ZVRleHQgPSBlbGVtZW50LmZpbmQoJy5jb21wbGV0ZS10ZXh0Jyk7XG4gICAgICAgIGV4cGVjdChjb21wbGV0ZVRleHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QoY29tcGxldGVUZXh0WzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3VpX2NlcnRfY29tcGxldGUnKTtcblxuICAgICAgICBsZXQgZHVlRGF0ZSA9IGVsZW1lbnQuZmluZCgnc3AtZHVlLWRhdGUnKTtcbiAgICAgICAgZXhwZWN0KGR1ZURhdGUubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RvZXMgbm90IHNob3cgZHVlIGRhdGUgaWYgbm8gZXhwaXJhdGlvbiBkYXRlIChpLmUuIGNvbnRpbnVvdXMpJywgKCkgPT4ge1xuICAgICAgICBkZWxldGUgY2VydC5leHBpcmF0aW9uO1xuICAgICAgICBjb21waWxlKCk7XG4gICAgICAgIGxldCBjb21wbGV0ZVRleHQgPSBlbGVtZW50LmZpbmQoJy5jb21wbGV0ZS10ZXh0Jyk7XG4gICAgICAgIGV4cGVjdChjb21wbGV0ZVRleHQubGVuZ3RoKS50b0VxdWFsKDApO1xuXG4gICAgICAgIGxldCBkdWVEYXRlID0gZWxlbWVudC5maW5kKCdzcC1kdWUtZGF0ZScpO1xuICAgICAgICBleHBlY3QoZHVlRGF0ZS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmFtZScsICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tOYW1lKGV4cGVjdGVkTmFtZSkge1xuICAgICAgICAgICAgbGV0IG5hbWVFbGVtZW50ID0gZWxlbWVudC5maW5kKCcuY2VydC1uYW1lJyk7XG4gICAgICAgICAgICBleHBlY3QobmFtZUVsZW1lbnQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KG5hbWVFbGVtZW50LnRleHQoKS50cmltKCkpLnRvRXF1YWwoZXhwZWN0ZWROYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdzaG93cyBzaG9ydCBuYW1lIGlmIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjZXJ0LnNob3J0TmFtZSA9ICd0aGlzIGlzIGEgc2hvcnQgbmFtZSc7XG4gICAgICAgICAgICBjb21waWxlKCk7XG4gICAgICAgICAgICBjaGVja05hbWUoY2VydC5zaG9ydE5hbWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvd3MgZnVsbCBuYW1lIGlmIHNob3J0IG5hbWUgaXMgbm90IGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb21waWxlKCk7XG4gICAgICAgICAgICBjaGVja05hbWUoY2VydC5uYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
