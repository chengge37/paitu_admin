'use strict';
export const qiniuHost = 'http://pic.paitume.com/';
export const defaultEquipPic = 'static/equip-static.jpg';
export const malePic = qiniuHost + 'images/male.png';

export const RoleCode ={
    RoleNormal:0,
    RoleAdmin : 4,
    RoleCompanyLeasing : 2,//租赁商
    RoleCompanyPhoto : 8,//摄影公司
    RoleCompanyModel : 16,//模特经纪公司
    RoleCompanyMCN : 32,//MCN公司
    RolePersonPhoto : 64,//个人摄影师
    RolePersonModel : 128//个人模特
}

export const RoleName ={
    0:'普通用户',
    4 : '管理',
    2 : '租赁商',
    8 : '摄影公司',
    16 : '模特公司',
    32 : 'MCN公司',
    64 : '个人摄影师',
    128 : '个人模特'
}


export const MiniAppOptCode = {
    WxOptSetDomain: 1,
    WxOptSetWorkDomain: 2,
    WxOptSetName : 4,
    WxOptSetInfo: 8,
    WxOptSetIcon : 16,
    WxOptSetCategory : 32,
    WxOptUploadTpl : 64,
    WxOptCommit : 128,
    WxOptRelease : 256,
    WxOptPay : 512,
};


export const WxAppAuditStatus = {
    WxAppAuditStatusSucc : 0,
    WxAppAuditStatusFail : 1,
    WxAppAuditStatusIng : 2,
    WxAppAuditStatusCancel : 3,
    WxAppAuditStatusInit : 4
}

export const UnsupportedBankAccountNumber = [
      623501,
      621468,
      620522,
      625191,
      622384,
      623078,
      940034,
      622150,
      622151,
      622181,
      622188,
      955100,
      621095,
      620062,
      621285,
      621798,
      621799,
      621797,
      622199,
      621096,
      62215049,
      62215050,
      62215051,
      62218849,
      62218850,
      62218851,
      621622,
      623219,
      621674,
      623218,
      621599,
      623698,
      623699,
      623686,
      621098,
      620529,
      622180,
      622182,
      622187,
      622189,
      621582,
      623676,
      623677,
      622812,
      622810,
      622811,
      628310,
      625919,
      625368,
      625367,
      518905,
      622835,
      625603,
      625605,
      518905
    ];

export const Banklist = [{
                    id: 1,
                    name: "工商银行"
                },
                {
                    id: 2,
                    name: "交通银行"
                },
                {
                    id: 3,
                    name: "招商银行"
                },
                {
                    id: 4,
                    name: "民生银行"
                },
                {
                    id: 5,
                    name: "中信银行"
                },
                {
                    id: 6,
                    name: "浦发银行"
                },
                {
                    id: 7,
                    name: "兴业银行"
                },
                {
                    id: 8,
                    name: "光大银行"
                },
                {
                    id: 9,
                    name: "广发银行"
                },
                {
                    id: 10,
                    name: "平安银行"
                },
                {
                    id: 11,
                    name: "北京银行"
                },
                {
                    id: 12,
                    name: "华夏银行"
                },
                {
                    id: 13,
                    name: "农业银行"
                },
                {
                    id: 14,
                    name: "建设银行"
                },
                {
                    id: 15,
                    name: "邮政储蓄银行"
                },
                {
                    id: 16,
                    name: "中国银行"
                },
                {
                    id: 17,
                    name: "宁波银行"
                },
                {
                    id: 18,
                    name: "其他银行"
                }
            ];

export const ApplyStatus = {
    _ApplyStatusInit: 0,
    _ApplyStatusApprove: 1,
    _ApplyStatusReject: 2
};
export const ApplyType = {
    _ApplyPersonal: 2,
    _ApplyCompany: 1
};

export const ApplyCommanyType = {
    _ApplyCompanyLeasing : 1,//租赁商
    _ApplyCompanyPhoto : 2,//摄影公司
    _ApplyCompanyModel : 3,//模特经纪公司
    _ApplyCompanyMCN : 4//MCN公司
};
export const ApplyPersonalType = {
    _ApplyPersonalPhoto : 1,//摄影师
    _ApplyPersonalModel : 2//模特
};
 

export const getBorrowTypeText = function(borrowType){
    const borrowTypeInt = parseInt(borrowType);
    let txt = '';
    if(borrowTypeInt == 0){
        txt = '可外借可影棚内使用'
    } else if(borrowTypeInt == 1) {
        txt = '仅在影棚内使用'
    } else if(borrowTypeInt == 2) {
        txt = '仅外借'
    }
    return txt;
};
export const conditionArray = [{ "id": 1, "name": "\u5316\u5986\u95f4", "icon": "iconfont icon-huazhuangpin" }, { "id": 2, "name": "\u7a7a\u8c03", "icon": "iconfont icon-kongtiao" }, { "id": 3, "name": "WIFI", "icon": "iconfont icon-wuxianwang" }, { "id": 4, "name": "\u4f11\u606f\u5ba4", "icon": "iconfont icon-xiuxi" }, { "id": 5, "name": "\u706f\u5149", "icon": "iconfont icon-dengpao" }, { "id": 6, "name": "\u97f3\u54cd", "icon": "iconfont icon-yinxiang" }, { "id": 7, "name": "\u505c\u8f66\u573a", "icon": "iconfont icon-tingchechang" }, { "id": 8, "name": "\u6295\u5f71\u8bbe\u5907", "icon": "iconfont icon-projector" }, { "id": 9, "name": "\u9910\u996e", "icon": "iconfont icon-canting" }];
export const staticNationArray = [{id:1,name:'中国'},{id:2,name:'中国2'}];
export const staticSkinArray = [{id:1,name:'skin1'},{id:2,name:'skin2'}];
export const staticFaceArray = [{id:1,name:'Face1'},{id:2,name:'F2'}];
export const staticHairArray = [{id:1,name:'Hair1'},{id:2,name:'Hair2'}];
export const staticEyelidArray = [{id:1,name:'单眼皮'},{id:2,name:'双眼皮'}];
export const squareArray = [{ id: 1, name: '100m²及以下' }, { id: 2, name: '100~200m²' }, { id: 3, name: '200~300m²' }];


