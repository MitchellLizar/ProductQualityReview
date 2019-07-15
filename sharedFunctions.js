/*
To add a blank option in any MC keyword. 
Arguments: 
1) Common name. e.g "mastercontrol.role"
Sample Call: SP_PrependBlankToKeyword("mastercontrol.role");
Function will search all select elements and prepend black option to those where pass parameter text matches to name of SELECT elements.
*/
function SP_PrependBlankToKeyword(sKeyword)
{	
	var oAllCMB = document.getElementsByTagName('select');
	if(oAllCMB.length != 0)
	{
		for(var x=0; x<oAllCMB.length; x++)
		{
			var cmbID = oAllCMB[x].id;
			if(cmbID.indexOf(sKeyword) != -1 && oAllCMB[x].type != "select-multiple")
			{
				SP_CheckAndAddBlank(cmbID);
			}
		}
	}
}

/*
To add a blank option in any specific dropdown. 
Arguments:
1) ID of dropdown.
Sample Call: SP_PrependBlank("mastercontrol.role.SP_CR_Users.Imp1");
*/
function SP_PrependBlank()
{	
	SP_CheckAndAddBlank(arguments[0]);
}

/*
To check whether SELECT element has any blank option or not. If there is no blank option exist then add a blank option at top.
Arguments: ID of dropdown.
Sample Call: SP_CheckAndAddBlank("mastercontrol.role.SP_CR_Users.Imp1");
*/
function SP_CheckAndAddBlank(selectID)
{
	var oCMB = document.getElementById(selectID);
	var oCMBLength = oCMB.options.length; 
	var doesBlankExist = false;
	if(oCMBLength != 0)
	{
		for(var i = 0 ; i < oCMBLength; i++)
		{
			if(oCMB.options[0].text == "" && oCMB.options[0].value == "")
			{
				doesBlankExist = true;
			}
		}
		if(!doesBlankExist)
		{
			SP_InsertItemInSelect("","",0,oCMB);
		}
	}
}

/*
To insert an option in select object.
Arguments:
1) Value to be inserted.
2) Export value.
3) Position of inserted item.
4) Select object.
Sample Call: SP_InsertItemInSelect(assigneeUser,assigneeUser,atWhichPlace,cmbObject);
*/

function SP_InsertItemInSelect()
{
	if(arguments.length == 4)
	{
		var oCMB = arguments[3];
		var elOptNew = document.createElement('option');
		var pstn = arguments[2];
		elOptNew.text = arguments[0];
		elOptNew.value = arguments[1];
		if(oCMB.selectedIndex == 0)
		{
			var isOptDefault = oCMB.options[0].defaultSelected;
			if(!isOptDefault)
			{
				elOptNew.selected = true;
			}
		}
		oCMB.options.add(elOptNew,0);
	}
}

//Developed: ZASLAM; Bug: 29137; 30-Nov-2010, Created for Version: 10.0.0
//Function Intends to setup size of a multiselect field, required parameter is field name string. 
function SetAttachnLinkFieldSize()
{
	var oField = document.getElementById(arguments[0]);
	// Browser check for Safari & Chrome. When items are less than 4.
	if(oField.options.length <= 4 && (navigator.userAgent.indexOf("Safari") > 0 || navigator.userAgent.indexOf("Chrome") > 0))
	{
		oField.size = oField.options.length;
		switch(oField.options.length)
		{
			case 0:
			case 1:
				oField.style.height = "20px";
				break;
			case 2:
				oField.style.height = "35px";
				break;
			
			case 3:
				oField.style.height = "50px";
				break;
			
			case 4:
				oField.style.height = "65px";
				break;
		}
	}
	else
	{
		oField.removeAttribute("style");
		if(oField.length != 0)
		{
			if(oField.length <= 10)
			{
				oField.size = oField.length;
			}
			else if (oField.length > 10)
			{
				oField.size = 10;
			}
			oField.disabled = false;
		}
		else
		{
			oField.size = 1;
		}
	}
}