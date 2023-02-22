function gls(a) {
  return localStorage.getItem(a);
}

function sls(a, b) {
  localStorage.setItem(a, b);
//   console.log("%c'" + a + "' has been set with '" + b + "'!", 'color: lightgreen; font-size: 15px')
//   console.trace();
}

function rls(a) {
  localStorage.removeItem(a);
   console.log("%c'" + a + "' has been removed!", 'color: orange; font-size: 15px')
//   console.trace();
}

function lsSetStyle() { //sets localstorage
  sls("uiStyle", JSON.stringify(uiStyle));

//   console.log("%c ls style has been set!", 'color: blue; font-size: 15px')
}

function lsGetStyle() { //sets variable
  uiStyle = JSON.parse(gls("uiStyle"));
  
  console.log("%c ls style has been retreived!", 'color: blue; font-size: 15px')
}

function lsSetTime(){
    sls("timeInfo", JSON.stringify(timeInfo));   
}

function lsGetTime(){
    timeInfo = JSON.parse(gls("timeInfo"));
}
//rls('uiStyle')
// console.log(uiStyle)

if(gls("uiStyle")!=null){
   lsGetStyle();
 }
lsSetStyle();

if(gls("timeInfo")!=null){
    lsGetTime();
  }
 lsSetTime();

function docId(id){
    return document.getElementById(id);
}

function page(a) {

  if (a == "next") {
      console.log("page() has been called with 'next'. the old page is " + gls('page'))
      var newNum = parseInt(gls('page'));
      newNum++;
      sls('page', newNum)
  } else if (typeof(a) == "number") {
      console.log("page() has been called with " + a + ". the old page is " + gls('page'))
      sls('page', a);
  } else if (typeof(a) == "string") {
      console.log("page() has been called with " + a + ". the old page is " + gls('page'))
      sls('page', a);
  }
  console.log("the new page is " + gls('page'))
  writePage();
  setStyle();
}

/*
how to use getPageContent
nothing specified: it will return everything on the page which is in localstorage
page="ls": all future information will be from localstorage page
only page: it will return all elements on the specified page
only page and element: it will return everything under the current element
info: specifies the attribute of an element to be returned
*/
function getPageContent(page, element, info) {
  var outcome, thingToGet;
  if (isNaN(parseInt(gls('page'))) == false) {
      thingToGet = uiText.pageIndex[gls('page')];
  } else if (isNaN(parseInt(gls('page'))) == true) {
      thingToGet = gls('page');

  } else {
      console.warn("current page in ls is not a reconized datatype")
  }
  if (page == undefined && element == undefined && info == undefined) {
      outcome = uiText[thingToGet].content
  }
  if (page == "ls") {
      page = gls('page');
  }
  if (page !== undefined && element == undefined && info == undefined) {
      outcome = uiText[thingToGet].content
  } else if (page !== undefined && element !== undefined && info == undefined) {
      outcome = Object.keys(uiText[thingToGet].content[element])
  } else if (page !== undefined && element !== undefined && info !== undefined) {
      outcome = uiText[thingToGet].content[element][info]
  }
  if (outcome != undefined) {
      return outcome;
  } else if (outcome == undefined) {
      console.warn("couldn't find the thing you were looking for from getPageContent(" + page + " " + element + " " + info + "). this results in undefined");
      console.trace();
  }

};

function dropdown(a, state) {
  if (state == "on") {
      docId("dropdown" + a).setAttribute('style', 'display:inline-flex !important');
  } else if (state == "off") {
      docId("dropdown" + a).setAttribute('style', 'display:none !important')
  }

}



// rls('page')

if (gls('page') == undefined || gls('page') == null) { //if theres no page, it will go to 0
  sls('page', 0);
}
// alert(Object.keys(uiText[dataList][0].content[0]));

writeDropdown("header", "headerOptions", "nav");
docId("header").innerHTML+="<div id=\"headerClock\"></div>";

