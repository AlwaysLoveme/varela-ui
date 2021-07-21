<template>
  <div class="sticky" ref="root" :style="rootStyle">
    <div :class="{ 'sticky-fixed': fixed }" :style="stickyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { onMounted, onUnmounted, computed } from "vue";
import { camelize } from "@vue/shared";

export default defineComponent({
  props: {
    target: {
      type: String,
      default: "",
    },
    offset: {
      type: Number,
      default: 0,
    },
    zIndex: {
      type: Number,
      default: 100,
    },
  },
  setup(props) {
    // 目标容器
    const target = ref();
    const state = reactive({
      width: 0,
      height: 0,
      fixed: false,
      transform: 0,
      scrollTop: 0,
      clientHeight: 0,
    });

    const rootStyle = computed(() => {
      return {
        height: state.fixed ? `${state.height}px` : "",
        width: state.fixed ? `${state.width}px` : "",
      };
    });
    const stickyStyle = computed(() => {
      const transform = state.transform
        ? `translateY(${state.transform}px)`
        : "";
      return {
        transform,
        width: `${state.width}px`,
        height: `${state.height}px`,
        zIndex: props.zIndex,
        // top: `${scrollContainer?.value?.offsetTop + props.offset}px`,
        top: `${
          scrollContainer.value?.getBoundingClientRect().top + props.offset
        }px`,
      };
    });
    const getScrollElement = () => {
      const targetEle = props.target;
      target.value = document.documentElement;
      if (targetEle) {
        target.value = document.querySelector(targetEle);
        if (!target.value)
          throw new Error(`target is not existed: ${props.target}`);
      }
    };
    // 获取滚动父元素
    const root = ref();
    const scrollContainer = ref();
    const getScrollContainer = (el: HTMLElement) => {
      const getStyle = function (element: HTMLElement, styleName: any): string {
        if (!element || !styleName) return "";
        styleName = camelize(styleName);
        if (styleName === "float") {
          styleName = "cssFloat";
        }
        try {
          const style = element?.style?.[styleName];
          if (style) return style;
          const computed = (document.defaultView as any).getComputedStyle(
            element,
            ""
          );
          return computed ? computed[styleName] : "";
        } catch (e) {
          return element.style[styleName];
        }
      };
      const isScroll = (ele: HTMLElement): RegExpMatchArray => {
        const overflow =
          getStyle(ele, "overflow") || getStyle(ele, "overflow-y");
        return overflow.match(/(scroll|auto)/) as RegExpMatchArray;
      };

      let parentNode = el;
      while (parentNode) {
        if ([window, document, document.documentElement].includes(parentNode))
          break;
        if (isScroll(parentNode)) {
          break;
        }
        parentNode = parentNode.parentNode as HTMLElement;
      }
      scrollContainer.value = parentNode;
      console.dir(parentNode);
    };

    const updateState = (/** e: Event */) => {
      // const scrollTop = (e?.target as any)?.scrollTop;
      const rootRect = root.value.getBoundingClientRect();
      const targetRect = target.value.getBoundingClientRect();
      const scrollContainerRect = scrollContainer.value.getBoundingClientRect();
      // const offsetTop =
      //   rootRect.top - scrollContainer.value.getBoundingClientRect().top;
      // console.log(
      //   rootRect.top,
      //   scrollTop,
      //   // root.value.offsetTop,
      //   scrollContainer.value.getBoundingClientRect().top
      // );

      state.height = rootRect.height;
      state.width = rootRect.width;
      state.scrollTop =
        scrollContainer.value === window
          ? document.documentElement.scrollTop
          : scrollContainer.value.scrollTop;
      state.clientHeight = document.documentElement.clientHeight;

      if (props.target) {
        const difference = targetRect.bottom - props.offset - state.height;
        state.fixed = props.offset > rootRect.top && targetRect.bottom > 0;
        state.transform = difference < 0 ? difference : 0;
      } else {
        // state.fixed = offsetTop <= scrollTop + props.offset;
        state.fixed = rootRect.top <= scrollContainerRect.top + props.offset;
      }
    };

    onMounted(() => {
      getScrollElement();
      getScrollContainer(root.value);

      scrollContainer.value.addEventListener("scroll", updateState, false);
    });

    onUnmounted(() => {
      scrollContainer.value.removeEventListener("scroll", updateState, false);
    });

    return {
      root,
      rootStyle,
      stickyStyle,
      ...toRefs(state),
    };
  },
});
</script>
