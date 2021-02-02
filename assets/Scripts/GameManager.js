var GlobalData=require("GlobalData")
cc.Class({
    extends: cc.Component,

    properties: {
        currentScore:{
            default:null,
            type:cc.Label
        },
        round:{
            default:null,
            type:cc.Label
        },
        historyHightScore:{
            default:null,
            type:cc.Label
        },
        cavas:{
            default:null,
            type:cc.Node
        },
        playerCircle:{
            default:null,
            type:cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.cavas.on(cc.Node.EventType.TOUCH_START,this.startGame,this);
        
        GlobalData.gameReady=false;
     },

     startGame(){
         if(GlobalData.gameStart==false&&GlobalData.gameReady==true)
         {
            var mto = cc.moveTo(0.1,cc.v2(this.playerCircle.getPosition().x+213,0)).easing(cc.easeQuadraticActionInOut());
            this.playerCircle.runAction(cc.sequence(mto,cc.callFunc(function(){
                GlobalData.gameStart=true;
            },this)))
         }
     },
    start () {
        GlobalData.gameStart=false;
        this.currentScore.string="0";
        GlobalData.round=0;
        this.historyHightScore.string=GlobalData.gethistoryHightScore("NewScore").toString();
        //GlobalData.round=0;
    },
    update (dt) {
        if(GlobalData.itemOnGround>=12)//如果地上的item的数值大于等于12
        {
            //说明已经转了一圈了
            GlobalData.round+=1;//圈数加1
            this.round.string=GlobalData.round.toString();
            var itemlist=cc.find("Canvas/ItemList");
            var itemListManager=itemlist.getComponent("ItemListManager");
            for (let index = 0; index < itemListManager.itemList.length; index++) {
                itemListManager.itemList[index].active=true;
                GlobalData.itemOnGround=0;
            }
        }
    },
   
});
