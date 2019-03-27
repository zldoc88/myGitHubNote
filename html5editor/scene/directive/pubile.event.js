//快捷健设置
app.directive('pubileEvent', ['$document',function($document) {
    return {
        link:function(scope,element,attr){
            //接收主控制器广播选择的组件

            var keyEvent ={
                'Tab' : function(e){
                    //撤销返回上一步
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=Tab=隐藏工具面板');
                    console.groupEnd();
                    scope.hidenTool = (scope.hidenTool) ? false:true;
                    scope.$emit('updataToolStute',scope.hidenTool);

                }
                ,'Ctrl+Z' : function(e){
                    //撤销返回上一步
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=Ctrl+Z=撤销返回上一步');
                    console.groupEnd();
                }
                ,'Ctrl+R' : function(e){
                    //显示或隐藏标尺
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=Tab=显示或隐藏标尺');
                    console.groupEnd();
                    scope.hidenRuler = (scope.hidenRuler) ? false:true;
                    scope.$emit('updataRulerStute',scope.hidenRuler);
                }
                ,'Ctrl+A' : function(e){
                    //全选
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=Ctrl+A=全选');
                    console.groupEnd();
                }
                ,'Ctrl+Alt+Z' : function(e){
                    // 返回上一步
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=Ctrl+Alt+Z=返回上一步');
                    console.groupEnd();
                }
                ,'Ctrl+S' : function(e){
                    // 保存
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=Ctrl+S=保存');
                    console.groupEnd();
                }
                ,'Ctrl+C' : function(e){
                    // 复制
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=Ctrl+C=复制');
                    console.groupEnd();
                    scope.copy('222');

                }
                ,'Ctrl+X' : function(e){
                    // 复制
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=Ctrl+X=剪切');
                    console.groupEnd();
                    scope.cut('222');

                }
                ,'Ctrl+V' : function(e){
                    // 粘贴
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=Ctrl+V=粘贴');
                    console.groupEnd();
                    scope.paste('222');
                }
                ,'Ctrl+T' : function(e){
                    // 组件编辑模式 [缩小、移动、旋转]
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=Ctrl+T=组件编辑模式 [缩小、移动、旋转]');
                    console.groupEnd();
                }
                ,'dele' : function(e){
                    // 方向键 左移
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=dele=删除');
                    console.groupEnd();
                    scope.dele();
                }
                ,'left' : function(e){
                    // 方向键 左移
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=left=左移');
                    console.groupEnd();
                }
                ,'up' : function(e){
                    // 方向键 上移
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=up=上移');
                    console.groupEnd();
                }
                ,'down' : function(e){
                    // 方向键 下移
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=down=下移');
                    console.groupEnd();
                }
                ,'right' : function(e){
                    // 方向键 右移
                    console.group();
                    console.info('=keyEvent=');
                    console.log('=right=右移');
                    console.groupEnd();
                }
            };
            //注册快捷键
            var HotKey = {
                currentMainKey :null
                ,currentKeyValue :null
                ,isMainKey :function(key,fnc){
                    var mainKey ='';
                    switch (key){
                        case 17:
                            mainKey = 'Ctrl';//
                            break;
                        case 16:
                            mainKey = 'Shift';//Shift
                            break;
                        case 18:
                            mainKey = 'Alt';//Alt
                            break;
                        case 9:
                            mainKey = 'Tab';//Alt
                            break;

                    }
                    this.currentKeyValue = mainKey==''? this.currentKeyValue : mainKey;
                    return mainKey=='' ? false :true;
                }
            };

            //注册快捷键
            element.on('keydown', function(e){
                return;
                if(scope.FouceOnScene) return;
                if(!scope.isSelectedItem) return;
                e.preventDefault();
                var keyCode= e.keyCode;
                var keyValue= String.fromCharCode(e.keyCode);
                // console.log(keyCode);
                if(keyCode==8 || keyCode==46){
                    keyEvent['dele'](e);
                    return;
                }
                if(keyCode==9){
                    keyEvent['Tab'](e);
                    return;
                }
                if(keyCode==38){
                    keyEvent['up'](e);
                    return;
                }


                if(keyCode==40){
                    keyEvent['down'](e);
                    return;
                }
                if(keyCode==37){
                    keyEvent['left'](e);
                    return;
                }
                if(keyCode==39){
                    keyEvent['right'](e);
                    return;
                }

                if(HotKey.currentMainKey!=null){
                    for(var k in keyEvent){
                        if(HotKey.currentKeyValue== k.split('+')[0]&&keyValue== k.split('+')[1]){
                            keyEvent[k](e);
                            return;
                        }
                    }

                }
                if(HotKey.isMainKey(keyCode)) HotKey.currentMainKey=keyCode;


            });
            element.on('keyup', function(e){
                var keyCode= e.keyCode;
                if(HotKey.isMainKey(keyCode)) HotKey.currentMainKey=null;
            });


            //禁止右击
            element.on('contextmenu',function(e){
                e.preventDefault();
            });


            // 鼠标点击的窗体目标
            var isMoveTool=false;
            element.on('mousedown',function(e){
              //  e.preventDefault();

            });
            element.on('mouseup',function(e){
                isMoveTool = false;
            });
            element.on('mousemove',function(e){

            });

            var fontSize = angular.element(element).css('fontSize');
            scope.$emit('ChangeMaxfontSizeEmit',parseInt(fontSize));
            var timeout=null;
            angular.element(window).on('resize',function(){
                clearTimeout(timeout);
                timeout = setTimeout(function(){
                    var fontSize = angular.element(element).css('fontSize');
                    scope.$emit('ChangeMaxfontSizeEmit',parseInt(fontSize));
                },11);

            });






        }
    }

}]);
