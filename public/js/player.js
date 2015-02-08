"use strict";

var Player = {
    Init: function(obj)
            {
                Player.GenPlayer(obj.mesh);
                Player.Life.Init();
            },

    GenPlayer: function(mesh)
                {
                    Main.player.model.body = mesh;
                    Main.player.model.body.scaling = new BABYLON.Vector3(3, 3, 3);
                   // Main.player = BABYLON.Mesh.CreateBox("player", 2, Main.scene);
                    //Main.player = BABYLON.Mesh.
                    Main.player.model.body.position.y = 3.0;
                    Main.player.model.body.position.x = 18.0;
                    Main.player.model.body.position.z = 6.0;
                    Main.player.model.body.rotation.y = -(Math.PI/1.65);
                    Main.player.model.body.material = new BABYLON.StandardMaterial("player", Main.scene);
                    Main.player.model.body.material.diffuseTexture = new BABYLON.Texture("public/img/spiderman.png", Main.scene);
                },

    Life: {
        Init: function()
                {
                    Main.player.model.lifebar = BABYLON.Mesh.CreateBox("playerlife", 2, Main.scene);
                    Main.player.model.lifebar.scaling = new BABYLON.Vector3(1, 0.1, 0.1);
                    Main.player.model.lifebar.parent = Main.player.model.body;
                    Main.player.model.lifebar.position.y = 2.5;
                    Main.player.model.lifebar.position.x = 2.0;
                    Main.player.model.lifebar.rotation.y = -2.5;
                    //.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
                    Main.player.model.lifebar.material = new BABYLON.StandardMaterial("texture1", Main.scene);
                    Main.player.model.lifebar.material.diffuseColor = new BABYLON.Color3(0, 1, 0);

                },
        Update: function(dom)
                {
                    if(Main.endMatch == 0 && Main.player.data.hp >= 0)
                    {
                        Main.player.data.hp = Main.player.data.hp-dom;
                        Main.player.model.lifebar.scaling = new BABYLON.Vector3(Main.player.data.hp, 0.1, 0.1);
                        Main.player.model.lifebar.material.diffuseColor = Main.player.data.hp >= 0.5 ? new BABYLON.Color3(0, 1, 0) : Main.player.data.hp >= 0.3 ? new BABYLON.Color3(0.9, 0.4, 0) : new BABYLON.Color3(1, 0, 0);
                    }
                    else
                    {
                        Monster.Label.Write("Vous êtes mort");
                        Player.Life.Dead();
                        setTimeout(function()
                                    {

                                        //window.location="index.html??del="+Main.monster.data.id+"&items="+Main.items.data;//;
                                    }, 5000);
                    }
                },

        Dead: function()
        {
                    if (Main.endMatch == 0 && Main.player.data.hp <= 0)
                    {
                        var pos = Main.player.model.body.position;
                        Main.player.model.body.dispose();
                        //var dead = BABYLON.Mesh.CreateBox("dead", 10, Main.scene);
                        Main.cross.isVisible = true;
                        Main.cross.material = new BABYLON.StandardMaterial("dead", Main.scene);
                        Main.cross.material.diffuseTexture = new BABYLON.Texture("public/img/CelticCross.png", Main.scene);
                        Main.cross.scaling = new BABYLON.Vector3(2, 2, 2);
                        Main.cross.position = pos;
                        Main.cross.position.y += 5;
                        Main.cross.checkCollisions = true;
                        Main.cross.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 1 });
                        Main.endMatch = 1;

                    }
                }
    },

    UserSkill: function(id)
                {
                    var skillId = id;
                    if(Main.action == 0 && Main.items.data[0].qty >= Main.skills.data[skillId].cost && Main.endMatch == 0)
                    {
                        Main.items.data[0].qty -= Main.skills.data[skillId].cost;
                        for(var i = 0; i < Main.skills.data[skillId].cost; i++)
                        {
                            /*Main.items.model[Main.items.model.length - 1].dispose();
                            Main.items.model.pop();*/
                        }
                        Monster.Life.Update(Main.skills.data[skillId].dmg);
                        Main.action = 1;
                        setTimeout(function()
                                    {
                                        if (Main.endMatch == 0)
                                        {
                                            Player.Life.Update(Main.skills.data[((Math.floor(Math.random() * (Main.monster.data.skills.length -1)) + 1)-1)].dmg);
                                            Main.action = 0;
                                        }
                                    }, 3000);
                    }
            },

    Animation: function()
                {
                    //var animationBox = new BABYLON.Animation("myAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                    var animationBox = new BABYLON.Animation("myAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, "");

                    // An array with all animation keys
                    var keys = [];

                   //At the animation key 0, the value of scaling is "1"
                    keys.push({
                        frame: 0,
                        value: 1
                    });

                    //At the animation key 20, the value of scaling is "0.2"
                    keys.push({
                        frame: 20,
                        value: 0.2
                    });

                    //At the animation key 100, the value of scaling is "1"
                    keys.push({
                        frame: 100,
                        value: 1
                    });
                    animationBox.setKeys(keys);
                    Main.player.model.body.animations.push(animationBox);
                    Main.scene.beginAnimation(Main.player.model.body, 0, 100, true);
                }
};