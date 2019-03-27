class GamgeStar extends  egret.Sprite{

    public static CLASSNAME: string = "GamgeStar";

    public constructor() {
        super();
    }


    public bookface=null;
    public title=null;
    public text1=null;
    public text2=null;
    public child=null;
    public btn=null;
    public logo=null;

    //todo 开始场景
    public  init(){
        this.initStart();
    }

    public  initStart(){

        Game.publicBlackgroud.visible=false;
        Game.publicBookFace.visible=true;



        var title:egret.Texture = RES.getRes( "home_manager_json.font-3" );
        this.title= new egret.Bitmap( title );
        this.addChild(this.title);
        this.title.x = (Game.sys.width - this.title.width)/2;
        this.title.y=142;
        this.title.alpha=0;



        var text1:egret.Texture = RES.getRes( "home_manager_json.font-1" );
        this.text1= new egret.Bitmap( text1 );
        this.addChild(this.text1);
        this.text1.x = (Game.sys.width - this.text1.width)/2;
        this.text1.y=208;
        this.text1.alpha=0;

        var text2:egret.Texture = RES.getRes( "home_manager_json.font-2" );
        this.text2= new egret.Bitmap( text2 );
        this.addChild(this.text2);
        this.text2.x = (Game.sys.width - this.text2.width)/2;
        this.text2.y=410;
        this.text2.alpha=0;

        var child:egret.Texture = RES.getRes( "home_manager_json.home-p1" );
        this.child= new egret.Bitmap( child );
        this.addChild(this.child);
        this.child.x = (Game.sys.width - this.child.width)/2;
        this.child.y=510;
        this.child.alpha=0;

        var btn:egret.Texture = RES.getRes( "home_manager_json.btn-1" );
        this.btn= new egret.Bitmap( btn );
        this.addChild(this.btn);
        var btnDefaultX = (Game.sys.width - this.btn.width)/2;
        var btnDefaultY = 928;
        var btnCenterX = this.btn.width/2;
        var btnCenterY = this.btn.height/2;
        this.btn.anchorOffsetX  =   btnCenterX;
        this.btn.anchorOffsetY  =   btnCenterY;
        this.btn.x  =  btnDefaultX + btnCenterX;
        this.btn.y  =  btnDefaultY + btnCenterY;

        this.btn.visible=false;
        this.btn.alpha=0;
        this.btn.touchEnabled = true;

        var logo:egret.Texture = RES.getRes( "home_manager_json.logo" );
        this.logo= new egret.Bitmap( logo );
        this.addChild(this.logo);
        this.logo.x = (Game.sys.width - this.logo.width)/2;
        this.logo.y=1010;
        this.logo.alpha=0;


        this.showMap();
    }

    private showTitle(fnc){
        var titleTW = egret.Tween.get(this.title);
       // titleTW.set({skewX:45,});//.call();
        titleTW.to({alpha:1},750);//.call();
        titleTW.call(fnc);
    };
    private showText1(fnc){
        var text1TW = egret.Tween.get(this.text1),tg=0;
        //text1TW.set({skewX:45,});
        text1TW.to({alpha:1},750);
        var _goLoop =()=>{
            var text1TW2 = egret.Tween.get(this.text1);
            text1TW2.to({skewY:(tg==0? 2 :0),skewX:tg},750);
            text1TW2.call(()=>{
                tg=tg==0? 2 :0;
                _goLoop();
            });
        };
        text1TW.call(()=>{
            fnc();
            //_goLoop();
        });
    };
    private showText2(fnc){
        var text1TW = egret.Tween.get(this.text2);
        text1TW.to({alpha:1},750);
        text1TW.call(()=>{
            fnc();
        });
    };
    private showChld(){
        var text1TW = egret.Tween.get(this.child);
        text1TW.to({alpha:1},2000);

    };

    private showBtn(fn){

        this.btn.visible=true;
        var text1TW = egret.Tween.get(this.btn);
        //text1TW.set({scaleX:16,scaleY:16});
        text1TW.to({alpha:1},750);

        var dc=0.95;
        var loopAnim=()=>{
            var text1TW2 = egret.Tween.get(this.btn); //,{ loop:true}
            text1TW2.to({scaleX:dc,scaleY:dc},750);
            text1TW2.call(()=>{
                dc =dc==1 ? 0.95:1;
                loopAnim();
            })
        };
        text1TW.call(()=>{
            loopAnim();
            fn();
        })
    };

    private showLogo(){
        var text1TW = egret.Tween.get(this.logo);
        var y = this.logo.y;
        text1TW.set({y:Game.sys.height});
        text1TW.to({alpha:1,y:y},1200);
    };


    public showMap(){
        //this.text1.alpha=0;
        //this.text2.alpha=0;
        //this.child.alpha=0;
        //this.btn.alpha=0;
        //this.logo.alpha=0;
        this.showTitle(()=>{});
        this.showText1(()=>{});
        this.showText2(()=>{});
        this.showBtn(()=>{
            this.allComplect();
        });
        this.showLogo();

        this.showChld();


    }

    public allComplect(){
        console.log('场景播放完成...');

        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext,this);

    }

    public clearAllTweens(){
        egret.Tween.removeTweens(this.btn);
        egret.Tween.removeTweens(this.text1);
        egret.Tween.removeTweens(this.text2);
        egret.Tween.removeTweens(this.child);
        egret.Tween.removeTweens(this.logo);
        this.btn.visible=false;

        this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext,this);
    }


    private changNext (e: egret.TouchEvent) {

        var daterEvent:changeViewEvent = new changeViewEvent(changeViewEvent.CHANGE_SCENE_EVENT);
        daterEvent.eventType=changeViewEvent.CHANGE_SCENE_EVENT;
        daterEvent.obj = this;
        daterEvent.targetPage = page.CLASSNAME;
        //男朋友发送要求
        this.dispatchEvent(daterEvent);

        this.clearAllTweens();
    }

}
