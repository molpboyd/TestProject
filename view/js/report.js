Array.prototype.groupBy = function (keyName) {
    var res = {};
    Ext.each(this, function (x) {
        var k = x[keyName];
        var v = res[k];
        if (!v) v = res[k] = [];
        v.push(x);
    });
    return res;
};

Ext.require(['Ext.data.*', 'Ext.grid.*']);
Ext.onReady(function () {
    var paymentType = function (value) {
        if (value == 'credit')
            return 'Credit Card';
        else if (value == 'transfer')
            return 'Bank Transfer';
        else if (value == 'counter_service')
            return 'Counter Service';
        else if (value == 'no_payment')
            return 'No Payment';
        else
            return '';
    }

    var load = function () {
        var fromDate = Ext.getCmp('fromDate').getValue();
        var toDate = Ext.getCmp('toDate').getValue();
        var keyword = Ext.getCmp('keyword').getValue();
        var searchtype = Ext.getCmp('searchtype').getValue();
        var limit = Ext.getCmp('limit').getValue();
        var mask = new Ext.LoadMask(Ext.getBody(), { msg: "Please wait..." });
        mask.show();
        var html = '';
        html += '<center><table class="tb-report"><tr class="title"><td>Total : ' + 10 + ' items</td></tr></table></center>';
        var cards = [1,2,3,4,5,6,7,8,9,0];
        html += '<center><table class="tb-report" id="report-excel">';
        html += '<tr class="header">';
        html += '<td></td>';
        html += '<td>A</td>';
        html += '<td>B</td>';
        html += '<td>C</td>';
        html += '<td>D</td>';
        html += '<td>E</td>';
        html += '<td>F</td>';
        html += '<td>G</td>';
        html += '<td>H</td>';
        html += '</tr>';
        var i = 0;
        Ext.each(cards, function (e) {
            i++;
            html += '<tr>';
            html += '<td>' + i + '</td>';
            html += '<td>A</td>';
            html += '<td>B</td>';
            html += '<td>C</td>';
            html += '<td>D</td>';
            html += '<td>E</td>';
            html += '<td>F</td>';
            html += '<td>G</td>';
            html += '<td>H</td>';
            html += '</tr>';
        });
        html += '</table></center>';
        panel.update(html);
        mask.destroy();


//        Ext.Ajax.request({
//            url: 'x',
//            params: {
//                fromDate: fromDate,
//                toDate: toDate,
//                keyword: keyword,
//                searchtype: searchtype,
//                limit: limit
//            },
//            success: function (response) {
//                var obj = Ext.decode(response.responseText);
//                if (obj.success) {
//                    if (obj.totalCount > 0) {
//                        Ext.getCmp('btn_export').enable();
//                    }
//                    else {
//                        Ext.getCmp('btn_export').disable();
//                    }
//                    var html = '';
//                    html += '<center><table class="tb-report"><tr class="title"><td>Total : ' + obj.totalCount + ' items</td></tr></table></center>';
//                    var cards = obj.items;
//                    html += '<center><table class="tb-report" id="report-excel">';
//                    html += '<tr class="header">';
//                    html += '<td></td>';
//                    html += '<td>A</td>';
//                    html += '<td>B</td>';
//                    html += '<td>C</td>';
//                    html += '<td>D</td>';
//                    html += '<td>E</td>';
//                    html += '<td>F</td>';
//                    html += '<td>G</td>';
//                    html += '<td>H</td>';
//                    html += '</tr>';
//                    var i = 0;
//                    Ext.each(cards, function (e) {
//                        i++;
//                        html += '<tr>';
//                        html += '<td>' + i + '</td>';
//                        html += '<td>A</td>';
//                        html += '<td>B</td>';
//                        html += '<td>C</td>';
//                        html += '<td>D</td>';
//                        html += '<td>E</td>';
//                        html += '<td>F</td>';
//                        html += '<td>G</td>';
//                        html += '<td>H</td>';
//                        html += '</tr>';
//                    });
//                    html += '</table></center>';
//                    panel.update(html);
//                    mask.destroy();
//                }
//            }
//        });
    };

    var exportExcel = function () {
        var fromDate = escape(Ext.Date.format(Ext.getCmp('fromDate').getValue(), 'c').substring(0, 19));
        var toDate = escape(Ext.Date.format(Ext.getCmp('toDate').getValue(), 'c').substring(0, 19));
        var keyword = Ext.getCmp('keyword').getValue();
        var searchtype = Ext.getCmp('searchtype').getValue();
        var limit = Ext.getCmp('limit').getValue();
        var url = 'x?fromDate=' + fromDate + '&toDate=' + toDate + '&keyword=' + keyword + '&searchtype=' + searchtype + '&limit=' + limit;
        //window.open(url);
        location.href = url;
    };

    var type = Ext.create('Ext.data.Store', {
        fields: ['value', 'text'],
        data: [
             { "value": "A", "text": "A" }
            , { "value": "B", "text": "B" }
        ]
    });

    var combo = Ext.create('Ext.form.ComboBox', {
        id: 'searchtype',
        name: 'searchtype',
        store: type,
        displayField: 'text',
        valueField: 'value',
        queryMode: 'local',
        value: 'A',
        typeAhead: true
    });

    var tbar = Ext.create('Ext.toolbar.Toolbar', {
        items: [
			'->', 'From :',
			{
			    xtype: 'datefield',
			    id: 'fromDate',
			    name: 'fromDate',
			    maxValue: new Date(),
			    value: new Date()
			}, 'To :', {
			    xtype: 'datefield',
			    id: 'toDate',
			    name: 'toDate',
			    value: new Date()
			}, 'Keyword :',
			{
			    xtype: 'textfield',
			    id: 'keyword',
			    name: 'keyword',
			    width: 200
			}, combo,
			{
			    text: 'Find',
			    iconCls: 'icon-find',
			    handler: function () {
			        load();
			    }
			}, '-', 'Limit :', {
			    xtype: 'numberfield',
			    id: 'limit',
			    name: 'limit',
			    width: 75,
			    value: 100
			}, '-',
			{
			    text: 'Export',
			    iconCls: 'icon-excel',
			    id: 'btn_export',
			    disabled: true,
			    handler: function () {
			        exportExcel();
			    }
			}
		]
    });

    var panel = Ext.create('Ext.panel.Panel', {
        tbar: tbar,
        autoScroll: true
    });

    Ext.create('Ext.Viewport', {
        layout: 'border',
        items: [{
            region: 'center',
            title: 'Report Demo',
            bodyPadding: '5 5 5 5',
            layout: 'fit',
            tbar: mainBar,
            autoScroll: true,
            items: panel
        }]
    });
});