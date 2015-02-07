"use strict";

var Main = {
	engine: {},
	scene: {},
    light: {},
    ground: {},
    camera: {},
    player: {
        "model":{
            "body": {},
            "lifebar":{}
        },
        "data":{},
        "action":{}
    },
    monster: {
        "model":{
            "body": {},
            "lifebar":{}
        },
        "data":{}
    },
    skills: {
        "model":[],
        "data":[]
    },
    items: {
      "model":[],
      "data":[]
    },
    action:0,
    xhr: {},
    canvas: document.getElementById("renderCanvas"),
    json: {}, // récupére des objets json

    Init: function ()
            {
                Main.xhr = Main.Xhttpr();
                Main.player.data = Main.GetMyJson("player");
                Main.monster.data = Main.GetMyJson("monsters");
                Main.skills.data = Main.GetMyJson("skills");
                Main.items.data = Main.GetMyJson("items");
                Main.engine = new BABYLON.Engine(Main.canvas, true);
                Main.scene = new BABYLON.Scene(Main.engine);
                Main.scene.enablePhysics(null, new BABYLON.OimoJSPlugin());
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
                                                                                                        Gui.Init();

                                                                                                    });





                Main.AddEvent(window, "resize", function()
                                                {
                                                    Main.engine.resize();
                                                });

                Main.AddEvent(document.getElementById("skill0"), "click", function()
                                                {
                                                    Player.Life.Update(0.1);
                                                    //document.getElementById("renderCanvas");
                                                });

                Main.AddEvent(document.getElementById("skill1"), "click", function()
                                                {
                                                    //Player.Animation();
                                                    if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[0].cost)
                                                    {
                                                        Main.items.data[0].qty -= Main.skills.data[0].cost;
                                                        for(var i = 0; i < Main.skills.data[0].cost; i++)
                                                        {
                                                            Main.items.model[Main.items.model.length - 1].dispose();
                                                            Main.items.model.pop();
                                                        }
                                                        Monster.Life.Update(Main.skills.data[0].dmg);
                                                        Main.action = 1;
                                                        setTimeout(function()
                                                                    {
                                                                        Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
                                                                        Main.action = 0;
                                                                    }, 3000);
                                                    }
                                                });

                Main.AddEvent(document.getElementById("skill2"), "click", function()
                                                {
                                                    //Player.Animation();
                                                    if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[1].cost)
                                                    {
                                                        Main.items.data[0].qty -= Main.skills.data[1].cost;
                                                        for(var i = 0; i < Main.skills.data[1].cost; i++)
                                                        {
                                                            Main.items.model[Main.items.model.length - 1].dispose();
                                                            Main.items.model.pop();
                                                        }
                                                        Monster.Life.Update(Main.skills.data[1].dmg);
                                                        Main.action = 1;
                                                        setTimeout(function()
                                                                    {
                                                                        Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
                                                                        Main.action = 0;
                                                                    }, 3000);
                                                    }
                                                });

                Main.AddEvent(document.getElementById("skill3"), "click", function()
                                                {
                                                    //Player.Animation();
                                                    if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[2].cost)
                                                    {
                                                        Main.items.data[0].qty -= Main.skills.data[2].cost;
                                                        for(var i = 0; i < Main.skills.data[2].cost; i++)
                                                        {
                                                            Main.items.model[Main.items.model.length - 1].dispose();
                                                            Main.items.model.pop();
                                                        }
                                                        Monster.Life.Update(Main.skills.data[2].dmg);
                                                        Main.action = 1;
                                                        setTimeout(function()
                                                                    {
                                                                        Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
                                                                        Main.action = 0;
                                                                    }, 3000);
                                                    }
                                                });

                Main.AddEvent(document.getElementById("skill4"), "click", function()
                                                {
                                                    //Player.Animation();
                                                    if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[3].cost)
                                                    {
                                                        Main.items.data[0].qty -= Main.skills.data[3].cost;
                                                        for(var i = 0; i < Main.skills.data[3].cost; i++)
                                                        {
                                                            Main.items.model[Main.items.model.length - 1].dispose();
                                                            Main.items.model.pop();
                                                        }
                                                        Monster.Life.Update(Main.skills.data[3].dmg);
                                                        Main.action = 1;
                                                        setTimeout(function()
                                                                    {
                                                                        Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
                                                                        Main.action = 0;
                                                                    }, 3000);
                                                    }
                                                });

                Main.AddEvent(document.getElementById("mg0"), "click", function()
                                                {
                                                        Main.action == 0 ? Main.action = 1 : Main.action = 0;
                                                });

                window.setInterval(function()
                                    {
                                        if (Main.action != 1)
                                        {
                                            Player.Life.Update(0.1);
                                        }
                                    }, 10000);
            },

    GetMyJson : function(name)
                {
                    Main.xhr.open("GET", 'data/'+name+'.json', false);
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