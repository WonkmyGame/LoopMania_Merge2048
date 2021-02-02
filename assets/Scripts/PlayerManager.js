var GlobalData = require("GlobalData")
cc.Class({
    extends: cc.Component,

    properties: {
        speed: {
            default: 0
        },
        selfCircle: {
            default: null,
            type: cc.Node
        },
        cavas: {
            type: cc.Node,
            default: null
        },
        camera: {
            default: null,
            type: cc.Node
        },
        firstX: 0,
        firstY: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //this.node.on(cc.Node.EventType.TOUCH_MOVE,this.playerMove,this);
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);
        cc.director.getCollisionManager().enabled = true;
        this.cavas.on(cc.Node.EventType.TOUCH_START, this.playerMove, this);
        this.cavas.on(cc.Node.EventType.TOUCH_START, this.playerMoveInarcadeMode, this);
        this.cavas.on(cc.Node.EventType.TOUCH_END, this.playerMoveInarcadeModeEnd, this);
    },

    start() {
        GlobalData.isGameOver = false;
    },

    playerMoveInarcadeMode(event) {
        if (GlobalData.arcadeModeOpen == true) {
            var location = event.getLocation();
            this.firstX = location.x;
            this.firstY = location.y;
        }
    },
    playerMoveInarcadeModeEnd(event) {
        if (GlobalData.arcadeModeOpen == true) {
            var touchPoint = event.getLocation();
            var endX = this.firstX - touchPoint.x;
            var endY = this.firstY - touchPoint.y;

            if (Math.abs(endX) > Math.abs(endY)) {
                if (endX > 0) {
                    cc.log("我正在向左滑动");
                } else if (endX < 0) {
                    cc.log("我正在向右滑动");
                }
            } else {
                if (endY > 0) {
                    cc.log("我正在向下滑动");
                } else if (endY < 0) {
                    cc.log("我正在向上滑动");
                }
            }
        }
    },

    playerMove() {
        if (GlobalData.isGameOver) return;
        if (GlobalData.classicModeOpen == true||GlobalData.loopModeOpen == true) {
            if (GlobalData.canRotate && GlobalData.gameStart) {
                var audioManager = cc.find("Canvas/AudioManager").getComponent("AudioManager");
                GlobalData.canRotate = false;
                //移动
                var mto = cc.moveTo(0.1, cc.v2(-this.selfCircle.getPosition().x, this.selfCircle.getPosition().y)).easing(cc.easeQuadraticActionInOut());
                this.selfCircle.runAction(cc.sequence(mto, cc.callFunc(function () {
                    audioManager.playonLandSounds();
                    this.node.runAction(cc.sequence(cc.delayTime(0.15), cc.callFunc(function () {
                        GlobalData.canRotate = true;
                    }, this)))
                }, this
                )));
            }
        }
        if (GlobalData.arcadeModeOpen == true) {//如果当前是街机模式
            if (GlobalData.canRotate && GlobalData.gameStart) {
                var audioManager = cc.find("Canvas/AudioManager").getComponent("AudioManager");
                GlobalData.canRotate = false;
                //移动
                var mto = cc.moveTo(0.1, cc.v2(-this.selfCircle.getPosition().x, this.selfCircle.getPosition().y)).easing(cc.easeQuadraticActionInOut());
                this.selfCircle.runAction(cc.sequence(mto, cc.callFunc(function () {
                    audioManager.playonLandSounds();
                    this.node.runAction(cc.sequence(cc.delayTime(0.15), cc.callFunc(function () {  
                        if (GlobalData.hitEnemy == true)//如果撞击到敌人
                        {                
                            var audioManager = cc.find("Canvas/AudioManager").getComponent("AudioManager");
                            GlobalData.canRotate = false;
                            //移动
                            var mto = cc.moveTo(0.1, cc.v2(-this.selfCircle.getPosition().x, this.selfCircle.getPosition().y)).easing(cc.easeQuadraticActionInOut());
                            this.selfCircle.runAction(cc.sequence(mto, cc.callFunc(function () {
                                audioManager.playonLandSounds();
                                this.node.runAction(cc.sequence(cc.delayTime(0.15), cc.callFunc(function () {
                                    GlobalData.canRotate = true;
                                    GlobalData.hitEnemy = false;
                                }, this)))
                            }, this
                            )));
                        }else{
                            GlobalData.canRotate = true;
                        }
                    }, this)))
                }, this
                )));
            }
        }
    },

    update(dt) {
        if (GlobalData.canRotate) {
            this.node.angle += this.speed;
        }
    },
});
