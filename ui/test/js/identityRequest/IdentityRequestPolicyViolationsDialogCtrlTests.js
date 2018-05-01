System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }],
        execute: function () {

            describe('IdentityRequestPolicyViolationsDialogCtrl', function () {

                beforeEach(module(identityRequestModule));

                var $controller = undefined,
                    violations = undefined,
                    $rootScope = undefined;

                beforeEach(inject(function (_$controller_, IdentityRequest, identityRequestTestData, _$rootScope_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    violations = [{
                        policyName: 'SOD Policy1',
                        policyType: 'SOD',
                        ruleName: 'rule name1'
                    }, {
                        policyName: 'Account Policy2',
                        policyType: 'Account',
                        ruleName: 'account rule name2'
                    }, {
                        policyName: 'Account Policy3',
                        policyType: 'Account',
                        ruleName: 'account rule name3'
                    }, {
                        policyName: 'Account Policy4',
                        policyType: 'Account',
                        ruleName: 'account rule name4'
                    }, {
                        policyName: 'Account Policy5',
                        policyType: 'Account',
                        ruleName: 'account rule name5'
                    }, {
                        policyName: 'Account Policy6',
                        policyType: 'Account',
                        ruleName: 'account rule name6'
                    }];
                }));

                function createController(policyViolations) {
                    var ctrl = $controller('IdentityRequestPolicyViolationsDialogCtrl', {
                        policyViolations: policyViolations
                    });
                    ctrl.$onInit();
                    return ctrl;
                }

                it('should initialize with policyViolations', function () {
                    var ctrl = createController(violations);
                    expect(ctrl.policyViolations).toEqual(violations);
                });

                it('should throw with no policyViolations', function () {
                    expect(function () {
                        return createController(null);
                    }).toThrow();
                });

                describe('getPolicyViolations()', function () {

                    it('should return first 5 policyViolations', function () {
                        var ctrl = createController(violations);
                        $rootScope.$apply();
                        var result = undefined;
                        // start index is 0 and itemsPerPage is 5
                        ctrl.getPolicyViolations(0, 5).then(function (policyViolations) {
                            result = policyViolations;
                        });
                        $rootScope.$apply();
                        expect(result).toEqual({
                            data: {
                                objects: violations.slice(0, 5),
                                count: violations.length
                            }
                        });
                    });

                    it('should return the policyViolations on the next page', function () {
                        var ctrl = createController(violations);
                        $rootScope.$apply();
                        var result = undefined;
                        // start index is 5 and itemsPerPage is 5
                        ctrl.getPolicyViolations(5, 5).then(function (policyViolations) {
                            result = policyViolations;
                        });
                        $rootScope.$apply();
                        expect(result).toEqual({
                            data: {
                                objects: violations.slice(5, 10),
                                count: violations.length
                            }
                        });
                    });

                    it('should throw if start index is greater than the violations array size', function () {
                        var ctrl = createController(violations);
                        $rootScope.$apply();
                        expect(function () {
                            return ctrl.getPolicyViolations(6, 5);
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RQb2xpY3lWaW9sYXRpb25zRGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsVUFBVSxTQUFTOzs7SUFHckc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDOztRQUVsRSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsNkNBQTZDLFlBQVc7O2dCQUU3RCxXQUFXLE9BQU87O2dCQUVsQixJQUFJLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSxhQUFVOztnQkFFdkMsV0FBVyxPQUFPLFVBQVMsZUFBZSxpQkFBaUIseUJBQXlCLGNBQWM7b0JBQzlGLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixhQUFhLENBQ1Q7d0JBQ0ksWUFBWTt3QkFDWixZQUFZO3dCQUNaLFVBQVU7dUJBRWQ7d0JBQ0ksWUFBWTt3QkFDWixZQUFZO3dCQUNaLFVBQVU7dUJBRWQ7d0JBQ0ksWUFBWTt3QkFDWixZQUFZO3dCQUNaLFVBQVU7dUJBRWQ7d0JBQ0ksWUFBWTt3QkFDWixZQUFZO3dCQUNaLFVBQVU7dUJBRWQ7d0JBQ0ksWUFBWTt3QkFDWixZQUFZO3dCQUNaLFVBQVU7dUJBRWQ7d0JBQ0ksWUFBWTt3QkFDWixZQUFZO3dCQUNaLFVBQVU7Ozs7Z0JBS3RCLFNBQVMsaUJBQWlCLGtCQUFrQjtvQkFDeEMsSUFBSSxPQUFPLFlBQVksNkNBQTZDO3dCQUNoRSxrQkFBa0I7O29CQUV0QixLQUFLO29CQUNMLE9BQU87OztnQkFHWCxHQUFHLDJDQUEyQyxZQUFNO29CQUNoRCxJQUFJLE9BQU8saUJBQWlCO29CQUM1QixPQUFPLEtBQUssa0JBQWtCLFFBQVE7OztnQkFHMUMsR0FBRyx5Q0FBeUMsWUFBTTtvQkFDOUMsT0FBTyxZQUFBO3dCQUdTLE9BSEgsaUJBQWlCO3VCQUFPOzs7Z0JBR3pDLFNBQVMseUJBQXlCLFlBQU07O29CQUVwQyxHQUFHLDBDQUEwQyxZQUFNO3dCQUMvQyxJQUFJLE9BQU8saUJBQWlCO3dCQUM1QixXQUFXO3dCQUNYLElBQUksU0FBTTs7d0JBRVYsS0FBSyxvQkFBb0IsR0FBRyxHQUFHLEtBQUssVUFBQyxrQkFBc0I7NEJBQ3ZELFNBQVM7O3dCQUViLFdBQVc7d0JBQ1gsT0FBTyxRQUFRLFFBQVE7NEJBQ25CLE1BQU07Z0NBQ0YsU0FBUyxXQUFXLE1BQU0sR0FBRztnQ0FDN0IsT0FBTyxXQUFXOzs7OztvQkFLOUIsR0FBRyx1REFBdUQsWUFBTTt3QkFDNUQsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsV0FBVzt3QkFDWCxJQUFJLFNBQU07O3dCQUVWLEtBQUssb0JBQW9CLEdBQUcsR0FBRyxLQUFLLFVBQUMsa0JBQXNCOzRCQUN2RCxTQUFTOzt3QkFFYixXQUFXO3dCQUNYLE9BQU8sUUFBUSxRQUFROzRCQUNuQixNQUFNO2dDQUNGLFNBQVMsV0FBVyxNQUFNLEdBQUc7Z0NBQzdCLE9BQU8sV0FBVzs7Ozs7b0JBSzlCLEdBQUcseUVBQXlFLFlBQU07d0JBQzlFLElBQUksT0FBTyxpQkFBaUI7d0JBQzVCLFdBQVc7d0JBQ1gsT0FBTyxZQUFBOzRCQUtTLE9BTEgsS0FBSyxvQkFBb0IsR0FBRzsyQkFBSTs7Ozs7O0dBWXREIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RQb2xpY3lWaW9sYXRpb25zRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGlkZW50aXR5UmVxdWVzdE1vZHVsZSBmcm9tICdpZGVudGl0eVJlcXVlc3QvSWRlbnRpdHlSZXF1ZXN0TW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdJZGVudGl0eVJlcXVlc3RQb2xpY3lWaW9sYXRpb25zRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5UmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIGxldCAkY29udHJvbGxlciwgdmlvbGF0aW9ucywgJHJvb3RTY29wZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbnRyb2xsZXJfLCBJZGVudGl0eVJlcXVlc3QsIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLCBfJHJvb3RTY29wZV8pIHtcclxuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XHJcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICB2aW9sYXRpb25zID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb2xpY3lOYW1lOiAnU09EIFBvbGljeTEnLFxyXG4gICAgICAgICAgICAgICAgcG9saWN5VHlwZTogJ1NPRCcsXHJcbiAgICAgICAgICAgICAgICBydWxlTmFtZTogJ3J1bGUgbmFtZTEnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvbGljeU5hbWU6ICdBY2NvdW50IFBvbGljeTInLFxyXG4gICAgICAgICAgICAgICAgcG9saWN5VHlwZTogJ0FjY291bnQnLFxyXG4gICAgICAgICAgICAgICAgcnVsZU5hbWU6ICdhY2NvdW50IHJ1bGUgbmFtZTInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvbGljeU5hbWU6ICdBY2NvdW50IFBvbGljeTMnLFxyXG4gICAgICAgICAgICAgICAgcG9saWN5VHlwZTogJ0FjY291bnQnLFxyXG4gICAgICAgICAgICAgICAgcnVsZU5hbWU6ICdhY2NvdW50IHJ1bGUgbmFtZTMnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvbGljeU5hbWU6ICdBY2NvdW50IFBvbGljeTQnLFxyXG4gICAgICAgICAgICAgICAgcG9saWN5VHlwZTogJ0FjY291bnQnLFxyXG4gICAgICAgICAgICAgICAgcnVsZU5hbWU6ICdhY2NvdW50IHJ1bGUgbmFtZTQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvbGljeU5hbWU6ICdBY2NvdW50IFBvbGljeTUnLFxyXG4gICAgICAgICAgICAgICAgcG9saWN5VHlwZTogJ0FjY291bnQnLFxyXG4gICAgICAgICAgICAgICAgcnVsZU5hbWU6ICdhY2NvdW50IHJ1bGUgbmFtZTUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvbGljeU5hbWU6ICdBY2NvdW50IFBvbGljeTYnLFxyXG4gICAgICAgICAgICAgICAgcG9saWN5VHlwZTogJ0FjY291bnQnLFxyXG4gICAgICAgICAgICAgICAgcnVsZU5hbWU6ICdhY2NvdW50IHJ1bGUgbmFtZTYnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIocG9saWN5VmlvbGF0aW9ucykge1xyXG4gICAgICAgIGxldCBjdHJsID0gJGNvbnRyb2xsZXIoJ0lkZW50aXR5UmVxdWVzdFBvbGljeVZpb2xhdGlvbnNEaWFsb2dDdHJsJywge1xyXG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25zOiBwb2xpY3lWaW9sYXRpb25zXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY3RybC4kb25Jbml0KCk7XHJcbiAgICAgICAgcmV0dXJuIGN0cmw7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcG9saWN5VmlvbGF0aW9ucycsICgpID0+IHtcclxuICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIodmlvbGF0aW9ucyk7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwucG9saWN5VmlvbGF0aW9ucykudG9FcXVhbCh2aW9sYXRpb25zKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aCBubyBwb2xpY3lWaW9sYXRpb25zJywgKCkgPT4ge1xyXG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKG51bGwpKS50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0UG9saWN5VmlvbGF0aW9ucygpJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmaXJzdCA1IHBvbGljeVZpb2xhdGlvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcih2aW9sYXRpb25zKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDtcclxuICAgICAgICAgICAgLy8gc3RhcnQgaW5kZXggaXMgMCBhbmQgaXRlbXNQZXJQYWdlIGlzIDVcclxuICAgICAgICAgICAgY3RybC5nZXRQb2xpY3lWaW9sYXRpb25zKDAsIDUpLnRoZW4oKHBvbGljeVZpb2xhdGlvbnMpICA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBwb2xpY3lWaW9sYXRpb25zO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9FcXVhbCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogdmlvbGF0aW9ucy5zbGljZSgwLCA1KSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogdmlvbGF0aW9ucy5sZW5ndGhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBwb2xpY3lWaW9sYXRpb25zIG9uIHRoZSBuZXh0IHBhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcih2aW9sYXRpb25zKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDtcclxuICAgICAgICAgICAgLy8gc3RhcnQgaW5kZXggaXMgNSBhbmQgaXRlbXNQZXJQYWdlIGlzIDVcclxuICAgICAgICAgICAgY3RybC5nZXRQb2xpY3lWaW9sYXRpb25zKDUsIDUpLnRoZW4oKHBvbGljeVZpb2xhdGlvbnMpICA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBwb2xpY3lWaW9sYXRpb25zO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9FcXVhbCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogdmlvbGF0aW9ucy5zbGljZSg1LCAxMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IHZpb2xhdGlvbnMubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIHN0YXJ0IGluZGV4IGlzIGdyZWF0ZXIgdGhhbiB0aGUgdmlvbGF0aW9ucyBhcnJheSBzaXplJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIodmlvbGF0aW9ucyk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjdHJsLmdldFBvbGljeVZpb2xhdGlvbnMoNiwgNSkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
