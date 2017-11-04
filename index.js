var LoginUser = "Thomas";
var LoginPass = "1234";
var LoginUser2 = "Max";
var LoginPass2 = "5678";
var dwFilename = "arduino.log";
//var bGraphColor = ["#00ff00","#ff0000","#0000ff"];
var bGraphColor = ["#E74C3C","#3498DB","#27AE60","#F1C40F","#D35400","#8E44AD","#1ABC9C","#000080","#7FFF00","#DC143C","#7FDD4C","#B0D8E8","#40E0D0","#E01440","#FF0000","#00FF00","#0000FF","#5D6D7E","#D98880","#1F618D"];


//====================== fonctions =============================
//  ?/action=learnNfc
//  ?/config= ...jsonConfNewEndCfg
//  ?/pompe=On
//  ?/pompe=Off
//  ?/startMin= ...valueEndVal
//  ?/action=reloadPage
//  ?/action=reboot


var ptimer = 0

var d = new Date();
var calc  = d.getMonth()+1;
if (calc > 12)
	calc = 1;
d.setMonth(calc);

function htmlInit(){

if (afficher == "Home")
{
showHome();
}
else if(afficher == "Config")
{
showConfig();
}
else
{
    document.getElementById("DvConfig").style.display = "none";
    document.getElementById("DvHome").style.display = "none";
    document.getElementById("DvLogin").style.display = "block";
} 
	
    document.getElementById('date').innerHTML = "<i class='fa fa-unlock-alt' aria-hidden='true'></i> Dernier login "+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	
	document.getElementById('AHum').innerHTML = "<img src='https://github.com/GardenArduino/Garden/blob/master/gauge48.png?raw=true'> <b> "+hum+" </b> %";
	document.getElementById('pb1').innerHTML = hum+" %";
    $(".pb1").css("width", hum+"%");
	
	if(humSol > 60 && humSol <= 80)
	{
		document.getElementById("PAHsol").className += "panel panel-success";
		var humSolIcon = "hum_ok";
	}
	else if(humSol > 40 && humSol <= 60)
	{
		document.getElementById("PAHsol").className += "panel panel-warning";
		var humSolIcon = "hum_warn";
	}
	else
	{
		document.getElementById("PAHsol").className += "panel panel-danger";
		var humSolIcon = "hum_dang";
	}
	
	document.getElementById('AHumSol').innerHTML = "<img src='https://github.com/GardenArduino/Garden/blob/master/"+humSolIcon+".png?raw=true'> <b> "+humSol+" </b> %";
	document.getElementById('pb2').innerHTML = humSol+" %";
	$(".pb2").css("width", humSol+"%");
	
	document.getElementById('AWaterLevel').innerHTML = "<img src='https://github.com/GardenArduino/Garden/blob/master/wl.png?raw=true'> <b> "+eauL+" </b> L  / <b> "+eauP+" </b> %";
	document.getElementById('pb3').innerHTML = eauP+" %";
	$(".pb3").css("width", eauP+"%");
	
	if(temp >= 0 && temp < 5)
		var icTemp = "temp-0-5";
	else if(temp >= 5 && temp < 10)
		var icTemp = "temp-5-10";
	else if(temp >= 10 && temp < 15)
		var icTemp = "temp-10-15";
	else if(temp >= 15 && temp < 20)
		var icTemp = "temp-15-20";
	else if(temp >= 20 && temp < 25)
		var icTemp = "temp-20-25";
	else if(temp >= 25 && temp < 30)
		var icTemp = "temp-25-30";
	else if(temp >= 30)
		var icTemp = "temp-gt-30";
	else if(temp < 0)
		var icTemp = "ice";
	
	document.getElementById('ATemp').innerHTML = "<img src='https://github.com/GardenArduino/Garden/blob/master/"+icTemp+".png?raw=true'> <b> "+temp+" </b> °C";
	document.getElementById('ADewPoint').innerHTML = "Point de Rosée: "+dewpoint+" °C";
	
	document.getElementById('APression').innerHTML = "<img src='https://github.com/GardenArduino/Garden/blob/master/baro48.png?raw=true'> <b> "+pression+" </b> hPa";
	if (pression < "990")
		var prev = "Pluvieux"
	else if (pression >= "990" && pression < "1010")
		var prev = "Instable";
	else if (pression >= "1010" && pression < "1017")
		var prev = "Nuageux"
	else if (pression >= "1017")
		var prev = "Ensoleillé";
	document.getElementById('APrevision').innerHTML = "Prévision: "+prev;
	
	if(pompe == 1)
	document.getElementById("APump").innerHTML = "<img onclick='switchPump()' src='https://github.com/GardenArduino/Garden/blob/master/Pump148_On.png?raw=true'> <b> On </b>";
	else
	document.getElementById("APump").innerHTML = "<img onclick='switchPump()' src='https://github.com/GardenArduino/Garden/blob/master/Pump148_Off.png?raw=true'> <b> Off </b>";
	
	document.getElementById("pb5").innerHTML = volt+" Volts";
	
	if(volt <= 5)
		var clV = "progress-bar progress-bar-danger pb5";
	else if(volt <= 10 && volt > 5)
		var clV = "progress-bar progress-bar-warning pb5";
	else if(volt <= 13 && volt > 10)
		var clV = "progress-bar progress-bar-success pb5";
	else if(volt > 13)
		var clV = "progress-bar progress-bar-info pb5";
	document.getElementById("pb5").className = clV;
	var pourcentV = volt/15*100;
	$(".pb5").css("width", pourcentV+"%");
	
	var pluie;
	if(pluvio == 0)
	{
	pluie = "Non";
	}
	else
	{
	pluie = "Oui";
	}
	document.getElementById("APluvio2").innerHTML = "<i class='fa fa-tint' aria-hidden='true'></i> Pluie: "+pluie;
	document.getElementById("APluvio").innerHTML = "<img src='https://github.com/GardenArduino/Garden/blob/master/rain.png?raw=true'> <b> "+pluvio+" mm </b>";
	
	document.getElementById("ATimer").innerHTML = "<img onclick='startTimer()' src='https://github.com/GardenArduino/Garden/blob/master/clock48.png?raw=true'> <button onclick='setTimer("+timer1+")' type='button' class='btn btn-default'>"+timer1+"</button> <button onclick='setTimer("+timer2+")' type='button' class='btn btn-default'>"+timer2+"</button> <button onclick='setTimer("+timer3+")' type='button' class='btn btn-default'>"+timer3+"</button> <a class='btn btn-default' onclick='addTMin()'><span class='glyphicon glyphicon-plus'></span></a> <a class='btn btn-default' onclick='rmTMin()'><span class='glyphicon glyphicon-minus'></span></a>";
	
	var boolVent;
	if(vent < 8)
	{
	boolVent = "Non";
	}
	else
	{
	boolVent = "Oui";
	}
	document.getElementById("AVent2").innerHTML = "<i class='fa fa-signal' aria-hidden='true'></i> Vent: "+boolVent;
	document.getElementById("AVent").innerHTML = "<img src='https://github.com/GardenArduino/Garden/blob/master/wind.png?raw=true'> <b> "+vent+" km/h </b>";
	
	document.getElementById("ABatt").innerHTML = "<img src='https://github.com/GardenArduino/Garden/blob/master/battery.png?raw=true'> <b> "+volt+" Volts </b>";
	document.getElementById("ABattFT").innerHTML = "<i class='fa fa-battery-three-quarters' aria-hidden='true'></i> Batterie: "+amperes+"A "+watts+"W";
	
	document.getElementById("AWater").innerHTML = "<img src='https://github.com/GardenArduino/Garden/blob/master/pressure.png?raw=true'> <b> "+consoEau+" Litres </b>";
	debit = debit*60;
	document.getElementById("pb6").innerHTML = debit+" L/s";
	if(debit <= 25)
		var clB = "progress-bar progress-bar-waning pb6";
	else if(debit <= 45 && debit > 25)
		var clB = "progress-bar progress-bar-success pb6";
	else if(debit > 45)
		var clB = "progress-bar progress-bar-danger pb6";
	document.getElementById("pb6").className = clB;
	var pourcentB = debit/50*100;
	$(".pb6").css("width", pourcentB+"%");
	
	if(minuterieState == 1)
	{
	document.getElementById("pb4").className = "progress-bar progress-bar-success pb4";
	document.getElementById("pb4").innerHTML = minRestant+" minutes restantes"
	var minP = (minOrig-minRestant)/minOrig*100;
	$(".pb4").css("width", minP+"%");
	}
	else
	{
	document.getElementById("pb4").className = "progress-bar pb4";
	document.getElementById("pb4").innerHTML = "Inactif"
	$(".pb4").css("width", "100%");
	}
	
	document.getElementById("min1").innerHTML = timer1;
	document.getElementById("min2").innerHTML = timer2;
	document.getElementById("min3").innerHTML = timer3;
	document.getElementById("netSsid").value = wifiSsid;
	document.getElementById("netKey").value = wifiKey;
	
	var doc = eval('(' + jsonNfc + ')'); 
	var table = "";
	var i = 0;
	while(i != Object.keys(doc.value).length)
	{
	table += "<li class='list-group-item' id='"+doc.value[i]+"'>"+doc.name[i]+" : "+doc.value[i]+" <a onclick='removeNfc(this)' class='btn btn-xs btn-danger'><span class='glyphicon glyphicon-remove-sign'></span></a></li>";
	i++;
	}
	document.getElementById("listNfc").innerHTML = table;
	
	var log = eval('(' + jsonLogToday + ')'); 
	var month = d.getMonth();
	var year = d.getFullYear();
	var day = d.getDate();
	var logtable = "";
	i = 0;
	while(i != Object.keys(log[year][month]).length)
	{
		if(log[year][month][i].day == day)
		{
		  logtable += "<li class='list-group-item'> <big> "+log[year][month][i].name+" : "+log[year][month][i].value+"</big> <span class='badge'> "+log[year][month][i].day+"/"+month+"/"+year+" "+log[year][month][i].hour+":"+log[year][month][i].min+"</span> </li>"
		}
		i++;
	}
	document.getElementById('LogList').innerHTML = logtable;

}


