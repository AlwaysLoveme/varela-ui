import "./Tabs.scss";
import Tabs from "./Tabs";
import { App, Plugin } from "vue";

const TabsComponent = Tabs as unknown as Plugin;
TabsComponent.install = (app: App) => app.component(Tabs.name, Tabs);

if (typeof window !== "undefined" && window.Vue) {
  TabsComponent.install(window.Vue);
}

export default TabsComponent;
