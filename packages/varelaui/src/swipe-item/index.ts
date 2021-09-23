import "./SwipeItem.scss";
import SwipeItem from "./SwipeItem";
import { App, Plugin } from "vue";

const SwipeItemComponent = SwipeItem as unknown as Plugin;

SwipeItemComponent.install = (app: App) => app.component(SwipeItem.name, SwipeItem);

if (typeof window !== "undefined" && window.Vue) {
  SwipeItemComponent.install(window.Vue);
}

export default SwipeItemComponent;