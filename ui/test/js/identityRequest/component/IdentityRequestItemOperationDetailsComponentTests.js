System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('IdentityRequestItemOperationDetailsComponent', function () {

                var identityRequestService = undefined,
                    identityRequestTestData = undefined,
                    $componentController = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    identityRequestItem = undefined,
                    element = undefined,
                    IdentityRequestItem = undefined,
                    IdentityRequest = undefined,
                    identityRequest = undefined;

                beforeEach(module(identityRequestModule));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_identityRequestService_, _$componentController_, _identityRequestTestData_, _$compile_, $rootScope, _IdentityRequestItem_, _IdentityRequest_, spTranslateFilter) {

                    $compile = _$compile_;
                    $componentController = _$componentController_;
                    identityRequestService = _identityRequestService_;
                    identityRequestTestData = _identityRequestTestData_;
                    IdentityRequestItem = _IdentityRequestItem_;
                    IdentityRequest = _IdentityRequest_;
                    identityRequestItem = new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_1.items[0]);
                    identityRequest = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                    $scope = $rootScope;

                    spyOn(identityRequestService, 'showManagedAttributeDetailsDialog');
                    spyOn(identityRequestService, 'showRoleDetailsDialog');

                    spTranslateFilter.configureCatalog({
                        'ui_identity_request_item_add_role_operation': 'Add Role',
                        'ui_identity_request_item_add_entitlement_operation': 'Add Entitlement',
                        'ui_identity_request_item_operation_details': '{0} on {1}',
                        'ui_identity_request_item_create_operation': 'CREATE',
                        'ui_identity_request_item_remove_operation': 'remove {0}'
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                    if ($scope) {
                        $scope.$destroy();
                    }
                });

                function compile(requestItem, request) {
                    var eltDef = '<sp-identity-request-item-operation-details sp-request-item="item" sp-request="request"/>';
                    element = angular.element(eltDef);

                    $scope.item = requestItem;
                    $scope.request = request;

                    $compile(element)($scope);
                    $scope.$digest();

                    return element;
                }

                function createController(item, request) {
                    var bindings = {
                        item: item,
                        request: request
                    };
                    var ctrl = $componentController('spIdentityRequestItemOperationDetails', null, bindings);
                    ctrl.$onInit();
                    return ctrl;
                }

                describe('controller', function () {

                    it('throws if not initialized correctly', function () {
                        expect(function () {
                            return createController(null, identityRequest);
                        }).toThrow();
                        expect(function () {
                            return createController(identityRequestItem, null);
                        }).toThrow();
                    });

                    it('returns true if the item is of type role', function () {
                        var ctrl = createController(identityRequestItem, identityRequest);
                        expect(ctrl.isRole()).toEqual(true);
                        expect(ctrl.isEntitlement()).toEqual(false);
                    });

                    it('returns true if the item is an entitlement', function () {
                        var requestItem = identityRequestItem;
                        requestItem.role = false;
                        requestItem.entitlement = true;

                        var ctrl = createController(requestItem, identityRequest);
                        expect(ctrl.isRole()).toEqual(false);
                        expect(ctrl.isEntitlement()).toEqual(true);
                    });

                    it('returns true for add operation', function () {
                        var ctrl = createController(identityRequestItem, identityRequest);
                        expect(ctrl.isAddOperation()).toEqual(true);
                        expect(ctrl.isSetOperation()).toEqual(false);
                        expect(ctrl.isRevokeOperation()).toEqual(false);
                        expect(ctrl.isUnlockOperation()).toEqual(false);
                        expect(ctrl.isCreateOperation()).toEqual(false);
                    });

                    it('returns true for unlock operation', function () {
                        var ctrl = createController(new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_6.items[0]), new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_6));
                        expect(ctrl.isUnlockOperation()).toEqual(true);
                    });

                    it('returns true for delete operation', function () {
                        var ctrl = createController(new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_7.items[0]), new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_7));
                        expect(ctrl.isDeleteOperation()).toEqual(true);
                    });

                    it('returns true for disable operation', function () {
                        var ctrl = createController(new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_4.items[0]), new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_4));
                        expect(ctrl.isDisableOperation()).toEqual(true);
                    });

                    it('returns true for enable operation', function () {
                        var ctrl = createController(new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_5.items[0]), new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_5));
                        expect(ctrl.isEnableOperation()).toEqual(true);
                    });

                    describe('getOperationMessageKey', function () {
                        it('returns correct key with lower case operation', function () {
                            var item = new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_5.items[0]),
                                request = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_5),
                                ctrl = createController(item, request);
                            expect(ctrl.getOperationMessageKey()).toEqual('ui_identity_request_item_enable_operation');
                            item.operation = 'DUMB';
                            ctrl = createController(item, request);
                            expect(ctrl.getOperationMessageKey()).toEqual('ui_identity_request_item_dumb_operation');
                        });
                    });

                    describe('getItemDisplayValueForOperation', function () {
                        it('returns displayValue for non-account operations', function () {
                            var ctrl = createController(identityRequestItem, identityRequest);
                            spyOn(ctrl, 'isAccountOperation').and.returnValue(false);
                            expect(ctrl.getItemDisplayValueForOperation()).toEqual(identityRequestItem.displayableValue);
                        });

                        it('returns displayable account name for account operations', function () {
                            var ctrl = createController(identityRequestItem, identityRequest);
                            spyOn(ctrl, 'isAccountOperation').and.returnValue(true);
                            expect(ctrl.getItemDisplayValueForOperation()).toEqual(identityRequestItem.displayableAccountName);
                        });
                    });
                });

                describe('role requests', function () {
                    it('shows the role name with correct key for operation', function () {
                        compile(identityRequestItem, identityRequest);
                        expect(element.text()).toContain('Add Role:');
                        expect(element.text()).toContain(identityRequestItem.displayableValue);
                    });

                    it('calls method to show details when clicked', function () {
                        compile(identityRequestItem, identityRequest);
                        element.find('a').click();
                        $scope.$apply();
                        expect(identityRequestService.showRoleDetailsDialog).toHaveBeenCalled();
                    });
                });

                describe('entitlement requests', function () {
                    var item = undefined,
                        request = undefined;

                    beforeEach(function () {
                        item = new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_2.items[0]);
                        request = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_2);
                    });

                    it('shows the entitlement value and application name with correct key for operation', function () {
                        compile(item, request);
                        expect(element.text()).toContain('Add Entitlement:');
                        expect(element.text()).toContain(item.displayableValue + ' on ' + item.applicationName);
                    });

                    it('calls method to show details when clicked', function () {
                        compile(item, request);
                        element.find('a').click();
                        $scope.$apply();
                        expect(identityRequestService.showManagedAttributeDetailsDialog).toHaveBeenCalled();
                    });
                });

                describe('other requests', function () {
                    it('shows the account name and application name with correct key for operation on account things', function () {
                        var item = new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_3.items[0]),
                            request = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_3);
                        compile(item, request);
                        expect(element.text()).toContain('CREATE:');
                        expect(element.text()).toContain(item.displayableAccountName + ' on ' + item.applicationName);
                    });

                    it('shows the display value and application name with correct key for operation on non-account things', function () {
                        var item = new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_PAM.items[0]),
                            request = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_PAM);
                        compile(item, request);
                        expect(element.text()).toContain('remove ' + item.name + ':');
                        expect(element.text()).toContain(item.displayableValue + ' on ' + item.applicationName);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SXRlbU9wZXJhdGlvbkRldGFpbHNDb21wb25lbnRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUNBQXlDLDRDQUE0QyxVQUFVLFNBQVM7Ozs7O0lBS2hKOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQztXQUMvRCxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsZ0RBQWdELFlBQVc7O2dCQUVoRSxJQUFJLHlCQUFzQjtvQkFBRSwwQkFBdUI7b0JBQUUsdUJBQW9CO29CQUFFLFdBQVE7b0JBQUUsU0FBTTtvQkFDdkYsc0JBQW1CO29CQUFFLFVBQU87b0JBQUUsc0JBQW1CO29CQUFFLGtCQUFlO29CQUFFLGtCQUFlOztnQkFFdkYsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFDLDBCQUEwQix3QkFBd0IsMkJBQ2pFLFlBQVksWUFBWSx1QkFBdUIsbUJBQW1CLG1CQUFzQjs7b0JBRXhGLFdBQVc7b0JBQ1gsdUJBQXVCO29CQUN2Qix5QkFBeUI7b0JBQ3pCLDBCQUEwQjtvQkFDMUIsc0JBQXNCO29CQUN0QixrQkFBa0I7b0JBQ2xCLHNCQUFzQixJQUFJLG9CQUFvQix3QkFBd0IsbUJBQW1CLE1BQU07b0JBQy9GLGtCQUFrQixJQUFJLGdCQUFnQix3QkFBd0I7b0JBQzlELFNBQVM7O29CQUVULE1BQU0sd0JBQXdCO29CQUM5QixNQUFNLHdCQUF3Qjs7b0JBRTlCLGtCQUFrQixpQkFBaUI7d0JBQy9CLCtDQUFnRDt3QkFDaEQsc0RBQXVEO3dCQUN2RCw4Q0FBK0M7d0JBQy9DLDZDQUE4Qzt3QkFDOUMsNkNBQThDOzs7O2dCQUl0RCxVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNU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RixVQUFVLElBQUksZ0JBQWdCLHdCQUF3Qjt3QkFDMUQsUUFBUSxNQUFNO3dCQUNkLE9BQU8sUUFBUSxRQUFRLFVBQVU7d0JBQ2pDLE9BQU8sUUFBUSxRQUFRLFVBQVUsS0FBSyx5QkFBeUIsU0FBUyxLQUFLOzs7b0JBR2pGLEdBQUcscUdBQXFHLFlBQU07d0JBQzFHLElBQUksT0FBTyxJQUFJLG9CQUFvQix3QkFBd0IscUJBQXFCLE1BQU07NEJBQ2xGLFVBQVUsSUFBSSxnQkFBZ0Isd0JBQXdCO3dCQUMxRCxRQUFRLE1BQU07d0JBQ2QsT0FBTyxRQUFRLFFBQVEsVUFBVSxZQUFZLEtBQUssT0FBTzt3QkFDekQsT0FBTyxRQUFRLFFBQVEsVUFBVSxLQUFLLG1CQUFtQixTQUFTLEtBQUs7Ozs7OztHQWdCaEYiLCJmaWxlIjoiaWRlbnRpdHlSZXF1ZXN0L2NvbXBvbmVudC9JZGVudGl0eVJlcXVlc3RJdGVtT3BlcmF0aW9uRGV0YWlsc0NvbXBvbmVudFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xyXG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XHJcblxyXG5kZXNjcmliZSgnSWRlbnRpdHlSZXF1ZXN0SXRlbU9wZXJhdGlvbkRldGFpbHNDb21wb25lbnQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEsICRjb21wb25lbnRDb250cm9sbGVyLCAkY29tcGlsZSwgJHNjb3BlLFxyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdEl0ZW0sIGVsZW1lbnQsIElkZW50aXR5UmVxdWVzdEl0ZW0sIElkZW50aXR5UmVxdWVzdCwgaWRlbnRpdHlSZXF1ZXN0O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5UmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDggKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV8sIF8kY29tcG9uZW50Q29udHJvbGxlcl8sIF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV8sXHJcbiAgICAgICAgXyRjb21waWxlXywgJHJvb3RTY29wZSwgX0lkZW50aXR5UmVxdWVzdEl0ZW1fLCBfSWRlbnRpdHlSZXF1ZXN0Xywgc3BUcmFuc2xhdGVGaWx0ZXIpID0+IHtcclxuXHJcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xyXG4gICAgICAgICRjb21wb25lbnRDb250cm9sbGVyID0gXyRjb21wb25lbnRDb250cm9sbGVyXztcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlID0gX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhID0gX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXztcclxuICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtID0gX0lkZW50aXR5UmVxdWVzdEl0ZW1fO1xyXG4gICAgICAgIElkZW50aXR5UmVxdWVzdCA9IF9JZGVudGl0eVJlcXVlc3RfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdEl0ZW0gPSBuZXcgSWRlbnRpdHlSZXF1ZXN0SXRlbShpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUXzEuaXRlbXNbMF0pO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdCA9IG5ldyBJZGVudGl0eVJlcXVlc3QoaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF8xKTtcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlO1xyXG5cclxuICAgICAgICBzcHlPbihpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCAnc2hvd01hbmFnZWRBdHRyaWJ1dGVEZXRhaWxzRGlhbG9nJyk7XHJcbiAgICAgICAgc3B5T24oaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgJ3Nob3dSb2xlRGV0YWlsc0RpYWxvZycpO1xyXG5cclxuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5jb25maWd1cmVDYXRhbG9nKHtcclxuICAgICAgICAgICAgJ3VpX2lkZW50aXR5X3JlcXVlc3RfaXRlbV9hZGRfcm9sZV9vcGVyYXRpb24nIDogJ0FkZCBSb2xlJyxcclxuICAgICAgICAgICAgJ3VpX2lkZW50aXR5X3JlcXVlc3RfaXRlbV9hZGRfZW50aXRsZW1lbnRfb3BlcmF0aW9uJyA6ICdBZGQgRW50aXRsZW1lbnQnLFxyXG4gICAgICAgICAgICAndWlfaWRlbnRpdHlfcmVxdWVzdF9pdGVtX29wZXJhdGlvbl9kZXRhaWxzJyA6ICd7MH0gb24gezF9JyxcclxuICAgICAgICAgICAgJ3VpX2lkZW50aXR5X3JlcXVlc3RfaXRlbV9jcmVhdGVfb3BlcmF0aW9uJyA6ICdDUkVBVEUnLFxyXG4gICAgICAgICAgICAndWlfaWRlbnRpdHlfcmVxdWVzdF9pdGVtX3JlbW92ZV9vcGVyYXRpb24nIDogJ3JlbW92ZSB7MH0nXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBpbGUocmVxdWVzdEl0ZW0sIHJlcXVlc3QpIHtcclxuICAgICAgICBsZXQgZWx0RGVmID0gYDxzcC1pZGVudGl0eS1yZXF1ZXN0LWl0ZW0tb3BlcmF0aW9uLWRldGFpbHMgc3AtcmVxdWVzdC1pdGVtPVwiaXRlbVwiIHNwLXJlcXVlc3Q9XCJyZXF1ZXN0XCIvPmA7XHJcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbHREZWYpO1xyXG5cclxuICAgICAgICAkc2NvcGUuaXRlbSA9IHJlcXVlc3RJdGVtO1xyXG4gICAgICAgICRzY29wZS5yZXF1ZXN0ID0gcmVxdWVzdDtcclxuXHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKGl0ZW0sIHJlcXVlc3QpIHtcclxuICAgICAgICBsZXQgYmluZGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXHJcbiAgICAgICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBjdHJsID0gJGNvbXBvbmVudENvbnRyb2xsZXIoJ3NwSWRlbnRpdHlSZXF1ZXN0SXRlbU9wZXJhdGlvbkRldGFpbHMnLCBudWxsLCBiaW5kaW5ncyk7XHJcbiAgICAgICAgY3RybC4kb25Jbml0KCk7XHJcbiAgICAgICAgcmV0dXJuIGN0cmw7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnRyb2xsZXInLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3MgaWYgbm90IGluaXRpYWxpemVkIGNvcnJlY3RseScsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUNvbnRyb2xsZXIobnVsbCwgaWRlbnRpdHlSZXF1ZXN0KSkudG9UaHJvdygpO1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcihpZGVudGl0eVJlcXVlc3RJdGVtLCBudWxsKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBpdGVtIGlzIG9mIHR5cGUgcm9sZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGlkZW50aXR5UmVxdWVzdEl0ZW0sIGlkZW50aXR5UmVxdWVzdCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzUm9sZSgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0VudGl0bGVtZW50KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBpdGVtIGlzIGFuIGVudGl0bGVtZW50JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdEl0ZW0gPSBpZGVudGl0eVJlcXVlc3RJdGVtO1xyXG4gICAgICAgICAgICByZXF1ZXN0SXRlbS5yb2xlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlcXVlc3RJdGVtLmVudGl0bGVtZW50ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihyZXF1ZXN0SXRlbSwgaWRlbnRpdHlSZXF1ZXN0KTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNSb2xlKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0VudGl0bGVtZW50KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGFkZCBvcGVyYXRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpZGVudGl0eVJlcXVlc3RJdGVtLCBpZGVudGl0eVJlcXVlc3QpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0FkZE9wZXJhdGlvbigpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NldE9wZXJhdGlvbigpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNSZXZva2VPcGVyYXRpb24oKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzVW5sb2NrT3BlcmF0aW9uKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0NyZWF0ZU9wZXJhdGlvbigpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgdW5sb2NrIG9wZXJhdGlvbicsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKFxyXG4gICAgICAgICAgICAgICAgbmV3IElkZW50aXR5UmVxdWVzdEl0ZW0oaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF82Lml0ZW1zWzBdKSxcclxuICAgICAgICAgICAgICAgIG5ldyBJZGVudGl0eVJlcXVlc3QoaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF82KSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzVW5sb2NrT3BlcmF0aW9uKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGRlbGV0ZSBvcGVyYXRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihcclxuICAgICAgICAgICAgICAgIG5ldyBJZGVudGl0eVJlcXVlc3RJdGVtKGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfNy5pdGVtc1swXSksXHJcbiAgICAgICAgICAgICAgICBuZXcgSWRlbnRpdHlSZXF1ZXN0KGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfNykpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0RlbGV0ZU9wZXJhdGlvbigpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBkaXNhYmxlIG9wZXJhdGlvbicsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKFxyXG4gICAgICAgICAgICAgICAgbmV3IElkZW50aXR5UmVxdWVzdEl0ZW0oaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF80Lml0ZW1zWzBdKSxcclxuICAgICAgICAgICAgICAgIG5ldyBJZGVudGl0eVJlcXVlc3QoaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF80KSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRGlzYWJsZU9wZXJhdGlvbigpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBlbmFibGUgb3BlcmF0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoXHJcbiAgICAgICAgICAgICAgICBuZXcgSWRlbnRpdHlSZXF1ZXN0SXRlbShpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUXzUuaXRlbXNbMF0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IElkZW50aXR5UmVxdWVzdChpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUXzUpKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNFbmFibGVPcGVyYXRpb24oKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2dldE9wZXJhdGlvbk1lc3NhZ2VLZXknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGNvcnJlY3Qga2V5IHdpdGggbG93ZXIgY2FzZSBvcGVyYXRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBJZGVudGl0eVJlcXVlc3RJdGVtKGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfNS5pdGVtc1swXSksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCA9IG5ldyBJZGVudGl0eVJlcXVlc3QoaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF81KSxcclxuICAgICAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldE9wZXJhdGlvbk1lc3NhZ2VLZXkoKSkudG9FcXVhbCgndWlfaWRlbnRpdHlfcmVxdWVzdF9pdGVtX2VuYWJsZV9vcGVyYXRpb24nKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ub3BlcmF0aW9uID0gJ0RVTUInO1xyXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRPcGVyYXRpb25NZXNzYWdlS2V5KCkpLnRvRXF1YWwoJ3VpX2lkZW50aXR5X3JlcXVlc3RfaXRlbV9kdW1iX29wZXJhdGlvbicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2dldEl0ZW1EaXNwbGF5VmFsdWVGb3JPcGVyYXRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ICgncmV0dXJucyBkaXNwbGF5VmFsdWUgZm9yIG5vbi1hY2NvdW50IG9wZXJhdGlvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaWRlbnRpdHlSZXF1ZXN0SXRlbSwgaWRlbnRpdHlSZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIHNweU9uKGN0cmwsICdpc0FjY291bnRPcGVyYXRpb24nKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0SXRlbURpc3BsYXlWYWx1ZUZvck9wZXJhdGlvbigpKS50b0VxdWFsKGlkZW50aXR5UmVxdWVzdEl0ZW0uZGlzcGxheWFibGVWYWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgZGlzcGxheWFibGUgYWNjb3VudCBuYW1lIGZvciBhY2NvdW50IG9wZXJhdGlvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaWRlbnRpdHlSZXF1ZXN0SXRlbSwgaWRlbnRpdHlSZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIHNweU9uKGN0cmwsICdpc0FjY291bnRPcGVyYXRpb24nKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRJdGVtRGlzcGxheVZhbHVlRm9yT3BlcmF0aW9uKCkpLnRvRXF1YWwoaWRlbnRpdHlSZXF1ZXN0SXRlbS5kaXNwbGF5YWJsZUFjY291bnROYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgncm9sZSByZXF1ZXN0cycsICgpID0+IHtcclxuICAgICAgICBpdCgnc2hvd3MgdGhlIHJvbGUgbmFtZSB3aXRoIGNvcnJlY3Qga2V5IGZvciBvcGVyYXRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoaWRlbnRpdHlSZXF1ZXN0SXRlbSwgaWRlbnRpdHlSZXF1ZXN0KTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQudGV4dCgpKS50b0NvbnRhaW4oJ0FkZCBSb2xlOicpO1xyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC50ZXh0KCkpLnRvQ29udGFpbihpZGVudGl0eVJlcXVlc3RJdGVtLmRpc3BsYXlhYmxlVmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgbWV0aG9kIHRvIHNob3cgZGV0YWlscyB3aGVuIGNsaWNrZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoaWRlbnRpdHlSZXF1ZXN0SXRlbSwgaWRlbnRpdHlSZXF1ZXN0KTtcclxuICAgICAgICAgICAgZWxlbWVudC5maW5kKCdhJykuY2xpY2soKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5zaG93Um9sZURldGFpbHNEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdlbnRpdGxlbWVudCByZXF1ZXN0cycsICgpID0+IHtcclxuICAgICAgICBsZXQgaXRlbSwgcmVxdWVzdDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBuZXcgSWRlbnRpdHlSZXF1ZXN0SXRlbShpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUXzIuaXRlbXNbMF0pO1xyXG4gICAgICAgICAgICByZXF1ZXN0ID0gbmV3IElkZW50aXR5UmVxdWVzdChpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUXzIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgdGhlIGVudGl0bGVtZW50IHZhbHVlIGFuZCBhcHBsaWNhdGlvbiBuYW1lIHdpdGggY29ycmVjdCBrZXkgZm9yIG9wZXJhdGlvbicsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZShpdGVtLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQudGV4dCgpKS50b0NvbnRhaW4oJ0FkZCBFbnRpdGxlbWVudDonKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQudGV4dCgpKS50b0NvbnRhaW4oaXRlbS5kaXNwbGF5YWJsZVZhbHVlICsgJyBvbiAnICsgaXRlbS5hcHBsaWNhdGlvbk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgbWV0aG9kIHRvIHNob3cgZGV0YWlscyB3aGVuIGNsaWNrZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoaXRlbSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnYScpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdFNlcnZpY2Uuc2hvd01hbmFnZWRBdHRyaWJ1dGVEZXRhaWxzRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnb3RoZXIgcmVxdWVzdHMnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3Nob3dzIHRoZSBhY2NvdW50IG5hbWUgYW5kIGFwcGxpY2F0aW9uIG5hbWUgd2l0aCBjb3JyZWN0IGtleSBmb3Igb3BlcmF0aW9uIG9uIGFjY291bnQgdGhpbmdzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBJZGVudGl0eVJlcXVlc3RJdGVtKGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfMy5pdGVtc1swXSksXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0ID0gbmV3IElkZW50aXR5UmVxdWVzdChpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUXzMpO1xyXG4gICAgICAgICAgICBjb21waWxlKGl0ZW0sIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC50ZXh0KCkpLnRvQ29udGFpbignQ1JFQVRFOicpO1xyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC50ZXh0KCkpLnRvQ29udGFpbihpdGVtLmRpc3BsYXlhYmxlQWNjb3VudE5hbWUgKyAnIG9uICcgKyBpdGVtLmFwcGxpY2F0aW9uTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgZGlzcGxheSB2YWx1ZSBhbmQgYXBwbGljYXRpb24gbmFtZSB3aXRoIGNvcnJlY3Qga2V5IGZvciBvcGVyYXRpb24gb24gbm9uLWFjY291bnQgdGhpbmdzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBJZGVudGl0eVJlcXVlc3RJdGVtKGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfUEFNLml0ZW1zWzBdKSxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QgPSBuZXcgSWRlbnRpdHlSZXF1ZXN0KGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfUEFNKTtcclxuICAgICAgICAgICAgY29tcGlsZShpdGVtLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQudGV4dCgpKS50b0NvbnRhaW4oJ3JlbW92ZSAnICsgaXRlbS5uYW1lICsgJzonKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQudGV4dCgpKS50b0NvbnRhaW4oaXRlbS5kaXNwbGF5YWJsZVZhbHVlICsgJyBvbiAnICsgaXRlbS5hcHBsaWNhdGlvbk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
