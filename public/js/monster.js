"use strict";

var Monster = {
    Init: function()
            {
                Monster.GenMonster();
                Monster.Life.Init();
                //Monster.Label.Init();
            },

    GenMonster: function()
                {
                    Main.monster.model.body = BABYLON.Mesh.CreateBox("monster", 10, Main.scene);
                    Main.monster.model.body.position.y = 5.0;
                    Main.monster.model.body.position.x = -15.0;
                    Main.monster.model.body.position.z = -10.0;
                    Main.monster.model.body.rotation.y = -(Math.PI/1.5);
                    Main.monster.model.body.material = new BABYLON.StandardMaterial("monster", Main.scene);
                    Main.monster.model.body.material.diffuseTexture = new BABYLON.Texture("public/img/box0.png", Main.scene);
                },
    Life:{
        Init: function()
                {
                    Main.monster.model.lifebar = BABYLON.Mesh.CreateBox("monsterlife", 2, Main.scene);
                    Main.monster.model.lifebar.scaling = new BABYLON.Vector3(5, 2, 2);
                    Main.monster.model.lifebar.parent = Main.monster.model.body;
                    Main.monster.model.lifebar.position.y = 6.0;
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
                            Main.monster.model.lifebar.scaling = new BABYLON.Vector3(Main.monster.data.hp*5, 2, 2);
                            Main.monster.model.lifebar.material.diffuseColor = Main.monster.data.hp >= 0.5 ? new BABYLON.Color3(0, 1, 0) : Main.monster.data.hp >= 0.3 ? new BABYLON.Color3(0.9, 0.4, 0) : new BABYLON.Color3(1, 0, 0);
                        }
                        else
                        {
                            console.log("dodge");
                        }
                    }
                    else
                    {
                        Main.monster.model.body.dispose();
                        
                    }
                }
    }
        //,
    /*Label:{
        Init: function()
                {
                    Main.label.monster = BABYLON.Mesh.CreateGround("monsterlabel", 2, 2, 2, Main.scene);
                        //CreatePlane("monsterlabel", 2, Main.scene);
                    Main.label.monster.scaling = new BABYLON.Vector3(5, 2, 2);
                    Main.label.monster.parent = Main.life.monster;
                    Main.label.monster.position.y = 4.0;
                    Main.label.monster.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;

                }*/
    //}
};