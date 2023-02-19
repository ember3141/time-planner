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
        "onload": "",
        "content": `
        <p>Name of tracker</p>
        <input type=\"text\" class=\"text-input\" id=\"trackerNameSet\"></input>
        <p>style</p>
        <input type=\"text\" class=\"text-input\" id=\"trackerColorSet\"></input>

        <button onclick=\"addTracker(docId(\'trackerNameSet\').value,docId(\'trackerColorSet\').value);page(\'selectorPage\')\">submit</button>
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
        <div style=\"background-color:rgba(0, 144, 0, 0.5);\"><button id=\"addButton\">add item</button></div>
        <div style=\"background-color:rgba(0, 0, 144, 0.5);\"><button id=\"addButton\">add item</button></div>
        </div>
        <div id=\"selection-grid\" class=\'selection-grid\'>
        <div style=\"background-color:rgba(144, 144, 0, 0.5);\">large chart</div>
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