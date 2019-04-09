class itemTool extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}


	protected title;
	protected content;
	protected pic;
	protected g;

	public setItemGrerger(strname ,strvalue){

		this.title.text = strname;
		this.content.text = strvalue;
		this.pic.source = 'bg_jpg';
		//console.log(this.pic);

		//todo @1变量设置循环 ==========================
		//this.btnTween['props'] = {loop:true}; 

		//todo @2 emxl 添加循环属性=====================
		//tween:TweenItem 节点添加下面标签设置是否循环
		// <tween:props>
		// 		<e:Object loop="{true}" />
		// </tween:props>

		//console.log('this.g',this.g);
		this.g.play(); //播放动画组
	}
	
}