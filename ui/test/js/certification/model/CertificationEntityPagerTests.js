System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationEntityPager', function () {

                var CertificationEntityPager = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationEntityPager_) {
                    CertificationEntityPager = _CertificationEntityPager_;
                }));

                describe('constructor', function () {
                    it('is not too fond of not having an index', function () {
                        expect(function () {
                            return new CertificationEntityPager(null, ['1234']);
                        }).toThrow();
                    });

                    it('frowns upon not getting a list of entity IDs', function () {
                        expect(function () {
                            return new CertificationEntityPager(0, null);
                        }).toThrow();
                    });
                });

                describe('next()', function () {
                    it('is irritated when there are no more entities', function () {
                        var pager = new CertificationEntityPager(0, ['123']);
                        expect(function () {
                            return pager.next();
                        }).toThrow();
                    });

                    it('moves to the next entity', function () {
                        var nextId = '8798739487';
                        var pager = new CertificationEntityPager(1, ['1', '2', nextId]);
                        expect(pager.next()).toEqual(nextId);
                        expect(pager.currentIdx).toEqual(2);
                    });
                });

                describe('previous()', function () {
                    it('raises an eyebrow when there is no previous entity', function () {
                        var pager = new CertificationEntityPager(0, ['123']);
                        expect(function () {
                            return pager.previous();
                        }).toThrow();
                    });

                    it('moves to the previous entity', function () {
                        var prevId = '8798739487';
                        var pager = new CertificationEntityPager(1, [prevId, '2']);
                        expect(pager.previous()).toEqual(prevId);
                        expect(pager.currentIdx).toEqual(0);
                    });
                });

                describe('hasNext()', function () {
                    it('returns true when there are more entities', function () {
                        var pager = new CertificationEntityPager(0, ['1', '2']);
                        expect(pager.hasNext()).toEqual(true);
                    });

                    it('returns false when there are no more entities', function () {
                        var pager = new CertificationEntityPager(1, ['1', '2']);
                        expect(pager.hasNext()).toEqual(false);
                    });
                });

                describe('hasPrevious()', function () {
                    it('returns true when there are previous entities', function () {
                        var pager = new CertificationEntityPager(1, ['1', '2']);
                        expect(pager.hasPrevious()).toEqual(true);
                    });

                    it('returns false when there are is not a previous entity', function () {
                        var pager = new CertificationEntityPager(0, ['1', '2']);
                        expect(pager.hasPrevious()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkVudGl0eVBhZ2VyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7SUFDakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsNEJBQTRCLFlBQU07O2dCQUV2QyxJQUFJLDJCQUF3Qjs7Z0JBRTVCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLDRCQUErQjtvQkFDOUMsMkJBQTJCOzs7Z0JBRy9CLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLDBDQUEwQyxZQUFNO3dCQUMvQyxPQUFPLFlBQUE7NEJBUVMsT0FSSCxJQUFJLHlCQUF5QixNQUFNLENBQUU7MkJBQVc7OztvQkFHakUsR0FBRyxnREFBZ0QsWUFBTTt3QkFDckQsT0FBTyxZQUFBOzRCQVVTLE9BVkgsSUFBSSx5QkFBeUIsR0FBRzsyQkFBTzs7OztnQkFJNUQsU0FBUyxVQUFVLFlBQU07b0JBQ3JCLEdBQUcsZ0RBQWdELFlBQU07d0JBQ3JELElBQUksUUFBUSxJQUFJLHlCQUF5QixHQUFHLENBQUU7d0JBQzlDLE9BQU8sWUFBQTs0QkFZUyxPQVpILE1BQU07MkJBQVE7OztvQkFHL0IsR0FBRyw0QkFBNEIsWUFBTTt3QkFDakMsSUFBSSxTQUFTO3dCQUNiLElBQUksUUFBUSxJQUFJLHlCQUF5QixHQUFHLENBQUUsS0FBSyxLQUFLO3dCQUN4RCxPQUFPLE1BQU0sUUFBUSxRQUFRO3dCQUM3QixPQUFPLE1BQU0sWUFBWSxRQUFROzs7O2dCQUl6QyxTQUFTLGNBQWMsWUFBTTtvQkFDekIsR0FBRyxzREFBc0QsWUFBTTt3QkFDM0QsSUFBSSxRQUFRLElBQUkseUJBQXlCLEdBQUcsQ0FBRTt3QkFDOUMsT0FBTyxZQUFBOzRCQWNTLE9BZEgsTUFBTTsyQkFBWTs7O29CQUduQyxHQUFHLGdDQUFnQyxZQUFNO3dCQUNyQyxJQUFJLFNBQVM7d0JBQ2IsSUFBSSxRQUFRLElBQUkseUJBQXlCLEdBQUcsQ0FBRSxRQUFRO3dCQUN0RCxPQUFPLE1BQU0sWUFBWSxRQUFRO3dCQUNqQyxPQUFPLE1BQU0sWUFBWSxRQUFROzs7O2dCQUl6QyxTQUFTLGFBQWEsWUFBTTtvQkFDeEIsR0FBRyw2Q0FBNkMsWUFBTTt3QkFDbEQsSUFBSSxRQUFRLElBQUkseUJBQXlCLEdBQUcsQ0FBRSxLQUFLO3dCQUNuRCxPQUFPLE1BQU0sV0FBVyxRQUFROzs7b0JBR3BDLEdBQUcsaURBQWlELFlBQU07d0JBQ3RELElBQUksUUFBUSxJQUFJLHlCQUF5QixHQUFHLENBQUUsS0FBSzt3QkFDbkQsT0FBTyxNQUFNLFdBQVcsUUFBUTs7OztnQkFJeEMsU0FBUyxpQkFBaUIsWUFBTTtvQkFDNUIsR0FBRyxpREFBaUQsWUFBTTt3QkFDdEQsSUFBSSxRQUFRLElBQUkseUJBQXlCLEdBQUcsQ0FBRSxLQUFLO3dCQUNuRCxPQUFPLE1BQU0sZUFBZSxRQUFROzs7b0JBR3hDLEdBQUcseURBQXlELFlBQU07d0JBQzlELElBQUksUUFBUSxJQUFJLHlCQUF5QixHQUFHLENBQUUsS0FBSzt3QkFDbkQsT0FBTyxNQUFNLGVBQWUsUUFBUTs7Ozs7O0dBcUI3QyIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL21vZGVsL0NlcnRpZmljYXRpb25FbnRpdHlQYWdlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnQ2VydGlmaWNhdGlvbkVudGl0eVBhZ2VyJywgKCkgPT4ge1xyXG5cclxuICAgIGxldCBDZXJ0aWZpY2F0aW9uRW50aXR5UGFnZXI7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfQ2VydGlmaWNhdGlvbkVudGl0eVBhZ2VyXykgPT4ge1xyXG4gICAgICAgIENlcnRpZmljYXRpb25FbnRpdHlQYWdlciA9IF9DZXJ0aWZpY2F0aW9uRW50aXR5UGFnZXJfO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcclxuICAgICAgICBpdCgnaXMgbm90IHRvbyBmb25kIG9mIG5vdCBoYXZpbmcgYW4gaW5kZXgnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgQ2VydGlmaWNhdGlvbkVudGl0eVBhZ2VyKG51bGwsIFsgJzEyMzQnIF0pKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdmcm93bnMgdXBvbiBub3QgZ2V0dGluZyBhIGxpc3Qgb2YgZW50aXR5IElEcycsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IG5ldyBDZXJ0aWZpY2F0aW9uRW50aXR5UGFnZXIoMCwgbnVsbCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCduZXh0KCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2lzIGlycml0YXRlZCB3aGVuIHRoZXJlIGFyZSBubyBtb3JlIGVudGl0aWVzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFnZXIgPSBuZXcgQ2VydGlmaWNhdGlvbkVudGl0eVBhZ2VyKDAsIFsgJzEyMycgXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBwYWdlci5uZXh0KCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ21vdmVzIHRvIHRoZSBuZXh0IGVudGl0eScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5leHRJZCA9ICc4Nzk4NzM5NDg3JztcclxuICAgICAgICAgICAgbGV0IHBhZ2VyID0gbmV3IENlcnRpZmljYXRpb25FbnRpdHlQYWdlcigxLCBbICcxJywgJzInLCBuZXh0SWQgXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdlci5uZXh0KCkpLnRvRXF1YWwobmV4dElkKTtcclxuICAgICAgICAgICAgZXhwZWN0KHBhZ2VyLmN1cnJlbnRJZHgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgncHJldmlvdXMoKScsICgpID0+IHtcclxuICAgICAgICBpdCgncmFpc2VzIGFuIGV5ZWJyb3cgd2hlbiB0aGVyZSBpcyBubyBwcmV2aW91cyBlbnRpdHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlciA9IG5ldyBDZXJ0aWZpY2F0aW9uRW50aXR5UGFnZXIoMCwgWyAnMTIzJyBdKTtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHBhZ2VyLnByZXZpb3VzKCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ21vdmVzIHRvIHRoZSBwcmV2aW91cyBlbnRpdHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcmV2SWQgPSAnODc5ODczOTQ4Nyc7XHJcbiAgICAgICAgICAgIGxldCBwYWdlciA9IG5ldyBDZXJ0aWZpY2F0aW9uRW50aXR5UGFnZXIoMSwgWyBwcmV2SWQsICcyJyBdKTtcclxuICAgICAgICAgICAgZXhwZWN0KHBhZ2VyLnByZXZpb3VzKCkpLnRvRXF1YWwocHJldklkKTtcclxuICAgICAgICAgICAgZXhwZWN0KHBhZ2VyLmN1cnJlbnRJZHgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaGFzTmV4dCgpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiB0aGVyZSBhcmUgbW9yZSBlbnRpdGllcycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhZ2VyID0gbmV3IENlcnRpZmljYXRpb25FbnRpdHlQYWdlcigwLCBbICcxJywgJzInIF0pO1xyXG4gICAgICAgICAgICBleHBlY3QocGFnZXIuaGFzTmV4dCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHRoZXJlIGFyZSBubyBtb3JlIGVudGl0aWVzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFnZXIgPSBuZXcgQ2VydGlmaWNhdGlvbkVudGl0eVBhZ2VyKDEsIFsgJzEnLCAnMicgXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdlci5oYXNOZXh0KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2hhc1ByZXZpb3VzKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSB3aGVuIHRoZXJlIGFyZSBwcmV2aW91cyBlbnRpdGllcycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhZ2VyID0gbmV3IENlcnRpZmljYXRpb25FbnRpdHlQYWdlcigxLCBbICcxJywgJzInIF0pO1xyXG4gICAgICAgICAgICBleHBlY3QocGFnZXIuaGFzUHJldmlvdXMoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiB0aGVyZSBhcmUgaXMgbm90IGEgcHJldmlvdXMgZW50aXR5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGFnZXIgPSBuZXcgQ2VydGlmaWNhdGlvbkVudGl0eVBhZ2VyKDAsIFsgJzEnLCAnMicgXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdlci5oYXNQcmV2aW91cygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
