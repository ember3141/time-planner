var uiText = {
    "headerOptions": [{
            "name": "File",
            "content": [{
                    "name": "clear lstime",
                    "onclick": "rls(\"timeInfo\")"
                },
                {
                    "name": "clear style",
                    "onclick": "rls(\"uiStyle\")"
                },
                {
                    "name": "export",
                    "onclick": ""
                }
            ]
        },
        {
            "name": "Window",
            "content": [{
                    "name": "main menu",
                    "onclick": "page(0)"
                },
                {
                    "name": "second page",
                    "onclick": "page(1)"
                },
                {
                    "name": "frog",
                    "onclick": "page(\"settingsPage\")"
                }
            ]
        },
        {
            "name": "Settings",
            "content": [{
                    "name": "cycle theme",
                    "onclick": ""
                },
                {
                    "name": "debug",
                    "onclick": ""
                },
                {
                    "name": "full settings",
                    "onclick": "page(\"settingsPage\")"
                }
            ]
        }
    ],
    "documentDropdown": [{
            "name": "documentElements",
            "content": [
  
            ]
        }
  
    ],
    pageIndex: ["welcomePage", "selectorPage"],
    "settingsPage": {
        "onload": "stylerDropdown()",
        "content": `
        <input type=\"text\" id=\"backgroundInput\" style=\"background-color:red;\" class=\"text-input\"></input>
        <input type=\"text\" id=\"propertyInput\" class=\"text-input\"></input>
        <button id=\"frog\" onclick=\"processStyle()\">set</button>
        <div id=\"dropdown\"></div>
        `
    },
    "newTrackerPage":{
        "onload": "timeInc(\'clear\')",
        "content": `
        <input type=\"text\" title=\"unintel\" class=\"text-input\" placeholder=\"Name of tracker\" autocomplete=\"off\" id=\"trackerNameSet\"></input>
        <input type=\"text\" title=\"unintel\" class=\"text-input\"  placeholder=\"Style\" autocomplete=\"off\" id=\"trackerColorSet\"></input>
        <div class=\"time-select\">
        <button class=\"time-button\" onclick=\"timeInc(\'more\',\'hour\')\">↑</button>
        <button class=\"time-button\" onclick=\"timeInc(\'more\',\'min\')\">↑</button>
        <br>
        <span id=\"the-hours\" class=\"fakep\">0</span>
        <span class=\"fakep\">:</span>
        <span id=\"the-mins\" class=\"fakep\">0</span>
        <br>
        <button class=\"time-button\" onclick=\"timeInc(\'less\',\'hour\')\">↓</button>
        <button class=\"time-button\" onclick=\"timeInc(\'less\',\'min\')\">↓</button>
        </div>

        <button onclick=\"addTracker(docId(\'trackerNameSet\').value,docId(\'trackerColorSet\').value,currentTimeInc());page(\'selectorPage\')\">submit</button>
        `
    },
    "welcomePage": {
        "onload": "",
        "content": `
        <h1 id=\"greetingHead\">Welcome!</h1>
        <p id=\"greetingBody1\">I see that this is your first time here... or you have cleared your localstorage</p>
        <button id=\"greetingButton\" onclick=\"page('next')\">ok</button>
        `
    },
    "selectorPage": {
        "onload": "addTracker(\"updatePage\")",
        "content": 
        `
        <div class=\'selection-pos\'>
        <div id=\"selection-buttons\" class=\'selection-buttons\'>        
        <div style=\"\"><button id=\"addButton\" onclick=\"page(\'newTrackerPage\')\">add tracker</button></div>
        </div>
        <div id=\"selection-grid\" class=\'selection-grid\'>
        </div>
        </div>
    
        `
    }
  
  };
  
  var uiStyle = {
    elements: [{
            "selector": "body",
            "styles": {
                "background": "#303030"
            }
        },
        {
            "selector": "p",
            "styles": {
                "color": "#FFF",
                "fontFamily": "Figtree-Medium"
            }
  
        },
        {
            "selector": ".fakep",
            "styles": {
                "color": "#FFF",
                "fontFamily": "Figtree-Medium"
            }
  
        },
        {
            "selector": "db",
            "styles": {
                "color": "#FFF",
                "fontFamily": "Figtree-Medium",
            }
  
        },
        {
            "selector": "db:hover",
            "styles": {
                "color": "#ccc",
                "fontFamily": "Figtree-Medium",
            }
  
        },
        {
            "selector": "h2",
            "styles": {
                "color": "#FFF",
                "fontFamily": "Figtree-Medium"
            }
  
        },
        {
            "selector": "h1",
            "styles": {
                "color": "#FFF",
                "fontFamily": "Figtree-Bold"
            }
  
        },
        {
            "selector": "button",
            "styles": {
                "color": "white",
                "backgroundColor": "#212121"
            }
  
        },
        {
            "selector": "button:hover",
            "styles": {
                "color": "white",
                "backgroundColor": "#212121"
            }
  
        },
        {
            "selector": "button:active",
            "styles": {
                "color": "white",
                "backgroundColor": "#212121"
            }
  
        },
        {
            "selector": ".header",
            "styles": {
                "background": "rgba(33,33,33,0.75)"
            }
  
        },
        {
            "selector": ".headerButton",
            "styles": {
                "color": "#DDD"
            }
  
        },
        {
            "selector": ".headerButton:hover",
            "styles": {
                "color": "#AAA"
            }
  
        },
        {
            "selector": ".dropdown",
            "styles": {
                "backgroundColor": "#212121"
            }
  
        },
        {
            "selector": ".content-container",
            "styles": {
                "background": "rgba(66,66,66,0.75)"
            }
  
        },
        {
            "selector": ".text-input",
            "styles": {
                "background-color": "rgba(66,66,66,0.75)",
                "color": "#FFF"
            }
  
        },
    ]
  }

  var timeInfo = [

  ]