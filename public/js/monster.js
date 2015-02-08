"use strict";

var Monster = {
    Init: function(obj)
            {
                Monster.GenMonster(obj.mesh);
                Monster.Life.Init();
                Monster.Label.Init();

            },

    GenMonster: function(mesh)
                {
                    //Main.monster.model.body = BABYLON.Mesh.CreateBox("monster", 10, Main.scene);
                    Main.monster.model.body = mesh;
                    //Main.monster.model.body.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
                    //Main.monster.model.body.material = new BABYLON.StandardMaterial("cheques", Main.scene);
                    Main.monster.model.body.position.y = 5.0;
                    Main.monster.model.body.position.x = -15.0;
                    Main.monster.model.body.position.z = 4.0;
                    //Main.monster.model.body.rotation.y = -0.90;
                    //Main.monster.model.body.material = new BABYLON.StandardMaterial("monster", Main.scene);
                    Main.monster.model.body.material.diffuseTexture = new BABYLON.Texture("public/img/"+Main.monster.data.name+".png", Main.scene);
                },
    Life:{
        Init: function()
                {
                    Main.monster.model.lifebar = BABYLON.Mesh.CreateBox("monsterlife", 2, Main.scene);
                    Main.monster.model.lifebar.scaling = new BABYLON.Vector3(Main.monster.data.hp, 1.8, 0.2);
                    Main.monster.model.lifebar.parent = Main.monster.model.body;
                    Main.monster.model.lifebar.position.y = 35.0;
                    Main.monster.model.lifebar.position.z = -2.0;
                    Main.monster.model.lifebar.rotation.y = -1.5;
                    Main.monster.model.lifebar.material = new BABYLON.StandardMaterial("texture1", Main.scene);
                    Main.monster.model.lifebar.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
                },
        Update: function(dom)
                {
                    if(Main.endMatch == 0 && Main.monster.data.hp > 0)
                    {
                        if (((Math.floor(Math.random() * 100) + 0)/100) > Main.monster.data.dodge)
                        {
                            Main.monster.data.hp = Main.monster.data.hp - (dom*(1-Main.monster.data.resistance));
                            // *5 car taille de base de la barre à voir avec des variables
                            Main.monster.model.lifebar.scaling = new BABYLON.Vector3(Main.monster.data.hp, 1.8, 0.2);
                            Main.monster.model.lifebar.material.diffuseColor = Main.monster.data.hp >= 0.5 ? new BABYLON.Color3(0, 1, 0) : Main.monster.data.hp >= 0.3 ? new BABYLON.Color3(0.9, 0.4, 0) : new BABYLON.Color3(1, 0, 0);
                        }
                        else
                        {
                            Monster.Label.Write(Main.monster.data.name+" a esquivé votre attaque!!");
                        }
                    }
                    else
                    {
                        Main.monster.model.body.dispose();
                        Monster.Label.Write("Vous remportez la victoire");
                        Monster.Life.Dead();
                        setTimeout(function()
                                    {

                                        //window.location="index.html?del="+Main.monster.data.id+"&items="+Main.qtyIni;//;
                                    }, 5000);
                    }
                },

        Dead: function()
                {
            if (Main.endMatch == 0 && Main.monster.data.hp <= 0)
                    {

                        var pos = Main.monster.model.body.position;
                        Main.monster.model.body.dispose();
                        //var dead = BABYLON.Mesh.CreateBox("dead", 10, Main.scene);
                        Main.cross.isVisible = true;
                        Main.cross.material = new BABYLON.StandardMaterial("dead", Main.scene);
                        Main.cross.material.diffuseTexture = new BABYLON.Texture("public/img/CelticCross.png", Main.scene);
                        Main.cross.scaling = new BABYLON.Vector3(2, 2, 2);
                        Main.cross.position = pos;
                        Main.cross.position.y += 5;
                        Main.cross.rotation.y += 0.7;
                        Main.cross.checkCollisions = true;
                        //Main.cross.rotation.z = -Math.PI/4;
                        Main.cross.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 1 });
                        Main.endMatch = 1;
                    }

                }
    },
    Label:{
        Init: function()
                {
                    Main.monster.label.Plan = BABYLON.Mesh.CreatePlane("label", 80, Main.scene, false);
                    Main.monster.label.Plan.material = new BABYLON.StandardMaterial("background", Main.scene);
                    Main.monster.label.Plan.scaling.z = 0.3;
                    Main.monster.label.Plan.scaling.x = 0.8;
                    Main.monster.label.Plan.scaling.y = 0.4;
                    Main.monster.label.Plan.position.z = -60;
                    Main.monster.label.Plan.position.y = 20;
                    Main.monster.label.Plan.position.x = -65;
                    Main.monster.label.Plan.rotation.y = -2.3;
                    Main.monster.label.Texture = new BABYLON.DynamicTexture("dynamic texture", 600, Main.scene, true);
                    Main.monster.label.Plan.material.diffuseTexture = Main.monster.label.Texture;
                    Main.monster.label.Plan.material.specularColor = new BABYLON.Color3(0, 0, 0);
                    Main.monster.label.Plan.material.backFaceCulling = false;
                },

        Write: function(txt)
                {
                    Main.monster.label.Texture.drawText(txt, null, 80, "bold 40px Segoe UI", "white", "black");
                }
    },
    Animation: {
        Anim0: function(func)
                {
                    var animationBox0 = new BABYLON.Animation("anim0", "position.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                    var animationBox1 = new BABYLON.Animation("anim1", "rotation.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                    var animationBox2 = new BABYLON.Animation("anim2", "position.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

                    var posX = Main.monster.model.body.position.x;

                    var keys0 = [];
                    keys0.push({
                        frame: 0,
                        value: posX
                    });
                    keys0.push({
                        frame: 100,
                        value: Main.monster.model.body.position.x + 25
                    });
                    animationBox0.setKeys(keys0);
                    Main.monster.model.body.animations.push(animationBox0);

                    //Main.scene.beginAnimation(Main.player.model.body, 0, 100, true);
                    var keys1 = [];
                    keys1.push({
                        frame: 0,
                        value: 0
                    });
                    keys1.push({
                        frame: 20,
                        value: Math.PI/4
                    });
                    keys1.push({
                        frame: 100,
                        value: 0
                    });
                    animationBox1.setKeys(keys1);
                    Main.monster.model.body.animations.push(animationBox1);

                    var keys2 = [];
                    keys2.push({
                        frame: 0,
                        value: Main.monster.model.body.position.x
                    });
                    keys2.push({
                        frame: 100,
                        value: posX
                    });
                    animationBox2.setKeys(keys2);
                    Main.monster.model.body.animations.push(animationBox2);

                    Main.scene.beginDirectAnimation(Main.monster.model.body, [animationBox0], 0, 100, false, 1, function()
                                                                                                                {
                                                                                                                    Main.scene.beginDirectAnimation(Main.monster.model.body, [animationBox1], 0, 100, false, 1, function()
                                                                                                                                                                        {
                                                                                                                                                                            Main.scene.beginDirectAnimation(Main.monster.model.body, [animationBox2], 0, 100, false, 1, function()
                                                                                                                                                                                                                                {

                                                                                                                                                                                                                                });
                                                                                                                                                                        });
                                                                                                                });
                    func()
                }
    }
};