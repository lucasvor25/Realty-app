<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "../components/Button.vue";
import db from "../../db.json";
import {
  House,
  Building2,
  Warehouse,
  DoorOpen,
  SquareUser,
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

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

const toast = useToast();
const data = ref<Imovel[]>(db.properties);
const search = ref("");

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

const router = useRouter();

const availableFields = ["title", "city", "neighborhood", "type", "status"];

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function updateActiveSearch() {
  if (!search.value.trim()) return;
  const term = search.value;

  const isAvailableInData = data.value.some((imovel: Imovel) =>
    availableFields.some((field) => {
      return removeAccents(imovel[field as keyof Imovel].toString())
        .toLowerCase()
        .includes(removeAccents(term).toLowerCase());
    }),
  );

  if (isAvailableInData) {
    router.push({ path: "/imoveis", query: { search: term } });
  } else {
    toast.error("Nenhum imóvel encontrado para essa busca");
  }
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
    class="flex flex-col items-center justify-center gap-4 mt-12 bg-blue-50 py-16"
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
      <Button
        msg="Buscar"
        :disabled="!search.trim()"
        @pressed="updateActiveSearch"
      />
    </div>
  </section>
  <!-- <div> -->
  <!-- <div> -->
  <div class="flex justify-between gap-4 m-12">
    <typography variant="h2" class="mb-4">Imóveis disponíveis</typography>
    <RouterLink to="/imoveis">Ver todos</RouterLink>
  </div>
  <div class="grid grid-cols-3 px-12 gap-4">
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
            <typography variant="h3">{{ imovel.bedrooms }} quartos</typography>
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
  <section
    class="flex gap-4 justify-center items-center col-span-3 py-16 border-t border-b border-gray-200 mt-12"
  >
    <div class="flex flex-col">
      <typography class="text-blue-600 text-center" variant="h2"
        >+500</typography
      >
      <typography variant="h2">Imóveis vendidos</typography>
    </div>
    <div class="flex flex-col">
      <typography class="text-blue-600 text-center" variant="h2">15</typography>
      <typography variant="h2">Anos de mercado</typography>
    </div>
    <div class="flex flex-col">
      <typography class="text-blue-600 text-center" variant="h2"
        >+1200</typography
      >
      <typography variant="h2">Clientes atendidos</typography>
    </div>
    <div class="flex flex-col">
      <typography class="text-blue-600 text-center" variant="h2">20</typography>
      <typography variant="h2">Imóveis disponíveis</typography>
    </div>
  </section>

  <!-- </div> -->
  <section class="bg-blue-600 flex justify-between w-full items-center p-12">
    <div class="flex flex-col">
      <typography class="text-white font-bold" variant="h6"
        >Quer anunciar seu imóvel?</typography
      >
      <typography class="text-white" variant="h6"
        >Entre em contato com nossa equipe</typography
      >
    </div>
    <Button msg="Fale conosco" variant="secondary"></Button>
  </section>
  <!-- </div> -->
</template>

<style></style>
