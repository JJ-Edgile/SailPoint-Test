System.register(['test/js/TestInitializer', 'policyViolation/dialog/PolicyViolationDialogModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var policyViolationDialogModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationDialogPolicyViolationDialogModule) {
            policyViolationDialogModule = _policyViolationDialogPolicyViolationDialogModule['default'];
        }],
        execute: function () {

            describe('AllowExceptionDialogCtrl', function () {

                var $controller = undefined,
                    $uibModalInstance = {
                    close: jasmine.createSpy()
                };

                beforeEach(module(policyViolationDialogModule));

                beforeEach(inject(function (_$controller_) {
                    $controller = _$controller_;
                }));

                /* jshint maxparams: 7 */
                function createController(date, minDate, maxDate, requireComments, showExpirationDate, comments, readOnly) {
                    return $controller('AllowExceptionDialogCtrl', {
                        expirationDate: date,
                        minDate: minDate,
                        maxDate: maxDate,
                        requireComments: requireComments,
                        showExpirationDate: showExpirationDate,
                        comments: comments,
                        readOnly: readOnly,
                        $uibModalInstance: $uibModalInstance
                    });
                }

                it('constructor throws if data is missing', function () {
                    expect(function () {
                        createController();
                    }).toThrow();
                });

                it('initializes with existing decision if defined', function () {
                    var minDate = null,
                        maxDate = null,
                        requireComments = true,
                        showExpirationDate = true,
                        mitigationExpirationDate = new Date(),
                        comments = 'hello',
                        ctrl = undefined;

                    ctrl = createController(mitigationExpirationDate, minDate, maxDate, requireComments, showExpirationDate, comments);
                    expect(ctrl.expirationDate).toEqual(mitigationExpirationDate);
                    expect(ctrl.comments).toEqual(comments);
                });

                it('save() calls $uibModalInstance.close with correct data', function () {
                    var date = new Date(),
                        minDate = null,
                        maxDate = null,
                        requireComments = true,
                        showExpirationDate = true,
                        myComments = 'foo';

                    var ctrl = createController(date, minDate, maxDate, requireComments, showExpirationDate);
                    ctrl.comments = myComments;
                    ctrl.save();
                    expect($uibModalInstance.close).toHaveBeenCalledWith({
                        comments: myComments,
                        mitigationExpirationDate: date.getTime()
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9kaWFsb2cvQWxsb3dFeGNlcHRpb25EaWFsb2dDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHVEQUF1RCxVQUFVLFNBQVM7Ozs7O0lBS2xIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtREFBbUQ7WUFDekcsOEJBQThCLGtEQUFrRDs7UUFFcEYsU0FBUyxZQUFZOztZQUw3QixTQUFTLDRCQUE0QixZQUFXOztnQkFFNUMsSUFBSSxjQUFXO29CQUFFLG9CQUFvQjtvQkFDakMsT0FBTyxRQUFROzs7Z0JBR25CLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGVBQWU7b0JBQ3RDLGNBQWM7Ozs7Z0JBSWxCLFNBQVMsaUJBQWlCLE1BQU0sU0FBUyxTQUFTLGlCQUFpQixvQkFBb0IsVUFBVSxVQUFVO29CQUN2RyxPQUFPLFlBQVksNEJBQTRCO3dCQUMzQyxnQkFBZ0I7d0JBQ2hCLFNBQVM7d0JBQ1QsU0FBUzt3QkFDVCxpQkFBaUI7d0JBQ2pCLG9CQUFvQjt3QkFDcEIsVUFBVTt3QkFDVixVQUFVO3dCQUNWLG1CQUFtQjs7OztnQkFJM0IsR0FBRyx5Q0FBeUMsWUFBVztvQkFDbkQsT0FBTyxZQUFXO3dCQUFFO3VCQUF1Qjs7O2dCQUcvQyxHQUFHLGlEQUFpRCxZQUFNO29CQUN0RCxJQUFJLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixrQkFBa0I7d0JBQ2xCLHFCQUFxQjt3QkFDckIsMkJBQTJCLElBQUk7d0JBQy9CLFdBQVc7d0JBQ1gsT0FBSTs7b0JBRVIsT0FBTyxpQkFBaUIsMEJBQTBCLFNBQVMsU0FDdkQsaUJBQWlCLG9CQUFvQjtvQkFDekMsT0FBTyxLQUFLLGdCQUFnQixRQUFRO29CQUNwQyxPQUFPLEtBQUssVUFBVSxRQUFROzs7Z0JBR2xDLEdBQUcsMERBQTBELFlBQVc7b0JBQ3BFLElBQUksT0FBTyxJQUFJO3dCQUNYLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixrQkFBa0I7d0JBQ2xCLHFCQUFxQjt3QkFDckIsYUFBYTs7b0JBRWpCLElBQUksT0FBTyxpQkFBaUIsTUFBTSxTQUFTLFNBQVMsaUJBQWlCO29CQUNyRSxLQUFLLFdBQVc7b0JBQ2hCLEtBQUs7b0JBQ0wsT0FBTyxrQkFBa0IsT0FBTyxxQkFBcUI7d0JBQ2pELFVBQVU7d0JBQ1YsMEJBQTBCLEtBQUs7Ozs7OztHQWV4QyIsImZpbGUiOiJwb2xpY3lWaW9sYXRpb24vZGlhbG9nL0FsbG93RXhjZXB0aW9uRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwb2xpY3lWaW9sYXRpb25EaWFsb2dNb2R1bGUgZnJvbSAncG9saWN5VmlvbGF0aW9uL2RpYWxvZy9Qb2xpY3lWaW9sYXRpb25EaWFsb2dNb2R1bGUnO1xuXG5kZXNjcmliZSgnQWxsb3dFeGNlcHRpb25EaWFsb2dDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgJGNvbnRyb2xsZXIsICR1aWJNb2RhbEluc3RhbmNlID0ge1xuICAgICAgICBjbG9zZTogamFzbWluZS5jcmVhdGVTcHkoKVxuICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwb2xpY3lWaW9sYXRpb25EaWFsb2dNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8pIHtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgIH0pKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDcgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKGRhdGUsIG1pbkRhdGUsIG1heERhdGUsIHJlcXVpcmVDb21tZW50cywgc2hvd0V4cGlyYXRpb25EYXRlLCBjb21tZW50cywgcmVhZE9ubHkpIHtcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdBbGxvd0V4Y2VwdGlvbkRpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICBleHBpcmF0aW9uRGF0ZTogZGF0ZSxcbiAgICAgICAgICAgIG1pbkRhdGU6IG1pbkRhdGUsXG4gICAgICAgICAgICBtYXhEYXRlOiBtYXhEYXRlLFxuICAgICAgICAgICAgcmVxdWlyZUNvbW1lbnRzOiByZXF1aXJlQ29tbWVudHMsXG4gICAgICAgICAgICBzaG93RXhwaXJhdGlvbkRhdGU6IHNob3dFeHBpcmF0aW9uRGF0ZSxcbiAgICAgICAgICAgIGNvbW1lbnRzOiBjb21tZW50cyxcbiAgICAgICAgICAgIHJlYWRPbmx5OiByZWFkT25seSxcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlOiAkdWliTW9kYWxJbnN0YW5jZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpdCgnY29uc3RydWN0b3IgdGhyb3dzIGlmIGRhdGEgaXMgbWlzc2luZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGNyZWF0ZUNvbnRyb2xsZXIoKTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2luaXRpYWxpemVzIHdpdGggZXhpc3RpbmcgZGVjaXNpb24gaWYgZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG1pbkRhdGUgPSBudWxsLFxuICAgICAgICAgICAgbWF4RGF0ZSA9IG51bGwsXG4gICAgICAgICAgICByZXF1aXJlQ29tbWVudHMgPSB0cnVlLFxuICAgICAgICAgICAgc2hvd0V4cGlyYXRpb25EYXRlID0gdHJ1ZSxcbiAgICAgICAgICAgIG1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBjb21tZW50cyA9ICdoZWxsbycsXG4gICAgICAgICAgICBjdHJsO1xuXG4gICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKG1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSxcbiAgICAgICAgICAgIHJlcXVpcmVDb21tZW50cywgc2hvd0V4cGlyYXRpb25EYXRlLCBjb21tZW50cyk7XG4gICAgICAgIGV4cGVjdChjdHJsLmV4cGlyYXRpb25EYXRlKS50b0VxdWFsKG1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSk7XG4gICAgICAgIGV4cGVjdChjdHJsLmNvbW1lbnRzKS50b0VxdWFsKGNvbW1lbnRzKTtcbiAgICB9KTtcblxuICAgIGl0KCdzYXZlKCkgY2FsbHMgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2Ugd2l0aCBjb3JyZWN0IGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgbWluRGF0ZSA9IG51bGwsXG4gICAgICAgICAgICBtYXhEYXRlID0gbnVsbCxcbiAgICAgICAgICAgIHJlcXVpcmVDb21tZW50cyA9IHRydWUsXG4gICAgICAgICAgICBzaG93RXhwaXJhdGlvbkRhdGUgPSB0cnVlLFxuICAgICAgICAgICAgbXlDb21tZW50cyA9ICdmb28nO1xuXG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihkYXRlLCBtaW5EYXRlLCBtYXhEYXRlLCByZXF1aXJlQ29tbWVudHMsIHNob3dFeHBpcmF0aW9uRGF0ZSk7XG4gICAgICAgIGN0cmwuY29tbWVudHMgPSBteUNvbW1lbnRzO1xuICAgICAgICBjdHJsLnNhdmUoKTtcbiAgICAgICAgZXhwZWN0KCR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgICBjb21tZW50czogbXlDb21tZW50cyxcbiAgICAgICAgICAgIG1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZTogZGF0ZS5nZXRUaW1lKClcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