function writeDropdown(place, dataList, type) { //type:"nav" type:"select"
  var header = docId(place);
  for (var i = 0; i < uiText[dataList].length; i++) {
      header.innerHTML += "<div class=\"headerButtonContain\" id='headerButton_" + uiText[dataList][i].name + "'></div>";
      var currentContainer = docId("headerButton_" + uiText[dataList][i].name);
      currentContainer.innerHTML += "<h2 class='headerButton' id='dropDown_" + uiText[dataList][i].name + "'>" + uiText[dataList][i].name + "</h2>";


      if (type == "nav") {
          currentContainer.innerHTML += "<div class='dropdown' id='dropdown_" + uiText[dataList][i].name + "'></div>"
      } else if (type == "select") {
          currentContainer.innerHTML += "<div class='dropdown' id='dropdown_" + uiText[dataList][i].name + "' style=\'overflow-y:auto;height:25vh;\'></div>"
      }


      var currentDropdown = docId("dropdown_" + uiText[dataList][i].name);
      for (var j = 0; j < uiText[dataList][i].content.length; j++) {

          if (type == "nav") {
              currentDropdown.innerHTML += "<db onclick='" + uiText[dataList][i].content[j].onclick + "'>" + uiText[dataList][i].content[j].name + "</db>"
          } else if (type == "select") {
              currentDropdown.innerHTML += "<db onclick=\"setSelect(\'dropDown_" + uiText[dataList][i].name + "','" + uiText[dataList][i].content[j].name + "\')\">" + uiText[dataList][i].content[j].name + "</db>"
          } else {
              console.warn("a valid 'type' wasn't provided for writeDropdown()");
          }
      }
  }
}

function setSelect(header, name) {
  docId(header).innerText = name;
}

// function writePage() {
//   docId("content-container").innerHTML = "";
//   for (var elementCout = 0; elementCout < getPageContent().length; elementCout++) {
//       for (var infoCout = 0; infoCout < getPageContent("ls", elementCout).length; infoCout++) {
//         docId(getPageContent("ls", elementCout, "parent")).innerHTML += "<" + getPageContent("ls", elementCout, "type") + " " + getPageContent("ls", elementCout, "attr") + " id=\'" + getPageContent("ls", elementCout, "id") + "\'>" + getPageContent("ls", elementCout, "content") + "</" + getPageContent("ls", elementCout, "type") + ">";
//       }
      
//   }
//   var thingToGet;
//   if (isNaN(parseInt(gls('page'))) == false) {
//       thingToGet = uiText.pageIndex[gls('page')];
//   } else if (isNaN(parseInt(gls('page'))) == true) {
//       thingToGet = gls('page');
//   }
//   eval(uiText[thingToGet].onload);
// }
// Object.keys(uiStyle.elements[0]) returns 'names'
// Object.values(uiStyle.elements[0]) returns' values' of names

function writePage(){ 

  
        docId("content-container").innerHTML = getPageContent();
                
    
      var thingToGet;
  if (isNaN(parseInt(gls('page'))) == false) {
      thingToGet = uiText.pageIndex[gls('page')];
  } else if (isNaN(parseInt(gls('page'))) == true) {
      thingToGet = gls('page');
  }
  eval(uiText[thingToGet].onload);
}


/***
* if setStyle is empty it will set all elements on the page with their according style
*  selector: the selector that contains the style you want to change
*  style: the thing idk I am just doing this for nothing
*  value: goodbye
*/
function setStyle(selectorAsked, style, value) {

  if (selectorAsked == undefined) {
      for (var i = 0; i < uiStyle.elements.length; i++) {
          var selectorElements = document.querySelectorAll(uiStyle.elements[i].selector);
          for (var j = 0; j < selectorElements.length; j++) {
              for (var k = 0; k < Object.keys(uiStyle.elements[i].styles).length; k++) {
                  var currentKey = Object.keys(uiStyle.elements[i].styles)[k]
                  selectorElements[j].style[currentKey] = Object.values(uiStyle.elements[i].styles)[k];

              }
          }
      }
  } else if (selectorAsked !== undefined && style !== undefined && value !== undefined) {
      var selectorPos;
      for (var i = 0; i < uiStyle.elements.length; i++) {
          if (uiStyle.elements[i].selector == selectorAsked) {
              selectorPos = i;
          }
      };
      if (selectorPos == undefined) {
          console.warn("could not find the element specified with setStyle()");
          return undefined;
      }

      uiStyle.elements[selectorPos].styles[style] = value;

      setStyle();
      writePage();
  } else {
      console.warn("you used setStyle with less than 3 values!");
  }
}
writePage();
setStyle();

function stylerDropdown() {
  for (var i = 0; i < uiStyle.elements.length; i++) {
      var option = uiStyle.elements[i].selector;
      uiText.documentDropdown[0].content.push({
          "name": "" + option + "",
          "onclick": ""
      }, );

  }
  writeDropdown("dropdown", "documentDropdown", "select");
  setStyle();
}

function processStyle() {
  var item=docId("dropDown_documentElements").innerHTML,
  backgroundValue = docId("backgroundInput").value,//red one (value)
  property=docId("propertyInput").value,//white one (name of thing)
  styleValue;
  
//   if(backgroundValue.includes("http")==true){
//     styleValue= "url(\'"+backgroundValue+"\')";
//   } else {
    styleValue = backgroundValue;
//   }
console.log("backgroundValue: "+ backgroundValue)
  setStyle(item, property, styleValue);
  lsSetStored();
}