import Vue from 'vue'
//import $vm from '../../main'
import { format } from "date-fns";
import { demand,team,model,analysis,version,serveInfo,apply } from "@config/api.js"
import { qiniuHost } from '@config/config.js'

//生成随机数
export const getUUID = function (len) {
	len = len || 6;
	len = parseInt(len, 10);
	len = isNaN(len) ? 6 : len;
	var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
	var seedLen = seed.length - 1;
	var uuid = "";
	while (len--) {
		uuid += seed[Math.round(Math.random() * seedLen)];
	}
	return uuid;
};
//获取当前日期 如2019-07-20
export const getCurDay = function() {
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	return year + '-' + toDouble(month) + '-' + toDouble(day);
}
//深拷贝
export const deepcopy = function (source) {
	if (!source) {
		return source;
	}
	let sourceCopy = source instanceof Array ? [] : {};
	for (let item in source) {
		sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
	}
	return sourceCopy;
};

//ajax错误处理
export const catchError = function (error) {
	if (error.response) {
		switch (error.response.status) {
			case 400:
				Vue.prototype.$message({
					message: error.response.data.message || '请求参数异常',
					type: 'error'
				});
				break;
			case 403:
				Vue.prototype.$message({
					message: error.response.data.message || '无访问权限，请联系企业管理员',
					type: 'warning'
				});
				break;
			default:
				Vue.prototype.$message({
					message: error.response.data.message || '服务端异常，请联系技术支持',
					type: 'error'
				});
		}
	}
	return Promise.reject(error);
}

//删除再次确认方法
export const confirm = function (title = '此操作将永久删除信息, 是否继续?') {
	return $vm.$confirm(title, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
		center: true
	});
}

//检测表格方法
export const checkForm = function (obj, formName = 'form', tips = '请填写必填信息!') {
	let o = obj.$refs[formName] || obj.$refs['ruleForm'];
	return new Promise((resolve, reject) => {
		o.validate((valid) => {
			if (valid) {
				resolve(true);
			} else {
				$vm.$message.warning(tips);
				reject(false);
			}
		});
	})
}

//个位数字前面补0
export const toDouble = function (str) {
	let num = parseInt(str);
	return num > 9 ? num : '0' + num;
}


//将unix时间戳转换为年月日
export const time2Date = function (value, formatStr = 'YYYY-MM-DD') {
	return format(new Date(value * 1000), formatStr);
}

//比较两个对象数组差异，返回数组（暂时比较group_id,和group_name两个字段） array1/新修改的数组，array/旧的数组
//（暂时用在客户分组，和员工部门修改）
export const getDiff = function (array1, array2) {
	var result = [];
	for (var i = 0; i < array1.length; i++) {
		var obj = array1[i];
		var id = obj.group_id;
		var name = obj.group_name
		var isExist = false;
		for (var j = 0; j < array2.length; j++) {
			var obj2 = array2[j];
			var id2 = obj2.group_id;
			var name2 = obj2.group_name
			if (id == id2 && name == name2) {
				isExist = true;
				break;
			}
		}
		if (!isExist) {
			result.push(obj);
		}
	}
	return result;
}


