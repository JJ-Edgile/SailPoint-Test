System.register(['test/js/TestInitializer', 'common/util/UtilModule'], function (_export) {

    /**
     * Tests for the SpNotificationService.
     */
    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {
            describe('SpNotificationService', function () {
                var spNotificationService, SpMessage, notification1, notification2, notification3, notification4;

                beforeEach(module(utilModule));

                beforeEach(inject(function (_spNotificationService_, _SpMessage_) {
                    spNotificationService = _spNotificationService_;
                    SpMessage = _SpMessage_;

                    notification1 = {
                        messageOrKey: 'this_is_a_test',
                        status: SpMessage.ERROR
                    };
                    notification2 = {
                        messageOrKey: 'this is a test with args',
                        status: SpMessage.ERROR,
                        args: [1, 2, 3],
                        dismissable: undefined
                    };
                    notification3 = {
                        messageOrKey: 'this_is_a_test',
                        status: SpMessage.ERROR,
                        args: undefined,
                        dismissable: undefined
                    };
                    notification4 = {
                        messageOrKey: 'this_is_a_test_dismissable',
                        status: SpMessage.ERROR,
                        args: [1, 2, 3],
                        dismissable: true
                    };
                }));

                it('should allow notification creation', function () {
                    var notifications = spNotificationService.addNotification(notification1.messageOrKey, notification1.status);
                    expect(notifications).toEqual([SpMessage.createFromDTO(notification3)]);
                });

                it('should allow notification creation', function () {
                    var notifications = spNotificationService.addNotification(notification4.messageOrKey, notification4.status, notification4.args, notification4.dismissable);
                    expect(notifications).toEqual([SpMessage.createFromDTO(notification4)]);
                });

                it('should throw with invalid status', function () {
                    expect(function () {
                        spNotificationService.addNotification(notification1.messageOrKey, 'TOTALLYMESSEDUP');
                    }).toThrow('Invalid status.  Status should be one of ERROR, WARN, INFO, or SUCCESS');
                });

                it('should throw without status', function () {
                    expect(function () {
                        spNotificationService.addNotification(notification1.messageOrKey);
                    }).toThrow('status is required');
                });

                it('should throw without message', function () {
                    expect(function () {
                        spNotificationService.addNotification(null, notification1.status);
                    }).toThrow('messageOrKey is required');
                });

                it('should allow notification retrieval', function () {
                    spNotificationService.addNotification(notification1.messageOrKey, notification1.status);
                    var notifications = spNotificationService.getNotifications();
                    expect(notifications).toEqual([SpMessage.createFromDTO(notification3)]);
                });

                it('should allow notification retrieval or args', function () {
                    spNotificationService.addNotification(notification2.messageOrKey, notification2.status, notification2.args);
                    var notifications = spNotificationService.getNotifications();
                    expect(notifications).toEqual([SpMessage.createFromDTO(notification2)]);
                });

                it('should return null when notification is null', function () {
                    spNotificationService.addNotification(notification1.messageOrKey, notification1.status);
                    spNotificationService.clear();

                    var notifications = spNotificationService.getNotifications();
                    expect(notifications).not.toBeDefined();
                });

                describe('addMessage()', function () {
                    it('pukes if message is null', function () {
                        expect(function () {
                            spNotificationService.addMessage(null);
                        }).toThrow();
                    });

                    it('adds a message', function () {
                        var msg = 'hi mom!';
                        spNotificationService.addMessage({ status: SpMessage.ERROR, messageOrKey: msg });
                        expect(spNotificationService.notifications[0].status).toEqual(SpMessage.ERROR);
                        expect(spNotificationService.notifications[0].messageOrKey).toEqual(msg);
                    });
                });

                describe('addMessages()', function () {
                    it('does nothing if messages is null', function () {
                        expect(function () {
                            spNotificationService.addMessages(null);
                        }).not.toThrow();
                    });

                    it('adds a message', function () {
                        var msg1 = 'hi mom!',
                            msg2 = 'hi dad!';
                        spNotificationService.addMessages([{ status: SpMessage.ERROR, messageOrKey: msg1 }, { status: SpMessage.ERROR, messageOrKey: msg2 }]);
                        expect(spNotificationService.notifications[0].status).toEqual(SpMessage.ERROR);
                        expect(spNotificationService.notifications[0].messageOrKey).toEqual(msg1);
                        expect(spNotificationService.notifications[1].status).toEqual(SpMessage.ERROR);
                        expect(spNotificationService.notifications[1].messageOrKey).toEqual(msg2);
                    });
                });

                describe('directive trigger', function () {
                    it('should start as undefined', function () {
                        expect(spNotificationService.directiveTrigger).not.toBeDefined();
                    });

                    it('should set to true when triggered', function () {
                        spNotificationService.triggerDirective();
                        expect(spNotificationService.directiveTrigger).toEqual(true);
                    });

                    it('should reset', function () {
                        spNotificationService.resetDirectiveTrigger();
                        expect(spNotificationService.directiveTrigger).not.toBeDefined();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL1NwTm90aWZpY2F0aW9uU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsVUFBVSxTQUFTOzs7OztJQUExRjs7SUFPSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7WUFKN0IsU0FBUyx5QkFBeUIsWUFBVztnQkFDekMsSUFBSSx1QkFBdUIsV0FBVyxlQUFlLGVBQWUsZUFBZTs7Z0JBRW5GLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLHlCQUF5QixhQUFhO29CQUM3RCx3QkFBd0I7b0JBQ3hCLFlBQVk7O29CQUVaLGdCQUFnQjt3QkFDWixjQUFlO3dCQUNmLFFBQVEsVUFBVTs7b0JBRXRCLGdCQUFnQjt3QkFDWixjQUFjO3dCQUNkLFFBQVEsVUFBVTt3QkFDbEIsTUFBTSxDQUFDLEdBQUUsR0FBRTt3QkFDWCxhQUFhOztvQkFFakIsZ0JBQWdCO3dCQUNaLGNBQWU7d0JBQ2YsUUFBUSxVQUFVO3dCQUNsQixNQUFNO3dCQUNOLGFBQWE7O29CQUVqQixnQkFBZ0I7d0JBQ1osY0FBZTt3QkFDZixRQUFRLFVBQVU7d0JBQ2xCLE1BQU0sQ0FBQyxHQUFFLEdBQUU7d0JBQ1gsYUFBYTs7OztnQkFJckIsR0FBRyxzQ0FBc0MsWUFBVztvQkFDaEQsSUFBSSxnQkFDQSxzQkFBc0IsZ0JBQWdCLGNBQWMsY0FBYyxjQUFjO29CQUNwRixPQUFPLGVBQWUsUUFBUSxDQUFDLFVBQVUsY0FBYzs7O2dCQUczRCxHQUFHLHNDQUFzQyxZQUFXO29CQUNoRCxJQUFJLGdCQUNBLHNCQUFzQixnQkFBZ0IsY0FBYyxjQUFjLGNBQWMsUUFDeEUsY0FBYyxNQUFNLGNBQWM7b0JBQzlDLE9BQU8sZUFBZSxRQUFRLENBQUMsVUFBVSxjQUFjOzs7Z0JBRzNELEdBQUcsb0NBQW9DLFlBQVc7b0JBQzlDLE9BQU8sWUFBVzt3QkFBRSxzQkFBc0IsZ0JBQWdCLGNBQWMsY0FBYzt1QkFDakYsUUFBUTs7O2dCQUdqQixHQUFHLCtCQUErQixZQUFXO29CQUN6QyxPQUFPLFlBQVc7d0JBQUUsc0JBQXNCLGdCQUFnQixjQUFjO3VCQUNuRSxRQUFROzs7Z0JBR2pCLEdBQUcsZ0NBQWdDLFlBQVc7b0JBQzFDLE9BQU8sWUFBVzt3QkFBRSxzQkFBc0IsZ0JBQWdCLE1BQU0sY0FBYzt1QkFDekUsUUFBUTs7O2dCQUdqQixHQUFHLHVDQUF1QyxZQUFXO29CQUNqRCxzQkFBc0IsZ0JBQWdCLGNBQWMsY0FBYyxjQUFjO29CQUNoRixJQUFJLGdCQUFnQixzQkFBc0I7b0JBQzFDLE9BQU8sZUFBZSxRQUFRLENBQUMsVUFBVSxjQUFjOzs7Z0JBRzNELEdBQUcsK0NBQStDLFlBQVc7b0JBQ3pELHNCQUFzQixnQkFBZ0IsY0FBYyxjQUFjLGNBQWMsUUFBUSxjQUFjO29CQUN0RyxJQUFJLGdCQUFnQixzQkFBc0I7b0JBQzFDLE9BQU8sZUFBZSxRQUFRLENBQUMsVUFBVSxjQUFjOzs7Z0JBRzNELEdBQUcsZ0RBQWdELFlBQVc7b0JBQzFELHNCQUFzQixnQkFBZ0IsY0FBYyxjQUFjLGNBQWM7b0JBQ2hGLHNCQUFzQjs7b0JBRXRCLElBQUksZ0JBQWdCLHNCQUFzQjtvQkFDMUMsT0FBTyxlQUFlLElBQUk7OztnQkFHOUIsU0FBUyxnQkFBZ0IsWUFBVztvQkFDaEMsR0FBRyw0QkFBNEIsWUFBVzt3QkFDdEMsT0FBTyxZQUFXOzRCQUFFLHNCQUFzQixXQUFXOzJCQUFVOzs7b0JBR25FLEdBQUcsa0JBQWtCLFlBQVc7d0JBQzVCLElBQUksTUFBTTt3QkFDVixzQkFBc0IsV0FBVyxFQUFDLFFBQVEsVUFBVSxPQUFPLGNBQWM7d0JBQ3pFLE9BQU8sc0JBQXNCLGNBQWMsR0FBRyxRQUFRLFFBQVEsVUFBVTt3QkFDeEUsT0FBTyxzQkFBc0IsY0FBYyxHQUFHLGNBQWMsUUFBUTs7OztnQkFJNUUsU0FBUyxpQkFBaUIsWUFBVztvQkFDakMsR0FBRyxvQ0FBb0MsWUFBVzt3QkFDOUMsT0FBTyxZQUFXOzRCQUNkLHNCQUFzQixZQUFZOzJCQUNuQyxJQUFJOzs7b0JBR1gsR0FBRyxrQkFBa0IsWUFBVzt3QkFDNUIsSUFBSSxPQUFPOzRCQUNQLE9BQU87d0JBQ1gsc0JBQXNCLFlBQVksQ0FBQyxFQUFDLFFBQVEsVUFBVSxPQUFPLGNBQWMsUUFDdkUsRUFBQyxRQUFRLFVBQVUsT0FBTyxjQUFjO3dCQUM1QyxPQUFPLHNCQUFzQixjQUFjLEdBQUcsUUFBUSxRQUFRLFVBQVU7d0JBQ3hFLE9BQU8sc0JBQXNCLGNBQWMsR0FBRyxjQUFjLFFBQVE7d0JBQ3BFLE9BQU8sc0JBQXNCLGNBQWMsR0FBRyxRQUFRLFFBQVEsVUFBVTt3QkFDeEUsT0FBTyxzQkFBc0IsY0FBYyxHQUFHLGNBQWMsUUFBUTs7OztnQkFJNUUsU0FBUyxxQkFBcUIsWUFBVztvQkFDckMsR0FBSSw2QkFBNkIsWUFBVzt3QkFDeEMsT0FBTyxzQkFBc0Isa0JBQWtCLElBQUk7OztvQkFHdkQsR0FBSSxxQ0FBcUMsWUFBVzt3QkFDaEQsc0JBQXNCO3dCQUN0QixPQUFPLHNCQUFzQixrQkFBa0IsUUFBUTs7O29CQUczRCxHQUFJLGdCQUFnQixZQUFXO3dCQUMzQixzQkFBc0I7d0JBQ3RCLE9BQU8sc0JBQXNCLGtCQUFrQixJQUFJOzs7Ozs7R0FZNUQiLCJmaWxlIjoiY29tbW9uL3V0aWwvU3BOb3RpZmljYXRpb25TZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHV0aWxNb2R1bGUgZnJvbSAnY29tbW9uL3V0aWwvVXRpbE1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBTcE5vdGlmaWNhdGlvblNlcnZpY2UuXG4gKi9cbmRlc2NyaWJlKCdTcE5vdGlmaWNhdGlvblNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3BOb3RpZmljYXRpb25TZXJ2aWNlLCBTcE1lc3NhZ2UsIG5vdGlmaWNhdGlvbjEsIG5vdGlmaWNhdGlvbjIsIG5vdGlmaWNhdGlvbjMsIG5vdGlmaWNhdGlvbjQ7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh1dGlsTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfc3BOb3RpZmljYXRpb25TZXJ2aWNlXywgX1NwTWVzc2FnZV8pIHtcbiAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlID0gX3NwTm90aWZpY2F0aW9uU2VydmljZV87XG4gICAgICAgIFNwTWVzc2FnZSA9IF9TcE1lc3NhZ2VfO1xuXG4gICAgICAgIG5vdGlmaWNhdGlvbjEgPSB7XG4gICAgICAgICAgICBtZXNzYWdlT3JLZXkgOiAndGhpc19pc19hX3Rlc3QnLFxuICAgICAgICAgICAgc3RhdHVzOiBTcE1lc3NhZ2UuRVJST1JcbiAgICAgICAgfTtcbiAgICAgICAgbm90aWZpY2F0aW9uMiA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2VPcktleTogJ3RoaXMgaXMgYSB0ZXN0IHdpdGggYXJncycsXG4gICAgICAgICAgICBzdGF0dXM6IFNwTWVzc2FnZS5FUlJPUixcbiAgICAgICAgICAgIGFyZ3M6IFsxLDIsM10sXG4gICAgICAgICAgICBkaXNtaXNzYWJsZTogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIG5vdGlmaWNhdGlvbjMgPSB7XG4gICAgICAgICAgICBtZXNzYWdlT3JLZXkgOiAndGhpc19pc19hX3Rlc3QnLFxuICAgICAgICAgICAgc3RhdHVzOiBTcE1lc3NhZ2UuRVJST1IsXG4gICAgICAgICAgICBhcmdzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBkaXNtaXNzYWJsZTogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIG5vdGlmaWNhdGlvbjQgPSB7XG4gICAgICAgICAgICBtZXNzYWdlT3JLZXkgOiAndGhpc19pc19hX3Rlc3RfZGlzbWlzc2FibGUnLFxuICAgICAgICAgICAgc3RhdHVzOiBTcE1lc3NhZ2UuRVJST1IsXG4gICAgICAgICAgICBhcmdzOiBbMSwyLDNdLFxuICAgICAgICAgICAgZGlzbWlzc2FibGU6IHRydWVcbiAgICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIGFsbG93IG5vdGlmaWNhdGlvbiBjcmVhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbm90aWZpY2F0aW9ucyA9XG4gICAgICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjEubWVzc2FnZU9yS2V5LCBub3RpZmljYXRpb24xLnN0YXR1cyk7XG4gICAgICAgIGV4cGVjdChub3RpZmljYXRpb25zKS50b0VxdWFsKFtTcE1lc3NhZ2UuY3JlYXRlRnJvbURUTyhub3RpZmljYXRpb24zKV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBub3RpZmljYXRpb24gY3JlYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5vdGlmaWNhdGlvbnMgPVxuICAgICAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb240Lm1lc3NhZ2VPcktleSwgbm90aWZpY2F0aW9uNC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbjQuYXJncywgbm90aWZpY2F0aW9uNC5kaXNtaXNzYWJsZSk7XG4gICAgICAgIGV4cGVjdChub3RpZmljYXRpb25zKS50b0VxdWFsKFtTcE1lc3NhZ2UuY3JlYXRlRnJvbURUTyhub3RpZmljYXRpb240KV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIGludmFsaWQgc3RhdHVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24xLm1lc3NhZ2VPcktleSwgJ1RPVEFMTFlNRVNTRURVUCcpO30gKVxuICAgICAgICAgICAgLnRvVGhyb3coJ0ludmFsaWQgc3RhdHVzLiAgU3RhdHVzIHNob3VsZCBiZSBvbmUgb2YgRVJST1IsIFdBUk4sIElORk8sIG9yIFNVQ0NFU1MnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aG91dCBzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbjEubWVzc2FnZU9yS2V5KTt9IClcbiAgICAgICAgICAgIC50b1Rocm93KCdzdGF0dXMgaXMgcmVxdWlyZWQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aG91dCBtZXNzYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbihudWxsLCBub3RpZmljYXRpb24xLnN0YXR1cyk7fSApXG4gICAgICAgICAgICAudG9UaHJvdygnbWVzc2FnZU9yS2V5IGlzIHJlcXVpcmVkJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGFsbG93IG5vdGlmaWNhdGlvbiByZXRyaWV2YWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24xLm1lc3NhZ2VPcktleSwgbm90aWZpY2F0aW9uMS5zdGF0dXMpO1xuICAgICAgICB2YXIgbm90aWZpY2F0aW9ucyA9IHNwTm90aWZpY2F0aW9uU2VydmljZS5nZXROb3RpZmljYXRpb25zKCk7XG4gICAgICAgIGV4cGVjdChub3RpZmljYXRpb25zKS50b0VxdWFsKFtTcE1lc3NhZ2UuY3JlYXRlRnJvbURUTyhub3RpZmljYXRpb24zKV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBub3RpZmljYXRpb24gcmV0cmlldmFsIG9yIGFyZ3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24yLm1lc3NhZ2VPcktleSwgbm90aWZpY2F0aW9uMi5zdGF0dXMsIG5vdGlmaWNhdGlvbjIuYXJncyk7XG4gICAgICAgIHZhciBub3RpZmljYXRpb25zID0gc3BOb3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgZXhwZWN0KG5vdGlmaWNhdGlvbnMpLnRvRXF1YWwoW1NwTWVzc2FnZS5jcmVhdGVGcm9tRFRPKG5vdGlmaWNhdGlvbjIpXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBudWxsIHdoZW4gbm90aWZpY2F0aW9uIGlzIG51bGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24xLm1lc3NhZ2VPcktleSwgbm90aWZpY2F0aW9uMS5zdGF0dXMpO1xuICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2UuY2xlYXIoKTtcblxuICAgICAgICB2YXIgbm90aWZpY2F0aW9ucyA9IHNwTm90aWZpY2F0aW9uU2VydmljZS5nZXROb3RpZmljYXRpb25zKCk7XG4gICAgICAgIGV4cGVjdChub3RpZmljYXRpb25zKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhZGRNZXNzYWdlKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3B1a2VzIGlmIG1lc3NhZ2UgaXMgbnVsbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTWVzc2FnZShudWxsKTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWRkcyBhIG1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtc2cgPSAnaGkgbW9tISc7XG4gICAgICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTWVzc2FnZSh7c3RhdHVzOiBTcE1lc3NhZ2UuRVJST1IsIG1lc3NhZ2VPcktleTogbXNnfSk7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLm5vdGlmaWNhdGlvbnNbMF0uc3RhdHVzKS50b0VxdWFsKFNwTWVzc2FnZS5FUlJPUik7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLm5vdGlmaWNhdGlvbnNbMF0ubWVzc2FnZU9yS2V5KS50b0VxdWFsKG1zZyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FkZE1lc3NhZ2VzKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2RvZXMgbm90aGluZyBpZiBtZXNzYWdlcyBpcyBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE1lc3NhZ2VzKG51bGwpO1xuICAgICAgICAgICAgfSkubm90LnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FkZHMgYSBtZXNzYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbXNnMSA9ICdoaSBtb20hJyxcbiAgICAgICAgICAgICAgICBtc2cyID0gJ2hpIGRhZCEnO1xuICAgICAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE1lc3NhZ2VzKFt7c3RhdHVzOiBTcE1lc3NhZ2UuRVJST1IsIG1lc3NhZ2VPcktleTogbXNnMX0sXG4gICAgICAgICAgICAgICAge3N0YXR1czogU3BNZXNzYWdlLkVSUk9SLCBtZXNzYWdlT3JLZXk6IG1zZzJ9XSk7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLm5vdGlmaWNhdGlvbnNbMF0uc3RhdHVzKS50b0VxdWFsKFNwTWVzc2FnZS5FUlJPUik7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLm5vdGlmaWNhdGlvbnNbMF0ubWVzc2FnZU9yS2V5KS50b0VxdWFsKG1zZzEpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTm90aWZpY2F0aW9uU2VydmljZS5ub3RpZmljYXRpb25zWzFdLnN0YXR1cykudG9FcXVhbChTcE1lc3NhZ2UuRVJST1IpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTm90aWZpY2F0aW9uU2VydmljZS5ub3RpZmljYXRpb25zWzFdLm1lc3NhZ2VPcktleSkudG9FcXVhbChtc2cyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGlyZWN0aXZlIHRyaWdnZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQgKCdzaG91bGQgc3RhcnQgYXMgdW5kZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLmRpcmVjdGl2ZVRyaWdnZXIpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCAoJ3Nob3VsZCBzZXQgdG8gdHJ1ZSB3aGVuIHRyaWdnZXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlLnRyaWdnZXJEaXJlY3RpdmUoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE5vdGlmaWNhdGlvblNlcnZpY2UuZGlyZWN0aXZlVHJpZ2dlcikudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQgKCdzaG91bGQgcmVzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNwTm90aWZpY2F0aW9uU2VydmljZS5yZXNldERpcmVjdGl2ZVRyaWdnZXIoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE5vdGlmaWNhdGlvblNlcnZpY2UuZGlyZWN0aXZlVHJpZ2dlcikubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
