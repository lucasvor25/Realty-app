<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  msg: string;
  variant?: "primary" | "secondary";
}>();

const emit = defineEmits(["pressed"]);

const buttonClass = computed(() => ({
  "bg-blue-600 text-white": props.variant !== "secondary",
  "bg-white text-blue-600": props.variant === "secondary",
}));
</script>

<template>
  <button
    @click="emit('pressed')"
    :class="[buttonClass, 'px-4 py-1.5 rounded-md text-sm cursor-pointer']"
  >
    {{ props.msg }}
  </button>
</template>
