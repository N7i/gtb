"use strict";

var Gui = {
    Init: function()
            {
                Gui.Skill.Display();
            },



    Skill: {
        Display: function()
                    {
                        for(var i = 0; i < Main.skills.data.length; i++)
                        {
                            Main.skills.model[i] = BABYLON.Mesh.CreateSphere("sphere", 16, 0.2, Main.scene);
                            //Main.skills.model[i].position = new BABYLON.Vector3(1, 5, 0);
                            Main.skills.model[i].material = new BABYLON.StandardMaterial("player", Main.scene);
                            Main.skills.model[i].material.diffuseTexture = new BABYLON.Texture("public/img/skill"+i+".png", Main.scene);
                            Main.skills.model[i].parent = Main.camera;
                            //Main.skills.model[i].position.z = 2.0 + (i/2);
                            Main.skills.model[i].position.z = 2.0;
                            Main.skills.model[i].position.x = -2 + (i/3);
                            Main.skills.model[i].position.y = -0.7;
                        }
                    }
    }
};