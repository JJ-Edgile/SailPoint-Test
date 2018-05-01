System.register(['angular', 'shared/util'], function (_export) {
    'use strict';

    var angular;
    return {
        setters: [function (_angular) {
            angular = _angular['default'];
        }, function (_sharedUtil) {}],
        execute: function () {

            describe('Common Util Functions', function () {
                describe('namespace', function () {
                    /* global testns */
                    afterEach(function () {
                        if (window['testns']) {
                            window['testns'] = undefined;
                        }
                    });
                    //check base object
                    it('should add SailPoint to the global scope', function () {
                        expect(SailPoint).toBeDefined();
                    });
                    //check namespace function exists
                    it('should add namespace function to SailPoint scope', function () {
                        expect(SailPoint.namespace).toBeDefined();
                    });
                    //check namespace shortcut function exists
                    it('should add namespace function to SailPoint scope', function () {
                        expect(SailPoint.ns).toBeDefined();
                    });
                    it('should create a global name space', function () {
                        SailPoint.ns('testns');
                        expect(testns).toBeDefined();
                    });
                    it('should create a nested name space', function () {
                        SailPoint.ns('testns.nested.name.space');
                        expect(testns.nested.name.space).toBeDefined();
                    });
                    it('should not overwrite existing namespaces', function () {
                        SailPoint.ns('testns');
                        testns.value = 'test';
                        SailPoint.ns('testns.somethingelse');
                        expect(testns).toBeDefined();
                        expect(testns.value).toEqual('test');
                        expect(testns.somethingelse).toBeDefined();
                    });
                });

                describe('extend', function () {
                    var ChildCtor = function () {
                        this.childProp = 'yo dawg!';
                    },
                        ParentCtor = function () {
                        this.parentProp = 'i hear you like inheritance';
                    },
                        CHILD_ONLY = 'childOnly',
                        CHILD_OVERRIDDEN = 'childOverridden',
                        CHILD_EXTENDED = 'childExtended',
                        PARENT_ONLY = 'parentOnly',
                        PARENT_OVERRIDDEN = 'parentOverridden',
                        PARENT_EXTENDED = 'parentExtended',
                        child,
                        spy;

                    beforeEach(function () {
                        // Setup a spy that will get called when any function gets called.
                        // This will be used to trace the call history.
                        spy = jasmine.createSpy();

                        // Setup the parent functions.
                        ParentCtor.prototype.parentOnlyFunction = function () {
                            spy(PARENT_ONLY);
                        };

                        ParentCtor.prototype.childOverriddenFunction = function () {
                            spy(PARENT_OVERRIDDEN);
                        };

                        ParentCtor.prototype.childExtendedFunction = function () {
                            spy(PARENT_EXTENDED);
                        };

                        // Setup the inheritance.
                        SailPoint.extend(ChildCtor, ParentCtor);

                        // Setup the child functions.
                        ChildCtor.prototype.childOnlyFunction = function () {
                            spy(CHILD_ONLY);
                        };

                        ChildCtor.prototype.childOverriddenFunction = function () {
                            spy(CHILD_OVERRIDDEN);
                        };

                        ChildCtor.prototype.childExtendedFunction = function () {
                            ChildCtor._super.prototype.childExtendedFunction.apply(this, arguments);
                            spy(CHILD_EXTENDED);
                        };

                        // Create a child to test with.
                        child = new ChildCtor();
                    });

                    /**
                     * Check that the given calls were made to the spy.
                     *
                     * @param {String/Array} expectedCalls  The expected call or calls to be
                     *     made to the spy.  If a single call is expected this can be a string.
                     */
                    function checkCalls(expectedCalls) {
                        var calls = spy.calls.all(),
                            i;

                        if (!angular.isArray(expectedCalls)) {
                            expectedCalls = [expectedCalls];
                        }

                        // Make sure that the expected number of calls were made.
                        expect(calls.length).toEqual(expectedCalls.length);

                        // Check that each call was made.
                        for (i = 0; i < expectedCalls.length; i++) {
                            expect(calls[i].args[0]).toEqual(expectedCalls[i]);
                        }
                    }

                    it('makes instanceof work for child class', function () {
                        expect(child instanceof ChildCtor).toEqual(true);
                    });

                    it('sets up the super property', function () {
                        expect(ChildCtor._super).toBeDefined();
                    });

                    it('calls a parent-only function', function () {
                        child.parentOnlyFunction();
                        checkCalls(PARENT_ONLY);
                    });

                    it('calls a child-only function', function () {
                        child.childOnlyFunction();
                        checkCalls(CHILD_ONLY);
                    });

                    it('calls an overridden child function', function () {
                        child.childOverriddenFunction();
                        checkCalls(CHILD_OVERRIDDEN);
                    });

                    it('calls an extended child and parent function', function () {
                        child.childExtendedFunction();
                        checkCalls([PARENT_EXTENDED, CHILD_EXTENDED]);
                    });
                });

                describe('ready', function () {
                    var onReadyFunc, oldJQuery, jqueryReadySpy;

                    // Create an onReady spy for every test.
                    beforeEach(function () {
                        onReadyFunc = 'test';
                    });

                    // If we mocked out jQuery, revert it back.
                    afterEach(function () {
                        /* global $: true */
                        if (oldJQuery) {
                            $ = oldJQuery;
                        }
                    });

                    /**
                     * Ensure that Ext is defined with an onReady() function.  ExtJS is not
                     * included in the karma config, so we will create a fake one.
                     */
                    function defineExt() {
                        if (!window.Ext) {
                            window.Ext = {
                                onReady: jasmine.createSpy()
                            };
                        }
                    }

                    /**
                     * Undefine the Ext mock that we created.
                     */
                    function undefineExt() {
                        delete window.Ext;
                    }

                    /**
                     * Create a jQuery mock that calls the jqueryReadySpy when $().ready()
                     * is called.
                     */
                    /* global $: true */
                    function createJQueryMock() {
                        var mock;

                        // Create a spy to be called for ready().
                        jqueryReadySpy = jasmine.createSpy();
                        mock = function (el) {
                            return {
                                ready: jqueryReadySpy
                            };
                        };

                        // The jQuery function also needs to have ready() defined so that
                        // the SailPoint.ready() code will try to use it.
                        mock.ready = jasmine.createSpy();

                        // Unassign jQuery from the $ variable and save it to be restored.
                        oldJQuery = $.noConflict();

                        // Use our mock for jQuery.
                        $ = mock;
                    }

                    it('uses Ext if available', function () {
                        /* global Ext: false */
                        defineExt();
                        SailPoint.ready(onReadyFunc);
                        expect(Ext.onReady).toHaveBeenCalled();
                        expect(Ext.onReady.calls.mostRecent().args[0]).toBe(onReadyFunc);
                    });

                    it('uses Ext if both Ext and jQuery are available', function () {
                        /* global Ext: false */
                        expect($).toBeDefined();
                        defineExt();
                        SailPoint.ready(onReadyFunc);
                        expect(Ext.onReady).toHaveBeenCalled();
                        expect(Ext.onReady.calls.mostRecent().args[0]).toBe(onReadyFunc);
                    });

                    it('uses jQuery if available', function () {
                        undefineExt();
                        createJQueryMock();
                        SailPoint.ready(onReadyFunc);
                        expect(jqueryReadySpy).toHaveBeenCalled();
                        expect(jqueryReadySpy.calls.mostRecent().args[0]).toBe(onReadyFunc);
                    });

                    it('throws if Ext and jQuery are not available', function () {
                        oldJQuery = $.noConflict();
                        undefineExt();
                        expect(function () {
                            SailPoint.ready(onReadyFunc);
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC91dGlsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsV0FBVyxnQkFBZ0IsVUFBVSxTQUFTO0lBQzNEOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsVUFBVTtZQUMxQixVQUFVLFNBQVM7V0FDcEIsVUFBVSxhQUFhO1FBQzFCLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx5QkFBeUIsWUFBVztnQkFDekMsU0FBUyxhQUFhLFlBQVc7O29CQUU3QixVQUFVLFlBQVc7d0JBQ2pCLElBQUksT0FBTyxXQUFXOzRCQUNsQixPQUFPLFlBQVk7Ozs7b0JBSTNCLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELE9BQU8sV0FBVzs7O29CQUd0QixHQUFHLG9EQUFvRCxZQUFXO3dCQUM5RCxPQUFPLFVBQVUsV0FBVzs7O29CQUdoQyxHQUFHLG9EQUFvRCxZQUFXO3dCQUM5RCxPQUFPLFVBQVUsSUFBSTs7b0JBRXpCLEdBQUcscUNBQXFDLFlBQVc7d0JBQy9DLFVBQVUsR0FBRzt3QkFDYixPQUFPLFFBQVE7O29CQUVuQixHQUFHLHFDQUFxQyxZQUFXO3dCQUMvQyxVQUFVLEdBQUc7d0JBQ2IsT0FBTyxPQUFPLE9BQU8sS0FBSyxPQUFPOztvQkFFckMsR0FBRyw0Q0FBNEMsWUFBVzt3QkFDdEQsVUFBVSxHQUFHO3dCQUNiLE9BQU8sUUFBUTt3QkFDZixVQUFVLEdBQUc7d0JBQ2IsT0FBTyxRQUFRO3dCQUNmLE9BQU8sT0FBTyxPQUFPLFFBQVE7d0JBQzdCLE9BQU8sT0FBTyxlQUFlOzs7O2dCQUlyQyxTQUFTLFVBQVUsWUFBVztvQkFDMUIsSUFBSSxZQUFZLFlBQVc7d0JBQ25CLEtBQUssWUFBWTs7d0JBRXJCLGFBQWEsWUFBVzt3QkFDcEIsS0FBSyxhQUFhOzt3QkFFdEIsYUFBYTt3QkFDYixtQkFBbUI7d0JBQ25CLGlCQUFpQjt3QkFDakIsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLGtCQUFr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Ozs7Ozs7R0FXOUQiLCJmaWxlIjoic2hhcmVkL3V0aWxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0ICdzaGFyZWQvdXRpbCc7XG5cbmRlc2NyaWJlKCdDb21tb24gVXRpbCBGdW5jdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICBkZXNjcmliZSgnbmFtZXNwYWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qIGdsb2JhbCB0ZXN0bnMgKi9cbiAgICAgICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHdpbmRvd1sndGVzdG5zJ10pIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dbJ3Rlc3RucyddID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy9jaGVjayBiYXNlIG9iamVjdFxuICAgICAgICBpdCgnc2hvdWxkIGFkZCBTYWlsUG9pbnQgdG8gdGhlIGdsb2JhbCBzY29wZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KFNhaWxQb2ludCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vY2hlY2sgbmFtZXNwYWNlIGZ1bmN0aW9uIGV4aXN0c1xuICAgICAgICBpdCgnc2hvdWxkIGFkZCBuYW1lc3BhY2UgZnVuY3Rpb24gdG8gU2FpbFBvaW50IHNjb3BlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoU2FpbFBvaW50Lm5hbWVzcGFjZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vY2hlY2sgbmFtZXNwYWNlIHNob3J0Y3V0IGZ1bmN0aW9uIGV4aXN0c1xuICAgICAgICBpdCgnc2hvdWxkIGFkZCBuYW1lc3BhY2UgZnVuY3Rpb24gdG8gU2FpbFBvaW50IHNjb3BlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoU2FpbFBvaW50Lm5zKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgYSBnbG9iYWwgbmFtZSBzcGFjZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgU2FpbFBvaW50Lm5zKCd0ZXN0bnMnKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0bnMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIG5lc3RlZCBuYW1lIHNwYWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBTYWlsUG9pbnQubnMoJ3Rlc3Rucy5uZXN0ZWQubmFtZS5zcGFjZScpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3Rucy5uZXN0ZWQubmFtZS5zcGFjZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgbm90IG92ZXJ3cml0ZSBleGlzdGluZyBuYW1lc3BhY2VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBTYWlsUG9pbnQubnMoJ3Rlc3RucycpO1xuICAgICAgICAgICAgdGVzdG5zLnZhbHVlID0gJ3Rlc3QnO1xuICAgICAgICAgICAgU2FpbFBvaW50Lm5zKCd0ZXN0bnMuc29tZXRoaW5nZWxzZScpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RucykudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0bnMudmFsdWUpLnRvRXF1YWwoJ3Rlc3QnKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0bnMuc29tZXRoaW5nZWxzZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZXh0ZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBDaGlsZEN0b3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkUHJvcCA9ICd5byBkYXdnISc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUGFyZW50Q3RvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50UHJvcCA9ICdpIGhlYXIgeW91IGxpa2UgaW5oZXJpdGFuY2UnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIENISUxEX09OTFkgPSAnY2hpbGRPbmx5JyxcbiAgICAgICAgICAgIENISUxEX09WRVJSSURERU4gPSAnY2hpbGRPdmVycmlkZGVuJyxcbiAgICAgICAgICAgIENISUxEX0VYVEVOREVEID0gJ2NoaWxkRXh0ZW5kZWQnLFxuICAgICAgICAgICAgUEFSRU5UX09OTFkgPSAncGFyZW50T25seScsXG4gICAgICAgICAgICBQQVJFTlRfT1ZFUlJJRERFTiA9ICdwYXJlbnRPdmVycmlkZGVuJyxcbiAgICAgICAgICAgIFBBUkVOVF9FWFRFTkRFRCA9ICdwYXJlbnRFeHRlbmRlZCcsXG4gICAgICAgICAgICBjaGlsZCwgc3B5O1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBTZXR1cCBhIHNweSB0aGF0IHdpbGwgZ2V0IGNhbGxlZCB3aGVuIGFueSBmdW5jdGlvbiBnZXRzIGNhbGxlZC5cbiAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBiZSB1c2VkIHRvIHRyYWNlIHRoZSBjYWxsIGhpc3RvcnkuXG4gICAgICAgICAgICBzcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuXG5cbiAgICAgICAgICAgIC8vIFNldHVwIHRoZSBwYXJlbnQgZnVuY3Rpb25zLlxuICAgICAgICAgICAgUGFyZW50Q3Rvci5wcm90b3R5cGUucGFyZW50T25seUZ1bmN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc3B5KFBBUkVOVF9PTkxZKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIFBhcmVudEN0b3IucHJvdG90eXBlLmNoaWxkT3ZlcnJpZGRlbkZ1bmN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc3B5KFBBUkVOVF9PVkVSUklEREVOKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIFBhcmVudEN0b3IucHJvdG90eXBlLmNoaWxkRXh0ZW5kZWRGdW5jdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNweShQQVJFTlRfRVhURU5ERUQpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICAvLyBTZXR1cCB0aGUgaW5oZXJpdGFuY2UuXG4gICAgICAgICAgICBTYWlsUG9pbnQuZXh0ZW5kKENoaWxkQ3RvciwgUGFyZW50Q3Rvcik7XG5cblxuICAgICAgICAgICAgLy8gU2V0dXAgdGhlIGNoaWxkIGZ1bmN0aW9ucy5cbiAgICAgICAgICAgIENoaWxkQ3Rvci5wcm90b3R5cGUuY2hpbGRPbmx5RnVuY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzcHkoQ0hJTERfT05MWSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBDaGlsZEN0b3IucHJvdG90eXBlLmNoaWxkT3ZlcnJpZGRlbkZ1bmN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc3B5KENISUxEX09WRVJSSURERU4pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgQ2hpbGRDdG9yLnByb3RvdHlwZS5jaGlsZEV4dGVuZGVkRnVuY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBDaGlsZEN0b3IuX3N1cGVyLnByb3RvdHlwZS5jaGlsZEV4dGVuZGVkRnVuY3Rpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICBzcHkoQ0hJTERfRVhURU5ERUQpO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBjaGlsZCB0byB0ZXN0IHdpdGguXG4gICAgICAgICAgICBjaGlsZCA9IG5ldyBDaGlsZEN0b3IoKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgdGhhdCB0aGUgZ2l2ZW4gY2FsbHMgd2VyZSBtYWRlIHRvIHRoZSBzcHkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nL0FycmF5fSBleHBlY3RlZENhbGxzICBUaGUgZXhwZWN0ZWQgY2FsbCBvciBjYWxscyB0byBiZVxuICAgICAgICAgKiAgICAgbWFkZSB0byB0aGUgc3B5LiAgSWYgYSBzaW5nbGUgY2FsbCBpcyBleHBlY3RlZCB0aGlzIGNhbiBiZSBhIHN0cmluZy5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQ2FsbHMoZXhwZWN0ZWRDYWxscykge1xuICAgICAgICAgICAgdmFyIGNhbGxzID0gc3B5LmNhbGxzLmFsbCgpLFxuICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KGV4cGVjdGVkQ2FsbHMpKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRDYWxscyA9IFsgZXhwZWN0ZWRDYWxscyBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgZXhwZWN0ZWQgbnVtYmVyIG9mIGNhbGxzIHdlcmUgbWFkZS5cbiAgICAgICAgICAgIGV4cGVjdChjYWxscy5sZW5ndGgpLnRvRXF1YWwoZXhwZWN0ZWRDYWxscy5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayB0aGF0IGVhY2ggY2FsbCB3YXMgbWFkZS5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBleHBlY3RlZENhbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNhbGxzW2ldLmFyZ3NbMF0pLnRvRXF1YWwoZXhwZWN0ZWRDYWxsc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnbWFrZXMgaW5zdGFuY2VvZiB3b3JrIGZvciBjaGlsZCBjbGFzcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGNoaWxkIGluc3RhbmNlb2YgQ2hpbGRDdG9yKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2V0cyB1cCB0aGUgc3VwZXIgcHJvcGVydHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChDaGlsZEN0b3IuX3N1cGVyKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgYSBwYXJlbnQtb25seSBmdW5jdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2hpbGQucGFyZW50T25seUZ1bmN0aW9uKCk7XG4gICAgICAgICAgICBjaGVja0NhbGxzKFBBUkVOVF9PTkxZKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIGEgY2hpbGQtb25seSBmdW5jdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2hpbGQuY2hpbGRPbmx5RnVuY3Rpb24oKTtcbiAgICAgICAgICAgIGNoZWNrQ2FsbHMoQ0hJTERfT05MWSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYWxscyBhbiBvdmVycmlkZGVuIGNoaWxkIGZ1bmN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjaGlsZC5jaGlsZE92ZXJyaWRkZW5GdW5jdGlvbigpO1xuICAgICAgICAgICAgY2hlY2tDYWxscyhDSElMRF9PVkVSUklEREVOKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIGFuIGV4dGVuZGVkIGNoaWxkIGFuZCBwYXJlbnQgZnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNoaWxkLmNoaWxkRXh0ZW5kZWRGdW5jdGlvbigpO1xuICAgICAgICAgICAgY2hlY2tDYWxscyhbUEFSRU5UX0VYVEVOREVELCBDSElMRF9FWFRFTkRFRF0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZWFkeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb25SZWFkeUZ1bmMsIG9sZEpRdWVyeSwganF1ZXJ5UmVhZHlTcHk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuIG9uUmVhZHkgc3B5IGZvciBldmVyeSB0ZXN0LlxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgb25SZWFkeUZ1bmMgPSAndGVzdCc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIElmIHdlIG1vY2tlZCBvdXQgalF1ZXJ5LCByZXZlcnQgaXQgYmFjay5cbiAgICAgICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLyogZ2xvYmFsICQ6IHRydWUgKi9cbiAgICAgICAgICAgIGlmIChvbGRKUXVlcnkpIHtcbiAgICAgICAgICAgICAgICAkID0gb2xkSlF1ZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRW5zdXJlIHRoYXQgRXh0IGlzIGRlZmluZWQgd2l0aCBhbiBvblJlYWR5KCkgZnVuY3Rpb24uICBFeHRKUyBpcyBub3RcbiAgICAgICAgICogaW5jbHVkZWQgaW4gdGhlIGthcm1hIGNvbmZpZywgc28gd2Ugd2lsbCBjcmVhdGUgYSBmYWtlIG9uZS5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGRlZmluZUV4dCgpIHtcbiAgICAgICAgICAgIGlmICghd2luZG93LkV4dCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5FeHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIG9uUmVhZHk6IGphc21pbmUuY3JlYXRlU3B5KClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVuZGVmaW5lIHRoZSBFeHQgbW9jayB0aGF0IHdlIGNyZWF0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiB1bmRlZmluZUV4dCgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB3aW5kb3cuRXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIGpRdWVyeSBtb2NrIHRoYXQgY2FsbHMgdGhlIGpxdWVyeVJlYWR5U3B5IHdoZW4gJCgpLnJlYWR5KClcbiAgICAgICAgICogaXMgY2FsbGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgLyogZ2xvYmFsICQ6IHRydWUgKi9cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlSlF1ZXJ5TW9jaygpIHtcbiAgICAgICAgICAgIHZhciBtb2NrO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBzcHkgdG8gYmUgY2FsbGVkIGZvciByZWFkeSgpLlxuICAgICAgICAgICAganF1ZXJ5UmVhZHlTcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuICAgICAgICAgICAgbW9jayA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZHk6IGpxdWVyeVJlYWR5U3B5XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIFRoZSBqUXVlcnkgZnVuY3Rpb24gYWxzbyBuZWVkcyB0byBoYXZlIHJlYWR5KCkgZGVmaW5lZCBzbyB0aGF0XG4gICAgICAgICAgICAvLyB0aGUgU2FpbFBvaW50LnJlYWR5KCkgY29kZSB3aWxsIHRyeSB0byB1c2UgaXQuXG4gICAgICAgICAgICBtb2NrLnJlYWR5ID0gamFzbWluZS5jcmVhdGVTcHkoKTtcblxuICAgICAgICAgICAgLy8gVW5hc3NpZ24galF1ZXJ5IGZyb20gdGhlICQgdmFyaWFibGUgYW5kIHNhdmUgaXQgdG8gYmUgcmVzdG9yZWQuXG4gICAgICAgICAgICBvbGRKUXVlcnkgPSAkLm5vQ29uZmxpY3QoKTtcblxuICAgICAgICAgICAgLy8gVXNlIG91ciBtb2NrIGZvciBqUXVlcnkuXG4gICAgICAgICAgICAkID0gbW9jaztcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCd1c2VzIEV4dCBpZiBhdmFpbGFibGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8qIGdsb2JhbCBFeHQ6IGZhbHNlICovXG4gICAgICAgICAgICBkZWZpbmVFeHQoKTtcbiAgICAgICAgICAgIFNhaWxQb2ludC5yZWFkeShvblJlYWR5RnVuYyk7XG4gICAgICAgICAgICBleHBlY3QoRXh0Lm9uUmVhZHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChFeHQub25SZWFkeS5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXSkudG9CZShvblJlYWR5RnVuYyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd1c2VzIEV4dCBpZiBib3RoIEV4dCBhbmQgalF1ZXJ5IGFyZSBhdmFpbGFibGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8qIGdsb2JhbCBFeHQ6IGZhbHNlICovXG4gICAgICAgICAgICBleHBlY3QoJCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGRlZmluZUV4dCgpO1xuICAgICAgICAgICAgU2FpbFBvaW50LnJlYWR5KG9uUmVhZHlGdW5jKTtcbiAgICAgICAgICAgIGV4cGVjdChFeHQub25SZWFkeSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KEV4dC5vblJlYWR5LmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdKS50b0JlKG9uUmVhZHlGdW5jKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3VzZXMgalF1ZXJ5IGlmIGF2YWlsYWJsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdW5kZWZpbmVFeHQoKTtcbiAgICAgICAgICAgIGNyZWF0ZUpRdWVyeU1vY2soKTtcbiAgICAgICAgICAgIFNhaWxQb2ludC5yZWFkeShvblJlYWR5RnVuYyk7XG4gICAgICAgICAgICBleHBlY3QoanF1ZXJ5UmVhZHlTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChqcXVlcnlSZWFkeVNweS5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXSkudG9CZShvblJlYWR5RnVuYyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3MgaWYgRXh0IGFuZCBqUXVlcnkgYXJlIG5vdCBhdmFpbGFibGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG9sZEpRdWVyeSA9ICQubm9Db25mbGljdCgpO1xuICAgICAgICAgICAgdW5kZWZpbmVFeHQoKTtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgU2FpbFBvaW50LnJlYWR5KG9uUmVhZHlGdW5jKTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
