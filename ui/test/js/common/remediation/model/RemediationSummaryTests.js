System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule', '../RemediationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_RemediationTestData) {}],
        execute: function () {

            describe('RemediationSummary', function () {

                beforeEach(module(remediationModule));

                var data = undefined,
                    RemediationSummary = undefined,
                    IdentitySummary = undefined,
                    RemediationLineItem = undefined;

                beforeEach(inject(function (_RemediationSummary_, _IdentitySummary_, _RemediationLineItem_, remediationTestData) {
                    RemediationLineItem = _RemediationLineItem_;
                    RemediationSummary = _RemediationSummary_;
                    IdentitySummary = _IdentitySummary_;
                    data = angular.copy(remediationTestData.REMEDIATION_ADVICE_RESULT.summary);
                }));

                describe('constructor', function () {
                    it('should initialize with provided data', function () {
                        data.requiredOrPermittedRoles = ['role1', 'role2'];

                        var summary = new RemediationSummary(data);
                        expect(summary.itemId).toEqual(data.id);
                        expect(summary.enableOverrideDefaultRemediator).toEqual(data.enableOverrideDefaultRemediator);
                        expect(summary.defaultRemediator).toEqual(new IdentitySummary(data.defaultRemediator));
                        expect(summary.comments).toEqual(data.comments);
                        expect(summary.remediationDetails).toEqual([new RemediationLineItem(data.remediationDetails[0])]);
                        expect(summary.remediationAction).toEqual(data.remediationAction);
                        expect(summary.requiredOrPermittedRoles).toEqual(data.requiredOrPermittedRoles);
                    });

                    it('should throw with no data', function () {
                        expect(function () {
                            new RemediationSummary();
                        }).toThrow();
                    });
                });

                describe('isManualRemediation()', function () {
                    it('returns false if not manual remediation', function () {
                        var summary = new RemediationSummary({
                            remediationAction: RemediationSummary.RemediationAction.SendProvisionRequest
                        });
                        expect(summary.isManualRemediation()).toEqual(false);
                    });

                    it('returns true if manual remediation', function () {
                        var summary = new RemediationSummary({
                            remediationAction: RemediationSummary.RemediationAction.OpenWorkItem
                        });
                        expect(summary.isManualRemediation()).toEqual(true);
                        summary.remediationAction = RemediationSummary.RemediationAction.OpenTicket;
                        expect(summary.isManualRemediation()).toEqual(true);
                    });
                });

                describe('isModifiable()', function () {
                    it('returns false if no remediation details', function () {
                        var summary = new RemediationSummary(data);
                        delete summary.remediationDetails;
                        expect(summary.isModifiable()).toEqual(false);
                    });

                    it('returns true if there are remediation details', function () {
                        var summary = new RemediationSummary(data);
                        expect(summary.isModifiable()).toEqual(true);
                    });
                });

                describe('requiresRecipientSelection()', function () {
                    it('returns false if not manual remediation', function () {
                        var summary = new RemediationSummary(data);
                        delete summary.defaultRemediator;
                        spyOn(summary, 'isManualRemediation').and.returnValue(false);
                        expect(summary.requiresRecipientSelection()).toEqual(false);
                    });

                    it('returns false if default Remediator is set and override is not enabled', function () {
                        var summary = new RemediationSummary(data);
                        summary.enableOverrideDefaultRemediator = false;
                        expect(summary.requiresRecipientSelection()).toEqual(false);
                    });

                    it('returns true if default remediator is not set', function () {
                        var summary = new RemediationSummary(data);
                        delete summary.defaultRemediator;
                        expect(summary.requiresRecipientSelection()).toEqual(true);
                    });

                    it('returns true if default remediator is set and override is enabled', function () {
                        var summary = new RemediationSummary(data);
                        expect(summary.requiresRecipientSelection()).toEqual(true);
                    });
                });

                describe('hasRoleRevocationDetails()', function () {
                    it('returns true if there are required or permitted roles', function () {
                        var summary = new RemediationSummary(data);
                        summary.requiredOrPermittedRoles = ['a', 'b'];
                        expect(summary.hasRoleRevocationDetails()).toEqual(true);
                    });

                    it('returns false for undefined or empty required or permitted roles', function () {
                        var summary = new RemediationSummary(data);
                        summary.requiredOrPermittedRoles = undefined;
                        expect(summary.hasRoleRevocationDetails()).toEqual(false);
                        summary.requiredOrPermittedRoles = [];
                        expect(summary.hasRoleRevocationDetails()).toEqual(false);
                    });
                });

                describe('RemediationAction', function () {
                    it('is defined on the class', function () {
                        expect(RemediationSummary.RemediationAction).toBeDefined();
                        expect(angular.isObject(RemediationSummary.RemediationAction)).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9SZW1lZGlhdGlvblN1bW1hcnlUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsd0NBQXdDLDJCQUEyQixVQUFVLFNBQVM7OztJQUc5SDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscUNBQXFDO1lBQzNGLG9CQUFvQixvQ0FBb0M7V0FDekQsVUFBVSxzQkFBc0I7UUFDbkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLHNCQUFzQixZQUFXOztnQkFFdEMsV0FBVyxPQUFPOztnQkFFbEIsSUFBSSxPQUFJO29CQUFFLHFCQUFrQjtvQkFBRSxrQkFBZTtvQkFBRSxzQkFBbUI7O2dCQUVsRSxXQUFXLE9BQU8sVUFBQyxzQkFBc0IsbUJBQW1CLHVCQUF1QixxQkFBd0I7b0JBQ3ZHLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixrQkFBa0I7b0JBQ2xCLE9BQU8sUUFBUSxLQUFLLG9CQUFvQiwwQkFBMEI7OztnQkFHdEUsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsd0NBQXdDLFlBQU07d0JBQzdDLEtBQUssMkJBQTJCLENBQUMsU0FBUzs7d0JBRTFDLElBQUksVUFBVSxJQUFJLG1CQUFtQjt3QkFDckMsT0FBTyxRQUFRLFFBQVEsUUFBUSxLQUFLO3dCQUNwQyxPQUFPLFFBQVEsaUNBQWlDLFFBQVEsS0FBSzt3QkFDN0QsT0FBTyxRQUFRLG1CQUFtQixRQUFRLElBQUksZ0JBQWdCLEtBQUs7d0JBQ25FLE9BQU8sUUFBUSxVQUFVLFFBQVEsS0FBSzt3QkFDdEMsT0FBTyxRQUFRLG9CQUFvQixRQUFRLENBQUMsSUFBSSxvQkFBb0IsS0FBSyxtQkFBbUI7d0JBQzVGLE9BQU8sUUFBUSxtQkFBbUIsUUFBUSxLQUFLO3dCQUMvQyxPQUFPLFFBQVEsMEJBQTBCLFFBQVEsS0FBSzs7O29CQUcxRCxHQUFHLDZCQUE2QixZQUFNO3dCQUNsQyxPQUFPLFlBQU07NEJBQUUsSUFBSTsyQkFBeUI7Ozs7Z0JBSXBELFNBQVMseUJBQXlCLFlBQU07b0JBQ3BDLEdBQUcsMkNBQTJDLFlBQU07d0JBQ2hELElBQUksVUFBVSxJQUFJLG1CQUFtQjs0QkFDakMsbUJBQW1CLG1CQUFtQixrQkFBa0I7O3dCQUU1RCxPQUFPLFFBQVEsdUJBQXVCLFFBQVE7OztvQkFHbEQsR0FBRyxzQ0FBc0MsWUFBTTt3QkFDM0MsSUFBSSxVQUFVLElBQUksbUJBQW1COzRCQUNqQyxtQkFBbUIsbUJBQW1CLGtCQUFrQjs7d0JBRTVELE9BQU8sUUFBUSx1QkFBdUIsUUFBUTt3QkFDOUMsUUFBUSxvQkFBb0IsbUJBQW1CLGtCQUFrQjt3QkFDakUsT0FBTyxRQUFRLHVCQUF1QixRQUFROzs7O2dCQUl0RCxTQUFTLGtCQUFrQixZQUFNO29CQUM3QixHQUFHLDJDQUEyQyxZQUFNO3dCQUNoRCxJQUFJLFVBQVUsSUFBSSxtQkFBbUI7d0JBQ3JDLE9BQU8sUUFBUTt3QkFDZixPQUFPLFFBQVEsZ0JBQWdCLFFBQVE7OztvQkFHM0MsR0FBRyxpREFBaUQsWUFBTTt3QkFDdEQsSUFBSSxVQUFVLElBQUksbUJBQW1CO3dCQUNyQyxPQUFPLFFBQVEsZ0JBQWdCLFFBQVE7Ozs7Z0JBSS9DLFNBQVMsZ0NBQWdDLFlBQU07b0JBQzNDLEdBQUcsMkNBQTJDLFlBQU07d0JBQ2hELElBQUksVUFBVSxJQUFJLG1CQUFtQjt3QkFDckMsT0FBTyxRQUFRO3dCQUNmLE1BQU0sU0FBUyx1QkFBdUIsSUFBSSxZQUFZO3dCQUN0RCxPQUFPLFFBQVEsOEJBQThCLFFBQVE7OztvQkFHekQsR0FBRywwRUFBMEUsWUFBTTt3QkFDL0UsSUFBSSxVQUFVLElBQUksbUJBQW1CO3dCQUNyQyxRQUFRLGtDQUFrQzt3QkFDMUMsT0FBTyxRQUFRLDhCQUE4QixRQUFROzs7b0JBR3pELEdBQUcsaURBQWlELFlBQU07d0JBQ3RELElBQUksVUFBVSxJQUFJLG1CQUFtQjt3QkFDckMsT0FBTyxRQUFRO3dCQUNmLE9BQU8sUUFBUSw4QkFBOEIsUUFBUTs7O29CQUd6RCxHQUFHLHFFQUFxRSxZQUFNO3dCQUMxRSxJQUFJLFVBQVUsSUFBSSxtQkFBbUI7d0JBQ3JDLE9BQU8sUUFBUSw4QkFBOEIsUUFBUTs7OztnQkFJN0QsU0FBUyw4QkFBOEIsWUFBTTtvQkFDekMsR0FBRyx5REFBeUQsWUFBTTt3QkFDOUQsSUFBSSxVQUFVLElBQUksbUJBQW1CO3dCQUNyQyxRQUFRLDJCQUEyQixDQUFDLEtBQUs7d0JBQ3pDLE9BQU8sUUFBUSw0QkFBNEIsUUFBUTs7O29CQUd2RCxHQUFHLG9FQUFvRSxZQUFNO3dCQUN6RSxJQUFJLFVBQVUsSUFBSSxtQkFBbUI7d0JBQ3JDLFFBQVEsMkJBQTJCO3dCQUNuQyxPQUFPLFFBQVEsNEJBQTRCLFFBQVE7d0JBQ25ELFFBQVEsMkJBQTJCO3dCQUNuQyxPQUFPLFFBQVEsNEJBQTRCLFFBQVE7Ozs7Z0JBSTNELFNBQVMscUJBQXFCLFlBQU07b0JBQ2hDLEdBQUcsMkJBQTJCLFlBQU07d0JBQ2hDLE9BQU8sbUJBQW1CLG1CQUFtQjt3QkFDN0MsT0FBTyxRQUFRLFNBQVMsbUJBQW1CLG9CQUFvQixRQUFROzs7Ozs7R0FpQmhGIiwiZmlsZSI6ImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9SZW1lZGlhdGlvblN1bW1hcnlUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCByZW1lZGlhdGlvbk1vZHVsZSBmcm9tICdjb21tb24vcmVtZWRpYXRpb24vUmVtZWRpYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICcuLi9SZW1lZGlhdGlvblRlc3REYXRhJztcblxuZGVzY3JpYmUoJ1JlbWVkaWF0aW9uU3VtbWFyeScsIGZ1bmN0aW9uKCkge1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocmVtZWRpYXRpb25Nb2R1bGUpKTtcblxuICAgIGxldCBkYXRhLCBSZW1lZGlhdGlvblN1bW1hcnksIElkZW50aXR5U3VtbWFyeSwgUmVtZWRpYXRpb25MaW5lSXRlbTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUmVtZWRpYXRpb25TdW1tYXJ5XywgX0lkZW50aXR5U3VtbWFyeV8sIF9SZW1lZGlhdGlvbkxpbmVJdGVtXywgcmVtZWRpYXRpb25UZXN0RGF0YSkgPT4ge1xuICAgICAgICBSZW1lZGlhdGlvbkxpbmVJdGVtID0gX1JlbWVkaWF0aW9uTGluZUl0ZW1fO1xuICAgICAgICBSZW1lZGlhdGlvblN1bW1hcnkgPSBfUmVtZWRpYXRpb25TdW1tYXJ5XztcbiAgICAgICAgSWRlbnRpdHlTdW1tYXJ5ID0gX0lkZW50aXR5U3VtbWFyeV87XG4gICAgICAgIGRhdGEgPSBhbmd1bGFyLmNvcHkocmVtZWRpYXRpb25UZXN0RGF0YS5SRU1FRElBVElPTl9BRFZJQ0VfUkVTVUxULnN1bW1hcnkpO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcHJvdmlkZWQgZGF0YScsICgpID0+IHtcbiAgICAgICAgICAgIGRhdGEucmVxdWlyZWRPclBlcm1pdHRlZFJvbGVzID0gWydyb2xlMScsICdyb2xlMiddO1xuXG4gICAgICAgICAgICBsZXQgc3VtbWFyeSA9IG5ldyBSZW1lZGlhdGlvblN1bW1hcnkoZGF0YSk7XG4gICAgICAgICAgICBleHBlY3Qoc3VtbWFyeS5pdGVtSWQpLnRvRXF1YWwoZGF0YS5pZCk7XG4gICAgICAgICAgICBleHBlY3Qoc3VtbWFyeS5lbmFibGVPdmVycmlkZURlZmF1bHRSZW1lZGlhdG9yKS50b0VxdWFsKGRhdGEuZW5hYmxlT3ZlcnJpZGVEZWZhdWx0UmVtZWRpYXRvcik7XG4gICAgICAgICAgICBleHBlY3Qoc3VtbWFyeS5kZWZhdWx0UmVtZWRpYXRvcikudG9FcXVhbChuZXcgSWRlbnRpdHlTdW1tYXJ5KGRhdGEuZGVmYXVsdFJlbWVkaWF0b3IpKTtcbiAgICAgICAgICAgIGV4cGVjdChzdW1tYXJ5LmNvbW1lbnRzKS50b0VxdWFsKGRhdGEuY29tbWVudHMpO1xuICAgICAgICAgICAgZXhwZWN0KHN1bW1hcnkucmVtZWRpYXRpb25EZXRhaWxzKS50b0VxdWFsKFtuZXcgUmVtZWRpYXRpb25MaW5lSXRlbShkYXRhLnJlbWVkaWF0aW9uRGV0YWlsc1swXSldKTtcbiAgICAgICAgICAgIGV4cGVjdChzdW1tYXJ5LnJlbWVkaWF0aW9uQWN0aW9uKS50b0VxdWFsKGRhdGEucmVtZWRpYXRpb25BY3Rpb24pO1xuICAgICAgICAgICAgZXhwZWN0KHN1bW1hcnkucmVxdWlyZWRPclBlcm1pdHRlZFJvbGVzKS50b0VxdWFsKGRhdGEucmVxdWlyZWRPclBlcm1pdHRlZFJvbGVzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBuZXcgUmVtZWRpYXRpb25TdW1tYXJ5KCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNNYW51YWxSZW1lZGlhdGlvbigpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBub3QgbWFudWFsIHJlbWVkaWF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN1bW1hcnkgPSBuZXcgUmVtZWRpYXRpb25TdW1tYXJ5KHtcbiAgICAgICAgICAgICAgICByZW1lZGlhdGlvbkFjdGlvbjogUmVtZWRpYXRpb25TdW1tYXJ5LlJlbWVkaWF0aW9uQWN0aW9uLlNlbmRQcm92aXNpb25SZXF1ZXN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChzdW1tYXJ5LmlzTWFudWFsUmVtZWRpYXRpb24oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgbWFudWFsIHJlbWVkaWF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN1bW1hcnkgPSBuZXcgUmVtZWRpYXRpb25TdW1tYXJ5KHtcbiAgICAgICAgICAgICAgICByZW1lZGlhdGlvbkFjdGlvbjogUmVtZWRpYXRpb25TdW1tYXJ5LlJlbWVkaWF0aW9uQWN0aW9uLk9wZW5Xb3JrSXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3Qoc3VtbWFyeS5pc01hbnVhbFJlbWVkaWF0aW9uKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBzdW1tYXJ5LnJlbWVkaWF0aW9uQWN0aW9uID0gUmVtZWRpYXRpb25TdW1tYXJ5LlJlbWVkaWF0aW9uQWN0aW9uLk9wZW5UaWNrZXQ7XG4gICAgICAgICAgICBleHBlY3Qoc3VtbWFyeS5pc01hbnVhbFJlbWVkaWF0aW9uKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzTW9kaWZpYWJsZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBubyByZW1lZGlhdGlvbiBkZXRhaWxzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN1bW1hcnkgPSBuZXcgUmVtZWRpYXRpb25TdW1tYXJ5KGRhdGEpO1xuICAgICAgICAgICAgZGVsZXRlIHN1bW1hcnkucmVtZWRpYXRpb25EZXRhaWxzO1xuICAgICAgICAgICAgZXhwZWN0KHN1bW1hcnkuaXNNb2RpZmlhYmxlKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSByZW1lZGlhdGlvbiBkZXRhaWxzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN1bW1hcnkgPSBuZXcgUmVtZWRpYXRpb25TdW1tYXJ5KGRhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KHN1bW1hcnkuaXNNb2RpZmlhYmxlKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JlcXVpcmVzUmVjaXBpZW50U2VsZWN0aW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vdCBtYW51YWwgcmVtZWRpYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3VtbWFyeSA9IG5ldyBSZW1lZGlhdGlvblN1bW1hcnkoZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgc3VtbWFyeS5kZWZhdWx0UmVtZWRpYXRvcjtcbiAgICAgICAgICAgIHNweU9uKHN1bW1hcnksICdpc01hbnVhbFJlbWVkaWF0aW9uJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIGV4cGVjdChzdW1tYXJ5LnJlcXVpcmVzUmVjaXBpZW50U2VsZWN0aW9uKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBkZWZhdWx0IFJlbWVkaWF0b3IgaXMgc2V0IGFuZCBvdmVycmlkZSBpcyBub3QgZW5hYmxlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdW1tYXJ5ID0gbmV3IFJlbWVkaWF0aW9uU3VtbWFyeShkYXRhKTtcbiAgICAgICAgICAgIHN1bW1hcnkuZW5hYmxlT3ZlcnJpZGVEZWZhdWx0UmVtZWRpYXRvciA9IGZhbHNlO1xuICAgICAgICAgICAgZXhwZWN0KHN1bW1hcnkucmVxdWlyZXNSZWNpcGllbnRTZWxlY3Rpb24oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgZGVmYXVsdCByZW1lZGlhdG9yIGlzIG5vdCBzZXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3VtbWFyeSA9IG5ldyBSZW1lZGlhdGlvblN1bW1hcnkoZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgc3VtbWFyeS5kZWZhdWx0UmVtZWRpYXRvcjtcbiAgICAgICAgICAgIGV4cGVjdChzdW1tYXJ5LnJlcXVpcmVzUmVjaXBpZW50U2VsZWN0aW9uKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgZGVmYXVsdCByZW1lZGlhdG9yIGlzIHNldCBhbmQgb3ZlcnJpZGUgaXMgZW5hYmxlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdW1tYXJ5ID0gbmV3IFJlbWVkaWF0aW9uU3VtbWFyeShkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdChzdW1tYXJ5LnJlcXVpcmVzUmVjaXBpZW50U2VsZWN0aW9uKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc1JvbGVSZXZvY2F0aW9uRGV0YWlscygpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSByZXF1aXJlZCBvciBwZXJtaXR0ZWQgcm9sZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3VtbWFyeSA9IG5ldyBSZW1lZGlhdGlvblN1bW1hcnkoZGF0YSk7XG4gICAgICAgICAgICBzdW1tYXJ5LnJlcXVpcmVkT3JQZXJtaXR0ZWRSb2xlcyA9IFsnYScsICdiJ107XG4gICAgICAgICAgICBleHBlY3Qoc3VtbWFyeS5oYXNSb2xlUmV2b2NhdGlvbkRldGFpbHMoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIHVuZGVmaW5lZCBvciBlbXB0eSByZXF1aXJlZCBvciBwZXJtaXR0ZWQgcm9sZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3VtbWFyeSA9IG5ldyBSZW1lZGlhdGlvblN1bW1hcnkoZGF0YSk7XG4gICAgICAgICAgICBzdW1tYXJ5LnJlcXVpcmVkT3JQZXJtaXR0ZWRSb2xlcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGV4cGVjdChzdW1tYXJ5Lmhhc1JvbGVSZXZvY2F0aW9uRGV0YWlscygpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgICAgIHN1bW1hcnkucmVxdWlyZWRPclBlcm1pdHRlZFJvbGVzID0gW107XG4gICAgICAgICAgICBleHBlY3Qoc3VtbWFyeS5oYXNSb2xlUmV2b2NhdGlvbkRldGFpbHMoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1JlbWVkaWF0aW9uQWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBpdCgnaXMgZGVmaW5lZCBvbiB0aGUgY2xhc3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoUmVtZWRpYXRpb25TdW1tYXJ5LlJlbWVkaWF0aW9uQWN0aW9uKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuaXNPYmplY3QoUmVtZWRpYXRpb25TdW1tYXJ5LlJlbWVkaWF0aW9uQWN0aW9uKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
