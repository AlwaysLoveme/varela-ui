import "./Tab.scss";
import Tab from "./Tab";
import { App, Plugin } from "vue";

const TabComponent = Tab as unknown as Plugin;

TabComponent.install = (app: App) => app.component(Tab.name, Tab);

if (typeof window !== "undefined" && window.Vue) {
  TabComponent.install(window.Vue);
}

export default TabComponent;