function showLogin()
{
location.reload();
}

function showHome()
{
    document.getElementById("DvConfig").style.display = "none";
    document.getElementById("DvHome").style.display = "block";
    document.getElementById("DvLogin").style.display = "none";
}

function showConfig()
{
    document.getElementById("DvConfig").style.display = "block";
    document.getElementById("DvHome").style.display = "none";
    document.getElementById("DvLogin").style.display = "none";
}

function verifForm()
{
   if (document.getElementById("user").value == LoginUser || document.getElementById("user").value == LoginUser2)
   {
   var u = true;
   document.getElementById("dU").className = "form-group has-success has-feedback";
   document.getElementById("gU").className = "glyphicon glyphicon-ok form-control-feedback";
   document.getElementById('hU').innerHTML = "OK";
   }
   else
   {
   var u = false;
   document.getElementById("dU").className = "form-group has-error has-feedback";
   document.getElementById("gU").className = "glyphicon glyphicon-remove form-control-feedback";
   document.getElementById('hU').innerHTML = "Saisie Incorrecte";
   }
   
   if (document.getElementById("pass").value == LoginPass || document.getElementById("pass").value == LoginPass2)
   {
   var p = true;
   document.getElementById("dP").className = "form-group has-success has-feedback";
   document.getElementById("gP").className = "glyphicon glyphicon-ok form-control-feedback";
   document.getElementById('hP').innerHTML = "OK";
   }
   else
   {
   var p = false;
   document.getElementById("dP").className = "form-group has-error has-feedback";
   document.getElementById("gP").className = "glyphicon glyphicon-remove form-control-feedback";
   document.getElementById('hP').innerHTML = "Saisie Incorrecte";
   }
   
   if(p == true && u == true)
   {
   document.getElementById("DvHome").style.display = "block";
   document.getElementById("DvLogin").style.display = "none";
   }
}

