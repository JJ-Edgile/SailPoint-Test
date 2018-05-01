System.register(['test/js/TestInitializer', 'common/search/SearchModule'], function (_export) {

    /**
     * Tests for the FilterTemplateService.
     */
    'use strict';

    var searchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }],
        execute: function () {
            describe('FilterTemplateService', function () {
                var filterTemplateService, stringFilter, numberFilter, dateFilter, identityFilter, identityMultiFilter, allowedValuesFilter, booleanFilter, unknownFilter, columnFilter, multiValuedColumnFilter, templateFuncFilter, dateRangeFilter;

                beforeEach(module(searchModule));

                /**
                 * Setup the FilterTemplateService and initialize test data.
                 */
                beforeEach(inject(function (_filterTemplateService_, Filter) {
                    filterTemplateService = _filterTemplateService_;

                    stringFilter = new Filter({
                        property: 'stringProp',
                        label: 'String',
                        dataType: Filter.DATA_TYPE_STRING
                    });
                    numberFilter = new Filter({
                        property: 'numberProp',
                        label: 'Number',
                        dataType: Filter.DATA_TYPE_NUMBER
                    });
                    dateFilter = new Filter({
                        property: 'dateProp',
                        label: 'Date',
                        dataType: Filter.DATA_TYPE_DATE,
                        allowedOperations: [{
                            displayName: 'Equals',
                            id: 'Equals'
                        }, {
                            displayName: 'GreaterThan',
                            id: 'GreaterThan'
                        }]
                    });
                    identityFilter = new Filter({
                        property: 'identityProp',
                        label: 'Identity',
                        dataType: Filter.DATA_TYPE_IDENTITY,
                        attributes: {
                            suggestContext: 'bros',
                            suggestId: 'broSuggest'
                        }
                    });
                    identityMultiFilter = new Filter({
                        property: 'identityMultiProp',
                        label: 'Some Identities',
                        dataType: Filter.DATA_TYPE_IDENTITY,
                        multiValued: true,
                        attributes: {
                            suggestContext: 'yomomma',
                            suggestId: 'itsyomomma'
                        }
                    });

                    allowedValuesFilter = new Filter({
                        property: 'allowedStringProp',
                        label: 'Allowed',
                        dataType: Filter.DATA_TYPE_STRING,
                        allowedValues: [{
                            displayName: 'foo',
                            id: 'bar'
                        }, {
                            displayName: 'baz',
                            id: 'xyz'
                        }]
                    });
                    booleanFilter = new Filter({
                        property: 'booleanProp',
                        label: 'Boolean',
                        dataType: Filter.DATA_TYPE_BOOLEAN
                    });
                    unknownFilter = new Filter({
                        property: 'unknownProp',
                        label: 'What tha?!',
                        dataType: 'pool'
                    });
                    columnFilter = new Filter({
                        property: 'Identity.column',
                        label: 'Column',
                        dataType: Filter.DATA_TYPE_COLUMN,
                        attributes: {
                            isLcm: true,
                            lcmAction: 'Request Access',
                            suggestClass: 'Identity',
                            suggestColumn: 'column'
                        }
                    });
                    multiValuedColumnFilter = new Filter({
                        property: 'Identity.column',
                        label: 'Column',
                        dataType: Filter.DATA_TYPE_COLUMN,
                        multiValued: true,
                        attributes: {
                            suggestClass: 'Identity',
                            suggestColumn: 'column'
                        }
                    });
                    dateRangeFilter = new Filter({
                        property: 'dateRange',
                        label: 'Range',
                        dataType: Filter.DATA_TYPE_DATE_RANGE
                    });

                    templateFuncFilter = new Filter({
                        property: 'funky',
                        templateFunc: jasmine.createSpy('templateFunc').and.callFake(function (id) {
                            return '<fake-thing id="' + id + '" />';
                        })
                    });
                }));

                describe('getFilterTemplate', function () {
                    /**
                     * Get the requested filter template and verify that it has strings that
                     * match the expectedStrings array.
                     */
                    function testFilter(filter, expectedStrings) {
                        var template = filterTemplateService.getFilterTemplate(filter, 'id', filter.label),
                            i;
                        for (i = 0; i < expectedStrings.length; i++) {
                            expect(template.indexOf(expectedStrings[i])).toBeGreaterThan(-1);
                        }
                    }

                    it('returns a text input for a string filter', function () {
                        testFilter(stringFilter, ['type="text"', 'id="id"']);
                    });

                    it('returns a number input for a number filter', function () {
                        testFilter(numberFilter, ['type="number"', 'id="id"']);
                    });

                    it('returns a date input with a dropdown for allowed operations for a date filter', function () {
                        var alt = 'alt="' + dateFilter.label + '"';
                        testFilter(dateFilter, ['sp-datepicker', 'sp-datepicker-id="id"', 'sp-dropdown', alt]);
                    });

                    it('returns an identity suggest for an identity filter', function () {
                        testFilter(identityFilter, ['sp-object-suggest', 'sp-object-suggest-id="broSuggest"', 'sp-object-suggest-context="bros"']);
                    });

                    it('returns an identity multi suggest for multivalued identity filter', function () {
                        testFilter(identityMultiFilter, ['sp-object-multi-suggest', 'sp-object-multi-suggest-class="sailpoint.object.Identity"', 'sp-object-multi-suggest-id="itsyomomma"', 'sp-object-multi-suggest-context="yomomma"']);
                    });

                    it('returns a object suggest for a single-valued allowed value filter', function () {
                        allowedValuesFilter.multiValued = false;
                        testFilter(allowedValuesFilter, ['sp-object-suggest', 'sp-object-suggest-allowed-values="spFilter.allowedValues"']);
                    });

                    it('returns a object multi-suggest for a multi-valued allowed value filter', function () {
                        allowedValuesFilter.multiValued = true;
                        testFilter(allowedValuesFilter, ['sp-object-multi-suggest', 'sp-object-multi-suggest-allowed-values="spFilter.allowedValues"']);
                    });

                    it('returns a boolean dropdown for a boolean filter', function () {
                        testFilter(booleanFilter, ['sp-boolean-dropdown', 'sp-button-id="id"', 'sp-button-aria-label="' + booleanFilter.label + '"']);
                    });

                    it('returns the correct object suggest for a column filter', function () {
                        testFilter(columnFilter, ['sp-object-suggest', 'sp-object-suggest-search-service="filterItemCtrl.columnSuggestService"', 'sp-object-suggest-params="spFilter.attributes"']);
                    });

                    it('returns the correct object suggest for a multi-valued column filter', function () {
                        testFilter(multiValuedColumnFilter, ['sp-object-multi-suggest', 'sp-object-multi-suggest-search-service="filterItemCtrl.columnSuggestService"', 'sp-object-multi-suggest-params="spFilter.attributes"']);
                    });

                    it('calls and returns from templateFunc if defined', function () {
                        testFilter(templateFuncFilter, ['fake-thing', 'id="id"']);
                        expect(templateFuncFilter.templateFunc).toHaveBeenCalled();
                    });

                    it('returns the date range filter', function () {
                        testFilter(dateRangeFilter, ['sp-date-range', 'sp-id="id"', 'sp-label-text="Range"']);
                    });

                    it('explodes with a null filter', function () {
                        expect(function () {
                            filterTemplateService.getFilterTemplate(null, 'id');
                        }).toThrow();
                    });

                    it('explodes with a null id', function () {
                        expect(function () {
                            filterTemplateService.getFilterTemplate(stringFilter, null);
                        }).toThrow();
                    });

                    it('explodes for an unhandled filter type', function () {
                        expect(function () {
                            filterTemplateService.getFilterTemplate(unknownFilter);
                        }).toThrow();
                    });
                });

                describe('getInputId', function () {
                    it('explodes with a null filter', function () {
                        expect(function () {
                            filterTemplateService.getInputId(null, 'id');
                        }).toThrow();
                    });

                    it('explodes with a null id', function () {
                        expect(function () {
                            filterTemplateService.getInputId(stringFilter, null);
                        }).toThrow();
                    });

                    it('returns the same id for non-identity filters', function () {
                        expect(filterTemplateService.getInputId(stringFilter, 'someId')).toEqual('someId');
                        expect(filterTemplateService.getInputId(booleanFilter, 'otherId')).toEqual('otherId');
                    });

                    it('returns the suggest id for identity filters', function () {
                        expect(filterTemplateService.getInputId(identityFilter, 'someId')).toEqual('broSuggest');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvRmlsdGVyVGVtcGxhdGVTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLCtCQUErQixVQUFVLFNBQVM7Ozs7O0lBQTlGOztJQU9JLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQkFBMkI7WUFDakYsZUFBZSwwQkFBMEI7O1FBRTdDLFNBQVMsWUFBWTtZQUo3QixTQUFTLHlCQUF5QixZQUFXO2dCQUN6QyxJQUFJLHVCQUNBLGNBQ0EsY0FDQSxZQUNBLGdCQUNBLHFCQUNBLHFCQUNBLGVBQ0EsZUFDQSxjQUNBLHlCQUNBLG9CQUNBOztnQkFFSixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyx5QkFBeUIsUUFBUTtvQkFDeEQsd0JBQXdCOztvQkFFeEIsZUFBZSxJQUFJLE9BQU87d0JBQ3RCLFVBQVU7d0JBQ1YsT0FBTzt3QkFDUCxVQUFVLE9BQU87O29CQUVyQixlQUFlLElBQUksT0FBTzt3QkFDdEIsVUFBVTt3QkFDVixPQUFPO3dCQUNQLFVBQVUsT0FBTzs7b0JBRXJCLGFBQWEsSUFBSSxPQUFPO3dCQUNwQixVQUFVO3dCQUNWLE9BQU87d0JBQ1AsVUFBVSxPQUFPO3dCQUNqQixtQkFBbUIsQ0FBQzs0QkFDaEIsYUFBYTs0QkFDYixJQUFJOzJCQUNMOzRCQUNDLGFBQWE7NEJBQ2IsSUFBSTs7O29CQUdaLGlCQUFpQixJQUFJLE9BQU87d0JBQ3hCLFVBQVU7d0JBQ1YsT0FBTzt3QkFDUCxVQUFVLE9BQU87d0JBQ2pCLFlBQVk7NEJBQ1IsZ0JBQWdCOzRCQUNoQixXQUFXOzs7b0JBR25CLHNCQUFzQixJQUFJLE9BQU87d0JBQzdCLFVBQVU7d0JBQ1YsT0FBTzt3QkFDUCxVQUFVLE9BQU87d0JBQ2pCLGFBQWE7d0JBQ2IsWUFBWTs0QkFDUixnQkFBZ0I7NEJBQ2hCLFdBQVc7Ozs7b0JBSW5CLHNCQUFzQixJQUFJLE9BQU87d0JBQzdCLFVBQVU7d0JBQ1YsT0FBTzt3QkFDUCxVQUFVLE9BQU87d0JBQ2pCLGVBQWUsQ0FBQzs0QkFDWixhQUFhOzRCQUNiLElBQUk7MkJBQ0w7NEJBQ0MsYUFBYTs0QkFDYixJQUFJOzs7b0JBR1osZ0JBQWdCLElBQUksT0FBTzt3QkFDdkIsVUFBVTt3QkFDVixPQUFPO3dCQUNQLFVBQVUsT0FBTzs7b0JBRXJCLGdCQUFnQixJQUFJLE9BQU87d0JBQ3ZCLFVBQVU7d0JBQ1YsT0FBTzt3QkFDUCxVQUFVOztvQkFFZCxlQUFlLElBQUksT0FBTzt3QkFDdEIsVUFBVTt3QkFDVixPQUFPO3dCQUNQLFVBQVUsT0FBTzt3QkFDakIsWUFBWTs0QkFDUixPQUFPOzRCQUNQLFdBQVc7NEJBQ1gsY0FBYzs0QkFDZCxlQUFlOzs7b0JBR3ZCLDBCQUEwQixJQUFJLE9BQU87d0JBQ2pDLFVBQVU7d0JBQ1YsT0FBTzt3QkFDUCxVQUFVLE9BQU87d0JBQ2pCLGFBQWE7d0JBQ2IsWUFBWTs0QkFDUixjQUFjOzRCQUNkLGVBQWU7OztvQkFHdkIsa0JBQWtCLElBQUksT0FBTzt3QkFDekIsVUFBVTt3QkFDVixPQUFPO3dCQUNQLFVBQVUsT0FBTzs7O29CQUdyQixxQkFBcUIsSUFBSSxPQUFPO3dCQUM1QixVQUFVO3dCQUNWLGNBQWMsUUFBUSxVQUFVLGdCQUFnQixJQUFJLFNBQVMsVUFBQyxJQUFFOzRCQU5oRCxPQUFPLHFCQU1pRSxLQUFFOzs7OztnQkFJbEcsU0FBUyxxQkFBcUIsWUFBVzs7Ozs7b0JBS3JDLFNBQVMsV0FBVyxRQUFRLGlCQUFpQjt3QkFDekMsSUFBSSxXQUFXLHNCQUFzQixrQkFBa0IsUUFBUSxNQUFNLE9BQU87NEJBQ3hFO3dCQUNKLEtBQUssSUFBSSxHQUFHLElBQUksZ0JBQWdCLFFBQVEsS0FBSzs0QkFDekMsT0FBTyxTQUFTLFFBQVEsZ0JBQWdCLEtBQUssZ0JBQWdCLENBQUM7Ozs7b0JBSXRFLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELFdBQVcsY0FBYyxDQUFFLGVBQWU7OztvQkFHOUMsR0FBRyw4Q0FBOEMsWUFBVzt3QkFDeEQsV0FBVyxjQUFjLENBQUUsaUJBQWlCOzs7b0JBR2hELEdBQUcsaUZBQWlGLFlBQVc7d0JBQzNGLElBQUksTUFBTSxVQUFVLFdBQVcsUUFBUTt3QkFDdkMsV0FBVyxZQUFZLENBQUUsaUJBQWlCLHlCQUF5QixlQUFlOzs7b0JBR3RGLEdBQUcsc0RBQXNELFlBQVc7d0JBQ2hFLFdBQVcsZ0JBQWdCLENBQUUscUJBQ0EscUNBQ0E7OztvQkFHakMsR0FBRyxxRUFBcUUsWUFBVzt3QkFDL0UsV0FBVyxxQkFBcUIsQ0FBRSwyQkFDOUIsNkRBQ0EsMkNBQ0E7OztvQkFHUixHQUFHLHFFQUFxRSxZQUFXO3dCQUMvRSxvQkFBb0IsY0FBYzt3QkFDbEMsV0FBVyxxQkFDUCxDQUFFLHFCQUFxQjs7O29CQUcvQixHQUFHLDBFQUEwRSxZQUFXO3dCQUNwRixvQkFBb0IsY0FBYzt3QkFDbEMsV0FBVyxxQkFDUCxDQUFFLDJCQUEyQjs7O29CQUdyQyxHQUFHLG1EQUFtRCxZQUFXO3dCQUM3RCxXQUFXLGVBQ1AsQ0FBRSx1QkFBdUIscUJBQXFCLDJCQUEyQixjQUFjLFFBQVE7OztvQkFHdkcsR0FBRywwREFBMEQsWUFBVzt3QkFDcEUsV0FBVyxjQUFjLENBQUMscUJBQ3RCLDBFQUNBOzs7b0JBR1IsR0FBRyx1RUFBdUUsWUFBVzt3QkFDakYsV0FBVyx5QkFBeUIsQ0FBQywyQkFDakMsZ0ZBQ0E7OztvQkFHUixHQUFHLGtEQUFrRCxZQUFNO3dCQUN2RCxXQUFXLG9CQUFvQixDQUFDLGNBQWM7d0JBQzlDLE9BQU8sbUJBQW1CLGNBQWM7OztvQkFHNUMsR0FBRyxpQ0FBaUMsWUFBTTt3QkFDdEMsV0FBVyxpQkFBaUIsQ0FBQyxpQkFBaUIsY0FBYzs7O29CQUdoRSxHQUFHLCtCQUErQixZQUFXO3dCQUN6QyxPQUFPLFlBQVc7NEJBQUUsc0JBQXNCLGtCQUFrQixNQUFNOzJCQUFVOzs7b0JBR2hGLEdBQUcsMkJBQTJCLFlBQVc7d0JBQ3JDLE9BQU8sWUFBVzs0QkFBRSxzQkFBc0Isa0JBQWtCLGNBQWM7MkJBQVU7OztvQkFHeEYsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsT0FBTyxZQUFXOzRCQUFFLHNCQUFzQixrQkFBa0I7MkJBQW1COzs7O2dCQUl2RixTQUFTLGNBQWMsWUFBVztvQkFDOUIsR0FBRywrQkFBK0IsWUFBVzt3QkFDekMsT0FBTyxZQUFXOzRCQUFFLHNCQUFzQixXQUFXLE1BQU07MkJBQVU7OztvQkFHekUsR0FBRywyQkFBMkIsWUFBVzt3QkFDckMsT0FBTyxZQUFXOzRCQUFFLHNCQUFzQixXQUFXLGNBQWM7MkJBQVU7OztvQkFHakYsR0FBRyxnREFBZ0QsWUFBVzt3QkFDMUQsT0FBTyxzQkFBc0IsV0FBVyxjQUFjLFdBQVcsUUFBUTt3QkFDekUsT0FBTyxzQkFBc0IsV0FBVyxlQUFlLFlBQVksUUFBUTs7O29CQUcvRSxHQUFHLCtDQUErQyxZQUFXO3dCQUN6RCxPQUFPLHNCQUFzQixXQUFXLGdCQUFnQixXQUFXLFFBQVE7Ozs7OztHQURwRiIsImZpbGUiOiJjb21tb24vc2VhcmNoL0ZpbHRlclRlbXBsYXRlU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBzZWFyY2hNb2R1bGUgZnJvbSAnY29tbW9uL3NlYXJjaC9TZWFyY2hNb2R1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgRmlsdGVyVGVtcGxhdGVTZXJ2aWNlLlxyXG4gKi9cclxuZGVzY3JpYmUoJ0ZpbHRlclRlbXBsYXRlU2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGZpbHRlclRlbXBsYXRlU2VydmljZSxcclxuICAgICAgICBzdHJpbmdGaWx0ZXIsXHJcbiAgICAgICAgbnVtYmVyRmlsdGVyLFxyXG4gICAgICAgIGRhdGVGaWx0ZXIsXHJcbiAgICAgICAgaWRlbnRpdHlGaWx0ZXIsXHJcbiAgICAgICAgaWRlbnRpdHlNdWx0aUZpbHRlcixcclxuICAgICAgICBhbGxvd2VkVmFsdWVzRmlsdGVyLFxyXG4gICAgICAgIGJvb2xlYW5GaWx0ZXIsXHJcbiAgICAgICAgdW5rbm93bkZpbHRlcixcclxuICAgICAgICBjb2x1bW5GaWx0ZXIsXHJcbiAgICAgICAgbXVsdGlWYWx1ZWRDb2x1bW5GaWx0ZXIsXHJcbiAgICAgICAgdGVtcGxhdGVGdW5jRmlsdGVyLFxyXG4gICAgICAgIGRhdGVSYW5nZUZpbHRlcjtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShzZWFyY2hNb2R1bGUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIHRoZSBGaWx0ZXJUZW1wbGF0ZVNlcnZpY2UgYW5kIGluaXRpYWxpemUgdGVzdCBkYXRhLlxyXG4gICAgICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfZmlsdGVyVGVtcGxhdGVTZXJ2aWNlXywgRmlsdGVyKSB7XHJcbiAgICAgICAgZmlsdGVyVGVtcGxhdGVTZXJ2aWNlID0gX2ZpbHRlclRlbXBsYXRlU2VydmljZV87XHJcblxyXG4gICAgICAgIHN0cmluZ0ZpbHRlciA9IG5ldyBGaWx0ZXIoe1xyXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ3N0cmluZ1Byb3AnLFxyXG4gICAgICAgICAgICBsYWJlbDogJ1N0cmluZycsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBGaWx0ZXIuREFUQV9UWVBFX1NUUklOR1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG51bWJlckZpbHRlciA9IG5ldyBGaWx0ZXIoe1xyXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ251bWJlclByb3AnLFxyXG4gICAgICAgICAgICBsYWJlbDogJ051bWJlcicsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBGaWx0ZXIuREFUQV9UWVBFX05VTUJFUlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRhdGVGaWx0ZXIgPSBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgcHJvcGVydHk6ICdkYXRlUHJvcCcsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnRGF0ZScsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBGaWx0ZXIuREFUQV9UWVBFX0RBVEUsXHJcbiAgICAgICAgICAgIGFsbG93ZWRPcGVyYXRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdFcXVhbHMnLFxyXG4gICAgICAgICAgICAgICAgaWQ6ICdFcXVhbHMnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnR3JlYXRlclRoYW4nLFxyXG4gICAgICAgICAgICAgICAgaWQ6ICdHcmVhdGVyVGhhbidcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZGVudGl0eUZpbHRlciA9IG5ldyBGaWx0ZXIoe1xyXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ2lkZW50aXR5UHJvcCcsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnSWRlbnRpdHknLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogRmlsdGVyLkRBVEFfVFlQRV9JREVOVElUWSxcclxuICAgICAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICAgICAgc3VnZ2VzdENvbnRleHQ6ICdicm9zJyxcclxuICAgICAgICAgICAgICAgIHN1Z2dlc3RJZDogJ2Jyb1N1Z2dlc3QnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZGVudGl0eU11bHRpRmlsdGVyID0gbmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgIHByb3BlcnR5OiAnaWRlbnRpdHlNdWx0aVByb3AnLFxyXG4gICAgICAgICAgICBsYWJlbDogJ1NvbWUgSWRlbnRpdGllcycsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBGaWx0ZXIuREFUQV9UWVBFX0lERU5USVRZLFxyXG4gICAgICAgICAgICBtdWx0aVZhbHVlZDogdHJ1ZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICAgICAgc3VnZ2VzdENvbnRleHQ6ICd5b21vbW1hJyxcclxuICAgICAgICAgICAgICAgIHN1Z2dlc3RJZDogJ2l0c3lvbW9tbWEnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYWxsb3dlZFZhbHVlc0ZpbHRlciA9IG5ldyBGaWx0ZXIoe1xyXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ2FsbG93ZWRTdHJpbmdQcm9wJyxcclxuICAgICAgICAgICAgbGFiZWw6ICdBbGxvd2VkJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6IEZpbHRlci5EQVRBX1RZUEVfU1RSSU5HLFxyXG4gICAgICAgICAgICBhbGxvd2VkVmFsdWVzOiBbe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdmb28nLFxyXG4gICAgICAgICAgICAgICAgaWQ6ICdiYXInXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnYmF6JyxcclxuICAgICAgICAgICAgICAgIGlkOiAneHl6J1xyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJvb2xlYW5GaWx0ZXIgPSBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgcHJvcGVydHk6ICdib29sZWFuUHJvcCcsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnQm9vbGVhbicsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBGaWx0ZXIuREFUQV9UWVBFX0JPT0xFQU5cclxuICAgICAgICB9KTtcclxuICAgICAgICB1bmtub3duRmlsdGVyID0gbmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgIHByb3BlcnR5OiAndW5rbm93blByb3AnLFxyXG4gICAgICAgICAgICBsYWJlbDogJ1doYXQgdGhhPyEnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ3Bvb2wnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29sdW1uRmlsdGVyID0gbmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgIHByb3BlcnR5OiAnSWRlbnRpdHkuY29sdW1uJyxcclxuICAgICAgICAgICAgbGFiZWw6ICdDb2x1bW4nLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogRmlsdGVyLkRBVEFfVFlQRV9DT0xVTU4sXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgIGlzTGNtOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbGNtQWN0aW9uOiAnUmVxdWVzdCBBY2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgc3VnZ2VzdENsYXNzOiAnSWRlbnRpdHknLFxyXG4gICAgICAgICAgICAgICAgc3VnZ2VzdENvbHVtbjogJ2NvbHVtbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG11bHRpVmFsdWVkQ29sdW1uRmlsdGVyID0gbmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgIHByb3BlcnR5OiAnSWRlbnRpdHkuY29sdW1uJyxcclxuICAgICAgICAgICAgbGFiZWw6ICdDb2x1bW4nLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogRmlsdGVyLkRBVEFfVFlQRV9DT0xVTU4sXHJcbiAgICAgICAgICAgIG11bHRpVmFsdWVkOiB0cnVlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgICAgICBzdWdnZXN0Q2xhc3M6ICdJZGVudGl0eScsXHJcbiAgICAgICAgICAgICAgICBzdWdnZXN0Q29sdW1uOiAnY29sdW1uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGF0ZVJhbmdlRmlsdGVyID0gbmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgIHByb3BlcnR5OiAnZGF0ZVJhbmdlJyxcclxuICAgICAgICAgICAgbGFiZWw6ICdSYW5nZScsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBGaWx0ZXIuREFUQV9UWVBFX0RBVEVfUkFOR0VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGVtcGxhdGVGdW5jRmlsdGVyID0gbmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgIHByb3BlcnR5OiAnZnVua3knLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUZ1bmM6IGphc21pbmUuY3JlYXRlU3B5KCd0ZW1wbGF0ZUZ1bmMnKS5hbmQuY2FsbEZha2UoKGlkKSA9PiBgPGZha2UtdGhpbmcgaWQ9XCIke2lkfVwiIC8+YClcclxuICAgICAgICB9KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0RmlsdGVyVGVtcGxhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgdGhlIHJlcXVlc3RlZCBmaWx0ZXIgdGVtcGxhdGUgYW5kIHZlcmlmeSB0aGF0IGl0IGhhcyBzdHJpbmdzIHRoYXRcclxuICAgICAgICAgKiBtYXRjaCB0aGUgZXhwZWN0ZWRTdHJpbmdzIGFycmF5LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RGaWx0ZXIoZmlsdGVyLCBleHBlY3RlZFN0cmluZ3MpIHtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gZmlsdGVyVGVtcGxhdGVTZXJ2aWNlLmdldEZpbHRlclRlbXBsYXRlKGZpbHRlciwgJ2lkJywgZmlsdGVyLmxhYmVsKSxcclxuICAgICAgICAgICAgICAgIGk7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBleHBlY3RlZFN0cmluZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdCh0ZW1wbGF0ZS5pbmRleE9mKGV4cGVjdGVkU3RyaW5nc1tpXSkpLnRvQmVHcmVhdGVyVGhhbigtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGEgdGV4dCBpbnB1dCBmb3IgYSBzdHJpbmcgZmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRlc3RGaWx0ZXIoc3RyaW5nRmlsdGVyLCBbICd0eXBlPVwidGV4dFwiJywgJ2lkPVwiaWRcIicgXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGEgbnVtYmVyIGlucHV0IGZvciBhIG51bWJlciBmaWx0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdEZpbHRlcihudW1iZXJGaWx0ZXIsIFsgJ3R5cGU9XCJudW1iZXJcIicsICdpZD1cImlkXCInIF0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBhIGRhdGUgaW5wdXQgd2l0aCBhIGRyb3Bkb3duIGZvciBhbGxvd2VkIG9wZXJhdGlvbnMgZm9yIGEgZGF0ZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGFsdCA9ICdhbHQ9XCInICsgZGF0ZUZpbHRlci5sYWJlbCArICdcIic7XHJcbiAgICAgICAgICAgIHRlc3RGaWx0ZXIoZGF0ZUZpbHRlciwgWyAnc3AtZGF0ZXBpY2tlcicsICdzcC1kYXRlcGlja2VyLWlkPVwiaWRcIicsICdzcC1kcm9wZG93bicsIGFsdCBdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgYW4gaWRlbnRpdHkgc3VnZ2VzdCBmb3IgYW4gaWRlbnRpdHkgZmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRlc3RGaWx0ZXIoaWRlbnRpdHlGaWx0ZXIsIFsgJ3NwLW9iamVjdC1zdWdnZXN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3Atb2JqZWN0LXN1Z2dlc3QtaWQ9XCJicm9TdWdnZXN0XCInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcC1vYmplY3Qtc3VnZ2VzdC1jb250ZXh0PVwiYnJvc1wiJyBdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgYW4gaWRlbnRpdHkgbXVsdGkgc3VnZ2VzdCBmb3IgbXVsdGl2YWx1ZWQgaWRlbnRpdHkgZmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRlc3RGaWx0ZXIoaWRlbnRpdHlNdWx0aUZpbHRlciwgWyAnc3Atb2JqZWN0LW11bHRpLXN1Z2dlc3QnLFxyXG4gICAgICAgICAgICAgICAgJ3NwLW9iamVjdC1tdWx0aS1zdWdnZXN0LWNsYXNzPVwic2FpbHBvaW50Lm9iamVjdC5JZGVudGl0eVwiJyxcclxuICAgICAgICAgICAgICAgICdzcC1vYmplY3QtbXVsdGktc3VnZ2VzdC1pZD1cIml0c3lvbW9tbWFcIicsXHJcbiAgICAgICAgICAgICAgICAnc3Atb2JqZWN0LW11bHRpLXN1Z2dlc3QtY29udGV4dD1cInlvbW9tbWFcIiddKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgYSBvYmplY3Qgc3VnZ2VzdCBmb3IgYSBzaW5nbGUtdmFsdWVkIGFsbG93ZWQgdmFsdWUgZmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFsbG93ZWRWYWx1ZXNGaWx0ZXIubXVsdGlWYWx1ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGVzdEZpbHRlcihhbGxvd2VkVmFsdWVzRmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgWyAnc3Atb2JqZWN0LXN1Z2dlc3QnLCAnc3Atb2JqZWN0LXN1Z2dlc3QtYWxsb3dlZC12YWx1ZXM9XCJzcEZpbHRlci5hbGxvd2VkVmFsdWVzXCInIF0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBhIG9iamVjdCBtdWx0aS1zdWdnZXN0IGZvciBhIG11bHRpLXZhbHVlZCBhbGxvd2VkIHZhbHVlIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhbGxvd2VkVmFsdWVzRmlsdGVyLm11bHRpVmFsdWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGVzdEZpbHRlcihhbGxvd2VkVmFsdWVzRmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgWyAnc3Atb2JqZWN0LW11bHRpLXN1Z2dlc3QnLCAnc3Atb2JqZWN0LW11bHRpLXN1Z2dlc3QtYWxsb3dlZC12YWx1ZXM9XCJzcEZpbHRlci5hbGxvd2VkVmFsdWVzXCInIF0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBhIGJvb2xlYW4gZHJvcGRvd24gZm9yIGEgYm9vbGVhbiBmaWx0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdEZpbHRlcihib29sZWFuRmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgWyAnc3AtYm9vbGVhbi1kcm9wZG93bicsICdzcC1idXR0b24taWQ9XCJpZFwiJywgJ3NwLWJ1dHRvbi1hcmlhLWxhYmVsPVwiJyArIGJvb2xlYW5GaWx0ZXIubGFiZWwgKyAnXCInIF0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCBvYmplY3Qgc3VnZ2VzdCBmb3IgYSBjb2x1bW4gZmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRlc3RGaWx0ZXIoY29sdW1uRmlsdGVyLCBbJ3NwLW9iamVjdC1zdWdnZXN0JyxcclxuICAgICAgICAgICAgICAgICdzcC1vYmplY3Qtc3VnZ2VzdC1zZWFyY2gtc2VydmljZT1cImZpbHRlckl0ZW1DdHJsLmNvbHVtblN1Z2dlc3RTZXJ2aWNlXCInLFxyXG4gICAgICAgICAgICAgICAgJ3NwLW9iamVjdC1zdWdnZXN0LXBhcmFtcz1cInNwRmlsdGVyLmF0dHJpYnV0ZXNcIiddKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIGNvcnJlY3Qgb2JqZWN0IHN1Z2dlc3QgZm9yIGEgbXVsdGktdmFsdWVkIGNvbHVtbiBmaWx0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdEZpbHRlcihtdWx0aVZhbHVlZENvbHVtbkZpbHRlciwgWydzcC1vYmplY3QtbXVsdGktc3VnZ2VzdCcsXHJcbiAgICAgICAgICAgICAgICAnc3Atb2JqZWN0LW11bHRpLXN1Z2dlc3Qtc2VhcmNoLXNlcnZpY2U9XCJmaWx0ZXJJdGVtQ3RybC5jb2x1bW5TdWdnZXN0U2VydmljZVwiJyxcclxuICAgICAgICAgICAgICAgICdzcC1vYmplY3QtbXVsdGktc3VnZ2VzdC1wYXJhbXM9XCJzcEZpbHRlci5hdHRyaWJ1dGVzXCInXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyBhbmQgcmV0dXJucyBmcm9tIHRlbXBsYXRlRnVuYyBpZiBkZWZpbmVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0RmlsdGVyKHRlbXBsYXRlRnVuY0ZpbHRlciwgWydmYWtlLXRoaW5nJywgJ2lkPVwiaWRcIiddKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlbXBsYXRlRnVuY0ZpbHRlci50ZW1wbGF0ZUZ1bmMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIGRhdGUgcmFuZ2UgZmlsdGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0RmlsdGVyKGRhdGVSYW5nZUZpbHRlciwgWydzcC1kYXRlLXJhbmdlJywgJ3NwLWlkPVwiaWRcIicsICdzcC1sYWJlbC10ZXh0PVwiUmFuZ2VcIiddKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2V4cGxvZGVzIHdpdGggYSBudWxsIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGZpbHRlclRlbXBsYXRlU2VydmljZS5nZXRGaWx0ZXJUZW1wbGF0ZShudWxsLCAnaWQnKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZXhwbG9kZXMgd2l0aCBhIG51bGwgaWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBmaWx0ZXJUZW1wbGF0ZVNlcnZpY2UuZ2V0RmlsdGVyVGVtcGxhdGUoc3RyaW5nRmlsdGVyLCBudWxsKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZXhwbG9kZXMgZm9yIGFuIHVuaGFuZGxlZCBmaWx0ZXIgdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGZpbHRlclRlbXBsYXRlU2VydmljZS5nZXRGaWx0ZXJUZW1wbGF0ZSh1bmtub3duRmlsdGVyKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldElucHV0SWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnZXhwbG9kZXMgd2l0aCBhIG51bGwgZmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgZmlsdGVyVGVtcGxhdGVTZXJ2aWNlLmdldElucHV0SWQobnVsbCwgJ2lkJyk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2V4cGxvZGVzIHdpdGggYSBudWxsIGlkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgZmlsdGVyVGVtcGxhdGVTZXJ2aWNlLmdldElucHV0SWQoc3RyaW5nRmlsdGVyLCBudWxsKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0aGUgc2FtZSBpZCBmb3Igbm9uLWlkZW50aXR5IGZpbHRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclRlbXBsYXRlU2VydmljZS5nZXRJbnB1dElkKHN0cmluZ0ZpbHRlciwgJ3NvbWVJZCcpKS50b0VxdWFsKCdzb21lSWQnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclRlbXBsYXRlU2VydmljZS5nZXRJbnB1dElkKGJvb2xlYW5GaWx0ZXIsICdvdGhlcklkJykpLnRvRXF1YWwoJ290aGVySWQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIHN1Z2dlc3QgaWQgZm9yIGlkZW50aXR5IGZpbHRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclRlbXBsYXRlU2VydmljZS5nZXRJbnB1dElkKGlkZW50aXR5RmlsdGVyLCAnc29tZUlkJykpLnRvRXF1YWwoJ2Jyb1N1Z2dlc3QnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
