# `Varelaui`

> Vue3.0 UI框架

目前已开发的组件有：
1. [`Button`](src/button/README.md)
2. `BackDrop`
3. `CountDown`
4. `Icon`
5. `InfiniteScroll`
6. `Loading`
7. `Modal`
8. `Refresher`
9. `Sticky`
10. `Swipe/SwipeItem`
11. `Tabs/Tab`
12. `Toast`
13. `Transition`

### 安装

```bash
npm install varela-ui -S
```

### 使用
全量使用：
```ts
import App from "App.vue";
import { createApp } from "vue";
import Varelaui from "varela-ui";
import "varela-ui/lib/css/index.min.css";

createApp(App).use(Varelaui).mount("#app");
```
局部按需使用：
```ts
...
import { Button } from "varela-ui";
import "varela-ui/lib/css/index.min.css";

createApp(App).use(Button).mount("#app");
```