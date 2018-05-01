helpKey = 'APPLICATION';

function getFieldValue(field) {
    var val = null;
    var fileName = Ext.getDom(field);
    if(fileName) {
        val = fileName.value;
    }
    return val;
}

function toggleCredentials(authType) {
    if(authType == "basic") {
        document.getElementById("passwordTr").style.display = "";
        document.getElementById("usernameTr").style.display = "";
        document.getElementById("tokenTr").style.display = 'none';

    } else {
        document.getElementById("passwordTr").style.display = 'none';
        document.getElementById("usernameTr").style.display = 'none';
        document.getElementById("tokenTr").style.display = "";
    }
}

Ext
    .onReady(function() {
        Ext.QuickTips.init();

        // Make sure the correct fields are enabled/disabled.
        toggleCredentials(Ext
            .getDom('editForm:authType').value);

        // This is our validation hook
        Page.on('beforeSave',
            function() {
                var hostName = getFieldValue('editForm:host');
                var userName = getFieldValue('editForm:user');
                var password = getFieldValue('editForm:password');
                var oauthBearerToken = getFieldValue('editForm:oauthBearerToken');
                var authType = getFieldValue('editForm:authType');

                if(authType == "basic" && (userName == '' || userName == null)) {
                    Validator.validateNonBlankString(userName, "#{msgs.con_form_scim_err_message_username_null}");
                }
                if(authType == "basic" && (password == '' || password == null)) {
                    Validator.validateNonBlankString(password, "#{msgs.con_form_scim_err_message_password_null}");
                }
                if(authType == "oauthBearer" && (oauthBearerToken == '' || oauthBearerToken == null)) {
                    Validator.validateNonBlankString(oauthBearerToken, "#{msgs.con_form_scim_err_message_oauttoken_null}");
                }
                Validator.validateNonBlankString(hostName, "#{msgs.con_form_scim_err_message_baseurl_null}");
                var errors = Validator.getErrors();
                if(errors && errors.length > 0) {
                    Validator.displayErrors('appErrorsTop');
                    return false;
                }
                //return false will kill cancel the save
                return true;
            });

    });