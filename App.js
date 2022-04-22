Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
	
    launch: function() {
		 var modelNames = ['userstory', 'defect', 'testcaseresult'];
		 var projecto = Ext.create('Ext.Container', {
				items: [{
					xtype: 'rallyprojectpicker'
				}],
				renderTo: Ext.getBody().dom
			});
			this.add(this.projecto) ;
			this.contendor = Ext.create('Ext.container.Container', {
				layout:{
					type: 'hbox'

				},
				renderTo: Ext.getBody(),
				border: 7,
				style: {borderColor:'#00A9E0', borderStyle:'solid', borderWidth:'1px'},
						
				items: [{xtype: 'rallyprojecttree'  ,
							listeners: {
								click: {
									element: 'el', //bind to the underlying el property on the panel
									fn: function(){ console.log('click el'); }
								},
								dblclick: {
									element: 'body', //bind to the underlying body property on the panel
									fn: function(){ console.log('dblclick body'); }
								},
								select: {
									element: 'body', //bind to the underlying body property on the panel
									fn: function(){ console.log('select body'); }
								}
							}
						},
				// Lista con Hisotrias de usuario y Defectos
						{
						  xtype: 'rallygrid',
						  title: "Historias y Defectos",
						  flex: 1,
						  border: 7,
						  margin: '5 5 5 5',
						  enableEditing: true,
						  shouldShowRowActionsColumn: true,
                          enableBulkEdit: true,
                          enableRanking: false,
						  stateful: false,
                          columnCfgs: [
								'FormattedID',
								'Name',
								'ScheduleState',
								'Owner'
							],
							context: this.getContext(),
							storeConfig: {
								models: ['userstory', 'defect']
							},
							listeners: {
							/*	click: {
									element: 'el', //bind to the underlying el property on the panel
									fn: function(){ console.log('click el'); }
								},*/
								dblclick: {
									element: 'body', //bind to the underlying body property on the panel
									fn: function(){ console.log('dblclick body'); }
								},
								select: {
									element: 'body', //bind to the underlying body property on the panel
									fn: function(){ console.log('select body'); }
								}
							}
							
                        },
						{
						  xtype: 'rallygrid',
						  title: "Resultados Casos de pruebas",
						  flex: 1,
						  border: 7,
						  margin: '5 5 5 5',
						  enableEditing: true,
						  shouldShowRowActionsColumn: true,
                          enableBulkEdit: true,
                          enableRanking: false,
						//  plugins: [ {'rallygridboardaddnew'}],
							columnCfgs: [
								'Build',
								'Tester',
								'Project',
								'Notes'
							],
							context: this.getContext(),
							storeConfig: {
								models: ['testcaseresult']
							}
                        }]
                });
				this.add(this.contendor);
						}
            });
			
	