var mainBar = Ext.create('Ext.toolbar.Toolbar', {
	items: [
		{			text: 'Index',
			handler: function(){
				location.href = 'index.html';
			}
		},'-',
		{			text: 'Report',
			handler: function(){
				location.href = 'report.html';
			}
		},'->',
		{
			text: 'Dialog',
			handler: function(){
				Ext.QuickTips.init();
	            Ext.form.Field.prototype.msgTarget = 'side';
				
				var formCp = Ext.create('Ext.form.Panel', {
		            bodyStyle: 'padding:10px',
		            border: false,
		            items: [{
			            xtype: 'textfield',
			            fieldLabel: 'A',
			            labelWidth: 150,
			            allowBlank: false,
			            width:350,
			            name: 'A',
			            listeners: {
				            specialkey: function (o, e) {
					            if (e.getKey() == e.ENTER) {
						            updateCp();
					            }
				            }
			            }
		            },{
			            xtype: 'textfield',
			            fieldLabel: 'B',
			            labelWidth: 150,
			            allowBlank: false,
			            width:350,
			            name: 'B',
			            listeners: {
				            specialkey: function (o, e) {
					            if (e.getKey() == e.ENTER) {
						            updateCp();
					            }
				            }
			            }
		            },{
			            xtype: 'textfield',
			            fieldLabel: 'C',
			            labelWidth: 150,
			            allowBlank: false,
			            width:350,
			            name: 'C',
			            listeners: {
				            specialkey: function (o, e) {
					            if (e.getKey() == e.ENTER) {
						            updateCp();
					            }
				            }
			            }
		            }],
		            buttons: ['->', {
			            text: 'Update',
			            handler: function () {
				            updateCp();
			            }
		            }]
	            });
            	
	            updateCp = function(){
		            formCp.form.submit({
			            url: "x",
			            clientValidation: true,
			            success: function (form, act) {
				            Ext.Msg.alert('Success', 'Update complete.');
				            formCp.form.reset();
                            winCp.hide();
			            },
			            failure: function (form, act) {
            				
			            },
			            waitMsg: 'Loading...',
			            waitTitle: 'Please wait...',
			            params: {}
		            });
	            }
            	var winCp;
	            if (!winCp) {
		            winCp = Ext.create('widget.window', {
			            title: 'D',
			            closeAction: 'hide',
			            modal: true,
			            layout: 'fit',
			            width: 450,
			            height: 175,
			            items: formCp
		            });
	            }
	            winCp.show();
			}
		}
	]
});