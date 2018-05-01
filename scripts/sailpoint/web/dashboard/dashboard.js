/* (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved. */

Ext.ns('SailPoint',
    'SailPoint.Dashboard');

//Global Variables
SailPoint.Dashboard.expanderLock = false;
SailPoint.Dashboard.removerLock = false;
SailPoint.Dashboard.undoLock = false;
SailPoint.Dashboard.sortableState = [];
SailPoint.Dashboard.slideOutConfig = {
    remove: true,
    useDisplay: true
};

function slideOutUndo() {
    Ext.defer(function() {
        Ext.get('undoDiv').slideOut('t', {
            remove: false,
            useDisplay: true
        });
    }, 100);
}


SailPoint.Dashboard.initializeDashboard = function() {
    var portlets = Ext.DomQuery.select('div[class*=dashContentPanel]');

    Ext.each(portlets, function (portlet) {
        var expander = Ext.DomQuery.select('img[class=dashContentExpandBtn]', portlet)[0];
        var remover = Ext.DomQuery.select('img[class*=dashContentRemoveBtn]', portlet)[0];

        Ext.get(expander).on('click',
            function (e) {
                //Uses a lock so that a user can't press it several times.
                if(!SailPoint.Dashboard.expanderLock) {
                    SailPoint.Dashboard.expanderLock = true;
                    var referenceId = (expander.id.split("_"))[1];

                    if(Ext.getDom(referenceId + '_outerBody'))
                    {
                        expander.src = SailPoint.getRelativeUrl("/images/icons/plus.png");
                    }
                    else
                    {
                        expander.src = SailPoint.getRelativeUrl("/images/icons/minus.png");
                    }

                    Ext.getDom('dashboardForm:contentId').value = portlet.id;
                    Ext.getDom('dashboardForm:contentBodyBtn_' + referenceId).click();

                    if(Ext.fly('undoDiv').isVisible()) {
                        slideOutUndo();
                    }

                    SailPoint.Dashboard.expanderLock = false;
                } else {
                    SailPoint.Dashboard.expanderLock = false;
                }
            },
            false
        );

        if(remover && !Ext.fly(remover).hasCls('required')) {
            Ext.get(remover).on('click',
                function (e) {
                    //Uses a lock so that a user can't press it several times.
                    if(!SailPoint.Dashboard.removerLock) {
                        SailPoint.Dashboard.removerLock = true;
                        Ext.getDom('dashboardForm:contentId').value = portlet.id;
                        Ext.getDom('dashboardForm:removeButton').click();

                        Ext.getDom('undoDiv').style.display='';
                        Ext.defer(function() {Ext.get(portlet).slideOut('t', SailPoint.Dashboard.slideOutConfig)}, 250);
                        setTimeout(function() {SailPoint.Dashboard.removerLock = false;}, 1000);
                    }
                },
                false
            );
        }
    });

    Ext.get('undo').on('click',
        function (e) {
            if(!SailPoint.Dashboard.undoLock) {
                SailPoint.Dashboard.undoLock = true;
                SailPoint.Dashboard.clearHeights('dashContentPanel');
                Ext.get(Ext.getDom('dashboardForm:contentId').value).slideIn();
                slideOutUndo();

                Ext.getDom('dashboardForm:undoButton').click();
                setTimeout(function() {SailPoint.Dashboard.undoLock = false;}, 1000);
            }
        },
        false
    );

    Ext.get('removeUndo').on('click',
        function (e) {
            slideOutUndo();
        },
        false
    );

    var sourceId,
        sortConfig = {
            revert: true,
            connectWith: '.dashColumn',
            items: '.dashContentPanel',
            placeholder: 'sortable-placeholder',
            handle: '.handle',
            over: function(event, ui) {
                $(this).addClass('ui-state-hover');
            },
            out: function(event, ui) {
                $(this).removeClass('ui-state-hover');
            },
            start: function(event, ui) {
                // store the 'source' container id for use in receive.
                sourceId = event.target.id;
            },
            stop: function(event, ui) {
                var targetId = ui.item.parent().attr('id'),
                    serializedChildren;
                /* If the element has only moved within the same container do not send two
                 * update requests */
                if(sourceId !== targetId) {
                    serializedChildren = SailPoint.Dashboard.serialize(sourceId);
                    SailPoint.Dashboard.postDashboardChanges(sourceId, serializedChildren);
                }
                serializedChildren = SailPoint.Dashboard.serialize(targetId);
                SailPoint.Dashboard.postDashboardChanges(targetId, serializedChildren);
            }
        };

    $('.dashColumn').sortable(sortConfig);

    Ext.QuickTips.init();
};

