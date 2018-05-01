System.register(['test/js/TestInitializer', 'common/search/SearchModule'], function (_export) {

    /**
     * Tests for the Filter model object.
     */

    'use strict';

    var searchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }],
        execute: function () {
            describe('Filter', function () {
                var Filter, filter, data, identityFilter, identityFilterData;

                beforeEach(module(searchModule));

                /**
                 * Setup the Filter class and default data to test with.
                 */
                beforeEach(inject(function (_Filter_) {
                    Filter = _Filter_;

                    data = {
                        property: 'bro hug?',
                        multiValued: true,
                        additional: false,
                        label: 'Do you like bro hugs?',
                        dataType: Filter.DATA_TYPE_STRING,
                        allowedValues: ['Yes', 'No', 'Only if there is a back pat', 'Only if there is a sweet hand shake in the middle'],
                        templateFunc: function () {
                            return '';
                        }
                    };
                    filter = new Filter(data);

                    identityFilterData = {
                        property: 'shawty',
                        multiValued: false,
                        label: 'Who is yo shwaty?',
                        dataType: Filter.DATA_TYPE_IDENTITY,
                        attributes: {
                            suggestContext: 'shawties',
                            suggestId: 'rollUpOnDatShawty'
                        }
                    };
                    identityFilter = new Filter(identityFilterData);
                }));

                describe('constructor', function () {
                    it('explodes if no data is passed in', function () {
                        expect(function () {
                            new Filter(null);
                        }).toThrow();
                    });

                    it('explodes if the data has no property', function () {
                        expect(function () {
                            new Filter({});
                        }).toThrow();
                    });

                    it('sets property', function () {
                        expect(filter.property).toEqual(data.property);
                    });

                    it('sets multiValued', function () {
                        expect(filter.multiValued).toEqual(data.multiValued);
                    });

                    it('sets additional', function () {
                        expect(filter.additional).toEqual(data.additional);
                    });

                    it('sets templateFunc', function () {
                        expect(filter.templateFunc).toEqual(data.templateFunc);
                    });

                    it('defaults multiValued to false if unspecified', function () {
                        var myData = angular.copy(data),
                            myFilter;
                        delete myData.multiValued;
                        myFilter = new Filter(myData);
                        expect(myFilter.multiValued).toEqual(false);
                    });

                    it('sets label', function () {
                        expect(filter.label).toEqual(data.label);
                    });

                    it('sets dataType', function () {
                        expect(filter.dataType).toEqual(data.dataType);
                    });

                    it('defaults dataType to STRING if unspecified', function () {
                        var myData = angular.copy(data),
                            myFilter;
                        delete myData.dataType;
                        myFilter = new Filter(myData);
                        expect(myFilter.dataType).toEqual(Filter.DATA_TYPE_STRING);
                    });

                    it('sets identity suggest info', function () {
                        expect(identityFilter.getSuggestContext()).toEqual(identityFilterData.attributes.suggestContext);
                        expect(identityFilter.getSuggestId()).toEqual(identityFilterData.attributes.suggestId);
                    });
                });

                describe('getAttribute()', function () {
                    it('returns the correct attribute value', function () {
                        expect(identityFilter.getAttribute('suggestContext')).toEqual(identityFilterData.attributes.suggestContext);
                    });

                    it('returns null when the filter does not have the requested attribute', function () {
                        expect(identityFilter.getAttribute('notThere')).toBeNull();
                    });

                    it('returns null when the filter has no attributes', function () {
                        expect(filter.getAttribute('noAttrs')).toBeNull();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvRmlsdGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLCtCQUErQixVQUFVLFNBQVM7Ozs7OztJQUE5Rjs7SUFRSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCOztRQUU3QyxTQUFTLFlBQVk7WUFKN0IsU0FBUyxVQUFVLFlBQVc7Z0JBQzFCLElBQUksUUFBUSxRQUFRLE1BQU0sZ0JBQWdCOztnQkFFMUMsV0FBVyxPQUFPOzs7OztnQkFLbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUzs7b0JBRVQsT0FBTzt3QkFDSCxVQUFVO3dCQUNWLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixPQUFPO3dCQUNQLFVBQVUsT0FBTzt3QkFDakIsZUFBZSxDQUNYLE9BQ0EsTUFDQSwrQkFDQTt3QkFFSixjQUFjLFlBQUE7NEJBQ0UsT0FESTs7O29CQUV4QixTQUFTLElBQUksT0FBTzs7b0JBRXBCLHFCQUFxQjt3QkFDakIsVUFBVTt3QkFDVixhQUFhO3dCQUNiLE9BQU87d0JBQ1AsVUFBVSxPQUFPO3dCQUNqQixZQUFZOzRCQUNSLGdCQUFnQjs0QkFDaEIsV0FBVzs7O29CQUduQixpQkFBaUIsSUFBSSxPQUFPOzs7Z0JBR2hDLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLG9DQUFvQyxZQUFXO3dCQUM5QyxPQUFPLFlBQVc7NEJBQUUsSUFBSSxPQUFPOzJCQUFVOzs7b0JBRzdDLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELE9BQU8sWUFBVzs0QkFBRSxJQUFJLE9BQU87MkJBQVE7OztvQkFHM0MsR0FBRyxpQkFBaUIsWUFBVzt3QkFDM0IsT0FBTyxPQUFPLFVBQVUsUUFBUSxLQUFLOzs7b0JBR3pDLEdBQUcsb0JBQW9CLFlBQVc7d0JBQzlCLE9BQU8sT0FBTyxhQUFhLFFBQVEsS0FBSzs7O29CQUc1QyxHQUFHLG1CQUFtQixZQUFXO3dCQUM3QixPQUFPLE9BQU8sWUFBWSxRQUFRLEtBQUs7OztvQkFHM0MsR0FBRyxxQkFBcUIsWUFBTTt3QkFDMUIsT0FBTyxPQUFPLGNBQWMsUUFBUSxLQUFLOzs7b0JBRzdDLEdBQUcsZ0RBQWdELFlBQVc7d0JBQzFELElBQUksU0FBUyxRQUFRLEtBQUs7NEJBQ3RCO3dCQUNKLE9BQU8sT0FBTzt3QkFDZCxXQUFXLElBQUksT0FBTzt3QkFDdEIsT0FBTyxTQUFTLGFBQWEsUUFBUTs7O29CQUd6QyxHQUFHLGNBQWMsWUFBVzt3QkFDeEIsT0FBTyxPQUFPLE9BQU8sUUFBUSxLQUFLOzs7b0JBR3RDLEdBQUcsaUJBQWlCLFlBQVc7d0JBQzNCLE9BQU8sT0FBTyxVQUFVLFFBQVEsS0FBSzs7O29CQUd6QyxHQUFHLDhDQUE4QyxZQUFXO3dCQUN4RCxJQUFJLFNBQVMsUUFBUSxLQUFLOzRCQUN0Qjt3QkFDSixPQUFPLE9BQU87d0JBQ2QsV0FBVyxJQUFJLE9BQU87d0JBQ3RCLE9BQU8sU0FBUyxVQUFVLFFBQVEsT0FBTzs7O29CQUc3QyxHQUFHLDhCQUE4QixZQUFXO3dCQUN4QyxPQUFPLGVBQWUscUJBQXFCLFFBQVEsbUJBQW1CLFdBQVc7d0JBQ2pGLE9BQU8sZUFBZSxnQkFBZ0IsUUFBUSxtQkFBbUIsV0FBVzs7OztnQkFJcEYsU0FBUyxrQkFBa0IsWUFBVztvQkFDbEMsR0FBRyx1Q0FBdUMsWUFBVzt3QkFDakQsT0FBTyxlQUFlLGFBQWEsbUJBQW1CLFFBQVEsbUJBQW1CLFdBQVc7OztvQkFHaEcsR0FBRyxzRUFBc0UsWUFBVzt3QkFDaEYsT0FBTyxlQUFlLGFBQWEsYUFBYTs7O29CQUdwRCxHQUFHLGtEQUFrRCxZQUFXO3dCQUM1RCxPQUFPLE9BQU8sYUFBYSxZQUFZOzs7Ozs7R0FZaEQiLCJmaWxlIjoiY29tbW9uL3NlYXJjaC9GaWx0ZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgc2VhcmNoTW9kdWxlIGZyb20gJ2NvbW1vbi9zZWFyY2gvU2VhcmNoTW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIEZpbHRlciBtb2RlbCBvYmplY3QuXHJcbiAqL1xyXG5cclxuZGVzY3JpYmUoJ0ZpbHRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIEZpbHRlciwgZmlsdGVyLCBkYXRhLCBpZGVudGl0eUZpbHRlciwgaWRlbnRpdHlGaWx0ZXJEYXRhO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHNlYXJjaE1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIEZpbHRlciBjbGFzcyBhbmQgZGVmYXVsdCBkYXRhIHRvIHRlc3Qgd2l0aC5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0ZpbHRlcl8pIHtcclxuICAgICAgICBGaWx0ZXIgPSBfRmlsdGVyXztcclxuXHJcbiAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgcHJvcGVydHk6ICdicm8gaHVnPycsXHJcbiAgICAgICAgICAgIG11bHRpVmFsdWVkOiB0cnVlLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWw6ICdEbyB5b3UgbGlrZSBicm8gaHVncz8nLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogRmlsdGVyLkRBVEFfVFlQRV9TVFJJTkcsXHJcbiAgICAgICAgICAgIGFsbG93ZWRWYWx1ZXM6IFtcclxuICAgICAgICAgICAgICAgICdZZXMnLFxyXG4gICAgICAgICAgICAgICAgJ05vJyxcclxuICAgICAgICAgICAgICAgICdPbmx5IGlmIHRoZXJlIGlzIGEgYmFjayBwYXQnLFxyXG4gICAgICAgICAgICAgICAgJ09ubHkgaWYgdGhlcmUgaXMgYSBzd2VldCBoYW5kIHNoYWtlIGluIHRoZSBtaWRkbGUnXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlRnVuYzogKCkgPT4gJydcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZpbHRlciA9IG5ldyBGaWx0ZXIoZGF0YSk7XHJcblxyXG4gICAgICAgIGlkZW50aXR5RmlsdGVyRGF0YSA9IHtcclxuICAgICAgICAgICAgcHJvcGVydHk6ICdzaGF3dHknLFxyXG4gICAgICAgICAgICBtdWx0aVZhbHVlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnV2hvIGlzIHlvIHNod2F0eT8nLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogRmlsdGVyLkRBVEFfVFlQRV9JREVOVElUWSxcclxuICAgICAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICAgICAgc3VnZ2VzdENvbnRleHQ6ICdzaGF3dGllcycsXHJcbiAgICAgICAgICAgICAgICBzdWdnZXN0SWQ6ICdyb2xsVXBPbkRhdFNoYXd0eSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWRlbnRpdHlGaWx0ZXIgPSBuZXcgRmlsdGVyKGlkZW50aXR5RmlsdGVyRGF0YSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ2V4cGxvZGVzIGlmIG5vIGRhdGEgaXMgcGFzc2VkIGluJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IEZpbHRlcihudWxsKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZXhwbG9kZXMgaWYgdGhlIGRhdGEgaGFzIG5vIHByb3BlcnR5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IEZpbHRlcih7fSk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgcHJvcGVydHknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZpbHRlci5wcm9wZXJ0eSkudG9FcXVhbChkYXRhLnByb3BlcnR5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgbXVsdGlWYWx1ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZpbHRlci5tdWx0aVZhbHVlZCkudG9FcXVhbChkYXRhLm11bHRpVmFsdWVkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgYWRkaXRpb25hbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyLmFkZGl0aW9uYWwpLnRvRXF1YWwoZGF0YS5hZGRpdGlvbmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgdGVtcGxhdGVGdW5jJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyLnRlbXBsYXRlRnVuYykudG9FcXVhbChkYXRhLnRlbXBsYXRlRnVuYyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkZWZhdWx0cyBtdWx0aVZhbHVlZCB0byBmYWxzZSBpZiB1bnNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbXlEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgbXlGaWx0ZXI7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBteURhdGEubXVsdGlWYWx1ZWQ7XHJcbiAgICAgICAgICAgIG15RmlsdGVyID0gbmV3IEZpbHRlcihteURhdGEpO1xyXG4gICAgICAgICAgICBleHBlY3QobXlGaWx0ZXIubXVsdGlWYWx1ZWQpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyBsYWJlbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyLmxhYmVsKS50b0VxdWFsKGRhdGEubGFiZWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyBkYXRhVHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyLmRhdGFUeXBlKS50b0VxdWFsKGRhdGEuZGF0YVR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZGVmYXVsdHMgZGF0YVR5cGUgdG8gU1RSSU5HIGlmIHVuc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBteURhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YSksXHJcbiAgICAgICAgICAgICAgICBteUZpbHRlcjtcclxuICAgICAgICAgICAgZGVsZXRlIG15RGF0YS5kYXRhVHlwZTtcclxuICAgICAgICAgICAgbXlGaWx0ZXIgPSBuZXcgRmlsdGVyKG15RGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChteUZpbHRlci5kYXRhVHlwZSkudG9FcXVhbChGaWx0ZXIuREFUQV9UWVBFX1NUUklORyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIGlkZW50aXR5IHN1Z2dlc3QgaW5mbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlGaWx0ZXIuZ2V0U3VnZ2VzdENvbnRleHQoKSkudG9FcXVhbChpZGVudGl0eUZpbHRlckRhdGEuYXR0cmlidXRlcy5zdWdnZXN0Q29udGV4dCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eUZpbHRlci5nZXRTdWdnZXN0SWQoKSkudG9FcXVhbChpZGVudGl0eUZpbHRlckRhdGEuYXR0cmlidXRlcy5zdWdnZXN0SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldEF0dHJpYnV0ZSgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIGNvcnJlY3QgYXR0cmlidXRlIHZhbHVlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eUZpbHRlci5nZXRBdHRyaWJ1dGUoJ3N1Z2dlc3RDb250ZXh0JykpLnRvRXF1YWwoaWRlbnRpdHlGaWx0ZXJEYXRhLmF0dHJpYnV0ZXMuc3VnZ2VzdENvbnRleHQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBudWxsIHdoZW4gdGhlIGZpbHRlciBkb2VzIG5vdCBoYXZlIHRoZSByZXF1ZXN0ZWQgYXR0cmlidXRlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eUZpbHRlci5nZXRBdHRyaWJ1dGUoJ25vdFRoZXJlJykpLnRvQmVOdWxsKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIG51bGwgd2hlbiB0aGUgZmlsdGVyIGhhcyBubyBhdHRyaWJ1dGVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXIuZ2V0QXR0cmlidXRlKCdub0F0dHJzJykpLnRvQmVOdWxsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
