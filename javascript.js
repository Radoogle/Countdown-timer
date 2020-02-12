setInterval(displayCurrentDate, 1000);
setInterval(displayCountdown, 1000);

//make the clockcontainer draggable
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

function displayCurrentDate() {
    var el = document.getElementById("currentDate"),
        d = new Date();
    
    el.innerHTML = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "     " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}

function isFutureDate(value) {
    var currentDate = new Date(),
        date = new Date(value);
    
    if (+date <= +currentDate) {
        return false;
    } else return true;
}

function displaySelectedDate() {
    var el = document.getElementById("inputDate"),
        d = document.getElementById("selectedDate");
        //currentDate = new Date();
    if (el.value == undefined || el.value == null || el.value == "") {
        alert("Please select a date");
    } else if (!isFutureDate(el.value)) {
                alert("Please choose a future date!");
                document.getElementById("countdown").style.display = "none";
                document.getElementById("selectedDate").style.display = "none";
            } else {
                d.innerHTML = el.value + "  00:00:00";
                document.getElementById("countdown").style.display = "block";
                document.getElementById("selectedDate").style.display = "block";
                }
}

function daysBetween(date, currentDate) {
    var oneDay = 1000 * 60 * 60 * 24; // the number of milliseconds in one day

    // calculate the difference in milliseconds
    var dif = Math.abs(date - currentDate);
    
    // convert back to days and return
    return Math.round(dif / oneDay);
}

function displayCountdown() {
    var el = document.getElementById("inputDate"),
        dt = document.getElementById("countdown"),
        currentDate = new Date();
        
    if (el.value) {
        var days = daysBetween(new Date(el.value), currentDate) - 1,
            hours = 23 - currentDate.getHours(),
            minutes = 59 - currentDate.getMinutes(),
            seconds = 60 - currentDate.getSeconds();
        dt.innerHTML = days + (days == 1 ? " day, " : " days, ") + hours + ":" + minutes + ":" + seconds;
    }
}
