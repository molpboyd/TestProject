Ext.require(['Ext.data.*', 'Ext.grid.*']);
Ext.onReady(function() {
	
   var itemsPerPage = 20;

	var store = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
		pageSize: itemsPerPage,
		proxy: {
			type: 'ajax',
			url: 'grid.php',
			reader: {
				type: 'json',
				root: 'items',
				totalProperty: 'totalCount'
			}
		}
	});

//	store.load({
//		params:{
//			start:0,    
//			limit: itemsPerPage
//		}
//	});
		
	var tbar = Ext.create('Ext.toolbar.Toolbar', {
			items: [
				'->',
				{
					xtype: 'textfield',
					id: 'orderNo',
					name: 'orderNo',
					width : 300,
					listeners: {
						specialkey: function (o, e) {
							if (e.getKey() == e.ENTER) {
								var x = Ext.getCmp('x').getValue();
								store.load({
									params:{
										start:0,    
										limit: itemsPerPage,
										x: x
									}
								});
							}
						}
					}
				},
				{					text: 'Find',
					handler: function(){
						var x = Ext.getCmp('x').getValue();
						store.load({
							params:{
								start:0,    
								limit: itemsPerPage,
								orderNo: orderNo
							}
						});
					}
				}
			]
		});
	
	var rowNo = Ext.create('Ext.grid.RowNumberer');

	var grid = Ext.create('Ext.grid.Panel', {
		loadMark: false,
		frame: true,
		tbar: tbar,
		store: store,
		columns: [rowNo,
			{
			    header: 'A',  
			    dataIndex: 'A', 
			    flex: 1
			},
			{
				header: 'B', 
				dataIndex: 'B'
			}, 
			{
				header: 'C', 
				dataIndex: 'C'
			},
			{
			    header: 'D',  
			    dataIndex: 'D',
            }
		],
		dockedItems: [{
			xtype: 'pagingtoolbar',
			store: store,
			dock: 'bottom',
			displayInfo: true
		}]
	}); 
        
    Ext.create('Ext.Viewport', {
		layout: 'border',
		items: [{
			region : 'center',
			title: 'Demo',
			bodyPadding: '5 5 5 5',
			layout : 'fit',
			//tbar : mainBar,
			items : grid
		}]
	});
});

