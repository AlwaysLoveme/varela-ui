<template>
  <div class="infinite-scroll" ref="infiniteContainer" v-if="!disabled">
    <div class="infinite-scroll-content">
      <Loading size="32" spinType="spin" color="#999" />
      <span class="margin-left-10 loading-text">{{ loadText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Loading from "../Loading";
import { onMounted } from "vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    Loading,
  },
  props: {
    preloader: {
      type: Boolean,
      default: false,
    },
    loadText: {
      type: String,
      default: "加载中",
    },
    // 滚动到底部的触发距离 px
    threshold: {
      type: String,
      default: "15px",
    },
    triggerMounted: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["infinite"],
  setup(props, { emit }) {
    const disabled = ref(false);
    const infiniteContainer = ref<HTMLElement>();

    let oldDis = 0;
    const onScroll = (ev: Event) => {
      const target = ev.target;
      const { scrollTop, scrollHeight, clientHeight } = target as HTMLElement;
      const distance = scrollHeight - parseInt(props.threshold);
      console.log(distance);
      if (
        scrollTop + clientHeight >= distance &&
        scrollTop + clientHeight - oldDis > 0
      ) {
        emit("infinite");
      }
      oldDis = scrollTop + clientHeight;
    };

    let parentNode!: HTMLElement;
    const getParentNode = () => {
      parentNode = infiniteContainer.value?.parentNode as HTMLElement;
      if (!eleScrolled(parentNode) && !props.triggerMounted)
        disabled.value = true;
      parentNode.addEventListener("scroll", onScroll, { passive: false });
    };

    const eleScrolled = (ele: HTMLElement) => {
      if (!(ele instanceof HTMLElement))
        throw new Error(`error: ${ele} is not a HTMLElement`);
      if (ele.scrollTop > 0) return true;
      ele.scrollTop = 1;
      const scrollTop = ele.scrollTop;
      if (scrollTop) ele.scrollTop = 0;
      return scrollTop > 0;
    };

    onMounted(() => {
      if (props.triggerMounted) emit("infinite");
      getParentNode();
    });

    return {
      disabled,
      infiniteContainer,
    };
  },
});
</script>
