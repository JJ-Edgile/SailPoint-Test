System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationConfig', function () {

                var date = new Date();
                date.setDate(date.getDate() + 7);

                var configData = {
                    statusesRequiringComments: ['Approved', 'Mitigated'],
                    esigMeaning: 'sign this',
                    revocationModificationEnabled: true,
                    processRevokesImmediately: true,
                    defaultRevocationModificationOperation: 'Remove',
                    useLinkAttributeValueForRevocationModification: true,
                    showRoleRevocationDetails: true,
                    bulkDecisions: ['Approved', 'Remediated'],
                    bulkEntityDecisions: ['Reassign', 'Delegated'],
                    allowExceptionPopup: true,
                    allowExceptionDate: date.getTime()
                },
                    CertificationConfig = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationConfig_) {
                    CertificationConfig = _CertificationConfig_;
                }));

                it('initializes', function () {
                    var config = new CertificationConfig(configData);
                    expect(config.statusesRequiringComments).toEqual(configData.statusesRequiringComments);
                    expect(config.esigMeaning).toEqual(configData.esigMeaning);
                    expect(config.revocationModificationEnabled).toEqual(configData.revocationModificationEnabled);
                    expect(config.processRevokesImmediately).toEqual(configData.processRevokesImmediately);
                    expect(config.defaultRevocationModificationOperation).toEqual(configData.defaultRevocationModificationOperation);
                    expect(config.useLinkAttributeValueForRevocationModification).toEqual(configData.useLinkAttributeValueForRevocationModification);
                    expect(config.showRoleRevocationDetails).toEqual(configData.showRoleRevocationDetails);
                    expect(config.bulkDecisions).toEqual(configData.bulkDecisions);
                    expect(config.bulkEntityDecisions).toEqual(configData.bulkEntityDecisions);
                    expect(config.allowExceptionPopup).toEqual(configData.allowExceptionPopup);
                    expect(config.mitigationExpirationDate).toEqual(configData.allowExceptionDate);
                });

                it('initializes with missing data', function () {
                    var config = new CertificationConfig({});
                    expect(config.statusesRequiringComments).toBeUndefined();
                    expect(config.esigMeaning).toBeUndefined();
                    expect(config.revocationModificationEnabled).toBeFalsy();
                    expect(config.processRevokesImmediately).toBeFalsy();
                    expect(config.defaultRevocationModificationOperation).toBeUndefined();
                    expect(config.useLinkAttributeValueForRevocationModification).toBeFalsy();
                    expect(config.showRoleRevocationDetails).toBeFalsy();
                    expect(config.bulkDecisions).toBeUndefined();
                    expect(config.bulkEntityDecisions).toEqual([]);
                    expect(config.allowExceptionPopup).toBeFalsy();
                    expect(config.mitigationExpirationDate).toBeUndefined();
                });

                describe('doesStatusRequireComment()', function () {
                    it('returns false with undefined status', function () {
                        var config = new CertificationConfig(configData);
                        expect(config.doesStatusRequireComment()).toEqual(false);
                    });

                    it('returns false if status is not in statusesRequiringComments', function () {
                        var config = new CertificationConfig(configData);
                        expect(config.doesStatusRequireComment('poop')).toEqual(false);
                    });

                    it('returns true if status is not in statusesRequiringComments', function () {
                        var config = new CertificationConfig(configData);
                        expect(config.doesStatusRequireComment('Approved')).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkNvbmZpZ1Rlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTOztJQUVqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx1QkFBdUIsWUFBVzs7Z0JBRXZDLElBQUksT0FBTyxJQUFJO2dCQUNmLEtBQUssUUFBUyxLQUFLLFlBQVk7O2dCQUUvQixJQUFJLGFBQWE7b0JBQ2IsMkJBQTJCLENBQUMsWUFBWTtvQkFDeEMsYUFBYTtvQkFDYiwrQkFBK0I7b0JBQy9CLDJCQUEyQjtvQkFDM0Isd0NBQXdDO29CQUN4QyxnREFBZ0Q7b0JBQ2hELDJCQUEyQjtvQkFDM0IsZUFBZSxDQUFDLFlBQVk7b0JBQzVCLHFCQUFxQixDQUFDLFlBQVk7b0JBQ2xDLHFCQUFxQjtvQkFDckIsb0JBQW9CLEtBQUs7O29CQUMxQixzQkFBbUI7O2dCQUV0QixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyx1QkFBdUI7b0JBQzlDLHNCQUFzQjs7O2dCQUcxQixHQUFHLGVBQWUsWUFBVztvQkFDekIsSUFBSSxTQUFTLElBQUksb0JBQW9CO29CQUNyQyxPQUFPLE9BQU8sMkJBQTJCLFFBQVEsV0FBVztvQkFDNUQsT0FBTyxPQUFPLGFBQWEsUUFBUSxXQUFXO29CQUM5QyxPQUFPLE9BQU8sK0JBQStCLFFBQVEsV0FBVztvQkFDaEUsT0FBTyxPQUFPLDJCQUEyQixRQUFRLFdBQVc7b0JBQzVELE9BQU8sT0FBTyx3Q0FDVCxRQUFRLFdBQVc7b0JBQ3hCLE9BQU8sT0FBTyxnREFDVCxRQUFRLFdBQVc7b0JBQ3hCLE9BQU8sT0FBTywyQkFBMkIsUUFBUSxXQUFXO29CQUM1RCxPQUFPLE9BQU8sZUFBZSxRQUFRLFdBQVc7b0JBQ2hELE9BQU8sT0FBTyxxQkFBcUIsUUFBUSxXQUFXO29CQUN0RCxPQUFPLE9BQU8scUJBQXFCLFFBQVEsV0FBVztvQkFDdEQsT0FBTyxPQUFPLDBCQUEwQixRQUFRLFdBQVc7OztnQkFHL0QsR0FBRyxpQ0FBaUMsWUFBTTtvQkFDdEMsSUFBSSxTQUFTLElBQUksb0JBQW9CO29CQUNyQyxPQUFPLE9BQU8sMkJBQTJCO29CQUN6QyxPQUFPLE9BQU8sYUFBYTtvQkFDM0IsT0FBTyxPQUFPLCtCQUErQjtvQkFDN0MsT0FBTyxPQUFPLDJCQUEyQjtvQkFDekMsT0FBTyxPQUFPLHdDQUF3QztvQkFDdEQsT0FBTyxPQUFPLGdEQUFnRDtvQkFDOUQsT0FBTyxPQUFPLDJCQUEyQjtvQkFDekMsT0FBTyxPQUFPLGVBQWU7b0JBQzdCLE9BQU8sT0FBTyxxQkFBcUIsUUFBUTtvQkFDM0MsT0FBTyxPQUFPLHFCQUFxQjtvQkFDbkMsT0FBTyxPQUFPLDBCQUEwQjs7O2dCQUc1QyxTQUFTLDhCQUE4QixZQUFXO29CQUM5QyxHQUFJLHVDQUF1QyxZQUFXO3dCQUNsRCxJQUFJLFNBQVMsSUFBSSxvQkFBb0I7d0JBQ3JDLE9BQU8sT0FBTyw0QkFBNEIsUUFBUTs7O29CQUd0RCxHQUFHLCtEQUErRCxZQUFXO3dCQUN6RSxJQUFJLFNBQVMsSUFBSSxvQkFBb0I7d0JBQ3JDLE9BQU8sT0FBTyx5QkFBeUIsU0FBUyxRQUFROzs7b0JBRzVELEdBQUcsOERBQThELFlBQVc7d0JBQ3hFLElBQUksU0FBUyxJQUFJLG9CQUFvQjt3QkFDckMsT0FBTyxPQUFPLHlCQUF5QixhQUFhLFFBQVE7Ozs7OztHQVlyRSIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL21vZGVsL0NlcnRpZmljYXRpb25Db25maWdUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnQ2VydGlmaWNhdGlvbkNvbmZpZycsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGRhdGUuc2V0RGF0ZSgoZGF0ZS5nZXREYXRlKCkgKyA3KSk7XG5cbiAgICBsZXQgY29uZmlnRGF0YSA9IHtcbiAgICAgICAgc3RhdHVzZXNSZXF1aXJpbmdDb21tZW50czogWydBcHByb3ZlZCcsICdNaXRpZ2F0ZWQnXSxcbiAgICAgICAgZXNpZ01lYW5pbmc6ICdzaWduIHRoaXMnLFxuICAgICAgICByZXZvY2F0aW9uTW9kaWZpY2F0aW9uRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgcHJvY2Vzc1Jldm9rZXNJbW1lZGlhdGVseTogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdFJldm9jYXRpb25Nb2RpZmljYXRpb25PcGVyYXRpb246ICdSZW1vdmUnLFxuICAgICAgICB1c2VMaW5rQXR0cmlidXRlVmFsdWVGb3JSZXZvY2F0aW9uTW9kaWZpY2F0aW9uOiB0cnVlLFxuICAgICAgICBzaG93Um9sZVJldm9jYXRpb25EZXRhaWxzOiB0cnVlLFxuICAgICAgICBidWxrRGVjaXNpb25zOiBbJ0FwcHJvdmVkJywgJ1JlbWVkaWF0ZWQnXSxcbiAgICAgICAgYnVsa0VudGl0eURlY2lzaW9uczogWydSZWFzc2lnbicsICdEZWxlZ2F0ZWQnXSxcbiAgICAgICAgYWxsb3dFeGNlcHRpb25Qb3B1cDogdHJ1ZSxcbiAgICAgICAgYWxsb3dFeGNlcHRpb25EYXRlOiBkYXRlLmdldFRpbWUoKVxuICAgIH0sIENlcnRpZmljYXRpb25Db25maWc7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfQ2VydGlmaWNhdGlvbkNvbmZpZ18pIHtcbiAgICAgICAgQ2VydGlmaWNhdGlvbkNvbmZpZyA9IF9DZXJ0aWZpY2F0aW9uQ29uZmlnXztcbiAgICB9KSk7XG5cbiAgICBpdCgnaW5pdGlhbGl6ZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDZXJ0aWZpY2F0aW9uQ29uZmlnKGNvbmZpZ0RhdGEpO1xuICAgICAgICBleHBlY3QoY29uZmlnLnN0YXR1c2VzUmVxdWlyaW5nQ29tbWVudHMpLnRvRXF1YWwoY29uZmlnRGF0YS5zdGF0dXNlc1JlcXVpcmluZ0NvbW1lbnRzKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5lc2lnTWVhbmluZykudG9FcXVhbChjb25maWdEYXRhLmVzaWdNZWFuaW5nKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5yZXZvY2F0aW9uTW9kaWZpY2F0aW9uRW5hYmxlZCkudG9FcXVhbChjb25maWdEYXRhLnJldm9jYXRpb25Nb2RpZmljYXRpb25FbmFibGVkKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5wcm9jZXNzUmV2b2tlc0ltbWVkaWF0ZWx5KS50b0VxdWFsKGNvbmZpZ0RhdGEucHJvY2Vzc1Jldm9rZXNJbW1lZGlhdGVseSk7XG4gICAgICAgIGV4cGVjdChjb25maWcuZGVmYXVsdFJldm9jYXRpb25Nb2RpZmljYXRpb25PcGVyYXRpb24pXG4gICAgICAgICAgICAudG9FcXVhbChjb25maWdEYXRhLmRlZmF1bHRSZXZvY2F0aW9uTW9kaWZpY2F0aW9uT3BlcmF0aW9uKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy51c2VMaW5rQXR0cmlidXRlVmFsdWVGb3JSZXZvY2F0aW9uTW9kaWZpY2F0aW9uKVxuICAgICAgICAgICAgLnRvRXF1YWwoY29uZmlnRGF0YS51c2VMaW5rQXR0cmlidXRlVmFsdWVGb3JSZXZvY2F0aW9uTW9kaWZpY2F0aW9uKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5zaG93Um9sZVJldm9jYXRpb25EZXRhaWxzKS50b0VxdWFsKGNvbmZpZ0RhdGEuc2hvd1JvbGVSZXZvY2F0aW9uRGV0YWlscyk7XG4gICAgICAgIGV4cGVjdChjb25maWcuYnVsa0RlY2lzaW9ucykudG9FcXVhbChjb25maWdEYXRhLmJ1bGtEZWNpc2lvbnMpO1xuICAgICAgICBleHBlY3QoY29uZmlnLmJ1bGtFbnRpdHlEZWNpc2lvbnMpLnRvRXF1YWwoY29uZmlnRGF0YS5idWxrRW50aXR5RGVjaXNpb25zKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5hbGxvd0V4Y2VwdGlvblBvcHVwKS50b0VxdWFsKGNvbmZpZ0RhdGEuYWxsb3dFeGNlcHRpb25Qb3B1cCk7XG4gICAgICAgIGV4cGVjdChjb25maWcubWl0aWdhdGlvbkV4cGlyYXRpb25EYXRlKS50b0VxdWFsKGNvbmZpZ0RhdGEuYWxsb3dFeGNlcHRpb25EYXRlKTtcbiAgICB9KTtcblxuICAgIGl0KCdpbml0aWFsaXplcyB3aXRoIG1pc3NpbmcgZGF0YScsICgpID0+IHtcbiAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDZXJ0aWZpY2F0aW9uQ29uZmlnKHt9KTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5zdGF0dXNlc1JlcXVpcmluZ0NvbW1lbnRzKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChjb25maWcuZXNpZ01lYW5pbmcpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5yZXZvY2F0aW9uTW9kaWZpY2F0aW9uRW5hYmxlZCkudG9CZUZhbHN5KCk7XG4gICAgICAgIGV4cGVjdChjb25maWcucHJvY2Vzc1Jldm9rZXNJbW1lZGlhdGVseSkudG9CZUZhbHN5KCk7XG4gICAgICAgIGV4cGVjdChjb25maWcuZGVmYXVsdFJldm9jYXRpb25Nb2RpZmljYXRpb25PcGVyYXRpb24pLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy51c2VMaW5rQXR0cmlidXRlVmFsdWVGb3JSZXZvY2F0aW9uTW9kaWZpY2F0aW9uKS50b0JlRmFsc3koKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5zaG93Um9sZVJldm9jYXRpb25EZXRhaWxzKS50b0JlRmFsc3koKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5idWxrRGVjaXNpb25zKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChjb25maWcuYnVsa0VudGl0eURlY2lzaW9ucykudG9FcXVhbChbXSk7XG4gICAgICAgIGV4cGVjdChjb25maWcuYWxsb3dFeGNlcHRpb25Qb3B1cCkudG9CZUZhbHN5KCk7XG4gICAgICAgIGV4cGVjdChjb25maWcubWl0aWdhdGlvbkV4cGlyYXRpb25EYXRlKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZG9lc1N0YXR1c1JlcXVpcmVDb21tZW50KCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQgKCdyZXR1cm5zIGZhbHNlIHdpdGggdW5kZWZpbmVkIHN0YXR1cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDZXJ0aWZpY2F0aW9uQ29uZmlnKGNvbmZpZ0RhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5kb2VzU3RhdHVzUmVxdWlyZUNvbW1lbnQoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHN0YXR1cyBpcyBub3QgaW4gc3RhdHVzZXNSZXF1aXJpbmdDb21tZW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDZXJ0aWZpY2F0aW9uQ29uZmlnKGNvbmZpZ0RhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5kb2VzU3RhdHVzUmVxdWlyZUNvbW1lbnQoJ3Bvb3AnKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgc3RhdHVzIGlzIG5vdCBpbiBzdGF0dXNlc1JlcXVpcmluZ0NvbW1lbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENlcnRpZmljYXRpb25Db25maWcoY29uZmlnRGF0YSk7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLmRvZXNTdGF0dXNSZXF1aXJlQ29tbWVudCgnQXBwcm92ZWQnKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
