import "./Refresher.scss";
import Refresher from "./Refresher.vue";

Refresher.install = (app) => app.component(Refresher.name, Refresher);

if (typeof window !== "undefined" && window.Vue) {
  Refresher.install(window.Vue);
}

export default Refresher;
