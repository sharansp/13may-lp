jQuery.sap.declare("sap.ui.my.main.Helper.FileHelper");
jQuery.sap.require("sap.ui.my.main.js.papaparse");
jQuery.sap.require("sap.m.MessageBox");
sap.ui.my.main.Helper.FileHelper = {
		
//	papaparse: sap.ui.my.main.js,papaparse,
	
	uploadFile : function(evt,parentContext , fieldList, modelName, callBack) {
			 this.fieldList = fieldList;
			 this.parentContext = parentContext;
			 this.modelName = modelName;
			 this.callBack = callBack;
			// Handle the CSV File upload dialog box
			if (!parentContext.fileUploadDlg) {
				parentContext.fileUploadDlg = sap.ui
						.xmlfragment("fileUpload", "sap.ui.my.main.fragment.FileUpload", this);
			}
			parentContext.fileUploadDlg.open();
	},

	handleProcessFile : function(evt ) {
			var fileUploadControl = sap.ui.core.Fragment.byId("fileUpload", "csvFileUpload");
			var selectedFile;
			var that = this;
			if (fileUploadControl && fileUploadControl.oFileUpload && fileUploadControl.oFileUpload.files && fileUploadControl.oFileUpload.files.length > 0) {
				selectedFile = fileUploadControl.oFileUpload.files[0];
				if (selectedFile.type != "application/vnd.ms-excel" && selectedFile.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
					sap.m.MessageBox.show("Invalid File", {
						icon : sap.m.MessageBox.Icon.ERROR,
						title : "Error",
						actions : [ sap.m.MessageBox.Action.OK ]
					});
					fileUploadControl.setValue("");
					return;
				}
				if (selectedFile) {
					Papa.parse(selectedFile, {
						header : true,
						dynamicTyping : true,
						skipEmptyLines : true,
						complete : $.proxy(that.processCSVData, that)
					});
				}
			}
		},
		
		// The code needs to be refactored if needed..
		processCSVData : function(results) {
			var model = this.parentContext.oView.getModel("WbsModel");
			var modelData = model.getData();
			var duplicateProducts = [];
			var requests = [];

			// Key is the Technical name and the value is the one
			// which we should look up in the CSV file.
			
			var that = this;
			errorFlagTemp = false;
			this.upLoadMat = [];
			var that = this;
			var misMatchfields = [];
			$.each(this.fieldList, function(i, f) {
				if (results.meta.fields.indexOf(f) < 0) {
					errorFlagTemp = true;
					misMatchfields.push(f);
				}
			})
			if (errorFlagTemp) {
				var str = "Mismatched Fields: " + misMatchfields.toString();
				sap.m.MessageBox.show(str, {
					icon : sap.m.MessageBox.Icon.ERROR,
					title : "Error",
					actions : [ sap.m.MessageBox.Action.OK ]
				});
				that.parentContext.fileUploadDlg.close();
				sap.ui.core.Fragment.byId("fileUpload", "csvFileUpload").clear();
			} else {
				that.updateTable(results.data);
				sap.m.MessageBox.show("File Processed Successfully",
						sap.m.MessageBox.Icon.SUCCESS, "SUCCESS");
				that.parentContext.fileUploadDlg.close();
				sap.ui.core.Fragment.byId("fileUpload", "csvFileUpload").clear();
			}

		},
		
		updateTable: function(data){
			var model  = this.parentContext.oView.getModel(this.modelName);
			model.setData(data);
			model.refresh();
			this.callBack(data);
			
		},
		handleClose: function(){
			this.parentContext.fileUploadDlg.close();
		},
}