/**
 * Fake the scriptaculous serialization
 * @param containerId The id of the container to serialize
 * @returns {String} The serialized container
 */
SailPoint.Dashboard.serialize = function(containerId) {
    var container = $('#' + containerId),
        children = container.children('.dashContentPanel');
    /* Emulate the serialization that scriptaculous was doing */
    return children.get().map(function(child) {
        return containerId + '[]=' + child.id.split('_')[1];
    }).join('&');
};

/**
 * Resurrecting the dashboard update stuff that was removed in hash 6f68dd77
 * @param containerId The id of the drag/drop target
 * @param serializedContent The content of the target serialized to match what scriptaculous was doing
 */
SailPoint.Dashboard.postDashboardChanges = function(containerId, serializedContent) {
    var updateMethodName = 'updateDashboard' + containerId.replace('dashColumn', '');
    if (window[updateMethodName]) {
        window[updateMethodName](containerId, serializedContent);
    }

    SailPoint.Dashboard.refreshContent(containerId, serializedContent);
    SailPoint.Dashboard.sortableState[containerId] = serializedContent;
};

SailPoint.Dashboard.initializeEditDashboard = function() {
    var sourceId,
        sortConfig = {
            revert: true,
            connectWith: '#contentForm\\:dashContentChoices, #contentForm\\:dashContentChosen',
            items: '.dashContentItem, .dashContentItemRequired',
            placeholder: 'sortable-placeholder',
            handle: '.handle',
            over: function(event, ui) {
                $(this).addClass('ui-state-hover');
            },
            out: function(event, ui) {
                $(this).removeClass('ui-state-hover');
            },
            start: function(event, ui) {
                // store the 'source' container id for use in receive.
                sourceId = $(this).attr('id');
            },
            // Fired when the container gets a new item (but not when sorting within the same container).
            receive: function(event, ui) {
                // If we've dragged to another container
                if (sourceId !== ui.item.parent().attr('id')) {
                    // Don't allow required items to move out of the chosen group.
                    if (ui.item.hasClass('dashContentItemRequired')) {
                        $('#contentForm\\:dashContentChosen').sortable('cancel');
                    }
                    else {
                        // Add/Remove appropriate style
                        if (sourceId === 'contentForm:dashContentChoices') {
                            ui.item.removeClass('dUnselected').addClass('dSelected');
                        }
                        else {
                            ui.item.removeClass('dSelected').addClass('dUnselected');
                        }
                    }
                }
            }
        };

    $('#contentForm\\:dashContentChoices, #contentForm\\:dashContentChosen').sortable(sortConfig);
};

SailPoint.Dashboard.addRequiredContent = function() {
    $('#contentForm\\:contentSelected').val($('#contentForm\\:dashContentChosen').sortable("serialize", { key: "id" }));
    var element = Ext.getDom('contentForm:contentSelected');
    var required = Ext.DomQuery.select('div[class$=dashContentItemRequired]', 'contentForm:dashContentChosen');
    for ( var i = 0; i < required.length; i++) {
        var parts = required[i].id.split("_");
        if (element.value) {
            element.value = element.value += "&contentForm%3AdashContentChosen[]=" + parts[1];
        } else {
            element.value = "contentForm%3AdashContentChosen[]=" + parts[1];
        }
    }
};

