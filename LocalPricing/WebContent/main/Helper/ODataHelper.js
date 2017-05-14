jQuery.sap.declare("sap.ui.my.main.Helper.ODataHelper");
jQuery.sap.declare("sap.ui.my.main.js.moment");
sap.ui.my.main.Helper.ODataHelper = {

     readData: function(parentContext, modelName, objectPath) {
		//	var url = "https://testhdbp1942513102trial.hanatrial.ondemand.com/pricing/pricingApp/services/quote.xsodata";
		var url = "/pricing/pricingApp/services/quote.xsodata";
		var userName = "mrudula";
		var pwd = "India@123"

		var oModel = new sap.ui.model.odata.ODataModel(url, false);

	oModel.read(objectPath, null, null, true, function(oData, response) {
		   var jsonData = (modelName !="QuoteModel") ? oData : (oData.results ? oData.results[0] : []);
		   if(modelName == "QuoteModel"){
			   var d = jsonData.programStart == "" ? new Date() : new Date(jsonData.programStart);
			    var curr_date =   d.getDate();
			    var curr_month = d.getMonth() + 1; //Months are zero based
			    var curr_year = d.getFullYear();
			    console.log(curr_date + "-" + curr_month + "-" + curr_year);
				var startDate =  curr_year+"-"+curr_month+"-"+curr_date;
					
			   jsonData.programStart = startDate;
			  
			   d = jsonData.programEnd == "" ? new Date() : new Date(jsonData.programEnd);
			  
			   var curr_date =   d.getDate();
			    var curr_month = d.getMonth() + 1; //Months are zero based
			    var curr_year = d.getFullYear();
			    var endDate =  curr_year+"-"+curr_month+"-"+curr_date;
			   jsonData.programEnd = endDate;
			}
			var jsonModel = new sap.ui.model.json.JSONModel(jsonData);
			parentContext.oView.setModel(jsonModel,modelName);
			
			sap.ui.core.BusyIndicator.hide();
			//console.log("success");
		});

	},
	create: function(parentContext,modelName, modelData){
		var sServiceUrl = "/pricing/pricingApp/services/quote.xsodata";
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		oModel.setDefaultBindingMode("TwoWay");
		oModel.setHeaders({
            "content-type": "application/json;charset=utf-8"
        });
		var reqObj = {};
		reqObj["quoteHeader"] = modelData;
		var itemsModel = parentContext.oView.getModel("ItemsModel");
		var itemData = [];
		if(itemsModel){
			itemData =itemsModel.getData();
		}
		reqObj["quoteItems"] = itemData;
        oModel.create(modelName, reqObj, null, jQuery.proxy(function() {
            alert("Create successful");
        
        },this), jQuery.proxy(function() {
            alert("Create failed");

        },this));
        
	},
	
	ajaxCall : function(url, data, methodType, success, error) {
//		var url = "/pricing/pricingApp/services/quote.xsodata";
		var userName = "mrudula";
		var pwd = "India@123"
		var requestobj = {
			type : methodType ? methodType : (methodType ? 'POST' : 'GET'),
			url : url,
			contentType : "application/json",
			data : data ? JSON.stringify(data) : undefined,
			username : userName,
			password : pwd,
			async : true,
			error : error,
			success : success
		}
	}

}