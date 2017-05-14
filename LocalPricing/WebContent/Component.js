sap.ui.define([
	    "sap/ui/core/UIComponent",
	   ], function (UIComponent) {
	"use strict";

	return UIComponent.extend("sap.ui.my.Component", {

		metadata : {

			"rootView" : "sap.ui.my.main.view.App", // initial view

			"routing" : {
				"config" : {
					"routerClass" : "sap.m.routing.Router", // router class
					"viewType" : "XML", // types of views using in app
					"viewPath" : "sap.ui.my.main.view", // folder of views
					"controlId" : "app", // container where pages are placed while navigating 
					"controlAggregation" : "pages", // contents which needs to be replced while navigating
					"transition" : "slide" // navigation transition effect
				},

				"routes" : [ { // defining routes
					"pattern" : "", // pattern of the URL
					"name" : "dashboard", // name of route
					"target" : "dashboard" // name of target
				}, 
				{
					"pattern" : "quotation",
					"name" : "quotation",
					"target" : "quotation"
				},
				{
					"pattern" : "quotations",
					"name" : "quotations",
					"target" : "quotations"
				},
				{
					"pattern" : "quotation/{id}",
					"name" : "quotation",
					"target" : "quotation"
				}],

				"targets" : { // defining targets
					"dashboard" : { // route name
						"viewName" : "Dashboard" // target view name, will be navigated to this view
					},
					"quotation" : {
						"viewName" : "Quotation"
					},
					"quotations": {
						"viewName" : "QuotationsList"
					},
					"notFound": {
						"viewName": "NotFound",
						"transition": "show"
					}
				}

			}/*,
			config: {
                sample: {
                    stretch: true,
                    files: [
                        "sap/ui/my/main/wbsmetadata.xml",
                        "sap/ui/my/main/service/MockServer.js",
                        "Component.js",
                    ]
                }
            }*/
		},

		init : function() {
			
			/* var sODataServiceUrl = "/mock/service/url/";
			 
	            // init our mock server
	            mockserver.init(sODataServiceUrl);
	 
	            // set model on component
	            this.setModel(
	                new ODataModel(sODataServiceUrl, {
	                    json : true,
	                    useBatch : true
	                })
	            );*/
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments); // calling parent UIComponents

			// create the views based on the url/hash
			this.getRouter().initialize(); // initializing router
		}

	});

});