<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Button from "../components/Button.vue";
import db from "../../db.json";
import {
  House,
  Building2,
  Warehouse,
  DoorOpen,
  SquareUser,
} from "lucide-vue-next";

interface Imovel {
  type: string;
  city: string;
  neighborhood: string;
  price: number;
  id: number;
  title: string;
  status: string;
  bathrooms: number;
  bedrooms: number;
  area: number;
  featured: boolean;
}

const data = ref<Imovel[]>(db.properties);
const search = ref("");
const activeSearch = ref("");

const icons: Record<string, any> = {
  casa: House,
  apartamento: Building2,
  cobertura: Building2,
  studio: SquareUser,
  kitnet: DoorOpen,
  sobrado: House,
  loft: Warehouse,
};

const iconColors: Record<string, string> = {
  casa: "text-green-600 bg-green-50",
  apartamento: "text-blue-600 bg-blue-50",
  cobertura: "text-purple-600 bg-purple-50",
  studio: "text-orange-600 bg-orange-50",
  kitnet: "text-yellow-600 bg-yellow-50",
  sobrado: "text-teal-600 bg-teal-50",
  loft: "text-rose-600 bg-rose-50",
};

function updateActiveSearch() {
  activeSearch.value = search.value;
}

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const filtered = computed(() => {
  return data.value.filter((imovel) => imovel.featured).slice(0, 6);
});

const statusColors: Record<string, string> = {
  disponivel: "text-green-600",
  vendido: "text-blue-600",
  alugado: "text-rose-600",
};
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
  <div>
    <div class="flex justify-between gap-4 m-12">
      <typography variant="h2" class="mb-4">Imóveis disponíveis</typography>
      <RouterLink to="/imoveis">Ver todos</RouterLink>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="imovel in filtered" :key="imovel.id">
        <div class="bg-white p-4 rounded-md shadow flex flex-col">
          <div
            :class="[
              iconColors[imovel.type],
              'flex items-center justify-center p-3 rounded-lg',
            ]"
          >
            <component :is="icons[imovel.type]" class="w-6 h-6 mb-2 h-24" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-4 m-4">
            <div class="flex justify-between gap-6 w-full">
              <typography variant="h3">{{ imovel.title }}</typography>
              <typography
                variant="h3"
                :class="[statusColors[imovel.status], 'capitalize']"
                >{{ imovel.status }}</typography
              >
            </div>
            <typography class="mr-auto" variant="body2">{{
              imovel.neighborhood
            }}</typography>
            <div class="flex gap-4 mt-2">
              <typography variant="h3"
                >{{ imovel.bedrooms }} quartos</typography
              >
              <typography variant="h3"
                >{{ imovel.bathrooms }} banheiros</typography
              >
              <typography variant="h3">{{ imovel.area }} m²</typography>
            </div>
            <div class="flex items-center mr-auto gap-4 mt-2">
              <typography variant="h3">{{ imovel.type }}</typography>
              <typography variant="body1">{{ imovel.city }}</typography>
            </div>
            <typography variant="h4" class="mt-2 text-green-600 mr-auto"
              >R$ {{ imovel.price.toLocaleString("pt-BR") }}</typography
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
