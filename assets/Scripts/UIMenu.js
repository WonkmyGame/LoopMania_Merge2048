var GlobalData = require("GlobalData")
cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: {
            default: null,
            type: cc.Node
        },
        circleNode: {
            default: null,
            type: cc.Node
        },
        itemListNode: {
            default: null,
            type: cc.Node
        },
        scoreAndRoundTxtNode: {
            default: null,
            type: cc.Node
        },
        loopModeBtn: {
            default: null,
            type: cc.Button
        },
        ArcadeModeBtn: {
            default: null,
            type: cc.Button
        },
        loopModeTipText: {
            default: null,
            type: cc.Label
        },
        arcadeModeTipText: {
            default: null,
            type: cc.Label
        },
        historyHightNum: {
            default: null,
            type: cc.Label
        },
        helpUI: {
            default: null,
            type: cc.Node
        },
        energyProcess: {
            default: null,
            type: cc.ProgressBar
        },
        energyTxt: {
            default: null,
            type: cc.Label
        },
        id : '5KhlHlzsR6GtaFqIrgzFRw==', // 通过 MP 系统审核的图片编号
        url :'https://mmocgame.qpic.cn/wechatgame/x9uQcl0cbzibBrt8Rp7rkpvHDxbYdQm4Ddcd8weOt1xfdpnlUj7Kk8arvqoDMmTEb/0' // 通过 MP 系统审核的图片地址
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.gameshare();
    },

    start() {
        this.energyTxt.string = GlobalData.energyAmount.toString();
        this.historyHightNum.string = GlobalData.gethistoryHightScore("NewScore");
        this.energyProcess.progress = (20 * GlobalData.energyAmount) / this.energyProcess.totalLength;
    },

    gotoClassicMode() {
        //if (GlobalData.energyAmount > 0) {
            //GlobalData.energyAmount -= 1;
            //this.energyProcess.progress -= 0.1;
            //this.energyTxt.string = GlobalData.energyAmount.toString();

            this.node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
                this.playerNode.active = true;
                this.circleNode.active = true;
                this.itemListNode.active = true;
                this.scoreAndRoundTxtNode.active = true;
                GlobalData.gameReady = true;
                this.node.active = false;
                GlobalData.arcadeModeOpen = false;
                GlobalData.loopModeOpen = false;
                GlobalData.classicModeOpen = true;
            }, this)))
       // }
    },
    gotoLoopMode() {
        if (parseInt(GlobalData.gethistoryHightScore("NewScore")) >= 10000) {
            this.playerNode.active = true;
            this.circleNode.active = true;
            this.itemListNode.active = true;
            this.scoreAndRoundTxtNode.active = true;
            GlobalData.gameReady = true;
            this.node.active = false;
            GlobalData.classicModeOpen = false;
            GlobalData.arcadeModeOpen = false;
            GlobalData.loopModeOpen = true;
        }
    },
    gotoArcadeMode() {
        if (parseInt(GlobalData.gethistoryHightScore("NewScore")) >= 3500) {
            this.playerNode.active = true;
            this.circleNode.active = true;
            this.itemListNode.active = true;
            this.scoreAndRoundTxtNode.active = true;
            GlobalData.gameReady = true;
            this.node.active = false;
            GlobalData.classicModeOpen = false;
            GlobalData.loopModeOpen = false;
            GlobalData.arcadeModeOpen = true;
        }
    },

    gameHelp() {
        this.helpUI.active = true;
    },

    gameshare() {
        // 监听小程序右上角菜单的「转发」按钮
        if (typeof wx === 'undefined') {
            return;
        }

        // 显示当前页面的转发按钮
        wx.showShareMenu({
            success: (res) => {
                console.log('开启被动转发成功！');
            },
            fail: (res) => {
                console.log(res);
                console.log('开启被动转发失败！');
            }
        });

        // 获取当前棋局oneChess信息，JSON.stringfy()后传入query
        wx.onShareAppMessage(() => {
            return {
                title: '循环狂热之你能转多少圈？快来试一试!',
                imageUrlId: this.id,
                imageUrl: this.url
            }
        });
    },

    closeHelpUI() {
        this.helpUI.active = false;
    },

    onShareGameBtn() {
        // 主动分享按钮
        // if (typeof wx === 'undefined') {
        //     return;
        // }
        
        // wx.shareAppMessage({
        //     title: '循环狂热之你能转多少圈？快来试一试!',
        //     imageUrlId: this.id,
        //     imageUrl: this.url
        // });
        window.playableSDK.openAppStore();
    },

    musicCtrl() {
        var audioManager = cc.find("Canvas/AudioManager").getComponent("AudioManager");

        if (GlobalData.openMusic == true) {
            GlobalData.openMusic = false;
            audioManager.backMusicAudioSource.mute = true;
        } else if (GlobalData.openMusic == false) {
            GlobalData.openMusic = true;
            audioManager.backMusicAudioSource.mute = false;
        }

    },

    deleteHightScore() {
        GlobalData.deleteHightScore("NewScore");
        this.historyHightNum.string = GlobalData.gethistoryHightScore("NewScore");
        var gameManager = cc.find("Canvas/GameManager").getComponent("GameManager");
        gameManager.historyHightScore.string = GlobalData.gethistoryHightScore("NewScore").toString();
        this.resetInitialState();
    },

    resetInitialState() {
        GlobalData.classicModeOpen = false;
        GlobalData.loopModeOpen = false;
        GlobalData.arcadeModeOpen = false;

        this.loopModeBtn.interactable = false;
        this.loopModeTipText.node.active = true;

        this.ArcadeModeBtn.interactable = false;
        this.arcadeModeTipText.node.active = true;
    },

    update(dt) {
        if (parseInt(GlobalData.gethistoryHightScore("NewScore")) >= 10000) {
            this.loopModeBtn.interactable = true;
            this.loopModeTipText.node.active = false;
        }
        if (parseInt(GlobalData.gethistoryHightScore("NewScore")) >= 3500) {
            this.ArcadeModeBtn.interactable = true;
            this.arcadeModeTipText.node.active = false;
        }
    },
});
