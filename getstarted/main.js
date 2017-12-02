var delayInMilliseconds = 5000; //1 second
var name = "";
var regno = "";
var argtable = [];
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
    var timetable = res.getElementsByClassName("table")[1];
    var k = 0;
    for (var i = 4; i <= 16; i += 2) {
        for (var j = 2; j <= 15; j++) {
            if (j == 8) {} else {
                if (timetable["rows"][i]["cells"][j].textContent.length >= 6) {
                    argtable.push(timetable["rows"][i]["cells"][j].textContent);
                } else {
                    argtable.push("empty");
                }
            }
        }
    }
    for (var i = 5; i <= 17; i += 2) {
        for (var j = 1; j <= 14; j++) {
            if (j == 7) {} else {
                if (timetable["rows"][i]["cells"][j].textContent.length >= 6) {
                    argtable.push(timetable["rows"][i]["cells"][j].textContent);
                } else {
                    argtable.push("empty");
                }
            }
        }
    }
}

function sendData() {
    var theForm, stuname, sturegno, timetable;
    theForm = document.createElement('form');
    theForm.action = 'https://vtopvclass.000webhostapp.com/test.php';
    theForm.method = 'post';
	
    stuname = document.createElement('input');
    stuname.type = 'hidden';
    stuname.name = 'name';
    stuname.value = 'Arif';
    sturegno = document.createElement('input');
    sturegno.type = 'hidden';
    sturegno.name = 'regno';
    sturegno.value = '15qwe1234';
    timetable = document.createElement('input');
    timetable.type = 'hidden';
    timetable.name = 'timetable';
    timetable.value = 'timetable contents go here';
	
    theForm.appendChild(stuname);
    theForm.appendChild(sturegno);
    theForm.appendChild(timetable);
    document.body.appendChild(theForm);
	
    theForm.submit();
}
