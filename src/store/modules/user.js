import { postRequest } from '@/util/httpUtil'
const user = {
    state: {
        user_data: JSON.parse(localStorage.getItem('admin-user')),
        no_login_notice_time: 0
    },
    mutations: {
        update_user_data(state, data) {
            localStorage.setItem("admin-user", JSON.stringify(data));
            state.user_data = data;
        },
        remove_user_data(state) {
            localStorage.removeItem("admin-user");
            state.user_data = false
        },
        update_no_login_notice_time(state, data) {
            localStorage.setItem("no_login_notice_time", data);
            state.no_login_notice_time = data;
        }
    },
    actions: {
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                postRequest("/user/ajaxLogin", userInfo).then(res => {
                    if (res instanceof Error || res == undefined) {
                        commit('remove_user_data')
                        reject(new Error('玄学问题'))
                    } else {
                        console.log('user 登录成功', res)
                        commit('update_user_data', res)
                        resolve(res)
                    }

                }).catch(err => {
                    commit('remove_user_data')
                    reject(err)
                })
            })
        },
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                postRequest("/user/ajaxLogout").then(() => {
                    commit('remove_user_data')
                    resolve()
                }).catch(err => reject(err))
            })
        }
    }
}
export default user