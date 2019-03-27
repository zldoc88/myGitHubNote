class sound extends egret.DisplayObjectContainer {
    public constructor() {
        super();
    }

    public url='';
    public sound:egret.Sound;
    public channel=null;
    public soundPlayEnd=()=>{};
    public init(url) {
        //创建 Sound 对象
        var sound = new egret.Sound();
        this.url = url;
        //添加加载完成侦听
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        sound.load(this.url);
    }

    private onLoadComplete(event:egret.Event):void {
        //获取加载到的 Sound 对象
        this.sound = <egret.Sound>event.target;
        //播放音乐
        this.sound.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    }

    private onSoundComplete(event:egret.Event):void {
        this.soundPlayEnd();
    }
    public play(){
        try {
            Game.pauseWxBGmusice();
            this.channel= this.sound.play(0,1);
        }catch (e){}
    }
    public stop(){
        try {
            Game.playWxBGmusice();
            this.channel.stop();
        }catch (e){}


    }
}