System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('IdentityAttributeCtrl', function () {
                var $controller = undefined,
                    $rootScope = undefined,
                    $stateParams = undefined,
                    $q = undefined,
                    manageAccountDataService = undefined,
                    manageAccountService = undefined,
                    QuickLink = undefined,
                    identityService = undefined,
                    IdentityAttributes = undefined,
                    navigationService = undefined,
                    attrs = undefined,
                    testService = undefined,
                    spModal = undefined,
                    timeoutService = undefined;

                beforeEach(module(identityModule, testModule));

                /* jshint maxparams: 13 */
                beforeEach(inject(function (_$controller_, _manageAccountDataService_, _$rootScope_, _$stateParams_, _QuickLink_, _testService_, _manageAccountService_, _identityService_, _IdentityAttributes_, _navigationService_, _spModal_, _$timeout_, _$q_) {
                    $controller = _$controller_;
                    manageAccountDataService = _manageAccountDataService_;
                    manageAccountService = _manageAccountService_;
                    identityService = _identityService_;
                    $stateParams = _$stateParams_;
                    $rootScope = _$rootScope_;
                    IdentityAttributes = IdentityAttributes;
                    navigationService = _navigationService_;
                    QuickLink = _QuickLink_;
                    testService = _testService_;
                    spModal = _spModal_;
                    timeoutService = _$timeout_;
                    $q = _$q_;

                    attrs = [{ attributeName: 'id', value: 'someId' }, { attributeName: 'name', value: 'someName' }];

                    // Mock out the identity service
                    identityService.getIdentityAttributes = testService.createPromiseSpy(false, {
                        status: 200,
                        data: attrs
                    }, {});
                    var map = {},
                        qlData = { name: 'viewIdentityQuickLinkName' };
                    map[QuickLink.Actions.VIEW_IDENTITY] = new QuickLink(qlData);
                    identityService.getAvailableActionsMap = function () {
                        return map;
                    };
                }));

                function createController() {
                    $stateParams.identityId = 'someId';
                    $stateParams.quickLink = 'viewIdentityQuickLinkName';
                    return $controller('IdentityAttributeCtrl', {
                        $stateParams: $stateParams,
                        manageAccountDataService: manageAccountDataService,
                        manageAccountService: manageAccountService,
                        identityService: identityService,
                        IdentityAttributes: IdentityAttributes,
                        navigationService: navigationService,
                        QuickLink: QuickLink
                    });
                }

                describe('constructor', function () {
                    it('should identityService getIdentityAttributes', function () {
                        createController();
                        expect(identityService.getIdentityAttributes).toHaveBeenCalledWith('viewIdentityQuickLinkName', 'someId');
                    });
                });

                describe('getIdentityAttributes', function () {
                    it('should get identity attributes', function () {
                        var ctrl = createController(),
                            attributes = undefined;
                        //Mock attributes
                        ctrl.attributes = attrs;
                        attributes = ctrl.getIdentityAttributes();
                        expect(attributes).toEqual(attrs);
                    });
                });

                describe('constructor', function () {
                    it('should open error dialog when quicklink is not definded', function () {
                        identityService.getAvailableActionsMap = function () {
                            return {};
                        };
                        spyOn(spModal, 'open').and.returnValue({ result: $q.when() });
                        spyOn(identityService, 'goBack').and.returnValue({});
                        createController();
                        timeoutService.flush();
                        expect(spModal.open).toHaveBeenCalled();
                        expect(identityService.goBack).toHaveBeenCalled();
                        var callArgs = spModal.open.calls.mostRecent().args;
                        expect(callArgs[0].title).toEqual('ui_identity_error_unable_to_manage_id_title');
                        expect(callArgs[0].warningLevel).toEqual('error');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5QXR0cmlidXRlQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsdUJBQXVCLFVBQVUsU0FBUzs7OztJQUk3Rzs7SUFFQSxJQUFJLGdCQUFnQjtJQUNwQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLHlCQUF5QixZQUFXO2dCQUN6QyxJQUFJLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSxlQUFZO29CQUFFLEtBQUU7b0JBQUUsMkJBQXdCO29CQUFFLHVCQUFvQjtvQkFBRSxZQUFTO29CQUNwRyxrQkFBZTtvQkFBRSxxQkFBa0I7b0JBQUUsb0JBQWlCO29CQUFFLFFBQUs7b0JBQUUsY0FBVztvQkFBRSxVQUFPO29CQUFFLGlCQUFjOztnQkFFdkcsV0FBVyxPQUFPLGdCQUFnQjs7O2dCQUdsQyxXQUFXLE9BQU8sVUFBUyxlQUFlLDRCQUE0QixjQUFjLGdCQUFnQixhQUM1RixlQUFlLHdCQUF3QixtQkFBbUIsc0JBQXNCLHFCQUNoRixXQUFXLFlBQVksTUFBTTtvQkFDakMsY0FBYztvQkFDZCwyQkFBMkI7b0JBQzNCLHVCQUF1QjtvQkFDdkIsa0JBQWtCO29CQUNsQixlQUFlO29CQUNmLGFBQWE7b0JBQ2IscUJBQXFCO29CQUNyQixvQkFBb0I7b0JBQ3BCLFlBQVk7b0JBQ1osY0FBYztvQkFDZCxVQUFVO29CQUNWLGlCQUFpQjtvQkFDakIsS0FBSzs7b0JBRUwsUUFBUSxDQUFDLEVBQUMsZUFBZSxNQUFNLE9BQU8sWUFDOUIsRUFBQyxlQUFlLFFBQVEsT0FBTzs7O29CQUd2QyxnQkFBZ0Isd0JBQ1osWUFBWSxpQkFBaUIsT0FBTzt3QkFDaEMsUUFBUTt3QkFDUixNQUFNO3VCQUNQO29CQUNQLElBQUksTUFBTTt3QkFDTixTQUFTLEVBQUMsTUFBTTtvQkFDcEIsSUFBSSxVQUFVLFFBQVEsaUJBQWlCLElBQUksVUFBVTtvQkFDckQsZ0JBQWdCLHlCQUF5QixZQUFXO3dCQUFFLE9BQU87Ozs7Z0JBR2pFLFNBQVMsbUJBQW1CO29CQUN4QixhQUFhLGFBQWE7b0JBQzFCLGFBQWEsWUFBWTtvQkFDekIsT0FBTyxZQUFZLHlCQUF5Qjt3QkFDeEMsY0FBYzt3QkFDZCwwQkFBMEI7d0JBQzFCLHNCQUFzQjt3QkFDdEIsaUJBQWlCO3dCQUNqQixvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsV0FBVzs7OztnQkFJbkIsU0FBUyxlQUFlLFlBQVc7b0JBQy9CLEdBQUcsZ0RBQWdELFlBQVc7d0JBQzFEO3dCQUNBLE9BQU8sZ0JBQWdCLHVCQUF1QixxQkFBcUIsNkJBQTZCOzs7O2dCQUl4RyxTQUFTLHlCQUF5QixZQUFXO29CQUN6QyxHQUFHLGtDQUFrQyxZQUFXO3dCQUM1QyxJQUFJLE9BQU87NEJBQW9CLGFBQVU7O3dCQUV6QyxLQUFLLGFBQWE7d0JBQ2xCLGFBQWEsS0FBSzt3QkFDbEIsT0FBTyxZQUFZLFFBQVE7Ozs7Z0JBSW5DLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLDJEQUEyRCxZQUFXO3dCQUNyRSxnQkFBZ0IseUJBQXlCLFlBQVc7NEJBQUUsT0FBTzs7d0JBQzdELE1BQU0sU0FBUyxRQUFRLElBQUksWUFBWSxFQUFDLFFBQVEsR0FBRzt3QkFDbkQsTUFBTSxpQkFBaUIsVUFBVSxJQUFJLFlBQVk7d0JBQ2pEO3dCQUNBLGVBQWU7d0JBQ2YsT0FBTyxRQUFRLE1BQU07d0JBQ3JCLE9BQU8sZ0JBQWdCLFFBQVE7d0JBQy9CLElBQUksV0FBVyxRQUFRLEtBQUssTUFBTSxhQUFhO3dCQUMvQyxPQUFPLFNBQVMsR0FBRyxPQUFPLFFBQVE7d0JBQ2xDLE9BQU8sU0FBUyxHQUFHLGNBQWMsUUFBUTs7Ozs7O0dBMkJsRCIsImZpbGUiOiJpZGVudGl0eS9JZGVudGl0eUF0dHJpYnV0ZUN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICovXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xyXG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0lkZW50aXR5QXR0cmlidXRlQ3RybCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0ICRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCAkc3RhdGVQYXJhbXMsICRxLCBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UsIG1hbmFnZUFjY291bnRTZXJ2aWNlLCBRdWlja0xpbmssXHJcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlLCBJZGVudGl0eUF0dHJpYnV0ZXMsIG5hdmlnYXRpb25TZXJ2aWNlLCBhdHRycywgdGVzdFNlcnZpY2UsIHNwTW9kYWwsIHRpbWVvdXRTZXJ2aWNlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5TW9kdWxlLCB0ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgLyoganNoaW50IG1heHBhcmFtczogMTMgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF9tYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2VfLCBfJHJvb3RTY29wZV8sIF8kc3RhdGVQYXJhbXNfLCBfUXVpY2tMaW5rXyxcclxuICAgICAgICAgICAgX3Rlc3RTZXJ2aWNlXywgX21hbmFnZUFjY291bnRTZXJ2aWNlXywgX2lkZW50aXR5U2VydmljZV8sIF9JZGVudGl0eUF0dHJpYnV0ZXNfLCBfbmF2aWdhdGlvblNlcnZpY2VfLFxyXG4gICAgICAgICAgICBfc3BNb2RhbF8sIF8kdGltZW91dF8sIF8kcV8pIHtcclxuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XHJcbiAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlID0gX21hbmFnZUFjY291bnREYXRhU2VydmljZV87XHJcbiAgICAgICAgbWFuYWdlQWNjb3VudFNlcnZpY2UgPSBfbWFuYWdlQWNjb3VudFNlcnZpY2VfO1xyXG4gICAgICAgIGlkZW50aXR5U2VydmljZSA9IF9pZGVudGl0eVNlcnZpY2VfO1xyXG4gICAgICAgICRzdGF0ZVBhcmFtcyA9IF8kc3RhdGVQYXJhbXNfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICAgICAgSWRlbnRpdHlBdHRyaWJ1dGVzID0gSWRlbnRpdHlBdHRyaWJ1dGVzO1xyXG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcclxuICAgICAgICBRdWlja0xpbmsgPSBfUXVpY2tMaW5rXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcclxuICAgICAgICB0aW1lb3V0U2VydmljZSA9IF8kdGltZW91dF87XHJcbiAgICAgICAgJHEgPSBfJHFfO1xyXG5cclxuICAgICAgICBhdHRycyA9IFt7YXR0cmlidXRlTmFtZTogJ2lkJywgdmFsdWU6ICdzb21lSWQnfSxcclxuICAgICAgICAgICAgICAgIHthdHRyaWJ1dGVOYW1lOiAnbmFtZScsIHZhbHVlOiAnc29tZU5hbWUnfV07XHJcblxyXG4gICAgICAgIC8vIE1vY2sgb3V0IHRoZSBpZGVudGl0eSBzZXJ2aWNlXHJcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlLmdldElkZW50aXR5QXR0cmlidXRlcyA9XHJcbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogYXR0cnNcclxuICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgIGxldCBtYXAgPSB7fSxcclxuICAgICAgICAgICAgcWxEYXRhID0ge25hbWU6ICd2aWV3SWRlbnRpdHlRdWlja0xpbmtOYW1lJ307XHJcbiAgICAgICAgbWFwW1F1aWNrTGluay5BY3Rpb25zLlZJRVdfSURFTlRJVFldID0gbmV3IFF1aWNrTGluayhxbERhdGEpO1xyXG4gICAgICAgIGlkZW50aXR5U2VydmljZS5nZXRBdmFpbGFibGVBY3Rpb25zTWFwID0gZnVuY3Rpb24oKSB7IHJldHVybiBtYXA7fTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKCkge1xyXG4gICAgICAgICRzdGF0ZVBhcmFtcy5pZGVudGl0eUlkID0gJ3NvbWVJZCc7XHJcbiAgICAgICAgJHN0YXRlUGFyYW1zLnF1aWNrTGluayA9ICd2aWV3SWRlbnRpdHlRdWlja0xpbmtOYW1lJztcclxuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ0lkZW50aXR5QXR0cmlidXRlQ3RybCcsIHtcclxuICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXMsXHJcbiAgICAgICAgICAgIG1hbmFnZUFjY291bnREYXRhU2VydmljZTogbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLFxyXG4gICAgICAgICAgICBtYW5hZ2VBY2NvdW50U2VydmljZTogbWFuYWdlQWNjb3VudFNlcnZpY2UsXHJcbiAgICAgICAgICAgIGlkZW50aXR5U2VydmljZTogaWRlbnRpdHlTZXJ2aWNlLFxyXG4gICAgICAgICAgICBJZGVudGl0eUF0dHJpYnV0ZXM6IElkZW50aXR5QXR0cmlidXRlcyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2U6IG5hdmlnYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICBRdWlja0xpbms6IFF1aWNrTGlua1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgaWRlbnRpdHlTZXJ2aWNlIGdldElkZW50aXR5QXR0cmlidXRlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVNlcnZpY2UuZ2V0SWRlbnRpdHlBdHRyaWJ1dGVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndmlld0lkZW50aXR5UXVpY2tMaW5rTmFtZScsICdzb21lSWQnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRJZGVudGl0eUF0dHJpYnV0ZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnc2hvdWxkIGdldCBpZGVudGl0eSBhdHRyaWJ1dGVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLCBhdHRyaWJ1dGVzO1xyXG4gICAgICAgICAgICAvL01vY2sgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICBjdHJsLmF0dHJpYnV0ZXMgPSBhdHRycztcclxuICAgICAgICAgICAgYXR0cmlidXRlcyA9IGN0cmwuZ2V0SWRlbnRpdHlBdHRyaWJ1dGVzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhdHRyaWJ1dGVzKS50b0VxdWFsKGF0dHJzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiBlcnJvciBkaWFsb2cgd2hlbiBxdWlja2xpbmsgaXMgbm90IGRlZmluZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlkZW50aXR5U2VydmljZS5nZXRBdmFpbGFibGVBY3Rpb25zTWFwID0gZnVuY3Rpb24oKSB7IHJldHVybiB7fTt9O1xyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7cmVzdWx0OiAkcS53aGVuKCl9KTtcclxuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlTZXJ2aWNlLCAnZ29CYWNrJykuYW5kLnJldHVyblZhbHVlKHt9KTtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICB0aW1lb3V0U2VydmljZS5mbHVzaCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVNlcnZpY2UuZ29CYWNrKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGxldCBjYWxsQXJncyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICAgICAgZXhwZWN0KGNhbGxBcmdzWzBdLnRpdGxlKS50b0VxdWFsKCd1aV9pZGVudGl0eV9lcnJvcl91bmFibGVfdG9fbWFuYWdlX2lkX3RpdGxlJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjYWxsQXJnc1swXS53YXJuaW5nTGV2ZWwpLnRvRXF1YWwoJ2Vycm9yJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
