/**
 * Created by Administrator on 16-3-4.
 */
/*
 @ todo 主控制器
 */
app.controller('myCtrl', ['$scope', 'dataService', '$http',function($scope, dataService, $http) {

    $scope.MAP=dataService;


    //todo  自适应实现 ===============================================
    $scope.maxPX =54; //
    $scope.minPX = 0; //
    /*$scope.$on('ChangeMaxfontSizeEmit',function(evt,data){
        $scope.maxPX = data;
        $scope.$broadcast('ChangeMaxfontSizeCast',$scope.maxPX);
    });
    $scope.$on('ChangeMinfontSizeEmit',function(evt,data){
        $scope.minPX = data;
        $scope.$broadcast('ChangeMinfontSizeCast',$scope.minPX);
    });*/
    //todo 单位转换
    $scope.setPxToRem = function(px){
        return parseFloat(px)/$scope.maxPX+'rem';
    };

    //todo  自适应实现 end ===============================================

    //每个页面默认数据
    $scope.defaultPageData = {
        cansee:true,
        backgroundColor:'none',
        backgroundImg:'none'
    };
    //todo 当前页的数据

    $scope.ActivePageData={
        cansee:true,
        backgroundColor:'none',
        backgroundImg:'none'
    };
    console.log($scope.MAP);
   // $scope.MAP['pageMaps']=[];
    //$scope.MAP['pageMaps'][0]=$scope.ActivePageData ; //当前页面信息
    $scope.ActivePageData=$scope.MAP['pageMaps'][0] ; //当前页面信息
    console.log($scope.MAP);
    $scope.chooseActivePageIndex = 0; //todo 选择页面序列号
    $scope.selectedItem = null; //todo 选择组件 选择就是object
    $scope.chooseIndex=0; // todo 当前选择组件的序列号
    $scope.isSelectedItem = true; //todo 是否选择了某组件 触发快捷键
    $scope.theZIndex = 1; // z-index
    $scope.theId = 1; // tool id



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
            backgroundColor:'none',
            backgroundImg:'none'
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
    /*$scope.$watch('MAP.pageMaps',function(oldval,newval){
       // $scope.MAP['pageMaps']=newval;
    });*/

    //todo 切换页面 ==================================================
    $scope.choosePage = function(index){
        $scope.$applyAsync(function(){
            $scope.selectedItem = null;
            $scope.ActivePageData=$scope.MAP['pageMaps'][index];
            $scope.chooseActivePageIndex = index;
        });
    };

    //todo 不可视页面 ==================================================

    $scope.hidePage=function(index){
        $scope.$applyAsync(function(){
            $scope.MAP['pageMaps'][index]['cansee']=!$scope.MAP['pageMaps'][index]['cansee'];
        });
    };

    //todo 设置当前编辑组件的值===========================
    $scope.setComponentValue=function(strOrObecjt,val){
        if($scope.ActiveToolType != 'pick') return;
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

      //  $scope.$broadcast('ChangeSelectedItemDataCast',$scope.selectedItem);//当前选择组件广播
    };
    //todo 设置当前编辑组件的值===========================
    $scope.getComponentValue=function(keyName){
        if($scope.ActiveToolType != 'pick') return;
        return $scope.ActivePageData[$scope.selectedItem.type][$scope.chooseIndex][keyName];
    };

    //todo====================新加组件==========================

    $scope.getNewZIndex=function(){
        $scope.theZIndex++;
        return $scope.theZIndex;
    };
    $scope.getNewId=function(){
        $scope.theId++;
        return $scope.theId;
    };

    $scope.pushOneToActivePage=function(type,data){

       // console.log('::===pushOneToActivePage==');
        var onedata = data;
        onedata.id=$scope.getNewId();
        onedata.zIndex=$scope.getNewZIndex();
        onedata.type=type;

        $scope.ActivePageData[type] = (typeof $scope.ActivePageData[type] =="undefined") ? [] : $scope.ActivePageData[type];
        $scope.$applyAsync(function(){
            $scope.ActivePageData[type].push(onedata);
            $scope.chooseIndex=$scope.ActivePageData[type].length-1;
            $scope.selectedItem=$scope.ActivePageData[type][$scope.ActivePageData[type].length-1];
        });

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
        window.localStorage.setItem('MAP',JSON.stringify($scope.MAP));
        console.groupEnd();
    };
    //todo 保存数据 end ================================================


    //todo pickcolor emit 颜色上报
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
    /*$scope.$watch('ActivePageData.backgroundColor',function(newval,oldval){
        $scope.$applyAsync(function(){
            $scope.ActivePageData['backgroundColor']=newval;
            $scope.MAP['pageMaps'][$scope.chooseActivePageIndex]=$scope.ActivePageData;
        });
    });*/



    /*====todo================组件事件========================================*/
    //复制
    //复制收取通知
    $scope.$on('addNewOne', function(e, newval) {
        $scope.pushOneToActivePage(newval.type,newval);
    });

    $scope.copy=function(){
       // if($scope.selectedItem==null || !$scope.fouceSecen) return;
        $scope.copyItemCache = $scope.selectedItem;
        console.log('复制'+$scope.copyItemCache);
    };

    //粘贴
    $scope.paste=function(){
        if($scope.copyItemCache==null || !$scope.fouceSecen) return;

        if($scope.isCut){
            $scope.isCut=false;
            console.log('剪切>粘贴'+$scope.copyItemCache);
            $scope.copyItemCache = null; //清空剪切板
            $scope.selectedItem = null; //清空剪切板
            return;
        }
        console.log('复制>粘贴'+$scope.copyItemCache);
    };

    //剪切
    $scope.cut=function(){
        if($scope.selectedItem==null || !$scope.fouceSecen) return;
        $scope.isCut = true;
        $scope.copyItemCache = $scope.selectedItem;
        console.log('剪切'+$scope.copyItemCache);
    };

    //剪切
    $scope.deleComponent=function(){
        if($scope.ActiveToolType !='pick') return;
        $scope.$applyAsync(function(){
            $scope.ActivePageData[$scope.selectedItem.type].splice($scope.chooseIndex,1);
            $scope.selectedItem = null;
            $scope.MAP['pageMaps'][$scope.chooseActivePageIndex] = $scope.ActivePageData;
        });


    };



}]);