SailPoint.Dashboard.refreshContent = function(key, newValue) {
    var oldValue = SailPoint.Dashboard.sortableState[key];
    var oldArr = [];

    if(oldValue) {
        var oldItems = oldValue.split("&");
        for(var i=0; i<oldItems.length; i++) {
            var oldPieces = oldItems[i].split("=");
            oldArr.push(oldPieces[1]);
        }
    }

    if(newValue) {
        var newItems = newValue.split("&");
        for(var i=0; i<newItems.length; i++) {
            var newPieces = newItems[i].split("=");
            var contentId = newPieces[1];
            if(oldArr.indexOf(contentId)<0) {
                var header = Ext.get(contentId+'_header');
                var panel = header.parent();
                var panelString = '';
                if(panel.panelString) {
                    panelString = panel.panelString;
                } else {
                    var panelParts = panel.id.split("_");
                    var panelString = panelParts[0].substring(0, panelParts[0].length-1);
                }

                var container = panel.parent();
                var containerString = container.id.substring(10, container.id.length-1);

                if(panelString!=containerString) {
                    Ext.getDom('dashboardForm:contentRefreshBtn_' + contentId).click();
                }

                panel.panelString = containerString;

            }
        }
    }
};

/** Function take as input the following values:
 itemId - the dashboard item id to be updated
 value - the value on its preference map to be set
 valueHolder - the inputHidden element that will hold the value
 when it is passed to the bean.
 */
SailPoint.Dashboard.updateDashItem = function(itemId, value, valueHolder) {
    valueHolder.value = value;
    Ext.getDom('dashboardForm:contentId').value = itemId;
    Ext.getDom('dashboardForm:dashItemUpdateButton').click();
};

SailPoint.Dashboard.toggleItem = function(element, condition){
    if(condition =='true') {
        if (Ext.fly(element).isVisible()) {
            Ext.get(element).slideOut('t', SailPoint.Dashboard.slideOutConfig);
        }
        else {
            Ext.get(element).slideIn();
        }
    }
};

// Function used on dashboard/editDashboard.xhtml.  Purpose is to change the
SailPoint.Dashboard.updateContentChoices = function(parentElement, style) {
    var childrenDivs = Ext.DomQuery.select('div[class*=dashContentItem]', parentElement);
    for(var i=0; i<childrenDivs.length; i++) {
        if(childrenDivs[i].className != style && childrenDivs[i].className.indexOf('Required') == -1) {
            childrenDivs[i].className = style;
        }
    }
};

SailPoint.Dashboard.jsRiskScores = function(component, band, group)
{
    //alert("COMPONENT: " + component + " | BAND: " + band + " | GROUP: " + group);
    if(group!=null && group!="") {
        Ext.getDom('dashboardForm:scoreGroup').value = group;
        //Need to strip out the group value from the component string.
        //It is being returned as "group value | date" so we need to get the "group value"

        var comp = component.substring(0, (component.indexOf("|")-1));
        //alert(comp);
        Ext.getDom('dashboardForm:scoreComponent').value = comp;
    }
    Ext.getDom('dashboardForm:scoreCategory').value = band;
    Ext.getDom('dashboardForm:riskScoresButton').click();
};

SailPoint.Dashboard.viewCertificationItem = function(id)
{
    Ext.getDom('dashboardForm:selectedIdCI').value = id;
    Ext.getDom('dashboardForm:viewCertificationButtonCI').click();
};

function viewWorkItemListItem(id, condition)
{
    Ext.getDom('dashboardForm:selectedIdWI').value = id;
    if(condition)
        Ext.getDom('dashboardForm:viewCertificationButtonWI').click();
    else
        Ext.getDom('dashboardForm:viewWorkItemButton').click();
}

SailPoint.Dashboard.clearHeights = function()
{
    var dashSortables = Ext.DomQuery.select('div[class*=dashColumn]');
    var dashTable = Ext.DomQuery.select('table[id=dashTable]')[0];

    for(var i=0; i<dashSortables.length; i++)
    {
        dashSortables[i].style.height = '';
    }
    dashTable.style.height = '';
};

SailPoint.Dashboard.selectLayout = function(element, button) {
    $('.div-table-col').removeClass('selectedYellow');
    $(element).addClass('selectedYellow');
    $(button).val(element.id);
};

