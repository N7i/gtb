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
                    Main.monster.model.body.position.x = 11.0;
                    Main.monster.model.body.position.z = -4.0;
                    Main.monster.model.body.rotation.y = -0.90;
                    //Main.monster.model.body.material = new BABYLON.StandardMaterial("monster", Main.scene);
                    Main.monster.model.body.material.diffuseTexture = new BABYLON.Texture("public/img/"+Main.monster.data.name+".png", Main.scene);
                },
    Life:{
        Init: function()
                {
                    Main.monster.model.lifebar = BABYLON.Mesh.CreateBox("monsterlife", 2, Main.scene);
                    Main.monster.model.lifebar.scaling = new BABYLON.Vector3(1, 5, 1);
                    Main.monster.model.lifebar.parent = Main.monster.model.body;
                    Main.monster.model.lifebar.position.y = 35.0;
                    Main.monster.model.lifebar.position.z = -2.0;
                    Main.monster.model.lifebar.material = new BABYLON.StandardMaterial("texture1", Main.scene);
                    Main.monster.model.lifebar.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
                },
        Update: function(dom)
                {
                    if(Main.monster.data.hp > 0)
                    {
                        if (((Math.floor(Math.random() * 100) + 0)/100) > Main.monster.data.dodge)
                        {
                            Main.monster.data.hp = Main.monster.data.hp - (dom*(1-Main.monster.data.resistance));
                            // *5 car taille de base de la barre à voiravec des variables
                            //Main.monster.model.lifebar.scaling = new BABYLON.Vector3(Main.monster.data.hp*5, 2, 2);
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
    }
};