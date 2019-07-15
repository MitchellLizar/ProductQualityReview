function afterOnLoad()
{
	//alert("afterOnLoad running");
	var stepNo = document.getElementById("mastercontrol.route.stepnumber").value;
	//alert("stepNo = "+stepNo);

	EnableDisableTasks();
	
	if(stepNo == 1)
	{
		DynamicRequireToggle("lblBeginDate", "BeginDate", true);
		DynamicRequireToggle("lblEndDate", "EndDate", true);
		DynamicRequireToggle("lblProdCode", "mastercontrol.dataset.recordIDs.PharmaProd", true);
		DynamicFieldLabel("lblProdDesc", true);
	}

	SetLaunchedFormNo();
	//alert("SetLaunchedFormNo back to StartupScript");
	
	if(document.getElementById("hlpCAPAForm").value == "CAPA")
	{
		SetFormNumber('CAPA');
	}
	
	if(document.getElementById("hlpNONCForm").value == "Nonconformance")
	{
		SetFormNumber('Nonconformance');
	}
	
	try
	{
		SP_PrependBlankToKeyword("mastercontrol.role");
		//alert("StartupScript try back to StartupScript");
	}
	catch(ex)
	{
		//alert("StartupScript catch "+ex);
	}

	ApplyDateFormat();
	//alert("ApplyDateFormat back to StartupScript");

	SetTaskTableViewState(); // displays the Action Items information
	//alert("SetTaskTableViewState back to StartupScript");

	var taskCounter = document.getElementById("AI_Count").value;
	if(taskCounter < 1)
	{
		document.getElementById("mastercontrol.links.view.Action Item").disabled = true;
	}

	SelectOriginatorLaunched();
	//alert("SelectOriginatorLaunched back to StartupScript");

	DisplayViewLinksButtons();
	//alert("DisplayViewLinksButtons back to StartupScript");
	
	ShowSummary();
	//alert("Summary Section back to StartupScript");
	
	ShowSuppliers();
	ShowMaterials();
	//alert("Materials Section back to StartupScript");

	ShowIPC();
	ShowEPC();
	ShowPCOOS();
	//alert("Process Controls Section back to StartupScript");

	ShowBRI();
	//alert("Batch Records Section back to StartupScript");

	ShowDev();
	ShowNonCon();
	//alert("Dev and NONC Section back to StartupScript");

	ShowTechProcChg();
	//alert("Tech Changes Section back to StartupScript");

	ShowVariations();
	//alert("Market Auth Var Section back to StartupScript");

	ShowAccStudy();
	ShowLTStudy();
	//alert("Stability Section back to StartupScript");

	ShowReturns();
	ShowRecalls();
	ShowComplaints();
	//alert("C.R.&C. Section back to StartupScript");

	ShowCAPA();
	//alert("Prev Proc. CAPA Section back to StartupScript");

	ShowRegChgs();
	//alert("Post Mkt Section back to StartupScript");

	ShowMEquip();
	ShowQEquip();
	ShowUEquip();
	ShowCEquip();
	//alert("Equip. Section back to StartupScript");

	ShowContracts();
	//alert("Contracts Section back to StartupScript");

    ManipulateCalendarOnFields("showCalendar1");
	//alert("ready");
	
$("textarea").each(function() {
	$(this).keyup(function() {
	var target = $(this).attr("id");
	var tElement = document.getElementById(target);
	GrowUP(tElement);
	});
});

// ta expansion
$("#unfold").click(function() {
	alert("Hello!")
	$("[class^='long']").each(function() {
		var target = $(this).attr("id");
		var tElement = document.getElementById(target);
		GrowUP(tElement);
	});
	alert("unfold ran");
});

    window.scrollTo(0, 0);
	//alert("All Functions Operational.");
}

function SetForm()
{
	//alert("SetForm begins");
	var formTitle = document.getElementById("mastercontrol.form.title");
	var formNum = document.getElementById("mastercontrol.form.number");
	var strDesc = document.getElementById("mastercontrol.dataset.Products.Product Description").value;
	document.getElementById("txtSourceNumber").value = formNum.value;
	formTitle.value = formNum.value + " " + strDesc;
	document.getElementById("APQRTitle").value = formTitle.value;
	//alert("SetForm Title = "+document.getElementById("APQRTitle").value);
}

function ShowSummary()
{
	//alert("ShowSummary running");
	if (document.getElementById('cbReview2').checked === true)
	{
		//alert("cbReview2 checked");
		document.getElementById('GRCOpt2').style.display = "";
	}
	if (document.getElementById('cbReview3').checked === true)
	{
		//alert("cbReview3 checked");
		document.getElementById('GRCOpt3a').style.display = "";
		document.getElementById('GRCOpt3b').style.display = "";
		document.getElementById('GRCOpt3c').style.display = "";
		document.getElementById('GRCOpt4').style.display = "";
	}
	if (document.getElementById('cbReview4').checked === true)
	{
		//alert("cbReview4 checked");
		document.getElementById('GRCOpt4txt').style.display = "";
	}
	//alert("ShowSummary completed");
}

function ShowSuppliers()
{
	//alert("ShowSuppliers running");
	var chgRB = "rbChgdSrc";
	var matlFlds = $('textarea[id^="Ing"][id$="Name"]');
	for (var i = 0; i < matlFlds.length; i++)
	{
		var FldName = (matlFlds[i].name);
		var ssNum = FldName.substring(3, 5);
		var dispLine = "Item" + ssNum;
		var FldValue = document.getElementById(FldName).value;
		//alert(FldName+" "+ssNum+" "+dispLine+" "+FldValue);
		if (FldValue !== "")
		{
			document.getElementById(dispLine).style.display = "";
			if (document.getElementById(chgRB + ssNum).checked === true)
			{
				//alert("RB chgRB checked");
				if (document.getElementById(chgRB + ssNum).value === "Yes")
				{
					document.getElementById(dispLine + "chg").style.display = "";
				}
				else
				{
					//alert("RB value = No");
				}
			}
			else
			{
				//alert("chgRB not checked");
			}
		}
		else
		{
			//alert("no FldValue");
		}
	}
	//alert("ShowSuppliers completed");
}

function ShowMaterials()
{
	//alert("ShowMaterials running");
	var ncrFlds = $('textarea[id^="COANCRCodeNo"]');
	//alert(ncrFlds.length);
	for (var i = 0; i < ncrFlds.length; i++)
	{
		var FldName = (ncrFlds[i].id);
		var ssNum = FldName.substring(12, 14);
		//alert("FldNamess = "+ssNum);
		var dispLine = "QCNCR" + ssNum;
		var FldValue = document.getElementById(FldName).value;
		if (FldValue !== "")
		{
			document.getElementById(dispLine).style.display = "";
		}
	}
	var oosFlds = $('textarea[id^="COAOOSCodeNo"]');
	//alert(oosFlds.length);
	for (var i = 0; i < oosFlds.length; i++)
	{
		var FldName = (oosFlds[i].id);
		var ssNum = FldName.substring(12, 14);
		//alert("FldNamess = "+ssNum);
		var dispLine = "QCOOS" + ssNum;
		var FldValue = document.getElementById(FldName).value;
		if (FldValue !== "")
		{
			document.getElementById(dispLine).style.display = "";
		}
	}
	//alert("ShowMaterials completed");
}

