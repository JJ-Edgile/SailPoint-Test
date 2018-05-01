System.register(['test/js/TestInitializer', 'common/managedattribute/ManagedAttributeModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var managedAttributeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonManagedattributeManagedAttributeModule) {
            managedAttributeModule = _commonManagedattributeManagedAttributeModule['default'];
        }],
        execute: function () {

            describe('ManagedAttributeDialogService', function () {

                var managedAttributeDialogService = undefined,
                    spModal = undefined,
                    $rootScope = undefined,
                    managedAttribute = undefined,
                    detailResourceUrl = 'some/url';

                beforeEach(module(managedAttributeModule));

                beforeEach(inject(function (_managedAttributeDialogService_, _spModal_, _$rootScope_) {
                    managedAttributeDialogService = _managedAttributeDialogService_;
                    spModal = _spModal_;
                    $rootScope = _$rootScope_;

                    var modal = {
                        setTitle: jasmine.createSpy('setTitle')
                    };
                    spyOn(spModal, 'open').and.returnValue(modal);

                    // Create a fake role to test with.
                    managedAttribute = {
                        application: 'App1',
                        attribute: 'someattribute',
                        displayValue: 'this is the thing',
                        value: 'thingthing',
                        requestable: true,
                        description: 'how does one describe a thing such as this',
                        type: 'THINGTHING',
                        extendedAttributes: {
                            'Something Great': 'Nah not really',
                            'yep': 'nope, yep, nope'
                        },
                        groupAttributes: {
                            weirdid: '2342342134',
                            yaddayadda: 'isgood'
                        },
                        groupEntitlements: [{
                            attribute: 'Attribute One',
                            displayValue: 'VALUE',
                            description: 'hellp dummy'
                        }, {
                            attribute: 'Attribute One',
                            displayValue: 'ANOTHERVALUE',
                            description: 'yousuck'
                        }]
                    };
                }));

                describe('show dialog', function () {
                    it('blows up without managed attribute', function () {
                        expect(function () {
                            return managedAttributeDialogService.showDialog(null, detailResourceUrl);
                        }).toThrow();
                    });

                    it('blows up without url', function () {
                        expect(function () {
                            return managedAttributeDialogService.showDialog(managedAttribute, null);
                        }).toThrow();
                    });

                    it('opens the detail dialog ', function () {
                        managedAttributeDialogService.showDialog(managedAttribute, detailResourceUrl);
                        expect(spModal.open).toHaveBeenCalled();

                        var config = spModal.open.calls.mostRecent().args[0];
                        expect(config.resolve).toBeDefined();
                        expect(config.resolve.managedAttribute()).toEqual(managedAttribute);
                        expect(config.resolve.detailResourceUrl()).toEqual(detailResourceUrl);
                    });

                    it('sets the dialog title with the display value', function () {
                        var modal = managedAttributeDialogService.showDialog(managedAttribute, detailResourceUrl);
                        $rootScope.$digest();
                        expect(modal.setTitle).toHaveBeenCalledWith(managedAttribute.displayValue);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG1EQUFtRCxVQUFVLFNBQVM7OztJQUc5Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsK0NBQStDO1lBQ3JHLHlCQUF5Qiw4Q0FBOEM7O1FBRTNFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxpQ0FBaUMsWUFBTTs7Z0JBRTVDLElBQUksZ0NBQTZCO29CQUFFLFVBQU87b0JBQUUsYUFBVTtvQkFBRSxtQkFBZ0I7b0JBQ3BFLG9CQUFvQjs7Z0JBRXhCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGlDQUFpQyxXQUFXLGNBQWlCO29CQUM1RSxnQ0FBZ0M7b0JBQ2hDLFVBQVU7b0JBQ1YsYUFBYTs7b0JBRWIsSUFBSSxRQUFRO3dCQUNSLFVBQVUsUUFBUSxVQUFVOztvQkFFaEMsTUFBTSxTQUFTLFFBQVEsSUFBSSxZQUFZOzs7b0JBR3ZDLG1CQUFtQjt3QkFDZixhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxPQUFPO3dCQUNQLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixNQUFNO3dCQUNOLG9CQUFvQjs0QkFDaEIsbUJBQW1COzRCQUNuQixPQUFPOzt3QkFFWCxpQkFBaUI7NEJBQ2IsU0FBUzs0QkFDVCxZQUFZOzt3QkFFaEIsbUJBQW1CLENBQ2Y7NEJBQ0ksV0FBVzs0QkFDWCxjQUFjOzRCQUNkLGFBQWE7MkJBRWpCOzRCQUNJLFdBQVc7NEJBQ1gsY0FBYzs0QkFDZCxhQUFhOzs7OztnQkFNN0IsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsc0NBQXNDLFlBQU07d0JBQzNDLE9BQU8sWUFBQTs0QkFRUyxPQVJILDhCQUE4QixXQUFXLE1BQU07MkJBQW9COzs7b0JBR3BGLEdBQUcsd0JBQXdCLFlBQU07d0JBQzdCLE9BQU8sWUFBQTs0QkFVUyxPQVZILDhCQUE4QixXQUFXLGtCQUFrQjsyQkFBTzs7O29CQUduRixHQUFHLDRCQUE0QixZQUFNO3dCQUNqQyw4QkFBOEIsV0FBVyxrQkFBa0I7d0JBQzNELE9BQU8sUUFBUSxNQUFNOzt3QkFFckIsSUFBSSxTQUFTLFFBQVEsS0FBSyxNQUFNLGFBQWEsS0FBSzt3QkFDbEQsT0FBTyxPQUFPLFNBQVM7d0JBQ3ZCLE9BQU8sT0FBTyxRQUFRLG9CQUFvQixRQUFRO3dCQUNsRCxPQUFPLE9BQU8sUUFBUSxxQkFBcUIsUUFBUTs7O29CQUd2RCxHQUFHLGdEQUFnRCxZQUFNO3dCQUNyRCxJQUFJLFFBQVEsOEJBQThCLFdBQVcsa0JBQWtCO3dCQUN2RSxXQUFXO3dCQUNYLE9BQU8sTUFBTSxVQUFVLHFCQUFxQixpQkFBaUI7Ozs7OztHQWlCdEUiLCJmaWxlIjoiY29tbW9uL21hbmFnZWRhdHRyaWJ1dGUvTWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtYW5hZ2VkQXR0cmlidXRlTW9kdWxlIGZyb20gJ2NvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVNb2R1bGUnO1xuXG5kZXNjcmliZSgnTWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2UnLCAoKSA9PiB7XG5cbiAgICBsZXQgbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2UsIHNwTW9kYWwsICRyb290U2NvcGUsIG1hbmFnZWRBdHRyaWJ1dGUsXG4gICAgICAgIGRldGFpbFJlc291cmNlVXJsID0gJ3NvbWUvdXJsJztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1hbmFnZWRBdHRyaWJ1dGVNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2VfLCBfc3BNb2RhbF8sIF8kcm9vdFNjb3BlXykgPT4ge1xuICAgICAgICBtYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZSA9IF9tYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZV87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG5cbiAgICAgICAgbGV0IG1vZGFsID0ge1xuICAgICAgICAgICAgc2V0VGl0bGU6IGphc21pbmUuY3JlYXRlU3B5KCdzZXRUaXRsZScpXG4gICAgICAgIH07XG4gICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKG1vZGFsKTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBmYWtlIHJvbGUgdG8gdGVzdCB3aXRoLlxuICAgICAgICBtYW5hZ2VkQXR0cmlidXRlID0ge1xuICAgICAgICAgICAgYXBwbGljYXRpb246ICdBcHAxJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZTogJ3NvbWVhdHRyaWJ1dGUnLFxuICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAndGhpcyBpcyB0aGUgdGhpbmcnLFxuICAgICAgICAgICAgdmFsdWU6ICd0aGluZ3RoaW5nJyxcbiAgICAgICAgICAgIHJlcXVlc3RhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdob3cgZG9lcyBvbmUgZGVzY3JpYmUgYSB0aGluZyBzdWNoIGFzIHRoaXMnLFxuICAgICAgICAgICAgdHlwZTogJ1RISU5HVEhJTkcnLFxuICAgICAgICAgICAgZXh0ZW5kZWRBdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgJ1NvbWV0aGluZyBHcmVhdCc6ICdOYWggbm90IHJlYWxseScsXG4gICAgICAgICAgICAgICAgJ3llcCc6ICdub3BlLCB5ZXAsIG5vcGUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ3JvdXBBdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgd2VpcmRpZDogJzIzNDIzNDIxMzQnLFxuICAgICAgICAgICAgICAgIHlhZGRheWFkZGE6ICdpc2dvb2QnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ3JvdXBFbnRpdGxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogJ0F0dHJpYnV0ZSBPbmUnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdWQUxVRScsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnaGVsbHAgZHVtbXknXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogJ0F0dHJpYnV0ZSBPbmUnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdBTk9USEVSVkFMVUUnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ3lvdXN1Y2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdzaG93IGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgaXQoJ2Jsb3dzIHVwIHdpdGhvdXQgbWFuYWdlZCBhdHRyaWJ1dGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2Uuc2hvd0RpYWxvZyhudWxsLCBkZXRhaWxSZXNvdXJjZVVybCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2Jsb3dzIHVwIHdpdGhvdXQgdXJsJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IG1hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2cobWFuYWdlZEF0dHJpYnV0ZSwgbnVsbCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ29wZW5zIHRoZSBkZXRhaWwgZGlhbG9nICcsICgpID0+IHtcbiAgICAgICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2cobWFuYWdlZEF0dHJpYnV0ZSwgZGV0YWlsUmVzb3VyY2VVcmwpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5yZXNvbHZlKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5yZXNvbHZlLm1hbmFnZWRBdHRyaWJ1dGUoKSkudG9FcXVhbChtYW5hZ2VkQXR0cmlidXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcucmVzb2x2ZS5kZXRhaWxSZXNvdXJjZVVybCgpKS50b0VxdWFsKGRldGFpbFJlc291cmNlVXJsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIGRpYWxvZyB0aXRsZSB3aXRoIHRoZSBkaXNwbGF5IHZhbHVlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1vZGFsID0gbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2Uuc2hvd0RpYWxvZyhtYW5hZ2VkQXR0cmlidXRlLCBkZXRhaWxSZXNvdXJjZVVybCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbC5zZXRUaXRsZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobWFuYWdlZEF0dHJpYnV0ZS5kaXNwbGF5VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
