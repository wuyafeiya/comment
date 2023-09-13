import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons/index'
import VueRouter from 'vue-router'
import { Swipe, SwipeItem } from 'vant';
import { Circle } from 'vant';
import { Popup } from 'vant';
import 'vant/lib/index.css';

import { Skeleton } from 'vant';

Vue.use(Skeleton);
Vue.use(Popup);
Vue.use(Circle);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()
new Vue({
  render: h => h(App),
}).$mount('#app')

