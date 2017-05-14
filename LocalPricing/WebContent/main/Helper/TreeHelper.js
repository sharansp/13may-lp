jQuery.sap.declare("sap.ui.my.main.Helper.TreeHelper");
jQuery.sap.require("sap.ui.my.main.js.papaparse");
jQuery.sap.require("sap.ui.model.json.JSONModel");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.my.main.Helper.TreeHelper = {
		
	processTreeData: function(data, parentContext){
		var that = this;
		var jsonObj = {};
		var prevjousLevel = 0;
		if(data && data.length > 0 ){
			var previousLevel = 0;
			jsonObj["root"]= {};
			jsonObj["root"]["children"] = [];
			var lelvel1Cnt = 0;
			var level2Cnt =  0;
			var level3Cnt = 0;
			var level4Cnt  = 0;
			$.each(data, function(index, value){
				
				switch(value.level){
					case 0:
						if(!jsonObj["root"]["children"]){
							jsonObj["root"]["children"] = [];
						}
						jsonObj["root"]["children"].push(value);
					break;
					case 1:
						lelvel1Cnt = jsonObj["root"]["children"].length-1;
						if(!jsonObj["root"]["children"][lelvel1Cnt]["children"]){
							jsonObj["root"]["children"][lelvel1Cnt]["children"]=[];	
						}
						
						jsonObj["root"]["children"][lelvel1Cnt]["children"].push(value);
						break;
					case 2:
						 level2Cnt = jsonObj["root"]["children"][lelvel1Cnt]["children"].length-1 
						if(!jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"]){
							jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"] = [];
						}
						jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"].push(value);
						break;
					case 3:
						 level3Cnt =  jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"].length-1 ;
						if(!jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"]){
							jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"] = [];
						}
						jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"].push(value);
						break;
					case 4:
						 level4Cnt =  jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"].length-1 ;
							if(!jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"]){
								jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"]= [];
							}
							jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"].push(value);
						break;
				}
			});
		}
		parentContext.oView.setModel(new sap.ui.model.json.JSONModel(jsonObj),"WbsModel");
	//	var modelData = parentContext.oView.getModel("WbsModel").getData();
//		console.log("final Data " + jsonObj);
	},
	
	processTreeData1: function(data, parentContext){
		var that = this;
		var jsonObj = {};
		var prevjousLevel = 0;
		if(data && data.length > 0 ){
			var previousLevel = 0;
			jsonObj["root"]= {};
			jsonObj["root"]["children"] = [];
			var lelvel1Cnt = 0;
			var level2Cnt =  0;
			var level3Cnt = 0;
			var level4Cnt  = 0;
			var level5Cnt = 0;
			var level6Cnt = 0;
			$.each(data, function(index, value){
				
				switch(value.level){
					
					case 0:
						if(!jsonObj["root"]["children"]){
							jsonObj["root"]["children"] = [];
						}
						var itemId = (jsonObj["root"]["children"].length+1) * 10;
						var obj = {"description":"Item "+itemId+"-"+value.text };
						
						jsonObj["root"]["children"].push(obj);
						lelvel1Cnt = jsonObj["root"]["children"].length-1;
						if(!jsonObj["root"]["children"][lelvel1Cnt]["children"]){
							jsonObj["root"]["children"][lelvel1Cnt]["children"]=[];	
						}
						
						jsonObj["root"]["children"][lelvel1Cnt]["children"].push(value);
						break;
					case 1:
						 level2Cnt = jsonObj["root"]["children"][lelvel1Cnt]["children"].length-1 
						if(!jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"]){
							jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"] = [];
						}
						jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"].push(value);
						break;
					case 2:
						 level3Cnt =  jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"].length-1 ;
						if(!jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"]){
							jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"] = [];
						}
						jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"].push(value);
						break;
					case 3:
						 level4Cnt =  jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"].length-1 ;
							if(!jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"]){
								jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"]= [];
							}
							jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"].push(value);
						break;
					case 4:
						 level5Cnt =  jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"].length-1 ;
							if(!jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"][level5Cnt]["children"]){
								jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"][level5Cnt]["children"]= [];
							}
							jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"][level5Cnt]["children"].push(value);
						break;
					case 5:
						 level6Cnt =  jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"][level5Cnt]["children"].length-1 ;
							if(!jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"][level5Cnt]["children"][level6Cnt]["children"]){
								jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"][level5Cnt]["children"][level6Cnt]["children"]= [];
							}
							jsonObj["root"]["children"][lelvel1Cnt]["children"][level2Cnt]["children"][level3Cnt]["children"][level4Cnt]["children"][level5Cnt]["children"][level6Cnt]["children"].push(value);
						break;
				}
			});
		}
		parentContext.oView.setModel(new sap.ui.model.json.JSONModel(jsonObj),"WbsFullModel");
	},
	reArrange: function(data, parentContext){
		var model  = parentContext.parentContext.oView.getModel("WbsModel");
		var modelData = model.getData();
		$.each(modelData, function(index, value){
			value["level_0_0"] =  value.level == "0" ? false : (value.expand ? true : false);
			value["level_1_0"] =  value.level == "1" ? false : (value.expand ? true : false);
			value["level_2_0"] =  value.level == "2" ? false : (value.expand ? true : false);
			value["level_3_0"] =  value.level == "3" ? false : (value.expand ? true : false);
			value["level_4_0"] =  value.level == "4" ? false : (value.expand ? true : false);
			value["level_5_0"] =  value.level == "5" ? false : (value.expand ? true : false);
			value["level_6_0"] =  value.level == "6" ? false : (value.expand ? true : false);
			value["level_7_0"] =  value.level == "7" ? false : (value.expand ? true : false);
			
			value["level_0_1"] =  value.level == "0" ? true : (value.expand ? true : false);
			value["level_1_1"] =  value.level == "1" ? false : (value.expand ? true : false);
			value["level_2_1"] =  value.level == "2" ? false : (value.expand ? true : false);
			value["level_3_1"] =  value.level == "3" ? false : (value.expand ? true : false);
			value["level_4_1"] =  value.level == "4" ? false : (value.expand ? true : false);
			value["level_5_1"] =  value.level == "5" ? false : (value.expand ? true : false);
			value["level_6_1"] =  value.level == "6" ? false : (value.expand ? true : false);
			value["level_7_1"] =  value.level == "7" ? false : (value.expand ? true : false);
		});
		model.refresh();
	},
	
	
	
	
}