function showAlert(color,txt)
{
document.getElementById("alertBox").innerHTML += "<div class='alert alert-"+color+" alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"+txt+"</div>";
}

function saveConfig()
{
var txt = "Timer 1: "+document.getElementById("min1").innerText+" min<br>Timer 2: "+document.getElementById("min2").innerText+" min<br>Timer 3: "+document.getElementById("min3").innerText+" min<br>";
txt += "Réseau: "+document.getElementById("netSsid").value+"<br>Clé: "+document.getElementById("netKey").value;
showAlert("warning",txt);

var lis=document.getElementById('listNfc').getElementsByTagName('li');
var jsonNfcName = '{"name":{';
var jsonNfcVal = '},"value":{';
var nfcN = "";
for(var i=0; i<lis.length; i++)
{
  nfcN = lis[i].innerText;
  nfcN = nfcN.substring(0,nfcN.indexOf(":")-1);
  jsonNfcName += '"'+i+'":"'+nfcN+'",';
  jsonNfcVal += '"'+i+'":"'+lis[i].id+'",';
}

var jsonNfcNew = jsonNfcName.substring(0,jsonNfcName.length-1)+jsonNfcVal.substring(0,jsonNfcVal.length-1)+'}}';
if(jsonNfcNew == '{"name":},"value":}}')
	jsonNfcNew = '{"name":{},"value":{}}';
var jsonConfNew = '{"t1":"'+document.getElementById("min1").innerText+'","t2":"'+document.getElementById("min2").innerText+'","t3":"'+document.getElementById("min3").innerText+'","ssid":"'+document.getElementById("netSsid").value+'","key":"'+document.getElementById("netKey").value+'","nfc":'+jsonNfcNew+'}';
showAlert("info",jsonNfcNew);
showAlert("info",jsonConfNew);

if(sendRequest("config="+jsonConfNew) == "true")
showAlert("success","Saved !");
else
showAlert("danger","Not Saved !");

}

