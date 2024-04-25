sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("uitable.uitable.controller.Ui-table", {
            onInit:function(){
				var json= new sap.ui.model.json.JSONModel("model/TableData.json");
				json.attachRequestCompleted(function(oEvent){
					debugger;
					var data=oEvent.getSource().getData().results;
					for(var i=0;i<data.length;i++){
						data[i].sel="";
						data[i].enbl=false;
					}
					oEvent.getSource().refresh(true);
				});
				this.byId("uiTable").setModel(json);
				this.byId("uiTable").bindRows("/results");
				var prodCol=this.byId("ProductName");
				this.byId("uiTable").sort(prodCol,sap.ui.table.SortOrder.Ascending);
			},
			FormatStock:function(value1,value2){
			
				if(value1<20){
					return "Error";
				}else if(value1>20 && value1 <40){
					return "Warning";
				}else if(value1>40){
					return "Success";
				}
			},
			onAfterRendering:function(){
				debugger;
			},
			onCangeOrder:function(oEvent){
				
				var unitInStock=oEvent.getSource().getParent().getCells()[6].getNumber();
				var orderval=oEvent.getParameter('value');
				if(parseFloat(orderval) > parseFloat(unitInStock)){
					sap.m.MessageToast.show(orderval+" Products not available in stock");
					oEvent.getSource().setValueState("Error");
				}else{
					oEvent.getSource().setValueState("None");
				}
			},
			onUpdateRows:function(oEvent){
				debugger;
			},
			onSelectRow:function(oEvent){
				debugger;
				var rowIndex=oEvent.getParameter('rowIndex');
				var selectAll=oEvent.getParameter('selectAll');
				var data=oEvent.getSource().getModel().getData().results;
				if(selectAll){
					
					for(var i=0;i<data.length;i++){
						data[i].sel=true;
						data[i].enbl=true;
					}
				}else if(rowIndex===-1){
					for(var i=0;i<data.length;i++){
						data[i].sel="";
						data[i].enbl=false;
					}
				}else{
					var index=Number(oEvent.getParameter('rowContext').getPath().split("/results/")[1]);
				var obj=oEvent.getSource().getModel().getData().results[index];
				if(obj.sel===""){
					obj.sel=true;
					obj.enbl=true;
				}else{
					obj.sel="";
					obj.enbl=false;
				}
				}
				
				oEvent.getSource().getModel().refresh(true);
			},
	});
});