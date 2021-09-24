import "./Loading.scss";
import Loading from "./Loading";

import type { App } from "vue";

Loading.install = (app: App) => app.component(Loading.name, Loading);

if (typeof window !== "undefined" && window.Vue) {
  Loading.install(window.Vue);
}

export default Loading;
