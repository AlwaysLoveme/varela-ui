/** Import styles */
import "./css/core.scss";
/** Import shared tools */
import request from "./shared/axios";
import animates from "./shared/animates";
import * as object from "./shared/object";

/** Import Components */
import { App, Plugin } from "vue";
import Icon from "./icon";
import Modal from "./modal";
import Button from "./button";
import Loading from "./loading";
import CountDown from "./count-down";
import Backdrop from "./backdrop";
import Transition from "./transition";
import Sticky from "./sticky";
import Refresher from "./refresher";
import InfiniteScroll from "./infinite-scroll";
import { ToastCreate as Toast } from "./toast";

const components: Plugin[] = [
  CountDown,
  Button,
  Loading,
  Modal,
  Icon,
  Transition,
  Backdrop,
  Sticky,
  Refresher,
  InfiniteScroll,
];
const install = (app: App): App => {
  components.forEach((component) => app.use(component));
  app.config.globalProperties.$toast = Toast;
  return app;
};

export { request, animates, object };
export {
  CountDown,
  Button,
  Loading,
  Modal,
  Icon,
  Toast,
  Transition,
  Backdrop,
  Sticky,
  Refresher,
  InfiniteScroll,
};
export default { install };
