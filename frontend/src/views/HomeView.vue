<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "../components/Button.vue";
import db from "../../db.json";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import type { Imovel } from "@/types/imovel";
import HeroSection from "../components/home/HeroSection.vue";
import FeaturedProperties from "../components/home/FeaturedProperties.vue";

const toast = useToast();
const data = ref<Imovel[]>(db.properties);

const router = useRouter();

const availableFields = ["title", "city", "neighborhood", "type", "status"];

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function updateActiveSearch(term: string) {
  if (!term.trim()) return;

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
</script>

<template>
  <HeroSection @updateSearch="updateActiveSearch" />

  <FeaturedProperties :data="data" />

  <section
    class="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 bg-gray-50 border-t border-b border-gray-200 mt-20 px-4"
  >
    <div class="flex flex-col items-center justify-center space-y-1">
      <span class="text-blue-600 font-black text-4xl">+500</span>
      <typography variant="h6" class="text-gray-600 text-center"
        >Imóveis vendidos</typography
      >
    </div>
    <div class="flex flex-col items-center justify-center space-y-1">
      <span class="text-blue-600 font-black text-4xl">15</span>
      <typography variant="h6" class="text-gray-600 text-center"
        >Anos de mercado</typography
      >
    </div>
    <div class="flex flex-col items-center justify-center space-y-1">
      <span class="text-blue-600 font-black text-4xl">+1200</span>
      <typography variant="h6" class="text-gray-600 text-center"
        >Clientes atendidos</typography
      >
    </div>
    <div class="flex flex-col items-center justify-center space-y-1">
      <span class="text-blue-600 font-black text-4xl">20</span>
      <typography variant="h6" class="text-gray-600 text-center"
        >Imóveis disponíveis</typography
      >
    </div>
  </section>

  <section
    class="bg-blue-600 flex flex-col md:flex-row justify-between w-full items-center p-8 md:p-12 gap-6 text-center md:text-left"
  >
    <div class="flex flex-col">
      <typography class="text-white font-bold text-2xl" variant="h3"
        >Quer anunciar seu imóvel?</typography
      >
      <typography class="text-blue-100 mt-1" variant="h6"
        >Entre em contato com nossa equipe para uma avaliação rápida e
        gratuita.</typography
      >
    </div>
    <Button
      msg="Fale conosco"
      variant="secondary"
      class="whitespace-nowrap px-8 py-4 shadow-lg hover:bg-gray-100 text-blue-600 font-bold rounded-lg"
    ></Button>
  </section>
</template>

<style></style>
