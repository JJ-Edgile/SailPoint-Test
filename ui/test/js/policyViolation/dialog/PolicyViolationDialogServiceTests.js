System.register(['test/js/TestInitializer', 'policyViolation/dialog/PolicyViolationDialogModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var policyViolationDialogModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationDialogPolicyViolationDialogModule) {
            policyViolationDialogModule = _policyViolationDialogPolicyViolationDialogModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('policyViolationDialogService', function () {
                var policyViolationDialogService = undefined,
                    spModal = undefined,
                    $q = undefined,
                    $scope = undefined;

                beforeEach(module(policyViolationDialogModule));

                beforeEach(inject(function (_policyViolationDialogService_, _spModal_, _$q_, $rootScope) {
                    policyViolationDialogService = _policyViolationDialogService_;
                    spModal = _spModal_;
                    $q = _$q_;
                    $scope = $rootScope.$new();
                }));

                function setupModal(result) {
                    spyOn(spModal, 'open').and.returnValue({
                        result: $q.when(result)
                    });
                }

                describe('showAllowExceptionDialog', function () {
                    beforeEach(inject(function (spTranslateFilter) {
                        // Setup the test catalog.
                        spTranslateFilter.configureCatalog({
                            'ui_allow_exception_dialog_items': 'Items: {0}',
                            'ui_allow_exception_dialog_title': 'Title {0}'
                        });
                    }));

                    it('pukes with no config', function () {
                        expect(function () {
                            return policyViolationDialogService.showAllowExceptionDialog();
                        }).toThrow();
                    });

                    describe('title', function () {
                        function testTitle(config, title) {
                            setupModal();
                            policyViolationDialogService.showAllowExceptionDialog(config);
                            $scope.$apply();
                            expect(spModal.open).toHaveBeenCalled();
                            var modalArgs = spModal.open.calls.mostRecent().args;
                            expect(modalArgs.length).toEqual(1);
                            var modalConfig = modalArgs[0];
                            expect(modalConfig.title).toEqual(title);
                        }

                        it('uses the title in the config if set', function () {
                            var title = 'hello this is the title';
                            testTitle({ title: title }, title);
                        });

                        it('uses the displayName in title string if set', function () {
                            var displayName = 'Violation1',
                                title = 'Title ' + displayName;
                            testTitle({ displayName: displayName }, title);
                        });

                        it('uses bulk count string if bulkCount is set', function () {
                            var bulkCount = 15,
                                title = 'Title Items: ' + bulkCount;
                            testTitle({ bulkCount: bulkCount }, title);
                        });
                    });

                    it('calls spModal.open with correct values', function () {
                        var config = {
                            showExpirationDate: true,
                            expirationDate: new Date(),
                            maximumExpirationDate: null,
                            minimumExpirationDate: new Date(),
                            comments: 'hello',
                            requireComments: true,
                            readOnly: true
                        };
                        setupModal();
                        policyViolationDialogService.showAllowExceptionDialog(config);
                        $scope.$apply();

                        var modalArgs = spModal.open.calls.mostRecent().args;
                        expect(modalArgs.length).toEqual(1);
                        var modalConfig = modalArgs[0];

                        expect(modalConfig.resolve.expirationDate()).toEqual(config.expirationDate);
                        expect(modalConfig.resolve.minDate()).toEqual(config.minimumExpirationDate);
                        expect(modalConfig.resolve.maxDate()).toEqual(config.maximumExpirationDate);
                        expect(modalConfig.resolve.showExpirationDate()).toEqual(config.showExpirationDate);
                        expect(modalConfig.resolve.requireComments()).toEqual(config.requireComments);
                        expect(modalConfig.resolve.comments()).toEqual(config.comments);
                        expect(modalConfig.resolve.readOnly()).toEqual(config.readOnly);
                    });

                    it('returns promise that resolves with result of modal', function () {
                        var result = {
                            expirationDate: new Date(),
                            comments: 'whatever'
                        },
                            returnValue = undefined;
                        setupModal(result);
                        policyViolationDialogService.showAllowExceptionDialog({}).then(function (val) {
                            return returnValue = val;
                        });
                        $scope.$apply();
                        expect(returnValue).toEqual(result);
                    });
                });

                describe('showDetailsDialog', function () {

                    it('pukes with no config', function () {
                        expect(function () {
                            return policyViolationDialogService.showDetailsDialog();
                        }).toThrow();
                    });

                    it('pukes with no policy violation', function () {
                        expect(function () {
                            return policyViolationDialogService.showDetailsDialog({});
                        }).toThrow();
                    });

                    it('shows policyViolation details dialog', function () {
                        spyOn(spModal, 'open');
                        var config = {
                            policyViolation: {
                                id: '1234',
                                rule: 'i am a rule',
                                policy: {
                                    name: 'some policy'
                                }
                            }
                        };
                        policyViolationDialogService.showDetailsDialog(config);

                        expect(spModal.open).toHaveBeenCalled();
                        var args = spModal.open.calls.mostRecent().args[0];
                        expect(args.resolve.policyViolation()).toBe(config.policyViolation);
                    });

                    it('sets the title to the violation rule if definded', function () {
                        spyOn(spModal, 'open');
                        var config = {
                            policyViolation: {
                                id: '1234',
                                rule: 'i am a rule',
                                policy: {
                                    name: 'some policy'
                                }
                            }
                        };
                        policyViolationDialogService.showDetailsDialog(config);
                        var args = spModal.open.calls.mostRecent().args[0];
                        expect(args.title).toBe(config.policyViolation.rule);
                    });

                    it('sets the title to the violation policy name if rule not defined', function () {
                        spyOn(spModal, 'open');
                        var config = {
                            policyViolation: {
                                id: '1234',
                                policy: {
                                    name: 'some policy'
                                }
                            }
                        };
                        policyViolationDialogService.showDetailsDialog(config);
                        var args = spModal.open.calls.mostRecent().args[0];
                        expect(args.title).toBe(config.policyViolation.policy.name);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9kaWFsb2cvUG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzREFBc0QsNENBQTRDLFVBQVUsU0FBUzs7O0lBRzdKOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtREFBbUQ7WUFDekcsOEJBQThCLGtEQUFrRDtXQUNqRixVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsZ0NBQWdDLFlBQU07Z0JBQzNDLElBQUksK0JBQTRCO29CQUFFLFVBQU87b0JBQUUsS0FBRTtvQkFBRSxTQUFNOztnQkFFckQsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsZ0NBQWdDLFdBQVcsTUFBTSxZQUFlO29CQUMvRSwrQkFBK0I7b0JBQy9CLFVBQVU7b0JBQ1YsS0FBSztvQkFDTCxTQUFTLFdBQVc7OztnQkFHeEIsU0FBUyxXQUFXLFFBQVE7b0JBQ3hCLE1BQU0sU0FBUyxRQUFRLElBQUksWUFBWTt3QkFDbkMsUUFBUSxHQUFHLEtBQUs7Ozs7Z0JBSXhCLFNBQVMsNEJBQTRCLFlBQU07b0JBQ3ZDLFdBQVcsT0FBTyxVQUFDLG1CQUFzQjs7d0JBRXJDLGtCQUFrQixpQkFBaUI7NEJBQy9CLG1DQUFtQzs0QkFDbkMsbUNBQW1DOzs7O29CQUkzQyxHQUFHLHdCQUF3QixZQUFNO3dCQUM3QixPQUFPLFlBQUE7NEJBVVMsT0FWSCw2QkFBNkI7MkJBQTRCOzs7b0JBRzFFLFNBQVMsU0FBUyxZQUFNO3dCQUNwQixTQUFTLFVBQVUsUUFBUSxPQUFPOzRCQUM5Qjs0QkFDQSw2QkFBNkIseUJBQXlCOzRCQUN0RCxPQUFPOzRCQUNQLE9BQU8sUUFBUSxNQUFNOzRCQUNyQixJQUFJLFlBQVksUUFBUSxLQUFLLE1BQU0sYUFBYTs0QkFDaEQsT0FBTyxVQUFVLFFB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LE9BQU8sUUFBUSxLQUFLLE1BQU0sYUFBYSxLQUFLO3dCQUNoRCxPQUFPLEtBQUssT0FBTyxLQUFLLE9BQU8sZ0JBQWdCLE9BQU87Ozs7OztHQXVCL0QiLCJmaWxlIjoicG9saWN5VmlvbGF0aW9uL2RpYWxvZy9Qb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcG9saWN5VmlvbGF0aW9uRGlhbG9nTW9kdWxlIGZyb20gJ3BvbGljeVZpb2xhdGlvbi9kaWFsb2cvUG9saWN5VmlvbGF0aW9uRGlhbG9nTW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcblxuZGVzY3JpYmUoJ3BvbGljeVZpb2xhdGlvbkRpYWxvZ1NlcnZpY2UnLCAoKSA9PiB7XG4gICAgbGV0IHBvbGljeVZpb2xhdGlvbkRpYWxvZ1NlcnZpY2UsIHNwTW9kYWwsICRxLCAkc2NvcGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwb2xpY3lWaW9sYXRpb25EaWFsb2dNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZV8sIF9zcE1vZGFsXywgXyRxXywgJHJvb3RTY29wZSkgPT4ge1xuICAgICAgICBwb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlID0gX3BvbGljeVZpb2xhdGlvbkRpYWxvZ1NlcnZpY2VfO1xuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIHNldHVwTW9kYWwocmVzdWx0KSB7XG4gICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcbiAgICAgICAgICAgIHJlc3VsdDogJHEud2hlbihyZXN1bHQpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdzaG93QWxsb3dFeGNlcHRpb25EaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChzcFRyYW5zbGF0ZUZpbHRlcikgPT4ge1xuICAgICAgICAgICAgLy8gU2V0dXAgdGhlIHRlc3QgY2F0YWxvZy5cbiAgICAgICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmNvbmZpZ3VyZUNhdGFsb2coe1xuICAgICAgICAgICAgICAgICd1aV9hbGxvd19leGNlcHRpb25fZGlhbG9nX2l0ZW1zJzogJ0l0ZW1zOiB7MH0nLFxuICAgICAgICAgICAgICAgICd1aV9hbGxvd19leGNlcHRpb25fZGlhbG9nX3RpdGxlJzogJ1RpdGxlIHswfSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gY29uZmlnJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHBvbGljeVZpb2xhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nKCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3RpdGxlJywgKCkgPT4ge1xuICAgICAgICAgICAgZnVuY3Rpb24gdGVzdFRpdGxlKGNvbmZpZywgdGl0bGUpIHtcbiAgICAgICAgICAgICAgICBzZXR1cE1vZGFsKCk7XG4gICAgICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZS5zaG93QWxsb3dFeGNlcHRpb25EaWFsb2coY29uZmlnKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGxldCBtb2RhbEFyZ3MgPSBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG1vZGFsQXJncy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICAgICAgbGV0IG1vZGFsQ29uZmlnID0gbW9kYWxBcmdzWzBdO1xuICAgICAgICAgICAgICAgIGV4cGVjdChtb2RhbENvbmZpZy50aXRsZSkudG9FcXVhbCh0aXRsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0KCd1c2VzIHRoZSB0aXRsZSBpbiB0aGUgY29uZmlnIGlmIHNldCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdGl0bGUgPSAnaGVsbG8gdGhpcyBpcyB0aGUgdGl0bGUnO1xuICAgICAgICAgICAgICAgIHRlc3RUaXRsZSh7dGl0bGU6IHRpdGxlfSwgdGl0bGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCd1c2VzIHRoZSBkaXNwbGF5TmFtZSBpbiB0aXRsZSBzdHJpbmcgaWYgc2V0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkaXNwbGF5TmFtZSA9ICdWaW9sYXRpb24xJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSAnVGl0bGUgJyArIGRpc3BsYXlOYW1lO1xuICAgICAgICAgICAgICAgIHRlc3RUaXRsZSh7ZGlzcGxheU5hbWU6IGRpc3BsYXlOYW1lfSwgdGl0bGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCd1c2VzIGJ1bGsgY291bnQgc3RyaW5nIGlmIGJ1bGtDb3VudCBpcyBzZXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJ1bGtDb3VudCA9IDE1LFxuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9ICdUaXRsZSBJdGVtczogJyArIGJ1bGtDb3VudDtcbiAgICAgICAgICAgICAgICB0ZXN0VGl0bGUoe2J1bGtDb3VudDogYnVsa0NvdW50fSwgdGl0bGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYWxscyBzcE1vZGFsLm9wZW4gd2l0aCBjb3JyZWN0IHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgc2hvd0V4cGlyYXRpb25EYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGV4cGlyYXRpb25EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIG1heGltdW1FeHBpcmF0aW9uRGF0ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBtaW5pbXVtRXhwaXJhdGlvbkRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgY29tbWVudHM6ICdoZWxsbycsXG4gICAgICAgICAgICAgICAgcmVxdWlyZUNvbW1lbnRzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2V0dXBNb2RhbCgpO1xuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZS5zaG93QWxsb3dFeGNlcHRpb25EaWFsb2coY29uZmlnKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgbGV0IG1vZGFsQXJncyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEFyZ3MubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgbGV0IG1vZGFsQ29uZmlnID0gbW9kYWxBcmdzWzBdO1xuXG4gICAgICAgICAgICBleHBlY3QobW9kYWxDb25maWcucmVzb2x2ZS5leHBpcmF0aW9uRGF0ZSgpKS50b0VxdWFsKGNvbmZpZy5leHBpcmF0aW9uRGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QobW9kYWxDb25maWcucmVzb2x2ZS5taW5EYXRlKCkpLnRvRXF1YWwoY29uZmlnLm1pbmltdW1FeHBpcmF0aW9uRGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QobW9kYWxDb25maWcucmVzb2x2ZS5tYXhEYXRlKCkpLnRvRXF1YWwoY29uZmlnLm1heGltdW1FeHBpcmF0aW9uRGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QobW9kYWxDb25maWcucmVzb2x2ZS5zaG93RXhwaXJhdGlvbkRhdGUoKSkudG9FcXVhbChjb25maWcuc2hvd0V4cGlyYXRpb25EYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbENvbmZpZy5yZXNvbHZlLnJlcXVpcmVDb21tZW50cygpKS50b0VxdWFsKGNvbmZpZy5yZXF1aXJlQ29tbWVudHMpO1xuICAgICAgICAgICAgZXhwZWN0KG1vZGFsQ29uZmlnLnJlc29sdmUuY29tbWVudHMoKSkudG9FcXVhbChjb25maWcuY29tbWVudHMpO1xuICAgICAgICAgICAgZXhwZWN0KG1vZGFsQ29uZmlnLnJlc29sdmUucmVhZE9ubHkoKSkudG9FcXVhbChjb25maWcucmVhZE9ubHkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCByZXN1bHQgb2YgbW9kYWwnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIGV4cGlyYXRpb25EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiAnd2hhdGV2ZXInXG4gICAgICAgICAgICB9LCByZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgIHNldHVwTW9kYWwocmVzdWx0KTtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nKHt9KS50aGVuKCh2YWwpID0+IHJldHVyblZhbHVlID0gdmFsKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXR1cm5WYWx1ZSkudG9FcXVhbChyZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93RGV0YWlsc0RpYWxvZycsICgpID0+IHtcblxuICAgICAgICBpdCgncHVrZXMgd2l0aCBubyBjb25maWcnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZS5zaG93RGV0YWlsc0RpYWxvZygpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdwdWtlcyB3aXRoIG5vIHBvbGljeSB2aW9sYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZS5zaG93RGV0YWlsc0RpYWxvZyh7fSkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIHBvbGljeVZpb2xhdGlvbiBkZXRhaWxzIGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJyk7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgICAgICBydWxlOiAnaSBhbSBhIHJ1bGUnLFxuICAgICAgICAgICAgICAgICAgICBwb2xpY3k6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzb21lIHBvbGljeSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dEZXRhaWxzRGlhbG9nKGNvbmZpZyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGxldCBhcmdzID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xuICAgICAgICAgICAgZXhwZWN0KGFyZ3MucmVzb2x2ZS5wb2xpY3lWaW9sYXRpb24oKSkudG9CZShjb25maWcucG9saWN5VmlvbGF0aW9uKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBpdCgnc2V0cyB0aGUgdGl0bGUgdG8gdGhlIHZpb2xhdGlvbiBydWxlIGlmIGRlZmluZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKTtcbiAgICAgICAgICAgIGxldCBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgICAgIHJ1bGU6ICdpIGFtIGEgcnVsZScsXG4gICAgICAgICAgICAgICAgICAgIHBvbGljeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3NvbWUgcG9saWN5J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0RldGFpbHNEaWFsb2coY29uZmlnKTtcbiAgICAgICAgICAgIGxldCBhcmdzID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xuICAgICAgICAgICAgZXhwZWN0KGFyZ3MudGl0bGUpLnRvQmUoY29uZmlnLnBvbGljeVZpb2xhdGlvbi5ydWxlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIHRpdGxlIHRvIHRoZSB2aW9sYXRpb24gcG9saWN5IG5hbWUgaWYgcnVsZSBub3QgZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJyk7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgICAgICBwb2xpY3k6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzb21lIHBvbGljeSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dEZXRhaWxzRGlhbG9nKGNvbmZpZyk7XG4gICAgICAgICAgICBsZXQgYXJncyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXTtcbiAgICAgICAgICAgIGV4cGVjdChhcmdzLnRpdGxlKS50b0JlKGNvbmZpZy5wb2xpY3lWaW9sYXRpb24ucG9saWN5Lm5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
