var GlobalData = require("GlobalData")
cc.Class({
    extends: cc.Component,

    properties: {
        collectedaudioSource: {
            type: cc.AudioSource,
            default: null
        },
        hitaudioSource:{
            type: cc.AudioSource,
            default: null
        },
        onLandaudioSource:
        {
            type: cc.AudioSource,
            default: null
        },
        audio_collected:{
            default:null,
            type:cc.AudioClip,
        },
        audio_hit:{
            default:null,
            type:cc.AudioClip,
        },
        audio_onLand:{
            default:null,
            type:cc.AudioClip,
        },
        backMusicAudioSource:{
            type: cc.AudioSource,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        
     },

    start () {
        
    },

     update (dt) {
        if(GlobalData.openMusic==true)
        {
            this.backMusicAudioSource.mute=false;
        }else{
            this.backMusicAudioSource.mute=true;
        }
     },

    playcollectedSounds:function(){
        if(GlobalData.openMusic==false)return;
        this.collectedaudioSource.clip=this.audio_collected;
        this.collectedaudioSource.play();
    },
    playhitSounds:function(){
        if(GlobalData.openMusic==false)return;
        this.hitaudioSource.clip=this.audio_hit;
        this.hitaudioSource.play();
    },
    playonLandSounds:function(){
        if(GlobalData.openMusic==false)return;
        this.onLandaudioSource.clip=this.audio_onLand;
        this.onLandaudioSource.play();
    }
});
