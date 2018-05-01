System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
     * Tests for the FormService.
     */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('FormService', function () {
                var formService,
                    $httpBackend,
                    Form,
                    FormData,
                    FormItem,
                    FormButton,
                    WorkItem,
                    successData = {},
                    POSTBACK_URL = '/identityiq/ui/rest/forms/postback',
                    SUBMIT_URL = '/identityiq/ui/rest/forms/submit';

                beforeEach(module(formModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                /* jshint maxparams:7 */
                beforeEach(inject(function (_formService_, _$httpBackend_, _Form_, _FormData_, _FormItem_, _FormButton_, _WorkItem_) {
                    formService = _formService_;
                    $httpBackend = _$httpBackend_;
                    Form = _Form_;
                    FormData = _FormData_;
                    FormItem = _FormItem_;
                    FormButton = _FormButton_;
                    WorkItem = _WorkItem_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getForm', function () {

                    it('should call out to backend to get values', function () {
                        var promise,
                            FORM_URL = '/identityiq/ui/rest/forms/form/',
                            formName = 'name',
                            response = {
                            count: 1,
                            objects: [{}]
                        };

                        $httpBackend.expectGET(FORM_URL + formName).respond(200, response);

                        promise = formService.getForm(formName);

                        expect(promise).toBeTruthy();

                        promise.then(function (response) {
                            expect(response.config instanceof Form).toBeTruthy();
                            expect(response.data instanceof FormData).toBeTruthy();
                        });

                        $httpBackend.flush();
                    });
                });

                describe('getWorkItemForm', function () {

                    it('should call out to backend to get values', function () {
                        var promise,
                            WORK_ITEM_FORM_URL = '/identityiq/ui/rest/forms/workItem/',
                            workId = 'id',
                            response = {
                            count: 1,
                            objects: [{}]
                        };

                        $httpBackend.expectGET(WORK_ITEM_FORM_URL + workId).respond(200, response);

                        promise = formService.getWorkItemForm(new WorkItem({ id: workId }));

                        expect(promise).toBeTruthy();

                        promise.then(function (response) {
                            expect(response.config instanceof Form).toBeTruthy();
                            expect(response.data instanceof FormData).toBeTruthy();
                        });

                        $httpBackend.flush();
                    });

                    it('should call out to session endpoint if work item is transient', function () {
                        var URL = '/identityiq/ui/rest/forms/session',
                            response = {
                            count: 1,
                            objects: [{}]
                        };

                        $httpBackend.expectGET(URL).respond(200, response);

                        formService.getWorkItemForm(new WorkItem({ workItemType: 'Form' })).then(function (result) {
                            expect(result.config instanceof Form).toBeTruthy();
                            expect(result.data instanceof FormData).toBeTruthy();
                        });

                        $httpBackend.flush();
                    });
                });

                function getParamsFromData(data, button) {
                    var params = {
                        formBeanClass: data.formBeanClass,
                        formBeanState: data.formBeanState,
                        data: data.values,
                        formId: data.formId
                    };

                    if (button) {
                        params.button = button;
                    }

                    return params;
                }

                describe('submit', function () {
                    var nextButtonConfig = {
                        action: 'next',
                        label: 'Submit'
                    },
                        cancelButtonConfig = {
                        action: 'cancel',
                        label: 'Cancel'
                    },
                        backButtonConfig = {
                        action: 'back',
                        label: 'Back'
                    },
                        formConfig = {
                        formId: '1',
                        values: {},
                        formBeanClass: 'FormBean',
                        formBeanState: null,
                        items: [{
                            name: 'fieldname',
                            required: false,
                            value: 'moontower'
                        }]
                    },
                        VALIDATION_MESSAGE = 'You thought this was valid?',
                        form,
                        formData,
                        button,
                        response = { items: { fieldname: VALIDATION_MESSAGE } };

                    it('should call server', function () {
                        form = new Form(formConfig);
                        formData = new FormData(form);
                        button = new FormButton(nextButtonConfig);
                        $httpBackend.expectPOST(SUBMIT_URL, getParamsFromData(formData, button)).respond(200, successData);
                        formService.submit(form, formData, button);
                        $httpBackend.flush();
                    });

                    it('should not call server if values are required', function () {
                        var result;
                        form = new Form(formConfig);
                        form.getItems()[0].required = true;
                        form.getItems()[0].value = undefined;
                        formData = new FormData(form);
                        button = new FormButton(nextButtonConfig);
                        result = formService.submit(form, formData, button);
                        expect(result).toBeDefined();
                        result.then(undefined, function (response) {
                            expect(typeof response['fieldname']).toBe('string');
                            expect(response['fieldname']).toBe('ui_form_required');
                        });
                    });

                    it('should call server if items are required but have values', function () {
                        var result;
                        form = new Form(formConfig);
                        form.getItems()[0].required = true;
                        formData = new FormData(form);
                        button = new FormButton(nextButtonConfig);
                        $httpBackend.expectPOST(SUBMIT_URL, getParamsFromData(formData, button)).respond(200, successData);
                        result = formService.submit(form, formData, button);
                        expect(result).toBeDefined();
                        result.then(function (response) {
                            expect(response.isSuccess()).toEqual(true);
                        });
                        $httpBackend.flush();
                    });

                    it('should call server if items are required and cancel button is pressed', function () {
                        var result;

                        form = new Form(formConfig);
                        formData = new FormData(form);
                        button = new FormButton(cancelButtonConfig);

                        // make item required
                        form.getItems()[0].required = true;

                        $httpBackend.expectPOST(SUBMIT_URL, getParamsFromData(formData, button)).respond(200, successData);

                        result = formService.submit(form, formData, button);

                        expect(result).toBeDefined();

                        result.then(function (response) {
                            expect(response.isSuccess()).toEqual(true);
                        });

                        $httpBackend.flush();
                    });

                    it('should call server if items are required and back button is pressed', function () {
                        var result;

                        form = new Form(formConfig);
                        formData = new FormData(form);
                        button = new FormButton(backButtonConfig);

                        // make item required
                        form.getItems()[0].required = true;

                        $httpBackend.expectPOST(SUBMIT_URL, getParamsFromData(formData, button)).respond(200, successData);

                        result = formService.submit(form, formData, button);

                        expect(result).toBeDefined();

                        result.then(function (response) {
                            expect(response.isSuccess()).toEqual(true);
                        });

                        $httpBackend.flush();
                    });

                    it('should return promise from successful call to server', function () {
                        var result;
                        form = new Form(formConfig);
                        formData = new FormData(form);
                        button = new FormButton(nextButtonConfig);
                        $httpBackend.expectPOST(SUBMIT_URL, getParamsFromData(formData, button)).respond(200, successData);
                        result = formService.submit(form, formData, button);
                        result.then(function (response) {
                            expect(response.isSuccess()).toEqual(true);
                        });
                        $httpBackend.flush();
                    });

                    it('should return promise from failed call to server', function () {
                        var result;
                        form = new Form(formConfig);
                        formData = new FormData(form);
                        button = new FormButton(nextButtonConfig);
                        $httpBackend.expectPOST(SUBMIT_URL, getParamsFromData(formData, button)).respond(400, response);
                        result = formService.submit(form, formData, button);
                        result.then(undefined, function (errors) {
                            expect(errors['fieldname']).toBe(VALIDATION_MESSAGE);
                        });
                        $httpBackend.flush();
                    });

                    it('should return a failed promise when another request is in flight', function () {
                        var result;

                        form = new Form(formConfig);
                        formData = new FormData(form);
                        button = new FormButton(nextButtonConfig);

                        $httpBackend.expectPOST(POSTBACK_URL, getParamsFromData(formData)).respond(200, formConfig);

                        formService.postBack(formData);

                        result = formService.submit(form, formData, button);
                        result.then(undefined, function (reason) {
                            // no reason is passed in this case
                            expect(reason).toBeNull();
                        });

                        $httpBackend.flush();
                    });
                });

                describe('validateRequired', function () {
                    var formConfig = {
                        formId: '1',
                        values: {},
                        formBeanClass: 'FormBean',
                        formBeanState: null,
                        items: [{
                            name: 'section one',
                            items: [{
                                name: 'fieldname',
                                required: true,
                                value: 'moontower'
                            }]
                        }]
                    },
                        form,
                        formData;

                    it('should return false if values are required', function () {
                        var result;
                        form = new Form(formConfig);
                        form.getItems()[0].items[0].value = undefined;
                        formData = new FormData(form);
                        result = formService.validateRequired(form, formData);
                        expect(result).toBeFalsy();
                    });

                    it('should return true items are required but have values', function () {
                        var result;
                        form = new Form(formConfig);
                        formData = new FormData(form);
                        result = formService.validateRequired(form, formData);
                        expect(result).toBeTruthy();
                    });
                });

                describe('postBack', function () {
                    var formConfig, nextButtonConfig, form, formData, button, postData, promise, ITEM_NAME, POSTBACK_URL;

                    beforeEach(function () {
                        ITEM_NAME = 'one';
                        POSTBACK_URL = '/identityiq/ui/rest/forms/postback';
                        SUBMIT_URL = '/identityiq/ui/rest/forms/submit';
                        formConfig = {
                            id: '1',
                            formBeanClass: 'FormBean',
                            formBeanState: {},
                            items: [{
                                type: FormItem.TYPE_SECTION,
                                items: [{
                                    name: ITEM_NAME,
                                    postBack: true,
                                    type: FormItem.TYPE_TEXT,
                                    value: null
                                }]
                            }]
                        };

                        nextButtonConfig = {
                            action: 'next',
                            text: 'Submit'
                        };

                        form = new Form(formConfig);
                        formData = new FormData(form);
                        button = new FormButton(nextButtonConfig);

                        postData = {
                            formBeanClass: form.formBeanClass,
                            formBeanState: form.formBeanState,
                            data: { 'one': null }
                        };
                    });

                    it('should pass the correct parameters', function () {
                        $httpBackend.expectPOST(POSTBACK_URL, postData).respond(200, formConfig);
                        promise = formService.postBack(formData);
                        expect(promise).toBeTruthy();

                        promise.then(function (obj) {
                            expect(obj.config.formBeanClass).toEqual(formConfig.formBeanClass);
                            expect(obj.config.formBeanState).toEqual(formConfig.formBeanState);
                            expect(obj.data.postBackFields.length).toEqual(1);
                            expect(obj.data.formId).toEqual(formConfig.id);
                        });

                        $httpBackend.flush();
                    });

                    it('should return a rejected promise when another request is in flight', function () {
                        postData.formId = '1';
                        $httpBackend.expectPOST(SUBMIT_URL, getParamsFromData(formData, button)).respond(200, 'success');

                        formService.submit(form, formData, button);

                        promise = formService.postBack(formData);
                        promise.then(undefined, function (reason) {
                            // no reason is passed in this case
                            expect(reason).toBeNull();
                        });

                        $httpBackend.flush();
                    });

                    it('should return the correct currentField', function () {
                        $httpBackend.expectPOST(POSTBACK_URL, postData).respond(200, formConfig);
                        promise = formService.postBack(formData, ITEM_NAME);
                        expect(promise).toBeTruthy();

                        promise.then(function (obj) {
                            expect(obj.config.getCurrentFieldName()).toEqual(ITEM_NAME);
                        });

                        $httpBackend.flush();
                    });

                    it('should not override currentField if ids do not match', function () {
                        $httpBackend.expectPOST(POSTBACK_URL, postData).respond(200, formConfig);
                        var formDataCopy = angular.copy(formData);
                        formDataCopy.formId = 'iHaveNewIdHowThatHappened';
                        promise = formService.postBack(formDataCopy, ITEM_NAME);
                        expect(promise).toBeTruthy();

                        promise.then(function (obj) {
                            // ids are different so forms are different and current field should not be overridden
                            expect(obj.config.getCurrentFieldName()).not.toEqual(ITEM_NAME);
                        });

                        $httpBackend.flush();
                    });
                });

                describe('applyErrors', function () {
                    var nextButtonConfig = {
                        action: 'next',
                        text: 'Submit'
                    },
                        formConfig = {
                        formId: '1',
                        values: {},
                        items: [{
                            name: 'fieldname',
                            required: false,
                            value: 'moontower'
                        }]
                    },
                        form,
                        formData,
                        button;

                    it('should not have been called if values are not required', function () {
                        var result;

                        spyOn(formService, 'submit').and.returnValue({});
                        spyOn(formService, 'applyErrors').and.returnValue({});

                        form = new Form(formConfig);
                        formData = new FormData(form);
                        button = new FormButton(nextButtonConfig);
                        result = formService.submit(form, formData, button);
                        expect(formService.applyErrors).not.toHaveBeenCalled();
                    });

                    it('should have been called if values are required', function () {
                        var result;

                        spyOn(formService, 'applyErrors').and.returnValue({});

                        form = new Form(formConfig);
                        form.getItems()[0].required = true;
                        form.getItems()[0].value = undefined;
                        formData = new FormData(form);
                        button = new FormButton(nextButtonConfig);
                        result = formService.submit(form, formData, button);
                        expect(formService.applyErrors).toHaveBeenCalled();
                    });
                });

                describe('getPreviewForm', function () {

                    it('should call out to backend to get preview form', function () {
                        var promise,
                            PREVIEW_FORM_URL = '/identityiq/rest/form/preview',
                            postData = { name: 'Workflow Form', description: 'Description about form',
                            sections: [{
                                name: 'Identity details',
                                fields: [{ type: 'string', name: 'Identity name' }] }],
                            buttons: [{ name: 'next', action: 'next', type: 'button' }] },
                            response = {};

                        $httpBackend.expectPOST(PREVIEW_FORM_URL, getPreviewFormData(postData)).respond(200, response);
                        promise = formService.getPreviewForm(postData);
                        expect(promise).toBeTruthy();

                        promise.then(function (response) {
                            expect(response.config instanceof Form).toBeTruthy();
                            expect(response.data instanceof FormData).toBeTruthy();
                        });

                        $httpBackend.flush();
                    });

                    it('should handle http 405 exception', function () {
                        var result,
                            PREVIEW_FORM_URL = '/identityiq/rest/form/preview',
                            postData = {};

                        $httpBackend.expectPOST(PREVIEW_FORM_URL, getPreviewFormData(postData)).respond(405, 'Method Not Allowed');
                        result = formService.getPreviewForm(postData);
                        result.then(function (response) {
                            expect(response['error']).toMatch(/405/);
                        });

                        $httpBackend.flush();
                    });
                });

                function getPreviewFormData(formJSON) {
                    return {
                        formJSON: formJSON
                    };
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0Zvcm1TZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7Ozs7O0lBQTFGOztJQU9JLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7O1FBRXZDLFNBQVMsWUFBWTtZQUo3QixTQUFTLGVBQWUsWUFBVztnQkFDL0IsSUFBSTtvQkFDQTtvQkFDQTtvQkFDQTtvQkFDQTtvQkFDQTtvQkFDQTtvQkFDQSxjQUFjO29CQUNkLGVBQWU7b0JBQ2YsYUFBYTs7Z0JBRWpCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7Ozs7Z0JBSXpDLFdBQVcsT0FBTyxVQUFTLGVBQWUsZ0JBQWdCLFFBQVEsWUFDdkMsWUFBWSxjQUFjLFlBQVk7b0JBQzdELGNBQWM7b0JBQ2QsZUFBZTtvQkFDZixPQUFPO29CQUNQLFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxhQUFhO29CQUNiLFdBQVc7OztnQkFHZixVQUFVLFlBQVc7b0JBQ2pCLGFBQWE7b0JBQ2IsYUFBYTs7O2dCQUdqQixTQUFTLFdBQVcsWUFBVzs7b0JBRTNCLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELElBQUk7NEJBQ0EsV0FBVzs0QkFDWCxXQUFXOzRCQUNYLFdBQVc7NEJBQ1AsT0FBTzs0QkFDUCxTQUFTLENBQUM7Ozt3QkFHbEIsYUFBYSxVQUFVLFdBQVcsVUFBVSxRQUFRLEtBQUs7O3dCQUV6RCxVQUFVLFlBQVksUUFBUTs7d0JBRTlCLE9BQU8sU0FBUzs7d0JBRWhCLFFBQVEsS0FBSyxVQUFTLFVBQVU7NEJBQzVCLE9BQU8sU0FBUyxrQkFBa0IsTUFBTTs0QkFDeEMsT0FBTyxTQUFTLGdCQUFnQixVQUFVOzs7d0JBRzlDLGFBQWE7Ozs7Z0JBS3JC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VTtvQkFDbEMsT0FBTzt3QkFDSCxVQUFXOzs7Ozs7R0FHcEIiLCJmaWxlIjoiY29tbW9uL2Zvcm0vRm9ybVNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIEZvcm1TZXJ2aWNlLlxuICovXG5kZXNjcmliZSgnRm9ybVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZm9ybVNlcnZpY2UsXG4gICAgICAgICRodHRwQmFja2VuZCxcbiAgICAgICAgRm9ybSxcbiAgICAgICAgRm9ybURhdGEsXG4gICAgICAgIEZvcm1JdGVtLFxuICAgICAgICBGb3JtQnV0dG9uLFxuICAgICAgICBXb3JrSXRlbSxcbiAgICAgICAgc3VjY2Vzc0RhdGEgPSB7fSxcbiAgICAgICAgUE9TVEJBQ0tfVVJMID0gJy9pZGVudGl0eWlxL3VpL3Jlc3QvZm9ybXMvcG9zdGJhY2snLFxuICAgICAgICBTVUJNSVRfVVJMID0gJy9pZGVudGl0eWlxL3VpL3Jlc3QvZm9ybXMvc3VibWl0JztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZvcm1Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICB9KSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOjcgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfZm9ybVNlcnZpY2VfLCBfJGh0dHBCYWNrZW5kXywgX0Zvcm1fLCBfRm9ybURhdGFfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9Gb3JtSXRlbV8sIF9Gb3JtQnV0dG9uXywgX1dvcmtJdGVtXykge1xuICAgICAgICBmb3JtU2VydmljZSA9IF9mb3JtU2VydmljZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBGb3JtID0gX0Zvcm1fO1xuICAgICAgICBGb3JtRGF0YSA9IF9Gb3JtRGF0YV87XG4gICAgICAgIEZvcm1JdGVtID0gX0Zvcm1JdGVtXztcbiAgICAgICAgRm9ybUJ1dHRvbiA9IF9Gb3JtQnV0dG9uXztcbiAgICAgICAgV29ya0l0ZW0gPSBfV29ya0l0ZW1fO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRGb3JtJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIG91dCB0byBiYWNrZW5kIHRvIGdldCB2YWx1ZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlLFxuICAgICAgICAgICAgICAgIEZPUk1fVVJMID0gJy9pZGVudGl0eWlxL3VpL3Jlc3QvZm9ybXMvZm9ybS8nLFxuICAgICAgICAgICAgICAgIGZvcm1OYW1lID0gJ25hbWUnLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW3t9XVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoRk9STV9VUkwgKyBmb3JtTmFtZSkucmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgcHJvbWlzZSA9IGZvcm1TZXJ2aWNlLmdldEZvcm0oZm9ybU5hbWUpO1xuXG4gICAgICAgICAgICBleHBlY3QocHJvbWlzZSkudG9CZVRydXRoeSgpO1xuXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuY29uZmlnIGluc3RhbmNlb2YgRm9ybSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhIGluc3RhbmNlb2YgRm9ybURhdGEpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRXb3JrSXRlbUZvcm0nLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgb3V0IHRvIGJhY2tlbmQgdG8gZ2V0IHZhbHVlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UsXG4gICAgICAgICAgICAgICAgV09SS19JVEVNX0ZPUk1fVVJMID0gJy9pZGVudGl0eWlxL3VpL3Jlc3QvZm9ybXMvd29ya0l0ZW0vJyxcbiAgICAgICAgICAgICAgICB3b3JrSWQgPSAnaWQnLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW3t9XVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoV09SS19JVEVNX0ZPUk1fVVJMICsgd29ya0lkKS5yZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBwcm9taXNlID0gZm9ybVNlcnZpY2UuZ2V0V29ya0l0ZW1Gb3JtKG5ldyBXb3JrSXRlbSh7IGlkOiB3b3JrSWQgfSkpO1xuXG4gICAgICAgICAgICBleHBlY3QocHJvbWlzZSkudG9CZVRydXRoeSgpO1xuXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuY29uZmlnIGluc3RhbmNlb2YgRm9ybSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhIGluc3RhbmNlb2YgRm9ybURhdGEpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIG91dCB0byBzZXNzaW9uIGVuZHBvaW50IGlmIHdvcmsgaXRlbSBpcyB0cmFuc2llbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBVUkwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC9mb3Jtcy9zZXNzaW9uJyxcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDEsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFt7fV1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKFVSTCkucmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgZm9ybVNlcnZpY2UuZ2V0V29ya0l0ZW1Gb3JtKG5ldyBXb3JrSXRlbSh7IHdvcmtJdGVtVHlwZTogJ0Zvcm0nIH0pKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQuY29uZmlnIGluc3RhbmNlb2YgRm9ybSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQuZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRQYXJhbXNGcm9tRGF0YShkYXRhLCBidXR0b24pIHtcbiAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgIGZvcm1CZWFuQ2xhc3M6IGRhdGEuZm9ybUJlYW5DbGFzcyxcbiAgICAgICAgICAgIGZvcm1CZWFuU3RhdGU6IGRhdGEuZm9ybUJlYW5TdGF0ZSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEudmFsdWVzLFxuICAgICAgICAgICAgZm9ybUlkOiBkYXRhLmZvcm1JZFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChidXR0b24pIHtcbiAgICAgICAgICAgIHBhcmFtcy5idXR0b24gPSBidXR0b247XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdzdWJtaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5leHRCdXR0b25Db25maWcgPSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnbmV4dCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTdWJtaXQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFja0J1dHRvbkNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBhY3Rpb246ICdiYWNrJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0JhY2snXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybUNvbmZpZyA9IHtcbiAgICAgICAgICAgIGZvcm1JZDogJzEnLFxuICAgICAgICAgICAgdmFsdWVzOiB7fSxcbiAgICAgICAgICAgIGZvcm1CZWFuQ2xhc3M6ICdGb3JtQmVhbicsXG4gICAgICAgICAgICBmb3JtQmVhblN0YXRlOiBudWxsLFxuICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2ZpZWxkbmFtZScsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnbW9vbnRvd2VyJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgVkFMSURBVElPTl9NRVNTQUdFID0gJ1lvdSB0aG91Z2h0IHRoaXMgd2FzIHZhbGlkPycsXG4gICAgICAgIGZvcm0sXG4gICAgICAgIGZvcm1EYXRhLFxuICAgICAgICBidXR0b24sXG4gICAgICAgIHJlc3BvbnNlID0ge2l0ZW1zOiB7ZmllbGRuYW1lOiBWQUxJREFUSU9OX01FU1NBR0V9fTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgc2VydmVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3JtID0gbmV3IEZvcm0oZm9ybUNvbmZpZyk7XG4gICAgICAgICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgICAgIGJ1dHRvbiA9IG5ldyBGb3JtQnV0dG9uKG5leHRCdXR0b25Db25maWcpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoU1VCTUlUX1VSTCwgZ2V0UGFyYW1zRnJvbURhdGEoZm9ybURhdGEsIGJ1dHRvbikpLnJlc3BvbmQoMjAwLCBzdWNjZXNzRGF0YSk7XG4gICAgICAgICAgICBmb3JtU2VydmljZS5zdWJtaXQoZm9ybSwgZm9ybURhdGEsIGJ1dHRvbik7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2FsbCBzZXJ2ZXIgaWYgdmFsdWVzIGFyZSByZXF1aXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIGZvcm0gPSBuZXcgRm9ybShmb3JtQ29uZmlnKTtcbiAgICAgICAgICAgIGZvcm0uZ2V0SXRlbXMoKVswXS5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3JtLmdldEl0ZW1zKClbMF0udmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgICAgIGJ1dHRvbiA9IG5ldyBGb3JtQnV0dG9uKG5leHRCdXR0b25Db25maWcpO1xuICAgICAgICAgICAgcmVzdWx0ID0gZm9ybVNlcnZpY2Uuc3VibWl0KGZvcm0sIGZvcm1EYXRhLCBidXR0b24pO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIHJlc3VsdC50aGVuKHVuZGVmaW5lZCwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QodHlwZW9mIHJlc3BvbnNlWydmaWVsZG5hbWUnXSkudG9CZSgnc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydmaWVsZG5hbWUnXSkudG9CZSgndWlfZm9ybV9yZXF1aXJlZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBzZXJ2ZXIgaWYgaXRlbXMgYXJlIHJlcXVpcmVkIGJ1dCBoYXZlIHZhbHVlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIGZvcm0gPSBuZXcgRm9ybShmb3JtQ29uZmlnKTtcbiAgICAgICAgICAgIGZvcm0uZ2V0SXRlbXMoKVswXS5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgICAgIGJ1dHRvbiA9IG5ldyBGb3JtQnV0dG9uKG5leHRCdXR0b25Db25maWcpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoU1VCTUlUX1VSTCwgZ2V0UGFyYW1zRnJvbURhdGEoZm9ybURhdGEsIGJ1dHRvbikpLnJlc3BvbmQoMjAwLCBzdWNjZXNzRGF0YSk7XG4gICAgICAgICAgICByZXN1bHQgPSBmb3JtU2VydmljZS5zdWJtaXQoZm9ybSwgZm9ybURhdGEsIGJ1dHRvbik7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgcmVzdWx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuaXNTdWNjZXNzKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgc2VydmVyIGlmIGl0ZW1zIGFyZSByZXF1aXJlZCBhbmQgY2FuY2VsIGJ1dHRvbiBpcyBwcmVzc2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgICAgICBmb3JtID0gbmV3IEZvcm0oZm9ybUNvbmZpZyk7XG4gICAgICAgICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgICAgIGJ1dHRvbiA9IG5ldyBGb3JtQnV0dG9uKGNhbmNlbEJ1dHRvbkNvbmZpZyk7XG5cbiAgICAgICAgICAgIC8vIG1ha2UgaXRlbSByZXF1aXJlZFxuICAgICAgICAgICAgZm9ybS5nZXRJdGVtcygpWzBdLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoU1VCTUlUX1VSTCwgZ2V0UGFyYW1zRnJvbURhdGEoZm9ybURhdGEsIGJ1dHRvbikpLnJlc3BvbmQoMjAwLCBzdWNjZXNzRGF0YSk7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IGZvcm1TZXJ2aWNlLnN1Ym1pdChmb3JtLCBmb3JtRGF0YSwgYnV0dG9uKTtcblxuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZURlZmluZWQoKTtcblxuICAgICAgICAgICAgcmVzdWx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuaXNTdWNjZXNzKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBzZXJ2ZXIgaWYgaXRlbXMgYXJlIHJlcXVpcmVkIGFuZCBiYWNrIGJ1dHRvbiBpcyBwcmVzc2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgICAgICBmb3JtID0gbmV3IEZvcm0oZm9ybUNvbmZpZyk7XG4gICAgICAgICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgICAgIGJ1dHRvbiA9IG5ldyBGb3JtQnV0dG9uKGJhY2tCdXR0b25Db25maWcpO1xuXG4gICAgICAgICAgICAvLyBtYWtlIGl0ZW0gcmVxdWlyZWRcbiAgICAgICAgICAgIGZvcm0uZ2V0SXRlbXMoKVswXS5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKFNVQk1JVF9VUkwsIGdldFBhcmFtc0Zyb21EYXRhKGZvcm1EYXRhLCBidXR0b24pKS5yZXNwb25kKDIwMCwgc3VjY2Vzc0RhdGEpO1xuXG4gICAgICAgICAgICByZXN1bHQgPSBmb3JtU2VydmljZS5zdWJtaXQoZm9ybSwgZm9ybURhdGEsIGJ1dHRvbik7XG5cbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmVEZWZpbmVkKCk7XG5cbiAgICAgICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmlzU3VjY2VzcygpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBwcm9taXNlIGZyb20gc3VjY2Vzc2Z1bCBjYWxsIHRvIHNlcnZlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIGZvcm0gPSBuZXcgRm9ybShmb3JtQ29uZmlnKTtcbiAgICAgICAgICAgIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgICAgICAgICAgYnV0dG9uID0gbmV3IEZvcm1CdXR0b24obmV4dEJ1dHRvbkNvbmZpZyk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChTVUJNSVRfVVJMLCBnZXRQYXJhbXNGcm9tRGF0YShmb3JtRGF0YSwgYnV0dG9uKSkucmVzcG9uZCgyMDAsIHN1Y2Nlc3NEYXRhKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZvcm1TZXJ2aWNlLnN1Ym1pdChmb3JtLCBmb3JtRGF0YSwgYnV0dG9uKTtcbiAgICAgICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmlzU3VjY2VzcygpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gcHJvbWlzZSBmcm9tIGZhaWxlZCBjYWxsIHRvIHNlcnZlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIGZvcm0gPSBuZXcgRm9ybShmb3JtQ29uZmlnKTtcbiAgICAgICAgICAgIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgICAgICAgICAgYnV0dG9uID0gbmV3IEZvcm1CdXR0b24obmV4dEJ1dHRvbkNvbmZpZyk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChTVUJNSVRfVVJMLCBnZXRQYXJhbXNGcm9tRGF0YShmb3JtRGF0YSwgYnV0dG9uKSkucmVzcG9uZCg0MDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZvcm1TZXJ2aWNlLnN1Ym1pdChmb3JtLCBmb3JtRGF0YSwgYnV0dG9uKTtcbiAgICAgICAgICAgIHJlc3VsdC50aGVuKHVuZGVmaW5lZCwgZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGVycm9yc1snZmllbGRuYW1lJ10pLnRvQmUoVkFMSURBVElPTl9NRVNTQUdFKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgZmFpbGVkIHByb21pc2Ugd2hlbiBhbm90aGVyIHJlcXVlc3QgaXMgaW4gZmxpZ2h0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgICAgICBmb3JtID0gbmV3IEZvcm0oZm9ybUNvbmZpZyk7XG4gICAgICAgICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgICAgIGJ1dHRvbiA9IG5ldyBGb3JtQnV0dG9uKG5leHRCdXR0b25Db25maWcpO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChQT1NUQkFDS19VUkwsIGdldFBhcmFtc0Zyb21EYXRhKGZvcm1EYXRhKSkucmVzcG9uZCgyMDAsIGZvcm1Db25maWcpO1xuXG4gICAgICAgICAgICBmb3JtU2VydmljZS5wb3N0QmFjayhmb3JtRGF0YSk7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IGZvcm1TZXJ2aWNlLnN1Ym1pdChmb3JtLCBmb3JtRGF0YSwgYnV0dG9uKTtcbiAgICAgICAgICAgIHJlc3VsdC50aGVuKHVuZGVmaW5lZCwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gcmVhc29uIGlzIHBhc3NlZCBpbiB0aGlzIGNhc2VcbiAgICAgICAgICAgICAgICBleHBlY3QocmVhc29uKS50b0JlTnVsbCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3ZhbGlkYXRlUmVxdWlyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZvcm1Db25maWcgPSB7XG4gICAgICAgICAgICBmb3JtSWQ6ICcxJyxcbiAgICAgICAgICAgIHZhbHVlczoge30sXG4gICAgICAgICAgICBmb3JtQmVhbkNsYXNzOiAnRm9ybUJlYW4nLFxuICAgICAgICAgICAgZm9ybUJlYW5TdGF0ZTogbnVsbCxcbiAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzZWN0aW9uIG9uZScsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdmaWVsZG5hbWUnLFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdtb29udG93ZXInXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm0sXG4gICAgICAgIGZvcm1EYXRhO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHZhbHVlcyBhcmUgcmVxdWlyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICBmb3JtID0gbmV3IEZvcm0oZm9ybUNvbmZpZyk7XG4gICAgICAgICAgICBmb3JtLmdldEl0ZW1zKClbMF0uaXRlbXNbMF0udmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZvcm1TZXJ2aWNlLnZhbGlkYXRlUmVxdWlyZWQoZm9ybSwgZm9ybURhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaXRlbXMgYXJlIHJlcXVpcmVkIGJ1dCBoYXZlIHZhbHVlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIGZvcm0gPSBuZXcgRm9ybShmb3JtQ29uZmlnKTtcbiAgICAgICAgICAgIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgICAgICAgICAgcmVzdWx0ID0gZm9ybVNlcnZpY2UudmFsaWRhdGVSZXF1aXJlZChmb3JtLCBmb3JtRGF0YSk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncG9zdEJhY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZvcm1Db25maWcsIG5leHRCdXR0b25Db25maWcsIGZvcm0sIGZvcm1EYXRhLCBidXR0b24sIHBvc3REYXRhLCBwcm9taXNlLCBJVEVNX05BTUUsIFBPU1RCQUNLX1VSTDtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgSVRFTV9OQU1FID0gJ29uZSc7XG4gICAgICAgICAgICBQT1NUQkFDS19VUkwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC9mb3Jtcy9wb3N0YmFjayc7XG4gICAgICAgICAgICBTVUJNSVRfVVJMID0gJy9pZGVudGl0eWlxL3VpL3Jlc3QvZm9ybXMvc3VibWl0JztcbiAgICAgICAgICAgIGZvcm1Db25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1CZWFuQ2xhc3M6ICdGb3JtQmVhbicsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1CZWFuU3RhdGU6IHt9LFxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfU0VDVElPTixcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IElURU1fTkFNRSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0QmFjazogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1RFWFQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbmV4dEJ1dHRvbkNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBhY3Rpb246ICduZXh0JyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU3VibWl0J1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9ybSA9IG5ldyBGb3JtKGZvcm1Db25maWcpO1xuICAgICAgICAgICAgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgICAgICAgICBidXR0b24gPSBuZXcgRm9ybUJ1dHRvbihuZXh0QnV0dG9uQ29uZmlnKTtcblxuICAgICAgICAgICAgcG9zdERhdGEgPSB7XG4gICAgICAgICAgICAgICAgZm9ybUJlYW5DbGFzczogZm9ybS5mb3JtQmVhbkNsYXNzLFxuICAgICAgICAgICAgICAgIGZvcm1CZWFuU3RhdGU6IGZvcm0uZm9ybUJlYW5TdGF0ZSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7J29uZSc6IG51bGx9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcGFzcyB0aGUgY29ycmVjdCBwYXJhbWV0ZXJzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChQT1NUQkFDS19VUkwsIHBvc3REYXRhKS5yZXNwb25kKDIwMCwgZm9ybUNvbmZpZyk7XG4gICAgICAgICAgICBwcm9taXNlID0gZm9ybVNlcnZpY2UucG9zdEJhY2soZm9ybURhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2UpLnRvQmVUcnV0aHkoKTtcblxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIGV4cGVjdChvYmouY29uZmlnLmZvcm1CZWFuQ2xhc3MpLnRvRXF1YWwoZm9ybUNvbmZpZy5mb3JtQmVhbkNsYXNzKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qob2JqLmNvbmZpZy5mb3JtQmVhblN0YXRlKS50b0VxdWFsKGZvcm1Db25maWcuZm9ybUJlYW5TdGF0ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG9iai5kYXRhLnBvc3RCYWNrRmllbGRzLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qob2JqLmRhdGEuZm9ybUlkKS50b0VxdWFsKGZvcm1Db25maWcuaWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhIHJlamVjdGVkIHByb21pc2Ugd2hlbiBhbm90aGVyIHJlcXVlc3QgaXMgaW4gZmxpZ2h0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwb3N0RGF0YS5mb3JtSWQgPSAnMSc7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChTVUJNSVRfVVJMLCBnZXRQYXJhbXNGcm9tRGF0YShmb3JtRGF0YSwgYnV0dG9uKSkucmVzcG9uZCgyMDAsICdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGZvcm1TZXJ2aWNlLnN1Ym1pdChmb3JtLCBmb3JtRGF0YSwgYnV0dG9uKTtcblxuICAgICAgICAgICAgcHJvbWlzZSA9IGZvcm1TZXJ2aWNlLnBvc3RCYWNrKGZvcm1EYXRhKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbih1bmRlZmluZWQsIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIC8vIG5vIHJlYXNvbiBpcyBwYXNzZWQgaW4gdGhpcyBjYXNlXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlYXNvbikudG9CZU51bGwoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGNvcnJlY3QgY3VycmVudEZpZWxkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChQT1NUQkFDS19VUkwsIHBvc3REYXRhKS5yZXNwb25kKDIwMCwgZm9ybUNvbmZpZyk7XG4gICAgICAgICAgICBwcm9taXNlID0gZm9ybVNlcnZpY2UucG9zdEJhY2soZm9ybURhdGEsIElURU1fTkFNRSk7XG4gICAgICAgICAgICBleHBlY3QocHJvbWlzZSkudG9CZVRydXRoeSgpO1xuXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG9iai5jb25maWcuZ2V0Q3VycmVudEZpZWxkTmFtZSgpKS50b0VxdWFsKElURU1fTkFNRSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IG92ZXJyaWRlIGN1cnJlbnRGaWVsZCBpZiBpZHMgZG8gbm90IG1hdGNoJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChQT1NUQkFDS19VUkwsIHBvc3REYXRhKS5yZXNwb25kKDIwMCwgZm9ybUNvbmZpZyk7XG4gICAgICAgICAgICB2YXIgZm9ybURhdGFDb3B5ID0gYW5ndWxhci5jb3B5KGZvcm1EYXRhKTtcbiAgICAgICAgICAgIGZvcm1EYXRhQ29weS5mb3JtSWQgPSAnaUhhdmVOZXdJZEhvd1RoYXRIYXBwZW5lZCc7XG4gICAgICAgICAgICBwcm9taXNlID0gZm9ybVNlcnZpY2UucG9zdEJhY2soZm9ybURhdGFDb3B5LCBJVEVNX05BTUUpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2UpLnRvQmVUcnV0aHkoKTtcblxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIC8vIGlkcyBhcmUgZGlmZmVyZW50IHNvIGZvcm1zIGFyZSBkaWZmZXJlbnQgYW5kIGN1cnJlbnQgZmllbGQgc2hvdWxkIG5vdCBiZSBvdmVycmlkZGVuXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9iai5jb25maWcuZ2V0Q3VycmVudEZpZWxkTmFtZSgpKS5ub3QudG9FcXVhbChJVEVNX05BTUUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FwcGx5RXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBuZXh0QnV0dG9uQ29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogJ25leHQnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICdTdWJtaXQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybUNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBmb3JtSWQ6ICcxJyxcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IHt9LFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZmllbGRuYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ21vb250b3dlcidcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcm0sXG4gICAgICAgICAgICBmb3JtRGF0YSxcbiAgICAgICAgICAgIGJ1dHRvbjtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBoYXZlIGJlZW4gY2FsbGVkIGlmIHZhbHVlcyBhcmUgbm90IHJlcXVpcmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgICAgICBzcHlPbihmb3JtU2VydmljZSwgJ3N1Ym1pdCcpLmFuZC5yZXR1cm5WYWx1ZSh7fSk7XG4gICAgICAgICAgICBzcHlPbihmb3JtU2VydmljZSwgJ2FwcGx5RXJyb3JzJykuYW5kLnJldHVyblZhbHVlKHt9KTtcblxuICAgICAgICAgICAgZm9ybSA9IG5ldyBGb3JtKGZvcm1Db25maWcpO1xuICAgICAgICAgICAgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgICAgICAgICBidXR0b24gPSBuZXcgRm9ybUJ1dHRvbihuZXh0QnV0dG9uQ29uZmlnKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZvcm1TZXJ2aWNlLnN1Ym1pdChmb3JtLCBmb3JtRGF0YSwgYnV0dG9uKTtcbiAgICAgICAgICAgIGV4cGVjdChmb3JtU2VydmljZS5hcHBseUVycm9ycykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGJlZW4gY2FsbGVkIGlmIHZhbHVlcyBhcmUgcmVxdWlyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG5cbiAgICAgICAgICAgIHNweU9uKGZvcm1TZXJ2aWNlLCAnYXBwbHlFcnJvcnMnKS5hbmQucmV0dXJuVmFsdWUoe30pO1xuXG4gICAgICAgICAgICBmb3JtID0gbmV3IEZvcm0oZm9ybUNvbmZpZyk7XG4gICAgICAgICAgICBmb3JtLmdldEl0ZW1zKClbMF0ucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9ybS5nZXRJdGVtcygpWzBdLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgICAgICAgICBidXR0b24gPSBuZXcgRm9ybUJ1dHRvbihuZXh0QnV0dG9uQ29uZmlnKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZvcm1TZXJ2aWNlLnN1Ym1pdChmb3JtLCBmb3JtRGF0YSwgYnV0dG9uKTtcbiAgICAgICAgICAgIGV4cGVjdChmb3JtU2VydmljZS5hcHBseUVycm9ycykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRQcmV2aWV3Rm9ybScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBvdXQgdG8gYmFja2VuZCB0byBnZXQgcHJldmlldyBmb3JtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSxcbiAgICAgICAgICAgICAgICBQUkVWSUVXX0ZPUk1fVVJMID0gJy9pZGVudGl0eWlxL3Jlc3QvZm9ybS9wcmV2aWV3JyxcbiAgICAgICAgICAgICAgICBwb3N0RGF0YSA9IHtuYW1lOiAnV29ya2Zsb3cgRm9ybScsIGRlc2NyaXB0aW9uOiAnRGVzY3JpcHRpb24gYWJvdXQgZm9ybScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdJZGVudGl0eSBkZXRhaWxzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBbe3R5cGU6ICdzdHJpbmcnLG5hbWU6ICdJZGVudGl0eSBuYW1lJ31dfV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW3tuYW1lOiAnbmV4dCcsYWN0aW9uOiAnbmV4dCcsIHR5cGU6ICdidXR0b24nfV19LFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0ge307XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKFBSRVZJRVdfRk9STV9VUkwsIGdldFByZXZpZXdGb3JtRGF0YShwb3N0RGF0YSkpLnJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gZm9ybVNlcnZpY2UuZ2V0UHJldmlld0Zvcm0ocG9zdERhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2UpLnRvQmVUcnV0aHkoKTtcblxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmNvbmZpZyBpbnN0YW5jZW9mIEZvcm0pLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgaHR0cCA0MDUgZXhjZXB0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0LFxuICAgICAgICAgICAgICAgIFBSRVZJRVdfRk9STV9VUkwgPSAnL2lkZW50aXR5aXEvcmVzdC9mb3JtL3ByZXZpZXcnLFxuICAgICAgICAgICAgICAgIHBvc3REYXRhID0ge307XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKFBSRVZJRVdfRk9STV9VUkwsIGdldFByZXZpZXdGb3JtRGF0YShwb3N0RGF0YSkpLnJlc3BvbmQoNDA1LCAnTWV0aG9kIE5vdCBBbGxvd2VkJyk7XG4gICAgICAgICAgICByZXN1bHQgPSBmb3JtU2VydmljZS5nZXRQcmV2aWV3Rm9ybShwb3N0RGF0YSk7XG4gICAgICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnZXJyb3InXSkudG9NYXRjaCgvNDA1Lyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0UHJldmlld0Zvcm1EYXRhKGZvcm1KU09OKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmb3JtSlNPTiA6IGZvcm1KU09OXG4gICAgICAgIH07XG4gICAgfVxuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
