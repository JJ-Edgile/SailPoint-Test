System.register(['test/js/TestInitializer', 'common/email/EmailModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Tests for EmailTemplate
     */
    'use strict';

    var emailModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonEmailEmailModule) {
            emailModule = _commonEmailEmailModule['default'];
        }],
        execute: function () {
            describe('EmailTemplateTest', function () {
                var EmailTemplate = undefined;

                beforeEach(module(emailModule));

                beforeEach(inject(function (_EmailTemplate_) {
                    EmailTemplate = _EmailTemplate_;
                }));

                describe('constructor', function () {
                    it('throws if data is missing', function () {
                        expect(function () {
                            new EmailTemplate();
                        }).toThrow();
                    });

                    it('does not throw with correct data', function () {
                        expect(function () {
                            new EmailTemplate({});
                        }).not.toThrow();
                    });

                    it('toIdentity should be an object even if none was passed in', function () {
                        var template = new EmailTemplate({});
                        expect(template.toIdentity).toBeDefined();
                        expect(template.toIdentity).toEqual({}); // should be empty object
                    });

                    it('sets values from provided data', function () {
                        var data = {
                            id: '1245',
                            to: 'to@email.com',
                            from: 'from@email.com',
                            subject: 'hello',
                            body: 'i have something to say',
                            toIdentity: {
                                name: 'Me'
                            },
                            toIdentityReadOnly: true
                        },
                            template = new EmailTemplate(data);

                        expect(template.id).toEqual(data.id);
                        expect(template.to).toEqual(data.to);
                        expect(template.from).toEqual(data.from);
                        expect(template.subject).toEqual(data.subject);
                        expect(template.body).toEqual(data.body);
                        expect(template.toIdentityReadOnly).toEqual(data.toIdentityReadOnly);
                        expect(template.toIdentity).toEqual(data.toIdentity);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9lbWFpbC9tb2RlbC9FbWFpbFRlbXBsYXRlVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7O0lBTXhGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7O1FBRTFDLFNBQVMsWUFBWTtZQU43QixTQUFTLHFCQUFxQixZQUFNO2dCQUNoQyxJQUFJLGdCQUFhOztnQkFFakIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsaUJBQW9CO29CQUNuQyxnQkFBZ0I7OztnQkFHcEIsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsNkJBQTZCLFlBQVc7d0JBQ3ZDLE9BQU8sWUFBVzs0QkFDZCxJQUFJOzJCQUNMOzs7b0JBR1AsR0FBRyxvQ0FBb0MsWUFBTTt3QkFDekMsT0FBTyxZQUFXOzRCQUNkLElBQUksY0FBYzsyQkFDbkIsSUFBSTs7O29CQUdYLEdBQUcsNkRBQTZELFlBQU07d0JBQ2xFLElBQUksV0FBVyxJQUFJLGNBQWM7d0JBQ2pDLE9BQU8sU0FBUyxZQUFZO3dCQUM1QixPQUFPLFNBQVMsWUFBWSxRQUFROzs7b0JBR3hDLEdBQUcsa0NBQWtDLFlBQU07d0JBQ3ZDLElBQUksT0FBTzs0QkFDUCxJQUFJOzRCQUNKLElBQUk7NEJBQ0osTUFBTTs0QkFDTixTQUFTOzRCQUNULE1BQU07NEJBQ04sWUFBWTtnQ0FDUixNQUFNOzs0QkFFVixvQkFBb0I7OzRCQUNyQixXQUFXLElBQUksY0FBYzs7d0JBRWhDLE9BQU8sU0FBUyxJQUFJLFFBQVEsS0FBSzt3QkFDakMsT0FBTyxTQUFTLElBQUksUUFBUSxLQUFLO3dCQUNqQyxPQUFPLFNBQVMsTUFBTSxRQUFRLEtBQUs7d0JBQ25DLE9BQU8sU0FBUyxTQUFTLFFBQVEsS0FBSzt3QkFDdEMsT0FBTyxTQUFTLE1BQU0sUUFBUSxLQUFLO3dCQUNuQyxPQUFPLFNBQVMsb0JBQW9CLFFBQVEsS0FBSzt3QkFDakQsT0FBTyxTQUFTLFlBQVksUUFBUSxLQUFLOzs7Ozs7R0FjbEQiLCJmaWxlIjoiY29tbW9uL2VtYWlsL21vZGVsL0VtYWlsVGVtcGxhdGVUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBlbWFpbE1vZHVsZSBmcm9tICdjb21tb24vZW1haWwvRW1haWxNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciBFbWFpbFRlbXBsYXRlXG4gKi9cbmRlc2NyaWJlKCdFbWFpbFRlbXBsYXRlVGVzdCcsICgpID0+IHtcbiAgICBsZXQgRW1haWxUZW1wbGF0ZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGVtYWlsTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0VtYWlsVGVtcGxhdGVfKSA9PiB7XG4gICAgICAgIEVtYWlsVGVtcGxhdGUgPSBfRW1haWxUZW1wbGF0ZV87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgICAgICBpdCgndGhyb3dzIGlmIGRhdGEgaXMgbWlzc2luZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5ldyBFbWFpbFRlbXBsYXRlKCk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCB0aHJvdyB3aXRoIGNvcnJlY3QgZGF0YScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuZXcgRW1haWxUZW1wbGF0ZSh7fSk7XG4gICAgICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndG9JZGVudGl0eSBzaG91bGQgYmUgYW4gb2JqZWN0IGV2ZW4gaWYgbm9uZSB3YXMgcGFzc2VkIGluJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gbmV3IEVtYWlsVGVtcGxhdGUoe30pO1xuICAgICAgICAgICAgZXhwZWN0KHRlbXBsYXRlLnRvSWRlbnRpdHkpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QodGVtcGxhdGUudG9JZGVudGl0eSkudG9FcXVhbCh7fSk7IC8vIHNob3VsZCBiZSBlbXB0eSBvYmplY3RcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdmFsdWVzIGZyb20gcHJvdmlkZWQgZGF0YScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGlkOiAnMTI0NScsXG4gICAgICAgICAgICAgICAgdG86ICd0b0BlbWFpbC5jb20nLFxuICAgICAgICAgICAgICAgIGZyb206ICdmcm9tQGVtYWlsLmNvbScsXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ2hlbGxvJyxcbiAgICAgICAgICAgICAgICBib2R5OiAnaSBoYXZlIHNvbWV0aGluZyB0byBzYXknLFxuICAgICAgICAgICAgICAgIHRvSWRlbnRpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ01lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdG9JZGVudGl0eVJlYWRPbmx5OiB0cnVlXG4gICAgICAgICAgICB9LCB0ZW1wbGF0ZSA9IG5ldyBFbWFpbFRlbXBsYXRlKGRhdGEpO1xuXG4gICAgICAgICAgICBleHBlY3QodGVtcGxhdGUuaWQpLnRvRXF1YWwoZGF0YS5pZCk7XG4gICAgICAgICAgICBleHBlY3QodGVtcGxhdGUudG8pLnRvRXF1YWwoZGF0YS50byk7XG4gICAgICAgICAgICBleHBlY3QodGVtcGxhdGUuZnJvbSkudG9FcXVhbChkYXRhLmZyb20pO1xuICAgICAgICAgICAgZXhwZWN0KHRlbXBsYXRlLnN1YmplY3QpLnRvRXF1YWwoZGF0YS5zdWJqZWN0KTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZW1wbGF0ZS5ib2R5KS50b0VxdWFsKGRhdGEuYm9keSk7XG4gICAgICAgICAgICBleHBlY3QodGVtcGxhdGUudG9JZGVudGl0eVJlYWRPbmx5KS50b0VxdWFsKGRhdGEudG9JZGVudGl0eVJlYWRPbmx5KTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZW1wbGF0ZS50b0lkZW50aXR5KS50b0VxdWFsKGRhdGEudG9JZGVudGl0eSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
