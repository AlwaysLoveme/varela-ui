declare module "*.vue" {
  import type { DefineComponent, App } from "vue";
  const component: DefineComponent & {
    install(app: App): App;
  };
  export default component;
}
declare type TimeoutHandle = ReturnType<typeof global.setTimeout>;

interface Window {
  Vue: any;
}
