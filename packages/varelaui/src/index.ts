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
import Tabs from "./tabs";
import Tab from "./tab";
import Swipe from "./swipe";
import SwipeItem from "./swipe-item";
import InfiniteScroll from "./infinite-scroll";
import { ToastCreate as Toast } from "./toast";

const components = [
  CountDown,
  Button,
  Loading,
  Modal,
  Icon,
  Tabs,
  Tab,
  Swipe,
  SwipeItem,
  Transition,
  Backdrop,
  Sticky,
  Refresher,
  InfiniteScroll,
];
const install = (app: App): App => {
  components.forEach((component) => app.use(component as Plugin));
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
  Tabs,
  Tab,
  Swipe,
  SwipeItem,
  Transition,
  Backdrop,
  Sticky,
  Refresher,
  InfiniteScroll,
};
export default { install };
