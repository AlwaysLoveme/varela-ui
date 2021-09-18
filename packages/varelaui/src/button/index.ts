import "./Button.scss";
import Button from "./Button.vue";

Button.install = (app) => app.component(Button.name, Button);

if (typeof window !== "undefined" && window.Vue) {
  Button.install(window.Vue);
}

export default Button;
