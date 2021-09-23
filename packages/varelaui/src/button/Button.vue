<template>
  <button :type="buttonType" ref="zxButton" v-bind="$attrs" :class="[btnClass]" class="zx-button mdc-button">
    <div class="mdc-button__ripple"></div>
    <div class="flex-center" :style="{ opacity: loading ? 0 : 1 }">
      <slot name="before">
        <i v-if="icon" class="material-icons" :style="{ fontSize: `${iconSize}px` }">
          {{ icon }}
        </i>
      </slot>
      <div class="mdc-button__label">
        <slot>{{ text }}</slot>
      </div>
      <slot name="after"></slot>
    </div>

    <Loading size="24" v-show="loading" spinType="spin" :color="loadingColor" class="position-center"></Loading>
  </button>
</template>

<script lang="ts">
import Loading from "../loading";
import { MDCRipple } from "@material/ripple";
import { computed, defineComponent, onMounted, ref, toRefs, PropType, ButtonHTMLAttributes } from "vue";

export default defineComponent({
  name: "VButton",
  components: {
    Loading,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
    buttonType: {
      type: String as PropType<ButtonHTMLAttributes["type"]>,
      default: "button",
    },
    text: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // 图标， 位置默认前置
    icon: {
      type: String,
      default: "",
    },
    iconSize: {
      type: [String, Number],
      default: "20",
    },
    // 字体颜色
    labelColor: {
      type: String,
      default: "",
    },
  },
  setup(props, { slots }) {
    const zxButton = ref();
    const { disabled, type, icon } = toRefs(props);

    const btnClass = computed(() => {
      return {
        disabled: disabled.value,
        // 有阴影填充
        "mdc-button--raised": type.value === "raised",
        // 无阴影填充
        "mdc-button--unelevated": type.value === "fill",
        // 有边框
        "mdc-button--outlined": type.value === "outline",
        "mdc-button--icon-leading": slots.before || icon.value,
      };
    });

    const loadingColor = computed(() => {
      let color = "";
      switch (type.value) {
        case "raised":
        case "fill":
          color = "#fff";
          break;
        case "outline":
          color = "#333";
          break;
      }
      return color;
    });

    onMounted(() => {
      new MDCRipple(zxButton.value);
    });

    return {
      btnClass,
      zxButton,
      loadingColor,
    };
  },
});
</script>
