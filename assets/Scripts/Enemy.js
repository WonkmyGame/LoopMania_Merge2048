var GlobalData=require("GlobalData")
cc.Class({
    extends: cc.Component,

    properties: {
        speed:{
            default:0
        },
    },


     onLoad () {
        var mto = cc.moveTo(1,cc.v2(0,0));
        this.node.runAction(cc.sequence(mto,cc.callFunc(function(){
            GlobalData.enemyOnGround=true;
        },this)))
     },

    start () {

    },

     update (dt) {
         if(GlobalData.enemyOnGround==true)
         {
            this.node.angle+=this.speed;
         }
     },
});
