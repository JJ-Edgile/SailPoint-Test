System.register(['test/js/TestInitializer', 'systemSetup/oAuth/OAuthClientConfigModule', './OAuthClientTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var oAuthClientConfigModule;

    /*
     * Tests for the Action Column directive. There are some nuances with this test
     * that have to do with setting a global constant OAUTH_CLIENT_FULL_ACCESS. Once
     * a module has been injected with the constant, the constant can not be changed.
     * We create a couple global functions reused in each suite. The first suite
     * describes the default disabled state of buttons. The second suite describes
     * when the user has access to create/edit etc. oAuthClients.
     */
    function createElement($scope, $compile, elementDef, item) {
        var element = angular.element(elementDef);

        $scope.item = item;
        $compile(element)($scope);
        $scope.$apply();

        return element;
    }

    function createOAuthClient(OAuthClient, oAuthClientTestData) {
        return new OAuthClient(oAuthClientTestData.CLIENT1);
    }

    return {
        setters: [function (_testJsTestInitializer) {}, function (_systemSetupOAuthOAuthClientConfigModule) {
            oAuthClientConfigModule = _systemSetupOAuthOAuthClientConfigModule['default'];
        }, function (_OAuthClientTestData) {}],
        execute: function () {
            describe('spOAuthClientConfigActionColumn', function () {

                var elementDef = '<sp-o-auth-client-config-action-column>',
                    OAuthClient = undefined,
                    oAuthClientTestData = undefined,
                    spModal = undefined,
                    $compile = undefined,
                    $scope = undefined;

                beforeEach(module(oAuthClientConfigModule));

                beforeEach(inject(function (_OAuthClient_, _oAuthClientTestData_, _spModal_, _$compile_, _$rootScope_) {

                    OAuthClient = _OAuthClient_;
                    oAuthClientTestData = _oAuthClientTestData_;
                    spModal = _spModal_;
                    $compile = _$compile_;
                    $scope = _$rootScope_;
                }));

                it('should render buttons disabled by default', function () {
                    var oAuthClient = createOAuthClient(OAuthClient, oAuthClientTestData),
                        ele = createElement($scope, $compile, elementDef, oAuthClient),
                        buttons = ele.find('button');

                    expect(buttons.length).toEqual(3);
                    angular.forEach(buttons, function (butt) {
                        expect(butt.disabled).toBe(true);
                    });
                });

                describe('OAuthClientConfigActionColumnCtrl', function () {
                    var $controller = undefined;

                    beforeEach(inject(function (_$controller_) {
                        $controller = _$controller_;
                    }));

                    function createController(hasEditRights) {
                        return $controller('OAuthClientConfigActionColumnDirectiveCtrl', {
                            OAUTH_CLIENT_FULL_ACCESS: hasEditRights
                        });
                    }

                    it('should not disable the edit buttons', function () {
                        var ctrl = createController(true);

                        expect(ctrl.isEditDisabled()).toBe(false);
                    });

                    it('should disable the edit buttons', function () {
                        var ctrl = createController(false);

                        expect(ctrl.isEditDisabled()).toBe(true);
                    });

                    it('should open edit modal', function () {
                        var ctrl = createController(true);

                        spyOn(ctrl.oAuthClientModalService, 'show');
                        ctrl.showEditModal();
                        expect(ctrl.oAuthClientModalService.show).toHaveBeenCalled();
                    });

                    it('should delete confirmation modal', function () {
                        var ctrl = createController(true);

                        spyOn(ctrl.spModal, 'open');
                        ctrl.showDeleteModal();
                        expect(ctrl.spModal.open).toHaveBeenCalled();
                    });

                    it('should regenerate keys confirmation modal', function () {
                        var ctrl = createController(true);

                        spyOn(ctrl.spModal, 'open');
                        ctrl.showRegenerateKeysModal();
                        expect(ctrl.spModal.open).toHaveBeenCalled();
                    });
                });
            });

            describe('spOAuthClientConfigActionColumn when rights allow', function () {
                var OAuthClient = undefined,
                    oAuthClientTestData = undefined,
                    $compile = undefined,
                    $scope = undefined;

                beforeEach(module(oAuthClientConfigModule));
                beforeEach(module(function ($provide) {
                    $provide.constant('OAUTH_CLIENT_FULL_ACCESS', true);
                }));

                beforeEach(inject(function (_OAuthClient_, _oAuthClientTestData_, _$compile_, _$rootScope_) {

                    OAuthClient = _OAuthClient_;
                    oAuthClientTestData = _oAuthClientTestData_;
                    $compile = _$compile_;
                    $scope = _$rootScope_;
                }));

                it('should render buttons enabled', function () {
                    var elementDef = '<sp-o-auth-client-config-action-column>',
                        oAuthClient = createOAuthClient(OAuthClient, oAuthClientTestData),
                        ele = createElement($scope, $compile, elementDef, oAuthClient),
                        buttons = ele.find('button');

                    expect(buttons.length).toEqual(3);
                    angular.forEach(buttons, function (butt) {
                        expect(butt.disabled).toBe(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50Q29uZmlnQWN0aW9uQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZDQUE2QywwQkFBMEIsVUFBVSxTQUFTOztJQUVsSTs7SUFFQSxJQUFJOzs7Ozs7Ozs7O0lBU1IsU0FBUyxjQUFjLFFBQVEsVUFBVSxZQUFZLE1BQU07UUFDdkQsSUFBSSxVQUFVLFFBQVEsUUFBUTs7UUFFOUIsT0FBTyxPQUFPO1FBQ2QsU0FBUyxTQUFTO1FBQ2xCLE9BQU87O1FBRVAsT0FBTzs7O0lBR1gsU0FBUyxrQkFBa0IsYUFBYSxxQkFBcUI7UUFDekQsT0FBTyxJQUFJLFlBQVksb0JBQW9COzs7SUFJM0MsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMENBQTBDO1lBQ2hHLDBCQUEwQix5Q0FBeUM7V0FDcEUsVUFBVSxzQkFBc0I7UUFDbkMsU0FBUyxZQUFZO1lBTDdCLFNBQVMsbUNBQW1DLFlBQU07O2dCQUU5QyxJQUFJLGFBQVU7b0JBQ1YsY0FBVztvQkFBRSxzQkFBbUI7b0JBQUUsVUFBTztvQkFBRSxXQUFRO29CQUFFLFNBQU07O2dCQUUvRCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxlQUFlLHVCQUF1QixXQUFXLFlBQVksY0FBaUI7O29CQUU3RixjQUFjO29CQUNkLHNCQUFzQjtvQkFDdEIsVUFBVTtvQkFDVixXQUFXO29CQUNYLFNBQVM7OztnQkFHYixHQUFHLDZDQUE2QyxZQUFNO29CQUNsRCxJQUFJLGNBQWMsa0JBQWtCLGFBQWE7d0JBQzdDLE1BQU0sY0FBYyxRQUFRLFVBQVUsWUFBWTt3QkFDbEQsVUFBVSxJQUFJLEtBQUs7O29CQUV2QixPQUFPLFFBQVEsUUFBUSxRQUFRO29CQUMvQixRQUFRLFFBQVEsU0FBUyxVQUFDLE1BQVM7d0JBQy9CLE9BQU8sS0FBSyxVQUFVLEtBQUs7Ozs7Z0JBSW5DLFNBQVMscUNBQXFDLFlBQU07b0JBQ2hELElBQUksY0FBVzs7b0JBRWYsV0FBVyxPQUFPLFVBQUMsZUFBa0I7d0JBQ2pDLGNBQWM7OztvQkFHbEIsU0FBUyxpQkFBaUIsZUFBZTt3QkFDckMsT0FBTyxZQUFZLDhDQUE4Qzs0QkFDN0QsMEJBQTBCOzs7O29CQUlsQyxHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxJQUFJLE9BQU8saUJBQWlCOzt3QkFFNUIsT0FBTyxLQUFLLGtCQUFrQixLQUFLOzs7b0JBR3ZDLEdBQUcsbUNBQW1DLFlBQU07d0JBQ3hDLElBQUksT0FBTyxpQkFBaUI7O3dCQUU1QixPQUFPLEtBQUssa0JBQWtCLEtBQUs7OztvQkFHdkMsR0FBRywwQkFBMEIsWUFBTTt3QkFDL0IsSUFBSSxPQUFPLGlCQUFpQjs7d0JBRTVCLE1BQU0sS0FBSyx5QkFBeUI7d0JBQ3BDLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLHdCQUF3QixNQUFNOzs7b0JBRzlDLEdBQUcsb0NBQW9DLFlBQU07d0JBQ3pDLElBQUksT0FBTyxpQkFBaUI7O3dCQUU1QixNQUFNLEtBQUssU0FBUzt3QkFDcEIsS0FBSzt3QkFDTCxPQUFPLEtBQUssUUFBUSxNQUFNOzs7b0JBRzlCLEdBQUcsNkNBQTZDLFlBQU07d0JBQ2xELElBQUksT0FBTyxpQkFBaUI7O3dCQUU1QixNQUFNLEtBQUssU0FBUzt3QkFDcEIsS0FBSzt3QkFDTCxPQUFPLEtBQUssUUFBUSxNQUFNOzs7OztZQU10QyxTQUFTLHFEQUFxRCxZQUFNO2dCQUNoRSxJQUFJLGNBQVc7b0JBQUUsc0JBQW1CO29CQUFFLFdBQVE7b0JBQUUsU0FBTTs7Z0JBRXRELFdBQVcsT0FBTztnQkFDbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLDRCQUE0Qjs7O2dCQUdsRCxXQUFXLE9BQU8sVUFBQyxlQUFlLHVCQUF1QixZQUFZLGNBQWlCOztvQkFFbEYsY0FBYztvQkFDZCxzQkFBc0I7b0JBQ3RCLFdBQVc7b0JBQ1gsU0FBUzs7O2dCQUdiLEdBQUcsaUNBQWlDLFlBQU07b0JBQ3RDLElBQUksYUFBVTt3QkFDVixjQUFjLGtCQUFrQixhQUFhO3dCQUM3QyxNQUFNLGNBQWMsUUFBUSxVQUFVLFlBQVk7d0JBQ2xELFVBQVUsSUFBSSxLQUFLOztvQkFFdkIsT0FBTyxRQUFRLFFBQVEsUUFBUTtvQkFDL0IsUUFBUSxRQUFRLFNBQVMsVUFBQyxNQUFTO3dCQUMvQixPQUFPLEtBQUssVUFBVSxLQUFLOzs7Ozs7R0FrQnBDIiwiZmlsZSI6InN5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50Q29uZmlnQWN0aW9uQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG9BdXRoQ2xpZW50Q29uZmlnTW9kdWxlIGZyb20gJ3N5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50Q29uZmlnTW9kdWxlJztcbmltcG9ydCAnLi9PQXV0aENsaWVudFRlc3REYXRhJztcblxuLypcbiAqIFRlc3RzIGZvciB0aGUgQWN0aW9uIENvbHVtbiBkaXJlY3RpdmUuIFRoZXJlIGFyZSBzb21lIG51YW5jZXMgd2l0aCB0aGlzIHRlc3RcbiAqIHRoYXQgaGF2ZSB0byBkbyB3aXRoIHNldHRpbmcgYSBnbG9iYWwgY29uc3RhbnQgT0FVVEhfQ0xJRU5UX0ZVTExfQUNDRVNTLiBPbmNlXG4gKiBhIG1vZHVsZSBoYXMgYmVlbiBpbmplY3RlZCB3aXRoIHRoZSBjb25zdGFudCwgdGhlIGNvbnN0YW50IGNhbiBub3QgYmUgY2hhbmdlZC5cbiAqIFdlIGNyZWF0ZSBhIGNvdXBsZSBnbG9iYWwgZnVuY3Rpb25zIHJldXNlZCBpbiBlYWNoIHN1aXRlLiBUaGUgZmlyc3Qgc3VpdGVcbiAqIGRlc2NyaWJlcyB0aGUgZGVmYXVsdCBkaXNhYmxlZCBzdGF0ZSBvZiBidXR0b25zLiBUaGUgc2Vjb25kIHN1aXRlIGRlc2NyaWJlc1xuICogd2hlbiB0aGUgdXNlciBoYXMgYWNjZXNzIHRvIGNyZWF0ZS9lZGl0IGV0Yy4gb0F1dGhDbGllbnRzLlxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KCRzY29wZSwgJGNvbXBpbGUsIGVsZW1lbnREZWYsIGl0ZW0pIHtcbiAgICBsZXQgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmKTtcblxuICAgICRzY29wZS5pdGVtID0gaXRlbTtcbiAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPQXV0aENsaWVudChPQXV0aENsaWVudCwgb0F1dGhDbGllbnRUZXN0RGF0YSkge1xuICAgIHJldHVybiBuZXcgT0F1dGhDbGllbnQob0F1dGhDbGllbnRUZXN0RGF0YS5DTElFTlQxKTtcbn1cblxuZGVzY3JpYmUoJ3NwT0F1dGhDbGllbnRDb25maWdBY3Rpb25Db2x1bW4nLCAoKSA9PiB7XG5cbiAgICBsZXQgZWxlbWVudERlZiA9IGA8c3Atby1hdXRoLWNsaWVudC1jb25maWctYWN0aW9uLWNvbHVtbj5gLFxuICAgICAgICBPQXV0aENsaWVudCwgb0F1dGhDbGllbnRUZXN0RGF0YSwgc3BNb2RhbCwgJGNvbXBpbGUsICRzY29wZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG9BdXRoQ2xpZW50Q29uZmlnTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX09BdXRoQ2xpZW50XywgX29BdXRoQ2xpZW50VGVzdERhdGFfLCBfc3BNb2RhbF8sIF8kY29tcGlsZV8sIF8kcm9vdFNjb3BlXykgPT4ge1xuXG4gICAgICAgIE9BdXRoQ2xpZW50ID0gX09BdXRoQ2xpZW50XztcbiAgICAgICAgb0F1dGhDbGllbnRUZXN0RGF0YSA9IF9vQXV0aENsaWVudFRlc3REYXRhXztcbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCByZW5kZXIgYnV0dG9ucyBkaXNhYmxlZCBieSBkZWZhdWx0JywgKCkgPT4ge1xuICAgICAgICBsZXQgb0F1dGhDbGllbnQgPSBjcmVhdGVPQXV0aENsaWVudChPQXV0aENsaWVudCwgb0F1dGhDbGllbnRUZXN0RGF0YSksXG4gICAgICAgICAgICBlbGUgPSBjcmVhdGVFbGVtZW50KCRzY29wZSwgJGNvbXBpbGUsIGVsZW1lbnREZWYsIG9BdXRoQ2xpZW50KSxcbiAgICAgICAgICAgIGJ1dHRvbnMgPSBlbGUuZmluZCgnYnV0dG9uJyk7XG5cbiAgICAgICAgZXhwZWN0KGJ1dHRvbnMubGVuZ3RoKS50b0VxdWFsKDMpO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goYnV0dG9ucywgKGJ1dHQpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChidXR0LmRpc2FibGVkKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdPQXV0aENsaWVudENvbmZpZ0FjdGlvbkNvbHVtbkN0cmwnLCAoKSA9PiB7XG4gICAgICAgIGxldCAkY29udHJvbGxlcjtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb250cm9sbGVyXykgPT4ge1xuICAgICAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihoYXNFZGl0UmlnaHRzKSB7XG4gICAgICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ09BdXRoQ2xpZW50Q29uZmlnQWN0aW9uQ29sdW1uRGlyZWN0aXZlQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBPQVVUSF9DTElFTlRfRlVMTF9BQ0NFU1M6IGhhc0VkaXRSaWdodHNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgZGlzYWJsZSB0aGUgZWRpdCBidXR0b25zJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHRydWUpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0VkaXREaXNhYmxlZCgpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNhYmxlIHRoZSBlZGl0IGJ1dHRvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0VkaXREaXNhYmxlZCgpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG9wZW4gZWRpdCBtb2RhbCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcih0cnVlKTtcblxuICAgICAgICAgICAgc3B5T24oY3RybC5vQXV0aENsaWVudE1vZGFsU2VydmljZSwgJ3Nob3cnKTtcbiAgICAgICAgICAgIGN0cmwuc2hvd0VkaXRNb2RhbCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwub0F1dGhDbGllbnRNb2RhbFNlcnZpY2Uuc2hvdykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRlbGV0ZSBjb25maXJtYXRpb24gbW9kYWwnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIHNweU9uKGN0cmwuc3BNb2RhbCwgJ29wZW4nKTtcbiAgICAgICAgICAgIGN0cmwuc2hvd0RlbGV0ZU1vZGFsKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZWdlbmVyYXRlIGtleXMgY29uZmlybWF0aW9uIG1vZGFsJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHRydWUpO1xuXG4gICAgICAgICAgICBzcHlPbihjdHJsLnNwTW9kYWwsICdvcGVuJyk7XG4gICAgICAgICAgICBjdHJsLnNob3dSZWdlbmVyYXRlS2V5c01vZGFsKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcblxuXG5kZXNjcmliZSgnc3BPQXV0aENsaWVudENvbmZpZ0FjdGlvbkNvbHVtbiB3aGVuIHJpZ2h0cyBhbGxvdycsICgpID0+IHtcbiAgICBsZXQgT0F1dGhDbGllbnQsIG9BdXRoQ2xpZW50VGVzdERhdGEsICRjb21waWxlLCAkc2NvcGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShvQXV0aENsaWVudENvbmZpZ01vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdPQVVUSF9DTElFTlRfRlVMTF9BQ0NFU1MnLCB0cnVlKTtcbiAgICB9KSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX09BdXRoQ2xpZW50XywgX29BdXRoQ2xpZW50VGVzdERhdGFfLCBfJGNvbXBpbGVfLCBfJHJvb3RTY29wZV8pID0+IHtcblxuICAgICAgICBPQXV0aENsaWVudCA9IF9PQXV0aENsaWVudF87XG4gICAgICAgIG9BdXRoQ2xpZW50VGVzdERhdGEgPSBfb0F1dGhDbGllbnRUZXN0RGF0YV87XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgcmVuZGVyIGJ1dHRvbnMgZW5hYmxlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IGVsZW1lbnREZWYgPSBgPHNwLW8tYXV0aC1jbGllbnQtY29uZmlnLWFjdGlvbi1jb2x1bW4+YCxcbiAgICAgICAgICAgIG9BdXRoQ2xpZW50ID0gY3JlYXRlT0F1dGhDbGllbnQoT0F1dGhDbGllbnQsIG9BdXRoQ2xpZW50VGVzdERhdGEpLFxuICAgICAgICAgICAgZWxlID0gY3JlYXRlRWxlbWVudCgkc2NvcGUsICRjb21waWxlLCBlbGVtZW50RGVmLCBvQXV0aENsaWVudCksXG4gICAgICAgICAgICBidXR0b25zID0gZWxlLmZpbmQoJ2J1dHRvbicpO1xuXG4gICAgICAgIGV4cGVjdChidXR0b25zLmxlbmd0aCkudG9FcXVhbCgzKTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGJ1dHRvbnMsIChidXR0KSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoYnV0dC5kaXNhYmxlZCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
