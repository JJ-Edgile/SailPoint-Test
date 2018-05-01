System.register(['test/js/TestInitializer', 'common/util/UtilModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('spDateService', function () {
                var spDateService = undefined,
                    $filter = undefined;

                beforeEach(module(utilModule));

                // Add a funky date time format
                beforeEach(module(function ($provide) {
                    $provide.decorator('$locale', function ($delegate) {
                        $delegate['DATETIME_FORMATS']['testDashes'] = 'MM-dd-yy';
                        return $delegate;
                    });
                }));

                beforeEach(inject(function (_spDateService_, _$filter_) {
                    spDateService = _spDateService_;
                    $filter = _$filter_;
                }));

                describe('parseDate', function () {
                    it('throws with missing date string or format string', function () {
                        expect(function () {
                            spDateService.parseDate(null, 'MM-DD-YYYY');
                        }).toThrow();
                        expect(function () {
                            spDateService.parseDate('01-01-2011');
                        }).toThrow();
                    });

                    it('returns null with bad date string format', function () {
                        expect(spDateService.parseDate('01-02-2012', 'MM/DD/YYYY')).not.toBeDefined();
                        expect(spDateService.parseDate('01-02-2012 and some junk', 'MM-DD-YYYY')).not.toBeDefined();
                    });

                    it('returns Date object with matching date string to format', function () {
                        expect(spDateService.parseDate('01-02-12', 'testDashes')).toEqual(new Date('Jan 02, 2012'));
                        expect(spDateService.parseDate('7/2014/19', 'M/yyyy/d')).toEqual(new Date('Jul 19, 2014'));
                    });
                });

                /*
                 * This doesn't test well since it uses Date functions that depend on the
                 * local timezone, which can't really be mocked out easily.  We'll just do
                 * some very basic tests on this method - it is pretty simple anyway.
                 */
                describe('setDateComponents', function () {
                    it('returns null for a null date param', function () {
                        var date = spDateService.setDateComponents(null, 0, 0, 0, 0);
                        expect(date).toBeNull();
                    });

                    it('changes hours, minutes, seconds, and milliseconds', function () {
                        // Ignore checking anything bigger than hours since timezones could
                        // affect the day/month/etc...  Also, minutes can shift in timezones
                        // so ignore these.
                        var date = spDateService.setDateComponents(new Date(), 0, 0, 0, 0);
                        expect(date.getHours()).toEqual(0);
                        expect(date.getSeconds()).toEqual(0);
                        expect(date.getMilliseconds()).toEqual(0);
                    });
                });

                describe('getDueDateText', function () {
                    var start = undefined;

                    function testDueDateMessage(dueDate, expected, maxDaysUntilDue) {
                        expect(spDateService.getDueDateText(dueDate, maxDaysUntilDue)).toEqual(expected);
                    }

                    beforeEach(inject(function (spTranslateFilter) {
                        start = new Date(2001, 1, 1);
                        start.setHours(0);

                        // Mock today to be our start date
                        spyOn(spDateService, 'getToday').and.returnValue(start);

                        // Setup some messages to test with.
                        spTranslateFilter.configureCatalog({
                            'ui_cert_widget_due_today': 'Due Today',
                            'ui_cert_widget_due_tomorrow': 'Due Tomorrow',
                            'ui_cert_widget_due_in_days': 'Due in {0} Days',
                            'ui_cert_widget_due_default': 'Due on {0}',
                            'ui_cert_widget_overdue': 'Overdue by {0} Days'
                        });
                    }));

                    it('should return correct message key when due today', function () {
                        var date = new Date(start);

                        date.setHours(start.getHours() + 6);

                        testDueDateMessage(date, 'Due Today');
                    });

                    it('should return correct message key when due tomorrow', function () {
                        var date = new Date(start);

                        date.setHours(start.getHours() + 30);

                        testDueDateMessage(date, 'Due Tomorrow');
                    });

                    it('should return correct message key when due within the week', function () {
                        var date = new Date(start);

                        date.setHours(start.getHours() + 102);

                        testDueDateMessage(date, 'Due in 4 Days');
                    });

                    it('should return correct message key when due after a week', function () {
                        var date = new Date(start);

                        date.setDate(start.getDate() + 15);

                        testDueDateMessage(date, 'Due on ' + $filter('date')(date, 'shortDate'));
                    });

                    it('should return correct message key when due after a week with extended days msg', function () {
                        var date = new Date(start);

                        date.setDate(start.getDate() + 15);

                        testDueDateMessage(date, 'Due in 15 Days', 15);
                    });

                    it('should return correct message key when overdue', function () {
                        var date = new Date(start);

                        date.setHours(start.getHours() - 12);

                        testDueDateMessage(date, 'Overdue by 1 Days');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL1NwRGF0ZVNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMEJBQTBCLDRDQUE0QyxVQUFVLFNBQVM7SUFBckk7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjtXQUNwQyxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBRjdCLFNBQVMsaUJBQWlCLFlBQVc7Z0JBQ2pDLElBQUksZ0JBQWE7b0JBQUUsVUFBTzs7Z0JBRTFCLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFVBQVUsV0FBVyxVQUFTLFdBQVc7d0JBQzlDLFVBQVUsb0JBQW9CLGdCQUFnQjt3QkFDOUMsT0FBTzs7OztnQkFJZixXQUFXLE9BQU8sVUFBUyxpQkFBaUIsV0FBVztvQkFDbkQsZ0JBQWdCO29CQUNoQixVQUFVOzs7Z0JBR2QsU0FBUyxhQUFhLFlBQVc7b0JBQzdCLEdBQUcsb0RBQW9ELFlBQVc7d0JBQzlELE9BQU8sWUFBVzs0QkFBRSxjQUFjLFVBQVUsTUFBTTsyQkFBa0I7d0JBQ3BFLE9BQU8sWUFBVzs0QkFBRSxjQUFjLFVBQVU7MkJBQWtCOzs7b0JBR2xFLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELE9BQU8sY0FBYyxVQUFVLGNBQWMsZUFBZSxJQUFJO3dCQUNoRSxPQUFPLGNBQWMsVUFBVSw0QkFBNEIsZUFBZSxJQUFJOzs7b0JBR2xGLEdBQUcsMkRBQTJELFlBQVc7d0JBQ3JFLE9BQU8sY0FBYyxVQUFVLFlBQVksZUFBZSxRQUFRLElBQUksS0FBSzt3QkFDM0UsT0FBTyxjQUFjLFVBQVUsYUFBYSxhQUFhLFFBQVEsSUFBSSxLQUFLOzs7Ozs7Ozs7Z0JBU2xGLFNBQVMscUJBQXFCLFlBQVc7b0JBQ3JDLEdBQUcsc0NBQXNDLFlBQVc7d0JBQ2hELElBQUksT0FBTyxjQUFjLGtCQUFrQixNQUFNLEdBQUcsR0FBRyxHQUFHO3dCQUMxRCxPQUFPLE1BQU07OztvQkFHakIsR0FBRyxxREFBcUQsWUFBVzs7Ozt3QkFJL0QsSUFBSSxPQUFPLGNBQWMsa0JBQWtCLElBQUksUUFBUSxHQUFHLEdBQUcsR0FBRzt3QkFDaEUsT0FBTyxLQUFLLFlBQVksUUFBUTt3QkFDaEMsT0FBTyxLQUFLLGNBQWMsUUFBUTt3QkFDbEMsT0FBTyxLQUFLLG1CQUFtQixRQUFROzs7O2dCQUsvQyxTQUFTLGtCQUFrQixZQUFXO29CQUNsQyxJQUFJLFFBQUs7O29CQUVULFNBQVMsbUJBQW1CLFNBQVMsVUFBVSxpQkFBaUI7d0JBQzVELE9BQU8sY0FBYyxlQUFlLFNBQVMsa0JBQWtCLFFBQVE7OztvQkFHM0UsV0FBVyxPQUFPLFVBQVMsbUJBQW1CO3dCQUMxQyxRQUFRLElBQUksS0FBSyxNQUFNLEdBQUc7d0JBQzFCLE1BQU0sU0FBUzs7O3dCQUdmLE1BQU0sZUFBZSxZQUFZLElBQUksWUFBWTs7O3dCQUdqRCxrQkFBa0IsaUJBQWlCOzRCQUMvQiw0QkFBNEI7NEJBQzVCLCtCQUErQjs0QkFDL0IsOEJBQThCOzRCQUM5Qiw4QkFBOEI7NEJBQzlCLDBCQUEwQjs7OztvQkFJbEMsR0FBRyxvREFBb0QsWUFBVzt3QkFDOUQsSUFBSSxPQUFPLElBQUksS0FBSzs7d0JBRXBCLEtBQUssU0FBUyxNQUFNLGFBQWE7O3dCQUVqQyxtQkFBbUIsTUFBTTs7O29CQUc3QixHQUFHLHVEQUF1RCxZQUFXO3dCQUNqRSxJQUFJLE9BQU8sSUFBSSxLQUFLOzt3QkFFcEIsS0FBSyxTQUFTLE1BQU0sYUFBYTs7d0JBRWpDLG1CQUFtQixNQUFNOzs7b0JBRzdCLEdBQUcsOERBQThELFlBQVc7d0JBQ3hFLElBQUksT0FBTyxJQUFJLEtBQUs7O3dCQUVwQixLQUFLLFNBQVMsTUFBTSxhQUFhOzt3QkFFakMsbUJBQW1CLE1BQU07OztvQkFHN0IsR0FBRywyREFBMkQsWUFBVzt3QkFDckUsSUFBSSxPQUFPLElBQUksS0FBSzs7d0JBRXBCLEtBQUssUUFBUSxNQUFNLFlBQVk7O3dCQUUvQixtQkFBbUIsTUFBTSxZQUFZLFFBQVEsUUFBUSxNQUFNOzs7b0JBRy9ELEdBQUcsa0ZBQWtGLFlBQVc7d0JBQzVGLElBQUksT0FBTyxJQUFJLEtBQUs7O3dCQUVwQixLQUFLLFFBQVEsTUFBTSxZQUFZOzt3QkFFL0IsbUJBQW1CLE1BQU0sa0JBQWtCOzs7b0JBRy9DLEdBQUcsa0RBQWtELFlBQVc7d0JBQzVELElBQUksT0FBTyxJQUFJLEtBQUs7O3dCQUVwQixLQUFLLFNBQVMsTUFBTSxhQUFhOzt3QkFFakMsbUJBQW1CLE1BQU07Ozs7OztHQWNsQyIsImZpbGUiOiJjb21tb24vdXRpbC9TcERhdGVTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHV0aWxNb2R1bGUgZnJvbSAnY29tbW9uL3V0aWwvVXRpbE1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XG5cbmRlc2NyaWJlKCdzcERhdGVTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IHNwRGF0ZVNlcnZpY2UsICRmaWx0ZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh1dGlsTW9kdWxlKSk7XG5cbiAgICAvLyBBZGQgYSBmdW5reSBkYXRlIHRpbWUgZm9ybWF0XG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuZGVjb3JhdG9yKCckbG9jYWxlJywgZnVuY3Rpb24oJGRlbGVnYXRlKSB7XG4gICAgICAgICAgICAkZGVsZWdhdGVbJ0RBVEVUSU1FX0ZPUk1BVFMnXVsndGVzdERhc2hlcyddID0gJ01NLWRkLXl5JztcbiAgICAgICAgICAgIHJldHVybiAkZGVsZWdhdGU7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9zcERhdGVTZXJ2aWNlXywgXyRmaWx0ZXJfKSB7XG4gICAgICAgIHNwRGF0ZVNlcnZpY2UgPSBfc3BEYXRlU2VydmljZV87XG4gICAgICAgICRmaWx0ZXIgPSBfJGZpbHRlcl87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ3BhcnNlRGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgndGhyb3dzIHdpdGggbWlzc2luZyBkYXRlIHN0cmluZyBvciBmb3JtYXQgc3RyaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IHNwRGF0ZVNlcnZpY2UucGFyc2VEYXRlKG51bGwsICdNTS1ERC1ZWVlZJyk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgc3BEYXRlU2VydmljZS5wYXJzZURhdGUoJzAxLTAxLTIwMTEnKTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBudWxsIHdpdGggYmFkIGRhdGUgc3RyaW5nIGZvcm1hdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHNwRGF0ZVNlcnZpY2UucGFyc2VEYXRlKCcwMS0wMi0yMDEyJywgJ01NL0REL1lZWVknKSkubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BEYXRlU2VydmljZS5wYXJzZURhdGUoJzAxLTAyLTIwMTIgYW5kIHNvbWUganVuaycsICdNTS1ERC1ZWVlZJykpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBEYXRlIG9iamVjdCB3aXRoIG1hdGNoaW5nIGRhdGUgc3RyaW5nIHRvIGZvcm1hdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHNwRGF0ZVNlcnZpY2UucGFyc2VEYXRlKCcwMS0wMi0xMicsICd0ZXN0RGFzaGVzJykpLnRvRXF1YWwobmV3IERhdGUoJ0phbiAwMiwgMjAxMicpKTtcbiAgICAgICAgICAgIGV4cGVjdChzcERhdGVTZXJ2aWNlLnBhcnNlRGF0ZSgnNy8yMDE0LzE5JywgJ00veXl5eS9kJykpLnRvRXF1YWwobmV3IERhdGUoJ0p1bCAxOSwgMjAxNCcpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICAqIFRoaXMgZG9lc24ndCB0ZXN0IHdlbGwgc2luY2UgaXQgdXNlcyBEYXRlIGZ1bmN0aW9ucyB0aGF0IGRlcGVuZCBvbiB0aGVcbiAgICAgKiBsb2NhbCB0aW1lem9uZSwgd2hpY2ggY2FuJ3QgcmVhbGx5IGJlIG1vY2tlZCBvdXQgZWFzaWx5LiAgV2UnbGwganVzdCBkb1xuICAgICAqIHNvbWUgdmVyeSBiYXNpYyB0ZXN0cyBvbiB0aGlzIG1ldGhvZCAtIGl0IGlzIHByZXR0eSBzaW1wbGUgYW55d2F5LlxuICAgICAqL1xuICAgIGRlc2NyaWJlKCdzZXREYXRlQ29tcG9uZW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmV0dXJucyBudWxsIGZvciBhIG51bGwgZGF0ZSBwYXJhbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGUgPSBzcERhdGVTZXJ2aWNlLnNldERhdGVDb21wb25lbnRzKG51bGwsIDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgZXhwZWN0KGRhdGUpLnRvQmVOdWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjaGFuZ2VzIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBhbmQgbWlsbGlzZWNvbmRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgY2hlY2tpbmcgYW55dGhpbmcgYmlnZ2VyIHRoYW4gaG91cnMgc2luY2UgdGltZXpvbmVzIGNvdWxkXG4gICAgICAgICAgICAvLyBhZmZlY3QgdGhlIGRheS9tb250aC9ldGMuLi4gIEFsc28sIG1pbnV0ZXMgY2FuIHNoaWZ0IGluIHRpbWV6b25lc1xuICAgICAgICAgICAgLy8gc28gaWdub3JlIHRoZXNlLlxuICAgICAgICAgICAgbGV0IGRhdGUgPSBzcERhdGVTZXJ2aWNlLnNldERhdGVDb21wb25lbnRzKG5ldyBEYXRlKCksIDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgZXhwZWN0KGRhdGUuZ2V0SG91cnMoKSkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgIGV4cGVjdChkYXRlLmdldFNlY29uZHMoKSkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgIGV4cGVjdChkYXRlLmdldE1pbGxpc2Vjb25kcygpKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgZGVzY3JpYmUoJ2dldER1ZURhdGVUZXh0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBzdGFydDtcblxuICAgICAgICBmdW5jdGlvbiB0ZXN0RHVlRGF0ZU1lc3NhZ2UoZHVlRGF0ZSwgZXhwZWN0ZWQsIG1heERheXNVbnRpbER1ZSkge1xuICAgICAgICAgICAgZXhwZWN0KHNwRGF0ZVNlcnZpY2UuZ2V0RHVlRGF0ZVRleHQoZHVlRGF0ZSwgbWF4RGF5c1VudGlsRHVlKSkudG9FcXVhbChleHBlY3RlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihzcFRyYW5zbGF0ZUZpbHRlcikge1xuICAgICAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZSgyMDAxLCAxLCAxKTtcbiAgICAgICAgICAgIHN0YXJ0LnNldEhvdXJzKDApO1xuXG4gICAgICAgICAgICAvLyBNb2NrIHRvZGF5IHRvIGJlIG91ciBzdGFydCBkYXRlXG4gICAgICAgICAgICBzcHlPbihzcERhdGVTZXJ2aWNlLCAnZ2V0VG9kYXknKS5hbmQucmV0dXJuVmFsdWUoc3RhcnQpO1xuXG4gICAgICAgICAgICAvLyBTZXR1cCBzb21lIG1lc3NhZ2VzIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmNvbmZpZ3VyZUNhdGFsb2coe1xuICAgICAgICAgICAgICAgICd1aV9jZXJ0X3dpZGdldF9kdWVfdG9kYXknOiAnRHVlIFRvZGF5JyxcbiAgICAgICAgICAgICAgICAndWlfY2VydF93aWRnZXRfZHVlX3RvbW9ycm93JzogJ0R1ZSBUb21vcnJvdycsXG4gICAgICAgICAgICAgICAgJ3VpX2NlcnRfd2lkZ2V0X2R1ZV9pbl9kYXlzJzogJ0R1ZSBpbiB7MH0gRGF5cycsXG4gICAgICAgICAgICAgICAgJ3VpX2NlcnRfd2lkZ2V0X2R1ZV9kZWZhdWx0JzogJ0R1ZSBvbiB7MH0nLFxuICAgICAgICAgICAgICAgICd1aV9jZXJ0X3dpZGdldF9vdmVyZHVlJzogJ092ZXJkdWUgYnkgezB9IERheXMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvcnJlY3QgbWVzc2FnZSBrZXkgd2hlbiBkdWUgdG9kYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoc3RhcnQpO1xuXG4gICAgICAgICAgICBkYXRlLnNldEhvdXJzKHN0YXJ0LmdldEhvdXJzKCkgKyA2KTtcblxuICAgICAgICAgICAgdGVzdER1ZURhdGVNZXNzYWdlKGRhdGUsICdEdWUgVG9kYXknKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29ycmVjdCBtZXNzYWdlIGtleSB3aGVuIGR1ZSB0b21vcnJvdycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShzdGFydCk7XG5cbiAgICAgICAgICAgIGRhdGUuc2V0SG91cnMoc3RhcnQuZ2V0SG91cnMoKSArIDMwKTtcblxuICAgICAgICAgICAgdGVzdER1ZURhdGVNZXNzYWdlKGRhdGUsICdEdWUgVG9tb3Jyb3cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29ycmVjdCBtZXNzYWdlIGtleSB3aGVuIGR1ZSB3aXRoaW4gdGhlIHdlZWsnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoc3RhcnQpO1xuXG4gICAgICAgICAgICBkYXRlLnNldEhvdXJzKHN0YXJ0LmdldEhvdXJzKCkgKyAxMDIpO1xuXG4gICAgICAgICAgICB0ZXN0RHVlRGF0ZU1lc3NhZ2UoZGF0ZSwgJ0R1ZSBpbiA0IERheXMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29ycmVjdCBtZXNzYWdlIGtleSB3aGVuIGR1ZSBhZnRlciBhIHdlZWsnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoc3RhcnQpO1xuXG4gICAgICAgICAgICBkYXRlLnNldERhdGUoc3RhcnQuZ2V0RGF0ZSgpICsgMTUpO1xuXG4gICAgICAgICAgICB0ZXN0RHVlRGF0ZU1lc3NhZ2UoZGF0ZSwgJ0R1ZSBvbiAnICsgJGZpbHRlcignZGF0ZScpKGRhdGUsICdzaG9ydERhdGUnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvcnJlY3QgbWVzc2FnZSBrZXkgd2hlbiBkdWUgYWZ0ZXIgYSB3ZWVrIHdpdGggZXh0ZW5kZWQgZGF5cyBtc2cnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoc3RhcnQpO1xuXG4gICAgICAgICAgICBkYXRlLnNldERhdGUoc3RhcnQuZ2V0RGF0ZSgpICsgMTUpO1xuXG4gICAgICAgICAgICB0ZXN0RHVlRGF0ZU1lc3NhZ2UoZGF0ZSwgJ0R1ZSBpbiAxNSBEYXlzJywgMTUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBjb3JyZWN0IG1lc3NhZ2Uga2V5IHdoZW4gb3ZlcmR1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShzdGFydCk7XG5cbiAgICAgICAgICAgIGRhdGUuc2V0SG91cnMoc3RhcnQuZ2V0SG91cnMoKSAtIDEyKTtcblxuICAgICAgICAgICAgdGVzdER1ZURhdGVNZXNzYWdlKGRhdGUsICdPdmVyZHVlIGJ5IDEgRGF5cycpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
