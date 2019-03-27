app.directive('drawFormdata', ['$document','$compile',function($document,$compile) {

    return {
        link : function(scope,element,attr){
            scope.setting =JSON.parse(attr['setting']);

            function inputHtml(type,list){
                var listhtml ='<div class="ads-row" ><div ng-if="formData.isShowLabel"  style="display: table-cell; vertical-align: top;white-space: nowrap;width: 1%;" ><label>{{formData.inputLable}}：</label></div>';
                    listhtml+=  '<div style="display: table-cell; vertical-align: top;width: 99%;height: {{setPxToRem(formData.height)}}" >';
                    listhtml+= '<label  ng-repeat="(k,items) in formData.list track by $index" ' ;
                    listhtml+=  'style="display: inline-block;display:{{formData.display}}"><input readonly="readonly" value="{{items.value}}" type="{{formData.tagType}}"/>{{items.label}}</label> ';
                    listhtml+='</div></div>';
                return listhtml;
            }
            function selectHtml(list){
                var listhtml ='<div class="ads-row" ><label ng-if="formData.isShowLabel"   style="display: table-cell; vertical-align: middle;white-space: nowrap;width: 1%;line-height: {{setPxToRem(formData.height)}}">{{formData.inputLable}}：</label>';
                    listhtml +='<select readonly="readonly" style="display: table-cell;width: 99%;height: {{setPxToRem(formData.height)}}"  >';
                    listhtml+= '<option ng-repeat="(k,items) in formData.list track by $index"  value="{{items.value}}">{{items.label}}</option>';
                    listhtml+='</select></div>';
                return listhtml;
            }

            function setItemFormName(){
                var tmp ='';
                 if(scope.setting.tagName=='input'){
                     //input 框
                     switch (scope.setting.tagType){
                         case 'radio':
                             tmp=inputHtml('radio',scope.setting.list);
                             break;
                         case 'text':
                             tmp+='<div class="ads-row" ><label ng-if="formData.isShowLabel"   style="display: table-cell; vertical-align: middle;white-space: nowrap;width: 1%;line-height: {{setPxToRem(formData.height)}}">{{formData.inputLable}}：</label>';
                             tmp+='<input readonly="readonly" placeholder="请输入{{formData.inputLable}}"  type="text" style="display: table-cell;width:99%;height:{{setPxToRem(formData.height)}};text-align: {{formData.textAlign}};color:{{formData.color}};;" /></div>';
                             break;
                         case 'checkbox':
                             tmp=inputHtml('checkbox',scope.setting.list);
                             break;
                     }
                     return tmp;
                 }
                if(scope.setting.tagName=='textarea'){
                    tmp+='<div class="ads-row" ><label ng-if="formData.isShowLabel"  style="display: table-cell; vertical-align: top;white-space: nowrap;width: 1%;">{{formData.inputLable}}：</label>';
                    tmp += '<textarea placeholder="请输入{{formData.inputLable}}" readonly="readonly" style="display: table-cell;width:99%;height:{{setPxToRem(formData.height)}};color:{{formData.color}};text-align: {{formData.textAlign}};"></textarea></div>';
                    return tmp;
                }
                if(scope.setting.tagName=='select'){
                    tmp=selectHtml(scope.setting.list);
                    return tmp;
                }

            }

            var template = '<div class="fouce-region" move-component setting="{{formData}}"  ng-click="chooseComponent(formData.type,formData.id)" >' +
                setItemFormName()+'</div>'+
                            '<div class="reSetSize-T actrl"  vt-resize setting="{{formData}}" ></div>'+
                            '<div class="reSetSize-R actrl" hr-bresize setting="{{formData}}"  ></div>'+
                            '<div class="reSetSize-B actrl"  vb-resize setting="{{formData}}" ></div>'+
                            '<div class="reSetSize-L actrl" hl-bresize setting="{{formData}}" ></div>';

            //todo 选择工具
            scope.isChooseMe=function(id){
                if(scope.selectedItem==null) return '';
                return id==scope.selectedItem.id ? 'active' : '';
            };

            scope.copyTool=function(){
                if( scope.ActiveToolType!=='pick') return;
                scope.setting =JSON.parse(attr['setting']);
                var newTool = scope.getCSS['copyTool'](scope.setting);
                scope.$emit('addNewOne',newTool);
            };


            var $template = angular.element(scope.PublicToolTMP+template);
            $compile($template)(scope);
            element.append($template);



        }
    }


}]);

