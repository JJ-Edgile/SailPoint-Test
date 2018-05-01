System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }],
        execute: function () {

            describe('spSodRoleDetails', function () {
                var elementDefinition = '<div sp-sod-role-details="role" template-url="{{templateUrl}}" />',
                    element = undefined,
                    $scope = undefined,
                    $compile = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function (_$rootScope_, _$compile_) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                }));

                function createElement(role, templateUrl) {
                    $scope.role = role;
                    $scope.templateUrl = templateUrl;
                    element = $compile(angular.element(elementDefinition))($scope);
                    $scope.$apply();
                }

                describe('default', function () {
                    it('shows the description if one exists', function () {
                        var role = {
                            description: 'hello'
                        };

                        createElement(role);
                        // sp-more-less-toggle uses replace, so just search the structure
                        var descriptionElement = element.find('div div span');
                        expect(descriptionElement.length).toEqual(1);
                        expect(descriptionElement.text()).toEqual(role.description);
                    });

                    it('is empty if no description', function () {
                        var role = {};

                        createElement(role);
                        var descriptionElement = element.find('div div span');
                        expect(descriptionElement.length).toEqual(0);
                    });
                });

                describe('templateUrl', function () {
                    it('renders the provided template url', inject(function ($templateCache) {
                        var templateUrl = 'whatever.html',
                            role = {};
                        $templateCache.put(templateUrl, '<div class="whatever">whatever</div>');
                        createElement(role, templateUrl);
                        var whateverElement = element.find('div.whatever');
                        expect(whateverElement.length).toEqual(1);
                        expect(whateverElement.text()).toEqual('whatever');
                    }));
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9Tb0RSb2xlRGV0YWlsc0RpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5Q0FBeUMsVUFBVSxTQUFTOztJQUVwRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscUNBQXFDO1lBQzNGLG9CQUFvQixvQ0FBb0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxvQkFBb0IsWUFBTTtnQkFDL0IsSUFBSSxvQkFBaUI7b0JBQ2pCLFVBQU87b0JBQUUsU0FBTTtvQkFBRSxXQUFROztnQkFFN0IsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsY0FBYyxZQUFlO29CQUM1QyxTQUFTO29CQUNULFdBQVc7OztnQkFHZixTQUFTLGNBQWMsTUFBTSxhQUFhO29CQUN0QyxPQUFPLE9BQU87b0JBQ2QsT0FBTyxjQUFjO29CQUNyQixVQUFVLFNBQVMsUUFBUSxRQUFRLG9CQUFvQjtvQkFDdkQsT0FBTzs7O2dCQUdYLFNBQVMsV0FBVyxZQUFNO29CQUN0QixHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxJQUFJLE9BQU87NEJBQ1AsYUFBYTs7O3dCQUdqQixjQUFjOzt3QkFFZCxJQUFJLHFCQUFxQixRQUFRLEtBQUs7d0JBQ3RDLE9BQU8sbUJBQW1CLFFBQVEsUUFBUTt3QkFDMUMsT0FBTyxtQkFBbUIsUUFBUSxRQUFRLEtBQUs7OztvQkFHbkQsR0FBRyw4QkFBOEIsWUFBTTt3QkFDbkMsSUFBSSxPQUFPOzt3QkFFWCxjQUFjO3dCQUNkLElBQUkscUJBQXFCLFFBQVEsS0FBSzt3QkFDdEMsT0FBTyxtQkFBbUIsUUFBUSxRQUFROzs7O2dCQUlsRCxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyxxQ0FBcUMsT0FBTyxVQUFDLGdCQUFtQjt3QkFDL0QsSUFBSSxjQUFjOzRCQUNkLE9BQU87d0JBQ1gsZUFBZSxJQUFJLGFBQVc7d0JBQzlCLGNBQWMsTUFBTTt3QkFDcEIsSUFBSSxrQkFBa0IsUUFBUSxLQUFLO3dCQUNuQyxPQUFPLGdCQUFnQixRQUFRLFFBQVE7d0JBQ3ZDLE9BQU8sZ0JBQWdCLFFBQVEsUUFBUTs7Ozs7O0dBZWhEIiwiZmlsZSI6ImNvbW1vbi9yZW1lZGlhdGlvbi9Tb0RSb2xlRGV0YWlsc0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCByZW1lZGlhdGlvbk1vZHVsZSBmcm9tICdjb21tb24vcmVtZWRpYXRpb24vUmVtZWRpYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnc3BTb2RSb2xlRGV0YWlscycsICgpID0+IHtcbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPSBgPGRpdiBzcC1zb2Qtcm9sZS1kZXRhaWxzPVwicm9sZVwiIHRlbXBsYXRlLXVybD1cInt7dGVtcGxhdGVVcmx9fVwiIC8+YCxcbiAgICAgICAgZWxlbWVudCwgJHNjb3BlLCAkY29tcGlsZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlbWVkaWF0aW9uTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfKSA9PiB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQocm9sZSwgdGVtcGxhdGVVcmwpIHtcbiAgICAgICAgJHNjb3BlLnJvbGUgPSByb2xlO1xuICAgICAgICAkc2NvcGUudGVtcGxhdGVVcmwgPSB0ZW1wbGF0ZVVybDtcbiAgICAgICAgZWxlbWVudCA9ICRjb21waWxlKGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbikpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZGVmYXVsdCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3dzIHRoZSBkZXNjcmlwdGlvbiBpZiBvbmUgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJvbGUgPSB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdoZWxsbydcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQocm9sZSk7XG4gICAgICAgICAgICAvLyBzcC1tb3JlLWxlc3MtdG9nZ2xlIHVzZXMgcmVwbGFjZSwgc28ganVzdCBzZWFyY2ggdGhlIHN0cnVjdHVyZVxuICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uRWxlbWVudCA9IGVsZW1lbnQuZmluZCgnZGl2IGRpdiBzcGFuJyk7XG4gICAgICAgICAgICBleHBlY3QoZGVzY3JpcHRpb25FbGVtZW50Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChkZXNjcmlwdGlvbkVsZW1lbnQudGV4dCgpKS50b0VxdWFsKHJvbGUuZGVzY3JpcHRpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaXMgZW1wdHkgaWYgbm8gZGVzY3JpcHRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcm9sZSA9IHt9O1xuXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KHJvbGUpO1xuICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uRWxlbWVudCA9IGVsZW1lbnQuZmluZCgnZGl2IGRpdiBzcGFuJyk7XG4gICAgICAgICAgICBleHBlY3QoZGVzY3JpcHRpb25FbGVtZW50Lmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndGVtcGxhdGVVcmwnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZW5kZXJzIHRoZSBwcm92aWRlZCB0ZW1wbGF0ZSB1cmwnLCBpbmplY3QoKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGVVcmwgPSAnd2hhdGV2ZXIuaHRtbCcsXG4gICAgICAgICAgICAgICAgcm9sZSA9IHt9O1xuICAgICAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KHRlbXBsYXRlVXJsLCBgPGRpdiBjbGFzcz1cIndoYXRldmVyXCI+d2hhdGV2ZXI8L2Rpdj5gKTtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQocm9sZSwgdGVtcGxhdGVVcmwpO1xuICAgICAgICAgICAgbGV0IHdoYXRldmVyRWxlbWVudCA9IGVsZW1lbnQuZmluZCgnZGl2LndoYXRldmVyJyk7XG4gICAgICAgICAgICBleHBlY3Qod2hhdGV2ZXJFbGVtZW50Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdCh3aGF0ZXZlckVsZW1lbnQudGV4dCgpKS50b0VxdWFsKCd3aGF0ZXZlcicpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
