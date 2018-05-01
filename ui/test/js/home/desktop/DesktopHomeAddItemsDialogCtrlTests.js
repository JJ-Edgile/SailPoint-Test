System.register(['test/js/TestInitializer', 'home/desktop/DesktopHomeModule'], function (_export) {
    'use strict';

    var desktopHomeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeDesktopDesktopHomeModule) {
            desktopHomeModule = _homeDesktopDesktopHomeModule['default'];
        }],
        execute: function () {

            describe('DesktopHomeAddItemsDialogCtrl', function () {

                var allItems = [{
                    name: 'Card 1',
                    title: 'Card One'
                }, {
                    name: 'Card 2',
                    title: 'Card Two'
                }, {
                    name: 'Card 3',
                    title: 'Card Three'
                }, {
                    name: 'Card 4',
                    title: 'Card Four'
                }],
                    currentItems = [{
                    name: 'Card 1',
                    title: 'Card One'
                }, {
                    name: 'Card 3',
                    title: 'Card Three'
                }],
                    allItemsPromiseMethod,
                    $uibModalInstance,
                    dialogCtrl;

                beforeEach(module(desktopHomeModule));

                beforeEach(inject(function ($controller, $q, $rootScope) {
                    allItemsPromiseMethod = jasmine.createSpy().and.returnValue($q.when(allItems));
                    $uibModalInstance = {
                        close: jasmine.createSpy()
                    };

                    dialogCtrl = $controller('DesktopHomeAddItemsDialogCtrl', {
                        currentItems: currentItems,
                        allItemsPromise: allItemsPromiseMethod,
                        labelProperty: 'title',
                        $uibModalInstance: $uibModalInstance
                    });

                    $rootScope.$apply();
                }));

                it('loads all items and filters out available ones', function () {
                    var expectedAvailableItems = [{
                        item: allItems[1],
                        selected: false
                    }, {
                        item: allItems[3],
                        selected: false
                    }];
                    expect(allItemsPromiseMethod).toHaveBeenCalledWith(true);
                    expect(dialogCtrl.availableItems).toEqual(expectedAvailableItems);
                });

                it('resolves with selected items', function () {
                    var expectedResolve = [allItems[3]];
                    dialogCtrl.availableItems[1].selected = true;
                    dialogCtrl.complete();
                    expect($uibModalInstance.close).toHaveBeenCalledWith(expectedResolve);
                });

                describe('hasAvailableItems()', function () {
                    it('returns true if there are available items', function () {
                        expect(dialogCtrl.hasAvailableItems()).toEqual(true);
                    });

                    it('returns false if there are no available cards', function () {
                        dialogCtrl.availableItems = [];
                        expect(dialogCtrl.hasAvailableItems()).toEqual(false);
                    });
                });

                describe('getLabel()', function () {
                    it('gets the property off the item', function () {
                        expect(dialogCtrl.getLabel(allItems[0])).toEqual('Card One');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvZGVza3RvcC9EZXNrdG9wSG9tZUFkZEl0ZW1zRGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixtQ0FBbUMsVUFBVSxTQUFTO0lBQWxHOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwrQkFBK0I7WUFDckYsb0JBQW9CLDhCQUE4Qjs7UUFFdEQsU0FBUyxZQUFZOztZQUg3QixTQUFTLGlDQUFpQyxZQUFXOztnQkFFakQsSUFBSSxXQUFXLENBQUM7b0JBQ1osTUFBTTtvQkFDTixPQUFPO21CQUNSO29CQUNDLE1BQU07b0JBQ04sT0FBTzttQkFDVDtvQkFDRSxNQUFNO29CQUNOLE9BQU87bUJBQ1I7b0JBQ0MsTUFBTTtvQkFDTixPQUFPOztvQkFDUCxlQUFlLENBQUM7b0JBQ2hCLE1BQU07b0JBQ04sT0FBTzttQkFDUjtvQkFDQyxNQUFNO29CQUNOLE9BQU87O29CQUNQO29CQUF1QjtvQkFBbUI7O2dCQUU5QyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxhQUFhLElBQUksWUFBWTtvQkFDcEQsd0JBQXdCLFFBQVEsWUFBWSxJQUFJLFlBQVksR0FBRyxLQUFLO29CQUNwRSxvQkFBb0I7d0JBQ2hCLE9BQU8sUUFBUTs7O29CQUduQixhQUFhLFlBQVksaUNBQWlDO3dCQUN0RCxjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixtQkFBbUI7OztvQkFHdkIsV0FBVzs7O2dCQUdmLEdBQUcsa0RBQWtELFlBQVc7b0JBQzVELElBQUkseUJBQXlCLENBQUM7d0JBQzFCLE1BQU0sU0FBUzt3QkFDZixVQUFVO3VCQUNaO3dCQUNFLE1BQU0sU0FBUzt3QkFDZixVQUFVOztvQkFFZCxPQUFPLHVCQUF1QixxQkFBcUI7b0JBQ25ELE9BQU8sV0FBVyxnQkFBZ0IsUUFBUTs7O2dCQUc5QyxHQUFHLGdDQUFnQyxZQUFXO29CQUMxQyxJQUFJLGtCQUFrQixDQUFDLFNBQVM7b0JBQ2hDLFdBQVcsZUFBZSxHQUFHLFdBQVc7b0JBQ3hDLFdBQVc7b0JBQ1gsT0FBTyxrQkFBa0IsT0FBTyxxQkFBcUI7OztnQkFHekQsU0FBUyx1QkFBdUIsWUFBVztvQkFDdkMsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsT0FBTyxXQUFXLHFCQUFxQixRQUFROzs7b0JBR25ELEdBQUcsaURBQWlELFlBQVc7d0JBQzNELFdBQVcsaUJBQWlCO3dCQUM1QixPQUFPLFdBQVcscUJBQXFCLFFBQVE7Ozs7Z0JBSXZELFNBQVMsY0FBYyxZQUFXO29CQUM5QixHQUFHLGtDQUFrQyxZQUFXO3dCQUM1QyxPQUFPLFdBQVcsU0FBUyxTQUFTLEtBQUssUUFBUTs7Ozs7O0dBZTFEIiwiZmlsZSI6ImhvbWUvZGVza3RvcC9EZXNrdG9wSG9tZUFkZEl0ZW1zRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBkZXNrdG9wSG9tZU1vZHVsZSBmcm9tICdob21lL2Rlc2t0b3AvRGVza3RvcEhvbWVNb2R1bGUnO1xuXG5kZXNjcmliZSgnRGVza3RvcEhvbWVBZGRJdGVtc0RpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBhbGxJdGVtcyA9IFt7XG4gICAgICAgIG5hbWU6ICdDYXJkIDEnLFxuICAgICAgICB0aXRsZTogJ0NhcmQgT25lJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ0NhcmQgMicsXG4gICAgICAgIHRpdGxlOiAnQ2FyZCBUd28nXG4gICAgfSx7XG4gICAgICAgIG5hbWU6ICdDYXJkIDMnLFxuICAgICAgICB0aXRsZTogJ0NhcmQgVGhyZWUnXG4gICAgfSwge1xuICAgICAgICBuYW1lOiAnQ2FyZCA0JyxcbiAgICAgICAgdGl0bGU6ICdDYXJkIEZvdXInXG4gICAgfV0sIGN1cnJlbnRJdGVtcyA9IFt7XG4gICAgICAgIG5hbWU6ICdDYXJkIDEnLFxuICAgICAgICB0aXRsZTogJ0NhcmQgT25lJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ0NhcmQgMycsXG4gICAgICAgIHRpdGxlOiAnQ2FyZCBUaHJlZSdcbiAgICB9XSwgYWxsSXRlbXNQcm9taXNlTWV0aG9kLCAkdWliTW9kYWxJbnN0YW5jZSwgZGlhbG9nQ3RybDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRlc2t0b3BIb21lTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkY29udHJvbGxlciwgJHEsICRyb290U2NvcGUpIHtcbiAgICAgICAgYWxsSXRlbXNQcm9taXNlTWV0aG9kID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihhbGxJdGVtcykpO1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZSA9IHtcbiAgICAgICAgICAgIGNsb3NlOiBqYXNtaW5lLmNyZWF0ZVNweSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgZGlhbG9nQ3RybCA9ICRjb250cm9sbGVyKCdEZXNrdG9wSG9tZUFkZEl0ZW1zRGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtczogY3VycmVudEl0ZW1zLFxuICAgICAgICAgICAgYWxsSXRlbXNQcm9taXNlOiBhbGxJdGVtc1Byb21pc2VNZXRob2QsXG4gICAgICAgICAgICBsYWJlbFByb3BlcnR5OiAndGl0bGUnLFxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2U6ICR1aWJNb2RhbEluc3RhbmNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ2xvYWRzIGFsbCBpdGVtcyBhbmQgZmlsdGVycyBvdXQgYXZhaWxhYmxlIG9uZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQXZhaWxhYmxlSXRlbXMgPSBbe1xuICAgICAgICAgICAgaXRlbTogYWxsSXRlbXNbMV0sXG4gICAgICAgICAgICBzZWxlY3RlZDogZmFsc2VcbiAgICAgICAgfSx7XG4gICAgICAgICAgICBpdGVtOiBhbGxJdGVtc1szXSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZVxuICAgICAgICB9XTtcbiAgICAgICAgZXhwZWN0KGFsbEl0ZW1zUHJvbWlzZU1ldGhvZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChkaWFsb2dDdHJsLmF2YWlsYWJsZUl0ZW1zKS50b0VxdWFsKGV4cGVjdGVkQXZhaWxhYmxlSXRlbXMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Jlc29sdmVzIHdpdGggc2VsZWN0ZWQgaXRlbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkUmVzb2x2ZSA9IFthbGxJdGVtc1szXV07XG4gICAgICAgIGRpYWxvZ0N0cmwuYXZhaWxhYmxlSXRlbXNbMV0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICBkaWFsb2dDdHJsLmNvbXBsZXRlKCk7XG4gICAgICAgIGV4cGVjdCgkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoZXhwZWN0ZWRSZXNvbHZlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNBdmFpbGFibGVJdGVtcygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIGF2YWlsYWJsZSBpdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGRpYWxvZ0N0cmwuaGFzQXZhaWxhYmxlSXRlbXMoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgYXJlIG5vIGF2YWlsYWJsZSBjYXJkcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGlhbG9nQ3RybC5hdmFpbGFibGVJdGVtcyA9IFtdO1xuICAgICAgICAgICAgZXhwZWN0KGRpYWxvZ0N0cmwuaGFzQXZhaWxhYmxlSXRlbXMoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldExhYmVsKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2dldHMgdGhlIHByb3BlcnR5IG9mZiB0aGUgaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGRpYWxvZ0N0cmwuZ2V0TGFiZWwoYWxsSXRlbXNbMF0pKS50b0VxdWFsKCdDYXJkIE9uZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
