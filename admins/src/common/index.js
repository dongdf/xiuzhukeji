import MyMsg from './main.js';

const components = [MyMsg];

let install =function(Vue){
  components.map(component => {
    Vue.component(component.name, component);
  });
 Vue.prototype.$mymsg = MyMsg;
}

if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};


export default {
    install
}
