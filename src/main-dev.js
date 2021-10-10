import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Input, Collapse, Pagination, CollapseItem, Drawer, Menu, MenuItem, Upload, Row, Message, Loading, Form, FormItem} from 'element-ui';
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)
Vue.use(Button)
Vue.use(Input)
Vue.use(Collapse)
Vue.use(Pagination)
Vue.use(CollapseItem)
Vue.use(Drawer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Upload)
Vue.use(Row)
Vue.use(Loading)
Vue.use(Form)
Vue.use(FormItem)
Vue.prototype.$message = Message;



// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


