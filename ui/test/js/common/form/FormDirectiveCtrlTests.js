System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {

            describe('FormDirectiveCtrl', function () {

                var ctrl, scope, testValue, Form, FormButton, formService, $q;

                function makeButton(action) {
                    return new FormButton({ action: action });
                }

                beforeEach(module(formModule));

                beforeEach(inject(function ($controller, _$rootScope_, _$q_, _FormButton_, _Form_, _formService_) {
                    Form = _Form_;
                    FormButton = _FormButton_;
                    formService = _formService_;
                    $q = _$q_;
                    testValue = {};
                    scope = _$rootScope_.$new();
                    scope.config = new Form({});
                    ctrl = $controller('FormDirectiveCtrl', {
                        $scope: scope,
                        formService: formService,
                        FormButton: FormButton
                    });
                    ctrl.spFormOnSubmitSuccess = jasmine.createSpy('spFormOnSubmitSuccess');
                }));

                it('should allow data to be overridden', function () {
                    ctrl.setData(undefined);
                    expect(ctrl.getData()).not.toBe(testValue);
                    ctrl.setData(testValue);
                    expect(ctrl.getData()).toBe(testValue);
                });

                it('should allow form to be overridden', function () {
                    ctrl.setForm(undefined);
                    expect(ctrl.getForm()).not.toBe(testValue);
                    ctrl.setForm(testValue);
                    expect(ctrl.getForm()).toBe(testValue);
                });

                describe('isNextButton', function () {
                    it('should correctly interpret next button', function () {
                        var nextButton = makeButton(FormButton.ACTION_NEXT);
                        expect(ctrl.isNextButton(nextButton)).toBeTruthy();
                    });
                    it('should correctly interpret other button', function () {
                        var nextButton = makeButton(FormButton.ACTION_CANCEL);
                        expect(ctrl.isNextButton(nextButton)).toBeFalsy();
                    });
                });

                describe('showButtons', function () {
                    it('should return false if no buttons', function () {
                        ctrl.setForm(new Form({ wizard: false }));
                        expect(ctrl.showButtons()).toBeFalsy();
                    });
                    it('should return true with buttons', function () {
                        ctrl.setForm(new Form({
                            buttons: [{ action: FormButton.ACTION_NEXT }]
                        }));
                        expect(ctrl.showButtons()).toBeTruthy();
                    });
                });

                describe('buttonClick', function () {
                    it('should invoke the success callback on successful submission', function () {
                        var nextButton = makeButton(FormButton.ACTION_NEXT),
                            deferred = $q.defer(),
                            promise = deferred.promise;

                        spyOn(formService, 'submit').and.returnValue(promise);

                        ctrl.buttonClick(nextButton);

                        promise['finally'](function () {
                            expect(ctrl.spFormOnSubmitSuccess).toHaveBeenCalled();
                        });

                        deferred.resolve({});
                    });

                    it('should do a postback if the refresh button is clicked', function () {
                        var refreshButton = makeButton(FormButton.ACTION_REFRESH),
                            deferred = $q.defer(),
                            promise = deferred.promise,
                            form = {
                            items: [],
                            formId: '1'
                        },
                            data = {
                            foo: 'bar'
                        };

                        spyOn(formService, 'postBack').and.returnValue(promise);
                        spyOn(formService, 'submit');

                        ctrl.refreshButtonClick(refreshButton);

                        promise['finally'](function () {
                            expect(ctrl.getForm()).toEqual(form);
                            expect(ctrl.getData()).toEqual(data);

                            expect(formService.submit).not.toHaveBeenCalled();
                        });

                        deferred.resolve({
                            config: form,
                            data: data
                        });
                    });
                });

                describe('nextPage', function () {
                    beforeEach(function () {
                        ctrl.setForm(new Form({
                            items: [{}, {}],
                            buttons: []
                        }));
                        spyOn(formService, 'validateRequired').and.returnValue(true);
                    });
                    it('should advance if there are more pages and no required fields', function () {
                        expect(ctrl.getActiveIndex()).toBe(0);
                        expect(ctrl.nextPage()).toBeTruthy();
                        expect(ctrl.getActiveIndex()).toBe(1);
                    });
                    it('should not advance if on last page', function () {
                        expect(ctrl.getActiveIndex()).toBe(0);
                        expect(ctrl.nextPage()).toBeTruthy();
                        expect(ctrl.getActiveIndex()).toBe(1);
                        expect(ctrl.nextPage()).toBeFalsy();
                        expect(ctrl.getActiveIndex()).toBe(1);
                    });
                    it('should not advance if validation fails', function () {
                        formService.validateRequired.and.returnValue(false);
                        expect(ctrl.getActiveIndex()).toBe(0);
                        expect(ctrl.nextPage()).toBeFalsy();
                        expect(ctrl.getActiveIndex()).toBe(0);
                    });
                });
                describe('previousPage', function () {
                    beforeEach(function () {
                        ctrl.setForm(new Form({
                            items: [{}, {}],
                            buttons: []
                        }));
                        ctrl.nextPage();
                    });
                    it('should go back if there are more pages', function () {
                        expect(ctrl.getActiveIndex()).toBe(1);
                        expect(ctrl.previousPage()).toBeTruthy();
                        expect(ctrl.getActiveIndex()).toBe(0);
                    });
                    it('should not go back if on last page', function () {
                        expect(ctrl.getActiveIndex()).toBe(1);
                        expect(ctrl.previousPage()).toBeTruthy();
                        expect(ctrl.getActiveIndex()).toBe(0);
                        expect(ctrl.previousPage()).toBeFalsy();
                        expect(ctrl.getActiveIndex()).toBe(0);
                    });
                });

                describe('moveToFirstPageWithErrors', function () {
                    beforeEach(function () {
                        ctrl.setForm(new Form({
                            items: [{ items: [{}, {}, {}] }, { items: [{}, {}, {}] }, { items: [{}, {}, {}] }],
                            buttons: []
                        }));
                    });
                    it('should go to the page with errors', function () {
                        ctrl.getForm().items[1].items[2].errorMsg = 'ERROR!';
                        expect(ctrl.getActiveIndex()).toBe(0);
                        expect(ctrl.moveToFirstPageWithErrors()).toBe(1);
                        expect(ctrl.getActiveIndex()).toBe(1);
                    });
                    it('should go to the first page with errors', function () {
                        ctrl.getForm().items[1].items[2].errorMsg = 'ERROR!';
                        ctrl.getForm().items[2].items[2].errorMsg = 'ERROR!';
                        expect(ctrl.getActiveIndex()).toBe(0);
                        expect(ctrl.moveToFirstPageWithErrors()).toBe(1);
                        expect(ctrl.getActiveIndex()).toBe(1);
                    });
                    it('should not change page without errors', function () {
                        expect(ctrl.getActiveIndex()).toBe(0);
                        ctrl.nextPage();
                        expect(ctrl.getActiveIndex()).toBe(1);
                        expect(ctrl.moveToFirstPageWithErrors()).not.toBeDefined();
                        expect(ctrl.getActiveIndex()).toBe(1);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0Zvcm1EaXJlY3RpdmVDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7SUFBMUY7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjs7UUFFdkMsU0FBUyxZQUFZOztZQUg3QixTQUFTLHFCQUFxQixZQUFXOztnQkFFckMsSUFBSSxNQUFNLE9BQU8sV0FBVyxNQUFNLFlBQVksYUFBYTs7Z0JBRTNELFNBQVMsV0FBVyxRQUFRO29CQUN4QixPQUFPLElBQUksV0FBVyxFQUFDLFFBQVE7OztnQkFHbkMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsYUFBYSxjQUFjLE1BQU0sY0FBYyxRQUFRLGVBQWU7b0JBQzdGLE9BQU87b0JBQ1AsYUFBYTtvQkFDYixjQUFjO29CQUNkLEtBQUs7b0JBQ0wsWUFBWTtvQkFDWixRQUFRLGFBQWE7b0JBQ3JCLE1BQU0sU0FBUyxJQUFJLEtBQUs7b0JBQ3hCLE9BQU8sWUFBWSxxQkFBcUI7d0JBQ3BDLFFBQVE7d0JBQ1IsYUFBYTt3QkFDYixZQUFZOztvQkFFaEIsS0FBSyx3QkFBd0IsUUFBUSxVQUFVOzs7Z0JBR25ELEdBQUcsc0NBQXNDLFlBQVc7b0JBQ2hELEtBQUssUUFBUTtvQkFDYixPQUFPLEtBQUssV0FBVyxJQUFJLEtBQUs7b0JBQ2hDLEtBQUssUUFBUTtvQkFDYixPQUFPLEtBQUssV0FBVyxLQUFLOzs7Z0JBR2hDLEdBQUcsc0NBQXNDLFlBQVc7b0JBQ2hELEtBQUssUUFBUTtvQkFDYixPQUFPLEtBQUssV0FBVyxJQUFJLEtBQUs7b0JBQ2hDLEtBQUssUUFBUTtvQkFDYixPQUFPLEtBQUssV0FBVyxLQUFLOzs7Z0JBR2hDLFNBQVMsZ0JBQWdCLFlBQVc7b0JBQ2hDLEdBQUcsMENBQTBDLFlB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QUNuQyxPQUFPLEtBQUssZ0JBQWdCO3dCQUM1QixPQUFPLEtBQUssa0JBQWtCLEtBQUs7Ozs7Z0JBSTNDLFNBQVMsNkJBQTZCLFlBQVc7b0JBQzdDLFdBQVcsWUFBVzt3QkFDbEIsS0FBSyxRQUFRLElBQUksS0FBSzs0QkFDbEIsT0FBTyxDQUNFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxPQUNqQixFQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FDakIsRUFBQyxPQUFPLENBQUMsSUFBSSxJQUFJOzRCQUUxQixTQUFTOzs7b0JBR2pCLEdBQUcscUNBQXFDLFlBQVc7d0JBQy9DLEtBQUssVUFBVSxNQUFNLEdBQUcsTUFBTSxHQUFHLFdBQVc7d0JBQzVDLE9BQU8sS0FBSyxrQkFBa0IsS0FBSzt3QkFDbkMsT0FBTyxLQUFLLDZCQUE2QixLQUFLO3dCQUM5QyxPQUFPLEtBQUssa0JBQWtCLEtBQUs7O29CQUV2QyxHQUFHLDJDQUEyQyxZQUFXO3dCQUNyRCxLQUFLLFVBQVUsTUFBTSxHQUFHLE1BQU0sR0FBRyxXQUFXO3dCQUM1QyxLQUFLLFVBQVUsTUFBTSxHQUFHLE1BQU0sR0FBRyxXQUFXO3dCQUM1QyxPQUFPLEtBQUssa0JBQWtCLEtBQUs7d0JBQ25DLE9BQU8sS0FBSyw2QkFBNkIsS0FBSzt3QkFDOUMsT0FBTyxLQUFLLGtCQUFrQixLQUFLOztvQkFFdkMsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsT0FBTyxLQUFLLGtCQUFrQixLQUFLO3dCQUNuQyxLQUFLO3dCQUNMLE9BQU8sS0FBSyxrQkFBa0IsS0FBSzt3QkFDbkMsT0FBTyxLQUFLLDZCQUE2QixJQUFJO3dCQUM3QyxPQUFPLEtBQUssa0JBQWtCLEtBQUs7Ozs7OztHQU01QyIsImZpbGUiOiJjb21tb24vZm9ybS9Gb3JtRGlyZWN0aXZlQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBmb3JtTW9kdWxlIGZyb20gJ2NvbW1vbi9mb3JtL0Zvcm1Nb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0Zvcm1EaXJlY3RpdmVDdHJsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGN0cmwsIHNjb3BlLCB0ZXN0VmFsdWUsIEZvcm0sIEZvcm1CdXR0b24sIGZvcm1TZXJ2aWNlLCAkcTtcclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlQnV0dG9uKGFjdGlvbikge1xyXG4gICAgICAgIHJldHVybiBuZXcgRm9ybUJ1dHRvbih7YWN0aW9uOiBhY3Rpb259KTtcclxuICAgIH1cclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmb3JtTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGNvbnRyb2xsZXIsIF8kcm9vdFNjb3BlXywgXyRxXywgX0Zvcm1CdXR0b25fLCBfRm9ybV8sIF9mb3JtU2VydmljZV8pIHtcclxuICAgICAgICBGb3JtID0gX0Zvcm1fO1xyXG4gICAgICAgIEZvcm1CdXR0b24gPSBfRm9ybUJ1dHRvbl87XHJcbiAgICAgICAgZm9ybVNlcnZpY2UgPSBfZm9ybVNlcnZpY2VfO1xyXG4gICAgICAgICRxID0gXyRxXztcclxuICAgICAgICB0ZXN0VmFsdWUgPSB7fTtcclxuICAgICAgICBzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuY29uZmlnID0gbmV3IEZvcm0oe30pO1xyXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignRm9ybURpcmVjdGl2ZUN0cmwnLCB7XHJcbiAgICAgICAgICAgICRzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGZvcm1TZXJ2aWNlOiBmb3JtU2VydmljZSxcclxuICAgICAgICAgICAgRm9ybUJ1dHRvbjogRm9ybUJ1dHRvblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGN0cmwuc3BGb3JtT25TdWJtaXRTdWNjZXNzID0gamFzbWluZS5jcmVhdGVTcHkoJ3NwRm9ybU9uU3VibWl0U3VjY2VzcycpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGl0KCdzaG91bGQgYWxsb3cgZGF0YSB0byBiZSBvdmVycmlkZGVuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY3RybC5zZXREYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwuZ2V0RGF0YSgpKS5ub3QudG9CZSh0ZXN0VmFsdWUpO1xyXG4gICAgICAgIGN0cmwuc2V0RGF0YSh0ZXN0VmFsdWUpO1xyXG4gICAgICAgIGV4cGVjdChjdHJsLmdldERhdGEoKSkudG9CZSh0ZXN0VmFsdWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBmb3JtIHRvIGJlIG92ZXJyaWRkZW4nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjdHJsLnNldEZvcm0odW5kZWZpbmVkKTtcclxuICAgICAgICBleHBlY3QoY3RybC5nZXRGb3JtKCkpLm5vdC50b0JlKHRlc3RWYWx1ZSk7XHJcbiAgICAgICAgY3RybC5zZXRGb3JtKHRlc3RWYWx1ZSk7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Rm9ybSgpKS50b0JlKHRlc3RWYWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNOZXh0QnV0dG9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgaW50ZXJwcmV0IG5leHQgYnV0dG9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXh0QnV0dG9uID0gbWFrZUJ1dHRvbihGb3JtQnV0dG9uLkFDVElPTl9ORVhUKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNOZXh0QnV0dG9uKG5leHRCdXR0b24pKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgaW50ZXJwcmV0IG90aGVyIGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbmV4dEJ1dHRvbiA9IG1ha2VCdXR0b24oRm9ybUJ1dHRvbi5BQ1RJT05fQ0FOQ0VMKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNOZXh0QnV0dG9uKG5leHRCdXR0b24pKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93QnV0dG9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIG5vIGJ1dHRvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5zZXRGb3JtKG5ldyBGb3JtKHt3aXphcmQ6IGZhbHNlfSkpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93QnV0dG9ucygpKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdpdGggYnV0dG9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLnNldEZvcm0obmV3IEZvcm0oe1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW3thY3Rpb246IEZvcm1CdXR0b24uQUNUSU9OX05FWFR9XVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dCdXR0b25zKCkpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdidXR0b25DbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgaW52b2tlIHRoZSBzdWNjZXNzIGNhbGxiYWNrIG9uIHN1Y2Nlc3NmdWwgc3VibWlzc2lvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbmV4dEJ1dHRvbiA9IG1ha2VCdXR0b24oRm9ybUJ1dHRvbi5BQ1RJT05fTkVYVCksXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9ICRxLmRlZmVyKCksXHJcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gZGVmZXJyZWQucHJvbWlzZTtcclxuXHJcbiAgICAgICAgICAgIHNweU9uKGZvcm1TZXJ2aWNlLCAnc3VibWl0JykuYW5kLnJldHVyblZhbHVlKHByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgY3RybC5idXR0b25DbGljayhuZXh0QnV0dG9uKTtcclxuXHJcbiAgICAgICAgICAgIHByb21pc2UuZmluYWxseShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnNwRm9ybU9uU3VibWl0U3VjY2VzcykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe30pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGRvIGEgcG9zdGJhY2sgaWYgdGhlIHJlZnJlc2ggYnV0dG9uIGlzIGNsaWNrZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHJlZnJlc2hCdXR0b24gPSBtYWtlQnV0dG9uKEZvcm1CdXR0b24uQUNUSU9OX1JFRlJFU0gpLFxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSAkcS5kZWZlcigpLFxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IGRlZmVycmVkLnByb21pc2UsXHJcbiAgICAgICAgICAgICAgICBmb3JtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtSWQ6ICcxJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNweU9uKGZvcm1TZXJ2aWNlLCAncG9zdEJhY2snKS5hbmQucmV0dXJuVmFsdWUocHJvbWlzZSk7XHJcbiAgICAgICAgICAgIHNweU9uKGZvcm1TZXJ2aWNlLCAnc3VibWl0Jyk7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnJlZnJlc2hCdXR0b25DbGljayhyZWZyZXNoQnV0dG9uKTtcclxuXHJcbiAgICAgICAgICAgIHByb21pc2UuZmluYWxseShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEZvcm0oKSkudG9FcXVhbChmb3JtKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldERhdGEoKSkudG9FcXVhbChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZm9ybVNlcnZpY2Uuc3VibWl0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgY29uZmlnOiBmb3JtLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnbmV4dFBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLnNldEZvcm0obmV3IEZvcm0oe1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IFt7fSwge31dLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW11cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBzcHlPbihmb3JtU2VydmljZSwgJ3ZhbGlkYXRlUmVxdWlyZWQnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBhZHZhbmNlIGlmIHRoZXJlIGFyZSBtb3JlIHBhZ2VzIGFuZCBubyByZXF1aXJlZCBmaWVsZHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0QWN0aXZlSW5kZXgoKSkudG9CZSgwKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwubmV4dFBhZ2UoKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRBY3RpdmVJbmRleCgpKS50b0JlKDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGFkdmFuY2UgaWYgb24gbGFzdCBwYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEFjdGl2ZUluZGV4KCkpLnRvQmUoMCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLm5leHRQYWdlKCkpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0QWN0aXZlSW5kZXgoKSkudG9CZSgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwubmV4dFBhZ2UoKSkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEFjdGl2ZUluZGV4KCkpLnRvQmUoMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgYWR2YW5jZSBpZiB2YWxpZGF0aW9uIGZhaWxzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZvcm1TZXJ2aWNlLnZhbGlkYXRlUmVxdWlyZWQuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0QWN0aXZlSW5kZXgoKSkudG9CZSgwKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwubmV4dFBhZ2UoKSkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEFjdGl2ZUluZGV4KCkpLnRvQmUoMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGRlc2NyaWJlKCdwcmV2aW91c1BhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLnNldEZvcm0obmV3IEZvcm0oe1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IFt7fSwge31dLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW11cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBjdHJsLm5leHRQYWdlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBnbyBiYWNrIGlmIHRoZXJlIGFyZSBtb3JlIHBhZ2VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEFjdGl2ZUluZGV4KCkpLnRvQmUoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnByZXZpb3VzUGFnZSgpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEFjdGl2ZUluZGV4KCkpLnRvQmUoMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgZ28gYmFjayBpZiBvbiBsYXN0IHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0QWN0aXZlSW5kZXgoKSkudG9CZSgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwucHJldmlvdXNQYWdlKCkpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0QWN0aXZlSW5kZXgoKSkudG9CZSgwKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwucHJldmlvdXNQYWdlKCkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRBY3RpdmVJbmRleCgpKS50b0JlKDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ21vdmVUb0ZpcnN0UGFnZVdpdGhFcnJvcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLnNldEZvcm0obmV3IEZvcm0oe1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtczogW3t9LCB7fSwge31dfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtczogW3t9LCB7fSwge31dfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtczogW3t9LCB7fSwge31dfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBnbyB0byB0aGUgcGFnZSB3aXRoIGVycm9ycycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLmdldEZvcm0oKS5pdGVtc1sxXS5pdGVtc1syXS5lcnJvck1zZyA9ICdFUlJPUiEnO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRBY3RpdmVJbmRleCgpKS50b0JlKDApO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5tb3ZlVG9GaXJzdFBhZ2VXaXRoRXJyb3JzKCkpLnRvQmUoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEFjdGl2ZUluZGV4KCkpLnRvQmUoMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBnbyB0byB0aGUgZmlyc3QgcGFnZSB3aXRoIGVycm9ycycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLmdldEZvcm0oKS5pdGVtc1sxXS5pdGVtc1syXS5lcnJvck1zZyA9ICdFUlJPUiEnO1xyXG4gICAgICAgICAgICBjdHJsLmdldEZvcm0oKS5pdGVtc1syXS5pdGVtc1syXS5lcnJvck1zZyA9ICdFUlJPUiEnO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRBY3RpdmVJbmRleCgpKS50b0JlKDApO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5tb3ZlVG9GaXJzdFBhZ2VXaXRoRXJyb3JzKCkpLnRvQmUoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEFjdGl2ZUluZGV4KCkpLnRvQmUoMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2hhbmdlIHBhZ2Ugd2l0aG91dCBlcnJvcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0QWN0aXZlSW5kZXgoKSkudG9CZSgwKTtcclxuICAgICAgICAgICAgY3RybC5uZXh0UGFnZSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRBY3RpdmVJbmRleCgpKS50b0JlKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5tb3ZlVG9GaXJzdFBhZ2VXaXRoRXJyb3JzKCkpLm5vdC50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRBY3RpdmVJbmRleCgpKS50b0JlKDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
