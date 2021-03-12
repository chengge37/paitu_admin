import router from '../router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'
import store from '../store';
router.beforeEach((to, from, next) => {
    NProgress.start()
    // 检测路由配置中是否有requiresAuth这个meta属性
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 判断是否已登录
        if (store.getters.is_login_in || localStorage.getItem('admin-user') === null) {
            next();
            return;
        }
        // 未登录则跳转到登录
        next('/login');
    } else {
        next()
    }
})
router.afterEach(() => {
    NProgress.done() // 结束Progress
})