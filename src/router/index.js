import Vue from 'vue'
import Router from 'vue-router'
const notfound = () => import( /* webpackChunkName: "notfound" */ '../views/notfound/notfound');
const homePage = () => import( /* webpackChunkName: "home" */ '../views/pages/home');
const loginPage = () => import( /* webpackChunkName: "home" */ '../views/pages/login');
const equip = () => import('../views/components/equip/equip');
const serveApply = () => import('../views/components/apply/serveApply');
const yunpianTpl = () => import('../views/components/sms/yunpianTpl');
const smsTpl = () => import('../views/components/sms/smsTpl');
const question = () => import('../views/components/question/index');
const comments = () => import('../views/components/comments/index');
const studio = () => import('../views/components/studio/index');
const studioDetail = () => import('../views/components/studio/detail');
const activity = () => import('../views/components/activity/index');
const activityDetail = () => import('../views/components/activity/detail');
const category = () => import('../views/components/category/category');
const brand = () => import('../views/components/brand');
const city = () => import('../views/components/city');
const help = () => import('../views/components/help/index')
const pic = () => import('../views/components/qiniu')
const user = () => import('../views/components/user')
const beanstalk = () => import('../views/components/system/beanstalk')
const productList = () => import('../views/components/productList/productList')
const productOrder = () => import('../views/components/productList/productOrder')
const productType = () => import('../views/components/productList/productType')
const finance = () => import('../views/components/finance/index.vue')
const userDetail = () => import('../views/components/user/userDetail.vue')
const subAccount = () => import('../views/components/user/subAccount.vue')
const storeTemplate = () => import('../views/components/storeTemplate')
const feedback = () => import('../views/components/feedback')
const refundAudit = () => import('../views/components/refundAudit')
const auditDetail = () => import('../views/components/refundAudit/auditDetail.vue')
const version = () => import('../views/components/version/index.vue')
const recommend = () => import('../views/components/recommend/recommend')

//?????????
const coupon = () => import('../views/components/coupon/index.vue')
const couponDetail = () => import('../views/components/coupon/couponDetail.vue')
//?????????
const smallPro = () => import('../views/components/smallPro/index.vue')
const smallProDetail = () => import('../views/components/smallPro/smallProDetail.vue')

//??????
const model = () => import('../views/components/model/index');

//??????????????????????????????????????????,???????????????
const serviceApply = () => import('../views/components/serviceApply/index');

//???????????????????????????
const demandApply = () => import('../views/components/demandApply/index');