function addMin(divName)
{
   var min = document.getElementById(divName).innerText;
	var m = Number(min)+1
	if(m < 1)
	{
	m = 1
	}
   document.getElementById(divName).innerHTML = m;
}

function rmMin(divName)
{
    var min = document.getElementById(divName).innerText;
	var m = Number(min)-1
	if(m < 1)
	{
	m = 1
	}
   document.getElementById(divName).innerHTML = m;
}

function removeNfc(tag)
{
showAlert("warning","Tag: "+tag.parentNode.id+" removed")
document.getElementById(tag.parentNode.id).parentNode.removeChild(document.getElementById(tag.parentNode.id));
}

function learnNfc()
{
showAlert("info","Learning NFC ...");
var data = sendRequest("action=learnNfc");
if(data != "" && data != "Error" && data != "false")
{
document.getElementById("mTag").innerHTML = data;
$('#myModal').modal()
}
else
{
showAlert("danger","Error !");
}
}

function saveModal()
{
var tag = document.getElementById("mTag").innerText;
var name = document.getElementById("mName").value;
showAlert("warning","New tag: "+tag+" ; "+name)
document.getElementById("listNfc").innerHTML += "<li class='list-group-item' id='"+tag+"'>"+name+" : "+tag+" <a onclick='removeNfc(this)' class='btn btn-xs btn-danger'><span class='glyphicon glyphicon-remove-sign'></span></a></li>";
document.getElementById("mTag").innerHTML = "";
document.getElementById("mName").value = "";
}

function rebootArduino()
{
showAlert("info","Rebooting Arduino ...");
$('#rbModal').modal()
timer(0);
//$('#rbModal').modal('toggle');
}

  function timer(n) {
    $(".rbProgress-bar").css("width", n + "%");
    $("#pourcentage").text(n + "%");
    if(n < 100) {
      setTimeout(function() {
        timer(n + 10);
      }, 500);
    }
	else
	{
	setTimeout(function() {
        location.reload();
      }, 1000);
	}
  }
  
function refreshHome()
{
window.location = "http://"+ip+"/?action=reloadPage";
}

function addTMin()
{
   ptimer = ptimer+1;
   document.getElementById("ptimerdiv").innerHTML = ptimer;
}

function rmTMin()
{
   ptimer = ptimer-1;
   document.getElementById("ptimerdiv").innerHTML = ptimer;
}

function startTimer()
{
document.getElementById("ptimerdiv").innerHTML = "";
if(sendRequest("startMin="+ptimer)=="true")
	showAlert("success","pump started with timer to "+ptimer+" min");
else
	showAlert("danger","pump NOT started !");
}

