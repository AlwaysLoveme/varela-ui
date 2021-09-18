import "./Loading.scss";
import Loading from "./loading.vue";
import "./Loading.scss";

Loading.install = (app) => app.component(Loading.name, Loading);

if (typeof window !== "undefined" && window.Vue) {
  Loading.install(window.Vue);
}

export default Loading;