export const RentTypeDay = 2;
export const RentTypeHour = 1;

export const OrderStatus = {
    OrderStatusWaitPay: 1,
    OrderStatusPaid: 2,
    OrderStatusConfirm: 3,
    OrderStatusRejecting: 4,
    OrderStatusRejected: 5,
    OrderStatusIng: 6,
    OrderStatusWaitComment: 7,
    OrderStatusDone: 8
}
export const getOrderStatusText = function (OrderStatusCode) {
    let OrderStatusCodeInt = parseInt(OrderStatusCode);
   switch(OrderStatusCodeInt){
       case OrderStatus.OrderStatusWaitPay:
       return '待支付';
       case OrderStatus.OrderStatusPaid:
       return '已支付';
       case OrderStatus.OrderStatusConfirm:
       return '已确认';
       case OrderStatus.OrderStatusRejecting:
       return '已拒绝,退款中';
       case OrderStatus.OrderStatusRejected:
       return '已拒绝完毕';
       case OrderStatus.OrderStatusIng:
       return '进行中';
       case OrderStatus.OrderStatusWaitComment:
       return '已完成,等待评论';
       case OrderStatus.OrderStatusDone:
       return '已完成';
   }
}
export const orderOptions = [
    {
        value: "studio",
        label: "影棚订单"
    },
    {
        value: "equip",
        label: "设备订单"
    }
];

