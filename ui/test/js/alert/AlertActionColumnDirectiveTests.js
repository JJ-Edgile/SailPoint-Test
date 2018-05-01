System.register(['test/js/TestInitializer', 'alert/AlertModule', 'test/js/TestModule'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var alertModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_alertAlertModule) {
            alertModule = _alertAlertModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('spAlertActionColumn', function () {

                var Alert = undefined,
                    alertTestData = undefined;

                beforeEach(module(alertModule, testModule));

                beforeEach(inject(function (_Alert_, _alertTestData_) {
                    Alert = _Alert_;
                    alertTestData = _alertTestData_;
                }));

                function createAlert() {
                    return new Alert(alertTestData.ALERT1);
                }

                describe('AlertActionColumnDirectiveCtrl', function () {

                    var alertService = undefined,
                        $controller = undefined;

                    beforeEach(inject(function (_$controller_, _alertService_) {
                        alertService = _alertService_;
                        $controller = _$controller_;
                    }));

                    function createController() {
                        return $controller('AlertActionColumnDirectiveCtrl', {
                            alertService: alertService,
                            Alert: Alert
                        });
                    }

                    describe('showDetails', function () {

                        it('should call the alert service', function () {
                            var ctrl = createController(),
                                item = createAlert();

                            spyOn(alertService, 'openDetailsDialog');

                            ctrl.showDetails(item);

                            expect(alertService.openDetailsDialog).toHaveBeenCalledWith(item);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0QWN0aW9uQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFCQUFxQix1QkFBdUIsVUFBVSxTQUFTOzs7OztJQUt2Rzs7SUFFQSxJQUFJLGFBQWE7SUFDakIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUJBQW1CO1lBQ3pFLGNBQWMsa0JBQWtCO1dBQ2pDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsdUJBQXVCLFlBQU07O2dCQUVsQyxJQUFJLFFBQUs7b0JBQUUsZ0JBQWE7O2dCQUV4QixXQUFXLE9BQU8sYUFBYTs7Z0JBRS9CLFdBQVcsT0FBTyxVQUFDLFNBQVMsaUJBQW9CO29CQUM1QyxRQUFRO29CQUNSLGdCQUFnQjs7O2dCQUdwQixTQUFTLGNBQWM7b0JBQ25CLE9BQU8sSUFBSSxNQUFNLGNBQWM7OztnQkFHbkMsU0FBUyxrQ0FBa0MsWUFBTTs7b0JBRTdDLElBQUksZUFBWTt3QkFBRSxjQUFXOztvQkFFN0IsV0FBVyxPQUFPLFVBQUMsZUFBZSxnQkFBbUI7d0JBQ2pELGVBQWU7d0JBQ2YsY0FBYzs7O29CQUdsQixTQUFTLG1CQUFtQjt3QkFDeEIsT0FBTyxZQUFZLGtDQUFrQzs0QkFDakQsY0FBYzs0QkFDZCxPQUFPOzs7O29CQUtmLFNBQVMsZUFBZSxZQUFNOzt3QkFFdEIsR0FBRyxpQ0FBaUMsWUFBTTs0QkFDdEMsSUFBSSxPQUFPO2dDQUNYLE9BQU87OzRCQUVQLE1BQU0sY0FBYzs7NEJBRXBCLEtBQUssWUFBWTs7NEJBRWpCLE9BQU8sYUFBYSxtQkFBbUIscUJBQXFCOzs7Ozs7O0dBZTdFIiwiZmlsZSI6ImFsZXJ0L0FsZXJ0QWN0aW9uQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIChjKSBDb3B5cmlnaHQgMjAwOCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWxlcnRNb2R1bGUgZnJvbSAnYWxlcnQvQWxlcnRNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ3NwQWxlcnRBY3Rpb25Db2x1bW4nLCAoKSA9PiB7XG5cbiAgICBsZXQgQWxlcnQsIGFsZXJ0VGVzdERhdGE7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhbGVydE1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9BbGVydF8sIF9hbGVydFRlc3REYXRhXykgPT4ge1xuICAgICAgICBBbGVydCA9IF9BbGVydF87XG4gICAgICAgIGFsZXJ0VGVzdERhdGEgPSBfYWxlcnRUZXN0RGF0YV87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQWxlcnQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQWxlcnQoYWxlcnRUZXN0RGF0YS5BTEVSVDEpO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdBbGVydEFjdGlvbkNvbHVtbkRpcmVjdGl2ZUN0cmwnLCAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGFsZXJ0U2VydmljZSwgJGNvbnRyb2xsZXI7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29udHJvbGxlcl8sIF9hbGVydFNlcnZpY2VfKSA9PiB7XG4gICAgICAgICAgICBhbGVydFNlcnZpY2UgPSBfYWxlcnRTZXJ2aWNlXztcbiAgICAgICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ0FsZXJ0QWN0aW9uQ29sdW1uRGlyZWN0aXZlQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBhbGVydFNlcnZpY2U6IGFsZXJ0U2VydmljZSxcbiAgICAgICAgICAgICAgICBBbGVydDogQWxlcnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICBkZXNjcmliZSgnc2hvd0RldGFpbHMnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIGFsZXJ0IHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gY3JlYXRlQWxlcnQoKTtcblxuICAgICAgICAgICAgICAgICAgICBzcHlPbihhbGVydFNlcnZpY2UsICdvcGVuRGV0YWlsc0RpYWxvZycpO1xuXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2hvd0RldGFpbHMoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGFsZXJ0U2VydmljZS5vcGVuRGV0YWlsc0RpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
