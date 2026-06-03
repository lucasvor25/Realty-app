<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  msg: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}>();

const emit = defineEmits(["pressed"]);

function handleClick() {
  if (props.disabled) return;
  emit("pressed");
}

const buttonClass = computed(() => ({
  "bg-blue-600 text-white": props.variant !== "secondary",
  "bg-white text-blue-600": props.variant === "secondary",
}));
</script>

<template>
  <button
    @click="handleClick"
    :class="[
      buttonClass,
      'px-4 py-1.5 rounded-md text-sm',
      props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    ]"
    :disabled="props.disabled || false"
  >
    {{ props.msg }}
  </button>
</template>
