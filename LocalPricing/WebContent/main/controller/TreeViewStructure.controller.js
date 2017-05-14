sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel'
], function(jQuery, Controller, Filter, JSONModel) {
"use strict";
 
	return Controller.extend("sap.ui.my.main.controller.TreeViewStructure", {
		
		onInit: function() {
			
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.my.main", "/tree.json"));
		//	var oModel = new JSONModel("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/sample/Tree/Tree.json")
			this.getView().setModel(oModel);
			
			var oProductionModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.my.main", "/products.json"));
			this.getView().setModel(oProductionModel,"ProductModel");
			
//			var treeModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.my.poc", "/tree.json"));
//			this.oView.byId("Tree").setModel(treeModel);
		},
		
		// getting router which is declared in component file

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},

		// this function will trigger when button is clicked
		
		navToSecond : function (oEvent){
			this.getRouter().navTo("second"); 	// calls route name "second"
		}

	});
 
});