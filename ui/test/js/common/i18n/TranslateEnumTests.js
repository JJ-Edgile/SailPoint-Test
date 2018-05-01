System.register(['test/js/TestInitializer', 'common/i18n/i18nModule', 'test/js/common/i18n/MockTranslateFilter', 'common/i18n/TranslateEnum'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var i18nModule, TranslateEnum;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonI18nI18nModule) {
            i18nModule = _commonI18nI18nModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}, function (_commonI18nTranslateEnum) {
            TranslateEnum = _commonI18nTranslateEnum['default'];
        }],
        execute: function () {

            describe('TranslateEnum', function () {
                beforeEach(module(i18nModule));

                describe('constructor', function () {
                    it('throws with no data', function () {
                        expect(function () {
                            return new TranslateEnum();
                        }).toThrow();
                    });

                    it('throws with messageKeyMap property', function () {
                        var data = { messageKeyMap: new TranslateEnum.Value('whatever') };
                        expect(function () {
                            return new TranslateEnum(data);
                        }).toThrow();
                    });

                    it('throws with invalid value', function () {
                        var data = { something: 1234 };
                        expect(function () {
                            return new TranslateEnum(data);
                        }).toThrow();
                    });

                    it('sets the value to the property', function () {
                        var data = {
                            thing1: new TranslateEnum.Value('thing1', 'Thing 1'),
                            thing2: new TranslateEnum.Value('thing2', 'Thing 2')
                        },
                            test = new TranslateEnum(data);
                        expect(test.thing1).toEqual('thing1');
                        expect(test.thing2).toEqual('thing2');
                    });

                    it('sets the messageKey in the messageKeyMap', function () {
                        var data = {
                            thing1: new TranslateEnum.Value('thing1', 'Thing 1'),
                            thing2: new TranslateEnum.Value('thing2', 'Thing 2')
                        },
                            test = new TranslateEnum(data);
                        expect(test.messageKeyMap.get('thing1')).toEqual('Thing 1');
                        expect(test.messageKeyMap.get('thing2')).toEqual('Thing 2');
                    });
                });

                describe('getMessageKey', function () {
                    it('returns the passed in value if not in the map', function () {
                        var data = {
                            thing1: new TranslateEnum.Value('thing1', 'Thing 1'),
                            thing2: new TranslateEnum.Value('thing2', 'Thing 2')
                        },
                            test = new TranslateEnum(data);
                        expect(test.getMessageKey('whatever')).toEqual('whatever');
                    });

                    it('returns the message key if it is in the map', function () {
                        var data = {
                            thing1: new TranslateEnum.Value('thing1', 'Thing 1'),
                            thing2: new TranslateEnum.Value('thing2', 'Thing 2')
                        },
                            test = new TranslateEnum(data);
                        expect(test.getMessageKey('thing1')).toEqual('Thing 1');
                    });
                });

                describe('filter definition', function () {
                    var translateEnumTest = new TranslateEnum({
                        High: new TranslateEnum.Value('High', 'high_message'),
                        Low: new TranslateEnum.Value('Low', 'low_message')
                    }),
                        $filter = undefined;

                    // Create the filter on the module
                    angular.module(i18nModule).filter('translateEnumTest', translateEnumTest.getFilterDefinition());

                    beforeEach(inject(function (spTranslateFilter, _$filter_) {
                        $filter = _$filter_;

                        // Mock spTranslate to test localization
                        spTranslateFilter.configureCatalog({
                            'high_message': 'THIS IS HIGH',
                            'low_message': 'so low'
                        });
                    }));

                    it('can be used to create a filter definition that returns translated message key', function () {
                        expect($filter('translateEnumTest')(translateEnumTest.High)).toEqual('THIS IS HIGH');
                        expect($filter('translateEnumTest')(translateEnumTest.Low)).toEqual('so low');
                        // Not an enum, just keep same value
                        expect($filter('translateEnumTest')('None')).toEqual('None');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pMThuL1RyYW5zbGF0ZUVudW1UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMEJBQTBCLDJDQUEyQyw4QkFBOEIsVUFBVSxTQUFTOztJQUU5Sjs7SUFFQSxJQUFJLFlBQVk7SUFDaEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCO1dBQ3BDLFVBQVUsc0NBQXNDLElBQUksVUFBVSwwQkFBMEI7WUFDdkYsZ0JBQWdCLHlCQUF5Qjs7UUFFN0MsU0FBUyxZQUFZOztZQUo3QixTQUFTLGlCQUFpQixZQUFNO2dCQUM1QixXQUFXLE9BQU87O2dCQUVsQixTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyx1QkFBdUIsWUFBTTt3QkFDNUIsT0FBTyxZQUFBOzRCQU9TLE9BUEgsSUFBSTsyQkFBaUI7OztvQkFHdEMsR0FBRyxzQ0FBc0MsWUFBTTt3QkFDM0MsSUFBSSxPQUFPLEVBQUUsZUFBZSxJQUFJLGNBQWMsTUFBTTt3QkFDcEQsT0FBTyxZQUFBOzRCQVNTLE9BVEgsSUFBSSxjQUFjOzJCQUFPOzs7b0JBRzFDLEdBQUcsNkJBQTZCLFlBQU07d0JBQ2xDLElBQUksT0FBTyxFQUFFLFdBQVc7d0JBQ3hCLE9BQU8sWUFBQTs0QkFXUyxPQVhILElBQUksY0FBYzsyQkFBTzs7O29CQUcxQyxHQUFHLGtDQUFrQyxZQUFNO3dCQUN2QyxJQUFJLE9BQU87NEJBQ1AsUUFBUSxJQUFJLGNBQWMsTUFBTSxVQUFVOzRCQUMxQyxRQUFRLElBQUksY0FBYyxNQUFNLFVBQVU7OzRCQUMzQyxPQUFPLElBQUksY0FBYzt3QkFDNUIsT0FBTyxLQUFLLFFBQVEsUUFBUTt3QkFDNUIsT0FBTyxLQUFLLFFBQVEsUUFBUTs7O29CQUdoQyxHQUFHLDRDQUE0QyxZQUFNO3dCQUNqRCxJQUFJLE9BQU87NEJBQ1AsUUFBUSxJQUFJLGNBQWMsTUFBTSxVQUFVOzRCQUMxQyxRQUFRLElBQUksY0FBYyxNQUFNLFVBQVU7OzRCQUMzQyxPQUFPLElBQUksY0FBYzt3QkFDNUIsT0FBTyxLQUFLLGNBQWMsSUFBSSxXQUFXLFFBQVE7d0JBQ2pELE9BQU8sS0FBSyxjQUFjLElBQUksV0FBVyxRQUFROzs7O2dCQUl6RCxTQUFTLGlCQUFpQixZQUFNO29CQUM1QixHQUFHLGlEQUFpRCxZQUFNO3dCQUN0RCxJQUFJLE9BQU87NEJBQ1AsUUFBUSxJQUFJLGNBQWMsTUFBTSxVQUFVOzRCQUMxQyxRQUFRLElBQUksY0FBYyxNQUFNLFVBQVU7OzRCQUMzQyxPQUFPLElBQUksY0FBYzt3QkFDNUIsT0FBTyxLQUFLLGNBQWMsYUFBYSxRQUFROzs7b0JBR25ELEdBQUcsK0NBQStDLFlBQU07d0JBQ3BELElBQUksT0FBTzs0QkFDUCxRQUFRLElBQUksY0FBYyxNQUFNLFVBQVU7NEJBQzFDLFFBQVEsSUFBSSxjQUFjLE1BQU0sVUFBVTs7NEJBQzNDLE9BQU8sSUFBSSxjQUFjO3dCQUM1QixPQUFPLEtBQUssY0FBYyxXQUFXLFFBQVE7Ozs7Z0JBSXJELFNBQVMscUJBQXFCLFlBQU07b0JBQ2hDLElBQUksb0JBQW9CLElBQUksY0FBYzt3QkFDdEMsTUFBTSxJQUFJLGNBQWMsTUFBTSxRQUFRO3dCQUN0QyxLQUFLLElBQUksY0FBYyxNQUFNLE9BQU87O3dCQUNwQyxVQUFPOzs7b0JBR1gsUUFBUSxPQUFPLFlBQVksT0FBTyxxQkFBcUIsa0JBQWtCOztvQkFFekUsV0FBVyxPQUFPLFVBQUMsbUJBQW1CLFdBQWM7d0JBQ2hELFVBQVU7Ozt3QkFHVixrQkFBa0IsaUJBQWlCOzRCQUMvQixnQkFBZ0I7NEJBQ2hCLGVBQWU7Ozs7b0JBSXZCLEdBQUcsaUZBQWlGLFlBQU07d0JBQ3RGLE9BQU8sUUFBUSxxQkFBcUIsa0JBQWtCLE9BQU8sUUFBUTt3QkFDckUsT0FBTyxRQUFRLHFCQUFxQixrQkFBa0IsTUFBTSxRQUFROzt3QkFFcEUsT0FBTyxRQUFRLHFCQUFxQixTQUFTLFFBQVE7Ozs7OztHQXVCOUQiLCJmaWxlIjoiY29tbW9uL2kxOG4vVHJhbnNsYXRlRW51bVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpMThuTW9kdWxlIGZyb20gJ2NvbW1vbi9pMThuL2kxOG5Nb2R1bGUnO1xuaW1wb3J0ICd0ZXN0L2pzL2NvbW1vbi9pMThuL01vY2tUcmFuc2xhdGVGaWx0ZXInO1xuXG5pbXBvcnQgVHJhbnNsYXRlRW51bSBmcm9tICdjb21tb24vaTE4bi9UcmFuc2xhdGVFbnVtJztcblxuZGVzY3JpYmUoJ1RyYW5zbGF0ZUVudW0nLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaTE4bk1vZHVsZSkpO1xuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gZGF0YScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgVHJhbnNsYXRlRW51bSgpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBtZXNzYWdlS2V5TWFwIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7IG1lc3NhZ2VLZXlNYXA6IG5ldyBUcmFuc2xhdGVFbnVtLlZhbHVlKCd3aGF0ZXZlcicpfTtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgVHJhbnNsYXRlRW51bShkYXRhKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGhyb3dzIHdpdGggaW52YWxpZCB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0geyBzb21ldGhpbmc6IDEyMzQgfTtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgVHJhbnNsYXRlRW51bShkYXRhKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2V0cyB0aGUgdmFsdWUgdG8gdGhlIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgdGhpbmcxOiBuZXcgVHJhbnNsYXRlRW51bS5WYWx1ZSgndGhpbmcxJywgJ1RoaW5nIDEnKSxcbiAgICAgICAgICAgICAgICB0aGluZzI6IG5ldyBUcmFuc2xhdGVFbnVtLlZhbHVlKCd0aGluZzInLCAnVGhpbmcgMicpXG4gICAgICAgICAgICB9LCB0ZXN0ID0gbmV3IFRyYW5zbGF0ZUVudW0oZGF0YSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC50aGluZzEpLnRvRXF1YWwoJ3RoaW5nMScpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QudGhpbmcyKS50b0VxdWFsKCd0aGluZzInKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIG1lc3NhZ2VLZXkgaW4gdGhlIG1lc3NhZ2VLZXlNYXAnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICB0aGluZzE6IG5ldyBUcmFuc2xhdGVFbnVtLlZhbHVlKCd0aGluZzEnLCAnVGhpbmcgMScpLFxuICAgICAgICAgICAgICAgIHRoaW5nMjogbmV3IFRyYW5zbGF0ZUVudW0uVmFsdWUoJ3RoaW5nMicsICdUaGluZyAyJylcbiAgICAgICAgICAgIH0sIHRlc3QgPSBuZXcgVHJhbnNsYXRlRW51bShkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0Lm1lc3NhZ2VLZXlNYXAuZ2V0KCd0aGluZzEnKSkudG9FcXVhbCgnVGhpbmcgMScpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QubWVzc2FnZUtleU1hcC5nZXQoJ3RoaW5nMicpKS50b0VxdWFsKCdUaGluZyAyJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldE1lc3NhZ2VLZXknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBwYXNzZWQgaW4gdmFsdWUgaWYgbm90IGluIHRoZSBtYXAnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICB0aGluZzE6IG5ldyBUcmFuc2xhdGVFbnVtLlZhbHVlKCd0aGluZzEnLCAnVGhpbmcgMScpLFxuICAgICAgICAgICAgICAgIHRoaW5nMjogbmV3IFRyYW5zbGF0ZUVudW0uVmFsdWUoJ3RoaW5nMicsICdUaGluZyAyJylcbiAgICAgICAgICAgIH0sIHRlc3QgPSBuZXcgVHJhbnNsYXRlRW51bShkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmdldE1lc3NhZ2VLZXkoJ3doYXRldmVyJykpLnRvRXF1YWwoJ3doYXRldmVyJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBtZXNzYWdlIGtleSBpZiBpdCBpcyBpbiB0aGUgbWFwJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgdGhpbmcxOiBuZXcgVHJhbnNsYXRlRW51bS5WYWx1ZSgndGhpbmcxJywgJ1RoaW5nIDEnKSxcbiAgICAgICAgICAgICAgICB0aGluZzI6IG5ldyBUcmFuc2xhdGVFbnVtLlZhbHVlKCd0aGluZzInLCAnVGhpbmcgMicpXG4gICAgICAgICAgICB9LCB0ZXN0ID0gbmV3IFRyYW5zbGF0ZUVudW0oZGF0YSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5nZXRNZXNzYWdlS2V5KCd0aGluZzEnKSkudG9FcXVhbCgnVGhpbmcgMScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdmaWx0ZXIgZGVmaW5pdGlvbicsICgpID0+IHtcbiAgICAgICAgbGV0IHRyYW5zbGF0ZUVudW1UZXN0ID0gbmV3IFRyYW5zbGF0ZUVudW0oe1xuICAgICAgICAgICAgSGlnaDogbmV3IFRyYW5zbGF0ZUVudW0uVmFsdWUoJ0hpZ2gnLCAnaGlnaF9tZXNzYWdlJyksXG4gICAgICAgICAgICBMb3c6IG5ldyBUcmFuc2xhdGVFbnVtLlZhbHVlKCdMb3cnLCAnbG93X21lc3NhZ2UnKVxuICAgICAgICB9KSwgJGZpbHRlcjtcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGZpbHRlciBvbiB0aGUgbW9kdWxlXG4gICAgICAgIGFuZ3VsYXIubW9kdWxlKGkxOG5Nb2R1bGUpLmZpbHRlcigndHJhbnNsYXRlRW51bVRlc3QnLCB0cmFuc2xhdGVFbnVtVGVzdC5nZXRGaWx0ZXJEZWZpbml0aW9uKCkpO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChzcFRyYW5zbGF0ZUZpbHRlciwgXyRmaWx0ZXJfKSA9PiB7XG4gICAgICAgICAgICAkZmlsdGVyID0gXyRmaWx0ZXJfO1xuXG4gICAgICAgICAgICAvLyBNb2NrIHNwVHJhbnNsYXRlIHRvIHRlc3QgbG9jYWxpemF0aW9uXG4gICAgICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5jb25maWd1cmVDYXRhbG9nKHtcbiAgICAgICAgICAgICAgICAnaGlnaF9tZXNzYWdlJzogJ1RISVMgSVMgSElHSCcsXG4gICAgICAgICAgICAgICAgJ2xvd19tZXNzYWdlJzogJ3NvIGxvdydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ2NhbiBiZSB1c2VkIHRvIGNyZWF0ZSBhIGZpbHRlciBkZWZpbml0aW9uIHRoYXQgcmV0dXJucyB0cmFuc2xhdGVkIG1lc3NhZ2Uga2V5JywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCRmaWx0ZXIoJ3RyYW5zbGF0ZUVudW1UZXN0JykodHJhbnNsYXRlRW51bVRlc3QuSGlnaCkpLnRvRXF1YWwoJ1RISVMgSVMgSElHSCcpO1xuICAgICAgICAgICAgZXhwZWN0KCRmaWx0ZXIoJ3RyYW5zbGF0ZUVudW1UZXN0JykodHJhbnNsYXRlRW51bVRlc3QuTG93KSkudG9FcXVhbCgnc28gbG93Jyk7XG4gICAgICAgICAgICAvLyBOb3QgYW4gZW51bSwganVzdCBrZWVwIHNhbWUgdmFsdWVcbiAgICAgICAgICAgIGV4cGVjdCgkZmlsdGVyKCd0cmFuc2xhdGVFbnVtVGVzdCcpKCdOb25lJykpLnRvRXF1YWwoJ05vbmUnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
