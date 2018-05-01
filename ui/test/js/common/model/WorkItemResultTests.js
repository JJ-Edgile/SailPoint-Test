System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {

            describe('WorkItemResult', function () {
                var WorkItemResult,
                    SpMessage,
                    workItemId = '123',
                    workItemType = 'Approval',
                    returnPage = 'theLastPage',
                    messages = [{
                    status: 'ERROR',
                    messageOrKey: 'another one bites the dust'
                }];

                beforeEach(module(modelModule));

                beforeEach(inject(function (_WorkItemResult_, _SpMessage_) {
                    WorkItemResult = _WorkItemResult_;
                    SpMessage = _SpMessage_;
                }));

                it('initializes data with constructor', function () {
                    var result = new WorkItemResult({
                        nextWorkItemId: workItemId,
                        nextWorkItemType: workItemType,
                        cancelled: true,
                        returnPage: returnPage,
                        messages: messages
                    });

                    expect(result.nextWorkItemId).toEqual(workItemId);
                    expect(result.nextWorkItemType).toEqual(workItemType);
                    expect(result.cancelled).toEqual(true);
                    expect(result.returnPage).toEqual(returnPage);
                    expect(result.messages.length).toEqual(1);
                    expect(result.messages[0].status).toEqual(messages[0].status);
                    expect(result.messages[0].messageOrKey).toEqual(messages[0].messageOrKey);
                });

                describe('hasNextWorkItem()', function () {
                    it('returns true if there is a work item ID', function () {
                        var result = new WorkItemResult({
                            nextWorkItemId: workItemId
                        });
                        expect(result.hasNextWorkItem()).toEqual(true);
                    });

                    it('returns true if there is a work item type', function () {
                        var result = new WorkItemResult({
                            nextWorkItemType: 'Form'
                        });
                        expect(result.hasNextWorkItem()).toEqual(true);
                    });

                    it('returns false if there is not a work item ID or type', function () {
                        var result = new WorkItemResult({});
                        expect(result.hasNextWorkItem()).toEqual(false);
                    });
                });

                it('addError() adds a message', function () {
                    var result = new WorkItemResult({}),
                        key = 'yoMama!',
                        args = ['123', '234'];
                    result.addError(key, args);
                    expect(result.messages.length).toEqual(1);
                    expect(result.messages[0].status).toEqual(SpMessage.ERROR);
                    expect(result.messages[0].messageOrKey).toEqual(key);
                    expect(result.messages[0].args).toEqual(args);
                });

                describe('isSuccess()', function () {
                    it('returns true if there are no messages', function () {
                        var result = new WorkItemResult({});
                        expect(result.isSuccess()).toEqual(true);
                    });

                    it('returns true if there are no errors', function () {
                        var result = new WorkItemResult({
                            messages: [{
                                status: SpMessage.SUCCESS,
                                messageOrKey: 'ojfflkjf'
                            }]
                        });
                        expect(result.isSuccess()).toEqual(true);
                    });

                    it('returns false if there are errors', function () {
                        var result = new WorkItemResult({
                            messages: [{
                                status: SpMessage.SUCCESS,
                                messageOrKey: 'no prob bob'
                            }, {
                                status: SpMessage.ERROR,
                                messageOrKey: 'boom!'
                            }]
                        });
                        expect(result.isSuccess()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9Xb3JrSXRlbVJlc3VsdFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw2QkFBNkIsVUFBVSxTQUFTO0lBQTVGOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7O1FBRTFDLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyxrQkFBa0IsWUFBVztnQkFDbEMsSUFBSTtvQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixhQUFhO29CQUNiLFdBQVcsQ0FBQztvQkFDUixRQUFRO29CQUNSLGNBQWM7OztnQkFHdEIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsa0JBQWtCLGFBQWE7b0JBQ3RELGlCQUFpQjtvQkFDakIsWUFBWTs7O2dCQUloQixHQUFHLHFDQUFxQyxZQUFXO29CQUMvQyxJQUFJLFNBQVMsSUFBSSxlQUFlO3dCQUM1QixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLFVBQVU7OztvQkFHZCxPQUFPLE9BQU8sZ0JBQWdCLFFBQVE7b0JBQ3RDLE9BQU8sT0FBTyxrQkFBa0IsUUFBUTtvQkFDeEMsT0FBTyxPQUFPLFdBQVcsUUFBUTtvQkFDakMsT0FBTyxPQUFPLFlBQVksUUFBUTtvQkFDbEMsT0FBTyxPQUFPLFNBQVMsUUFBUSxRQUFRO29CQUN2QyxPQUFPLE9BQU8sU0FBUyxHQUFHLFFBQVEsUUFBUSxTQUFTLEdBQUc7b0JBQ3RELE9BQU8sT0FBTyxTQUFTLEdBQUcsY0FBYyxRQUFRLFNBQVMsR0FBRzs7O2dCQUdoRSxTQUFTLHFCQUFxQixZQUFXO29CQUNyQyxHQUFHLDJDQUEyQyxZQUFXO3dCQUNyRCxJQUFJLFNBQVMsSUFBSSxlQUFlOzRCQUM1QixnQkFBZ0I7O3dCQUVwQixPQUFPLE9BQU8sbUJBQW1CLFFBQVE7OztvQkFHN0MsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsSUFBSSxTQUFTLElBQUksZUFBZTs0QkFDNUIsa0JBQWtCOzt3QkFFdEIsT0FBTyxPQUFPLG1CQUFtQixRQUFROzs7b0JBRzdDLEdBQUcsd0RBQXdELFlBQVc7d0JBQ2xFLElBQUksU0FBUyxJQUFJLGVBQWU7d0JBQ2hDLE9BQU8sT0FBTyxtQkFBbUIsUUFBUTs7OztnQkFJakQsR0FBRyw2QkFBNkIsWUFBVztvQkFDdkMsSUFBSSxTQUFTLElBQUksZUFBZTt3QkFDNUIsTUFBTTt3QkFDTixPQUFPLENBQUUsT0FBTztvQkFDcEIsT0FBTyxTQUFTLEtBQUs7b0JBQ3JCLE9BQU8sT0FBTyxTQUFTLFFBQVEsUUFBUTtvQkFDdkMsT0FBTyxPQUFPLFNBQVMsR0FBRyxRQUFRLFFBQVEsVUFBVTtvQkFDcEQsT0FBTyxPQUFPLFNBQVMsR0FBRyxjQUFjLFFBQVE7b0JBQ2hELE9BQU8sT0FBTyxTQUFTLEdBQUcsTUFBTSxRQUFROzs7Z0JBRzVDLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLHlDQUF5QyxZQUFXO3dCQUNuRCxJQUFJLFNBQVMsSUFBSSxlQUFlO3dCQUNoQyxPQUFPLE9BQU8sYUFBYSxRQUFROzs7b0JBR3ZDLEdBQUcsdUNBQXVDLFlBQVc7d0JBQ2pELElBQUksU0FBUyxJQUFJLGVBQWU7NEJBQzVCLFVBQVUsQ0FBQztnQ0FDUCxRQUFRLFVBQVU7Z0NBQ2xCLGNBQWM7Ozt3QkFHdEIsT0FBTyxPQUFPLGFBQWEsUUFBUTs7O29CQUd2QyxHQUFHLHFDQUFxQyxZQUFXO3dCQUMvQyxJQUFJLFNBQVMsSUFBSSxlQUFlOzRCQUM1QixVQUFVLENBQUM7Z0NBQ1AsUUFBUSxVQUFVO2dDQUNsQixjQUFjOytCQUNmO2dDQUNDLFFBQVEsVUFBVTtnQ0FDbEIsY0FBYzs7O3dCQUd0QixPQUFPLE9BQU8sYUFBYSxRQUFROzs7Ozs7R0FXNUMiLCJmaWxlIjoiY29tbW9uL21vZGVsL1dvcmtJdGVtUmVzdWx0VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IG1vZGVsTW9kdWxlIGZyb20gJ2NvbW1vbi9tb2RlbC9Nb2RlbE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnV29ya0l0ZW1SZXN1bHQnLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBXb3JrSXRlbVJlc3VsdCwgU3BNZXNzYWdlLFxyXG4gICAgICAgIHdvcmtJdGVtSWQgPSAnMTIzJyxcclxuICAgICAgICB3b3JrSXRlbVR5cGUgPSAnQXBwcm92YWwnLFxyXG4gICAgICAgIHJldHVyblBhZ2UgPSAndGhlTGFzdFBhZ2UnLFxyXG4gICAgICAgIG1lc3NhZ2VzID0gW3tcclxuICAgICAgICAgICAgc3RhdHVzOiAnRVJST1InLFxyXG4gICAgICAgICAgICBtZXNzYWdlT3JLZXk6ICdhbm90aGVyIG9uZSBiaXRlcyB0aGUgZHVzdCdcclxuICAgICAgICB9XTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtb2RlbE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9Xb3JrSXRlbVJlc3VsdF8sIF9TcE1lc3NhZ2VfKSB7XHJcbiAgICAgICAgV29ya0l0ZW1SZXN1bHQgPSBfV29ya0l0ZW1SZXN1bHRfO1xyXG4gICAgICAgIFNwTWVzc2FnZSA9IF9TcE1lc3NhZ2VfO1xyXG4gICAgfSkpO1xyXG5cclxuXHJcbiAgICBpdCgnaW5pdGlhbGl6ZXMgZGF0YSB3aXRoIGNvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBXb3JrSXRlbVJlc3VsdCh7XHJcbiAgICAgICAgICAgIG5leHRXb3JrSXRlbUlkOiB3b3JrSXRlbUlkLFxyXG4gICAgICAgICAgICBuZXh0V29ya0l0ZW1UeXBlOiB3b3JrSXRlbVR5cGUsXHJcbiAgICAgICAgICAgIGNhbmNlbGxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgcmV0dXJuUGFnZTogcmV0dXJuUGFnZSxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChyZXN1bHQubmV4dFdvcmtJdGVtSWQpLnRvRXF1YWwod29ya0l0ZW1JZCk7XHJcbiAgICAgICAgZXhwZWN0KHJlc3VsdC5uZXh0V29ya0l0ZW1UeXBlKS50b0VxdWFsKHdvcmtJdGVtVHlwZSk7XHJcbiAgICAgICAgZXhwZWN0KHJlc3VsdC5jYW5jZWxsZWQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgZXhwZWN0KHJlc3VsdC5yZXR1cm5QYWdlKS50b0VxdWFsKHJldHVyblBhZ2UpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHQubWVzc2FnZXMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHQubWVzc2FnZXNbMF0uc3RhdHVzKS50b0VxdWFsKG1lc3NhZ2VzWzBdLnN0YXR1cyk7XHJcbiAgICAgICAgZXhwZWN0KHJlc3VsdC5tZXNzYWdlc1swXS5tZXNzYWdlT3JLZXkpLnRvRXF1YWwobWVzc2FnZXNbMF0ubWVzc2FnZU9yS2V5KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdoYXNOZXh0V29ya0l0ZW0oKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgYSB3b3JrIGl0ZW0gSUQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBXb3JrSXRlbVJlc3VsdCh7XHJcbiAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW1JZDogd29ya0l0ZW1JZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5oYXNOZXh0V29ya0l0ZW0oKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBhIHdvcmsgaXRlbSB0eXBlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgV29ya0l0ZW1SZXN1bHQoe1xyXG4gICAgICAgICAgICAgICAgbmV4dFdvcmtJdGVtVHlwZTogJ0Zvcm0nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzdWx0Lmhhc05leHRXb3JrSXRlbSgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBub3QgYSB3b3JrIGl0ZW0gSUQgb3IgdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFdvcmtJdGVtUmVzdWx0KHt9KTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5oYXNOZXh0V29ya0l0ZW0oKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnYWRkRXJyb3IoKSBhZGRzIGEgbWVzc2FnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgV29ya0l0ZW1SZXN1bHQoe30pLFxyXG4gICAgICAgICAgICBrZXkgPSAneW9NYW1hIScsXHJcbiAgICAgICAgICAgIGFyZ3MgPSBbICcxMjMnLCAnMjM0JyBdO1xyXG4gICAgICAgIHJlc3VsdC5hZGRFcnJvcihrZXksIGFyZ3MpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHQubWVzc2FnZXMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHQubWVzc2FnZXNbMF0uc3RhdHVzKS50b0VxdWFsKFNwTWVzc2FnZS5FUlJPUik7XHJcbiAgICAgICAgZXhwZWN0KHJlc3VsdC5tZXNzYWdlc1swXS5tZXNzYWdlT3JLZXkpLnRvRXF1YWwoa2V5KTtcclxuICAgICAgICBleHBlY3QocmVzdWx0Lm1lc3NhZ2VzWzBdLmFyZ3MpLnRvRXF1YWwoYXJncyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNTdWNjZXNzKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBubyBtZXNzYWdlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFdvcmtJdGVtUmVzdWx0KHt9KTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5pc1N1Y2Nlc3MoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgbm8gZXJyb3JzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgV29ya0l0ZW1SZXN1bHQoe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBTcE1lc3NhZ2UuU1VDQ0VTUyxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlT3JLZXk6ICdvamZmbGtqZidcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzdWx0LmlzU3VjY2VzcygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBhcmUgZXJyb3JzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgV29ya0l0ZW1SZXN1bHQoe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBTcE1lc3NhZ2UuU1VDQ0VTUyxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlT3JLZXk6ICdubyBwcm9iIGJvYidcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFNwTWVzc2FnZS5FUlJPUixcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlT3JLZXk6ICdib29tISdcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzdWx0LmlzU3VjY2VzcygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
