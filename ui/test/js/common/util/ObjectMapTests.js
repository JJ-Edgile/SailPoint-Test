System.register(['test/js/TestInitializer', 'common/util/UtilModule'], function (_export) {
    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {

            describe('ObjectMap', function () {

                var ObjectMap = undefined,
                    map = undefined,
                    noId = undefined,
                    getId = undefined,
                    getUniqueId = undefined,
                    idProperty = undefined,
                    obj1 = undefined,
                    obj2 = undefined;

                beforeEach(module(utilModule));

                beforeEach(inject(function (_ObjectMap_) {
                    ObjectMap = _ObjectMap_;

                    // Create some objects to test with.
                    noId = { iHaveNoId: 'lo siento! pobrecito!' };
                    getId = { getId: jasmine.createSpy('getId').and.returnValue('getId') };
                    getUniqueId = { getUniqueId: jasmine.createSpy('getUniqueId').and.returnValue('uniqueId') };
                    idProperty = { id: 'idProperty' };
                    obj1 = { id: 'obj1' };
                    obj2 = { id: 'obj2' };

                    map = new ObjectMap();
                }));

                it('clone() creates a deep copy of the ObjectMap', function () {
                    var map = new ObjectMap();
                    map.addObject(obj1);

                    // Create a clone.
                    var copy = map.clone();

                    // Make sure that changing the original map doesn't affect the clone.
                    map.clear();
                    expect(copy.size).toEqual(1);
                    expect(copy.containsObject(obj1)).toEqual(true);
                });

                describe('add object', function () {
                    function testObject(obj) {
                        var added = map.addObject(obj);
                        expect(added).toEqual(true);
                        expect(map.size).toEqual(1);
                    }

                    it('supports objects with getId()', function () {
                        testObject(getId);
                        expect(getId.getId).toHaveBeenCalled();
                    });

                    it('supports objects with getUniqueId()', function () {
                        testObject(getUniqueId);
                        expect(getUniqueId.getUniqueId).toHaveBeenCalled();
                    });

                    it('supports objects with an id property', function () {
                        testObject(idProperty);
                    });

                    it('throws if object does not have an id', function () {
                        expect(function () {
                            return map.addObject(noId);
                        }).toThrow();
                    });

                    it('adds an object if it does not already exist', function () {
                        var added = map.addObject(obj1);
                        expect(added).toEqual(true);
                        expect(map.containsObject(obj1)).toEqual(true);
                        expect(map.size).toEqual(1);
                    });

                    it('does not add an object if it already exists and replace is false', function () {
                        var added = map.addObject(obj1);
                        added = map.addObject(obj1, false);
                        expect(added).toEqual(false);
                        expect(map.containsObject(obj1)).toEqual(true);
                        expect(map.size).toEqual(1);
                    });

                    it('replaces an object if replace is true', function () {
                        var added = map.addObject(obj1);
                        var newObj1 = { id: obj1.id, someOtherProp: 'somethingelse' };
                        added = map.addObject(newObj1, true);
                        expect(added).toEqual(true);
                        expect(map.containsObject(newObj1)).toEqual(true);
                        expect(map.size).toEqual(1);
                    });

                    it('adds multiple objects', function () {
                        var added1 = map.addObject(obj1);
                        var added2 = map.addObject(obj2);
                        expect(added1).toEqual(true);
                        expect(added2).toEqual(true);
                        expect(map.containsObject(obj1)).toEqual(true);
                        expect(map.containsObject(obj2)).toEqual(true);
                        expect(map.size).toEqual(2);
                    });
                });

                describe('remove object', function () {
                    it('pukes if object does not have an ID', function () {
                        expect(function () {
                            map.removeObject(noId);
                        }).toThrow();
                    });

                    it('removes an object if the ID matches', function () {
                        map.addObject(obj1);
                        expect(map.size).toEqual(1);
                        var removed = map.removeObject(obj1);
                        expect(removed).toEqual(true);
                        expect(map.size).toEqual(0);
                    });

                    it('does not remove an object if the ID does not match', function () {
                        map.addObject(obj1);
                        expect(map.size).toEqual(1);
                        var removed = map.removeObject(obj2);
                        expect(removed).toEqual(false);
                        expect(map.size).toEqual(1);
                    });
                });

                describe('remove object by id', function () {
                    it('removes an object if the ID matches', function () {
                        map.addObject(obj1);
                        expect(map.size).toEqual(1);
                        var removed = map.removeObjectById(obj1.id);
                        expect(removed).toEqual(true);
                        expect(map.size).toEqual(0);
                    });

                    it('does not remove an object if the ID does not match', function () {
                        map.addObject(obj1);
                        expect(map.size).toEqual(1);
                        var removed = map.removeObjectById('another stupid id ... but not the right one');
                        expect(removed).toEqual(false);
                        expect(map.size).toEqual(1);
                    });
                });

                describe('contains object', function () {
                    it('blows chunks if object does not have an ID', function () {
                        expect(function () {
                            map.containsObject(noId);
                        }).toThrow();
                    });

                    it('returns false if no object is given', function () {
                        expect(map.containsObject(null)).toEqual(false);
                    });

                    it('returns false if no object with the same ID exists', function () {
                        expect(map.containsObject(obj1)).toEqual(false);
                    });

                    it('returns true if an object with the same ID exists', function () {
                        map.addObject(obj1);
                        expect(map.containsObject(obj1)).toEqual(true);
                    });
                });

                describe('containsObjectById()', function () {
                    it('returns false if no ID is given', function () {
                        expect(map.containsObjectById(null)).toEqual(false);
                    });

                    it('returns false if no object with the ID exists', function () {
                        expect(map.containsObjectById('not in the map, yo!')).toEqual(false);
                    });

                    it('returns true if an object with the ID exists', function () {
                        map.addObject(obj1);
                        expect(map.containsObjectById(obj1.id)).toEqual(true);
                    });
                });

                describe('getObject()', function () {
                    it('regurgitates if the object has no id', function () {
                        expect(function () {
                            map.getObject(noId);
                        }).toThrow();
                    });

                    it('returns the object if it matches', function () {
                        map.addObject(obj1);
                        expect(map.getObject(obj1)).toEqual(obj1);
                    });
                });

                describe('getObjectById()', function () {
                    it('returns undefined if no object matches', function () {
                        expect(map.getObjectById(obj1)).toBeUndefined();
                    });

                    it('returns the object if it matches', function () {
                        map.addObject(obj1);
                        expect(map.getObjectById(obj1.id)).toEqual(obj1);
                    });
                });

                describe('getValues()', function () {
                    it('returns an empty array if there are no objects', function () {
                        expect(map.getValues()).toEqual([]);
                    });

                    it('returns all values', function () {
                        map.addObject(obj1);
                        map.addObject(obj2);
                        var vals = map.getValues();
                        expect(vals).toContain(obj1);
                        expect(vals).toContain(obj2);
                    });
                });

                describe('getKeys()', function () {
                    it('returns an empty array if there are no objects', function () {
                        expect(map.getKeys()).toEqual([]);
                    });

                    it('returns all keys', function () {
                        map.addObject(obj1);
                        map.addObject(obj2);
                        var vals = map.getKeys();
                        expect(vals).toContain(obj1.id);
                        expect(vals).toContain(obj2.id);
                    });
                });

                describe('size', function () {
                    it('starts at 0', function () {
                        expect(map.size).toEqual(0);
                    });

                    it('matches the number of objects', function () {
                        map.addObject(obj1);
                        expect(map.size).toEqual(1);
                        map.addObject(obj2);
                        expect(map.size).toEqual(2);
                        map.removeObject(obj1);
                        expect(map.size).toEqual(1);
                    });
                });

                it('clears all objects', function () {
                    map.addObject(obj1);
                    map.addObject(obj2);
                    map.clear();
                    expect(map.size).toEqual(0);
                    expect(map.containsObject(obj1)).toEqual(false);
                    expect(map.containsObject(obj2)).toEqual(false);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL09iamVjdE1hcFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsVUFBVSxTQUFTO0lBQ3RGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7O1FBRXZDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxhQUFhLFlBQU07O2dCQUV4QixJQUFJLFlBQVM7b0JBQUUsTUFBRztvQkFBRSxPQUFJO29CQUFFLFFBQUs7b0JBQUUsY0FBVztvQkFBRSxhQUFVO29CQUFFLE9BQUk7b0JBQUUsT0FBSTs7Z0JBRXBFLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGFBQWdCO29CQUMvQixZQUFZOzs7b0JBR1osT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLFFBQVEsRUFBRSxPQUFPLFFBQVEsVUFBVSxTQUFTLElBQUksWUFBWTtvQkFDNUQsY0FBYyxFQUFFLGFBQWEsUUFBUSxVQUFVLGVBQWUsSUFBSSxZQUFZO29CQUM5RSxhQUFhLEVBQUUsSUFBSTtvQkFDbkIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUFFLElBQUk7O29CQUViLE1BQU0sSUFBSTs7O2dCQUdkLEdBQUcsZ0RBQWdELFlBQU07b0JBQ3JELElBQUksTUFBTSxJQUFJO29CQUNkLElBQUksVUFBVTs7O29CQUdkLElBQUksT0FBTyxJQUFJOzs7b0JBR2YsSUFBSTtvQkFDSixPQUFPLEtBQUssTUFBTSxRQUFRO29CQUMxQixPQUFPLEtBQUssZUFBZSxPQUFPLFFBQVE7OztnQkFHOUMsU0FBUyxjQUFjLFlBQU07b0JBQ3pCLFNBQVMsV0FBVyxLQUFLO3dCQUNyQixJQUFJLFFBQVEsSUFBSSxVQUFVO3dCQUMxQixPQUFPLE9BQU8sUUFBUTt3QkFDdEIsT0FBTyxJQUFJLE1BQU0sUUFBUTs7O29CQUc3QixHQUFHLGlD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O3dCQUN2RCxPQUFPLElBQUksV0FBVyxRQUFROzs7b0JBR2xDLEdBQUcsb0JBQW9CLFlBQU07d0JBQ3pCLElBQUksVUFBVTt3QkFDZCxJQUFJLFVBQVU7d0JBQ2QsSUFBSSxPQUFPLElBQUk7d0JBQ2YsT0FBTyxNQUFNLFVBQVUsS0FBSzt3QkFDNUIsT0FBTyxNQUFNLFVBQVUsS0FBSzs7OztnQkFJcEMsU0FBUyxRQUFRLFlBQU07b0JBQ25CLEdBQUcsZUFBZSxZQUFNO3dCQUNwQixPQUFPLElBQUksTUFBTSxRQUFROzs7b0JBRzdCLEdBQUcsaUNBQWlDLFlBQU07d0JBQ3RDLElBQUksVUFBVTt3QkFDZCxPQUFPLElBQUksTUFBTSxRQUFRO3dCQUN6QixJQUFJLFVBQVU7d0JBQ2QsT0FBTyxJQUFJLE1BQU0sUUFBUTt3QkFDekIsSUFBSSxhQUFhO3dCQUNqQixPQUFPLElBQUksTUFBTSxRQUFROzs7O2dCQUlqQyxHQUFHLHNCQUFzQixZQUFNO29CQUMzQixJQUFJLFVBQVU7b0JBQ2QsSUFBSSxVQUFVO29CQUNkLElBQUk7b0JBQ0osT0FBTyxJQUFJLE1BQU0sUUFBUTtvQkFDekIsT0FBTyxJQUFJLGVBQWUsT0FBTyxRQUFRO29CQUN6QyxPQUFPLElBQUksZUFBZSxPQUFPLFFBQVE7Ozs7O0dBMkI5QyIsImZpbGUiOiJjb21tb24vdXRpbC9PYmplY3RNYXBUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgdXRpbE1vZHVsZSBmcm9tICdjb21tb24vdXRpbC9VdGlsTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdPYmplY3RNYXAnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IE9iamVjdE1hcCwgbWFwLCBub0lkLCBnZXRJZCwgZ2V0VW5pcXVlSWQsIGlkUHJvcGVydHksIG9iajEsIG9iajI7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodXRpbE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfT2JqZWN0TWFwXykgPT4ge1xyXG4gICAgICAgIE9iamVjdE1hcCA9IF9PYmplY3RNYXBfO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgc29tZSBvYmplY3RzIHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICBub0lkID0geyBpSGF2ZU5vSWQ6ICdsbyBzaWVudG8hIHBvYnJlY2l0byEnfTtcclxuICAgICAgICBnZXRJZCA9IHsgZ2V0SWQ6IGphc21pbmUuY3JlYXRlU3B5KCdnZXRJZCcpLmFuZC5yZXR1cm5WYWx1ZSgnZ2V0SWQnKSB9O1xyXG4gICAgICAgIGdldFVuaXF1ZUlkID0geyBnZXRVbmlxdWVJZDogamFzbWluZS5jcmVhdGVTcHkoJ2dldFVuaXF1ZUlkJykuYW5kLnJldHVyblZhbHVlKCd1bmlxdWVJZCcpIH07XHJcbiAgICAgICAgaWRQcm9wZXJ0eSA9IHsgaWQ6ICdpZFByb3BlcnR5JyB9O1xyXG4gICAgICAgIG9iajEgPSB7IGlkOiAnb2JqMScgfTtcclxuICAgICAgICBvYmoyID0geyBpZDogJ29iajInIH07XHJcblxyXG4gICAgICAgIG1hcCA9IG5ldyBPYmplY3RNYXAoKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBpdCgnY2xvbmUoKSBjcmVhdGVzIGEgZGVlcCBjb3B5IG9mIHRoZSBPYmplY3RNYXAnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IG1hcCA9IG5ldyBPYmplY3RNYXAoKTtcclxuICAgICAgICBtYXAuYWRkT2JqZWN0KG9iajEpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBjbG9uZS5cclxuICAgICAgICBsZXQgY29weSA9IG1hcC5jbG9uZSgpO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBjaGFuZ2luZyB0aGUgb3JpZ2luYWwgbWFwIGRvZXNuJ3QgYWZmZWN0IHRoZSBjbG9uZS5cclxuICAgICAgICBtYXAuY2xlYXIoKTtcclxuICAgICAgICBleHBlY3QoY29weS5zaXplKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIGV4cGVjdChjb3B5LmNvbnRhaW5zT2JqZWN0KG9iajEpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2FkZCBvYmplY3QnLCAoKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gdGVzdE9iamVjdChvYmopIHtcclxuICAgICAgICAgICAgbGV0IGFkZGVkID0gbWFwLmFkZE9iamVjdChvYmopO1xyXG4gICAgICAgICAgICBleHBlY3QoYWRkZWQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuc2l6ZSkudG9FcXVhbCgxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdzdXBwb3J0cyBvYmplY3RzIHdpdGggZ2V0SWQoKScsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdE9iamVjdChnZXRJZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChnZXRJZC5nZXRJZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc3VwcG9ydHMgb2JqZWN0cyB3aXRoIGdldFVuaXF1ZUlkKCknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RPYmplY3QoZ2V0VW5pcXVlSWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoZ2V0VW5pcXVlSWQuZ2V0VW5pcXVlSWQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3N1cHBvcnRzIG9iamVjdHMgd2l0aCBhbiBpZCBwcm9wZXJ0eScsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdE9iamVjdChpZFByb3BlcnR5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyBpZiBvYmplY3QgZG9lcyBub3QgaGF2ZSBhbiBpZCcsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IG1hcC5hZGRPYmplY3Qobm9JZCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2FkZHMgYW4gb2JqZWN0IGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3QnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhZGRlZCA9IG1hcC5hZGRPYmplY3Qob2JqMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhZGRlZCkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hcC5jb250YWluc09iamVjdChvYmoxKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hcC5zaXplKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgYWRkIGFuIG9iamVjdCBpZiBpdCBhbHJlYWR5IGV4aXN0cyBhbmQgcmVwbGFjZSBpcyBmYWxzZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFkZGVkID0gbWFwLmFkZE9iamVjdChvYmoxKTtcclxuICAgICAgICAgICAgYWRkZWQgPSBtYXAuYWRkT2JqZWN0KG9iajEsIGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFkZGVkKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hcC5jb250YWluc09iamVjdChvYmoxKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hcC5zaXplKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVwbGFjZXMgYW4gb2JqZWN0IGlmIHJlcGxhY2UgaXMgdHJ1ZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFkZGVkID0gbWFwLmFkZE9iamVjdChvYmoxKTtcclxuICAgICAgICAgICAgbGV0IG5ld09iajEgPSB7IGlkOiBvYmoxLmlkLCBzb21lT3RoZXJQcm9wOiAnc29tZXRoaW5nZWxzZScgfTtcclxuICAgICAgICAgICAgYWRkZWQgPSBtYXAuYWRkT2JqZWN0KG5ld09iajEsIHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWRkZWQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuY29udGFpbnNPYmplY3QobmV3T2JqMSkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuc2l6ZSkudG9FcXVhbCgxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2FkZHMgbXVsdGlwbGUgb2JqZWN0cycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFkZGVkMSA9IG1hcC5hZGRPYmplY3Qob2JqMSk7XHJcbiAgICAgICAgICAgIGxldCBhZGRlZDIgPSBtYXAuYWRkT2JqZWN0KG9iajIpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWRkZWQxKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWRkZWQyKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLmNvbnRhaW5zT2JqZWN0KG9iajEpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLmNvbnRhaW5zT2JqZWN0KG9iajIpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLnNpemUpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgncmVtb3ZlIG9iamVjdCcsICgpID0+IHtcclxuICAgICAgICBpdCgncHVrZXMgaWYgb2JqZWN0IGRvZXMgbm90IGhhdmUgYW4gSUQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IG1hcC5yZW1vdmVPYmplY3Qobm9JZCk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlbW92ZXMgYW4gb2JqZWN0IGlmIHRoZSBJRCBtYXRjaGVzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBtYXAuYWRkT2JqZWN0KG9iajEpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLnNpemUpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGxldCByZW1vdmVkID0gbWFwLnJlbW92ZU9iamVjdChvYmoxKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlbW92ZWQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuc2l6ZSkudG9FcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90IHJlbW92ZSBhbiBvYmplY3QgaWYgdGhlIElEIGRvZXMgbm90IG1hdGNoJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBtYXAuYWRkT2JqZWN0KG9iajEpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLnNpemUpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGxldCByZW1vdmVkID0gbWFwLnJlbW92ZU9iamVjdChvYmoyKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlbW92ZWQpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLnNpemUpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgncmVtb3ZlIG9iamVjdCBieSBpZCcsICgpID0+IHtcclxuICAgICAgICBpdCgncmVtb3ZlcyBhbiBvYmplY3QgaWYgdGhlIElEIG1hdGNoZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1hcC5hZGRPYmplY3Qob2JqMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuc2l6ZSkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgbGV0IHJlbW92ZWQgPSBtYXAucmVtb3ZlT2JqZWN0QnlJZChvYmoxLmlkKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlbW92ZWQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuc2l6ZSkudG9FcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90IHJlbW92ZSBhbiBvYmplY3QgaWYgdGhlIElEIGRvZXMgbm90IG1hdGNoJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBtYXAuYWRkT2JqZWN0KG9iajEpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLnNpemUpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGxldCByZW1vdmVkID0gbWFwLnJlbW92ZU9iamVjdEJ5SWQoJ2Fub3RoZXIgc3R1cGlkIGlkIC4uLiBidXQgbm90IHRoZSByaWdodCBvbmUnKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlbW92ZWQpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLnNpemUpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnY29udGFpbnMgb2JqZWN0JywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdibG93cyBjaHVua3MgaWYgb2JqZWN0IGRvZXMgbm90IGhhdmUgYW4gSUQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IG1hcC5jb250YWluc09iamVjdChub0lkKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBubyBvYmplY3QgaXMgZ2l2ZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuY29udGFpbnNPYmplY3QobnVsbCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBubyBvYmplY3Qgd2l0aCB0aGUgc2FtZSBJRCBleGlzdHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuY29udGFpbnNPYmplY3Qob2JqMSkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIElEIGV4aXN0cycsICgpID0+IHtcclxuICAgICAgICAgICAgbWFwLmFkZE9iamVjdChvYmoxKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hcC5jb250YWluc09iamVjdChvYmoxKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb250YWluc09iamVjdEJ5SWQoKScsICgpID0+IHtcclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBubyBJRCBpcyBnaXZlbicsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KG1hcC5jb250YWluc09iamVjdEJ5SWQobnVsbCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBubyBvYmplY3Qgd2l0aCB0aGUgSUQgZXhpc3RzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLmNvbnRhaW5zT2JqZWN0QnlJZCgnbm90IGluIHRoZSBtYXAsIHlvIScpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBhbiBvYmplY3Qgd2l0aCB0aGUgSUQgZXhpc3RzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBtYXAuYWRkT2JqZWN0KG9iajEpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLmNvbnRhaW5zT2JqZWN0QnlJZChvYmoxLmlkKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRPYmplY3QoKScsICgpID0+IHtcclxuICAgICAgICBpdCgncmVndXJnaXRhdGVzIGlmIHRoZSBvYmplY3QgaGFzIG5vIGlkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBtYXAuZ2V0T2JqZWN0KG5vSWQpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBvYmplY3QgaWYgaXQgbWF0Y2hlcycsICgpID0+IHtcclxuICAgICAgICAgICAgbWFwLmFkZE9iamVjdChvYmoxKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hcC5nZXRPYmplY3Qob2JqMSkpLnRvRXF1YWwob2JqMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0T2JqZWN0QnlJZCgpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiBubyBvYmplY3QgbWF0Y2hlcycsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KG1hcC5nZXRPYmplY3RCeUlkKG9iajEpKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBvYmplY3QgaWYgaXQgbWF0Y2hlcycsICgpID0+IHtcclxuICAgICAgICAgICAgbWFwLmFkZE9iamVjdChvYmoxKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hcC5nZXRPYmplY3RCeUlkKG9iajEuaWQpKS50b0VxdWFsKG9iajEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldFZhbHVlcygpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIHRoZXJlIGFyZSBubyBvYmplY3RzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLmdldFZhbHVlcygpKS50b0VxdWFsKFtdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgYWxsIHZhbHVlcycsICgpID0+IHtcclxuICAgICAgICAgICAgbWFwLmFkZE9iamVjdChvYmoxKTtcclxuICAgICAgICAgICAgbWFwLmFkZE9iamVjdChvYmoyKTtcclxuICAgICAgICAgICAgbGV0IHZhbHMgPSBtYXAuZ2V0VmFsdWVzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh2YWxzKS50b0NvbnRhaW4ob2JqMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh2YWxzKS50b0NvbnRhaW4ob2JqMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0S2V5cygpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIHRoZXJlIGFyZSBubyBvYmplY3RzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLmdldEtleXMoKSkudG9FcXVhbChbXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGFsbCBrZXlzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBtYXAuYWRkT2JqZWN0KG9iajEpO1xyXG4gICAgICAgICAgICBtYXAuYWRkT2JqZWN0KG9iajIpO1xyXG4gICAgICAgICAgICBsZXQgdmFscyA9IG1hcC5nZXRLZXlzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh2YWxzKS50b0NvbnRhaW4ob2JqMS5pZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh2YWxzKS50b0NvbnRhaW4ob2JqMi5pZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2l6ZScsICgpID0+IHtcclxuICAgICAgICBpdCgnc3RhcnRzIGF0IDAnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuc2l6ZSkudG9FcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ21hdGNoZXMgdGhlIG51bWJlciBvZiBvYmplY3RzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBtYXAuYWRkT2JqZWN0KG9iajEpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLnNpemUpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIG1hcC5hZGRPYmplY3Qob2JqMik7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuc2l6ZSkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgbWFwLnJlbW92ZU9iamVjdChvYmoxKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hcC5zaXplKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2NsZWFycyBhbGwgb2JqZWN0cycsICgpID0+IHtcclxuICAgICAgICBtYXAuYWRkT2JqZWN0KG9iajEpO1xyXG4gICAgICAgIG1hcC5hZGRPYmplY3Qob2JqMik7XHJcbiAgICAgICAgbWFwLmNsZWFyKCk7XHJcbiAgICAgICAgZXhwZWN0KG1hcC5zaXplKS50b0VxdWFsKDApO1xyXG4gICAgICAgIGV4cGVjdChtYXAuY29udGFpbnNPYmplY3Qob2JqMSkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIGV4cGVjdChtYXAuY29udGFpbnNPYmplY3Qob2JqMikpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
