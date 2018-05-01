System.register(['test/js/TestInitializer', 'common/email/EmailModule', 'angular'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Tests for EmailDialogCtrl
     */
    'use strict';

    var emailModule, angular;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonEmailEmailModule) {
            emailModule = _commonEmailEmailModule['default'];
        }, function (_angular) {
            angular = _angular['default'];
        }],
        execute: function () {
            describe('EmailDialogCtrlTests', function () {

                var $controller = undefined,
                    $uibModalInstance = undefined,
                    emailTemplate = undefined;

                beforeEach(module(emailModule));

                beforeEach(inject(function (_$controller_) {
                    $controller = _$controller_;

                    // mock up a modalInstance
                    $uibModalInstance = {
                        close: jasmine.createSpy()
                    };

                    // mock up an emailTemplate
                    emailTemplate = {
                        id: '1234',
                        to: 'test@example.com',
                        from: 'foo@example.com',
                        subject: 'test',
                        body: 'this is a test.',
                        toIdentity: {
                            id: 'id123',
                            name: 'foozy',
                            displayName: 'foozy booze',
                            email: 'foozy@example.com'
                        }
                    };
                }));

                function createController(template) {
                    return $controller('EmailDialogCtrl', {
                        emailTemplate: template,
                        $uibModalInstance: $uibModalInstance
                    });
                }

                describe('constructor', function () {
                    it('throws if data is missing', function () {
                        expect(function () {
                            createController();
                        }).toThrow();
                    });

                    it('does not throw with correct data', function () {
                        expect(function () {
                            createController(emailTemplate);
                        }).not.toThrow();
                    });
                });

                describe('hasEmailAddress', function () {
                    it('returns false when identity has no email address', function () {
                        var tmpTemplate = angular.copy(emailTemplate);
                        delete tmpTemplate.toIdentity.email;
                        var ctrl = createController(tmpTemplate);
                        expect(ctrl.hasEmailAddress()).toBeFalsy();
                    });

                    it('returns true when identity has email address', function () {
                        var ctrl = createController(emailTemplate);
                        expect(ctrl.hasEmailAddress()).toBeTruthy();
                    });

                    it('returns true if no email address but its a workgroup', function () {
                        var tmpTemplate = angular.copy(emailTemplate);
                        delete tmpTemplate.toIdentity.email;
                        tmpTemplate.toIdentity.workgroup = true;
                        var ctrl = createController(tmpTemplate);
                        expect(ctrl.hasEmailAddress()).toBeTruthy();
                    });
                });

                describe('validate', function () {
                    it('returns true if email, subject, and body are not null', function () {
                        var ctrl = createController(emailTemplate);
                        expect(ctrl.validate()).toBeTruthy();
                    });

                    it('returns false if email is null and subject and body are not null', function () {
                        var tmpTemplate = angular.copy(emailTemplate);
                        delete tmpTemplate.toIdentity.email;
                        var ctrl = createController(tmpTemplate);
                        expect(ctrl.validate()).toBeFalsy();
                    });

                    it('returns false if subject is null and email and body are not null', function () {
                        var tmpTemplate = angular.copy(emailTemplate);
                        tmpTemplate.subject = '';
                        var ctrl = createController(tmpTemplate);
                        expect(ctrl.validate()).toBeFalsy();
                    });

                    it('returns false if body is null and email and subject are not null', function () {
                        var tmpTemplate = angular.copy(emailTemplate);
                        tmpTemplate.body = '';
                        var ctrl = createController(tmpTemplate);
                        expect(ctrl.validate()).toBeFalsy();
                    });
                });

                describe('save', function () {
                    it('should call $uibModalInstance.close with correct data', function () {
                        var ctrl = createController(emailTemplate);
                        ctrl.save();
                        expect($uibModalInstance.close).toHaveBeenCalled();
                        expect($uibModalInstance.close.calls.mostRecent().args[0].to).toBe(emailTemplate.toIdentity.email);
                        expect($uibModalInstance.close.calls.mostRecent().args[0].from).toBe(emailTemplate.from);
                        expect($uibModalInstance.close.calls.mostRecent().args[0].subject).toBe(emailTemplate.subject);
                        expect($uibModalInstance.close.calls.mostRecent().args[0].body).toBe(emailTemplate.body);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9lbWFpbC9FbWFpbERpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLFlBQVksVUFBVSxTQUFTOzs7Ozs7SUFNbkc7O0lBRUEsSUFBSSxhQUFhO0lBQ2pCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3QjtXQUN2QyxVQUFVLFVBQVU7WUFDbkIsVUFBVSxTQUFTOztRQUV2QixTQUFTLFlBQVk7WUFQN0IsU0FBUyx3QkFBd0IsWUFBTTs7Z0JBRW5DLElBQUksY0FBVztvQkFBRSxvQkFBaUI7b0JBQUUsZ0JBQWE7O2dCQUVqRCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxlQUFrQjtvQkFDakMsY0FBYzs7O29CQUdkLG9CQUFvQjt3QkFDaEIsT0FBTyxRQUFROzs7O29CQUluQixnQkFBZ0I7d0JBQ1osSUFBSTt3QkFDSixJQUFJO3dCQUNKLE1BQU07d0JBQ04sU0FBUzt3QkFDVCxNQUFNO3dCQUNOLFlBQVk7NEJBQ1IsSUFBSTs0QkFDSixNQUFNOzRCQUNOLGFBQWE7NEJBQ2IsT0FBTzs7Ozs7Z0JBS25CLFNBQVMsaUJBQWlCLFVBQVU7b0JBQ2hDLE9BQU8sWUFBWSxtQkFBbUI7d0JBQ2xDLGVBQWU7d0JBQ2YsbUJBQW1COzs7O2dCQUkzQixTQUFTLGVBQWUsWUFBVztvQkFDL0IsR0FBRyw2QkFBNkIsWUFBVzt3QkFDdkMsT0FBTyxZQUFXOzRCQUNkOzJCQUNEOzs7b0JBR1AsR0FBRyxvQ0FBb0MsWUFBTTt3QkFDekMsT0FBTyxZQUFXOzRCQUNkLGlCQUFpQjsyQkFDbEIsSUFBSTs7OztnQkFJZixTQUFTLG1CQUFtQixZQUFNO29CQUM5QixHQUFHLG9EQUFvRCxZQUFNO3dCQUN6RCxJQUFJLGNBQWMsUUFBUSxLQUFLO3dCQUMvQixPQUFPLFlBQVksV0FBVzt3QkFDOUIsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsT0FBTyxLQUFLLG1CQUFtQjs7O29CQUduQyxHQUFHLGdEQUFnRCxZQUFNO3dCQUNyRCxJQUFJLE9BQU8saUJBQWlCO3dCQUM1QixPQUFPLEtBQUssbUJBQW1COzs7b0JBR25DLEdBQUcsd0RBQXdELFlBQU07d0JBQzdELElBQUksY0FBYyxRQUFRLEtBQUs7d0JBQy9CLE9BQU8sWUFBWSxXQUFXO3dCQUM5QixZQUFZLFdBQVcsWUFBWTt3QkFDbkMsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsT0FBTyxLQUFLLG1CQUFtQjs7OztnQkFJdkMsU0FBUyxZQUFZLFlBQU07b0JBQ3ZCLEdBQUcseURBQXlELFlBQU07d0JBQzlELElBQUksT0FBTyxpQkFBaUI7d0JBQzVCLE9BQU8sS0FBSyxZQUFZOzs7b0JBRzVCLEdBQUcsb0VBQW9FLFlBQU07d0JBQ3pFLElBQUksY0FBYyxRQUFRLEtBQUs7d0JBQy9CLE9BQU8sWUFBWSxXQUFXO3dCQUM5QixJQUFJLE9BQU8saUJBQWlCO3dCQUM1QixPQUFPLEtBQUssWUFBWTs7O29CQUc1QixHQUFHLG9FQUFvRSxZQUFNO3dCQUN6RSxJQUFJLGNBQWMsUUFBUSxLQUFLO3dCQUMvQixZQUFZLFVBQVU7d0JBQ3RCLElBQUksT0FBTyxpQkFBaUI7d0JBQzVCLE9BQU8sS0FBSyxZQUFZOzs7b0JBRzVCLEdBQUcsb0VBQW9FLFlBQU07d0JBQ3pFLElBQUksY0FBYyxRQUFRLEtBQUs7d0JBQy9CLFlBQVksT0FBTzt3QkFDbkIsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsT0FBTyxLQUFLLFlBQVk7Ozs7Z0JBSWhDLFNBQVMsUUFBUSxZQUFNO29CQUNuQixHQUFHLHlEQUF5RCxZQUFNO3dCQUM5RCxJQUFJLE9BQU8saUJBQWlCO3dCQUM1QixLQUFLO3dCQUNMLE9BQU8sa0JBQWtCLE9BQU87d0JBQ2hDLE9BQU8sa0JBQWtCLE1BQU0sTUFBTSxhQUFhLEtBQUssR0FBRyxJQUFJLEtBQUssY0FBYyxXQUFXO3dCQUM1RixPQUFPLGtCQUFrQixNQUFNLE1BQU0sYUFBYSxLQUFLLEdBQUcsTUFBTSxLQUFLLGNBQWM7d0JBQ25GLE9BQU8sa0JBQWtCLE1BQU0sTUFBTSxhQUFhLEtBQUssR0FBRyxTQUFTLEtBQUssY0FBYzt3QkFDdEYsT0FBTyxrQkFBa0IsTUFBTSxNQUFNLGFBQWEsS0FBSyxHQUFHLE1BQU0sS0FBSyxjQUFjOzs7Ozs7R0FnQjVGIiwiZmlsZSI6ImNvbW1vbi9lbWFpbC9FbWFpbERpYWxvZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZW1haWxNb2R1bGUgZnJvbSAnY29tbW9uL2VtYWlsL0VtYWlsTW9kdWxlJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG4vKipcbiAqIFRlc3RzIGZvciBFbWFpbERpYWxvZ0N0cmxcbiAqL1xuZGVzY3JpYmUoJ0VtYWlsRGlhbG9nQ3RybFRlc3RzJywgKCkgPT4ge1xuXG4gICAgbGV0ICRjb250cm9sbGVyLCAkdWliTW9kYWxJbnN0YW5jZSwgZW1haWxUZW1wbGF0ZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGVtYWlsTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb250cm9sbGVyXykgPT4ge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG5cbiAgICAgICAgLy8gbW9jayB1cCBhIG1vZGFsSW5zdGFuY2VcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICBjbG9zZTogamFzbWluZS5jcmVhdGVTcHkoKVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIG1vY2sgdXAgYW4gZW1haWxUZW1wbGF0ZVxuICAgICAgICBlbWFpbFRlbXBsYXRlID0ge1xuICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgIHRvOiAndGVzdEBleGFtcGxlLmNvbScsXG4gICAgICAgICAgICBmcm9tOiAnZm9vQGV4YW1wbGUuY29tJyxcbiAgICAgICAgICAgIHN1YmplY3Q6ICd0ZXN0JyxcbiAgICAgICAgICAgIGJvZHk6ICd0aGlzIGlzIGEgdGVzdC4nLFxuICAgICAgICAgICAgdG9JZGVudGl0eToge1xuICAgICAgICAgICAgICAgIGlkOiAnaWQxMjMnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdmb296eScsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdmb296eSBib296ZScsXG4gICAgICAgICAgICAgICAgZW1haWw6ICdmb296eUBleGFtcGxlLmNvbSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKHRlbXBsYXRlKSB7XG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignRW1haWxEaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgZW1haWxUZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZTogJHVpYk1vZGFsSW5zdGFuY2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCd0aHJvd3MgaWYgZGF0YSBpcyBtaXNzaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3QgdGhyb3cgd2l0aCBjb3JyZWN0IGRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcihlbWFpbFRlbXBsYXRlKTtcbiAgICAgICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc0VtYWlsQWRkcmVzcycsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiBpZGVudGl0eSBoYXMgbm8gZW1haWwgYWRkcmVzcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0bXBUZW1wbGF0ZSA9IGFuZ3VsYXIuY29weShlbWFpbFRlbXBsYXRlKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0bXBUZW1wbGF0ZS50b0lkZW50aXR5LmVtYWlsO1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHRtcFRlbXBsYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0VtYWlsQWRkcmVzcygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIGlkZW50aXR5IGhhcyBlbWFpbCBhZGRyZXNzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGVtYWlsVGVtcGxhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzRW1haWxBZGRyZXNzKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBubyBlbWFpbCBhZGRyZXNzIGJ1dCBpdHMgYSB3b3JrZ3JvdXAnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdG1wVGVtcGxhdGUgPSBhbmd1bGFyLmNvcHkoZW1haWxUZW1wbGF0ZSk7XG4gICAgICAgICAgICBkZWxldGUgdG1wVGVtcGxhdGUudG9JZGVudGl0eS5lbWFpbDtcbiAgICAgICAgICAgIHRtcFRlbXBsYXRlLnRvSWRlbnRpdHkud29ya2dyb3VwID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcih0bXBUZW1wbGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNFbWFpbEFkZHJlc3MoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd2YWxpZGF0ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBlbWFpbCwgc3ViamVjdCwgYW5kIGJvZHkgYXJlIG5vdCBudWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGVtYWlsVGVtcGxhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwudmFsaWRhdGUoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBlbWFpbCBpcyBudWxsIGFuZCBzdWJqZWN0IGFuZCBib2R5IGFyZSBub3QgbnVsbCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0bXBUZW1wbGF0ZSA9IGFuZ3VsYXIuY29weShlbWFpbFRlbXBsYXRlKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0bXBUZW1wbGF0ZS50b0lkZW50aXR5LmVtYWlsO1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHRtcFRlbXBsYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnZhbGlkYXRlKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBzdWJqZWN0IGlzIG51bGwgYW5kIGVtYWlsIGFuZCBib2R5IGFyZSBub3QgbnVsbCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0bXBUZW1wbGF0ZSA9IGFuZ3VsYXIuY29weShlbWFpbFRlbXBsYXRlKTtcbiAgICAgICAgICAgIHRtcFRlbXBsYXRlLnN1YmplY3QgPSAnJztcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcih0bXBUZW1wbGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC52YWxpZGF0ZSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgYm9keSBpcyBudWxsIGFuZCBlbWFpbCBhbmQgc3ViamVjdCBhcmUgbm90IG51bGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdG1wVGVtcGxhdGUgPSBhbmd1bGFyLmNvcHkoZW1haWxUZW1wbGF0ZSk7XG4gICAgICAgICAgICB0bXBUZW1wbGF0ZS5ib2R5ID0gJyc7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIodG1wVGVtcGxhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwudmFsaWRhdGUoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NhdmUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSB3aXRoIGNvcnJlY3QgZGF0YScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihlbWFpbFRlbXBsYXRlKTtcbiAgICAgICAgICAgIGN0cmwuc2F2ZSgpO1xuICAgICAgICAgICAgZXhwZWN0KCR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0udG8pLnRvQmUoZW1haWxUZW1wbGF0ZS50b0lkZW50aXR5LmVtYWlsKTtcbiAgICAgICAgICAgIGV4cGVjdCgkdWliTW9kYWxJbnN0YW5jZS5jbG9zZS5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS5mcm9tKS50b0JlKGVtYWlsVGVtcGxhdGUuZnJvbSk7XG4gICAgICAgICAgICBleHBlY3QoJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0uc3ViamVjdCkudG9CZShlbWFpbFRlbXBsYXRlLnN1YmplY3QpO1xuICAgICAgICAgICAgZXhwZWN0KCR1aWJNb2RhbEluc3RhbmNlLmNsb3NlLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLmJvZHkpLnRvQmUoZW1haWxUZW1wbGF0ZS5ib2R5KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
