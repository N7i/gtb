"use strict";

var Player = {
    Init: function(obj)
            {
                Player.GenPlayer(obj.mesh);
                Player.Life.Init();
            },

    GenPlayer: function(mesh)
                {
                    Main.player = mesh;
                    Main.player.scaling = new BABYLON.Vector3(4, 4, 4);
                   // Main.player = BABYLON.Mesh.CreateBox("player", 2, Main.scene);
                    //Main.player = BABYLON.Mesh.
                    Main.player.position.y = 3.0;
                    Main.player.position.x = 15.0;
                    Main.player.position.z = 10.0;
                    Main.player.rotation.y = -(Math.PI/1.5);
                    Main.player.material = new BABYLON.StandardMaterial("player", Main.scene);
                    Main.player.material.diffuseTexture = new BABYLON.Texture("public/img/box0.png", Main.scene);
                },

    Life: {
        Init: function()
                {
                    Main.life.player = BABYLON.Mesh.CreateBox("playerlife", 2, Main.scene);
                    Main.life.player.scaling = new BABYLON.Vector3(1, 0.2, 0.2);
                    Main.life.player.parent = Main.player;
                    Main.life.player.position.y = 3.0;
                },
        Update: function(dom)
                {
                    Main.player.hp = 1-(dom/100);
                    Main.life.player.scaling = new BABYLON.Vector3(Main.player.hp, 0.2, 0.2);
                    console.log(Main.player.hp);
                }
    }
};