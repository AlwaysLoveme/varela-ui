<template>
  <div class="refresher" ref="refresher">
    <div class="refresher-content" :style="refresherContentStyle">
      <Animation name="fadeIn">
        <Icon
          size="32"
          :icon="refreshIcon"
          class="position-center icon"
          v-if="refreshStatus === 'default' || refreshStatus === 'success'"
        />
        <div class="position-center" v-else>
          <Loading spinType="md" size="26" />
        </div>
      </Animation>
    </div>
  </div>
</template>

<script lang="ts">
import Icon from "../icon";
import Loading from "../loading";
import Animation from "../transition";
import { onMounted, onUnmounted } from "vue";
import { computed, defineComponent, ref } from "vue";

import type { RefresherStatus } from "./interface";

export default defineComponent({
  name: "VRefresher",
  components: {
    Icon,
    Loading,
    Animation,
  },
  props: {
    pullMax: {
      type: Number,
      default: 200,
    },
    pullMin: {
      type: Number,
      default: 80,
    },
    successDuration: {
      type: Number,
      default: 2000,
    },
  },
  emits: ["pulling", "refresh"],
  setup(props, { emit }) {
    const refresher = ref();
    const distance = ref(0);
    const rotate = ref(0);
    const refreshStatus = ref<RefresherStatus>("default");

    const refresherContentStyle = computed(() => {
      return {
        transform: `translate3d(0, ${distance.value}px, 1px) rotate(${rotate.value}deg)`,
      };
    });
    const refreshIcon = computed(() => {
      return refreshStatus.value === "default" ? "refresh" : "check_circle";
    });

    let startY = 0;
    let touched = false;
    const touchstart = (e: TouchEvent) => {
      e.stopPropagation();
      touched = refreshStatus.value === "default";
      startY = e.touches[0].clientY;
    };
    const touchmove = (e: TouchEvent) => {
      e.stopPropagation();
      const scrollTop = parentNode.scrollTop;
      if (!touched || scrollTop > 0) return;
      const moveDistance = (e.touches[0].clientY - startY) / 2 - 20;
      distance.value =
        moveDistance >= props.pullMax ? props.pullMax : moveDistance;
      if (
        distance.value <= props.pullMax &&
        scrollTop === 0 &&
        distance.value > -20
      ) {
        e.cancelable && e.preventDefault();
      }
      rotate.value = distance.value * 2.5;
      refreshStatus.value =
        distance.value >= props.pullMax * 0.65 ? "pulling" : "default";
      emit("pulling", e);
    };
    const touchEnd = () => {
      if (refreshStatus.value === "refreshing") return;
      touched = false;
      if (distance.value < props.pullMin) {
        rotate.value = 0;
        return (distance.value = 0);
      }
      emit("refresh", { done });
      refreshStatus.value = "refreshing";
      rotate.value = 0;
      distance.value = refresher.value.offsetHeight + 20;
    };
    const done = () => {
      refreshStatus.value = "success";
      setTimeout(() => {
        distance.value = 0;
        setTimeout(() => (refreshStatus.value = "default"), 200);
      }, props.successDuration);
    };

    let parentNode!: HTMLElement;
    const getParent = () => {
      parentNode = refresher.value.parentNode;
      parentNode.style.position = "relative";
      (parentNode as any).done = done;

      parentNode.addEventListener("touchstart", touchstart, { passive: false });
      parentNode.addEventListener("touchmove", touchmove, { passive: false });
      parentNode.addEventListener("touchend", touchEnd, { passive: false });
      parentNode.addEventListener("touchcancel", touchEnd, { passive: false });
    };

    onMounted(() => {
      getParent();
    });

    onUnmounted(() => {
      if (parentNode) {
        parentNode.removeEventListener("touchstart", touchstart, false);
        parentNode.removeEventListener("touchmove", touchmove, false);
        parentNode.removeEventListener("touchend", touchEnd, false);
        parentNode.removeEventListener("touchcancel", touchEnd, false);
      }
    });

    return {
      done,
      refresher,
      refreshIcon,
      refreshStatus,
      refresherContentStyle,
    };
  },
});
</script>
