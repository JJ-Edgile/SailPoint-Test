System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
     * Unit tests for the FormButton Model.
     */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('FormButton', function () {
                var FormButton,
                    testButton,
                    testButtonData = {
                    'action': 'next',
                    'actionParameter': 'dosomething',
                    'actionParameterValue': 'cool',
                    'skipValidation': false,
                    'text': 'Submit'
                };

                //use the form module
                beforeEach(module(formModule));

                /**
                 * Setup the Form class and create a test object
                 */
                beforeEach(inject(function (_FormButton_) {
                    FormButton = _FormButton_;
                    testButton = new FormButton(testButtonData);
                }));

                function verifyButton(button) {
                    expect(button.getAction()).toBe(testButtonData.action);
                    expect(button.getActionParameter()).toBe(testButtonData.actionParameter);
                    expect(button.getActionParameterValue()).toBe(testButtonData.actionParameterValue);
                    expect(button.getLabel()).toBe(testButtonData.text);
                    expect(button.isSkipValidation()).toBe(testButtonData.skipValidation);
                }

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new FormButton(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new FormButton('fibbonaci');
                    }).toThrow();
                    expect(function () {
                        new FormButton(function () {
                            return '1 1 2 3 5 8';
                        });
                    }).toThrow();
                });

                it('instantiates correctly with data', function () {
                    verifyButton(testButton);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL21vZGVsL0Zvcm1CdXR0b25UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUzs7Ozs7SUFBMUY7O0lBT0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjs7UUFFdkMsU0FBUyxZQUFZO1lBSjdCLFNBQVMsY0FBYyxZQUFXO2dCQUM5QixJQUFJO29CQUFZO29CQUNoQixpQkFBaUI7b0JBQ1QsVUFBVTtvQkFDVixtQkFBbUI7b0JBQ25CLHdCQUF3QjtvQkFDeEIsa0JBQWtCO29CQUNsQixRQUFROzs7O2dCQUloQixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyxjQUFjO29CQUNyQyxhQUFhO29CQUNiLGFBQWEsSUFBSSxXQUFXOzs7Z0JBR2hDLFNBQVMsYUFBYSxRQUFRO29CQUMxQixPQUFPLE9BQU8sYUFBYSxLQUFLLGVBQWU7b0JBQy9DLE9BQU8sT0FBTyxzQkFBc0IsS0FBSyxlQUFlO29CQUN4RCxPQUFPLE9BQU8sMkJBQTJCLEtBQUssZUFBZTtvQkFDN0QsT0FBTyxPQUFPLFlBQVksS0FBSyxlQUFlO29CQUM5QyxPQUFPLE9BQU8sb0JBQW9CLEtBQUssZUFBZTs7O2dCQUcxRCxHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxXQUFXO3VCQUFVOzs7Z0JBR2pELEdBQUcsaUVBQWlFLFlBQVc7b0JBQzNFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLFdBQVc7dUJBQWlCO29CQUNwRCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxXQUFXLFlBQVc7NEJBQUUsT0FBTzs7dUJBQXNCOzs7Z0JBR2pGLEdBQUcsb0NBQW9DLFlBQVc7b0JBQzlDLGFBQWE7Ozs7O0dBbUJsQiIsImZpbGUiOiJjb21tb24vZm9ybS9tb2RlbC9Gb3JtQnV0dG9uVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGZvcm1Nb2R1bGUgZnJvbSAnY29tbW9uL2Zvcm0vRm9ybU1vZHVsZSc7XG5cbi8qKlxuICogVW5pdCB0ZXN0cyBmb3IgdGhlIEZvcm1CdXR0b24gTW9kZWwuXG4gKi9cbmRlc2NyaWJlKCdGb3JtQnV0dG9uJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIEZvcm1CdXR0b24sIHRlc3RCdXR0b24sXG4gICAgdGVzdEJ1dHRvbkRhdGEgPSB7XG4gICAgICAgICAgICAnYWN0aW9uJzogJ25leHQnLFxuICAgICAgICAgICAgJ2FjdGlvblBhcmFtZXRlcic6ICdkb3NvbWV0aGluZycsXG4gICAgICAgICAgICAnYWN0aW9uUGFyYW1ldGVyVmFsdWUnOiAnY29vbCcsXG4gICAgICAgICAgICAnc2tpcFZhbGlkYXRpb24nOiBmYWxzZSxcbiAgICAgICAgICAgICd0ZXh0JzogJ1N1Ym1pdCdcbiAgICAgICAgfTtcblxuICAgIC8vdXNlIHRoZSBmb3JtIG1vZHVsZVxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZvcm1Nb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBGb3JtIGNsYXNzIGFuZCBjcmVhdGUgYSB0ZXN0IG9iamVjdFxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9Gb3JtQnV0dG9uXykge1xuICAgICAgICBGb3JtQnV0dG9uID0gX0Zvcm1CdXR0b25fO1xuICAgICAgICB0ZXN0QnV0dG9uID0gbmV3IEZvcm1CdXR0b24odGVzdEJ1dHRvbkRhdGEpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIHZlcmlmeUJ1dHRvbihidXR0b24pIHtcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5nZXRBY3Rpb24oKSkudG9CZSh0ZXN0QnV0dG9uRGF0YS5hY3Rpb24pO1xuICAgICAgICBleHBlY3QoYnV0dG9uLmdldEFjdGlvblBhcmFtZXRlcigpKS50b0JlKHRlc3RCdXR0b25EYXRhLmFjdGlvblBhcmFtZXRlcik7XG4gICAgICAgIGV4cGVjdChidXR0b24uZ2V0QWN0aW9uUGFyYW1ldGVyVmFsdWUoKSkudG9CZSh0ZXN0QnV0dG9uRGF0YS5hY3Rpb25QYXJhbWV0ZXJWYWx1ZSk7XG4gICAgICAgIGV4cGVjdChidXR0b24uZ2V0TGFiZWwoKSkudG9CZSh0ZXN0QnV0dG9uRGF0YS50ZXh0KTtcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5pc1NraXBWYWxpZGF0aW9uKCkpLnRvQmUodGVzdEJ1dHRvbkRhdGEuc2tpcFZhbGlkYXRpb24pO1xuICAgIH1cblxuICAgIGl0KCdyZXF1aXJlcyBub24tbnVsbCBkYXRhIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBGb3JtQnV0dG9uKG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBGb3JtQnV0dG9uKCdmaWJib25hY2knKTsgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBGb3JtQnV0dG9uKGZ1bmN0aW9uKCkgeyByZXR1cm4gJzEgMSAyIDMgNSA4JzsgfSk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdpbnN0YW50aWF0ZXMgY29ycmVjdGx5IHdpdGggZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2ZXJpZnlCdXR0b24odGVzdEJ1dHRvbik7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
