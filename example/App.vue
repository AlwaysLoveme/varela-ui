<template>
  <div style="padding: 46px 0">
    <nav class="nav"></nav>

    <div class="content padding-10">
      <Refresher @refresh="onDone" @pulling="pulling" />
       <count-down :time-value="1631615430000" type="timing"></count-down>
      <div class="margin-20">
        <Loading></Loading>
      </div>
      <div class="margin-bottom-24">
        <Button type="raised" text="button" icon="home" :loading="loading" @click="setLoading" />
      </div>
      <div class="margin-bottom-24">
        <Button type="fill" @click="modal=true" text="Loading" />
      </div>
      <div>
        <Button type="fill" @click="toastCreate" text="Http" />
      </div>

      <Modal v-model:show="modal" closeable>
        <img :src="qrcode" alt="">
      </Modal>

      <Overlay v-model:show="overlay">
      </Overlay>

      <!-- <ul>
        <li v-for="(item, index) of data" :key="index" class="items">{{item}}</li>
      </ul>
      <infinite-scroll @infinite="loadmore" triggerMounted></infinite-scroll> -->
      <div class="scroll">
        <div>
          <div class="main">
            <Sticky style="background: red; height: 30px">
              435353535
            </Sticky>
          </div>
        </div>
        <nav></nav>
      </div>
      <nav style="height: 100vh"></nav>

    </div>

  </div>

</template>

<script>
import { ref } from "vue";
import { CountDown, Button, Loading, Modal, request, Backdrop, Toast, Sticky, Refresher, InfiniteScroll } from "../lib";

request.beforeRequest = (config) => {
  console.log(config);
  config.params.username = 1123;
  return Promise.resolve(config);
};
export default {
  name: "App",
  components: {
    Toast,
    Modal,
    Button,
    Loading,
    Sticky,
    Overlay: Backdrop,
    CountDown,
    Refresher,
    InfiniteScroll,
    InfiniteScroll
  },
  setup() {
    const loading = ref(false);
    const overlay = ref(false);
    const modal = ref(false);
    const toast = ref(false);
    const setLoading = () => {
      loading.value = true;
      setTimeout(() => loading.value = false, 2000);
    };

    const qrcode = ref("https://api.wrdan.com/qr?data=akjshdkashd");
    const http = async () => {
      const data = await request({
        url: "https://api.wrdan.com/qr",
        method: "GET",
        params: {
          data: "lkashdahgd",
          size: 9,
          border: 5
        }
      });
      console.log(data);
    };
    const toastCreate = () => {
      Toast("您好");
    };
    const progress = ref(0);
    setInterval(() => progress.value = progress.value + 0.05, 1000)
    const onDone = ({ done }) => {
      setTimeout(done, 3000)
    }
    const pulling = (e) => {
      // console.log(e);
    }

    const data = ref([]);
    const loadmore = () => {
      setTimeout(() => {
        for (let i = 2; i < 20; i++) {
          data.value.push(`item${i}`);
        }
      }, 2000);

    };

    return {
      http,
      data,
      toast,
      loadmore,
      progress,
      pulling,
      toastCreate,
      loading,
      overlay,
      modal,
      qrcode,
      onDone,
      setLoading
    };
  }
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .content {
    position: relative;
    height: 100%;
    overflow-y: auto;
    overscroll-behavior-y: contain;
  }
}
nav.nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background: #0a98f7;
  z-index: 99;
}
.scroll {
  position: relative;
  width: 30%;
  height: 30vh;
  overflow-y: auto;
  padding: 10px;
  margin: 10px 0;
  background: #eee;
  padding-top: 100px;
  // -webkit-overflow-scrolling: touch;
  // &:after {
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 1px;
  //   background: linear-gradient(to right, #000000, #000000 5px, transparent 5px, transparent);
  //   background-size: 10px 100%;
  // }
}

.scroll nav {
  height: 80vh;
}
.items {
  width: 100%;
  height: 40px;
  line-height: 40px;
}
progress {
  border: solid 1px #eee;
  background: #3c4851;
  border-radius: 1em;
  color: #0a98f7;
  overflow: hidden;
}
progress::-moz-progress-bar {
  background: #0a98f7;
}
progress::-webkit-progress-bar {
  background: #0a98f7;
}
progress::-webkit-progress-value {
  background: #0e4f7a;
}
</style>
