import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import echarts from "echarts";
import axios from "axios";

Vue.use(ElementUI);

require("echarts-wordcloud");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件，图例
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
Vue.prototype.$echarts = echarts; //引入组件
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

// axios默认配置
axios.defaults.timeout = 10000;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
