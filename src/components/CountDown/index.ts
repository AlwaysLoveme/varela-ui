import "./CountDown.scss";
import CountDown from "./CountDown.vue";

CountDown.install = (app) => app.component(CountDown.name, CountDown);

if (typeof window !== "undefined" && window.Vue) {
  CountDown.install(window.Vue);
}

export default CountDown;
