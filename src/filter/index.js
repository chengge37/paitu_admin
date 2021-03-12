import { format } from "date-fns";

//金额格式化方法
function formatMoney(num) {
    var str = num.toString();
    var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg,"$1,");
}

//将unix时间戳转换为年月日
function time2Date(value,formatStr='YYYY-MM-DD'){
	return format(new Date(value * 1000), formatStr);
}
function time2DateFull(value,formatStr='YYYY-MM-DD HH:mm:ss'){
	return format(new Date(value * 1000), formatStr);
}

//转换收入/支出类型
function formatInOrOut(type) {
  if (type == 1) {
    return "收入";
  } else if (type == 0) {
    return "支出";
  }
}

export default{
	formatMoney,time2Date,formatInOrOut,time2DateFull
}
