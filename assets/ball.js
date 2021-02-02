// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        mrigidBody:{
            type:cc.RigidBody,
            default:null
            
        },
        mcanvas:{
            type:cc.Node,
            default:null
            
        }
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        
        this.mcanvas.on(cc.Node.EventType.TOUCH_END,this.jump,this);
     },

     jump () {
        this.mrigidBody = this.node.getComponent(cc.RigidBody);
        
        var index=this.myrandom(0,3);
        if(index==0)
        {
            this.mrigidBody.linearVelocity = cc.Vec2(0,500)
        }else if(index==1)
        {
            this.mrigidBody.linearVelocity = cc.Vec2(500,0)
        }
        else if(index==2)
        {
            this.mrigidBody.linearVelocity = cc.Vec2(-500,0)
        }
    },
    // update (dt) {},
    myrandom:function(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }
});
