define([],function(){
    var basePath = './';
    return {
        "home":{
            name: "home",
            url: "/home",
            templateUrl: basePath+"view/home.html?bust="+new Date().getTime(),
            controller: "homeController"
        }
        ,"already_announced":{
            name: "already_announced",
            url: "/already_announced?id&qid",
            templateUrl: basePath+"view/already_announced.html?bust="+new Date().getTime(),
            controller: "already_announcedController"
        }
        ,"will_announced":{
            name: "will_announced",
            url: "/will_announced?id&qid",
            templateUrl: basePath+"view/will_announced.html?bust="+new Date().getTime(),
            controller: "will_announcedController"
        }

        ,"detail":{
            name: "detail",
            url: "/detail?id&qid",
            resolve : {},
            reloadOnSearch: false, //动态修改url ，并不改变当前view
            templateUrl: basePath+"view/detail.html?bust="+new Date().getTime(),
            controller: "detailController"
        }

        ,"mublist":{
            name: "mublist",
            url: "/mublist?id",
            templateUrl: basePath+"view/mublist.html?bust="+new Date().getTime(),
            controller: "mublistController"
        }
        ,"product_detail":{
            name: "product_detail",
            url: "/product_detail?id",
            templateUrl: basePath+"view/product_detail.html?bust="+new Date().getTime(),
            controller: "product_detailController"
        }
         ,"member":{
            name: "member",
            url: "/member?id",
            templateUrl: basePath+"view/member.html?bust="+new Date().getTime(),
            controller: "memberController"
        }
        ,"help":{
            name: "help",
            url: "/help",
            templateUrl: basePath+"view/help.html?bust="+new Date().getTime(),
            controller: "helpController"
        }
        ,"luckHistory":{
            name: "luckHistory",
            url: "/luckHistory",
            templateUrl: basePath+"view/luckHistory.html?bust="+new Date().getTime(),
            controller: "luckHistoryController"
        }
        ,"joinHistory":{
            name: "joinHistory",
            url: "/joinHistory",
            templateUrl: basePath+"view/joinHistory.html?bust="+new Date().getTime(),
            controller: "joinHistoryController"
        }
        ,"role":{
            name: "role",
            url: "/role",
            templateUrl: basePath+"view/role.html?bust="+new Date().getTime(),
            controller: "roleController"
        }
        ,"addrole":{
            name: "addrole",
            url: "/addrole?serverid",
            templateUrl: basePath+"view/addrole.html?bust="+new Date().getTime(),
            controller: "addroleController"
        }
        ,"receive":{
            name: "receive",
            url: "/receive?sortid",
            templateUrl: basePath+"view/receive.html?bust="+new Date().getTime(),
            controller: "receiveController"
        }
        ,"order":{
            name: "order",
            url: "/order?sortid",
            templateUrl: basePath+"view/order.html?bust="+new Date().getTime(),
            controller: "orderController"
        }
        ,"pay":{
            name: "pay",
            url: "/pay?sortid",
            templateUrl: basePath+"view/pay.html?bust="+new Date().getTime(),
            controller: "payController"
        }












    }
});

