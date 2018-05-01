System.register(['test/js/TestInitializer', 'workitem/WorkItemModule'], function (_export) {

    /**
     * Tests for the WorkItemHeaderDirectiveCtrl.
     */
    'use strict';

    var workItemModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }],
        execute: function () {
            describe('WorkItemHeaderDirectiveCtrl', function () {

                var $controller,
                    $rootScope,
                    ctrl,
                    defaultOnClickMock = jasmine.createSpy();

                beforeEach(module(workItemModule));

                /**
                 * Setup the mocks for our tests - a scope and the controller.
                 */
                beforeEach(inject(function (_$controller_, _$rootScope_) {

                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                }));

                /**
                 * Create a WorkItemHeaderDirectiveCtrl.
                 */
                var createController = function (templateStyle, collapsed, onClick) {
                    var locals = {
                        templateStyle: templateStyle,
                        onClick: onClick,
                        isCollapsed: collapsed
                    };

                    // Create the controller to test with.
                    ctrl = $controller('WorkItemHeaderDirectiveCtrl', {}, locals);
                };

                describe('WorkItemHeaderDirectiveCtrl attributes', function () {
                    it('test collapsed', function () {
                        createController('collapsible', true, defaultOnClickMock);
                        expect(ctrl.isCollapsed).toEqual(true);

                        createController('collapsible', false, defaultOnClickMock);
                        expect(ctrl.isCollapsed).toEqual(false);
                    });

                    it('test collapsible style', function () {
                        createController('collapsible', true, defaultOnClickMock);
                        expect(ctrl.getTemplateStyle()).toEqual('collapsible');
                        expect(ctrl.getRole()).toEqual('button');
                        expect(ctrl.isFull()).toEqual(false);
                        expect(ctrl.isCollapsible()).toBeTruthy();
                    });

                    it('test summary style', function () {
                        createController('summary', true, defaultOnClickMock);
                        expect(ctrl.getTemplateStyle()).toEqual('summary');
                        expect(ctrl.getRole()).toEqual('button');
                        expect(ctrl.isFull()).toEqual(false);
                        expect(ctrl.isCollapsible()).toBeFalsy();
                    });

                    it('test full style', function () {
                        createController('full', true, defaultOnClickMock);
                        expect(ctrl.getTemplateStyle()).toEqual('full');
                        expect(ctrl.getRole()).toEqual('heading');
                        expect(ctrl.isFull()).toEqual(true);
                        expect(ctrl.isCollapsible()).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1dvcmtJdGVtSGVhZGVyRGlyZWN0aXZlQ3RybFRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixVQUFVLFNBQVM7Ozs7O0lBS3ZGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZO1lBTjdCLFNBQVMsK0JBQStCLFlBQVc7O2dCQUUvQyxJQUFJO29CQUFhO29CQUFZO29CQUFNLHFCQUFxQixRQUFROztnQkFFaEUsV0FBVyxPQUFPOzs7OztnQkFLbEIsV0FBVyxPQUFPLFVBQVMsZUFBZSxjQUFjOztvQkFFcEQsY0FBYztvQkFDZCxhQUFhOzs7Ozs7Z0JBT2pCLElBQUksbUJBQW1CLFVBQVMsZUFBZSxXQUFXLFNBQVM7b0JBQy9ELElBQUksU0FBUzt3QkFDVCxlQUFlO3dCQUNmLFNBQVM7d0JBQ1QsYUFBYTs7OztvQkFJakIsT0FBTyxZQUFZLCtCQUErQixJQUFJOzs7Z0JBRzFELFNBQVMsMENBQTBDLFlBQVc7b0JBQzFELEdBQUcsa0JBQWtCLFlBQVc7d0JBQzVCLGlCQUFpQixlQUFlLE1BQU07d0JBQ3RDLE9BQU8sS0FBSyxhQUFhLFFBQVE7O3dCQUVqQyxpQkFBaUIsZUFBZSxPQUFPO3dCQUN2QyxPQUFPLEtBQUssYUFBYSxRQUFROzs7b0JBR3JDLEdBQUcsMEJBQTBCLFlBQVc7d0JBQ3BDLGlCQUFpQixlQUFlLE1BQU07d0JBQ3RDLE9BQU8sS0FBSyxvQkFBb0IsUUFBUTt3QkFDeEMsT0FBTyxLQUFLLFdBQVcsUUFBUTt3QkFDL0IsT0FBTyxLQUFLLFVBQVUsUUFBUTt3QkFDOUIsT0FBTyxLQUFLLGlCQUFpQjs7O29CQUlqQyxHQUFHLHNCQUFzQixZQUFXO3dCQUNoQyxpQkFBaUIsV0FBVyxNQUFNO3dCQUNsQyxPQUFPLEtBQUssb0JBQW9CLFFBQVE7d0JBQ3hDLE9BQU8sS0FBSyxXQUFXLFFBQVE7d0JBQy9CLE9BQU8sS0FBSyxVQUFVLFFBQVE7d0JBQzlCLE9BQU8sS0FBSyxpQkFBaUI7OztvQkFJakMsR0FBRyxtQkFBbUIsWUFBVzt3QkFDN0IsaUJBQWlCLFFBQVEsTUFBTTt3QkFDL0IsT0FBTyxLQUFLLG9CQUFvQixRQUFRO3dCQUN4QyxPQUFPLEtBQUssV0FBVyxRQUFRO3dCQUMvQixPQUFPLEtBQUssVUFBVSxRQUFRO3dCQUM5QixPQUFPLEtBQUssaUJBQWlCOzs7Ozs7R0FhdEMiLCJmaWxlIjoid29ya2l0ZW0vV29ya0l0ZW1IZWFkZXJEaXJlY3RpdmVDdHJsVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgd29ya0l0ZW1Nb2R1bGUgZnJvbSAnd29ya2l0ZW0vV29ya0l0ZW1Nb2R1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgV29ya0l0ZW1IZWFkZXJEaXJlY3RpdmVDdHJsLlxyXG4gKi9cclxuZGVzY3JpYmUoJ1dvcmtJdGVtSGVhZGVyRGlyZWN0aXZlQ3RybCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciAkY29udHJvbGxlciwgJHJvb3RTY29wZSwgY3RybCwgZGVmYXVsdE9uQ2xpY2tNb2NrID0gamFzbWluZS5jcmVhdGVTcHkoKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3b3JrSXRlbU1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIG1vY2tzIGZvciBvdXIgdGVzdHMgLSBhIHNjb3BlIGFuZCB0aGUgY29udHJvbGxlci5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfKSB7XHJcblxyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xyXG5cclxuICAgIH0pKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIFdvcmtJdGVtSGVhZGVyRGlyZWN0aXZlQ3RybC5cclxuICAgICAqL1xyXG4gICAgdmFyIGNyZWF0ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbih0ZW1wbGF0ZVN0eWxlLCBjb2xsYXBzZWQsIG9uQ2xpY2spIHtcclxuICAgICAgICB2YXIgbG9jYWxzID0ge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVN0eWxlOiB0ZW1wbGF0ZVN0eWxlLFxyXG4gICAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrLFxyXG4gICAgICAgICAgICBpc0NvbGxhcHNlZDogY29sbGFwc2VkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ1dvcmtJdGVtSGVhZGVyRGlyZWN0aXZlQ3RybCcsIHt9LCBsb2NhbHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkZXNjcmliZSgnV29ya0l0ZW1IZWFkZXJEaXJlY3RpdmVDdHJsIGF0dHJpYnV0ZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgndGVzdCBjb2xsYXBzZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcignY29sbGFwc2libGUnLCB0cnVlLCBkZWZhdWx0T25DbGlja01vY2spO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0NvbGxhcHNlZCkudG9FcXVhbCh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoJ2NvbGxhcHNpYmxlJywgZmFsc2UsIGRlZmF1bHRPbkNsaWNrTW9jayk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29sbGFwc2VkKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Rlc3QgY29sbGFwc2libGUgc3R5bGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcignY29sbGFwc2libGUnLCB0cnVlLCBkZWZhdWx0T25DbGlja01vY2spO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRUZW1wbGF0ZVN0eWxlKCkpLnRvRXF1YWwoJ2NvbGxhcHNpYmxlJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFJvbGUoKSkudG9FcXVhbCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRnVsbCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNDb2xsYXBzaWJsZSgpKS50b0JlVHJ1dGh5KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgndGVzdCBzdW1tYXJ5IHN0eWxlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoJ3N1bW1hcnknLCB0cnVlLCBkZWZhdWx0T25DbGlja01vY2spO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRUZW1wbGF0ZVN0eWxlKCkpLnRvRXF1YWwoJ3N1bW1hcnknKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Um9sZSgpKS50b0VxdWFsKCdidXR0b24nKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNGdWxsKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0NvbGxhcHNpYmxlKCkpLnRvQmVGYWxzeSgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Rlc3QgZnVsbCBzdHlsZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCdmdWxsJywgdHJ1ZSwgZGVmYXVsdE9uQ2xpY2tNb2NrKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0VGVtcGxhdGVTdHlsZSgpKS50b0VxdWFsKCdmdWxsJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFJvbGUoKSkudG9FcXVhbCgnaGVhZGluZycpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0Z1bGwoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNDb2xsYXBzaWJsZSgpKS50b0JlRmFsc3koKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
