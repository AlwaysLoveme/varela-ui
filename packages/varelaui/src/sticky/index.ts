import "./Sticky.scss";
import Sticky from "./Sticky.vue";

Sticky.install = (app) => app.component(Sticky.name, Sticky);

if (typeof window !== "undefined" && window.Vue) {
  Sticky.install(window.Vue);
}

export default Sticky;
