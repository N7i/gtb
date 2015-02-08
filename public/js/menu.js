"use strict";

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
    clocks: {},

    Init: function () {
        Main.xhr = Main.Xhttpr();
        Main.player.data = Main.GetMyJson("player");
        Main.skills.data = Main.GetMyJson("skills");
        Main.items.data = Main.GetMyJson("items");
        Main.monsters.data = Main.GetMyJson("monsters");
        Main.listeMonsters.data = Main.GetMyJson("listeMonsters");

        // try update default info for query string params
        try {
            var data = JSON.parse(decodeURIComponent(location.search.substr(6)));
            var listMonsterCpy = [];

            $.each(Main.listeMonsters.data, function(index, monster) {
                if (monster.id != data.del) {
                    listMonsterCpy.push(monster);
                }
            });

            Main.listeMonsters.data = listMonsterCpy;
            Main.items.data = data.items;
            

        } catch (e) {
            try {
                var data = JSON.parse(decodeURIComponent(location.search.substr(17)));
                var listMonsterCpy = [];

                $.each(Main.listeMonsters.data, function (index, monster) {
                    if (monster.id != data.del) {
                        listMonsterCpy.push(monster);
                    }
                });

                Main.listeMonsters.data = listMonsterCpy;
                Main.items.data = data.items;


            } catch (e) {
                //ignore
            }
        }

        Main.SetPlayerInfo(Main.player, Main.items, Main.skills);
        Main.SetShop(Main.items);
        Main.drawMenu(Main.listeMonsters.data);

        $.each(Main.listeMonsters.data, function (index, monster) {

            var canvas = document.getElementById("menu-monster-canvas-" + index),
                scene = null,
                engine = null,
                camera = null,
                light = null;

            
            engine = new BABYLON.Engine(canvas, true);
            scene = new BABYLON.Scene(engine);
            
            camera = new BABYLON.FreeCamera("MainCamera", new BABYLON.Vector3(0, 0, -10), scene);
            camera.checkCollisions = true;
            camera.setTarget(new BABYLON.Vector3.Zero());

            light = new BABYLON.PointLight("DirLight", new BABYLON.Vector3(0, 10, 0), scene);
            light.diffuse = new BABYLON.Color3(1, 1, 1);
            //Main.light.specular = new BABYLON.Color3(0.6, 0.6, 0.6);
            light.specular = new BABYLON.Color3(0, 0, 0);
            light.intensity = 1.5;

            engine.runRenderLoop(function () {
                scene.render();
                light.position = camera.position;
            });

            BABYLON.SceneLoader.ImportMesh("", "public/mesh/", monster.img+".babylon", scene, function (meshes) {
                var mesh = meshes[0];
                mesh.position.y -= 3;
                Main.CreateLoopRotateAnimationForScene(scene, mesh);
            });
        });

        

        //Main.camera = new BABYLON.FreeCamera("MainCamera", new BABYLON.Vector3(0, 0, -3), Main.scene);
        //Main.camera.checkCollisions = true;
        ////Main.scene.activeCamera.attachControl(Main.canvas);
        //Main.camera.setTarget(new BABYLON.Vector3.Zero());

        //Main.engine.runRenderLoop(function () {
        //    Main.scene.render();
        //    Main.light.position = Main.camera.position;
        //});
        

    },

    drawMenu: function(monsters) {

        /** HELL Template
        /** TODO : use a template engine

        <div class="row">

            <div class="tridiv state-hidden state-pre-hidden" data-idx="'+index+'">
                <div class="scene" style="-webkit-transform:rotateX(1deg) rotateY(720deg); -moz-transform:rotateX(1deg) rotateY(720deg); -ms-transform:rotateX(1deg) rotateY(720deg); transform:rotateX(1deg) rotateY(720deg); ">
                    <div class="shape cylinder-1 cyl-1">
                        <div class="face bm">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div>
                        </div>
                        <div class="face tp">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div>
                        </div>
                        <div class="face side s0">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div>
                        </div>
                        <div class="face side s1">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div>
                        </div>
                        <div class="face side s2">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div>
                        </div>
                        <div class="face side s3">

                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div>
                        </div>
                        <div class="face side s4">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div>
                        </div>
                        <div class="face side s5">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div>
                        </div>
                        <div class="face side s6">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div>
                        </div>
                        <div class="face side s7">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div>
                        </div>
                        <div class="face side s8">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div>
                        </div>
                        <div class="face side s9">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div>
                        </div>
                        <div class="face side s10">
                            <span style="-webkit-transform: rotate(90deg);
                display: block;
                -webkit-transform-origin: 0px 52px 5px;
                width: 250px;
                font-size: 2em;" class="green">
                NEW MONSTER</span>
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.14902);"></div>
                        </div>
                        <div class="face side s11">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div>
                        </div>
                        <div class="face side s12">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0);"></div>
                        </div>
                        <div class="face side s13">
                            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div>
                        </div>
                    </div>
                    <div class="shape cuboid-1 cub-1">
                        <div class="face ft">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);">
                            
                              <canvas id="menu-monster-canvas-'+index+'" class="menu-monster-preview"></canvas> 
                            </div>
                        </div>
                        <div class="face bk">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div>
                        </div>
                        <div class="face rt">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div>
                        </div>
                        <div class="face lt">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div>
                        </div>
                        <div class="face bm">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div>
                        </div>
                        <div class="face tp">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div>
                        </div>
                    </div>
                    <div class="shape cuboid-2 cub-2">
                        <div class="face ft">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);">
                                <span class="menu-monster-name blue">
                                    '+ monster.name+'

                                    <span class="menu-monster-stats">
                                        <span class="menu-monster-stats-hp glyphicon glyphicon glyphicon-heart" aria-hidden="true">'+ monster.hp +' 
                                        </span>
                                        <span class="menu-monster-stats-resistance glyphicon glyphicon glyphicon-modal-window" aria-hidden="true">'+ monster.resistance +' 
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="face bk">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);"></div>
                        </div>
                        <div class="face rt">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);"></div>
                        </div>
                        <div class="face lt">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);"></div>
                        </div>
                        <div class="face bm">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);"></div>
                        </div>
                        <div class="face tp">
                            <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);"></div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        **/

        $.each(monsters, function (index, monster) {
            $('#monsterList .raw-container').append('<div class="row"> <div class="tridiv state-hidden state-pre-hidden" data-idx="' + index + '"> <div class="scene" style="-webkit-transform:rotateX(1deg) rotateY(720deg); -moz-transform:rotateX(1deg) rotateY(720deg); -ms-transform:rotateX(1deg) rotateY(720deg); transform:rotateX(1deg) rotateY(720deg); "> <div class="shape cylinder-1 cyl-1"> <div class="face bm"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div> </div> <div class="face tp"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div> </div> <div class="face side s0"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div> </div> <div class="face side s1"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div> </div> <div class="face side s2"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div> </div> <div class="face side s3"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div> </div> <div class="face side s4"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div> </div> <div class="face side s5"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div> </div> <div class="face side s6"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div> </div> <div class="face side s7"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div> </div> <div class="face side s8"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0);"></div> </div> <div class="face side s9"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div> </div> <div class="face side s10"> <span style="-webkit-transform: rotate(90deg); display: block; -webkit-transform-origin: 0px 52px 5px; width: 250px; font-size: 2em;" class="green"> NEW MONSTER</span> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.14902);"></div> </div> <div class="face side s11"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div> </div> <div class="face side s12"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0);"></div> </div> <div class="face side s13"> <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.0505882);"></div> </div> </div> <div class="shape cuboid-1 cub-1"> <div class="face ft"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);"> <canvas id="menu-monster-canvas-' + index + '" class="menu-monster-preview"></canvas> </div> </div> <div class="face bk"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div> </div> <div class="face rt"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div> </div> <div class="face lt"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div> </div> <div class="face bm"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div> </div> <div class="face tp"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.14902);"></div> </div> </div> <div class="shape cuboid-2 cub-2"> <div class="face ft"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);"> <span class="menu-monster-name blue"> ' + monster.name + ' <span class="menu-monster-stats"> <span class="menu-monster-stats-hp glyphicon glyphicon glyphicon-heart" aria-hidden="true">' + monster.hp + ' </span> <span class="menu-monster-stats-resistance glyphicon glyphicon glyphicon-modal-window" aria-hidden="true">' + monster.resistance + ' </span> </span> </span> </div> </div> <div class="face bk"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);"></div> </div> <div class="face rt"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);"></div> </div> <div class="face lt"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);"></div> </div> <div class="face bm"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);"></div> </div> <div class="face tp"> <div class="photon-shader" style="background-color: rgba(255, 255, 255, 0.113725);"></div> </div> </div> </div> </div> </div>');
        });

        $('.tridiv').click(function () {
            var elm = $(this);

            if (elm.hasClass('state-pre-hidden')) {
                elm.removeClass('state-pre-hidden');
                setTimeout(function () {
                    elm.toggleClass('state-hidden');
                }, 1000);
            }
            else {
                var monsterPos = elm.data('idx');
                var monster = Main.listeMonsters.data[monsterPos];

                monster.hp = 1;
                monster.name = monster.img;

                delete monster.img;
                delete monster.date;

                var gameData = {
                    monster: monster,
                    items: Main.items.data
                };

                location.href = "game.html?data=" + JSON.stringify(gameData);
            }
        });
    },

    CreateLoopRotateAnimationForScene: function(scene, mesh) {
        var time = 0;
        scene.registerBeforeRender(function () {
            time += 0.03;
            mesh.rotation.y = time;
        });
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
        var container = $("#shopBox .shop-container .raw-container");
        var shopBox = container[0];
        shopBox.innerHTML = "<h2 class=\"green\">Shop</h2>";
        for (var i = 0; i < items.data.length; i++)
        {
            var shopBox = '';
            shopBox += "<div id=\"item" + i + "\" class=\"row\">";
            shopBox += "<div class=\"shop-item-picture\"> <img src=\"public/img/" + items.data[i].name + ".png\"/> </div>";
            shopBox += "<div class=\"shop-item-add\ btn btn-primary btn-"+i+"\" data-idx=\""+i+"\"> " + items.data[i].name + " </div>";
            // <a href=\"#\" onclick=\"Main.AddItem(" + i + ");\">" + items.data[i].name + "</a>
            //shopBox += "<div> 0.50€ </div>";
            shopBox += "<div id=\"item" + i + "_qty\" class=\"shop-item-qty\"></div>";
            shopBox += "</div>";

            if (i != items.data.length - 1) {
                shopBox += "<hr />";
            }

            container.append(shopBox);

            var item = items.data[i];
            var flipClock = container.find('#item' + i + '_qty');
            Main.clocks[i] = flipClock.FlipClock(items.data[i].qty, {
                clockFace: 'Counter',
                countdown: false
            });

            $('.btn-' + i).click(function () {
                var idx = $(this).data('idx');

                Main.AddItem(idx);
                Main.clocks[idx].setTime(Main.items.data[idx].qty);
            });
        }
    },

    AddItem: function (itemIndex) {
        Main.items.data[itemIndex].qty += 1;
    },

    SelectMonster: function (monsterIndex) {
        Main.monsters.data[0].id = Main.listeMonsters.data[monsterIndex].id;
        Main.monsters.data[0].name = Main.listeMonsters.data[monsterIndex].img;
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