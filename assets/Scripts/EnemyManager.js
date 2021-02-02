var GlobalData=require("GlobalData")
cc.Class({
    extends: cc.Component,

    properties: {
        spwanEnemyTime:2,
        now_time:0,
        enemyPosList:{
            default:[],
            type:[cc.Node]
        },
        enemyPre:{
            default:null,
            type:cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
	
     },

    start () {

    },

     update (dt) {
         if(GlobalData.gameReady==false)return;
         this.now_time+=dt;
         if (this.now_time >= this.spwanEnemyTime) {
             var myIndex = this.myrandom(0, 8);
             var newEnemy = cc.instantiate(this.enemyPre);
             this.node.addChild(newEnemy);
             newEnemy.getComponent("Enemy").speed=this.myrandom(2, 6);
             var newPos=this.enemyPosList[myIndex];
             newEnemy.setPosition(newPos);
             this.now_time = 0;
         }
     },

     myrandom:function(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }
});
