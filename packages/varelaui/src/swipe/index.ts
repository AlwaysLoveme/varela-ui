import "./Swipe.scss";
import Swipe from "./Swipe";
import { App, Plugin } from "vue";

const SwipeComponent = Swipe as unknown as Plugin;

SwipeComponent.install = (app: App) => app.component(Swipe.name, Swipe);

if (typeof window !== "undefined" && window.Vue) {
  SwipeComponent.install(window.Vue);
}

export default SwipeComponent;