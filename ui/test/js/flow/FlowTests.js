System.register(['test/js/TestInitializer', 'flow/FlowModule'], function (_export) {
    'use strict';

    var flowModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_flowFlowModule) {
            flowModule = _flowFlowModule['default'];
        }],
        execute: function () {

            describe('Flow', function () {
                var Flow, onExitCfg;

                beforeEach(module(flowModule));

                beforeEach(inject(function (_Flow_) {
                    Flow = _Flow_;

                    onExitCfg = {
                        onExitFunction: jasmine.createSpy(),
                        showWarningFunction: jasmine.createSpy()
                    };
                }));

                describe('constructor', function () {
                    it('pukes if a name is not given', function () {
                        expect(function () {
                            new Flow(null, ['texas'], onExitCfg);
                        }).toThrow();
                    });

                    it('pukes if validStates are not given', function () {
                        expect(function () {
                            new Flow('flo b', null, onExitCfg);
                        }).toThrow();
                    });

                    it('allows a null onExitConfig', function () {
                        var flow = new Flow('hit the dance flo', ['hiMom'], null);
                        expect(flow).not.toBeNull();
                    });

                    it('sets name', function () {
                        var name = 'flo rida',
                            flow = new Flow(name, ['foo'], onExitCfg);
                        expect(flow.name).toEqual(name);
                    });

                    it('sets validStates', function () {
                        var states = ['yo', 'adrian'],
                            flow = new Flow('rocky', states, onExitCfg);
                        expect(flow.validStates).toEqual(states);
                    });

                    it('sets onExit', function () {
                        var flow = new Flow('connery', ['suckItTrebek'], onExitCfg);
                        expect(flow.onExitConfig).toEqual(onExitCfg);
                    });
                });

                describe('getOnExitMessage', function () {
                    it('returns null if onExitConfig is null', function () {
                        var flow = new Flow('connery', ['suckItTrebek'], null);
                        expect(flow.getOnExitMessage()).toBeNull();
                    });

                    it('returns the message if specified in the onExitConfig', function () {
                        var msg = 'flo diner',
                            flow = new Flow('msg', ['hey oh!'], {
                            message: msg
                        });

                        expect(flow.getOnExitMessage()).toEqual(msg);
                    });

                    it('returns the message returned from a function in onExitConfig', function () {
                        var message = 'flo diner',
                            msg = function () {
                            return message;
                        },
                            flow = new Flow('msg', ['hey oh!'], {
                            message: msg
                        });

                        expect(flow.getOnExitMessage()).toEqual(message);
                    });
                });

                describe('getOnExitFunction', function () {
                    it('returns null if onExitConfig is null', function () {
                        var flow = new Flow('connery', ['suckItTrebek'], null);
                        expect(flow.getOnExitFunction()).toBeNull();
                    });

                    it('returns the function if specified in the onExitConfig', function () {
                        var func = function () {
                            return 'blah';
                        },
                            flow = new Flow('msg', ['hey oh!'], {
                            onExitFunction: func
                        });

                        expect(flow.getOnExitFunction()).toEqual(func);
                    });
                });

                describe('showWarning', function () {
                    it('returns true if onExitConfig is null', function () {
                        var flow = new Flow('connery', ['suckItTrebek'], null);
                        expect(flow.showWarning()).toEqual(true);
                    });

                    it('returns true if onExitConfig does not have showWarningFunction', function () {
                        var flow = new Flow('connery', ['suckItTrebek'], {});
                        expect(flow.showWarning()).toEqual(true);
                    });

                    it('returns the value of showWarningFunction if specified', function () {
                        var func = jasmine.createSpy().and.returnValue(true),
                            flow = new Flow('msg', ['hey oh!'], {
                            showWarningFunction: func
                        });

                        expect(flow.showWarning()).toEqual(true);
                        expect(func).toHaveBeenCalled();
                    });
                });

                describe('isValidState', function () {
                    var flow;

                    beforeEach(function () {
                        flow = new Flow('GoBallState!', ['boom', 'goes', 'the', 'dynamite'], onExitCfg);
                    });

                    it('pukes if state is null', function () {
                        expect(function () {
                            flow.isValidState(null, onExitCfg);
                        }).toThrow();
                    });

                    it('returns true if the state is an exact match of a valid state', function () {
                        var isValid = flow.isValidState('dynamite');
                        expect(isValid).toEqual(true);
                    });

                    it('returns true if the state is a child of a valid state', function () {
                        var isValid = flow.isValidState('dynamite.blows.up');
                        expect(isValid).toEqual(true);
                    });

                    it('returns false if the state does not match', function () {
                        var isValid = flow.isValidState('bam');
                        expect(isValid).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,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QUFLLGVBQWUsUUFBUTs7O29CQUd2QyxHQUFHLHlEQUF5RCxZQUFXO3dCQUNuRSxJQUFJLE9BQU8sUUFBUSxZQUFZLElBQUksWUFBWTs0QkFDM0MsT0FBTyxJQUFJLEtBQUssT0FBTyxDQUFFLFlBQWE7NEJBQ2xDLHFCQUFxQjs7O3dCQUc3QixPQUFPLEtBQUssZUFBZSxRQUFRO3dCQUNuQyxPQUFPLE1BQU07Ozs7Z0JBSXJCLFNBQVMsZ0JBQWdCLFlBQVc7b0JBQ2hDLElBQUk7O29CQUVKLFdBQVcsWUFBVzt3QkFDbEIsT0FBTyxJQUFJLEtBQUssZ0JBQWdCLENBQUUsUUFBUSxRQUFRLE9BQU8sYUFBYzs7O29CQUczRSxHQUFHLDBCQUEwQixZQUFXO3dCQUNwQyxPQUFPLFlBQVc7NEJBQUUsS0FBSyxhQUFhLE1BQU07MkJBQWU7OztvQkFHL0QsR0FBRyxnRUFBZ0UsWUFBVzt3QkFDMUUsSUFBSSxVQUFVLEtBQUssYUFBYTt3QkFDaEMsT0FBTyxTQUFTLFFBQVE7OztvQkFHNUIsR0FBRyx5REFBeUQsWUFBVzt3QkFDbkUsSUFBSSxVQUFVLEtBQUssYUFBYTt3QkFDaEMsT0FBTyxTQUFTLFFBQVE7OztvQkFHNUIsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsSUFBSSxVQUFVLEtBQUssYUFBYTt3QkFDaEMsT0FBTyxTQUFTLFFBQVE7Ozs7OztHQWtCakMiLCJmaWxlIjoiZmxvdy9GbG93VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGZsb3dNb2R1bGUgZnJvbSAnZmxvdy9GbG93TW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdGbG93JywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgRmxvdywgb25FeGl0Q2ZnO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZsb3dNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfRmxvd18pIHtcclxuICAgICAgICBGbG93ID0gX0Zsb3dfO1xyXG5cclxuICAgICAgICBvbkV4aXRDZmcgPSB7XHJcbiAgICAgICAgICAgIG9uRXhpdEZ1bmN0aW9uOiBqYXNtaW5lLmNyZWF0ZVNweSgpLFxyXG4gICAgICAgICAgICBzaG93V2FybmluZ0Z1bmN0aW9uOiBqYXNtaW5lLmNyZWF0ZVNweSgpXHJcbiAgICAgICAgfTtcclxuICAgIH0pKTtcclxuXHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3B1a2VzIGlmIGEgbmFtZSBpcyBub3QgZ2l2ZW4nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgRmxvdyhudWxsLCBbICd0ZXhhcycgXSwgb25FeGl0Q2ZnKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncHVrZXMgaWYgdmFsaWRTdGF0ZXMgYXJlIG5vdCBnaXZlbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBGbG93KCdmbG8gYicsIG51bGwsIG9uRXhpdENmZyk7IH0gKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhbGxvd3MgYSBudWxsIG9uRXhpdENvbmZpZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZmxvdyA9IG5ldyBGbG93KCdoaXQgdGhlIGRhbmNlIGZsbycsIFsgJ2hpTW9tJyBdLCBudWxsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZsb3cpLm5vdC50b0JlTnVsbCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyBuYW1lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gJ2ZsbyByaWRhJyxcclxuICAgICAgICAgICAgICAgIGZsb3cgPSBuZXcgRmxvdyhuYW1lLCBbICdmb28nIF0sIG9uRXhpdENmZyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmbG93Lm5hbWUpLnRvRXF1YWwobmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHZhbGlkU3RhdGVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZXMgPSBbICd5bycsICdhZHJpYW4nIF0sXHJcbiAgICAgICAgICAgICAgICBmbG93ID0gbmV3IEZsb3coJ3JvY2t5Jywgc3RhdGVzLCBvbkV4aXRDZmcpO1xyXG4gICAgICAgICAgICBleHBlY3QoZmxvdy52YWxpZFN0YXRlcykudG9FcXVhbChzdGF0ZXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyBvbkV4aXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGZsb3cgPSBuZXcgRmxvdygnY29ubmVyeScsIFsgJ3N1Y2tJdFRyZWJlaycgXSwgb25FeGl0Q2ZnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZsb3cub25FeGl0Q29uZmlnKS50b0VxdWFsKG9uRXhpdENmZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0T25FeGl0TWVzc2FnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIG51bGwgaWYgb25FeGl0Q29uZmlnIGlzIG51bGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGZsb3cgPSBuZXcgRmxvdygnY29ubmVyeScsIFsgJ3N1Y2tJdFRyZWJlaycgXSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmbG93LmdldE9uRXhpdE1lc3NhZ2UoKSkudG9CZU51bGwoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIG1lc3NhZ2UgaWYgc3BlY2lmaWVkIGluIHRoZSBvbkV4aXRDb25maWcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1zZyA9ICdmbG8gZGluZXInLFxyXG4gICAgICAgICAgICAgICAgZmxvdyA9IG5ldyBGbG93KCdtc2cnLCBbICdoZXkgb2ghJyBdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbXNnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChmbG93LmdldE9uRXhpdE1lc3NhZ2UoKSkudG9FcXVhbChtc2cpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0aGUgbWVzc2FnZSByZXR1cm5lZCBmcm9tIGEgZnVuY3Rpb24gaW4gb25FeGl0Q29uZmlnJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJ2ZsbyBkaW5lcicsXHJcbiAgICAgICAgICAgICAgICBtc2cgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmbG93ID0gbmV3IEZsb3coJ21zZycsIFsgJ2hleSBvaCEnIF0sIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtc2dcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGZsb3cuZ2V0T25FeGl0TWVzc2FnZSgpKS50b0VxdWFsKG1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldE9uRXhpdEZ1bmN0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgbnVsbCBpZiBvbkV4aXRDb25maWcgaXMgbnVsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZmxvdyA9IG5ldyBGbG93KCdjb25uZXJ5JywgWyAnc3Vja0l0VHJlYmVrJyBdLCBudWxsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZsb3cuZ2V0T25FeGl0RnVuY3Rpb24oKSkudG9CZU51bGwoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIGZ1bmN0aW9uIGlmIHNwZWNpZmllZCBpbiB0aGUgb25FeGl0Q29uZmlnJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBmdW5jID0gZnVuY3Rpb24oKSB7IHJldHVybiAnYmxhaCc7IH0sXHJcbiAgICAgICAgICAgICAgICBmbG93ID0gbmV3IEZsb3coJ21zZycsIFsgJ2hleSBvaCEnIF0sIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkV4aXRGdW5jdGlvbjogZnVuY1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoZmxvdy5nZXRPbkV4aXRGdW5jdGlvbigpKS50b0VxdWFsKGZ1bmMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dXYXJuaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBvbkV4aXRDb25maWcgaXMgbnVsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZmxvdyA9IG5ldyBGbG93KCdjb25uZXJ5JywgWyAnc3Vja0l0VHJlYmVrJyBdLCBudWxsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZsb3cuc2hvd1dhcm5pbmcoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBvbkV4aXRDb25maWcgZG9lcyBub3QgaGF2ZSBzaG93V2FybmluZ0Z1bmN0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBmbG93ID0gbmV3IEZsb3coJ2Nvbm5lcnknLCBbICdzdWNrSXRUcmViZWsnIF0sIHsgfSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmbG93LnNob3dXYXJuaW5nKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSB2YWx1ZSBvZiBzaG93V2FybmluZ0Z1bmN0aW9uIGlmIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZnVuYyA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKHRydWUpLFxyXG4gICAgICAgICAgICAgICAgZmxvdyA9IG5ldyBGbG93KCdtc2cnLCBbICdoZXkgb2ghJyBdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd1dhcm5pbmdGdW5jdGlvbjogZnVuY1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoZmxvdy5zaG93V2FybmluZygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuYykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzVmFsaWRTdGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBmbG93O1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmbG93ID0gbmV3IEZsb3coJ0dvQmFsbFN0YXRlIScsIFsgJ2Jvb20nLCAnZ29lcycsICd0aGUnLCAnZHluYW1pdGUnIF0sIG9uRXhpdENmZyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdwdWtlcyBpZiBzdGF0ZSBpcyBudWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgZmxvdy5pc1ZhbGlkU3RhdGUobnVsbCwgb25FeGl0Q2ZnKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBzdGF0ZSBpcyBhbiBleGFjdCBtYXRjaCBvZiBhIHZhbGlkIHN0YXRlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gZmxvdy5pc1ZhbGlkU3RhdGUoJ2R5bmFtaXRlJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpc1ZhbGlkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBzdGF0ZSBpcyBhIGNoaWxkIG9mIGEgdmFsaWQgc3RhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBmbG93LmlzVmFsaWRTdGF0ZSgnZHluYW1pdGUuYmxvd3MudXAnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlzVmFsaWQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBzdGF0ZSBkb2VzIG5vdCBtYXRjaCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaXNWYWxpZCA9IGZsb3cuaXNWYWxpZFN0YXRlKCdiYW0nKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlzVmFsaWQpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
