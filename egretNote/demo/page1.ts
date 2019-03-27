class page1 extends  egret.Sprite{

    public static CLASSNAME: string = "page1";

    public constructor() {
        super();
    }



    public title=null;
    public menu1=null;
    public menu2=null;
    public menu3=null;
    public menu4=null;
    //todo 开始场景
    public  init(){
        this.initStart();
    }
    public  initStart(){
        Game.publicBookFace.visible=false;
        Game.publicBlackgroud.visible=true;
        this.visible=true;

        var menu1:egret.Texture = RES.getRes( "catalogue_json.menu-1" );
        this.menu1= new egret.Bitmap( menu1 );
        this.addChild(this.menu1);
        this.menu1.x=(Game.sys.width - this.menu1.width) /2;
        this.menu1.y=164;
        this.menu1.alpha=0;


        var menu2:egret.Texture = RES.getRes( "catalogue_json.menu-2" );
        this.menu2= new egret.Bitmap( menu2 );
        this.addChild(this.menu2);
        this.menu2.x=(Game.sys.width - this.menu2.width) /2;
        this.menu2.y=390;
        this.menu2.alpha=0;

        var menu3:egret.Texture = RES.getRes( "catalogue_json.menu-3" );
        this.menu3= new egret.Bitmap( menu3 );
        this.addChild(this.menu3);
        this.menu3.x=(Game.sys.width - this.menu3.width) /2;
        this.menu3.y=605;
        this.menu3.alpha=0;

        var menu4:egret.Texture = RES.getRes( "catalogue_json.menu-4" );
        this.menu4= new egret.Bitmap( menu4 );
        this.addChild(this.menu4);
        this.menu4.x=(Game.sys.width - this.menu4.width) /2;
        this.menu4.y=818;
        this.menu4.alpha=0;

        this.showMenu1(()=>{
            this.showMenu2(()=>{
                this.showMenu3(()=>{
                    this.showMenu4();
                });
            });
        });


        this.menu1.touchEnabled = true;
        this.menu2.touchEnabled = true;
        this.menu3.touchEnabled = true;
        this.menu4.touchEnabled = true;
        //catalogue_png

        this.menu1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext1,this);
        this.menu2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext2,this);
        this.menu3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext3,this);
        this.menu4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext4,this);
    }

    private  showMenu1(fnc){
        var menuTW = egret.Tween.get(this.menu1);
        menuTW.to({alpha:1},350);
        menuTW.call(()=>{
            fnc();
        });
    }
    private  showMenu2(fnc){
        var menuTW = egret.Tween.get(this.menu2);
        menuTW.to({alpha:1},350);
        menuTW.call(()=>{
            fnc();
        });
    }
    private  showMenu3(fnc){
        var menuTW = egret.Tween.get(this.menu3);
        menuTW.to({alpha:1},350);
        menuTW.call(()=>{
            fnc();
        });
    }
    private  showMenu4(){
        var menuTW = egret.Tween.get(this.menu4);
        menuTW.to({alpha:1},350);
        //menuTW.call();
    }


    private clearEvents(){
        this.menu1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext1,this);
        this.menu2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext2,this);
        this.menu3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext3,this);
        this.menu4.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext4,this);
    }
    private clearAllTweens(){}
    private tagerManager(e: egret.TouchEvent){
        var daterEvent:changeViewEvent = new changeViewEvent(changeViewEvent.CHANGE_SCENE_EVENT);
        daterEvent.eventType=changeViewEvent.CHANGE_SCENE_EVENT;
        daterEvent.obj = this;
        return daterEvent;
    }


    private changNext1 (e: egret.TouchEvent) {
        var daterEvent = this.tagerManager(e);
        daterEvent.targetPage = menu1.CLASSNAME;
        //男朋友发送要求
        this.dispatchEvent(daterEvent);
        this.clearEvents();
        this.clearAllTweens();
    }
    private changNext2 (e: egret.TouchEvent) {
        var daterEvent = this.tagerManager(e);
        daterEvent.targetPage = menu2.CLASSNAME;
        //男朋友发送要求
        this.dispatchEvent(daterEvent);
        this.clearEvents();
        this.clearAllTweens();
    }
    private changNext3 (e: egret.TouchEvent) {
        var daterEvent = this.tagerManager(e);
        daterEvent.targetPage = menu3.CLASSNAME;
        //男朋友发送要求
        this.dispatchEvent(daterEvent);
        this.clearEvents();
        this.clearAllTweens();
    }
    private changNext4 (e: egret.TouchEvent) {
        var daterEvent = this.tagerManager(e);
        daterEvent.targetPage = menu4.CLASSNAME;
        //男朋友发送要求
        this.dispatchEvent(daterEvent);
        this.clearEvents();
        this.clearAllTweens();
    }

}
