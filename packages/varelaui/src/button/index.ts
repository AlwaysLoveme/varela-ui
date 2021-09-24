import "./Button.scss";
import Button from "./Button";
import type { App } from "vue";

Button.install = (app: App) => app.component(Button.name, Button);

if (typeof window !== "undefined" && window.Vue) {
  Button.install(window.Vue);
}

export default Button;
