System.register(['test/js/TestInitializer', 'common/identity/account/IdentityAccountModule'], function (_export) {
    'use strict';

    var accountModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityAccountIdentityAccountModule) {
            accountModule = _commonIdentityAccountIdentityAccountModule['default'];
        }],
        execute: function () {

            describe('Icon', function () {

                var Icon = undefined,
                    iconData = {
                    title: 'Invalid',
                    icon: '/images/icons/myGroup.png'
                };

                beforeEach(module(accountModule));

                beforeEach(inject(function (_Icon_) {
                    Icon = _Icon_;
                }));

                describe('constructor', function () {
                    it('should throw with no data', function () {
                        expect(function () {
                            return new Icon(null);
                        }).toThrow();
                    });

                    it('should initialize all properties', function () {
                        var icon = new Icon(iconData);
                        expect(icon.title).toEqual(iconData.title);
                        expect(icon.icon).toEqual(iconData.icon);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9hY2NvdW50L0ljb25UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsa0RBQWtELFVBQVUsU0FBUztJQUM3Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsNkNBQTZDO1lBQ25HLGdCQUFnQiw0Q0FBNEM7O1FBRWhFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxRQUFRLFlBQU07O2dCQUVuQixJQUFJLE9BQUk7b0JBQ0osV0FBVztvQkFDUCxPQUFPO29CQUNQLE1BQU07OztnQkFHZCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxRQUFXO29CQUMxQixPQUFPOzs7Z0JBR1gsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsNkJBQTZCLFlBQU07d0JBQ2xDLE9BQU8sWUFBQTs0QkFRUyxPQVJILElBQUksS0FBSzsyQkFBTzs7O29CQUdqQyxHQUFHLG9DQUFvQyxZQUFNO3dCQUN6QyxJQUFJLE9BQU8sSUFBSSxLQUFLO3dCQUNwQixPQUFPLEtBQUssT0FBTyxRQUFRLFNBQVM7d0JBQ3BDLE9BQU8sS0FBSyxNQUFNLFFBQVEsU0FBUzs7Ozs7O0dBZTVDIiwiZmlsZSI6ImNvbW1vbi9pZGVudGl0eS9hY2NvdW50L0ljb25UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgYWNjb3VudE1vZHVsZSBmcm9tICdjb21tb24vaWRlbnRpdHkvYWNjb3VudC9JZGVudGl0eUFjY291bnRNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0ljb24nLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IEljb24sXHJcbiAgICAgICAgaWNvbkRhdGEgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnSW52YWxpZCcsXHJcbiAgICAgICAgICAgIGljb246ICcvaW1hZ2VzL2ljb25zL215R3JvdXAucG5nJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjb3VudE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfSWNvbl8pID0+IHtcclxuICAgICAgICBJY29uID0gX0ljb25fO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcclxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gZGF0YScsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IG5ldyBJY29uKG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSBhbGwgcHJvcGVydGllcycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGljb24gPSBuZXcgSWNvbihpY29uRGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpY29uLnRpdGxlKS50b0VxdWFsKGljb25EYXRhLnRpdGxlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGljb24uaWNvbikudG9FcXVhbChpY29uRGF0YS5pY29uKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
