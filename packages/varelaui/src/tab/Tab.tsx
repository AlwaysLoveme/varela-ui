import { defineComponent } from "vue";
import { inject, ref, watch, ComputedRef } from "vue";

import SwipeItem from "../swipe-item/SwipeItem";

export default defineComponent({
  name: "VTab",
  props: {
    name: {
      type: [String, Number],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots, emit }) {
    const animated = inject("animated");
    const currentIndex = inject<ComputedRef>("currentIndex");
    const activeIndex = ref(currentIndex?.value);
    watch(
      () => currentIndex?.value,
      (active) => {
        activeIndex.value = active;
      },
      {
        immediate: true,
      }
    );

    const renderTabPanel = () => {
      const content = slots.default?.();
      if (animated) {
        if(props.disabled) return <div class="vtab"></div>;
        // return <div class={["vtab swiper-slide",props.disabled?'swiper-no-swiping':'']}>{content}</div>;
        return <SwipeItem class="vtab" enableSwiping={!props.disabled}>{content}</SwipeItem>
      }
      return (
        <div class="vtab" v-show={activeIndex.value === props.name}>
          {content}
        </div>
      );
    };

    return () => renderTabPanel();
  },
});
