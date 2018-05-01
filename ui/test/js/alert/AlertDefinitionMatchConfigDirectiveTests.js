System.register(['test/js/TestInitializer', 'alert/AlertModule'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var alertModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_alertAlertModule) {
            alertModule = _alertAlertModule['default'];
        }],
        execute: function () {

            describe('AlertDefinitionMatchConfigDirective', function () {

                var $compile = undefined,
                    $scope = undefined,
                    element = undefined,
                    AlertMatchConfig = undefined,
                    matchConfig = undefined;

                beforeEach(module(alertModule));

                beforeEach(inject(function (_$compile_, _$rootScope_, _AlertMatchConfig_) {
                    $compile = _$compile_;
                    $scope = _$rootScope_;
                    AlertMatchConfig = _AlertMatchConfig_;
                    matchConfig = new AlertMatchConfig({
                        rule: {
                            name: 'MatchRule',
                            displayName: 'MatchRule',
                            id: '1'
                        },
                        matchExpression: {
                            and: true,
                            matchTerms: [{
                                source: 'Source1',
                                name: 'Name1',
                                value: 'Value1'
                            }, {
                                source: 'Source2',
                                name: 'Name2',
                                value: 'Value2'
                            }]
                        }
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile(matchConfig) {
                    var eltDef = '<sp-alert-definition-match-config\n                sp-alert-match-config="matchConfig"></sp-alert-definition-match-config/>';

                    if (matchConfig) {
                        $scope.matchConfig = matchConfig;
                    }

                    element = angular.element(eltDef);
                    $compile(element)($scope);
                    $scope.$digest();
                }

                it('throws if no sp-alert-match-config defined', function () {
                    expect(function () {
                        return compile();
                    }).toThrow();
                });

                it('shows no match terms if none configured', function () {
                    var copyConfig = angular.copy(matchConfig, copyConfig);
                    copyConfig.matchExpression = undefined;
                    compile(copyConfig);
                    var msg = element.find('#noTerms');
                    expect(msg.length).toEqual(1);
                    expect(msg.text().trim()).toEqual('ui_alert_def_match_terms_empty');
                });

                it('shows complex message if complex terms found', function () {
                    var copyConfig = angular.copy(matchConfig, copyConfig);
                    copyConfig.matchExpression.matchTerms[0] = {
                        source: 'Source1',
                        name: 'Name1',
                        value: 'Value1',
                        and: true,
                        children: [{
                            name: 'Child1',
                            value: 'ValueChild'
                        }]
                    };

                    compile(copyConfig);
                    var msg = element.find('#complexExpression');
                    expect(msg.length).toEqual(1);
                    expect(msg.text().trim()).toEqual('ui_alert_def_match_terms_complex');
                    msg = element.find('#noTerms');
                    expect(msg.length).toEqual(0);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0RGVmaW5pdGlvbk1hdGNoQ29uZmlnRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNCQUFzQixVQUFVLFNBQVM7Ozs7O0lBS2pGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQkFBbUI7WUFDekUsY0FBYyxrQkFBa0I7O1FBRXBDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx1Q0FBdUMsWUFBTTs7Z0JBRWxELElBQUksV0FBUTtvQkFBRSxTQUFNO29CQUFFLFVBQU87b0JBQUUsbUJBQWdCO29CQUFFLGNBQVc7O2dCQUU1RCxXQUFXLE9BQU87O2dCQUdsQixXQUFXLE9BQU8sVUFBQyxZQUFZLGNBQWEsb0JBQXVCO29CQUMvRCxXQUFXO29CQUNYLFNBQVM7b0JBQ1QsbUJBQW1CO29CQUNuQixjQUFjLElBQUksaUJBQWlCO3dCQUMvQixNQUFNOzRCQUNGLE1BQU07NEJBQ04sYUFBYTs0QkFDYixJQUFJOzt3QkFFUixpQkFBaUI7NEJBQ2IsS0FBSzs0QkFDTCxZQUFZLENBQ1I7Z0NBQ0ksUUFBUTtnQ0FDUixNQUFNO2dDQUNOLE9BQU87K0JBRVg7Z0NBQ0ksUUFBUTtnQ0FDUixNQUFNO2dDQUNOLE9BQU87Ozs7OztnQkFPM0IsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLFFBQVEsYUFBYTtvQkFDMUIsSUFBSSxTQUFNOztvQkFJVixJQUFJLGFBQWE7d0JBQ2IsT0FBTyxjQUFjOzs7b0JBR3pCLFVBQVUsUUFBUSxRQUFRO29CQUMxQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87OztnQkFHWCxHQUFHLDhDQUE4QyxZQUFNO29CQUNuRCxPQUFPLFlBQUE7d0JBTVMsT0FOSDt1QkFBVzs7O2dCQUc1QixHQUFHLDJDQUEyQyxZQUFNO29CQUNoRCxJQUFJLGFBQWEsUUFBUSxLQUFLLGFBQWE7b0JBQzNDLFdBQVcsa0JBQWtCO29CQUM3QixRQUFRO29CQUNSLElBQUksTUFBTSxRQUFRLEtBQUs7b0JBQ3ZCLE9BQU8sSUFBSSxRQUFRLFFBQVE7b0JBQzNCLE9BQU8sSUFBSSxPQUFPLFFBQVEsUUFBUTs7O2dCQUd0QyxHQUFHLGdEQUFnRCxZQUFNO29CQUNyRCxJQUFJLGFBQWEsUUFBUSxLQUFLLGFBQWE7b0JBQzNDLFdBQVcsZ0JBQWdCLFdBQVcsS0FBSzt3QkFDdkMsUUFBUTt3QkFDUixNQUFNO3dCQUNOLE9BQU87d0JBQ1AsS0FBSzt3QkFDTCxVQUFVLENBQ047NEJBQ0ksTUFBTTs0QkFDTixPQUFPOzs7O29CQUtuQixRQUFRO29CQUNSLElBQUksTUFBTSxRQUFRLEtBQUs7b0JBQ3ZCLE9BQU8sSUFBSSxRQUFRLFFBQVE7b0JBQzNCLE9BQU8sSUFBSSxPQUFPLFFBQVEsUUFBUTtvQkFDbEMsTUFBTSxRQUFRLEtBQUs7b0JBQ25CLE9BQU8sSUFBSSxRQUFRLFFBQVE7Ozs7O0dBVWhDIiwiZmlsZSI6ImFsZXJ0L0FsZXJ0RGVmaW5pdGlvbk1hdGNoQ29uZmlnRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIChjKSBDb3B5cmlnaHQgMjAwOCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFsZXJ0TW9kdWxlIGZyb20gJ2FsZXJ0L0FsZXJ0TW9kdWxlJztcblxuZGVzY3JpYmUoJ0FsZXJ0RGVmaW5pdGlvbk1hdGNoQ29uZmlnRGlyZWN0aXZlJywgKCkgPT4ge1xuXG4gICAgbGV0ICRjb21waWxlLCAkc2NvcGUsIGVsZW1lbnQsIEFsZXJ0TWF0Y2hDb25maWcsIG1hdGNoQ29uZmlnO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWxlcnRNb2R1bGUpKTtcblxuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sIF8kcm9vdFNjb3BlXyxfQWxlcnRNYXRjaENvbmZpZ18pID0+IHtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIEFsZXJ0TWF0Y2hDb25maWcgPSBfQWxlcnRNYXRjaENvbmZpZ187XG4gICAgICAgIG1hdGNoQ29uZmlnID0gbmV3IEFsZXJ0TWF0Y2hDb25maWcoe1xuICAgICAgICAgICAgcnVsZToge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdNYXRjaFJ1bGUnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnTWF0Y2hSdWxlJyxcbiAgICAgICAgICAgICAgICBpZDogJzEnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWF0Y2hFeHByZXNzaW9uOiB7XG4gICAgICAgICAgICAgICAgYW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1hdGNoVGVybXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiAnU291cmNlMScsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnTmFtZTEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdWYWx1ZTEnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogJ1NvdXJjZTInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ05hbWUyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnVmFsdWUyJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY29tcGlsZShtYXRjaENvbmZpZykge1xuICAgICAgICBsZXQgZWx0RGVmID1cbiAgICAgICAgICAgIGA8c3AtYWxlcnQtZGVmaW5pdGlvbi1tYXRjaC1jb25maWdcbiAgICAgICAgICAgICAgICBzcC1hbGVydC1tYXRjaC1jb25maWc9XCJtYXRjaENvbmZpZ1wiPjwvc3AtYWxlcnQtZGVmaW5pdGlvbi1tYXRjaC1jb25maWcvPmA7XG5cbiAgICAgICAgaWYgKG1hdGNoQ29uZmlnKSB7XG4gICAgICAgICAgICAkc2NvcGUubWF0Y2hDb25maWcgPSBtYXRjaENvbmZpZztcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWx0RGVmKTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICB9XG5cbiAgICBpdCgndGhyb3dzIGlmIG5vIHNwLWFsZXJ0LW1hdGNoLWNvbmZpZyBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY29tcGlsZSgpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvd3Mgbm8gbWF0Y2ggdGVybXMgaWYgbm9uZSBjb25maWd1cmVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgY29weUNvbmZpZyA9IGFuZ3VsYXIuY29weShtYXRjaENvbmZpZywgY29weUNvbmZpZyk7XG4gICAgICAgIGNvcHlDb25maWcubWF0Y2hFeHByZXNzaW9uID0gdW5kZWZpbmVkO1xuICAgICAgICBjb21waWxlKGNvcHlDb25maWcpO1xuICAgICAgICBsZXQgbXNnID0gZWxlbWVudC5maW5kKCcjbm9UZXJtcycpO1xuICAgICAgICBleHBlY3QobXNnLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KG1zZy50ZXh0KCkudHJpbSgpKS50b0VxdWFsKCd1aV9hbGVydF9kZWZfbWF0Y2hfdGVybXNfZW1wdHknKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG93cyBjb21wbGV4IG1lc3NhZ2UgaWYgY29tcGxleCB0ZXJtcyBmb3VuZCcsICgpID0+IHtcbiAgICAgICAgbGV0IGNvcHlDb25maWcgPSBhbmd1bGFyLmNvcHkobWF0Y2hDb25maWcsIGNvcHlDb25maWcpO1xuICAgICAgICBjb3B5Q29uZmlnLm1hdGNoRXhwcmVzc2lvbi5tYXRjaFRlcm1zWzBdID0ge1xuICAgICAgICAgICAgc291cmNlOiAnU291cmNlMScsXG4gICAgICAgICAgICBuYW1lOiAnTmFtZTEnLFxuICAgICAgICAgICAgdmFsdWU6ICdWYWx1ZTEnLFxuICAgICAgICAgICAgYW5kOiB0cnVlLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdDaGlsZDEnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1ZhbHVlQ2hpbGQnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbXBpbGUoY29weUNvbmZpZyk7XG4gICAgICAgIGxldCBtc2cgPSBlbGVtZW50LmZpbmQoJyNjb21wbGV4RXhwcmVzc2lvbicpO1xuICAgICAgICBleHBlY3QobXNnLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KG1zZy50ZXh0KCkudHJpbSgpKS50b0VxdWFsKCd1aV9hbGVydF9kZWZfbWF0Y2hfdGVybXNfY29tcGxleCcpO1xuICAgICAgICBtc2cgPSBlbGVtZW50LmZpbmQoJyNub1Rlcm1zJyk7XG4gICAgICAgIGV4cGVjdChtc2cubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
