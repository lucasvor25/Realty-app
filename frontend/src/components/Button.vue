<script setup lang="ts">
defineProps<{
  msg: string;
}>();

const emit = defineEmits(["pressed"]);
</script>

<template>
  <button
    @click="emit('pressed')"
    class="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm cursor-pointer"
  >
    {{ msg }}
  </button>
</template>
