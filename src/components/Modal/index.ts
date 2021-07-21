import "./Modal.scss";
import Modal from "./Modal.vue";

Modal.install = (app) => app.component(Modal.name, Modal);

if (typeof window !== "undefined" && window.Vue) {
  Modal.install(window.Vue);
}

export default Modal;
