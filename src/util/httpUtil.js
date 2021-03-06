import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import Qs from 'qs'
import Store from '../store';
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.defaults.withCredentials = true;
//axios.defaults.baseURL = '/adminapi';

let base = '/adminapi/';
let apiBase='/api/';
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: Qs.stringify(params),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 5000
    }).catch(err => {
        console.log('http util post catch ', err);
        return Promise.reject(err);
    })
}
export const apiPostRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${apiBase}${url}`,
        data: Qs.stringify(params),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 5000
    }).catch(err => {
        console.log('http util post catch ', err);
        return Promise.reject(err);
    })
}
export const postFile = (url, formData) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        timeout: 5000
    }).catch(err => {
        console.log('http util  postfile catch ', err);
        return Promise.reject(err);
    });
}

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params,
        timeout: 300000
    }).catch(err => {
        console.log('http util getRequest catch ', err);
        return Promise.reject(err);
    });
}

export const apiGetRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${apiBase}${url}`,
        params: params,
        timeout: 300000
    }).catch(err => {
        console.log('http util getRequest catch ', err);
        return Promise.reject(err);
    });
}



//?????????????????????
axios.interceptors.request.use(config => {
    if (Store.getters.is_login_in) {
        //??????????????????token?????????????????????????????????http header?????????token
        config.headers.Authorization = `token ${Store.getters.user_data.token}`;
    }
    return config;
}, err => {
    Message.error({
        message: '????????????!'
    });
    return Promise.reject(err);
})
axios.interceptors.response.use(response => {
    console.log(response)
    let resqContentType = response.headers['content-type'];
    if (resqContentType.indexOf('json') == -1) {
        Message.error({
            message: '???????????????,??????JSON?????????'
        });
        return Promise.reject(new Error('???????????????,??????JSON?????????'));;
    }
    if (response.status == 200) {
        //??????JSON
        let dataObj = '';

        function strIsJSON(str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return true;
                    } else {
                        return false;
                    }

                } catch (e) {
                    console.log('error???' + str + '!!!' + e);
                    return false;
                }
            }
            return false;
        };
        let isJSON = false;
        try {
            dataObj = JSON.stringify(response.data);
            isJSON = strIsJSON(dataObj);
        } catch (err) {
            console.log('JSON ERR');
        }
        if (!isJSON) {
            Message.error({
                message: '???????????????,??????JSON?????????'
            });
            return Promise.reject(new Error('???????????????,??????JSON?????????'));
        }
    }
    if (response.data.status == 0) {
        return Promise.resolve(response.data.data);
    } else {
        Message.error({
            message: response.data.msg
        });
        return Promise.reject(new Error(response.data.msg));
    }
}, err => {
    console.log('httpUtil err', err);
    if (err.response === null || err.response === undefined) {
        Message.error({
            message: '??????????????????????????????,????????????'
        });
        return Promise.reject(new Error('??????????????????????????????,????????????'));
    } else {
        if (err.response.status == 504 || err.response.status == 404) {
            Message.error({
                message: '??????????????????????????????'
            });
        } else if (err.response.status == 403) {
            Message.error({
                message: '????????????,??????????????????!'
            });
        } else if (err.response.status == 401) {
            Store.commit('remove_user_data');
            var timestamp = (new Date()).getTime();
            //????????????Message?????????
            console.log(Store.getters);
            let timeDis = timestamp - Store.getters.no_login_notice_time
            console.log('timeDis - ---- ' + timeDis);
            if (timeDis > 300) {
                console.log('401', err.response);
                $vm.$confirm('????????????????????????, ????????????????', '??????', {
                    confirmButtonText: '??????',
                    cancelButtonText: '??????',
                    type: 'warning'
                }).then(() => {
                    $vm.$router.push('/login');
                }).catch(() => {});
            }
            Store.commit('update_no_login_notice_time', timestamp);
        } else {
            if (err.response.data.msg) {
                Message.error({
                    message: err.response.data.msg
                });
            } else {
                Message.error({
                    message: '????????????!'
                });
            }
        }
    }
    return Promise.reject(err);
})
Vue.prototype.getRequest = getRequest;
Vue.prototype.apiGetRequest = apiGetRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.apiPostRequest = apiPostRequest;
Vue.prototype.postFile = postFile;
export default axios