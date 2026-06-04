<script setup lang="ts">
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import HeroSection from "../components/home/HeroSection.vue";
import FeaturedProperties from "../components/home/FeaturedProperties.vue";
import StatsSection from "@/components/home/StatsSection.vue";
import CTASection from "@/components/home/CTASection.vue";
import { usePropertyStore } from "@/stores/properties.ts";

const toast = useToast();
const { data, searchProperties } = usePropertyStore();
const router = useRouter();

function updateActiveSearch(term: string) {
  if (searchProperties(term)) {
    router.push({ path: "/imoveis", query: { search: term } });
  } else {
    toast.error("Nenhum imóvel encontrado para essa busca");
  }
}
</script>

<template>
  <HeroSection @updateSearch="updateActiveSearch" />

  <FeaturedProperties :data="data" />

  <StatsSection />

  <CTASection />
</template>

<style></style>
