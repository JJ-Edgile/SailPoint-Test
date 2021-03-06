/* (c) Copyright 2014 SailPoint Technologies, Inc., All Rights Reserved. */

/**
 * ReferenceFormPopup component.
 *
 * It is a popup window for displaying options to either create a new
 *  template or form, or to reference an existing standalone form.
 * It will be called while creating application or role provisioning
 *  policy or workflow form.
 * For reference form FormGrid.js will be used.
 */
Ext.define('SailPoint.component.ReferenceFormPopup', {
    extend: 'Ext.window.Window',
    id: 'referenceFormPopup',

    beanType: null,
    usage: null,
    formType: null,
    // ID of the referenced form if already selected
    formRefId: null,
    // Handler function for creating a new template or a form
    createHandler: null,

    title: '#{msgs.reference_form_popup_title}',
    height: 200,
    draggable: false,
    modal: true,
    resizable: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        flex: 1,
    },
    statics: {
        showWorkflow: function(stepComponent, stepId, formType, formRefId) {
            Ext.create('SailPoint.component.ReferenceFormPopup', {
                stepComponent: stepComponent,
                stepId: stepId,
                formType: formType,
                formRefId: formRefId,
                width: 370,
                createHandler: function() {
                    var cmpPopup = Ext.getCmp('referenceFormPopup');
                    // bug#24399 - Form Editor shown the previously selected reference form name when create new embedded form in define Business Process.
                    // clear the name and description before editing the form
                    cmpPopup.stepComponent.stepObj.form.name = null;
                    cmpPopup.stepComponent.stepObj.form.description = null;
                    
                    cmpPopup.stepComponent.panel.editForm(cmpPopup.stepId);
                    cmpPopup.close();
                }
            }).show();
        },
        showApplication: function(beanType, usage, formType, formRefId) {
            // For inline template (formRefId is empty) show editor window
            // For add policy (formRefId is undefined) show popup
            // For reference form (formRefId is ID) show popup
            if ("" === formRefId) {
                SailPoint.form.editor.FormEditor.ShowEditorWindow(beanType, usage);
            } else {
                Ext.create('SailPoint.component.ReferenceFormPopup', {
                    beanType: beanType,
                    usage: usage,
                    formType: formType,
                    formRefId: formRefId,
                    width: 570,
                    createHandler: function() {
                        var cmpPopup = Ext.getCmp('referenceFormPopup');
                        SailPoint.form.editor.FormEditor.ShowEditorWindow(cmpPopup.beanType, cmpPopup.usage);
                        cmpPopup.close();
                    }
                }).show();
            }
        },
        showRole: function(beanType, formType, formRefId) {
            Ext.create('SailPoint.component.ReferenceFormPopup', {
                beanType: beanType,
                formType: formType,
                formRefId: formRefId,
                width: 470,
                createHandler: function() {
                    var cmpPopup = Ext.getCmp('referenceFormPopup');
                    SailPoint.form.editor.FormEditor.ShowEditorWindow(cmpPopup.beanType);
                    cmpPopup.close();
                }
            }).show();
        }
    },

    initComponent: function() {
        this.items = [{
            xtype: 'toolbar',
            docked: 'top',
            title: '',
            border: 0,
            items: [{
                xtype: 'tbtext',
                text: '#{msgs.reference_form_popup_label_text}'
            }]
        },
        {
            xtype: 'button',
            margin: '10 10 0 10',
            text:('Workflow' === this.formType) ? 
                    '#{msgs.reference_form_popup_create_workflow_form}': 
                        '#{msgs.reference_form_popup_create_policy_form}',
            scale: 'small',
            cls: 'primaryBtn',
            renderTo: Ext.getBody(),
            handler: function() {
                var cmpPopup = Ext.getCmp('referenceFormPopup');

                this.ownerCt.createHandler();
                cmpPopup.close();
            }
        },
        {
            xtype: 'button',
            id: 'formRefButton',
            margin: '10 10 10 10',
            text: SailPoint.component.ReferenceFormPopup.getButtonLabel(this.formType, this.formRefId),
            scale: 'small',
            cls : 'primaryBtn',
            renderTo: Ext.getBody(),
            handler: function() {
                var cmpPopup = Ext.getCmp('referenceFormPopup');
                // The stepComponent is required for workflow type
                //  to invoke respective addFormReference method.
                SailPoint.component.ReferenceFormPopup.showReferenceFormList(
                        this.ownerCt.formType, this.ownerCt.stepComponent);
                cmpPopup.close();
            }
        },
        {
            xtype: 'toolbar',
            docked: 'bottom',
            layout: {
                pack: 'end',
                type: 'hbox'
            },
            items: [
            {
                xtype: 'button',
                text: '#{msgs.button_cancel}',
                cls: 'secondaryBtn',
                handler: function() {
                    //remove the temporary template  
                    if (Ext.getDom('editForm:templateDeleteBtn')) {
                        Ext.getDom('editForm:templateDeleteBtn').click();
                    }
                    Ext.getCmp('referenceFormPopup').close();
                }
            }]
        }];
        this.callParent(arguments);
    }
})

