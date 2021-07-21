import "./Tabs.scss";
import Tabs from "./Tabs.vue";

Tabs.install = (app) => app.component(Tabs.name, Tabs);

if (typeof window !== "undefined" && window.Vue) {
  Tabs.install(window.Vue);
}

export default Tabs;
