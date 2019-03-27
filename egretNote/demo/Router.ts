/**
 * 场景路由....
 */
class Router{

    private disable=false;

    public constructor(isAble:boolean){
        this.disable = isAble ? isAble : false;
    }

    private ROOTCALLNAME = 'ROOTCALLNAMEACTION_';

    private routerKeyName = 'private';

    private curlocationUrl = '';
    private routes = {};
    public RouterNames = [];

    public activePath = '';
    public prevPath = '';

    protected refresh(){
        this.prevPath=this.activePath;
        var t = location.hash.slice(1);
        this.activePath = t;
        var g = this.getPath(this.routerKeyName);
        this.activePath = g==null? '' : g;

        if(this.isHasAble(this.activePath)) {
            this.routes[this.ROOTCALLNAME+this.activePath]();
            return;
        }
    }

    protected isHasAble(itemPath){
        for(var t = 0;t<this.RouterNames.length;t++){
            if(this.RouterNames[t] == itemPath) return true;
        }
        return false;
    }

    private getPath(name){

        var reg = new RegExp(name + '\=[^#|^&]+','g');
        var res = [];
        res = this.activePath.match(reg);

        if(res !=null){
            var s = res[0];
            res = s.split('=');
            s = res[1];
        }else{ s = null}
        return s;
    }

    public init(){

        if(this.curlocationUrl!='') this.curlocationUrl=window.location.href;

        this.routerKeyName = this.disable ? 'page_random_key_'+parseInt((Math.random()*100).toString()).toString() : 'page';

        this.activePath = location.hash.slice(1);
        var g = this.getPath(this.routerKeyName);
        this.activePath = g==null? '' : g;

        if(!this.disable) window.addEventListener('hashchange',this.refresh.bind(this));
        if(!this.disable){
            if(this.activePath=='') {
                this.href(this.RouterNames[0]);
                return;
            }
            if(this.isHasAble(this.activePath)){
                /*Game.onChangeSenceComplecte({
                    from:''
                    ,to:this.activePath
                });*/
                this.routes[this.ROOTCALLNAME+this.activePath]();
                return;
            }
            this.href(this.RouterNames[0]);


        }
    }

    public route(path, callback) {
        this.routes[this.ROOTCALLNAME+path] = callback || function(){};
        if(!this.isHasAble(path)) this.RouterNames.push(path);

        if(this.disable&&this.RouterNames.length==1){
            this.routes[this.ROOTCALLNAME+this.RouterNames[0]]();
            return;
        }
        if(!this.disable&&this.activePath==path) {
            this.routes[this.ROOTCALLNAME+path]();
            return;
        }

    }

    public  href(urlPath){
        if(this.disable){
            this.routes[this.ROOTCALLNAME+urlPath]();
            return;
        }
        window.location.href=this.curlocationUrl +'#?'+ this.routerKeyName + '='+urlPath;
    }

}

