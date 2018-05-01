System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }],
        execute: function () {

            describe('PolicyViolationDecisionConfig', function () {
                var PolicyViolationDecisionConfig = undefined,
                    PolicyViolationAction = undefined;

                beforeEach(module(policyViolationModule));

                beforeEach(inject(function (_PolicyViolationDecisionConfig_, _PolicyViolationAction_) {
                    PolicyViolationDecisionConfig = _PolicyViolationDecisionConfig_;
                    PolicyViolationAction = _PolicyViolationAction_;
                }));

                describe('init', function () {
                    it('should throw with no data', function () {
                        expect(function () {
                            return new PolicyViolationDecisionConfig();
                        }).toThrow();
                    });

                    it('should initialize with provided data', function () {
                        var data = {
                            allowMitigationExpirationEditing: false,
                            requireMitigationComments: true,
                            defaultMitigationExpirationDate: new Date(),
                            availableBulkDecisions: [{
                                status: 'Mitigated'
                            }, {
                                status: 'Delegated'
                            }]
                        },
                            config = new PolicyViolationDecisionConfig(data);

                        expect(config.allowMitigationExpirationEditing).toEqual(data.allowMitigationExpirationEditing);
                        expect(config.requireMitigationComments).toEqual(data.requireMitigationComments);
                        expect(config.defaultMitigationExpirationDate).toEqual(data.defaultMitigationExpirationDate);
                        expect(config.availableBulkDecisions).toEqual(data.availableBulkDecisions.map(function (decision) {
                            return new PolicyViolationAction(decision);
                        }));
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lWaW9sYXRpb25EZWNpc2lvbkNvbmZpZ1Rlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsVUFBVSxTQUFTOzs7SUFHckc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDOztRQUVsRSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsaUNBQWlDLFlBQVc7Z0JBQ2pELElBQUksZ0NBQTZCO29CQUFFLHdCQUFxQjs7Z0JBRXhELFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGlDQUFpQyx5QkFBeUI7b0JBQ2pGLGdDQUFnQztvQkFDaEMsd0JBQXdCOzs7Z0JBRzVCLFNBQVMsUUFBUSxZQUFXO29CQUN4QixHQUFHLDZCQUE2QixZQUFNO3dCQUNsQyxPQUFPLFlBQUE7NEJBU1MsT0FUSCxJQUFJOzJCQUFpQzs7O29CQUd0RCxHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxJQUFJLE9BQU87NEJBQ1Asa0NBQWtDOzRCQUNsQywyQkFBMkI7NEJBQzNCLGlDQUFpQyxJQUFJOzRCQUNyQyx3QkFBd0IsQ0FBQztnQ0FDckIsUUFBUTsrQkFDVDtnQ0FDQyxRQUFROzs7NEJBRWIsU0FBUyxJQUFJLDhCQUE4Qjs7d0JBRTlDLE9BQU8sT0FBTyxrQ0FBa0MsUUFBUSxLQUFLO3dCQUM3RCxPQUFPLE9BQU8sMkJBQTJCLFFBQVEsS0FBSzt3QkFDdEQsT0FBTyxPQUFPLGlDQUFpQyxRQUFRLEtBQUs7d0JBQzVELE9BQU8sT0FBTyx3QkFDVCxRQUFRLEtBQUssdUJBQXVCLElBQUksVUFBQyxVQUFROzRCQVd0QyxPQVgyQyxJQUFJLHNCQUFzQjs7Ozs7OztHQWtCOUYiLCJmaWxlIjoicG9saWN5VmlvbGF0aW9uL21vZGVsL1BvbGljeVZpb2xhdGlvbkRlY2lzaW9uQ29uZmlnVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcG9saWN5VmlvbGF0aW9uTW9kdWxlIGZyb20gJ3BvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnUG9saWN5VmlvbGF0aW9uRGVjaXNpb25Db25maWcnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgUG9saWN5VmlvbGF0aW9uRGVjaXNpb25Db25maWcsIFBvbGljeVZpb2xhdGlvbkFjdGlvbjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBvbGljeVZpb2xhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1BvbGljeVZpb2xhdGlvbkRlY2lzaW9uQ29uZmlnXywgX1BvbGljeVZpb2xhdGlvbkFjdGlvbl8pIHtcbiAgICAgICAgUG9saWN5VmlvbGF0aW9uRGVjaXNpb25Db25maWcgPSBfUG9saWN5VmlvbGF0aW9uRGVjaXNpb25Db25maWdfO1xuICAgICAgICBQb2xpY3lWaW9sYXRpb25BY3Rpb24gPSBfUG9saWN5VmlvbGF0aW9uQWN0aW9uXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnaW5pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gZGF0YScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgUG9saWN5VmlvbGF0aW9uRGVjaXNpb25Db25maWcoKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCBwcm92aWRlZCBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBhbGxvd01pdGlnYXRpb25FeHBpcmF0aW9uRWRpdGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZU1pdGlnYXRpb25Db21tZW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0TWl0aWdhdGlvbkV4cGlyYXRpb25EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUJ1bGtEZWNpc2lvbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ01pdGlnYXRlZCdcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ0RlbGVnYXRlZCdcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwgY29uZmlnID0gbmV3IFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uQ29uZmlnKGRhdGEpO1xuXG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLmFsbG93TWl0aWdhdGlvbkV4cGlyYXRpb25FZGl0aW5nKS50b0VxdWFsKGRhdGEuYWxsb3dNaXRpZ2F0aW9uRXhwaXJhdGlvbkVkaXRpbmcpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5yZXF1aXJlTWl0aWdhdGlvbkNvbW1lbnRzKS50b0VxdWFsKGRhdGEucmVxdWlyZU1pdGlnYXRpb25Db21tZW50cyk7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLmRlZmF1bHRNaXRpZ2F0aW9uRXhwaXJhdGlvbkRhdGUpLnRvRXF1YWwoZGF0YS5kZWZhdWx0TWl0aWdhdGlvbkV4cGlyYXRpb25EYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcuYXZhaWxhYmxlQnVsa0RlY2lzaW9ucylcbiAgICAgICAgICAgICAgICAudG9FcXVhbChkYXRhLmF2YWlsYWJsZUJ1bGtEZWNpc2lvbnMubWFwKChkZWNpc2lvbikgPT4gbmV3IFBvbGljeVZpb2xhdGlvbkFjdGlvbihkZWNpc2lvbikpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
