class page extends  egret.Sprite{

    public static CLASSNAME: string = "page";

    public constructor() {
        super();
    }



    public contentText=null;
    public button=null;

    //todo 开始场景
    public  init(){
        this.initStart();
    }
    public  initStart(){
        Game.publicBookFace.visible=false;
        Game.publicBlackgroud.visible=true;
        this.visible=true;

        var contentText:egret.Texture = RES.getRes( "page_content_img_png" );
        this.contentText= new egret.Bitmap( contentText );
        this.addChild(this.contentText);
        this.contentText.x=(Game.sys.width - this.contentText.width) /2;
        this.contentText.y=284;
        this.contentText.alpha=0;

        var button:egret.Texture = RES.getRes( "public_m_icon_6_png" );
        this.button= new egret.Bitmap( button );
        this.addChild(this.button);
        this.button.x=498;
        this.button.y=995;

        this.showContentText();

        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext,this);




    }

    private  showContentText(){
        var menuTW = egret.Tween.get(this.contentText);
        menuTW.to({alpha:1},350);
    }

    private clearEvents(){
        this.button.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changNext,this);
    }
    private clearAllTweens(){}
    private tagerManager(e: egret.TouchEvent){
        var daterEvent:changeViewEvent = new changeViewEvent(changeViewEvent.CHANGE_SCENE_EVENT);
        daterEvent.eventType=changeViewEvent.CHANGE_SCENE_EVENT;
        daterEvent.obj = this;
        return daterEvent;
    }


    private changNext (e: egret.TouchEvent) {
        var daterEvent = this.tagerManager(e);
        daterEvent.targetPage = page1.CLASSNAME;
        //男朋友发送要求
        this.dispatchEvent(daterEvent);
        this.clearEvents();
        this.clearAllTweens();
    }

}
