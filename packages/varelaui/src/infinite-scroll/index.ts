import "./InfiniteScroll.scss";
import InfiniteScroll from "./InfiniteScroll.vue";
import "./InfiniteScroll.scss";

InfiniteScroll.install = (app) =>
  app.component(InfiniteScroll.name, InfiniteScroll);

if (typeof window !== "undefined" && window.Vue) {
  InfiniteScroll.install(window.Vue);
}

export default InfiniteScroll;
