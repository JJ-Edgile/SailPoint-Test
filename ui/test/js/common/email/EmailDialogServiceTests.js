System.register(['test/js/TestInitializer', 'common/email/EmailModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * EmailDialogService tests
     */
    'use strict';

    var emailModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonEmailEmailModule) {
            emailModule = _commonEmailEmailModule['default'];
        }],
        execute: function () {
            describe('emailDialogService', function () {

                var spModal = undefined,
                    $q = undefined,
                    emailDialogService = undefined,
                    $scope = undefined;

                beforeEach(module(emailModule));

                beforeEach(inject(function (_spModal_, _$q_, _emailDialogService_, _$rootScope_) {
                    spModal = _spModal_;
                    $q = _$q_;
                    emailDialogService = _emailDialogService_;
                    $scope = _$rootScope_;

                    spyOn(spModal, 'open').and.returnValue({
                        result: $q.when({})
                    });
                }));

                describe('showEmailDialog', function () {
                    it('should open spModal with appropriate params', function () {
                        var template = {
                            foo: 'bar'
                        };

                        emailDialogService.showEmailDialog(template, 'foo title');

                        expect(spModal.open).toHaveBeenCalled();
                        expect(spModal.open.calls.mostRecent().args[0].resolve.emailTemplate()).toBe(template);
                        // and spot check
                        expect(spModal.open.calls.mostRecent().args[0].title).toBe('foo title');
                    });
                });

                describe('sendEmailWithDialog', function () {
                    var getTemplateFunc = undefined,
                        getTemplateDeferred = undefined,
                        sendTemplateFunc = undefined,
                        sendTemplateDeferred = undefined,
                        showDialogDeferred = undefined,
                        spNotificationService = undefined;

                    beforeEach(inject(function (_spNotificationService_) {
                        spNotificationService = _spNotificationService_;
                        spyOn(spNotificationService, 'addNotification');
                        spyOn(spNotificationService, 'triggerDirective');

                        getTemplateDeferred = $q.defer();
                        sendTemplateDeferred = $q.defer();
                        showDialogDeferred = $q.defer();
                        getTemplateFunc = jasmine.createSpy('getTemplateFunc').and.returnValue(getTemplateDeferred.promise);
                        sendTemplateFunc = jasmine.createSpy('sendTemplateFunc').and.returnValue(sendTemplateDeferred.promise);
                        spyOn(emailDialogService, 'showEmailDialog').and.returnValue(showDialogDeferred.promise);
                    }));

                    it('throws without get or send functions', function () {
                        expect(function () {
                            return emailDialogService(undefined, sendTemplateFunc);
                        }).toThrow();
                        expect(function () {
                            return emailDialogService(getTemplateFunc, undefined);
                        }).toThrow();
                    });

                    it('should call get template func, show dialog with template, and send email with modified template()', function () {
                        var template = {
                            some: 'template'
                        },
                            modifiedTemplate = {
                            another: 'template'
                        },
                            title = 'whatever';

                        emailDialogService.sendEmailWithDialog(getTemplateFunc, sendTemplateFunc, title);
                        expect(getTemplateFunc).toHaveBeenCalled();
                        getTemplateDeferred.resolve(template);
                        $scope.$apply();
                        expect(emailDialogService.showEmailDialog).toHaveBeenCalledWith(template, title);
                        showDialogDeferred.resolve(modifiedTemplate);
                        $scope.$apply();
                        expect(sendTemplateFunc).toHaveBeenCalledWith(modifiedTemplate);
                    });

                    it('should call spNotificationService() on success', function () {
                        var template = {
                            some: 'template'
                        };
                        emailDialogService.sendEmailWithDialog(getTemplateFunc, sendTemplateFunc);
                        getTemplateDeferred.resolve(template);
                        showDialogDeferred.resolve(template);
                        sendTemplateDeferred.resolve({ status: 200 });
                        $scope.$apply();
                        expect(spNotificationService.addNotification).toHaveBeenCalled();
                        expect(spNotificationService.triggerDirective).toHaveBeenCalled();
                    });

                    it('should show alert dialog when sending email returns response status of 500', function () {
                        var template = {
                            some: 'template'
                        };
                        emailDialogService.sendEmailWithDialog(getTemplateFunc, sendTemplateFunc);
                        getTemplateDeferred.resolve(template);
                        showDialogDeferred.resolve(template);
                        sendTemplateDeferred.reject({ status: 500 });
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                        expect(spModal.open.calls.mostRecent().args[0].title).toBe('ui_email_error_title');
                        expect(spModal.open.calls.mostRecent().args[0].type).toBe('alert');
                    });

                    it('does not send email if dialog is canceled', function () {
                        var template = {
                            some: 'template'
                        };
                        emailDialogService.sendEmailWithDialog(getTemplateFunc, sendTemplateFunc);
                        getTemplateDeferred.resolve(template);
                        showDialogDeferred.reject();
                        $scope.$apply();
                        expect(sendTemplateFunc).not.toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9lbWFpbC9FbWFpbERpYWxvZ1NlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7O0lBTXhGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7O1FBRTFDLFNBQVMsWUFBWTtZQU43QixTQUFTLHNCQUFzQixZQUFNOztnQkFFbEMsSUFBSSxVQUFPO29CQUFFLEtBQUU7b0JBQUUscUJBQWtCO29CQUFFLFNBQU07O2dCQUUxQyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxXQUFXLE1BQU0sc0JBQXNCLGNBQWlCO29CQUN2RSxVQUFVO29CQUNWLEtBQUs7b0JBQ0wscUJBQXFCO29CQUNyQixTQUFTOztvQkFFVCxNQUFNLFNBQVMsUUFBUSxJQUFJLFlBQVk7d0JBQ25DLFFBQVEsR0FBRyxLQUFLOzs7O2dCQUl4QixTQUFTLG1CQUFtQixZQUFNO29CQUM5QixHQUFHLCtDQUErQyxZQUFNO3dCQUNwRCxJQUFJLFdBQVc7NEJBQ1gsS0FBSzs7O3dCQUdULG1CQUFtQixnQkFBZ0IsVUFBVTs7d0JBRTdDLE9BQU8sUUFBUSxNQUFNO3dCQUNyQixPQUFPLFFBQVEsS0FBSyxNQUFNLGFBQWEsS0FBSyxHQUFHLFFBQVEsaUJBQWlCLEtBQUs7O3dCQUU3RSxPQUFPLFFBQVEsS0FBSyxNQUFNLGFBQWEsS0FBSyxHQUFHLE9BQU8sS0FBSzs7OztnQkFJbkUsU0FBUyx1QkFBdUIsWUFBTTtvQkFDbEMsSUFBSSxrQkFBZTt3QkFBRSxzQkFBbUI7d0JBQUUsbUJBQWdCO3dCQUFFLHVCQUFvQjt3QkFBRSxxQkFBa0I7d0JBQ2hHLHdCQUFxQjs7b0JBRXpCLFdBQVcsT0FBTyxVQUFDLHlCQUE0Qjt3QkFDM0Msd0JBQXdCO3dCQUN4QixNQUFNLHVCQUF1Qjt3QkFDN0IsTUFBTSx1QkFBdUI7O3dCQUU3QixzQkFBc0IsR0FBRzt3QkFDekIsdUJBQXVCLEdBQUc7d0JBQzFCLHFCQUFxQixHQUFHO3dCQUN4QixrQkFBa0IsUUFBUSxVQUFVLG1CQUFtQixJQUFJLFlBQVksb0JBQW9CO3dCQUMzRixtQkFBbUIsUUFBUSxVQUFVLG9CQUFvQixJQUFJLFlBQVkscUJBQXFCO3dCQUM5RixNQUFNLG9CQUFvQixtQkFBbUIsSUFBSSxZQUFZLG1CQUFtQjs7O29CQUdwRixHQUFJLHdDQUF3QyxZQUFNO3dCQUM5QyxPQUFPLFlBQUE7NEJBZVMsT0FmSCxtQkFBbUIsV0FBVzsyQkFBbUI7d0JBQzlELE9BQU8sWUFBQTs0QkFpQlMsT0FqQkgsbUJBQW1CLGlCQUFpQjsyQkFBWTs7O29CQUlqRSxHQUFHLHFHQUFxRyxZQUFNO3dCQUMxRyxJQUFJLFdBQVc7NEJBQ1gsTUFBTTs7NEJBQ1AsbUJBQW1COzRCQUNsQixTQUFTOzs0QkFDVixRQUFROzt3QkFFWCxtQkFBbUIsb0JBQW9CLGlCQUFpQixrQkFBa0I7d0JBQzFFLE9BQU8saUJBQWlCO3dCQUN4QixvQkFBb0IsUUFBUTt3QkFDNUIsT0FBTzt3QkFDUCxPQUFPLG1CQUFtQixpQkFBaUIscUJBQXFCLFVBQVU7d0JBQzFFLG1CQUFtQixRQUFRO3dCQUMzQixPQUFPO3dCQUNQLE9BQU8sa0JBQWtCLHFCQUFxQjs7O29CQUdsRCxHQUFHLGtEQUFrRCxZQUFNO3dCQUN2RCxJQUFJLFdBQVc7NEJBQ1gsTUFBTTs7d0JBRVYsbUJBQW1CLG9CQUFvQixpQkFBaUI7d0JBQ3hELG9CQUFvQixRQUFRO3dCQUM1QixtQkFBbUIsUUFBUTt3QkFDM0IscUJBQXFCLFFBQVEsRUFBRSxRQUFRO3dCQUN2QyxPQUFPO3dCQUNQLE9BQU8sc0JBQXNCLGlCQUFpQjt3QkFDOUMsT0FBTyxzQkFBc0Isa0JBQWtCOzs7b0JBR25ELEdBQUcsOEVBQThFLFlBQU07d0JBQ25GLElBQUksV0FBVzs0QkFDWCxNQUFNOzt3QkFFVixtQkFBbUIsb0JBQW9CLGlCQUFpQjt3QkFDeEQsb0JBQW9CLFFBQVE7d0JBQzVCLG1CQUFtQixRQUFRO3dCQUMzQixxQkFBcUIsT0FBTyxFQUFFLFFBQVE7d0JBQ3RDLE9BQU87d0JBQ1AsT0FBTyxRQUFRLE1BQU07d0JBQ3JCLE9BQU8sUUFBUSxLQUFLLE1BQU0sYUFBYSxLQUFLLEdBQUcsT0FBTyxLQUFLO3dCQUMzRCxPQUFPLFFBQVEsS0FBSyxNQUFNLGFBQWEsS0FBSyxHQUFHLE1BQU0sS0FBSzs7O29CQUc5RCxHQUFHLDZDQUE2QyxZQUFNO3dCQUNsRCxJQUFJLFdBQVc7NEJBQ1gsTUFBTTs7d0JBRVYsbUJBQW1CLG9CQUFvQixpQkFBaUI7d0JBQ3hELG9CQUFvQixRQUFRO3dCQUM1QixtQkFBbUI7d0JBQ25CLE9BQU87d0JBQ1AsT0FBTyxrQkFBa0IsSUFBSTs7Ozs7O0dBeUJ0QyIsImZpbGUiOiJjb21tb24vZW1haWwvRW1haWxEaWFsb2dTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGVtYWlsTW9kdWxlIGZyb20gJ2NvbW1vbi9lbWFpbC9FbWFpbE1vZHVsZSc7XG5cbi8qKlxuICogRW1haWxEaWFsb2dTZXJ2aWNlIHRlc3RzXG4gKi9cbmRlc2NyaWJlKCdlbWFpbERpYWxvZ1NlcnZpY2UnLCAoKSA9PiB7XG5cbiAgIGxldCBzcE1vZGFsLCAkcSwgZW1haWxEaWFsb2dTZXJ2aWNlLCAkc2NvcGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShlbWFpbE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9zcE1vZGFsXywgXyRxXywgX2VtYWlsRGlhbG9nU2VydmljZV8sIF8kcm9vdFNjb3BlXykgPT4ge1xuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgIGVtYWlsRGlhbG9nU2VydmljZSA9IF9lbWFpbERpYWxvZ1NlcnZpY2VfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG5cbiAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoe1xuICAgICAgICAgICAgcmVzdWx0OiAkcS53aGVuKHt9KVxuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd0VtYWlsRGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIG9wZW4gc3BNb2RhbCB3aXRoIGFwcHJvcHJpYXRlIHBhcmFtcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBmb286ICdiYXInXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBlbWFpbERpYWxvZ1NlcnZpY2Uuc2hvd0VtYWlsRGlhbG9nKHRlbXBsYXRlLCAnZm9vIHRpdGxlJyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0ucmVzb2x2ZS5lbWFpbFRlbXBsYXRlKCkpLnRvQmUodGVtcGxhdGUpO1xuICAgICAgICAgICAgLy8gYW5kIHNwb3QgY2hlY2tcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0udGl0bGUpLnRvQmUoJ2ZvbyB0aXRsZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZW5kRW1haWxXaXRoRGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBsZXQgZ2V0VGVtcGxhdGVGdW5jLCBnZXRUZW1wbGF0ZURlZmVycmVkLCBzZW5kVGVtcGxhdGVGdW5jLCBzZW5kVGVtcGxhdGVEZWZlcnJlZCwgc2hvd0RpYWxvZ0RlZmVycmVkLFxuICAgICAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfc3BOb3RpZmljYXRpb25TZXJ2aWNlXykgPT4ge1xuICAgICAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlID0gX3NwTm90aWZpY2F0aW9uU2VydmljZV87XG4gICAgICAgICAgICBzcHlPbihzcE5vdGlmaWNhdGlvblNlcnZpY2UsICdhZGROb3RpZmljYXRpb24nKTtcbiAgICAgICAgICAgIHNweU9uKHNwTm90aWZpY2F0aW9uU2VydmljZSwgJ3RyaWdnZXJEaXJlY3RpdmUnKTtcblxuICAgICAgICAgICAgZ2V0VGVtcGxhdGVEZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICBzZW5kVGVtcGxhdGVEZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICBzaG93RGlhbG9nRGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgZ2V0VGVtcGxhdGVGdW5jID0gamFzbWluZS5jcmVhdGVTcHkoJ2dldFRlbXBsYXRlRnVuYycpLmFuZC5yZXR1cm5WYWx1ZShnZXRUZW1wbGF0ZURlZmVycmVkLnByb21pc2UpO1xuICAgICAgICAgICAgc2VuZFRlbXBsYXRlRnVuYyA9IGphc21pbmUuY3JlYXRlU3B5KCdzZW5kVGVtcGxhdGVGdW5jJykuYW5kLnJldHVyblZhbHVlKHNlbmRUZW1wbGF0ZURlZmVycmVkLnByb21pc2UpO1xuICAgICAgICAgICAgc3B5T24oZW1haWxEaWFsb2dTZXJ2aWNlLCAnc2hvd0VtYWlsRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKHNob3dEaWFsb2dEZWZlcnJlZC5wcm9taXNlKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0ICgndGhyb3dzIHdpdGhvdXQgZ2V0IG9yIHNlbmQgZnVuY3Rpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGVtYWlsRGlhbG9nU2VydmljZSh1bmRlZmluZWQsIHNlbmRUZW1wbGF0ZUZ1bmMpKS50b1Rocm93KCk7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gZW1haWxEaWFsb2dTZXJ2aWNlKGdldFRlbXBsYXRlRnVuYywgdW5kZWZpbmVkKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBnZXQgdGVtcGxhdGUgZnVuYywgc2hvdyBkaWFsb2cgd2l0aCB0ZW1wbGF0ZSwgYW5kIHNlbmQgZW1haWwgd2l0aCBtb2RpZmllZCB0ZW1wbGF0ZSgpJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0ge1xuICAgICAgICAgICAgICAgIHNvbWU6ICd0ZW1wbGF0ZSdcbiAgICAgICAgICAgIH0sIG1vZGlmaWVkVGVtcGxhdGUgPSB7XG4gICAgICAgICAgICAgICAgYW5vdGhlcjogJ3RlbXBsYXRlJ1xuICAgICAgICAgICAgfSwgdGl0bGUgPSAnd2hhdGV2ZXInO1xuXG4gICAgICAgICAgICBlbWFpbERpYWxvZ1NlcnZpY2Uuc2VuZEVtYWlsV2l0aERpYWxvZyhnZXRUZW1wbGF0ZUZ1bmMsIHNlbmRUZW1wbGF0ZUZ1bmMsIHRpdGxlKTtcbiAgICAgICAgICAgIGV4cGVjdChnZXRUZW1wbGF0ZUZ1bmMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGdldFRlbXBsYXRlRGVmZXJyZWQucmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoZW1haWxEaWFsb2dTZXJ2aWNlLnNob3dFbWFpbERpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgodGVtcGxhdGUsIHRpdGxlKTtcbiAgICAgICAgICAgIHNob3dEaWFsb2dEZWZlcnJlZC5yZXNvbHZlKG1vZGlmaWVkVGVtcGxhdGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbmRUZW1wbGF0ZUZ1bmMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG1vZGlmaWVkVGVtcGxhdGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgc3BOb3RpZmljYXRpb25TZXJ2aWNlKCkgb24gc3VjY2VzcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBzb21lOiAndGVtcGxhdGUnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZW1haWxEaWFsb2dTZXJ2aWNlLnNlbmRFbWFpbFdpdGhEaWFsb2coZ2V0VGVtcGxhdGVGdW5jLCBzZW5kVGVtcGxhdGVGdW5jKTtcbiAgICAgICAgICAgIGdldFRlbXBsYXRlRGVmZXJyZWQucmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICBzaG93RGlhbG9nRGVmZXJyZWQucmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICBzZW5kVGVtcGxhdGVEZWZlcnJlZC5yZXNvbHZlKHsgc3RhdHVzOiAyMDB9KTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLnRyaWdnZXJEaXJlY3RpdmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzaG93IGFsZXJ0IGRpYWxvZyB3aGVuIHNlbmRpbmcgZW1haWwgcmV0dXJucyByZXNwb25zZSBzdGF0dXMgb2YgNTAwJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0ge1xuICAgICAgICAgICAgICAgIHNvbWU6ICd0ZW1wbGF0ZSdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBlbWFpbERpYWxvZ1NlcnZpY2Uuc2VuZEVtYWlsV2l0aERpYWxvZyhnZXRUZW1wbGF0ZUZ1bmMsIHNlbmRUZW1wbGF0ZUZ1bmMpO1xuICAgICAgICAgICAgZ2V0VGVtcGxhdGVEZWZlcnJlZC5yZXNvbHZlKHRlbXBsYXRlKTtcbiAgICAgICAgICAgIHNob3dEaWFsb2dEZWZlcnJlZC5yZXNvbHZlKHRlbXBsYXRlKTtcbiAgICAgICAgICAgIHNlbmRUZW1wbGF0ZURlZmVycmVkLnJlamVjdCh7IHN0YXR1czogNTAwfSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLnRpdGxlKS50b0JlKCd1aV9lbWFpbF9lcnJvcl90aXRsZScpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS50eXBlKS50b0JlKCdhbGVydCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3Qgc2VuZCBlbWFpbCBpZiBkaWFsb2cgaXMgY2FuY2VsZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSB7XG4gICAgICAgICAgICAgICAgc29tZTogJ3RlbXBsYXRlJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGVtYWlsRGlhbG9nU2VydmljZS5zZW5kRW1haWxXaXRoRGlhbG9nKGdldFRlbXBsYXRlRnVuYywgc2VuZFRlbXBsYXRlRnVuYyk7XG4gICAgICAgICAgICBnZXRUZW1wbGF0ZURlZmVycmVkLnJlc29sdmUodGVtcGxhdGUpO1xuICAgICAgICAgICAgc2hvd0RpYWxvZ0RlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbmRUZW1wbGF0ZUZ1bmMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
