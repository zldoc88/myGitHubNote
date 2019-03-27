define(['angularAMD'],function(angularAMD){

    angularAMD.directive('changeValue', ['$document','$compile',function($document,$compile) {
        return{
            link:function(scope,element,attr){

                /*element.on('input',function(){
                    scope.setComponentValue(attr['itemtype'],this.value);
                });*/
                element.on('change',function(){
                    scope.setComponentValue(attr['itemtype'],this.value);
                });


                scope.$watch('selectedItem.'+attr['itemtype'],function(newval,oldval){
                    element[0].value = attr['setting'];
                });
                scope.$on('ChangeSelectedItemDataCast',function(evt,data){
                    if(data==null) return;
                    element[0].value = parseInt(data[attr['itemtype']]);
                });

            }
        }
    }]);

    // 隐藏未解析dom
    angularAMD.directive('showOnchooles', ['$document','$compile',function($document,$compile) {
        return{
            link:function(scope,element,attrs){
                angular.element(element).css({display:'table'});
            }
        }
    }]);

    // 选择页面事件
    angularAMD.directive('selectPageevent', ['$document','$compile',function($document,$compile) {
        return{
            link:function(scope,element,attrs){
                scope.defaultPageEvent = [
                    {val:'none',title:'无'},
                    {val:'swiperTop',title:'向上滑动'},
                    {val:'swiperBottom',title:'向下滑动'},
                    {val:'swiperLeft',title:'向左滑动'},
                    {val:'swiperRight',title:'向右滑动'}
                ];
            }
        }
    }]);

     // 选择页面退出效果
    angularAMD.directive('pageanimateOut', ['$document','$compile',function($document,$compile) {
        return{
            link:function(scope,element,attrs){
                scope.defaultPageAnimateOut = [
                    {val:'none',title:'无'},
                    {val:'0',title:'从右边往左边平移'},
                    {val:'1',title:'从左边往右边平移'},
                    {val:'2',title:'从底部往顶部平移'},
                    {val:'3',title:'从顶部到底部平移'}
                    ,{val:'12',title:'从右往左推'}
                    ,{val:'13',title:'从左往右推'}
                    ,{val:'14',title:'从下往上推'}
                    ,{val:'15',title:'从上往下推'}
                    ,{val:'20',title:'缩小 / 放大'}
                    ,{val:'21',title:'放大 / 缩小'}
                    ,{val:'22',title:'左移 / 放大'}
                    ,{val:'23',title:'右移 / 放大'}
                    ,{val:'24',title:'上移 / 放大'}
                    ,{val:'25',title:'下移 / 放大'}
                    ,{val:'26',title:'缩小 / 放大'}
                    ,{val:'31',title:'右翻转'}
                    ,{val:'32',title:'左翻转'}
                    ,{val:'33',title:'上翻转'}
                    ,{val:'34',title:'下翻转'}
                    ,{val:'35',title:'撕书'}
                    ,{val:'36',title:'风车'}
                    ,{val:'37',title:'往左挤 / 左移'}
                    ,{val:'38',title:'往右挤 / 右移'}
                    ,{val:'39',title:'往上挤 / 上移'}
                    ,{val:'40',title:'往上挤 / 下移'}
                    ,{val:'41',title:'往左挤 / 从右翻上来'}
                    ,{val:'42',title:'往右挤 / 从左翻上来'}
                    ,{val:'43',title:'往上挤 / 从下翻上来'}
                    ,{val:'44',title:'往下挤 / 从上翻下来'}
                    ,{val:'45',title:'往左3D旋转 / 左移'}
                    ,{val:'46',title:'往右3D旋转 / 右移'}
                    ,{val:'47',title:'往上3D旋转 / 上移'}
                    ,{val:'48',title:'往下3D旋转 / 下移'}
                    ,{val:'49',title:'整体往右3D旋转'}
                    ,{val:'50',title:'整体往左3D旋转'}
                    ,{val:'51',title:'整体往下3D旋转'}
                    ,{val:'52',title:'整体往上3D旋转'}
                    ,{val:'53',title:'整体扇形往左旋转'}
                    ,{val:'54',title:'整体扇形往右旋转'}
                    ,{val:'55',title:'整体扇形往上旋转'}
                    ,{val:'56',title:'整体扇形往下旋转'}
                    ,{val:'57',title:'盒子左旋转'}
                    ,{val:'58',title:'盒子右旋转'}
                    ,{val:'59',title:'盒子上旋转'}
                    ,{val:'60',title:'盒子下旋转'}
                    ,{val:'61',title:'往左旋转木马'}
                    ,{val:'62',title:'往右旋转木马'}
                    ,{val:'63',title:'往上旋转木马'}
                    ,{val:'64',title:'往下旋转木马'}
                    ,{val:'65',title:'左退右进'}
                    ,{val:'66',title:'幻灯片'}
                ];

            }
        }
    }]);
    // 选择页面进入效果
    angularAMD.directive('pageanimateIn', ['$document','$compile',function($document,$compile) {
        return{
            link:function(scope,element,attrs){
                scope.defaultPageAnimateIn = [
                    {val:'none',title:'无'},
                    {val:'0',title:'从右边往左边平移'},
                    {val:'1',title:'从左边往右边平移'},
                    {val:'2',title:'从底部往顶部平移'},
                    {val:'3',title:'从顶部到底部平移'},
                    {val:'4',title:'从右边淡入'}
                    ,{val:'5',title:'从左边淡入'}
                    ,{val:'6',title:'从底部淡入'}
                    ,{val:'7',title:'从顶部淡入'}
                    ,{val:'8',title:'左淡右入'}
                    ,{val:'9',title:'右淡左入'}
                    ,{val:'10',title:'上淡下入'}
                    ,{val:'11',title:'下淡上入'}
                    ,{val:'12',title:'从右往左推'}
                    ,{val:'13',title:'从左往右推'}
                    ,{val:'14',title:'从下往上推'}
                    ,{val:'15',title:'从上往下推'}
                    ,{val:'16',title:'缩小 / 从右划入'}
                    ,{val:'17',title:'缩小 / 从左划入'}
                    ,{val:'18',title:'缩小 / 从下划入'}
                    ,{val:'19',title:'缩小 / 从上划入'}
                    ,{val:'20',title:'缩小 / 放大'}
                    ,{val:'21',title:'放大 / 缩小'}
                    ,{val:'22',title:'左移 / 放大'}
                    ,{val:'23',title:'右移 / 放大'}
                    ,{val:'24',title:'上移 / 放大'}
                    ,{val:'25',title:'下移 / 放大'}
                    ,{val:'26',title:'缩小 / 放大'}
                    ,{val:'27',title:'左边掉落 / 从右移入'}
                    ,{val:'28',title:'右边掉落 / 从左移入'}
                    ,{val:'29',title:'底部掉落 / 从上移入'}
                    ,{val:'30',title:'顶部掉落 / 从下移入'}
                    ,{val:'31',title:'右翻转'}
                    ,{val:'32',title:'左翻转'}
                    ,{val:'33',title:'上翻转'}
                    ,{val:'34',title:'下翻转'}
                    ,{val:'35',title:'撕书'}
                    ,{val:'36',title:'风车'}
                    ,{val:'37',title:'往左挤 / 左移'}
                    ,{val:'38',title:'往右挤 / 右移'}
                    ,{val:'39',title:'往上挤 / 上移'}
                    ,{val:'40',title:'往上挤 / 下移'}
                    ,{val:'41',title:'往左挤 / 从右翻上来'}
                    ,{val:'42',title:'往右挤 / 从左翻上来'}
                    ,{val:'43',title:'往上挤 / 从下翻上来'}
                    ,{val:'44',title:'往下挤 / 从上翻下来'}
                    ,{val:'45',title:'往左3D旋转 / 左移'}
                    ,{val:'46',title:'往右3D旋转 / 右移'}
                    ,{val:'47',title:'往上3D旋转 / 上移'}
                    ,{val:'48',title:'往下3D旋转 / 下移'}
                    ,{val:'49',title:'整体往右3D旋转'}
                    ,{val:'50',title:'整体往左3D旋转'}
                    ,{val:'51',title:'整体往下3D旋转'}
                    ,{val:'52',title:'整体往上3D旋转'}
                    ,{val:'53',title:'整体扇形往左旋转'}
                    ,{val:'54',title:'整体扇形往右旋转'}
                    ,{val:'55',title:'整体扇形往上旋转'}
                    ,{val:'56',title:'整体扇形往下旋转'}
                    ,{val:'57',title:'盒子左旋转'}
                    ,{val:'58',title:'盒子右旋转'}
                    ,{val:'59',title:'盒子上旋转'}
                    ,{val:'60',title:'盒子下旋转'}
                    ,{val:'61',title:'往左旋转木马'}
                    ,{val:'62',title:'往右旋转木马'}
                    ,{val:'63',title:'往上旋转木马'}
                    ,{val:'64',title:'往下旋转木马'}
                    ,{val:'65',title:'左退右进'}
                    ,{val:'66',title:'幻灯片'}
                ];


            }
        }
    }]);






    angularAMD.directive('stringToNumber', ['$document','$compile',function($document,$compile) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function(value) {
                    return parseFloat(value, 10);
                });
            }
        }
    }]);

});
