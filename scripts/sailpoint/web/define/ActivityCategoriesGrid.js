/* (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved. */

Ext.ns('SailPoint', 
       'SailPoint.Define', 
       'SailPoint.Define.Grid',
       'SailPoint.Define.Grid.ActivityCategories');

SailPoint.Define.Grid.ActivityCategories.createGrid = function(stateId) {

  Ext.QuickTips.init();
  
  var store = SailPoint.Store.createStore({
      fields: ['id','name','targets'],
      url: CONTEXT_PATH + '/define/categories/categoriesDataSource.json',
      autoLoad: false,
      root: 'categories',
      remoteSort: true
  });
  
  //columns     
  var columns = [{
      header: '#{msgs.name}',
      dataIndex: 'name',
      sortable: true, 
      hideable: true
  },{
      header: '#{msgs.targets}',
      dataIndex: 'targets',
      sortable: false, 
      hideable: true
  }];
  
  //display grid
  var grid = new Ext.grid.Panel({
      id: 'grid',
      store: store,
      cls: 'selectableGrid',
      stateId: stateId,
      stateful: true,
      columns: columns,
      listeners: { 
          itemclick: SailPoint.Define.Grid.ActivityCategories.clickRow, 
          itemcontextmenu: SailPoint.Define.Grid.ActivityCategories.showContextMenu,
          activate: SailPoint.Define.Grid.ActivityCategories.refreshPanel
      },
      viewConfig: {
          stripeRows: true,
          scrollOffset: 1
      },
      tbar: [
        new Ext.Button({
          text: '#{msgs.button_new_category}',
          id: 'newApplicationBtn',
          scale: 'medium',
          cls : 'primaryBtn',
          handler: function() {
            Ext.getDom("editForm:newCategoryButton").click();
          }
        })
      ]        
  });
  
  store.load({params:{start:0, limit:20}});
  
  return grid;
}

SailPoint.Define.Grid.ActivityCategories.showContextMenu = function(gridView, record, HTMLitem, index, e, eOpts){
  id = record.getId();
  name = record.get('name');

  var contextMenu = new Ext.menu.Menu();
  contextMenu.add(
      new Ext.menu.Item({text: '#{msgs.menu_edit}', 
                         handler: SailPoint.Define.Grid.ActivityCategories.editApplication, 
                         iconCls: 'editBtn'}),
      new Ext.menu.Item({text: '#{msgs.menu_delete}', 
                         handler: SailPoint.Define.Grid.ActivityCategories.deletePrompt, 
                         iconCls: 'deleteBtn'})
  );          
    
  e.stopEvent();
  contextMenu.showAt(e.xy);
}  


SailPoint.Define.Grid.ActivityCategories.clickRow = function(gridView, record, HTMLitem, index, e, eOpts){
  Ext.getDom('editForm:editedCategoryId').value = record.getId();
  Ext.getDom('editForm:editButton').click();
}


SailPoint.Define.Grid.ActivityCategories.editApplication = function() {
  // there's no functional difference btwn this and clickRow
  Ext.getDom('editForm:editedCategoryId').value = id;
  Ext.getDom('editForm:editButton').click();
}


SailPoint.Define.Grid.ActivityCategories.deletePrompt = function() {
  Ext.MessageBox.confirm('Confirm delete of "' + name + '"?', 
                         'Are you sure you want to delete "' + name + '"?', 
                         SailPoint.Define.Grid.ActivityCategories.deleteApplication);
}


SailPoint.Define.Grid.ActivityCategories.deleteApplication = function(button, text) {
  if (button == 'yes') {
      Ext.getDom('editForm:deletedCategoryId').value = id;
      Ext.getDom('editForm:deleteButton').click();
  }
}

SailPoint.Define.Grid.ActivityCategories.refreshPanel = function(component) {
  component.getStore().load({params:{start:0, limit:20}});
}
