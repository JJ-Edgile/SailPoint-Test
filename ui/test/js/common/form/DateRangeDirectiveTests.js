System.register(['test/js/TestInitializer', 'common/form/FormModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('spDateRange', function () {

                var elementDefinition = '<div sp-date-range="dateRange" sp-id="{{id}}" sp-label-text="{{labelText}}" />',
                    dateRange = undefined,
                    id = undefined,
                    labelText = undefined,
                    element = undefined,
                    $scope = undefined,
                    $compile = undefined;

                beforeEach(module(formModule));

                beforeEach(inject(function (_$rootScope_, _$compile_, spTranslateFilter) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;

                    dateRange = {};
                    id = '1234';
                    labelText = 'My Date Range';

                    spTranslateFilter.configureCatalog({
                        'ui_date_range_filter_start_date': '{0} Start',
                        'ui_date_range_filter_end_date': '{0} End',
                        'ui_datepicker_placeholder': '{0}'
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement() {
                    $scope.dateRange = dateRange;
                    $scope.id = id;
                    $scope.labelText = labelText;

                    element = $compile(angular.element(elementDefinition))($scope);
                    $scope.$apply();
                }

                function updateDateInput(idPostfix, value) {
                    var dateInput = element.find('#' + id + '-' + idPostfix);
                    expect(dateInput.length).toEqual(1);
                    dateInput.val(value);
                    dateInput.trigger('change');
                    $scope.$apply();
                }

                function checkError(idPostfix, hasError) {
                    var dateInput = element.find('#' + id + '-' + idPostfix);
                    expect(dateInput.length).toEqual(1);
                    expect(dateInput.hasClass('ng-invalid')).toEqual(hasError);
                }

                it('renders two date pickers', function () {
                    createElement();
                    expect(element.find('.datepicker-container input').length).toEqual(2);
                });

                it('sets unique id and alt text on date pickers', function () {
                    createElement();
                    var startElement = element.find('input[id="1234-start"]');
                    expect(startElement.length).toEqual(1);
                    expect(angular.element(startElement[0]).attr('alt').indexOf('My Date Range Start')).toEqual(0);

                    var endElement = element.find('input[id="1234-end"]');
                    expect(endElement.length).toEqual(1);
                    expect(angular.element(endElement[0]).attr('alt').indexOf('My Date Range End')).toEqual(0);
                });

                it('sets the startDate and endDate on the dateRange object', function () {
                    var startDate = '01/01/2001',
                        endDate = '01/01/2002';
                    createElement();
                    updateDateInput('start', startDate);
                    updateDateInput('end', endDate);
                    expect(dateRange.startDate).toEqual(new Date(startDate));
                    expect(dateRange.endDate).toEqual(new Date(endDate));
                });
                it('marks end date as invalid if later than today', function () {
                    createElement();
                    updateDateInput('end', '01/01/2045');
                    checkError('end', true);
                });

                it('marks end date as invalid if earlier than start date', function () {
                    createElement();
                    updateDateInput('start', '01/01/2001');
                    checkError('start', false);
                    updateDateInput('end', '01/01/2000');
                    checkError('end', true);
                });

                it('marks start date as invalid if later than end date', function () {
                    createElement();
                    updateDateInput('end', '01/01/2002');
                    checkError('end', false);
                    updateDateInput('start', '01/01/2003');
                    checkError('start', true);
                });

                it('updates endMinDate and startMaxDate when dates are emptied out', function () {
                    var startDate = '01/01/2001',
                        endDate = '01/01/2002';
                    createElement();
                    updateDateInput('start', startDate);
                    updateDateInput('end', endDate);

                    var controller = element.controller('spDateRange');

                    expect(controller.endMinDate).toBeDefined();
                    expect(controller.startMaxDate).toBeDefined();

                    updateDateInput('start', '');
                    expect(controller.endMinDate).toBeUndefined();

                    updateDateInput('end', '');
                    expect(controller.startMaxDate).toBeUndefined();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0RhdGVSYW5nZURpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQkFBMEIsNENBQTRDLFVBQVUsU0FBUzs7O0lBR2pJOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7V0FDcEMsVUFBVSxzQ0FBc0M7UUFDbkQsU0FBUyxZQUFZOztZQUg3QixTQUFTLGVBQWUsWUFBTTs7Z0JBRTFCLElBQUksb0JBQWlCO29CQUNqQixZQUFTO29CQUFFLEtBQUU7b0JBQUUsWUFBUztvQkFBRSxVQUFPO29CQUFFLFNBQU07b0JBQUUsV0FBUTs7Z0JBRXZELFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGNBQWMsWUFBWSxtQkFBc0I7b0JBQy9ELFNBQVM7b0JBQ1QsV0FBVzs7b0JBRVgsWUFBWTtvQkFDWixLQUFLO29CQUNMLFlBQVk7O29CQUVaLGtCQUFrQixpQkFBaUI7d0JBQy9CLG1DQUFvQzt3QkFDcEMsaUNBQWtDO3dCQUNsQyw2QkFBOEI7Ozs7Z0JBSXRDLFVBQVUsWUFBVztvQkFDakIsSUFBRyxTQUFTO3dCQUNSLFFBQVE7Ozs7Z0JBSWhCLFNBQVMsZ0JBQWdCO29CQUNyQixPQUFPLFlBQVk7b0JBQ25CLE9BQU8sS0FBSztvQkFDWixPQUFPLFlBQVk7O29CQUVuQixVQUFVLFNBQVMsUUFBUSxRQUFRLG9CQUFvQjtvQkFDdkQsT0FBTzs7O2dCQUdYLFNBQVMsZ0JBQWdCLFdBQVcsT0FBTztvQkFDdkMsSUFBSSxZQUFZLFFBQVEsS0FBSSxNQUFLLEtBQUUsTUFBSTtvQkFDdkMsT0FBTyxVQUFVLFFBQVEsUUFBUTtvQkFDakMsVUFBVSxJQUFJO29CQUNkLFVBQVUsUUFBUTtvQkFDbEIsT0FBTzs7O2dCQUdYLFNBQVMsV0FBVyxXQUFXLFVBQVU7b0JBQ3JDLElBQUksWUFBWSxRQUFRLEtBQUksTUFBSyxLQUFFLE1BQUk7b0JBQ3ZDLE9BQU8sVUFBVSxRQUFRLFFBQVE7b0JBQ2pDLE9BQU8sVUFBVSxTQUFTLGVBQWUsUUFBUTs7O2dCQUdyRCxHQUFHLDRCQUE0QixZQUFNO29CQUNqQztvQkFDQSxPQUFPLFFBQVEsS0FBSywrQkFBK0IsUUFBUSxRQUFROzs7Z0JBR3ZFLEdBQUcsK0NBQStDLFlBQU07b0JBQ3BEO29CQUNBLElBQUksZUFBZSxRQUFRLEtBQUs7b0JBQ2hDLE9BQU8sYUFBYSxRQUFRLFFBQVE7b0JBQ3BDLE9BQU8sUUFBUSxRQUFRLGFBQWEsSUFBSSxLQUFLLE9BQU8sUUFBUSx3QkFBd0IsUUFBUTs7b0JBRTVGLElBQUksYUFBYSxRQUFRLEtBQUs7b0JBQzlCLE9BQU8sV0FBVyxRQUFRLFFBQVE7b0JBQ2xDLE9BQU8sUUFBUSxRQUFRLFdBQVcsSUFBSSxLQUFLLE9BQU8sUUFBUSxzQkFBc0IsUUFBUTs7O2dCQUc1RixHQUFHLDBEQUEwRCxZQUFNO29CQUMvRCxJQUFJLFlBQVk7d0JBQWMsVUFBVTtvQkFDeEM7b0JBQ0EsZ0JBQWdCLFNBQVM7b0JBQ3pCLGdCQUFnQixPQUFPO29CQUN2QixPQUFPLFVBQVUsV0FBVyxRQUFRLElBQUksS0FBSztvQkFDN0MsT0FBTyxVQUFVLFNBQVMsUUFBUSxJQUFJLEtBQUs7O2dCQUcvQyxHQUFHLGlEQUFpRCxZQUFNO29CQUN0RDtvQkFDQSxnQkFBZ0IsT0FBTztvQkFDdkIsV0FBVyxPQUFPOzs7Z0JBR3RCLEdBQUcsd0RBQXdELFlBQU07b0JBQzdEO29CQUNBLGdCQUFnQixTQUFTO29CQUN6QixXQUFXLFNBQVM7b0JBQ3BCLGdCQUFnQixPQUFPO29CQUN2QixXQUFXLE9BQU87OztnQkFHdEIsR0FBRyxzREFBc0QsWUFBTTtvQkFDM0Q7b0JBQ0EsZ0JBQWdCLE9BQU87b0JBQ3ZCLFdBQVcsT0FBTztvQkFDbEIsZ0JBQWdCLFNBQVM7b0JBQ3pCLFdBQVcsU0FBUzs7O2dCQUd4QixHQUFHLGtFQUFrRSxZQUFNO29CQUN2RSxJQUFJLFlBQVk7d0JBQWMsVUFBVTtvQkFDeEM7b0JBQ0EsZ0JBQWdCLFNBQVM7b0JBQ3pCLGdCQUFnQixPQUFPOztvQkFFdkIsSUFBSSxhQUFhLFFBQVEsV0FBVzs7b0JBRXBDLE9BQU8sV0FBVyxZQUFZO29CQUM5QixPQUFPLFdBQVcsY0FBYzs7b0JBRWhDLGdCQUFnQixTQUFTO29CQUN6QixPQUFPLFdBQVcsWUFBWTs7b0JBRTlCLGdCQUFnQixPQUFPO29CQUN2QixPQUFPLFdBQVcsY0FBYzs7Ozs7R0FnQnJDIiwiZmlsZSI6ImNvbW1vbi9mb3JtL0RhdGVSYW5nZURpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGZvcm1Nb2R1bGUgZnJvbSAnY29tbW9uL2Zvcm0vRm9ybU1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XG5cblxuZGVzY3JpYmUoJ3NwRGF0ZVJhbmdlJywgKCkgPT4ge1xuXG4gICAgbGV0IGVsZW1lbnREZWZpbml0aW9uID0gYDxkaXYgc3AtZGF0ZS1yYW5nZT1cImRhdGVSYW5nZVwiIHNwLWlkPVwie3tpZH19XCIgc3AtbGFiZWwtdGV4dD1cInt7bGFiZWxUZXh0fX1cIiAvPmAsXG4gICAgICAgIGRhdGVSYW5nZSwgaWQsIGxhYmVsVGV4dCwgZWxlbWVudCwgJHNjb3BlLCAkY29tcGlsZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZvcm1Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIHNwVHJhbnNsYXRlRmlsdGVyKSA9PiB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuXG4gICAgICAgIGRhdGVSYW5nZSA9IHt9O1xuICAgICAgICBpZCA9ICcxMjM0JztcbiAgICAgICAgbGFiZWxUZXh0ID0gJ015IERhdGUgUmFuZ2UnO1xuXG4gICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmNvbmZpZ3VyZUNhdGFsb2coe1xuICAgICAgICAgICAgJ3VpX2RhdGVfcmFuZ2VfZmlsdGVyX3N0YXJ0X2RhdGUnIDogJ3swfSBTdGFydCcsXG4gICAgICAgICAgICAndWlfZGF0ZV9yYW5nZV9maWx0ZXJfZW5kX2RhdGUnIDogJ3swfSBFbmQnLFxuICAgICAgICAgICAgJ3VpX2RhdGVwaWNrZXJfcGxhY2Vob2xkZXInIDogJ3swfSdcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCkge1xuICAgICAgICAkc2NvcGUuZGF0ZVJhbmdlID0gZGF0ZVJhbmdlO1xuICAgICAgICAkc2NvcGUuaWQgPSBpZDtcbiAgICAgICAgJHNjb3BlLmxhYmVsVGV4dCA9IGxhYmVsVGV4dDtcblxuICAgICAgICBlbGVtZW50ID0gJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKSkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZURhdGVJbnB1dChpZFBvc3RmaXgsIHZhbHVlKSB7XG4gICAgICAgIGxldCBkYXRlSW5wdXQgPSBlbGVtZW50LmZpbmQoYCMke2lkfS0ke2lkUG9zdGZpeH1gKTtcbiAgICAgICAgZXhwZWN0KGRhdGVJbnB1dC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGRhdGVJbnB1dC52YWwodmFsdWUpO1xuICAgICAgICBkYXRlSW5wdXQudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0Vycm9yKGlkUG9zdGZpeCwgaGFzRXJyb3IpIHtcbiAgICAgICAgbGV0IGRhdGVJbnB1dCA9IGVsZW1lbnQuZmluZChgIyR7aWR9LSR7aWRQb3N0Zml4fWApO1xuICAgICAgICBleHBlY3QoZGF0ZUlucHV0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGRhdGVJbnB1dC5oYXNDbGFzcygnbmctaW52YWxpZCcpKS50b0VxdWFsKGhhc0Vycm9yKTtcbiAgICB9XG5cbiAgICBpdCgncmVuZGVycyB0d28gZGF0ZSBwaWNrZXJzJywgKCkgPT4ge1xuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5kYXRlcGlja2VyLWNvbnRhaW5lciBpbnB1dCcpLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZXRzIHVuaXF1ZSBpZCBhbmQgYWx0IHRleHQgb24gZGF0ZSBwaWNrZXJzJywgKCkgPT4ge1xuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGxldCBzdGFydEVsZW1lbnQgPSBlbGVtZW50LmZpbmQoJ2lucHV0W2lkPVwiMTIzNC1zdGFydFwiXScpO1xuICAgICAgICBleHBlY3Qoc3RhcnRFbGVtZW50Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChzdGFydEVsZW1lbnRbMF0pLmF0dHIoJ2FsdCcpLmluZGV4T2YoJ015IERhdGUgUmFuZ2UgU3RhcnQnKSkudG9FcXVhbCgwKTtcblxuICAgICAgICBsZXQgZW5kRWxlbWVudCA9IGVsZW1lbnQuZmluZCgnaW5wdXRbaWQ9XCIxMjM0LWVuZFwiXScpO1xuICAgICAgICBleHBlY3QoZW5kRWxlbWVudC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZW5kRWxlbWVudFswXSkuYXR0cignYWx0JykuaW5kZXhPZignTXkgRGF0ZSBSYW5nZSBFbmQnKSkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZXRzIHRoZSBzdGFydERhdGUgYW5kIGVuZERhdGUgb24gdGhlIGRhdGVSYW5nZSBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGxldCBzdGFydERhdGUgPSAnMDEvMDEvMjAwMScsIGVuZERhdGUgPSAnMDEvMDEvMjAwMic7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgdXBkYXRlRGF0ZUlucHV0KCdzdGFydCcsIHN0YXJ0RGF0ZSk7XG4gICAgICAgIHVwZGF0ZURhdGVJbnB1dCgnZW5kJywgZW5kRGF0ZSk7XG4gICAgICAgIGV4cGVjdChkYXRlUmFuZ2Uuc3RhcnREYXRlKS50b0VxdWFsKG5ldyBEYXRlKHN0YXJ0RGF0ZSkpO1xuICAgICAgICBleHBlY3QoZGF0ZVJhbmdlLmVuZERhdGUpLnRvRXF1YWwobmV3IERhdGUoZW5kRGF0ZSkpO1xuXG4gICAgfSk7XG4gICAgaXQoJ21hcmtzIGVuZCBkYXRlIGFzIGludmFsaWQgaWYgbGF0ZXIgdGhhbiB0b2RheScsICgpID0+IHtcbiAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICB1cGRhdGVEYXRlSW5wdXQoJ2VuZCcsICcwMS8wMS8yMDQ1Jyk7XG4gICAgICAgIGNoZWNrRXJyb3IoJ2VuZCcsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ21hcmtzIGVuZCBkYXRlIGFzIGludmFsaWQgaWYgZWFybGllciB0aGFuIHN0YXJ0IGRhdGUnLCAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgdXBkYXRlRGF0ZUlucHV0KCdzdGFydCcsICcwMS8wMS8yMDAxJyk7XG4gICAgICAgIGNoZWNrRXJyb3IoJ3N0YXJ0JywgZmFsc2UpO1xuICAgICAgICB1cGRhdGVEYXRlSW5wdXQoJ2VuZCcsICcwMS8wMS8yMDAwJyk7XG4gICAgICAgIGNoZWNrRXJyb3IoJ2VuZCcsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ21hcmtzIHN0YXJ0IGRhdGUgYXMgaW52YWxpZCBpZiBsYXRlciB0aGFuIGVuZCBkYXRlJywgKCkgPT4ge1xuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIHVwZGF0ZURhdGVJbnB1dCgnZW5kJywgJzAxLzAxLzIwMDInKTtcbiAgICAgICAgY2hlY2tFcnJvcignZW5kJywgZmFsc2UpO1xuICAgICAgICB1cGRhdGVEYXRlSW5wdXQoJ3N0YXJ0JywgJzAxLzAxLzIwMDMnKTtcbiAgICAgICAgY2hlY2tFcnJvcignc3RhcnQnLCB0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd1cGRhdGVzIGVuZE1pbkRhdGUgYW5kIHN0YXJ0TWF4RGF0ZSB3aGVuIGRhdGVzIGFyZSBlbXB0aWVkIG91dCcsICgpID0+IHtcbiAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9ICcwMS8wMS8yMDAxJywgZW5kRGF0ZSA9ICcwMS8wMS8yMDAyJztcbiAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICB1cGRhdGVEYXRlSW5wdXQoJ3N0YXJ0Jywgc3RhcnREYXRlKTtcbiAgICAgICAgdXBkYXRlRGF0ZUlucHV0KCdlbmQnLCBlbmREYXRlKTtcblxuICAgICAgICBsZXQgY29udHJvbGxlciA9IGVsZW1lbnQuY29udHJvbGxlcignc3BEYXRlUmFuZ2UnKTtcblxuICAgICAgICBleHBlY3QoY29udHJvbGxlci5lbmRNaW5EYXRlKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QoY29udHJvbGxlci5zdGFydE1heERhdGUpLnRvQmVEZWZpbmVkKCk7XG5cbiAgICAgICAgdXBkYXRlRGF0ZUlucHV0KCdzdGFydCcsICcnKTtcbiAgICAgICAgZXhwZWN0KGNvbnRyb2xsZXIuZW5kTWluRGF0ZSkudG9CZVVuZGVmaW5lZCgpO1xuXG4gICAgICAgIHVwZGF0ZURhdGVJbnB1dCgnZW5kJywgJycpO1xuICAgICAgICBleHBlY3QoY29udHJvbGxlci5zdGFydE1heERhdGUpLnRvQmVVbmRlZmluZWQoKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
