System.register(['test/js/TestInitializer', 'common/util/UtilModule'], function (_export) {
    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {

            describe('StringUtil', function () {
                var StringUtil;

                beforeEach(module(utilModule));

                beforeEach(inject(function (_StringUtil_) {
                    StringUtil = _StringUtil_;
                }));

                describe('convertToDashCase', function () {
                    it('converts spaces to dashes', function () {
                        expect(StringUtil.convertToDashCase('bum bum')).toEqual('bum-bum');
                    });

                    it('converts upper case to lower case with a dash', function () {
                        expect(StringUtil.convertToDashCase('helloMister')).toEqual('hello-mister');
                    });

                    it('collapses double dashes to single dash', function () {
                        expect(StringUtil.convertToDashCase('Hello- Mister')).toEqual('hello-mister');
                    });
                });

                describe('convertToUnderscoreCase', function () {
                    it('converts spaces to underscores', function () {
                        expect(StringUtil.convertToUnderscoreCase('bum bum')).toEqual('bum_bum');
                    });

                    it('converts upper case to lower case with a underscore', function () {
                        expect(StringUtil.convertToUnderscoreCase('helloMister')).toEqual('hello_mister');
                    });

                    it('collapses double underscores to single underscores', function () {
                        expect(StringUtil.convertToUnderscoreCase('Hello_ Mister')).toEqual('hello_mister');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL1N0cmluZ1V0aWxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUztJQUExRjs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsY0FBYyxZQUFXO2dCQUM5QixJQUFJOztnQkFFSixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxjQUFjO29CQUNyQyxhQUFhOzs7Z0JBR2pCLFNBQVMscUJBQXFCLFlBQVc7b0JBQ3JDLEdBQUcsNkJBQTZCLFlBQVc7d0JBQ3ZDLE9BQU8sV0FBVyxrQkFBa0IsWUFBWSxRQUFROzs7b0JBRzVELEdBQUcsaURBQWlELFlBQVc7d0JBQzNELE9BQU8sV0FBVyxrQkFBa0IsZ0JBQWdCLFFBQVE7OztvQkFHaEUsR0FBRywwQ0FBMEMsWUFBVzt3QkFDcEQsT0FBTyxXQUFXLGtCQUFrQixrQkFBa0IsUUFBUTs7OztnQkFJdEUsU0FBUywyQkFBMkIsWUFBVztvQkFDM0MsR0FBRyxrQ0FBa0MsWUFBVzt3QkFDNUMsT0FBTyxXQUFXLHdCQUF3QixZQUFZLFFBQVE7OztvQkFHbEUsR0FBRyx1REFBdUQsWUFBVzt3QkFDakUsT0FBTyxXQUFXLHdCQUF3QixnQkFBZ0IsUUFBUTs7O29CQUd0RSxHQUFHLHNEQUFzRCxZQUFXO3dCQUNoRSxPQUFPLFdBQVcsd0JBQXdCLGtCQUFrQixRQUFROzs7Ozs7R0FXN0UiLCJmaWxlIjoiY29tbW9uL3V0aWwvU3RyaW5nVXRpbFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB1dGlsTW9kdWxlIGZyb20gJ2NvbW1vbi91dGlsL1V0aWxNb2R1bGUnO1xuXG5kZXNjcmliZSgnU3RyaW5nVXRpbCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBTdHJpbmdVdGlsO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodXRpbE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1N0cmluZ1V0aWxfKSB7XG4gICAgICAgIFN0cmluZ1V0aWwgPSBfU3RyaW5nVXRpbF87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2NvbnZlcnRUb0Rhc2hDYXNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdjb252ZXJ0cyBzcGFjZXMgdG8gZGFzaGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoU3RyaW5nVXRpbC5jb252ZXJ0VG9EYXNoQ2FzZSgnYnVtIGJ1bScpKS50b0VxdWFsKCdidW0tYnVtJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjb252ZXJ0cyB1cHBlciBjYXNlIHRvIGxvd2VyIGNhc2Ugd2l0aCBhIGRhc2gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChTdHJpbmdVdGlsLmNvbnZlcnRUb0Rhc2hDYXNlKCdoZWxsb01pc3RlcicpKS50b0VxdWFsKCdoZWxsby1taXN0ZXInKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NvbGxhcHNlcyBkb3VibGUgZGFzaGVzIHRvIHNpbmdsZSBkYXNoJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoU3RyaW5nVXRpbC5jb252ZXJ0VG9EYXNoQ2FzZSgnSGVsbG8tIE1pc3RlcicpKS50b0VxdWFsKCdoZWxsby1taXN0ZXInKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY29udmVydFRvVW5kZXJzY29yZUNhc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2NvbnZlcnRzIHNwYWNlcyB0byB1bmRlcnNjb3JlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KFN0cmluZ1V0aWwuY29udmVydFRvVW5kZXJzY29yZUNhc2UoJ2J1bSBidW0nKSkudG9FcXVhbCgnYnVtX2J1bScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY29udmVydHMgdXBwZXIgY2FzZSB0byBsb3dlciBjYXNlIHdpdGggYSB1bmRlcnNjb3JlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoU3RyaW5nVXRpbC5jb252ZXJ0VG9VbmRlcnNjb3JlQ2FzZSgnaGVsbG9NaXN0ZXInKSkudG9FcXVhbCgnaGVsbG9fbWlzdGVyJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjb2xsYXBzZXMgZG91YmxlIHVuZGVyc2NvcmVzIHRvIHNpbmdsZSB1bmRlcnNjb3JlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KFN0cmluZ1V0aWwuY29udmVydFRvVW5kZXJzY29yZUNhc2UoJ0hlbGxvXyBNaXN0ZXInKSkudG9FcXVhbCgnaGVsbG9fbWlzdGVyJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
