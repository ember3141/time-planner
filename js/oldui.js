const uiText = {
  "headerOptions": [{
          "name": "File",
          "content": [{
                  "name": "save",
                  "onclick": ""
              },
              {
                  "name": "import",
                  "onclick": ""
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
      "content": [{
              "id": "backgroundInput",
              "type": "input",
              "content": "",
              "attr": "type=\"text\" style=\"background-color:red;\"",
              "parent": "content-container"
          },
          {
            "id": "propertyInput",
            "type": "input",
            "content": "",
            "attr": "type=\"text\"",
            "parent": "content-container"
        },
          {
              "id": "frog",
              "type": "button",
              "content": "no",
              "attr": "onclick=\"processStyle()\"",
              "parent": "content-container"
          },
          {
              "id": "dropdown",
              "type": "div",
              "content": "",
              "attr": "",
              "parent": "content-container"
          }
      ]
  },
  "welcomePage": {
      "onload": "",
      "content": [{
              "id": "greetingHead",
              "type": "h1",
              "content": "Welcome!",
              "attr": "",
              "parent": "content-container"
          },
          {
              "id": "greetingBody1",
              "type": "p",
              "content": "I see that this is your first time here... or you have cleared your localstorage",
              "attr": "",
              "parent": "content-container"
          },
          {
              "id": "greetingButton",
              "type": "button",
              "content": "ok!",
              "attr": "onclick=\"page('next')\"",
              "parent": "content-container"
          }
      ]
  },
  "selectorPage": {
      "onload": "",
      "content": [
        {
            "id": "selecton-grid",
            "type": "div",
            "content": "",
            "attr": "class=\'selection-grid\'",
            "parent": "content-container"
         },
        {
          "id": "addButton",
          "type": "button",
          "content": "add item",
          "attr": "",
          "parent": "content-container"
      }
    ]
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
  ]
}