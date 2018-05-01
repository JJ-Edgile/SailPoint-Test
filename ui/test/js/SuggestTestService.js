System.register([], function (_export) {
    'use strict';

    function SuggestTestService($timeout) {
        var service = {};

        service.getMultiSuggestScope = function (suggest) {
            return suggest.scope().$$childHead;
        };

        /**
         * Cause a search to happen by typing in the given query.
         */
        service.searchByTyping = function (element, query, scope) {
            var inputEl = element.find('input');
            inputEl.val(query);
            inputEl.trigger('change');
            scope.$digest();
            $timeout.flush();
        };

        /**
         * Click the dropdown arrow for the given suggest element.
         */
        service.clickDropdownArrow = function (element, scope) {
            var btn = element.find('button').first(),
                wasMenuOpen = this.getDropdown(element).length === 1;
            btn.click();
            scope.$digest();
            if (!wasMenuOpen) {
                $timeout.flush();
            }
        };

        /**
         * Return the dropdown element.
         */
        service.getDropdown = function (element) {
            return element.find('ul.dropdown-menu');
        };

        /**
         * @return true if dropdown is open, otherwise false
         */
        service.isDropdownOpen = function (element) {
            var dropdown = this.getDropdown(element);
            return dropdown && !dropdown.hasClass('ng-hide');
        };

        /**
         * Return a list of the suggest item elements.
         */
        service.getSuggestItems = function (element, scope) {
            if (!this.isDropdownOpen(element)) {
                this.clickDropdownArrow(element, scope);
            }
            return this.getDropdown(element).find('li');
        };

        /**
         * Return the if any items are in the drop down.
         */
        service.hasSuggestItems = function (el, scope) {
            var firstItem;
            firstItem = this.getSuggestItems(el, scope)[0];
            return angular.element(firstItem).first().nodeName === 'DIV';
        };

        /**
         * Return the requested suggest item by first showing the dropdown and then
         * searching for it.
         */
        service.getSuggestItem = function (el, idx, scope) {
            if (!this.isDropdownOpen(el)) {
                this.clickDropdownArrow(el, scope);
            }
            return angular.element(this.getSuggestItems(el, scope)[idx]);
        };

        /**
         * Select the requested item.
         */
        service.selectSuggestItem = function (el, idx, scope) {
            var item = this.getSuggestItem(el, idx, scope);
            item.click();
            scope.$digest();
        };

        return service;
    }

    return {
        setters: [],
        execute: function () {
            _export('default', SuggestTestService);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN1Z2dlc3RUZXN0U2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsSUFBSSxVQUFVLFNBQVM7SUFBdkM7O0lBRUEsU0FBUyxtQkFBbUIsVUFBVTtRQUNsQyxJQUFJLFVBQVU7O1FBRWQsUUFBUSx1QkFBdUIsVUFBUyxTQUFTO1lBQzdDLE9BQU8sUUFBUSxRQUFROzs7Ozs7UUFNM0IsUUFBUSxpQkFBaUIsVUFBUyxTQUFTLE9BQU8sT0FBTztZQUNyRCxJQUFJLFVBQVUsUUFBUSxLQUFLO1lBQzNCLFFBQVEsSUFBSTtZQUNaLFFBQVEsUUFBUTtZQUNoQixNQUFNO1lBQ04sU0FBUzs7Ozs7O1FBTWIsUUFBUSxxQkFBcUIsVUFBUyxTQUFTLE9BQU87WUFDbEQsSUFBSSxNQUFNLFFBQVEsS0FBSyxVQUFVO2dCQUM3QixjQUFjLEtBQUssWUFBWSxTQUFTLFdBQVc7WUFDdkQsSUFBSTtZQUNKLE1BQU07WUFDTixJQUFJLENBQUMsYUFBYTtnQkFDZCxTQUFTOzs7Ozs7O1FBT2pCLFFBQVEsY0FBYyxVQUFTLFNBQVM7WUFDcEMsT0FBTyxRQUFRLEtBQUs7Ozs7OztRQU14QixRQUFRLGlCQUFpQixVQUFTLFNBQVM7WUFDdkMsSUFBSSxXQUFXLEtBQUssWUFBWTtZQUNoQyxPQUFRLFlBQVksQ0FBQyxTQUFTLFNBQVM7Ozs7OztRQU0zQyxRQUFRLGtCQUFrQixVQUFTLFNBQVMsT0FBTztZQUMvQyxJQUFJLENBQUMsS0FBSyxlQUFlLFVBQVU7Z0JBQy9CLEtBQUssbUJBQW1CLFNBQVM7O1lBRXJDLE9BQU8sS0FBSyxZQUFZLFNBQVMsS0FBSzs7Ozs7O1FBTTFDLFFBQVEsa0JBQWtCLFVBQVMsSUFBSSxPQUFPO1lBQzFDLElBQUk7WUFDSixZQUFZLEtBQUssZ0JBQWdCLElBQUksT0FBTztZQUM1QyxPQUFPLFFBQVEsUUFBUSxXQUFXLFFBQVEsYUFBYTs7Ozs7OztRQU8zRCxRQUFRLGlCQUFpQixVQUFTLElBQUksS0FBSyxPQUFPO1lBQzlDLElBQUksQ0FBQyxLQUFLLGVBQWUsS0FBSztnQkFDMUIsS0FBSyxtQkFBbUIsSUFBSTs7WUFFaEMsT0FBTyxRQUFRLFFBQVEsS0FBSyxnQkFBZ0IsSUFBSSxPQUFPOzs7Ozs7UUFNM0QsUUFBUSxvQkFBb0IsVUFBUyxJQUFJLEtBQUssT0FBTztZQUNqRCxJQUFJLE9BQU8sS0FBSyxlQUFlLElBQUksS0FBSztZQUN4QyxLQUFLO1lBQ0wsTUFBTTs7O1FBR1YsT0FBTzs7O0lBSVAsT0FBTztRQUNILFNBQVM7UUFDVCxTQUFTLFlBQVk7WUFDakIsUUFBUSxXQUhMOzs7R0FNWiIsImZpbGUiOiJTdWdnZXN0VGVzdFNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFN1Z2dlc3RUZXN0U2VydmljZSgkdGltZW91dCkge1xuICAgIHZhciBzZXJ2aWNlID0ge307XG5cbiAgICBzZXJ2aWNlLmdldE11bHRpU3VnZ2VzdFNjb3BlID0gZnVuY3Rpb24oc3VnZ2VzdCkge1xuICAgICAgICByZXR1cm4gc3VnZ2VzdC5zY29wZSgpLiQkY2hpbGRIZWFkO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYXVzZSBhIHNlYXJjaCB0byBoYXBwZW4gYnkgdHlwaW5nIGluIHRoZSBnaXZlbiBxdWVyeS5cbiAgICAgKi9cbiAgICBzZXJ2aWNlLnNlYXJjaEJ5VHlwaW5nID0gZnVuY3Rpb24oZWxlbWVudCwgcXVlcnksIHNjb3BlKSB7XG4gICAgICAgIHZhciBpbnB1dEVsID0gZWxlbWVudC5maW5kKCdpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsLnZhbChxdWVyeSk7XG4gICAgICAgIGlucHV0RWwudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xpY2sgdGhlIGRyb3Bkb3duIGFycm93IGZvciB0aGUgZ2l2ZW4gc3VnZ2VzdCBlbGVtZW50LlxuICAgICAqL1xuICAgIHNlcnZpY2UuY2xpY2tEcm9wZG93bkFycm93ID0gZnVuY3Rpb24oZWxlbWVudCwgc2NvcGUpIHtcbiAgICAgICAgdmFyIGJ0biA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJykuZmlyc3QoKSxcbiAgICAgICAgICAgIHdhc01lbnVPcGVuID0gdGhpcy5nZXREcm9wZG93bihlbGVtZW50KS5sZW5ndGggPT09IDE7XG4gICAgICAgIGJ0bi5jbGljaygpO1xuICAgICAgICBzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIGlmICghd2FzTWVudU9wZW4pIHtcbiAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBkcm9wZG93biBlbGVtZW50LlxuICAgICAqL1xuICAgIHNlcnZpY2UuZ2V0RHJvcGRvd24gPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmZpbmQoJ3VsLmRyb3Bkb3duLW1lbnUnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB0cnVlIGlmIGRyb3Bkb3duIGlzIG9wZW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIHNlcnZpY2UuaXNEcm9wZG93bk9wZW4gPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHZhciBkcm9wZG93biA9IHRoaXMuZ2V0RHJvcGRvd24oZWxlbWVudCk7XG4gICAgICAgIHJldHVybiAoZHJvcGRvd24gJiYgIWRyb3Bkb3duLmhhc0NsYXNzKCduZy1oaWRlJykpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9mIHRoZSBzdWdnZXN0IGl0ZW0gZWxlbWVudHMuXG4gICAgICovXG4gICAgc2VydmljZS5nZXRTdWdnZXN0SXRlbXMgPSBmdW5jdGlvbihlbGVtZW50LCBzY29wZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEcm9wZG93bk9wZW4oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tEcm9wZG93bkFycm93KGVsZW1lbnQsIHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXREcm9wZG93bihlbGVtZW50KS5maW5kKCdsaScpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGlmIGFueSBpdGVtcyBhcmUgaW4gdGhlIGRyb3AgZG93bi5cbiAgICAgKi9cbiAgICBzZXJ2aWNlLmhhc1N1Z2dlc3RJdGVtcyA9IGZ1bmN0aW9uKGVsLCBzY29wZSkge1xuICAgICAgICB2YXIgZmlyc3RJdGVtO1xuICAgICAgICBmaXJzdEl0ZW0gPSB0aGlzLmdldFN1Z2dlc3RJdGVtcyhlbCwgc2NvcGUpWzBdO1xuICAgICAgICByZXR1cm4gYW5ndWxhci5lbGVtZW50KGZpcnN0SXRlbSkuZmlyc3QoKS5ub2RlTmFtZSA9PT0gJ0RJVic7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgcmVxdWVzdGVkIHN1Z2dlc3QgaXRlbSBieSBmaXJzdCBzaG93aW5nIHRoZSBkcm9wZG93biBhbmQgdGhlblxuICAgICAqIHNlYXJjaGluZyBmb3IgaXQuXG4gICAgICovXG4gICAgc2VydmljZS5nZXRTdWdnZXN0SXRlbSA9IGZ1bmN0aW9uKGVsLCBpZHgsIHNjb3BlKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Ryb3Bkb3duT3BlbihlbCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tEcm9wZG93bkFycm93KGVsLCBzY29wZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudCh0aGlzLmdldFN1Z2dlc3RJdGVtcyhlbCwgc2NvcGUpW2lkeF0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgdGhlIHJlcXVlc3RlZCBpdGVtLlxuICAgICAqL1xuICAgIHNlcnZpY2Uuc2VsZWN0U3VnZ2VzdEl0ZW0gPSBmdW5jdGlvbihlbCwgaWR4LCBzY29wZSkge1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZ2V0U3VnZ2VzdEl0ZW0oZWwsIGlkeCwgc2NvcGUpO1xuICAgICAgICBpdGVtLmNsaWNrKCk7XG4gICAgICAgIHNjb3BlLiRkaWdlc3QoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlcnZpY2U7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3VnZ2VzdFRlc3RTZXJ2aWNlO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
