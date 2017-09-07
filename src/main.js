// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router';
import store from './store';

import resource from 'vue-resource';
Vue.use(resource);

import './assets/css/reset.css';

FastClick.attach(document.body)

Vue.config.productionTip = false

// Vue.prototype.$baseurl = 'https://pro.wenjuan.com/report/s8/59891c5202aa5e6baa87553d/';
Vue.prototype.$baseurl = 'https://bank.wenjuan.com/report/s8/59ad0ffec976d857cb4121fb/';

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')