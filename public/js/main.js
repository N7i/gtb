"use strict";

var Main = {
    xhr: {},
    target: document.getElementById("renderCanvas"),
    json: {}, // récupére des objets json
    menu: {}, // objet json menu

    Init: function ()
            {
                Main.xhr = Main.Xhttpr();
            },

    GetMyJson : function(dir, tar)
                {
                    Main.xhr.open("GET", 'data/'+dir+'/'+tar+'.json', false);
                    Main.xhr.send(null);
                    return JSON.parse(Main.xhr.responseText);
                },

    Xhttpr :  function()
                {
                    var xhr = null;
                    if (window.XMLHttpRequest || window.ActiveXObject)
                    {
                        if (window.ActiveXObject)
                        {
                            try
                            {
                                xhr = new ActiveXObject("Msxml2.XMLHTTP");
                            }
                            catch(e)
                            {
                                xhr = new ActiveXObject("Microsoft.XMLHTTP");
                            }
                        }
                        else
                            xhr = new XMLHttpRequest();
                    }
                    else
                    {
                        alert("Votre navigateur ne supporte pas l\'objet XMLHTTPRequest...");
                        return null;
                    }
                    return xhr;
                },

    AddEvent: function (element, event, func)
                {
                    if (element.attachEvent)
                        element.attachEvent("on" + event, func);
                    else
                        element.addEventListener(event, func, true);
                }
};

Main.AddEvent(window, "load", Main.Init());