/* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */

Ext.ns('SailPoint',
       'SailPoint.Quicklinks');

SailPoint.Quicklinks.CREATE_IDENTITY = 'Create Identity';

SailPoint.Quicklinks.chooseQuickLink = function(action, identityId) {

    if (action != SailPoint.Quicklinks.CREATE_IDENTITY) {
        if (identityId) {
            document.getElementById('quickLinksForm:identityId').value = identityId;
        } else {
            /** This is a request for others -- need to see if we have any requestees first **/
            var requestees = parseInt(Ext.getDom('requesteeCount').innerHTML);
            if (requestees === 0) {
                Ext.MessageBox.alert('#{msgs.my_subordinates_no_requestess_title}', '#{msgs.my_subordinates_no_requestees_msg}');
                return;
            }
            document.getElementById('quickLinksForm:identityId').value = '';
        }
    }

    document.getElementById('quickLinksForm:quickLink').value = action;
    document.getElementById('quickLinksForm:chooseQuickLinkBtn').click();
};

SailPoint.Quicklinks.chooseDashboard = function(dashboardType) {
    document.getElementById('quickLinksForm:dashType').value = dashboardType;
    document.getElementById('quickLinksForm:changeDashTypeBtn').click();
};

Ext.onReady(function() {
    var quicklinkPanel = jQuery('.quicklink-panel');

    /**
     * Get the visible links in the quicklink panel
     * @returns JQuery object
     */
    function getVisibleLinks() {
        return quicklinkPanel.find('a:visible[role="listitem"],a:visible[role="tab"]');
    }

    /**
     * Handles the escape key for the quicklink panel by collapsing the panel, unless
     * we are in a submenu
     * @param event Keydown Event
     * @returns {boolean} True if the event was handled, otherwise false
     */
    function handleEscapeKey(event) {
        var isHandled = false,
            items = quicklinkPanel.find('.dropdown-submenu .dropdown-menu a:visible'),
            index = items.index(event.target);

        // If we aren't in one of our submenus, then collapse the panel
        if (index === -1) {
            event.stopPropagation();
            event.preventDefault();
            quicklinkPanel.collapse('hide');
            jQuery('#quicklinkButton').focus();
            isHandled = true;
        }

        return isHandled;
    }

    /**
     * Handle the tab key for the quicklink panel when entering or leaving the panel
     * @param event Keydown Event
     * @returns {boolean}
     */
    function handleTabKey(event) {
        var isHandled = false,
            items = getVisibleLinks(),
            index = items.index(event.target);

        // Tab from bottom of panel should go to next menu item
        if (!event.shiftKey && index === items.length -1) {
            jQuery('.quicklink-button').parent().next().children('a').focus();
            isHandled = true;
        }
        // Shift + tab from top of panel should go to quicklink button
        else if (event.shiftKey && index === 0) {
            jQuery('.quicklink-button').focus();
            isHandled = true;
        }

        return isHandled;
    }

    /**
     * Handle the up/down keys for the quicklink panel by navigating visible links
     * @param event Keydown Event
     * @returns {boolean}
     */
    function handleArrowKey(event) {
        var isHandled = false,
            items = getVisibleLinks(),
            index = items.index(event.target);
        if (index !== -1) {
            if (event.which === 38 && index > 0) {
                // Up arrow
                index--;
            }
            if (event.which === 40 && index < items.length - 1){
                // Down arrow
                index++;
            }
            items[index].focus();
            isHandled = true;
        }

        return isHandled;

    }

    quicklinkPanel
        // Focus on first link when collapse is shown
        .on('shown.bs.collapse', function(event) {
            jQuery(event.target).find('li:first-child a').focus();
        })
        .keydown(function(event) {
            var isHandled = false;
            if (event.which === 27) {
                isHandled = handleEscapeKey(event);
            } else if (event.which === 9) {
                isHandled = handleTabKey(event);
            } else if (event.which === 38 || event.which === 40) {
                isHandled = handleArrowKey(event);
            }

            // If our event was handled, stop anything else from happening
            if (isHandled) {
                event.stopPropagation();
                event.preventDefault();
            }
        })
        // Focus on first link in submenu when opened
        .find('li.dropdown-submenu').on('shown.bs.dropdown', function(event) {
            jQuery(event.target).find('li:first-child a').focus();
        });

    jQuery('.quicklink-button')
        // Focus on first item when tabbing from dropdown button
        // Also open quicklink panel with down arrow to match other menus
        .keydown(function(event) {
            var isHandled = false,
                items;
            // Shift + tab
            if (event.which === 9 && !event.shiftKey) {
                if (quicklinkPanel.hasClass('in')) {
                    items = quicklinkPanel.find('a:visible[role="listitem"],a:visible[role="tab"]');
                    if (items) {
                        items[0].focus();
                        isHandled = true;
                    }
                }
            }
            // Down arrow
            else if (event.which === 40) {
                if (!quicklinkPanel.hasClass('in')) {
                    quicklinkPanel.collapse('show');
                    isHandled = true;
                }
            }

            if (isHandled) {
                event.stopPropagation();
                event.preventDefault();
            }
        })
        // Focus on end of panel if shift+tabbing from next menu item
        .parent().next().children('a').keydown(function(event) {
            var items;
            if (event.which === 9 && event.shiftKey) {
                if (quicklinkPanel.hasClass('in')) {
                    event.stopPropagation();
                    event.preventDefault();
                    items = quicklinkPanel.find('a:visible[role="listitem"],a:visible[role="tab"]');
                    if (items) {
                        items[items.length-1].focus();
                    }
                }
            }
        });

});
