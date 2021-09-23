import Swiper from "swiper";
import { getParams } from "./getParams";
import type { Swiper as SwiperInstance } from "swiper";
import { defineComponent, ref, onMounted, nextTick } from "vue";

export default defineComponent({
  name: "VSwipe",
  props: {
    autoplay: {
      type: Boolean,
      default: false,
    },
    initialSlide: {
      type: Number,
      default: 0,
    },
    direction: {
      type: String,
      default: "horizontal", // default is horizontal, or vertical
    },
    speed: {
      type: Number,
      default: 300,
    },
    grabCursor: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: undefined,
    },
    height: {
      type: String,
      default: undefined,
    },
    autoHeight: {
      type: Boolean,
      default: false,
    },
    nested: {
      type: Boolean,
      default: false,
    },
    watchOverflow: {
      type: Boolean,
      default: false,
    },
    resizeObserver: {
      type: Boolean,
      default: false,
    },
    // 是否自动生成导航元素，不需要添加HTML
    createElements: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    navigation: {
      type: Boolean,
      default: false,
    },
    scrollbar: {
      type: Boolean,
      default: false,
    },
    allowTouchMove: {
      type: Boolean,
      default: true,
    },

  },
  emits: ["swiper", "slideChange"],
  setup(props, { slots, emit }) {
    const swiperContainer = ref();
    const swiperInstance = ref<SwiperInstance>();

    const initSwiper = () => {
      swiperInstance.value = new Swiper(swiperContainer.value, {
        ...getParams(props),
        on: {
          slideChange(swiper) {
            emit("slideChange", swiper);
          },
        },
      });
      emit("swiper", swiperInstance.value);
    };

    onMounted(() => {
      nextTick(initSwiper);
    });

    return () => (
      <div class="vswipe-container swiper-container" ref={swiperContainer}>
        <div class="vswipe-wrapper swiper-wrapper">{slots.default?.()}</div>
      </div>
    );
  },
});