SailPoint.Dashboard.adjustSortableHeight = function(panelClass, condition)
{
    var dashSortables = Ext.DomQuery.select('div[class*=dashColumn]');
    var dashTable = Ext.DomQuery.select('table[id=dashTable]')[0];
    var sortablePadding = 40;
    var tablePadding = 10;
    var margin = 2, i, k, j;

    var maxHeight = 0;
    //loop through and get the maximum height
    for(i=0; i<dashSortables.length; i++)
    {
        /** We don't need to worry about the height of the xtra large column since it
         * doesn't site side-by-side with anything
         */
        if(dashSortables[i].id == 'dashColumnXtraLarge1') {
            continue;
        }
        var sortableHeight = 0;
        var panels = dashSortables[i].getElementsByTagName('DIV');
        for(j=0; j<panels.length; j++)
        {
            if(panels[j].className.lastIndexOf(panelClass) > 0)
            {
                sortableHeight += (panels[j].offsetHeight + margin);
            }
        }
        //Need to compensate for padding on top and bottom
        sortableHeight += sortablePadding;

        if(sortableHeight > maxHeight)
            maxHeight = sortableHeight;
    }

    //now find all sortables that are shorter, and adjust them.
    for(k=0; k<dashSortables.length; k++)
    {
        /** We don't need to worry about the height of the xtra large column since it
         * doesn't site side-by-side with anything
         */
        if(dashSortables[k].id == 'dashColumnXtraLarge1') {
            continue;
        }
        var sortableHeight = dashSortables[k].offsetHeight;
        if(sortableHeight < maxHeight)
        {
            dashSortables[k].style.height = (maxHeight - sortablePadding) + "px";
        }
    }

    var dashTableHeight = maxHeight + tablePadding;
    if(dashTable.clientHeight != dashTableHeight && (condition == 'true'))
    {
        dashTable.style.height = dashTableHeight + "px";
    }
};

SailPoint.Dashboard.resetDashHeight = function(element, condition) {
    SailPoint.Dashboard.clearHeights();

    if(element==null)
        var element = 'dashContentPanel';
    if(condition==null)
        var condition = 'false';
    SailPoint.Dashboard.adjustSortableHeight(element, condition);
};

//Used by the certification completion status dashboard panels to show/hide the list of certifications
//for this user
SailPoint.Dashboard.toggleCertPercentDisplay = function(id, condition, btnHolder, idHolder) {
    var details = Ext.get(id);
    if(btnHolder.className != 'empty') {
        if(details && !(details.isVisible())) {
            if(idHolder) {
                idHolder.value = id;
            }
            var children = btnHolder.getElementsByTagName('input');
            if(children) {
                var btn = children[0];
                btn.click();
            }
        }
        SailPoint.Dashboard.toggleItem(id, condition);
    }
};

SailPoint.Dashboard.loadCerts = function(btnHolder) {
    var children = btnHolder.getElementsByTagName('input');
    if(children) {
        var btn = children[0];
        btn.click();
    }
};


var loadingMessage = document.createElement('div');
loadingMessage.className = 'loadingSpinnerMessageDiv';
loadingMessage.innerHTML = '#{msgs.dash_loading}';

SailPoint.Dashboard.displayLoadingMessage = function(idName) {
    var messageContents = loadingMessage;

    var displayDiv = Ext.get('spBackground'+idName);

    displayDiv.appendChild(messageContents);

    var msgWidth = messageContents.offsetWidth;
    var msgHeight = messageContents.offsetHeight;
    var displayDivHeight = displayDiv.offsetHeight;
    var displayDivWidth = displayDiv.offsetWidth;

    messageContents.style.top = Math.round((displayDivHeight - msgHeight) / 2) + 'px';
    messageContents.style.left = Math.round((displayDivWidth - msgWidth) / 2) + 'px';
};

SailPoint.Dashboard.hideLoadingMessage = function(idName) {
    try {
        var container = document.getElementById('spBackground'+idName);
        var child = container.getElementsByClassName(loadingMessage.className)[0];
        if(child) {
            container.removeChild(child);
        }
    } catch (e) {}
};


