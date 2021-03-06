<template>
  <Backdrop :show="show" />
  <Animation :name="animation">
    <div class="custom-modal" v-if="show" @click.stop="closeModal">
      <div
        @click.stop
        class="custom-modal-body"
        :style="{ width, height, background: modalBackground }"
      >
        <slot name="header">
          <div class="custom-modal-body-header">
            <p class="custom-modal-body-header-title" :style="headerStyle">
              {{ title }}
            </p>
            <Icon
              icon="close"
              class="close-icon"
              v-if="closeable"
              @click.stop="$emit('update:show', false)"
            />
          </div>
        </slot>

        <div class="custom-modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Animation>
</template>

<script lang="ts">
import Icon from "../icon";
import Backdrop from "../backdrop";
import Animation from "../transition";
import animates from "../shared/animates";
import type { TextAlignProperty } from "csstype";
import { computed, defineComponent, CSSProperties, PropType } from "vue";

export default defineComponent({
  name: "VModal",
  components: {
    Icon,
    Backdrop,
    Animation,
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
    closeable: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    clickBackDropClose: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "262px",
    },
    height: {
      type: String,
      default: "225px",
    },
    titleAlign: {
      type: String as PropType<TextAlignProperty>,
      default: "center",
    },
    animation: {
      type: String,
      default: "scaleIn",
    },
    modalBackground: {
      type: String,
      default: "#FFFFFF",
    },
  },
  emits: ["update:show"],
  setup(props, { emit }) {
    const closeModal = () => {
      if (props.clickBackDropClose) emit("update:show", false);
    };

    const headerStyle = computed<CSSProperties>(() => ({
      textAlign: props.titleAlign,
    }));

    return {
      animates,
      closeModal,
      headerStyle,
    };
  },
});
</script>
