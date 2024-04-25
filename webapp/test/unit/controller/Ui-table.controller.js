/*global QUnit*/

sap.ui.define([
	"uitable/ui-table/controller/Ui-table.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Ui-table Controller");

	QUnit.test("I should test the Ui-table controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
