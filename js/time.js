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
function addTracker(name,color,hour,min){
   console.log(timeInfo.trackers[0])
    if(name=="updatePage"){
        if (timeInfo.trackers[0]==0){
            return
        }

        for(var i=0;i<timeInfo.trackers.length;i++){
            docId("selection-grid").innerHTML+=`
            <div style=\"background:`+timeInfo.trackers[i].color+`;\" class=\"tracker-containers\">
            <p id = \"`+timeInfo.trackers[i].name+`_display\"></p>

            <button>▶</button>
            <button> | |</button>
            <button onclick=\"removeTracker(\'`+timeInfo.trackers[i].name+`\')\">🗑</button>
            </div>
            `
        }
        
    } else {
        var trackerObject = {"name":name,"color":color,"hours":hour,"mins":min};
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
    console.log(timeInfo.trackers);
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
    console.log(timeInfo.trackers);
}

function timeInc(moreless,minhour){

    theHours=document.getElementById("the-hours");
    theMins=document.getElementById("the-mins");

    if(moreless=="more"){
        if(minhour=="min"){
            if(mins==59){
                mins=0;
            }else{
                mins++;
            }
        } else if(minhour=="hour"){
            hours++;
        }
    } else if(moreless=="less"){
        if(minhour=="min"){
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
    } else {
        console.error("timeInc() has been used wrong :/");
    }
    theHours.innerHTML=hours;
    theMins.innerHTML=mins;
}

function currentTimeInc(hourmin){
    if(hourmin=="hour"){
        return hours;
    } else if(hourmin=="min"){
        return mins;
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
            console.log(timeInfo.trackers)
    for(var i=0;i<timeInfo.trackers.length;i++){
        document.getElementById(timeInfo.trackers[i].name+"_display").innerHTML=timeInfo.trackers[i].name+" "+timeInfo.trackers[i].hours;
    }
}
}
const timeDisplay = document.getElementById("headerClock");
const remainingTime =  " "+timeInfo.deadline.hours-currentHour()+":"+(60-currentMin())+":"+(60-currentSec())+" ";
timeDisplay.innerHTML = "<p class=\'fakep\'>"+remainingTime+"</p>"
setStyle();
  }
    setInterval(refreshTime, 1000);

function resetTrackers(){
    
}