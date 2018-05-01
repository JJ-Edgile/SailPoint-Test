System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
     * Tests for the DynamicValuesService.
     */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('DynamicValuesService', function () {
                var dynamicValuesService, Form, FormItem, FormData, $httpBackend;

                beforeEach(module(formModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_dynamicValuesService_, _Form_, _FormItem_, _FormData_, _$httpBackend_) {
                    dynamicValuesService = _dynamicValuesService_;
                    Form = _Form_;
                    FormItem = _FormItem_;
                    FormData = _FormData_;
                    $httpBackend = _$httpBackend_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getObjects', function () {

                    it('should call out to backend to get values', function () {
                        var promise,
                            DYNAMIC_VALUES_URL = '/identityiq/ui/rest/forms/dynamicAllowedValues',
                            extraParams = {
                            formBeanClass: 'class',
                            formBeanState: {},
                            fieldName: 'name',
                            formId: '1',
                            data: {}
                        },
                            postData = {
                            query: '',
                            start: 0,
                            limit: 5,
                            formBeanClass: extraParams.formBeanClass,
                            formBeanState: extraParams.formBeanState,
                            fieldName: extraParams.fieldName,
                            formId: extraParams.formId,
                            data: extraParams.data
                        },
                            response = {
                            count: 1,
                            objects: [{}]
                        };

                        $httpBackend.expectPOST(DYNAMIC_VALUES_URL, postData).respond(200, response);

                        promise = dynamicValuesService.getObjects('', 0, 5, extraParams);

                        expect(promise).toBeTruthy();

                        promise.then(function (response) {
                            expect(response.count).toEqual(response.count);
                            expect(response.objects.length).toEqual(response.objects.length);
                        });

                        $httpBackend.flush();
                    });
                });

                describe('getExtraParams', function () {

                    it('should read the params off of the scope', function () {
                        var extraParams,
                            formItem = {
                            name: 'fieldname',
                            formBeanClass: 'someclass',
                            formBeanState: { formName: 'formname' }
                        },
                            form = new Form({
                            items: [{
                                type: FormItem.TYPE_SECTION,
                                items: [formItem]
                            }]
                        }),
                            formData = new FormData(form),
                            scope = {
                            spObjectSuggestFormItem: formItem,
                            spObjectSuggestFormData: formData
                        };

                        extraParams = dynamicValuesService.getExtraParams(scope);

                        expect(extraParams.fieldName).toEqual(formItem.name);
                        expect(extraParams.formBeanClass).toEqual(formData.formBeanClass);
                        expect(extraParams.formBeanState).toEqual(formData.formBeanState);
                        expect(extraParams.data).toEqual(formData.getValuesForSubmission());
                        expect(extraParams.formId).toEqual(formData.formId);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0R5bmFtaWNWYWx1ZXNTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7Ozs7O0lBQTFGOztJQU9JLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7O1FBRXZDLFNBQVMsWUFBWTtZQUo3QixTQUFTLHdCQUF3QixZQUFXO2dCQUN4QyxJQUFJLHNCQUNBLE1BQ0EsVUFDQSxVQUNBOztnQkFFSixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1COzs7Z0JBR3pDLFdBQVcsT0FBTyxVQUFTLHdCQUF3QixRQUFRLFlBQVksWUFBWSxnQkFBZ0I7b0JBQy9GLHVCQUF1QjtvQkFDdkIsT0FBTztvQkFDUCxXQUFXO29CQUNYLFdBQVc7b0JBQ1gsZUFBZTs7O2dCQUduQixVQUFVLFlBQVc7b0JBQ2pCLGFBQWE7b0JBQ2IsYUFBYTs7O2dCQUdqQixTQUFTLGNBQWMsWUFBVzs7b0JBRTlCLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELElBQUk7NEJBQ0EscUJBQXFCOzRCQUNyQixjQUFjOzRCQUNWLGVBQWU7NEJBQ2YsZUFBZTs0QkFDZixXQUFXOzRCQUNYLFFBQVE7NEJBQ1IsTUFBTTs7NEJBRVYsV0FBVzs0QkFDUCxPQUFPOzRCQUNQLE9BQU87NEJBQ1AsT0FBTzs0QkFDUCxlQUFlLFlBQVk7NEJBQzNCLGVBQWUsWUFBWTs0QkFDM0IsV0FBVyxZQUFZOzRCQUN2QixRQUFRLFlBQVk7NEJBQ3BCLE1BQU0sWUFBWTs7NEJBRXRCLFdBQVc7NEJBQ1AsT0FBTzs0QkFDUCxTQUFTLENBQUM7Ozt3QkFHbEIsYUFBYSxXQUFXLG9CQUFvQixVQUFVLFFBQVEsS0FBSzs7d0JBRW5FLFVBQVUscUJBQXFCLFdBQVcsSUFBSSxHQUFHLEdBQUc7O3dCQUVwRCxPQUFPLFNBQVM7O3dCQUVoQixRQUFRLEtBQUssVUFBUyxVQUFVOzRCQUM1QixPQUFPLFNBQVMsT0FBTyxRQUFRLFNBQVM7NEJBQ3hDLE9BQU8sU0FBUyxRQUFRLFFBQVEsUUFBUSxTQUFTLFFBQVE7Ozt3QkFHN0QsYUFBYTs7OztnQkFLckIsU0FBUyxrQkFBa0IsWUFBVzs7b0JBRWxDLEdBQUcsMkNBQTJDLFlBQVc7d0JBQ3JELElBQUk7NEJBQ0EsV0FBVzs0QkFDUCxNQUFNOzRCQUNOLGVBQWU7NEJBQ2YsZUFBZSxFQUFFLFVBQVU7OzRCQUUvQixPQUFPLElBQUksS0FBSzs0QkFDWixPQUFPLENBQUM7Z0NBQ0osTUFBTSxTQUFTO2dDQUNmLE9BQU8sQ0FBQzs7OzRCQUdoQixXQUFXLElBQUksU0FBUzs0QkFDeEIsUUFBUTs0QkFDSix5QkFBeUI7NEJBQ3pCLHlCQUF5Qjs7O3dCQUdqQyxjQUFjLHFCQUFxQixlQUFlOzt3QkFFbEQsT0FBTyxZQUFZLFdBQVcsUUFBUSxTQUFTO3dCQUMvQyxPQUFPLFlBQVksZUFBZSxRQUFRLFNBQVM7d0JBQ25ELE9BQU8sWUFBWSxlQUFlLFFBQVEsU0FBUzt3QkFDbkQsT0FBTyxZQUFZLE1BQU0sUUFBUSxTQUFTO3dCQUMxQyxPQUFPLFlBQVksUUFBUSxRQUFRLFNBQVM7Ozs7OztHQU1yRCIsImZpbGUiOiJjb21tb24vZm9ybS9EeW5hbWljVmFsdWVzU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBmb3JtTW9kdWxlIGZyb20gJ2NvbW1vbi9mb3JtL0Zvcm1Nb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgRHluYW1pY1ZhbHVlc1NlcnZpY2UuXG4gKi9cbmRlc2NyaWJlKCdEeW5hbWljVmFsdWVzU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkeW5hbWljVmFsdWVzU2VydmljZSxcbiAgICAgICAgRm9ybSxcbiAgICAgICAgRm9ybUl0ZW0sXG4gICAgICAgIEZvcm1EYXRhLFxuICAgICAgICAkaHR0cEJhY2tlbmQ7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmb3JtTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2R5bmFtaWNWYWx1ZXNTZXJ2aWNlXywgX0Zvcm1fLCBfRm9ybUl0ZW1fLCBfRm9ybURhdGFfLCBfJGh0dHBCYWNrZW5kXykge1xuICAgICAgICBkeW5hbWljVmFsdWVzU2VydmljZSA9IF9keW5hbWljVmFsdWVzU2VydmljZV87XG4gICAgICAgIEZvcm0gPSBfRm9ybV87XG4gICAgICAgIEZvcm1JdGVtID0gX0Zvcm1JdGVtXztcbiAgICAgICAgRm9ybURhdGEgPSBfRm9ybURhdGFfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0T2JqZWN0cycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBvdXQgdG8gYmFja2VuZCB0byBnZXQgdmFsdWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSxcbiAgICAgICAgICAgICAgICBEWU5BTUlDX1ZBTFVFU19VUkwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC9mb3Jtcy9keW5hbWljQWxsb3dlZFZhbHVlcycsXG4gICAgICAgICAgICAgICAgZXh0cmFQYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1CZWFuQ2xhc3M6ICdjbGFzcycsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1CZWFuU3RhdGU6IHt9LFxuICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybUlkOiAnMScsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHt9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3N0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1CZWFuQ2xhc3M6IGV4dHJhUGFyYW1zLmZvcm1CZWFuQ2xhc3MsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1CZWFuU3RhdGU6IGV4dHJhUGFyYW1zLmZvcm1CZWFuU3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZTogZXh0cmFQYXJhbXMuZmllbGROYW1lLFxuICAgICAgICAgICAgICAgICAgICBmb3JtSWQ6IGV4dHJhUGFyYW1zLmZvcm1JZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZXh0cmFQYXJhbXMuZGF0YVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiBbe31dXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoRFlOQU1JQ19WQUxVRVNfVVJMLCBwb3N0RGF0YSkucmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgcHJvbWlzZSA9IGR5bmFtaWNWYWx1ZXNTZXJ2aWNlLmdldE9iamVjdHMoJycsIDAsIDUsIGV4dHJhUGFyYW1zKTtcblxuICAgICAgICAgICAgZXhwZWN0KHByb21pc2UpLnRvQmVUcnV0aHkoKTtcblxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmNvdW50KS50b0VxdWFsKHJlc3BvbnNlLmNvdW50KTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2Uub2JqZWN0cy5sZW5ndGgpLnRvRXF1YWwocmVzcG9uc2Uub2JqZWN0cy5sZW5ndGgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEV4dHJhUGFyYW1zJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZWFkIHRoZSBwYXJhbXMgb2ZmIG9mIHRoZSBzY29wZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGV4dHJhUGFyYW1zLFxuICAgICAgICAgICAgICAgIGZvcm1JdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZmllbGRuYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybUJlYW5DbGFzczogJ3NvbWVjbGFzcycsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1CZWFuU3RhdGU6IHsgZm9ybU5hbWU6ICdmb3JtbmFtZScgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZm9ybSA9IG5ldyBGb3JtKHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1NFQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW2Zvcm1JdGVtXVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pLFxuICAgICAgICAgICAgICAgIHNjb3BlID0ge1xuICAgICAgICAgICAgICAgICAgICBzcE9iamVjdFN1Z2dlc3RGb3JtSXRlbTogZm9ybUl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIHNwT2JqZWN0U3VnZ2VzdEZvcm1EYXRhOiBmb3JtRGF0YVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV4dHJhUGFyYW1zID0gZHluYW1pY1ZhbHVlc1NlcnZpY2UuZ2V0RXh0cmFQYXJhbXMoc2NvcGUpO1xuXG4gICAgICAgICAgICBleHBlY3QoZXh0cmFQYXJhbXMuZmllbGROYW1lKS50b0VxdWFsKGZvcm1JdGVtLm5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KGV4dHJhUGFyYW1zLmZvcm1CZWFuQ2xhc3MpLnRvRXF1YWwoZm9ybURhdGEuZm9ybUJlYW5DbGFzcyk7XG4gICAgICAgICAgICBleHBlY3QoZXh0cmFQYXJhbXMuZm9ybUJlYW5TdGF0ZSkudG9FcXVhbChmb3JtRGF0YS5mb3JtQmVhblN0YXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChleHRyYVBhcmFtcy5kYXRhKS50b0VxdWFsKGZvcm1EYXRhLmdldFZhbHVlc0ZvclN1Ym1pc3Npb24oKSk7XG4gICAgICAgICAgICBleHBlY3QoZXh0cmFQYXJhbXMuZm9ybUlkKS50b0VxdWFsKGZvcm1EYXRhLmZvcm1JZCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
