/** Import styles */
import "./css/core.scss";

/** Import shared tools */
import request from "./shared/axios";
import animates from "./shared/animates";
import * as object from "./shared/object";

/** Import Components */
import { App, Plugin } from "vue";
import Icon from "./components/Icon";
import Modal from "./components/Modal";
import Button from "./components/Button";
import Loading from "./components/Loading";
import CountDown from "./components/CountDown";
import Backdrop from "./components/Backdrop";
import Transition from "./components/Transition";
import Sticky from "./components/Sticky";
import Refresher from "./components/Refresher";
import InfiniteScroll from "./components/InfiniteScroll";
import { ToastCreate as Toast } from "./components/Toast";

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
