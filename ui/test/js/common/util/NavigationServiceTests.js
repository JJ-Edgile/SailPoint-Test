System.register(['test/js/TestInitializer', 'common/util/UtilModule'], function (_export) {

    /**
     * Tests for the NavigationService.
     */
    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {
            describe('NavigationService', function () {
                var $rootScope, $state, $document, $location, navigationService, spNotificationService;

                beforeEach(module(utilModule, function ($provide) {
                    /* Mock the $window service so we do not actually attempt redirects */
                    $provide.decorator('$window', function ($delegate) {
                        return {
                            location: {
                                href: ''
                            },
                            document: $delegate.document
                        };
                    });
                }));

                beforeEach(inject(function (_$rootScope_, _$state_, _$document_, _$location_, _navigationService_, _spNotificationService_) {
                    $rootScope = _$rootScope_;
                    $state = _$state_;
                    $document = _$document_;
                    $location = _$location_;
                    navigationService = _navigationService_;
                    spNotificationService = _spNotificationService_;
                }));

                afterEach(function () {
                    $document.find('#transitionForm').remove();
                });

                describe('go', function () {

                    it('should delegate to $state service when no JSF form', function () {
                        var config = {
                            state: 'home',
                            stateParams: undefined
                        };

                        spyOn($state, 'go');
                        spyOn(spNotificationService, 'getNotifications');

                        navigationService.go(config);

                        expect($state.go).toHaveBeenCalledWith(config.state, config.stateParams);
                        expect(spNotificationService.getNotifications).not.toHaveBeenCalled();
                    });

                    it('should not delegate to $state service when the JSF form exists', function () {
                        var config = {
                            outcome: 'home'
                        };

                        $document.find('body').append('<form id="transitionForm">' + '  <button id="transitionForm:transBtn" onclick="return false;"></button>' + '</form>');

                        spyOn($state, 'go');
                        spyOn(spNotificationService, 'getNotifications');

                        navigationService.go(config);

                        expect($state.go).not.toHaveBeenCalled();
                        expect(spNotificationService.getNotifications).not.toHaveBeenCalled();
                    });

                    it('should throw if JSF form exists but button does not', function () {
                        var config = {
                            outcome: 'home'
                        };

                        $document.find('body').append('<form id="transitionForm">' + '</form>');

                        expect(function () {
                            navigationService.go(config);
                        }).toThrow();
                    });

                    it('should serialize any notification in the spNotificationService to the messages input', function () {
                        var config = {
                            back: true
                        },
                            notifications = [{
                            messageOrKey: 'key',
                            status: 'SUCCESS'
                        }],
                            msgsInput;

                        $document.find('body').append('<form id="transitionForm">' + '  <input id="transitionForm:messages" type="hidden" />' + '  <button id="transitionForm:transBtn" onclick="return false;"></button>' + '</form>');

                        spyOn(spNotificationService, 'getNotifications').and.returnValue(notifications);

                        navigationService.go(config);

                        msgsInput = $document[0].getElementById('transitionForm:messages');

                        expect(msgsInput).toBeTruthy();
                        expect(msgsInput.value).toEqual(JSON.stringify(notifications));
                        expect(spNotificationService.getNotifications).toHaveBeenCalled();
                    });
                });

                describe('history functions', function () {
                    var $window;

                    beforeEach(inject(function (_$window_) {
                        $window = _$window_;
                    }));

                    describe('push', function () {
                        it('should have the current url in history after it is pushed', function () {
                            var url = $window.location.href;
                            navigationService.push();
                            expect(navigationService.history.length).toBe(1);
                            expect(navigationService.history[0]).toEqual(url);
                        });
                    });

                    describe('back', function () {
                        var url = '/testUrl',
                            fullUrl = 'localhost/index.jsf#/testUrl';

                        beforeEach(function () {
                            spyOn(navigationService, 'go');
                        });

                        it('should update the location with the value from history if one exists', function () {
                            navigationService.history = [url];
                            expect($window.location.href).not.toEqual(url);
                            navigationService.back();
                            expect($window.location.href).toEqual(url);
                        });

                        it('should use $location.path if url contains a hash', function () {
                            navigationService.history = [fullUrl];
                            expect($window.location.href).not.toEqual(fullUrl);
                            expect($location.path()).toEqual('');
                            navigationService.back();
                            expect($location.path()).toEqual(url);
                        });

                        it('should call through to go if there is no history to pop', function () {
                            navigationService.history = [];
                            navigationService.back();
                            expect(navigationService.go).toHaveBeenCalledWith({ back: true, fallback: 'viewHome', state: 'home' });
                        });

                        it('should have nothing in history if it has been backed through', function () {
                            navigationService.history = [url];
                            navigationService.back();
                            expect(navigationService.history.length).toBe(0);
                        });

                        it('should use the specified fallback config if passed', function () {
                            var fallbackConfig = {
                                back: true,
                                outcome: 'foo',
                                fallback: 'bar',
                                state: 'baz'
                            };

                            navigationService.history = [];
                            navigationService.back(fallbackConfig);

                            expect(navigationService.go).toHaveBeenCalledWith(fallbackConfig);
                        });

                        it('should go directly to outcome if specified and in JSF context', function () {
                            var fallbackConfig = {
                                back: true,
                                outcome: 'foo',
                                fallback: 'bar',
                                state: 'baz'
                            };

                            $document.find('body').append('<form id="transitionForm"></form>');

                            navigationService.back(fallbackConfig);

                            expect(navigationService.go).toHaveBeenCalledWith({
                                outcome: fallbackConfig.outcome,
                                fallback: fallbackConfig.fallback
                            });
                        });

                        it('should reset the stack when navigation is cancelled', function () {
                            navigationService.history = [url];
                            expect($window.location.href).not.toEqual(url);
                            navigationService.back();

                            expect(navigationService.history.length).toEqual(0);
                            $rootScope.$broadcast('FlowMasterService:cancelNavigation');
                            expect(navigationService.history.length).toEqual(1);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL05hdmlnYXRpb25TZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7Ozs7O0lBQTFGOztJQU9JLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7O1FBRXZDLFNBQVMsWUFBWTtZQUo3QixTQUFTLHFCQUFxQixZQUFXO2dCQUNyQyxJQUFJLFlBQVksUUFBUSxXQUFXLFdBQVcsbUJBQW1COztnQkFFakUsV0FBVyxPQUFPLFlBQ2QsVUFBUyxVQUFVOztvQkFFZixTQUFTLFVBQVUsV0FBVyxVQUFTLFdBQVc7d0JBQzlDLE9BQU87NEJBQ0gsVUFBVTtnQ0FDTixNQUFNOzs0QkFFVixVQUFVLFVBQVU7Ozs7O2dCQUtwQyxXQUFXLE9BQU8sVUFBUyxjQUFjLFVBQVUsYUFBYSxhQUFhLHFCQUNsRCx5QkFBeUI7b0JBQ2hELGFBQWE7b0JBQ2IsU0FBUztvQkFDVCxZQUFZO29CQUNaLFlBQVk7b0JBQ1osb0JBQW9CO29CQUNwQix3QkFBd0I7OztnQkFHNUIsVUFBVSxZQUFXO29CQUNqQixVQUFVLEtBQUssbUJBQW1COzs7Z0JBR3RDLFNBQVMsTUFBTSxZQUFXOztvQkFFdEIsR0FBRyxzREFBc0QsWUFBVzt3QkFDaEUsSUFBSSxTQUFTOzRCQUNULE9BQU87NEJBQ1AsYUFBYTs7O3dCQUdqQixNQUFNLFFBQVE7d0JBQ2QsTUFBTSx1QkFBdUI7O3dCQUU3QixrQkFBa0IsR0FBRzs7d0JBRXJCLE9BQU8sT0FBTyxJQUFJLHFCQUFxQixPQUFPLE9BQU8sT0FBTzt3QkFDNUQsT0FBTyxzQkFBc0Isa0JBQWtCLElBQUk7OztvQkFHdkQsR0FBRyxrRUFBa0UsWUFBVzt3QkFDNUUsSUFBSSxTQUFTOzRCQUNULFNBQVM7Ozt3QkFHYixVQUFVLEtBQUssUUFBUSxPQUNuQiwr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a0IsVUFBVSxDQUFDOzRCQUM3QixPQUFPLFFBQVEsU0FBUyxNQUFNLElBQUksUUFBUTs0QkFDMUMsa0JBQWtCOzs0QkFFbEIsT0FBTyxrQkFBa0IsUUFBUSxRQUFRLFFBQVE7NEJBQ2pELFdBQVcsV0FBVzs0QkFDdEIsT0FBTyxrQkFBa0IsUUFBUSxRQUFRLFFBQVE7Ozs7Ozs7R0FGOUQiLCJmaWxlIjoiY29tbW9uL3V0aWwvTmF2aWdhdGlvblNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdXRpbE1vZHVsZSBmcm9tICdjb21tb24vdXRpbC9VdGlsTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIE5hdmlnYXRpb25TZXJ2aWNlLlxuICovXG5kZXNjcmliZSgnTmF2aWdhdGlvblNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHJvb3RTY29wZSwgJHN0YXRlLCAkZG9jdW1lbnQsICRsb2NhdGlvbiwgbmF2aWdhdGlvblNlcnZpY2UsIHNwTm90aWZpY2F0aW9uU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHV0aWxNb2R1bGUsXG4gICAgICAgIGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICAgICAvKiBNb2NrIHRoZSAkd2luZG93IHNlcnZpY2Ugc28gd2UgZG8gbm90IGFjdHVhbGx5IGF0dGVtcHQgcmVkaXJlY3RzICovXG4gICAgICAgICAgICAkcHJvdmlkZS5kZWNvcmF0b3IoJyR3aW5kb3cnLCBmdW5jdGlvbigkZGVsZWdhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQ6ICRkZWxlZ2F0ZS5kb2N1bWVudFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJHN0YXRlXywgXyRkb2N1bWVudF8sIF8kbG9jYXRpb25fLCBfbmF2aWdhdGlvblNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfKSB7XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRzdGF0ZSA9IF8kc3RhdGVfO1xuICAgICAgICAkZG9jdW1lbnQgPSBfJGRvY3VtZW50XztcbiAgICAgICAgJGxvY2F0aW9uID0gXyRsb2NhdGlvbl87XG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcbiAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlID0gX3NwTm90aWZpY2F0aW9uU2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkZG9jdW1lbnQuZmluZCgnI3RyYW5zaXRpb25Gb3JtJykucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ28nLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBpdCgnc2hvdWxkIGRlbGVnYXRlIHRvICRzdGF0ZSBzZXJ2aWNlIHdoZW4gbm8gSlNGIGZvcm0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGU6ICdob21lJyxcbiAgICAgICAgICAgICAgICBzdGF0ZVBhcmFtczogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbigkc3RhdGUsICdnbycpO1xuICAgICAgICAgICAgc3B5T24oc3BOb3RpZmljYXRpb25TZXJ2aWNlLCAnZ2V0Tm90aWZpY2F0aW9ucycpO1xuXG4gICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZS5nbyhjb25maWcpO1xuXG4gICAgICAgICAgICBleHBlY3QoJHN0YXRlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjb25maWcuc3RhdGUsIGNvbmZpZy5zdGF0ZVBhcmFtcyk7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvbnMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGRlbGVnYXRlIHRvICRzdGF0ZSBzZXJ2aWNlIHdoZW4gdGhlIEpTRiBmb3JtIGV4aXN0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBvdXRjb21lOiAnaG9tZSdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRkb2N1bWVudC5maW5kKCdib2R5JykuYXBwZW5kKFxuICAgICAgICAgICAgICAgICc8Zm9ybSBpZD1cInRyYW5zaXRpb25Gb3JtXCI+JyArXG4gICAgICAgICAgICAgICAgJyAgPGJ1dHRvbiBpZD1cInRyYW5zaXRpb25Gb3JtOnRyYW5zQnRuXCIgb25jbGljaz1cInJldHVybiBmYWxzZTtcIj48L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAnPC9mb3JtPidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHNweU9uKCRzdGF0ZSwgJ2dvJyk7XG4gICAgICAgICAgICBzcHlPbihzcE5vdGlmaWNhdGlvblNlcnZpY2UsICdnZXROb3RpZmljYXRpb25zJyk7XG5cbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlLmdvKGNvbmZpZyk7XG5cbiAgICAgICAgICAgIGV4cGVjdCgkc3RhdGUuZ28pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvbnMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgSlNGIGZvcm0gZXhpc3RzIGJ1dCBidXR0b24gZG9lcyBub3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgb3V0Y29tZTogJ2hvbWUnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnYm9keScpLmFwcGVuZChcbiAgICAgICAgICAgICAgICAnPGZvcm0gaWQ9XCJ0cmFuc2l0aW9uRm9ybVwiPicgK1xuICAgICAgICAgICAgICAgICc8L2Zvcm0+J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuYXZpZ2F0aW9uU2VydmljZS5nbyhjb25maWcpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2VyaWFsaXplIGFueSBub3RpZmljYXRpb24gaW4gdGhlIHNwTm90aWZpY2F0aW9uU2VydmljZSB0byB0aGUgbWVzc2FnZXMgaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2s6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnMgPSBbe1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlT3JLZXk6ICdrZXknLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdTVUNDRVNTJ1xuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIG1zZ3NJbnB1dDtcblxuICAgICAgICAgICAgJGRvY3VtZW50LmZpbmQoJ2JvZHknKS5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJzxmb3JtIGlkPVwidHJhbnNpdGlvbkZvcm1cIj4nICtcbiAgICAgICAgICAgICAgICAnICA8aW5wdXQgaWQ9XCJ0cmFuc2l0aW9uRm9ybTptZXNzYWdlc1wiIHR5cGU9XCJoaWRkZW5cIiAvPicgK1xuICAgICAgICAgICAgICAgICcgIDxidXR0b24gaWQ9XCJ0cmFuc2l0aW9uRm9ybTp0cmFuc0J0blwiIG9uY2xpY2s9XCJyZXR1cm4gZmFsc2U7XCI+PC9idXR0b24+JyArXG4gICAgICAgICAgICAgICAgJzwvZm9ybT4nXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzcHlPbihzcE5vdGlmaWNhdGlvblNlcnZpY2UsICdnZXROb3RpZmljYXRpb25zJykuYW5kLnJldHVyblZhbHVlKG5vdGlmaWNhdGlvbnMpO1xuXG4gICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZS5nbyhjb25maWcpO1xuXG4gICAgICAgICAgICBtc2dzSW5wdXQgPSAkZG9jdW1lbnRbMF0uZ2V0RWxlbWVudEJ5SWQoJ3RyYW5zaXRpb25Gb3JtOm1lc3NhZ2VzJyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChtc2dzSW5wdXQpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChtc2dzSW5wdXQudmFsdWUpLnRvRXF1YWwoSlNPTi5zdHJpbmdpZnkobm90aWZpY2F0aW9ucykpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTm90aWZpY2F0aW9uU2VydmljZS5nZXROb3RpZmljYXRpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoaXN0b3J5IGZ1bmN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHdpbmRvdztcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHdpbmRvd18pIHtcbiAgICAgICAgICAgICR3aW5kb3cgPSBfJHdpbmRvd187XG4gICAgICAgIH0pKTtcblxuICAgICAgICBkZXNjcmliZSgncHVzaCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIHRoZSBjdXJyZW50IHVybCBpbiBoaXN0b3J5IGFmdGVyIGl0IGlzIHB1c2hlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSAkd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UucHVzaCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5oaXN0b3J5Lmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuaGlzdG9yeVswXSkudG9FcXVhbCh1cmwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdiYWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gJy90ZXN0VXJsJyxcbiAgICAgICAgICAgICAgICBmdWxsVXJsID0gJ2xvY2FsaG9zdC9pbmRleC5qc2YjL3Rlc3RVcmwnO1xuXG4gICAgICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNweU9uKG5hdmlnYXRpb25TZXJ2aWNlLCAnZ28nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgbG9jYXRpb24gd2l0aCB0aGUgdmFsdWUgZnJvbSBoaXN0b3J5IGlmIG9uZSBleGlzdHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZS5oaXN0b3J5ID0gW3VybF07XG4gICAgICAgICAgICAgICAgZXhwZWN0KCR3aW5kb3cubG9jYXRpb24uaHJlZikubm90LnRvRXF1YWwodXJsKTtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZS5iYWNrKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KCR3aW5kb3cubG9jYXRpb24uaHJlZikudG9FcXVhbCh1cmwpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgdXNlICRsb2NhdGlvbi5wYXRoIGlmIHVybCBjb250YWlucyBhIGhhc2gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZS5oaXN0b3J5ID0gW2Z1bGxVcmxdO1xuICAgICAgICAgICAgICAgIGV4cGVjdCgkd2luZG93LmxvY2F0aW9uLmhyZWYpLm5vdC50b0VxdWFsKGZ1bGxVcmwpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCgkbG9jYXRpb24ucGF0aCgpKS50b0VxdWFsKCcnKTtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZS5iYWNrKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KCRsb2NhdGlvbi5wYXRoKCkpLnRvRXF1YWwodXJsKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBnbyBpZiB0aGVyZSBpcyBubyBoaXN0b3J5IHRvIHBvcCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlLmhpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZS5iYWNrKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGJhY2s6IHRydWUsIGZhbGxiYWNrOiAndmlld0hvbWUnLCBzdGF0ZTogJ2hvbWUnIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgaGF2ZSBub3RoaW5nIGluIGhpc3RvcnkgaWYgaXQgaGFzIGJlZW4gYmFja2VkIHRocm91Z2gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZS5oaXN0b3J5ID0gW3VybF07XG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UuYmFjaygpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5oaXN0b3J5Lmxlbmd0aCkudG9CZSgwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHVzZSB0aGUgc3BlY2lmaWVkIGZhbGxiYWNrIGNvbmZpZyBpZiBwYXNzZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmFsbGJhY2tDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG91dGNvbWU6ICdmb28nLFxuICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogJ2JhcicsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAnYmF6J1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZS5oaXN0b3J5ID0gW107XG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UuYmFjayhmYWxsYmFja0NvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGZhbGxiYWNrQ29uZmlnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGdvIGRpcmVjdGx5IHRvIG91dGNvbWUgaWYgc3BlY2lmaWVkIGFuZCBpbiBKU0YgY29udGV4dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBmYWxsYmFja0NvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYmFjazogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgb3V0Y29tZTogJ2ZvbycsXG4gICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrOiAnYmFyJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6ICdiYXonXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5maW5kKCdib2R5JykuYXBwZW5kKCc8Zm9ybSBpZD1cInRyYW5zaXRpb25Gb3JtXCI+PC9mb3JtPicpO1xuXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UuYmFjayhmYWxsYmFja0NvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgICAgICAgICAgICAgb3V0Y29tZTogZmFsbGJhY2tDb25maWcub3V0Y29tZSxcbiAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IGZhbGxiYWNrQ29uZmlnLmZhbGxiYWNrXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXNldCB0aGUgc3RhY2sgd2hlbiBuYXZpZ2F0aW9uIGlzIGNhbmNlbGxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlLmhpc3RvcnkgPSBbdXJsXTtcbiAgICAgICAgICAgICAgICBleHBlY3QoJHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5ub3QudG9FcXVhbCh1cmwpO1xuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlLmJhY2soKTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5oaXN0b3J5Lmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ0Zsb3dNYXN0ZXJTZXJ2aWNlOmNhbmNlbE5hdmlnYXRpb24nKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuaGlzdG9yeS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
