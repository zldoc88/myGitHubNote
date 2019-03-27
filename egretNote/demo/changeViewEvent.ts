/**
 * Created by Administrator on 2017/6/6.
 */

class changeViewEvent extends  egret.Event{

    public static CHANGE_SCENE_EVENT:string = "changesceneevent";
    public eventType:any;//事件类型
    public obj:any;//对象
    public targetPage:string='';//对象
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false){
        super(type,bubbles,cancelable);

    }

}