/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.require([
	"jquery.sap.global",
	"sap/ui/test/Opa5",
	"sap/ui/test/opaQunit"
], function (jQuery, Opa5, opaTest) {
	/*global QUnit */
	"use strict";

	QUnit.module("sap.ui.core.sample.ViewTemplate.types");

	//*****************************************************************************
	opaTest("OData Types", function (Given, When, Then) {
		var vRealOData = jQuery.sap.getUriParameters().get("realOData"),
			bRealOData = /direct|proxy|true/.test(vRealOData);

		Given.iStartMyAppInAFrame("../../common/index.html?component=ViewTemplate.types"
			+ "&sap-language=en"
			+ (bRealOData ? "&sap-server=test" : "")
			+ "&realOData=" + encodeURIComponent(vRealOData));

		When.onTheMainPage.changeMinMaxField("100");
		Then.onTheMainPage.checkMinMaxField();
		Then.onTheMainPage.checkLog();
		Then.iTeardownMyAppFrame();
	});
});
