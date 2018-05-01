System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
     * Tests for the spForm directive.
     */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('FormDirective', function () {
                var $scope,
                    $compile,
                    el,
                    Form,
                    FormData,
                    FormButton,
                    FormItem,
                    $httpBackend,
                    formService,
                    elementHtml = '<sp-form sp-form-config="config" sp-form-data="data" />',
                    POSTBACK_URL = '/identityiq/ui/rest/forms/postback';

                function compileElement(html) {
                    el = angular.element(html);

                    // always create a data object using the config on the scope
                    $scope.data = new FormData($scope.config);

                    $compile(el)($scope);
                    $scope.$apply();

                    return el;
                }

                beforeEach(module(formModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                /* jshint maxparams:8 */
                beforeEach(inject(function (_$rootScope_, _$compile_, _Form_, _FormData_, _FormButton_, _FormItem_, _$httpBackend_, _formService_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    Form = _Form_;
                    FormData = _FormData_;
                    FormButton = _FormButton_;
                    FormItem = _FormItem_;
                    $httpBackend = _$httpBackend_;
                    formService = _formService_;
                }));

                afterEach(function () {
                    el.remove();
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('title and subtitle', function () {

                    it('displays a title and subtitle when configured', function () {
                        var titleEl, subtitleEl;

                        $scope.config = new Form({
                            title: 'My Title',
                            subtitle: 'Fill out the form'
                        });

                        el = compileElement(elementHtml);

                        titleEl = el.find('.form-title');
                        expect(titleEl.length).toEqual(1);

                        subtitleEl = el.find('.form-subtitle');
                        expect(subtitleEl.length).toEqual(1);
                    });

                    it('does not display a title or subtitle if neither are configured', function () {
                        $scope.config = new Form({});

                        el = compileElement(elementHtml);

                        expect(el.find('.form-title').length).toEqual(0);
                        expect(el.find('.form-subtitle').length).toEqual(0);
                    });
                });

                describe('buttons', function () {

                    it('displays the button panel if there are buttons configured', function () {
                        $scope.config = new Form({
                            buttons: [{ label: 'Submit' }]
                        });
                        $scope.config.hasButtons = function () {
                            return true;
                        };

                        el = compileElement(elementHtml);

                        expect(el.find('.form-buttons').length).toEqual(1);
                    });

                    it('does not display the button panel if there are none configured', function () {
                        $scope.config = new Form({
                            buttons: []
                        });
                        $scope.config.hasButtons = function () {
                            return false;
                        };

                        el = compileElement(elementHtml);

                        expect(el.find('.form-buttons').children().length).toEqual(0);
                    });
                });

                describe('postback', function () {
                    var formConfig, postData, makeFormConfig;

                    beforeEach(function () {
                        var formBeanClass = 'FormBean',
                            formBeanState = {};
                        makeFormConfig = function (value) {
                            return {
                                id: '1',
                                formBeanClass: formBeanClass,
                                formBeanState: formBeanState,
                                items: [{
                                    type: FormItem.TYPE_SECTION,
                                    items: [{
                                        type: FormItem.TYPE_TEXT,
                                        name: 'name',
                                        value: value,
                                        postBack: true
                                    }]
                                }]
                            };
                        };
                        postData = {
                            formBeanClass: formBeanClass,
                            formBeanState: formBeanState
                        };
                    });

                    it('should initiate when a simple model changes', function () {
                        var postBackConfig = makeFormConfig('John');
                        formConfig = makeFormConfig(null);
                        postData.data = { name: 'John' };

                        $scope.config = new Form(formConfig);

                        $httpBackend.expectPOST(POSTBACK_URL, postData).respond(200, postBackConfig);

                        compileElement(elementHtml);

                        $scope.data.values['name'] = 'John';

                        $httpBackend.flush();
                    });

                    it('should initiate when an item is added to an array', function () {
                        formConfig = makeFormConfig([]);
                        postData.data = { name: ['John'] };

                        $scope.config = new Form(formConfig);

                        $httpBackend.expectPOST(POSTBACK_URL, postData).respond(200, formConfig);

                        compileElement(elementHtml);

                        $scope.data.values['name'].push('John');

                        $httpBackend.flush();
                    });

                    it('should initiate when an item is removed from an array', function () {
                        formConfig = makeFormConfig(['John']);
                        postData.data = { name: [] };

                        $scope.config = new Form(formConfig);

                        $httpBackend.expectPOST(POSTBACK_URL, postData).respond(200, formConfig);

                        compileElement(elementHtml);

                        $scope.data.values['name'].splice(0, 1);

                        $httpBackend.flush();
                    });

                    it('should send fieldName to service', function () {
                        var expectedForm = new Form(makeFormConfig('John')),
                            formConfig = makeFormConfig(null);
                        postData.data = { name: 'John' };

                        $scope.config = new Form(formConfig);

                        formService.postBack = jasmine.createSpy().and.returnValue({ then: angular.noop });

                        compileElement(elementHtml);

                        $scope.data.values['name'] = 'John';
                        $scope.$digest();

                        expect(formService.postBack).toHaveBeenCalledWith(new FormData(expectedForm), 'name');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0Zvcm1EaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUzs7Ozs7SUFBMUY7O0lBT0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjs7UUFFdkMsU0FBUyxZQUFZO1lBSjdCLFNBQVMsaUJBQWlCLFlBQVc7Z0JBQ2pDLElBQUk7b0JBQ0E7b0JBQ0E7b0JBQ0E7b0JBQ0E7b0JBQ0E7b0JBQ0E7b0JBQ0E7b0JBQ0E7b0JBQ0EsY0FBYztvQkFDZCxlQUFlOztnQkFFbkIsU0FBUyxlQUFlLE1BQU07b0JBQzFCLEtBQUssUUFBUSxRQUFROzs7b0JBR3JCLE9BQU8sT0FBTyxJQUFJLFNBQVMsT0FBTzs7b0JBRWxDLFNBQVMsSUFBSTtvQkFDYixPQUFPOztvQkFFUCxPQUFPOzs7Z0JBR1gsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjs7OztnQkFJekMsV0FBVyxPQUFPLFVBQVMsY0FBYyxZQUFZLFFBQVEsWUFDbEMsY0FBYyxZQUFZLGdCQUFnQixlQUFlO29CQUNoRixTQUFTLGFBQWE7b0JBQ3RCLFdBQVc7b0JBQ1gsT0FBTztvQkFDUCxXQUFXO29CQUNYLGFBQWE7b0JBQ2IsV0FBVztvQkFDWCxlQUFlO29CQUNmLGNBQWM7OztnQkFHbEIsVUFBVSxZQUFXO29CQUNqQixHQUFHO29CQUNILGFBQWE7b0JBQ2IsYUFBYTs7O2dCQUdqQixTQUFTLHNCQUFzQixZQUFXOztvQkFFdEMsR0FBRyxpREFBaUQsWUFBVzt3QkFDM0QsSUFBSSxTQUFTOzt3QkFFYixPQUFPLFNBQVMsSUFBSSxLQUFLOzRCQUNyQixPQUFPOzRCQUNQLFVBQVU7Ozt3QkFHZCxLQUFLLGVBQWU7O3dCQUVwQixVQUFVLEdB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Ozs7OztHQVV2RiIsImZpbGUiOiJjb21tb24vZm9ybS9Gb3JtRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGZvcm1Nb2R1bGUgZnJvbSAnY29tbW9uL2Zvcm0vRm9ybU1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBzcEZvcm0gZGlyZWN0aXZlLlxuICovXG5kZXNjcmliZSgnRm9ybURpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2NvcGUsXG4gICAgICAgICRjb21waWxlLFxuICAgICAgICBlbCxcbiAgICAgICAgRm9ybSxcbiAgICAgICAgRm9ybURhdGEsXG4gICAgICAgIEZvcm1CdXR0b24sXG4gICAgICAgIEZvcm1JdGVtLFxuICAgICAgICAkaHR0cEJhY2tlbmQsXG4gICAgICAgIGZvcm1TZXJ2aWNlLFxuICAgICAgICBlbGVtZW50SHRtbCA9ICc8c3AtZm9ybSBzcC1mb3JtLWNvbmZpZz1cImNvbmZpZ1wiIHNwLWZvcm0tZGF0YT1cImRhdGFcIiAvPicsXG4gICAgICAgIFBPU1RCQUNLX1VSTCA9ICcvaWRlbnRpdHlpcS91aS9yZXN0L2Zvcm1zL3Bvc3RiYWNrJztcblxuICAgIGZ1bmN0aW9uIGNvbXBpbGVFbGVtZW50KGh0bWwpIHtcbiAgICAgICAgZWwgPSBhbmd1bGFyLmVsZW1lbnQoaHRtbCk7XG5cbiAgICAgICAgLy8gYWx3YXlzIGNyZWF0ZSBhIGRhdGEgb2JqZWN0IHVzaW5nIHRoZSBjb25maWcgb24gdGhlIHNjb3BlXG4gICAgICAgICRzY29wZS5kYXRhID0gbmV3IEZvcm1EYXRhKCRzY29wZS5jb25maWcpO1xuXG4gICAgICAgICRjb21waWxlKGVsKSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZvcm1Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICB9KSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOjggKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF9Gb3JtXywgX0Zvcm1EYXRhXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfRm9ybUJ1dHRvbl8sIF9Gb3JtSXRlbV8sIF8kaHR0cEJhY2tlbmRfLCBfZm9ybVNlcnZpY2VfKSB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgRm9ybSA9IF9Gb3JtXztcbiAgICAgICAgRm9ybURhdGEgPSBfRm9ybURhdGFfO1xuICAgICAgICBGb3JtQnV0dG9uID0gX0Zvcm1CdXR0b25fO1xuICAgICAgICBGb3JtSXRlbSA9IF9Gb3JtSXRlbV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBmb3JtU2VydmljZSA9IF9mb3JtU2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBlbC5yZW1vdmUoKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0aXRsZSBhbmQgc3VidGl0bGUnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBpdCgnZGlzcGxheXMgYSB0aXRsZSBhbmQgc3VidGl0bGUgd2hlbiBjb25maWd1cmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGl0bGVFbCwgc3VidGl0bGVFbDtcblxuICAgICAgICAgICAgJHNjb3BlLmNvbmZpZyA9IG5ldyBGb3JtKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ015IFRpdGxlJyxcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZTogJ0ZpbGwgb3V0IHRoZSBmb3JtJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGVsID0gY29tcGlsZUVsZW1lbnQoZWxlbWVudEh0bWwpO1xuXG4gICAgICAgICAgICB0aXRsZUVsID0gZWwuZmluZCgnLmZvcm0tdGl0bGUnKTtcbiAgICAgICAgICAgIGV4cGVjdCh0aXRsZUVsLmxlbmd0aCkudG9FcXVhbCgxKTtcblxuICAgICAgICAgICAgc3VidGl0bGVFbCA9IGVsLmZpbmQoJy5mb3JtLXN1YnRpdGxlJyk7XG4gICAgICAgICAgICBleHBlY3Qoc3VidGl0bGVFbC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBkaXNwbGF5IGEgdGl0bGUgb3Igc3VidGl0bGUgaWYgbmVpdGhlciBhcmUgY29uZmlndXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbmZpZyA9IG5ldyBGb3JtKHt9KTtcblxuICAgICAgICAgICAgZWwgPSBjb21waWxlRWxlbWVudChlbGVtZW50SHRtbCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChlbC5maW5kKCcuZm9ybS10aXRsZScpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgIGV4cGVjdChlbC5maW5kKCcuZm9ybS1zdWJ0aXRsZScpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdidXR0b25zJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaXQoJ2Rpc3BsYXlzIHRoZSBidXR0b24gcGFuZWwgaWYgdGhlcmUgYXJlIGJ1dHRvbnMgY29uZmlndXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbmZpZyA9IG5ldyBGb3JtKHtcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdTdWJtaXQnIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5jb25maWcuaGFzQnV0dG9ucyA9IGZ1bmN0aW9uKCkge3JldHVybiB0cnVlO307XG5cbiAgICAgICAgICAgIGVsID0gY29tcGlsZUVsZW1lbnQoZWxlbWVudEh0bWwpO1xuXG4gICAgICAgICAgICBleHBlY3QoZWwuZmluZCgnLmZvcm0tYnV0dG9ucycpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IGRpc3BsYXkgdGhlIGJ1dHRvbiBwYW5lbCBpZiB0aGVyZSBhcmUgbm9uZSBjb25maWd1cmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuY29uZmlnID0gbmV3IEZvcm0oe1xuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5jb25maWcuaGFzQnV0dG9ucyA9IGZ1bmN0aW9uKCkge3JldHVybiBmYWxzZTt9O1xuXG4gICAgICAgICAgICBlbCA9IGNvbXBpbGVFbGVtZW50KGVsZW1lbnRIdG1sKTtcblxuICAgICAgICAgICAgZXhwZWN0KGVsLmZpbmQoJy5mb3JtLWJ1dHRvbnMnKS5jaGlsZHJlbigpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwb3N0YmFjaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZm9ybUNvbmZpZywgcG9zdERhdGEsIG1ha2VGb3JtQ29uZmlnO1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZm9ybUJlYW5DbGFzcyA9ICdGb3JtQmVhbicsXG4gICAgICAgICAgICAgICAgZm9ybUJlYW5TdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbWFrZUZvcm1Db25maWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1CZWFuQ2xhc3M6IGZvcm1CZWFuQ2xhc3MsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1CZWFuU3RhdGU6IGZvcm1CZWFuU3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRm9ybUl0ZW0uVFlQRV9TRUNUSU9OLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRm9ybUl0ZW0uVFlQRV9URVhULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdEJhY2s6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwb3N0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICBmb3JtQmVhbkNsYXNzOiBmb3JtQmVhbkNsYXNzLFxuICAgICAgICAgICAgICAgIGZvcm1CZWFuU3RhdGU6IGZvcm1CZWFuU3RhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhdGUgd2hlbiBhIHNpbXBsZSBtb2RlbCBjaGFuZ2VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcG9zdEJhY2tDb25maWcgPSBtYWtlRm9ybUNvbmZpZygnSm9obicpO1xuICAgICAgICAgICAgZm9ybUNvbmZpZyA9IG1ha2VGb3JtQ29uZmlnKG51bGwpO1xuICAgICAgICAgICAgcG9zdERhdGEuZGF0YSA9IHsgbmFtZTogJ0pvaG4nIH07XG5cbiAgICAgICAgICAgICRzY29wZS5jb25maWcgPSBuZXcgRm9ybShmb3JtQ29uZmlnKTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoUE9TVEJBQ0tfVVJMLCBwb3N0RGF0YSkucmVzcG9uZCgyMDAsIHBvc3RCYWNrQ29uZmlnKTtcblxuICAgICAgICAgICAgY29tcGlsZUVsZW1lbnQoZWxlbWVudEh0bWwpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS52YWx1ZXNbJ25hbWUnXSA9ICdKb2huJztcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhdGUgd2hlbiBhbiBpdGVtIGlzIGFkZGVkIHRvIGFuIGFycmF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3JtQ29uZmlnID0gbWFrZUZvcm1Db25maWcoW10pO1xuICAgICAgICAgICAgcG9zdERhdGEuZGF0YSA9IHsgbmFtZTogWydKb2huJ10gfTtcblxuICAgICAgICAgICAgJHNjb3BlLmNvbmZpZyA9IG5ldyBGb3JtKGZvcm1Db25maWcpO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChQT1NUQkFDS19VUkwsIHBvc3REYXRhKS5yZXNwb25kKDIwMCwgZm9ybUNvbmZpZyk7XG5cbiAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50KGVsZW1lbnRIdG1sKTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEudmFsdWVzWyduYW1lJ10ucHVzaCgnSm9obicpO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWF0ZSB3aGVuIGFuIGl0ZW0gaXMgcmVtb3ZlZCBmcm9tIGFuIGFycmF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3JtQ29uZmlnID0gbWFrZUZvcm1Db25maWcoWydKb2huJ10pO1xuICAgICAgICAgICAgcG9zdERhdGEuZGF0YSA9IHsgbmFtZTogW10gfTtcblxuICAgICAgICAgICAgJHNjb3BlLmNvbmZpZyA9IG5ldyBGb3JtKGZvcm1Db25maWcpO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChQT1NUQkFDS19VUkwsIHBvc3REYXRhKS5yZXNwb25kKDIwMCwgZm9ybUNvbmZpZyk7XG5cbiAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50KGVsZW1lbnRIdG1sKTtcblxuICAgICAgICAgICAgJHNjb3BlLmRhdGEudmFsdWVzWyduYW1lJ10uc3BsaWNlKDAsIDEpO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZW5kIGZpZWxkTmFtZSB0byBzZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZXhwZWN0ZWRGb3JtID0gbmV3IEZvcm0obWFrZUZvcm1Db25maWcoJ0pvaG4nKSksXG4gICAgICAgICAgICBmb3JtQ29uZmlnID0gbWFrZUZvcm1Db25maWcobnVsbCk7XG4gICAgICAgICAgICBwb3N0RGF0YS5kYXRhID0geyBuYW1lOiAnSm9obicgfTtcblxuICAgICAgICAgICAgJHNjb3BlLmNvbmZpZyA9IG5ldyBGb3JtKGZvcm1Db25maWcpO1xuXG4gICAgICAgICAgICBmb3JtU2VydmljZS5wb3N0QmFjayA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKHt0aGVuOiBhbmd1bGFyLm5vb3B9KTtcblxuICAgICAgICAgICAgY29tcGlsZUVsZW1lbnQoZWxlbWVudEh0bWwpO1xuXG4gICAgICAgICAgICAkc2NvcGUuZGF0YS52YWx1ZXNbJ25hbWUnXSA9ICdKb2huJztcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChmb3JtU2VydmljZS5wb3N0QmFjaykudG9IYXZlQmVlbkNhbGxlZFdpdGgobmV3IEZvcm1EYXRhKGV4cGVjdGVkRm9ybSksICduYW1lJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
