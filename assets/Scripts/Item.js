var GlobalData=require("GlobalData")
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
	
     },

    start () {

    },

    update(dt){
        
    },
    onCollisionEnter: function (other, self)
    {
        if(other.node.name=="playercircle")//如果node的名字是玩家球
        {
            if(GlobalData.loopModeOpen == false){
                if(GlobalData.round<8)
                {
                    GlobalData.currentScore+=this.myrandom(1,3);
                }else
                if(GlobalData.round>=8)
                {
                    GlobalData.currentScore+=this.myrandom(6,10);
                }else
                if(GlobalData.round>15)
                {
                    GlobalData.currentScore+=this.myrandom(50,150);
                }  else
                if(GlobalData.round>30)
                {
                    GlobalData.currentScore+=this.myrandom(300,500);
                }  
            }
                     
            var gameManager=cc.find("Canvas/GameManager");
            gameManager.getComponent("GameManager").currentScore.string=GlobalData.currentScore.toString();
            this.node.active = false;
            GlobalData.itemOnGround+=1; 
            var audioManager=cc.find("Canvas/AudioManager").getComponent("AudioManager");
            audioManager.playcollectedSounds();
        }
    },
    myrandom:function(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }
});
