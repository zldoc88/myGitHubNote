class menu1 extends  egret.Sprite{

    public static CLASSNAME: string = "menu1";

    public constructor() {
        super();
    }



    public icon1=null;
    public icon2=null;
    public icon3=null; //menu1_icon_3_png
    public icon4=null; //menu1_icon_4_png

    public icon2_pic=null;
    public icon3_pic=null;
    public icon4_pic=null;



    public menuIcon1=null;
    public menuIcon2=null;
    public menuIcon3=null;
    public menuIcon4=null;
    public configTES=null;

    public pic1=null;
    public pic2=null;
    public btn=null;
    public tip1=null;
    public tip2=null;
    public changeBtn=null;
    public button=null;

    public comfirm=null;

    public DrawContainer={
        beij:{}
        ,taiy:{}
       , renwu:{}
       , neir:{}
       , erweima:{}
       , erweitext:{}
    };

    //todo 开始场景
    public  init(){
        this.initStart();
    }
    public  initStart(){
        Game.publicBookFace.visible=false;
        Game.publicBlackgroud.visible=true;
        this.visible=true;

        //todo @绘制导出==========背景===============
        this.DrawContainer.beij.url = new egret.RenderTexture();   //建立缓冲画布
        this.DrawContainer.beij.url.drawToTexture(this.stage, new egret.Rectangle(0, 0, Game.sys.width, Game.sys.height));

        //线
        var icon1:egret.Texture = RES.getRes( "menu1_icon_1_png" );
        this.icon1= new egret.Bitmap( icon1 );
        this.addChild(this.icon1);
        this.icon1.x=32;
        this.icon1.y=100;

        this.configTES=Game.CONFIG['menu1'];

        // menu1_icon_2_png 主播头像 旋转
        this.icon2=new egret.Sprite();

        var icon2:egret.Texture = RES.getRes( "menu1_icon_2_png" );
        var icon2_bg= new egret.Bitmap( icon2 );
        this.icon2.addChild(icon2_bg);
        this.icon2.width = icon2_bg.width;
        this.icon2.height = icon2_bg.height;

        var icon2DefaultX = 110;
        var icon2DefaultY = 188;
        var icon2CenterX = this.icon2.width/2;
        var icon2CenterY = 0;
        this.icon2.anchorOffsetX  =   icon2CenterX;
        this.icon2.anchorOffsetY  =   icon2CenterY;
        this.icon2.x  =  icon2DefaultX + icon2CenterX;
        this.icon2.y  =  icon2DefaultY + icon2CenterY;

        var icon2_pic_index = Game.getRadomMun(0,this.configTES.left_icon.images.length-1);
        var icon2_pic_url = this.configTES.left_icon.images[icon2_pic_index];
        this.icon2_pic=new mask();
        this.icon2.addChild(this.icon2_pic);
        this.icon2_pic.init(this.configTES.left_icon.width ,this.configTES.left_icon.height ,icon2_pic_url);
        this.icon2_pic.x=20;
        this.icon2_pic.y=148;


        this.addChild(this.icon2);



        //小音频1
        this.icon3=new egret.Sprite();
        var icon3:egret.Texture = RES.getRes( "menu1_icon_3_png" );
        var icon3_bg= new egret.Bitmap( icon3 );
        this.icon3.addChild(icon3_bg);
        this.icon3.width = icon3_bg.width;
        this.icon3.height = icon3_bg.height;

        var icon3DefaultX = 368;
        var icon3DefaultY = 236;
        var icon3CenterX = this.icon3.width/2;
        var icon3CenterY = 0;
        this.icon3.anchorOffsetX  =   icon3CenterX;
        this.icon3.anchorOffsetY  =   icon3CenterY;
        this.icon3.x  =  icon3DefaultX + icon3CenterX;
        this.icon3.y  =  icon3DefaultY + icon3CenterY;

        var icon3_pic_index = Game.getRadomMun(0,this.configTES.middle_icon.images.length-1);
        var icon3_pic_url = this.configTES.middle_icon.images[icon3_pic_index];
        this.icon3_pic=new mask();
        this.icon3.addChild(this.icon3_pic);
        this.icon3_pic.init(this.configTES.middle_icon.width ,this.configTES.middle_icon.height ,icon3_pic_url);
        this.icon3_pic.x=14;
        this.icon3_pic.y=112;
        this.icon3_pic.alpha=0.5;


        this.addChild(this.icon3);


        //小音频2
        this.icon4=new egret.Sprite();
        var icon4:egret.Texture = RES.getRes( "menu1_icon_4_png" );
        var icon4_bg= new egret.Bitmap( icon4 );
        this.icon4.addChild(icon4_bg);

        var icon4DefaultX = 541;
        var icon4DefaultY = 222;
        var icon4CenterX = this.icon4.width/2;
        var icon4CenterY = 0;
        this.icon4.anchorOffsetX  =   icon4CenterX;
        this.icon4.anchorOffsetY  =   icon4CenterY;
        this.icon4.x  =  icon4DefaultX + icon4CenterX;
        this.icon4.y  =  icon4DefaultY + icon4CenterY;

        var icon4_pic_index = Game.getRadomMun(0,this.configTES.right_icon.images.length-1);
        var icon4_pic_url = this.configTES.right_icon.images[icon4_pic_index];
        this.icon4_pic=new mask();
        this.icon4.addChild(this.icon4_pic);
        this.icon4_pic.init(this.configTES.right_icon.width ,this.configTES.right_icon.height ,icon4_pic_url);
        this.icon4_pic.x=14;
        this.icon4_pic.y=79;
        this.icon4_pic.alpha=0.5;

        this.addChild(this.icon4);

        //todo 换一批 change_radom_btn_png
        var changeBtn:egret.Texture = RES.getRes( "change_radom_btn_png" );
        this.changeBtn= new egret.Bitmap( changeBtn );
        this.addChild(this.changeBtn);
        this.changeBtn.x=(Game.sys.width - this.changeBtn.width) /2 + 148;
        this.changeBtn.y=210; //d:544 , t:205



        // 人物、月球
        var pic1:egret.Texture = RES.getRes( "menu1_merger_json.menu-pic-1" );
        this.pic1= new egret.Bitmap( pic1 );
        this.addChild(this.pic1);
        this.pic1.x=(Game.sys.width - this.pic1.width) /2;
        this.pic1.y=544; //d:544 , t:205

        // 太阳
        var pic2:egret.Texture = RES.getRes( "menu1_merger_json.menu-pic-2" );
        this.pic2= new egret.Bitmap( pic2 );
        this.addChild(this.pic2);
        //this.pic2.x=450;
        //this.pic2.y=55;
        this.pic2.alpha=0;
        var pic2DefaultX = 450;
        var pic2DefaultY = 55;
        var pic2CenterX = this.pic2.width/2;
        var pic2CenterY = this.pic2.height/2;
        this.pic2.anchorOffsetX  =   pic2CenterX;
        this.pic2.anchorOffsetY  =   pic2CenterY;
        this.pic2.x  =  pic2DefaultX + pic2CenterX;
        this.pic2.y  =  pic2DefaultY + pic2CenterY;


        //长按录音
        var btn:egret.Texture = RES.getRes( "menu_public_merger_json.menu-btn-1" );
        this.btn= new egret.Bitmap( btn );
        this.addChild(this.btn);
        this.btn.x=(Game.sys.width - this.btn.width) /2;
        this.btn.y=1030;
        //this.btn.visible=false;


        //提示文字1
        var tip1:egret.Texture = RES.getRes( "menu_public_merger_json.menu-text-1" );
        this.tip1= new egret.Bitmap( tip1 );
        this.addChild(this.tip1);
        this.tip1.x=118;
        this.tip1.y=548;

        //提示文字2
        var tip2:egret.Texture = RES.getRes( "menu_public_merger_json.menu-text-2" );
        this.tip2= new egret.Bitmap( tip2 );
        this.addChild(this.tip2);
        this.tip2.x=470;
        this.tip2.y=480;

        var button:egret.Texture = RES.getRes( "menu_public_merger_json.public-m-icon-5" );
        this.button= new egret.Bitmap( button );
        this.addChild(this.button);
        this.button.x=498;
        this.button.y=995;
        this.button.visible=false;



        //todo添加
       /* var menuIcon1:egret.Texture = RES.getRes( "menu_public_merger_icon_json.public-m-icon-1" );
        this.menuIcon1= new egret.Bitmap( menuIcon1 );
        this.addChild(this.menuIcon1);
        this.menuIcon1.x=145;
        this.menuIcon1.y=900;
        this.menuIcon1.visible=false;

        var menuIcon2:egret.Texture = RES.getRes( "menu_public_merger_icon_json.public-m-icon-2" );
        this.menuIcon2= new egret.Bitmap( menuIcon2 );
        this.addChild(this.menuIcon2);
        this.menuIcon2.x=265;
        this.menuIcon2.y=900;
        this.menuIcon2.visible=false;

        var menuIcon3:egret.Texture = RES.getRes( "menu_public_merger_icon_json.public-m-icon-3" );
        this.menuIcon3= new egret.Bitmap( menuIcon3 );
        this.addChild(this.menuIcon3);
        this.menuIcon3.x=385;
        this.menuIcon3.y=900;
        this.menuIcon3.visible=false;

        var menuIcon4:egret.Texture = RES.getRes( "menu_public_merger_icon_json.public-m-icon-4" );
        this.menuIcon4= new egret.Bitmap( menuIcon4 );
        this.addChild(this.menuIcon4);
        this.menuIcon4.x=505;
        this.menuIcon4.y=900;
        this.menuIcon4.visible=false;

        var button:egret.Texture = RES.getRes( "public_m_icon_5_png" );
        this.button= new egret.Bitmap( button );
        this.addChild(this.button);
        this.button.x=498;
        this.button.y=995;*/


        //提示录音中...
        this.comfirm=new egret.Sprite();
        this.comfirm.visible=false;
        this.comfirm.y=350;
        var w = this.comfirm.width = 300;
        var h = this.comfirm.height = 300;
        this.comfirm.x=(Game.sys.width - this.comfirm.width)/2;
        this.addChild(this.comfirm);
        var comfrimUI=new comfrim();
        this.comfirm.addChild(comfrimUI);
        comfrimUI.init(w,h,'录音中...');


        Game.back=()=>{
            this.changNext();
        };

        this.playAnim();


        this.btn.touchEnabled = true;
       // this.button.touchEnabled = true;
        this.icon2.touchEnabled = true;
        this.icon3.touchEnabled = true;
        this.icon4.touchEnabled = true;


        this.btn.addEventListener(egret.TouchEvent.	TOUCH_BEGIN,this.recordStart,this);
        this.btn.addEventListener(egret.TouchEvent.	TOUCH_END,this.recordEnd,this);

        this.icon2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playSound1,this);
        this.icon3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playSound2,this);
        this.icon4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playSound3,this);

        this.changeBtn.touchEnabled = true;
        this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeRadomOhter,this);

        this.initSound();
        Game.onReadyLoadThemeSound();



      //  this.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext,this);
    }

    private showComfirm(){
        this.comfirm.visible=true;
    }
    private hideComfirm(){
        this.comfirm.visible=false;
    }

    private recordStart(e){
        this.stopAllSound();
        Game.recordStart(e);
        this.showComfirm();
    };
    private recordEnd(e){
        /*//todo 测试
        this.hideComfirm();
        this.changStatue(e);
        return;*/

        Game.recordEnd(e,(url)=>{
            //切换场景
            if(url=='' || typeof url == 'undefined') {
                this.hideComfirm();
                return;
            }

            this.themeSound4 = new sound();
            this.themeSound4.init(url);
            Game.playRecord=function(){
                //加载音频
                this.playSound4();
            }.bind(this);

            this.hideComfirm();
            this.changStatue(e);
        });



    }

    //todo @音频对应信息 start
    private changeRadomOhter(){
        this.setRadomSound();
    }
    private soundsArray=[];
    private nameInfo_icon3={
        name:null
        ,age:null
    };
    private nameInfo_icon4={
        name:null
        ,age:null
    };
    private upDataItemInfo(sp ,data,isnull){

        if(this[isnull].name != null){
            this[isnull].name.text=data.name;
            this[isnull].age.text=data.age;
            return;
        }

        var y1 = isnull=='nameInfo_icon3'? 140 :100;
        var y2 = isnull=='nameInfo_icon3'? 170 :130;
        var w = isnull=='nameInfo_icon3'? sp.width : sp.width-30;
        //名字
        this[isnull].name = new egret.TextField();
        this[isnull].name.x = 0;
        this[isnull].name.y = y1;
        this[isnull].name.width = w;
        this[isnull].name.height = 30;
        this[isnull].name.textColor  = '0x1e59ae';
        this[isnull].name.textAlign = "center";
        this[isnull].name.text=data.name;
        this[isnull].name.size =26;
        sp.addChild(this[isnull].name);

        //年龄
        this[isnull].age = new egret.TextField();
        this[isnull].age.x = 0;
        this[isnull].age.y = y2;
        this[isnull].age.width = w;
        this[isnull].age.height = 30;
        this[isnull].age.textColor  = '0x1e59ae';
        this[isnull].age.textAlign = "center";
        this[isnull].age.text=data.age;
        this[isnull].age.size =26;
        sp.addChild(this[isnull].age);


    }
    //释放音频
    private dispostSound(){
        this.themeSound2=null;
        this.themeSound3=null;
    }
    //取同个数组不相同的两个元素
    private getNotSome(index,array){
        var _g= ()=>{
            var t =Game.getRadomMun(0,array.length-1);
            if(t == index)  return _g();
            return t;
        };
        return _g();

    }
    //读取音频 this.icon4
    private setRadomSound(){

        this.soundsArray = this.configTES.sounds||[];
        if(this.soundsArray.length==0) return;
        //停止所有音频
        this.stopAllSound();

        this.dispostSound();//释放音频
        var i= Game.getRadomMun(0,this.soundsArray.length-1);
        var j= this.getNotSome(i,this.soundsArray);
       // var j= Game.getRadomMun(0,this.soundsArray.length-1);
        /*
        age:"8岁"
        name :"小小"
        url:"images/1.mp3"
        */
        this.upDataItemInfo(this.icon3,this.soundsArray[i] ,'nameInfo_icon3');
        this.upDataItemInfo(this.icon4,this.soundsArray[j] ,'nameInfo_icon4');

        console.log('随机读取到音频1:',this.soundsArray[i]);
        console.log('随机读取到音频2:',this.soundsArray[j]);

        this.themeSound2=new sound();
        this.themeSound2.init(this.soundsArray[i].url);
        this.themeSound3=new sound();
        this.themeSound3.init(this.soundsArray[j].url);

    }
    private isInitFirstSound=false;

    //todo @音频对应信息 end

    private initSound(){

        //设置随机小朋友音频
        this.setRadomSound();

        if(!this.isInitFirstSound){
            this.themeSound1=new sound();
            this.themeSound1.init(this.configTES.left_icon.sound[0]);
            this.isInitFirstSound=true;
        }

        /*Game.initSound=(array)=>{
            console.log('Game.initSound');
            array=array||[];
            if(array[0]) {
                this.themeSound1=new sound();
                this.themeSound1.init(array[0]);
            }
            if(array[1]) {
                this.themeSound2=new sound();
                this.themeSound2.init(array[1]);
            }
            if(array[2]) {
                this.themeSound3=new sound();
                this.themeSound3.init(array[2]);
            }

        }*/
    }
    private isPlayind1=false;
    private isPlayind2=false;
    private isPlayind3=false;
    private isInitPlayind4=false;
    private isPlayind4=false;
    private themeSound1=null;
    private themeSound2=null;
    private themeSound3=null;
    private themeSound4=null; //录音的
    private  playSound1(){
        if(!this.isPlayind1){
            this.stopAllSound();
            this.playIconAnim();
            this.isPlayind1 =true;
            try {this.themeSound1.play()}catch (e){};
            return;
        }
        this.isPlayind1 =false;
        this.stopAllSound();
        try {this.themeSound1.stop()}catch (e){}

    }
    private  playSound2(){
        if(!this.isPlayind2){
            this.stopAllSound();
            this.playIconAnim2();
            this.isPlayind2 =true;
            try {this.themeSound2.play()}catch (e){};
            return;
        }
        this.isPlayind2 =false;
        this.stopAllSound();
        try {this.themeSound2.stop()}catch (e){}

    }
    private  playSound3(){

        if(!this.isPlayind3){
            this.stopAllSound();
            this.playIconAnim3();
            this.isPlayind3 =true;
            try {this.themeSound3.play()}catch (e){}
            return;
        }
        this.stopAllSound();
        this.isPlayind3 =false;
        try {this.themeSound3.stop()}catch (e){}

    }
    private  playSound4(){
        if(!this.isPlayind4){
            this.stopAllSound();
            this.isPlayind4 =true;
            try {this.themeSound4.play()}catch (e){}
            return;
        }
        this.stopAllSound();
        this.isPlayind4 =false;
        try {this.themeSound4.stop()}catch (e){}

    }
    private stopAllAnim(){
        egret.Tween.removeTweens(this.icon2);
        egret.Tween.removeTweens(this.icon3);
        egret.Tween.removeTweens(this.icon4);

        this.icon2.rotation=0;
        this.icon3.rotation=0;
        this.icon4.rotation=0;
    }
    private stopAllSound(){
        this.isPlayind1 =false;
        this.isPlayind2 =false;
        this.isPlayind3 =false;
        this.isPlayind4 =false;

        this.stopAllAnim();//停止全部摆动


        try {this.themeSound1.stop()}catch (e){}
        try {this.themeSound2.stop()}catch (e){}
        try {this.themeSound3.stop()}catch (e){}
        try {this.themeSound4.stop()}catch (e){}

    }


    private showMenuIcon(){
        /*this.menuIcon1.alpha=0;
        this.menuIcon2.alpha=0;
        this.menuIcon3.alpha=0;
        this.menuIcon4.alpha=0;

        this.menuIcon1.visible=true;
        this.menuIcon2.visible=true;
        this.menuIcon3.visible=true;
        this.menuIcon4.visible=true;

        var mi1T = egret.Tween.get(this.menuIcon1);
        mi1T.to({alpha:1},150).call(()=>{
            var mi1T2 = egret.Tween.get(this.menuIcon2);
            mi1T2.to({alpha:1},150).call(()=>{
                var mi1T3 = egret.Tween.get(this.menuIcon3);
                mi1T3.to({alpha:1},150).call(()=>{
                    var mi1T4 = egret.Tween.get(this.menuIcon4);
                    mi1T4.to({alpha:1},150).call(()=>{});
                });
            });
        });*/
    }
    private isReadyIMGandTEXT=false;
    private showContent(){

        //人物变淡
        var pic1Tw = egret.Tween.get(this.pic1);
        pic1Tw.to({alpha:0.3},350);


        //显示文字内容
        var t= new textMask();
        this.addChild(t);
        t.alpha=0;
        t.width=420;
        t.x = (Game.sys.width - t.width)/2;
        var text_index = Game.getRadomMun(0,this.configTES.content.length-1);
        var text_str = this.configTES.content[text_index];
        t.init('left',t.width,text_str);
        var textMaskContent = egret.Tween.get(t);

        textMaskContent.to({alpha:1},750).call(()=>{

            //todo @绘制导出=========内容================
            this.DrawContainer.neir.url = new egret.RenderTexture();   //建立缓冲画布
            this.DrawContainer.neir.url.drawToTexture(t, new egret.Rectangle(0, 0, Game.sys.width, Game.sys.height));
            this.DrawContainer.neir.x=t.x;
            this.DrawContainer.neir.y=0;

            //全部加载完成
            if(this.isReadyIMGandTEXT){
                this.exportImg();
                return;
            }
            this.isReadyIMGandTEXT=true;
        });

    }

    private  textFlow=null;
    private  changStatue(e){

        this.clearAllEvent();

        this.btn.visible=false;
        this.icon1.visible=false;
        this.icon2.visible=false;
        this.icon3.visible=false;
        this.icon4.visible=false;
        this.tip1.visible=false;
        this.tip2.visible=false;
        this.changeBtn.visible=false;
        this.pic2.alpha=1; //显示太阳
        this.pic1.y=544; //d:544 , t:205 背景上移

        //todo @绘制导出============太阳=============
        this.DrawContainer.taiy.url = new egret.RenderTexture();   //建立缓冲画布
        this.DrawContainer.taiy.url.drawToTexture(this.pic2, new egret.Rectangle(0, 0, Game.sys.width, Game.sys.height));
        this.DrawContainer.taiy.x=this.pic2.x;
        this.DrawContainer.taiy.y=this.pic2.y;
        this.DrawContainer.taiy.anchorOffsetX=this.pic2.anchorOffsetX;
        this.DrawContainer.taiy.anchorOffsetY=this.pic2.anchorOffsetY;

        this.showMenuIcon();


        var pic1TW = egret.Tween.get(this.pic1);
        pic1TW.to({y:205},750).call(()=>{

            //todo @绘制导出==========人物===============
            this.DrawContainer.renwu.url = new egret.RenderTexture();   //建立缓冲画布
            this.DrawContainer.renwu.url.drawToTexture(this.pic1, new egret.Rectangle(0, 0, Game.sys.width, Game.sys.height));
            this.DrawContainer.renwu.x=this.pic1.x;
            this.DrawContainer.renwu.y=205;

            this.showContent();
        });


        Game.onRecordComplecte((e)=>{
            this.showText(e.content);
            this.showQrcode(e.qrcode);
        });

        egret.Tween.removeTweens(this.icon2);
    }

    private qrcode=null;
    private exportImg(){

        var out = new exportImg();
        out.init(this.DrawContainer,(base64)=>{
            Game.saveStatueReady(base64);
        });

        /*console.log('this.DrawContainer',this.DrawContainer);
        var rt: egret.RenderTexture = new egret.RenderTexture();   //建立缓冲画布
        rt.drawToTexture(this.parent.parent, new egret.Rectangle(0, 0, Game.sys.width, Game.sys.height));  //将对象画到缓冲画布上（可指定画对象的某个区域，或画整个）
        var imageBase64:string = rt.toDataURL("image/png");
        Game.saveStatueReady(imageBase64);*/

    }
    private  drawImg(event:any){
        var img: egret.Texture = <egret.Texture>event;
        this.qrcode = new egret.Bitmap(img);
        this.addChild(this.qrcode);
        this.qrcode.x=190;
        this.qrcode.y=750;

        //todo @绘制导出==========二维码===============
        this.DrawContainer.erweima.url = new egret.RenderTexture();   //建立缓冲画布
        this.DrawContainer.erweima.url.drawToTexture(this.qrcode, new egret.Rectangle(0, 0, Game.sys.width, Game.sys.height));
        this.DrawContainer.erweima.x=this.qrcode.x;
        this.DrawContainer.erweima.y=this.qrcode.y;

        //全部加载完成
        if(this.isReadyIMGandTEXT){
            this.exportImg();
            return;
        }
        this.isReadyIMGandTEXT=true;
    }
    private showQrcode(src){
        RES.getResByUrl(src,this.drawImg,this,RES.ResourceItem.TYPE_IMAGE);
    }
    private showText(str){
        this.textFlow = new egret.TextField;
        this.textFlow.textAlign = egret.HorizontalAlign.CENTER;
        this.textFlow.width  = 330;
        this.textFlow.x  = 330;
        this.textFlow.y = 760;
        this.textFlow.textAlign = "left";
        this.textFlow.lineSpacing  = 5;
        this.textFlow.textFlow = (new egret.HtmlTextParser).parser(str);
        this.addChild( this.textFlow );

        //todo @绘制导出==========二维码文本===============
        this.DrawContainer.erweitext.url = new egret.RenderTexture();   //建立缓冲画布
        this.DrawContainer.erweitext.url.drawToTexture(this.textFlow, new egret.Rectangle(0, 0, Game.sys.width, Game.sys.height));
        this.DrawContainer.erweitext.x=this.textFlow.x;
        this.DrawContainer.erweitext.y=this.textFlow.y;

    }


    private playIconAnim(){

        //正在播放时
        if(this.isPlayind1){
            egret.Tween.removeTweens(this.icon2);
            this.icon2.rotation=0;
            return;
        }
        var t=8;
        var _go=()=>{
            var icon2TW = egret.Tween.get(this.icon2);
            icon2TW.to({rotation:t},1200);
            icon2TW.call(()=>{
                t=-t;
                _go();
            });
        };
        _go();
    }
    private playIconAnim2(){

        //正在播放时
        if(this.isPlayind2){
            egret.Tween.removeTweens(this.icon3);
            this.icon3.rotation=0;
            return;
        }
        var t=8;
        var _go=()=>{
            var icon3TW = egret.Tween.get(this.icon3);
            icon3TW.to({rotation:t},1200);
            icon3TW.call(()=>{
                t=-t;
                _go();
            });
        };
        _go();
    }
    private playIconAnim3(){

        //正在播放时
        if(this.isPlayind3){
            egret.Tween.removeTweens(this.icon4);
            this.icon4.rotation=0;
            return;
        }
        var t=8;
        var _go=()=>{
            var icon3TW = egret.Tween.get(this.icon4);
            icon3TW.to({rotation:t},1200);
            icon3TW.call(()=>{
                t=-t;
                _go();
            });
        };
        _go();
    }
    private  playAnim(){

        var _go2=()=>{
            var pic2TW = egret.Tween.get(this.pic2);
            pic2TW.set({rotation:0});
            pic2TW.to({rotation:360},2400).call(()=>{
                _go2();
            });
        }

        _go2();

    }

    private  clearAllTweens(){
        egret.Tween.removeTweens(this.icon2);
        egret.Tween.removeTweens(this.icon3);
        egret.Tween.removeTweens(this.icon4);
        egret.Tween.removeAllTweens();

    }
    private  clearAllEvent(){

        this.nameInfo_icon3={
            name:null
            ,age:null
        };
        this.nameInfo_icon4={
            name:null
            ,age:null
        };
        this.isInitFirstSound=false;

        this.btn.removeEventListener(egret.TouchEvent.	TOUCH_BEGIN,this.recordStart,this);
        this.btn.removeEventListener(egret.TouchEvent.	TOUCH_END,this.recordEnd,this);

        this.icon2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.playSound1,this);
        this.icon3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.playSound2,this);
        this.icon4.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.playSound3,this);

        this.changeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changeRadomOhter,this);
    }

    private changNext () {
        this.clearAllTweens();
        this.clearAllEvent();
        this.stopAllSound();
        history.back();

    }

}