//根据年月日计算年龄，birthDay 为字符串 如、'2011-02-01'
export const getAge = function (strBirthday) {
	var returnAge;
	var strBirthdayArr = strBirthday.split("-");
	var birthYear = strBirthdayArr[0];
	var birthMonth = strBirthdayArr[1];
	var birthDay = strBirthdayArr[2];

	var d = new Date();
	var nowYear = d.getFullYear();
	var nowMonth = d.getMonth() + 1;
	var nowDay = d.getDate();

	if (nowYear == birthYear) {
		returnAge = 0; //同年 则为0岁
	} else {
		var ageDiff = nowYear - birthYear; //年之差
		if (ageDiff > 0) {
			if (nowMonth == birthMonth) {
				var dayDiff = nowDay - birthDay; //日之差
				if (dayDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			} else {
				var monthDiff = nowMonth - birthMonth; //月之差
				if (monthDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			}
		} else {
			returnAge = 0; //返回-1 表示出生日期输入错误 晚于今天
		}
	}
	return returnAge; //返回周岁年龄
}

//图片压缩
export const picExplode =function (arrayStr,defaultPic,size=400){
	if(arrayStr === null || arrayStr === undefined || arrayStr ==='' || Object.prototype.toString.call(arrayStr) !== '[object String]'){
		return defaultPic;
	}
	let newArray = arrayStr.split(',').filter(item=>{return item});
	// console.log('newArray-------',newArray,qiniuHost);
	if(newArray.length>0){
		let test= qiniuHost+newArray[0] + '?imageMogr2/auto-orient/thumbnail/'+size+'x'+size+'>/blur/1x0/quality/75|imageslim';
		// console.log('test-----------',test);
		return qiniuHost+newArray[0] + '?imageMogr2/auto-orient/thumbnail/'+size+'x'+size+'>/blur/1x0/quality/75|imageslim';
	} else {
		return defaultPic;
	}
	
}


//返回方法封装
export const back = function (obj) {
	//	$vm.$router.go(-1);
	obj.$router.go(-1);
}
//获取路由表上的后台菜单
export const getServeMenu = (o) => {
	// let routeList = o.$router.options.routes.filter(item => {
	// 	if (item.meta && item.children) {
	// 		return item.meta.roles == "serve";
	// 	}
	// });
	const routeList = o.$router.options.routes
	return routeList;
};
//子账号登录，设置相关路由权限问题
export const setMenuPermission = (o, role) => {
	let roleList = getAccountRole(o, role);
	console.log('setMenuPermission---------', roleList);
	getServeMenu(o).forEach((item, index) => {
		if (roleList.includes(item.meta.menuRole)) {
			o.$set(item.meta, 'permission', true);
		}
	})
};

export const getAccountRole = (o, role) => {
	let roleList = [];
	let str = parseInt(role).toString(2);
	//反转数组并遍历
	str.split('').reverse().forEach((item, index) => {
		if (item > 0) {
			roleList.push(Math.pow(2, index));
		}
	})
	return roleList;
};
//获取后台菜单列表
export const getServeMenuList = (o) => {
	//获取后台菜单列表
	let menuList = [];
	o.$router.options.routes.forEach((item, index) => {
		if (item.meta && item.meta.roles == "serve" && item.children) {
			let obj = {
				menuRole: item.meta.menuRole,
				name: item.children[0].meta.title,
				status: '0'
			}
			menuList.push(obj);
		}
	})
	menuList.forEach((item, index) => {
		item.id = index;
	})
	return menuList;
};


//---------------版本--------------------
//获取版本列表信息
export const getVersion = () => {
	return new Promise((resolve, reject) => {
		$vm.getRequest(version.get).then(res => {
			resolve(res);
		}).catch(err => {});
	});
};

//新增版本方法
export const addVersion = (params) => {
	return new Promise((resolve, reject) => {
		$vm.postRequest(version.add,params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
};

//修改版本方法
export const updateVersion = (params) => {
	return new Promise((resolve, reject) => {
		$vm.postRequest(version.update,params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
};

//修改版本方法
export const delVersion = (id) => {
	let params={id:id}
	return new Promise((resolve, reject) => {
		$vm.postRequest(version.delete,params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
};



//---------------------商家资料------------------
//添加（修改）商家资料方法
export const editServeInfo = (params) => {
	return new Promise((resolve, reject) => {
		$vm.postRequest(serveInfo.edit,params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
};

//商家查询资料
export const getServeInfo = (uid) => {
	let params={uid:uid};
	return new Promise((resolve, reject) => {
		$vm.getRequest(serveInfo.get,params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
};

//---------------------分析（数据/审核）------------------
//获取首页待审核数据
export const ajaxhome = () => {
	return new Promise((resolve, reject) => {
		$vm.getRequest(analysis.ajaxhome).then(res => {
			resolve(res);
		}).catch(err => {});
	});
};


export const defaultAvatar=(function(){
	let defaultAvatar = qiniuHost + 'images/male.png';
	return defaultAvatar;
})();


export const isEmpty=(res)=>{
	if(res==null || res=='' || res==undefined || JSON.stringify(res)=='[]' || JSON.stringify(res)=='{}'){
		return true;
	}else{
		return false;
	}
}

export const CheckDate=(str)=>{
	var reg = /^(\d+)-(\d{1,2})-(\d{1,2})$/;
	var r = str.match(reg);
	if(r==null)return false;
	r[2]=r[2]-1;
	var d= new Date(r[1], r[2],r[3]);
	if(d.getFullYear()!=r[1])return false;
	if(d.getMonth()!=r[2])return false;
	if(d.getDate()!=r[3])return false;
	return true;
}

export const isArray= (o)=>{
	return Object.prototype.toString.call(o)== '[object Array]';
}

export const isMobile=(o)=>{
    var reg=/^[1][3,4,5,6,7,8][0-9]{9}$/;
    return reg.test(o)
}

export const isId = (o)=>{
	var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	return reg.test(o)
}
export const isEmail=(o)=>{
	var reg=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/; 
	return reg.test(o); 
}

 
//----------------模特模块------------------
//运营-列表(单个)
export const modelList = (params) => {
	return new Promise((resolve, reject) => {
		$vm.getRequest(model.modelList,params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//运营-模特上下架(审核)
export const modelIsUp = (params) => {
	return new Promise((resolve, reject) => {
		$vm.getRequest(model.modelIsUp,params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//----------------团购拼拍模块------------------
//运营-列表(单个)
export const teamList = (params) => {
	return new Promise((resolve, reject) => {
		$vm.getRequest(team.teamList,params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//运营-品牌服务上下架(审核)
export const teamVerify = (params) => {
	return new Promise((resolve, reject) => {
		$vm.postRequest(team.teamVerify,params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}



//-----------------审核商家（公司，个人）申请入驻--------------
export const verify = (params) => {
	return new Promise((resolve, reject) => {
		$vm.postRequest(apply.update,params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//--------------------------用户模块------------------
export const getUserToken = (uid) => {
	let params={uid:uid};
	return new Promise((resolve, reject) => {
		$vm.getRequest(apply.getUserToken,params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}


//-----------------------需求模块-----------------
//获取需求列表方法
export const getDemandList = function(params) {
	console.log('getDemandList------------',params);
	return new Promise((resolve, reject) => {
		$vm.getRequest(demand.getDemandList, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}

//修改需求
export const updateDemand = function(params) {
	return new Promise((resolve, reject) => {
		$vm.postRequest(demand.updateDemand, params).then(res => {
			resolve(res);
		}).catch(err => {});
	});
}