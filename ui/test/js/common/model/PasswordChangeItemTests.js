System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the PasswordChangeItem model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('PasswordChangeItem', function () {
                var passwordChangeItemData = undefined,
                    PasswordChangeItem = undefined,
                    passwordChangeItem = undefined;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the PasswordChangeItem class and create some data to test with.
                 */
                beforeEach(inject(function (_PasswordChangeItem_, _PasswordLink_) {
                    PasswordChangeItem = _PasswordChangeItem_;
                    passwordChangeItemData = {
                        linkId: '1',
                        password: '1234abcd',
                        link: new _PasswordLink_({
                            id: '1',
                            accountId: 'teddy.brosevelt',
                            applicationName: 'brosDB'
                        }),
                        status: 'pending'
                    };
                    passwordChangeItem = new PasswordChangeItem(passwordChangeItemData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new PasswordChangeItem(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new PasswordChangeItem('hi mom');
                    }).toThrow();
                    expect(function () {
                        new PasswordChangeItem(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns a linkId read from data', function () {
                    expect(passwordChangeItem.getLinkId()).toEqual(passwordChangeItemData.linkId);
                });

                it('returns a password read from data', function () {
                    expect(passwordChangeItem.getPassword()).toEqual(passwordChangeItemData.password);
                });

                it('returns status read from data', function () {
                    expect(passwordChangeItem.getStatus()).toEqual(passwordChangeItemData.status);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9QYXNzd29yZENoYW5nZUl0ZW1UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7SUFLeEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3Qjs7UUFFMUMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsc0JBQXNCLFlBQVc7Z0JBQ3RDLElBQUkseUJBQXNCO29CQUFFLHFCQUFrQjtvQkFBRSxxQkFBa0I7OztnQkFHbEUsV0FBVyxPQUFPOzs7OztnQkFLbEIsV0FBVyxPQUFPLFVBQVMsc0JBQXNCLGdCQUFnQjtvQkFDN0QscUJBQXFCO29CQUNyQix5QkFBeUI7d0JBQ3JCLFFBQVE7d0JBQ1IsVUFBVTt3QkFDVixNQUFNLElBQUksZUFBZTs0QkFDckIsSUFBSTs0QkFDSixXQUFXOzRCQUNYLGlCQUFpQjs7d0JBRXJCLFFBQVE7O29CQUVaLHFCQUFxQixJQUFJLG1CQUFtQjs7O2dCQUdoRCxHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxtQkFBbUI7dUJBQVU7OztnQkFHekQsR0FBRyxpRUFBaUUsWUFBVztvQkFDM0UsT0FBTyxZQUFXO3dCQUFFLElBQUksbUJBQW1CO3VCQUFjO29CQUN6RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxtQkFBbUIsWUFBVzs0QkFBRSxPQUFPOzt1QkFBb0I7OztnQkFHdkYsR0FBRyxtQ0FBbUMsWUFBVztvQkFDN0MsT0FBTyxtQkFBbUIsYUFBYSxRQUFRLHVCQUF1Qjs7O2dCQUcxRSxHQUFHLHFDQUFxQyxZQUFXO29CQUMvQyxPQUFPLG1CQUFtQixlQUFlLFFBQVEsdUJBQXVCOzs7Z0JBRzVFLEdBQUcsaUNBQWlDLFlBQVc7b0JBQzNDLE9BQU8sbUJBQW1CLGFBQWEsUUFBUSx1QkFBdUI7Ozs7O0dBc0IzRSIsImZpbGUiOiJjb21tb24vbW9kZWwvUGFzc3dvcmRDaGFuZ2VJdGVtVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtb2RlbE1vZHVsZSBmcm9tICdjb21tb24vbW9kZWwvTW9kZWxNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUGFzc3dvcmRDaGFuZ2VJdGVtIG1vZGVsIG9iamVjdC5cbiAqL1xuZGVzY3JpYmUoJ1Bhc3N3b3JkQ2hhbmdlSXRlbScsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBwYXNzd29yZENoYW5nZUl0ZW1EYXRhLCBQYXNzd29yZENoYW5nZUl0ZW0sIHBhc3N3b3JkQ2hhbmdlSXRlbTtcblxuICAgIC8vIFVzZSB0aGUgbW9kZWwgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1vZGVsTW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgUGFzc3dvcmRDaGFuZ2VJdGVtIGNsYXNzIGFuZCBjcmVhdGUgc29tZSBkYXRhIHRvIHRlc3Qgd2l0aC5cbiAgICAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfUGFzc3dvcmRDaGFuZ2VJdGVtXywgX1Bhc3N3b3JkTGlua18pIHtcbiAgICAgICAgUGFzc3dvcmRDaGFuZ2VJdGVtID0gX1Bhc3N3b3JkQ2hhbmdlSXRlbV87XG4gICAgICAgIHBhc3N3b3JkQ2hhbmdlSXRlbURhdGEgPSB7XG4gICAgICAgICAgICBsaW5rSWQ6ICcxJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnMTIzNGFiY2QnLFxuICAgICAgICAgICAgbGluazogbmV3IF9QYXNzd29yZExpbmtfKHtcbiAgICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICAgIGFjY291bnRJZDogJ3RlZGR5LmJyb3NldmVsdCcsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnYnJvc0RCJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdGF0dXM6ICdwZW5kaW5nJ1xuICAgICAgICB9O1xuICAgICAgICBwYXNzd29yZENoYW5nZUl0ZW0gPSBuZXcgUGFzc3dvcmRDaGFuZ2VJdGVtKHBhc3N3b3JkQ2hhbmdlSXRlbURhdGEpO1xuICAgIH0pKTtcblxuICAgIGl0KCdyZXF1aXJlcyBub24tbnVsbCBkYXRhIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBQYXNzd29yZENoYW5nZUl0ZW0obnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFBhc3N3b3JkQ2hhbmdlSXRlbSgnaGkgbW9tJyk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgUGFzc3dvcmRDaGFuZ2VJdGVtKGZ1bmN0aW9uKCkgeyByZXR1cm4gJ3doYXQgdGhhPyc7IH0pOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGxpbmtJZCByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocGFzc3dvcmRDaGFuZ2VJdGVtLmdldExpbmtJZCgpKS50b0VxdWFsKHBhc3N3b3JkQ2hhbmdlSXRlbURhdGEubGlua0lkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgcGFzc3dvcmQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHBhc3N3b3JkQ2hhbmdlSXRlbS5nZXRQYXNzd29yZCgpKS50b0VxdWFsKHBhc3N3b3JkQ2hhbmdlSXRlbURhdGEucGFzc3dvcmQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgc3RhdHVzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChwYXNzd29yZENoYW5nZUl0ZW0uZ2V0U3RhdHVzKCkpLnRvRXF1YWwocGFzc3dvcmRDaGFuZ2VJdGVtRGF0YS5zdGF0dXMpO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
