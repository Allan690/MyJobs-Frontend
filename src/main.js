import Vue from 'vue'
import AntDesign from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import LazyloadDirective from "./Directives/LazyloadDirective";

Vue.use(AntDesign);
Vue.config.productionTip = false;
Vue.directive("lazyload", LazyloadDirective);

new Vue({
  render: h => h(App),
}).$mount('#app');
