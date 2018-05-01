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
                var elementDefinition = '<div sp-policy-tree-node-details="node" template-url="{{templateUrl}}" />',
                    element = undefined,
                    $scope = undefined,
                    $compile = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function (_$rootScope_, _$compile_) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                }));

                function createElement(node, templateUrl) {
                    $scope.node = node;
                    $scope.templateUrl = templateUrl;
                    element = $compile(angular.element(elementDefinition))($scope);
                    $scope.$apply();
                }

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                describe('default', function () {
                    it('shows the description if one exists', function () {
                        var node = {
                            description: 'hello'
                        };
                        createElement(node);
                        // sp-more-less-toggle uses replace, so just search the structure
                        var descriptionElement = element.find('div div span');
                        expect(descriptionElement.length).toEqual(1);
                        expect(descriptionElement.text()).toEqual(node.description);
                    });

                    it('shows revoked text if node is selected and readOnly', function () {
                        var node = {
                            isPolicyNodeSelected: function () {
                                return true;
                            }
                        },
                            elementDefinitionReadOnly = '<div sp-policy-tree-node-details="node" ' + 'sp-policy-tree-node-read-only="true" template-url="{{templateUrl}}" />';

                        $scope.node = node;
                        element = $compile(angular.element(elementDefinitionReadOnly))($scope);
                        $scope.$apply();

                        var selectedElement = element.find('span.selected-node');
                        expect(selectedElement.length).toEqual(1);
                        expect(selectedElement.text().trim()).toEqual('policy_violation_remediated');
                    });

                    it('is empty if no description', function () {
                        var node = {};
                        createElement(node);
                        var descriptionElement = element.find('div div span');
                        expect(descriptionElement.length).toEqual(0);
                    });
                });

                describe('templateUrl', function () {
                    it('renders the provided template url', inject(function ($templateCache) {
                        var templateUrl = 'whatever.html',
                            node = { title: 'WHATEVER' };
                        $templateCache.put(templateUrl, '<div class="whatever">{{ctrl.node.title}}</div>');
                        createElement(node, templateUrl);
                        var whateverElement = element.find('div.whatever');
                        expect(whateverElement.length).toEqual(1);
                        expect(whateverElement.text()).toEqual(node.title);
                    }));
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9Qb2xpY3lUcmVlTm9kZURldGFpbHNEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUNBQXlDLFVBQVUsU0FBUzs7SUFFcEc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHFDQUFxQztZQUMzRixvQkFBb0Isb0NBQW9DOztRQUU1RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsb0JBQW9CLFlBQU07Z0JBQy9CLElBQUksb0JBQWlCO29CQUNqQixVQUFPO29CQUFFLFNBQU07b0JBQUUsV0FBUTs7Z0JBRTdCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGNBQWMsWUFBZTtvQkFDNUMsU0FBUztvQkFDVCxXQUFXOzs7Z0JBR2YsU0FBUyxjQUFjLE1BQU0sYUFBYTtvQkFDdEMsT0FBTyxPQUFPO29CQUNkLE9BQU8sY0FBYztvQkFDckIsVUFBVSxTQUFTLFFBQVEsUUFBUSxvQkFBb0I7b0JBQ3ZELE9BQU87OztnQkFHWCxVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVE7Ozs7Z0JBSWhCLFNBQVMsV0FBVyxZQUFNO29CQUN0QixHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxJQUFJLE9BQU87NEJBQ1AsYUFBYTs7d0JBRWpCLGNBQWM7O3dCQUVkLElBQUkscUJBQXFCLFFBQVEsS0FBSzt3QkFDdEMsT0FBTyxtQkFBbUIsUUFBUSxRQUFRO3dCQUMxQyxPQUFPLG1CQUFtQixRQUFRLFFBQVEsS0FBSzs7O29CQUduRCxHQUFHLHVEQUF1RCxZQUFNO3dCQUM1RCxJQUFJLE9BQU87NEJBQ0gsc0JBQXNCLFlBQUE7Z0NBVVYsT0FWZ0I7Ozs0QkFFaEMsNEJBQTRCLDZDQUN4Qjs7d0JBRVIsT0FBTyxPQUFPO3dCQUNkLFVBQVUsU0FBUyxRQUFRLFFBQVEsNEJBQTRCO3dCQUMvRCxPQUFPOzt3QkFFUCxJQUFJLGtCQUFrQixRQUFRLEtBQUs7d0JBQ25DLE9BQU8sZ0JBQWdCLFFBQVEsUUFBUTt3QkFDdkMsT0FBTyxnQkFBZ0IsT0FBTyxRQUFRLFFBQVE7OztvQkFHbEQsR0FBRyw4QkFBOEIsWUFBTTt3QkFDbkMsSUFBSSxPQUFPO3dCQUNYLGNBQWM7d0JBQ2QsSUFBSSxxQkFBcUIsUUFBUSxLQUFLO3dCQUN0QyxPQUFPLG1CQUFtQixRQUFRLFFBQVE7Ozs7Z0JBSWxELFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLHFDQUFxQyxPQUFPLFVBQUMsZ0JBQW1CO3dCQUMvRCxJQUFJLGNBQWM7NEJBQ2QsT0FBTyxFQUFFLE9BQU87d0JBQ3BCLGVBQWUsSUFBSSxhQUFXO3dCQUM5QixjQUFjLE1BQU07d0JBQ3BCLElBQUksa0JBQWtCLFFBQVEsS0FBSzt3QkFDbkMsT0FBTyxnQkFBZ0IsUUFBUSxRQUFRO3dCQUN2QyxPQUFPLGdCQUFnQixRQUFRLFFBQVEsS0FBSzs7Ozs7O0dBZ0JyRCIsImZpbGUiOiJjb21tb24vcmVtZWRpYXRpb24vUG9saWN5VHJlZU5vZGVEZXRhaWxzRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHJlbWVkaWF0aW9uTW9kdWxlIGZyb20gJ2NvbW1vbi9yZW1lZGlhdGlvbi9SZW1lZGlhdGlvbk1vZHVsZSc7XG5cbmRlc2NyaWJlKCdzcFNvZFJvbGVEZXRhaWxzJywgKCkgPT4ge1xuICAgIGxldCBlbGVtZW50RGVmaW5pdGlvbiA9IGA8ZGl2IHNwLXBvbGljeS10cmVlLW5vZGUtZGV0YWlscz1cIm5vZGVcIiB0ZW1wbGF0ZS11cmw9XCJ7e3RlbXBsYXRlVXJsfX1cIiAvPmAsXG4gICAgICAgIGVsZW1lbnQsICRzY29wZSwgJGNvbXBpbGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShyZW1lZGlhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kcm9vdFNjb3BlXywgXyRjb21waWxlXykgPT4ge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KG5vZGUsIHRlbXBsYXRlVXJsKSB7XG4gICAgICAgICRzY29wZS5ub2RlID0gbm9kZTtcbiAgICAgICAgJHNjb3BlLnRlbXBsYXRlVXJsID0gdGVtcGxhdGVVcmw7XG4gICAgICAgIGVsZW1lbnQgPSAkY29tcGlsZShhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pKSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkZWZhdWx0JywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvd3MgdGhlIGRlc2NyaXB0aW9uIGlmIG9uZSBleGlzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2hlbGxvJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQobm9kZSk7XG4gICAgICAgICAgICAvLyBzcC1tb3JlLWxlc3MtdG9nZ2xlIHVzZXMgcmVwbGFjZSwgc28ganVzdCBzZWFyY2ggdGhlIHN0cnVjdHVyZVxuICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uRWxlbWVudCA9IGVsZW1lbnQuZmluZCgnZGl2IGRpdiBzcGFuJyk7XG4gICAgICAgICAgICBleHBlY3QoZGVzY3JpcHRpb25FbGVtZW50Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChkZXNjcmlwdGlvbkVsZW1lbnQudGV4dCgpKS50b0VxdWFsKG5vZGUuZGVzY3JpcHRpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvd3MgcmV2b2tlZCB0ZXh0IGlmIG5vZGUgaXMgc2VsZWN0ZWQgYW5kIHJlYWRPbmx5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlzUG9saWN5Tm9kZVNlbGVjdGVkOiAoKSA9PiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbGVtZW50RGVmaW5pdGlvblJlYWRPbmx5ID0gJzxkaXYgc3AtcG9saWN5LXRyZWUtbm9kZS1kZXRhaWxzPVwibm9kZVwiICcgK1xuICAgICAgICAgICAgICAgICAgICAnc3AtcG9saWN5LXRyZWUtbm9kZS1yZWFkLW9ubHk9XCJ0cnVlXCIgdGVtcGxhdGUtdXJsPVwie3t0ZW1wbGF0ZVVybH19XCIgLz4nO1xuXG4gICAgICAgICAgICAkc2NvcGUubm9kZSA9IG5vZGU7XG4gICAgICAgICAgICBlbGVtZW50ID0gJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uUmVhZE9ubHkpKSgkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtZW50ID0gZWxlbWVudC5maW5kKCdzcGFuLnNlbGVjdGVkLW5vZGUnKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3RlZEVsZW1lbnQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdGVkRWxlbWVudC50ZXh0KCkudHJpbSgpKS50b0VxdWFsKCdwb2xpY3lfdmlvbGF0aW9uX3JlbWVkaWF0ZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lzIGVtcHR5IGlmIG5vIGRlc2NyaXB0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB7fTtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQobm9kZSk7XG4gICAgICAgICAgICBsZXQgZGVzY3JpcHRpb25FbGVtZW50ID0gZWxlbWVudC5maW5kKCdkaXYgZGl2IHNwYW4nKTtcbiAgICAgICAgICAgIGV4cGVjdChkZXNjcmlwdGlvbkVsZW1lbnQubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0ZW1wbGF0ZVVybCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3JlbmRlcnMgdGhlIHByb3ZpZGVkIHRlbXBsYXRlIHVybCcsIGluamVjdCgoJHRlbXBsYXRlQ2FjaGUpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZVVybCA9ICd3aGF0ZXZlci5odG1sJyxcbiAgICAgICAgICAgICAgICBub2RlID0geyB0aXRsZTogJ1dIQVRFVkVSJyB9O1xuICAgICAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KHRlbXBsYXRlVXJsLCBgPGRpdiBjbGFzcz1cIndoYXRldmVyXCI+e3tjdHJsLm5vZGUudGl0bGV9fTwvZGl2PmApO1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChub2RlLCB0ZW1wbGF0ZVVybCk7XG4gICAgICAgICAgICBsZXQgd2hhdGV2ZXJFbGVtZW50ID0gZWxlbWVudC5maW5kKCdkaXYud2hhdGV2ZXInKTtcbiAgICAgICAgICAgIGV4cGVjdCh3aGF0ZXZlckVsZW1lbnQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KHdoYXRldmVyRWxlbWVudC50ZXh0KCkpLnRvRXF1YWwobm9kZS50aXRsZSk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
