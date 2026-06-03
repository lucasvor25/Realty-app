<script setup lang="ts">
import { ref } from "vue";
import Button from "../Button.vue";

const search = ref("");
const emit = defineEmits(["updateSearch"]);
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-6 mt-12 bg-gradient-to-b from-blue-50 to-white py-20 px-4 text-center"
  >
    <div class="flex flex-col space-y-2">
      <typography variant="h1" class="font-extrabold text-gray-900"
        >IMOBILIÁRIA DE CONFIANÇA</typography
      >
      <typography variant="h6" class="text-gray-600"
        >Encontre o imóvel dos seus sonhos</typography
      >
      <typography variant="h6" class="text-gray-500 text-sm"
        >Casas, apartamentos e coberturas nas melhores regiões</typography
      >
    </div>

    <div
      class="flex items-center w-full max-w-lg p-1 shadow-md border border-gray-100 mt-4"
    >
      <input
        type="text"
        v-model="search"
        placeholder="Buscar por cidade, bairro ou tipo..."
        class="flex-1 bg-transparent px-6 py-3 outline-none text-sm text-gray-700 w-full rounded-l-full"
        @keyup.enter="emit('updateSearch', search)"
      />
      <Button
        msg="Buscar"
        :disabled="!search.trim()"
        @pressed="emit('updateSearch', search)"
        class="rounded-full px-6 py-3"
      />
    </div>
  </section>
</template>
