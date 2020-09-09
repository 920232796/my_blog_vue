// import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import { Button, Input, Collapse, Pagination, CollapseItem, Drawer, Menu, MenuItem, Upload, Row} from 'element-ui';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


