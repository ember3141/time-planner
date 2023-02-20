// alert(timeInfo.trackers.length)
function currentHour(){
    return  parseInt(new Date().toJSON().slice(11, 13))+timeInfo.offset;
}
var frog = new Date();
function currentMin(){
    return  parseInt(new Date().toJSON().slice(14, 16));
}

function currentSec(){
    return  parseInt(new Date().toJSON().slice(17, 19));
}


runAtTime(timeInfo.deadline.hours,timeInfo.deadline.mins,resetTrackers);

var hours = 0;
var mins = 0;
var secs = 0;
function addTracker(name,color,hour,min,sec){
   console.log(timeInfo.trackers[0])
    if(name=="updatePage"){
        if (timeInfo.trackers[0]==0){
            return
        }

        for(var i=0;i<timeInfo.trackers.length;i++){
            docId("selection-grid").innerHTML+=`
            <div style=\"background:`+timeInfo.trackers[i].color+`;\" class=\"tracker-containers\">
            <p id = \"`+timeInfo.trackers[i].name+`_display\"></p>

            <button onclick=\"toggleRun(\'`+timeInfo.trackers[i].name+`\')\">▶/ | |</button>
            <button onclick=\"removeTracker(\'`+timeInfo.trackers[i].name+`\')\">🗑</button>
            </div>
            `
        }
        
    } else {
        secAmt=(hour*3600)+(min*60)+sec
        var trackerObject = {"name":name,"color":color,"secs":secAmt,"running":-1};
        if(timeInfo.trackers[0]==0){
            timeInfo.trackers.unshift(trackerObject);
            console.log(timeInfo.trackers)
            timeInfo.trackers.pop();
        }else{
            timeInfo.trackers.push(trackerObject);
        }

        console.log(timeInfo.trackers)
        console.log(name+color);
        // alert(timeInfo.trackers[0].color)
       // document.getElementById("selection-grid").innerHTML+="<div style=\"background-color:rgba(0, 144, 0, 0.5);\">"+name+"</div>"
    }
    lsSetTime();
    
}

function removeTracker(name){

    var yay = false;
    for(var i=0;i<timeInfo.trackers.length;i++){
        if(name==timeInfo.trackers[i].name){
            timeInfo.trackers.splice(i,1);
            yay=true;
        }
    }
    if(yay==true){
        page("selectorPage");
       // addTracker("updatePage");
    } else {
        console.error("wtf I couldn't find the thing to delete :(")
    }

}

function timeInc(moreless,minhour){

    theHours=document.getElementById("the-hours");
    theMins=document.getElementById("the-mins");
    theSecs=document.getElementById("the-secs");

    if(moreless=="more"){
        if(minhour=="secs"){
            if(secs==59){
                secs=0;
            }else{
                secs++;
            }
        } else if(minhour=="min"){
            if(mins==59){
                mins=0;
            }else{
                mins++;
            }
        } else if(minhour=="hour"){
            hours++;
        }
    } else if(moreless=="less"){
        if(minhour=="secs"){
            if(secs==0){
                secs=59;
            } else{
                secs--;
            }
        } else  if(minhour=="min"){
            if(mins==0){
                mins=59;
            } else{
                mins--;
            }
        } else if(minhour=="hour"&&hours!=0){
            hours--;
        }
    }  else   if(moreless=='clear'){
        hours=0;
        mins=0;
        secs=0;
    } else {
        console.error("timeInc() has been used wrong :/");
    }
    theHours.innerHTML=hours;
    theMins.innerHTML=mins;
    theSecs.innerHTML=secs;
}

function currentTimeInc(hourmin){
    if(hourmin=="hour"){
        return hours;
    } else if(hourmin=="min"){
        return mins;
    } else if(hourmin=="sec"){
        return secs;
    }
}

function processDeadline(time){
    if(time.length != 0){
    timeInfo.deadline.hours = time.slice(0, 2);
    timeInfo.deadline.mins = time.slice(3, 5);
    lsSetTime();
    runAtTime(timeInfo.deadline.hours,timeInfo.deadline.mins,resetTrackers);
}
}

function runAtTime(hour, minutes, func) //yes
{
  const twentyFourHours = 86400000;
  const now = new Date();
  let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now;
  if (eta_ms < 0)
  {
    eta_ms += twentyFourHours;
  }
  setTimeout(function() {
    //run once
    func();
    // run every 24 hours from now on
    setInterval(func, twentyFourHours);
  }, eta_ms);
}

function refreshTime() {

    if(gls("page")==1||gls("page")=="selectorPage"){
        if(timeInfo.trackers[0]!=0){
    for(var i=0;i<timeInfo.trackers.length;i++){
        if(timeInfo.trackers[i].running==1){
            timeInfo.trackers[i].secs--;
        }
        var hourCalc =Math.floor(timeInfo.trackers[i].secs/3600);
        var minCalc = Math.floor((timeInfo.trackers[i].secs-hourCalc*3600)/60);
        var secCalc = timeInfo.trackers[i].secs-(hourCalc*3600+minCalc*60);
        var thingToDisplay=""+hourCalc+":"+minCalc+":"+secCalc+""
        document.getElementById(timeInfo.trackers[i].name+"_display").innerHTML=timeInfo.trackers[i].name+" "+thingToDisplay+" ";
    }
}
}
const timeDisplay = document.getElementById("headerClock");
const remainingTime =  " "+timeInfo.deadline.hours-currentHour()+":"+(60-currentMin())+":"+(60-currentSec())+" ";
timeDisplay.innerHTML = "<p class=\'fakep\'>"+remainingTime+"</p>"
setStyle();
  }
    setInterval(refreshTime, 1000);

function toggleRun(name){
    var yay = false;
    for(var i=0;i<timeInfo.trackers.length;i++){
        if(name==timeInfo.trackers[i].name){
            timeInfo.trackers[i].running=timeInfo.trackers[i].running*-1;
            yay=true;
        }
    }
    if(yay!=true){
        console.error("wtf I couldn't find the thing to toggle :(")
    } 
}


function resetTrackers(){
    
}