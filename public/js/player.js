"use strict";

var Player = {
    Init: function()
            {
                Player.GenPlayer();
            },

    GenPlayer: function()
                {
                    Main.player = BABYLON.Mesh.CreateBox("player", 2, Main.scene);
                    Main.player.position.y = 1.0;
                    Main.player.position.x = 15.0;
                    Main.player.position.z = 10.0;
                    Main.player.material = new BABYLON.StandardMaterial("player", Main.scene);
                    Main.player.material.diffuseTexture = new BABYLON.Texture("public/img/box0.png", Main.scene);
                }
};