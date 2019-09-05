class dragoneAndEuiDemo extends eui.Group{

    public constructor() {
		super();
        //监听 Group 显示对象直接添加到舞台显示列表 , 未完成调用  this.stage.stageWidth === undefined
       this.addEventListener(egret.Event.ADDED_TO_STAGE,this.oncomplect,this);
	}

    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


    public oncomplect(){

        let sky = this.createBitmapByName("bg_jpg");
     //   this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        this.width = stageW;
        this.height = stageH;


        //文本--------------------------------------------------------------------------
        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "DragonBones and EUI Demo!!";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        //龙骨---------------------------------------------------------------------------
        this.drawDragonBones('changeSkin_ske_json','changeSkin_tex_json','changeSkin_tex_png' );


        //eui布局------------------------------------------------------------------------
        let testimg = new itemTool();
        let testimg2 = new itemTool();
   
        this.addChild(testimg);
        this.addChild(testimg2);
    
        testimg.setItemGrerger('======','***************');
        testimg2.setItemGrerger('=测试第二个=='
            ,`Egret 加载资源主要使用 egret.HttpRequest 类。该类封装了在异步加载资源和通讯方面作为 H5 标准的 XMLHttpRequest 对象。本节讲解的主要是加载静态文件，分为两种类型：文本和二进制数据。加载静态文件的特点是可以进行进度跟踪。分为两种类型：文本和二进制数据。加载静态文件的特点是可以进行进度跟踪。`);

        testimg.y=250;
        testimg2.y=450;

        //textHeight


        //按钮以及事件--------------------------------------------------------------------
        let button = new eui.Button();
        button.label = "Click!";
         button.horizontalCenter = 0; //水平居中
        // button.verticalCenter = 0; //垂直居中
        this.addChild(button);
        button.y =testimg2.y + testimg2.mesMaxHeight;

        console.log('active',testimg2.y,testimg2.mesMaxHeight);


        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.testPoint, this);




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
            slotbody.setDisplay( this.slotBodyDefaultDisplay );//还原默认皮肤
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
        this.slotBodyDefaultDisplay=slotbody.rawDisplay; //缓存默认皮肤
        

        this.addChild(this.demoDragonBonesArmaturedisplay);

        this.demoDragonBonesArmaturedisplay.y= 575;
        this.demoDragonBonesArmaturedisplay.animation.timeScale = 0.5;

        this.demoDragonBonesArmaturedisplay.animation.play('jump');//播放龙骨动画



    }




}