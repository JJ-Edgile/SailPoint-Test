System.register([], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var request, approval, data;
    return {
        setters: [],
        execute: function () {
            request = {
                identityName: 'potato',
                identityDisplayName: 'Mr. Potato',
                containerName: 'parts',
                containerDisplayName: 'Bucket o parts',
                containerDescription: 'Buckets of fun ... for EVERYONE!',
                accountRequests: [{
                    application: 'toys',
                    nativeIdentity: 'potato',
                    displayName: 'Mr. P',
                    addedRights: ['list parts', 'get nose'],
                    removedRights: ['goose', 'aardvark']
                }]
            };
            approval = {
                id: '1',
                target: {
                    id: '35345345',
                    name: 'Coco.Chanel',
                    displayName: 'Coco Chanel',
                    workgroup: false
                },
                requester: {
                    id: '57565675675',
                    name: 'Christian.Dior',
                    displayName: 'Christian Dior',
                    workgroup: false
                },
                created: 126230400000,
                workItemType: 'Approval',
                request: request
            };
            data = {
                request: request,
                approval: approval
            };

            _export('default', data);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL3BhbUFwcHJvdmFsL1BhbVRlc3REYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxJQUFJLFVBQVUsU0FBUzs7O0lBR25DOztJQUVBLElBSEUsU0FlQSxVQW1CQTtJQTlCRixPQUFPO1FBQ0gsU0FBUztRQUNULFNBQVMsWUFBWTtZQU52QixVQUFVO2dCQUNaLGNBQWM7Z0JBQ2QscUJBQXFCO2dCQUNyQixlQUFlO2dCQUNmLHNCQUFzQjtnQkFDdEIsc0JBQXNCO2dCQUN0QixpQkFBaUIsQ0FBQztvQkFDZCxhQUFhO29CQUNiLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixhQUFhLENBQUUsY0FBYztvQkFDN0IsZUFBZSxDQUFFLFNBQVM7OztZQUk1QixXQUFXO2dCQUNiLElBQUk7Z0JBQ0osUUFBUTtvQkFDSixJQUFJO29CQUNKLE1BQU07b0JBQ04sYUFBYTtvQkFDYixXQUFXOztnQkFFZixXQUFXO29CQUNQLElBQUk7b0JBQ0osTUFBTTtvQkFDTixhQUFhO29CQUNiLFdBQVc7O2dCQUVmLFNBQVM7Z0JBQ1QsY0FBYztnQkFDZCxTQUFTOztZQUdQLE9BQU87Z0JBQ1QsU0FBUztnQkFDVCxVQUFVOzs7WUFRRixRQUFRLFdBTEw7OztHQVFaIiwiZmlsZSI6IndvcmtpdGVtL3BhbUFwcHJvdmFsL1BhbVRlc3REYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXHJcblxyXG5jb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgaWRlbnRpdHlOYW1lOiAncG90YXRvJyxcclxuICAgIGlkZW50aXR5RGlzcGxheU5hbWU6ICdNci4gUG90YXRvJyxcclxuICAgIGNvbnRhaW5lck5hbWU6ICdwYXJ0cycsXHJcbiAgICBjb250YWluZXJEaXNwbGF5TmFtZTogJ0J1Y2tldCBvIHBhcnRzJyxcclxuICAgIGNvbnRhaW5lckRlc2NyaXB0aW9uOiAnQnVja2V0cyBvZiBmdW4gLi4uIGZvciBFVkVSWU9ORSEnLFxyXG4gICAgYWNjb3VudFJlcXVlc3RzOiBbe1xyXG4gICAgICAgIGFwcGxpY2F0aW9uOiAndG95cycsXHJcbiAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdwb3RhdG8nLFxyXG4gICAgICAgIGRpc3BsYXlOYW1lOiAnTXIuIFAnLFxyXG4gICAgICAgIGFkZGVkUmlnaHRzOiBbICdsaXN0IHBhcnRzJywgJ2dldCBub3NlJyBdLFxyXG4gICAgICAgIHJlbW92ZWRSaWdodHM6IFsgJ2dvb3NlJywgJ2FhcmR2YXJrJyBdXHJcbiAgICB9XVxyXG59O1xyXG5cclxuY29uc3QgYXBwcm92YWwgPSB7XHJcbiAgICBpZDogJzEnLFxyXG4gICAgdGFyZ2V0OiB7XHJcbiAgICAgICAgaWQ6ICczNTM0NTM0NScsXHJcbiAgICAgICAgbmFtZTogJ0NvY28uQ2hhbmVsJyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogJ0NvY28gQ2hhbmVsJyxcclxuICAgICAgICB3b3JrZ3JvdXA6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgcmVxdWVzdGVyOiB7XHJcbiAgICAgICAgaWQ6ICc1NzU2NTY3NTY3NScsXHJcbiAgICAgICAgbmFtZTogJ0NocmlzdGlhbi5EaW9yJyxcclxuICAgICAgICBkaXNwbGF5TmFtZTogJ0NocmlzdGlhbiBEaW9yJyxcclxuICAgICAgICB3b3JrZ3JvdXA6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZDogMTI2MjMwNDAwMDAwLFxyXG4gICAgd29ya0l0ZW1UeXBlOiAnQXBwcm92YWwnLFxyXG4gICAgcmVxdWVzdDogcmVxdWVzdFxyXG59O1xyXG5cclxuY29uc3QgZGF0YSA9IHtcclxuICAgIHJlcXVlc3Q6IHJlcXVlc3QsXHJcbiAgICBhcHByb3ZhbDogYXBwcm92YWxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhdGE7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
