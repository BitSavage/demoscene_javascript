
function Fontsheet (imageFilename, metricsFilename, kerning) {
	this.imageFilename  = imageFilename;
	this.metricsFilename = metricsFilename;
	this.kerning = kerning;
	this.fontsheetImage = new Image();
	this.spriteArray = new Array();	
}

Fontsheet.prototype.loadFontsheet = function() {
	this.fontsheetImage.src = this.imageFilename;
	xmlDoc = loadXMLDoc(this.metricsFilename);
	xmlCharacters = xmlDoc.getElementsByTagName("character");
	for (var i = 0; i < xmlCharacters.length; i++){
		this.spriteArray[i] = {
			sx: +( xmlCharacters[i].getElementsByTagName("x")[0].childNodes[0].nodeValue ), 
			sy: +( xmlCharacters[i].getElementsByTagName("y")[0].childNodes[0].nodeValue ), 
			width: +( xmlCharacters[i].getElementsByTagName("width")[0].childNodes[0].nodeValue ), 
			height: +( xmlCharacters[i].getElementsByTagName("height")[0].childNodes[0].nodeValue )};
	}
};

function loadXMLDoc(dname)
{
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET", dname, false);
	xhttp.send();
	return xhttp.responseXML;
} 

