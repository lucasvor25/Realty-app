<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "../components/Button.vue";
import db from "../../db.json";

interface Imovel {
  type: string;
  city: string;
  neighborhood: string;
  price: number;
}
const data = ref<Imovel[]>(db.properties);
const search = ref("");
const filtered = computed(() => {
  if (!search.value) return data.value;
  return data.value.filter(
    (imovel: any) =>
      imovel.city.toLowerCase().includes(search.value.toLowerCase()) ||
      imovel.type.toLowerCase().includes(search.value.toLowerCase()) ||
      imovel.neighborhood.toLowerCase().includes(search.value.toLowerCase()),
  );
});
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-4 mt-12 bg-blue-50"
  >
    <typography variant="h1">IMOBILIÁRIA DE CONFIANÇÃ</typography>
    <typography variant="h6">Encontre o imóvel dos seus sonhos</typography>
    <typography variant="h6"
      >Casas, apartamentos e coberturas nas melhores regiões</typography
    >
    <div class="flex items-center gap-2 m-4">
      <input
        type="text"
        v-model="search"
        placeholder="Buscar por cidade ou tipo..."
        class="bg-white px-4 py-2 rounded-md border text-sm"
      />
      <Button msg="Buscar" />
    </div>
  </section>
</template>

<style></style>
