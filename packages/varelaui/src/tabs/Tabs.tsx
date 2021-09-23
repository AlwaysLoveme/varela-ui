import { defineComponent, nextTick, onMounted, ref } from "vue";
import {
  watch,
  VNode,
  provide,
  computed,
  isVNode,
  reactive,
  CSSProperties,
  ComponentPublicInstance,
  getCurrentInstance,
  VNodeNormalizedChildren,
} from "vue";
import { useRefs } from "../hooks/useRefs";

import Swipe from "../swipe/Swipe";
import type { Swiper as SwiperInstance } from "swiper";

export default defineComponent({
  name: "VTabs",
  props: {
    active: {
      type: Number,
      default: 0,
    },
    swipeable: {
      type: Boolean,
      default: false,
    },
    animated: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:active"],
  setup(props, { slots, emit }) {
    const childrenSlots = ref<VNode[]>([]);
    const instance = getCurrentInstance();

    const state = reactive({
      currentIndex: props.active,
      lineStyle: {} as CSSProperties,
    });

    provide(
      "currentIndex",
      computed(() => state.currentIndex)
    );
    provide("animated", props.animated);

    const getChildren = (children: VNodeNormalizedChildren): VNode[] => {
      const childrenData: VNode[] = [];
      const checkChildren = (children: VNodeNormalizedChildren) => {
        if (Array.isArray(children)) {
          children.forEach((child) => {
            if (isVNode(child)) {
              if (typeof child.type === "object") {
                const componentName = (child.type as any).name ?? "";
                componentName === "VTab" && childrenData.push(child);
              }
              if (child.component?.subTree) {
                checkChildren(child.component.subTree.children);
              }
              if (child.children) {
                checkChildren(child.children);
              }
            }
          });
        }
      };
      checkChildren(children);
      return childrenData;
    };

    onMounted(() => {
      nextTick(() => {
        const subTree = instance?.subTree;
        const children = getChildren(
          subTree?.children as VNodeNormalizedChildren
        );
        childrenSlots.value = children;
      });
    });

    const [titleRefs, setTitleRef] =
      useRefs<ComponentPublicInstance<{}, any>>();
    const tabsClick = (index: number) => {
      state.currentIndex = index;
      if (props.animated) {
        swiperInstance.value?.slideTo(index);
      }
    };
    const renderHeader = () => {
      return childrenSlots.value.map((item, index) => (
        <div
          class={[
            "vtabs-header-item",
            state.currentIndex === index ? "vtabs-header-item-active" : "",
            item?.props?.disabled ? "vtabs-header-item-disabled" : "",
          ]}
          ref={setTitleRef(index)}
          onClick={() => tabsClick(index)}
        >
          {item.component?.slots.title
            ? item.component?.slots.title()
            : item?.props?.title}
        </div>
      ));
    };

    const swiperInstance = ref<SwiperInstance>();
    const getSwiperInstance = (swiper: SwiperInstance) =>
      (swiperInstance.value = swiper);
    const onSlideChange = (swiper: SwiperInstance) => {
      const { realIndex } = swiper;
      state.currentIndex = realIndex;
    };
    const renderContent = () => {
      const content = slots.default?.();
      if (props.animated) {
        return (
          <Swipe
            class="vtabs-container"
            onSwiper={getSwiperInstance}
            onSlideChange={onSlideChange}
          >
            {content}
          </Swipe>
        );
      }
      return <div class="vtabs-container">{content}</div>;
    };

    const updateLineStyle = () => {
      nextTick(() => {
        const currentTitle = titleRefs.value[state.currentIndex];
        const left = currentTitle.offsetLeft + currentTitle.offsetWidth / 2;
        const lineStyle = {
          transform: `translateX(${left}px) translateX(-50%)`,
        };
        state.lineStyle = lineStyle;
      });
    };

    const tabHeaderContainer = ref();
    const handlerHeaderContainerScroll = () => {
      nextTick(() => {
        const currentTitle = titleRefs.value[state.currentIndex];
        const scrollLeftNum =currentTitle.offsetLeft - tabHeaderContainer.value.offsetWidth / 2 + currentTitle.offsetWidth / 2;
        tabHeaderContainer.value.scrollLeft = scrollLeftNum;
      });
    };

    watch(childrenSlots, () => updateLineStyle());
    watch(
      () => state.currentIndex,
      (val) => {
        updateLineStyle();
        handlerHeaderContainerScroll();
        emit("update:active", val);
      }
    );

    return () => (
      <div class="vtabs">
        <div class="vtabs-header" ref={tabHeaderContainer}>
          {renderHeader()}
          <div class="vtabs-header-line" style={state.lineStyle}></div>
        </div>
        {renderContent()}
      </div>
    );
  },
});
