System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the IdentityAttributes model.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('IdentityAttributes', function () {

                var attrsData = undefined,
                    IdentityAttributes = undefined,
                    IdentitySummary = undefined;

                beforeEach(module(modelModule));

                beforeEach(inject(function (_IdentityAttributes_, _IdentitySummary_) {
                    IdentityAttributes = _IdentityAttributes_;
                    IdentitySummary = _IdentitySummary_;
                    attrsData = {
                        attributes: [{
                            attributeName: 'be',
                            label: 'Be',
                            value: 'More!',
                            authorizedToView: false
                        }, {
                            attributeName: 'pacific',
                            label: 'pacific',
                            value: ['om', 'nom', 'nom'],
                            authorizedToView: false
                        }, {
                            attributeName: 'anIdentity',
                            label: 'Some Identity',
                            value: {
                                id: 'someId',
                                name: 'someName',
                                displayName: 'someDisplayName'
                            },
                            authorizedToView: true
                        }]
                    };
                }));

                it('explodes if no data is given', function () {
                    expect(function () {
                        return new IdentityAttributes();
                    }).toThrow();
                });

                it('explodes the given data has no attributes', function () {
                    expect(function () {
                        return new IdentityAttributes({ attributes: null });
                    }).toThrow();
                });

                it('creates attributes with appropriate values', function () {
                    var attrs = new IdentityAttributes(attrsData);
                    expect(attrs.attributes.length).toEqual(3);
                    checkAttribute(attrs, 0);
                });

                function checkAttribute(attrs, idx) {
                    var attr = attrs.attributes[idx];
                    var attrData = attrsData.attributes[idx];
                    expect(attr).toBeDefined();
                    expect(attrData).toBeDefined();

                    expect(attr.attributeName).toEqual(attrData.attributeName);
                    expect(attr.label).toEqual(attrData.label);
                    expect(attr.authorizedToView).toEqual(attrData.authorizedToView);

                    if (attr instanceof IdentitySummary) {
                        expect(attr.id).toEqual(attrData.id);
                        expect(attr.name).toEqual(attrData.name);
                        expect(attr.displayName).toEqual(attrData.displayName);
                    } else {
                        expect(attr.value).toEqual(attrData.value);
                    }
                }

                describe('attribute isIdentity()', function () {
                    it('returns true for an identity reference', function () {
                        var attrs = new IdentityAttributes(attrsData);
                        expect(attrs.attributes[2].isIdentity()).toEqual(true);
                    });

                    it('returns false for a non-identity reference', function () {
                        var attrs = new IdentityAttributes(attrsData);
                        expect(attrs.attributes[1].isIdentity()).toEqual(false);
                    });

                    it('returns false for a null value', function () {
                        var attrs = new IdentityAttributes(attrsData);
                        attrs.attributes[0].value = null;
                        expect(attrs.attributes[0].isIdentity()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9JZGVudGl0eUF0dHJpYnV0ZXNUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7SUFLeEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3Qjs7UUFFMUMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsc0JBQXNCLFlBQU07O2dCQUVqQyxJQUFJLFlBQVM7b0JBQUUscUJBQWtCO29CQUFFLGtCQUFlOztnQkFFbEQsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsc0JBQXNCLG1CQUFzQjtvQkFDM0QscUJBQXFCO29CQUNyQixrQkFBa0I7b0JBQ2xCLFlBQVk7d0JBQ1IsWUFBWSxDQUFDOzRCQUNULGVBQWU7NEJBQ2YsT0FBTzs0QkFDUCxPQUFPOzRCQUNQLGtCQUFrQjsyQkFDbkI7NEJBQ0MsZUFBZTs0QkFDZixPQUFPOzRCQUNQLE9BQU8sQ0FBRSxNQUFNLE9BQU87NEJBQ3RCLGtCQUFrQjsyQkFDbkI7NEJBQ0MsZUFBZTs0QkFDZixPQUFPOzRCQUNQLE9BQU87Z0NBQ0gsSUFBSTtnQ0FDSixNQUFNO2dDQUNOLGFBQWE7OzRCQUVqQixrQkFBa0I7Ozs7O2dCQUs5QixHQUFHLGdDQUFnQyxZQUFNO29CQUNyQyxPQUFPLFlBQUE7d0JBVVMsT0FWSCxJQUFJO3VCQUFzQjs7O2dCQUczQyxHQUFHLDZDQUE2QyxZQUFNO29CQUNsRCxPQUFPLFlBQUE7d0JBWVMsT0FaSCxJQUFJLG1CQUFtQixFQUFFLFlBQVk7dUJBQVM7OztnQkFHL0QsR0FBRyw4Q0FBOEMsWUFBTTtvQkFDbkQsSUFBSSxRQUFRLElBQUksbUJBQW1CO29CQUNuQyxPQUFPLE1BQU0sV0FBVyxRQUFRLFFBQVE7b0JBQ3hDLGVBQWUsT0FBTzs7O2dCQUcxQixTQUFTLGVBQWUsT0FBTyxLQUFLO29CQUNoQyxJQUFJLE9BQU8sTUFBTSxXQUFXO29CQUM1QixJQUFJLFdBQVcsVUFBVSxXQUFXO29CQUNwQyxPQUFPLE1BQU07b0JBQ2IsT0FBTyxVQUFVOztvQkFFakIsT0FBTyxLQUFLLGVBQWUsUUFBUSxTQUFTO29CQUM1QyxPQUFPLEtBQUssT0FBTyxRQUFRLFNBQVM7b0JBQ3BDLE9BQU8sS0FBSyxrQkFBa0IsUUFBUSxTQUFTOztvQkFFL0MsSUFBSSxnQkFBZ0IsaUJBQWlCO3dCQUNqQyxPQUFPLEtBQUssSUFBSSxRQUFRLFNBQVM7d0JBQ2pDLE9BQU8sS0FBSyxNQUFNLFFBQVEsU0FBUzt3QkFDbkMsT0FBTyxLQUFLLGFBQWEsUUFBUSxTQUFTOzJCQUV6Qzt3QkFDRCxPQUFPLEtBQUssT0FBTyxRQUFRLFNBQVM7Ozs7Z0JBSTVDLFNBQVMsMEJBQTBCLFlBQU07b0JBQ3JDLEdBQUcsMENBQTBDLFlBQU07d0JBQy9DLElBQUksUUFBUSxJQUFJLG1CQUFtQjt3QkFDbkMsT0FBTyxNQUFNLFdBQVcsR0FBRyxjQUFjLFFBQVE7OztvQkFHckQsR0FBRyw4Q0FBOEMsWUFBTTt3QkFDbkQsSUFBSSxRQUFRLElBQUksbUJBQW1CO3dCQUNuQyxPQUFPLE1BQU0sV0FBVyxHQUFHLGNBQWMsUUFBUTs7O29CQUdyRCxHQUFHLGtDQUFrQyxZQUFNO3dCQUN2QyxJQUFJLFFBQVEsSUFBSSxtQkFBbUI7d0JBQ25DLE1BQU0sV0FBVyxHQUFHLFFBQVE7d0JBQzVCLE9BQU8sTUFBTSxXQUFXLEdBQUcsY0FBYyxRQUFROzs7Ozs7R0FrQjFEIiwiZmlsZSI6ImNvbW1vbi9tb2RlbC9JZGVudGl0eUF0dHJpYnV0ZXNUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgbW9kZWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGVsL01vZGVsTW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIElkZW50aXR5QXR0cmlidXRlcyBtb2RlbC5cclxuICovXHJcbmRlc2NyaWJlKCdJZGVudGl0eUF0dHJpYnV0ZXMnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IGF0dHJzRGF0YSwgSWRlbnRpdHlBdHRyaWJ1dGVzLCBJZGVudGl0eVN1bW1hcnk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0lkZW50aXR5QXR0cmlidXRlc18sIF9JZGVudGl0eVN1bW1hcnlfKSA9PiB7XHJcbiAgICAgICAgSWRlbnRpdHlBdHRyaWJ1dGVzID0gX0lkZW50aXR5QXR0cmlidXRlc187XHJcbiAgICAgICAgSWRlbnRpdHlTdW1tYXJ5ID0gX0lkZW50aXR5U3VtbWFyeV87XHJcbiAgICAgICAgYXR0cnNEYXRhID0ge1xyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbe1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlTmFtZTogJ2JlJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQmUnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdNb3JlIScsXHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVG9WaWV3OiBmYWxzZVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAncGFjaWZpYycsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3BhY2lmaWMnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFsgJ29tJywgJ25vbScsICdub20nIF0sXHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVG9WaWV3OiBmYWxzZVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAnYW5JZGVudGl0eScsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1NvbWUgSWRlbnRpdHknLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ3NvbWVJZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3NvbWVOYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3NvbWVEaXNwbGF5TmFtZSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemVkVG9WaWV3OiB0cnVlXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBpdCgnZXhwbG9kZXMgaWYgbm8gZGF0YSBpcyBnaXZlbicsICgpID0+IHtcclxuICAgICAgICBleHBlY3QoKCkgPT4gbmV3IElkZW50aXR5QXR0cmlidXRlcygpKS50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZXhwbG9kZXMgdGhlIGdpdmVuIGRhdGEgaGFzIG5vIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgZXhwZWN0KCgpID0+IG5ldyBJZGVudGl0eUF0dHJpYnV0ZXMoeyBhdHRyaWJ1dGVzOiBudWxsIH0pKS50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnY3JlYXRlcyBhdHRyaWJ1dGVzIHdpdGggYXBwcm9wcmlhdGUgdmFsdWVzJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBhdHRycyA9IG5ldyBJZGVudGl0eUF0dHJpYnV0ZXMoYXR0cnNEYXRhKTtcclxuICAgICAgICBleHBlY3QoYXR0cnMuYXR0cmlidXRlcy5sZW5ndGgpLnRvRXF1YWwoMyk7XHJcbiAgICAgICAgY2hlY2tBdHRyaWJ1dGUoYXR0cnMsIDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tBdHRyaWJ1dGUoYXR0cnMsIGlkeCkge1xyXG4gICAgICAgIGxldCBhdHRyID0gYXR0cnMuYXR0cmlidXRlc1tpZHhdO1xyXG4gICAgICAgIGxldCBhdHRyRGF0YSA9IGF0dHJzRGF0YS5hdHRyaWJ1dGVzW2lkeF07XHJcbiAgICAgICAgZXhwZWN0KGF0dHIpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGF0dHJEYXRhKS50b0JlRGVmaW5lZCgpO1xyXG5cclxuICAgICAgICBleHBlY3QoYXR0ci5hdHRyaWJ1dGVOYW1lKS50b0VxdWFsKGF0dHJEYXRhLmF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgICAgIGV4cGVjdChhdHRyLmxhYmVsKS50b0VxdWFsKGF0dHJEYXRhLmxhYmVsKTtcclxuICAgICAgICBleHBlY3QoYXR0ci5hdXRob3JpemVkVG9WaWV3KS50b0VxdWFsKGF0dHJEYXRhLmF1dGhvcml6ZWRUb1ZpZXcpO1xyXG5cclxuICAgICAgICBpZiAoYXR0ciBpbnN0YW5jZW9mIElkZW50aXR5U3VtbWFyeSkge1xyXG4gICAgICAgICAgICBleHBlY3QoYXR0ci5pZCkudG9FcXVhbChhdHRyRGF0YS5pZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhdHRyLm5hbWUpLnRvRXF1YWwoYXR0ckRhdGEubmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhdHRyLmRpc3BsYXlOYW1lKS50b0VxdWFsKGF0dHJEYXRhLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChhdHRyLnZhbHVlKS50b0VxdWFsKGF0dHJEYXRhLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2F0dHJpYnV0ZSBpc0lkZW50aXR5KCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgYW4gaWRlbnRpdHkgcmVmZXJlbmNlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXR0cnMgPSBuZXcgSWRlbnRpdHlBdHRyaWJ1dGVzKGF0dHJzRGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhdHRycy5hdHRyaWJ1dGVzWzJdLmlzSWRlbnRpdHkoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGEgbm9uLWlkZW50aXR5IHJlZmVyZW5jZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGF0dHJzID0gbmV3IElkZW50aXR5QXR0cmlidXRlcyhhdHRyc0RhdGEpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXR0cnMuYXR0cmlidXRlc1sxXS5pc0lkZW50aXR5KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYSBudWxsIHZhbHVlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXR0cnMgPSBuZXcgSWRlbnRpdHlBdHRyaWJ1dGVzKGF0dHJzRGF0YSk7XHJcbiAgICAgICAgICAgIGF0dHJzLmF0dHJpYnV0ZXNbMF0udmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICBleHBlY3QoYXR0cnMuYXR0cmlidXRlc1swXS5pc0lkZW50aXR5KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
