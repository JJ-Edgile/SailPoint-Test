System.register(['test/js/TestInitializer', 'common/widget/WidgetModule', 'common/model/ModelModule'], function (_export) {
    'use strict';

    var widgetModule, modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonWidgetWidgetModule) {
            widgetModule = _commonWidgetWidgetModule['default'];
        }, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {

            describe('IdentityAttributesDirective', function () {
                var elDef = '<sp-identity-attributes sp-identity="identity" />',
                    linkElDef = '<sp-identity-attributes sp-identity="identity" sp-navigate-to-identity-func="navFunc(identitySummary)" />',
                    listElDef = '<sp-identity-attributes sp-identity="identity" sp-show-list="showList" />',
                    element = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    attrs = undefined,
                    navigateFunc = undefined;

                beforeEach(module(widgetModule, modelModule));

                beforeEach(inject(function ($rootScope, _$compile_, IdentityAttributes) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();

                    attrs = new IdentityAttributes({
                        attributes: [{
                            attributeName: 'attr1',
                            label: 'Label 1',
                            value: 'value1'
                        }, {
                            attributeName: 'noValueAttr',
                            label: 'Label 2',
                            value: null
                        }, {
                            attributeName: 'arrayAttr',
                            label: 'Label 3',
                            value: ['val1', 'val2']
                        }, {
                            attributeName: 'identityAttr',
                            label: 'Label 4',
                            value: {
                                id: '123',
                                name: 'authorizedIdentity',
                                displayName: 'Authorized Identity'
                            },
                            authorizedToView: true
                        }, {
                            attributeName: 'unauthzIdentityAttr',
                            label: 'Label 5',
                            value: {
                                id: '911',
                                name: 'unauthorizedIdentity',
                                displayName: 'Unauthorized Identity'
                            },
                            authorizedToView: false
                        }]
                    });

                    navigateFunc = jasmine.createSpy('navigateFunc');
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile(withIdentity, withLink, withList) {
                    var def = withList !== undefined ? listElDef : withLink ? linkElDef : elDef;

                    if (withIdentity) {
                        $scope.identity = attrs;
                    }
                    if (withLink) {
                        $scope.navFunc = navigateFunc;
                    }
                    if (withList !== undefined) {
                        $scope.showList = withList;
                    }

                    element = angular.element(def);
                    $compile(element)($scope);
                    $scope.$digest();
                }

                function hasLoadingMask() {
                    return element.find('.loading-mask').length > 0;
                }

                it('shows loading mask until the identity is loaded', function () {
                    compile(false, true);

                    expect(hasLoadingMask()).toEqual(true);

                    $scope.identity = attrs;
                    $scope.$digest();

                    expect(hasLoadingMask()).toEqual(false);
                });

                function findAttributeRowByLabel(label) {
                    var labelEls = element.find('.label-column:contains(\'' + label + '\')');
                    var rows = labelEls.parent();
                    return rows.length > 0 ? angular.element(rows[0]) : null;
                }

                it('hides attributes with no value', function () {
                    compile(true, false);
                    var attr = findAttributeRowByLabel(attrs.attributes[1].label);
                    expect(attr).toBeNull();
                });

                it('renders the label', function () {
                    compile(true, false);
                    var attr = findAttributeRowByLabel(attrs.attributes[0].label);
                    expect(attr).not.toBeNull();
                });

                describe('link', function () {
                    function hasLink(rowElt) {
                        expect(rowElt).not.toBeNull();
                        var link = rowElt.find('a');
                        return link.length > 0;
                    }

                    it('is not rendered if no navigation function is provided', function () {
                        compile(true, false);
                        var attr = findAttributeRowByLabel(attrs.attributes[3].label);
                        expect(hasLink(attr)).toEqual(false);
                    });

                    it('is not rendered if the user is not authorized', function () {
                        compile(true, true);
                        var attr = findAttributeRowByLabel(attrs.attributes[4].label);
                        expect(hasLink(attr)).toEqual(false);
                    });

                    it('is rendered for identity references', function () {
                        compile(true, true);
                        var attr = findAttributeRowByLabel(attrs.attributes[3].label);
                        expect(hasLink(attr)).toEqual(true);
                    });

                    it('calls the navigation function when clicked', function () {
                        compile(true, true);
                        var attr = findAttributeRowByLabel(attrs.attributes[3].label);
                        var link = attr.find('a');
                        link.click();
                        expect(navigateFunc).toHaveBeenCalledWith(attrs.attributes[3].value);
                    });
                });

                describe('value', function () {
                    function getValue(rowElt) {
                        expect(rowElt).not.toBeNull();
                        return rowElt.find('span').text().trim();
                    }

                    it('is rendered normally for a string', function () {
                        compile(true, false);
                        var attr = findAttributeRowByLabel(attrs.attributes[0].label);
                        expect(getValue(attr)).toEqual(attrs.attributes[0].value);
                    });

                    it('is rendered as an identity display name for an identity', function () {
                        compile(true, false);
                        var attr = findAttributeRowByLabel(attrs.attributes[3].label);
                        expect(getValue(attr)).toEqual(attrs.attributes[3].value.displayName);
                    });

                    it('is rendered as a comma-separated string for an array', function () {
                        compile(true, false);
                        var attr = findAttributeRowByLabel(attrs.attributes[2].label);
                        expect(getValue(attr)).toEqual('val1, val2');
                    });
                });

                describe('showList', function () {
                    it('should render a list and not a table when showList is truthy', function () {
                        compile(true, false, true);
                        var list = element.find('ul#identity-attributes-data-list'),
                            table = element.find('table#identity-attributes-data-table-container');
                        expect(table.length).toBe(0);
                        expect(list.length).toBe(1);
                    });

                    it('should render a table and not a list when showList is falsey', function () {
                        compile(true, false, false);
                        var list = element.find('ul#identity-attributes-data-list'),
                            table = element.find('table#identity-attributes-data-table-container');
                        expect(table.length).toBe(1);
                        expect(list.length).toBe(0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvSWRlbnRpdHlBdHRyaWJ1dGVzRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDhCQUE4Qiw2QkFBNkIsVUFBVSxTQUFTO0lBQTFIOztJQUdJLElBQUksY0FBYztJQUNsQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQkFBMkI7WUFDakYsZUFBZSwwQkFBMEI7V0FDMUMsVUFBVSx5QkFBeUI7WUFDbEMsY0FBYyx3QkFBd0I7O1FBRTFDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUywrQkFBK0IsWUFBTTtnQkFDMUMsSUFBSSxRQUFRO29CQUNSLFlBQ0k7b0JBQ0osWUFBWTtvQkFDWixVQUFPO29CQUFFLFNBQU07b0JBQUUsV0FBUTtvQkFBRSxRQUFLO29CQUFFLGVBQVk7O2dCQUVsRCxXQUFXLE9BQU8sY0FBYzs7Z0JBRWhDLFdBQVcsT0FBTyxVQUFDLFlBQVksWUFBWSxvQkFBdUI7b0JBQzlELFdBQVc7b0JBQ1gsU0FBUyxXQUFXOztvQkFFcEIsUUFBUSxJQUFJLG1CQUFtQjt3QkFDM0IsWUFBWSxDQUFDOzRCQUNULGVBQWU7NEJBQ2YsT0FBTzs0QkFDUCxPQUFPOzJCQUNSOzRCQUNDLGVBQWU7NEJBQ2YsT0FBTzs0QkFDUCxPQUFPOzJCQUNSOzRCQUNDLGVBQWU7NEJBQ2YsT0FBTzs0QkFDUCxPQUFPLENBQUUsUUFBUTsyQkFDbEI7NEJBQ0MsZUFBZTs0QkFDZixPQUFPOzRCQUNQLE9BQU87Z0NBQ0gsSUFBSTtnQ0FDSixNQUFNO2dDQUNOLGFBQWE7OzRCQUVqQixrQkFBa0I7MkJBQ25COzRCQUNDLGVBQWU7NEJBQ2YsT0FBTzs0QkFDUCxPQUFPO2dDQUNILElBQUk7Z0NBQ0osTUFBTTtnQ0FDTixhQUFhOzs0QkFFakIsa0JBQWtCOzs7O29CQUkxQixlQUFlLFFBQVEsVUFBVTs7O2dCQUdyQyxVQUFVLFlBQU07b0JBQ1osSUFB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QUN2RCxPQUFPLFNBQVMsT0FBTyxRQUFROzs7O2dCQUl2QyxTQUFTLFlBQVksWUFBTTtvQkFDdkIsR0FBRyxnRUFBZ0UsWUFBTTt3QkFDckUsUUFBUSxNQUFNLE9BQU87d0JBQ3JCLElBQUksT0FBTyxRQUFRLEtBQUs7NEJBQ3BCLFFBQVEsUUFBUSxLQUFLO3dCQUN6QixPQUFPLE1BQU0sUUFBUSxLQUFLO3dCQUMxQixPQUFPLEtBQUssUUFBUSxLQUFLOzs7b0JBRzdCLEdBQUcsZ0VBQWdFLFlBQU07d0JBQ3JFLFFBQVEsTUFBTSxPQUFPO3dCQUNyQixJQUFJLE9BQU8sUUFBUSxLQUFLOzRCQUNwQixRQUFRLFFBQVEsS0FBSzt3QkFDekIsT0FBTyxNQUFNLFFBQVEsS0FBSzt3QkFDMUIsT0FBTyxLQUFLLFFBQVEsS0FBSzs7Ozs7O0dBZWxDIiwiZmlsZSI6ImNvbW1vbi93aWRnZXQvSWRlbnRpdHlBdHRyaWJ1dGVzRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IHdpZGdldE1vZHVsZSBmcm9tICdjb21tb24vd2lkZ2V0L1dpZGdldE1vZHVsZSc7XHJcbmltcG9ydCBtb2RlbE1vZHVsZSBmcm9tICdjb21tb24vbW9kZWwvTW9kZWxNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0lkZW50aXR5QXR0cmlidXRlc0RpcmVjdGl2ZScsICgpID0+IHtcclxuICAgIGxldCBlbERlZiA9ICc8c3AtaWRlbnRpdHktYXR0cmlidXRlcyBzcC1pZGVudGl0eT1cImlkZW50aXR5XCIgLz4nLFxyXG4gICAgICAgIGxpbmtFbERlZiA9XHJcbiAgICAgICAgICAgICc8c3AtaWRlbnRpdHktYXR0cmlidXRlcyBzcC1pZGVudGl0eT1cImlkZW50aXR5XCIgc3AtbmF2aWdhdGUtdG8taWRlbnRpdHktZnVuYz1cIm5hdkZ1bmMoaWRlbnRpdHlTdW1tYXJ5KVwiIC8+JyxcclxuICAgICAgICBsaXN0RWxEZWYgPSAnPHNwLWlkZW50aXR5LWF0dHJpYnV0ZXMgc3AtaWRlbnRpdHk9XCJpZGVudGl0eVwiIHNwLXNob3ctbGlzdD1cInNob3dMaXN0XCIgLz4nLFxyXG4gICAgICAgIGVsZW1lbnQsICRzY29wZSwgJGNvbXBpbGUsIGF0dHJzLCBuYXZpZ2F0ZUZ1bmM7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUod2lkZ2V0TW9kdWxlLCBtb2RlbE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KCgkcm9vdFNjb3BlLCBfJGNvbXBpbGVfLCBJZGVudGl0eUF0dHJpYnV0ZXMpID0+IHtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgIGF0dHJzID0gbmV3IElkZW50aXR5QXR0cmlidXRlcyh7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFt7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAnYXR0cjEnLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdMYWJlbCAxJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAndmFsdWUxJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAnbm9WYWx1ZUF0dHInLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdMYWJlbCAyJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBudWxsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6ICdhcnJheUF0dHInLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdMYWJlbCAzJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbICd2YWwxJywgJ3ZhbDInXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAnaWRlbnRpdHlBdHRyJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnTGFiZWwgNCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnYXV0aG9yaXplZElkZW50aXR5JyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0F1dGhvcml6ZWQgSWRlbnRpdHknXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXplZFRvVmlldzogdHJ1ZVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAndW5hdXRoeklkZW50aXR5QXR0cicsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0xhYmVsIDUnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJzkxMScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3VuYXV0aG9yaXplZElkZW50aXR5JyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1VuYXV0aG9yaXplZCBJZGVudGl0eSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVG9WaWV3OiBmYWxzZVxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBuYXZpZ2F0ZUZ1bmMgPSBqYXNtaW5lLmNyZWF0ZVNweSgnbmF2aWdhdGVGdW5jJyk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBpbGUod2l0aElkZW50aXR5LCB3aXRoTGluaywgd2l0aExpc3QpIHtcclxuICAgICAgICBsZXQgZGVmID0gd2l0aExpc3QgIT09IHVuZGVmaW5lZCA/IGxpc3RFbERlZiA6ICh3aXRoTGluayA/IGxpbmtFbERlZiA6IGVsRGVmKTtcclxuXHJcbiAgICAgICAgaWYgKHdpdGhJZGVudGl0eSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuaWRlbnRpdHkgPSBhdHRycztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHdpdGhMaW5rKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5uYXZGdW5jID0gbmF2aWdhdGVGdW5jO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih3aXRoTGlzdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zaG93TGlzdCA9IHdpdGhMaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkZWYpO1xyXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYXNMb2FkaW5nTWFzaygpIHtcclxuICAgICAgICByZXR1cm4gKGVsZW1lbnQuZmluZCgnLmxvYWRpbmctbWFzaycpLmxlbmd0aCA+IDApO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdzaG93cyBsb2FkaW5nIG1hc2sgdW50aWwgdGhlIGlkZW50aXR5IGlzIGxvYWRlZCcsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKGZhbHNlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KGhhc0xvYWRpbmdNYXNrKCkpLnRvRXF1YWwodHJ1ZSk7XHJcblxyXG4gICAgICAgICRzY29wZS5pZGVudGl0eSA9IGF0dHJzO1xyXG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcblxyXG4gICAgICAgIGV4cGVjdChoYXNMb2FkaW5nTWFzaygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRBdHRyaWJ1dGVSb3dCeUxhYmVsKGxhYmVsKSB7XHJcbiAgICAgICAgbGV0IGxhYmVsRWxzID0gZWxlbWVudC5maW5kKGAubGFiZWwtY29sdW1uOmNvbnRhaW5zKCcke2xhYmVsfScpYCk7XHJcbiAgICAgICAgbGV0IHJvd3MgPSBsYWJlbEVscy5wYXJlbnQoKTtcclxuICAgICAgICByZXR1cm4gKHJvd3MubGVuZ3RoID4gMCkgPyBhbmd1bGFyLmVsZW1lbnQocm93c1swXSkgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdoaWRlcyBhdHRyaWJ1dGVzIHdpdGggbm8gdmFsdWUnLCAoKSA9PiB7XHJcbiAgICAgICAgY29tcGlsZSh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IGF0dHIgPSBmaW5kQXR0cmlidXRlUm93QnlMYWJlbChhdHRycy5hdHRyaWJ1dGVzWzFdLmxhYmVsKTtcclxuICAgICAgICBleHBlY3QoYXR0cikudG9CZU51bGwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZW5kZXJzIHRoZSBsYWJlbCcsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKHRydWUsIGZhbHNlKTtcclxuICAgICAgICBsZXQgYXR0ciA9IGZpbmRBdHRyaWJ1dGVSb3dCeUxhYmVsKGF0dHJzLmF0dHJpYnV0ZXNbMF0ubGFiZWwpO1xyXG4gICAgICAgIGV4cGVjdChhdHRyKS5ub3QudG9CZU51bGwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdsaW5rJywgKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGhhc0xpbmsocm93RWx0KSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChyb3dFbHQpLm5vdC50b0JlTnVsbCgpO1xyXG4gICAgICAgICAgICBsZXQgbGluayA9IHJvd0VsdC5maW5kKCdhJyk7XHJcbiAgICAgICAgICAgIHJldHVybiAobGluay5sZW5ndGggPiAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdpcyBub3QgcmVuZGVyZWQgaWYgbm8gbmF2aWdhdGlvbiBmdW5jdGlvbiBpcyBwcm92aWRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZSh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCBhdHRyID0gZmluZEF0dHJpYnV0ZVJvd0J5TGFiZWwoYXR0cnMuYXR0cmlidXRlc1szXS5sYWJlbCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYXNMaW5rKGF0dHIpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIG5vdCByZW5kZXJlZCBpZiB0aGUgdXNlciBpcyBub3QgYXV0aG9yaXplZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgbGV0IGF0dHIgPSBmaW5kQXR0cmlidXRlUm93QnlMYWJlbChhdHRycy5hdHRyaWJ1dGVzWzRdLmxhYmVsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhc0xpbmsoYXR0cikpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgcmVuZGVyZWQgZm9yIGlkZW50aXR5IHJlZmVyZW5jZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGxldCBhdHRyID0gZmluZEF0dHJpYnV0ZVJvd0J5TGFiZWwoYXR0cnMuYXR0cmlidXRlc1szXS5sYWJlbCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYXNMaW5rKGF0dHIpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgdGhlIG5hdmlnYXRpb24gZnVuY3Rpb24gd2hlbiBjbGlja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21waWxlKHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgYXR0ciA9IGZpbmRBdHRyaWJ1dGVSb3dCeUxhYmVsKGF0dHJzLmF0dHJpYnV0ZXNbM10ubGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgbGluayA9IGF0dHIuZmluZCgnYScpO1xyXG4gICAgICAgICAgICBsaW5rLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0ZUZ1bmMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGF0dHJzLmF0dHJpYnV0ZXNbM10udmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3ZhbHVlJywgKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldFZhbHVlKHJvd0VsdCkge1xyXG4gICAgICAgICAgICBleHBlY3Qocm93RWx0KS5ub3QudG9CZU51bGwoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJvd0VsdC5maW5kKCdzcGFuJykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdpcyByZW5kZXJlZCBub3JtYWxseSBmb3IgYSBzdHJpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBsZXQgYXR0ciA9IGZpbmRBdHRyaWJ1dGVSb3dCeUxhYmVsKGF0dHJzLmF0dHJpYnV0ZXNbMF0ubGFiZWwpO1xyXG4gICAgICAgICAgICBleHBlY3QoZ2V0VmFsdWUoYXR0cikpLnRvRXF1YWwoYXR0cnMuYXR0cmlidXRlc1swXS52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyByZW5kZXJlZCBhcyBhbiBpZGVudGl0eSBkaXNwbGF5IG5hbWUgZm9yIGFuIGlkZW50aXR5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21waWxlKHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IGF0dHIgPSBmaW5kQXR0cmlidXRlUm93QnlMYWJlbChhdHRycy5hdHRyaWJ1dGVzWzNdLmxhYmVsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGdldFZhbHVlKGF0dHIpKS50b0VxdWFsKGF0dHJzLmF0dHJpYnV0ZXNbM10udmFsdWUuZGlzcGxheU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgcmVuZGVyZWQgYXMgYSBjb21tYS1zZXBhcmF0ZWQgc3RyaW5nIGZvciBhbiBhcnJheScsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZSh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCBhdHRyID0gZmluZEF0dHJpYnV0ZVJvd0J5TGFiZWwoYXR0cnMuYXR0cmlidXRlc1syXS5sYWJlbCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChnZXRWYWx1ZShhdHRyKSkudG9FcXVhbCgndmFsMSwgdmFsMicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dMaXN0JywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdzaG91bGQgcmVuZGVyIGEgbGlzdCBhbmQgbm90IGEgdGFibGUgd2hlbiBzaG93TGlzdCBpcyB0cnV0aHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUodHJ1ZSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IGVsZW1lbnQuZmluZCgndWwjaWRlbnRpdHktYXR0cmlidXRlcy1kYXRhLWxpc3QnKSxcclxuICAgICAgICAgICAgICAgIHRhYmxlID0gZWxlbWVudC5maW5kKCd0YWJsZSNpZGVudGl0eS1hdHRyaWJ1dGVzLWRhdGEtdGFibGUtY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5sZW5ndGgpLnRvQmUoMCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsaXN0Lmxlbmd0aCkudG9CZSgxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZW5kZXIgYSB0YWJsZSBhbmQgbm90IGEgbGlzdCB3aGVuIHNob3dMaXN0IGlzIGZhbHNleScsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZSh0cnVlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IGVsZW1lbnQuZmluZCgndWwjaWRlbnRpdHktYXR0cmlidXRlcy1kYXRhLWxpc3QnKSxcclxuICAgICAgICAgICAgICAgIHRhYmxlID0gZWxlbWVudC5maW5kKCd0YWJsZSNpZGVudGl0eS1hdHRyaWJ1dGVzLWRhdGEtdGFibGUtY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5sZW5ndGgpLnRvQmUoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsaXN0Lmxlbmd0aCkudG9CZSgwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
