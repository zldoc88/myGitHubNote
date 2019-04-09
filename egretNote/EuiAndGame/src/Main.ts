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

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
       // const result = await RES.getResAsync("description_json")
       // this.startAnimation(result);
        await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let sky = this.createBitmapByName("bg_jpg");
        //this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "DragonBones and EUI Demo!!";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;


        this.drawDragonBones('changeSkin_ske_json','changeSkin_tex_json','changeSkin_tex_png' );


        let testimg = new itemTool();
        let testimg2 = new itemTool();
   
        this.addChild(testimg);
        this.addChild(testimg2);
    
        testimg.setItemGrerger('======','***************');
        testimg2.setItemGrerger('=测试第二个==','------内容----');

        testimg.y=250;
        testimg2.y=450;


        let button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.testPoint, this);
        
    }

    public touchPoint;
    public testPoint(e){
        this.touchPoint = new egret.Point();
        this.touchPoint.x = e.stageX;
        this.touchPoint.y = e.stageY;
        this.touchPoint['has']=true;


        var _target = new egret.Point();
        this.demoDragonBonesArmaturedisplay.globalToLocal( this.touchPoint.x ,this.touchPoint.y , _target );
        //todo boundingBox 插槽有效,,,,
       // console.log('this.slotHead',this.slotHead);
        var r = this.slotHead.containsPoint( _target.x , _target.y );
       // console.log(r,_target);
        return;


    }

    /**
     * todo 龙骨渲染
     */
    public demoDragonBonesFactory;
    public demoDragonBonesArmaturedisplay;
    public slotHead;
    public slotBodyDefaultDisplay;
    public drawDragonBones(ske_json,tex_json,tex_png){
        var dragonbonesData = RES.getRes( ske_json);
        var textureData = RES.getRes(  tex_json);
        var texture2 = RES.getRes( tex_png);

        this.demoDragonBonesFactory =new dragonBones.EgretFactory(); //创建一个龙骨工厂
        this.demoDragonBonesFactory.parseDragonBonesData(dragonbonesData);
        this.demoDragonBonesFactory.parseTextureAtlasData(textureData,texture2);

        this.demoDragonBonesArmaturedisplay = this.demoDragonBonesFactory.buildArmatureDisplay("Armature");

        this.slotHead= this.demoDragonBonesArmaturedisplay.armature.getSlot('head_boundingBox');
    
        this.demoDragonBonesArmaturedisplay.debugDraw = true;

        var slotbody =this.demoDragonBonesArmaturedisplay.armature.getSlot("body");
        this.slotBodyDefaultDisplay=slotbody.rawDisplay;
        

        this.addChild(this.demoDragonBonesArmaturedisplay);

        this.demoDragonBonesArmaturedisplay.y= 575;

        this.demoDragonBonesArmaturedisplay.animation.play('jump');//播放龙骨动画

        this.demoDragonBonesArmaturedisplay.animation.timeScale = 0.5;

       // this.demoDragonBonesArmaturedisplay.armature.inheritAnimation = false;
    
        /**
         * this.demoDragonBonesArmature.armatureData.aabb
         * 龙骨设计里面 龙骨主骨架坐标属性读取
         */
            // console.log('width',this.demoDragonBonesArmature.getSlot());
       // console.log('width',this.demoDragonBonesArmature);
      //  console.log('armature1=',this.demoDragonBonesArmaturedisplay.armature);
      //  console.log('armature1=',this.demoDragonBonesArmature.armatureData.aabb);
      //  console.log('armature2=',this.demoDragonBonesArmature);
        //console.log('BoundingBoxData',this.demoDragonBonesFactory.getDragonBonesData('changeSkin') );
   
       // t.x = 251;
       // t.y = 251;

     //   dragonBones.WorldClock.clock.add( this.demoDragonBonesArmaturedisplay2.armature);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
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

       // change();
    }
    //换装
    /**
         * 换装
         * @type {egret.Sprite}
         *
         * @1 armature.replaceTexture(RES.getRes("new_db_texture_png")); //全局换装
         *
         * @2 factory.replaceSlotDisplay ( dragonBonesName :string, armatureName :string, slotName :string, displayName :string, slot :dragonBones.Slot, displayIndex :number ):void
         *
         dragonBonesName:string — 指定的龙骨数据名称。

         armatureName:string — 指定的骨架名称。

         slotName:string — 指定的插槽名称。

         displayName:string — 指定的显示对象名称。

         slot:dragonBones.Slot — 指定的插槽实例。

         displayIndex:number — 要替换的显示对象的索引，如果未设置，则替换当前正在显示的显示对象。

         实例 this.firstPage.factory.replaceSlotDisplay("changeSkin", "Armature", "body", 'skin_body_png', this.firstPage.armature.getSlot("body") ,1);
         *
         * @3 动态局部换装
         *  var Slot=this.armature.getSlot(glotName);
            var b:egret.Bitmap = new egret.Bitmap();
            b.texture = RES.getRes( ResName );
             b.x = Slot.display.x;
             b.y = Slot.display.y;
             b.anchorOffsetX = b.width/2;
             b.anchorOffsetY = b.height/2;
            Slot.setDisplay( b );
         */

    public isChanged=false;
    private changeSlotSkin(){

        if(this.isChanged){
            this.isChanged = false;
            var slotbody =this.demoDragonBonesArmaturedisplay.armature.getSlot("body");
            slotbody.setDisplay( this.slotBodyDefaultDisplay );
            
            return;
        }

        this.isChanged = true;
        this.replaceSlotBitmap('body','skin_body_png');
        this.replaceSlotBitmap('left-handl','skin_left_handl_png');//skin_left_handl_png ,skin_right_handl_png
        this.replaceSlotBitmap('right-handl','skin_right_handl_png');

        
    }
    //todo @换装======================== @@@@@实例@@@@
    public replaceSlotBitmap(scureName , tagertName:any){

        var Slot_body=this.demoDragonBonesArmaturedisplay.armature.getSlot(scureName);
        var b:egret.Bitmap = new egret.Bitmap();
        b.texture = RES.getRes( tagertName );
        b.x = Slot_body.display.x;
        b.y = Slot_body.display.y;
        b.anchorOffsetX = b.width/2;
        b.anchorOffsetY = b.height/2;
        Slot_body.setDisplay( b );
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        this.changeSlotSkin();
        return;
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
        
    }
}
