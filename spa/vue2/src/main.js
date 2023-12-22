import Vue from 'vue2'
import App from './App.vue'
import router from './router'
import { default as tztuiInit} from "tztui"
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let instance = null
const tztui = tztuiInit(Vue)

Vue.use(tztui.default ?? tztui)
Vue.config.productionTip = false;

function render (props = {}) {
  const { container } = props
  instance = new Vue({
    router,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#subApp') : '#subApp')
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}

renderWithQiankun({
  bootstrap() {
    // console.log('micro app bootstrap');
  },
  mount(props) {
    render(props);
  },
  unmount(props) {
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
  },
});
