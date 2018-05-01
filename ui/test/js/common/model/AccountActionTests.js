System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the AccountLink model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('AccountAction', function () {
                var action = 'unlock',
                    link = 'link1',
                    accountAction = undefined;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the PasswordLink class and create some data to test with.
                 */
                beforeEach(inject(function (AccountAction) {
                    accountAction = new AccountAction(action, link);
                }));

                it('should accept action and link on the constructor', function () {
                    expect(accountAction.getAction()).toEqual(action);
                    expect(accountAction.getLink()).toEqual(link);
                    expect(accountAction.getComment()).toBeUndefined();
                });

                it('should allow updating action', function () {
                    var newAction = 'disable';
                    accountAction.setAction(newAction);
                    expect(accountAction.getAction()).toEqual(newAction);
                });

                it('should allow updating the link', function () {
                    var newLink = 'link2';
                    accountAction.setLink(newLink);
                    expect(accountAction.getLink()).toEqual(newLink);
                });

                it('should allow updating the comment', function () {
                    var newComment = 'comments';
                    accountAction.setComment(newComment);
                    expect(accountAction.getComment()).toEqual(newComment);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9BY2NvdW50QWN0aW9uVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZCQUE2QixVQUFVLFNBQVM7Ozs7O0lBS3hGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7O1FBRTFDLFNBQVMsWUFBWTtZQU43QixTQUFTLGlCQUFpQixZQUFXO2dCQUNqQyxJQUFJLFNBQVM7b0JBQ1QsT0FBTztvQkFDUCxnQkFBYTs7O2dCQUdqQixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyxlQUFlO29CQUN0QyxnQkFBZ0IsSUFBSSxjQUFjLFFBQVE7OztnQkFHOUMsR0FBRyxvREFBb0QsWUFBVztvQkFDOUQsT0FBTyxjQUFjLGFBQWEsUUFBUTtvQkFDMUMsT0FBTyxjQUFjLFdBQVcsUUFBUTtvQkFDeEMsT0FBTyxjQUFjLGNBQWM7OztnQkFHdkMsR0FBRyxnQ0FBZ0MsWUFBVztvQkFDMUMsSUFBSSxZQUFZO29CQUNoQixjQUFjLFVBQVU7b0JBQ3hCLE9BQU8sY0FBYyxhQUFhLFFBQVE7OztnQkFHOUMsR0FBRyxrQ0FBa0MsWUFBVztvQkFDNUMsSUFBSSxVQUFVO29CQUNkLGNBQWMsUUFBUTtvQkFDdEIsT0FBTyxjQUFjLFdBQVcsUUFBUTs7O2dCQUc1QyxHQUFHLHFDQUFxQyxZQUFXO29CQUMvQyxJQUFJLGFBQWE7b0JBQ2pCLGNBQWMsV0FBVztvQkFDekIsT0FBTyxjQUFjLGNBQWMsUUFBUTs7Ozs7R0FZaEQiLCJmaWxlIjoiY29tbW9uL21vZGVsL0FjY291bnRBY3Rpb25UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgbW9kZWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGVsL01vZGVsTW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIEFjY291bnRMaW5rIG1vZGVsIG9iamVjdC5cclxuICovXHJcbmRlc2NyaWJlKCdBY2NvdW50QWN0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgYWN0aW9uID0gJ3VubG9jaycsXHJcbiAgICAgICAgbGluayA9ICdsaW5rMScsXHJcbiAgICAgICAgYWNjb3VudEFjdGlvbjtcclxuXHJcbiAgICAvLyBVc2UgdGhlIG1vZGVsIG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1vZGVsTW9kdWxlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCB0aGUgUGFzc3dvcmRMaW5rIGNsYXNzIGFuZCBjcmVhdGUgc29tZSBkYXRhIHRvIHRlc3Qgd2l0aC5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oQWNjb3VudEFjdGlvbikge1xyXG4gICAgICAgIGFjY291bnRBY3Rpb24gPSBuZXcgQWNjb3VudEFjdGlvbihhY3Rpb24sIGxpbmspO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGl0KCdzaG91bGQgYWNjZXB0IGFjdGlvbiBhbmQgbGluayBvbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoYWNjb3VudEFjdGlvbi5nZXRBY3Rpb24oKSkudG9FcXVhbChhY3Rpb24pO1xyXG4gICAgICAgIGV4cGVjdChhY2NvdW50QWN0aW9uLmdldExpbmsoKSkudG9FcXVhbChsaW5rKTtcclxuICAgICAgICBleHBlY3QoYWNjb3VudEFjdGlvbi5nZXRDb21tZW50KCkpLnRvQmVVbmRlZmluZWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgYWxsb3cgdXBkYXRpbmcgYWN0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IG5ld0FjdGlvbiA9ICdkaXNhYmxlJztcclxuICAgICAgICBhY2NvdW50QWN0aW9uLnNldEFjdGlvbihuZXdBY3Rpb24pO1xyXG4gICAgICAgIGV4cGVjdChhY2NvdW50QWN0aW9uLmdldEFjdGlvbigpKS50b0VxdWFsKG5ld0FjdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGFsbG93IHVwZGF0aW5nIHRoZSBsaW5rJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IG5ld0xpbmsgPSAnbGluazInO1xyXG4gICAgICAgIGFjY291bnRBY3Rpb24uc2V0TGluayhuZXdMaW5rKTtcclxuICAgICAgICBleHBlY3QoYWNjb3VudEFjdGlvbi5nZXRMaW5rKCkpLnRvRXF1YWwobmV3TGluayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGFsbG93IHVwZGF0aW5nIHRoZSBjb21tZW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IG5ld0NvbW1lbnQgPSAnY29tbWVudHMnO1xyXG4gICAgICAgIGFjY291bnRBY3Rpb24uc2V0Q29tbWVudChuZXdDb21tZW50KTtcclxuICAgICAgICBleHBlY3QoYWNjb3VudEFjdGlvbi5nZXRDb21tZW50KCkpLnRvRXF1YWwobmV3Q29tbWVudCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
