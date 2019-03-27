define(['angularAMD'],function(angularAMD){
    angularAMD.directive('drawTxt', ['$document','$compile',function($document,$compile) {

        return {
            link : function(scope,element,attr){
                var template = '<div class="fouce-region" id="animate_{{txt.type}}_{{txt.id}}" move-component setting="{{txt}}"' +
                                'ng-dblclick="writecontent()"' +
                                'style="width: {{setPxToRem(txt.width)}};height:{{setPxToRem(txt.height)}};"' +
                                'ng-click="chooseComponent(txt.type,txt.id)"   >' +
                                    '<div write-content=""  dblclick-event="{{txt.id}}"  style="text-align: {{txt.textAlign}};color: {{txt.color}};width: {{setPxToRem(txt.width)}};height:{{setPxToRem(txt.height)}};line-height:{{setPxToRem(txt.lineHeight)}};font-size:{{setPxToRem(txt.fontSize)}};font-style:{{txt.fontStyle}};font-weight:{{txt.fontWeight}};text-decoration:{{txt.textDecoration}};">' +
                                    '<div class="text-edit-result" ng-show="!isEditing" >{{txt.content}}</div><textarea ng-show="isEditing"  tabindex="0" contenteditable="true" style="width: 100%; height: 100%; resize: 0;" class="inEditing-elem" value="{{txt.content}}">{{txt.content}}</textarea></div>' +
                                '</div>'+
                                '<div class="reSetSize-LT actrl"  se-tresize setting="{{txt}}" ></div>'+
                                '<div class="reSetSize-T actrl"  vt-resize setting="{{txt}}" ></div>'+
                                '<div class="reSetSize-RT actrl"  sw-tresize setting="{{txt}}"  ></div>'+
                                '<div class="reSetSize-R actrl" hr-bresize setting="{{txt}}"  ></div>'+
                                '<div class="reSetSize-RB actrl" se-resize setting="{{txt}}" ></div>'+
                                '<div class="reSetSize-B actrl"  vb-resize setting="{{txt}}" ></div>'+
                                '<div class="reSetSize-LB actrl"  sw-bresize setting="{{txt}}" ></div>'+
                                '<div class="reSetSize-L actrl" hl-bresize setting="{{txt}}" ></div>'+
                                '<div class="actrl tool-rotate" comp-rotate setting="{{txt}}" ></div>';
                scope.setting =JSON.parse(attr['setting']);
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

    angularAMD.controller('settingfont', ['$scope', 'dataService', '$http',function($scope, dataService, $http) {
        $scope.isCheckAll = false;
        $scope.isCheckFontWeight= false;
        $scope.isCheckFontStyle= false;
        $scope.isCheckTextDecoration= false;
    }]);

    //属性修改面板
    angularAMD.directive('editerTxt', ['$document','$compile',function($document,$compile) {
        return {
            templateUrl:'scene/partials/textarea.html',
            link:function(scope,element,attr){

                scope.clearAllfontStyle=function(boole){
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

    //todo 输入文本 ==========================
    angularAMD.directive('writeContent', ['$document','$compile',function($document,$compile) {

        return {
            link : function(scope,element,attr){

                element.on('blur',function(){
                 //   scope.setComponentValue('content',this.innerText);
                });

            }
        }
    }]);

});