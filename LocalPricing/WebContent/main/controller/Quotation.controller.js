sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter',
		'sap/ui/model/json/JSONModel',
		'sap/ui/my/main/Helper/ODataHelper',
		'sap/ui/my/main/Helper/FileHelper',
		'sap/ui/my/main/Helper/TreeHelper',
		'sap/ui/my/main/js/moment'
		
	], function(jQuery, Controller, Filter, JSONModel,ODataHelper,fileHelper,treeHelper, moment) {
	"use strict";
 
	var controller = Controller.extend("sap.ui.my.main.controller.Quotation", {
         callBack : null,
         
		onInit: function (inData) {
			//sap.ui.core.BusyIndicator.show(0);
			var url = "/pricing/pricingApp/services/quote.xsodata";
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("quotation").attachPatternMatched(this._onObjectMatched, this);
			
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.my.main", "/data.json"));
			this.getView().setModel(oModel);
			
			var oWorkFlowModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.my.main", "/workflow.json"));
			this.getView().setModel(oWorkFlowModel,"WorkFlowModel");

			var oProductionModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.my.main", "/products.json"));
			this.getView().setModel(oProductionModel,"ProductModel");
			
			var otreeModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.my.main", "/tree.json"));
			this.getView().setModel(otreeModel,"EsitimateTreeModel");
		  	

		},
		
		_onObjectMatched: function (oEvent) {
			var id = oEvent.getParameter("arguments").id;
			if(id && parseInt(id) >= 0){
				this.getQuoteData(id);
			}
			var wbsModel = new JSONModel({});
			this.getView().setModel(wbsModel,"WbsModel");
			
			this.getView().setModel(wbsModel,"WbsOriginalModel");
			
			this.getView().setModel(wbsModel,"WbsFullModel");
			
			var oItemModel = new JSONModel({});
			this.getView().setModel(oItemModel,"ItemsModel");
		},
		getQuoteData(id){
		
			ODataHelper.readData(this, "QuotesModel", "/Quotes");
			
			ODataHelper.readData(this, "StatusModel", "/Status");
			
			ODataHelper.readData(this, "OpportunityModel", "/Opportunity");
			
			ODataHelper.readData(this, "QuoteTypeModel", "/QuoteTypes");
			
			ODataHelper.readData(this, "CustomersModel", "/Customers");
			
			ODataHelper.readData(this, "CostModel", "/CostObject");
			
			ODataHelper.readData(this, "ContactsModel", "/Contacts");
			
			ODataHelper.readData(this, "SalesDeptModel", "/SalesDept");
			
			ODataHelper.readData(this, "DBUserModel", "/DBUser");
			if(id > 0 ){
				ODataHelper.readData(this, "QuoteModel", "/Quotes?$filter=( id eq '"+id+"' )");
			}else {
				this.initQuoteModel();
			}
		
			
			
			
		},
		
		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			var quoteId = oArgs.id;
			var url = "/Quotes?$filter=id eq quoteId";
			ODataHelper.readData(this,"QuotesModel",url);
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
 
		handleIconTabBarSelect : function (oEvent) {
//			console.log("handleIconTabBarSelect");
//			var src= oEvent.getSource();
			var key =oEvent.mParameters.item.getKey();
			switch(key){
			case "plan":
				this.addWorkflow();
				break;
			}
							
		},
		goToHome: function(){
			this.getRouter().navTo("dashboard");
		},
		addItem: function(evt){
			var newItem={
					"ItemId":"000090",
					"ProductId": "P1339823",
					"Name": "Locking Cable Test",
					"Category": "Accessory",
					"SupplierName": "Technocom",
					"Description": "Lock for Monitor",
					"WeightMeasure": 40,
					"WeightUnit": "g",
					"Del_Date":"2017-03-20",
					"UnitPrice":10.2,
					"Price": 13.49,
					"CurrencyCode": "EUR",
					"Status": "Available",
					"Quantity": 30,
					"UoM": "PC",
					"Width": 11,
					"Depth": 11,
					"Height": 3,
					"DimUnit": "cm",
					"ProductPicUrl": "https://openui5.hana.ondemand.com/test-resources/sap/ui/demokit/explored/img/HT-1111.jpg"
				}
			
			//var oModel = new JSONModel({newItem}); 
			if(!this.oDialog){
				this.oDialog = sap.ui.xmlfragment("sap.ui.my.main.fragment.PricingDialog", this);
	            this.oView.addDependent(this.oDialog);
			}
			var oModel = this.oView.getModel("ItemModel");
			var modelData = oModel.getData(); 
			modelData = newItem; //.push(newItem);
			this.oView.setModel(oModel,"ItemModel");
			oModel.refresh();
			this.oDialog.open();
			//this.confrimPricing();
		},
		
		editItem: function(evt){
			var src = evt.getSource();
			var selectedItem = src.getBindingContext("ProductModel").getObject();
			var oModel = new JSONModel(selectedItem);
			//this.oView.setModel(oModel,"ItemModel")
			if(!this.oDialog){
				this.oDialog = sap.ui.xmlfragment( "sap.ui.my.main.fragment.PricingDialog", this);
	            this.oView.addDependent(this.oDialog);
			}
			this.oView.setModel(new JSONModel({"title":"Pricing &amp; Shipping Details for item  "+selectedItem.ItemId+" "+selectedItem.Name}),"DialogModel");
			this.oView.setModel(oModel,"ItemModel")
			this.oDialog.open();
		},
		
		closeDlg: function(evt){
			//pricingDlg
			var oModel = new JSONModel({});
			this.oDailog.setModel(oModel,"ItemModel");
			this.oDialog.close();
		},
		confrimPricing: function(){
			var oModel = this.oView.getModel("ItemModel");
			var data = oModel.getData();
			var oProdModel = this.oView.getModel("ProductModel");
			oProdModel.getData().ProductCollection.push(data);
		//	this.oView.setModel(oProdModel,"ProductModel");
			oProdModel.refresh();
			this.oCostDialog.close();
		},
		openSkeltonDlg: function(evt){
			//sap.m.MessageBox.alert("Add Button Pressed");
			if(!this.oSkeltonDialog){
				this.oSkeltonDialog = sap.ui.xmlfragment( "sap.ui.my.main.fragment.SkeletonDialog", this);
	            this.oView.addDependent(this.oSkeltonDialog);
			}
			this.oSkeltonDialog.open();
		},
		
		closeSkelteonDlg: function(evt){
			this.oSkeltonDialog.close();
		},
		
		editSkeleton: function(){
			this.openSkeltonDlg();
		},
		
		showErrors: function(){
			sap.m.MessageBox.alert("Error");
		},
		handleChange: function(evt){
			
		},
		closePricingDlg: function(evt){
			this.oCostDialog.close();
		},
		
		pressUploadReq: function(evt){
			if(!this.oFileUpload){
				this.oFileUpload = sap.ui.xmlfragment( "sap.ui.my.main.fragment.FileUpload", this);
	            this.oView.addDependent(this.oFileUpload);
			}
			this.oFileUpload.open();
		},
		
		handleClose: function(){
			this.oFileUpload.close();
		},
		getUnitFormat: function(value){
			return (value ? value  : "0" ) +  "  /Unit";
		},
		editBidItem: function(evt){
			var src = evt.getSource();
			var selectedItem = src.getBindingContext("ProductModel").getObject();
			var oModel = new JSONModel(selectedItem);
			//this.oView.setModel(oModel,"ItemModel")
			if(!this.oCostDialog){
				this.oCostDialog = sap.ui.xmlfragment("sap.ui.my.main.fragment.CostEstimate" , this);
	            this.oView.addDependent(this.oCostDialog);
			}
			this.oView.setModel(new JSONModel({"title":"Rough Order of Magnitude Cost Estimate for Quotation Item "+selectedItem.ItemId+" "+selectedItem.Name}),"DialogModel");
			this.oView.setModel(oModel,"ItemModel");
			
			var oTreeModel = new JSONModel("sap.ui.my.main", "/clothing.json");
			this.getView().setModel(oTreeModel,"TreeModel");
			
			
			this.oCostDialog.open();
		},
		
		saveQuote: function(evt){
			var model = this.oView.getModel("QuoteModel");
			var modelData = model.getData();
			modelData.programStart= modelData.programStart.replace(/-/g , "");
			modelData.programStart= modelData.programEnd.replace(/-/g , "");
			ODataHelper.create(this,"/Quotes",modelData);
		},
		
		initQuoteModel: function(){
//			var currDate = new Date();
			//var startDate = moment(currDate).format("YYYY-MM-DD");
			//var endDate = moment(currDate).format("YYYY-MM-DD");
			var d = new Date();
		    var curr_date = d.getDate();
		    var curr_month = d.getMonth() + 1; //Months are zero based
		    var curr_year = d.getFullYear();
		    console.log(curr_date + "-" + curr_month + "-" + curr_year);
					var startDate =  curr_year+"-"+curr_month+"-"+curr_date;
					var endDate =  curr_year+"-"+curr_month+"-"+curr_date;
			var oEntry = {
		 			"id": '',
		 			"docnr": "123",
		 			"type": "",
		 			"text": "",
		 			"owner": "",
		 			"assumptions": "",
		 			"template": "",
		 			"customerID": "",
		 			"contactID": "",
		 			"companyID": "",
		 			"department": "",
		 			"responseWbs": "",
		 			"quoteWbs": "",
		 			"createdOn": "",
		 			"received": "",
		 			"responseDue": "",
		 			"changedOn": "",
		 			"createdBy": "",
		 			"changedBy": "",
		 			"programStart": startDate,
		 			"programEnd": endDate,
		 			"status": "",
		 			"workflow": "",
		 			"team": "",
		 			"currency": "",
		 			"exchangeRateDate": "",
		 			"exchangeRate": "0.0",
		 			"pricingStrategy": "",
		 			"valuePricingWeight": "0.0",
		 			"targetMargin": "0.0",
		 			"investment": "0.0",
		 			"potentialValue": "0.0",
		 			"buValue": "0.0",
		 			"probability": "0.0",
		 			"factoredValue": "0.0",
		 			"files": "",
		 			"sdDocnr": "",
		 			"sfOpportunityID": "",
		 			"sfOpportunityNum": "",
		 			"sfOpportunityText": ""
		 	};
			
			var quoteModel = new sap.ui.model.json.JSONModel(oEntry);
			this.oView.setModel(quoteModel,"QuoteModel");

		},
		importWBS: function(evt){
			var fieldList = {
					"id" : "id",
					"versions" : "versions",
					"description":"description",
					"level" : "level",
					"quoteID" : "quoteID",
					"itemID" : "itemID",
					"text":"text",
					"owner": "owner",
					"customerID":"customerID",
					"contactID":"contactID",
					"companyID": "companyID",
					"department": "department",
					"currency":"currency",
					"costTarget":"costTarget",
					"bom":	"bom",
					"confidence":"confidence",
					"isTask":"isTask",
					"remarks": "remarks",
					"milestone": "milestone",
					"priority": "priority",
					"complexity": "complexity",
					"constraintType": "constraintType",
					"constraintDate": "constraintDate",
					"plannedStart": "plannedStart",
					"plannedEnd": "plannedEnd",
					"earlyStart": "earlyStart",
					"earlyEnd": "earlyEnd",
					"lateStart":"lateStart",
					"lateEnd": "lateEnd",
					"duration": "duration",
					"plannedEffort": "plannedEffort",
					"fixEffort": "fixEffort",
					"dependencies": "dependencies",
					"categories": "categories",
					"solutionApproach": "solutionApproach",
					"reuseWbs": "reuseWbs",
					"tags": "tags"

				};
			var that = this;
			this.callBack = function(data){
				treeHelper.processTreeData(data,that);
				treeHelper.processTreeData1(data,that);
				if(!that.oCostDialog){
					that.oCostDialog = sap.ui.xmlfragment("sap.ui.my.main.fragment.CostEstimate" , that);
					that.oView.addDependent(that.oCostDialog);
					}
					that.oView.setModel(new JSONModel({"title":"Rough Order of Magnitude Cost Estimate for Quotation Item "}),"DialogModel");
				that.oCostDialog.open();
			   };
		       fileHelper.uploadFile(evt, this, fieldList,"WbsOriginalModel", this.callBack);
		},
		processResponsePlanTable: function(){
			var that = this;
			var model = that.oView.getModel("ProductModel");
			var modelData = model.getData();

			var resPlanTbl = that.oView.byId("resPlanTbl");
			resPlanTbl.setModel( new JSONModel(modelData.ProductCollection));
			if(!this.workFlowFragment){
				this.workFlowFragment = sap.ui.xmlfragment("sap.ui.my.main.fragment.WorkflowTemplate", this);
			}
			var selectTemplate = this.workFlowFragment[1];
			var cells = [];
			var columns = [];
			$.each(modelData.ProductCollection[0],function(index, value){
				//cells[index] = [];
				cells.push( new sap.m.Text({value: "Phase"+(index+1)}));
					if(index == 0){
						//columns.push(new sap.m.Text({ text : ""}));
						resPlanTbl.addColumn(new sap.m.Text({ text : ""}));
					}
				
				 $.each(value.Filtes,function(index1, value1){
					cells[index].push( selectTemplate);
					if(index == 0){
						//columns.push(new sap.m.Text({ text : ""}));
						resPlanTbl.addColumn(new sap.m.Text({ text : ""}));
					}
				}); 
				
			});
			  resPlanTbl.bindItems("/", new sap.m.ColumnListItem({   cells :cells}));
										  
		},
		 
		getWorkFlowClmnTemplate: function(value){
			var vBox = new sap.m.VBox({"class":""})
		},
		
		getPhase: function(val){
			return "Phase"+val;
		},
		addWorkflow: function(){
			var that = this;
			var model = that.oView.getModel("WorkFlowModel");
			var modelData = model.getData();

			var resGrid = that.oView.byId("resGrid");
		//	var oLayout2 = new sap.ui.layout.VerticalLayout();
			resGrid.removeAllContent();
			/*if(!this.workFlowFragment){
				this.workFlowFragment = sap.ui.xmlfragment("sap.ui.my.main.fragment.WorkflowTemplate", this);
			}*/
			
			var gridContent = [];
			var hContent = [];
			
			//var oLayout2 = new sap.ui.layout.VerticalLayout();
			$.each(modelData.phases,function(index, value){
		        var content = [];
//				var oLayout2 = new sap.ui.layout.VerticalLayout();
				var phaseText = new sap.m.Text();
				phaseText.setText("Phase"+(index+1));
				//oHLayout2.addContent(phaseText);
				content.push(phaseText);
			//	resGrid.addContent(phaseText);
				$.each(value.columns,function(index1, value1){
					$.each(value1.struct1,function(index2, value2){
//						resGrid.addContent(that.workFlowFragment);
					var	workFlowFragment = sap.ui.xmlfragment("sap.ui.my.main.fragment.WorkflowTemplate", that);
					var cnt1 = workFlowFragment[0];
					var cnt2 = workFlowFragment[1];
					var cnt3 = workFlowFragment[2];
//					var structCnt = jQuery.extend(true,{},that.workFlowFragment.getItems());
//					if(structCnt){
						var vbox = new sap.m.VBox({
							  items: [
								new sap.m.ScrollContainer({
								  vertical: true,
								  content: [
									  cnt1,cnt2,cnt3
									 ]
								}).addStyleClass('container'),
	    
								]
						}).addStyleClass('vbox');
						content.push(vbox);
//					}
				//	console.log("kklkl");*/
					});
				});
				var hbox = new sap.m.HBox({
						  items: [
							new sap.m.ScrollContainer({
							  vertical: true,
							  content: [
								content
								 ]
							}).addStyleClass('container'),
    
							]
						}).addStyleClass('hbox');
				hContent.push(hbox);
			//	oLayout2.addContent(oHLayout2);
			//	resGrid.addContent(hContent);
			});
			var vMain = new sap.m.VBox({
						  items: [
							new sap.m.ScrollContainer({
							  vertical: true,
							  content: [
								hContent
								 ]
							}).addStyleClass('container'),
    
							]
						}).addStyleClass('vbox');
			resGrid.addContent(vMain);
		},
		importItems: function(evt){
			var fieldList = {
					"quoteID" : "quoteID",
					"seq":"seq",
					"id":"id",
					"product":"product",
					"text":"text",
					"remarks": "remarks",
					"qty":"qty",
					"unit":"unit",
					"unitPrice": "unitPrice",
					"extendedPrice":"extendedPrice",
					"discountPerc":"discountPerc",
					"discount":"discount",
					"taxPerc":"taxPerc",
					"tax":"tax",
					"shippingPerc":"shippingPerc",
					"shipping":"shipping",
					"handlingPerc":"handlingPerc",
					"handling":"handling",
					"netPrice":"netPrice",
					"deliveryDue":"deliveryDue",
					"start" :"start",
					"end": "end",
					"distribution" :"distribution",
					"deliveries" :"deliveries",
					"subscription":"subscription",
					"term":"term",
					"evaluation":"evaluation",
					"pricingRemarks":"pricingRemarks",
					"rom":"rom",
					"paramFields":"paramFields",
					"parameters":"parameters"
			};
			var that = this;
			this.callBack = function(data){
				// do the required in this call back after getting the response
			};
			debugger
			var oProdTable = this.oView.byId("idProductsTable")
		    fileHelper.uploadFile(evt, this, fieldList,"ItemsModel", this.callBack);
		},
		closeCostEstimategDlg: function(evt){
			this.oCostDialog.close();
		},
		confrimCostEstimate: function(evt){
			this.oCostDialog.close();
		},
		showFullScreen: function(evt){
			// this.oView.byId("TreeTableBasic1").setVisible(false);
			// this.oView.byId("estFragment").setVisible(false);
			// this.oView.byId("costFragment").setVisible(true);
			// this.oView.byId("costNewbtn").setVisible(false);
			
		},
		showSmallScreen: function(evt){
			// this.oView.byId("TreeTableBasic1").setVisible(true);
			// this.oView.byId("estFragment").setVisible(true);
			// this.oView.byId("costFragment").setVisible(false);
			
		},
		back: function(evt){
			this.getRouter().navTo("dashboard"); 
		},
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);	
		},
		editUitPrice: function (evt) {
			debugger;
		},
		/**
			*on selecting radio button Create Quote: Set Add Description Input visible 
			*Binding: yet to be done
		**/
		onSelectRB_NewQuote: function (evt) {
			var oInput = this.oView.byId("idAddDescriptionInput");
			//var oRB_NewQuote = this.oView.byId("idRB_NewQuote");
			if(evt.getParameter('selected'))
				oInput.setVisible(true);
			else
				oInput.setVisible(false);
		},

		onItemsTableEdit: function (evt) {
			var oModel = this.oView.getModel('ItemsModel');
			var modelData = oModel.getData();
			/*modelData.map(function(element) {
			   return element.ItemsTableEditable=true;
			});*/
			if (evt.getSource().getPressed()) {
				modelData.map(function(element) {
			   		return element.ItemsTableEditable=true;
				});
				evt.getSource().setTooltip("Save Table Items");
				evt.getSource().setText('Save');
			} else {
				modelData.map(function(element) {
			   		return element.ItemsTableEditable=false;
				});
				evt.getSource().setTooltip("Edit Table Items");
				evt.getSource().setText('Edit');
			};
			oModel.refresh();
		},
	});
 
 
	return controller;
 
});