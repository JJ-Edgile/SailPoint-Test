System.register(['test/js/TestInitializer', 'policyViolation/dialog/PolicyViolationDialogModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var policyViolationDialogModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationDialogPolicyViolationDialogModule) {
            policyViolationDialogModule = _policyViolationDialogPolicyViolationDialogModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('PolicyViolationDetailsDialogCtrl', function () {

                var $controller = undefined;

                beforeEach(module(policyViolationDialogModule));

                beforeEach(inject(function (_$controller_) {
                    $controller = _$controller_;
                }));

                function createController(policyViolation) {
                    return $controller('PolicyViolationDetailsDialogCtrl', {
                        policyViolation: policyViolation
                    });
                }

                it('constructor throws if policyViolation data is missing', function () {
                    expect(function () {
                        createController();
                    }).toThrow();
                });

                it('initializes the policyViolation if defined', function () {
                    var policyViolation = {
                        id: '1234',
                        status: 'Open'
                    },
                        ctrl = undefined;

                    ctrl = createController(policyViolation);
                    expect(ctrl.policyViolation).toEqual(policyViolation);
                });

                describe('getStatusDisplayValue()', function () {
                    beforeEach(inject(function (spTranslateFilter) {
                        spTranslateFilter.configureCatalog({
                            'ui_policy_violation_status_delegated': 'Delegated to {0} on {1}',
                            'ui_policy_violation_status_remediated': 'Remediated by {0} on {1}',
                            'ui_policy_violation_status_mitigated': 'Allowed until {0} by {1}'
                        });
                    }));

                    it('returns policy status if no saved decision', function () {
                        var policyViolation = {
                            id: '1234',
                            status: 'Open'
                        },
                            ctrl = undefined;

                        ctrl = createController(policyViolation);
                        expect(ctrl.getStatusDisplayValue()).toEqual('Open');
                    });

                    it('returns delegated information for Delegated status', function () {
                        var policyViolation = {
                            id: '1234',
                            decision: {
                                status: 'Delegated',
                                recipientSummary: {
                                    displayName: 'Bob'
                                },
                                created: new Date(2017, 0, 10)
                            }
                        },
                            ctrl = undefined;

                        ctrl = createController(policyViolation);
                        expect(ctrl.getStatusDisplayValue()).toEqual('Delegated to Bob on January 10, 2017');
                    });

                    it('returns remediated information for Remediated status', function () {
                        var policyViolation = {
                            id: '1234',
                            decision: {
                                status: 'Remediated',
                                actorDisplayName: 'Bob',
                                created: new Date(2017, 0, 10)
                            }
                        },
                            ctrl = undefined;

                        ctrl = createController(policyViolation);
                        expect(ctrl.getStatusDisplayValue()).toEqual('Remediated by Bob on January 10, 2017');
                    });

                    it('returns mitigated information for Mitigated status', function () {
                        var policyViolation = {
                            id: '1234',
                            decision: {
                                status: 'Mitigated',
                                actorDisplayName: 'Bob',
                                mitigationExpirationDate: new Date(2017, 0, 10)
                            }
                        },
                            ctrl = undefined;

                        ctrl = createController(policyViolation);
                        expect(ctrl.getStatusDisplayValue()).toEqual('Allowed until January 10, 2017 by Bob');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9kaWFsb2cvUG9saWN5VmlvbGF0aW9uRGV0YWlsc0RpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0RBQXNELDRDQUE0QyxVQUFVLFNBQVM7Ozs7O0lBSzdKOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtREFBbUQ7WUFDekcsOEJBQThCLGtEQUFrRDtXQUNqRixVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsb0NBQW9DLFlBQVc7O2dCQUVwRCxJQUFJLGNBQVc7O2dCQUVmLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGVBQWU7b0JBQ3RDLGNBQWM7OztnQkFHbEIsU0FBUyxpQkFBaUIsaUJBQWlCO29CQUN2QyxPQUFPLFlBQVksb0NBQW9DO3dCQUNuRCxpQkFBaUI7Ozs7Z0JBSXpCLEdBQUcseURBQXlELFlBQVc7b0JBQ25FLE9BQU8sWUFBVzt3QkFBRTt1QkFBdUI7OztnQkFHL0MsR0FBRyw4Q0FBOEMsWUFBTTtvQkFDbkQsSUFBSSxrQkFBa0I7d0JBQ2xCLElBQUk7d0JBQ0osUUFBUTs7d0JBQ1QsT0FBSTs7b0JBRVAsT0FBTyxpQkFBaUI7b0JBQ3hCLE9BQU8sS0FBSyxpQkFBaUIsUUFBUTs7O2dCQUd6QyxTQUFTLDJCQUEyQixZQUFNO29CQUN0QyxXQUFXLE9BQU8sVUFBQyxtQkFBc0I7d0JBQ3JDLGtCQUFrQixpQkFBaUI7NEJBQy9CLHdDQUF3Qzs0QkFDeEMseUNBQXlDOzRCQUN6Qyx3Q0FBd0M7Ozs7b0JBSWhELEdBQUcsOENBQThDLFlBQU07d0JBQ25ELElBQUksa0JBQWtCOzRCQUNsQixJQUFJOzRCQUNKLFFBQVE7OzRCQUNULE9BQUk7O3dCQUVQLE9BQU8saUJBQWlCO3dCQUN4QixPQUFPLEtBQUsseUJBQXlCLFFBQVE7OztvQkFHakQsR0FBRyxzREFBc0QsWUFBTTt3QkFDM0QsSUFBSSxrQkFBa0I7NEJBQ2xCLElBQUk7NEJBQ0osVUFBVTtnQ0FDTixRQUFRO2dDQUNSLGtCQUFrQjtvQ0FDZCxhQUFhOztnQ0FFakIsU0FBUyxJQUFJLEtBQUssTUFBTSxHQUFHOzs7NEJBRWhDLE9BQUk7O3dCQUVQLE9BQU8saUJBQWlCO3dCQUN4QixPQUFPLEtBQUsseUJBQXlCLFFBQVE7OztvQkFHakQsR0FBRyx3REFBd0QsWUFBTTt3QkFDN0QsSUFBSSxrQkFBa0I7NEJBQ2xCLElBQUk7NEJBQ0osVUFBVTtnQ0FDTixRQUFRO2dDQUNSLGtCQUFrQjtnQ0FDbEIsU0FBUyxJQUFJLEtBQUssTUFBTSxHQUFHOzs7NEJBRWhDLE9BQUk7O3dCQUVQLE9BQU8saUJBQWlCO3dCQUN4QixPQUFPLEtBQUsseUJBQXlCLFFBQVE7OztvQkFHakQsR0FBRyxzREFBc0QsWUFBTTt3QkFDM0QsSUFBSSxrQkFBa0I7NEJBQ2xCLElBQUk7NEJBQ0osVUFBVTtnQ0FDTixRQUFRO2dDQUNSLGtCQUFrQjtnQ0FDbEIsMEJBQTBCLElBQUksS0FBSyxNQUFNLEdBQUc7Ozs0QkFFakQsT0FBSTs7d0JBRVAsT0FBTyxpQkFBaUI7d0JBQ3hCLE9BQU8sS0FBSyx5QkFBeUIsUUFBUTs7Ozs7O0dBbUJ0RCIsImZpbGUiOiJwb2xpY3lWaW9sYXRpb24vZGlhbG9nL1BvbGljeVZpb2xhdGlvbkRldGFpbHNEaWFsb2dDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBvbGljeVZpb2xhdGlvbkRpYWxvZ01vZHVsZSBmcm9tICdwb2xpY3lWaW9sYXRpb24vZGlhbG9nL1BvbGljeVZpb2xhdGlvbkRpYWxvZ01vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XG5cbmRlc2NyaWJlKCdQb2xpY3lWaW9sYXRpb25EZXRhaWxzRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICRjb250cm9sbGVyO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocG9saWN5VmlvbGF0aW9uRGlhbG9nTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbnRyb2xsZXJfKSB7XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKHBvbGljeVZpb2xhdGlvbikge1xuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ1BvbGljeVZpb2xhdGlvbkRldGFpbHNEaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uOiBwb2xpY3lWaW9sYXRpb25cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXQoJ2NvbnN0cnVjdG9yIHRocm93cyBpZiBwb2xpY3lWaW9sYXRpb24gZGF0YSBpcyBtaXNzaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY3JlYXRlQ29udHJvbGxlcigpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaW5pdGlhbGl6ZXMgdGhlIHBvbGljeVZpb2xhdGlvbiBpZiBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgcG9saWN5VmlvbGF0aW9uID0ge1xuICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgIHN0YXR1czogJ09wZW4nXG4gICAgICAgIH0sIGN0cmw7XG5cbiAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIocG9saWN5VmlvbGF0aW9uKTtcbiAgICAgICAgZXhwZWN0KGN0cmwucG9saWN5VmlvbGF0aW9uKS50b0VxdWFsKHBvbGljeVZpb2xhdGlvbik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0U3RhdHVzRGlzcGxheVZhbHVlKCknLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChzcFRyYW5zbGF0ZUZpbHRlcikgPT4ge1xuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XG4gICAgICAgICAgICAgICAgJ3VpX3BvbGljeV92aW9sYXRpb25fc3RhdHVzX2RlbGVnYXRlZCc6ICdEZWxlZ2F0ZWQgdG8gezB9IG9uIHsxfScsXG4gICAgICAgICAgICAgICAgJ3VpX3BvbGljeV92aW9sYXRpb25fc3RhdHVzX3JlbWVkaWF0ZWQnOiAnUmVtZWRpYXRlZCBieSB7MH0gb24gezF9JyxcbiAgICAgICAgICAgICAgICAndWlfcG9saWN5X3Zpb2xhdGlvbl9zdGF0dXNfbWl0aWdhdGVkJzogJ0FsbG93ZWQgdW50aWwgezB9IGJ5IHsxfSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgcG9saWN5IHN0YXR1cyBpZiBubyBzYXZlZCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwb2xpY3lWaW9sYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdPcGVuJ1xuICAgICAgICAgICAgfSwgY3RybDtcblxuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIocG9saWN5VmlvbGF0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFN0YXR1c0Rpc3BsYXlWYWx1ZSgpKS50b0VxdWFsKCdPcGVuJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGRlbGVnYXRlZCBpbmZvcm1hdGlvbiBmb3IgRGVsZWdhdGVkIHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwb2xpY3lWaW9sYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbjoge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdEZWxlZ2F0ZWQnLFxuICAgICAgICAgICAgICAgICAgICByZWNpcGllbnRTdW1tYXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0JvYidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbmV3IERhdGUoMjAxNywgMCwgMTApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgY3RybDtcblxuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIocG9saWN5VmlvbGF0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFN0YXR1c0Rpc3BsYXlWYWx1ZSgpKS50b0VxdWFsKCdEZWxlZ2F0ZWQgdG8gQm9iIG9uIEphbnVhcnkgMTAsIDIwMTcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgcmVtZWRpYXRlZCBpbmZvcm1hdGlvbiBmb3IgUmVtZWRpYXRlZCBzdGF0dXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcG9saWN5VmlvbGF0aW9uID0ge1xuICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgZGVjaXNpb246IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnUmVtZWRpYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yRGlzcGxheU5hbWU6ICdCb2InLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiBuZXcgRGF0ZSgyMDE3LCAwLCAxMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBjdHJsO1xuXG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihwb2xpY3lWaW9sYXRpb24pO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0U3RhdHVzRGlzcGxheVZhbHVlKCkpLnRvRXF1YWwoJ1JlbWVkaWF0ZWQgYnkgQm9iIG9uIEphbnVhcnkgMTAsIDIwMTcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgbWl0aWdhdGVkIGluZm9ybWF0aW9uIGZvciBNaXRpZ2F0ZWQgc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBvbGljeVZpb2xhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgIGRlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ01pdGlnYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yRGlzcGxheU5hbWU6ICdCb2InLFxuICAgICAgICAgICAgICAgICAgICBtaXRpZ2F0aW9uRXhwaXJhdGlvbkRhdGU6IG5ldyBEYXRlKDIwMTcsIDAsIDEwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGN0cmw7XG5cbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHBvbGljeVZpb2xhdGlvbik7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRTdGF0dXNEaXNwbGF5VmFsdWUoKSkudG9FcXVhbCgnQWxsb3dlZCB1bnRpbCBKYW51YXJ5IDEwLCAyMDE3IGJ5IEJvYicpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
