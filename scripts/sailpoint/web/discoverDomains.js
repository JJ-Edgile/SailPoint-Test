/* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */

Ext.ns('SailPoint.DiscoverDomains');
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../ux');
Ext.onReady(function () {
        Ext.QuickTips.init();
        var isGCDataSaved = false;  
});

Ext.require([
             'Ext.form.Panel',
             'Ext.ux.form.MultiSelect',
             'Ext.ux.form.ItemSelector'
         ]);



SailPoint.DiscoverDomains.useTLS = function (isChecked,id) {
    if (isChecked === true) {
        Ext.getDom(id+'Btn').click();
    } else if(isChecked === false) {
      Ext.getDom(id+'Btn').click();
    }
 };

 
SailPoint.DiscoverDomains.ManageAllDomain = function (isChecked,id) {
       if (isChecked === true) {
           Ext.getDom(id+'Btn').click();
       } else if(isChecked === false) {
         Ext.getDom(id+'Btn').click();
       }
    };

SailPoint.DiscoverDomains.startDiscover = function () {
        Ext.getDom('forestResultsDiv').className = 'workingText';
        Ext.getDom('forestResultsDiv').innerHTML = '#{msgs.discover_domains}';
        Ext.select('.discoverDomainSpinner').setStyle('display', 'inline');
};


SailPoint.DiscoverDomains.manageAllDomainStart = function () {
    Ext.getDom('forestResultsDiv').className = 'workingText';
    Ext.getDom('forestResultsDiv').innerHTML = '#{msgs.discover_domains}';
    Ext.select('.discoverDomainSpinner').setStyle('display', 'inline');
};

SailPoint.DiscoverDomains.manageAllDomainEnd = function () {
    Ext.select('.discoverDomainSpinner').setStyle('display', 'none');
};


SailPoint.DiscoverDomains.endDiscover = function () {
        Ext.select('.discoverDomainSpinner').setStyle('display', 'none');
};


SailPoint.DiscoverDomains.addInForestTable = function () {
    addDomainForestEntry = Ext.getDom('editForm:footDomainForestName').value;
    if (addDomainForestEntry !== null) {
        Ext.getDom('editForm:footForestName').value = addDomainForestEntry;
        Ext.getDom('editForm:addForestData').click();
        //Ext.getDom('editForm:clickme').click();
    }
};

// This is a private function that helps determine the checkboxes' container.  
// Note that the id of the 'all' checkbox is assumed to end in 'selectAllToggle,' as 
// demonstrated in the sample scenario above.  Some details as to why this is needed
// are provided below in the toggleAll function comments.
function getTablePrefixForToggle(toggleId) {
    var endOfPrefix = toggleId.lastIndexOf(':selectAllToggle');
    return toggleId.substring(0, endOfPrefix);
}

// This function accepts three parameters: a toggle id that ends in 'selectAllToggle,' 
// the new value to which all the checkboxes will be set, and an optional filterClass
// parameter that specifies the class of checkbox elements that should be set.  If no
// filterClass is specified, all the checkboxes in the table will be toggled.
// See the sample scenario at the top of this file for more info. 
// Forcing the id of the controlling checkbox to be 'selectAllToggle' is admittedly ugly,
// but the alternative is to pass in the JSF-generated prefix for the table, which is 
// potentially difficult.  I thought that this solution was the lesser of the two evils 
// -- Bernie
SailPoint.DiscoverDomains.toggleAll = function(toggleId, newValue, filterClass) {
    var tableId = getTablePrefixForToggle(toggleId);
  
    var inputs;
    
    if (filterClass) {
        inputs = Ext.getDom(tableId).getElementsByClassName(filterClass);
    } else {
        inputs = Ext.getDom(tableId).getElementsByTagName('input');
    }
    
    for (var i = 0; i < inputs.length; ++i) {
        if (inputs[i].type == 'checkbox' && inputs[i].disabled == false ) {
            inputs[i].checked = newValue;
        }
    }
}

// --><!]]>