function renderChartGroupSuggest(chartName, index) {
    if(!Ext.getCmp(chartName+'_groupSuggest_'+index+"_cmp")) {
        var group = Ext.getDom(chartName+'_groupOptions_'+index).value;

        var groupsMultiSuggest = new SailPoint.MultiSuggest({
            cls:'chartSuggest',
            id: chartName+'_groupSuggest_'+index+'_cmp',
            suggestType: 'group',
            jsonData: JSON.parse(Ext.getDom(chartName+'_groupSuggest_'+index+'_multiData').value),
            inputFieldName: 'groupsSuggest',
            baseParams: {'type': 'group'},
            width:250
        });

        groupsMultiSuggest.render(chartName+'_groupSuggest_'+index);

        groupsMultiSuggest.suggest.store.on('beforeload', function(store) {
            var group = Ext.getDom(chartName+'_groupOptions_'+index).value;
            if(group && group!=' ') {
                store.getProxy().extraParams['group'] = group;
            } else {
                store.getProxy().extraParams['group'] = '';
            }
        },this);

    }
}

function updateChartGroupSuggest(chartName, index, value) {
    var multi = Ext.getCmp(chartName+'_groupSuggest_'+index+"_cmp");
    if(multi) {
        multi.clear();
        multi.suggest.store.load();
    }
}


/** Chart functions **/

function reRenderChart(index, btn, chartName, formName) {
    //These four fields with their values getting set are located on the dashboard.xhtml
    if(Ext.getDom(formName+':'+chartName+'_selectedChartType') && Ext.getDom(chartName+'_typeOptions_' + index))
        Ext.getDom(formName+':'+chartName+'_selectedChartType').value=Ext.getDom(chartName+'_typeOptions_' + index).options[Ext.getDom(chartName+'_typeOptions_' + index).selectedIndex].value;

    if(Ext.getDom(formName+':'+chartName+'_selectedDateRange') && Ext.getDom(chartName+'_rangeOptions_' + index))
        Ext.getDom(formName+':'+chartName+'_selectedDateRange').value=Ext.getDom(chartName+'_rangeOptions_' + index).options[Ext.getDom(chartName+'_rangeOptions_' + index).selectedIndex].value;

    if(Ext.getDom(formName+':'+chartName+'_selectedGroup') && Ext.getDom(chartName+'_groupOptions_' + index))
        Ext.getDom(formName+':'+chartName+'_selectedGroup').value=Ext.getDom(chartName+'_groupOptions_' + index).options[Ext.getDom(chartName+'_groupOptions_' + index).selectedIndex].value;

    if(Ext.getDom(formName+':'+chartName+'_referenceIndex') && Ext.getDom(formName+':'+chartName+'_realReferenceIndex_' + index))
        Ext.getDom(formName+':'+chartName+'_referenceIndex').value=Ext.getDom(formName+':'+chartName+'_realReferenceIndex_' + index).value;

    var multi = Ext.getCmp(chartName+'_groupSuggest_'+index+"_cmp");
    if(multi) {
        Ext.getDom(formName+':'+chartName+'_selectedValues').value = multi.getValue();
    }
    btn.click();
}

function viewLargeChart(index, chartName, formName) {
    Ext.getDom(formName+':'+chartName+'_selectedChartType').value=Ext.getDom(chartName+'_typeOptions_' + index).options[Ext.getDom(chartName+'_typeOptions_' + index).selectedIndex].value;
    Ext.getDom(formName+':'+chartName+'_selectedDateRange').value=Ext.getDom(chartName+'_rangeOptions_' + index).options[Ext.getDom(chartName+'_rangeOptions_' + index).selectedIndex].value;
    Ext.getDom(formName+':'+chartName+'_selectedGroup').value=Ext.getDom(chartName+'_groupOptions_' + index).options[Ext.getDom(chartName+'_groupOptions_' + index).selectedIndex].value;
    Ext.getDom(formName+':'+chartName+'_referenceIndex').value=Ext.getDom(formName+':'+chartName+'_realReferenceIndex_' + index).value;
    Ext.getDom(formName+':referenceIndex').value=Ext.getDom(formName+':'+chartName+'_realReferenceIndex_' + index).value;

    if(Ext.getDom(formName+':'+chartName+'_viewLargeChartButton'))
        Ext.getDom(formName+':'+chartName+'_viewLargeChartButton').click();
}

SailPoint.Dashboard.toggleDisclosure = function(content) {
    content = Ext.get(content);
    if(content) {
        var target = content.next();
        SailPoint.Utils.toggleDisclosureLink(target, content.isVisible());
    }
};