export const allCityArray=[{"id":"1","city":"\u6d1b\u9633\u5e02","code":"0379","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"2","city":"\u4e09\u95e8\u5ce1\u5e02","code":"0398","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"3","city":"\u6f2f\u6cb3\u5e02","code":"0395","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"4","city":"\u8bb8\u660c\u5e02","code":"0374","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"5","city":"\u5357\u9633\u5e02","code":"0377","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"6","city":"\u4fe1\u9633\u5e02","code":"0376","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"7","city":"\u6d4e\u6e90\u5e02","code":"1391","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"8","city":"\u9a7b\u9a6c\u5e97\u5e02","code":"0396","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"9","city":"\u6fee\u9633\u5e02","code":"0393","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"10","city":"\u7126\u4f5c\u5e02","code":"0391","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"11","city":"\u9e64\u58c1\u5e02","code":"0392","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"12","city":"\u65b0\u4e61\u5e02","code":"0373","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"13","city":"\u5e73\u9876\u5c71\u5e02","code":"0375","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"14","city":"\u5468\u53e3\u5e02","code":"0394","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"15","city":"\u5546\u4e18\u5e02","code":"0370","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"16","city":"\u5f00\u5c01\u5e02","code":"0378","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"17","city":"\u90d1\u5dde\u5e02","code":"0371","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"18","city":"\u5b89\u9633\u5e02","code":"0372","province":"\u6cb3\u5357\u7701","province_code":"41"},{"id":"19","city":"\u6c55\u5934\u5e02","code":"0754","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"20","city":"\u4f5b\u5c71\u5e02","code":"0757","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"21","city":"\u8087\u5e86\u5e02","code":"0758","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"22","city":"\u60e0\u5dde\u5e02","code":"0752","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"23","city":"\u6df1\u5733\u5e02","code":"0755","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"24","city":"\u73e0\u6d77\u5e02","code":"0756","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"25","city":"\u6e5b\u6c5f\u5e02","code":"0759","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"26","city":"\u6c5f\u95e8\u5e02","code":"0750","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"27","city":"\u8302\u540d\u5e02","code":"0668","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"28","city":"\u6c55\u5c3e\u5e02","code":"0660","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"29","city":"\u4e91\u6d6e\u5e02","code":"0766","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"30","city":"\u6f6e\u5dde\u5e02","code":"0768","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"31","city":"\u9633\u6c5f\u5e02","code":"0662","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"32","city":"\u4e1c\u6c99\u7fa4\u5c9b","code":"0767","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"33","city":"\u6cb3\u6e90\u5e02","code":"0762","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"34","city":"\u6885\u5dde\u5e02","code":"0753","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"35","city":"\u4e1c\u839e\u5e02","code":"0769","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"36","city":"\u6e05\u8fdc\u5e02","code":"0763","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"37","city":"\u97f6\u5173\u5e02","code":"0751","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"38","city":"\u63ed\u9633\u5e02","code":"0663","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"39","city":"\u5e7f\u5dde\u5e02","code":"020","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"40","city":"\u4e2d\u5c71\u5e02","code":"0760","province":"\u5e7f\u4e1c\u7701","province_code":"44"},{"id":"41","city":"\u4e4c\u6d77\u5e02","code":"0473","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"42","city":"\u5305\u5934\u5e02","code":"0472","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"43","city":"\u5df4\u5f66\u6dd6\u5c14\u5e02","code":"0478","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"44","city":"\u547c\u4f26\u8d1d\u5c14\u5e02","code":"0470","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"45","city":"\u9102\u5c14\u591a\u65af\u5e02","code":"0477","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"46","city":"\u963f\u62c9\u5584\u76df","code":"0483","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"47","city":"\u8d64\u5cf0\u5e02","code":"0476","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"48","city":"\u901a\u8fbd\u5e02","code":"0475","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"49","city":"\u5174\u5b89\u76df","code":"0482","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"50","city":"\u4e4c\u5170\u5bdf\u5e03\u5e02","code":"0474","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"51","city":"\u9521\u6797\u90ed\u52d2\u76df","code":"0479","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"52","city":"\u547c\u548c\u6d69\u7279\u5e02","code":"0471","province":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a","province_code":"15"},{"id":"53","city":"\u5927\u5174\u5b89\u5cad\u5730\u533a","code":"0457","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"54","city":"\u4e03\u53f0\u6cb3\u5e02","code":"0464","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"55","city":"\u9e64\u5c97\u5e02","code":"0468","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"56","city":"\u4f0a\u6625\u5e02","code":"0458","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"57","city":"\u7ee5\u5316\u5e02","code":"0455","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"58","city":"\u9ed1\u6cb3\u5e02","code":"0456","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"59","city":"\u54c8\u5c14\u6ee8\u5e02","code":"0451","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"60","city":"\u9f50\u9f50\u54c8\u5c14\u5e02","code":"0452","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"61","city":"\u7261\u4e39\u6c5f\u5e02","code":"0453","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"62","city":"\u9e21\u897f\u5e02","code":"0467","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"63","city":"\u53cc\u9e2d\u5c71\u5e02","code":"0469","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"64","city":"\u5927\u5e86\u5e02","code":"0459","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"65","city":"\u4f73\u6728\u65af\u5e02","code":"0454","province":"\u9ed1\u9f99\u6c5f\u7701","province_code":"23"},{"id":"66","city":"\u5317\u5c6f\u5e02","code":"1906","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"67","city":"\u53cc\u6cb3\u5e02","code":"1909","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"68","city":"\u94c1\u95e8\u5173\u5e02","code":"1996","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"69","city":"\u53ef\u514b\u8fbe\u62c9\u5e02","code":"1999","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"70","city":"\u535a\u5c14\u5854\u62c9\u8499\u53e4\u81ea\u6cbb\u5dde","code":"0909","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"71","city":"\u5854\u57ce\u5730\u533a","code":"0901","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"72","city":"\u514b\u62c9\u739b\u4f9d\u5e02","code":"0990","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"73","city":"\u548c\u7530\u5730\u533a","code":"0903","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"74","city":"\u6606\u7389\u5e02","code":"1903","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"75","city":"\u963f\u52d2\u6cf0\u5730\u533a","code":"0906","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"76","city":"\u77f3\u6cb3\u5b50\u5e02","code":"0993","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"77","city":"\u660c\u5409\u56de\u65cf\u81ea\u6cbb\u5dde","code":"0994","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"78","city":"\u4e94\u5bb6\u6e20\u5e02","code":"1994","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"79","city":"\u5df4\u97f3\u90ed\u695e\u8499\u53e4\u81ea\u6cbb\u5dde","code":"0996","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"80","city":"\u963f\u514b\u82cf\u5730\u533a","code":"0997","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"81","city":"\u4f0a\u7281\u54c8\u8428\u514b\u81ea\u6cbb\u5dde","code":"0999","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"82","city":"\u963f\u62c9\u5c14\u5e02","code":"1997","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"83","city":"\u4e4c\u9c81\u6728\u9f50\u5e02","code":"0991","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"84","city":"\u56fe\u6728\u8212\u514b\u5e02","code":"1998","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"85","city":"\u5580\u4ec0\u5730\u533a","code":"0998","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"86","city":"\u514b\u5b5c\u52d2\u82cf\u67ef\u5c14\u514b\u5b5c\u81ea\u6cbb\u5dde","code":"0908","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"87","city":"\u54c8\u5bc6\u5e02","code":"0902","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"88","city":"\u5410\u9c81\u756a\u5e02","code":"0995","province":"\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a","province_code":"65"},{"id":"89","city":"\u5341\u5830\u5e02","code":"0719","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"90","city":"\u8944\u9633\u5e02","code":"0710","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"91","city":"\u8346\u95e8\u5e02","code":"0724","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"92","city":"\u5b9c\u660c\u5e02","code":"0717","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"93","city":"\u6b66\u6c49\u5e02","code":"027","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"94","city":"\u9ec4\u5188\u5e02","code":"0713","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"95","city":"\u5929\u95e8\u5e02","code":"1728","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"96","city":"\u5b5d\u611f\u5e02","code":"0712","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"97","city":"\u6f5c\u6c5f\u5e02","code":"2728","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"98","city":"\u6069\u65bd\u571f\u5bb6\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde","code":"0718","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"99","city":"\u4ed9\u6843\u5e02","code":"0728","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"100","city":"\u8346\u5dde\u5e02","code":"0716","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"101","city":"\u54b8\u5b81\u5e02","code":"0715","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"102","city":"\u795e\u519c\u67b6\u6797\u533a","code":"1719","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"103","city":"\u968f\u5dde\u5e02","code":"0722","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"104","city":"\u9102\u5dde\u5e02","code":"0711","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"105","city":"\u9ec4\u77f3\u5e02","code":"0714","province":"\u6e56\u5317\u7701","province_code":"42"},{"id":"106","city":"\u846b\u82a6\u5c9b\u5e02","code":"0429","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"107","city":"\u5927\u8fde\u5e02","code":"0411","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"108","city":"\u4e39\u4e1c\u5e02","code":"0415","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"109","city":"\u9526\u5dde\u5e02","code":"0416","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"110","city":"\u629a\u987a\u5e02","code":"0413","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"111","city":"\u6c88\u9633\u5e02","code":"024","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"112","city":"\u94c1\u5cad\u5e02","code":"0410","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"113","city":"\u8425\u53e3\u5e02","code":"0417","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"114","city":"\u671d\u9633\u5e02","code":"0421","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"115","city":"\u8fbd\u9633\u5e02","code":"0419","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"116","city":"\u978d\u5c71\u5e02","code":"0412","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"117","city":"\u961c\u65b0\u5e02","code":"0418","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"118","city":"\u76d8\u9526\u5e02","code":"0427","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"119","city":"\u672c\u6eaa\u5e02","code":"0414","province":"\u8fbd\u5b81\u7701","province_code":"21"},{"id":"120","city":"\u70df\u53f0\u5e02","code":"0535","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"121","city":"\u5a01\u6d77\u5e02","code":"0631","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"122","city":"\u9752\u5c9b\u5e02","code":"0532","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"123","city":"\u6dc4\u535a\u5e02","code":"0533","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"124","city":"\u804a\u57ce\u5e02","code":"0635","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"125","city":"\u4e34\u6c82\u5e02","code":"0539","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"126","city":"\u6f4d\u574a\u5e02","code":"0536","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"127","city":"\u67a3\u5e84\u5e02","code":"0632","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"128","city":"\u65e5\u7167\u5e02","code":"0633","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"129","city":"\u6ee8\u5dde\u5e02","code":"0543","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"130","city":"\u4e1c\u8425\u5e02","code":"0546","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"131","city":"\u6cf0\u5b89\u5e02","code":"0538","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"132","city":"\u5fb7\u5dde\u5e02","code":"0534","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"133","city":"\u6d4e\u5357\u5e02","code":"0531","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"134","city":"\u6d4e\u5b81\u5e02","code":"0537","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"135","city":"\u83cf\u6cfd\u5e02","code":"0530","province":"\u5c71\u4e1c\u7701","province_code":"37"},{"id":"136","city":"\u8fde\u4e91\u6e2f\u5e02","code":"0518","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"137","city":"\u5bbf\u8fc1\u5e02","code":"0527","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"138","city":"\u5357\u4eac\u5e02","code":"025","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"139","city":"\u9547\u6c5f\u5e02","code":"0511","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"140","city":"\u5357\u901a\u5e02","code":"0513","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"141","city":"\u6dee\u5b89\u5e02","code":"0517","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"142","city":"\u5f90\u5dde\u5e02","code":"0516","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"143","city":"\u76d0\u57ce\u5e02","code":"0515","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"144","city":"\u626c\u5dde\u5e02","code":"0514","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"145","city":"\u6cf0\u5dde\u5e02","code":"0523","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"146","city":"\u65e0\u9521\u5e02","code":"0510","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"147","city":"\u5e38\u5dde\u5e02","code":"0519","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"148","city":"\u82cf\u5dde\u5e02","code":"0512","province":"\u6c5f\u82cf\u7701","province_code":"32"},{"id":"149","city":"\u5546\u6d1b\u5e02","code":"0914","province":"\u9655\u897f\u7701","province_code":"61"},{"id":"150","city":"\u897f\u5b89\u5e02","code":"029","province":"\u9655\u897f\u7701","province_code":"61"},{"id":"151","city":"\u6c49\u4e2d\u5e02","code":"0916","province":"\u9655\u897f\u7701","province_code":"61"},{"id":"152","city":"\u94dc\u5ddd\u5e02","code":"0919","province":"\u9655\u897f\u7701","province_code":"61"},{"id":"153","city":"\u6986\u6797\u5e02","code":"0912","province":"\u9655\u897f\u7701","province_code":"61"},{"id":"154","city":"\u5b89\u5eb7\u5e02","code":"0915","province":"\u9655\u897f\u7701","province_code":"61"},{"id":"155","city":"\u5ef6\u5b89\u5e02","code":"0911","province":"\u9655\u897f\u7701","province_code":"61"},{"id":"156","city":"\u5b9d\u9e21\u5e02","code":"0917","province":"\u9655\u897f\u7701","province_code":"61"},{"id":"157","city":"\u54b8\u9633\u5e02","code":"0910","province":"\u9655\u897f\u7701","province_code":"61"},{"id":"158","city":"\u6e2d\u5357\u5e02","code":"0913","province":"\u9655\u897f\u7701","province_code":"61"},{"id":"159","city":"\u4e0a\u6d77\u5e02","code":"021","province":"\u4e0a\u6d77\u5e02","province_code":"31"},{"id":"160","city":"\u9075\u4e49\u5e02","code":"0852","province":"\u8d35\u5dde\u7701","province_code":"52"},{"id":"161","city":"\u94dc\u4ec1\u5e02","code":"0856","province":"\u8d35\u5dde\u7701","province_code":"52"},{"id":"162","city":"\u516d\u76d8\u6c34\u5e02","code":"0858","province":"\u8d35\u5dde\u7701","province_code":"52"},{"id":"163","city":"\u9ed4\u4e1c\u5357\u82d7\u65cf\u4f97\u65cf\u81ea\u6cbb\u5dde","code":"0855","province":"\u8d35\u5dde\u7701","province_code":"52"},{"id":"164","city":"\u9ed4\u5357\u5e03\u4f9d\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde","code":"0854","province":"\u8d35\u5dde\u7701","province_code":"52"},{"id":"165","city":"\u5b89\u987a\u5e02","code":"0853","province":"\u8d35\u5dde\u7701","province_code":"52"},{"id":"166","city":"\u9ed4\u897f\u5357\u5e03\u4f9d\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde","code":"0859","province":"\u8d35\u5dde\u7701","province_code":"52"},{"id":"167","city":"\u6bd5\u8282\u5e02","code":"0857","province":"\u8d35\u5dde\u7701","province_code":"52"},{"id":"168","city":"\u8d35\u9633\u5e02","code":"0851","province":"\u8d35\u5dde\u7701","province_code":"52"},{"id":"169","city":"\u91cd\u5e86\u5e02","code":"023","province":"\u91cd\u5e86\u5e02","province_code":"50"},{"id":"171","city":"\u660c\u90fd\u5e02","code":"0895","province":"\u897f\u85cf\u81ea\u6cbb\u533a","province_code":"54"},{"id":"172","city":"\u90a3\u66f2\u5e02","code":"0896","province":"\u897f\u85cf\u81ea\u6cbb\u533a","province_code":"54"},{"id":"173","city":"\u62c9\u8428\u5e02","code":"0891","province":"\u897f\u85cf\u81ea\u6cbb\u533a","province_code":"54"},{"id":"174","city":"\u65e5\u5580\u5219\u5e02","code":"0892","province":"\u897f\u85cf\u81ea\u6cbb\u533a","province_code":"54"},{"id":"175","city":"\u5c71\u5357\u5e02","code":"0893","province":"\u897f\u85cf\u81ea\u6cbb\u533a","province_code":"54"},{"id":"176","city":"\u6797\u829d\u5e02","code":"0894","province":"\u897f\u85cf\u81ea\u6cbb\u533a","province_code":"54"},{"id":"177","city":"\u963f\u91cc\u5730\u533a","code":"0897","province":"\u897f\u85cf\u81ea\u6cbb\u533a","province_code":"54"},{"id":"178","city":"\u6dee\u5317\u5e02","code":"0561","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"179","city":"\u961c\u9633\u5e02","code":"1558","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"180","city":"\u9a6c\u978d\u5c71\u5e02","code":"0555","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"181","city":"\u94dc\u9675\u5e02","code":"0562","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"182","city":"\u6c60\u5dde\u5e02","code":"0566","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"183","city":"\u4eb3\u5dde\u5e02","code":"0558","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"184","city":"\u868c\u57e0\u5e02","code":"0552","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"185","city":"\u6ec1\u5dde\u5e02","code":"0550","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"186","city":"\u516d\u5b89\u5e02","code":"0564","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"187","city":"\u5b89\u5e86\u5e02","code":"0556","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"188","city":"\u9ec4\u5c71\u5e02","code":"0559","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"189","city":"\u5ba3\u57ce\u5e02","code":"0563","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"190","city":"\u6dee\u5357\u5e02","code":"0554","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"191","city":"\u5408\u80a5\u5e02","code":"0551","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"192","city":"\u5bbf\u5dde\u5e02","code":"0557","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"193","city":"\u829c\u6e56\u5e02","code":"0553","province":"\u5b89\u5fbd\u7701","province_code":"34"},{"id":"194","city":"\u5b81\u5fb7\u5e02","code":"0593","province":"\u798f\u5efa\u7701","province_code":"35"},{"id":"195","city":"\u798f\u5dde\u5e02","code":"0591","province":"\u798f\u5efa\u7701","province_code":"35"},{"id":"196","city":"\u8386\u7530\u5e02","code":"0594","province":"\u798f\u5efa\u7701","province_code":"35"},{"id":"197","city":"\u9f99\u5ca9\u5e02","code":"0597","province":"\u798f\u5efa\u7701","province_code":"35"},{"id":"198","city":"\u53a6\u95e8\u5e02","code":"0592","province":"\u798f\u5efa\u7701","province_code":"35"},{"id":"199","city":"\u6cc9\u5dde\u5e02","code":"0595","province":"\u798f\u5efa\u7701","province_code":"35"},{"id":"200","city":"\u6f33\u5dde\u5e02","code":"0596","province":"\u798f\u5efa\u7701","province_code":"35"},{"id":"201","city":"\u5357\u5e73\u5e02","code":"0599","province":"\u798f\u5efa\u7701","province_code":"35"},{"id":"202","city":"\u4e09\u660e\u5e02","code":"0598","province":"\u798f\u5efa\u7701","province_code":"35"},{"id":"203","city":"\u5cb3\u9633\u5e02","code":"0730","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"204","city":"\u8861\u9633\u5e02","code":"0734","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"205","city":"\u76ca\u9633\u5e02","code":"0737","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"206","city":"\u957f\u6c99\u5e02","code":"0731","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"207","city":"\u6000\u5316\u5e02","code":"0745","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"208","city":"\u5a04\u5e95\u5e02","code":"0738","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"209","city":"\u5f20\u5bb6\u754c\u5e02","code":"0744","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"210","city":"\u6e58\u897f\u571f\u5bb6\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde","code":"0743","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"211","city":"\u5e38\u5fb7\u5e02","code":"0736","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"212","city":"\u90b5\u9633\u5e02","code":"0739","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"213","city":"\u6e58\u6f6d\u5e02","code":"0732","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"214","city":"\u6c38\u5dde\u5e02","code":"0746","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"215","city":"\u90f4\u5dde\u5e02","code":"0735","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"216","city":"\u682a\u6d32\u5e02","code":"0733","province":"\u6e56\u5357\u7701","province_code":"43"},{"id":"217","city":"\u4e34\u9ad8\u53bf","code":"1896","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"218","city":"\u5b9a\u5b89\u53bf","code":"0806","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"219","city":"\u5c6f\u660c\u53bf","code":"1892","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"220","city":"\u660c\u6c5f\u9ece\u65cf\u81ea\u6cbb\u53bf","code":"0803","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"221","city":"\u767d\u6c99\u9ece\u65cf\u81ea\u6cbb\u53bf","code":"0802","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"222","city":"\u743c\u6d77\u5e02","code":"1894","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"223","city":"\u743c\u4e2d\u9ece\u65cf\u82d7\u65cf\u81ea\u6cbb\u53bf","code":"1899","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"224","city":"\u4e1c\u65b9\u5e02","code":"0807","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"225","city":"\u4e07\u5b81\u5e02","code":"1898","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"226","city":"\u4e94\u6307\u5c71\u5e02","code":"1897","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"227","city":"\u4e50\u4e1c\u9ece\u65cf\u81ea\u6cbb\u53bf","code":"2802","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"228","city":"\u4fdd\u4ead\u9ece\u65cf\u82d7\u65cf\u81ea\u6cbb\u53bf","code":"0801","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"229","city":"\u9675\u6c34\u9ece\u65cf\u81ea\u6cbb\u53bf","code":"0809","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"230","city":"\u4e09\u6c99\u5e02","code":"2898","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"231","city":"\u6587\u660c\u5e02","code":"1893","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"232","city":"\u510b\u5dde\u5e02","code":"0805","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"233","city":"\u6f84\u8fc8\u53bf","code":"0804","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"234","city":"\u4e09\u4e9a\u5e02","code":"0899","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"235","city":"\u6d77\u53e3\u5e02","code":"0898","province":"\u6d77\u5357\u7701","province_code":"46"},{"id":"236","city":"\u6d77\u4e1c\u5e02","code":"0972","province":"\u9752\u6d77\u7701","province_code":"63"},{"id":"237","city":"\u6d77\u5357\u85cf\u65cf\u81ea\u6cbb\u5dde","code":"0974","province":"\u9752\u6d77\u7701","province_code":"63"},{"id":"238","city":"\u6d77\u897f\u8499\u53e4\u65cf\u85cf\u65cf\u81ea\u6cbb\u5dde","code":"0977","province":"\u9752\u6d77\u7701","province_code":"63"},{"id":"239","city":"\u7389\u6811\u85cf\u65cf\u81ea\u6cbb\u5dde","code":"0976","province":"\u9752\u6d77\u7701","province_code":"63"},{"id":"240","city":"\u9ec4\u5357\u85cf\u65cf\u81ea\u6cbb\u5dde","code":"0973","province":"\u9752\u6d77\u7701","province_code":"63"},{"id":"241","city":"\u679c\u6d1b\u85cf\u65cf\u81ea\u6cbb\u5dde","code":"0975","province":"\u9752\u6d77\u7701","province_code":"63"},{"id":"242","city":"\u897f\u5b81\u5e02","code":"0971","province":"\u9752\u6d77\u7701","province_code":"63"},{"id":"243","city":"\u6d77\u5317\u85cf\u65cf\u81ea\u6cbb\u5dde","code":"0970","province":"\u9752\u6d77\u7701","province_code":"63"},{"id":"244","city":"\u767e\u8272\u5e02","code":"0776","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"245","city":"\u94a6\u5dde\u5e02","code":"0777","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"246","city":"\u5317\u6d77\u5e02","code":"0779","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"247","city":"\u6842\u6797\u5e02","code":"0773","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"248","city":"\u6cb3\u6c60\u5e02","code":"0778","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"249","city":"\u67f3\u5dde\u5e02","code":"0772","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"250","city":"\u6765\u5bbe\u5e02","code":"1772","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"251","city":"\u5357\u5b81\u5e02","code":"0771","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"252","city":"\u5d07\u5de6\u5e02","code":"1771","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"253","city":"\u9632\u57ce\u6e2f\u5e02","code":"0770","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"254","city":"\u8d3a\u5dde\u5e02","code":"1774","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"255","city":"\u7389\u6797\u5e02","code":"0775","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"256","city":"\u8d35\u6e2f\u5e02","code":"1755","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"257","city":"\u68a7\u5dde\u5e02","code":"0774","province":"\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a","province_code":"45"},{"id":"258","city":"\u56fa\u539f\u5e02","code":"0954","province":"\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a","province_code":"64"},{"id":"259","city":"\u4e2d\u536b\u5e02","code":"1953","province":"\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a","province_code":"64"},{"id":"260","city":"\u94f6\u5ddd\u5e02","code":"0951","province":"\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a","province_code":"64"},{"id":"261","city":"\u77f3\u5634\u5c71\u5e02","code":"0952","province":"\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a","province_code":"64"},{"id":"262","city":"\u5434\u5fe0\u5e02","code":"0953","province":"\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a","province_code":"64"},{"id":"263","city":"\u4e5d\u6c5f\u5e02","code":"0792","province":"\u6c5f\u897f\u7701","province_code":"36"},{"id":"264","city":"\u65b0\u4f59\u5e02","code":"0790","province":"\u6c5f\u897f\u7701","province_code":"36"},{"id":"265","city":"\u629a\u5dde\u5e02","code":"0794","province":"\u6c5f\u897f\u7701","province_code":"36"},{"id":"266","city":"\u9e70\u6f6d\u5e02","code":"0701","province":"\u6c5f\u897f\u7701","province_code":"36"},{"id":"267","city":"\u8d63\u5dde\u5e02","code":"0797","province":"\u6c5f\u897f\u7701","province_code":"36"},{"id":"268","city":"\u5357\u660c\u5e02","code":"0791","province":"\u6c5f\u897f\u7701","province_code":"36"},{"id":"269","city":"\u5b9c\u6625\u5e02","code":"0795","province":"\u6c5f\u897f\u7701","province_code":"36"},{"id":"270","city":"\u5409\u5b89\u5e02","code":"0796","province":"\u6c5f\u897f\u7701","province_code":"36"},{"id":"271","city":"\u666f\u5fb7\u9547\u5e02","code":"0798","province":"\u6c5f\u897f\u7701","province_code":"36"},{"id":"272","city":"\u4e0a\u9976\u5e02","code":"0793","province":"\u6c5f\u897f\u7701","province_code":"36"},{"id":"273","city":"\u840d\u4e61\u5e02","code":"0799","province":"\u6c5f\u897f\u7701","province_code":"36"},{"id":"274","city":"\u821f\u5c71\u5e02","code":"0580","province":"\u6d59\u6c5f\u7701","province_code":"33"},{"id":"275","city":"\u5609\u5174\u5e02","code":"0573","province":"\u6d59\u6c5f\u7701","province_code":"33"},{"id":"276","city":"\u5b81\u6ce2\u5e02","code":"0574","province":"\u6d59\u6c5f\u7701","province_code":"33"},{"id":"277","city":"\u53f0\u5dde\u5e02","code":"0576","province":"\u6d59\u6c5f\u7701","province_code":"33"},{"id":"278","city":"\u6e29\u5dde\u5e02","code":"0577","province":"\u6d59\u6c5f\u7701","province_code":"33"},{"id":"279","city":"\u4e3d\u6c34\u5e02","code":"0578","province":"\u6d59\u6c5f\u7701","province_code":"33"},{"id":"280","city":"\u676d\u5dde\u5e02","code":"0571","province":"\u6d59\u6c5f\u7701","province_code":"33"},{"id":"281","city":"\u7ecd\u5174\u5e02","code":"0575","province":"\u6d59\u6c5f\u7701","province_code":"33"},{"id":"282","city":"\u6e56\u5dde\u5e02","code":"0572","province":"\u6d59\u6c5f\u7701","province_code":"33"},{"id":"283","city":"\u91d1\u534e\u5e02","code":"0579","province":"\u6d59\u6c5f\u7701","province_code":"33"},{"id":"284","city":"\u8862\u5dde\u5e02","code":"0570","province":"\u6d59\u6c5f\u7701","province_code":"33"},{"id":"285","city":"\u5510\u5c71\u5e02","code":"0315","province":"\u6cb3\u5317\u7701","province_code":"13"},{"id":"286","city":"\u627f\u5fb7\u5e02","code":"0314","province":"\u6cb3\u5317\u7701","province_code":"13"},{"id":"287","city":"\u5eca\u574a\u5e02","code":"0316","province":"\u6cb3\u5317\u7701","province_code":"13"},{"id":"288","city":"\u79e6\u7687\u5c9b\u5e02","code":"0335","province":"\u6cb3\u5317\u7701","province_code":"13"},{"id":"289","city":"\u4fdd\u5b9a\u5e02","code":"0312","province":"\u6cb3\u5317\u7701","province_code":"13"},{"id":"290","city":"\u77f3\u5bb6\u5e84\u5e02","code":"0311","province":"\u6cb3\u5317\u7701","province_code":"13"},{"id":"291","city":"\u90af\u90f8\u5e02","code":"0310","province":"\u6cb3\u5317\u7701","province_code":"13"},{"id":"292","city":"\u90a2\u53f0\u5e02","code":"0319","province":"\u6cb3\u5317\u7701","province_code":"13"},{"id":"293","city":"\u5f20\u5bb6\u53e3\u5e02","code":"0313","province":"\u6cb3\u5317\u7701","province_code":"13"},{"id":"294","city":"\u6ca7\u5dde\u5e02","code":"0317","province":"\u6cb3\u5317\u7701","province_code":"13"},{"id":"295","city":"\u8861\u6c34\u5e02","code":"0318","province":"\u6cb3\u5317\u7701","province_code":"13"},{"id":"296","city":"\u9999\u6e2f\u7279\u522b\u884c\u653f\u533a","code":"1852","province":"\u9999\u6e2f\u7279\u522b\u884c\u653f\u533a","province_code":"81"},{"id":"314","city":"\u6fb3\u95e8\u7279\u522b\u884c\u653f\u533a","code":"1853","province":"\u6fb3\u95e8\u7279\u522b\u884c\u653f\u533a","province_code":"82"},{"id":"322","city":"\u5609\u5cea\u5173\u5e02","code":"1937","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"323","city":"\u9152\u6cc9\u5e02","code":"0937","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"324","city":"\u91d1\u660c\u5e02","code":"0935","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"325","city":"\u5170\u5dde\u5e02","code":"0931","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"326","city":"\u5e73\u51c9\u5e02","code":"0933","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"327","city":"\u767d\u94f6\u5e02","code":"0943","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"328","city":"\u5929\u6c34\u5e02","code":"0938","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"329","city":"\u6b66\u5a01\u5e02","code":"1935","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"330","city":"\u9647\u5357\u5e02","code":"2935","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"331","city":"\u7518\u5357\u85cf\u65cf\u81ea\u6cbb\u5dde","code":"0941","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"332","city":"\u4e34\u590f\u56de\u65cf\u81ea\u6cbb\u5dde","code":"0930","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"333","city":"\u5f20\u6396\u5e02","code":"0936","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"334","city":"\u5e86\u9633\u5e02","code":"0934","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"335","city":"\u5b9a\u897f\u5e02","code":"0932","province":"\u7518\u8083\u7701","province_code":"62"},{"id":"336","city":"\u5e7f\u5143\u5e02","code":"0839","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"337","city":"\u5357\u5145\u5e02","code":"0817","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"338","city":"\u5df4\u4e2d\u5e02","code":"0827","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"339","city":"\u5fb7\u9633\u5e02","code":"0838","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"340","city":"\u7ef5\u9633\u5e02","code":"0816","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"341","city":"\u6210\u90fd\u5e02","code":"028","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"342","city":"\u5e7f\u5b89\u5e02","code":"0826","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"343","city":"\u4e50\u5c71\u5e02","code":"0833","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"344","city":"\u8fbe\u5dde\u5e02","code":"0818","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"345","city":"\u8d44\u9633\u5e02","code":"0832","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"346","city":"\u5185\u6c5f\u5e02","code":"1832","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"347","city":"\u9042\u5b81\u5e02","code":"0825","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"348","city":"\u7709\u5c71\u5e02","code":"1833","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"349","city":"\u81ea\u8d21\u5e02","code":"0813","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"350","city":"\u6cf8\u5dde\u5e02","code":"0830","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"351","city":"\u5b9c\u5bbe\u5e02","code":"0831","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"352","city":"\u51c9\u5c71\u5f5d\u65cf\u81ea\u6cbb\u5dde","code":"0834","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"353","city":"\u6500\u679d\u82b1\u5e02","code":"0812","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"354","city":"\u963f\u575d\u85cf\u65cf\u7f8c\u65cf\u81ea\u6cbb\u5dde","code":"0837","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"355","city":"\u96c5\u5b89\u5e02","code":"0835","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"356","city":"\u7518\u5b5c\u85cf\u65cf\u81ea\u6cbb\u5dde","code":"0836","province":"\u56db\u5ddd\u7701","province_code":"51"},{"id":"357","city":"\u5409\u6797\u5e02","code":"0432","province":"\u5409\u6797\u7701","province_code":"22"},{"id":"358","city":"\u957f\u6625\u5e02","code":"0431","province":"\u5409\u6797\u7701","province_code":"22"},{"id":"359","city":"\u677e\u539f\u5e02","code":"0438","province":"\u5409\u6797\u7701","province_code":"22"},{"id":"360","city":"\u8fbd\u6e90\u5e02","code":"0437","province":"\u5409\u6797\u7701","province_code":"22"},{"id":"361","city":"\u767d\u57ce\u5e02","code":"0436","province":"\u5409\u6797\u7701","province_code":"22"},{"id":"362","city":"\u56db\u5e73\u5e02","code":"0434","province":"\u5409\u6797\u7701","province_code":"22"},{"id":"363","city":"\u5ef6\u8fb9\u671d\u9c9c\u65cf\u81ea\u6cbb\u5dde","code":"1433","province":"\u5409\u6797\u7701","province_code":"22"},{"id":"364","city":"\u767d\u5c71\u5e02","code":"0439","province":"\u5409\u6797\u7701","province_code":"22"},{"id":"365","city":"\u901a\u5316\u5e02","code":"0435","province":"\u5409\u6797\u7701","province_code":"22"},{"id":"366","city":"\u5929\u6d25\u5e02","code":"022","province":"\u5929\u6d25\u5e02","province_code":"12"},{"id":"367","city":"\u662d\u901a\u5e02","code":"0870","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"368","city":"\u66f2\u9756\u5e02","code":"0874","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"369","city":"\u7ea2\u6cb3\u54c8\u5c3c\u65cf\u5f5d\u65cf\u81ea\u6cbb\u5dde","code":"0873","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"370","city":"\u6012\u6c5f\u5088\u50f3\u65cf\u81ea\u6cbb\u5dde","code":"0886","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"371","city":"\u897f\u53cc\u7248\u7eb3\u50a3\u65cf\u81ea\u6cbb\u5dde","code":"0691","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"372","city":"\u7389\u6eaa\u5e02","code":"0877","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"373","city":"\u5927\u7406\u767d\u65cf\u81ea\u6cbb\u5dde","code":"0872","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"374","city":"\u4e3d\u6c5f\u5e02","code":"0888","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"375","city":"\u8fea\u5e86\u85cf\u65cf\u81ea\u6cbb\u5dde","code":"0887","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"376","city":"\u6587\u5c71\u58ee\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde","code":"0876","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"377","city":"\u4fdd\u5c71\u5e02","code":"0875","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"378","city":"\u666e\u6d31\u5e02","code":"0879","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"379","city":"\u6606\u660e\u5e02","code":"0871","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"380","city":"\u695a\u96c4\u5f5d\u65cf\u81ea\u6cbb\u5dde","code":"0878","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"381","city":"\u4e34\u6ca7\u5e02","code":"0883","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"382","city":"\u5fb7\u5b8f\u50a3\u65cf\u666f\u9887\u65cf\u81ea\u6cbb\u5dde","code":"0692","province":"\u4e91\u5357\u7701","province_code":"53"},{"id":"383","city":"\u5317\u4eac\u57ce\u533a","code":"010","province":"\u5317\u4eac\u5e02","province_code":"11"},{"id":"384","city":"\u9633\u6cc9\u5e02","code":"0353","province":"\u5c71\u897f\u7701","province_code":"14"},{"id":"385","city":"\u592a\u539f\u5e02","code":"0351","province":"\u5c71\u897f\u7701","province_code":"14"},{"id":"386","city":"\u4e34\u6c7e\u5e02","code":"0357","province":"\u5c71\u897f\u7701","province_code":"14"},{"id":"387","city":"\u8fd0\u57ce\u5e02","code":"0359","province":"\u5c71\u897f\u7701","province_code":"14"},{"id":"388","city":"\u957f\u6cbb\u5e02","code":"0355","province":"\u5c71\u897f\u7701","province_code":"14"},{"id":"389","city":"\u6714\u5dde\u5e02","code":"0349","province":"\u5c71\u897f\u7701","province_code":"14"},{"id":"390","city":"\u664b\u57ce\u5e02","code":"0356","province":"\u5c71\u897f\u7701","province_code":"14"},{"id":"391","city":"\u5ffb\u5dde\u5e02","code":"0350","province":"\u5c71\u897f\u7701","province_code":"14"},{"id":"392","city":"\u664b\u4e2d\u5e02","code":"0354","province":"\u5c71\u897f\u7701","province_code":"14"},{"id":"393","city":"\u5415\u6881\u5e02","code":"0358","province":"\u5c71\u897f\u7701","province_code":"14"},{"id":"394","city":"\u5927\u540c\u5e02","code":"0352","province":"\u5c71\u897f\u7701","province_code":"14"}];

//竞拍类型列表
export const projectList=[
    {id:1,name:'平面拍摄'},
	{id:2,name:'后期制作'},
	{id:3,name:'电商视频制作'},
	{id:4,name:'VR/3D'},
	{id:5,name:'漫画设计'},
	{id:6,name:'Logo设计'},
]


