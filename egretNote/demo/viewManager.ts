/**
 * Created by Administrator on 2017/6/6.
 */

class viewManager extends  egret.Sprite{
    public static VIEWMANAGER:string = 'viewManager';

    public constructor() {
        super();
        this.init();

    }

    private book=null;

    private GamgeStar: GamgeStar; // 开始界面
    private page: page; // 前言
    private page1: page1; // 开始界面
    private menu1: menu1; //
    private menu2: menu2; //
    private menu3: menu3; //
    private menu4: menu4; //

    public p1 : any;
    public currentViewObject =null;
    public cacheViewObject : any;
    public targetPageName : any;


    private init (){

        this.GamgeStar = new GamgeStar();
        this.page = new page();
        this.page1 = new page1();
        this.menu1 = new menu1();
        this.menu2 = new menu2();
        this.menu3 = new menu3();
        this.menu4 = new menu4();

    }

    public playCallback=()=>{};
    public playBook(fnc){
        this.playCallback=fnc;

        Game.onChangeSenceStart({
            from:Game.Router.prevPath
            ,to:Game.Router.activePath
        });
       // 其他 页返回封面
        var AnimationName ='newAnimation';
        if(Game.Router.prevPath!='GamgeStar'&& Game.Router.activePath=='GamgeStar'){
            AnimationName ='reload';
            try {this.currentViewObject.visible=false}catch (e){};
        }

        //menu 页返回目录页
        if(Game.Router.prevPath!='page'&& Game.Router.activePath=='page1'){
            AnimationName ='reload';
            try {this.currentViewObject.visible=false}catch (e){};
        }
        //menu 页返回目录页
        if(Game.Router.prevPath!='GamgeStar'&& Game.Router.activePath=='page'){
            AnimationName ='reload';
            try {this.currentViewObject.visible=false}catch (e){};
        }

        if(Game.Router.activePath=='GamgeStar'){
            Game.publicBlackgroud.visible=false;
        }

       // var AnimationName =( Game.Router.prevPath!='GamgeStar'&& Game.Router.activePath=='GamgeStar') ? 'reload':'newAnimation';
        Game.book.play(AnimationName,-1,-1); //reload
        Game.book.armature.addEventListener( dragonBones.AnimationEvent.LOOP_COMPLETE, this.playBookComplet,this);
    }
    public playBookComplet(){
        var frameIndex = Game.book.armature.animation.animations['newAnimation'].frameCount;
        Game.book.armature.animation.gotoAndStopByFrame('newAnimation',-1);
        Game.book.armature.removeEventListener( dragonBones.AnimationEvent.LOOP_COMPLETE, this.playBookComplet,this);
        this.playCallback();
    }


    public start(){

        //todo 注册路由分配....
        this.initRouter(GamgeStar.CLASSNAME);
        this.initRouter(page.CLASSNAME);
        this.initRouter(page1.CLASSNAME);
        this.initRouter(menu1.CLASSNAME);
        this.initRouter(menu2.CLASSNAME);
        this.initRouter(menu3.CLASSNAME);
        this.initRouter(menu4.CLASSNAME);

        Game.Router.init();

    }

    private initRouter(path:string ){
        Game.Router.route(path,()=>{
            this.targetPageName = path;
            /*this.clearActiveAll(()=>{
                this.changNext();
            });*/


            //todo 路由开始页不做翻页效果
            if(Game.book==null) {
                this.clearActiveAll(()=>{
                    this.changNext();
                });
                return;
            }

            this.playBook(()=>{
                this.clearActiveAll(()=>{
                    this.changNext();
                });
            });


        });
    }

    public  onListenItem (root){
        root.addEventListener(changeViewEvent.CHANGE_SCENE_EVENT,this.onChangeView,this);
    }

    public outEventItem(root){
        root.removeEventListener(changeViewEvent.CHANGE_SCENE_EVENT,this.onChangeView,this);
    }

    //todo  清除当前页数据
    public  clearActiveAll(back){


        if(this.currentViewObject==null){
            back();
            return;
        }
        if( this.currentViewObject.parent )
        {
            this.currentViewObject.removeChildren();
            this.currentViewObject.parent.removeChild( this.currentViewObject );
        }
        back();
         return;


        var tw = egret.Tween.get(this.currentViewObject);
        tw.to({y : -this.stage.height,alpha:0},450);
        tw.call(()=>{
            egret.Tween.removeAllTweens(); //todo 参数是一个舞台对象.... removeTweens
            this.outEventItem(this.currentViewObject);//解除事件
            if( this.currentViewObject.parent )
            {
                this.currentViewObject.parent.removeChild( this.currentViewObject );
            }
            back();
        });


    }

    //todo 触发跳转
    public onChangeView(e:changeViewEvent){
        this.targetPageName = e.targetPage;
        Game.Router.href(e.targetPage);
    }

    //todo  进入下一页
    public changNext(){

        Game.onChangeSenceComplecte({
            from:Game.Router.prevPath
            ,to:Game.Router.activePath
        });


      //  console.log('this.targetPageName',this.targetPageName);
        this.currentViewObject = this[this.targetPageName];
      //  console.log('this.currentViewObject',this.currentViewObject);
       // this.currentViewObject =this[this.targetPageName];
        this.addChild(this.currentViewObject);
        this.onListenItem(this.currentViewObject);

        this.currentViewObject.x = 0;
        this.currentViewObject.y = 0;
        this.currentViewObject.init();
        return;

        this.currentViewObject.alpha = 0;


        this.currentViewObject.x = this.currentViewObject.anchorOffsetX=this.stage.stageWidth/2;
        this.currentViewObject.y = this.currentViewObject.anchorOffsetY=this.stage.stageHeight/2;

        var pageTW = egret.Tween.get(this.currentViewObject);
        pageTW.set({scaleX : 3, scaleY :3,alpha:0});

        this.currentViewObject.init();
        pageTW.to({scaleX : 1, scaleY :1,alpha:1},450);
        pageTW.call(()=>{

            this.currentViewObject.x = this.currentViewObject.anchorOffsetX=0;
            this.currentViewObject.y = this.currentViewObject.anchorOffsetY=0;
        })

    }








}
