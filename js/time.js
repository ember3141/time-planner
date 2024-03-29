// function gls(a) {
//   return localStorage.getItem(a);
// }
function currentHour() { //returns the current hour in est
    return parseInt(new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        hourCycle: 'h23',
    }).slice(11, 13));
}

function currentMin() { //gets current minute
    return parseInt(new Date().toJSON().slice(14, 16));
}

function currentSec() { //gets current second
    return parseInt(new Date().toJSON().slice(17, 19));
}

function sinceEpoch() { //gets the seconds since the last epoch
    return Math.round(Date.now() / 1000);
}

function deadlineInfo(what) { //sets the deadline to whatever
    if (what == "mins") {
        return Math.floor((timeInfo.deadline.secs - (Math.floor(timeInfo.deadline.secs / 3600)) * 3600) / 60)
    } else if (what == "hours") {
        return Math.floor(timeInfo.deadline.secs / 3600)
    } else {
        console.warn("deadlineInfo() has been used wrong :(")
    }
}

function allSec() { //gets the current time in seconds since midnight
    return (currentHour() * 3600) + (currentMin() * 60) + currentSec();
}
runAtTime(deadlineInfo("hours"), deadlineInfo("mins"), resetTrackers); //at the deadline all trackers will reset
var hours = 0,
 mins = 0,
 secs = 0;

function addTracker(name, color, hour, min, sec) { //function for adding a tracker, all the parameters are self explanitory
    console.log(timeInfo.trackers[0])
    if (name == "updatePage") {
        if (timeInfo.trackers[0] == 0) {
            return
        }
        for (var i = 0; i < timeInfo.trackers.length; i++) {
            docId("selection-grid").innerHTML += `
            <div id=\"` + timeInfo.trackers[i].name + `_contain\" style=\"background:` + timeInfo.trackers[i].color + `;\" class=\"tracker-containers\">
            <div id=\"` + timeInfo.trackers[i].name + `_length\" style=\"pointer-events:none;position:absolute;border-radius:15px;background:rgba(0,0,0,0.5)\"></div>
            <p id = \"` + timeInfo.trackers[i].name + `_display\"></p>
            <button onclick=\"toggleRun(\'` + timeInfo.trackers[i].name + `\')\">▶/ | |</button>
            <button onclick=\"restartRun(\'` + timeInfo.trackers[i].name + `\')\">↺</button>
            <button onclick=\"removeTracker(\'` + timeInfo.trackers[i].name + `\')\">🗑</button>
            </div>
            `
        }
    } else {
        secAmt = (hour * 3600) + (min * 60) + sec
        var trackerObject = {
            "name": name,
            "color": color,
            "secs": secAmt,
            "startSecs": secAmt,
            "running": -1,
            "lastStarted": 0,
            "startOffset": 0
        };
        if (timeInfo.trackers[0] == 0) {
            timeInfo.trackers.unshift(trackerObject);
            console.log(timeInfo.trackers)
            timeInfo.trackers.pop();
        } else {
            timeInfo.trackers.push(trackerObject);
        }
        console.log(timeInfo.trackers)
        console.log(name + color);
    }
    lsSetTime();
}

function removeTracker(name) { //removes a tracker by name
    var yay = false;
    for (var i = 0; i < timeInfo.trackers.length; i++) {
        if (name == timeInfo.trackers[i].name) {
            timeInfo.trackers.splice(i, 1);
            yay = true;
        }
    }
    if (yay == true) {
        page("selectorPage");
        // addTracker("updatePage");
    } else {
        console.error("wtf I couldn't find the thing to delete :(")
    }
}

function timeInc(moreless, minhour) { //I suck at everything so I made a dumb function that incriments the buttons
    theHours = docId("the-hours");
    theMins = docId("the-mins");
    theSecs = docId("the-secs");
    if (moreless == "more") {
        if (minhour == "secs") {
            if (secs == 59) {
                secs = 0;
            } else {
                secs++;
            }
        } else if (minhour == "min") {
            if (mins == 59) {
                mins = 0;
            } else {
                mins++;
            }
        } else if (minhour == "hour") {
            hours++;
        }
    } else if (moreless == "less") {
        if (minhour == "secs") {
            if (secs == 0) {
                secs = 59;
            } else {
                secs--;
            }
        } else if (minhour == "min") {
            if (mins == 0) {
                mins = 59;
            } else {
                mins--;
            }
        } else if (minhour == "hour" && hours != 0) {
            hours--;
        }
    } else if (moreless == 'clear') {
        hours = 0;
        mins = 0;
        secs = 0;
    } else {
        console.error("timeInc() has been used wrong :/");
    }
    theHours.innerHTML = hours;
    theMins.innerHTML = mins;
    theSecs.innerHTML = secs;
}

function currentTimeInc(hourmin) { //for my usage only
    if (hourmin == "hour") {
        return hours;
    } else if (hourmin == "min") {
        return mins;
    } else if (hourmin == "sec") {
        return secs;
    }
}

function processDeadline(time) { //if the deadline is more than 0 then it will be the new deadline
    if (time.length != 0) {
        timeInfo.deadline.secs = (time.slice(0, 2) * 3600) + (time.slice(3, 5) * 60)
        lsSetTime();
        runAtTime(deadlineInfo("hours"), deadlineInfo("mins"), resetTrackers);
    }
}

function runAtTime(hour, minutes, func) // run something when its time
{
    const fullDay = 86400000,
        now = new Date();
    let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now;
    if (eta_ms < 0) {
        eta_ms += fullDay;
    }
    setTimeout(function() {
        //run once
        func();
        // run every 24 hours from now on
        setInterval(func, fullDay);
    }, eta_ms);
}