import Layout from '../layout'
Vue.use(Router);
export const router = new Router({
    mode: 'history',
    routes: [{
            path: '/login',
            name: 'login',
            component: loginPage,
        },
        {
            path: '/',
            component: Layout,
            hidden: true,
            redirect: '/serve/homePage/index',
            meta: {
                roles: "serve",
            },
        },
        {
            path: '/serve/homePage',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 1,
                permission: false,
            },
            children: [{
                path: 'index',
                component: homePage,
                name: 'homePage',
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }
            }]
        },
        {
            path: '/serve/beanstalk',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 2,
                permission: false,
            },
            children: [{
                path: 'index',
                name: 'beanstalk',
                component: beanstalk,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }

            }]
        },
        {
            path: '/serve/finance',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 4,
                permission: false,
            },
            children: [{
                path: 'index',
                name: 'finance',
                component: finance,
                meta: {
                    title: '??????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }

            }]
        },
        {
            path: '/serve/equipment',
            component: Layout,
            onlyShowfirst: false,
            meta: {
                roles: "serve",
                menuRole: 8,
                permission: false,
                title: '??????',
                icon: 'xiuxi', //??????????????????
            },
            children: [{
                    path: 'equip',
                    name: 'equip',
                    component: equip,
                    meta: {
                        title: '???????????????',
                        icon: 'xiuxi',
                        requiresAuth: true,
                    }

                },
                {
                    path: 'city',
                    name: 'city',
                    component: city,
                    meta: {
                        title: '??????',
                        icon: 'xiuxi',
                        requiresAuth: true,
                    }

                },
                {
                    path: 'brand',
                    name: 'brand',
                    component: brand,
                    meta: {
                        title: '??????',
                        icon: 'xiuxi',
                        requiresAuth: true,
                    }

                },
                {
                    path: 'category',
                    name: 'category',
                    component: category,
                    meta: {
                        title: '??????',
                        icon: 'xiuxi',
                        requiresAuth: true,
                    }

                },
            ]
        },
        {
            path: '/serve/apply',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 16,
                permission: false
            },
            children: [{
                path: 'serveApply',
                name: 'serveApply',
                component: serveApply,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }
            }]
        },
        {
            path: '/serve/demandApply',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 16,
                permission: false
            },
            children: [{
                path: 'index',
                name: 'index',
                component: demandApply,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }
            }]
        },
        {
            path: '/serve/serviceApply',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 16,
                permission: false
            },
            children: [{
                path: 'index',
                name: 'index',
                component: serviceApply,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }
            }]
        },
        {
            path: '/serve/Template',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 16384,
                permission: false
            },
            children: [{
                path: 'storeTemplate',
                name: 'storeTemplate',
                component: storeTemplate,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }
            }]
        },
        {
            path: '/serve/message',
            component: Layout,
            onlyShowfirst: false,
            meta: {
                roles: "serve",
                menuRole: 32,
                permission: false,
                title: '??????',
                icon: 'xiuxi',
            },
            children: [{
                path: 'yunpianTpl',
                name: 'yunpianTpl',
                component: yunpianTpl,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }
            }, {
                path: 'smsTpl',
                name: 'smsTpl',
                component: smsTpl,
                meta: {
                    title: '??????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }
            }]
        },
        {
            path: '/serve/question',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 64,
                permission: false,
            },
            children: [{
                path: 'index',
                name: 'question',
                component: question,
                meta: {
                    title: '??????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }

            }]
        },
        {
            path: '/serve/feedback',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 64,
                permission: false,
            },
            children: [{
                path: 'index',
                name: 'feedback',
                component: feedback,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }

            }]
        },
        {
            path: '/serve/comments',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 128,
                permission: false,
            },
            children: [{
                path: 'index',
                name: 'comments',
                component: comments,
                meta: {
                    title: '??????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }

            }]
        },
        {
            path: '/serve/activity',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 256,
                permission: false,
            },
            children: [{
                    path: 'index',
                    name: 'activity',
                    component: activity,
                    meta: {
                        title: '??????',
                        icon: 'xiuxi',
                        requiresAuth: true,
                    }

                },
                {
                    path: 'detail',
                    name: 'activityDetail',
                    component: activityDetail,
                    meta: {
                        title: '??????',
                        activeMenu: "/serve/activity/index"
                    }

                },
            ]
        },
        {
            path: '/serve/coupon',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 256,
                permission: false,
            },
            children: [{
                    path: 'index',
                    name: 'coupon',
                    component: coupon,
                    meta: {
                        title: '?????????',
                        icon: 'xiuxi',
                        requiresAuth: true,
                    }

                },
                {
                    path: 'detail',
                    name: 'couponDetail',
                    component: couponDetail,
                    meta: {
                        title: '??????',
                        activeMenu: "/serve/coupon/index"
                    }

                },
            ]
        },
        {
            path: '/serve/studio',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 512,
                permission: false,
            },
            children: [{
                    path: 'index',
                    name: 'studio',
                    component: studio,
                    meta: {
                        title: '??????',
                        icon: 'xiuxi',
                        requiresAuth: true,
                    }

                }, //studioDetail
                {
                    path: 'detail',
                    name: 'detail',
                    component: studioDetail,
                    meta: {
                        title: '??????',
                        icon: 'xiuxi',
                        activeMenu: "/serve/studio/index"
                    }

                }
            ]
        },{
            path: '/serve/model',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 512,
                permission: false,
            },
            children: [{
                    path: 'index',
                    name: 'model',
                    component: model,
                    meta: {
                        title: '??????',
                        icon: 'xiuxi',
                        requiresAuth: true,
                    }

                }
            ]
        },
        {
            path: '/serve/help',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 1024,
                permission: false,
            },
            children: [{
                path: 'index',
                name: 'help',
                component: help,
                meta: {
                    title: '??????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }

            }]
        },
        {
            path: '/serve/smallPro',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 1024,
                permission: false,
            },
            children: [{
                path: 'index',
                name: 'smallPro',
                component: smallPro,
                meta: {
                    title: '?????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }
            },{
                path: 'detail',
                name: 'smallProDetail',
                component: smallProDetail,
                meta: {
                    title: '??????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                } 
            }]
        },
        {
            path: '/serve/refundAudit',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 1024,
                permission: false,
            },
            children: [
                {
                path: 'index',
                name: 'refundAudit',
                component: refundAudit,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }

            },
                {
                path: 'auditDetail',
                name: 'auditDetail',
                component: auditDetail,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                    activeMenu: "/serve/refundAudit/index"
                }

            },
        ]
        },
        {
            path: '/serve/pic',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 2048,
                permission: false,
            },
            children: [{
                path: 'index',
                name: 'pic',
                component: pic,
                meta: {
                    title: '?????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }

            }]
        },
        {
            path: '/serve/user',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 4096,
                permission: false,
            },
            children: [{
                    path: 'index',
                    name: 'user',
                    component: user,
                    meta: {
                        title: '??????',
                        icon: 'xiuxi',
                        requiresAuth: true,
                    }

                },
                {
                    hidden: true,
                    path: 'userDetail',
                    name: 'userDetail',
                    component: userDetail,
                    meta: {
                        requiresAuth: true,
                        activeMenu: "/serve/user/index"
                    }

                },
                {
                    hidden: true,
                    path: 'subAccount',
                    name: 'subAccount',
                    component: subAccount,
                    meta: {
                        requiresAuth: true,
                        activeMenu: "/serve/user/index"
                    }

                }
            ]
        },
        {
            path: '/serve/version',
            component: Layout,
            onlyShowfirst: true,
            meta: {
                roles: "serve",
                menuRole: 8192,
                permission: false,
            },
            children: [{
                    path: 'index',
                    name: 'version',
                    component: version,
                    meta: {
                        title: '??????',
                        icon: 'xiuxi',
                        requiresAuth: true,
                    }
             }]
        },
        {
            path: '/serve/prod',
            component: Layout,
            onlyShowfirst: false,
            meta: {
                roles: "serve",
                menuRole: 16384,
                permission: false,
                title: '??????',
                icon: 'xiuxi',
            },
            children: [{
                path: 'productList',
                name: 'productList',
                component: productList,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }

            }, {
                path: 'productOrder/index',
                name: 'productOrder',
                component: productOrder,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }

            },
            {
                path: 'productType',
                name: 'productType',
                component: productType,
                meta: {
                    title: '????????????',
                    icon: 'xiuxi',
                    requiresAuth: true,
                }
                
            }
        ]
    },
    {
        path:'/serve',
        component: Layout,
        onlyShowfirst: false,
        meta:{
            roles: "serve",
            menuRole:32768,
        },
        children:[{
            path: 'recommend',
            name: 'recommend',
            component: recommend,
            meta: {
                title: '????????????',
                icon: 'xiuxi',
                requiresAuth: true,
                }                
            }]
        },
        {
            path: '/404',
            name: '404',
            component: notfound,
        },
        {
            path: '/*',
            name: 'notfound',
            component: notfound,
        }
    ]
});


export default router