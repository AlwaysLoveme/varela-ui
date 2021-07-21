/** Import styles */
import "@/css/core.scss";

/** Import shared tools */
import request from "@/shared/axios";
import animates from "@/shared/animates";
import * as object from "@/shared/object";
export { request, animates, object };

/** Import Components */
import { App } from "vue";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import CountDown from "@/components/CountDown";
import Backdrop from "./components/Backdrop";
import Transition from "./components/Transition";
import Sticky from "./components/Sticky";
import Refresher from "./components/Refresher";
import InfiniteScroll from "./components/InfiniteScroll";
import { ToastCreate as Toast } from "./components/Toast";
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

const components: any[] = [
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
];
const install = (app: App): App => {
  components.forEach((component) => {
    app.use(component);
  });
  return app;
};
export default install;
