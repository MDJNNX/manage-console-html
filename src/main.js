import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
//import VueResource from 'vue-resource'
import Axios from 'axios'
import VueResourceMock from 'vue-resource-mock'
import MockData from '../src/mock/mockData'
import qs from 'qs'

import LoginPage from './pages/login.vue'
import MainPage from './pages/main.vue'
import SupportPage from './pages/mainPages/suport/support.vue'
import RoutinePage from './pages/mainPages/routine/routine.vue'
import SettingPage from './pages/mainPages/setting/setting.vue'

//monitor 资源监控
import Monitor from './pages/mainPages/monitor/monitor.vue'
import MServerList from './pages/mainPages/monitor/mserverList.vue'
import MAcq from './pages/mainPages/monitor/macq.vue'

import MonitorChart from './pages/mainPages/monitor/sub/mchart.vue'
import MAlarmRule from './pages/mainPages/monitor/malarmPage.vue'

//import '../static/bootstrap/css/bootstrap.min.css'

import ElementUI from 'element-ui';
//import { Button, Select, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

//import router from './router'

//Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(ElementUI);
//Vue.use(VueResource)
//Vue.use(Button);
//Vue.use(Select);
//Vue.use(Input);


let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: LoginPage
        },
        {
            path: '/main',
            component: MainPage,
            redirect: '/main/monitor/mserverList',
            children: [
                {
                    path: 'monitor',
                    component: Monitor,
                    redirect: '/main/monitor/mserverList',
                    children: [
                        {
                            path: 'mserverList',
                            component: MServerList
                        },
                        {
                            path: 'mserverList/:serverId',
                            component: MonitorChart
                        },
                        {
                            path: 'malarmRule',
                            component: MAlarmRule
                        },
                        {
                            path: 'acq',
                            component: MAcq
                        }
                    ]
                },
                {
                    path: 'support',
                    component: SupportPage
                },
                {
                    path: 'routine',
                    component: RoutinePage
                },
                {
                    path: 'setting',
                    component: SettingPage
                }
            ]
        }
    ]
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
