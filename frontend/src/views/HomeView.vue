<script setup lang="ts">
import { computed, ref, watch } from "vue";
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
const activeSearch = ref("");

function updateActiveSearch() {
  activeSearch.value = search.value;
}

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const filtered = computed(() => {
  const term = activeSearch.value.toLowerCase();
  return data.value.filter((imovel) => {
    return (
      removeAccents(imovel.city.toLowerCase()).includes(term) ||
      removeAccents(imovel.type.toLowerCase()).includes(term) ||
      removeAccents(imovel.neighborhood.toLowerCase()).includes(term)
    );
  });
});

watch(filtered, (val) => console.log(val, "filtered"));
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
      <Button msg="Buscar" @pressed="updateActiveSearch" />
    </div>
  </section>
</template>

<style></style>
