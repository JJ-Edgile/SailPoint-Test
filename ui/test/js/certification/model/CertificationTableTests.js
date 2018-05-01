System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationTable', function () {

                var CertificationTable = undefined,
                    CertificationItem = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationTable_, _CertificationItem_) {
                    CertificationTable = _CertificationTable_;
                    CertificationItem = _CertificationItem_;
                }));

                describe('constructor', function () {
                    it('goes boom if there is no config', function () {
                        expect(function () {
                            return new CertificationTable(null);
                        }).toThrow();
                    });

                    it('reads all properties from the config', function () {
                        var config = {
                            name: 'Brak!',
                            title: 'Hi my name is...',
                            columnConfigKey: 'spaceGhost',
                            sectionHeader: 'meatWad',
                            showIfEmpty: false,
                            allowBulk: true,
                            allowExport: true,
                            allowFiltering: true,
                            enableGroupBy: true,
                            statuses: ['check', 'my', 'creds'],
                            includedTypes: ['helvetica'],
                            excludedTypes: ['comic sans '],
                            preSearchFunc: jasmine.createSpy('preSearchFunc'),
                            groupByChangedFunc: jasmine.createSpy('groupByChangedFunc'),
                            tableId: 'stupidTable'
                        };

                        var table = new CertificationTable(config);
                        expect(table.name).toEqual(config.name);
                        expect(table.title).toEqual(config.title);
                        expect(table.columnConfigKey).toEqual(config.columnConfigKey);
                        expect(table.sectionHeader).toEqual(config.sectionHeader);
                        expect(table.showIfEmpty).toEqual(config.showIfEmpty);
                        expect(table.allowBulk).toEqual(config.allowBulk);
                        expect(table.allowExport).toEqual(config.allowExport);
                        expect(table.allowFiltering).toEqual(config.allowFiltering);
                        expect(table.enableGroupBy).toEqual(config.enableGroupBy);
                        expect(table.tableScope).toBeDefined();
                        expect(table.tableScope.statuses).toEqual(config.statuses);
                        expect(table.tableScope.includedTypes).toEqual(config.includedTypes);
                        expect(table.tableScope.excludedTypes).toEqual(config.excludedTypes);
                        expect(table.preSearchFunc).toEqual(config.preSearchFunc);
                        expect(table.groupByChangedFunc).toEqual(config.groupByChangedFunc);
                        expect(table.tableId).toEqual(config.tableId);
                    });

                    it('defaults properties from a minimal config', function () {
                        var table = new CertificationTable({});
                        expect(table.name).toBeUndefined();
                        expect(table.title).toBeUndefined();
                        expect(table.columnConfigKey).toBeUndefined();
                        expect(table.sectionHeader).toBeUndefined();
                        expect(table.showIfEmpty).toEqual(true);
                        expect(table.allowBulk).toEqual(false);
                        expect(table.allowExport).toEqual(false);
                        expect(table.allowFiltering).toEqual(false);
                        expect(table.enableGroupBy).toEqual(false);
                        expect(table.statuses).toBeUndefined();
                        expect(table.includedTypes).toBeUndefined();
                        expect(table.excludedTypes).toBeUndefined();
                        expect(table.tableScope).toBeDefined();
                    });
                });

                describe('getDataTableConfig()', function () {
                    it('gets a data table config', function () {
                        var table = new CertificationTable({
                            columnConfigKey: 'theKeyToLife',
                            preSearchFunc: jasmine.createSpy('preSearchFunc'),
                            groupByChangedFunc: jasmine.createSpy('groupByChangedFunc'),
                            tableId: 'stupidTable'
                        });
                        var config = table.getDataTableConfig();
                        expect(config.columnConfigKey).toEqual(table.columnConfigKey);
                        expect(config.preSearchFunc).toEqual(table.preSearchFunc);
                        expect(config.groupByChangedFunc).toEqual(table.groupByChangedFunc);
                        expect(config.tableId).toEqual(table.tableId);
                    });

                    it('returns the same data table config on subsequent calls', function () {
                        var table = new CertificationTable({
                            columnConfigKey: 'isToFollowYourDreamsAndEatLotsOfQueso'
                        });
                        var config = table.getDataTableConfig();
                        var config2 = table.getDataTableConfig();
                        expect(config).toBe(config2);
                    });
                });

                describe('getCardListConfig()', function () {
                    it('gets a card list config based on data table directive config', function () {
                        var table = new CertificationTable({
                            columnConfigKey: 'theKeyToLife',
                            preSearchFunc: jasmine.createSpy('preSearchFunc'),
                            groupByChangedFunc: jasmine.createSpy('groupByChangedFunc'),
                            tableId: 'stupidTable'
                        });
                        var dataTableConfig = table.getDataTableConfig(),
                            cardListConfig = table.getCardListConfig();
                        expect(cardListConfig.columnConfigKey).toEqual(table.columnConfigKey);
                        expect(cardListConfig.refreshTrigger).toEqual(dataTableConfig.getRefreshTrigger());
                        expect(cardListConfig.pagingData).toEqual(dataTableConfig.getPagingData());
                        expect(cardListConfig.searchData).toEqual(dataTableConfig.getSearchData());
                    });

                    it('returns the same config on subsequent calls', function () {
                        var table = new CertificationTable({
                            columnConfigKey: 'isToFollowYourDreamsAndEatLotsOfQueso'
                        });
                        var config = table.getCardListConfig();
                        var config2 = table.getCardListConfig();
                        expect(config).toBe(config2);
                    });
                });

                describe('getCount()', function () {
                    var itemStatusCount = undefined,
                        type1 = undefined,
                        type2 = undefined,
                        status1 = 'cool',
                        status2 = 'lame';

                    beforeEach(function () {
                        type1 = CertificationItem.Type.Bundle;
                        type2 = CertificationItem.Type.Exception;

                        itemStatusCount = {
                            getCount: jasmine.createSpy().and.callFake(function (type, status) {
                                if (type1 === type && status1 === status) {
                                    return 1;
                                }
                                if (type1 === type && status2 === status) {
                                    return 10;
                                }
                                if (type2 === type && status1 === status) {
                                    return 100;
                                }
                                if (type2 === type && status2 === status) {
                                    return 1000;
                                } else {
                                    return 0;
                                }
                            })
                        };
                    });

                    it('counts all statuses and types if there are no inclusions or exclusions', function () {
                        var table = new CertificationTable({
                            statuses: [status1, status2]
                        });
                        expect(table.getCount(itemStatusCount)).toEqual(1111);
                    });

                    it('skips excluded types', function () {
                        var table = new CertificationTable({
                            statuses: [status1, status2],
                            excludedTypes: [type1]
                        });
                        expect(table.getCount(itemStatusCount)).toEqual(1100);
                    });

                    it('only counts included types if specified', function () {
                        var table = new CertificationTable({
                            statuses: [status1, status2],
                            includedTypes: [type1]
                        });
                        expect(table.getCount(itemStatusCount)).toEqual(11);
                    });

                    it('only counts statuses in the table', function () {
                        var table = new CertificationTable({
                            statuses: [status2]
                        });
                        expect(table.getCount(itemStatusCount)).toEqual(1010);
                    });
                });

                describe('setupCheckboxModel()', function () {
                    var bulkAllowed = undefined,
                        bulkDenied = undefined;

                    beforeEach(function () {
                        bulkAllowed = new CertificationTable({
                            columnConfigKey: 'theKeyToHappiness',
                            allowBulk: true
                        });

                        bulkDenied = new CertificationTable({
                            columnConfigKey: 'happyWife',
                            allowBulk: false
                        });
                    });

                    it('creates a new selection model if bulk is allowed and the table supports it', function () {
                        expect(bulkAllowed.getDataTableConfig().checkboxMultiSelect).toBeFalsy();
                        bulkAllowed.setupCheckboxModel(true);
                        expect(bulkAllowed.getDataTableConfig().checkboxMultiSelect).toBeTruthy();
                    });

                    it('does not create selection model if bulk is not allowed', function () {
                        bulkAllowed.setupCheckboxModel(false);
                        expect(bulkAllowed.getDataTableConfig().checkboxMultiSelect).toBeFalsy();
                    });

                    it('nulls previous selection model if bulk is no longer allowed', function () {
                        bulkAllowed.setupCheckboxModel(true);
                        expect(bulkAllowed.getDataTableConfig().checkboxMultiSelect).toBeTruthy();

                        bulkAllowed.setupCheckboxModel(false);
                        expect(bulkAllowed.getDataTableConfig().checkboxMultiSelect).toBeNull();
                    });

                    it('does not create selection model if the table does not support it', function () {
                        bulkDenied.setupCheckboxModel(true);
                        expect(bulkDenied.getDataTableConfig().checkboxMultiSelect).toBeFalsy();
                    });
                });

                describe('setEntity', function () {
                    it('sets the entity', function () {
                        var table = new CertificationTable({}),
                            entity = { id: 'person' };
                        expect(table.tableScope.entity).not.toBeDefined();
                        table.setEntity(entity);
                        expect(table.tableScope.entity).toEqual(entity);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvblRhYmxlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7SUFDakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsc0JBQXNCLFlBQU07O2dCQUVqQyxJQUFJLHFCQUFrQjtvQkFBRSxvQkFBaUI7O2dCQUV6QyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxzQkFBc0IscUJBQXdCO29CQUM3RCxxQkFBcUI7b0JBQ3JCLG9CQUFvQjs7O2dCQUd4QixTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyxtQ0FBbUMsWUFBTTt3QkFDeEMsT0FBTyxZQUFBOzRCQVNTLE9BVEgsSUFBSSxtQkFBbUI7MkJBQU87OztvQkFHL0MsR0FBRyx3Q0FBd0MsWUFBTTt3QkFDN0MsSUFBSSxTQUFTOzRCQUNULE1BQU07NEJBQ04sT0FBTzs0QkFDUCxpQkFBaUI7NEJBQ2pCLGVBQWU7NEJBQ2YsYUFBYTs0QkFDYixXQUFXOzRCQUNYLGFBQWE7NEJBQ2IsZ0JBQWdCOzRCQUNoQixlQUFlOzRCQUNmLFVBQVUsQ0FBRSxTQUFTLE1BQU07NEJBQzNCLGVBQWUsQ0FBRTs0QkFDakIsZUFBZSxDQUFFOzRCQUNqQixlQUFlLFFBQVEsVUFBVTs0QkFDakMsb0JBQW9CLFFBQVEsVUFBVTs0QkFDdEMsU0FBUzs7O3dCQUdiLElBQUksUUFBUSxJQUFJLG1CQUFtQjt3QkFDbkMsT0FBTyxNQUFNLE1BQU0sUUFBUSxPQUFPO3dCQUNsQyxPQUFPLE1BQU0sT0FBTyxRQUFRLE9BQU87d0JBQ25DLE9BQU8sTUFBTSxpQkFBaUIsUUFBUSxPQUFPO3dCQUM3QyxPQUFPLE1BQU0sZUFBZSxR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QUFhLElBQUksbUJBQW1COzRCQUNoQyxpQkFBaUI7NEJBQ2pCLFdBQVc7Ozs7b0JBSW5CLEdBQUcsOEVBQThFLFlBQU07d0JBQ25GLE9BQU8sWUFBWSxxQkFBcUIscUJBQXFCO3dCQUM3RCxZQUFZLG1CQUFtQjt3QkFDL0IsT0FBTyxZQUFZLHFCQUFxQixxQkFBcUI7OztvQkFHakUsR0FBRywwREFBMEQsWUFBTTt3QkFDL0QsWUFBWSxtQkFBbUI7d0JBQy9CLE9BQU8sWUFBWSxxQkFBcUIscUJBQXFCOzs7b0JBR2pFLEdBQUcsK0RBQStELFlBQU07d0JBQ3BFLFlBQVksbUJBQW1CO3dCQUMvQixPQUFPLFlBQVkscUJBQXFCLHFCQUFxQjs7d0JBRTdELFlBQVksbUJBQW1CO3dCQUMvQixPQUFPLFlBQVkscUJBQXFCLHFCQUFxQjs7O29CQUdqRSxHQUFHLG9FQUFvRSxZQUFNO3dCQUN6RSxXQUFXLG1CQUFtQjt3QkFDOUIsT0FBTyxXQUFXLHFCQUFxQixxQkFBcUI7Ozs7Z0JBSXBFLFNBQVMsYUFBYSxZQUFNO29CQUN4QixHQUFHLG1CQUFtQixZQUFNO3dCQUN4QixJQUFJLFFBQVEsSUFBSSxtQkFBbUI7NEJBQy9CLFNBQVMsRUFBRSxJQUFJO3dCQUNuQixPQUFPLE1BQU0sV0FBVyxRQUFRLElBQUk7d0JBQ3BDLE1BQU0sVUFBVTt3QkFDaEIsT0FBTyxNQUFNLFdBQVcsUUFBUSxRQUFROzs7Ozs7R0FrQmpEIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvblRhYmxlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uVGFibGUnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IENlcnRpZmljYXRpb25UYWJsZSwgQ2VydGlmaWNhdGlvbkl0ZW07XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfQ2VydGlmaWNhdGlvblRhYmxlXywgX0NlcnRpZmljYXRpb25JdGVtXykgPT4ge1xyXG4gICAgICAgIENlcnRpZmljYXRpb25UYWJsZSA9IF9DZXJ0aWZpY2F0aW9uVGFibGVfO1xyXG4gICAgICAgIENlcnRpZmljYXRpb25JdGVtID0gX0NlcnRpZmljYXRpb25JdGVtXztcclxuICAgIH0pKTtcclxuXHJcbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2dvZXMgYm9vbSBpZiB0aGVyZSBpcyBubyBjb25maWcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgQ2VydGlmaWNhdGlvblRhYmxlKG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZWFkcyBhbGwgcHJvcGVydGllcyBmcm9tIHRoZSBjb25maWcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnQnJhayEnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdIaSBteSBuYW1lIGlzLi4uJyxcclxuICAgICAgICAgICAgICAgIGNvbHVtbkNvbmZpZ0tleTogJ3NwYWNlR2hvc3QnLFxyXG4gICAgICAgICAgICAgICAgc2VjdGlvbkhlYWRlcjogJ21lYXRXYWQnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0lmRW1wdHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dCdWxrOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dFeHBvcnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0ZpbHRlcmluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZUdyb3VwQnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWyAnY2hlY2snLCAnbXknLCAnY3JlZHMnIF0sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlZFR5cGVzOiBbICdoZWx2ZXRpY2EnIF0sXHJcbiAgICAgICAgICAgICAgICBleGNsdWRlZFR5cGVzOiBbICdjb21pYyBzYW5zICddLFxyXG4gICAgICAgICAgICAgICAgcHJlU2VhcmNoRnVuYzogamFzbWluZS5jcmVhdGVTcHkoJ3ByZVNlYXJjaEZ1bmMnKSxcclxuICAgICAgICAgICAgICAgIGdyb3VwQnlDaGFuZ2VkRnVuYzogamFzbWluZS5jcmVhdGVTcHkoJ2dyb3VwQnlDaGFuZ2VkRnVuYycpLFxyXG4gICAgICAgICAgICAgICAgdGFibGVJZDogJ3N0dXBpZFRhYmxlJ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IHRhYmxlID0gbmV3IENlcnRpZmljYXRpb25UYWJsZShjb25maWcpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFibGUubmFtZSkudG9FcXVhbChjb25maWcubmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS50aXRsZSkudG9FcXVhbChjb25maWcudGl0bGUpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFibGUuY29sdW1uQ29uZmlnS2V5KS50b0VxdWFsKGNvbmZpZy5jb2x1bW5Db25maWdLZXkpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFibGUuc2VjdGlvbkhlYWRlcikudG9FcXVhbChjb25maWcuc2VjdGlvbkhlYWRlcik7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5zaG93SWZFbXB0eSkudG9FcXVhbChjb25maWcuc2hvd0lmRW1wdHkpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFibGUuYWxsb3dCdWxrKS50b0VxdWFsKGNvbmZpZy5hbGxvd0J1bGspO1xyXG4gICAgICAgICAgICBleHBlY3QodGFibGUuYWxsb3dFeHBvcnQpLnRvRXF1YWwoY29uZmlnLmFsbG93RXhwb3J0KTtcclxuICAgICAgICAgICAgZXhwZWN0KHRhYmxlLmFsbG93RmlsdGVyaW5nKS50b0VxdWFsKGNvbmZpZy5hbGxvd0ZpbHRlcmluZyk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5lbmFibGVHcm91cEJ5KS50b0VxdWFsKGNvbmZpZy5lbmFibGVHcm91cEJ5KTtcclxuICAgICAgICAgICAgZXhwZWN0KHRhYmxlLnRhYmxlU2NvcGUpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS50YWJsZVNjb3BlLnN0YXR1c2VzKS50b0VxdWFsKGNvbmZpZy5zdGF0dXNlcyk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS50YWJsZVNjb3BlLmluY2x1ZGVkVHlwZXMpLnRvRXF1YWwoY29uZmlnLmluY2x1ZGVkVHlwZXMpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFibGUudGFibGVTY29wZS5leGNsdWRlZFR5cGVzKS50b0VxdWFsKGNvbmZpZy5leGNsdWRlZFR5cGVzKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRhYmxlLnByZVNlYXJjaEZ1bmMpLnRvRXF1YWwoY29uZmlnLnByZVNlYXJjaEZ1bmMpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFibGUuZ3JvdXBCeUNoYW5nZWRGdW5jKS50b0VxdWFsKGNvbmZpZy5ncm91cEJ5Q2hhbmdlZEZ1bmMpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFibGUudGFibGVJZCkudG9FcXVhbChjb25maWcudGFibGVJZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkZWZhdWx0cyBwcm9wZXJ0aWVzIGZyb20gYSBtaW5pbWFsIGNvbmZpZycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRhYmxlID0gbmV3IENlcnRpZmljYXRpb25UYWJsZSh7fSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5uYW1lKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS50aXRsZSkudG9CZVVuZGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFibGUuY29sdW1uQ29uZmlnS2V5KS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5zZWN0aW9uSGVhZGVyKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5zaG93SWZFbXB0eSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRhYmxlLmFsbG93QnVsaykudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5hbGxvd0V4cG9ydCkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5hbGxvd0ZpbHRlcmluZykudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5lbmFibGVHcm91cEJ5KS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRhYmxlLnN0YXR1c2VzKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5pbmNsdWRlZFR5cGVzKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5leGNsdWRlZFR5cGVzKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS50YWJsZVNjb3BlKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldERhdGFUYWJsZUNvbmZpZygpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdnZXRzIGEgZGF0YSB0YWJsZSBjb25maWcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0YWJsZSA9IG5ldyBDZXJ0aWZpY2F0aW9uVGFibGUoe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uQ29uZmlnS2V5OiAndGhlS2V5VG9MaWZlJyxcclxuICAgICAgICAgICAgICAgIHByZVNlYXJjaEZ1bmM6IGphc21pbmUuY3JlYXRlU3B5KCdwcmVTZWFyY2hGdW5jJyksXHJcbiAgICAgICAgICAgICAgICBncm91cEJ5Q2hhbmdlZEZ1bmM6IGphc21pbmUuY3JlYXRlU3B5KCdncm91cEJ5Q2hhbmdlZEZ1bmMnKSxcclxuICAgICAgICAgICAgICAgIHRhYmxlSWQ6ICdzdHVwaWRUYWJsZSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSB0YWJsZS5nZXREYXRhVGFibGVDb25maWcoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5jb2x1bW5Db25maWdLZXkpLnRvRXF1YWwodGFibGUuY29sdW1uQ29uZmlnS2V5KTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5wcmVTZWFyY2hGdW5jKS50b0VxdWFsKHRhYmxlLnByZVNlYXJjaEZ1bmMpO1xyXG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLmdyb3VwQnlDaGFuZ2VkRnVuYykudG9FcXVhbCh0YWJsZS5ncm91cEJ5Q2hhbmdlZEZ1bmMpO1xyXG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLnRhYmxlSWQpLnRvRXF1YWwodGFibGUudGFibGVJZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBzYW1lIGRhdGEgdGFibGUgY29uZmlnIG9uIHN1YnNlcXVlbnQgY2FsbHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0YWJsZSA9IG5ldyBDZXJ0aWZpY2F0aW9uVGFibGUoe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uQ29uZmlnS2V5OiAnaXNUb0ZvbGxvd1lvdXJEcmVhbXNBbmRFYXRMb3RzT2ZRdWVzbydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSB0YWJsZS5nZXREYXRhVGFibGVDb25maWcoKTtcclxuICAgICAgICAgICAgbGV0IGNvbmZpZzIgPSB0YWJsZS5nZXREYXRhVGFibGVDb25maWcoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZykudG9CZShjb25maWcyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRDYXJkTGlzdENvbmZpZygpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdnZXRzIGEgY2FyZCBsaXN0IGNvbmZpZyBiYXNlZCBvbiBkYXRhIHRhYmxlIGRpcmVjdGl2ZSBjb25maWcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0YWJsZSA9IG5ldyBDZXJ0aWZpY2F0aW9uVGFibGUoe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uQ29uZmlnS2V5OiAndGhlS2V5VG9MaWZlJyxcclxuICAgICAgICAgICAgICAgIHByZVNlYXJjaEZ1bmM6IGphc21pbmUuY3JlYXRlU3B5KCdwcmVTZWFyY2hGdW5jJyksXHJcbiAgICAgICAgICAgICAgICBncm91cEJ5Q2hhbmdlZEZ1bmM6IGphc21pbmUuY3JlYXRlU3B5KCdncm91cEJ5Q2hhbmdlZEZ1bmMnKSxcclxuICAgICAgICAgICAgICAgIHRhYmxlSWQ6ICdzdHVwaWRUYWJsZSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhVGFibGVDb25maWcgPSB0YWJsZS5nZXREYXRhVGFibGVDb25maWcoKSxcclxuICAgICAgICAgICAgICAgIGNhcmRMaXN0Q29uZmlnID0gdGFibGUuZ2V0Q2FyZExpc3RDb25maWcoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNhcmRMaXN0Q29uZmlnLmNvbHVtbkNvbmZpZ0tleSkudG9FcXVhbCh0YWJsZS5jb2x1bW5Db25maWdLZXkpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2FyZExpc3RDb25maWcucmVmcmVzaFRyaWdnZXIpLnRvRXF1YWwoZGF0YVRhYmxlQ29uZmlnLmdldFJlZnJlc2hUcmlnZ2VyKCkpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2FyZExpc3RDb25maWcucGFnaW5nRGF0YSkudG9FcXVhbChkYXRhVGFibGVDb25maWcuZ2V0UGFnaW5nRGF0YSgpKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNhcmRMaXN0Q29uZmlnLnNlYXJjaERhdGEpLnRvRXF1YWwoZGF0YVRhYmxlQ29uZmlnLmdldFNlYXJjaERhdGEoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBzYW1lIGNvbmZpZyBvbiBzdWJzZXF1ZW50IGNhbGxzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGFibGUgPSBuZXcgQ2VydGlmaWNhdGlvblRhYmxlKHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkNvbmZpZ0tleTogJ2lzVG9Gb2xsb3dZb3VyRHJlYW1zQW5kRWF0TG90c09mUXVlc28nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gdGFibGUuZ2V0Q2FyZExpc3RDb25maWcoKTtcclxuICAgICAgICAgICAgbGV0IGNvbmZpZzIgPSB0YWJsZS5nZXRDYXJkTGlzdENvbmZpZygpO1xyXG4gICAgICAgICAgICBleHBlY3QoY29uZmlnKS50b0JlKGNvbmZpZzIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldENvdW50KCknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGl0ZW1TdGF0dXNDb3VudCwgdHlwZTEsIHR5cGUyLFxyXG4gICAgICAgICAgICBzdGF0dXMxID0gJ2Nvb2wnLFxyXG4gICAgICAgICAgICBzdGF0dXMyID0gJ2xhbWUnO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgdHlwZTEgPSBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkJ1bmRsZTtcclxuICAgICAgICAgICAgdHlwZTIgPSBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkV4Y2VwdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGl0ZW1TdGF0dXNDb3VudCA9IHtcclxuICAgICAgICAgICAgICAgIGdldENvdW50OiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZSgodHlwZSwgc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0eXBlMSA9PT0gdHlwZSkgJiYgKHN0YXR1czEgPT09IHN0YXR1cykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgodHlwZTEgPT09IHR5cGUpICYmIChzdGF0dXMyID09PSBzdGF0dXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0eXBlMiA9PT0gdHlwZSkgJiYgKHN0YXR1czEgPT09IHN0YXR1cykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0eXBlMiA9PT0gdHlwZSkgJiYgKHN0YXR1czIgPT09IHN0YXR1cykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY291bnRzIGFsbCBzdGF0dXNlcyBhbmQgdHlwZXMgaWYgdGhlcmUgYXJlIG5vIGluY2x1c2lvbnMgb3IgZXhjbHVzaW9ucycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRhYmxlID0gbmV3IENlcnRpZmljYXRpb25UYWJsZSh7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWyBzdGF0dXMxLCBzdGF0dXMyIF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5nZXRDb3VudChpdGVtU3RhdHVzQ291bnQpKS50b0VxdWFsKDExMTEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2tpcHMgZXhjbHVkZWQgdHlwZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0YWJsZSA9IG5ldyBDZXJ0aWZpY2F0aW9uVGFibGUoe1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsgc3RhdHVzMSwgc3RhdHVzMiBdLFxyXG4gICAgICAgICAgICAgICAgZXhjbHVkZWRUeXBlczogWyB0eXBlMSBdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBleHBlY3QodGFibGUuZ2V0Q291bnQoaXRlbVN0YXR1c0NvdW50KSkudG9FcXVhbCgxMTAwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ29ubHkgY291bnRzIGluY2x1ZGVkIHR5cGVzIGlmIHNwZWNpZmllZCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRhYmxlID0gbmV3IENlcnRpZmljYXRpb25UYWJsZSh7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWyBzdGF0dXMxLCBzdGF0dXMyIF0sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlZFR5cGVzOiBbIHR5cGUxIF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5nZXRDb3VudChpdGVtU3RhdHVzQ291bnQpKS50b0VxdWFsKDExKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ29ubHkgY291bnRzIHN0YXR1c2VzIGluIHRoZSB0YWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRhYmxlID0gbmV3IENlcnRpZmljYXRpb25UYWJsZSh7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWyBzdGF0dXMyIF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5nZXRDb3VudChpdGVtU3RhdHVzQ291bnQpKS50b0VxdWFsKDEwMTApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3NldHVwQ2hlY2tib3hNb2RlbCgpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBidWxrQWxsb3dlZCwgYnVsa0RlbmllZDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGJ1bGtBbGxvd2VkID0gbmV3IENlcnRpZmljYXRpb25UYWJsZSh7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWdLZXk6ICd0aGVLZXlUb0hhcHBpbmVzcycsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0J1bGs6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBidWxrRGVuaWVkID0gbmV3IENlcnRpZmljYXRpb25UYWJsZSh7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWdLZXk6ICdoYXBweVdpZmUnLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dCdWxrOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NyZWF0ZXMgYSBuZXcgc2VsZWN0aW9uIG1vZGVsIGlmIGJ1bGsgaXMgYWxsb3dlZCBhbmQgdGhlIHRhYmxlIHN1cHBvcnRzIGl0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoYnVsa0FsbG93ZWQuZ2V0RGF0YVRhYmxlQ29uZmlnKCkuY2hlY2tib3hNdWx0aVNlbGVjdCkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgICAgIGJ1bGtBbGxvd2VkLnNldHVwQ2hlY2tib3hNb2RlbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGJ1bGtBbGxvd2VkLmdldERhdGFUYWJsZUNvbmZpZygpLmNoZWNrYm94TXVsdGlTZWxlY3QpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90IGNyZWF0ZSBzZWxlY3Rpb24gbW9kZWwgaWYgYnVsayBpcyBub3QgYWxsb3dlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgYnVsa0FsbG93ZWQuc2V0dXBDaGVja2JveE1vZGVsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGJ1bGtBbGxvd2VkLmdldERhdGFUYWJsZUNvbmZpZygpLmNoZWNrYm94TXVsdGlTZWxlY3QpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnbnVsbHMgcHJldmlvdXMgc2VsZWN0aW9uIG1vZGVsIGlmIGJ1bGsgaXMgbm8gbG9uZ2VyIGFsbG93ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGJ1bGtBbGxvd2VkLnNldHVwQ2hlY2tib3hNb2RlbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGJ1bGtBbGxvd2VkLmdldERhdGFUYWJsZUNvbmZpZygpLmNoZWNrYm94TXVsdGlTZWxlY3QpLnRvQmVUcnV0aHkoKTtcclxuXHJcbiAgICAgICAgICAgIGJ1bGtBbGxvd2VkLnNldHVwQ2hlY2tib3hNb2RlbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChidWxrQWxsb3dlZC5nZXREYXRhVGFibGVDb25maWcoKS5jaGVja2JveE11bHRpU2VsZWN0KS50b0JlTnVsbCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgY3JlYXRlIHNlbGVjdGlvbiBtb2RlbCBpZiB0aGUgdGFibGUgZG9lcyBub3Qgc3VwcG9ydCBpdCcsICgpID0+IHtcclxuICAgICAgICAgICAgYnVsa0RlbmllZC5zZXR1cENoZWNrYm94TW9kZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChidWxrRGVuaWVkLmdldERhdGFUYWJsZUNvbmZpZygpLmNoZWNrYm94TXVsdGlTZWxlY3QpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3NldEVudGl0eScsICgpID0+IHtcclxuICAgICAgICBpdCgnc2V0cyB0aGUgZW50aXR5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGFibGUgPSBuZXcgQ2VydGlmaWNhdGlvblRhYmxlKHt9KSxcclxuICAgICAgICAgICAgICAgIGVudGl0eSA9IHsgaWQ6ICdwZXJzb24nIH07XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS50YWJsZVNjb3BlLmVudGl0eSkubm90LnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIHRhYmxlLnNldEVudGl0eShlbnRpdHkpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFibGUudGFibGVTY29wZS5lbnRpdHkpLnRvRXF1YWwoZW50aXR5KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
