sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
		
	], function(jQuery, Controller, JSONModel) {
	"use strict";
 
	var PageController = Controller.extend("sap.ui.my.main.controller.Dashboard", {
 
		onInit : function (evt) {
			// set mock model
			var sPath = jQuery.sap.getModulePath("sap.ui.my.main", "/data.json");
			var oModel = new JSONModel(sPath);
						
			this.getView().setModel(oModel);
			
			var chartsDataPath = jQuery.sap.getModulePath("sap.ui.my.main", "/books.json");
			var oCharsModel = new JSONModel(chartsDataPath);
			
						var oVizFrame = this.getView().byId("oVizFrame");
			oVizFrame.setModel(oCharsModel);
			
		},
 
		handleEditPress : function (evt) {
			var oTileContainer = this.getView().byId("container");
			var newValue = ! oTileContainer.getEditable();
			oTileContainer.setEditable(newValue);
			evt.getSource().setText(newValue ? "Done" : "Edit");
		},
 
		handleBusyPress : function (evt) {
			var oTileContainer = this.getView().byId("container");
			var newValue = ! oTileContainer.getBusy();
			oTileContainer.setBusy(newValue);
			evt.getSource().setText(newValue ? "Done" : "Busy state");
		},
 
		handleTileDelete : function (evt) {
			var tile = evt.getParameter("tile");
			evt.getSource().removeTile(tile);
		},
		
		setChartModel: function(){
		
			
		},
		
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},

		press: function(evt){
			var src = evt.getSource();
			var data = src.data();
			switch(data.key){
			case "create":
				this.getRouter().navTo("quotation",{
					id : 0
				});
				break;
			case "list":
				this.getRouter().navTo("quotations"); 
				break;
				
			}
		},
		navBack: function(evt){
			this.getRouter().navTo("dashboard"); 
		},
		handleLogout: function(){
	        var aUrl = "/sap/hana/xs/formLogin/token.xsjs";
	        jQuery.ajax({
	            url: aUrl,
	            method: 'GET',
	            dataType: 'text',
	            beforeSend: function(jqXHR) {
	                jqXHR.setRequestHeader('X-CSRF-Token', 'Fetch');
	            },
	            success: function(arg1, arg2, jqXHR) {
	                var aUrl = "/sap/hana/xs/formLogin/logout.xscfunc";
	                jQuery.ajax({
	                    url: aUrl,
	                    type: 'POST',
	                    dataType: 'text',
	                    beforeSend: function(jqXHR1, settings) {
	                        jqXHR1.setRequestHeader('X-CSRF-Token', jqXHR.getResponseHeader('X-CSRF-Token'));
	                    },
	                    success: function() {
	                        location.reload();
	                    },
	                    error: function() {

	                    }
	                });
	            },
	            error: function() {

	            }
	        });
		}
	});
 
	return PageController;
 
});




