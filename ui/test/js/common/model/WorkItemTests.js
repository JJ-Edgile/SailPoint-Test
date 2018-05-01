System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {

            describe('WorkItems', function () {
                var WorkItem, workItem, data;

                // Use the workitem module.
                beforeEach(module(modelModule));

                beforeEach(inject(function (_WorkItem_) {
                    WorkItem = _WorkItem_;

                    workItem = createWorkItem(null);
                }));

                function createWorkItem(overrides) {
                    data = {
                        'id': 'id',
                        'workItemName': '49',
                        'accessRequestName': '129',
                        'requestType': 'AccessRequest',
                        'created': 1391618385380,
                        'editable': false,
                        'target': {
                            'id': '80987',
                            'name': 'Harry.Dixon',
                            'displayName': 'Harry Dixon'
                        },
                        'requester': {
                            'id': 'jhjhdf8798',
                            'name': 'Mary.Johnson',
                            'displayName': 'Mary Johnson'
                        },
                        'owner': {
                            'id': '897987f',
                            'name': 'James.Smith',
                            'displayName': 'James Smith'
                        },
                        'assignee': {
                            'id': '34955890fnksio',
                            'name': 'Amanda.Ross',
                            'displayName': 'Amanda Ross'
                        },
                        'priority': 'High',
                        'commentCount': 1,
                        'description': 'Foo bar'
                    };

                    // If overrides were specified, apply them.
                    if (overrides) {
                        angular.extend(data, overrides);
                    }

                    return new WorkItem(data);
                }

                it('should throw if constructed without data', function () {
                    expect(function () {
                        new WorkItem();
                    }).toThrow();
                });

                it('should populate values correctly', function () {
                    expect(workItem.getId()).toEqual(data.id);
                    expect(workItem.getWorkItemName()).toEqual(data.workItemName);
                    expect(workItem.getAccessRequestName()).toEqual(data.accessRequestName);
                    expect(workItem.getTarget().name).toEqual(data.target.name);
                    expect(workItem.getRequester().name).toEqual(data.requester.name);
                    expect(workItem.getOwner().name).toEqual(data.owner.name);
                    expect(workItem.getAssignee().name).toEqual(data.assignee.name);
                    expect(workItem.getWorkItemType()).toEqual(data.workItemType);
                    expect(workItem.getCreated()).toEqual(new Date(data.created));
                    expect(workItem.getPriority()).toEqual(data.priority);
                    expect(workItem.editable).toEqual(data.editable);
                    expect(workItem.getDescription()).toEqual(data.description);
                });

                it('returns the owner name', function () {
                    expect(workItem.getOwnerName()).toEqual('James Smith');
                });

                it('returns the requester name', function () {
                    expect(workItem.getRequesterName()).toEqual('Mary Johnson');
                });

                it('returns the requestee name', function () {
                    expect(workItem.getRequesteeName()).toEqual('Harry Dixon');
                });

                it('returns the assignee display name', function () {
                    expect(workItem.getAssigneeName()).toEqual('Amanda Ross');
                });

                it('returns false if the owner is not a workgroup', function () {
                    expect(workItem.isOwnerWorkgroup()).toBeFalsy();
                });

                it('returns true if the owner is a workgroup', function () {
                    workItem = createWorkItem({
                        owner: {
                            workgroup: true
                        }
                    });
                    expect(workItem.isOwnerWorkgroup()).toBeTruthy(true);
                });

                it('returns the owner display name if no assignee and owner is workgroup', function () {
                    workItem = createWorkItem({
                        owner: {
                            displayName: 'Some Workgroup',
                            workgroup: true
                        },
                        assignee: null
                    });
                    expect(workItem.getAssigneeName()).toEqual('Some Workgroup');
                });

                it('returns null for assignee name if not owned by workgroup', function () {
                    workItem = createWorkItem({
                        owner: {
                            displayName: 'Harry Dixon',
                            workgroup: false
                        },
                        assignee: null
                    });
                    expect(workItem.getAssigneeName()).not.toBeDefined();
                });

                describe('isHighPriority()', function () {
                    it('returns true if high priority', function () {
                        expect(workItem.isHighPriority()).toEqual(true);
                    });

                    it('returns false if low priority', function () {
                        workItem = createWorkItem({ priority: 'Low' });
                        expect(workItem.isHighPriority()).toEqual(false);
                    });

                    it('returns false if normal priority', function () {
                        workItem = createWorkItem({ priority: 'Normal' });
                        expect(workItem.isHighPriority()).toEqual(false);
                    });

                    it('returns false if no priority', function () {
                        workItem = createWorkItem({ priority: null });
                        expect(workItem.isHighPriority()).toEqual(false);
                    });
                });

                it('returns correct value for getCommentCount for workItem', function () {
                    expect(workItem.commentCount).toEqual(1);
                });

                it('returns correct value for isTransient', function () {
                    expect(workItem.isTransient()).toEqual(false);

                    workItem = createWorkItem({ id: null, workItemType: 'Form' });

                    expect(workItem.isTransient()).toEqual(true);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9Xb3JrSXRlbVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw2QkFBNkIsVUFBVSxTQUFTO0lBQTVGOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7O1FBRTFDLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyxhQUFhLFlBQVc7Z0JBQzdCLElBQUksVUFBVSxVQUFVOzs7Z0JBR3hCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFlBQVk7b0JBQ25DLFdBQVc7O29CQUVYLFdBQVcsZUFBZTs7O2dCQUc5QixTQUFTLGVBQWUsV0FBVztvQkFDL0IsT0FBTzt3QkFDSCxNQUFPO3dCQUNQLGdCQUFnQjt3QkFDaEIscUJBQXFCO3dCQUNyQixlQUFnQjt3QkFDaEIsV0FBWTt3QkFDWixZQUFZO3dCQUNaLFVBQVc7NEJBQ1AsTUFBTTs0QkFDTixRQUFROzRCQUNSLGVBQWU7O3dCQUVuQixhQUFjOzRCQUNWLE1BQU07NEJBQ04sUUFBUTs0QkFDUixlQUFlOzt3QkFFbkIsU0FBVTs0QkFDTixNQUFNOzRCQUNOLFFBQVE7NEJBQ1IsZUFBZTs7d0JBRW5CLFlBQWE7NEJBQ1QsTUFBTTs0QkFDTixRQUFROzRCQUNSLGVBQWU7O3dCQUVuQixZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsZUFBZTs7OztvQkFLbkIsSUFBSSxXQUFXO3dCQUNYLFFBQVEsT0FBTyxNQUFNOzs7b0JBR3pCLE9BQU8sSUFBSSxTQUFTOzs7Z0JBR3hCLEdBQUcsNENBQTRDLFlBQVc7b0JBQ3RELE9BQU8sWUFBVzt3QkFDZCxJQUFJO3VCQUNMOzs7Z0JBR1AsR0FBRyxvQ0FBb0MsWUFBVztvQkFDOUMsT0FBTyxTQUFTLFNBQVMsUUFBUSxLQUFLO29CQUN0QyxPQUFPLFNBQVMsbUJBQW1CLFFBQVEsS0FBSztvQkFDaEQsT0FBTyxTQUFTLHdCQUF3QixRQUFRLEtBQUs7b0JBQ3JELE9BQU8sU0FBUyxZQUFZLE1BQU0sUUFBUSxLQUFLLE9BQU87b0JBQ3RELE9BQU8sU0FBUyxlQUFlLE1BQU0sUUFBUSxLQUFLLFVBQVU7b0JBQzVELE9BQU8sU0FBUyxXQUFXLE1BQU0sUUFBUSxLQUFLLE1BQU07b0JBQ3BELE9BQU8sU0FBUyxjQUFjLE1BQU0sUUFBUSxLQUFLLFNBQVM7b0JBQzFELE9BQU8sU0FBUyxtQkFBbUIsUUFBUSxLQUFLO29CQUNoRCxPQUFPLFNBQVMsY0FBYyxRQUFRLElBQUksS0FBSyxLQUFLO29CQUNwRCxPQUFPLFNBQVMsZUFBZSxRQUFRLEtBQUs7b0JBQzVDLE9BQU8sU0FBUyxVQUFVLFFBQVEsS0FBSztvQkFDdkMsT0FBTyxTQUFTLGtCQUFrQixRQUFRLEtBQUs7OztnQkFHbkQsR0FBRywwQkFBMEIsWUFBVztvQkFDcEMsT0FBTyxTQUFTLGdCQUFnQixRQUFROzs7Z0JBRzVDLEdBQUcsOEJBQThCLFlBQVc7b0JBQ3hDLE9BQU8sU0FBUyxvQkFBb0IsUUFBUTs7O2dCQUdoRCxHQUFHLDhCQUE4QixZQUFXO29CQUN4QyxPQUFPLFNBQVMsb0JBQW9CLFFBQVE7OztnQkFHaEQsR0FBRyxxQ0FBcUMsWUFBVztvQkFDL0MsT0FBTyxTQUFTLG1CQUFtQixRQUFROzs7Z0JBRy9DLEdBQUcsaURBQWlELFlBQVc7b0JBQzNELE9BQU8sU0FBUyxvQkFBb0I7OztnQkFHeEMsR0FBRyw0Q0FBNEMsWUFBVztvQkFDdEQsV0FBVyxlQUFlO3dCQUN0QixPQUFPOzRCQUNILFdBQVc7OztvQkFHbkIsT0FBTyxTQUFTLG9CQUFvQixXQUFXOzs7Z0JBR25ELEdBQUcsd0VBQXdFLFlBQVc7b0JBQ2xGLFdBQVcsZUFBZTt3QkFDdEIsT0FBTzs0QkFDSCxhQUFhOzRCQUNiLFdBQVc7O3dCQUVmLFVBQVU7O29CQUVkLE9BQU8sU0FBUyxtQkFBbUIsUUFBUTs7O2dCQUcvQyxHQUFHLDREQUE0RCxZQUFXO29CQUN0RSxXQUFXLGVBQWU7d0JBQ3RCLE9BQU87NEJBQ0gsYUFBYTs0QkFDYixXQUFXOzt3QkFFZixVQUFVOztvQkFFZCxPQUFPLFNBQVMsbUJBQW1CLElBQUk7OztnQkFHM0MsU0FBUyxvQkFBb0IsWUFBVztvQkFDcEMsR0FBRyxpQ0FBaUMsWUFBVzt3QkFDM0MsT0FBTyxTQUFTLGtCQUFrQixRQUFROzs7b0JBRzlDLEdBQUcsaUNBQWlDLFlBQVc7d0JBQzNDLFdBQVcsZUFBZSxFQUFFLFVBQVU7d0JBQ3RDLE9BQU8sU0FBUyxrQkFBa0IsUUFBUTs7O29CQUc5QyxHQUFHLG9DQUFvQyxZQUFXO3dCQUM5QyxXQUFXLGVBQWUsRUFBRSxVQUFVO3dCQUN0QyxPQUFPLFNBQVMsa0JBQWtCLFFBQVE7OztvQkFHOUMsR0FBRyxnQ0FBZ0MsWUFBVzt3QkFDMUMsV0FBVyxlQUFlLEVBQUUsVUFBVTt3QkFDdEMsT0FBTyxTQUFTLGtCQUFrQixRQUFROzs7O2dCQUlsRCxHQUFHLDBEQUEwRCxZQUFXO29CQUNwRSxPQUFPLFNBQVMsY0FBYyxRQUFROzs7Z0JBRzFDLEdBQUcseUNBQXlDLFlBQVc7b0JBQ25ELE9BQU8sU0FBUyxlQUFlLFFBQVE7O29CQUV2QyxXQUFXLGVBQWUsRUFBRSxJQUFJLE1BQU0sY0FBYzs7b0JBRXBELE9BQU8sU0FBUyxlQUFlLFFBQVE7Ozs7O0dBUzVDIiwiZmlsZSI6ImNvbW1vbi9tb2RlbC9Xb3JrSXRlbVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtb2RlbE1vZHVsZSBmcm9tICdjb21tb24vbW9kZWwvTW9kZWxNb2R1bGUnO1xuXG5kZXNjcmliZSgnV29ya0l0ZW1zJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIFdvcmtJdGVtLCB3b3JrSXRlbSwgZGF0YTtcblxuICAgIC8vIFVzZSB0aGUgd29ya2l0ZW0gbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1vZGVsTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfV29ya0l0ZW1fKSB7XG4gICAgICAgIFdvcmtJdGVtID0gX1dvcmtJdGVtXztcblxuICAgICAgICB3b3JrSXRlbSA9IGNyZWF0ZVdvcmtJdGVtKG51bGwpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdvcmtJdGVtKG92ZXJyaWRlcykge1xuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgJ2lkJyA6ICdpZCcsXG4gICAgICAgICAgICAnd29ya0l0ZW1OYW1lJzogJzQ5JyxcbiAgICAgICAgICAgICdhY2Nlc3NSZXF1ZXN0TmFtZSc6ICcxMjknLFxuICAgICAgICAgICAgJ3JlcXVlc3RUeXBlJyA6ICdBY2Nlc3NSZXF1ZXN0JyxcbiAgICAgICAgICAgICdjcmVhdGVkJyA6IDEzOTE2MTgzODUzODAsXG4gICAgICAgICAgICAnZWRpdGFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICd0YXJnZXQnIDoge1xuICAgICAgICAgICAgICAgICdpZCc6ICc4MDk4NycsXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnSGFycnkuRGl4b24nLFxuICAgICAgICAgICAgICAgICdkaXNwbGF5TmFtZSc6ICdIYXJyeSBEaXhvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncmVxdWVzdGVyJyA6IHtcbiAgICAgICAgICAgICAgICAnaWQnOiAnamhqaGRmODc5OCcsXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnTWFyeS5Kb2huc29uJyxcbiAgICAgICAgICAgICAgICAnZGlzcGxheU5hbWUnOiAnTWFyeSBKb2huc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdvd25lcicgOiB7XG4gICAgICAgICAgICAgICAgJ2lkJzogJzg5Nzk4N2YnLFxuICAgICAgICAgICAgICAgICduYW1lJzogJ0phbWVzLlNtaXRoJyxcbiAgICAgICAgICAgICAgICAnZGlzcGxheU5hbWUnOiAnSmFtZXMgU21pdGgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2Fzc2lnbmVlJyA6IHtcbiAgICAgICAgICAgICAgICAnaWQnOiAnMzQ5NTU4OTBmbmtzaW8nLFxuICAgICAgICAgICAgICAgICduYW1lJzogJ0FtYW5kYS5Sb3NzJyxcbiAgICAgICAgICAgICAgICAnZGlzcGxheU5hbWUnOiAnQW1hbmRhIFJvc3MnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3ByaW9yaXR5JzogJ0hpZ2gnLFxuICAgICAgICAgICAgJ2NvbW1lbnRDb3VudCc6IDEsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnRm9vIGJhcidcbiAgICAgICAgfTtcblxuXG4gICAgICAgIC8vIElmIG92ZXJyaWRlcyB3ZXJlIHNwZWNpZmllZCwgYXBwbHkgdGhlbS5cbiAgICAgICAgaWYgKG92ZXJyaWRlcykge1xuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoZGF0YSwgb3ZlcnJpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgV29ya0l0ZW0oZGF0YSk7XG4gICAgfVxuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBjb25zdHJ1Y3RlZCB3aXRob3V0IGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbmV3IFdvcmtJdGVtKCk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcG9wdWxhdGUgdmFsdWVzIGNvcnJlY3RseScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0uZ2V0SWQoKSkudG9FcXVhbChkYXRhLmlkKTtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtLmdldFdvcmtJdGVtTmFtZSgpKS50b0VxdWFsKGRhdGEud29ya0l0ZW1OYW1lKTtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtLmdldEFjY2Vzc1JlcXVlc3ROYW1lKCkpLnRvRXF1YWwoZGF0YS5hY2Nlc3NSZXF1ZXN0TmFtZSk7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRUYXJnZXQoKS5uYW1lKS50b0VxdWFsKGRhdGEudGFyZ2V0Lm5hbWUpO1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0uZ2V0UmVxdWVzdGVyKCkubmFtZSkudG9FcXVhbChkYXRhLnJlcXVlc3Rlci5uYW1lKTtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtLmdldE93bmVyKCkubmFtZSkudG9FcXVhbChkYXRhLm93bmVyLm5hbWUpO1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0uZ2V0QXNzaWduZWUoKS5uYW1lKS50b0VxdWFsKGRhdGEuYXNzaWduZWUubmFtZSk7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRXb3JrSXRlbVR5cGUoKSkudG9FcXVhbChkYXRhLndvcmtJdGVtVHlwZSk7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRDcmVhdGVkKCkpLnRvRXF1YWwobmV3IERhdGUoZGF0YS5jcmVhdGVkKSk7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRQcmlvcml0eSgpKS50b0VxdWFsKGRhdGEucHJpb3JpdHkpO1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0uZWRpdGFibGUpLnRvRXF1YWwoZGF0YS5lZGl0YWJsZSk7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXREZXNjcmlwdGlvbigpKS50b0VxdWFsKGRhdGEuZGVzY3JpcHRpb24pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIG93bmVyIG5hbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtLmdldE93bmVyTmFtZSgpKS50b0VxdWFsKCdKYW1lcyBTbWl0aCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIHJlcXVlc3RlciBuYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRSZXF1ZXN0ZXJOYW1lKCkpLnRvRXF1YWwoJ01hcnkgSm9obnNvbicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIHJlcXVlc3RlZSBuYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRSZXF1ZXN0ZWVOYW1lKCkpLnRvRXF1YWwoJ0hhcnJ5IERpeG9uJyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgYXNzaWduZWUgZGlzcGxheSBuYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRBc3NpZ25lZU5hbWUoKSkudG9FcXVhbCgnQW1hbmRhIFJvc3MnKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBvd25lciBpcyBub3QgYSB3b3JrZ3JvdXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtLmlzT3duZXJXb3JrZ3JvdXAoKSkudG9CZUZhbHN5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBvd25lciBpcyBhIHdvcmtncm91cCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB3b3JrSXRlbSA9IGNyZWF0ZVdvcmtJdGVtKHtcbiAgICAgICAgICAgIG93bmVyOiB7XG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0uaXNPd25lcldvcmtncm91cCgpKS50b0JlVHJ1dGh5KHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIG93bmVyIGRpc3BsYXkgbmFtZSBpZiBubyBhc3NpZ25lZSBhbmQgb3duZXIgaXMgd29ya2dyb3VwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHdvcmtJdGVtID0gY3JlYXRlV29ya0l0ZW0oe1xuICAgICAgICAgICAgb3duZXI6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWUgV29ya2dyb3VwJyxcbiAgICAgICAgICAgICAgICB3b3JrZ3JvdXA6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3NpZ25lZTogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtLmdldEFzc2lnbmVlTmFtZSgpKS50b0VxdWFsKCdTb21lIFdvcmtncm91cCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgbnVsbCBmb3IgYXNzaWduZWUgbmFtZSBpZiBub3Qgb3duZWQgYnkgd29ya2dyb3VwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHdvcmtJdGVtID0gY3JlYXRlV29ya0l0ZW0oe1xuICAgICAgICAgICAgb3duZXI6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0hhcnJ5IERpeG9uJyxcbiAgICAgICAgICAgICAgICB3b3JrZ3JvdXA6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXNzaWduZWU6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRBc3NpZ25lZU5hbWUoKSkubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNIaWdoUHJpb3JpdHkoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGhpZ2ggcHJpb3JpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbS5pc0hpZ2hQcmlvcml0eSgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBsb3cgcHJpb3JpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdvcmtJdGVtID0gY3JlYXRlV29ya0l0ZW0oeyBwcmlvcml0eTogJ0xvdycgfSk7XG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW0uaXNIaWdoUHJpb3JpdHkoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vcm1hbCBwcmlvcml0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd29ya0l0ZW0gPSBjcmVhdGVXb3JrSXRlbSh7IHByaW9yaXR5OiAnTm9ybWFsJyB9KTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbS5pc0hpZ2hQcmlvcml0eSgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm8gcHJpb3JpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdvcmtJdGVtID0gY3JlYXRlV29ya0l0ZW0oeyBwcmlvcml0eTogbnVsbCB9KTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbS5pc0hpZ2hQcmlvcml0eSgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBjb3JyZWN0IHZhbHVlIGZvciBnZXRDb21tZW50Q291bnQgZm9yIHdvcmtJdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5jb21tZW50Q291bnQpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBjb3JyZWN0IHZhbHVlIGZvciBpc1RyYW5zaWVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0uaXNUcmFuc2llbnQoKSkudG9FcXVhbChmYWxzZSk7XG5cbiAgICAgICAgd29ya0l0ZW0gPSBjcmVhdGVXb3JrSXRlbSh7IGlkOiBudWxsLCB3b3JrSXRlbVR5cGU6ICdGb3JtJyB9KTtcblxuICAgICAgICBleHBlY3Qod29ya0l0ZW0uaXNUcmFuc2llbnQoKSkudG9FcXVhbCh0cnVlKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
