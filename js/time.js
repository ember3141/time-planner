// alert(timeInfo.length)
var hours = 0;
var mins = 0;
function addTracker(name,color,duration){
   
    if(name=="updatePage"){
        if(timeInfo[0]==0){
            timeInfo.push("I love frogs!")
            timeInfo.unshift(trackerObject);
            pop();
        }
        for(var i=0;i<timeInfo.length;i++){
            docId("selection-grid").innerHTML+=`
            <div style=\"background:`+timeInfo[i].color+`;\" class=\"tracker-containers\">
            <p>`+timeInfo[i].name+`</p>
            <p>`+timeInfo[i].duration+`</p>
            <button>▶</button>
            <button> | |</button>
            <button onclick=\"removeTracker(\'`+timeInfo[i].name+`\')\">🗑</button>
            </div>
            `
        }
        
    } else {
        var trackerObject = {"name":name,"color":color,"duration":duration};
        if(timeInfo[0]==0){
            timeInfo.push("I love frogs!")
            timeInfo.unshift(trackerObject);
            pop();
        }else{
            timeInfo.push(trackerObject);
        }

        console.log(timeInfo)
        console.log(name+color);
        // alert(timeInfo[0].color)
       // document.getElementById("selection-grid").innerHTML+="<div style=\"background-color:rgba(0, 144, 0, 0.5);\">"+name+"</div>"
    }
    lsSetStored();
    
}

function removeTracker(name){
    console.log(timeInfo);
    var yay = false;
    for(var i=0;i<timeInfo.length;i++){
        if(name==timeInfo[i].name){
            timeInfo.splice(i,1);
            yay=true;
        }
    }
    if(yay==true){
        page("selectorPage");
       // addTracker("updatePage");
    } else {
        console.error("wtf I couldn't find the thing to delete :(")
    }
    console.log(timeInfo);
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

function currentTimeInc(){
    return hours + ":" + mins;
}