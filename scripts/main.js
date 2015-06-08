//Cargando Ajustes
	var cssSheet = "main.css";
	if(typeof(Storage) !== "undefined"){
		//Por defecto
		console.log("ok");
		if(!localStorage.espLetrasI) localStorage.espLetrasI = true;
		 else console.log("ok1");
		if(!localStorage.espLetras) localStorage.espLetras = 1;
		 else console.log("ok2");
		if(!localStorage.espI) localStorage.espI = true;
		 else console.log("ok3");
		if(!localStorage.espJump) localStorage.espJump = 5;
		 else console.log("ok4");
		if(!localStorage.spPopi) localStorage.spPopi = 0;
		 else console.log("ok4");
		if(!localStorage.css) localStorage.css = "style/main.css";
		else{
			cssSheet = localStorage.css;
		}
		console.log(localStorage.spPopi);
		console.log(localStorage.espLetrasI+" "+localStorage.espLetras+" "+localStorage.espI+" "+localStorage.espJump);
		console.log(typeof(localStorage.espLetrasI))
		document.getElementById("espLetrasI").checked = (localStorage.espLetrasI=="true");
		setRadio("espLetras", localStorage.espLetras);
		document.getElementById("espI").checked = (localStorage.espI=="true");
		setRadio("espJump", localStorage.espJump);
	}else{
		//Cookies??	
	}
	
	
	var bodyColor;
