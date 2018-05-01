System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', '../AccessRequestTestData'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the RemovedAccessItem model object.
             */
            describe('RemovedAccessItem', function () {

                var RemovedAccessItem = undefined,
                    removedRole = undefined;

                beforeEach(module(accessRequestModule));

                beforeEach(inject(function (_RemovedAccessItem_, CurrentAccessItem, accessRequestTestData) {
                    RemovedAccessItem = _RemovedAccessItem_;
                    removedRole = new RemovedAccessItem(new CurrentAccessItem(accessRequestTestData.CURRENT_ACCESS_ROLE));
                }));

                it('should throw with no item', function () {
                    expect(function () {
                        return new RemovedAccessItem();
                    }).toThrow();
                });

                describe('comments', function () {
                    it('should set the comments', function () {
                        var comments = 'whatever';
                        removedRole.setComment(comments);
                        expect(removedRole.comment).toEqual(comments);
                    });

                    it('should get the comments', function () {
                        var comments = 'whatever';
                        removedRole.comment = comments;
                        expect(removedRole.getComment()).toEqual(comments);
                    });

                    it('should say has comments or notes when there is a comment', function () {
                        removedRole.setComment('blah blah');
                        expect(removedRole.hasCommentsOrNotes()).toEqual(true);
                    });

                    it('should say no comments or notes when there is not a comment or note', function () {
                        expect(removedRole.hasCommentsOrNotes()).toEqual(false);
                    });
                });

                describe('getUniqueId()', function () {
                    it('calls through to CurrentAccessItem.getUniqueId', function () {
                        var uniqueId = 'whatever';
                        spyOn(removedRole.item, 'getUniqueId').and.returnValue(uniqueId);
                        expect(removedRole.getUniqueId()).toEqual(uniqueId);
                        expect(removedRole.item.getUniqueId).toHaveBeenCalled();
                    });
                });

                describe('sunset date', function () {
                    it('should set the sunset date', function () {
                        var date = new Date();
                        removedRole.setSunsetDate(date);
                        expect(removedRole.sunsetDate).toEqual(date);
                    });

                    it('should get the comments', function () {
                        var date = new Date();
                        removedRole.sunsetDate = date;
                        expect(removedRole.getSunsetDate()).toEqual(date);
                    });
                });

                describe('sunrise date', function () {
                    it('should always return undefined', function () {
                        expect(removedRole.getSunriseDate()).not.toBeDefined();
                        removedRole.setSunriseDate(new Date());
                        expect(removedRole.getSunriseDate()).not.toBeDefined();
                    });
                });

                it('should set and get sunset date', function () {
                    var sunset = new Date();
                    removedRole.setSunsetDate(sunset);
                    expect(removedRole.getSunsetDate()).toEqual(sunset);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvbW9kZWwvUmVtb3ZlZEFjY2Vzc0l0ZW1UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDZCQUE2QixVQUFVLFNBQVM7OztJQUc3SDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOzs7OztZQUQ3QixTQUFTLHFCQUFxQixZQUFNOztnQkFFaEMsSUFBSSxvQkFBaUI7b0JBQUUsY0FBVzs7Z0JBRWxDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLHFCQUFxQixtQkFBbUIsdUJBQTBCO29CQUNqRixvQkFBb0I7b0JBQ3BCLGNBQWMsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0Isc0JBQXNCOzs7Z0JBR3BGLEdBQUcsNkJBQTZCLFlBQU07b0JBQ2xDLE9BQU8sWUFBQTt3QkFRUyxPQVJILElBQUk7dUJBQXFCOzs7Z0JBRzFDLFNBQVMsWUFBWSxZQUFNO29CQUN2QixHQUFHLDJCQUEyQixZQUFNO3dCQUNoQyxJQUFJLFdBQVc7d0JBQ2YsWUFBWSxXQUFXO3dCQUN2QixPQUFPLFlBQVksU0FBUyxRQUFROzs7b0JBR3hDLEdBQUcsMkJBQTJCLFlBQU07d0JBQ2hDLElBQUksV0FBVzt3QkFDZixZQUFZLFVBQVU7d0JBQ3RCLE9BQU8sWUFBWSxjQUFjLFFBQVE7OztvQkFHN0MsR0FBRyw0REFBNEQsWUFBVzt3QkFDdEUsWUFBWSxXQUFXO3dCQUN2QixPQUFPLFlBQVksc0JBQXNCLFFBQVE7OztvQkFHckQsR0FBRyx1RUFBdUUsWUFBVzt3QkFDakYsT0FBTyxZQUFZLHNCQUFzQixRQUFROzs7O2dCQUl6RCxTQUFTLGlCQUFpQixZQUFNO29CQUM1QixHQUFHLGtEQUFrRCxZQUFNO3dCQUN2RCxJQUFJLFdBQVc7d0JBQ2YsTUFBTSxZQUFZLE1BQU0sZUFBZSxJQUFJLFlBQVk7d0JBQ3ZELE9BQU8sWUFBWSxlQUFlLFFBQVE7d0JBQzFDLE9BQU8sWUFBWSxLQUFLLGFBQWE7Ozs7Z0JBSTdDLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLDhCQUE4QixZQUFNO3dCQUNuQyxJQUFJLE9BQU8sSUFBSTt3QkFDZixZQUFZLGNBQWM7d0JBQzFCLE9BQU8sWUFBWSxZQUFZLFFBQVE7OztvQkFHM0MsR0FBRywyQkFBMkIsWUFBTTt3QkFDaEMsSUFBSSxPQUFPLElBQUk7d0JBQ2YsWUFBWSxhQUFhO3dCQUN6QixPQUFPLFlBQVksaUJBQWlCLFFBQVE7Ozs7Z0JBSXBELFNBQVMsZ0JBQWdCLFlBQU07b0JBQzNCLEdBQUcsa0NBQWtDLFlBQU07d0JBQ3ZDLE9BQU8sWUFBWSxrQkFBa0IsSUFBSTt3QkFDekMsWUFBWSxlQUFlLElBQUk7d0JBQy9CLE9BQU8sWUFBWSxrQkFBa0IsSUFBSTs7OztnQkFJakQsR0FBRyxrQ0FBa0MsWUFBVztvQkFDNUMsSUFBSSxTQUFTLElBQUk7b0JBQ2pCLFlBQVksY0FBYztvQkFDMUIsT0FBTyxZQUFZLGlCQUFpQixRQUFROzs7OztHQWNqRCIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L21vZGVsL1JlbW92ZWRBY2Nlc3NJdGVtVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWNjZXNzUmVxdWVzdE1vZHVsZSBmcm9tICdhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RNb2R1bGUnO1xuaW1wb3J0ICcuLi9BY2Nlc3NSZXF1ZXN0VGVzdERhdGEnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUmVtb3ZlZEFjY2Vzc0l0ZW0gbW9kZWwgb2JqZWN0LlxuICovXG5kZXNjcmliZSgnUmVtb3ZlZEFjY2Vzc0l0ZW0nLCAoKSA9PiB7XG5cbiAgICBsZXQgUmVtb3ZlZEFjY2Vzc0l0ZW0sIHJlbW92ZWRSb2xlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9SZW1vdmVkQWNjZXNzSXRlbV8sIEN1cnJlbnRBY2Nlc3NJdGVtLCBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEpID0+IHtcbiAgICAgICAgUmVtb3ZlZEFjY2Vzc0l0ZW0gPSBfUmVtb3ZlZEFjY2Vzc0l0ZW1fO1xuICAgICAgICByZW1vdmVkUm9sZSA9IG5ldyBSZW1vdmVkQWNjZXNzSXRlbShuZXcgQ3VycmVudEFjY2Vzc0l0ZW0oYWNjZXNzUmVxdWVzdFRlc3REYXRhLkNVUlJFTlRfQUNDRVNTX1JPTEUpKTtcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gaXRlbScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IG5ldyBSZW1vdmVkQWNjZXNzSXRlbSgpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY29tbWVudHMnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgc2V0IHRoZSBjb21tZW50cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb21tZW50cyA9ICd3aGF0ZXZlcic7XG4gICAgICAgICAgICByZW1vdmVkUm9sZS5zZXRDb21tZW50KGNvbW1lbnRzKTtcbiAgICAgICAgICAgIGV4cGVjdChyZW1vdmVkUm9sZS5jb21tZW50KS50b0VxdWFsKGNvbW1lbnRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGNvbW1lbnRzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbW1lbnRzID0gJ3doYXRldmVyJztcbiAgICAgICAgICAgIHJlbW92ZWRSb2xlLmNvbW1lbnQgPSBjb21tZW50cztcbiAgICAgICAgICAgIGV4cGVjdChyZW1vdmVkUm9sZS5nZXRDb21tZW50KCkpLnRvRXF1YWwoY29tbWVudHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNheSBoYXMgY29tbWVudHMgb3Igbm90ZXMgd2hlbiB0aGVyZSBpcyBhIGNvbW1lbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlbW92ZWRSb2xlLnNldENvbW1lbnQoJ2JsYWggYmxhaCcpO1xuICAgICAgICAgICAgZXhwZWN0KHJlbW92ZWRSb2xlLmhhc0NvbW1lbnRzT3JOb3RlcygpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNheSBubyBjb21tZW50cyBvciBub3RlcyB3aGVuIHRoZXJlIGlzIG5vdCBhIGNvbW1lbnQgb3Igbm90ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHJlbW92ZWRSb2xlLmhhc0NvbW1lbnRzT3JOb3RlcygpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0VW5pcXVlSWQoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gQ3VycmVudEFjY2Vzc0l0ZW0uZ2V0VW5pcXVlSWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdW5pcXVlSWQgPSAnd2hhdGV2ZXInO1xuICAgICAgICAgICAgc3B5T24ocmVtb3ZlZFJvbGUuaXRlbSwgJ2dldFVuaXF1ZUlkJykuYW5kLnJldHVyblZhbHVlKHVuaXF1ZUlkKTtcbiAgICAgICAgICAgIGV4cGVjdChyZW1vdmVkUm9sZS5nZXRVbmlxdWVJZCgpKS50b0VxdWFsKHVuaXF1ZUlkKTtcbiAgICAgICAgICAgIGV4cGVjdChyZW1vdmVkUm9sZS5pdGVtLmdldFVuaXF1ZUlkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N1bnNldCBkYXRlJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgc3Vuc2V0IGRhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICByZW1vdmVkUm9sZS5zZXRTdW5zZXREYXRlKGRhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KHJlbW92ZWRSb2xlLnN1bnNldERhdGUpLnRvRXF1YWwoZGF0ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZ2V0IHRoZSBjb21tZW50cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHJlbW92ZWRSb2xlLnN1bnNldERhdGUgPSBkYXRlO1xuICAgICAgICAgICAgZXhwZWN0KHJlbW92ZWRSb2xlLmdldFN1bnNldERhdGUoKSkudG9FcXVhbChkYXRlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3VucmlzZSBkYXRlJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGFsd2F5cyByZXR1cm4gdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KHJlbW92ZWRSb2xlLmdldFN1bnJpc2VEYXRlKCkpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgcmVtb3ZlZFJvbGUuc2V0U3VucmlzZURhdGUobmV3IERhdGUoKSk7XG4gICAgICAgICAgICBleHBlY3QocmVtb3ZlZFJvbGUuZ2V0U3VucmlzZURhdGUoKSkubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZXQgYW5kIGdldCBzdW5zZXQgZGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3Vuc2V0ID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmVtb3ZlZFJvbGUuc2V0U3Vuc2V0RGF0ZShzdW5zZXQpO1xuICAgICAgICBleHBlY3QocmVtb3ZlZFJvbGUuZ2V0U3Vuc2V0RGF0ZSgpKS50b0VxdWFsKHN1bnNldCk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
