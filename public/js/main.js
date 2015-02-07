"use strict";

var Main = {
	engine: {},
	scene: {},
    light: {},
    ground: {},
    camera: {},
    player: {},
    monster: {},
    life: {"player":{},"monster":{}},
    xhr: {},
    canvas: document.getElementById("renderCanvas"),
    json: {}, // récupére des objets json

    Init: function ()
            {
                Main.xhr = Main.Xhttpr();
                Main.engine = new BABYLON.Engine(Main.canvas, true);
                Main.scene = new BABYLON.Scene(Main.engine);
                Main.scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
                Map.Init();
                Main.engine.runRenderLoop(function()
                                            {
                                                Main.scene.render();
                                                Main.light.position = Main.camera.position;
                                            });
                BABYLON.SceneLoader.ImportMesh("", "public/mesh/", "perso.babylon", Main.scene, function(meshes)
                                                                                                    {
                                                                                                        Player.Init({"mesh":Main.scene.getMeshByName("perso")});
                                                                                                        Monster.Init();
                                                                                                    });
                Main.AddEvent(window, "resize", function()
                                                {
                                                    Main.engine.resize();
                                                });

                Main.AddEvent(document.getElementById("skill0"), "click", function()
                                                {
                                                    Player.Life.Update(10);
                                                    console.log("toot");
                                                    //document.getElementById("renderCanvas");
                                                });
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

Main.AddEvent(window, "load", Main.Init);