app.controller('checkboxcontrl', ['$scope',function($scope) {
    $scope.checkedformAlign=function(keyname,val){
          $scope.$broadcast('checkboxLayoutItemCast',{keyname:keyname,val:val});
    };
}]);
app.directive('checkboxcontrlDir', ['$document','$compile',function($document,$compile){
    return {
        link:function(scope,element,attr){
            scope.$on('checkboxLayoutItemCast',function(evt,data){
                scope.setComponentValue(data.keyname,data.val);
            });
        }
    }
}]);
app.controller('inputlist', ['$scope',function($scope) {
    $scope.itemlist = [];
    $scope.isCheckLayoutAngin = false;


    $scope.$watch('itemlist',function(newval,oldval){
        $scope.itemlist = newval;
    });
    $scope.deleItem=function(k){
        $scope.itemlist.splice(k,1);
        $scope.$broadcast('changeItemCast',$scope.itemlist);
    };
    $scope.addItem=function(){
        $scope.itemlist.push({
            value:'',label:''
        });
        $scope.$broadcast('changeItemCast',$scope.itemlist);
        console.log('==addItem===');
    };

    $scope.inputValue=function(e,key){
        $scope.itemlist[key].value = e.target.value;
        $scope.itemlist[key].label = e.target.value;
        $scope.$broadcast('changeItemCast',$scope.itemlist);
    }

}]);
app.directive('inputlist', ['$document','$compile',function($document,$compile) {
    return{
        link:function(scope,element,attr){
            scope.itemlist = JSON.parse(attr['setting']);
            scope.$on('changeItemCast',function(evt,data){
                scope.itemlist = data;
                scope.$emit('formdatalistEmit',scope.itemlist);
            });
        }
    }

}]);


app.directive('editerText', ['$document','$compile',function($document,$compile) {
    return {
        templateUrl:'scene/partials/formdata_text.html',
        link:function(scope,element,attr){

            scope.clearAllfontStyle=function(boole){
                console.log(boole);
                var def= boole ? {
                    fontStyle: 'none',
                    fontWeight:  'none',
                    textDecoration: 'none'
                }:{
                    fontStyle: scope.selectedItem.fontStyle,
                    fontWeight: scope.selectedItem.fontWeight,
                    textDecoration:scope.selectedItem.textDecoration
                };
            };

            scope.checkedItem=function(isChecked,options,val){

                if(typeof isChecked=="string"){
                    scope.setComponentValue(options,val);
                    return
                }

                if(typeof options == "undefined"){
                    // clear all
                    scope.setComponentValue(isChecked?{
                        fontStyle: 'none',
                        fontWeight:  'none',
                        textDecoration: 'none'
                    }:{
                        fontStyle: scope.selectedItem.fontStyle,
                        fontWeight: scope.selectedItem.fontWeight,
                        textDecoration:scope.selectedItem.textDecoration
                    });
                    scope.isCheckFontWeight= false;
                    scope.isCheckFontStyle= false;
                    scope.isCheckTextDecoration= false;
                    return;
                }
                scope.setComponentValue(options,isChecked ? val : 'none');
            };

            scope.checkedItemFontAlign = function(options,val){
                scope.setComponentValue(options,val);
            }

        }
    }
}]);

app.directive('editerRadio', ['$document','$compile',function($document,$compile) {
    return {
        templateUrl:'scene/partials/formdata_radio.html',
        link:function(scope,element,attr){

        }
    }
}]);
app.directive('editerCheckbox', ['$document','$compile',function($document,$compile) {
    return {
        templateUrl:'scene/partials/formdata_checkbox.html',
        link:function(scope,element,attr){

        }
    }
}]);
app.directive('editerSelect', ['$document','$compile',function($document,$compile) {
    return {
        templateUrl:'scene/partials/formdata_select.html',
        link:function(scope,element,attr){

        }
    }
}]);
app.directive('editerTextarea', ['$document','$compile',function($document,$compile) {
    return {
        templateUrl:'scene/partials/formdata_textarea.html',
        link:function(scope,element,attr){
            scope.clearAllfontStyle=function(boole){
                console.log(boole);
                var def= boole ? {
                    fontStyle: 'none',
                    fontWeight:  'none',
                    textDecoration: 'none'
                }:{
                    fontStyle: scope.selectedItem.fontStyle,
                    fontWeight: scope.selectedItem.fontWeight,
                    textDecoration:scope.selectedItem.textDecoration
                };
            };

            scope.checkedItem=function(isChecked,options,val){

                if(typeof isChecked=="string"){
                    scope.setComponentValue(options,val);
                    return
                }

                if(typeof options == "undefined"){
                    // clear all
                    scope.setComponentValue(isChecked?{
                        fontStyle: 'none',
                        fontWeight:  'none',
                        textDecoration: 'none'
                    }:{
                        fontStyle: scope.selectedItem.fontStyle,
                        fontWeight: scope.selectedItem.fontWeight,
                        textDecoration:scope.selectedItem.textDecoration
                    });
                    scope.isCheckFontWeight= false;
                    scope.isCheckFontStyle= false;
                    scope.isCheckTextDecoration= false;
                    return;
                }
                scope.setComponentValue(options,isChecked ? val : 'none');
            };

            scope.checkedItemFontAlign = function(options,val){
                scope.setComponentValue(options,val);
            }
        }
    }
}]);






