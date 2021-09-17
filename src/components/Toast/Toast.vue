<template>
  <Animation
    :name="transition"
    @before-leave="destroyTimer"
    @after-leave="$emit('destroy')"
  >
    <backdrop :customStyle="{ background: 'none' }" :show="toastShow">
      <div class="toast-container" :class="[classList]">
        <Icon
          v-if="icon"
          :icon="icon"
          color="#fff"
          size="50"
          class="margin-bottom-2"
        ></Icon>
        <span class="toast-text">{{ text }}</span>
      </div>
    </backdrop>
  </Animation>
</template>

<script lang="ts">
import { ref, toRefs, PropType, defineComponent } from "vue";
import { computed, onMounted } from "vue";
import Backdrop from "../Backdrop";
import Animation from "../Transition";
import Icon from "../Icon";

export default defineComponent({
  name: "VToast",
  components: {
    Icon,
    Backdrop,
    Animation,
  },
  props: {
    /**
     * toast position: center、top、bottom
     */
    position: {
      type: String,
      default: "center",
    },
    text: {
      type: String,
      default: "",
    },
    timeout: {
      type: [String, Number],
      default: 1500,
    },
    icon: {
      type: String,
      default: "",
    },
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  emits: ["destroy"],
  setup(props) {
    const { timeout, onClose } = toRefs(props);
    const toastShow = ref(false);

    let timer!: ReturnType<typeof setTimeout>;
    const startTimer = function () {
      if (Number(timeout.value) > 0) {
        timer = setTimeout(() => {
          close();
          onClose.value?.();
        }, Number(timeout.value));
      }
    };
    const destroyTimer = function () {
      if (timer) clearTimeout(timer);
    };
    const close = function () {
      toastShow.value = false;
    };

    const classList = computed(() => {
      return {
        "position-x-center":
          props.position === "bottom" || props.position === "top",
        "position-top": props.position === "top",
        "position-center": props.position === "center",
        "position-bottom": props.position === "bottom",
      };
    });

    const transition = computed(() => {
      let animationName = "fadeIn";
      switch (props.position) {
        case "top":
          animationName = "fadeInDown";
          break;
        case "bottom":
          animationName = "fadeInUp";
          break;
      }
      return animationName;
    });

    onMounted(() => {
      toastShow.value = true;
      startTimer();
    });

    return {
      close,
      toastShow,
      classList,
      transition,
      destroyTimer,
    };
  },
});
</script>
