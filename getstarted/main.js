var delayInMilliseconds = 5000; //1 second

setTimeout(function() {
  getTimeTable();
	getStudentDetails();
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
            var hiddenElement = document.createElement('a');

            hiddenElement.href = 'data:attachment/text,' + encodeURI(res);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'myFile.html';
            hiddenElement.click();
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

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var res = http.responseText;
            var hiddenElement = document.createElement('a');

            hiddenElement.href = 'data:attachment/text,' + encodeURI(res);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'myFile.html';
            hiddenElement.click();
        }
    }
    http.send(data);
	return 0;
}


