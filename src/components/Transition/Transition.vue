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
import { defineComponent } from "vue";
import animates from "@/shared/animates";

export default defineComponent({
  name: "Animation",
  props: {
    name: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
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
