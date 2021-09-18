import "./Toast.scss";
import Toast from "./Toast.vue";
import { mountComponent } from "../shared/mount-component";

export enum ToastPosition {
  CENTER = "center",
  BOTTOM = "bottom",
  TOP = "top",
}
export interface ToastOptions {
  icon?: string;
  text?: string;
  onClose?: (() => void) | null;
  onDestroy?: () => void;
  position?: ToastPosition;
  timeout?: number | string;
}
export function ToastCreate(options: ToastOptions) {
  if (typeof options === "string") {
    options = {
      text: options,
    };
  }
  options.onClose = () => {
    options.onDestroy?.();
    rmInstance();
  };
  const { rmInstance } = mountComponent(Toast, options);
}
