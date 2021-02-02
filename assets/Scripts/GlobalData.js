var globalData = {
    canRotate:true,//玩家是否可以转
    enemyOnGround:false,//敌人是否可以在地面上
    isGameOver:false,//是否游戏结束
    currentScore:0,//当前分数
    historyHightScore:0,//历史最高分
    gameStart:false,//游戏是否开始
    gameReady:false,//游戏是否准备好开始
    itemOnGround:0,//在地面上的item数
    round:0,//当前圈数
    loopModeOpen:false,//无尽模式是否开启
    arcadeModeOpen:false,//街机模式是否开启
    classicModeOpen:false,//经典模式是否开启
    hitEnemy:false,//是否已经撞击到敌人
    openMusic:true,//是否开启声音
    energyAmount:10,//体力值
    currentTime:0,//当前的毫秒数
    consumeEnergyTime:0,//消耗精力时的毫秒数

    setPlayerEnergy:function(key,value){
        cc.sys.localStorage.setItem(key, value); //存储数据
    },
    getPlayerEnergy:function(key)
    {
        if(cc.sys.localStorage.getItem(key)==null||cc.sys.localStorage.getItem(key)=="")
        {
            return 0;
        }
        return parseInt( cc.sys.localStorage.getItem(key)); //读取数据
    },
    setHightScore:function(key,value)//保存存档
    {
        if(parseInt(value)>=parseInt(this.gethistoryHightScore(key)))
        {
            cc.sys.localStorage.setItem(key, value); //存储数据
        }
    },
    gethistoryHightScore:function(key)//读取存档
    {
        if(cc.sys.localStorage.getItem(key)==null||cc.sys.localStorage.getItem(key)=="")
        {
            return 0;
        }
        return parseInt( cc.sys.localStorage.getItem(key)); //读取数据
    },
    deleteHightScore(name)
    {
        cc.sys.localStorage.removeItem(name);
    },
    getRandom_Order_id()
    {
      return Math.random().toString(36).substr(2);
    },
}
 
//导出为引用模块
module.exports = globalData