function setStyleSheet(file){
	var oldlink = document.getElementsByTagName("link").item(0);
 
    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", file);
 
    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

setStyleSheet(cssSheet);

function menu(abrir){
	if(abrir){
		//document.getElementById("opciones").style.display = "block";
		bodyColor = document.body.style.backgroundColor;
		document.body.style.backgroundColor = "#FFFFFF";
		document.getElementById("titulo").style.position = "fixed";
		document.getElementById("opList").style.display = "block";
		document.getElementById("writer").style.overflow = "scroll";
		document.getElementById("writer").style.maxHeight = "2px";
		document.getElementById("page").style.opacity = "0";
		//document.getElementById("opciones").style.opacity = "1";
	}else{
		svAjustes();
		document.getElementById("page").style.opacity = "1";
		var color = document.body.style.backgroundColor;
		if(color == "rgb(255, 255, 255)" || color == "#FFFFFF")document.body.style.backgroundColor = bodyColor;
		//document.getElementById("opciones").style.opacity = "0";
		document.getElementById("writer").style.maxHeight = "none";
		document.getElementById("writer").style.overflow = "visible";
		document.getElementById("titulo").style.position = "static"; 
		//document.getElementById("opciones").style.display = "none";
		document.getElementById("opList").style.display = "none";
	}
}

function svAjustes(){
	if(typeof(Storage) !== "undefined"){
		localStorage.setItem("espLetrasI",document.getElementById("espLetrasI").checked);
		localStorage.setItem("espLetras",radioVal("espLetras"));
		localStorage.setItem("espI",document.getElementById("espI").checked);
		localStorage.setItem("espJump",radioVal("espJump"));
		localStorage.setItem("espJump",radioVal("espJump"));
		console.log(localStorage.espLetrasI+" "+localStorage.espLetras+" "+localStorage.espI+" "+localStorage.espJump);
		if(document.getElementById("themes").value != cssSheet) {
			var cssSheet = document.getElementById("themes").value
			localStorage.setItem("css",cssSheet);
			setStyleSheet(cssSheet);
		}
	}else{
		alert("Su navegador no utiliza WebStorage, por lo que sus ajustes no se guardaran");	
	}
}

var emoForm = 0;
function emojiMenu(emoForm){
	var emoBox = ""
	emoBox = "<table border='0'>";
	var cRow = 0;
	for(var ix = 0; ix < emoList[emoForm].length; ix++){
		if(cRow == 7){
			emoBox += "</tr><tr>";
			cRow = 0;
		}
		cRow++;
		emoBox += "<td><img src='img/"+emoList[emoForm][ix]+".png' \
width='25px' height='25px' class='emoBoton' onclick='emoSel(\""+emoList[emoForm][ix]+"\")'/></td>";
	}
	emoBox += "<td><img src='img/espacio.png' \
width='25px' height='25px' class='emoBoton' onclick='emoSel(\"0020&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"); if(localStorage.spPopi==0){alert(\"Este icono crea espacios en blanco, como si fuesen iconos transparentes\\nPuedes encontrarlo siempre al final de todos los menus\"); localStorage.spPopi = 1;}'/></td>";
	emoBox += "</table>";
	document.getElementById("emoBox").innerHTML = emoBox;
}


var fEmo = false;
var fEmo1 = "2b1c";
var fEmo0 = "2b1b";
var emoOp = 3;
function emoFEmo(noHueco){
	if(noHueco){
		document.getElementById("Emo1").style.border = "thin solid #0FF";
		document.getElementById("Emo0").style.border = "none";
		fEmo = true;	
	}else{
		document.getElementById("Emo0").style.border = "thin solid #0FF";
		document.getElementById("Emo1").style.border = "none";
		fEmo = false;
	}
}
function emoSel(code){
	if(fEmo){
		document.getElementById("Emo1").src = "img/"+code+".png" 
		fEmo1=code
	}else{
		document.getElementById("Emo0").src = "img/"+code+".png"
		fEmo0=code;
	}
}

function emoji(sel){
	var emoSel = document.getElementById("emoSel");
	switch(sel){
		case "text":
			emoOp = 1;
			emoSel.innerHTML = " \
			Texto para espacio:<input id='f0' type='text'/><br /> \
			Texto para relleno:<input id='f1' type='text'/><br /> \
			Puedes copiar los emoticonos desde <a href='http://getemoji.com/'>http://getemoji.com/</a>";	
			break;
		case "code":
			emoOp = 2;
			emoSel.innerHTML = " \
			Escriba el código del emoticono:  <br /> \
			Código para espacio:<input id='f0' size='6' value='9723' type='text'/> \
			&nbsp;&nbsp;&nbsp;Hex: <input type='checkbox' id='HexOrDec' /><br /> \
			Código para relleno:<input id='f1' size='6' value='11035' type='text'/><br /> \
			Puedes encontrar el código aquí: \
			<a href='http://apps.timwhitlock.info/emoji/tables/unicode'>timwhitlock.info</a><br />\
			Copia el campo unicode quitandole el U+ y pincha en hexadecimal";
			break;
		case "emo":
			emoOp = 3; //onerror="this.onerror=null;this.src='http://placekitten.com/100/100';"
			emoSel.innerHTML = "Rellenos:<img id='Emo0' \ src='img/2b1b.png' \
	width='20px' height='20px' onerror='this.src = \"img/espacio.png\"' onclick='emoFEmo(false)' class='emoBoton'/>  &nbsp;&nbsp;&nbsp;&nbsp; \
	Huecos:<img id='Emo1' \ src='img/2b1c.png' \
	width='20px' height='20px' onerror='this.src = \"img/espacio.png\"' onclick='emoFEmo(true)' class='emoBoton'/> \
	<br /> \
	<img src='img/1f601.png' \
	width='35px' height='35px' onclick='emojiMenu(0)' class='emoBoton'/> \
	<img src='img/1f431.png' \
	width='35px' height='35px' onclick='emojiMenu(1)' class='emoBoton'/> \
	<img src='img/1f514.png' \
	width='35px' height='35px' onclick='emojiMenu(2)' class='emoBoton'/> \
	<img src='img/1f691.png' \
	width='35px' height='35px' onclick='emojiMenu(3)' class='emoBoton'/> \
	<img src='img/1f523.png' \
	width='35px' height='35px' onclick='emojiMenu(4)' class='emoBoton'/> \
	<div id='emoBox'></div>";
	emojiMenu(0);
			break;
		default:
			emoOp = -1;
			emoSel.innerHTML = "Error, la opción no existe";
	}
}

emoji('emo');

function pixel(pixel){
	switch(emoOp){
		case 1:
		 	var pText = (pixel)? "f0" : "f1";
			return document.getElementById(pText).value;
			break;
		case 2:
			var pText = (pixel)? document.getElementById("f0").value 
			: document.getElementById("f1").value;
			if(document.getElementById("HexOrDec").checked)pText = "x"+pText;
			return "&#"+pText;
			break;
		case 3:
			var pText = (pixel)? fEmo1 : fEmo0;
			return "&#x"+pText;
			break;
		default:
	}
}
//qwertyuiopasdfghjklñzxcvbnm 1234567890.

function radioVal(name){
	var radios = document.getElementsByName(name);
	for (var i = 0; i < radios.length; i++) {
		if (radios.item(i).checked) {
			return radios.item(i).value;
		}
	}
	return -1;	
}

function setRadio(name, valor){
	var radios = document.getElementsByName(name);
	for (var i = 0; i < radios.length; i++) {
		if (radios.item(i).value == valor) {
			radios.item(i).checked = true;
		}else{
			radios.item(i).checked = false;	
		}
	}	
}

function create(){
	var input = document.getElementById("texto").value.toLowerCase(); 
	var inpF = document.getElementById("fuentes").value;
	var espLtI = document.getElementById("espLetrasI").checked;
	var espLt = radioVal("espLetras");
	var espI = document.getElementById("espI").checked;
	var espJ = radioVal("espJump");
	console.log(espLtI+" "+espLt+" "+espI+" "+espJ);
	var output = "";
	var pix1 = pixel(true);
	var pix0 = pixel(false);
	
	for(var l = 0; l < input.length; l++){
		try {
			if(input.charAt(l)!=" "){
				for(var i = 0; i < fn[inpF].x; i++){
					for(var j = 0; j < fn[inpF].y; j++){
						if(fn[inpF].char[input.charAt(l)][i][j]==0){
							//output += "&#9723;";
							output += pix1;
						}else{
							//output += "&#11035;";
							output += pix0;
						}
					}
					output += "\n";
				}
			}else{
				if(espI){
					for(var i = 0; i < espJ; i++){
						for(var j = 0; j < fn[inpF].y; j++){
							output += pix1;
						}
						output += "\n";
					}
				}else{
					for(var i = 0; i < espJ; i++){
						output += "\n";	
					}
				}
			}
		}catch(err) {
    		alert("Caracter " + input.charAt(l) +" no indexado");
			//output += "ERROR<br/>";
			console.warn("¡ERROR caracter "+input.charAt(l)+" no soportado\n"+err);
		}
		if(l+1 != input.length){
		if(espLtI){
			for(var i = 0; i < espLt; i++){
				for(var j = 0; j < fn[inpF].y; j++){
					output += pix1;
				}
				output += "\n";
			}
		}else{
			for(var i = 0; i < espLt; i++){
				output += "\n";
			}
		}
		}
		//output += "\n";
	}
	document.getElementById("writer").innerHTML = "<div id='shareButtons'><div onclick='document.location = \"whatsapp://send?text="+encodeURIComponent(uniDecode(output))+"\"' class='share whatsapp'></div>"+
	"<div onclick='document.location = \"tg://msg?text="+encodeURIComponent(uniDecode(output))+"\"' class='share telegram'></div>"+
	"<div onclick='document.location = \"twitter://post?message="+encodeURIComponent(uniDecode(output))+"\"' class='share twitter'></div>"+
	"<div onclick='document.location = \"https://twitter.com/intent/tweet?text="+encodeURIComponent(uniDecode(output))+"\"' class='share twitterWeb'></div></div>"+output.replace(/\n/g, '<br />');
	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNodeContents(document.getElementById("writer"));
	selection.removeAllRanges();
	selection.addRange(range);
}

function uniDecode(str){
	var text, p=document.createElement('p');
    p.innerHTML=str;
    text= p.innerText || p.textContent;
    p.innerHTML='';
    return text;	
}
