"use strict";

var Player = {
    Init: function(obj)
            {
                Player.GenPlayer(obj.mesh);
            },

    GenPlayer: function(mesh)
                {
                    Main.player = mesh;
                    Main.player.scaling = new BABYLON.Vector3(2, 2, 2);
                   // Main.player = BABYLON.Mesh.CreateBox("player", 2, Main.scene);
                    //Main.player = BABYLON.Mesh.
                    Main.player.position.y = 3.0;
                    Main.player.position.x = 15.0;
                    Main.player.position.z = 10.0;
                    Main.player.rotation.y = -(Math.PI/1.5);
                    Main.player.material = new BABYLON.StandardMaterial("player", Main.scene);
                    Main.player.material.diffuseTexture = new BABYLON.Texture("public/img/box0.png", Main.scene);
                }
};