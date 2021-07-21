import "./Icon.scss";
import Icon from "./Icon.vue";

Icon.install = (app) => app.component(Icon.name, Icon);

if (typeof window !== "undefined" && window.Vue) {
  Icon.install(window.Vue);
}

export default Icon;
