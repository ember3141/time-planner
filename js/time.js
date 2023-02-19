// alert(timeInfo.length)

function addTracker(name,color){
   
    if(name=="updatePage"){
        for(var i=0;i<timeInfo.length;i++){
            docId("selection-grid").innerHTML+="<div style=\"background:"+timeInfo[i].color+";\">"+timeInfo[i].name+"</div>"
        }
        
    } else {
        if(timeInfo[0]==0){
            timeInfo.push("I love frogs!")
            timeInfo.unshift({"name":name,"color":color});
            pop();
        }else{
            timeInfo.push({"name":name,"color":color});
        }

        console.log(timeInfo)
        console.log(name+color);
        // alert(timeInfo[0].color)
       // document.getElementById("selection-grid").innerHTML+="<div style=\"background-color:rgba(0, 144, 0, 0.5);\">"+name+"</div>"
    }
    lsSetStored();
    
}
