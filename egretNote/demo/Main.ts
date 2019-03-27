//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
let Game = {

    Router:new Router(false) //todo false ：【开启路由，URL 哈希值为 #?page = xxx; xxx可设置为入口场景,不存在则空白】； true :【禁止路由】
    ,gust:0
    ,CONFIG:window['CONFIG']
    ,getRadomMun:(min,max)=>{
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    ,saveStatueReady:(e)=>{}
    ,sys:{
        width:0
        ,height:0
    }
    ,book:null
    ,publicBlackgroud:null
    ,publicBlackgroud2:null
    ,publicBookFace:null
    ,wxAudio :{}
    ,playWxBGmusice:()=>{
        try {
            Game.wxAudio.play();
        }catch (e){};
    }
    ,pauseWxBGmusice:()=>{
        try {
            Game.wxAudio.pause();
        }catch (e){};
    }
    ,initSound:(array)=>{}
    ,onSenceReady:()=>{

    }
    ,onChangeSenceStart:(e)=>{}
    ,onChangeSenceComplecte:(e)=>{}
    ,onRecordComplecte:(e)=>{}
    ,hideDom:()=>{}
    ,back:()=>{}
    ,onReadyLoadThemeSound:()=>{} //准备加载有效
    ,recordStart:(e)=>{} //开始录音
    ,recordEnd:(e,fn)=>{ try {fn()}catch (e){}} //结束录音
    ,playRecord:()=>{}
};

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        /*egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {
                console.log('hello,world')
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }*/


        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json?v=1.18", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    public  commView=null;
    public topAnim=null;
    public bottomAnim=null;
    public book=null;
    public bg=null;


    private createGameScene() {



        Game.onSenceReady();

        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
       // sky.height = stageH;

        Game.sys.width = stageW;
        Game.sys.height = stageH;

        //空白封面（返回显示）
        var bg2:egret.Texture = RES.getRes( "home_bookface_empty_png" );
        Game.publicBlackgroud2= new egret.Bitmap( bg2 );
        this.addChild(Game.publicBlackgroud2);
        Game.publicBlackgroud2.x=(Game.sys.width - Game.publicBlackgroud2.width)/2;
        Game.publicBlackgroud2.y=68;
        Game.publicBlackgroud2.visible=true;

        //封面
        var bg:egret.Texture = RES.getRes( "page_public_png" );
        Game.publicBlackgroud= new egret.Bitmap( bg );
        this.addChild(Game.publicBlackgroud);
        Game.publicBlackgroud.x=-9;
        Game.publicBlackgroud.y=68;
        Game.publicBlackgroud.visible=false;


        //书面
        //home_bookface_png
        var publicBookFace:egret.Texture = RES.getRes( "home_bookface_png" );
        Game.publicBookFace= new egret.Bitmap( publicBookFace );
        this.addChild(Game.publicBookFace);
        Game.publicBookFace.x = (Game.sys.width - Game.publicBookFace.width)/2;
        Game.publicBookFace.y=68;
        Game.publicBookFace.visible=true;


        this.commView =new viewManager();
        this.addChild(this.commView);
        this.commView.start();

        this.addEventListener( egret.Event.ENTER_FRAME, function():void{
            dragonBones.WorldClock.clock.advanceTime( 0.01 );
        }, this );

        this.book = new dragonBonesOutput();
        this.addChild(this.book);
        this.book.x=-180;
        this.book.y=-50;
        this.book.init('book_ske_json','book_tex_json','book_tex_png',6.5);
        Game.book = this.book;







        //上部元素
        this.topAnim = new dragonBonesOutput();
        this.addChild(this.topAnim);
        this.topAnim.x= 0;
        this.topAnim.y=0;
        this.topAnim.init('topFlower_ske_json','topFlower_tex_json','topFlower_tex_png',1.5);
        this.topAnim.play('topAnim');


        //下部元素
        this.bottomAnim = new dragonBonesOutput();
        this.addChild(this.bottomAnim);
        this.bottomAnim.init('bottomFlower_ske_json','bottomFlower_tex_json','bottomFlower_tex_png',1.5);
        this.bottomAnim.x= 0;
        //this.bottomAnim.y=Game.sys.height-this.bottomAnim.height ;
        this.bottomAnim.y=940 ;
        this.bottomAnim.play('newAnimation');

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
       // RES.getResAsync("description_json", this.startAnimation, this)
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}


