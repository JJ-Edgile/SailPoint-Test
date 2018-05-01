System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }],
        execute: function () {

            describe('IdentityRequestCancelDialogCtrl', function () {

                beforeEach(module(identityRequestModule));

                var $controller = undefined,
                    $rootScope = undefined,
                    modalInstance = undefined;

                beforeEach(inject(function (_$controller_, _$rootScope_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                }));

                function createController(description, comments) {
                    modalInstance = {
                        close: jasmine.createSpy('close'),
                        dismiss: jasmine.createSpy('dismiss')
                    };
                    var ctrl = $controller('IdentityRequestCancelDialogCtrl', {
                        $uibModalInstance: modalInstance,
                        description: description,
                        comments: comments
                    });
                    return ctrl;
                }

                it('should initialize with description', function () {
                    var description = 'pls cancel this request',
                        ctrl = createController(description);
                    expect(ctrl.description).toEqual(description);
                    expect(ctrl.comments).toEqual(undefined);
                });

                it('should initialize with comments and description', function () {
                    var comments = 'my comments',
                        description = 'canceling this request',
                        ctrl = createController(description, comments);
                    expect(ctrl.comments).toEqual(comments);
                    expect(ctrl.description).toEqual(description);
                });

                describe('complete()', function () {
                    it('should resolve with no comment', function () {
                        var ctrl = createController('description');
                        ctrl.complete();
                        expect(modalInstance.close).toHaveBeenCalled();
                    });

                    it('should resolve with the comment entered', function () {
                        var comment = 'request canceled',
                            ctrl = createController('description', comment);
                        ctrl.complete();
                        expect(modalInstance.close).toHaveBeenCalledWith(comment);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RDYW5jZWxEaWFsb2dDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBDQUEwQyxVQUFVLFNBQVM7OztJQUdyRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxtQ0FBbUMsWUFBVzs7Z0JBRW5ELFdBQVcsT0FBTzs7Z0JBRWxCLElBQUksY0FBVztvQkFBRSxhQUFVO29CQUFFLGdCQUFhOztnQkFFMUMsV0FBVyxPQUFPLFVBQVMsZUFBZSxjQUFjO29CQUNwRCxjQUFjO29CQUNkLGFBQWE7OztnQkFHakIsU0FBUyxpQkFBaUIsYUFBYSxVQUFVO29CQUM3QyxnQkFBZ0I7d0JBQ1osT0FBTyxRQUFRLFVBQVU7d0JBQ3pCLFNBQVMsUUFBUSxVQUFVOztvQkFFL0IsSUFBSSxPQUFPLFlBQVksbUNBQW1DO3dCQUN0RCxtQkFBbUI7d0JBQ25CLGFBQWE7d0JBQ2IsVUFBVTs7b0JBRWQsT0FBTzs7O2dCQUdYLEdBQUcsc0NBQXNDLFlBQU07b0JBQzNDLElBQUksY0FBYzt3QkFDZCxPQUFPLGlCQUFpQjtvQkFDNUIsT0FBTyxLQUFLLGFBQWEsUUFBUTtvQkFDakMsT0FBTyxLQUFLLFVBQVUsUUFBUTs7O2dCQUdsQyxHQUFHLG1EQUFtRCxZQUFNO29CQUN4RCxJQUFJLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxPQUFPLGlCQUFpQixhQUFhO29CQUN6QyxPQUFPLEtBQUssVUFBVSxRQUFRO29CQUM5QixPQUFPLEtBQUssYUFBYSxRQUFROzs7Z0JBR3JDLFNBQVMsY0FBYyxZQUFXO29CQUM5QixHQUFHLGtDQUFrQyxZQUFXO3dCQUM1QyxJQUFJLE9BQU8saUJBQWlCO3dCQUM1QixLQUFLO3dCQUNMLE9BQU8sY0FBYyxPQUFPOzs7b0JBR2hDLEdBQUcsMkNBQTJDLFlBQVc7d0JBQ3JELElBQUksVUFBVTs0QkFDVixPQUFPLGlCQUFpQixlQUFlO3dCQUMzQyxLQUFLO3dCQUNMLE9BQU8sY0FBYyxPQUFPLHFCQUFxQjs7Ozs7O0dBZTFEIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RDYW5jZWxEaWFsb2dDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0lkZW50aXR5UmVxdWVzdENhbmNlbERpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eVJlcXVlc3RNb2R1bGUpKTtcclxuXHJcbiAgICBsZXQgJGNvbnRyb2xsZXIsICRyb290U2NvcGUsIG1vZGFsSW5zdGFuY2U7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfKSB7XHJcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihkZXNjcmlwdGlvbiwgY29tbWVudHMpIHtcclxuICAgICAgICBtb2RhbEluc3RhbmNlID0ge1xyXG4gICAgICAgICAgICBjbG9zZTogamFzbWluZS5jcmVhdGVTcHkoJ2Nsb3NlJyksXHJcbiAgICAgICAgICAgIGRpc21pc3M6IGphc21pbmUuY3JlYXRlU3B5KCdkaXNtaXNzJylcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBjdHJsID0gJGNvbnRyb2xsZXIoJ0lkZW50aXR5UmVxdWVzdENhbmNlbERpYWxvZ0N0cmwnLCB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlOiBtb2RhbEluc3RhbmNlLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIGNvbW1lbnRzOiBjb21tZW50c1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjdHJsO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIGRlc2NyaXB0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9ICdwbHMgY2FuY2VsIHRoaXMgcmVxdWVzdCcsXHJcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGRlc2NyaXB0aW9uKTtcclxuICAgICAgICBleHBlY3QoY3RybC5kZXNjcmlwdGlvbikudG9FcXVhbChkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwuY29tbWVudHMpLnRvRXF1YWwodW5kZWZpbmVkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIGNvbW1lbnRzIGFuZCBkZXNjcmlwdGlvbicsICgpID0+IHtcclxuICAgICAgICBsZXQgY29tbWVudHMgPSAnbXkgY29tbWVudHMnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9ICdjYW5jZWxpbmcgdGhpcyByZXF1ZXN0JyxcclxuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZGVzY3JpcHRpb24sIGNvbW1lbnRzKTtcclxuICAgICAgICBleHBlY3QoY3RybC5jb21tZW50cykudG9FcXVhbChjb21tZW50cyk7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwuZGVzY3JpcHRpb24pLnRvRXF1YWwoZGVzY3JpcHRpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbXBsZXRlKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnc2hvdWxkIHJlc29sdmUgd2l0aCBubyBjb21tZW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcignZGVzY3JpcHRpb24nKTtcclxuICAgICAgICAgICAgY3RybC5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICBleHBlY3QobW9kYWxJbnN0YW5jZS5jbG9zZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJlc29sdmUgd2l0aCB0aGUgY29tbWVudCBlbnRlcmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjb21tZW50ID0gJ3JlcXVlc3QgY2FuY2VsZWQnLFxyXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoJ2Rlc2NyaXB0aW9uJywgY29tbWVudCk7XHJcbiAgICAgICAgICAgIGN0cmwuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1vZGFsSW5zdGFuY2UuY2xvc2UpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNvbW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
