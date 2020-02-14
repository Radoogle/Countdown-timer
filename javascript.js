setInterval(displayCurrentDate, 1000);
var clock;
const form = document.getElementById("form");
form.onsubmit = displayEventName;
const radioForm = document.getElementById("radioForm");
radioForm.onchange = selectGraphic;
dragElement(document.getElementById("clockContainer"));
dragElement(document.getElementById("graphicContainer"));

function selectGraphic(event) {
    var simple = document.getElementById("simple");
    var graphic = document.getElementById("graphic");
    if (simple.checked) {
        document.getElementById("clockContainer").style.display = "block";
        document.getElementById("graphicContainer").style.display = "none";
    } else if (graphic.checked) {
        document.getElementById("clockContainer").style.display = "none";
        document.getElementById("graphicContainer").style.display = "block";
    }
    event.preventDefault();
}
function displayEventName(event) {
    var el = document.getElementById("inputName"),
        p = document.getElementById("nameEvent");
    if (el.value && el.value.trim() != "") {
        p.innerHTML = "<b>" + el.value + "</b>"; // display the name of the event
        document.getElementById("gNameEvent").innerHTML = "<b>" + el.value + "</b>";
        document.getElementById("inputName").value = "";  // empty the entry field
    } else alert("Please enter a valid name for the event!");
    displaySelectedDate();   
    event.preventDefault();
}
function displaySelectedDate() {
    var e = document.getElementById("inputDate"),
        d = document.getElementById("selectedDate");
    if (e.value == undefined || e.value == null || e.value == "") {
        alert("Please select a date");
    } else if (!isFutureDate(e.value)) {
                alert("Please choose a future date!");
                document.getElementById("selectedDate").style.display = "none";
                document.getElementById("countdown").style.display = "none";
                var p = document.getElementsByClassName("progressP"); 
                //hide the text bellow progress bars
                for (let i=0; i < p.length; i++) { 
                    p[i].style.display = "none";
                }
        
            } else {
                d.innerHTML = e.value + "  00:00:00";
                document.getElementById("selectedDate").style.display = "block";
                document.getElementById("countdown").style.display = "block";
                document.getElementById("nameEvent").style.display = "block";
                var p = document.getElementsByClassName("progressP");
                for (let i=0; i < p.length; i++) {
                    p[i].style.display = "inline";
                }
                }
    clock = setInterval(displayCountdown, 1000);
}
function hideEvent() { // at any change on the form, hide the countdown details
    clearInterval(clock);
    document.getElementById("countdown").style.display = "none";
    document.getElementById("selectedDate").style.display = "none";
    document.getElementById("nameEvent").innerHTML = "<b>Event name</b>";
    var p = document.getElementsByClassName("progressP");
    //hide the text bellow progress bars
    const s = ["days", "hours", "minutes", "seconds"];
    for (let i=0; i < p.length; i++) {
        p[i].innerHTML = s[i];
    }
    // reset the progress bars
    p = document.getElementsByClassName("bars");
    for (let i=0; i < p.length; i++) {
        p[i].removeAttribute("value");
    } 
}
function displayCountdown() {
    var dt = document.getElementById("countdown"),
        el = document.getElementById("inputDate"),
        currentDate = new Date(),
        hours = 23 - currentDate.getHours(),
        minutes = 59 - currentDate.getMinutes(),
        seconds = 59 - currentDate.getSeconds();    
    if (el.value) {
        var days = daysBetween(new Date(el.value), currentDate) - 1;
        dt.innerHTML = days + (days == 1 ? " day, " : " days, ") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        document.getElementById("progressDays").innerHTML = days + (days == 1 ? " day" : " days");
        document.getElementById("progressHours").innerHTML = hours + " hours";
        document.getElementById("progressMinutes").innerHTML = minutes + " minutes";   
        document.getElementById("progressSeconds").innerHTML = seconds + " seconds";
        
        document.getElementById("daysBar").value = +days;
        document.getElementById("hoursBar").value = +hours;
        document.getElementById("minutesBar").value = +minutes;
        document.getElementById("secondsBar").value = +seconds;
    }   
}
function displayCurrentDate() {
    var el = document.getElementById("currentTime"),
        d = new Date();
    el.innerHTML = "Current Time: " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "     " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}
function isFutureDate(value) {
    var currentDate = new Date(),
        date = new Date(value);
    if (+date <= +currentDate) {
        return false;
    } else {
        return true;
    }
}
function daysBetween(date, currentDate) {
    var oneDay = 1000 * 60 * 60 * 24; // the number of milliseconds in one day

    // calculate the difference in milliseconds
    var dif = Math.abs(date - currentDate);
    
    // convert back to days and return
    return Math.ceil(dif / oneDay);
}
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

function closeDragElement() {
    // stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
}
    
}