<template>
  <transition
    :mode="mode"
    @after-leave="$emit('after-leave')"
    @before-leave="$emit('before-leave')"
    :enter-active-class="`animate__animated animate__${name}`"
    :leave-active-class="`animate__animated animate__${animates[name]}`"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import animates from "../../shared/animates";

type Mode = "out-in" | "in-out";
export default defineComponent({
  name: "VAnimation",
  props: {
    name: {
      type: String,
      default: "",
    },
    mode: {
      type: String as PropType<Mode>,
      default: "out-in",
    },
  },
  setup() {
    return {
      animates,
    };
  },
});
</script>
