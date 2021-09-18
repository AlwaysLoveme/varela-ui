/**
 * 组件供API调用
 */
import { createApp, Component } from "vue";

export function mountComponent<T>(component: Component, options: Partial<T>) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const app = createApp(component, options);
  return {
    instance: app.mount(div),
    rmInstance() {
      app.unmount();
      document.body.removeChild(div);
    },
  };
}
