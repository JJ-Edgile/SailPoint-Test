System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationEntityListState', function () {

                var CertificationEntityListState = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationEntityListState_) {
                    CertificationEntityListState = _CertificationEntityListState_;
                }));

                it('initializes with the correct values', function () {
                    var state = new CertificationEntityListState();
                    expect(state.checkboxMultiSelect).toBeDefined();
                    expect(state.entitySearchTerm).toBeUndefined();
                    expect(state.pagesDisplayed).toEqual(1);
                });

                describe('hasLoadedMorePages()', function () {
                    it('returns false with a single page', function () {
                        var state = new CertificationEntityListState();
                        expect(state.hasLoadedMorePages()).toEqual(false);
                    });

                    it('returns true with multiple pages', function () {
                        var state = new CertificationEntityListState();
                        state.pagesDisplayed = 2;
                        expect(state.hasLoadedMorePages()).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkVudGl0eUxpc3RTdGF0ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTO0lBQ2pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLGdDQUFnQyxZQUFXOztnQkFFaEQsSUFBSSwrQkFBNEI7O2dCQUVoQyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxnQ0FBZ0M7b0JBQ3ZELCtCQUErQjs7O2dCQUduQyxHQUFHLHVDQUF1QyxZQUFNO29CQUM1QyxJQUFJLFFBQVEsSUFBSTtvQkFDaEIsT0FBTyxNQUFNLHFCQUFxQjtvQkFDbEMsT0FBTyxNQUFNLGtCQUFrQjtvQkFDL0IsT0FBTyxNQUFNLGdCQUFnQixRQUFROzs7Z0JBR3pDLFNBQVMsd0JBQXdCLFlBQU07b0JBQ25DLEdBQUcsb0NBQW9DLFlBQU07d0JBQ3pDLElBQUksUUFBUSxJQUFJO3dCQUNoQixPQUFPLE1BQU0sc0JBQXNCLFFBQVE7OztvQkFHL0MsR0FBRyxvQ0FBb0MsWUFBTTt3QkFDekMsSUFBSSxRQUFRLElBQUk7d0JBQ2hCLE1BQU0saUJBQWlCO3dCQUN2QixPQUFPLE1BQU0sc0JBQXNCLFFBQVE7Ozs7OztHQWFwRCIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL21vZGVsL0NlcnRpZmljYXRpb25FbnRpdHlMaXN0U3RhdGVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25FbnRpdHlMaXN0U3RhdGUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgQ2VydGlmaWNhdGlvbkVudGl0eUxpc3RTdGF0ZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0NlcnRpZmljYXRpb25FbnRpdHlMaXN0U3RhdGVfKSB7XHJcbiAgICAgICAgQ2VydGlmaWNhdGlvbkVudGl0eUxpc3RTdGF0ZSA9IF9DZXJ0aWZpY2F0aW9uRW50aXR5TGlzdFN0YXRlXztcclxuICAgIH0pKTtcclxuXHJcbiAgICBpdCgnaW5pdGlhbGl6ZXMgd2l0aCB0aGUgY29ycmVjdCB2YWx1ZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gbmV3IENlcnRpZmljYXRpb25FbnRpdHlMaXN0U3RhdGUoKTtcclxuICAgICAgICBleHBlY3Qoc3RhdGUuY2hlY2tib3hNdWx0aVNlbGVjdCkudG9CZURlZmluZWQoKTtcclxuICAgICAgICBleHBlY3Qoc3RhdGUuZW50aXR5U2VhcmNoVGVybSkudG9CZVVuZGVmaW5lZCgpO1xyXG4gICAgICAgIGV4cGVjdChzdGF0ZS5wYWdlc0Rpc3BsYXllZCkudG9FcXVhbCgxKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdoYXNMb2FkZWRNb3JlUGFnZXMoKScsICgpID0+IHtcclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSB3aXRoIGEgc2luZ2xlIHBhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IG5ldyBDZXJ0aWZpY2F0aW9uRW50aXR5TGlzdFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5oYXNMb2FkZWRNb3JlUGFnZXMoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2l0aCBtdWx0aXBsZSBwYWdlcycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gbmV3IENlcnRpZmljYXRpb25FbnRpdHlMaXN0U3RhdGUoKTtcclxuICAgICAgICAgICAgc3RhdGUucGFnZXNEaXNwbGF5ZWQgPSAyO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUuaGFzTG9hZGVkTW9yZVBhZ2VzKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
