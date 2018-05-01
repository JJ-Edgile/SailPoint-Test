System.register(['test/js/TestInitializer', 'common/search/SearchModule', './ListResultTestService'], function (_export) {
    'use strict';

    var searchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }, function (_ListResultTestService) {}],
        execute: function () {

            describe('ListResultCache', function () {

                var ListResultCache, ListResultDTO, listResultTestService, cache;

                beforeEach(module(searchModule));

                beforeEach(inject(function (_ListResultCache_, _ListResultDTO_, _listResultTestService_) {
                    ListResultCache = _ListResultCache_;
                    ListResultDTO = _ListResultDTO_;
                    listResultTestService = _listResultTestService_;

                    // Create a cache to test with that has 19 items - 4 pages with 5 items (minus one on the last).
                    cache = new ListResultCache();
                    cache.add(listResultTestService.createResult(0, 5, 19), 0, 5);
                    cache.add(listResultTestService.createResult(5, 5, 19), 5, 5);
                    cache.add(listResultTestService.createResult(10, 5, 19), 10, 5);
                    cache.add(listResultTestService.createResult(15, 4, 19), 15, 5);
                }));

                /**
                 * Verify that the given result is as expected.
                 *
                 * @param {ListResultDTO} result  The result to verify.
                 * @param {Number} start  The start index.
                 * @param {Number} num  The expected number of items in the result.
                 * @param {Number} total  The expected total count for the ListResultDTO.
                 */
                function verifyResult(result, start, numItems, total) {
                    var i, resultNum;

                    expect(result.count).toEqual(total);
                    expect(result.objects.length).toEqual(numItems);

                    // Start is zero-based, so go to numItems-1.
                    for (i = 0; i < numItems; i++) {
                        resultNum = start + i;
                        expect(result.objects[i]).toEqual(resultNum);
                    }
                }

                describe('get', function () {
                    it('returns null with an empty cache', function () {
                        var emptyCache = new ListResultCache();
                        expect(emptyCache.get(0, 5)).toEqual(null);
                    });

                    it('returns null when the cache does not have all requested entries', function () {
                        expect(cache.get(0, 25)).toEqual(null);
                    });

                    describe('from the beginning of cache', function () {
                        it('returns the first part of the first cache page', function () {
                            var result = cache.get(0, 3);
                            verifyResult(result, 0, 3, 19);
                        });

                        it('returns results filling the entire first cache page', function () {
                            var result = cache.get(0, 5);
                            verifyResult(result, 0, 5, 19);
                        });

                        it('returns results spanning onto subsequent pages on page boundaries', function () {
                            var result = cache.get(0, 15);
                            verifyResult(result, 0, 15, 19);
                        });

                        it('returns results spanning onto subsequent pages off page boundaries', function () {
                            var result = cache.get(0, 11);
                            verifyResult(result, 0, 11, 19);
                        });

                        it('returns all entries when requesting exact number', function () {
                            var result = cache.get(0, 19);
                            verifyResult(result, 0, 19, 19);
                        });

                        it('returns all entries when requesting all pages', function () {
                            var result = cache.get(0, 20);
                            verifyResult(result, 0, 19, 19);
                        });
                    });

                    describe('from the middle of first cache page', function () {
                        it('returns a subset of the first cache page', function () {
                            var result = cache.get(1, 2);
                            verifyResult(result, 1, 2, 19);
                        });

                        it('returns results up to the end of the first cache page', function () {
                            var result = cache.get(1, 4);
                            verifyResult(result, 1, 4, 19);
                        });

                        it('returns results spanning onto subsequent pages on end page boundary', function () {
                            var result = cache.get(1, 14);
                            verifyResult(result, 1, 14, 19);
                        });

                        it('returns results spanning onto subsequent pages off end page boundary', function () {
                            var result = cache.get(1, 13);
                            verifyResult(result, 1, 13, 19);
                        });

                        it('returns all entries when requesting exact number', function () {
                            var result = cache.get(1, 18);
                            verifyResult(result, 1, 18, 19);
                        });

                        it('returns all entries when requesting all pages', function () {
                            var result = cache.get(1, 19);
                            verifyResult(result, 1, 18, 19);
                        });
                    });

                    describe('from the middle of the cache', function () {
                        it('returns the first part of a middle cache page', function () {
                            var result = cache.get(5, 3);
                            verifyResult(result, 5, 3, 19);
                        });

                        it('returns results filling an entire middle cache page', function () {
                            var result = cache.get(5, 5);
                            verifyResult(result, 5, 5, 19);
                        });

                        it('returns results spanning onto subsequent pages on page boundaries', function () {
                            var result = cache.get(5, 10);
                            verifyResult(result, 5, 10, 19);
                        });

                        it('returns results spanning onto subsequent pages off page boundaries', function () {
                            var result = cache.get(6, 8);
                            verifyResult(result, 6, 8, 19);
                        });

                        it('returns all entries when requesting exact number', function () {
                            var result = cache.get(5, 14);
                            verifyResult(result, 5, 14, 19);
                        });

                        it('returns all entries when requesting all pages', function () {
                            var result = cache.get(5, 15);
                            verifyResult(result, 5, 14, 19);
                        });
                    });

                    describe('from the beginning of the last cache page', function () {
                        it('returns the first part of the last cache page', function () {
                            var result = cache.get(15, 2);
                            verifyResult(result, 15, 2, 19);
                        });

                        it('returns results filling the entire last cache page', function () {
                            var result = cache.get(15, 4);
                            verifyResult(result, 15, 4, 19);
                        });

                        it('returns results filling the entire last cache page', function () {
                            var result = cache.get(15, 4);
                            verifyResult(result, 15, 4, 19);
                        });

                        it('returns all entries when requesting exact number', function () {
                            var result = cache.get(5, 14);
                            verifyResult(result, 5, 14, 19);
                        });

                        it('returns all entries when requesting all pages', function () {
                            var result = cache.get(5, 15);
                            verifyResult(result, 5, 14, 19);
                        });
                    });

                    describe('from the middle of last cache page', function () {
                        it('returns a subset of the last cache page', function () {
                            var result = cache.get(16, 2);
                            verifyResult(result, 16, 2, 19);
                        });

                        it('returns all entries when requesting exact number', function () {
                            var result = cache.get(16, 3);
                            verifyResult(result, 16, 3, 19);
                        });

                        it('returns all entries when requesting all pages', function () {
                            var result = cache.get(16, 4);
                            verifyResult(result, 16, 3, 19);
                        });
                    });

                    it('returns results when added entries are different page sizes', function () {
                        // Add a few pages:
                        //  Page 1: 0-2
                        //  Page 2: 3-17
                        //  Page 3: 18-24
                        var page1 = listResultTestService.createResult(0, 3, 25),
                            page2 = listResultTestService.createResult(3, 15, 25),
                            page3 = listResultTestService.createResult(18, 7, 25),
                            result;

                        // Create a fresh cache with these pages.
                        cache = new ListResultCache();
                        cache.add(page1, 0, 3);
                        cache.add(page2, 3, 15);
                        cache.add(page3, 18, 7);

                        // Test from first page,
                        result = cache.get(1, 1);
                        verifyResult(result, 1, 1, 25);
                        result = cache.get(1, 2);
                        verifyResult(result, 1, 2, 25);
                        result = cache.get(0, 3);
                        verifyResult(result, 0, 3, 25);
                        result = cache.get(1, 3);
                        verifyResult(result, 1, 3, 25);

                        // Test from middle page.
                        result = cache.get(3, 15);
                        verifyResult(result, 3, 15, 25);
                        result = cache.get(3, 1);
                        verifyResult(result, 3, 1, 25);
                        result = cache.get(4, 1);
                        verifyResult(result, 4, 1, 25);
                        result = cache.get(4, 14);
                        verifyResult(result, 4, 14, 25);
                        result = cache.get(4, 15);
                        verifyResult(result, 4, 15, 25);

                        // Test from last page.
                        result = cache.get(18, 7);
                        verifyResult(result, 18, 7, 25);
                        result = cache.get(18, 3);
                        verifyResult(result, 18, 3, 25);
                        result = cache.get(19, 3);
                        verifyResult(result, 19, 3, 25);
                        result = cache.get(19, 6);
                        verifyResult(result, 19, 6, 25);
                    });
                });

                describe('add', function () {
                    it('throws if adding entries out of order', function () {
                        var badCache = new ListResultCache(),
                            result = listResultTestService.createResult(5, 5, 5);
                        expect(function () {
                            badCache.add(result, 5, 5);
                        }).toThrow();
                    });

                    it('increases cache size', function () {
                        var page1 = listResultTestService.createResult(0, 5, 10),
                            page2 = listResultTestService.createResult(5, 5, 10);

                        cache = new ListResultCache();
                        expect(cache.size).toEqual(0);
                        cache.add(page1, 0, 5);
                        expect(cache.size).toEqual(5);
                        cache.add(page2, 5, 5);
                        expect(cache.size).toEqual(10);
                    });
                });

                describe('reset', function () {
                    it('clears the cache and resets the size', function () {
                        cache.reset();
                        expect(cache.get(0, 10)).toBeNull();
                        expect(cache.size).toEqual(0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvTGlzdFJlc3VsdENhY2hlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDhCQUE4Qiw0QkFBNEIsVUFBVSxTQUFTO0lBQXpIOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQkFBMkI7WUFDakYsZUFBZSwwQkFBMEI7V0FDMUMsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOztZQUY3QixTQUFTLG1CQUFtQixZQUFXOztnQkFFbkMsSUFBSSxpQkFBaUIsZUFBZSx1QkFBdUI7O2dCQUUzRCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxtQkFBbUIsaUJBQWlCLHlCQUF5QjtvQkFDcEYsa0JBQWtCO29CQUNsQixnQkFBZ0I7b0JBQ2hCLHdCQUF3Qjs7O29CQUd4QixRQUFRLElBQUk7b0JBQ1osTUFBTSxJQUFJLHNCQUFzQixhQUFhLEdBQUcsR0FBRyxLQUFLLEdBQUc7b0JBQzNELE1BQU0sSUFBSSxzQkFBc0IsYUFBYSxHQUFHLEdBQUcsS0FBSyxHQUFHO29CQUMzRCxNQUFNLElBQUksc0JBQXNCLGFBQWEsSUFBSSxHQUFHLEtBQUssSUFBSTtvQkFDN0QsTUFBTSxJQUFJLHNCQUFzQixhQUFhLElBQUksR0FBRyxLQUFLLElBQUk7Ozs7Ozs7Ozs7O2dCQVdqRSxTQUFTLGFBQWEsUUFBUSxPQUFPLFVBQVUsT0FBTztvQkFDbEQsSUFBSSxHQUFHOztvQkFFUCxPQUFPLE9BQU8sT0FBTyxRQUFRO29CQUM3QixPQUFPLE9BQU8sUUFBUSxRQUFRLFFBQVE7OztvQkFHdEMsS0FBSyxJQUFJLEdBQUcsSUFBSSxVQUFVLEtBQUs7d0JBQzNCLFlBQVksUUFBUTt3QkFDcEIsT0FBTyxPQUFPLFFBQVEsSUFBSSxRQUFROzs7O2dCQUkxQyxTQUFTLE9BQU8sWUFBVztvQkFDdkIsR0FBRyxvQ0FBb0MsWUFBVzt3QkFD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QkFBc0IsYUFBYSxHQUFHLEdBQUc7NEJBQ2pELFFBQVEsc0JBQXNCLGFBQWEsR0FBRyxHQUFHOzt3QkFFckQsUUFBUSxJQUFJO3dCQUNaLE9BQU8sTUFBTSxNQUFNLFFBQVE7d0JBQzNCLE1BQU0sSUFBSSxPQUFPLEdBQUc7d0JBQ3BCLE9BQU8sTUFBTSxNQUFNLFFBQVE7d0JBQzNCLE1BQU0sSUFBSSxPQUFPLEdBQUc7d0JBQ3BCLE9BQU8sTUFBTSxNQUFNLFFBQVE7Ozs7Z0JBSW5DLFNBQVMsU0FBUyxZQUFXO29CQUN6QixHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxNQUFNO3dCQUNOLE9BQU8sTUFBTSxJQUFJLEdBQUcsS0FBSzt3QkFDekIsT0FBTyxNQUFNLE1BQU0sUUFBUTs7Ozs7O0dBWXBDIiwiZmlsZSI6ImNvbW1vbi9zZWFyY2gvTGlzdFJlc3VsdENhY2hlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IHNlYXJjaE1vZHVsZSBmcm9tICdjb21tb24vc2VhcmNoL1NlYXJjaE1vZHVsZSc7XHJcbmltcG9ydCAnLi9MaXN0UmVzdWx0VGVzdFNlcnZpY2UnO1xyXG5cclxuZGVzY3JpYmUoJ0xpc3RSZXN1bHRDYWNoZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBMaXN0UmVzdWx0Q2FjaGUsIExpc3RSZXN1bHREVE8sIGxpc3RSZXN1bHRUZXN0U2VydmljZSwgY2FjaGU7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoc2VhcmNoTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0xpc3RSZXN1bHRDYWNoZV8sIF9MaXN0UmVzdWx0RFRPXywgX2xpc3RSZXN1bHRUZXN0U2VydmljZV8pIHtcclxuICAgICAgICBMaXN0UmVzdWx0Q2FjaGUgPSBfTGlzdFJlc3VsdENhY2hlXztcclxuICAgICAgICBMaXN0UmVzdWx0RFRPID0gX0xpc3RSZXN1bHREVE9fO1xyXG4gICAgICAgIGxpc3RSZXN1bHRUZXN0U2VydmljZSA9IF9saXN0UmVzdWx0VGVzdFNlcnZpY2VfO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBjYWNoZSB0byB0ZXN0IHdpdGggdGhhdCBoYXMgMTkgaXRlbXMgLSA0IHBhZ2VzIHdpdGggNSBpdGVtcyAobWludXMgb25lIG9uIHRoZSBsYXN0KS5cclxuICAgICAgICBjYWNoZSA9IG5ldyBMaXN0UmVzdWx0Q2FjaGUoKTtcclxuICAgICAgICBjYWNoZS5hZGQobGlzdFJlc3VsdFRlc3RTZXJ2aWNlLmNyZWF0ZVJlc3VsdCgwLCA1LCAxOSksIDAsIDUpO1xyXG4gICAgICAgIGNhY2hlLmFkZChsaXN0UmVzdWx0VGVzdFNlcnZpY2UuY3JlYXRlUmVzdWx0KDUsIDUsIDE5KSwgNSwgNSk7XHJcbiAgICAgICAgY2FjaGUuYWRkKGxpc3RSZXN1bHRUZXN0U2VydmljZS5jcmVhdGVSZXN1bHQoMTAsIDUsIDE5KSwgMTAsIDUpO1xyXG4gICAgICAgIGNhY2hlLmFkZChsaXN0UmVzdWx0VGVzdFNlcnZpY2UuY3JlYXRlUmVzdWx0KDE1LCA0LCAxOSksIDE1LCA1KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZlcmlmeSB0aGF0IHRoZSBnaXZlbiByZXN1bHQgaXMgYXMgZXhwZWN0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtMaXN0UmVzdWx0RFRPfSByZXN1bHQgIFRoZSByZXN1bHQgdG8gdmVyaWZ5LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0ICBUaGUgc3RhcnQgaW5kZXguXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnVtICBUaGUgZXhwZWN0ZWQgbnVtYmVyIG9mIGl0ZW1zIGluIHRoZSByZXN1bHQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdG90YWwgIFRoZSBleHBlY3RlZCB0b3RhbCBjb3VudCBmb3IgdGhlIExpc3RSZXN1bHREVE8uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHZlcmlmeVJlc3VsdChyZXN1bHQsIHN0YXJ0LCBudW1JdGVtcywgdG90YWwpIHtcclxuICAgICAgICB2YXIgaSwgcmVzdWx0TnVtO1xyXG5cclxuICAgICAgICBleHBlY3QocmVzdWx0LmNvdW50KS50b0VxdWFsKHRvdGFsKTtcclxuICAgICAgICBleHBlY3QocmVzdWx0Lm9iamVjdHMubGVuZ3RoKS50b0VxdWFsKG51bUl0ZW1zKTtcclxuXHJcbiAgICAgICAgLy8gU3RhcnQgaXMgemVyby1iYXNlZCwgc28gZ28gdG8gbnVtSXRlbXMtMS5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtSXRlbXM7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHROdW0gPSBzdGFydCArIGk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQub2JqZWN0c1tpXSkudG9FcXVhbChyZXN1bHROdW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgbnVsbCB3aXRoIGFuIGVtcHR5IGNhY2hlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBlbXB0eUNhY2hlID0gbmV3IExpc3RSZXN1bHRDYWNoZSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZW1wdHlDYWNoZS5nZXQoMCwgNSkpLnRvRXF1YWwobnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIG51bGwgd2hlbiB0aGUgY2FjaGUgZG9lcyBub3QgaGF2ZSBhbGwgcmVxdWVzdGVkIGVudHJpZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGNhY2hlLmdldCgwLCAyNSkpLnRvRXF1YWwobnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdmcm9tIHRoZSBiZWdpbm5pbmcgb2YgY2FjaGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdGhlIGZpcnN0IHBhcnQgb2YgdGhlIGZpcnN0IGNhY2hlIHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjYWNoZS5nZXQoMCwgMyk7XHJcbiAgICAgICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCAwLCAzLCAxOSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgcmVzdWx0cyBmaWxsaW5nIHRoZSBlbnRpcmUgZmlyc3QgY2FjaGUgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNhY2hlLmdldCgwLCA1KTtcclxuICAgICAgICAgICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQsIDAsIDUsIDE5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyByZXN1bHRzIHNwYW5uaW5nIG9udG8gc3Vic2VxdWVudCBwYWdlcyBvbiBwYWdlIGJvdW5kYXJpZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjYWNoZS5nZXQoMCwgMTUpO1xyXG4gICAgICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgMCwgMTUsIDE5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyByZXN1bHRzIHNwYW5uaW5nIG9udG8gc3Vic2VxdWVudCBwYWdlcyBvZmYgcGFnZSBib3VuZGFyaWVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY2FjaGUuZ2V0KDAsIDExKTtcclxuICAgICAgICAgICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQsIDAsIDExLCAxOSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgYWxsIGVudHJpZXMgd2hlbiByZXF1ZXN0aW5nIGV4YWN0IG51bWJlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNhY2hlLmdldCgwLCAxOSk7XHJcbiAgICAgICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCAwLCAxOSwgMTkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGFsbCBlbnRyaWVzIHdoZW4gcmVxdWVzdGluZyBhbGwgcGFnZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjYWNoZS5nZXQoMCwgMjApO1xyXG4gICAgICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgMCwgMTksIDE5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdmcm9tIHRoZSBtaWRkbGUgb2YgZmlyc3QgY2FjaGUgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpdCgncmV0dXJucyBhIHN1YnNldCBvZiB0aGUgZmlyc3QgY2FjaGUgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNhY2hlLmdldCgxLCAyKTtcclxuICAgICAgICAgICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQsIDEsIDIsIDE5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyByZXN1bHRzIHVwIHRvIHRoZSBlbmQgb2YgdGhlIGZpcnN0IGNhY2hlIHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjYWNoZS5nZXQoMSwgNCk7XHJcbiAgICAgICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCAxLCA0LCAxOSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgcmVzdWx0cyBzcGFubmluZyBvbnRvIHN1YnNlcXVlbnQgcGFnZXMgb24gZW5kIHBhZ2UgYm91bmRhcnknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjYWNoZS5nZXQoMSwgMTQpO1xyXG4gICAgICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgMSwgMTQsIDE5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyByZXN1bHRzIHNwYW5uaW5nIG9udG8gc3Vic2VxdWVudCBwYWdlcyBvZmYgZW5kIHBhZ2UgYm91bmRhcnknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjYWNoZS5nZXQoMSwgMTMpO1xyXG4gICAgICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgMSwgMTMsIDE5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyBhbGwgZW50cmllcyB3aGVuIHJlcXVlc3RpbmcgZXhhY3QgbnVtYmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY2FjaGUuZ2V0KDEsIDE4KTtcclxuICAgICAgICAgICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQsIDEsIDE4LCAxOSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgYWxsIGVudHJpZXMgd2hlbiByZXF1ZXN0aW5nIGFsbCBwYWdlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNhY2hlLmdldCgxLCAxOSk7XHJcbiAgICAgICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCAxLCAxOCwgMTkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2Zyb20gdGhlIG1pZGRsZSBvZiB0aGUgY2FjaGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdGhlIGZpcnN0IHBhcnQgb2YgYSBtaWRkbGUgY2FjaGUgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNhY2hlLmdldCg1LCAzKTtcclxuICAgICAgICAgICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQsIDUsIDMsIDE5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyByZXN1bHRzIGZpbGxpbmcgYW4gZW50aXJlIG1pZGRsZSBjYWNoZSBwYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY2FjaGUuZ2V0KDUsIDUpO1xyXG4gICAgICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgNSwgNSwgMTkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHJlc3VsdHMgc3Bhbm5pbmcgb250byBzdWJzZXF1ZW50IHBhZ2VzIG9uIHBhZ2UgYm91bmRhcmllcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNhY2hlLmdldCg1LCAxMCk7XHJcbiAgICAgICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCA1LCAxMCwgMTkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHJlc3VsdHMgc3Bhbm5pbmcgb250byBzdWJzZXF1ZW50IHBhZ2VzIG9mZiBwYWdlIGJvdW5kYXJpZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjYWNoZS5nZXQoNiwgOCk7XHJcbiAgICAgICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCA2LCA4LCAxOSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgYWxsIGVudHJpZXMgd2hlbiByZXF1ZXN0aW5nIGV4YWN0IG51bWJlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNhY2hlLmdldCg1LCAxNCk7XHJcbiAgICAgICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCA1LCAxNCwgMTkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGFsbCBlbnRyaWVzIHdoZW4gcmVxdWVzdGluZyBhbGwgcGFnZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjYWNoZS5nZXQoNSwgMTUpO1xyXG4gICAgICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgNSwgMTQsIDE5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxhc3QgY2FjaGUgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0aGUgZmlyc3QgcGFydCBvZiB0aGUgbGFzdCBjYWNoZSBwYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY2FjaGUuZ2V0KDE1LCAyKTtcclxuICAgICAgICAgICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQsIDE1LCAyLCAxOSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgcmVzdWx0cyBmaWxsaW5nIHRoZSBlbnRpcmUgbGFzdCBjYWNoZSBwYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY2FjaGUuZ2V0KDE1LCA0KTtcclxuICAgICAgICAgICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQsIDE1LCA0LCAxOSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgcmVzdWx0cyBmaWxsaW5nIHRoZSBlbnRpcmUgbGFzdCBjYWNoZSBwYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY2FjaGUuZ2V0KDE1LCA0KTtcclxuICAgICAgICAgICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQsIDE1LCA0LCAxOSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgYWxsIGVudHJpZXMgd2hlbiByZXF1ZXN0aW5nIGV4YWN0IG51bWJlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNhY2hlLmdldCg1LCAxNCk7XHJcbiAgICAgICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCA1LCAxNCwgMTkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGFsbCBlbnRyaWVzIHdoZW4gcmVxdWVzdGluZyBhbGwgcGFnZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjYWNoZS5nZXQoNSwgMTUpO1xyXG4gICAgICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgNSwgMTQsIDE5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdmcm9tIHRoZSBtaWRkbGUgb2YgbGFzdCBjYWNoZSBwYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGEgc3Vic2V0IG9mIHRoZSBsYXN0IGNhY2hlIHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBjYWNoZS5nZXQoMTYsIDIpO1xyXG4gICAgICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgMTYsIDIsIDE5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyBhbGwgZW50cmllcyB3aGVuIHJlcXVlc3RpbmcgZXhhY3QgbnVtYmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gY2FjaGUuZ2V0KDE2LCAzKTtcclxuICAgICAgICAgICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQsIDE2LCAzLCAxOSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgYWxsIGVudHJpZXMgd2hlbiByZXF1ZXN0aW5nIGFsbCBwYWdlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGNhY2hlLmdldCgxNiwgNCk7XHJcbiAgICAgICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCAxNiwgMywgMTkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgcmVzdWx0cyB3aGVuIGFkZGVkIGVudHJpZXMgYXJlIGRpZmZlcmVudCBwYWdlIHNpemVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCBhIGZldyBwYWdlczpcclxuICAgICAgICAgICAgLy8gIFBhZ2UgMTogMC0yXHJcbiAgICAgICAgICAgIC8vICBQYWdlIDI6IDMtMTdcclxuICAgICAgICAgICAgLy8gIFBhZ2UgMzogMTgtMjRcclxuICAgICAgICAgICAgdmFyIHBhZ2UxID0gbGlzdFJlc3VsdFRlc3RTZXJ2aWNlLmNyZWF0ZVJlc3VsdCgwLCAzLCAyNSksXHJcbiAgICAgICAgICAgICAgICBwYWdlMiA9IGxpc3RSZXN1bHRUZXN0U2VydmljZS5jcmVhdGVSZXN1bHQoMywgMTUsIDI1KSxcclxuICAgICAgICAgICAgICAgIHBhZ2UzID0gbGlzdFJlc3VsdFRlc3RTZXJ2aWNlLmNyZWF0ZVJlc3VsdCgxOCwgNywgMjUpLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgZnJlc2ggY2FjaGUgd2l0aCB0aGVzZSBwYWdlcy5cclxuICAgICAgICAgICAgY2FjaGUgPSBuZXcgTGlzdFJlc3VsdENhY2hlKCk7XHJcbiAgICAgICAgICAgIGNhY2hlLmFkZChwYWdlMSwgMCwgMyk7XHJcbiAgICAgICAgICAgIGNhY2hlLmFkZChwYWdlMiwgMywgMTUpO1xyXG4gICAgICAgICAgICBjYWNoZS5hZGQocGFnZTMsIDE4LCA3KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRlc3QgZnJvbSBmaXJzdCBwYWdlLFxyXG4gICAgICAgICAgICByZXN1bHQgPSBjYWNoZS5nZXQoMSwgMSk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQsIDEsIDEsIDI1KTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gY2FjaGUuZ2V0KDEsIDIpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCAxLCAyLCAyNSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGNhY2hlLmdldCgwLCAzKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgMCwgMywgMjUpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSBjYWNoZS5nZXQoMSwgMyk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQsIDEsIDMsIDI1KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRlc3QgZnJvbSBtaWRkbGUgcGFnZS5cclxuICAgICAgICAgICAgcmVzdWx0ID0gY2FjaGUuZ2V0KDMsIDE1KTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgMywgMTUsIDI1KTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gY2FjaGUuZ2V0KDMsIDEpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCAzLCAxLCAyNSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGNhY2hlLmdldCg0LCAxKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgNCwgMSwgMjUpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSBjYWNoZS5nZXQoNCwgMTQpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCA0LCAxNCwgMjUpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSBjYWNoZS5nZXQoNCwgMTUpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocmVzdWx0LCA0LCAxNSwgMjUpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGVzdCBmcm9tIGxhc3QgcGFnZS5cclxuICAgICAgICAgICAgcmVzdWx0ID0gY2FjaGUuZ2V0KDE4LCA3KTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgMTgsIDcsIDI1KTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gY2FjaGUuZ2V0KDE4LCAzKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgMTgsIDMsIDI1KTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gY2FjaGUuZ2V0KDE5LCAzKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgMTksIDMsIDI1KTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gY2FjaGUuZ2V0KDE5LCA2KTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHJlc3VsdCwgMTksIDYsIDI1KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdhZGQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgndGhyb3dzIGlmIGFkZGluZyBlbnRyaWVzIG91dCBvZiBvcmRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYmFkQ2FjaGUgPSBuZXcgTGlzdFJlc3VsdENhY2hlKCksXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBsaXN0UmVzdWx0VGVzdFNlcnZpY2UuY3JlYXRlUmVzdWx0KDUsIDUsIDUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGJhZENhY2hlLmFkZChyZXN1bHQsIDUsIDUpOyB9ICkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaW5jcmVhc2VzIGNhY2hlIHNpemUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2UxID0gbGlzdFJlc3VsdFRlc3RTZXJ2aWNlLmNyZWF0ZVJlc3VsdCgwLCA1LCAxMCksXHJcbiAgICAgICAgICAgICAgICBwYWdlMiA9IGxpc3RSZXN1bHRUZXN0U2VydmljZS5jcmVhdGVSZXN1bHQoNSwgNSwgMTApO1xyXG5cclxuICAgICAgICAgICAgY2FjaGUgPSBuZXcgTGlzdFJlc3VsdENhY2hlKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjYWNoZS5zaXplKS50b0VxdWFsKDApO1xyXG4gICAgICAgICAgICBjYWNoZS5hZGQocGFnZTEsIDAsIDUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2FjaGUuc2l6ZSkudG9FcXVhbCg1KTtcclxuICAgICAgICAgICAgY2FjaGUuYWRkKHBhZ2UyLCA1LCA1KTtcclxuICAgICAgICAgICAgZXhwZWN0KGNhY2hlLnNpemUpLnRvRXF1YWwoMTApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Jlc2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ2NsZWFycyB0aGUgY2FjaGUgYW5kIHJlc2V0cyB0aGUgc2l6ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjYWNoZS5yZXNldCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2FjaGUuZ2V0KDAsIDEwKSkudG9CZU51bGwoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNhY2hlLnNpemUpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