function ShowIPC()
{
	//alert("ShowIPC running");
	var ipcFields = $('textarea[id^="IPCDesc"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(7, 9);
		var dispLine = "IPCDisp";
		var FldValue = document.getElementById(FldName).value;
		if (FldValue !== "")
		{
		//alert(FldName+" "+ssNum+" "+FldValue);
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowIPC completed");
}

function ShowEPC()
{
	//alert("ShowEPC running");
	var ipcFields = $('textarea[id^="EPCNo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(5, 7);
		var dispLine = "EPCDisp";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
		//alert(FldName+" "+ssNum+" "+FldValue);
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowEPC completed");
}

function ShowPCOOS()
{
	//alert("ShowPCOOS running");
	var ipcFields = $('textarea[id^="OOSPCLotNo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(10, 12);
		var dispLine = "IPOOS";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
		//alert(FldName+" "+ssNum+" "+FldValue);
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowPCOOS completed");
}

function ShowBRI()
{
	//alert("ShowBRI running");
	var ipcFields = $('textarea[id^="MBROOSLotNo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(11, 13);
		var dispLine = "BROOS";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowBRI completed");
}

function ShowDev()
{
	//alert("ShowDev running");
	var ipcFields = $('input[id^="LotNoDev"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(8, 10);
		var dispLine = "GenDev";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowDev completed");
}

function ShowNonCon()
{
	//alert("ShowNonCon running");
	var ipcFields = $('input[id^="LotNoNonc"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(9, 11);
		var dispLine = "GenNCR";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowNonCon completed");
}

function ShowTechProcChg()
{
	//alert("ShowTechProcChg running");
	var ipcFields = $('textarea[id^="ProcCCNo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(8, 10);
		var dispLine = "TechProcChg";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowTechProcChg completed");
}

function ShowVariations()
{
	//alert("ShowVariations running");
	var ipcFields = $('input[id^="VarNo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(5, 7);
		var dispLine = "MarVar";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowVariations completed");
}

function ShowAccStudy()
{
	//alert("ShowAccStudy running");
	var ipcFields = $('textarea[id^="SMASStudy"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(11, 13);
		var dispLine = "AccStudy";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowAccStudy completed");
}

function ShowLTStudy()
{
	//alert("ShowLTStudy running");
	var ipcFields = $('textarea[id^="SMLSStudy"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(11, 13);
		var dispLine = "LTStudy";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowLTStudy completed");
}

function ShowComplaints()
{
	//alert("ShowComplaints running");
	var ipcFields = $('textarea[id^="BComplaintLotNo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(15, 17);
		var dispLine = "COMPLAINT";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowComplaints completed");
}

function ShowReturns()
{
	//alert("ShowReturns running");
	var ipcFields = $('textarea[id^="BRetLotNo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(9, 11);
		var dispLine = "BRETURN";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowReturns completed");
}

function ShowRecalls()
{
	//alert("ShowTechProcChg running");
	var ipcFields = $('textarea[id^="BRecallLotNo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(12, 14);
		var dispLine = "RECALL";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowTechProcChg completed");
}

function ShowCAPA()
{
	//alert("ShowCAPA running");
	var ipcFields = $('textarea[id^="PCANo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(5, 7);
		var dispLine = "PreCA";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowCAPA completed");
}

function ShowRegChgs()
{
	//alert("ShowRegChgs running");
	var ipcFields = $('textarea[id^="ProdRegChgDtls"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(14, 16);
		var dispLine = "RegStatChg";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowRegChgs completed");
}

function ShowMEquip()
{
	//alert("ShowMEquip running");
	var ipcFields = $('textarea[id^="MENo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(4, 6);
		var dispLine = "MEqpt";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowMEquip completed");
}

function ShowQEquip()
{
	//alert("ShowQEquip running");
	var ipcFields = $('textarea[id^="QENo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(4, 6);
		var dispLine = "QEqpt";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowQEquip completed");
}

function ShowUEquip()
{
	//alert("ShowUEquip running");
	var ipcFields = $('textarea[id^="UENo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(4, 6);
		var dispLine = "UEqpt";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowUEquip completed");
}

function ShowCEquip()
{
	//alert("ShowCEquip running");
	var ipcFields = $('textarea[id^="CENo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(4, 6);
		var dispLine = "CEqpt";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowCEquip completed");
}

function ShowContracts()
{
	//alert("ShowContracts running");
	var ipcFields = $('textarea[id^="ConRefNo"]');
	for (var i = 0; i < ipcFields.length; i++)
	{
		var FldName = (ipcFields[i].name);
		var ssNum = FldName.substring(8, 10);
		var dispLine = "Contract";
		var FldValue = document.getElementById(FldName).value;

		if (FldValue !== "")
		{
			while (ssNum.length < 2)
			{
				ssNum = "0" + ssNum;
			}
			document.getElementById(dispLine + ssNum).style.display = "";
		}
	}
	//alert("ShowContracts completed");
}

// Posts the product data to the form from MC DataStructure "Prod"
function RetrieveProductCodes(obj)
{
	//alert("RetrieveProductCodes begins");
	if (Trim(obj.value) !== "" || Trim(obj.value) !== "-Please Select-")
	{
	alert("not blank or select");
		//document.getElementById("mastercontrol.dataset.show.Products").click();
		doClick(document.getElementById("mastercontrol.dataset.show.Products"));
	}
	else
	{
		document.getElementById("mastercontrol.dataset.Products.product description").value = "";
	}
	alert("doClick ran");
	SetForm();
	//alert("RetrieveProductCodes ends");
}

function doClick(obj) {
	try {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0,false, false, false, false, 0, null);
		var canceled = !obj.dispatchEvent(evt);
		if(canceled) {
			// A handler called preventDefault
		} else {
			// None of the handlers called preventDefault
		}
	} catch(er) {
		obj.click(); //IE
	}
}

function Trim(value)
{
	return value.replace(/^\s+|\s+$/g, "");
}

// Causes all accordions to open simultaneously
function removeAccordion()
{
	$('.accordionContent').show();
}

// Shows the correct fields for APQR Conclusion section.
function Summary(obj)
{
	//alert("Summary begins " +obj.id.slice(-1));
	var cbn = obj.id.slice(-1);
	//alert("cbn = "+cbn);
	switch (cbn)
	{
	case '1':
		//alert("case1 begins");
		document.getElementById('GRCOpt2').style.display = "none";
		document.getElementById('GRCOpt3a').style.display = "none";
		document.getElementById('GRCOpt3b').style.display = "none";
		document.getElementById('GRCOpt3c').style.display = "none";
		document.getElementById('GRCOpt4').style.display = "none";
		document.getElementById('GenRevOpt4').value = "";
		document.getElementById('GRCOpt4txt').style.display = "none";
		document.getElementById('cbReview2').checked = false;
		document.getElementById('cbReview3').checked = false;
		document.getElementById('cbReview4').checked = false;
		//alert("case1 ends");
		break;

	case '2':
		//alert("case2 begins");
		if (obj.checked === true)
		{
			document.getElementById('GRCOpt2').style.display = "";
			document.getElementById('GRCOpt3a').style.display = "none";
			document.getElementById('GRCOpt3b').style.display = "none";
			document.getElementById('GRCOpt3c').style.display = "none";
			document.getElementById('GRCOpt4').style.display = "none";
			document.getElementById('GenRevOpt4').value = "";
			document.getElementById('GRCOpt4txt').style.display = "none";
			document.getElementById('cbReview1').checked = false;
			document.getElementById('cbReview3').checked = false;
			document.getElementById('cbReview4').checked = false;
		}
		else
		{
			document.getElementById('GRCOpt2').style.display = "none";
		}
		//alert("case2 ends");
		break;

	case '3':
		//alert("case3 begins");
		if (obj.checked === true)
		{
			document.getElementById('GRCOpt2').style.display = "none";
			document.getElementById('GRCOpt3a').style.display = "";
			document.getElementById('GRCOpt3b').style.display = "";
			document.getElementById('GRCOpt3c').style.display = "";
			document.getElementById('GRCOpt4').style.display = "";
			document.getElementById('GenRevComplete').value = "";
			document.getElementById('GenRevOpt4').value = "";
			document.getElementById('GRCOpt4txt').style.display = "none";
			document.getElementById('cbReview1').checked = false;
			document.getElementById('cbReview2').checked = false;
			document.getElementById('cbReview4').checked = false;
		}
		else
		{
			document.getElementById('GRCOpt3a').style.display = "none";
			document.getElementById('GRCOpt3b').style.display = "none";
			document.getElementById('GRCOpt3c').style.display = "none";
			document.getElementById('GRCOpt4').style.display = "none";
			document.getElementById('GenRevOpt4').value = "";
			document.getElementById('cbReview4').checked = false;
			document.getElementById('GRCOpt4txt').style.display = "none";
		}
		//alert("case3 ends");
		break;

	case '4':
		//alert("case4 begins");
		if (obj.checked === true)
		{
			document.getElementById('GRCOpt4txt').style.display = "";
		}
		else
		{
			document.getElementById('GenRevOpt4').value = "";
			document.getElementById('GRCOpt4txt').style.display = "none";
		}
		break;
	}
}

function LaunchThis(frm)
{
	var ChildFrm = frm.id;
	//alert("LaunchThis running "+ChildFrm);
	if(ChildFrm == "LaunchCAPA")
	{
		//alert("LaunchCAPA");
		SelectRouteLaunched('CAPA','mastercontrol.task.routes');
		if(isRouteSelected('CAPA','mastercontrol.task.routes'))
		{
			//alert("CAPA route found");
				alert("After closing this window wait for 25 Seconds for CAPA Form to open.")
			document.getElementById("hlpCAPAForm").value  = "CAPA";
			document.getElementById("mastercontrol.task.launch").click();
		}
	}
	else if(ChildFrm == "LaunchNCR")
	{
		//alert("LaunchNCR");
		SelectRouteLaunched('Nonconformance','mastercontrol.task.routes');
		if(isRouteSelected('Nonconformance','mastercontrol.task.routes'))
		{
			//alert("route found");
				alert("After closing this window wait for 25 Seconds for Nonconformance Form to open.")
			document.getElementById("hlpNONCForm").value  = "Nonconformance";
			document.getElementById("mastercontrol.task.launch").click();
		}
	}
	//alert("LaunchThis ran");
}

function DisplayViewLinksButtons()
{
	//alert("DisplayViewLinksButtons running");
	var CAPARef = document.getElementById("txtCAPARef");
	var NONCRef = document.getElementById("txtNoncRef");

	var spanLaunchCAPA = document.getElementById("LaunchCAPASpan");
	var spanLaunchNONC = document.getElementById("LaunchNONCSpan");

	var spanViewCAPA = document.getElementById("ViewCAPASpan");
	var spanViewNONC = document.getElementById("ViewNONCSpan");

	if (Trim(CAPARef.value) !== "")
	{
		spanLaunchCAPA.style.display = "none";
		spanViewCAPA.style.display = "";
        document.getElementById("mastercontrol.links.view.CAPA").disabled = false;
        CAPARef.disabled = true;
	}
	else
	{
		spanLaunchCAPA.style.display = "";
		spanViewCAPA.style.display = "none";
	}
	if (Trim(NONCRef.value) !== "")
	{
		spanLaunchNONC.style.display = "none";
		spanViewNONC.style.display = "";
        document.getElementById("mastercontrol.links.view.Nonconformance").disabled = false;
        NONCRef.disabled = true;
	}
	else
	{
		spanLaunchNONC.style.display = "";
		spanViewNONC.style.display = "none";
	}
	document.getElementById("mastercontrol.links.view.Action Item").disabled = false;
	//alert("DisplayViewLinksButtons finished");
}

// Verifies route is available.
//Sample Call: SelectRouteLaunched("CAPA" , "mastercontrol.task.routes.CAPA");
function SelectRouteLaunched()
{
	//alert("SelectRouteLaunched running");
	var oListRoute =  document.getElementById(arguments[1]);
	oListRoute.disabled = false;
	var isRouteExist = false;
	var itemFace;
	//alert("oListRoute= "+oListRoute.id);
	var i;
	for (i=0; i<oListRoute.length; i++)
	{
		itemFace = oListRoute[i].text;
		if (itemFace.toLowerCase()=== arguments[0].toLowerCase())
		{
			oListRoute.selectedIndex = i;
			//alert("===")
			isRouteExist = true;
			break;
		}
	}
	if(!isRouteExist)
	{
		alert("The task you are trying to launch is not available.");
	}
}

function GetLaunchedFormNo(selectedRouteLaunched)
{
	//alert("GetLaunchedFormNo running.");
	var arry = new Array();
	var i;
	var oListFormNos;
	var lastformNumber = "";
	if (selectedRouteLaunched.toLowerCase() == new String("mastercontrol.links.Action Item").toLowerCase())
	{
		//alert("Action Item");
		return GetAILaunchedFormNo(selectedRouteLaunched);
	}
	else if (selectedRouteLaunched === "CAPA")
	{
		//alert("CAPA");
		oListFormNos = document.getElementById("mastercontrol.links.CAPA");
	}
	else if (selectedRouteLaunched === "Nonconformance")
	{
		//alert("Nonconformance");
		oListFormNos = document.getElementById("mastercontrol.links.Nonconformance");
	}
	if (oListFormNos.length !== 0)
	{
		//alert(oListFormNos[oListFormNos.length - 1].value);
		lastformNumber = oListFormNos[oListFormNos.length - 1].value;
	}
	var nRevIndex = lastformNumber.toLowerCase().indexOf(new String("Rev").toLowerCase());
	if (nRevIndex > -1)
	{
		lastformNumber = lastformNumber.substr(0, nRevIndex - 1);
	}
	//alert("lastformNumber= "+lastformNumber);
	return lastformNumber;
}

function GetAILaunchedFormNo(linksField)
{
	//alert("GetAILaunchedFormNo running");
	var oListFormNos = document.getElementById(linksField);
	if (oListFormNos.length !== 0)
	{
		var arry = new Array();
		var i;
		for (i = 0; i < oListFormNos.length; i++)
		{
			var itemFace = oListFormNos[i].value;
			arry[i] = itemFace;
		}
		arry.sort();
		//alert("GetAILaunchedFormNo= "+arry);
		return arry[arry.length - 1];
	}
	else
	{
		//alert("no GetAILaunchedFormNo");
		return "";
	}
}

// adds the next blank line to the Materials and Packaging section list
function addNewIngredientLine(obj)
{
	//alert("addNewIngredientLine running");
	var eventField = obj.id; //id of trigger field
	var s = eventField.substring(3, 5);

	if (obj.value !== "")
	{
		s = parseInt(s,10); //parses the string into an integer

		newNo = s + 1; //increments number by 1
		s = String(newNo); //converts back into string

		//ensures preceding 0 on lines 1-9
		while (s.length < 2)
		{
			s = "0" + s; // adds preceding 0
		}
		document.getElementById("Item" + s).style.display = "";
	}
}

// Shows the "change" section of the Materials section list.
function MatChgDisp(obj)
{
	//alert("MatChgDisp running");
	var itemNo = obj.name.slice(-2);
	var BValue = obj.value;
	//alert("value = "+BValue);
	if (BValue === "Yes")
	{
		document.getElementById('Item' + itemNo + 'chg').style.display = "";
	}
	else
	{
		document.getElementById('Item' + itemNo + 'chg').style.display = "none";
	}
}

// shows the 1st blank line to the Ingredients Quality Review section list
function showFirstQCNCR(obj)
{
	//alert("show1stQCNCR running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		document.getElementById("QCNCR01").style.display = "none";
		document.getElementById("QCOOS01").style.display = "";
	}
	else if (obj.value === "NCR")
	{
		document.getElementById("QCOOS01").style.display = "none";
		document.getElementById("QCNCR01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		document.getElementById("QCNCR01").style.display = "none";
		document.getElementById("QCOOS01").style.display = "none";
	}
}

// adds the next blank line to the IPC List section list
function addNewQCNCR(obj)
{
	//alert("addNewQCNCR running");
	var eventField = obj.id;
	var s = eventField.substring(11, 13);
	//alert("field-name = "+eventField+" number = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s;
		}
		document.getElementById("QCNCR" + s).style.display = "";
	}
}

// adds the next blank line to the IPC List section list
function addNewQCOOS(obj)
{
	//alert("addNewQCOOS running");
	var eventField = obj.id;
	var s = eventField.substring(11, 13);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s;
		}
		document.getElementById("QCOOS" + s).style.display = "";
	}
}

// adds the next blank line to the IPC List section list
function addNewIPCLine(obj)
{
	//alert("addNewIPCLine running");
	var eventField = obj.id;
	var s = eventField.substring(3, 5);
	//alert("var s = "+s);
	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s;
		}
		document.getElementById("IPCDisp" + s).style.display = "";
	}
}

// adds the next blank line to the EPC List section list
function addNewEPCLine(obj)
{
	//alert("addNewEPCLine running");
	var eventField = obj.id;
	var s = eventField.substring(3, 5);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("EPCDisp" + s).style.display = "";
	}
}

// shows the 1st blank line to the IP EP PR Review section list
function showFirstIPEPPROOS(obj)
{
	//alert("showFirstIPEPPROOS running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		//alert("OOS");
		document.getElementById("IPOOS01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		//alert("In-Spec");
		document.getElementById("IPOOS01").style.display = "none";
	}
}

// adds the next blank line to the IPC OOS section list
function addNewIPOOS(obj)
{
	//alert("addNewIPOOS running");
	var eventField = obj.id;
	var s = eventField.substring(10, 12);
	//alert("eventField id = "+eventField+" eventField.substring 10-12 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("IPOOS" + s).style.display = "";
	}
}

// shows the 1st blank line to the Batch Record Review section list
function showFirstBROOS(obj)
{
	//alert("showFirstBROOS running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		document.getElementById("BROOS01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		document.getElementById("BROOS01").style.display = "none";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewBROOS(obj)
{
	//alert("addNewBROOS running");
	var eventField = obj.id;
	var s = eventField.substring(11, 13);
	//alert("eventField id = "+eventField+" eventField.substring 11-13 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("BROOS" + s).style.display = "";
	}
}

// shows the 1st blank line to the Deviation section list
function showFirstDEV(obj)
{
	//alert("showFirstDEV running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		document.getElementById("GenDev01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		document.getElementById("GenDev01").style.display = "none";
	}
}
// adds the next blank line to the Deviation section list
function addNewDeviation(obj)
{
	//alert("addNewDeviation running");
	var eventField = obj.id;
	var s = eventField.substring(8, 10);
	//alert("eventField id = "+eventField+" eventField.substring 8-10 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("GenDev" + s).style.display = "";
	}
}

// shows the 1st blank line to the Non-Conformance section list
function showFirstNCR(obj)
{
	//alert("showFirstNCR running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		document.getElementById("GenNCR01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		document.getElementById("GenNCR01").style.display = "none";
	}
}
// adds the next blank line to the NonConformance section list
function addNewNonconformance(obj)
{
	//alert("addNewNonconformance running");
	var eventField = obj.id;
	var s = eventField.substring(9, 11);
	//alert("eventField id = "+eventField+" eventField.substring 9-11 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("GenNCR" + s).style.display = "";
	}
}

// shows the 1st blank line to the Non-Conformance section list
function showFirstCR(obj)
{
	//alert("showFirstCR running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		document.getElementById("TechProcChg01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		document.getElementById("TechProcChg01").style.display = "none";
	}
}
// adds the next blank line to the Batch Records Investigation section list
function addNewTechProcChg(obj)
{
	//alert("addNewTechProcChg running");
	var eventField = obj.id;
	var s = eventField.substring(8, 10);
	//alert("eventField id = "+eventField+" eventField.substring 8-10 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("TechProcChg" + s).style.display = "";
	}
}

// shows the 1st blank line to the PreMarketing Variations section list
function showFirstPreMktAuthChg(obj)
{
	//alert("showFirstPreMktAuthChg running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		document.getElementById("MarVar01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		document.getElementById("MarVar01").style.display = "none";
	}
}

// adds the next blank line to the Variations section list
function addNewVariation(obj)
{
	//alert("addNewVariation running");
	var eventField = obj.id;
	var s = eventField.substring(5, 7);
	//alert("eventField id = "+eventField+" eventField.substring 5-7 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("MarVar" + s).style.display = "";
	}
}

// adds the next blank line to the Accelerated Studies section list
function addNewAccStudy(obj)
{
	//alert("addNewAccStudy running");
	var eventField = obj.id;
	var s = eventField.substring(11, 13);
	//alert("eventField id = "+eventField+" eventField.substring 11-13 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("AccStudy" + s).style.display = "";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewLongStudy(obj)
{
	//alert("addNewLongStudy running");
	var eventField = obj.id;
	var s = eventField.substring(11, 13);
	//alert("eventField id = "+eventField+" eventField.substring 11-13 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("SMLSStudy" + s).style.display = "";
	}
}

// shows the 1st blank line to the Complaints section list
function showFirstComplaints(obj)
{
	//alert("showFirstComplaints running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		document.getElementById("COMPLAINT01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		document.getElementById("COMPLAINT01").style.display = "none";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewComplaints(obj)
{
	//alert("addNewReturns running");
	var eventField = obj.id;
	var s = eventField.substring(15, 17);
	//alert("eventField id = "+eventField+" eventField.substring 15-17 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("COMPLAINT" + s).style.display = "";
	}
}

// shows the 1st blank line to the Returns section list
function showFirstReturns(obj)
{
	//alert("showFirstReturns running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		document.getElementById("BRETURN01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		document.getElementById("BRETURN01").style.display = "none";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewReturns(obj)
{
	//alert("addNewReturns running");
	var eventField = obj.id;
	var s = eventField.substring(9, 11);
	//alert("eventField id = "+eventField+" eventField.substring 9-11 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("BRETURN" + s).style.display = "";
	}
}

// shows the 1st blank line to the Recalls section list
function showFirstRecalls(obj)
{
	//alert("showFirstRecalls running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		document.getElementById("RECALL01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		document.getElementById("RECALL01").style.display = "none";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewRecalls(obj)
{
	//alert("addNewRecalls running");
	var eventField = obj.id;
	var s = eventField.substring(12, 14);
	//alert("eventField id = "+eventField+" eventField.substring 12-14 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("RECALL" + s).style.display = "";
	}
}

// shows the 1st blank line to the PrevCAPA section list
function showFirstPrevCAPA(obj)
{
	//alert("showFirstPrevCAPA running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		document.getElementById("PreCA01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		document.getElementById("PreCA01").style.display = "none";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewCAPA(obj)
{
	//alert("addNewCAPA running");
	var eventField = obj.id;
	var s = eventField.substring(5, 7);
	//alert("eventField id = "+eventField+" eventField.substring 5-7 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("PreCA" + s).style.display = "";
	}
}

// shows the 1st blank line to the PostMkt Commitments section list
function showFirstRegStatPM(obj)
{
	//alert("showFirstRegStatPM running");
	//alert(obj.value);
	if (obj.value === "OOS")
	{
		document.getElementById("RegStatChg01").style.display = "";
	}
	else if (obj.value === "In-Spec")
	{
		document.getElementById("RegStatChg01").style.display = "none";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewProdRegChg(obj)
{
	//alert("addNewProdRegChg running");
	var eventField = obj.id;
	var s = eventField.substring(14, 16);
	//alert("eventField id = "+eventField+" eventField.substring 14-16 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("RegStatChg" + s).style.display = "";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewMEqpt(obj)
{
	//alert("addNewProdRegChg running");
	var eventField = obj.id;
	var s = eventField.substring(4, 6);
	//alert("eventField id = "+eventField+" eventField.substring 4-6 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("MEqpt" + s).style.display = "";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewQEqpt(obj)
{
	//alert("addNewProdRegChg running");
	var eventField = obj.id;
	var s = eventField.substring(4, 6);
	//alert("eventField id = "+eventField+" eventField.substring 4-6 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("QEqpt" + s).style.display = "";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewUEqpt(obj)
{
	//alert("addNewProdRegChg running");
	var eventField = obj.id;
	var s = eventField.substring(4, 6);
	//alert("eventField id = "+eventField+" eventField.substring 4-6 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("UEqpt" + s).style.display = "";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewCEqpt(obj)
{
	//alert("addNewProdRegChg running");
	var eventField = obj.id;
	var s = eventField.substring(4, 6);
	//alert("eventField id = "+eventField+" eventField.substring 4-6 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("CEqpt" + s).style.display = "";
	}
}

// adds the next blank line to the Batch Records Investigation section list
function addNewContract(obj)
{
	//alert("addNewProdRegChg running");
	var eventField = obj.id;
	var s = eventField.substring(8, 10);
	//alert("eventField id = "+eventField+" eventField.substring 8-10 = "+s);

	if (obj.value !== "")
	{
		s = parseInt(s,10);
		newNo = s + 1;
		s = String(newNo);
		while (s.length < 2)
		{
			s = "0" + s; //
		}
		document.getElementById("Contract" + s).style.display = "";
	}
}

// add all date fields to this function:
function ApplyDateFormat()
{
	setDateFormat(document.getElementById("mastercontrol.form.created"));

	for(var i=1; i<11; i++)
	{
		setDateFormat(document.getElementById("txtAIDateDue"+i+"_date"));
	}
}

function setDateFormat(thisDate)
{
	if(thisDate == null)
		return;
	if(thisDate.value.search(' ') <= 0)
		return;
	var myDate = new Date(thisDate.value);
	var allMonths = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	var day = myDate.getDate();
	var monthInteger = myDate.getMonth();
	var year = myDate.getFullYear();
	var monthString = "";
	switch (monthInteger)
	{
		case 0 :
			monthString = allMonths[0];
			break;
		case 1 :
			monthString = allMonths[1];
			break;
		case 2 :
			monthString = allMonths[2];
			break;
		case 3:
			monthString = allMonths[3];
			break;
		case 4:
			monthString = allMonths[4];
			break;
		case 5:
			monthString = allMonths[5];
			break;
		case 6:
			monthString = allMonths[6];
			break;
		case 7:
			monthString = allMonths[7];
			break;
		case 8:
			monthString = allMonths[8];
			break;
		case 9:
			monthString = allMonths[9];
			break;
		case 10:
			monthString = allMonths[10];
			break;
		case 11:
			monthString = allMonths[11];
			break;
		case 12:
			monthString = allMonths[12];
			break;
	}
	if(day < 10)
	{
		day = "0"+day;
	}
	thisDate.value =  day+"-"+monthString+"-"+year;
}

function SetTaskTableViewState()
{
	//alert("SetTaskTableViewState running");
	var TaskCounter = document.getElementById("AI_Count").value*1;
	//alert("TaskCounter = "+TaskCounter);

	for(var i=1;i<=TaskCounter;i++)
	{
		//alert("Display AI_Task_"+i);
		document.getElementById("AI_Task_"+i).style.display="";
	}
	for(j =TaskCounter+1 ; j<11; j++)
	{
		//alert("Hide AI Entry "+i);
		document.getElementById("AI_Task_"+j).style.display="none";
	}
	EnableDisableTasks();
	//alert("EnableDisableTasks ran");
	//alert("SetTaskTableViewState completed");
}

function EnableDisableTasks()
{
	//alert("EnableDisableTasks running");
	var fName = "txtAINo";
	var fieldsLst = new Array("txtAIDesc","mastercontrol.role.SP_COMP_TaskOwners.AI","txtAIDateDue","btnLaunchAI");
	var TaskRef = "";
	for(var i=1; i<=10; i++)
	{
		TaskRef = document.getElementById(fName+i).value;
		//alert("AITask# = "+TaskRef);
		if(Trim(TaskRef)!="")
		{
			//alert("TaskRef not empty running");
			document.getElementById(fieldsLst[0]+i).readOnly = true;
			AddClass(document.getElementById(fieldsLst[0]+i),"readonly");
			document.getElementById(fieldsLst[1]+i).readOnly = true;
			AddClass(document.getElementById(fieldsLst[1]+i),"readonly");
			document.getElementById(fieldsLst[2]+i+"_date").readOnly = true;
			AddClass(document.getElementById(fieldsLst[2]+i+"_date"),"readonly");
			document.getElementById(fieldsLst[3]+i).style.display = "none";
			//alert("TaskRef not empty ran");
		}
		else
		{
			/*
			//alert("TaskRef empty running");
			document.getElementById(fieldsLst[0]+i).readOnly = false;
			RemoveClass(document.getElementById(fieldsLst[0]+i),"readonly");
			//alert(fieldsLst[0]+i+" updated");
			document.getElementById(fieldsLst[1]+i).disabled = false;
			RemoveClass(document.getElementById(fieldsLst[1]+i),"readonly");
			//alert(fieldsLst[1]+i+" updated");
			document.getElementById(fieldsLst[2]+i+"_date").readOnly = false;
			RemoveClass(document.getElementById(fieldsLst[2]+i+"_date"),"readonly");
			//alert(fieldsLst[2]+i+" updated");
			document.getElementById(fieldsLst[3]+i).disabled = false;
			//alert(fieldsLst[3]+i+" updated");
			//alert("TaskRef empty ran");
			*/
		}
	}
	//alert("EnableDisableTasks completed");
}

// Select Originator of the Launched Form. Now Current User is set to the Originator of the Action Item.
function SelectOriginatorLaunched()
{
	//alert("SelectOriginatorLaunched running");
	var oListOriginator = document.getElementById("mastercontrol.task.originator");
	var sCurrentUser = document.getElementById("mastercontrol.form.currentuser").value.toLowerCase();
	var i;
	var sItemValue = "";
	//alert("SelectOriginatorLaunched vars set");
	for (i=0; i<oListOriginator.length;i++)
	{
		sItemValue = oListOriginator[i].value;
		if (sItemValue.toLowerCase() === sCurrentUser)
		{
			oListOriginator.selectedIndex = i;
			break;
		}
	}
}

function Trim(value)
{
	return value.replace(/^\s+|\s+$/g, "");
}

function DynamicRequireToggle(LabelName, FieldName, Flag)
{
	//alert(LabelName+" "+FieldName+" "+Flag);
	DynamicFieldLabel(LabelName, Flag);
	mcRequireToggle(FieldName, Flag);
}

function DynamicFieldLabel(LabelId, SetRequired)
{
	//alert("DynamicFieldLabel running");
	var LabelClass = document.getElementById(LabelId).className;
	if(SetRequired == true &&  LabelClass == 'dynamicLabel')
	{
	document.getElementById(LabelId).innerHTML = "* "+document.getElementById(LabelId).innerHTML;
	//alert("Added * to "+LabelId);
	document.getElementById(LabelId).className = "dynamicRequiredLabel";
	//alert("Changed class to dynamicRequiredLabel for "+LabelId);
	}
	else if(SetRequired == false &&  LabelClass == 'dynamicRequiredLabel')
	   {
	      document.getElementById(LabelId).innerHTML = document.getElementById(LabelId).innerHTML.slice(1);
	      document.getElementById(LabelId).className = "dynamicLabel";

	   }

}

function SetTaskFieldsLabel(tFieldsList, tFieldsLabelList)
{
	//alert("SetTaskFieldsLabel running");
	var tFieldValue;
	var tField;
	tFieldsList = new String(tFieldsList).split(",");
	tFieldsLabelList = new String(tFieldsLabelList).split(",");
	tFieldsLabelList.sort();
	//alert("tFieldsLabelList = "+tFieldsLabelList);
	for(i = 0; i<tFieldsList.length; i++)
	{
		tField = document.getElementById(tFieldsList[i]);
		tFieldValue = Trim(tField.value);
		if(tFieldValue != "")
		{
			RequiredLabelToggle(tFieldsLabelList[i], false);
		}
		else
		{
			RequiredLabelToggle(tFieldsLabelList[i], true);
		}
	}
	//alert("SetTaskFieldsLabel ran");
}

/*Toggles between Required(Leading * with Red color font) and Non-required format for labels of Dynamic required fields.*/
function RequiredLabelToggle(LabelId, SetRequired)
{
	//alert("RequiredLabelToggle running");
	var LabelClass = document.getElementById(LabelId).className;
	if(SetRequired == true &&  LabelClass == 'dynamicLabel')
	{
		//alert(document.getElementById(LabelId).id+" SetRequired true");
		document.getElementById(LabelId).innerHTML = "* "+document.getElementById(LabelId).innerHTML;
		//alert(document.getElementById(LabelId).innerHTML);
		document.getElementById(LabelId).className = "dynamicRequiredLabel";
		//alert(document.getElementById(LabelId).className);
		//alert("RequiredLabelToggle if ran");
	}
	else if(SetRequired == false &&  LabelClass == 'dynamicRequiredLabel')
	{
		//alert(document.getElementById(LabelId).id+" SetRequired false");
		document.getElementById(LabelId).innerHTML = document.getElementById(LabelId).innerHTML.slice(1);
		//alert(document.getElementById(LabelId).innerHTML);
		document.getElementById(LabelId).className = "dynamicLabel";
		//alert(document.getElementById(LabelId).className);
		//alert("RequiredLabelToggle else ran");
	}
}

function SetFormNoTargetField(fieldVal,n)
{
	//alert("SetFormNoTargetField running");
	var tf1 = document.getElementById('txtAIDesc'+n).value;
	var tf2 = document.getElementById('txtAIDateDue'+n+'_date').value;
	var tf3 = document.getElementById('mastercontrol.role.SP_COMP_TaskOwners.AI'+n).value;
	//alert("SetFormNoTargetField vars set");
	tf1.required = true;
	tf2.required = true;
	tf3.required = true;
	if(Trim(tf1)!= "" && Trim(tf1)!= "" && Trim(tf2)!= "" && Trim(tf3)!= "")
	{
		SelectRouteLaunched("Action Item","mastercontrol.task.routes");
		if(isRouteSelected("Action Item","mastercontrol.task.routes"))
		{
			//alert("Action Item route found.");
			SetForm();
			//alert("SetForm ran");
			MapAIValues(n);
			//alert("MapAIValues ran");
			NoCalendarFieldManipulation('txtAIDateDue'+n+'_date');
			//alert("NoCalendarFieldManipulation ran");
			EnableDisableTasks();
			//alert("EnableDisableTasks ran");
			document.getElementById("hlpAIForms").value = fieldVal+"*"+n;
			//alert("AI number set");
			document.getElementById("mastercontrol.task.launch").click();
		}
	}
	else
	{
		alert("You must complete the Task Description, Owner and Date Due fields before launching.")
	}
}

// Copies the values to be transferred to AI form into a hidden field.
function MapAIValues(n)
{
	//alert("MapAIValues running");
	n=n*1;
	//alert("n= "+n);
	
	var f0 = document.getElementById("txtAIDesc"+n).value;
	//alert("f0= "+f0);
	
	document.getElementById("hlpAITitle").value = f0;
	//alert("hlpAITitle = "+document.getElementById("hlpAITitle").value);
	
	var rollName = document.getElementById("mastercontrol.role.SP_COMP_TaskOwners.AI"+n);
	var f1 = rollName.options[rollName.selectedIndex].text;
	document.getElementById("hlpAIOwner").value = f1;
	//alert("f1 = "+document.getElementById("hlpAIOwner").value);
	
	var f2 = document.getElementById("txtAIDateDue"+n+"_date").value;
	document.getElementById("hlpAIduedate_date").value = f2;
	//alert("f2 = "+document.getElementById("hlpAIduedate_date").value);
	
	var f5 = document.getElementById("mastercontrol.form.title").value;
	document.getElementById("hlpAITaskTitle").value = f5;
	//alert("f5 = "+document.getElementById("mastercontrol.form.title").value);
	
	//alert("MapAIValues ran");
}

function isRouteSelected()
{
	//alert("isRouteSelected running");
	var oRoutes =  document.getElementById(arguments[1]);
	//alert("oRoute = "+oRoutes.name);
	var itemFace;
	var isSelected;
	var i;
	//alert("oRoute = "+oRoutes);
	for (i=0; i<oRoutes.length; i++)
	{
		itemFace = oRoutes.options[i].text;
		if (itemFace.toLowerCase()=== arguments[0].toLowerCase())
		{
			//alert("route selected = "+oRoutes.options[i].selected);
			return oRoutes.options[i].selected;
		    break;   
		}
	}
}

function mcRequireToggle(fieldsList, isRequired)
{
	//alert("mcRequireToggle running");
	if (isRequired){
		mcRequire(fieldsList);
		//alert("mcRequireToggle if ran")
	}else{
		mcUnrequire(fieldsList);
		//alert("mcRequireToggle else ran")
	}
		//alert("mcRequireToggle completed")
}

function mcRequire(fieldsList)
{
	//alert("mcRequire "+fieldsList);
	var requiredFields = document.getElementById('requiredVariablesList');
	if (requiredFields.value.match(/^\s*$/))
	{
		//alert("matches required fieldslist");
		requiredFields.value = fieldsList;
	}
	else
	{
		//alert("not in required fieldsList");
		requiredFields.value = requiredFields.value + "," + fieldsList;
	}
	//alert("mcRequire ran through");
}

function mcUnrequire(fieldsList) {
	//alert("mcUnrequire "+fieldsList);
	var fields = fieldsList.split(',');
	//alert("fields = "+fields);
	var i = 0;
	//alert("i = 0");
	var regex = "";
	//alert("regex = "+regex);
	var requiredFields = document.getElementById('requiredVariablesList');
	//alert("requiredFields = "+requiredFields.value);
	for (i = 0; i < fields.length; ++i)
	{
		regex = new RegExp("(^|,)" + fields[i] + "(,|$)", "gi");
		//alert(regex);
		requiredFields.value = requiredFields.value.replace(regex, "$1");
		//alert(requiredFields.value);
	}
	//alert("mcUnrequire ran through");
}

function AddAITask()
{
	//alert("AddAITask running");
	ShowTaskTable('AI_Task_');
	EnableDisableAddTaskButton();
	//alert("AddAITask ran");
}

function ShowTaskTable(sTaskTypeName)
{
	//alert("ShowTaskTable running");
	var oTaskCounter;
	oTaskCounter = document.getElementById("AI_Count");
	//alert("oTaskCounter= "+oTaskCounter.value);
	if (oTaskCounter!=null && ++oTaskCounter.value <= 10)
	{
		//alert("oTaskCounter.value = "+oTaskCounter.value);
		document.getElementById("AI_Count").value = oTaskCounter.value;
		document.getElementById(sTaskTypeName+oTaskCounter.value).style.display="";
		//alert("display task and completed inline");
		var allrequiredfields = new Array('txtAIDesc'+oTaskCounter.value+',txtAIDateDue'+oTaskCounter.value+'_date,mastercontrol.role.SP_COMP_TaskOwners.AI'+oTaskCounter.value);
		//alert("allrequiredfields = "+allrequiredfields);
		mcRequireToggle(allrequiredfields,true);
		//alert("mcRequireToggle ran");
		var allreqLabels = new Array('lblAI'+oTaskCounter.value+',lblAIDateDue'+oTaskCounter.value+',lblOwnerAI'+oTaskCounter.value);
		//alert("allreqLabels = "+allreqLabels);
		SetTaskFieldsLabel(allrequiredfields,allreqLabels);
		//alert("Set Fields and Labels required for task");
        document.getElementById("mastercontrol.role.SP_COMP_TaskOwners.AI"+oTaskCounter.value).selectedIndex = 0
	}
	//alert("ShowTaskTable completed");
}

function EnableDisableAddTaskButton()
{
	var taskCounter = document.getElementById("AI_Count").value;
	if(taskCounter >0 && taskCounter <=9)
	{
		//alert("less than or equal to 10")
		document.getElementById("btnAddAITask").disabled = false;
		document.getElementById("mastercontrol.links.view.Action Item").disabled = false;
	}
	else
	{
		//alert("greater than 10")
		document.getElementById("btnAddAITask").style.display = "none";
	}
	//alert("EnableDisableAddTaskButton ran");
}

function AITasks(obj)
{
	//alert("AITasks running");
	if(obj != null)
	{
		for(i=1; i<11; i++)
		{
			if(obj.name == "btnLaunchAI"+i)
			{
				//alert("btnLaunchAI "+obj.id);
				alert("After closing this window wait for 25 Seconds for Action Item Form to open.")
				SetFormNoTargetField('txtAINo'+i,i);
				break;
			}
			else if(obj.name == "txtAIDateDue"+i+"_date" )
			{
				//alert("txtAIDateDuex_date= "+obj.id);
				CheckDateFormat(obj);
				break;
			}
		}
	}
	//alert("AITasks ran");
}


// Check Date Format should be dd-mmm-yyyy
function CheckDateFormat(theField)
{
	var dMonth,dDay,dYear;
	var found = false;
	var thisDateField = document.getElementById(theField.name);
	if(thisDateField.value != "")
	{
		var month = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");
		dPart = theField.value.split("-");
		if(dPart.length!=3)
		{
			alert("Enter Date in this format: dd-mmm-yyyy");
			document.getElementById(theField.name).value = "";
			theField.focus();
			return false;
		}
		if(dPart[2] < 1000 || dPart[2] >9999 )
		{
			alert("Enter Date in this format: dd-mmm-yyyy");
			document.getElementById(theField.name).value = "";
			theField.select();
			theField.focus();
			return false;
		}
		else
		{
			dYear = dPart[2];
		}
		if(dPart[0] < 10 )
		{
			var dayInteger = parseInt(dPart[0],10);
			dDay = "0"+dayInteger;
		}
		else
		{
			dDay = parseInt(dPart[0],10);
		}

		for(i=0;i<month.length;i++)
		{
			if(dPart[1].toLowerCase()==month[i].toLowerCase())
			{
				dPart[1]=i;
				found = true;
				dMonth = month[i];
				break;
			}
		}
		nDate = new Date(dPart[2], dPart[1], dPart[0]);
		var nYear = nDate.getFullYear(); // Bug 27595
		nYear = Trim(nYear.toString());
		var year = Trim(dPart[2]);
		if(isNaN(nDate) || dPart[2]!=nDate.getFullYear()|| year.length!=nYear.length || dPart[1]!=nDate.getMonth() || dPart[0]!=nDate.getDate())
		{
			alert("Enter Date in this format: dd-mmm-yyyy");
			document.getElementById(theField.name).value = "";
			theField.select();
			theField.focus();
			return false;
		}
		else
		{
			if(found == false)
			{
				alert("Enter Date in this format: dd-mmm-yyyy");
				document.getElementById(theField.name).value = "";
				theField.select();
				theField.focus();
				return false;
			}
			else
			{
				thisDateField.value = dDay+"-"+dMonth+"-"+dYear;
				return true;
			}
		}
	}
}

function SetLaunchedFormNo()
{
	//alert("SetLaunchedFormNo running");
	var field = document.getElementById("hlpAIForms").value;
	field = field.split('*');
	field=field[0];
	//alert("SetLaunchedFormNo vars set");
	if(field!="")
	{
		//alert("field = "+field);
		var lastformNumber = GetLaunchedFormNo("mastercontrol.links.Action Item");
		if(lastformNumber != '')
		{
			var nRevIndex = lastformNumber.toLowerCase().indexOf(new String("Rev").toLowerCase());
			if ( nRevIndex > -1 )
			{
				//alert("nRevIndex more than -1");
				lastformNumber = lastformNumber.substr(0, nRevIndex-1);
			}
			document.getElementById(field).value = lastformNumber;
			var IsFormNumExist = document.getElementById(field).value;
			if(Trim(IsFormNumExist)!="")
			{
				//alert("trim of IsFormNumExist not blank");
				//document.getElementById("hlpAIForms").value = "";
				//This line of code is commented to disallow reset launched form number
			}
		}
	}
	else
	{
		//alert("field blank");
	}
	//alert("SetLaunchedFormNo completed");
}

function SetFormNumber(selectedRouteLaunched)
{
	if(selectedRouteLaunched == "CAPA")
	{
		document.getElementById("txtCAPARef").value = GetLaunchedFormNo("CAPA");
		document.getElementById("txtCAPARef").readOnly = true;
	}
	if(selectedRouteLaunched == "Nonconformance")
	{
		document.getElementById("txtNoncRef").value = GetLaunchedFormNo("Nonconformance");
		document.getElementById("txtNoncRef").readOnly = true;
	}
}

function SwapButtonAfterLaunch()
{
	//alert("SwapButtonAfterLaunch running");
	var oRefField = document.getElementById(arguments[0]);
	//alert("oRefField = "+oRefField.id);
	if(Trim(oRefField.value) != "" )
	{
		//alert("oRefField not blank");
		if(arguments[1])
		{
			//alert("arg 1 = "+arguments[1]);
			document.getElementById(arguments[1]).style.display = "none";
		}
		
		if(arguments[2])
		{
			//alert("arg 2 = "+arguments[2]);
			document.getElementById(arguments[2]).style.display = "";
		}
		if(arguments[3])
		{
			//alert("arg 3 = "+arguments[3]);
			document.getElementById(arguments[3]).disabled = false;
		}
	}
	//alert("SwapButtonAfterLaunch ran");
}

function GetAILaunchedFormNo(linksField)
{
	//alert("GetAILaunchedFormNo running");
	var oListFormNos = document.getElementById(linksField);
	if(oListFormNos.length != 0)
	{
		//alert("linksField length ="+oListFormNos.length);
		var arry = new Array();
		var i;
		for (i=0; i<oListFormNos.length;i++)
		{
			var itemFace = oListFormNos[i].value;
			arry[i] = itemFace;
		}
		arry.sort();
		//alert("GetAILaunchedFormNo returns "+arry[arry.length-1]);
		return  arry[arry.length-1];
	}
	else
	{
		return "";
	}
}



/* METHODS RELATED TO TEXTAREA STARTS */
/* Modified to expand and contract textarea fields */
function GrowUP(oTextArea)
{
	//alert("running");
var nTA3Height = 20;
var nTA3Width = 610;
var nTA5Height = 20;
var nTA5Width = 610;
var nMaxChars = 2000;
	var nTextLength = oTextArea.value.length;
	setTextAreaHeightWidth(oTextArea);

	if (nTextLength >= nMaxChars)
	{
		oTextArea.value = oTextArea.value.substring(0, nMaxChars);
		return;
	}
}

function setTextAreaHeightWidth(oTextArea)
{
var nTA3Height = 20;
var nTA3Width = 610;
var nTA5Height = 20;
var nTA5Width = 610;
var nMaxChars = 2000;
	var nTextLength = oTextArea.value.length;
	var sTextAreaType = oTextArea.className;
	var nHeight;
	var nWidth;
	if (sTextAreaType.indexOf("long") >= 0)
	{
		nHeight = nTA5Height;
	}

	// setting default height for the text area
	oTextArea.style.height = nHeight + "px";
	if (nTextLength > 0 && oTextArea.scrollHeight >= nHeight)
	{
		oTextArea.style.height = oTextArea.scrollHeight + "px";
		if (navigator.userAgent.indexOf("Firefox") > 0)
		{
			oTextArea.style.height = oTextArea.scrollHeight + 20 + "px";
		}
	}
		console.log(oTextArea.id+" Height = "+oTextArea.style.height);
}
/* FUNCTIONS RELATED TO TEXTAREA ENDS*/

