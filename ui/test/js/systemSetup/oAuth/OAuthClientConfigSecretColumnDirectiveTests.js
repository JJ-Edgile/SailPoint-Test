System.register(['test/js/TestInitializer', 'systemSetup/oAuth/OAuthClientConfigModule', './OAuthClientTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var oAuthClientConfigModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_systemSetupOAuthOAuthClientConfigModule) {
            oAuthClientConfigModule = _systemSetupOAuthOAuthClientConfigModule['default'];
        }, function (_OAuthClientTestData) {}],
        execute: function () {

            describe('spOAuthClientConfigSecretColumn', function () {

                var elementDef = '<sp-o-auth-client-config-secret-column>',
                    OAuthClient = undefined,
                    oAuthClientTestData = undefined,
                    $compile = undefined,
                    $scope = undefined;

                beforeEach(module(oAuthClientConfigModule));

                beforeEach(inject(function (_OAuthClient_, _oAuthClientTestData_, _$compile_, _$rootScope_) {

                    OAuthClient = _OAuthClient_;
                    oAuthClientTestData = _oAuthClientTestData_;
                    $compile = _$compile_;
                    $scope = _$rootScope_;
                }));

                function createElement(item) {
                    var element = angular.element(elementDef);

                    $scope.item = item;
                    $compile(element)($scope);
                    $scope.$apply();

                    return element;
                }

                function createOAuthClient() {
                    return new OAuthClient(oAuthClientTestData.CLIENT1);
                }

                it('should render buttons', function () {
                    var oAuthClient = createOAuthClient(),
                        el = createElement(oAuthClient);

                    expect(el.find('i.fa-info-circle').length).toEqual(1);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50Q29uZmlnU2VjcmV0Q29sdW1uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZDQUE2QywwQkFBMEIsVUFBVSxTQUFTOztJQUVsSTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMENBQTBDO1lBQ2hHLDBCQUEwQix5Q0FBeUM7V0FDcEUsVUFBVSxzQkFBc0I7UUFDbkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLG1DQUFtQyxZQUFNOztnQkFFOUMsSUFBSSxhQUFVO29CQUNWLGNBQVc7b0JBQUUsc0JBQW1CO29CQUFFLFdBQVE7b0JBQUUsU0FBTTs7Z0JBRXRELFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGVBQWUsdUJBQXVCLFlBQVksY0FBaUI7O29CQUVsRixjQUFjO29CQUNkLHNCQUFzQjtvQkFDdEIsV0FBVztvQkFDWCxTQUFTOzs7Z0JBR2IsU0FBUyxjQUFjLE1BQU07b0JBQ3pCLElBQUksVUFBVSxRQUFRLFFBQVE7O29CQUU5QixPQUFPLE9BQU87b0JBQ2QsU0FBUyxTQUFTO29CQUNsQixPQUFPOztvQkFFUCxPQUFPOzs7Z0JBR1gsU0FBUyxvQkFBb0I7b0JBQ3pCLE9BQU8sSUFBSSxZQUFZLG9CQUFvQjs7O2dCQUcvQyxHQUFHLHlCQUF5QixZQUFNO29CQUM5QixJQUFJLGNBQWM7d0JBQ2QsS0FBSyxjQUFjOztvQkFFdkIsT0FBTyxHQUFHLEtBQUssb0JBQW9CLFFBQVEsUUFBUTs7Ozs7R0FjeEQiLCJmaWxlIjoic3lzdGVtU2V0dXAvb0F1dGgvT0F1dGhDbGllbnRDb25maWdTZWNyZXRDb2x1bW5EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgb0F1dGhDbGllbnRDb25maWdNb2R1bGUgZnJvbSAnc3lzdGVtU2V0dXAvb0F1dGgvT0F1dGhDbGllbnRDb25maWdNb2R1bGUnO1xuaW1wb3J0ICcuL09BdXRoQ2xpZW50VGVzdERhdGEnO1xuXG5kZXNjcmliZSgnc3BPQXV0aENsaWVudENvbmZpZ1NlY3JldENvbHVtbicsICgpID0+IHtcblxuICAgIGxldCBlbGVtZW50RGVmID0gYDxzcC1vLWF1dGgtY2xpZW50LWNvbmZpZy1zZWNyZXQtY29sdW1uPmAsXG4gICAgICAgIE9BdXRoQ2xpZW50LCBvQXV0aENsaWVudFRlc3REYXRhLCAkY29tcGlsZSwgJHNjb3BlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUob0F1dGhDbGllbnRDb25maWdNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfT0F1dGhDbGllbnRfLCBfb0F1dGhDbGllbnRUZXN0RGF0YV8sIF8kY29tcGlsZV8sIF8kcm9vdFNjb3BlXykgPT4ge1xuXG4gICAgICAgIE9BdXRoQ2xpZW50ID0gX09BdXRoQ2xpZW50XztcbiAgICAgICAgb0F1dGhDbGllbnRUZXN0RGF0YSA9IF9vQXV0aENsaWVudFRlc3REYXRhXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChpdGVtKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWYpO1xuXG4gICAgICAgICRzY29wZS5pdGVtID0gaXRlbTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9BdXRoQ2xpZW50KCkge1xuICAgICAgICByZXR1cm4gbmV3IE9BdXRoQ2xpZW50KG9BdXRoQ2xpZW50VGVzdERhdGEuQ0xJRU5UMSk7XG4gICAgfVxuXG4gICAgaXQoJ3Nob3VsZCByZW5kZXIgYnV0dG9ucycsICgpID0+IHtcbiAgICAgICAgbGV0IG9BdXRoQ2xpZW50ID0gY3JlYXRlT0F1dGhDbGllbnQoKSxcbiAgICAgICAgICAgIGVsID0gY3JlYXRlRWxlbWVudChvQXV0aENsaWVudCk7XG5cbiAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2kuZmEtaW5mby1jaXJjbGUnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
