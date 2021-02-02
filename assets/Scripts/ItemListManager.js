cc.Class({
    extends: cc.Component,

    properties: {
        itemList:{
            default:[],
            type:[cc.Node]
        }
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
	
     },

     RemoveItemFromList(item){
        itemList.splice(item.node);
     },
    start () {

    },

    // update (dt) {},
});
