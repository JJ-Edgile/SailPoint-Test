System.register(['test/js/TestInitializer', 'common/dataview/card/CardModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var cardModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewCardCardModule) {
            cardModule = _commonDataviewCardCardModule['default'];
        }],
        execute: function () {

            describe('CardListConfig', function () {

                var CardListConfig = undefined,
                    PagingData = undefined,
                    SearchData = undefined,
                    DataRefreshTrigger = undefined;

                beforeEach(module(cardModule));

                beforeEach(inject(function (_CardListConfig_, _PagingData_, _SearchData_, _DataRefreshTrigger_) {
                    CardListConfig = _CardListConfig_;
                    PagingData = _PagingData_;
                    SearchData = _SearchData_;
                    DataRefreshTrigger = _DataRefreshTrigger_;
                }));

                describe('constructor', function () {
                    it('throws without config', function () {
                        expect(function () {
                            return new CardListConfig();
                        }).toThrow();
                    });

                    it('sets the values based on passed configuration', function () {
                        var configData = {
                            columnConfigKey: 'testConfig',
                            refreshTrigger: { refresh: 'this!' },
                            pagingData: { fake: 'Paging!' },
                            searchData: { fake: 'Search!' },
                            sortEnabled: true,
                            defaultSort: { fake: 'Sort!' },
                            filters: [{ fake: 'Filter!' }],
                            headerEnabled: true,
                            searchEnabled: false,
                            searchPlaceholder: 'key'
                        },
                            config = new CardListConfig(configData);
                        expect(config.columnConfigKey).toBe(configData.columnConfigKey);
                        expect(config.refreshTrigger).toBe(configData.refreshTrigger);
                        expect(config.pagingData).toBe(configData.pagingData);
                        expect(config.searchData).toBe(configData.searchData);
                        expect(config.sortEnabled).toBe(configData.sortEnabled);
                        expect(config.defaultSort).toBe(configData.defaultSort);
                        expect(config.filters).toBe(configData.filters);
                        expect(config.headerEnabled).toEqual(configData.headerEnabled);
                        expect(config.searchEnabled).toEqual(configData.searchEnabled);
                        expect(config.searchPlaceholder).toEqual(configData.searchPlaceholder);
                    });

                    it('sets the defaults if values are not set', function () {
                        var configData = {},
                            config = new CardListConfig(configData);

                        expect(config.columnConfigKey).toEqual(undefined);
                        expect(config.refreshTrigger).toEqual(new DataRefreshTrigger());
                        expect(config.pagingData).toEqual(new PagingData());
                        expect(config.searchData).toEqual(new SearchData());
                        expect(config.sortEnabled).toEqual(false);
                        expect(config.defaultSort).toEqual(undefined);
                        expect(config.filters).toEqual(undefined);
                        expect(config.headerEnabled).toEqual(false);
                        expect(config.searchEnabled).toEqual(false);
                        expect(config.searchPlaceholder).toEqual(undefined);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9jYXJkL0NhcmRMaXN0Q29uZmlnVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG9DQUFvQyxVQUFVLFNBQVM7OztJQUcvRjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsK0JBQStCO1lBQ3JGLGFBQWEsOEJBQThCOztRQUUvQyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsa0JBQWtCLFlBQU07O2dCQUU3QixJQUFJLGlCQUFjO29CQUFFLGFBQVU7b0JBQUUsYUFBVTtvQkFBRSxxQkFBa0I7O2dCQUU5RCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxrQkFBa0IsY0FBYyxjQUFjLHNCQUF5QjtvQkFDdEYsaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLGFBQWE7b0JBQ2IscUJBQXFCOzs7Z0JBR3pCLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLHlCQUF5QixZQUFNO3dCQUM5QixPQUFPLFlBQUE7NEJBV1MsT0FYSCxJQUFJOzJCQUFrQjs7O29CQUd2QyxHQUFHLGlEQUFpRCxZQUFNO3dCQUN0RCxJQUFJLGFBQWE7NEJBQ2IsaUJBQWlCOzRCQUNqQixnQkFBZ0IsRUFBRSxTQUFTOzRCQUMzQixZQUFZLEVBQUUsTUFBTTs0QkFDcEIsWUFBWSxFQUFFLE1BQU07NEJBQ3BCLGFBQWE7NEJBQ2IsYUFBYSxFQUFFLE1BQU07NEJBQ3JCLFNBQVMsQ0FBQyxFQUFFLE1BQU07NEJBQ2xCLGVBQWU7NEJBQ2YsZUFBZTs0QkFDZixtQkFBbUI7OzRCQUNwQixTQUFTLElBQUksZUFBZTt3QkFDL0IsT0FBTyxPQUFPLGlCQUFpQixLQUFLLFdBQVc7d0JBQy9DLE9BQU8sT0FBTyxnQkFBZ0IsS0FBSyxXQUFXO3dCQUM5QyxPQUFPLE9BQU8sWUFBWSxLQUFLLFdBQVc7d0JBQzFDLE9BQU8sT0FBTyxZQUFZLEtBQUssV0FBVzt3QkFDMUMsT0FBTyxPQUFPLGFBQWEsS0FBSyxXQUFXO3dCQUMzQyxPQUFPLE9BQU8sYUFBYSxLQUFLLFdBQVc7d0JBQzNDLE9BQU8sT0FBTyxTQUFTLEtBQUssV0FBVzt3QkFDdkMsT0FBTyxPQUFPLGVBQWUsUUFBUSxXQUFXO3dCQUNoRCxPQUFPLE9BQU8sZUFBZSxRQUFRLFdBQVc7d0JBQ2hELE9BQU8sT0FBTyxtQkFBbUIsUUFBUSxXQUFXOzs7b0JBR3hELEdBQUcsMkNBQTJDLFlBQU07d0JBQ2hELElBQUksYUFBYTs0QkFBSSxTQUFTLElBQUksZUFBZTs7d0JBRWpELE9BQU8sT0FBTyxpQkFBaUIsUUFBUTt3QkFDdkMsT0FBTyxPQUFPLGdCQUFnQixRQUFRLElBQUk7d0JBQzFDLE9BQU8sT0FBTyxZQUFZLFFBQVEsSUFBSTt3QkFDdEMsT0FBTyxPQUFPLFlBQVksUUFBUSxJQUFJO3dCQUN0QyxPQUFPLE9BQU8sYUFBYSxRQUFRO3dCQUNuQyxPQUFPLE9BQU8sYUFBYSxRQUFRO3dCQUNuQyxPQUFPLE9BQU8sU0FBUyxRQUFRO3dCQUMvQixPQUFPLE9BQU8sZUFBZSxRQUFRO3dCQUNyQyxPQUFPLE9BQU8sZUFBZSxRQUFRO3dCQUNyQyxPQUFPLE9BQU8sbUJBQW1CLFFBQVE7Ozs7OztHQW9CbEQiLCJmaWxlIjoiY29tbW9uL2RhdGF2aWV3L2NhcmQvQ2FyZExpc3RDb25maWdUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjYXJkTW9kdWxlIGZyb20gJ2NvbW1vbi9kYXRhdmlldy9jYXJkL0NhcmRNb2R1bGUnO1xuXG5kZXNjcmliZSgnQ2FyZExpc3RDb25maWcnLCAoKSA9PiB7XG5cbiAgICBsZXQgQ2FyZExpc3RDb25maWcsIFBhZ2luZ0RhdGEsIFNlYXJjaERhdGEsIERhdGFSZWZyZXNoVHJpZ2dlcjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNhcmRNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfQ2FyZExpc3RDb25maWdfLCBfUGFnaW5nRGF0YV8sIF9TZWFyY2hEYXRhXywgX0RhdGFSZWZyZXNoVHJpZ2dlcl8pID0+IHtcbiAgICAgICAgQ2FyZExpc3RDb25maWcgPSBfQ2FyZExpc3RDb25maWdfO1xuICAgICAgICBQYWdpbmdEYXRhID0gX1BhZ2luZ0RhdGFfO1xuICAgICAgICBTZWFyY2hEYXRhID0gX1NlYXJjaERhdGFfO1xuICAgICAgICBEYXRhUmVmcmVzaFRyaWdnZXIgPSBfRGF0YVJlZnJlc2hUcmlnZ2VyXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aG91dCBjb25maWcnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbmV3IENhcmRMaXN0Q29uZmlnKCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIHZhbHVlcyBiYXNlZCBvbiBwYXNzZWQgY29uZmlndXJhdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb25maWdEYXRhID0ge1xuICAgICAgICAgICAgICAgIGNvbHVtbkNvbmZpZ0tleTogJ3Rlc3RDb25maWcnLFxuICAgICAgICAgICAgICAgIHJlZnJlc2hUcmlnZ2VyOiB7IHJlZnJlc2g6ICd0aGlzIScgfSxcbiAgICAgICAgICAgICAgICBwYWdpbmdEYXRhOiB7IGZha2U6ICdQYWdpbmchJyB9LFxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGE6IHsgZmFrZTogJ1NlYXJjaCEnIH0sXG4gICAgICAgICAgICAgICAgc29ydEVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZGVmYXVsdFNvcnQ6IHsgZmFrZTogJ1NvcnQhJyB9LFxuICAgICAgICAgICAgICAgIGZpbHRlcnM6IFt7IGZha2U6ICdGaWx0ZXIhJ31dLFxuICAgICAgICAgICAgICAgIGhlYWRlckVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VhcmNoRW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VhcmNoUGxhY2Vob2xkZXI6ICdrZXknXG4gICAgICAgICAgICB9LCBjb25maWcgPSBuZXcgQ2FyZExpc3RDb25maWcoY29uZmlnRGF0YSk7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLmNvbHVtbkNvbmZpZ0tleSkudG9CZShjb25maWdEYXRhLmNvbHVtbkNvbmZpZ0tleSk7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLnJlZnJlc2hUcmlnZ2VyKS50b0JlKGNvbmZpZ0RhdGEucmVmcmVzaFRyaWdnZXIpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5wYWdpbmdEYXRhKS50b0JlKGNvbmZpZ0RhdGEucGFnaW5nRGF0YSk7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLnNlYXJjaERhdGEpLnRvQmUoY29uZmlnRGF0YS5zZWFyY2hEYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcuc29ydEVuYWJsZWQpLnRvQmUoY29uZmlnRGF0YS5zb3J0RW5hYmxlZCk7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLmRlZmF1bHRTb3J0KS50b0JlKGNvbmZpZ0RhdGEuZGVmYXVsdFNvcnQpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5maWx0ZXJzKS50b0JlKGNvbmZpZ0RhdGEuZmlsdGVycyk7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLmhlYWRlckVuYWJsZWQpLnRvRXF1YWwoY29uZmlnRGF0YS5oZWFkZXJFbmFibGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcuc2VhcmNoRW5hYmxlZCkudG9FcXVhbChjb25maWdEYXRhLnNlYXJjaEVuYWJsZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5zZWFyY2hQbGFjZWhvbGRlcikudG9FcXVhbChjb25maWdEYXRhLnNlYXJjaFBsYWNlaG9sZGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIGRlZmF1bHRzIGlmIHZhbHVlcyBhcmUgbm90IHNldCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb25maWdEYXRhID0ge30sIGNvbmZpZyA9IG5ldyBDYXJkTGlzdENvbmZpZyhjb25maWdEYXRhKTtcblxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5jb2x1bW5Db25maWdLZXkpLnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcucmVmcmVzaFRyaWdnZXIpLnRvRXF1YWwobmV3IERhdGFSZWZyZXNoVHJpZ2dlcigpKTtcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcucGFnaW5nRGF0YSkudG9FcXVhbChuZXcgUGFnaW5nRGF0YSgpKTtcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcuc2VhcmNoRGF0YSkudG9FcXVhbChuZXcgU2VhcmNoRGF0YSgpKTtcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcuc29ydEVuYWJsZWQpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5kZWZhdWx0U29ydCkudG9FcXVhbCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5maWx0ZXJzKS50b0VxdWFsKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLmhlYWRlckVuYWJsZWQpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5zZWFyY2hFbmFibGVkKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcuc2VhcmNoUGxhY2Vob2xkZXIpLnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