SailPoint.component.ReferenceFormPopup.getButtonLabel = function(formType, formRefId) {
    var buttonLabel;
    if (formType == 'Workflow') {
        buttonLabel = (undefined === formRefId) ?
                '#{msgs.reference_form_popup_reference_workflow_form}' :
                    '#{msgs.reference_form_popup_change_reference_workflow_form}';
    } else {
        buttonLabel = (undefined === formRefId) ?
                '#{msgs.reference_form_popup_reference_policy_form}' :
                    '#{msgs.reference_form_popup_change_reference_policy_form}';
    }
    return buttonLabel;
}

/**
 * Create a popup displaying a list of reference forms based on the formType
 */
SailPoint.component.ReferenceFormPopup.showReferenceFormList = function(formType, stepComponent) {
    if ('Workflow' === formType) {
        // The reference variables array is present in a workflow.
        var workflow = Ext.getCmp('workflowPanel').workflow,
            referenceables = workflow.variables,
            step = workflow.getStep(stepComponent.stepId - 1);
    }
    var windowHeight = 550,
        windowWidth = 950,
        itemwidth = 940;
    var formsWindow = Ext.create('Ext.window.Window', {
        id: 'formsWindow',
        title: '#{msgs.reference_form_listpage_title}',
        layout: 'vbox',
        border: true,
        modal: true,
        closable: true,
        width: windowWidth,
        height: windowHeight,
        closeAction: 'destroy',
        renderTo: Ext.getBody(),
        // Type required as Rest filters and making click decision.
        formType: formType,
        // Step component required to invoke addFormReference method.
        stepComponent: stepComponent,
        // Step object containing form
        step: step,

        items: [{
            xtype: 'spapprovalpanel',
            id: 'approvalPanelItem',
            flex: 1,
            width: itemwidth,
            referenceables: referenceables,
            hidden: 'Workflow' === formType ? false : true
        }, {
            xtype: 'label',
            text: '#{msgs.reference_form_listpage_select_msg}',
            margin: 10,
            width: itemwidth,
            cls: 'nowrap'
        }, {
            xtype: 'formgrid',
            id: 'formsPanel',
            cls : 'selectableGrid',
            stateful : true,
            // Filter for in-context filtering based on type.
            // Type can be Application, Role or Workflow.
            filters: {type: formType},
            isRef: true,
            flex : 2,
            width: itemwidth,
            viewConfig : {
                stripeRows : true,
                scrollOffset : 0
            }
        }], // items

        listeners: {
            // Load approval fields from step.form
            beforeshow: function() {
                if ('Workflow' === formType) {
                    var approvalPanelItem = Ext.getCmp('approvalPanelItem');
                    approvalPanelItem.formSend.setValue(this.step.form.sendVal);
                    approvalPanelItem.formReturn.setValue(this.step.form.returnVal);
                    approvalPanelItem.ownerRadio.load(this.step.form.ownerMethod,
                            this.step.form.ownerSource);
                }
            }
        }
    });
    formsWindow.show();
}
