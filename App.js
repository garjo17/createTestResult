Ext.define('CustomApp', {
  extend: 'Rally.app.App',
  componentCls: 'app',
  launch: function() {
	this.myGrid_TestCase_Result = null;
    this.store_UserStories = null;
	
	var barra = Ext.create('Ext.toolbar.Toolbar', {
    renderTo: document.body,
   // width   : 500,
    items: [ 
		{
        xtype: 'rallyiterationcombobox',
        storeConfig: {
			
            autoLoad: true,
         
        }
    },
        {
            // xtype: 'button', // default for Toolbars
            text: 'Button'
        },
        {
            xtype: 'splitbutton',
            text : 'Split Button'
        },
        // begin using the right-justified button container
        '->', // same as { xtype: 'tbfill' }
        {
            xtype    : 'textfield',
            name     : 'field1',
            emptyText: 'enter search term'
        },
        // add a vertical separator bar between toolbar items
        '-', // same as {xtype: 'tbseparator'} to create Ext.toolbar.Separator
        'text 1', // same as {xtype: 'tbtext', text: 'text1'} to create Ext.toolbar.TextItem
        { xtype: 'tbspacer' },// same as ' ' to create Ext.toolbar.Spacer
        'text 2',
        { xtype: 'tbspacer', width: 50 }, // add a 50px space
        'text 3'
    ],
	scope: this
});
    this.add(barra) ;
    this._store_Risk();
  },

  _store_Risk: function(id) {
    var myFilter_UserStories = Ext.create('Rally.data.wsapi.Filter', {
      property: 'c_RAIDType',
      operation: '=',
      value: 'Risk'
    });
    console.log('Filter Risk ', myFilter_UserStories);
   var store_UserStories = Ext.create('Rally.data.wsapi.Store', { // create 
      model: 'UserStory',
      limit: Infinity,
      autoLoad: true,
     // filters: myFilter_UserStories,
	 
	  
      fetch: ['FormattedID', 'Name', 'c_RAIDType'],
    });
    console.log('Store Risk ', store_UserStories);
	
    var myGrid_UserStories = Ext.create('Ext.container.Container', {
      items: [{
        xtype: 'rallygrid',
        model: 'UserStory',
        store: store_UserStories,
		context: this.getContext(),
        height: '100%',
        columnCfgs: ['FormattedID', 'Name'],
      }],
    });
	
    console.log('Grid Risk ', myGrid_UserStories);
	
	
    var myFilter_TestCase_Result = Ext.create('Rally.data.wsapi.Filter', {
      property: 'c_RAIDType',
      operation: '=',
      value: 'Issue'
    });
    console.log('Filter Issue ', myFilter_TestCase_Result);
    var store_TestCase_Result = Ext.create('Rally.data.wsapi.Store', { // create 
      model: 'TestCaseResult',
      limit: Infinity,
      autoLoad: true,
    //  filters: myFilter_TestCase_Result,
      fetch: ['Build', 'Notes', 'Tester'],
    });
    console.log('Store Issue ', store_TestCase_Result);
    var myGrid_TestCase_Result = Ext.create('Ext.container.Container', {
      items: [{
        xtype: 'rallygrid',
        model: 'TestCaseResult',
        store: store_TestCase_Result,
		context: this.getContext(),
        height: '100%',
        columnCfgs: ['Build', 'Notes', 'Tester'],
      }],
    });
    console.log('Grid Issue ', myGrid_TestCase_Result);
	
	
	
    var output = Ext.create('Ext.container.Container', {
	   layout: {
        type: 'hbox'
    },
    //width: 400,
    renderTo: Ext.getBody(),
    border: 1,
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
    defaults: {
        labelWidth: 80,
        // implicitly create Container by specifying xtype
      //  xtype: 'rallygrid',
        flex: 1,
        style: {
            padding: '10px'
        }
    },
      items: [{
        title: 'Usr Stories & Defects',
        items: [
          myGrid_UserStories
        ]
      }, {
        title: 'Test Case results',
        items: [
          myGrid_TestCase_Result
        ]
      }
	  ]
    });
	
	
    this.add(output);
  },
});

