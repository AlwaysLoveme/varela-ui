import { defineComponent } from "vue";

export default defineComponent({
  name: "VSwipeItem",
  props: {
    enableSwiping: {
      type: Boolean,
      default: true,
    },
    // 自动播放过度间隔时间
    duration: {
      type: Number,
      default: undefined,
    }
  },
  setup(props, { slots }) {
    return () => <div data-swiper-autoplay={props.duration} class={["vswipe-item swiper-slide", !props.enableSwiping ? 'swiper-no-swiping' : '']}>{slots.default?.()}</div>;
  },
});
