System.register(['test/js/TestInitializer', 'common/modal/ModalModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var modalModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModalModalModule) {
            modalModule = _commonModalModalModule['default'];
        }],
        execute: function () {

            describe('delegationDialogService', function () {
                var delegationDialogService = undefined,
                    spModal = undefined,
                    $q = undefined,
                    $scope = undefined;

                beforeEach(module(modalModule));

                beforeEach(inject(function (_delegationDialogService_, _spModal_, _$q_, $rootScope) {
                    delegationDialogService = _delegationDialogService_;
                    spModal = _spModal_;
                    $q = _$q_;
                    $scope = $rootScope.$new();
                }));

                function setupModal(result) {
                    spyOn(spModal, 'open').and.returnValue({
                        result: $q.when(result)
                    });
                }

                describe('showDelegationDialog', function () {
                    var config = {
                        title: 'delegation dialog title',
                        description: 'descriptive text',
                        helpText: 'some help text',
                        readOnly: false
                    };

                    it('throws with no config', function () {
                        expect(function () {
                            return delegationDialogService.showDelegationDialog();
                        }).toThrow();
                    });

                    it('calls spModal.open with correct values', function () {
                        setupModal();
                        delegationDialogService.showDelegationDialog(config);
                        $scope.$apply();

                        var modalArgs = spModal.open.calls.mostRecent().args;
                        expect(modalArgs.length).toEqual(1);
                        var modalConfig = modalArgs[0];

                        expect(modalConfig.title).toEqual(config.title);
                        expect(modalConfig.resolve.description()).toEqual(config.description);
                        expect(modalConfig.resolve.helpText()).toEqual(config.helpText);
                        expect(modalConfig.resolve.readOnly()).toEqual(config.readOnly);
                    });

                    it('returns promise that resolves with result of modal', function () {
                        var returnValue = undefined,
                            result = {
                            recipient: 'recipientId',
                            comments: 'whatever'
                        };
                        setupModal(result);
                        delegationDialogService.showDelegationDialog(config).then(function (val) {
                            return returnValue = val;
                        });
                        $scope.$apply();
                        expect(returnValue).toEqual(result);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RhbC9EZWxlZ2F0aW9uRGlhbG9nU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw2QkFBNkIsVUFBVSxTQUFTOzs7OztJQUt4Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGNBQWMsd0JBQXdCOztRQUUxQyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsMkJBQTJCLFlBQU07Z0JBQ3RDLElBQUksMEJBQXVCO29CQUFFLFVBQU87b0JBQUUsS0FBRTtvQkFBRSxTQUFNOztnQkFFaEQsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsMkJBQTJCLFdBQVcsTUFBTSxZQUFlO29CQUMxRSwwQkFBMEI7b0JBQzFCLFVBQVU7b0JBQ1YsS0FBSztvQkFDTCxTQUFTLFdBQVc7OztnQkFHeEIsU0FBUyxXQUFXLFFBQVE7b0JBQ3hCLE1BQU0sU0FBUyxRQUFRLElBQUksWUFBWTt3QkFDbkMsUUFBUSxHQUFHLEtBQUs7Ozs7Z0JBSXhCLFNBQVMsd0JBQXdCLFlBQU07b0JBQ25DLElBQUksU0FBUzt3QkFDVCxPQUFPO3dCQUNQLGFBQWE7d0JBQ2IsVUFBVTt3QkFDVixVQUFVOzs7b0JBR2QsR0FBRyx5QkFBeUIsWUFBTTt3QkFDOUIsT0FBTyxZQUFBOzRCQVdTLE9BWEgsd0JBQXdCOzJCQUF3Qjs7O29CQUdqRSxHQUFHLDBDQUEwQyxZQUFNO3dCQUMvQzt3QkFDQSx3QkFBd0IscUJBQXFCO3dCQUM3QyxPQUFPOzt3QkFFUCxJQUFJLFlBQVksUUFBUSxLQUFLLE1BQU0sYUFBYTt3QkFDaEQsT0FBTyxVQUFVLFFBQVEsUUFBUTt3QkFDakMsSUFBSSxjQUFjLFVBQVU7O3dCQUU1QixPQUFPLFlBQVksT0FBTyxRQUFRLE9BQU87d0JBQ3pDLE9BQU8sWUFBWSxRQUFRLGVBQWUsUUFBUSxPQUFPO3dCQUN6RCxPQUFPLFlBQVksUUFBUSxZQUFZLFFBQVEsT0FBTzt3QkFDdEQsT0FBTyxZQUFZLFFBQVEsWUFBWSxRQUFRLE9BQU87OztvQkFHMUQsR0FBRyxzREFBc0QsWUFBTTt3QkFDM0QsSUFBSSxjQUFXOzRCQUNYLFNBQVM7NEJBQ0wsV0FBVzs0QkFDWCxVQUFVOzt3QkFFbEIsV0FBVzt3QkFDWCx3QkFBd0IscUJBQXFCLFFBQVEsS0FBSyxVQUFDLEtBQUc7NEJBYTlDLE9BYm1ELGNBQWM7O3dCQUNqRixPQUFPO3dCQUNQLE9BQU8sYUFBYSxRQUFROzs7Ozs7R0FvQnJDIiwiZmlsZSI6ImNvbW1vbi9tb2RhbC9EZWxlZ2F0aW9uRGlhbG9nU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtb2RhbE1vZHVsZSBmcm9tICdjb21tb24vbW9kYWwvTW9kYWxNb2R1bGUnO1xuXG5kZXNjcmliZSgnZGVsZWdhdGlvbkRpYWxvZ1NlcnZpY2UnLCAoKSA9PiB7XG4gICAgbGV0IGRlbGVnYXRpb25EaWFsb2dTZXJ2aWNlLCBzcE1vZGFsLCAkcSwgJHNjb3BlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kYWxNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfZGVsZWdhdGlvbkRpYWxvZ1NlcnZpY2VfLCBfc3BNb2RhbF8sIF8kcV8sICRyb290U2NvcGUpID0+IHtcbiAgICAgICAgZGVsZWdhdGlvbkRpYWxvZ1NlcnZpY2UgPSBfZGVsZWdhdGlvbkRpYWxvZ1NlcnZpY2VfO1xuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIHNldHVwTW9kYWwocmVzdWx0KSB7XG4gICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcbiAgICAgICAgICAgIHJlc3VsdDogJHEud2hlbihyZXN1bHQpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdzaG93RGVsZWdhdGlvbkRpYWxvZycsICgpID0+IHtcbiAgICAgICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiAnZGVsZWdhdGlvbiBkaWFsb2cgdGl0bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdkZXNjcmlwdGl2ZSB0ZXh0JyxcbiAgICAgICAgICAgIGhlbHBUZXh0OiAnc29tZSBoZWxwIHRleHQnLFxuICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGNvbmZpZycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBkZWxlZ2F0aW9uRGlhbG9nU2VydmljZS5zaG93RGVsZWdhdGlvbkRpYWxvZygpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYWxscyBzcE1vZGFsLm9wZW4gd2l0aCBjb3JyZWN0IHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICAgIHNldHVwTW9kYWwoKTtcbiAgICAgICAgICAgIGRlbGVnYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dEZWxlZ2F0aW9uRGlhbG9nKGNvbmZpZyk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIGxldCBtb2RhbEFyZ3MgPSBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XG4gICAgICAgICAgICBleHBlY3QobW9kYWxBcmdzLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGxldCBtb2RhbENvbmZpZyA9IG1vZGFsQXJnc1swXTtcblxuICAgICAgICAgICAgZXhwZWN0KG1vZGFsQ29uZmlnLnRpdGxlKS50b0VxdWFsKGNvbmZpZy50aXRsZSk7XG4gICAgICAgICAgICBleHBlY3QobW9kYWxDb25maWcucmVzb2x2ZS5kZXNjcmlwdGlvbigpKS50b0VxdWFsKGNvbmZpZy5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBleHBlY3QobW9kYWxDb25maWcucmVzb2x2ZS5oZWxwVGV4dCgpKS50b0VxdWFsKGNvbmZpZy5oZWxwVGV4dCk7XG4gICAgICAgICAgICBleHBlY3QobW9kYWxDb25maWcucmVzb2x2ZS5yZWFkT25seSgpKS50b0VxdWFsKGNvbmZpZy5yZWFkT25seSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHJlc3VsdCBvZiBtb2RhbCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSxcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudDogJ3JlY2lwaWVudElkJyxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudHM6ICd3aGF0ZXZlcidcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2V0dXBNb2RhbChyZXN1bHQpO1xuICAgICAgICAgICAgZGVsZWdhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0RlbGVnYXRpb25EaWFsb2coY29uZmlnKS50aGVuKCh2YWwpID0+IHJldHVyblZhbHVlID0gdmFsKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXR1cm5WYWx1ZSkudG9FcXVhbChyZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
