// Create a max limit to the text in the cover sheets textarea
function imposeMaxLength(Object, MaxLen) {
    if (Object.value.length>MaxLen)
        Object.value=Object.value.substring(0,MaxLen)
}
// Validate the 3 fields to see if we need to enable the SEND button
function validateFields(inputField, showField) {
    var doc = window.document.verifyForm;
    if (showField != null) {
        var linkName = window.document.getElementById(showField);
    }
    if ((doc.id_file1.value == "") && (doc.id_file2.value == "") && (doc.rib_file.value == "") ) {
        window.document.getElementById("submit_button").disabled = true;
		window.document.getElementById("submit_button").setAttribute("class", "upload-button-disabled");
        // This IF statement is done becuase in Chrome, pressing CANCEL clears the input field
        if (inputField) { linkName.style.display = "none"; }
    } else {
        window.document.getElementById("submit_button").disabled = false;
		window.document.getElementById("submit_button").setAttribute("class", "upload-button-enabled");
        if (inputField) { linkName.style.display = "inline"; }
    }
}
// Clear the input field
function clearField(whatBlock) {
    var doc = window.document.verify;
    var blockName = document.getElementById(whatBlock);
    var newCoding = "";
    // Rewrite the form code to beat IE security issues with clearing a file upload field
    switch(whatBlock) {
        case "inputField1":
            newCoding = "<input type=\"file\" name=\"id_file1\" id=\"id_file1\" onchange=\"validateFields(this, 'id_file1_remove')\"> <a style=\"display: none;\" href=\"javascript:clearField('inputField1')\" class=\"cssBodyLink\" id=\"id_file1_remove\" name=\"id_file1_remove\">Remove</a>";
            break;
        case "inputField2":
            newCoding = "<input type=\"file\" name=\"id_file2\" id=\"id_file2\" onchange=\"validateFields(this, 'id_file2_remove')\"> <a style=\"display: none;\" href=\"javascript:clearField('inputField2')\" class=\"cssBodyLink\" id=\"id_file2_remove\" name=\"id_file2_remove\">Remove</a>";
            break;
        case "inputField3":
            newCoding = "<input type=\"file\" name=\"rib_file\" id=\"rib_file\" onchange=\"validateFields(this, 'rib_file_remove')\"> <a style=\"display: none;\" href=\"javascript:clearField('inputField3')\" class=\"cssBodyLink\" id=\"rib_file_remove\" name=\"rib_file_remove\">Remove</a>";
            break;
    }
    blockName.innerHTML = newCoding;
    validateFields();
}
function showId() {
	var selectBox = document.getElementById("id-type");
	hideAllIds();
	if (selectBox.options[1].selected){
		window.document.getElementById("nat").style.display = "inline";		
		window.document.getElementById("inputField1").style.display = "block"
		window.document.getElementById("inputField2").style.display = "block"
	}
	else if (selectBox.options[2].selected){
		window.document.getElementById("passport").style.display = "inline";		
		window.document.getElementById("inputField1").style.display = "block"
	}
	else if (selectBox.options[3].selected){
		window.document.getElementById("driver").style.display = "inline";
		window.document.getElementById("inputField1").style.display = "block"
	}
	else {
		window.document.getElementById("nat-thumb").style.display = "inline";		
		window.document.getElementById("passport-thumb").style.display = "inline";		
		window.document.getElementById("driver-thumb").style.display = "inline";		
	}
}
function hideAllIds() {
	window.document.getElementById("nat-thumb").style.display = "none";		
	window.document.getElementById("passport-thumb").style.display = "none";		
	window.document.getElementById("driver-thumb").style.display = "none";		
	window.document.getElementById("nat").style.display = "none";		
	window.document.getElementById("passport").style.display = "none";		
	window.document.getElementById("driver").style.display = "none";	

	window.document.getElementById("inputField1").style.display = "none";
	window.document.getElementById("inputField2").style.display = "none";
}

