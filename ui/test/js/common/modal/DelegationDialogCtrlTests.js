System.register(['test/js/TestInitializer', 'common/modal/ModalModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var modalModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModalModalModule) {
            modalModule = _commonModalModalModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('DelegationDialogCtrl', function () {
                var ctrl = undefined,
                    $controller = undefined,
                    $scope = undefined,
                    $q = undefined,
                    description = 'Please certify these users',
                    comments = 'comments 1',
                    recipient = 'recipient 1',
                    helpText = 'These changes will be immediate',
                    readOnly = false;

                beforeEach(module(modalModule));

                beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
                    $controller = _$controller_;
                    $scope = _$rootScope_;
                    $q = _$q_;
                }));

                function makeController(description, helpText, comments, recipient, readOnly, item) {
                    return $controller('DelegationDialogCtrl', {
                        description: description,
                        $q: $q,
                        helpText: helpText,
                        comments: comments,
                        recipient: recipient,
                        readOnly: readOnly,
                        item: item
                    });
                }

                describe('save()', function () {
                    it('delegation dialog resolves with comments', function () {
                        var promise = undefined;

                        ctrl = makeController(description, helpText, comments, recipient, readOnly, null);
                        promise = ctrl.save();
                        promise.then(function (result) {
                            expect(result).toBeDefined();
                            expect(result.comments).toEqual(comments);
                            expect(result.recipient).toEqual(recipient);
                            expect(result.description).toEqual(description);
                        });
                        $scope.$apply();
                    });
                });

                it('getSuggestLookupId returns correct suggest id', function () {
                    var item = {
                        id: '1234'
                    };

                    ctrl = makeController(description, helpText, comments, recipient, readOnly, item);

                    var suggestLookupId = ctrl.getSuggestLookupId();

                    expect(suggestLookupId).toBe('DelegationRecipient');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RhbC9EZWxlZ2F0aW9uRGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0QkFBNEIsNENBQTRDLFVBQVUsU0FBUzs7Ozs7SUFLbkk7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3QjtXQUN2QyxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsd0JBQXdCLFlBQU07Z0JBQ25DLElBQUksT0FBSTtvQkFBRSxjQUFXO29CQUFFLFNBQU07b0JBQUUsS0FBRTtvQkFDN0IsY0FBYztvQkFDZCxXQUFXO29CQUNYLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxXQUFXOztnQkFFZixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxlQUFlLGNBQWMsTUFBUztvQkFDckQsY0FBYztvQkFDZCxTQUFTO29CQUNULEtBQUs7OztnQkFHVCxTQUFTLGVBQWUsYUFBYSxVQUFVLFVBQVUsV0FBVyxVQUFVLE1BQU07b0JBQ2hGLE9BQU8sWUFBWSx3QkFBd0I7d0JBQ3ZDLGFBQWE7d0JBQ2IsSUFBSTt3QkFDSixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsV0FBVzt3QkFDWCxVQUFVO3dCQUNWLE1BQU07Ozs7Z0JBSWQsU0FBUyxVQUFVLFlBQU07b0JBQ3JCLEdBQUcsNENBQTRDLFlBQU07d0JBQ2pELElBQUksVUFBTzs7d0JBRVgsT0FBTyxlQUFlLGFBQWEsVUFBVSxVQUFVLFdBQVcsVUFBVTt3QkFDNUUsVUFBVSxLQUFLO3dCQUNmLFFBQVEsS0FBSyxVQUFTLFFBQVE7NEJBQzFCLE9BQU8sUUFBUTs0QkFDZixPQUFPLE9BQU8sVUFBVSxRQUFROzRCQUNoQyxPQUFPLE9BQU8sV0FBVyxRQUFROzRCQUNqQyxPQUFPLE9BQU8sYUFBYSxRQUFROzt3QkFFdkMsT0FBTzs7OztnQkFJZixHQUFHLGlEQUFpRCxZQUFNO29CQUN0RCxJQUFJLE9BQU87d0JBQ1AsSUFBSTs7O29CQUdSLE9BQU8sZUFBZSxhQUFhLFVBQVUsVUFBVSxXQUFXLFVBQVU7O29CQUU1RSxJQUFJLGtCQUFrQixLQUFLOztvQkFFM0IsT0FBTyxpQkFBaUIsS0FBSzs7Ozs7R0FjbEMiLCJmaWxlIjoiY29tbW9uL21vZGFsL0RlbGVnYXRpb25EaWFsb2dDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG1vZGFsTW9kdWxlIGZyb20gJ2NvbW1vbi9tb2RhbC9Nb2RhbE1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XG5cbmRlc2NyaWJlKCdEZWxlZ2F0aW9uRGlhbG9nQ3RybCcsICgpID0+IHtcbiAgICBsZXQgY3RybCwgJGNvbnRyb2xsZXIsICRzY29wZSwgJHEsXG4gICAgICAgIGRlc2NyaXB0aW9uID0gJ1BsZWFzZSBjZXJ0aWZ5IHRoZXNlIHVzZXJzJyxcbiAgICAgICAgY29tbWVudHMgPSAnY29tbWVudHMgMScsXG4gICAgICAgIHJlY2lwaWVudCA9ICdyZWNpcGllbnQgMScsXG4gICAgICAgIGhlbHBUZXh0ID0gJ1RoZXNlIGNoYW5nZXMgd2lsbCBiZSBpbW1lZGlhdGUnLFxuICAgICAgICByZWFkT25seSA9IGZhbHNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kYWxNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sIF8kcV8pID0+IHtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRxID0gXyRxXztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBtYWtlQ29udHJvbGxlcihkZXNjcmlwdGlvbiwgaGVscFRleHQsIGNvbW1lbnRzLCByZWNpcGllbnQsIHJlYWRPbmx5LCBpdGVtKSB7XG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignRGVsZWdhdGlvbkRpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAkcTogJHEsXG4gICAgICAgICAgICBoZWxwVGV4dDogaGVscFRleHQsXG4gICAgICAgICAgICBjb21tZW50czogY29tbWVudHMsXG4gICAgICAgICAgICByZWNpcGllbnQ6IHJlY2lwaWVudCxcbiAgICAgICAgICAgIHJlYWRPbmx5OiByZWFkT25seSxcbiAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ3NhdmUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2RlbGVnYXRpb24gZGlhbG9nIHJlc29sdmVzIHdpdGggY29tbWVudHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvbWlzZTtcblxuICAgICAgICAgICAgY3RybCA9IG1ha2VDb250cm9sbGVyKGRlc2NyaXB0aW9uLCBoZWxwVGV4dCwgY29tbWVudHMsIHJlY2lwaWVudCwgcmVhZE9ubHksIG51bGwpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGN0cmwuc2F2ZSgpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5jb21tZW50cykudG9FcXVhbChjb21tZW50cyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5yZWNpcGllbnQpLnRvRXF1YWwocmVjaXBpZW50KTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzdWx0LmRlc2NyaXB0aW9uKS50b0VxdWFsKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdnZXRTdWdnZXN0TG9va3VwSWQgcmV0dXJucyBjb3JyZWN0IHN1Z2dlc3QgaWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBpdGVtID0ge1xuICAgICAgICAgICAgaWQ6ICcxMjM0J1xuICAgICAgICB9O1xuXG4gICAgICAgIGN0cmwgPSBtYWtlQ29udHJvbGxlcihkZXNjcmlwdGlvbiwgaGVscFRleHQsIGNvbW1lbnRzLCByZWNpcGllbnQsIHJlYWRPbmx5LCBpdGVtKTtcblxuICAgICAgICBsZXQgc3VnZ2VzdExvb2t1cElkID0gY3RybC5nZXRTdWdnZXN0TG9va3VwSWQoKTtcblxuICAgICAgICBleHBlY3Qoc3VnZ2VzdExvb2t1cElkKS50b0JlKCdEZWxlZ2F0aW9uUmVjaXBpZW50Jyk7XG4gICAgfSk7XG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
