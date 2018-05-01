System.register(['test/js/TestInitializer', 'common/util/UtilModule'], function (_export) {
    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {

            describe('SpMessage', function () {
                var SpMessage,
                    translateSpy,
                    key = 'someMsg',
                    args = ['splat!', 'thunk!'];

                beforeEach(module(utilModule));

                /* Mock spTranslate so we can observe the arguments */
                beforeEach(module(function ($provide) {
                    translateSpy = jasmine.createSpy().and.callFake(function (msg, arg1, arg2) {
                        var translated = msg;
                        if (arg1) {
                            translated += arg1;
                        }
                        if (arg2) {
                            translated += arg2;
                        }
                        return translated;
                    });
                    $provide.value('spTranslateFilter', translateSpy);
                }));

                beforeEach(inject(function (_SpMessage_) {
                    SpMessage = _SpMessage_;
                }));

                describe('constructor', function () {
                    it('blows up with no message', function () {
                        expect(function () {
                            new SpMessage(SpMessage.ERROR, null, null, false);
                        }).toThrow();
                    });

                    it('blows up with a bad status', function () {
                        expect(function () {
                            new SpMessage('blurgff!', key, null, false);
                        }).toThrow();
                    });

                    it('defaults status to SUCCESS', function () {
                        var msg = new SpMessage(null, key, null, false);
                        expect(msg.status).toEqual(SpMessage.SUCCESS);
                    });

                    it('defaults dismissable to false', function () {
                        var msg = new SpMessage(SpMessage.ERROR, key, null);
                        expect(msg.dismissable).toEqual(false);
                    });

                    it('initializes data correctly', function () {
                        var msg = new SpMessage(SpMessage.ERROR, key, args, true, 'Error');
                        expect(msg.status).toEqual(SpMessage.ERROR);
                        expect(msg.messageOrKey).toEqual(key);
                        expect(msg.args).toEqual(args);
                        expect(msg.dismissable).toEqual(true);
                        expect(msg.type).toEqual('Error');
                    });
                });

                describe('createFromDTO()', function () {
                    it('blows up with no message', function () {
                        expect(function () {
                            SpMessage.createFromDTO({
                                status: SpMessage.ERROR
                            });
                        }).toThrow();
                    });

                    it('blows up with a bad status', function () {
                        expect(function () {
                            SpMessage.createFromDTO({
                                messageOrKey: key,
                                status: 'urrghhghghhghg'
                            });
                        }).toThrow();
                    });

                    it('defaults status to SUCCESS', function () {
                        var msg = SpMessage.createFromDTO({
                            messageOrKey: key
                        });
                        expect(msg.status).toEqual(SpMessage.SUCCESS);
                    });

                    it('defaults dismissable to false', function () {
                        var msg = SpMessage.createFromDTO({
                            messageOrKey: key
                        });
                        expect(msg.dismissable).toEqual(false);
                    });

                    it('initializes data correctly', function () {
                        var msg = SpMessage.createFromDTO({
                            messageOrKey: key,
                            status: SpMessage.ERROR,
                            args: args,
                            dismissable: true,
                            type: 'Error'
                        });
                        expect(msg.status).toEqual(SpMessage.ERROR);
                        expect(msg.messageOrKey).toEqual(key);
                        expect(msg.args).toEqual(args);
                        expect(msg.dismissable).toEqual(true);
                        expect(msg.type).toEqual('Error');
                    });
                });

                describe('isError()', function () {
                    it('returns true if status is ERROR', function () {
                        var msg = new SpMessage(SpMessage.ERROR, key, null, false, SpMessage.ERROR);
                        expect(msg.isError()).toEqual(true);
                    });

                    it('returns false for non-ERROR statuses', function () {
                        var msg = new SpMessage(SpMessage.SUCCESS, key, null, false, SpMessage.Info);
                        expect(msg.isError()).toEqual(false);
                    });
                });

                describe('render()', function () {
                    it('calls translate with only message key if no arguments', function () {
                        var msg = new SpMessage(null, key, null, false);
                        msg.render();
                        expect(translateSpy).toHaveBeenCalledWith(key);
                    });

                    it('calls translate message key and arguments if available', function () {
                        var msg = new SpMessage(null, key, args, false);
                        msg.render();
                        expect(translateSpy).toHaveBeenCalledWith(key, args[0], args[1]);
                    });

                    it('returns the translated message', function () {
                        var msg = new SpMessage(null, key, args, false),
                            rendered = msg.render();
                        expect(rendered).toEqual('someMsgsplat!thunk!');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL1NwTWVzc2FnZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsVUFBVSxTQUFTO0lBQTFGOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7O1FBRXZDLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyxhQUFhLFlBQVc7Z0JBQzdCLElBQUk7b0JBQVc7b0JBQ1gsTUFBTTtvQkFDTixPQUFPLENBQUUsVUFBVTs7Z0JBRXZCLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxlQUFlLFFBQVEsWUFBWSxJQUFJLFNBQVMsVUFBUyxLQUFLLE1BQU0sTUFBTTt3QkFDdEUsSUFBSSxhQUFhO3dCQUNqQixJQUFJLE1BQU07NEJBQ04sY0FBYzs7d0JBRWxCLElBQUksTUFBTTs0QkFDTixjQUFjOzt3QkFFbEIsT0FBTzs7b0JBRVgsU0FBUyxNQUFNLHFCQUFxQjs7O2dCQUd4QyxXQUFXLE9BQU8sVUFBUyxhQUFhO29CQUNwQyxZQUFZOzs7Z0JBR2hCLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLDRCQUE0QixZQUFXO3dCQUN0QyxPQUFPLFlBQVc7NEJBQUUsSUFBSSxVQUFVLFVBQVUsT0FBTyxNQUFNLE1BQU07MkJBQVc7OztvQkFHOUUsR0FBRyw4QkFBOEIsWUFBVzt3QkFDeEMsT0FBTyxZQUFXOzRCQUFFLElBQUksVUFBVSxZQUFZLEtBQUssTUFBTTsyQkFBVzs7O29CQUd4RSxHQUFHLDhCQUE4QixZQUFXO3dCQUN4QyxJQUFJLE1BQU0sSUFBSSxVQUFVLE1BQU0sS0FBSyxNQUFNO3dCQUN6QyxPQUFPLElBQUksUUFBUSxRQUFRLFVBQVU7OztvQkFHekMsR0FBRyxpQ0FBaUMsWUFBVzt3QkFDM0MsSUFBSSxNQUFNLElBQUksVUFBVSxVQUFVLE9BQU8sS0FBSzt3QkFDOUMsT0FBTyxJQUFJLGFBQWEsUUFBUTs7O29CQUdwQyxHQUFHLDhCQUE4QixZQUFXO3dCQUN4QyxJQUFJLE1BQU0sSUFBSSxVQUFVLFVBQVUsT0FBTyxLQUFLLE1BQU0sTUFBTTt3QkFDMUQsT0FBTyxJQUFJLFFBQVEsUUFBUSxVQUFVO3dCQUNyQyxPQUFPLElBQUksY0FBYyxRQUFRO3dCQUNqQyxPQUFPLElBQUksTUFBTSxRQUFRO3dCQUN6QixPQUFPLElBQUksYUFBYSxRQUFRO3dCQUNoQyxPQUFPLElBQUksTUFBTSxRQUFROzs7O2dCQUlqQyxTQUFTLG1CQUFtQixZQUFXO29CQUNuQyxHQUFHLDRCQUE0QixZQUFXO3dCQUN0QyxPQUNJLFlBQVc7NEJBQ1AsVUFBVSxjQUFjO2dDQUNwQixRQUFRLFVBQVU7OzJCQUV2Qjs7O29CQUdYLEdBQUcsOEJBQThCLFlBQVc7d0JBQ3hDLE9BQ0ksWUFBVzs0QkFDUCxVQUFVLGNBQWM7Z0NBQ3BCLGNBQWM7Z0NBQ2QsUUFBUTs7MkJBRWI7OztvQkFHWCxHQUFHLDhCQUE4QixZQUFXO3dCQUN4QyxJQUFJLE1BQU0sVUFBVSxjQUFjOzRCQUM5QixjQUFjOzt3QkFFbEIsT0FBTyxJQUFJLFFBQVEsUUFBUSxVQUFVOzs7b0JBR3pDLEdBQUcsaUNBQWlDLFlBQVc7d0JBQzNDLElBQUksTUFBTSxVQUFVLGNBQWM7NEJBQzlCLGNBQWM7O3dCQUVsQixPQUFPLElBQUksYUFBYSxRQUFROzs7b0JBR3BDLEdBQUcsOEJBQThCLFlBQVc7d0JBQ3hDLElBQUksTUFBTSxVQUFVLGNBQWM7NEJBQzlCLGNBQWM7NEJBQ2QsUUFBUSxVQUFVOzRCQUNsQixNQUFNOzRCQUNOLGFBQWE7NEJBQ2IsTUFBTTs7d0JBRVYsT0FBTyxJQUFJLFFBQVEsUUFBUSxVQUFVO3dCQUNyQyxPQUFPLElBQUksY0FBYyxRQUFRO3dCQUNqQyxPQUFPLElBQUksTUFBTSxRQUFRO3dCQUN6QixPQUFPLElBQUksYUFBYSxRQUFRO3dCQUNoQyxPQUFPLElBQUksTUFBTSxRQUFROzs7O2dCQUlqQyxTQUFTLGFBQWEsWUFBVztvQkFDN0IsR0FBRyxtQ0FBbUMsWUFBVzt3QkFDN0MsSUFBSSxNQUFNLElBQUksVUFBVSxVQUFVLE9BQU8sS0FBSyxNQUFNLE9BQU8sVUFBVTt3QkFDckUsT0FBTyxJQUFJLFdBQVcsUUFBUTs7O29CQUdsQyxHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxJQUFJLE1BQU0sSUFBSSxVQUFVLFVBQVUsU0FBUyxLQUFLLE1BQU0sT0FBTyxVQUFVO3dCQUN2RSxPQUFPLElBQUksV0FBVyxRQUFROzs7O2dCQUl0QyxTQUFTLFlBQVksWUFBVztvQkFDNUIsR0FBRyx5REFBeUQsWUFBVzt3QkFDbkUsSUFBSSxNQUFNLElBQUksVUFBVSxNQUFNLEtBQUssTUFBTTt3QkFDekMsSUFBSTt3QkFDSixPQUFPLGNBQWMscUJBQXFCOzs7b0JBRzlDLEdBQUcsMERBQTBELFlBQVc7d0JBQ3BFLElBQUksTUFBTSxJQUFJLFVBQVUsTUFBTSxLQUFLLE1BQU07d0JBQ3pDLElBQUk7d0JBQ0osT0FBTyxjQUFjLHFCQUFxQixLQUFLLEtBQUssSUFBSSxLQUFLOzs7b0JBR2pFLEdBQUcsa0NBQWtDLFlBQVc7d0JBQzVDLElBQUksTUFBTSxJQUFJLFVBQVUsTUFBTSxLQUFLLE1BQU07NEJBQ3JDLFdBQVcsSUFBSTt3QkFDbkIsT0FBTyxVQUFVLFFBQVE7Ozs7OztHQWNsQyIsImZpbGUiOiJjb21tb24vdXRpbC9TcE1lc3NhZ2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgdXRpbE1vZHVsZSBmcm9tICdjb21tb24vdXRpbC9VdGlsTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdTcE1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBTcE1lc3NhZ2UsIHRyYW5zbGF0ZVNweSxcclxuICAgICAgICBrZXkgPSAnc29tZU1zZycsXHJcbiAgICAgICAgYXJncyA9IFsgJ3NwbGF0IScsICd0aHVuayEnIF07XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodXRpbE1vZHVsZSkpO1xyXG5cclxuICAgIC8qIE1vY2sgc3BUcmFuc2xhdGUgc28gd2UgY2FuIG9ic2VydmUgdGhlIGFyZ3VtZW50cyAqL1xyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcclxuICAgICAgICB0cmFuc2xhdGVTcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZShmdW5jdGlvbihtc2csIGFyZzEsIGFyZzIpIHtcclxuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZWQgPSBtc2c7XHJcbiAgICAgICAgICAgIGlmIChhcmcxKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkICs9IGFyZzE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFyZzIpIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQgKz0gYXJnMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNsYXRlZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkcHJvdmlkZS52YWx1ZSgnc3BUcmFuc2xhdGVGaWx0ZXInLCB0cmFuc2xhdGVTcHkpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9TcE1lc3NhZ2VfKSB7XHJcbiAgICAgICAgU3BNZXNzYWdlID0gX1NwTWVzc2FnZV87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ2Jsb3dzIHVwIHdpdGggbm8gbWVzc2FnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBTcE1lc3NhZ2UoU3BNZXNzYWdlLkVSUk9SLCBudWxsLCBudWxsLCBmYWxzZSk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2Jsb3dzIHVwIHdpdGggYSBiYWQgc3RhdHVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFNwTWVzc2FnZSgnYmx1cmdmZiEnLCBrZXksIG51bGwsIGZhbHNlKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZGVmYXVsdHMgc3RhdHVzIHRvIFNVQ0NFU1MnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1zZyA9IG5ldyBTcE1lc3NhZ2UobnVsbCwga2V5LCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtc2cuc3RhdHVzKS50b0VxdWFsKFNwTWVzc2FnZS5TVUNDRVNTKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RlZmF1bHRzIGRpc21pc3NhYmxlIHRvIGZhbHNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBtc2cgPSBuZXcgU3BNZXNzYWdlKFNwTWVzc2FnZS5FUlJPUiwga2V5LCBudWxsKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1zZy5kaXNtaXNzYWJsZSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpbml0aWFsaXplcyBkYXRhIGNvcnJlY3RseScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbXNnID0gbmV3IFNwTWVzc2FnZShTcE1lc3NhZ2UuRVJST1IsIGtleSwgYXJncywgdHJ1ZSwgJ0Vycm9yJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtc2cuc3RhdHVzKS50b0VxdWFsKFNwTWVzc2FnZS5FUlJPUik7XHJcbiAgICAgICAgICAgIGV4cGVjdChtc2cubWVzc2FnZU9yS2V5KS50b0VxdWFsKGtleSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtc2cuYXJncykudG9FcXVhbChhcmdzKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1zZy5kaXNtaXNzYWJsZSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1zZy50eXBlKS50b0VxdWFsKCdFcnJvcicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NyZWF0ZUZyb21EVE8oKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdibG93cyB1cCB3aXRoIG5vIG1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3BNZXNzYWdlLmNyZWF0ZUZyb21EVE8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFNwTWVzc2FnZS5FUlJPUlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYmxvd3MgdXAgd2l0aCBhIGJhZCBzdGF0dXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3BNZXNzYWdlLmNyZWF0ZUZyb21EVE8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlT3JLZXk6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAndXJyZ2hoZ2hnaGhnaGcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkZWZhdWx0cyBzdGF0dXMgdG8gU1VDQ0VTUycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbXNnID0gU3BNZXNzYWdlLmNyZWF0ZUZyb21EVE8oe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZU9yS2V5OiBrZXlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtc2cuc3RhdHVzKS50b0VxdWFsKFNwTWVzc2FnZS5TVUNDRVNTKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RlZmF1bHRzIGRpc21pc3NhYmxlIHRvIGZhbHNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBtc2cgPSBTcE1lc3NhZ2UuY3JlYXRlRnJvbURUTyh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlT3JLZXk6IGtleVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZXhwZWN0KG1zZy5kaXNtaXNzYWJsZSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpbml0aWFsaXplcyBkYXRhIGNvcnJlY3RseScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbXNnID0gU3BNZXNzYWdlLmNyZWF0ZUZyb21EVE8oe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZU9yS2V5OiBrZXksXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFNwTWVzc2FnZS5FUlJPUixcclxuICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3MsXHJcbiAgICAgICAgICAgICAgICBkaXNtaXNzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdFcnJvcidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtc2cuc3RhdHVzKS50b0VxdWFsKFNwTWVzc2FnZS5FUlJPUik7XHJcbiAgICAgICAgICAgIGV4cGVjdChtc2cubWVzc2FnZU9yS2V5KS50b0VxdWFsKGtleSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtc2cuYXJncykudG9FcXVhbChhcmdzKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1zZy5kaXNtaXNzYWJsZSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1zZy50eXBlKS50b0VxdWFsKCdFcnJvcicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzRXJyb3IoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgc3RhdHVzIGlzIEVSUk9SJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBtc2cgPSBuZXcgU3BNZXNzYWdlKFNwTWVzc2FnZS5FUlJPUiwga2V5LCBudWxsLCBmYWxzZSwgU3BNZXNzYWdlLkVSUk9SKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1zZy5pc0Vycm9yKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBub24tRVJST1Igc3RhdHVzZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1zZyA9IG5ldyBTcE1lc3NhZ2UoU3BNZXNzYWdlLlNVQ0NFU1MsIGtleSwgbnVsbCwgZmFsc2UsIFNwTWVzc2FnZS5JbmZvKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1zZy5pc0Vycm9yKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3JlbmRlcigpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ2NhbGxzIHRyYW5zbGF0ZSB3aXRoIG9ubHkgbWVzc2FnZSBrZXkgaWYgbm8gYXJndW1lbnRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBtc2cgPSBuZXcgU3BNZXNzYWdlKG51bGwsIGtleSwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBtc2cucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0cmFuc2xhdGVTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGtleSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyB0cmFuc2xhdGUgbWVzc2FnZSBrZXkgYW5kIGFyZ3VtZW50cyBpZiBhdmFpbGFibGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1zZyA9IG5ldyBTcE1lc3NhZ2UobnVsbCwga2V5LCBhcmdzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIG1zZy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRyYW5zbGF0ZVNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoa2V5LCBhcmdzWzBdLCBhcmdzWzFdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIHRyYW5zbGF0ZWQgbWVzc2FnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbXNnID0gbmV3IFNwTWVzc2FnZShudWxsLCBrZXksIGFyZ3MsIGZhbHNlKSxcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVkID0gbXNnLnJlbmRlcigpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVuZGVyZWQpLnRvRXF1YWwoJ3NvbWVNc2dzcGxhdCF0aHVuayEnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
