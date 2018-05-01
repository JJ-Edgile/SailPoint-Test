System.register(['test/js/TestInitializer', 'common/managedattribute/ManagedAttributeModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var managedAttributeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonManagedattributeManagedAttributeModule) {
            managedAttributeModule = _commonManagedattributeManagedAttributeModule['default'];
        }],
        execute: function () {

            describe('TargetAssociation', function () {

                var TargetAssociation = undefined,
                    targetAssociationData = {
                    id: '1234',
                    hierarchy: 'wow',
                    type: 'someType',
                    targetType: 'target',
                    targetName: 'your name',
                    rights: 'delete',
                    applicationName: 'UserApp',
                    owningObjectId: '1111'
                };

                beforeEach(module(managedAttributeModule));

                beforeEach(inject(function (_TargetAssociation_) {
                    TargetAssociation = _TargetAssociation_;
                }));

                describe('constructor', function () {

                    it('should throw with no TargetAssociation data', function () {
                        expect(function () {
                            return new TargetAssociation(null);
                        }).toThrow();
                    });

                    it('sets properties for the TargetAssociation', function () {

                        var targetAssociation = new TargetAssociation(targetAssociationData);
                        expect(targetAssociation.id).toEqual(targetAssociationData.id);
                        expect(targetAssociation.hierarchy).toEqual(targetAssociationData.hierarchy);
                        expect(targetAssociation.type).toEqual(targetAssociationData.type);
                        expect(targetAssociation.targetType).toEqual(targetAssociationData.targetType);
                        expect(targetAssociation.targetName).toEqual(targetAssociationData.targetName);
                        expect(targetAssociation.rights).toEqual(targetAssociationData.rights);
                        expect(targetAssociation.applicationName).toEqual(targetAssociationData.applicationName);
                        expect(targetAssociation.owningObjectId).toEqual(targetAssociationData.owningObjectId);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL1RhcmdldEFzc29jaWF0aW9uVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG1EQUFtRCxVQUFVLFNBQVM7OztJQUc5Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsK0NBQStDO1lBQ3JHLHlCQUF5Qiw4Q0FBOEM7O1FBRTNFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxxQkFBcUIsWUFBTTs7Z0JBRWhDLElBQUksb0JBQWlCO29CQUNqQix3QkFBd0I7b0JBQ3BCLElBQUk7b0JBQ0osV0FBVztvQkFDWCxNQUFNO29CQUNOLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixRQUFRO29CQUNSLGlCQUFpQjtvQkFDakIsZ0JBQWdCOzs7Z0JBR3hCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLHFCQUF3QjtvQkFDdkMsb0JBQW9COzs7Z0JBSXhCLFNBQVMsZUFBZSxZQUFNOztvQkFFMUIsR0FBRywrQ0FBK0MsWUFBTTt3QkFDcEQsT0FBTyxZQUFBOzRCQU9TLE9BUEgsSUFBSSxrQkFBa0I7MkJBQU87OztvQkFHOUMsR0FBRyw2Q0FBNkMsWUFBTTs7d0JBRWxELElBQUksb0JBQW9CLElBQUksa0JBQWtCO3dCQUM5QyxPQUFPLGtCQUFrQixJQUFJLFFBQVEsc0JBQXNCO3dCQUMzRCxPQUFPLGtCQUFrQixXQUFXLFFBQVEsc0JBQXNCO3dCQUNsRSxPQUFPLGtCQUFrQixNQUFNLFFBQVEsc0JBQXNCO3dCQUM3RCxPQUFPLGtCQUFrQixZQUFZLFFBQVEsc0JBQXNCO3dCQUNuRSxPQUFPLGtCQUFrQixZQUFZLFFBQVEsc0JBQXNCO3dCQUNuRSxPQUFPLGtCQUFrQixRQUFRLFFBQVEsc0JBQXNCO3dCQUMvRCxPQUFPLGtCQUFrQixpQkFBaUIsUUFBUSxzQkFBc0I7d0JBQ3hFLE9BQU8sa0JBQWtCLGdCQUFnQixRQUFRLHNCQUFzQjs7Ozs7O0dBY2hGIiwiZmlsZSI6ImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL1RhcmdldEFzc29jaWF0aW9uVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgbWFuYWdlZEF0dHJpYnV0ZU1vZHVsZSBmcm9tICdjb21tb24vbWFuYWdlZGF0dHJpYnV0ZS9NYW5hZ2VkQXR0cmlidXRlTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdUYXJnZXRBc3NvY2lhdGlvbicsICgpID0+IHtcclxuXHJcbiAgICBsZXQgVGFyZ2V0QXNzb2NpYXRpb24sXHJcbiAgICAgICAgdGFyZ2V0QXNzb2NpYXRpb25EYXRhID0ge1xyXG4gICAgICAgICAgICBpZDogJzEyMzQnLFxyXG4gICAgICAgICAgICBoaWVyYXJjaHk6ICd3b3cnLFxyXG4gICAgICAgICAgICB0eXBlOiAnc29tZVR5cGUnLFxyXG4gICAgICAgICAgICB0YXJnZXRUeXBlOiAndGFyZ2V0JyxcclxuICAgICAgICAgICAgdGFyZ2V0TmFtZTogJ3lvdXIgbmFtZScsXHJcbiAgICAgICAgICAgIHJpZ2h0czogJ2RlbGV0ZScsXHJcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ1VzZXJBcHAnLFxyXG4gICAgICAgICAgICBvd25pbmdPYmplY3RJZDogJzExMTEnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtYW5hZ2VkQXR0cmlidXRlTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9UYXJnZXRBc3NvY2lhdGlvbl8pID0+IHtcclxuICAgICAgICBUYXJnZXRBc3NvY2lhdGlvbiA9IF9UYXJnZXRBc3NvY2lhdGlvbl87XHJcbiAgICB9KSk7XHJcblxyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIFRhcmdldEFzc29jaWF0aW9uIGRhdGEnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgVGFyZ2V0QXNzb2NpYXRpb24obnVsbCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgcHJvcGVydGllcyBmb3IgdGhlIFRhcmdldEFzc29jaWF0aW9uJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRhcmdldEFzc29jaWF0aW9uID0gbmV3IFRhcmdldEFzc29jaWF0aW9uKHRhcmdldEFzc29jaWF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YXJnZXRBc3NvY2lhdGlvbi5pZCkudG9FcXVhbCh0YXJnZXRBc3NvY2lhdGlvbkRhdGEuaWQpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFyZ2V0QXNzb2NpYXRpb24uaGllcmFyY2h5KS50b0VxdWFsKHRhcmdldEFzc29jaWF0aW9uRGF0YS5oaWVyYXJjaHkpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFyZ2V0QXNzb2NpYXRpb24udHlwZSkudG9FcXVhbCh0YXJnZXRBc3NvY2lhdGlvbkRhdGEudHlwZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YXJnZXRBc3NvY2lhdGlvbi50YXJnZXRUeXBlKS50b0VxdWFsKHRhcmdldEFzc29jaWF0aW9uRGF0YS50YXJnZXRUeXBlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRhcmdldEFzc29jaWF0aW9uLnRhcmdldE5hbWUpLnRvRXF1YWwodGFyZ2V0QXNzb2NpYXRpb25EYXRhLnRhcmdldE5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFyZ2V0QXNzb2NpYXRpb24ucmlnaHRzKS50b0VxdWFsKHRhcmdldEFzc29jaWF0aW9uRGF0YS5yaWdodHMpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFyZ2V0QXNzb2NpYXRpb24uYXBwbGljYXRpb25OYW1lKS50b0VxdWFsKHRhcmdldEFzc29jaWF0aW9uRGF0YS5hcHBsaWNhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFyZ2V0QXNzb2NpYXRpb24ub3duaW5nT2JqZWN0SWQpLnRvRXF1YWwodGFyZ2V0QXNzb2NpYXRpb25EYXRhLm93bmluZ09iamVjdElkKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
