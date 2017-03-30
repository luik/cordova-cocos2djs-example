// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.


(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        document.ontouchmove = function (event) {
            event.preventDefault();
        };

        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        let parentElement = document.getElementsByClassName('app')[0];
        document.body.removeChild(parentElement);

        let canvas = document.createElement("canvas");
        canvas.setAttribute("id", "gameCanvas");
        canvas.setAttribute("width", document.body.scrollWidth);
        canvas.setAttribute("height", document.body.scrollHeight);
        document.body.appendChild(canvas);

        configureCocos();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function configureCocos() {
        cc.game.onStart = function () {
            //load resources
            cc.LoaderScene.preload(["images/HelloWorld.png"], function () {
                var MyScene = cc.Scene.extend({
                    soundPaths: [
                        "A3-220.0.mp3",
                        "B3-246.94.mp3",
                        "Csharp4-277.18.mp3",
                        "Dsharp4-311.13.mp3",
                        "F4-349.23.mp3",
                        "G4-392.0.mp3",
                        "A4-440.0.mp3",
                        "B4-493.88.mp3",
                        "Csharp5-554.37.mp3",
                        "Dsharp5-622.25.mp3",
                        "Asharp3-233.08.mp3",
                        "C4-261.63.mp3",
                        "D4-293.66.mp3",
                        "E4-329.63.mp3",
                        "Fsharp4-369.99.mp3",
                        "Gsharp4-415.3.mp3",
                        "Asharp4-466.16.mp3",
                        "C5-523.25.mp3",
                        "D5-587.33.mp3",
                        "E5-659.26.mp3"
                    ],

                    playChallenge: function () {
                        let paths = [];

                        for (let i = 0; i < 3; i++) {
                            paths[i] = "sounds/" + this.soundPaths[Math.floor(this.soundPaths.length * Math.random())];
                        }

                        cc.audioEngine.playMusic(paths[0], false);
                        this.runAction(
                            cc.sequence(
                                cc.delayTime(1),
                                cc.callFunc(
                                    function () {
                                        cc.audioEngine.playMusic(paths[1], false)
                                    }),
                                cc.delayTime(1),
                                cc.callFunc(
                                    function () {
                                        cc.audioEngine.playMusic(paths[2], false)
                                    })));
                    },
                    onEnter: function () {
                        this._super();

                        let size = cc.director.getWinSize();

                        let scale = size.height / 50 / (this.soundPaths.length + 2);

                        for (let i = 0; i < this.soundPaths.length / 2; i++) {
                            this.addKey(i, scale, 100, 50 * scale * i * 2 + 50);
                        }

                        for (let i = 0; i < this.soundPaths.length / 2; i++) {
                            this.addKey(i + this.soundPaths.length / 2, scale, size.width - 100, 50 * scale * i * 2 + 50);
                        }
                    },

                    addKey: function (id, scale, x, y) {
                        let sprite = cc.Sprite.create("images/key.png");
                        sprite.setScale(scale);
                        sprite.setPosition(x, y);
                        this.addChild(sprite, 0);
                        sprite["id"] = id;

                        let soundPaths = this.soundPaths;

                        let eventListener = cc.EventListener.create({
                            event: cc.EventListener.TOUCH_ONE_BY_ONE,
                            swallowTouches: true,
                            onTouchBegan: function (touch, event) {
                                let target = event.getCurrentTarget();
                                let PosInScreen = target.convertToNodeSpace(touch.getLocation());
                                let Size = target.getContentSize();
                                let rect = cc.rect(0, 0, Size.width, Size.height);

                                if (cc.rectContainsPoint(rect, PosInScreen)) {
                                    console.log(event.getCurrentTarget()["id"]);
                                    cc.audioEngine.playMusic("sounds/" + soundPaths[event.getCurrentTarget()["id"]]);
                                }
                                return false;
                            }
                        });
                        cc.eventManager.addListener(eventListener, sprite);
                    }
                });
                cc.director.runScene(new MyScene());
            }, this);
        };
        cc.game.run("gameCanvas");
    };

} )();