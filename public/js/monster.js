"use strict";

var Monster = {
    Init: function()
            {
                Monster.GenMonster();
            },

    GenMonster: function()
                {
                    Main.monster = BABYLON.Mesh.CreateBox("monster", 2, Main.scene);
                    Main.monster.position.y = 1.0;
                    Main.monster.position.x = -15.0;
                    Main.monster.position.z = -10.0;
                    Main.monster.material = new BABYLON.StandardMaterial("monster", Main.scene);
                    Main.monster.material.diffuseTexture = new BABYLON.Texture("public/img/box0.png", Main.scene);
                }
};