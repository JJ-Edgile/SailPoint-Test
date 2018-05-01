System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }],
        execute: function () {

            describe('PolicyViolationDecisionScope', function () {
                var PolicyViolationDecisionScope = undefined;

                beforeEach(module(policyViolationModule));

                beforeEach(inject(function (_PolicyViolationDecisionScope_) {
                    PolicyViolationDecisionScope = _PolicyViolationDecisionScope_;
                }));

                describe('constructor', function () {
                    it('sets the statuses property from config', function () {
                        var config = {
                            statuses: ['Delegated', 'Open']
                        },
                            scope = new PolicyViolationDecisionScope(config);

                        expect(scope.statuses).toEqual(config.statuses);
                    });
                });

                describe('matches()', function () {
                    it('returns false if scope is undefined', function () {
                        var scope = new PolicyViolationDecisionScope();
                        expect(scope.matches(undefined)).toEqual(false);
                    });

                    it('returns false if scope has different statuses', function () {
                        var scope = new PolicyViolationDecisionScope({
                            statuses: ['Open']
                        }),
                            otherScope = new PolicyViolationDecisionScope({
                            statuses: ['Remediated']
                        });
                        expect(scope.matches(otherScope)).toEqual(false);

                        // Now test with extra statuses
                        otherScope.statuses = ['Open', 'Remediated'];
                        expect(scope.matches(otherScope)).toEqual(false);
                    });

                    it('returns true if scope has matching statuses', function () {
                        var scope = new PolicyViolationDecisionScope({
                            statuses: ['Open']
                        }),
                            otherScope = new PolicyViolationDecisionScope({
                            statuses: ['Open']
                        });
                        expect(scope.matches(otherScope)).toEqual(true);
                    });
                });

                describe('getFilterValues()', function () {
                    it('sets the includedStatus filter', function () {
                        var scope = new PolicyViolationDecisionScope({
                            statuses: ['Open', 'Delegated']
                        }),
                            filterValues = scope.getFilterValues();
                        expect(filterValues).toBeDefined();
                        expect(filterValues.includedStatus).toBeDefined();
                        expect(filterValues.includedStatus.value).toEqual(scope.statuses);
                    });
                });

                describe('addQueryParameters()', function () {
                    it('adds the includedStatus param', function () {
                        var scope = new PolicyViolationDecisionScope({
                            statuses: ['Open', 'Delegated']
                        }),
                            params = {};
                        scope.addQueryParameters(params);
                        expect(params.includedStatus).toBeDefined();
                        expect(params.includedStatus).toEqual(scope.statuses);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lWaW9sYXRpb25EZWNpc2lvblNjb3BlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBDQUEwQyxVQUFVLFNBQVM7OztJQUdyRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxnQ0FBZ0MsWUFBTTtnQkFDM0MsSUFBSSwrQkFBNEI7O2dCQUVoQyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxnQ0FBbUM7b0JBQ2xELCtCQUErQjs7O2dCQUduQyxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRywwQ0FBMEMsWUFBTTt3QkFDL0MsSUFBSSxTQUFTOzRCQUNULFVBQVUsQ0FBQyxhQUFhOzs0QkFDekIsUUFBUSxJQUFJLDZCQUE2Qjs7d0JBRTVDLE9BQU8sTUFBTSxVQUFVLFFBQVEsT0FBTzs7OztnQkFJOUMsU0FBUyxhQUFhLFlBQU07b0JBQ3hCLEdBQUcsdUNBQXVDLFlBQU07d0JBQzVDLElBQUksUUFBUSxJQUFJO3dCQUNoQixPQUFPLE1BQU0sUUFBUSxZQUFZLFFBQVE7OztvQkFHN0MsR0FBRyxpREFBaUQsWUFBTTt3QkFDdEQsSUFBSSxRQUFRLElBQUksNkJBQTZCOzRCQUN6QyxVQUFVLENBQUM7OzRCQUNYLGFBQWEsSUFBSSw2QkFBNkI7NEJBQzlDLFVBQVUsQ0FBQzs7d0JBRWYsT0FBTyxNQUFNLFFBQVEsYUFBYSxRQUFROzs7d0JBRzFDLFdBQVcsV0FBVyxDQUFDLFFBQVE7d0JBQy9CLE9BQU8sTUFBTSxRQUFRLGFBQWEsUUFBUTs7O29CQUc5QyxHQUFHLCtDQUErQyxZQUFNO3dCQUNwRCxJQUFJLFFBQVEsSUFBSSw2QkFBNkI7NEJBQ3pDLFVBQVUsQ0FBQzs7NEJBQ1gsYUFBYSxJQUFJLDZCQUE2Qjs0QkFDOUMsVUFBVSxDQUFDOzt3QkFFZixPQUFPLE1BQU0sUUFBUSxhQUFhLFFBQVE7Ozs7Z0JBSWxELFNBQVMscUJBQXFCLFlBQU07b0JBQ2hDLEdBQUcsa0NBQWtDLFlBQU07d0JBQ3ZDLElBQUksUUFBUSxJQUFJLDZCQUE2Qjs0QkFDekMsVUFBVSxDQUFDLFFBQVE7OzRCQUNuQixlQUFlLE1BQU07d0JBQ3pCLE9BQU8sY0FBYzt3QkFDckIsT0FBTyxhQUFhLGdCQUFnQjt3QkFDcEMsT0FBTyxhQUFhLGVBQWUsT0FBTyxRQUFRLE1BQU07Ozs7Z0JBSWhFLFNBQVMsd0JBQXdCLFlBQU07b0JBQ25DLEdBQUcsaUNBQWlDLFlBQU07d0JBQ3RDLElBQUksUUFBUSxJQUFJLDZCQUE2Qjs0QkFDekMsVUFBVSxDQUFDLFFBQVE7OzRCQUNuQixTQUFTO3dCQUNiLE1BQU0sbUJBQW1CO3dCQUN6QixPQUFPLE9BQU8sZ0JBQWdCO3dCQUM5QixPQUFPLE9BQU8sZ0JBQWdCLFFBQVEsTUFBTTs7Ozs7O0dBa0JyRCIsImZpbGUiOiJwb2xpY3lWaW9sYXRpb24vbW9kZWwvUG9saWN5VmlvbGF0aW9uRGVjaXNpb25TY29wZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBvbGljeVZpb2xhdGlvbk1vZHVsZSBmcm9tICdwb2xpY3lWaW9sYXRpb24vUG9saWN5VmlvbGF0aW9uTW9kdWxlJztcblxuZGVzY3JpYmUoJ1BvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2NvcGUnLCAoKSA9PiB7XG4gICAgbGV0IFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2NvcGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwb2xpY3lWaW9sYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUG9saWN5VmlvbGF0aW9uRGVjaXNpb25TY29wZV8pID0+IHtcbiAgICAgICAgUG9saWN5VmlvbGF0aW9uRGVjaXNpb25TY29wZSA9IF9Qb2xpY3lWaW9sYXRpb25EZWNpc2lvblNjb3BlXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzZXRzIHRoZSBzdGF0dXNlcyBwcm9wZXJ0eSBmcm9tIGNvbmZpZycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsnRGVsZWdhdGVkJywgJ09wZW4nXVxuICAgICAgICAgICAgfSwgc2NvcGUgPSBuZXcgUG9saWN5VmlvbGF0aW9uRGVjaXNpb25TY29wZShjb25maWcpO1xuXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuc3RhdHVzZXMpLnRvRXF1YWwoY29uZmlnLnN0YXR1c2VzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbWF0Y2hlcygpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBzY29wZSBpcyB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2NvcGUgPSBuZXcgUG9saWN5VmlvbGF0aW9uRGVjaXNpb25TY29wZSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLm1hdGNoZXModW5kZWZpbmVkKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHNjb3BlIGhhcyBkaWZmZXJlbnQgc3RhdHVzZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2NvcGUgPSBuZXcgUG9saWN5VmlvbGF0aW9uRGVjaXNpb25TY29wZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsnT3BlbiddXG4gICAgICAgICAgICB9KSwgb3RoZXJTY29wZSA9IG5ldyBQb2xpY3lWaW9sYXRpb25EZWNpc2lvblNjb3BlKHtcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWydSZW1lZGlhdGVkJ11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLm1hdGNoZXMob3RoZXJTY29wZSkpLnRvRXF1YWwoZmFsc2UpO1xuXG4gICAgICAgICAgICAvLyBOb3cgdGVzdCB3aXRoIGV4dHJhIHN0YXR1c2VzXG4gICAgICAgICAgICBvdGhlclNjb3BlLnN0YXR1c2VzID0gWydPcGVuJywgJ1JlbWVkaWF0ZWQnXTtcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5tYXRjaGVzKG90aGVyU2NvcGUpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBzY29wZSBoYXMgbWF0Y2hpbmcgc3RhdHVzZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2NvcGUgPSBuZXcgUG9saWN5VmlvbGF0aW9uRGVjaXNpb25TY29wZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsnT3BlbiddXG4gICAgICAgICAgICB9KSwgb3RoZXJTY29wZSA9IG5ldyBQb2xpY3lWaW9sYXRpb25EZWNpc2lvblNjb3BlKHtcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWydPcGVuJ11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLm1hdGNoZXMob3RoZXJTY29wZSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEZpbHRlclZhbHVlcygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2V0cyB0aGUgaW5jbHVkZWRTdGF0dXMgZmlsdGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNjb3BlID0gbmV3IFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2NvcGUoe1xuICAgICAgICAgICAgICAgIHN0YXR1c2VzOiBbJ09wZW4nLCAnRGVsZWdhdGVkJ11cbiAgICAgICAgICAgIH0pLCBmaWx0ZXJWYWx1ZXMgPSBzY29wZS5nZXRGaWx0ZXJWYWx1ZXMoKTtcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJWYWx1ZXMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyVmFsdWVzLmluY2x1ZGVkU3RhdHVzKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlcy5pbmNsdWRlZFN0YXR1cy52YWx1ZSkudG9FcXVhbChzY29wZS5zdGF0dXNlcyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FkZFF1ZXJ5UGFyYW1ldGVycygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnYWRkcyB0aGUgaW5jbHVkZWRTdGF0dXMgcGFyYW0nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2NvcGUgPSBuZXcgUG9saWN5VmlvbGF0aW9uRGVjaXNpb25TY29wZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsnT3BlbicsICdEZWxlZ2F0ZWQnXVxuICAgICAgICAgICAgfSksIHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgc2NvcGUuYWRkUXVlcnlQYXJhbWV0ZXJzKHBhcmFtcyk7XG4gICAgICAgICAgICBleHBlY3QocGFyYW1zLmluY2x1ZGVkU3RhdHVzKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHBhcmFtcy5pbmNsdWRlZFN0YXR1cykudG9FcXVhbChzY29wZS5zdGF0dXNlcyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
