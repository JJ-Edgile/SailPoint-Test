System.register(['test/js/TestInitializer', 'common/managedattribute/ManagedAttributeModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var managedAttributeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonManagedattributeManagedAttributeModule) {
            managedAttributeModule = _commonManagedattributeManagedAttributeModule['default'];
        }],
        execute: function () {

            describe('ManagedAttributeDetailCtrl', function () {
                var $controller = undefined,
                    managedAttributeService = undefined,
                    managedAttribute = undefined,
                    detailResourceUrl = 'some/url';

                beforeEach(module(managedAttributeModule));

                beforeEach(inject(function (_$controller_, _managedAttributeService_) {
                    $controller = _$controller_;
                    managedAttributeService = _managedAttributeService_;
                    managedAttribute = { application: 'app1', attribute: 'attr1', value: 'val1', hasInheritance: true };
                }));

                function createController(managedAttribute, detailResourceUrl) {
                    return $controller('ManagedAttributeDetailCtrl', {
                        managedAttribute: managedAttribute,
                        detailResourceUrl: detailResourceUrl
                    });
                }

                it('blows up with no managed attribute', function () {
                    expect(function () {
                        return createController(null);
                    }).toThrow();
                });

                it('blows up with no detailResourceUrl', function () {
                    expect(function () {
                        return createController(managedAttribute, null);
                    }).toThrow();
                });

                it('stores the managedAttribute and url', function () {
                    var ctrl = createController(managedAttribute, detailResourceUrl);
                    expect(ctrl.managedAttribute).toEqual(managedAttribute);
                    expect(ctrl.detailResourceUrl).toEqual(detailResourceUrl);
                });

                describe('gets the table config', function () {
                    it('should get the access table config', function () {
                        var colConfigKey = 'uiAccountGroupAccessTableColumns',
                            ctrl = createController(managedAttribute, detailResourceUrl),
                            config = ctrl.getAccessDataTableConfig();
                        expect(config.getColumnConfigKey()).toEqual(colConfigKey);
                    });

                    it('should get the member table config', function () {
                        var colConfigKey = 'uiAccountGroupMemberTableColumns',
                            ctrl = createController(managedAttribute, detailResourceUrl),
                            config = ctrl.getMembersDataTableConfig();
                        expect(config.getColumnConfigKey()).toEqual(colConfigKey);
                    });
                });

                describe('hasAccess', function () {
                    it('should return true if managed attribute has access', function () {
                        var ctrl = createController(managedAttribute, detailResourceUrl);
                        managedAttribute.hasAccess = true;
                        expect(ctrl.hasAccess()).toBeTruthy();
                    });

                    it('should return false if managed attribute does not have access', function () {
                        var ctrl = createController(managedAttribute, detailResourceUrl);
                        managedAttribute.hasAccess = false;
                        expect(ctrl.hasAccess()).toBeFalsy();
                    });
                });

                describe('hasInheritance()', function () {
                    it('returns the hasInheritance flag from the managedAttribute', function () {
                        var ctrl = createController(managedAttribute, detailResourceUrl);
                        expect(ctrl.hasInheritance()).toEqual(managedAttribute.hasInheritance);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVEZXRhaWxDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG1EQUFtRCxVQUFVLFNBQVM7OztJQUc5Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsK0NBQStDO1lBQ3JHLHlCQUF5Qiw4Q0FBOEM7O1FBRTNFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyw4QkFBOEIsWUFBTTtnQkFDekMsSUFBSSxjQUFXO29CQUFFLDBCQUF1QjtvQkFDcEMsbUJBQWdCO29CQUNoQixvQkFBb0I7O2dCQUV4QixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxlQUFlLDJCQUE4QjtvQkFDNUQsY0FBYztvQkFDZCwwQkFBMEI7b0JBQzFCLG1CQUFtQixFQUFDLGFBQWEsUUFBUSxXQUFXLFNBQVMsT0FBTyxRQUFRLGdCQUFnQjs7O2dCQUdoRyxTQUFTLGlCQUFpQixrQkFBa0IsbUJBQW1CO29CQUMzRCxPQUFPLFlBQVksOEJBQThCO3dCQUM3QyxrQkFBa0I7d0JBQ2xCLG1CQUFtQjs7OztnQkFJM0IsR0FBRyxzQ0FBc0MsWUFBTTtvQkFDM0MsT0FBTyxZQUFBO3dCQVNTLE9BVEgsaUJBQWlCO3VCQUFPOzs7Z0JBR3pDLEdBQUcsc0NBQXNDLFlBQU07b0JBQzNDLE9BQU8sWUFBQTt3QkFXUyxPQVhILGlCQUFpQixrQkFBa0I7dUJBQU87OztnQkFHM0QsR0FBRyx1Q0FBdUMsWUFBTTtvQkFDNUMsSUFBSSxPQUFPLGlCQUFpQixrQkFBa0I7b0JBQzlDLE9BQU8sS0FBSyxrQkFBa0IsUUFBUTtvQkFDdEMsT0FBTyxLQUFLLG1CQUFtQixRQUFROzs7Z0JBRzNDLFNBQVMseUJBQXlCLFlBQVc7b0JBQ3pDLEdBQUcsc0NBQXNDLFlBQVc7d0JBQ2hELElBQUksZUFBZTs0QkFDZixPQUFPLGlCQUFpQixrQkFBa0I7NEJBQzFDLFNBQVMsS0FBSzt3QkFDbEIsT0FBTyxPQUFPLHNCQUFzQixRQUFROzs7b0JBR2hELEdBQUcsc0NBQXNDLFlBQVc7d0JBQ2hELElBQUksZUFBZTs0QkFDZixPQUFPLGlCQUFpQixrQkFBa0I7NEJBQzFDLFNBQVMsS0FBSzt3QkFDbEIsT0FBTyxPQUFPLHNCQUFzQixRQUFROzs7O2dCQUlwRCxTQUFTLGFBQWEsWUFBTTtvQkFDeEIsR0FBRyxzREFBc0QsWUFBTTt3QkFDM0QsSUFBSSxPQUFPLGlCQUFpQixrQkFBa0I7d0JBQzlDLGlCQUFpQixZQUFZO3dCQUM3QixPQUFPLEtBQUssYUFBYTs7O29CQUc3QixHQUFHLGlFQUFpRSxZQUFNO3dCQUN0RSxJQUFJLE9BQU8saUJBQWlCLGtCQUFrQjt3QkFDOUMsaUJBQWlCLFlBQVk7d0JBQzdCLE9BQU8sS0FBSyxhQUFhOzs7O2dCQUlqQyxTQUFTLG9CQUFvQixZQUFNO29CQUMvQixHQUFHLDZEQUE2RCxZQUFNO3dCQUNsRSxJQUFJLE9BQU8saUJBQWlCLGtCQUFrQjt3QkFDOUMsT0FBTyxLQUFLLGtCQUFrQixRQUFRLGlCQUFpQjs7Ozs7O0dBa0JoRSIsImZpbGUiOiJjb21tb24vbWFuYWdlZGF0dHJpYnV0ZS9NYW5hZ2VkQXR0cmlidXRlRGV0YWlsQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG1hbmFnZWRBdHRyaWJ1dGVNb2R1bGUgZnJvbSAnY29tbW9uL21hbmFnZWRhdHRyaWJ1dGUvTWFuYWdlZEF0dHJpYnV0ZU1vZHVsZSc7XG5cbmRlc2NyaWJlKCdNYW5hZ2VkQXR0cmlidXRlRGV0YWlsQ3RybCcsICgpID0+IHtcbiAgICBsZXQgJGNvbnRyb2xsZXIsIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLFxuICAgICAgICBtYW5hZ2VkQXR0cmlidXRlLFxuICAgICAgICBkZXRhaWxSZXNvdXJjZVVybCA9ICdzb21lL3VybCc7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtYW5hZ2VkQXR0cmlidXRlTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb250cm9sbGVyXywgX21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlXykgPT4ge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlID0gX21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlXztcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZSA9IHthcHBsaWNhdGlvbjogJ2FwcDEnLCBhdHRyaWJ1dGU6ICdhdHRyMScsIHZhbHVlOiAndmFsMScsIGhhc0luaGVyaXRhbmNlOiB0cnVlfTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKG1hbmFnZWRBdHRyaWJ1dGUsIGRldGFpbFJlc291cmNlVXJsKSB7XG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignTWFuYWdlZEF0dHJpYnV0ZURldGFpbEN0cmwnLCB7XG4gICAgICAgICAgICBtYW5hZ2VkQXR0cmlidXRlOiBtYW5hZ2VkQXR0cmlidXRlLFxuICAgICAgICAgICAgZGV0YWlsUmVzb3VyY2VVcmw6IGRldGFpbFJlc291cmNlVXJsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGl0KCdibG93cyB1cCB3aXRoIG5vIG1hbmFnZWQgYXR0cmlidXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcihudWxsKSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Jsb3dzIHVwIHdpdGggbm8gZGV0YWlsUmVzb3VyY2VVcmwnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKG1hbmFnZWRBdHRyaWJ1dGUsIG51bGwpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc3RvcmVzIHRoZSBtYW5hZ2VkQXR0cmlidXRlIGFuZCB1cmwnLCAoKSA9PiB7XG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihtYW5hZ2VkQXR0cmlidXRlLCBkZXRhaWxSZXNvdXJjZVVybCk7XG4gICAgICAgIGV4cGVjdChjdHJsLm1hbmFnZWRBdHRyaWJ1dGUpLnRvRXF1YWwobWFuYWdlZEF0dHJpYnV0ZSk7XG4gICAgICAgIGV4cGVjdChjdHJsLmRldGFpbFJlc291cmNlVXJsKS50b0VxdWFsKGRldGFpbFJlc291cmNlVXJsKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRzIHRoZSB0YWJsZSBjb25maWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGFjY2VzcyB0YWJsZSBjb25maWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjb2xDb25maWdLZXkgPSAndWlBY2NvdW50R3JvdXBBY2Nlc3NUYWJsZUNvbHVtbnMnLFxuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKG1hbmFnZWRBdHRyaWJ1dGUsIGRldGFpbFJlc291cmNlVXJsKSxcbiAgICAgICAgICAgICAgICBjb25maWcgPSBjdHJsLmdldEFjY2Vzc0RhdGFUYWJsZUNvbmZpZygpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5nZXRDb2x1bW5Db25maWdLZXkoKSkudG9FcXVhbChjb2xDb25maWdLZXkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGdldCB0aGUgbWVtYmVyIHRhYmxlIGNvbmZpZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGNvbENvbmZpZ0tleSA9ICd1aUFjY291bnRHcm91cE1lbWJlclRhYmxlQ29sdW1ucycsXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIobWFuYWdlZEF0dHJpYnV0ZSwgZGV0YWlsUmVzb3VyY2VVcmwpLFxuICAgICAgICAgICAgICAgIGNvbmZpZyA9IGN0cmwuZ2V0TWVtYmVyc0RhdGFUYWJsZUNvbmZpZygpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5nZXRDb2x1bW5Db25maWdLZXkoKSkudG9FcXVhbChjb2xDb25maWdLZXkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNBY2Nlc3MnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgbWFuYWdlZCBhdHRyaWJ1dGUgaGFzIGFjY2VzcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihtYW5hZ2VkQXR0cmlidXRlLCBkZXRhaWxSZXNvdXJjZVVybCk7XG4gICAgICAgICAgICBtYW5hZ2VkQXR0cmlidXRlLmhhc0FjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNBY2Nlc3MoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBtYW5hZ2VkIGF0dHJpYnV0ZSBkb2VzIG5vdCBoYXZlIGFjY2VzcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihtYW5hZ2VkQXR0cmlidXRlLCBkZXRhaWxSZXNvdXJjZVVybCk7XG4gICAgICAgICAgICBtYW5hZ2VkQXR0cmlidXRlLmhhc0FjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzQWNjZXNzKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNJbmhlcml0YW5jZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0aGUgaGFzSW5oZXJpdGFuY2UgZmxhZyBmcm9tIHRoZSBtYW5hZ2VkQXR0cmlidXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKG1hbmFnZWRBdHRyaWJ1dGUsIGRldGFpbFJlc291cmNlVXJsKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0luaGVyaXRhbmNlKCkpLnRvRXF1YWwobWFuYWdlZEF0dHJpYnV0ZS5oYXNJbmhlcml0YW5jZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
