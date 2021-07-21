import "./Transition.scss";
import Transition from "./Transition.vue";

Transition.install = (app) => app.component(Transition.name, Transition);

if (typeof window !== "undefined" && window.Vue) {
  Transition.install(window.Vue);
}

export default Transition;
