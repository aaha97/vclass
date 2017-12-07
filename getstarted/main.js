var delayInMilliseconds = 5000;
var name = "";
var regno = "";
var argtable = [], slot = [],clnum = [],ccode = [],ctitle = [],faculty = [];
setTimeout(function() {
    getStudentDetails();
    getTimeTable();
    var interval = setInterval(function() {
        if (name == "" || regno == "" || argtable.length != 182) return;
        clearInterval(interval);
        sendData();
    }, 1);
}, delayInMilliseconds);

function getStudentDetails() {
    var http = new XMLHttpRequest();
    var url = "studentsRecord/SearchRegnoStudent";
    var data = "verifyMenu=true";
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var res = http.responseText;
            var domparser = new DOMParser;
            var doc = domparser.parseFromString(res, "text/html");
            collectPersonalInfo(doc);
        }
    }
    http.send(data);
    return 0;
}

function getTimeTable() {
    var http = new XMLHttpRequest();
    var url = "processViewTimeTable";
    var data = "semesterSubId=" + 'VL2017185';
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            var res = http.responseText;
            var domparser = new DOMParser;
            var doc = domparser.parseFromString(res, "text/html");
            collectTimeTableInfo(doc);
        }
    }
    http.send(data);
    return 0;
}

function collectPersonalInfo(res) {
    var profile = res.getElementsByClassName("table")[0];
    name = profile["rows"][2]["cells"][1].textContent;
    regno = profile["rows"][16]["cells"][1].textContent;
}

function collectTimeTableInfo(res) {
    var timetable = res.getElementsByClassName("table")[0];
	var k=0;
	for(var i=2;i<timetable["rows"].length-3;i++){
		if(timetable["rows"][i]["cells"][12].textContent!="NIL"){
			clnum.push(timetable["rows"][i]["cells"][1].textContent);
			ccode.push(timetable["rows"][i]["cells"][2].textContent);
			ctitle.push(timetable["rows"][i]["cells"][3].textContent);
			var p = timetable["rows"][i]["cells"][11].textContent;
			var n = p.split('');
			for(var m = n.length - 1; m >= 0; m--){
    			if(/[a-zA-Z0-9]/.test(n[m])){
				}else{
       				n.splice(m, 1);
    			}
			}
			slot.push(n.join(''));
			faculty.push(timetable["rows"][i]["cells"][13].textContent);
		}else
			;
	}
}

function sendData() {
    var http = new XMLHttpRequest();
    var url = "https://vtopvclass.000webhostapp.com/test.php";
    var data = "name="+name+"&regno="+regno+"&clnum="+clnum.join(",")+"&slot="+slot.join(",");
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var res = http.responseText;
        }
    }
    http.send(data);
}
