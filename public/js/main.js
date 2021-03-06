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
			"lifebar":{},
            "timebar":{}
		},
		"data":{},
		"action":{}
	},
	monster: {
		"model":{
			"body": {},
			"lifebar":{}
		},
		"data":{},
		"label":{
			"Plan":{},
			"Texture":{}
		}
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
	endMatch:0,
	cross:{},
	cross2:{},
	qtyIni:0,


	Init: function ()
			{
				Main.xhr = Main.Xhttpr();
				Main.player.data = Main.GetMyJson("player");
				Main.monster.data = Main.GetMonsterJSON();
				Main.skills.data = Main.GetMyJson("skills");
				Main.items.data = Main.	GetSuppliesJSON();
				Main.qtyIni = Main.items.data.qty;
				Main.engine = new BABYLON.Engine(Main.canvas, true);
				Main.scene = new BABYLON.Scene(Main.engine);
				Main.scene.enablePhysics(null, new BABYLON.OimoJSPlugin());
				Main.scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
				Map.Init();

				Main.engine.runRenderLoop(function()
											{
												Main.scene.render();
												Main.light.position = Main.camera.position;
												Main.DrawSupplies();
											});

				BABYLON.SceneLoader.ImportMesh("", "public/mesh/", Main.monster.data.name+".babylon", Main.scene, function(meshes)
																									{
																										Monster.Init({"mesh":meshes[0]});

																									});

				BABYLON.SceneLoader.ImportMesh("", "public/mesh/", "perso.babylon", Main.scene, function(meshes)
																									{
																										Player.Init({"mesh":Main.scene.getMeshByName("perso")});
																										//Gui.Init();

																									});

				BABYLON.SceneLoader.ImportMesh("", "public/mesh/", "CelticCross.babylon", Main.scene, function(meshes)
																									{
																										Main.cross = meshes[0];
																										Main.cross.isVisible = false;
																									});


				BABYLON.SceneLoader.Append("public/mesh/", "scene.babylon", Main.scene, function(scn)
																						{
																							Main.engine.hideLoadingUI();
                                                                                            Monster.Label.Init();
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
													if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[0].cost && Main.endMatch == 0)
													{
                                                        Player.Animation.Anim0(function()
                                                                                {
                                                                                    Monster.Life.Update(Main.skills.data[0].dmg);
                                                                                    Main.action = 1;
                                                                                    setTimeout(function()
                                                                                                {
                                                                                                    Monster.Animation.Anim0(function()
                                                                                                                            {
                                                                                                                                Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
                                                                                                                                Main.action = 0;
                                                                                                                            });
                                                                                                }, 5000);
                                                                                });

													}
													/*
													if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[0].cost)
													{
														Main.items.data[0].qty -= Main.skills.data[0].cost;
														for(var i = 0; i < Main.skills.data[0].cost; i++)
														{
															/*Main.items.model[Main.items.model.length - 1].dispose();
															Main.items.model.pop();*/
														/*}
														Monster.Life.Update(Main.skills.data[0].dmg);
														Main.action = 1;
														setTimeout(function()
																	{
																		Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
																		Main.action = 0;
																	}, 3000);*/
													//}
												});

				Main.AddEvent(document.getElementById("skill2"), "click", function()
												{
													//Player.Animation();
													if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[1].cost && Main.endMatch == 0)
													{
                                                        Player.Animation.Anim0(function()
                                                                                {
                                                                                    Main.UpdatePlayerEnergy(Main.skills.data[1].cost);
                                                                                    Monster.Life.Update(Main.skills.data[1].dmg);
                                                                                    Main.action = 1;
                                                                                    setTimeout(function()
                                                                                                {
                                                                                                    Monster.Animation.Anim0(function()
                                                                                                                            {
                                                                                                                                Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
                                                                                                                                Main.action = 0;
                                                                                                                            });
                                                                                                }, 5000);
                                                                                });

													}
													/*if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[1].cost)
													{
														Main.items.data[0].qty -= Main.skills.data[1].cost;
														for(var i = 0; i < Main.skills.data[1].cost; i++)
														{*/
															/*Main.items.model[Main.items.model.length - 1].dispose();
															Main.items.model.pop();*/
														/*}
														Monster.Life.Update(Main.skills.data[1].dmg);
														Main.action = 1;
														setTimeout(function()
																	{
																		Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
																		Main.action = 0;
																	}, 3000);*/
													//}
												});

				Main.AddEvent(document.getElementById("skill3"), "click", function()
												{
													//Player.Animation();
													if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[2].cost && Main.endMatch == 0)
													{
                                                        Player.Animation.Anim0(function()
                                                                                {
                                                                                    Main.UpdatePlayerEnergy(Main.skills.data[2].cost);
                                                                                    Monster.Life.Update(Main.skills.data[2].dmg);
                                                                                    Main.action = 1;
                                                                                    setTimeout(function()
                                                                                                {
                                                                                                    Monster.Animation.Anim0(function()
                                                                                                                            {
                                                                                                                                Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
                                                                                                                                Main.action = 0;
                                                                                                                            });

                                                                                                }, 5000);
                                                                                });

													}
													/*
													if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[2].cost)
													{
														Main.items.data[0].qty -= Main.skills.data[2].cost;
														for(var i = 0; i < Main.skills.data[2].cost; i++)
														{
															/*Main.items.model[Main.items.model.length - 1].dispose();
															Main.items.model.pop();*/
														/*}
														Monster.Life.Update(Main.skills.data[2].dmg);
														Main.action = 1;
														setTimeout(function()
																	{
																		Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
																		Main.action = 0;
																	}, 3000);
													}*/
												});

				Main.AddEvent(document.getElementById("skill4"), "click", function()
												{
													//Player.Animation();
													if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[3].cost && Main.endMatch == 0)
													{
                                                        Player.Animation.Anim0(function()
                                                                                {
                                                                                    Main.UpdatePlayerEnergy(Main.skills.data[3].cost);
                                                                                    Monster.Life.Update(Main.skills.data[3].dmg);
                                                                                    Main.action = 1;
                                                                                    setTimeout(function()
                                                                                                {
                                                                                                    Monster.Animation.Anim0(function()
                                                                                                                            {
                                                                                                                                Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
                                                                                                                                Main.action = 0;
                                                                                                                            });

                                                                                                }, 5000);
                                                                                });

													}
												});
													/*
													if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[3].cost)
													{
														Main.items.data[0].qty -= Main.skills.data[3].cost;
														for(var i = 0; i < Main.skills.data[3].cost; i++)
														{
															/*Main.items.model[Main.items.model.length - 1].dispose();
															Main.items.model.pop();*/
														/*}
														Monster.Life.Update(Main.skills.data[3].dmg);
														Main.action = 1;
														setTimeout(function()
																	{
																		Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
																		Main.action = 0;
																	}, 3000);
													}*/
												//});

				Main.AddEvent(document.getElementById("mg0"), "click", function()
												{
														Main.action == 0 ? Main.action = 1 : Main.action = 0;
												});

				/*Main.AddEvent(document.getElementById("camera"), "click", function()
												{
														Main.action == 0 ? Main.action = 1 : Main.action = 0;
												});*/

				window.setInterval((function()
									{
                                        var counter = 0;
                                        var lastAction = 0;
                                        return function() {
                                            if (Main.action != lastAction){
                                                counter = 0;
                                                return;
                                            }



                                            if (Main.action == 1) {
                                                if (counter === 10) {
                                                   Main.action = 0;
                                                    counter = 0;
                                                }
                                                else {
                                                    Player.Timer.Update(counter);
                                                }
                                            }
                                            else if (Main.action == 0) {
                                                if (counter === 10) {
                                                    Monster.Animation.Anim0(function() {
                                                        Player.Life.Update(0.1);
                                                        counter= 0;
                                                    });

                                                }
                                                else {
                                                    Player.Timer.Update(counter);
                                                }
                                            }

                                            counter++;
                                        };
									})(), 1000);

                /*window.setInterval(function()
									{


									}, 10000);*/
			},

	GetMyJson : function(name)
	{
			Main.xhr.open("GET", 'data/' + name + '.json', false);
			Main.xhr.send(null);
			return JSON.parse(Main.xhr.responseText);
	},

	GetMonsterJSON: function() {
		try {
			var data = JSON.parse(decodeURIComponent(location.search.substr(6)));
			return data.monster;
		}
		catch(e)
		{
			console.log('PATSER FAILed');
			Main.xhr.open("GET", 'data/monsters.json', false);
			Main.xhr.send(null);
			return JSON.parse(Main.xhr.responseText);
		}
	},

	UpdatePlayerEnergy: function(cost) {
		Main.items.data[0].qty -= cost;
		var qty = Main.items.data[0].qty;

		if (qty < 4) {
			$('#skill4').addClass('disabled');
		}

		if (qty < 2) {
			$('#skill3').addClass('disabled');
		}

		if (qty < 1) {
			$('#skill2').addClass('disabled');
		}
	   
	},
	
	GetSuppliesJSON : function() {
		try {
			var data = JSON.parse(decodeURIComponent(location.search.substr(6)));
			return data.items;
		}
		catch (e) {
			console.log('PATSER FAILed');
			Main.xhr.open("GET", 'data/items.json', false);
			Main.xhr.send(null);
			return JSON.parse(Main.xhr.responseText);
		}
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
	},

	DrawSupplies: new function () {
		var lastSuppliesCounts = 0;

		return function () {

			if (Main.items.data[0].qty + Main.items.data[1].qty != lastSuppliesCounts) {
				lastSuppliesCounts = Main.items.data[0].qty + Main.items.data[1].qty;

				$('.supplies-container').empty();
				$.each(Main.items.data, function (index, supplie) {

					for (var i = 0; i < supplie.qty; i++) {
						$('.supplies-container').append('<div class="supplie supplie-' + supplie.name + '"></div>');
					}
				});
			}
		}
		
	}
};

Main.AddEvent(window, "load", Main.Init);