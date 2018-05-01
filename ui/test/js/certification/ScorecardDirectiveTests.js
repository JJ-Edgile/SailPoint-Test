System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('ScorecardDirective', function () {

                var $compile = undefined,
                    $scope = undefined,
                    scorecard = undefined,
                    element = undefined,
                    bandConfig = {
                    colorBands: [{
                        color: 'low',
                        lower: '0',
                        upper: '250'
                    }, {
                        color: 'medium_low',
                        lower: '251',
                        upper: '500'
                    }, {
                        color: 'medium_high',
                        lower: '501',
                        upper: '750'
                    }, {
                        color: 'high',
                        lower: '751',
                        upper: '1000'
                    }]
                };

                beforeEach(module(certificationModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_BAND_CONFIG', bandConfig);
                }));

                beforeEach(inject(function (_$compile_, $rootScope, Scorecard, certificationTestData) {
                    $compile = _$compile_;

                    $scope = $rootScope.$new();
                    scorecard = new Scorecard(certificationTestData.SCORECARD);
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile() {
                    element = angular.element('<sp-scorecard sp-scorecard="card" />');
                    $scope.card = scorecard;
                    $compile(element)($scope);
                    $scope.$digest();
                }

                it('renders the total score in the header', function () {
                    compile();
                    var scoreElt = element.find('p.pull-right');
                    expect(scoreElt.length).toEqual(1);
                    var text = scoreElt.text();
                    expect(text.indexOf(scorecard.composite)).toBeGreaterThan(-1);
                });

                function checkCellValue(rows, rowIdx, colIdx, expected) {
                    expect(rows.length).toBeGreaterThan(rowIdx);
                    var row = angular.element(rows[rowIdx]);
                    var cols = row.find('td');
                    expect(cols.length).toEqual(3);
                    var col = angular.element(cols[colIdx]);
                    expect(col.text().indexOf(expected)).toBeGreaterThan(-1);
                }

                it('renders each score category', function () {
                    compile();
                    var rows = element.find('table > tbody > tr');
                    expect(rows.length).toEqual(2);

                    checkCellValue(rows, 0, 0, scorecard.scores[0].categoryDisplayName);
                    checkCellValue(rows, 0, 1, scorecard.scores[0].score);
                    checkCellValue(rows, 0, 2, scorecard.scores[0].compensatedScore);

                    checkCellValue(rows, 1, 0, scorecard.scores[1].categoryDisplayName);
                    checkCellValue(rows, 1, 1, scorecard.scores[1].score);
                    checkCellValue(rows, 1, 2, scorecard.scores[1].compensatedScore);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vU2NvcmVjYXJkRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7SUFDakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsc0JBQXNCLFlBQU07O2dCQUVqQyxJQUFJLFdBQVE7b0JBQUUsU0FBTTtvQkFBRSxZQUFTO29CQUFFLFVBQU87b0JBQ3BDLGFBQWE7b0JBQ1QsWUFBYSxDQUNUO3dCQUNJLE9BQU87d0JBQ1AsT0FBTzt3QkFDUCxPQUFPO3VCQUVYO3dCQUNJLE9BQU87d0JBQ1AsT0FBTzt3QkFDUCxPQUFPO3VCQUVYO3dCQUNJLE9BQU87d0JBQ1AsT0FBTzt3QkFDUCxPQUFPO3VCQUVYO3dCQUNJLE9BQU87d0JBQ1AsT0FBTzt3QkFDUCxPQUFPOzs7O2dCQUl2QixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsa0JBQWtCOzs7Z0JBR3hDLFdBQVcsT0FBTyxVQUFDLFlBQVksWUFBWSxXQUFXLHVCQUEwQjtvQkFDNUUsV0FBVzs7b0JBRVgsU0FBUyxXQUFXO29CQUNwQixZQUFZLElBQUksVUFBVSxzQkFBc0I7OztnQkFHcEQsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLFVBQVU7b0JBQ2YsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLE9BQU8sT0FBTztvQkFDZCxTQUFTLFNBQVM7b0JBQ2xCLE9BQU87OztnQkFHWCxHQUFHLHlDQUF5QyxZQUFNO29CQUM5QztvQkFDQSxJQUFJLFdBQVcsUUFBUSxLQUFLO29CQUM1QixPQUFPLFNBQVMsUUFBUSxRQUFRO29CQUNoQyxJQUFJLE9BQU8sU0FBUztvQkFDcEIsT0FBTyxLQUFLLFFBQVEsVUFBVSxZQUFZLGdCQUFnQixDQUFDOzs7Z0JBRy9ELFNBQVMsZUFBZSxNQUFNLFFBQVEsUUFBUSxVQUFVO29CQUNwRCxPQUFPLEtBQUssUUFBUSxnQkFBZ0I7b0JBQ3BDLElBQUksTUFBTSxRQUFRLFFBQVEsS0FBSztvQkFDL0IsSUFBSSxPQUFPLElBQUksS0FBSztvQkFDcEIsT0FBTyxLQUFLLFFBQVEsUUFBUTtvQkFDNUIsSUFBSSxNQUFNLFFBQVEsUUFBUSxLQUFLO29CQUMvQixPQUFPLElBQUksT0FBTyxRQUFRLFdBQVcsZ0JBQWdCLENBQUM7OztnQkFHMUQsR0FBRywrQkFBK0IsWUFBTTtvQkFDcEM7b0JBQ0EsSUFBSSxPQUFPLFFBQVEsS0FBSztvQkFDeEIsT0FBTyxLQUFLLFFBQVEsUUFBUTs7b0JBRTVCLGVBQWUsTUFBTSxHQUFHLEdBQUcsVUFBVSxPQUFPLEdBQUc7b0JBQy9DLGVBQWUsTUFBTSxHQUFHLEdBQUcsVUFBVSxPQUFPLEdBQUc7b0JBQy9DLGVBQWUsTUFBTSxHQUFHLEdBQUcsVUFBVSxPQUFPLEdBQUc7O29CQUUvQyxlQUFlLE1BQU0sR0FBRyxHQUFHLFVBQVUsT0FBTyxHQUFHO29CQUMvQyxlQUFlLE1BQU0sR0FBRyxHQUFHLFVBQVUsT0FBTyxHQUFHO29CQUMvQyxlQUFlLE1BQU0sR0FBRyxHQUFHLFVBQVUsT0FBTyxHQUFHOzs7OztHQVdwRCIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL1Njb3JlY2FyZERpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnU2NvcmVjYXJkRGlyZWN0aXZlJywgKCkgPT4ge1xyXG5cclxuICAgIGxldCAkY29tcGlsZSwgJHNjb3BlLCBzY29yZWNhcmQsIGVsZW1lbnQsXHJcbiAgICAgICAgYmFuZENvbmZpZyA9IHtcclxuICAgICAgICAgICAgY29sb3JCYW5kcyA6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2xvdycsXHJcbiAgICAgICAgICAgICAgICAgICAgbG93ZXI6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICB1cHBlcjogJzI1MCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdtZWRpdW1fbG93JyxcclxuICAgICAgICAgICAgICAgICAgICBsb3dlcjogJzI1MScsXHJcbiAgICAgICAgICAgICAgICAgICAgdXBwZXI6ICc1MDAnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnbWVkaXVtX2hpZ2gnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VyOiAnNTAxJyxcclxuICAgICAgICAgICAgICAgICAgICB1cHBlcjogJzc1MCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdoaWdoJyxcclxuICAgICAgICAgICAgICAgICAgICBsb3dlcjogJzc1MScsXHJcbiAgICAgICAgICAgICAgICAgICAgdXBwZXI6ICcxMDAwJ1xyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICB9O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xyXG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9CQU5EX0NPTkZJRycsIGJhbmRDb25maWcpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGNvbXBpbGVfLCAkcm9vdFNjb3BlLCBTY29yZWNhcmQsIGNlcnRpZmljYXRpb25UZXN0RGF0YSkgPT4ge1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuXHJcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcmVjYXJkID0gbmV3IFNjb3JlY2FyZChjZXJ0aWZpY2F0aW9uVGVzdERhdGEuU0NPUkVDQVJEKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcGlsZSgpIHtcclxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KCc8c3Atc2NvcmVjYXJkIHNwLXNjb3JlY2FyZD1cImNhcmRcIiAvPicpO1xyXG4gICAgICAgICRzY29wZS5jYXJkID0gc2NvcmVjYXJkO1xyXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBpdCgncmVuZGVycyB0aGUgdG90YWwgc2NvcmUgaW4gdGhlIGhlYWRlcicsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgbGV0IHNjb3JlRWx0ID0gZWxlbWVudC5maW5kKCdwLnB1bGwtcmlnaHQnKTtcclxuICAgICAgICBleHBlY3Qoc2NvcmVFbHQubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIGxldCB0ZXh0ID0gc2NvcmVFbHQudGV4dCgpO1xyXG4gICAgICAgIGV4cGVjdCh0ZXh0LmluZGV4T2Yoc2NvcmVjYXJkLmNvbXBvc2l0ZSkpLnRvQmVHcmVhdGVyVGhhbigtMSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0NlbGxWYWx1ZShyb3dzLCByb3dJZHgsIGNvbElkeCwgZXhwZWN0ZWQpIHtcclxuICAgICAgICBleHBlY3Qocm93cy5sZW5ndGgpLnRvQmVHcmVhdGVyVGhhbihyb3dJZHgpO1xyXG4gICAgICAgIGxldCByb3cgPSBhbmd1bGFyLmVsZW1lbnQocm93c1tyb3dJZHhdKTtcclxuICAgICAgICBsZXQgY29scyA9IHJvdy5maW5kKCd0ZCcpO1xyXG4gICAgICAgIGV4cGVjdChjb2xzLmxlbmd0aCkudG9FcXVhbCgzKTtcclxuICAgICAgICBsZXQgY29sID0gYW5ndWxhci5lbGVtZW50KGNvbHNbY29sSWR4XSk7XHJcbiAgICAgICAgZXhwZWN0KGNvbC50ZXh0KCkuaW5kZXhPZihleHBlY3RlZCkpLnRvQmVHcmVhdGVyVGhhbigtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ3JlbmRlcnMgZWFjaCBzY29yZSBjYXRlZ29yeScsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgbGV0IHJvd3MgPSBlbGVtZW50LmZpbmQoJ3RhYmxlID4gdGJvZHkgPiB0cicpO1xyXG4gICAgICAgIGV4cGVjdChyb3dzLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuXHJcbiAgICAgICAgY2hlY2tDZWxsVmFsdWUocm93cywgMCwgMCwgc2NvcmVjYXJkLnNjb3Jlc1swXS5jYXRlZ29yeURpc3BsYXlOYW1lKTtcclxuICAgICAgICBjaGVja0NlbGxWYWx1ZShyb3dzLCAwLCAxLCBzY29yZWNhcmQuc2NvcmVzWzBdLnNjb3JlKTtcclxuICAgICAgICBjaGVja0NlbGxWYWx1ZShyb3dzLCAwLCAyLCBzY29yZWNhcmQuc2NvcmVzWzBdLmNvbXBlbnNhdGVkU2NvcmUpO1xyXG5cclxuICAgICAgICBjaGVja0NlbGxWYWx1ZShyb3dzLCAxLCAwLCBzY29yZWNhcmQuc2NvcmVzWzFdLmNhdGVnb3J5RGlzcGxheU5hbWUpO1xyXG4gICAgICAgIGNoZWNrQ2VsbFZhbHVlKHJvd3MsIDEsIDEsIHNjb3JlY2FyZC5zY29yZXNbMV0uc2NvcmUpO1xyXG4gICAgICAgIGNoZWNrQ2VsbFZhbHVlKHJvd3MsIDEsIDIsIHNjb3JlY2FyZC5zY29yZXNbMV0uY29tcGVuc2F0ZWRTY29yZSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
