﻿"use strict";

var Main = {
    engine: {},
    scene: {},
    light: {},
    ground: {},
    camera: {},
    xhr: {},
    canvas: {},
    json: {}, // récupére des objets json
    menu: {}, // objet json menu
    player: {},
    skills: {},
    items: {},
    monsters: {},
    listeMonsters: {},

    Init: function () {
        Main.xhr = Main.Xhttpr();
        Main.player.data = Main.GetMyJson("player");
        Main.skills.data = Main.GetMyJson("skills");
        Main.items.data = Main.GetMyJson("items");
        Main.monsters.data = Main.GetMyJson("monsters");
        Main.listeMonsters.data = Main.GetMyJson("listeMonsters");
        Main.canvas = document.getElementById("firstCanvas");

        Main.engine = new BABYLON.Engine(Main.canvas, true);
        Main.scene = new BABYLON.Scene(Main.engine);

        Main.camera = new BABYLON.FreeCamera("MainCamera", new BABYLON.Vector3(0, 0, -3), Main.scene);
        Main.camera.checkCollisions = true;
        //Main.scene.activeCamera.attachControl(Main.canvas);
        Main.camera.setTarget(new BABYLON.Vector3.Zero());

        Main.engine.runRenderLoop(function () {
            Main.scene.render();
            Main.light.position = Main.camera.position;
        });
        BABYLON.SceneLoader.ImportMesh("", "public/mesh/", "perso.babylon", Main.scene, function (meshes) {
            var mesh = Main.scene.getMeshByName("perso");
            mesh.position.y -= 3;
            Main.CreateAnimation(mesh);
        });
        
        Main.SetPlayerInfo(Main.player, Main.items, Main.skills);
        Main.SetShop(Main.items);
    },

    CreateAnimation: function (mesh) {
        var time = 0;
        Main.scene.registerBeforeRender(function () {
            time += 0.03;
            mesh.rotation.y = time;
        });
    },

    SetPlayerInfo: function (player, items, skills) {
        document.getElementById("playerInfo_name").innerHTML = "Name: " + player.data.name;
        document.getElementById("playerInfo_dr").innerHTML = "Damage Resistance: " + 0;
        /*
        var itemsHtmlString = "";
        itemsHtmlString = "Items: <ul>";
        for(var i = 0; i < player.data.items.length; i++) {
            itemsHtmlString += "<li>" + items.data[player.data.items[i]].qty + " " + items.data[player.data.items[i]].name + "</li>";
        }
        itemsHtmlString += "</ul>";
        document.getElementById("playerInfo_items").innerHTML = itemsHtmlString;
        */

        var skillsHtmlString = "";
        skillsHtmlString = "Skills: <ul>";
        for(var i = 0; i < player.data.skills.length; i++) {
            skillsHtmlString += "<li>" + skills.data[player.data.skills[i]].name + ": " + skills.data[player.data.skills[i]].dmg + " damages for " + skills.data[player.data.skills[i]].cost + "  energy points" + "</li>";
        }
        skillsHtmlString += "</ul>";
        document.getElementById("playerInfo_skills").innerHTML = skillsHtmlString;
    },

    SetShop: function (items) {
        var shopBox = document.getElementById("shopBox");
        shopBox.innerHTML = "Shop";
        for (var i = 0; i < items.data.length; i++) {
            shopBox.innerHTML += "<div id=\"item" + i + "\">";
            shopBox.innerHTML += "<div> <img src=\"public/img/" + items.data[i].name + ".png\"/> </div>";
            shopBox.innerHTML += "<div> <a href=\"#\" onclick=\"Main.AddItem(" + i + ");\">" + items.data[i].name + "</a></div>";
            shopBox.innerHTML += "<div> 0.50€ </div>";
            shopBox.innerHTML += "<div id=\"item" + i + "_qty\">" + items.data[i].qty + "</div>";
            shopBox.innerHTML += "</div>";
        }
    },

    AddItem: function (itemIndex) {
        Main.items.data[itemIndex].qty += 1;
        document.getElementById("item" + itemIndex + "_qty").innerHTML = Main.items.data[itemIndex].qty;
    },

    SelectMonster: function (monsterIndex) {
        Main.monsters.data[0].name = Main.listeMonsters.data[monsterIndex].name;
        Main.monsters.data[0].hp = Main.listeMonsters.data[monsterIndex].hp;
        Main.monsters.data[0].resistance = Main.listeMonsters.data[monsterIndex].resistance;
        Main.monsters.data[0].dodge = Main.listeMonsters.data[monsterIndex].dodge;
        Main.monsters.data[0].skills = Main.listeMonsters.data[monsterIndex].skills;
    },

    GetMyJson: function (name) {
        Main.xhr.open("GET", 'data/' + name + '.json', false);
        Main.xhr.send(null);
        return JSON.parse(Main.xhr.responseText);
    },

    Xhttpr: function () {
        var xhr = null;
        if (window.XMLHttpRequest || window.ActiveXObject) {
            if (window.ActiveXObject) {
                try {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
            }
            else
                xhr = new XMLHttpRequest();
        }
        else {
            alert("Votre navigateur ne supporte pas l\'objet XMLHTTPRequest...");
            return null;
        }
        return xhr;
    },

    AddEvent: function (element, event, func) {
        if (element.attachEvent)
            element.attachEvent("on" + event, func);
        else
            element.addEventListener(event, func, true);
    }
};

Main.AddEvent(window, "load", Main.Init);