function toggleRun(name) { //toggles a timer by its name
    var yay = false;
    for (var i = 0; i < timeInfo.trackers.length; i++) {
        if (name == timeInfo.trackers[i].name) {
            timeInfo.trackers[i].running = timeInfo.trackers[i].running * -1;
            if (timeInfo.trackers[i].running == 1) {
                timeInfo.trackers[i].lastStarted = sinceEpoch();
            }
            if (timeInfo.trackers[i].running == -1) {
                timeInfo.trackers[i].startOffset = timeInfo.trackers[i].startSecs - timeInfo.trackers[i].secs;
            }
            yay = true;
        }
    }
    if (yay != true) {
        console.error(" I couldn't find the thing to toggle :(")
    }
    lsSetTime();
}

function resetTrackers() {} //uhhhhhh     ( ;ー_一 )`   this function... totally resets the trackers and not because im running out of time

function restartRun(name) { //restarts a timer by name
    for (var i = 0; i < timeInfo.trackers.length; i++) {
        if (name == timeInfo.trackers[i].name) {
            timeInfo.trackers[i].secs = timeInfo.trackers[i].startSecs;
            timeInfo.trackers[i].startOffset = 0;
            timeInfo.trackers[i].running = -1;
            yay = true;
        }
    }
    if (yay != true) {
        console.error(" I couldn't find the thing to reset :(")
    }
}
setInterval(loop, 1);

function loop() { //everything inside of here happens every ms, I'm the best everyone clap
    if (typeof gls === 'function') {
        if (gls("page") == 1 || gls("page") == "selectorPage") {
            if (timeInfo.trackers[0] != 0) {
                for (var i = 0; i < timeInfo.trackers.length; i++) {
                    if (timeInfo.trackers[i].running == 1 && timeInfo.trackers[i].secs > 0) {
                        timeInfo.trackers[i].secs = (timeInfo.trackers[i].startSecs - timeInfo.trackers[i].startOffset) - (sinceEpoch() - timeInfo.trackers[i].lastStarted);
                    } else if (timeInfo.trackers[i].secs < 0) {
                        timeInfo.trackers[i].running = -1;
                        timeInfo.trackers[i].secs = 0;
                    }
                    lsSetTime();
                }
            }
        }
        const timeDisplay = docId("headerClock"),
            remainingTime = " " + deadlineInfo("hours") - (currentHour() + 1) + ":" + (60 - currentMin()) + ":" + (60 - currentSec()) + " ";
        timeDisplay.innerHTML = "<p class=\'fakep\'>" + remainingTime + "</p>"
        setStyle();
        if (gls("page") == 1 || gls("page") == "selectorPage") {
            if (timeInfo.trackers[0] != 0) {
                for (var i = 0; i < timeInfo.trackers.length; i++) {
                    var hourCalc = Math.floor(timeInfo.trackers[i].secs / 3600),
                        minCalc = Math.floor((timeInfo.trackers[i].secs - hourCalc * 3600) / 60),
                        secCalc = timeInfo.trackers[i].secs - (hourCalc * 3600 + minCalc * 60),
                        thingToDisplay = "" + hourCalc + ":" + minCalc + ":" + secCalc + "",
                        timePercent = (timeInfo.trackers[i].secs / timeInfo.trackers[i].startSecs) * 1;
                    docId(timeInfo.trackers[i].name + "_display").innerHTML = timeInfo.trackers[i].name + " " + thingToDisplay + " ";
                    docId(timeInfo.trackers[i].name + "_length").style.height = docId(timeInfo.trackers[i].name + "_contain").offsetHeight + "px";
                    docId(timeInfo.trackers[i].name + "_length").style.width = ((docId(timeInfo.trackers[i].name + "_contain").offsetWidth) * timePercent) + "px";
                }
            }
        }
        if (gls("page") == "newTrackerPage") {
            var totalTime = (parseInt(docId("the-hours").innerHTML) * 3600) + (parseInt(docId("the-mins").innerHTML) * 60) + (parseInt(docId("the-secs").innerHTML)),
                currentItemPercent = (totalTime / (timeInfo.deadline.secs - allSec())) * 100,
                stuffToAdd = "";
            if (timeInfo.trackers[0] != 0) {
                for (var i = 0; i < timeInfo.trackers.length; i++) {
                    var trackerItemPercent = (timeInfo.trackers[i].secs / (timeInfo.deadline.secs - allSec())) * 100;
                    stuffToAdd += "<div class=\"dayBarItems\" style=\"flex-basis:" + trackerItemPercent + "%;order:" + (i) + ";background:" + timeInfo.trackers[i].color + "\"><p class=\"dayBarNames\" style=\"margin:0\">" + timeInfo.trackers[i].name + "</p></div>";
                }
            }
            docId("dayBar").innerHTML = "" + stuffToAdd + "<div class=\"dayBarItems\"  style=\"flex-basis:" + currentItemPercent + "%;background:" + docId("trackerColorSet").value + ";order:100\"><p style=\"margin:0\" class=\"dayBarNames\">" + docId("trackerNameSet").value + "</p></div>";
        }
        setStyle();
    }
}

function newTrackerCheck() { //processes new trackers
    var yay = true;
    for (var i = 0; i < timeInfo.trackers.length; i++) {
        if (docId('trackerNameSet').value == timeInfo.trackers[i].name) {
            yay = false;
        }
    }
    if (yay == true) {
        addTracker(docId('trackerNameSet').value, docId('trackerColorSet').value, currentTimeInc('hour'), currentTimeInc('min'), currentTimeInc('sec'));
        page('selectorPage');
    }
    if (yay == false) {
        docId("warn").innerHTML = "you can't have two trackers with the same name!"
        setStyle();
        //alert("ok")
    }
}