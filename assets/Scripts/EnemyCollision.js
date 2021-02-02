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

    onCollisionEnter: function (other, self)
    {
        if(other.node.name=="playercircle")//如果node的名字是玩家球
        {
            if(GlobalData.enemyOnGround==false)return;
            if (GlobalData.canRotate == true) {
                if (GlobalData.classicModeOpen == true||GlobalData.arcadeModeOpen==true)//如果经典模式或街机模式开启
                {
                    GlobalData.isGameOver = true;
                    other.node.destroy();
                    GlobalData.setHightScore("NewScore", GlobalData.currentScore);
                    GlobalData.currentScore = 0;
                    this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
                        cc.director.loadScene("Main");
                        GlobalData.round=0;
                        GlobalData.itemOnGround=0;
                    }, this)))
                }
            }else{
                if(GlobalData.round<8)//如果当前圈数小于8圈
                {
                    if(GlobalData.classicModeOpen == true)
                    {
                        GlobalData.currentScore+=5;
                    }
                    
                }else
                if(GlobalData.round>=8)//如果当前圈数大于8圈
                {
                    if(GlobalData.classicModeOpen == true){
                        GlobalData.currentScore+=GlobalData.round*5;
                    }
                    
                }else
                if(GlobalData.round>=15)//如果当前圈数大于15圈
                {
                    if(GlobalData.classicModeOpen == true)
                    {
                        GlobalData.currentScore+=GlobalData.round*5*2;
                    }
                    
                }  else if(GlobalData.round>=30)//如果当前圈数大于30圈
                {
                    if(GlobalData.classicModeOpen == true){
                        GlobalData.currentScore+=GlobalData.round*5*2*this.myrandom(3,6);
                    }
                    
                }              
                var gameManager=cc.find("Canvas/GameManager");
                gameManager.getComponent("GameManager").currentScore.string=GlobalData.currentScore.toString();            
                self.node.destroy();  
                GlobalData.hitEnemy=true;  
                if(GlobalData.arcadeModeOpen==true)
                {
                    GlobalData.canRotate=true;  
                }         
            }
            var audioManager=cc.find("Canvas/AudioManager").getComponent("AudioManager");
            audioManager.playhitSounds();
        }
    },


    myrandom:function(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }
    // update (dt) {},
});
