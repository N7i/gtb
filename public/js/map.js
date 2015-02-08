"use strict";

var Map = {
	 Init: function()
			{
				//Map.Camera.Free();
				Map.Camera.Fixe();
				//Map.Camera();
				Map.Light();
				Map.Ground();
			},

	 Camera: {
		 Free: function()
				{
					Main.camera = new BABYLON.FreeCamera("MainCamera", new BABYLON.Vector3(30, 30, 30), Main.scene);
					//new BABYLON.Camera("");
					//Main.camera.applyGravity = true;
					Main.camera.checkCollisions = true;

					Main.camera.speed = 0.5;
					Main.camera.angularSensibility = 250;

					Main.camera.keysUp = [90]; // Touche Z
					Main.camera.keysDown = [83]; // Touche S
					Main.camera.keysLeft = [81]; // Touche Q
					Main.camera.keysRight = [68]; // Touche D;
					Main.scene.activeCamera.attachControl(Main.canvas);
					Main.camera.setTarget(new BABYLON.Vector3(0, 0, 0));
				},

		 Fixe: function()
				{
					Main.camera = new BABYLON.FreeCamera("MainCamera", new BABYLON.Vector3(26.49, 10.89, 0.84), Main.scene);
					//new BABYLON.Camera("");
					//Main.camera.applyGravity = true;
					/*Main.camera.checkCollisions = true;

					Main.camera.speed = 0.5;
					Main.camera.angularSensibility = 250;

					Main.camera.keysUp = [90]; // Touche Z
					Main.camera.keysDown = [83]; // Touche S
					Main.camera.keysLeft = [81]; // Touche Q
					Main.camera.keysRight = [68]; // Touche D;
					Main.scene.activeCamera.attachControl(Main.canvas);*/
					//Main.scene.activeCamera.detachControl(Main.canvas)
					Main.camera.setTarget(new BABYLON.Vector3(25.52, 10.80, 1.06));
				}
	},

	 Light: function()
			{
				Main.light = new BABYLON.PointLight("DirLight", new BABYLON.Vector3(0, 10, 0), Main.scene);
				Main.light.diffuse = new BABYLON.Color3(1, 1, 1);
				//Main.light.specular = new BABYLON.Color3(0.6, 0.6, 0.6);
				Main.light.specular = new BABYLON.Color3(0, 0, 0);
				Main.light.intensity = 1.5;
                Main.light.position.z = -60;
			},

	 Ground: function()
				{
					Main.ground = BABYLON.Mesh.CreateGround("ground", 50, 50, 2, Main.scene);
					Main.ground.material = new BABYLON.StandardMaterial("gMaterial", Main.scene);
					//Main.ground.material.diffuseTexture = new BABYLON.Texture("public/img/ground1.png", Main.scene);
					Main.ground.checkCollisions = true;
					Main.ground.isVisible = false;
					Main.ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
				}

};