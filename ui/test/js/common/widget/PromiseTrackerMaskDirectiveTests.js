System.register(['test/js/TestInitializer', 'common/widget/WidgetModule'], function (_export) {
    'use strict';

    var widgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonWidgetWidgetModule) {
            widgetModule = _commonWidgetWidgetModule['default'];
        }],
        execute: function () {

            describe('PromiseTrackerMaskDirective', function () {
                var $scope, $compile, tracker, element;

                beforeEach(module(widgetModule));
                beforeEach(inject(function (_$rootScope_, _$compile_, _promiseTrackerService_) {
                    var template = '<promise-tracker-mask></promise-tracker-mask>';
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    tracker = _promiseTrackerService_;

                    element = angular.element(template);
                    $compile(element)($scope);
                }));

                function isMasked() {
                    return angular.element(element.children('.overlay')).length === 0;
                }

                it('should render when tracker is in progress', function () {
                    spyOn(tracker, 'isInProgress').and.returnValue(true);
                    $scope.$apply();
                    expect(isMasked()).toBe(false);
                });

                it('should not render when tracker is not in progress', function () {
                    spyOn(tracker, 'isInProgress').and.returnValue(false);
                    $scope.$apply();
                    expect(isMasked()).toBe(true);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvUHJvbWlzZVRyYWNrZXJNYXNrRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLCtCQUErQixVQUFVLFNBQVM7SUFBOUY7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJCQUEyQjtZQUNqRixlQUFlLDBCQUEwQjs7UUFFN0MsU0FBUyxZQUFZOztZQUg3QixTQUFTLCtCQUErQixZQUFXO2dCQUMvQyxJQUFJLFFBQVEsVUFBVSxTQUFTOztnQkFFL0IsV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU8sVUFBUyxjQUFjLFlBQVkseUJBQXlCO29CQUMxRSxJQUFJLFdBQVc7b0JBQ2YsU0FBUztvQkFDVCxXQUFXO29CQUNYLFVBQVU7O29CQUVWLFVBQVUsUUFBUSxRQUFRO29CQUMxQixTQUFTLFNBQVM7OztnQkFHdEIsU0FBUyxXQUFXO29CQUNoQixPQUFPLFFBQVEsUUFBUSxRQUFRLFNBQVMsYUFBYSxXQUFXOzs7Z0JBR3BFLEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELE1BQU0sU0FBUyxnQkFBZ0IsSUFBSSxZQUFZO29CQUMvQyxPQUFPO29CQUNQLE9BQU8sWUFBWSxLQUFLOzs7Z0JBRzVCLEdBQUcscURBQXFELFlBQVc7b0JBQy9ELE1BQU0sU0FBUyxnQkFBZ0IsSUFBSSxZQUFZO29CQUMvQyxPQUFPO29CQUNQLE9BQU8sWUFBWSxLQUFLOzs7OztHQVU3QiIsImZpbGUiOiJjb21tb24vd2lkZ2V0L1Byb21pc2VUcmFja2VyTWFza0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3aWRnZXRNb2R1bGUgZnJvbSAnY29tbW9uL3dpZGdldC9XaWRnZXRNb2R1bGUnO1xuXG5kZXNjcmliZSgnUHJvbWlzZVRyYWNrZXJNYXNrRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRzY29wZSwgJGNvbXBpbGUsIHRyYWNrZXIsIGVsZW1lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3aWRnZXRNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF9wcm9taXNlVHJhY2tlclNlcnZpY2VfKSB7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9ICc8cHJvbWlzZS10cmFja2VyLW1hc2s+PC9wcm9taXNlLXRyYWNrZXItbWFzaz4nO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgdHJhY2tlciA9IF9wcm9taXNlVHJhY2tlclNlcnZpY2VfO1xuXG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGlzTWFza2VkKCkge1xuICAgICAgICByZXR1cm4gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQuY2hpbGRyZW4oJy5vdmVybGF5JykpLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIHJlbmRlciB3aGVuIHRyYWNrZXIgaXMgaW4gcHJvZ3Jlc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc3B5T24odHJhY2tlciwgJ2lzSW5Qcm9ncmVzcycpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICBleHBlY3QoaXNNYXNrZWQoKSkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCByZW5kZXIgd2hlbiB0cmFja2VyIGlzIG5vdCBpbiBwcm9ncmVzcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzcHlPbih0cmFja2VyLCAnaXNJblByb2dyZXNzJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICBleHBlY3QoaXNNYXNrZWQoKSkudG9CZSh0cnVlKTtcbiAgICB9KTtcbn0pO1xuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
