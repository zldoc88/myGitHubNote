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


	public mesMaxHeight;
	protected title;
	protected content;
	protected pic;
	protected itemBtn;
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

		/**
		 * 动态布局 ---------------------------------------------------------------
		 */
		//lineSpacing 5
		//numLines 8
		//textHeight 195 
		//size 20
		//160 + 35
		var maxTextHeight = this.content.textHeight;
		this.itemBtn.y = ( this.content.y  +maxTextHeight  ) + 20;
		this.mesMaxHeight = this.itemBtn.y + this.itemBtn.height;
		console.log('this.mesMaxHeight',this.mesMaxHeight ,this.itemBtn.height);
		this.g.play(); //播放动画组
	}
	
}