function setTimer(nbr)
{
ptimer = nbr;
document.getElementById("ptimerdiv").innerHTML = ptimer;
}
function switchPump()
{
if(pompe == 1)
{
	if(sendRequest("pompe=Off")=="true")
		showAlert("success","Pump Switched Off");
	else
		showAlert("danger","Pump NOT Switched Off !");
}
else
{
	if(sendRequest("pompe=On")=="true")
		showAlert("success","Pump Switched On");
	else
		showAlert("danger","Pump NOT Switched On !");
}
}
function sendRequest(param)
{
    var xhr=null;
    if (window.XMLHttpRequest) { 
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) 
    {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var str = "http://"+ip+"/?"+param;
	try {
    xhr.open("GET", str, false);
    xhr.send(null);
    var rep = xhr.responseText;
	}
	catch (exception) {
      var rep = "Error";
	}
	return rep;
}

function afficherAnciensLog()
{
var firstYear = jsonLog.substring(2,6);
var str = firstYear+"-01-01T00:00:00";
var date = new Date(str);
var timestamp = date.getTime();
var log = eval('(' + jsonLog + ')'); 

var month = date.getMonth()+1;if (month > 12)month = 1; //corrige le decalage du mois
var year = date.getFullYear();
var day = date.getDate();
var logtable = "";
while(timestamp < d.getTime())
{
timestamp = timestamp/1000+86401;//incremente d'un jour a chaque fois
date = new Date(timestamp*1000);
timestamp = date.getTime();

	month = date.getMonth()+1;if (month > 12)month = 1;//corrige le decalage du mois
	year = date.getFullYear();
	day = date.getDate();
	
	i = 0;
	try
	{
	while(i != Object.keys(log[year][month]).length)
	{	
		if(log[year][month][i].day == day)
		{
		  logtable += "<li class='list-group-item'> <big> "+log[year][month][i].name+" : "+log[year][month][i].value+"</big> <span class='badge'> "+log[year][month][i].day+"/"+month+"/"+year+" "+log[year][month][i].hour+":"+log[year][month][i].min+"</span> </li>"
		}
		i++;
	}
	}
	catch (exception) {}
}
	document.getElementById('LogList').innerHTML = logtable;
}

function afficherGraph1()
{
document.getElementById("graphYearButtons").innerHTML = "";
var d = new Date();
var calc  = d.getMonth()+1;
if (calc > 12)
	calc = 1;
d.setMonth(calc);

var arr = new Array();

var log = eval('(' + jsonLogToday + ')'); 
	var month = d.getMonth();
	var year = d.getFullYear();
	var day = d.getDate();
	var logtable = "";
	var i = 0;
	var k = 0;
	var find = false;
	var arr = new Array();
	while(i != Object.keys(log[year][month]).length)
	{
		if(log[year][month][i].day == day)
		{
		  
		  find = false;
		  for(k=0;k<arr.length;k++)
		  {
			if(arr[k][0] == log[year][month][i].name)
			{
			find = true;
			var n = arr[k][3]+1;
			arr[k][3] = n;
			arr[k][1][n] = log[year][month][i].hour+":"+log[year][month][i].min;
			arr[k][2][n] = log[year][month][i].value;
			}
		  }
			if(find == false)
		  {
			var l = arr.length;
			arr[l] = new Array();
			arr[l][0] = log[year][month][i].name;//nom de la valeur
			arr[l][3] = 0;//compteur
			arr[l][1] = new Array();
			arr[l][2] = new Array();
			arr[l][1][0] = log[year][month][i].hour+":"+log[year][month][i].min;//date
			arr[l][2][0] = log[year][month][i].value;//valeur
		  }
		}
		i++;
	}
	
var datasets = new Array();
var labels = new Array();
for(i=0;i<arr[0][1].length;i++)
{
labels[i] = arr[0][1][i];
}
for(i=0;i<arr.length;i++)
{
var data = new Array();
		for(j=0;j<arr[0][3]+1;j++)
		{
			data[j] = arr[i][2][j];
		}
	datasets[i] = {label:arr[i][0],borderColor:bGraphColor[i],data:data};
}
var dtGraph = {labels:labels,datasets:datasets};
loadGraph(dtGraph);
$('#graphModal').modal();
}

function afficherGraph2()
{
var firstYear = jsonLog.substring(2,6);
var insert = "";var i = 0;var j = 0;
for(i=firstYear;i<d.getFullYear()+1;i++)
{
	if(jsonLog.indexOf(i) != -1)
		insert += "<input type='checkbox' id='graphChk"+i+"' name='chk' value='true'><label for='graphChk"+i+"'>"+i+"</label>";
}
insert += " <a onclick='drawGraph2()' class='btn btn-primary btn-success'> <i class='fa fa-area-chart' aria-hidden='true'></i> Draw</a>"
document.getElementById("graphYearButtons").innerHTML = insert;
$('#graphModal').modal();
}



function drawGraph2()
{
var d = new Date();
var calc  = d.getMonth()+1;
if (calc > 12)
	calc = 1;
d.setMonth(calc);

	var i = 0;
	var k = 0;
	var find = false;
	var arr = new Array();
	var firstYear = jsonLog.substring(2,6);
	var yearsSelected = "";
	for(i=firstYear;i<d.getFullYear()+1;i++)
	{	try{
		if(document.getElementById("graphChk"+i).checked == true)
			yearsSelected += i+";";
		}catch (exception) {}
	}
	i=0;
	var str = yearsSelected.substring(0,4)+"-01-01T00:00:00";
	var date = new Date(str);
	var timestamp = date.getTime();
	var log = eval('(' + jsonLog + ')'); 

	var month = date.getMonth()+1;if (month > 12)month = 1; //corrige le decalage du mois
	var year = date.getFullYear();
	var day = date.getDate();
	var logtable = "";
	var continuee = true;
	
while(timestamp < d.getTime() && continuee==true)
{
timestamp = timestamp/1000+86401;//incremente d'un jour a chaque fois
date = new Date(timestamp*1000);
timestamp = date.getTime();

	month = date.getMonth()+1;if (month > 12)month = 1;//corrige le decalage du mois
	year = date.getFullYear();
	day = date.getDate();
	
	if(yearsSelected.indexOf(year) == -1)
	{
		while(yearsSelected.indexOf(year) == -1 && continuee==true)
		{
		timestamp = timestamp/1000+3153605;//incremente d'un an a chaque fois
		date = new Date(timestamp*1000);
		timestamp = date.getTime();

		month = date.getMonth()+1;if (month > 12)month = 1;//corrige le decalage du mois
		year = date.getFullYear();
		day = date.getDate();
		if(year>d.getFullYear())
		{
		continuee = false;
		}
		}
	}
	
	i = 0;
	try
	{
	while(i != Object.keys(log[year][month]).length)
	{	
		if(log[year][month][i].day == day)
		{
			find = false;
		  for(k=0;k<arr.length;k++)
		  {
			if(arr[k][0] == log[year][month][i].name)
			{
			find = true;
			var n = arr[k][3]+1;
			arr[k][3] = n;
			arr[k][1][n] = year+"/"+month+"/"+log[year][month][i].day;
			arr[k][2][n] = log[year][month][i].value;
			}
		  }
			if(find == false)
		  {
			var l = arr.length;
			arr[l] = new Array();
			arr[l][0] = log[year][month][i].name;//nom de la valeur
			arr[l][3] = 0;//compteur
			arr[l][1] = new Array();
			arr[l][2] = new Array();
			arr[l][1][0] = year+"/"+month+"/"+log[year][month][i].day;//date
			arr[l][2][0] = log[year][month][i].value;//valeur
		  }
		   
		}
		i++;
	}
	}
	catch (exception) {}
}
	
var datasets = new Array();
var labels = new Array();
for(i=0;i<arr[0][1].length;i++)
{
labels[i] = arr[0][1][i];
}
for(i=0;i<arr.length;i++)
{
var data = new Array();
		for(j=0;j<arr[0][3]+1;j++)
		{
			data[j] = arr[i][2][j];
		}
	datasets[i] = {label:arr[i][0],borderColor:bGraphColor[i],data:data};
}
var dtGraph = {labels:labels,datasets:datasets};
loadGraph(dtGraph);
$('#graphModal').modal();
}



function loadGraph(data)
{
var options = {
    scaleShowGridLines : true,
    scaleGridLineColor : "#0000FF",
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve : true,
    bezierCurveTension : 0.4,
    pointDot : false,
    pointDotRadius : 4,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 20,
    datasetStroke : false,
    datasetStrokeWidth : 2,
	scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        //min: 0,
                        max: 100    
                    }
                  }]
               },
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};
var ca = document.getElementById("myGraph");
var ctx = ca.getContext("2d");
var myLineChart = Chart.Line(ctx, {
    data: data,
    options: options
});
Chart.defaults.global.responsive = true;
}


function downloadLog() {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonLog));
  element.setAttribute('download', dwFilename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
