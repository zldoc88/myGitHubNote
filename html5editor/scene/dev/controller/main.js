/**
 * Created by Administrator on 16-3-4.
 */
/*
 @ todo 主控制器
 */
define(['angularAMD'],function(angularAMD){

    angularAMD.controller('myCtrl', ['$scope', 'dataService', '$http','$animate','hotkeys',function($scope, dataService, $http ,$animate ,hotkeys ) {

        $scope.MAP=dataService['htmlResure'];
        $scope.systemResure=dataService['systemResure']||{}; //系统资源 [系统、用户] 用户权限[+-]通知，减少请求

        /**
         * todo 静态访问配置 start =================================
         * @type {{pageMaps: *[]}}
         */
        $scope.MAP={pageMaps:[{maxId:0}]};
        $scope.systemResure.images=[]; //图片库

        /** 静态访问配置 end @type {{pageMaps: *[]}}================ */

        $scope.Images=$scope.systemResure.images; //图片库
        $scope.Audio=$scope.systemResure.voices; //音频库
        $scope.Video=$scope.systemResure.videos; //视频库

        //todo 资源类型 ===============================================
        $scope.activeMedia=null; //用于选择后返回处理媒体文件
        //图片
        /**
         *
         * @param where 设置的地方
         * @param type  Images / Audio / Video
         * @param isPageOption 是否全局属性还是组件属性
         * 注意 chooseLibruary 方法主要是处理媒体修改及全局属性的添加编辑
         */
        //背景选择图片--------------------------------------------
        $scope.chooseLibruary=function(where,type,isGobleOption){
            $scope.activeMedia={
                mediaType :type
                ,setWhere :where
                ,isGobleOption : isGobleOption //是否是全局属性?
                ,isAdd : false
            };
            //todo isAdd 是否是组件添加  注意[false] 用户选择媒体后立即处理设置
            $scope.$broadcast('selectResuore.broadcast',{type:type}); //显示 Images / Audio / Video类型 选择完成 上报 $scope.activeEditResure(异步)
        };
        $scope.backgroundSounds=$scope.MAP.backgroundSounds;

        //todo 添加媒体组件==============================================
        //处理步骤 ，点击媒体工具=》选择媒体 =》点击场景添加媒体组件
        /**
         * 处理添加组件，或者编辑当前媒体的属性
         * @param Mediatype 媒体类型
         * @param type 添加或者编辑
         */
        $scope.addMedia=function(Mediatype){
            $scope.activeMedia={
                mediaType :Mediatype,
                isGobleOption : false, //是否是全局属性?
                isAdd : true //是否是全局属性?
            };
            //todo isAdd 是否是组件添加  注意[false] 用户选择媒体后立即处理设置
            $scope.$broadcast('selectResuore.broadcast',{type:Mediatype}); //显示 Images / Audio / Video类型 选择完成 上报 $scope.activeEditResure(异步)
        };

        // todo 统一接收用户选择媒体后的处理------------------------------------
        $scope.$on('modalCancelSetting.emit',function(evt,data){
            $scope.activeMedia = null;
            if($scope.ActiveToolType!='pick'){
                $scope.ActiveToolType ='pick';
                $scope.$broadcast('changeActiveToolType','pick');
            }
           // $scope.$broadcast('modalCancelSetting.broadcast',true); //向下通知=======取消操作
        });
        $scope.$on('onSelectMediaBack.emit',function(evt,data){
            if($scope.activeMedia.isAdd){
                //添加--待插入舞台
                //todo 注意，如果切换了工具类型要清除  $scope.activeMedia
                $scope.activeMedia.url = data.url;
                $scope.activeMedia.width = data.width;
                $scope.activeMedia.height = data.height;
                return;
            }
            // 立即处理返回的数据
            if($scope.activeMedia.isGobleOption){
                //全局设置--- 判断一下 setWhere
                //音乐是全局
                // 背景图片的多页面单独不唯一
                if($scope.activeMedia.setWhere=='backgroundSounds'){
                    $scope.MAP[$scope.activeMedia.setWhere]=data.url;
                    return;
                }
                $scope.ActivePageData[$scope.activeMedia.setWhere]=data.url;
                $scope.activeMedia =null;
                return;
            }
            $scope.setComponentValue($scope.activeMedia.setWhere,data.url);
            $scope.activeMedia =null;
        });

        //todo  添加媒体组件 end ===============================================

        console.log(dataService);
        //todo  自适应实现 ===============================================
        $scope.maxPX =54; //
        $scope.minPX = 0; //
        //todo 单位转换
        $scope.setPxToRem = function(px){
            return parseFloat(px)/$scope.maxPX+'rem';
        };

        //todo  自适应实现 end ===============================================

        //todo 当前页的数据
        $scope.apiKey=$scope.MAP['apiKey'];
        $scope.ActivePageData=$scope.MAP['pageMaps'][0];

        $scope.cursorOnInputText = false; //todo 组件文本输入状态
        $scope.pasteCache = null; //todo 组件文本输入状态
        $scope.chooseActivePageIndex = 0; //todo 选择页面序列号
        $scope.selectedItem = null; //todo 选择组件 选择就是object
        $scope.chooseIndex=0; // todo 当前选择组件的序列号
        $scope.isSelectedItem = true; //todo 是否选择了某组件 触发快捷键

        $scope.MaxPageId = $scope.MAP.MaxPageId; // save max id
        $scope.animationsOrder = $scope.MAP.MaxAnimationsOrder; // save max id
        $scope.theId = $scope.ActivePageData['maxId'];//页面id下的组件集合
        $scope.theZIndex = $scope.ActivePageData['maxIndex']; //页面z-index下的组件集合



        $scope.FouceOnScene = false; //鼠标点击的目标
        $scope.mouseFouceTargert = null; //鼠标点击的目标

        $scope.copyItemCache = null;

        $scope.isCut = false; //是否是剪切

        $scope.hidenTool = false; //是否隐藏工具面板
        $scope.$on('updataToolStute',function(evt,data){
            $scope.hidenTool = data;
            //向下广播数据
            $scope.$broadcast('changeHidenTool',$scope.hidenTool);
        });
        $scope.$on('ChangeFoucePoint',function(evt,data){
            $scope.foucePoint=data;
            //向下广播数据
            $scope.$broadcast('ChangeFoucePointCast',$scope.foucePoint);
        });





        //todo 工具类型=========================================================
        $scope.ActiveToolType = 'default'; //工具的类型 [cursor-default]
        // [cursor-move] 拖动
        // [cursor-pencil] 绘制图形
        // [cursor-txt] 文本
        // [cursor-circular] 圆形
        // [cursor-square] 正方形
        $scope.$on('updataActiveToolType',function(evt,data){
            $scope.ActiveToolType = data;
            $scope.selectedItem = null;
            //向下广播数据
            $scope.$broadcast('changeActiveToolType',$scope.ActiveToolType);
        });


        //焦点在舞台
        $scope.$on('isOnSence', function(e, newval) {
            $scope.FouceOnScene=newval;
        });

        //向下广播数据
        //$scope.$broadcast('windowTargertChange',$scope.windowTargert);

        //todo 添加页面==================================================

        $scope.addPage=function(){
            $scope.MAP['pageMaps'].push({
                cansee:true,
                backgroundColor:'rgba(255,255,255,1)',
                backgroundImg:'none',
                id:$scope.getPageId(),
                maxId: 0,
                maxIndex: 0,
                backgroundGradient:{
                    rotate :0,
                    color :[{color:'rgba(255,255,255,1)'},{color:'rgba(0,0,0,1)'}]
                },
                backgroundType:'color',
                prevPageEvent:'none',
                nextPageEvent:'none',
                animationForIn:'none',
                animationForOut:'none'
            });
            $scope.$applyAsync(function(){
                $scope.selectedItem = null; //todo 选择组件 选择就是object
                $scope.chooseActivePageIndex = $scope.MAP['pageMaps'].length-1;
                $scope.ActivePageData=$scope.MAP['pageMaps'][$scope.chooseActivePageIndex];//todo 当前页的数据
            });
        };

        //todo 删除页面 =================================================

        $scope.delePage=function(index,isActive){
            if($scope.MAP['pageMaps'].length==1) return;
            $scope.$applyAsync(function(){
                if(isActive){
                    $scope.selectedItem = null;
                    $scope.MAP['pageMaps'].splice(index,1);
                    $scope.chooseActivePageIndex=$scope.MAP['pageMaps'].length-1;
                    $scope.ActivePageData = $scope.MAP['pageMaps'][$scope.MAP['pageMaps'].length-1];
                }else{
                    $scope.MAP['pageMaps'].splice(index,1);
                    $scope.chooseActivePageIndex = $scope.chooseActivePageIndex -1;
                }

            });
        };

        //todo 切换页面 ==================================================
        $scope.choosePage = function(index){
            $scope.$applyAsync(function(){
                $scope.selectedItem = null;
                $scope.ActivePageData=$scope.MAP['pageMaps'][index];
                $scope.chooseActivePageIndex = index;
            });
        };

        $scope.$watch('chooseActivePageIndex',function(){
            $scope.$broadcast('ActivePageDataCast',$scope.ActivePageData);
        });

        //todo 页面排序结束==================================
        $scope.onSortPage=function($item, $partFrom , $partTo ,$part ,$indexFrom,$indexTo){
            if($indexFrom == $indexTo) return;
            if($indexFrom == $scope.chooseActivePageIndex){
                $scope.chooseActivePageIndex = $indexTo;
                return;
            }
            if($indexTo == $scope.chooseActivePageIndex){
                $scope.chooseActivePageIndex=$indexFrom;
            }
        };

        //todo 不可视页面 ==================================================

        $scope.hidePage=function(index){
            $scope.$applyAsync(function(){
                $scope.MAP['pageMaps'][index]['cansee']=!$scope.MAP['pageMaps'][index]['cansee'];
            });
        };

        //todo 设置当前编辑组件的值===========================
        $scope.setComponentValue=function(strOrObecjt,val){
            if($scope.ActiveToolType != 'pick' && $scope.ActiveToolType != 'editTexting' ) return;
            if(typeof  strOrObecjt == "string"){
                $scope.selectedItem[strOrObecjt]=val;
                $scope.$applyAsync(function(){

                    $scope.ActivePageData[$scope.selectedItem.type][$scope.chooseIndex][strOrObecjt] = val;
                    $scope.MAP['pageMaps'][$scope.chooseActivePageIndex]=$scope.ActivePageData;
                });
            }else{
                for(var i in strOrObecjt){
                    $scope.selectedItem[i]=strOrObecjt[i];
                    !function(i){
                        $scope.$applyAsync(function(){
                            $scope.ActivePageData[$scope.selectedItem.type][$scope.chooseIndex][i] = strOrObecjt[i];
                            $scope.MAP['pageMaps'][$scope.chooseActivePageIndex]=$scope.ActivePageData;
                        });
                    }(i);

                }

            }

        };
        //todo 设置当前编辑组件的值===========================
        $scope.getComponentValue=function(keyName){
            if($scope.ActiveToolType != 'pick') return;
            return $scope.ActivePageData[$scope.selectedItem.type][$scope.chooseIndex][keyName];
        };

        //todo====================新加组件==========================

        $scope.getPageId=function(){
            $scope.MaxPageId++;
            $scope.MAP.MaxPageId = $scope.MaxPageId;
            return $scope.MaxPageId;
        };
        $scope.getNewZIndex=function(){
            $scope.theZIndex=$scope.ActivePageData['maxIndex']; //当前页的最大index ++
            $scope.theZIndex++;
            $scope.ActivePageData.maxIndex= $scope.theZIndex;
            return $scope.theZIndex;
        };
        $scope.getNewId=function(){
            $scope.theId=$scope.ActivePageData['maxId']; //当前页的最大id ++
            $scope.theId++;
            $scope.ActivePageData.maxId= $scope.theId;
            return $scope.theId;
        };
        $scope.getNewAnimationsOrder=function(){
            $scope.animationsOrder++;
            $scope.MAP.MaxAnimationsOrder= $scope.animationsOrder;
            return $scope.animationsOrder;
        };


        $scope.pushOneToActivePage=function(type,data){

           // console.log('::===pushOneToActivePage==');
            var onedata = data;
            onedata.id=$scope.getNewId();
            onedata.zIndex=$scope.getNewZIndex();
            onedata.type=type;
            try{
                for(var k = 0; k<onedata['animations'].length ;k++){
                    onedata['animations'][k].component_id=onedata.id;
                    onedata['animations'][k].component_type=onedata.type;
                    onedata['animations'][k].component_cnName=onedata.cnName;
                    onedata['animations'][k].animationsOrder=$scope.getNewAnimationsOrder();
                }

            }catch (e){};


            $scope.$applyAsync(function(){
                $scope.ActivePageData[type] = (typeof $scope.ActivePageData[type] =="undefined") ? [] : $scope.ActivePageData[type];
                $scope.ActivePageData[type].push(onedata);
                $scope.chooseIndex=$scope.ActivePageData[type].length-1;
                $scope.selectedItem=$scope.ActivePageData[type][$scope.chooseIndex];

            });

            if($scope.ActiveToolType!='pick'){
                $scope.ActiveToolType = 'pick';
                $scope.$broadcast('changeActiveToolType','pick');
            }

            $scope.$broadcast('ChangeSelectedItemDataCast',$scope.selectedItem);
        };

        //todo 新加组件 end ================================================

        //todo====================选择组件==================================
        $scope.$watch('selectedItem',function(newval,olds){

            $scope.$applyAsync(function(){
                $scope.selectedItem = newval;
            });
            $scope.$broadcast('ChangeSelectedItemDataCast',$scope.selectedItem);
        });
        $scope.chooseComponent =function(type , id){
            if( $scope.ActiveToolType!=='pick') return;
            /*console.group('::选择组件');
            console.info('========chooseComponent=============');
            console.log('type='+type);
            console.log('id='+id);*/
            var item = null;
            for(var m=0;m<$scope.ActivePageData[type].length;m++){
                if(id == $scope.ActivePageData[type][m].id){
                    $scope.chooseIndex = m;
                    item = $scope.ActivePageData[type][m];
                    break;
                }
            }
            $scope.selectedItem=item;
            $scope.$broadcast('ChangeSelectedItemDataCast',$scope.selectedItem);//当前选择组件广播
           // console.groupEnd();
        };
        //todo 选择组件 end ================================================

        //todo 设置表单值 ==================================================
        $scope.$on('formdatalistEmit',function(evt,data){
            $scope.$applyAsync(function(){
                $scope.selectedItem.list = data;
                $scope.ActivePageData[$scope.selectedItem.type][$scope.chooseIndex] = $scope.selectedItem;
                $scope.MAP['pageMaps'][$scope.chooseActivePageIndex] = $scope.ActivePageData;
            });
        });
        $scope.setFormListData = function(){

        };
        //todo 设置表单值 end ==================================================

        //todo 保存数据 ================================================
        $scope.saveformData=function(){
            console.group('::保存数据========saveformData=============');
            console.log($scope.MAP);
         //   window.localStorage.setItem('MAP',JSON.stringify($scope.MAP));
            console.groupEnd();
            var globl_data={
                MaxAnimationsOrder: $scope.MAP.MaxAnimationsOrder,
                MaxPageId: $scope.MAP.MaxPageId,
                page_id:$scope.MAP.page_id,
                sence_id:$scope.MAP.sence_id,
                backgroundSounds:$scope.MAP.backgroundSounds,
                isWhowSoundsIcon:$scope.MAP.isWhowSoundsIcon,
                nextPageEvent:$scope.MAP.nextPageEvent,
                prevPageEvent:$scope.MAP.prevPageEvent,
                animationForOut:$scope.MAP.animationForOut,
                animationForIn:$scope.MAP.animationForIn
            },sence_page_info = $scope.MAP['pageMaps'];
            globl_data = JSON.stringify(globl_data);
            sence_page_info = JSON.stringify(sence_page_info);

            $http({
                method:'POST'
                ,url:'/index.php?a=Diy&m=update&ajax=1'
                ,headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                ,data:'sence_id='+$scope.MAP['sence_id']+'&page_id='+$scope.MAP['page_id']+'&page_global_info='+globl_data+'&page_info='+sence_page_info
            })
                .success(function(data, status, headers, config){
                    console.log(data);
                });

        };
        //todo 保存数据 end ================================================

        $scope.$on('playAnimate',function(evt,data){
            var itemsAnimate = document.getElementById('animate_'+data.type+'_'+data.id);
            itemsAnimate=angular.element(itemsAnimate);
            itemsAnimate.removeClass();
            itemsAnimate.addClass(data.animate.animateStyle + ' animated');
            itemsAnimate.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                angular.element(this).removeClass(data.animate.animateStyle + ' animated');
            });
        });

        $scope.$on('changeAnimateSetting.emit',function(evt,data){
            $scope.$broadcast('changeAnimateSetting.cast',data);
        });



        //todo pickcolor emit 颜色上报========================================
        $scope.$watch('selectedItem.color',function(newval,oldval){
            if($scope.ActiveToolType != 'pick' || $scope.selectedItem==null) return;
                $scope.setComponentValue('color',newval);
        });
        $scope.$watch('selectedItem.borderColor',function(newval,oldval){
            if($scope.ActiveToolType != 'pick' || $scope.selectedItem==null) return;
                $scope.setComponentValue('borderColor',newval);
        });
        $scope.$watch('selectedItem.backgroundColor',function(newval,oldval){
            if($scope.ActiveToolType != 'pick' || $scope.selectedItem==null) return;
                $scope.setComponentValue('backgroundColor',newval);
        });
        /*====todo================组件事件========================================*/
        //复制
        //复制收取通知
        $scope.$on('addNewOne', function(e, newval) {
           /* console.log('addNewOne'+newval.type);
            console.log($scope.activeMedia);*/
            if(newval.type == 'Images' || newval.type == 'Audio' || newval.type == 'Video') {
                if($scope.activeMedia==null) return;
                if($scope.activeMedia.url==''|| typeof $scope.activeMedia.url == 'undefined') return;
                newval.src = $scope.activeMedia.url;
                newval.width = $scope.activeMedia.width;
                newval.height = $scope.activeMedia.height;
            };

            $scope.pushOneToActivePage(newval.type,newval);
        });

        //todo 删除组件==============================================================
        $scope.deleComponent=function(){
            if($scope.ActiveToolType !='pick') return;
            $scope.$applyAsync(function(){
                $scope.ActivePageData[$scope.selectedItem.type].splice($scope.chooseIndex,1);
                $scope.selectedItem = null;
                $scope.MAP['pageMaps'][$scope.chooseActivePageIndex] = $scope.ActivePageData;
            });
        };

        //todo 删除动画 || 修改跟随 接收通知==================================================
         //取当前页所有事件========
        function getEventList(){
            var Events = _.filter($scope.ActivePageData,function(oName){  return typeof oName=='object' && Object.prototype.toString.call(oName) === '[object Array]'}); //查询是否是数组
            // 每个组件类型
            Events=_.flatten(Events,true); //转一维数组
            Events = _.filter(Events, function(num){return typeof num['events'] !=="undefined"; });// 查询存在 events
            Events =  _.pluck(Events, 'events');
            Events= _.flatten(Events);
            return Events;
        };

        function removeEventByActivePageData(data){
            var Events = getEventList();

            //取存在此动画的事件列表
            Events = _.filter(Events, function(num){
                return  num.doWhat=="transform" && num.compentEventType=="click" &&
                    num.transformTarget.component_id ==data.component_id &&
                    num.transformTarget.id ==data.id
            });

            //删除-----
            if(Events.length>0){
                _.each(Events,function(_item,k){

                    //取在此组件类型中的键值==
                    var indexOnType = _.findIndex($scope.ActivePageData[_item.component_type], {
                        id : _item.component_id
                    });
                    //取在此组件中event的键值==
                    var indexOnEvets = _.findIndex($scope.ActivePageData[_item.component_type][indexOnType]['events'], {
                        eventParentID:_item.eventParentID
                        ,animateWhatIdOnCompent : _item.animateWhatIdOnCompent
                        ,animateWhatTypeOnCompent : _item.animateWhatTypeOnCompent
                    });
                    $scope.ActivePageData[_item.component_type][indexOnType]['events'].splice(indexOnEvets,1);
                })
            }
        };
        $scope.$on('deleAnimationItem.emit',function(evt,data){
            $scope.$broadcast('deleAnimationItem.broadcast',data);
            if(data.animateStart=="event") removeEventByActivePageData(data);
        });
        $scope.$on('updataItemAnimation.emit',function(evt,data){
            $scope.$broadcast('updataItemAnimation.broadcast',data);
            //删除存在此动画设置过事件===
            if(data.oldData== "event"){
                data=data.setNew.item;
                removeEventByActivePageData(data);
            }

        });



        //todo ===========================热键============================================================================================================================================================================
        //接收鼠标输入状态
        $scope.$on('cursorOnInputTextChage',function(evt,data){
            $scope.ActiveToolType=data===true? 'editTexting':'pick';
            $scope.$broadcast('changeActiveToolType',$scope.ActiveToolType);
            $scope.cursorOnInputText = data;
        });
        //-----------粘贴-------------------
        hotkeys.add({
            combo: 'ctrl+v',
            description: '粘贴',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.pasteCache==null) return;
                var items = angular.copy($scope.pasteCache);//深克隆
                items['left']=parseFloat(items.left)+10;
                items['top']=parseFloat(items.top)+10;

                $scope.pushOneToActivePage(items.type,items);
            }
        });

        //-----------复制-------------------
        hotkeys.add({
            combo: 'ctrl+c',
            description: '复制',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null) return;
                $scope.pasteCache = angular.copy($scope.selectedItem);//深克隆
               // console.log('复制 ctrl+c');
            }
        });
        //-----------剪切-------------------
        hotkeys.add({
            combo: 'ctrl+x',
            description: '剪切',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null) return;
                $scope.pasteCache = angular.copy($scope.selectedItem);//深克隆
                $scope.deleComponent();
               // console.log('剪切 ctrl+x');
            }
        });
        //-----------编辑模式-------------------
        hotkeys.add({
            combo: 'v',
            description: '编辑模式',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.ActiveToolType!='pick'){
                    $scope.ActiveToolType ='pick';
                    $scope.$broadcast('changeActiveToolType','pick');
                }
               // console.log('编辑模式 v');
            }
        });
        //-----------向上移动-------------------
        hotkeys.add({
            combo: 'up',
            description: '向上移动',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null || $scope.ActiveToolType!='pick') return;
                var top=parseFloat($scope.selectedItem.top);
                top-=1;
                $scope.setComponentValue('top',top);
               // console.log('向上移动 up');
            }
        });
        hotkeys.add({
            combo: 'shift+up',
            description: '向上快速移动',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null || $scope.ActiveToolType!='pick') return;
                var top=parseFloat($scope.selectedItem.top);
                top-=20;
                $scope.setComponentValue('top',top);
               // console.log('向上快速移动 shift+up');
            }
        });

        //-----------向下移动-------------------
        hotkeys.add({
            combo: 'down',
            description: '向下移动',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null || $scope.ActiveToolType!='pick') return;
                var top=parseFloat($scope.selectedItem.top);
                top+=1;
                $scope.setComponentValue('top',top);
               // console.log('向下移动 down');
            }
        });
        hotkeys.add({
            combo: 'shift+down',
            description: '向下移动',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null || $scope.ActiveToolType!='pick') return;
                var top=parseFloat($scope.selectedItem.top);
                top+=20;
                $scope.setComponentValue('top',top);
               // console.log('向下移动 down');
            }
        });

        //-----------向左移动-------------------
        hotkeys.add({
            combo: 'left',
            description: '向左移动',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null || $scope.ActiveToolType!='pick') return;
                var left=parseFloat($scope.selectedItem.left);
                left-=1;
                $scope.setComponentValue('left',left);
                //console.log('向左移动 left');
            }
        });
        hotkeys.add({
            combo: 'shift+left',
            description: '向左移动',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null || $scope.ActiveToolType!='pick') return;
                var left=parseFloat($scope.selectedItem.left);
                left-=20;
                $scope.setComponentValue('left',left);
                //console.log('向左移动 left');
            }
        });

        //-----------向右移动-------------------

        hotkeys.add({
            combo: 'right',
            description: '向右移动',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null || $scope.ActiveToolType!='pick') return;
                var left=parseFloat($scope.selectedItem.left);
                left+=1;
                $scope.setComponentValue('left',left);
                //console.log('向右移动 right');
            }
        });
        hotkeys.add({
            combo: 'shift+right',
            description: '向右移动',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null || $scope.ActiveToolType!='pick') return;
                var left=parseFloat($scope.selectedItem.left);
                left+=20;
                $scope.setComponentValue('left',left);
                //console.log('向右移动 right');
            }
        });


        //-----------TAB------隐藏工具-------------

        hotkeys.add({
            combo: 'tab',
            description: '切换',
            callback: function(e) {
                e.preventDefault();
                if($scope.cursorOnInputText) return;
                $scope.hidenTool = !$scope.hidenTool; //是否隐藏工具面板
                $scope.$broadcast('changeHidenTool.broadcast',$scope.hidenTool);
                //console.log('切换 tab');
            }
        });

        //-----------esc------退出编辑模式-------------

        hotkeys.add({
            combo: 'esc',
            description: '退出编辑模式',
            callback: function(e) {
                e.preventDefault();
                if($scope.cursorOnInputText) return; //文本编辑中 无法退出
                if($scope.ActiveToolType!='default'){
                    if($scope.selectedItem!=null){
                        $scope.selectedItem=null;
                        $scope.$broadcast('ChangeSelectedItemDataCast',$scope.selectedItem);//当前选择组件广播
                    }
                    $scope.ActiveToolType ='default';
                    $scope.$broadcast('changeActiveToolType','default');
                }
               // console.log('退出编辑模式 esc');
            }
        });



        //-----------space------空格 滚动禁止-------------

        hotkeys.add({
            combo: 'space',
            description: '切换',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
              //  console.log('空格 space');
            }
        });



        //-----------删除-------------------
        hotkeys.add({
            combo: 'backspace',
            description: '←',
            callback: function(e,i) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null) return;
                $scope.deleComponent();
               // console.log('删除 backspace');
            }
        });

        //-----------删除-------------------
        hotkeys.add({
            combo: 'del',
            description: '删除',
            callback: function(e) {
                if($scope.cursorOnInputText) return;
                e.preventDefault();
                if($scope.selectedItem==null) return;
                $scope.deleComponent();
               // console.log('删除 del');
            }
        });




        //-----------保存-------------------
        hotkeys.add({
            combo: 'ctrl+s',
            description: '保存',
            callback: function(e) {
                e.preventDefault();
                $scope.saveformData();
                //console.log('保存 ctrl+s');
            }
        });



    }]);
});