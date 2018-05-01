System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/certification/CertificationTestData'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsCertificationCertificationTestData) {}],
        execute: function () {

            describe('Scorecard', function () {

                var Scorecard = undefined,
                    scoreData = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_Scorecard_, certificationTestData) {
                    Scorecard = _Scorecard_;
                    scoreData = certificationTestData.SCORECARD;
                }));

                describe('constructor', function () {
                    it('blows up with no data', function () {
                        expect(function () {
                            return new Scorecard(null);
                        }).toThrow();
                    });

                    it('blows up with no data for a score', function () {
                        var data = {
                            scores: [null, scoreData.scores[0]]
                        };
                        expect(function () {
                            return new Scorecard(data);
                        }).toThrow();
                    });

                    function checkScore(score, expected) {
                        expect(score.categoryDisplayName).toEqual(expected.categoryDisplayName);
                        expect(score.score).toEqual(expected.score);
                        expect(score.compensatedScore).toEqual(expected.compensatedScore);
                        expect(score.compensated).toEqual(expected.compensated);
                    }

                    it('sets all properties correctly', function () {
                        var card = new Scorecard(scoreData);
                        expect(card.composite).toEqual(scoreData.composite);
                        expect(card.compensated).toEqual(scoreData.compensated);
                        checkScore(card.scores[0], scoreData.scores[0]);
                        checkScore(card.scores[1], scoreData.scores[1]);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvU2NvcmVjYXJkVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxnREFBZ0QsVUFBVSxTQUFTO0lBQ2hKOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLDJDQUEyQztRQUN4RCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsYUFBYSxZQUFNOztnQkFFeEIsSUFBSSxZQUFTO29CQUFFLFlBQVM7O2dCQUV4QixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxhQUFhLHVCQUEwQjtvQkFDdEQsWUFBWTtvQkFDWixZQUFZLHNCQUFzQjs7O2dCQUd0QyxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyx5QkFBeUIsWUFBTTt3QkFDOUIsT0FBTyxZQUFBOzRCQVFTLE9BUkgsSUFBSSxVQUFVOzJCQUFPOzs7b0JBR3RDLEdBQUcscUNBQXFDLFlBQU07d0JBQzFDLElBQUksT0FBTzs0QkFDUCxRQUFRLENBQUUsTUFBTSxVQUFVLE9BQU87O3dCQUVyQyxPQUFPLFlBQUE7NEJBVVMsT0FWSCxJQUFJLFVBQVU7MkJBQU87OztvQkFHdEMsU0FBUyxXQUFXLE9BQU8sVUFBVTt3QkFDakMsT0FBTyxNQUFNLHFCQUFxQixRQUFRLFNBQVM7d0JBQ25ELE9BQU8sTUFBTSxPQUFPLFFBQVEsU0FBUzt3QkFDckMsT0FBTyxNQUFNLGtCQUFrQixRQUFRLFNBQVM7d0JBQ2hELE9BQU8sTUFBTSxhQUFhLFFBQVEsU0FBUzs7O29CQUcvQyxHQUFHLGlDQUFpQyxZQUFNO3dCQUN0QyxJQUFJLE9BQU8sSUFBSSxVQUFVO3dCQUN6QixPQUFPLEtBQUssV0FBVyxRQUFRLFVBQVU7d0JBQ3pDLE9BQU8sS0FBSyxhQUFhLFFBQVEsVUFBVTt3QkFDM0MsV0FBVyxLQUFLLE9BQU8sSUFBSSxVQUFVLE9BQU87d0JBQzVDLFdBQVcsS0FBSyxPQUFPLElBQUksVUFBVSxPQUFPOzs7Ozs7R0FpQnJEIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vbW9kZWwvU2NvcmVjYXJkVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcclxuaW1wb3J0ICd0ZXN0L2pzL2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvblRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdTY29yZWNhcmQnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IFNjb3JlY2FyZCwgc2NvcmVEYXRhO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX1Njb3JlY2FyZF8sIGNlcnRpZmljYXRpb25UZXN0RGF0YSkgPT4ge1xyXG4gICAgICAgIFNjb3JlY2FyZCA9IF9TY29yZWNhcmRfO1xyXG4gICAgICAgIHNjb3JlRGF0YSA9IGNlcnRpZmljYXRpb25UZXN0RGF0YS5TQ09SRUNBUkQ7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdibG93cyB1cCB3aXRoIG5vIGRhdGEnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgU2NvcmVjYXJkKG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdibG93cyB1cCB3aXRoIG5vIGRhdGEgZm9yIGEgc2NvcmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgc2NvcmVzOiBbIG51bGwsIHNjb3JlRGF0YS5zY29yZXNbMF0gXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbmV3IFNjb3JlY2FyZChkYXRhKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGVja1Njb3JlKHNjb3JlLCBleHBlY3RlZCkge1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcmUuY2F0ZWdvcnlEaXNwbGF5TmFtZSkudG9FcXVhbChleHBlY3RlZC5jYXRlZ29yeURpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3JlLnNjb3JlKS50b0VxdWFsKGV4cGVjdGVkLnNjb3JlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3JlLmNvbXBlbnNhdGVkU2NvcmUpLnRvRXF1YWwoZXhwZWN0ZWQuY29tcGVuc2F0ZWRTY29yZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29yZS5jb21wZW5zYXRlZCkudG9FcXVhbChleHBlY3RlZC5jb21wZW5zYXRlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnc2V0cyBhbGwgcHJvcGVydGllcyBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjYXJkID0gbmV3IFNjb3JlY2FyZChzY29yZURhdGEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2FyZC5jb21wb3NpdGUpLnRvRXF1YWwoc2NvcmVEYXRhLmNvbXBvc2l0ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjYXJkLmNvbXBlbnNhdGVkKS50b0VxdWFsKHNjb3JlRGF0YS5jb21wZW5zYXRlZCk7XHJcbiAgICAgICAgICAgIGNoZWNrU2NvcmUoY2FyZC5zY29yZXNbMF0sIHNjb3JlRGF0YS5zY29yZXNbMF0pO1xyXG4gICAgICAgICAgICBjaGVja1Njb3JlKGNhcmQuc2NvcmVzWzFdLCBzY29yZURhdGEuc2NvcmVzWzFdKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
