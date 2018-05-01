System.register(['test/js/TestInitializer', 'adminConsole/provisioningTransaction/ProvisioningTransactionModule.js'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var provisioningTransactionModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleProvisioningTransactionProvisioningTransactionModuleJs) {
            provisioningTransactionModule = _adminConsoleProvisioningTransactionProvisioningTransactionModuleJs['default'];
        }],
        execute: function () {

            describe('ProvisioningTransactionOverrideDialogCtrl', function () {

                var $controller = undefined;

                beforeEach(module(provisioningTransactionModule));

                beforeEach(inject(function (_$controller_) {
                    $controller = _$controller_;
                }));

                function createController(selection, identity, comment) {
                    var ctrl = $controller('ProvisioningTransactionOverrideDialogCtrl', {});
                    ctrl.assignTo = { id: selection, displayName: 'message' };
                    ctrl.targetIdentity = identity;
                    ctrl.commentText = comment;
                    return ctrl;
                }

                describe('showSelect()', function () {
                    it('should return true if assign to other selected', function () {
                        var ctrl = undefined;
                        ctrl = createController('other');
                        expect(ctrl.showSelect()).toBeTruthy();
                    });
                    it('should return false if assign to self selected', function () {
                        var ctrl = undefined;
                        ctrl = createController('self');
                        expect(ctrl.showSelect()).toBeFalsy();
                    });
                });

                describe('getResult()', function () {
                    it('should return correct values', function () {
                        var ctrl = undefined,
                            identity = {},
                            result = undefined;
                        ctrl = createController('other', identity, 'comment');
                        result = ctrl.getResult();
                        expect(result.assignTo).toBe('other');
                        expect(result.identity).toBe(identity);
                        expect(result.comment).toBe('comment');
                    });
                });

                describe('enableOverride()', function () {
                    it('should return false if assign to other selected but no identity selected', function () {
                        var ctrl = undefined;
                        ctrl = createController('other');
                        expect(ctrl.enableOverride()).toBeFalsy();
                    });
                    it('should return true if assign to other selected and identity selected', function () {
                        var ctrl = undefined;
                        ctrl = createController('other', {});
                        expect(ctrl.enableOverride()).toBeTruthy();
                    });
                    it('should return true if assign to self selected', function () {
                        var ctrl = undefined;
                        ctrl = createController('self');
                        expect(ctrl.enableOverride()).toBeTruthy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbk92ZXJyaWRlRGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwRUFBMEUsVUFBVSxTQUFTOzs7SUFHckk7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHFFQUFxRTtZQUMzSCxnQ0FBZ0Msb0VBQW9FOztRQUV4RyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsNkNBQTZDLFlBQU07O2dCQUV4RCxJQUFJLGNBQVc7O2dCQUVmLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGVBQWtCO29CQUNqQyxjQUFjOzs7Z0JBR2xCLFNBQVMsaUJBQWlCLFdBQVcsVUFBVSxTQUFTO29CQUNwRCxJQUFJLE9BQU8sWUFBWSw2Q0FBNkM7b0JBQ3BFLEtBQUssV0FBVyxFQUFFLElBQUksV0FBVyxhQUFhO29CQUM5QyxLQUFLLGlCQUFpQjtvQkFDdEIsS0FBSyxjQUFjO29CQUNuQixPQUFPOzs7Z0JBR1gsU0FBUyxnQkFBZ0IsWUFBTTtvQkFDM0IsR0FBRyxrREFBa0QsWUFBTTt3QkFDdkQsSUFBSSxPQUFJO3dCQUNSLE9BQU8saUJBQWlCO3dCQUN4QixPQUFPLEtBQUssY0FBYzs7b0JBRTlCLEdBQUcsa0RBQWtELFlBQU07d0JBQ3ZELElBQUksT0FBSTt3QkFDUixPQUFPLGlCQUFpQjt3QkFDeEIsT0FBTyxLQUFLLGNBQWM7Ozs7Z0JBSWxDLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLGdDQUFnQyxZQUFNO3dCQUNyQyxJQUFJLE9BQUk7NEJBQUUsV0FBVzs0QkFBSSxTQUFNO3dCQUMvQixPQUFPLGlCQUFpQixTQUFTLFVBQVU7d0JBQzNDLFNBQVMsS0FBSzt3QkFDZCxPQUFPLE9BQU8sVUFBVSxLQUFLO3dCQUM3QixPQUFPLE9BQU8sVUFBVSxLQUFLO3dCQUM3QixPQUFPLE9BQU8sU0FBUyxLQUFLOzs7O2dCQUlwQyxTQUFTLG9CQUFvQixZQUFNO29CQUMvQixHQUFHLDRFQUE0RSxZQUFNO3dCQUNqRixJQUFJLE9BQUk7d0JBQ1IsT0FBTyxpQkFBaUI7d0JBQ3hCLE9BQU8sS0FBSyxrQkFBa0I7O29CQUVsQyxHQUFHLHdFQUF3RSxZQUFNO3dCQUM3RSxJQUFJLE9BQUk7d0JBQ1IsT0FBTyxpQkFBaUIsU0FBUzt3QkFDakMsT0FBTyxLQUFLLGtCQUFrQjs7b0JBRWxDLEdBQUcsaURBQWlELFlBQU07d0JBQ3RELElBQUksT0FBSTt3QkFDUixPQUFPLGlCQUFpQjt3QkFDeEIsT0FBTyxLQUFLLGtCQUFrQjs7Ozs7O0dBZXZDIiwiZmlsZSI6ImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbk92ZXJyaWRlRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uTW9kdWxlIGZyb20gJ2FkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbk1vZHVsZS5qcyc7XG5cbmRlc2NyaWJlKCdQcm92aXNpb25pbmdUcmFuc2FjdGlvbk92ZXJyaWRlRGlhbG9nQ3RybCcsICgpID0+IHtcblxuICAgIGxldCAkY29udHJvbGxlcjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb250cm9sbGVyXykgPT4ge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihzZWxlY3Rpb24sIGlkZW50aXR5LCBjb21tZW50KSB7XG4gICAgICAgIGxldCBjdHJsID0gJGNvbnRyb2xsZXIoJ1Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uT3ZlcnJpZGVEaWFsb2dDdHJsJywge30pO1xuICAgICAgICBjdHJsLmFzc2lnblRvID0geyBpZDogc2VsZWN0aW9uLCBkaXNwbGF5TmFtZTogJ21lc3NhZ2UnIH07XG4gICAgICAgIGN0cmwudGFyZ2V0SWRlbnRpdHkgPSBpZGVudGl0eTtcbiAgICAgICAgY3RybC5jb21tZW50VGV4dCA9IGNvbW1lbnQ7XG4gICAgICAgIHJldHVybiBjdHJsO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdzaG93U2VsZWN0KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgYXNzaWduIHRvIG90aGVyIHNlbGVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmw7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcignb3RoZXInKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dTZWxlY3QoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgYXNzaWduIHRvIHNlbGYgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybDtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCdzZWxmJyk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93U2VsZWN0KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRSZXN1bHQoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29ycmVjdCB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCwgaWRlbnRpdHkgPSB7fSwgcmVzdWx0O1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoJ290aGVyJywgaWRlbnRpdHksICdjb21tZW50Jyk7XG4gICAgICAgICAgICByZXN1bHQgPSBjdHJsLmdldFJlc3VsdCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5hc3NpZ25UbykudG9CZSgnb3RoZXInKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQuaWRlbnRpdHkpLnRvQmUoaWRlbnRpdHkpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5jb21tZW50KS50b0JlKCdjb21tZW50Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VuYWJsZU92ZXJyaWRlKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGFzc2lnbiB0byBvdGhlciBzZWxlY3RlZCBidXQgbm8gaWRlbnRpdHkgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybDtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCdvdGhlcicpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZW5hYmxlT3ZlcnJpZGUoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGFzc2lnbiB0byBvdGhlciBzZWxlY3RlZCBhbmQgaWRlbnRpdHkgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybDtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCdvdGhlcicsIHt9KTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmVuYWJsZU92ZXJyaWRlKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgYXNzaWduIHRvIHNlbGYgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybDtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCdzZWxmJyk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5lbmFibGVPdmVycmlkZSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
