System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the ForwardingInfo model.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('ForwardingInfo', function () {

                var ForwardingInfo = undefined;

                beforeEach(module(modelModule));

                beforeEach(inject(function (_ForwardingInfo_) {
                    ForwardingInfo = _ForwardingInfo_;
                }));

                describe('isValid', function () {
                    it('should return true if is clear', function () {
                        var forwardingInfo = new ForwardingInfo({});
                        expect(forwardingInfo.isValid()).toBeTruthy();
                    });

                    it('should return true if forwarding user is set', function () {
                        var forwardingInfo = new ForwardingInfo({
                            forwardUser: {
                                id: '123',
                                name: 'forward guy'
                            }
                        });
                        expect(forwardingInfo.isValid()).toBeTruthy();
                    });

                    it('should return false start date is set and not forwarding user', function () {
                        var forwardingInfo = new ForwardingInfo({
                            startDate: new Date()
                        });
                        expect(forwardingInfo.isValid()).toBeFalsy();
                    });

                    it('should return true if forwarding user and end date are set', function () {
                        var forwardingInfo = new ForwardingInfo({
                            forwardUser: {
                                id: '123',
                                name: 'forward guy'
                            },
                            endDate: new Date()
                        });
                        expect(forwardingInfo.isValid()).toBeTruthy();
                    });
                });

                describe('isClear', function () {
                    it('should return true if no info is clear', function () {
                        var forwardingInfo = new ForwardingInfo({});
                        expect(forwardingInfo.isClear()).toBeTruthy();
                    });

                    it('should return false if forwarding user', function () {
                        var forwardingInfo = new ForwardingInfo({
                            forwardUser: {
                                id: '123',
                                name: 'forward guy'
                            }
                        });
                        expect(forwardingInfo.isClear()).toBeFalsy();
                    });

                    it('should return false if start date', function () {
                        var forwardingInfo = new ForwardingInfo({
                            startDate: new Date()
                        });
                        expect(forwardingInfo.isClear()).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9Gb3J3YXJkaW5nSW5mb1Rlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw2QkFBNkIsVUFBVSxTQUFTOzs7OztJQUt4Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGNBQWMsd0JBQXdCOztRQUUxQyxTQUFTLFlBQVk7WUFON0IsU0FBUyxrQkFBa0IsWUFBVzs7Z0JBRWxDLElBQUksaUJBQWM7O2dCQUVsQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxrQkFBa0I7b0JBQ3pDLGlCQUFpQjs7O2dCQUdyQixTQUFTLFdBQVcsWUFBVztvQkFDM0IsR0FBRyxrQ0FBa0MsWUFBVzt3QkFDNUMsSUFBSSxpQkFBaUIsSUFBSSxlQUFlO3dCQUN4QyxPQUFPLGVBQWUsV0FBVzs7O29CQUdyQyxHQUFHLGdEQUFnRCxZQUFXO3dCQUMxRCxJQUFJLGlCQUFpQixJQUFJLGVBQWU7NEJBQ3BDLGFBQWE7Z0NBQ1QsSUFBSTtnQ0FDSixNQUFNOzs7d0JBR2QsT0FBTyxlQUFlLFdBQVc7OztvQkFHckMsR0FBRyxpRUFBaUUsWUFBVzt3QkFDM0UsSUFBSSxpQkFBaUIsSUFBSSxlQUFlOzRCQUNwQyxXQUFXLElBQUk7O3dCQUVuQixPQUFPLGVBQWUsV0FBVzs7O29CQUdyQyxHQUFHLDhEQUE4RCxZQUFXO3dCQUN4RSxJQUFJLGlCQUFpQixJQUFJLGVBQWU7NEJBQ3BDLGFBQWE7Z0NBQ1QsSUFBSTtnQ0FDSixNQUFNOzs0QkFFVixTQUFTLElBQUk7O3dCQUVqQixPQUFPLGVBQWUsV0FBVzs7OztnQkFJekMsU0FBUyxXQUFXLFlBQVc7b0JBQzNCLEdBQUcsMENBQTBDLFlBQVc7d0JBQ3BELElBQUksaUJBQWlCLElBQUksZUFBZTt3QkFDeEMsT0FBTyxlQUFlLFdBQVc7OztvQkFHckMsR0FBRywwQ0FBMEMsWUFBVzt3QkFDcEQsSUFBSSxpQkFBaUIsSUFBSSxlQUFlOzRCQUNwQyxhQUFhO2dDQUNULElBQUk7Z0NBQ0osTUFBTTs7O3dCQUdkLE9BQU8sZUFBZSxXQUFXOzs7b0JBR3JDLEdBQUcscUNBQXFDLFlBQVc7d0JBQy9DLElBQUksaUJBQWlCLElBQUksZUFBZTs0QkFDcEMsV0FBVyxJQUFJOzt3QkFFbkIsT0FBTyxlQUFlLFdBQVc7Ozs7OztHQWExQyIsImZpbGUiOiJjb21tb24vbW9kZWwvRm9yd2FyZGluZ0luZm9UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG1vZGVsTW9kdWxlIGZyb20gJ2NvbW1vbi9tb2RlbC9Nb2RlbE1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBGb3J3YXJkaW5nSW5mbyBtb2RlbC5cbiAqL1xuZGVzY3JpYmUoJ0ZvcndhcmRpbmdJbmZvJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgRm9yd2FyZGluZ0luZm87XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtb2RlbE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0ZvcndhcmRpbmdJbmZvXykge1xuICAgICAgICBGb3J3YXJkaW5nSW5mbyA9IF9Gb3J3YXJkaW5nSW5mb187XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2lzVmFsaWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBpcyBjbGVhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZvcndhcmRpbmdJbmZvID0gbmV3IEZvcndhcmRpbmdJbmZvKHt9KTtcbiAgICAgICAgICAgIGV4cGVjdChmb3J3YXJkaW5nSW5mby5pc1ZhbGlkKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBmb3J3YXJkaW5nIHVzZXIgaXMgc2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZm9yd2FyZGluZ0luZm8gPSBuZXcgRm9yd2FyZGluZ0luZm8oe1xuICAgICAgICAgICAgICAgIGZvcndhcmRVc2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2ZvcndhcmQgZ3V5J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGZvcndhcmRpbmdJbmZvLmlzVmFsaWQoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBzdGFydCBkYXRlIGlzIHNldCBhbmQgbm90IGZvcndhcmRpbmcgdXNlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZvcndhcmRpbmdJbmZvID0gbmV3IEZvcndhcmRpbmdJbmZvKHtcbiAgICAgICAgICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGZvcndhcmRpbmdJbmZvLmlzVmFsaWQoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgZm9yd2FyZGluZyB1c2VyIGFuZCBlbmQgZGF0ZSBhcmUgc2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZm9yd2FyZGluZ0luZm8gPSBuZXcgRm9yd2FyZGluZ0luZm8oe1xuICAgICAgICAgICAgICAgIGZvcndhcmRVc2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2ZvcndhcmQgZ3V5J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogbmV3IERhdGUoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QoZm9yd2FyZGluZ0luZm8uaXNWYWxpZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzQ2xlYXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBubyBpbmZvIGlzIGNsZWFyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZm9yd2FyZGluZ0luZm8gPSBuZXcgRm9yd2FyZGluZ0luZm8oe30pO1xuICAgICAgICAgICAgZXhwZWN0KGZvcndhcmRpbmdJbmZvLmlzQ2xlYXIoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBmb3J3YXJkaW5nIHVzZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmb3J3YXJkaW5nSW5mbyA9IG5ldyBGb3J3YXJkaW5nSW5mbyh7XG4gICAgICAgICAgICAgICAgZm9yd2FyZFVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcxMjMnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZm9yd2FyZCBndXknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QoZm9yd2FyZGluZ0luZm8uaXNDbGVhcigpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgc3RhcnQgZGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZvcndhcmRpbmdJbmZvID0gbmV3IEZvcndhcmRpbmdJbmZvKHtcbiAgICAgICAgICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGZvcndhcmRpbmdJbmZvLmlzQ2xlYXIoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
