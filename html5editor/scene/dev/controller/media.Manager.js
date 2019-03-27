define(['angularAMD','uiBootstrap'],function(angularAMD){
    angularAMD.controller('mediaManager',['$scope', '$uibModal', '$log', function($scope,$uibModal, $log) {

        /*$scope.Images=$scope.systemResure.images; //图片库
        $scope.Audio=$scope.systemResure.sounds; //音频库
        $scope.Video=$scope.systemResure.media; //视频库*/
        $scope.selectType ='none';
        $scope.isShow=false;

        $scope.showModel=function(size){

            $scope.data=$scope[$scope.selectType];
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: $scope.selectType+'Librualy.html',
                controller: $scope.selectType+'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.data;
                    }
                }

            });

            modalInstance.result.then(function (selectedItemUrl) {
                $scope.selected = selectedItemUrl;
                $scope.$emit('onSelectMediaBack.emit',selectedItemUrl);
            },function(){
                //取消
                console.log('modalhiden.close');
                $scope.$emit('modalCancelSetting.emit',true);
            });



        };

        //接收用户选择查看的库类型[Images 图片库,Audio 音频库,Video 视频库]
        $scope.$on('selectResuore.broadcast',function(evt,data){
            $scope.selectType =data.type;
            $scope.showModel('lg');
        });



    }]);

    // 图片资源
    angularAMD.controller('ImagesModalInstanceCtrl',['$scope', '$uibModalInstance', 'items','$http',function ($scope,$uibModalInstance, items,$http) {

        $scope.cancelUploadImage=1; //ajax 上传图片取消 1 2 3 / 1: 默认 ，2 触发上传 3：取消 ，4成功
        $scope.cancelUploadCanvas=1; //ajax 上传裁剪取消 / 1: 默认 ，2 触发上传 3：取消 ，4成功
        $scope.useTarget=1; // 1是原图 ，2 裁剪后的

        //$scope.lists = items;
        $scope.accessUrl=items.accessUrl;
        $scope.systems=items.system;
        $scope.user = items.user;



        $scope.selected = {};
        //选择图片---------------------------
        $scope.checkImage=function(url){

            var img = new Image();
            img.onload=function(){
                var _this = this;
                $scope.ok({
                    url:url
                    ,width:_this.width
                    ,height:_this.height
                });
            };
            img.src = url;

        };

        //选择图片成功---------------------------
        $scope.ok = function (data){
            if($scope.useTarget==2 && $scope.cancelUploadCanvas!=4) return;

            $uibModalInstance.close(data);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        //删除图片----------------------------------
        var isclick =false;
        $scope.deleImage=function(itemImage,k){
            if(isclick) return;
            isclick = true;
            itemImage.type = 'images';
            $http({
                method:'POST'
                ,url:'/index.php?a=User&m=delUserResource&ajax=1'
                ,headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                ,data:"type=images&pathname="+itemImage['path']+"&filename="+itemImage['name']
            }).success(function(data, status, headers, config){
                    isclick=false;
                    if(data.code==0){
                        $scope.user.image.list.splice(k,1);
                    }
                })
                .error(function(){
                    isclick=false;
                });
        };


        //=======================取消裁剪========================================================
        $scope.$on('cancelCroperOnece.emit',function(evt,data){
           console.log('========cancelCroperOnece=====emit=');
            $scope.useTarget=1;
            $scope.cancelUploadCanvas = $scope.cancelUploadCanvas==2? 3 : $scope.cancelUploadCanvas; //已经上传中的，强制取消
        });

        //======================文件上传========================================================
        $scope.$on('uploadFileChange.emit',function(evt,data){
            $scope.cancelUploadCanvas=2;//开始上传
            $scope.$broadcast('showLoading.broadcast',true); //显示loading
            $http({
                method: 'POST',
                headers :{
                    'Content-Type':undefined
                }
                ,url : '/index.php?a=User&m=uploadUserResource&ajax=1'
                ,data:data.data
            }).success(function(result, status, headers, config){
                    if(result.code==0){
                        $scope.cancelUploadCanvas=4;
                        $scope.$broadcast('showLoading.broadcast',false); //显示loading
                        //更新我的图片列表
                        $scope.user.image.list.push(result.data);
                        //如果是使用裁剪==========================================
                        if(data.closeModel){
                            //设置上传数据
                            $scope.checkImage($scope.accessUrl+$scope.user.image.path+result.data.path+result.data.name);
                        }
                    }

                });

        });


    }]);


    // 音频库资源
    angularAMD.controller('AudioModalInstanceCtrl',['$scope', '$uibModalInstance', 'items',function ($scope,$uibModalInstance, items) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function (type){
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);

    // 视频库库资源
    angularAMD.controller('VideoModalInstanceCtrl',['$scope', '$uibModalInstance', 'items',function ($scope, $uibModalInstance, items) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function (type){
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
});



