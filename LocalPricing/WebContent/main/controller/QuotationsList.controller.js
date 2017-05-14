sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter',
		'sap/ui/model/json/JSONModel',
		'sap/ui/my/main/Helper/ODataHelper'
	], function(jQuery, Controller, Filter, JSONModel, ODataHelper) {
	"use strict";
 
	var controller = Controller.extend("sap.ui.my.main.controller.QuotationsList", {
 
		onInit: function () {
			sap.ui.core.BusyIndicator.show(0);
			var quoteModel = new sap.ui.model.json.JSONModel(this.oEntry);
			this.oView.setModel(quoteModel,"QuoteModel");
			
			var oModel = new JSONModel({"results":[]});
			this.getView().setModel(oModel,"QuotesModel");
			
			ODataHelper.readData(this, "QuotesModel", "/Quotes");
			
			/*var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.my.main", "/quotes.json"));
			this.getView().setModel(oModel,"QuotesModel");*/
			
//			console.log("data came");
		},
		
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
 
		handleIconTabBarSelect : function (oEvent) {
			//console.log("handleIconTabBarSelect");
			
		},

		goToHome: function(){
			this.getRouter().navTo("dashboard");
		},
		
		editItem: function(evt){
			//sap.m.MessageBox.alert("Add Button Pressed");
			if(!this.oDialog){
				this.oDialog = sap.ui.xmlfragment("dlg", "sap.ui.my.main.fragment.PricingDialog");
	            this.oView.addDependent(this.oDialog);
			}
			this.oDialog.open();
		},
		
		closeDlg: function(evt){
			this.oDialog.close();
		},
		
		showErrors: function(){
			sap.m.MessageBox.alert("Error");
		},
		addQuoteItem: function(evt){
			var quoteModel = new sap.ui.model.json.JSONModel("sap.ui.my.main", "/quote.json");
			this.oView.setModel(quoteModel,"QuoteModel");
			this.getRouter().navTo("quotation");
			
		},
		editQuoteItem: function(evt){
			var obj = evt.getSource().getBindingContext("QuotesModel").getObject();
			this.getRouter().navTo("quotation",{
				id : obj.id
//				data: obj
			});
		}
	});
 
 
	return controller;
 
});