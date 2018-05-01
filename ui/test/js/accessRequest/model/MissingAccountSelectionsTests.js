System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', '../AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            describe('MissingAccountSelections', function () {

                var data, acctSel1, MissingAccountSelections, missingSelections;

                beforeEach(module(accessRequestModule));

                beforeEach(inject(function (_MissingAccountSelections_, accessRequestTestData) {
                    MissingAccountSelections = _MissingAccountSelections_;
                    acctSel1 = accessRequestTestData.IDENTITY_ACCT_SELECTION1;
                    data = {
                        '1': [accessRequestTestData.IDENTITY_ACCT_SELECTION1],
                        '2': [accessRequestTestData.IDENTITY_ACCT_SELECTION2]
                    };
                    missingSelections = new MissingAccountSelections(data);
                }));

                describe('constructor', function () {
                    it('throws with null data', function () {
                        expect(function () {
                            new MissingAccountSelections(null);
                        }).toThrow();
                    });

                    it('reads identity account selections', function () {
                        expect(Object.keys(missingSelections.missingSelections).length).toEqual(2);
                    });
                });

                describe('getAccountSelectionsForItem()', function () {
                    it('returns undefined for an unknown item', function () {
                        expect(missingSelections.getAccountSelectionsForItem('not an id')).toBeUndefined();
                    });

                    it('returns account selections for an item', function () {
                        var acctSels = missingSelections.getAccountSelectionsForItem('1');
                        expect(acctSels).toBeDefined();
                        expect(acctSels.length).toEqual(1);
                        expect(acctSels[0].getIdentityId()).toEqual(acctSel1.identityId);
                    });
                });

                describe('getItemIds()', function () {
                    it('returns IDs for each item missing selections', function () {
                        var ids = missingSelections.getItemIds();
                        expect(ids.length).toEqual(2);
                        expect(ids.indexOf('1') > -1).toBeTruthy();
                        expect(ids.indexOf('2') > -1).toBeTruthy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvbW9kZWwvTWlzc2luZ0FjY291bnRTZWxlY3Rpb25zVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw2QkFBNkIsVUFBVSxTQUFTO0lBQWpJOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7O1lBRjdCLFNBQVMsNEJBQTRCLFlBQVc7O2dCQUU1QyxJQUFJLE1BQU0sVUFBVSwwQkFBMEI7O2dCQUU5QyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyw0QkFBNEIsdUJBQXVCO29CQUMxRSwyQkFBMkI7b0JBQzNCLFdBQVcsc0JBQXNCO29CQUNqQyxPQUFPO3dCQUNILEtBQUssQ0FBRSxzQkFBc0I7d0JBQzdCLEtBQUssQ0FBRSxzQkFBc0I7O29CQUVqQyxvQkFBb0IsSUFBSSx5QkFBeUI7OztnQkFJckQsU0FBUyxlQUFlLFlBQVc7b0JBQy9CLEdBQUcseUJBQXlCLFlBQVc7d0JBQ25DLE9BQU8sWUFBVzs0QkFBRSxJQUFJLHlCQUF5QjsyQkFBVTs7O29CQUcvRCxHQUFHLHFDQUFxQyxZQUFXO3dCQUMvQyxPQUFPLE9BQU8sS0FBSyxrQkFBa0IsbUJBQW1CLFFBQVEsUUFBUTs7OztnQkFJaEYsU0FBUyxpQ0FBaUMsWUFBVztvQkFDakQsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsT0FBTyxrQkFBa0IsNEJBQTRCLGNBQWM7OztvQkFHdkUsR0FBRywwQ0FBMEMsWUFBVzt3QkFDcEQsSUFBSSxXQUFXLGtCQUFrQiw0QkFBNEI7d0JBQzdELE9BQU8sVUFBVTt3QkFDakIsT0FBTyxTQUFTLFFBQVEsUUFBUTt3QkFDaEMsT0FBTyxTQUFTLEdBQUcsaUJBQWlCLFFBQVEsU0FBUzs7OztnQkFJN0QsU0FBUyxnQkFBZ0IsWUFBVztvQkFDaEMsR0FBRyxnREFBZ0QsWUFBVzt3QkFDMUQsSUFBSSxNQUFNLGtCQUFrQjt3QkFDNUIsT0FBTyxJQUFJLFFBQVEsUUFBUTt3QkFDM0IsT0FBTyxJQUFJLFFBQVEsT0FBTyxDQUFDLEdBQUc7d0JBQzlCLE9BQU8sSUFBSSxRQUFRLE9BQU8sQ0FBQyxHQUFHOzs7Ozs7R0FXdkMiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9tb2RlbC9NaXNzaW5nQWNjb3VudFNlbGVjdGlvbnNUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgYWNjZXNzUmVxdWVzdE1vZHVsZSBmcm9tICdhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RNb2R1bGUnO1xyXG5pbXBvcnQgJy4uL0FjY2Vzc1JlcXVlc3RUZXN0RGF0YSc7XHJcblxyXG5kZXNjcmliZSgnTWlzc2luZ0FjY291bnRTZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGRhdGEsIGFjY3RTZWwxLCBNaXNzaW5nQWNjb3VudFNlbGVjdGlvbnMsIG1pc3NpbmdTZWxlY3Rpb25zO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFjY2Vzc1JlcXVlc3RNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfTWlzc2luZ0FjY291bnRTZWxlY3Rpb25zXywgYWNjZXNzUmVxdWVzdFRlc3REYXRhKSB7XHJcbiAgICAgICAgTWlzc2luZ0FjY291bnRTZWxlY3Rpb25zID0gX01pc3NpbmdBY2NvdW50U2VsZWN0aW9uc187XHJcbiAgICAgICAgYWNjdFNlbDEgPSBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfQUNDVF9TRUxFQ1RJT04xO1xyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICcxJzogWyBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfQUNDVF9TRUxFQ1RJT04xIF0sXHJcbiAgICAgICAgICAgICcyJzogWyBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfQUNDVF9TRUxFQ1RJT04yIF1cclxuICAgICAgICB9O1xyXG4gICAgICAgIG1pc3NpbmdTZWxlY3Rpb25zID0gbmV3IE1pc3NpbmdBY2NvdW50U2VsZWN0aW9ucyhkYXRhKTtcclxuICAgIH0pKTtcclxuXHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG51bGwgZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBNaXNzaW5nQWNjb3VudFNlbGVjdGlvbnMobnVsbCk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlYWRzIGlkZW50aXR5IGFjY291bnQgc2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoT2JqZWN0LmtleXMobWlzc2luZ1NlbGVjdGlvbnMubWlzc2luZ1NlbGVjdGlvbnMpLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRBY2NvdW50U2VsZWN0aW9uc0Zvckl0ZW0oKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBmb3IgYW4gdW5rbm93biBpdGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChtaXNzaW5nU2VsZWN0aW9ucy5nZXRBY2NvdW50U2VsZWN0aW9uc0Zvckl0ZW0oJ25vdCBhbiBpZCcpKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGFjY291bnQgc2VsZWN0aW9ucyBmb3IgYW4gaXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYWNjdFNlbHMgPSBtaXNzaW5nU2VsZWN0aW9ucy5nZXRBY2NvdW50U2VsZWN0aW9uc0Zvckl0ZW0oJzEnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY3RTZWxzKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjdFNlbHMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjdFNlbHNbMF0uZ2V0SWRlbnRpdHlJZCgpKS50b0VxdWFsKGFjY3RTZWwxLmlkZW50aXR5SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldEl0ZW1JZHMoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIElEcyBmb3IgZWFjaCBpdGVtIG1pc3Npbmcgc2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaWRzID0gbWlzc2luZ1NlbGVjdGlvbnMuZ2V0SXRlbUlkcygpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRzLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkcy5pbmRleE9mKCcxJykgPiAtMSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRzLmluZGV4T2YoJzInKSA+IC0xKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
