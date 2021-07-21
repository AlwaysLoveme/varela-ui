import "./Backdrop.scss";
import Backdrop from "./Backdrop.vue";

Backdrop.install = (app) => app.component(Backdrop.name, Backdrop);

if (typeof window !== "undefined" && window.Vue) {
  Backdrop.install(window.Vue);
}

export default Backdrop;
