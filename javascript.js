const form = document.getElementById("form");
form.onsubmit = displayEventName;

setInterval(displayCurrentDate, 1000);
var clock;

function displayEventName(event) {
    var el = document.getElementById("inputName"),
        p = document.getElementById("nameEvent");
    if (el.value && el.value.trim() != "") {
        p.innerHTML = "<b>" + el.value + "</b>";
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
        
            } else {
                d.innerHTML = e.value + "  00:00:00";
                document.getElementById("selectedDate").style.display = "block";
                document.getElementById("countdown").style.display = "block";
                document.getElementById("nameEvent").style.display = "block";
                }
    clock = setInterval(displayCountdown, 1000);
}
function hideEvent() {
    clearInterval(clock);
    document.getElementById("countdown").style.display = "none";
    document.getElementById("selectedDate").style.display = "none";
    document.getElementById("nameEvent").style.display = "none";
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

dragElement(document.getElementById("clockContainer"));
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