System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/TestModule', './LinkTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_LinkTestData) {}],
        execute: function () {

            /**
             * Tests for the CurrentPasswordStepHandler.
             */
            describe('CurrentPasswordStepHandler', function () {

                var CurrentPasswordStepHandler = undefined,
                    testService = undefined,
                    link = undefined,
                    identityId = undefined,
                    currentPasswordLinks = undefined,
                    $q = undefined,
                    handler = undefined,
                    linkId = undefined,
                    linkPasswordMap = [];

                beforeEach(module(testModule, identityModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                beforeEach(inject(function (_CurrentPasswordStepHandler_, _testService_, _$q_, linkTestData, Link) {
                    CurrentPasswordStepHandler = _CurrentPasswordStepHandler_;
                    testService = _testService_;
                    $q = _$q_;
                    link = new Link(linkTestData.LINK1);
                    identityId = link.getIdentityId();
                    linkId = link.getId();
                    currentPasswordLinks = [link];
                    linkPasswordMap[linkId] = 'somepassword';
                    // Create the StepHandlers to test with.
                    handler = new CurrentPasswordStepHandler(currentPasswordLinks, linkPasswordMap, identityId, $q);
                }));

                describe('constructor', function () {
                    it('initializes values correctly', function () {
                        expect(handler.identityId).toEqual(identityId);
                        expect(handler.currentPasswordLinks[0]).toEqual(currentPasswordLinks[0]);
                        expect(handler.linkPasswordMap[linkId]).toEqual(linkPasswordMap[linkId]);
                    });
                });

                it('returns the title', function () {
                    expect(handler.getTitle()).toEqual('ui_manage_passwords_sync_submit');
                });

                it('returns the step id', function () {
                    expect(handler.getStepId()).toEqual('currentPasswordInput');
                });

                it('returns the get save button label', function () {
                    expect(handler.getSaveButtonLabel(false)).toEqual('ui_identity_password_continue');
                });

                describe('isSaveDisabled', function () {
                    it('enable save button when current password presents', function () {
                        expect(handler.isSaveDisabled()).toBeFalsy();
                    });

                    it('disable save button when current password is undefined', function () {
                        handler.linkPasswordMap[linkId] = undefined;
                        expect(handler.isSaveDisabled()).toBeTruthy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0N1cnJlbnRQYXNzd29yZFN0ZXBIYW5kbGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixzQkFBc0IsbUJBQW1CLFVBQVUsU0FBUzs7O0lBRy9IOztJQUVBLElBQUksZ0JBQWdCO0lBQ3BCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCO1dBQ2hDLFVBQVUsZUFBZTtRQUM1QixTQUFTLFlBQVk7Ozs7O1lBRjdCLFNBQVMsOEJBQThCLFlBQVc7O2dCQUU5QyxJQUFJLDZCQUEwQjtvQkFBRSxjQUFXO29CQUFFLE9BQUk7b0JBQUUsYUFBVTtvQkFBRSx1QkFBb0I7b0JBQUUsS0FBRTtvQkFBRSxVQUFPO29CQUM1RixTQUFNO29CQUFFLGtCQUFrQjs7Z0JBRTlCLFdBQVcsT0FBTyxZQUFZOzs7OztnQkFLOUIsV0FBVyxPQUFPLFVBQVMsOEJBQThCLGVBQWUsTUFBTSxjQUFjLE1BQU07b0JBQzlGLDZCQUE2QjtvQkFDN0IsY0FBYztvQkFDZCxLQUFLO29CQUNMLE9BQU8sSUFBSSxLQUFLLGFBQWE7b0JBQzdCLGFBQWEsS0FBSztvQkFDbEIsU0FBUyxLQUFLO29CQUNkLHVCQUF1QixDQUFDO29CQUN4QixnQkFBZ0IsVUFBVTs7b0JBRTFCLFVBQVUsSUFBSSwyQkFBMkIsc0JBQXNCLGlCQUFpQixZQUFZOzs7Z0JBR2hHLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLGdDQUFnQyxZQUFXO3dCQUMxQyxPQUFPLFFBQVEsWUFBWSxRQUFRO3dCQUNuQyxPQUFPLFFBQVEscUJBQXFCLElBQUksUUFBUSxxQkFBcUI7d0JBQ3JFLE9BQU8sUUFBUSxnQkFBZ0IsU0FBUyxRQUFRLGdCQUFnQjs7OztnQkFJeEUsR0FBRyxxQkFBcUIsWUFBVztvQkFDL0IsT0FBTyxRQUFRLFlBQVksUUFBUTs7O2dCQUd2QyxHQUFHLHVCQUF1QixZQUFXO29CQUNqQyxPQUFPLFFBQVEsYUFBYSxRQUFROzs7Z0JBR3hDLEdBQUcscUNBQXFDLFlBQVc7b0JBQy9DLE9BQU8sUUFBUSxtQkFBbUIsUUFBUSxRQUFROzs7Z0JBR3RELFNBQVMsa0JBQWtCLFlBQVc7b0JBQ2xDLEdBQUcscURBQXFELFlBQVc7d0JBQy9ELE9BQU8sUUFBUSxrQkFBa0I7OztvQkFHckMsR0FBRywwREFBMEQsWUFBVzt3QkFDcEUsUUFBUSxnQkFBZ0IsVUFBVTt3QkFDbEMsT0FBTyxRQUFRLGtCQUFrQjs7Ozs7O0dBb0IxQyIsImZpbGUiOiJpZGVudGl0eS9DdXJyZW50UGFzc3dvcmRTdGVwSGFuZGxlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgJy4vTGlua1Rlc3REYXRhJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIEN1cnJlbnRQYXNzd29yZFN0ZXBIYW5kbGVyLlxuICovXG5kZXNjcmliZSgnQ3VycmVudFBhc3N3b3JkU3RlcEhhbmRsZXInLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBDdXJyZW50UGFzc3dvcmRTdGVwSGFuZGxlciwgdGVzdFNlcnZpY2UsIGxpbmssIGlkZW50aXR5SWQsIGN1cnJlbnRQYXNzd29yZExpbmtzLCAkcSwgaGFuZGxlcixcbiAgICAgICAgbGlua0lkLCBsaW5rUGFzc3dvcmRNYXAgPSBbXTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIGlkZW50aXR5TW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBJbmplY3QgdGhlIGRlcGVuZGVuY2llcyBhbmQgc2V0dXAgbW9ja3MuXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0N1cnJlbnRQYXNzd29yZFN0ZXBIYW5kbGVyXywgX3Rlc3RTZXJ2aWNlXywgXyRxXywgbGlua1Rlc3REYXRhLCBMaW5rKSB7XG4gICAgICAgIEN1cnJlbnRQYXNzd29yZFN0ZXBIYW5kbGVyID0gX0N1cnJlbnRQYXNzd29yZFN0ZXBIYW5kbGVyXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgIGxpbmsgPSBuZXcgTGluayhsaW5rVGVzdERhdGEuTElOSzEpO1xuICAgICAgICBpZGVudGl0eUlkID0gbGluay5nZXRJZGVudGl0eUlkKCk7XG4gICAgICAgIGxpbmtJZCA9IGxpbmsuZ2V0SWQoKTtcbiAgICAgICAgY3VycmVudFBhc3N3b3JkTGlua3MgPSBbbGlua107XG4gICAgICAgIGxpbmtQYXNzd29yZE1hcFtsaW5rSWRdID0gJ3NvbWVwYXNzd29yZCc7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgU3RlcEhhbmRsZXJzIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgaGFuZGxlciA9IG5ldyBDdXJyZW50UGFzc3dvcmRTdGVwSGFuZGxlcihjdXJyZW50UGFzc3dvcmRMaW5rcywgbGlua1Bhc3N3b3JkTWFwLCBpZGVudGl0eUlkLCAkcSk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdpbml0aWFsaXplcyB2YWx1ZXMgY29ycmVjdGx5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5pZGVudGl0eUlkKS50b0VxdWFsKGlkZW50aXR5SWQpO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuY3VycmVudFBhc3N3b3JkTGlua3NbMF0pLnRvRXF1YWwoY3VycmVudFBhc3N3b3JkTGlua3NbMF0pO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIubGlua1Bhc3N3b3JkTWFwW2xpbmtJZF0pLnRvRXF1YWwobGlua1Bhc3N3b3JkTWFwW2xpbmtJZF0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSB0aXRsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoaGFuZGxlci5nZXRUaXRsZSgpKS50b0VxdWFsKCd1aV9tYW5hZ2VfcGFzc3dvcmRzX3N5bmNfc3VibWl0Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgc3RlcCBpZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoaGFuZGxlci5nZXRTdGVwSWQoKSkudG9FcXVhbCgnY3VycmVudFBhc3N3b3JkSW5wdXQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBnZXQgc2F2ZSBidXR0b24gbGFiZWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIuZ2V0U2F2ZUJ1dHRvbkxhYmVsKGZhbHNlKSkudG9FcXVhbCgndWlfaWRlbnRpdHlfcGFzc3dvcmRfY29udGludWUnKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1NhdmVEaXNhYmxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnZW5hYmxlIHNhdmUgYnV0dG9uIHdoZW4gY3VycmVudCBwYXNzd29yZCBwcmVzZW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuaXNTYXZlRGlzYWJsZWQoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkaXNhYmxlIHNhdmUgYnV0dG9uIHdoZW4gY3VycmVudCBwYXNzd29yZCBpcyB1bmRlZmluZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGhhbmRsZXIubGlua1Bhc3N3b3JkTWFwW2xpbmtJZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
