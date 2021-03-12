'use strict';
//审核
export const apply = {
	get: 'apply/adminGet',
	update: 'apply/adminVerify',//审核用户申请
	getUserToken:'user/getUserToken', //获取商家登录token(免密)
}


//问题管理模块
export const question = {
	get: 'question/adminGet',  //问题列表
	verify: 'question/adminVerify'    
}

//评论管理模块
export const comment = {
	get: 'comment/adminGet',  //获取评论列表
	verify: 'comment/adminVerify'    
}

//短信
export const sms = {
	getNew: 'sms/adminGetTplNew',//获取用户提交的模板列表
	search: 'sms/adminSearchYunpianTpl',//搜索云片success的模板
	approve: 'sms/adminApproveTpl',//批准用户提交的模板
	reject: 'sms/adminRejectTpl'
}
//品牌
export const brand = {
	getBrandList: 'brand/loadBrand',
	addBrand: 'brand/add',
	updateBrand: 'brand/edit',
	genJs:'brand/genJs'
}

//活动
export const activity = {
	update: 'activity/adminUpdate',
	verify: 'activity/adminVerify',
	get: 'activity/adminGet'
}

//影棚
export const studio = {
	update: 'studio/adminUpdate',
	verify: 'studio/adminVerify',
	get: 'studio/adminGet'
}
//设备

export const equip = {
	get: 'equip/loadEquip',
	genJs:'equip/genJs',
	update:'equip/save'
}
export const category = {
	get: 'category/loadCategory',
	genJs: 'category/genJs'
}

export const city = {
	genJs:'city/genJs',
	get:'city/loadCity',
	getProvince:'city/loadProvince',
	add:'city/add'
}

//帮助管理模块
export const help = {
	get: 'help/ajaxGet',  //帮助内容
	getType: 'help/ajaxGetType'   , 
	delContent: 'help/adminDellContent'   ,
}
export const sync = {
	city: city.genJs,
	brand : brand.genJs,
	equip: equip.genJs,
	category:category.genJs
}

export const qiniuPic = {
	get: 'qiniu/get',
	sync:'qiniu/sync',
	refresh:'qiniu/refreshQiniuStatus',
	refreshById:'qiniu/refreshQiniuStatusById',
	getRelationData:'qiniu/getRelationData',
	del:'qiniu/del'
}

export const user = {
	get: 'user/get',
	add: 'user/add',
	initPwd:'user/resetPwd',
	grantRole:'user/grantRole'
}

export const product = {
	get:'product/ajaxGetProtuctList',
	post:'product/protuctAdd',
	delete:'product/protuctDel',
	update:'product/protuctEdit',
	getType:'product/ajaxGetProductTypeList',
	getOrder:'product/userGetProductOrderList',
	getDetail:'product/userGetProductOrderDetail',
	productOrderEdit:'product/productOrderEdit'
}
export const finance = {
	get:'finance/adminGetFinanceList',
	pass:'finance/adminPass',
}
export const refundAudit = {
	get:'orderRefund/ajaxUserRefundOrderList',
	getDetail:'orderRefund/ajaxUserRefundOrderDetial',
	postAudit:'orderRefund/serveRefundAnswer',
}


//-----------版本-------------
export const version = {
	get:'productVersion/adminGet',   //获取版本列表
	add:'productVersion/addVersion',    //新增版本
	update:'productVersion/updateVersion',  //修改版本
	delete:'productVersion/delVersion',  //删除版本
}

//--------商家添加（修改）资料-----------
export const serveInfo={
	edit:'user/editServe',  //商家资料修改(添加)
	get:'user/getServe',   //商家查询资料
}

//-------------------分析(数据/审核)--------------
export const analysis={
	ajaxhome:'analysis/ajaxhome',  //首页待审核数据
}

// 推荐管理
export const recommend = {
	getStore:'user/ajaxGetStore',
	getStudio:'studio/ajaxGetStudioList',
	getEquipment:'equip/ajaxGetEquipList',
	getActivity:'activity/ajaxGet',
	getAdminAdd:'adv/adminGet',
	updateAd:'/adv/adminEdit',
	adminAdd:'/adv/adminAdd'
}


//---------------------模特模块---------------------
export const model={
	modelList:'model/ajaxviewGet',  //模特列表
	modelIsUp:'model/serverIsUp',  //模特审核
}


//------------团购拼拍模块-------------------
export const team={
	teamList:'team/ajaxGetGoods',  //团购拼拍列表
	teamVerify:'team/update',  //团购拼拍审核
}

//------------小程序-------------------
export const miniApp = {
	getApplyList:'/wx/getApplyList',//列表

	create:'/wx/applyMiniApp',//创建小程序
	saveApply: '/wx/saveApplyData', // 提交申请需要的数据(文字字段)
	getApply: '/wx/getApply', // 查询自己提交的数据和状态
	getCreateStatus:'/wx/queryApplyMiniAppStatus', //查询创建状态
	queryMiniAppInfo:'/wx/queryMiniAppInfo',//查询已经创建的
	
	GetReUrl: '/wx/getReGrantUrl',// 获取重授权rul

	setMiniAppDomain: '/wx/setMiniAppDomain',//设置域名
	setMiniAppWorkDomain: '/wx/setMiniAppWorkDomain',//设置工作域名
	setMiniAppCategory: '/wx/setMiniAppCategory',//设置类目
	setMiniAppInfo: '/wx/setMiniAppInfo',//设置描述
	setMiniAppName: '/wx/setMiniAppName',//设置名称
	setMiniAppIcon: '/wx/setMiniAppIcon',//设置ICON
	setMiniAppTpl:'/wx/setMiniAppTpl',//设置代码
	setMiniAppCommit:'/wx/setMiniAppCommit',//提交审核
	setMiniAppRelease:'/wx/setMiniAppRelease',//提交发布

	queryNameAudit:'/wx/queryNameAudit',//查询名字审核
	queryOptStatus:'/wx/queryOptStatus',//查询OptStatus
	queryLastAuditStatus:'/wx/queryLastAuditStatus',//查询最近一次审核

	applyPay:'/wx/applyPay',
	queryPay:'/wx/queryPay',
	genQR: '/wx/genQR'
}

//--------------需求模块--------------
export const demand={
	getDemandList:'bidding/ajaxGetBidding', //需求列表
	updateDemand:'bidding/biddingEdit', //修改需求（修改状态，审核通过与否）
}
