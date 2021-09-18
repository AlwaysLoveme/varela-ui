import "./Tab.scss";
import Tab from "./Tab.vue";

Tab.install = (app) => app.component(Tab.name, Tab);

if (typeof window !== "undefined" && window.Vue) {
  Tab.install(window.Vue);
}

export default Tab;
