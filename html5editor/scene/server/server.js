app.service('dataService', ['$http', function($http) {

    var pageMaps = []; //此数组存储了当前活动所有的页面模板,[pageObj0, pageObj1, pageObj2 ...],每个页面.下面会从服务端读取当前活动在服务端存储的数据,然后对pageMaps做数据初始化.
    var sounds = []; // 音频文件
    var media = []; // 视频文件
    var images = []; //图片文件


    var map = window.localStorage.getItem('MAP');

    return map ==null?{
        sounds: sounds,
        media: media,
        images: images,
        pageMaps: [{
            cansee:true,
            backgroundColor:'none',
            backgroundImg:'none'
        }]
    }:JSON.parse(map);

}]);
