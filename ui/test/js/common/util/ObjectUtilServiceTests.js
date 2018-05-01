System.register(['test/js/TestInitializer', 'common/util/UtilModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {

            describe('objectUtilService', function () {
                var objectUtilService = undefined;

                beforeEach(module(utilModule));

                beforeEach(inject(function (_objectUtilService_) {
                    objectUtilService = _objectUtilService_;
                }));

                describe('getObjectValue()', function () {
                    it('gets the value if there is a getter on the object', function () {
                        var dataObject = {
                            getFoo: function () {
                                return 'bar';
                            }
                        };
                        expect(objectUtilService.getObjectValue(dataObject, 'foo')).toBe('bar');
                    });

                    it('handles undefined object key', function () {
                        var dataObject = {};

                        expect(objectUtilService.getObjectValue(dataObject, undefined)).toBeUndefined();
                    });

                    it('handles undefined object', function () {
                        expect(objectUtilService.getObjectValue(undefined, 'foo')).toBeUndefined();
                    });

                    it('doesn\'t blow up if the property doesn\'t exist', function () {
                        var dataObject = {
                            foo: 'bar'
                        };

                        expect(objectUtilService.getObjectValue(dataObject, 'foobar')).toBeUndefined();
                    });

                    it('gets the value if it is a property on the object', function () {
                        var dataObject = {
                            foo: 'bar'
                        };
                        expect(objectUtilService.getObjectValue(dataObject, 'foo')).toBe('bar');
                    });

                    it('can parse objectKey with dot notation and recurse into sub object properties', function () {
                        var dataObject = {
                            foo: 'bar',
                            subObject: {
                                propone: 'property1'
                            }
                        };
                        expect(objectUtilService.getObjectValue(dataObject, 'subObject.propone')).toBe('property1');
                    });

                    it('dot notation get doesn\'t blow up if property or sub object doesn\'t exist', function () {
                        var dataObject = {
                            foo: 'bar',
                            subObject: {
                                propone: 'property1'
                            }
                        };
                        expect(objectUtilService.getObjectValue(dataObject, 'sub.propone')).toBeUndefined();
                    });

                    it('gets the value if it is a property on the attributes of the object', function () {
                        var dataObject = {
                            attributes: {
                                foo: 'bar'
                            }
                        };
                        expect(objectUtilService.getObjectValue(dataObject, 'foo')).toBe('bar');
                    });
                });

                describe('valueEquals', function () {
                    it('returns true if values are equal', function () {
                        expect(objectUtilService.valueEquals('abc', 'abc')).toEqual(true);
                        expect(objectUtilService.valueEquals(123, 123)).toEqual(true);
                        expect(objectUtilService.valueEquals(undefined, undefined)).toEqual(true);
                        expect(objectUtilService.valueEquals(null, null)).toEqual(true);
                    });

                    it('returns true if one value is undefined and other value is null', function () {
                        expect(objectUtilService.valueEquals(undefined, null)).toEqual(true);
                        expect(objectUtilService.valueEquals(null, undefined)).toEqual(true);
                    });

                    it('returns false if values are not equal', function () {
                        expect(objectUtilService.valueEquals('abc', 'def')).toEqual(false);
                        expect(objectUtilService.valueEquals(123, 456)).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL09iamVjdFV0aWxTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7OztJQUd0Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMscUJBQXFCLFlBQU07Z0JBQ2hDLElBQUksb0JBQWlCOztnQkFFckIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMscUJBQXdCO29CQUN2QyxvQkFBb0I7OztnQkFHeEIsU0FBUyxvQkFBb0IsWUFBVztvQkFDcEMsR0FBRyxxREFBcUQsWUFBVzt3QkFDL0QsSUFBSSxhQUFhOzRCQUNiLFFBQVEsWUFBVztnQ0FDZixPQUFPOzs7d0JBR2YsT0FBTyxrQkFBa0IsZUFBZSxZQUFZLFFBQVEsS0FBSzs7O29CQUdyRSxHQUFHLGdDQUFnQyxZQUFNO3dCQUNyQyxJQUFJLGFBQWE7O3dCQUVqQixPQUFPLGtCQUFrQixlQUFlLFlBQVksWUFBWTs7O29CQUdwRSxHQUFHLDRCQUE0QixZQUFNO3dCQUNqQyxPQUFPLGtCQUFrQixlQUFlLFdBQVcsUUFBUTs7O29CQUcvRCxHQUFHLG1EQUFtRCxZQUFNO3dCQUN4RCxJQUFJLGFBQWE7NEJBQ2IsS0FBSzs7O3dCQUdULE9BQU8sa0JBQWtCLGVBQWUsWUFBWSxXQUFXOzs7b0JBR25FLEdBQUcsb0RBQW9ELFlBQVc7d0JBQzlELElBQUksYUFBYTs0QkFDYixLQUFLOzt3QkFFVCxPQUFPLGtCQUFrQixlQUFlLFlBQVksUUFBUSxLQUFLOzs7b0JBR3JFLEdBQUcsZ0ZBQWdGLFlBQVc7d0JBQzFGLElBQUksYUFBYTs0QkFDYixLQUFLOzRCQUNMLFdBQVc7Z0NBQ1AsU0FBUzs7O3dCQUdqQixPQUFPLGtCQUFrQixlQUFlLFlBQVksc0JBQXNCLEtBQUs7OztvQkFHbkYsR0FBRyw4RUFBOEUsWUFBVzt3QkFDeEYsSUFBSSxhQUFhOzRCQUNiLEtBQUs7NEJBQ0wsV0FBVztnQ0FDUCxTQUFTOzs7d0JBR2pCLE9BQU8sa0JBQWtCLGVBQWUsWUFBWSxnQkFBZ0I7OztvQkFHeEUsR0FBRyxzRUFBc0UsWUFBVzt3QkFDaEYsSUFBSSxhQUFhOzRCQUNiLFlBQVk7Z0NBQ1IsS0FBSzs7O3dCQUdiLE9BQU8sa0JBQWtCLGVBQWUsWUFBWSxRQUFRLEtBQUs7Ozs7Z0JBSXpFLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLG9DQUFvQyxZQUFNO3dCQUN6QyxPQUFPLGtCQUFrQixZQUFZLE9BQU8sUUFBUSxRQUFRO3dCQUM1RCxPQUFPLGtCQUFrQixZQUFZLEtBQUssTUFBTSxRQUFRO3dCQUN4RCxPQUFPLGtCQUFrQixZQUFZLFdBQVcsWUFBWSxRQUFRO3dCQUNwRSxPQUFPLGtCQUFrQixZQUFZLE1BQU0sT0FBTyxRQUFROzs7b0JBRzlELEdBQUcsa0VBQWtFLFlBQU07d0JBQ3ZFLE9BQU8sa0JBQWtCLFlBQVksV0FBVyxPQUFPLFFBQVE7d0JBQy9ELE9BQU8sa0JBQWtCLFlBQVksTUFBTSxZQUFZLFFBQVE7OztvQkFHbkUsR0FBRyx5Q0FBeUMsWUFBTTt3QkFDOUMsT0FBTyxrQkFBa0IsWUFBWSxPQUFPLFFBQVEsUUFBUTt3QkFDNUQsT0FBTyxrQkFBa0IsWUFBWSxLQUFLLE1BQU0sUUFBUTs7Ozs7O0dBYWpFIiwiZmlsZSI6ImNvbW1vbi91dGlsL09iamVjdFV0aWxTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdXRpbE1vZHVsZSBmcm9tICdjb21tb24vdXRpbC9VdGlsTW9kdWxlJztcblxuZGVzY3JpYmUoJ29iamVjdFV0aWxTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBvYmplY3RVdGlsU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHV0aWxNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfb2JqZWN0VXRpbFNlcnZpY2VfKSA9PiB7XG4gICAgICAgIG9iamVjdFV0aWxTZXJ2aWNlID0gX29iamVjdFV0aWxTZXJ2aWNlXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0T2JqZWN0VmFsdWUoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnZ2V0cyB0aGUgdmFsdWUgaWYgdGhlcmUgaXMgYSBnZXR0ZXIgb24gdGhlIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGFPYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgZ2V0Rm9vOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdiYXInO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3Qob2JqZWN0VXRpbFNlcnZpY2UuZ2V0T2JqZWN0VmFsdWUoZGF0YU9iamVjdCwgJ2ZvbycpKS50b0JlKCdiYXInKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2hhbmRsZXMgdW5kZWZpbmVkIG9iamVjdCBrZXknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YU9iamVjdCA9IHt9O1xuXG4gICAgICAgICAgICBleHBlY3Qob2JqZWN0VXRpbFNlcnZpY2UuZ2V0T2JqZWN0VmFsdWUoZGF0YU9iamVjdCwgdW5kZWZpbmVkKSkudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaGFuZGxlcyB1bmRlZmluZWQgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG9iamVjdFV0aWxTZXJ2aWNlLmdldE9iamVjdFZhbHVlKHVuZGVmaW5lZCwgJ2ZvbycpKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzblxcJ3QgYmxvdyB1cCBpZiB0aGUgcHJvcGVydHkgZG9lc25cXCd0IGV4aXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGFPYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXhwZWN0KG9iamVjdFV0aWxTZXJ2aWNlLmdldE9iamVjdFZhbHVlKGRhdGFPYmplY3QsICdmb29iYXInKSkudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZ2V0cyB0aGUgdmFsdWUgaWYgaXQgaXMgYSBwcm9wZXJ0eSBvbiB0aGUgb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGF0YU9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICBmb286ICdiYXInXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KG9iamVjdFV0aWxTZXJ2aWNlLmdldE9iamVjdFZhbHVlKGRhdGFPYmplY3QsICdmb28nKSkudG9CZSgnYmFyJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW4gcGFyc2Ugb2JqZWN0S2V5IHdpdGggZG90IG5vdGF0aW9uIGFuZCByZWN1cnNlIGludG8gc3ViIG9iamVjdCBwcm9wZXJ0aWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGF0YU9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICBmb286ICdiYXInLFxuICAgICAgICAgICAgICAgIHN1Yk9iamVjdDoge1xuICAgICAgICAgICAgICAgICAgICBwcm9wb25lOiAncHJvcGVydHkxJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3Qob2JqZWN0VXRpbFNlcnZpY2UuZ2V0T2JqZWN0VmFsdWUoZGF0YU9iamVjdCwgJ3N1Yk9iamVjdC5wcm9wb25lJykpLnRvQmUoJ3Byb3BlcnR5MScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG90IG5vdGF0aW9uIGdldCBkb2VzblxcJ3QgYmxvdyB1cCBpZiBwcm9wZXJ0eSBvciBzdWIgb2JqZWN0IGRvZXNuXFwndCBleGlzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGFPYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgZm9vOiAnYmFyJyxcbiAgICAgICAgICAgICAgICBzdWJPYmplY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcG9uZTogJ3Byb3BlcnR5MSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KG9iamVjdFV0aWxTZXJ2aWNlLmdldE9iamVjdFZhbHVlKGRhdGFPYmplY3QsICdzdWIucHJvcG9uZScpKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdnZXRzIHRoZSB2YWx1ZSBpZiBpdCBpcyBhIHByb3BlcnR5IG9uIHRoZSBhdHRyaWJ1dGVzIG9mIHRoZSBvYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3Qob2JqZWN0VXRpbFNlcnZpY2UuZ2V0T2JqZWN0VmFsdWUoZGF0YU9iamVjdCwgJ2ZvbycpKS50b0JlKCdiYXInKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndmFsdWVFcXVhbHMnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdmFsdWVzIGFyZSBlcXVhbCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChvYmplY3RVdGlsU2VydmljZS52YWx1ZUVxdWFscygnYWJjJywgJ2FiYycpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KG9iamVjdFV0aWxTZXJ2aWNlLnZhbHVlRXF1YWxzKDEyMywgMTIzKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChvYmplY3RVdGlsU2VydmljZS52YWx1ZUVxdWFscyh1bmRlZmluZWQsIHVuZGVmaW5lZCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3Qob2JqZWN0VXRpbFNlcnZpY2UudmFsdWVFcXVhbHMobnVsbCwgbnVsbCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgb25lIHZhbHVlIGlzIHVuZGVmaW5lZCBhbmQgb3RoZXIgdmFsdWUgaXMgbnVsbCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChvYmplY3RVdGlsU2VydmljZS52YWx1ZUVxdWFscyh1bmRlZmluZWQsIG51bGwpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KG9iamVjdFV0aWxTZXJ2aWNlLnZhbHVlRXF1YWxzKG51bGwsIHVuZGVmaW5lZCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHZhbHVlcyBhcmUgbm90IGVxdWFsJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG9iamVjdFV0aWxTZXJ2aWNlLnZhbHVlRXF1YWxzKCdhYmMnLCAnZGVmJykpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KG9iamVjdFV0aWxTZXJ2aWNlLnZhbHVlRXF1YWxzKDEyMywgNDU2KSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
