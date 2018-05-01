System.register(['test/js/TestInitializer', 'common/dataview/card/CardModule'], function (_export) {

    /**
    * CardDataDirective tests.
    *
    * We should end up with multiple spans that display the cardData according to the column config.
    *
    * The column config describes what order the data should be displayed, the label to be used, and an optional renderer
    * for custom rendering.
    *
    * 1. Compile the directive with the proper scope setup.
    * 2. Check that the resulting element shows the proper data in the manner described by the column config.
    *
    */
    'use strict';

    var cardModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewCardCardModule) {
            cardModule = _commonDataviewCardCardModule['default'];
        }],
        execute: function () {
            describe('CardDataDirective', function () {

                var $scope,
                    $compile,
                    ColumnConfig,
                    identity,
                    colConfigs,
                    createElement = function (model, colConfigs, compile, scope) {
                    var element;
                    scope.cardData = model;
                    scope.colConfigs = colConfigs;
                    element = angular.element('<div><div sp-card-data="true" sp-data="cardData" sp-col-configs="colConfigs" /></div>');
                    compile(element)(scope);
                    scope.$apply();
                    return element;
                },
                    colConfig1 = {
                    dataIndex: 'name',
                    label: 'Username'
                },
                    colConfig2 = {
                    dataIndex: 'displayableName',
                    label: 'Name'
                },
                    colConfig3 = {
                    dataIndex: 'id',
                    fieldOnly: true
                },
                    identityData = {
                    id: '2',
                    name: 'kbob',
                    displayName: 'Kay Bob',
                    managerName: 'Jim Bob',
                    location: 'Austin',
                    department: 'Agriculture'
                },
                    bandConfig = {
                    colorBands: [{
                        color: 'low',
                        lower: '0',
                        upper: '250'
                    }, {
                        color: 'medium_low',
                        lower: '251',
                        upper: '500'
                    }, {
                        color: 'medium_high',
                        lower: '501',
                        upper: '750'
                    }, {
                        color: 'high',
                        lower: '751',
                        upper: '1000'
                    }]
                };

                function getDisplayedLabel(label) {
                    return label + 'ui_label_separator';
                }

                function MockIdentity(mockIdentity) {
                    this.name = mockIdentity.name;
                    this.id = mockIdentity.id;
                    this.displayName = mockIdentity.displayName;

                    this.getName = function () {
                        return this.name;
                    };

                    this.getDisplayableName = function () {
                        return this.displayName;
                    };

                    this.getId = function () {
                        return this.id;
                    };
                }

                beforeEach(module(cardModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_BAND_CONFIG', bandConfig);
                }));

                beforeEach(inject(function (_$rootScope_, _$compile_, _ColumnConfig_) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    ColumnConfig = _ColumnConfig_;
                    identity = new MockIdentity(identityData);
                    colConfigs = [new ColumnConfig(colConfig1), new ColumnConfig(colConfig2), new ColumnConfig(colConfig3)];
                }));

                /**
                 * Make sure the only the data configured by the column config shows.
                 */
                it('should show the correct identity card info', function () {

                    var element = createElement(identity, colConfigs, $compile, $scope),
                        cardDataLabels = element.find('.sp-card-data-item-label'),
                        cardDataValues = element.find('.sp-card-data-item-value'),
                        expectedResults = [{ label: 'Username', value: 'kbob' }, { label: 'Name', value: 'Kay Bob' }],
                        i;

                    // Should have the same number of items as colConfigs (minus any fieldOnly configs)
                    expect(cardDataValues.length).toEqual(expectedResults.length);
                    expect(cardDataLabels.length).toEqual(expectedResults.length);

                    for (i = 0; i < expectedResults.length; i++) {
                        expect(cardDataLabels[i].innerText.trim()).toEqual(getDisplayedLabel(expectedResults[i].label));
                        expect(cardDataValues[i].innerText.trim()).toEqual(expectedResults[i].value);
                    }
                });

                it('should update the display when the model is changed', function () {
                    var element = createElement(identity, colConfigs, $compile, $scope),
                        cardDataValues = element.find('.sp-card-data-item-value'),
                        updatedName = 'Updated';
                    identity.name = updatedName;
                    $scope.$apply();
                    expect(cardDataValues[0].innerText.trim()).toEqual(updatedName);
                });

                it('should not show columns with no data', function () {
                    var element = createElement({ name: 'testname' }, colConfigs, $compile, $scope),
                        cardDataLabels = element.find('.sp-card-data-item-label'),
                        cardDataValues = element.find('.sp-card-data-item-value'),
                        expectedResults = [{ label: 'Username', value: 'testname' }],
                        i;

                    // Should have the same number of items as colConfigs (minus any fieldOnly configs)
                    expect(cardDataValues.length).toEqual(expectedResults.length);
                    expect(cardDataLabels.length).toEqual(expectedResults.length);

                    for (i = 0; i < expectedResults.length; i++) {
                        expect(cardDataLabels[i].innerText.trim()).toEqual(getDisplayedLabel(expectedResults[i].label));
                        expect(cardDataValues[i].innerText.trim()).toEqual(expectedResults[i].value);
                    }
                });

                it('should render html renderers correctly', function () {
                    var element = createElement({ score: 1000 }, [new ColumnConfig({
                        dataIndex: 'score',
                        label: 'baz',
                        renderer: 'risk'
                    })], $compile, $scope);
                    expect(element.find('.ri_high').length).toEqual(1);
                });

                describe('more/less link', function () {
                    var LONG_COLUMN_CONFIG = undefined,
                        SHORT_COLUMN_CONFIG = undefined,
                        BIG_OBJECT = undefined,
                        LINK_SELECTOR = '.sp-card-data-item a';

                    beforeEach(function () {
                        LONG_COLUMN_CONFIG = [new ColumnConfig({
                            dataIndex: 'a',
                            label: 'baz',
                            renderer: 'risk'
                        }), new ColumnConfig({
                            dataIndex: 'b',
                            label: 'baz',
                            renderer: 'risk'
                        }), new ColumnConfig({
                            dataIndex: 'c',
                            label: 'baz',
                            renderer: 'risk'
                        }), new ColumnConfig({
                            dataIndex: 'd',
                            label: 'baz',
                            renderer: 'risk'
                        }), new ColumnConfig({
                            dataIndex: 'e',
                            label: 'baz',
                            renderer: 'risk'
                        }), new ColumnConfig({
                            dataIndex: 'f',
                            label: 'baz',
                            renderer: 'risk'
                        })];
                        SHORT_COLUMN_CONFIG = [new ColumnConfig({
                            dataIndex: 'a',
                            label: 'baz',
                            renderer: 'risk'
                        }), new ColumnConfig({
                            dataIndex: 'b',
                            label: 'baz',
                            renderer: 'risk'
                        })];
                        BIG_OBJECT = { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' };
                    });

                    it('should render the more link when more than max number of columns', function () {
                        var element = createElement({ score: 1000 }, LONG_COLUMN_CONFIG, $compile, $scope),
                            findResults = element.find(LINK_SELECTOR),
                            link = findResults[0];

                        expect(findResults.length).toEqual(1);
                        expect(link.innerText).toEqual('ui_card_data_more');
                    });

                    it('should not render the more link if there are fewer than max number of columns', function () {
                        var element = createElement({ score: 1000 }, SHORT_COLUMN_CONFIG, $compile, $scope);
                        expect(element.find(LINK_SELECTOR).length).toEqual(0);
                    });

                    it('should render all rows when more is clicked', function () {
                        var element = createElement(BIG_OBJECT, LONG_COLUMN_CONFIG, $compile, $scope),
                            link = angular.element(element.find(LINK_SELECTOR)[0]);
                        link.click();
                        $scope.$apply();
                        // six rows of data and one for the less link
                        expect(element.find('.sp-card-data-item').length).toEqual(7);
                    });

                    it('should render fewer rows when less is clicked', function () {
                        var element = createElement(BIG_OBJECT, LONG_COLUMN_CONFIG, $compile, $scope),
                            link = angular.element(element.find(LINK_SELECTOR)[0]);
                        // expand
                        link.click();
                        $scope.$apply();
                        // collapse
                        link.click();
                        $scope.$apply();
                        // five rows of data and one for the more link
                        expect(element.find('.sp-card-data-item').length).toEqual(6);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9jYXJkL0NhcmREYXRhRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG9DQUFvQyxVQUFVLFNBQVM7Ozs7Ozs7Ozs7Ozs7O0lBQW5HOztJQWdCSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsK0JBQStCO1lBQ3JGLGFBQWEsOEJBQThCOztRQUUvQyxTQUFTLFlBQVk7WUFKN0IsU0FBUyxxQkFBcUIsWUFBVzs7Z0JBRXJDLElBQUk7b0JBQVE7b0JBQVU7b0JBQWM7b0JBQVU7b0JBQzFDLGdCQUFnQixVQUFTLE9BQU8sWUFBWSxTQUFTLE9BQU87b0JBQ3hELElBQUk7b0JBQ0osTUFBTSxXQUFXO29CQUNqQixNQUFNLGFBQWE7b0JBQ25CLFVBQVUsUUFBUSxRQUNkO29CQUNKLFFBQVEsU0FBUztvQkFDakIsTUFBTTtvQkFDTixPQUFPOztvQkFFWCxhQUFhO29CQUNULFdBQVc7b0JBQ1gsT0FBTzs7b0JBQ1QsYUFBYTtvQkFDWCxXQUFXO29CQUNYLE9BQU87O29CQUNSLGFBQWE7b0JBQ1osV0FBVztvQkFDWCxXQUFXOztvQkFDWixlQUFlO29CQUNkLElBQUk7b0JBQ0osTUFBTTtvQkFDTixhQUFhO29CQUNiLGFBQWE7b0JBQ2IsVUFBVTtvQkFDVixZQUFZOztvQkFFaEIsYUFBYTtvQkFDTCxZQUFhLENBQ1Q7d0JBQ0ksT0FBTzt3QkFDUCxPQUFPO3dCQUNQLE9BQU87dUJBRVg7d0JBQ0ksT0FBTzt3QkFDUCxPQUFPO3dCQUNQLE9BQU87dUJBRVg7d0JBQ0ksT0FBTzt3QkFDUCxPQUFPO3dCQUNQLE9BQU87dUJBRVg7d0JBQ0ksT0FBTzt3QkFDUCxPQUFPO3dCQUNQLE9BQU87Ozs7Z0JBSTNCLFNBQVMsa0JBQWtCLE9BQU87b0JBQzlCLE9BQU8sUUFBUTs7O2dCQUduQixTQUFTLGFBQWEsY0FBYztvQkFDaEMs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d0JBRVAsS0FBSzt3QkFDTCxPQUFPOzt3QkFFUCxPQUFPLFFBQVEsS0FBSyxzQkFBc0IsUUFBUSxRQUFROzs7Ozs7R0FEbkUiLCJmaWxlIjoiY29tbW9uL2RhdGF2aWV3L2NhcmQvQ2FyZERhdGFEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2FyZE1vZHVsZSBmcm9tICdjb21tb24vZGF0YXZpZXcvY2FyZC9DYXJkTW9kdWxlJztcblxuLyoqXG4qIENhcmREYXRhRGlyZWN0aXZlIHRlc3RzLlxuKlxuKiBXZSBzaG91bGQgZW5kIHVwIHdpdGggbXVsdGlwbGUgc3BhbnMgdGhhdCBkaXNwbGF5IHRoZSBjYXJkRGF0YSBhY2NvcmRpbmcgdG8gdGhlIGNvbHVtbiBjb25maWcuXG4qXG4qIFRoZSBjb2x1bW4gY29uZmlnIGRlc2NyaWJlcyB3aGF0IG9yZGVyIHRoZSBkYXRhIHNob3VsZCBiZSBkaXNwbGF5ZWQsIHRoZSBsYWJlbCB0byBiZSB1c2VkLCBhbmQgYW4gb3B0aW9uYWwgcmVuZGVyZXJcbiogZm9yIGN1c3RvbSByZW5kZXJpbmcuXG4qXG4qIDEuIENvbXBpbGUgdGhlIGRpcmVjdGl2ZSB3aXRoIHRoZSBwcm9wZXIgc2NvcGUgc2V0dXAuXG4qIDIuIENoZWNrIHRoYXQgdGhlIHJlc3VsdGluZyBlbGVtZW50IHNob3dzIHRoZSBwcm9wZXIgZGF0YSBpbiB0aGUgbWFubmVyIGRlc2NyaWJlZCBieSB0aGUgY29sdW1uIGNvbmZpZy5cbipcbiovXG5kZXNjcmliZSgnQ2FyZERhdGFEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciAkc2NvcGUsICRjb21waWxlLCBDb2x1bW5Db25maWcsIGlkZW50aXR5LCBjb2xDb25maWdzLFxuICAgICAgICBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24obW9kZWwsIGNvbENvbmZpZ3MsIGNvbXBpbGUsIHNjb3BlKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgICAgIHNjb3BlLmNhcmREYXRhID0gbW9kZWw7XG4gICAgICAgICAgICBzY29wZS5jb2xDb25maWdzID0gY29sQ29uZmlncztcbiAgICAgICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJzxkaXY+PGRpdiBzcC1jYXJkLWRhdGE9XCJ0cnVlXCIgc3AtZGF0YT1cImNhcmREYXRhXCIgc3AtY29sLWNvbmZpZ3M9XCJjb2xDb25maWdzXCIgLz48L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSxcbiAgICAgICAgY29sQ29uZmlnMSA9IHtcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ25hbWUnLFxuICAgICAgICAgICAgbGFiZWw6ICdVc2VybmFtZSdcbiAgICAgICAgfSxjb2xDb25maWcyID0ge1xuICAgICAgICAgICAgZGF0YUluZGV4OiAnZGlzcGxheWFibGVOYW1lJyxcbiAgICAgICAgICAgIGxhYmVsOiAnTmFtZSdcbiAgICAgICAgfSwgY29sQ29uZmlnMyA9IHtcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ2lkJyxcbiAgICAgICAgICAgIGZpZWxkT25seTogdHJ1ZVxuICAgICAgICB9LCBpZGVudGl0eURhdGEgPSB7XG4gICAgICAgICAgICBpZDogJzInLFxuICAgICAgICAgICAgbmFtZTogJ2tib2InLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdLYXkgQm9iJyxcbiAgICAgICAgICAgIG1hbmFnZXJOYW1lOiAnSmltIEJvYicsXG4gICAgICAgICAgICBsb2NhdGlvbjogJ0F1c3RpbicsXG4gICAgICAgICAgICBkZXBhcnRtZW50OiAnQWdyaWN1bHR1cmUnXG4gICAgICAgIH0sXG4gICAgICAgIGJhbmRDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgY29sb3JCYW5kcyA6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdsb3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXI6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyOiAnMjUwJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ21lZGl1bV9sb3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXI6ICcyNTEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXI6ICc1MDAnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnbWVkaXVtX2hpZ2gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXI6ICc1MDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXI6ICc3NTAnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnaGlnaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlcjogJzc1MScsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cHBlcjogJzEwMDAnXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXREaXNwbGF5ZWRMYWJlbChsYWJlbCkge1xuICAgICAgICByZXR1cm4gbGFiZWwgKyAndWlfbGFiZWxfc2VwYXJhdG9yJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBNb2NrSWRlbnRpdHkobW9ja0lkZW50aXR5KSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG1vY2tJZGVudGl0eS5uYW1lO1xuICAgICAgICB0aGlzLmlkID0gbW9ja0lkZW50aXR5LmlkO1xuICAgICAgICB0aGlzLmRpc3BsYXlOYW1lID0gbW9ja0lkZW50aXR5LmRpc3BsYXlOYW1lO1xuXG4gICAgICAgIHRoaXMuZ2V0TmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdldERpc3BsYXlhYmxlTmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheU5hbWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5nZXRJZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2FyZE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0JBTkRfQ09ORklHJywgYmFuZENvbmZpZyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfLCBfQ29sdW1uQ29uZmlnXykge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgQ29sdW1uQ29uZmlnID0gX0NvbHVtbkNvbmZpZ187XG4gICAgICAgIGlkZW50aXR5ID0gbmV3IE1vY2tJZGVudGl0eShpZGVudGl0eURhdGEpO1xuICAgICAgICBjb2xDb25maWdzID0gW1xuICAgICAgICAgICAgICAgIG5ldyBDb2x1bW5Db25maWcoY29sQ29uZmlnMSksXG4gICAgICAgICAgICAgICAgbmV3IENvbHVtbkNvbmZpZyhjb2xDb25maWcyKSxcbiAgICAgICAgICAgICAgICBuZXcgQ29sdW1uQ29uZmlnKGNvbENvbmZpZzMpXG4gICAgICAgICAgICBdO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIE1ha2Ugc3VyZSB0aGUgb25seSB0aGUgZGF0YSBjb25maWd1cmVkIGJ5IHRoZSBjb2x1bW4gY29uZmlnIHNob3dzLlxuICAgICAqL1xuICAgIGl0KCdzaG91bGQgc2hvdyB0aGUgY29ycmVjdCBpZGVudGl0eSBjYXJkIGluZm8nLCBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoaWRlbnRpdHksIGNvbENvbmZpZ3MsICRjb21waWxlLCAkc2NvcGUpLFxuICAgICAgICAgICAgY2FyZERhdGFMYWJlbHMgPSBlbGVtZW50LmZpbmQoJy5zcC1jYXJkLWRhdGEtaXRlbS1sYWJlbCcpLFxuICAgICAgICAgICAgY2FyZERhdGFWYWx1ZXMgPSBlbGVtZW50LmZpbmQoJy5zcC1jYXJkLWRhdGEtaXRlbS12YWx1ZScpLFxuICAgICAgICAgICAgZXhwZWN0ZWRSZXN1bHRzID0gW1xuICAgICAgICAgICAgICAgIHtsYWJlbDogJ1VzZXJuYW1lJywgdmFsdWU6ICdrYm9iJ30sXG4gICAgICAgICAgICAgICAge2xhYmVsOiAnTmFtZScsIHZhbHVlOiAnS2F5IEJvYid9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaTtcblxuICAgICAgICAvLyBTaG91bGQgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgaXRlbXMgYXMgY29sQ29uZmlncyAobWludXMgYW55IGZpZWxkT25seSBjb25maWdzKVxuICAgICAgICBleHBlY3QoY2FyZERhdGFWYWx1ZXMubGVuZ3RoKS50b0VxdWFsKGV4cGVjdGVkUmVzdWx0cy5sZW5ndGgpO1xuICAgICAgICBleHBlY3QoY2FyZERhdGFMYWJlbHMubGVuZ3RoKS50b0VxdWFsKGV4cGVjdGVkUmVzdWx0cy5sZW5ndGgpO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGV4cGVjdGVkUmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZXhwZWN0KGNhcmREYXRhTGFiZWxzW2ldLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoZ2V0RGlzcGxheWVkTGFiZWwoZXhwZWN0ZWRSZXN1bHRzW2ldLmxhYmVsKSk7XG4gICAgICAgICAgICBleHBlY3QoY2FyZERhdGFWYWx1ZXNbaV0uaW5uZXJUZXh0LnRyaW0oKSkudG9FcXVhbChleHBlY3RlZFJlc3VsdHNbaV0udmFsdWUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgZGlzcGxheSB3aGVuIHRoZSBtb2RlbCBpcyBjaGFuZ2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChpZGVudGl0eSwgY29sQ29uZmlncywgJGNvbXBpbGUsICRzY29wZSksXG4gICAgICAgICAgICBjYXJkRGF0YVZhbHVlcyA9IGVsZW1lbnQuZmluZCgnLnNwLWNhcmQtZGF0YS1pdGVtLXZhbHVlJyksXG4gICAgICAgICAgICB1cGRhdGVkTmFtZSA9ICdVcGRhdGVkJztcbiAgICAgICAgaWRlbnRpdHkubmFtZSA9IHVwZGF0ZWROYW1lO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChjYXJkRGF0YVZhbHVlc1swXS5pbm5lclRleHQudHJpbSgpKS50b0VxdWFsKHVwZGF0ZWROYW1lKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHNob3cgY29sdW1ucyB3aXRoIG5vIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHtuYW1lOiAndGVzdG5hbWUnfSwgY29sQ29uZmlncywgJGNvbXBpbGUsICRzY29wZSksXG4gICAgICAgICAgICBjYXJkRGF0YUxhYmVscyA9IGVsZW1lbnQuZmluZCgnLnNwLWNhcmQtZGF0YS1pdGVtLWxhYmVsJyksXG4gICAgICAgICAgICBjYXJkRGF0YVZhbHVlcyA9IGVsZW1lbnQuZmluZCgnLnNwLWNhcmQtZGF0YS1pdGVtLXZhbHVlJyksXG4gICAgICAgICAgICBleHBlY3RlZFJlc3VsdHMgPSBbXG4gICAgICAgICAgICAgICAge2xhYmVsOiAnVXNlcm5hbWUnLCB2YWx1ZTogJ3Rlc3RuYW1lJ31cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpO1xuXG4gICAgICAgIC8vIFNob3VsZCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBpdGVtcyBhcyBjb2xDb25maWdzIChtaW51cyBhbnkgZmllbGRPbmx5IGNvbmZpZ3MpXG4gICAgICAgIGV4cGVjdChjYXJkRGF0YVZhbHVlcy5sZW5ndGgpLnRvRXF1YWwoZXhwZWN0ZWRSZXN1bHRzLmxlbmd0aCk7XG4gICAgICAgIGV4cGVjdChjYXJkRGF0YUxhYmVscy5sZW5ndGgpLnRvRXF1YWwoZXhwZWN0ZWRSZXN1bHRzLmxlbmd0aCk7XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgZXhwZWN0ZWRSZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBleHBlY3QoY2FyZERhdGFMYWJlbHNbaV0uaW5uZXJUZXh0LnRyaW0oKSkudG9FcXVhbChnZXREaXNwbGF5ZWRMYWJlbChleHBlY3RlZFJlc3VsdHNbaV0ubGFiZWwpKTtcbiAgICAgICAgICAgIGV4cGVjdChjYXJkRGF0YVZhbHVlc1tpXS5pbm5lclRleHQudHJpbSgpKS50b0VxdWFsKGV4cGVjdGVkUmVzdWx0c1tpXS52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW5kZXIgaHRtbCByZW5kZXJlcnMgY29ycmVjdGx5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCh7c2NvcmU6IDEwMDB9LFxuICAgICAgICAgICAgW25ldyBDb2x1bW5Db25maWcoe1xuICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJ3Njb3JlJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ2JheicsXG4gICAgICAgICAgICAgICAgcmVuZGVyZXI6ICdyaXNrJ1xuICAgICAgICAgICAgfSldLFxuICAgICAgICAgICAgJGNvbXBpbGUsXG4gICAgICAgICAgICAkc2NvcGUpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcucmlfaGlnaCcpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtb3JlL2xlc3MgbGluaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgTE9OR19DT0xVTU5fQ09ORklHLCBTSE9SVF9DT0xVTU5fQ09ORklHLCBCSUdfT0JKRUNULFxuICAgICAgICAgICAgTElOS19TRUxFQ1RPUiA9ICcuc3AtY2FyZC1kYXRhLWl0ZW0gYSc7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIExPTkdfQ09MVU1OX0NPTkZJRyA9IFtcbiAgICAgICAgICAgICAgICBuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnYScsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnYmF6JyxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXI6ICdyaXNrJ1xuICAgICAgICAgICAgICAgIH0pLCBuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnYicsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnYmF6JyxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXI6ICdyaXNrJ1xuICAgICAgICAgICAgICAgIH0pLCBuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnYycsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnYmF6JyxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXI6ICdyaXNrJ1xuICAgICAgICAgICAgICAgIH0pLCBuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnZCcsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnYmF6JyxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXI6ICdyaXNrJ1xuICAgICAgICAgICAgICAgIH0pLCBuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnZScsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnYmF6JyxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXI6ICdyaXNrJ1xuICAgICAgICAgICAgICAgIH0pLCBuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnZicsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnYmF6JyxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXI6ICdyaXNrJ1xuICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIFNIT1JUX0NPTFVNTl9DT05GSUcgPSBbXG4gICAgICAgICAgICAgICAgbmV3IENvbHVtbkNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJ2EnLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ2JheicsXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyOiAncmlzaydcbiAgICAgICAgICAgICAgICB9KSwgbmV3IENvbHVtbkNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJ2InLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ2JheicsXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyOiAncmlzaydcbiAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICBCSUdfT0JKRUNUID0ge2E6ICdhJywgYjogJ2InLCBjOiAnYycsIGQ6ICdkJywgZTogJ2UnLCBmOiAnZid9O1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGl0KCdzaG91bGQgcmVuZGVyIHRoZSBtb3JlIGxpbmsgd2hlbiBtb3JlIHRoYW4gbWF4IG51bWJlciBvZiBjb2x1bW5zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoe3Njb3JlOiAxMDAwfSwgTE9OR19DT0xVTU5fQ09ORklHLCAkY29tcGlsZSwgJHNjb3BlKSxcbiAgICAgICAgICAgICAgICBmaW5kUmVzdWx0cyA9IGVsZW1lbnQuZmluZChMSU5LX1NFTEVDVE9SKSxcbiAgICAgICAgICAgICAgICBsaW5rID0gZmluZFJlc3VsdHNbMF07XG5cbiAgICAgICAgICAgIGV4cGVjdChmaW5kUmVzdWx0cy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QobGluay5pbm5lclRleHQpLnRvRXF1YWwoJ3VpX2NhcmRfZGF0YV9tb3JlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHJlbmRlciB0aGUgbW9yZSBsaW5rIGlmIHRoZXJlIGFyZSBmZXdlciB0aGFuIG1heCBudW1iZXIgb2YgY29sdW1ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHtzY29yZTogMTAwMH0sIFNIT1JUX0NPTFVNTl9DT05GSUcsICRjb21waWxlLCAkc2NvcGUpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZChMSU5LX1NFTEVDVE9SKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVuZGVyIGFsbCByb3dzIHdoZW4gbW9yZSBpcyBjbGlja2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoQklHX09CSkVDVCwgTE9OR19DT0xVTU5fQ09ORklHLCAkY29tcGlsZSwgJHNjb3BlKSxcbiAgICAgICAgICAgICAgICBsaW5rID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQuZmluZChMSU5LX1NFTEVDVE9SKVswXSk7XG4gICAgICAgICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAvLyBzaXggcm93cyBvZiBkYXRhIGFuZCBvbmUgZm9yIHRoZSBsZXNzIGxpbmtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5zcC1jYXJkLWRhdGEtaXRlbScpLmxlbmd0aCkudG9FcXVhbCg3KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZW5kZXIgZmV3ZXIgcm93cyB3aGVuIGxlc3MgaXMgY2xpY2tlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KEJJR19PQkpFQ1QsIExPTkdfQ09MVU1OX0NPTkZJRywgJGNvbXBpbGUsICRzY29wZSksXG4gICAgICAgICAgICAgICAgbGluayA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50LmZpbmQoTElOS19TRUxFQ1RPUilbMF0pO1xuICAgICAgICAgICAgLy8gZXhwYW5kXG4gICAgICAgICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAvLyBjb2xsYXBzZVxuICAgICAgICAgICAgbGluay5jbGljaygpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgLy8gZml2ZSByb3dzIG9mIGRhdGEgYW5kIG9uZSBmb3IgdGhlIG1vcmUgbGlua1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLnNwLWNhcmQtZGF0YS1pdGVtJykubGVuZ3RoKS50b0VxdWFsKDYpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
