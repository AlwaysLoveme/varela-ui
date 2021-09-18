<template>
  <Animation name="fadeIn">
    <div
      v-if="show"
      :style="style"
      class="backdrop"
      @click="$emit('update:show', false)"
    >
      <slot></slot>
    </div>
  </Animation>
</template>

<script lang="ts">
import Animation from "../transition";
import { computed, CSSProperties, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "VBackDrop",
  components: {
    Animation,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
    customStyle: {
      type: Object as PropType<CSSProperties>,
      default(this: void) {
        return {};
      },
    },
  },
  emits: ["update:show"],
  setup(props) {
    const style = computed(() => {
      return {
        zIndex: props.zIndex,
        ...props.customStyle,
      };
    });

    return {
      style,
    };
  },
});
</script>
