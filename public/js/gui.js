"use strict";

var Gui = {
    Init: function()
            {
                Gui.Skill.Display.Skills();
                Gui.Skill.Display.Energy();
            },



    Skill: {
        Display: {
            Skills: function()
                    {
                        for(var i = 0; i < Main.player.data.skills.length; i++)
                        {
                            Main.skills.model[Main.player.data.skills[i]] = BABYLON.Mesh.CreateSphere("sphere", 16, 0.2, Main.scene);
                            Main.skills.model[Main.player.data.skills[i]].material = new BABYLON.StandardMaterial("player", Main.scene);
                            Main.skills.model[Main.player.data.skills[i]].material.diffuseTexture = new BABYLON.Texture("public/img/skill"+i+".png", Main.scene);
                            Main.skills.model[Main.player.data.skills[i]].parent = Main.camera;
                            Main.skills.model[Main.player.data.skills[i]].position.z = 2.0;
                            Main.skills.model[Main.player.data.skills[i]].position.x = -2 + (i/3);
                            Main.skills.model[Main.player.data.skills[i]].position.y = -0.7;
                            Main.skills.model[Main.player.data.skills[i]].actionManager = new BABYLON.ActionManager(Main.scene);
                            //Main.skills.model[Main.player.data.skills[i]].actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, Player.UserSkill(Main.player.data.skills[i])));
                        }
                    },

            Energy: function()
                    {
                        for(var i = 0; i < Main.items.data[0].qty; i++)
                        {
                            Main.items.model[i] = BABYLON.Mesh.CreateSphere("senergy", 16, 0.1, Main.scene);
                            Main.items.model[i].material = new BABYLON.StandardMaterial("energy", Main.scene);
                            Main.items.model[i].material.diffuseTexture = new BABYLON.Texture("public/img/energy.png", Main.scene);
                            Main.items.model[i].parent = Main.camera;
                            Main.items.model[i].position.z = 2.0;
                            //Main.items.model[i].position.x = 2 + (i/6);
                            Main.items.model[i].position.x = (i < Main.items.data[0].qty/2) ? 2 + (i/6)  : (2 + ((i-Main.items.data[0].qty/2)/6));
                            Main.items.model[i].position.y = (i < Main.items.data[0].qty/2) ? -0.5 : -0.6;
                            Main.items.model[i].actionManager = new BABYLON.ActionManager(Main.scene);
                        }
                    }
        }
    }
};