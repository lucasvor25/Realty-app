<script setup lang="ts">
import { computed, ref } from "vue";
import {
  House,
  Building2,
  Warehouse,
  DoorOpen,
  SquareUser,
} from "lucide-vue-next";
import type { Imovel } from "@/types/imovel";

const props = defineProps<{
  data: Imovel[];
}>();

const filtered = computed(() => {
  return props.data.filter((imovel: Imovel) => imovel.featured).slice(0, 6);
});

const iconColors: Record<string, string> = {
  casa: "text-green-600 bg-green-50",
  apartamento: "text-blue-600 bg-blue-50",
  cobertura: "text-purple-600 bg-purple-50",
  studio: "text-orange-600 bg-orange-50",
  kitnet: "text-yellow-600 bg-yellow-50",
  sobrado: "text-teal-600 bg-teal-50",
  loft: "text-rose-600 bg-rose-50",
};

const statusColors: Record<string, string> = {
  disponivel: "text-green-600",
  vendido: "text-blue-600",
  alugado: "text-rose-600",
};

const icons: Record<string, any> = {
  casa: House,
  apartamento: Building2,
  cobertura: Building2,
  studio: SquareUser,
  kitnet: DoorOpen,
  sobrado: House,
  loft: Warehouse,
};
</script>

<template>
  <div class="flex justify-between items-center gap-4 mx-4 md:mx-12 mt-12 mb-6">
    <typography variant="h2" class="font-bold text-gray-800"
      >Imóveis em Destaque</typography
    >
    <RouterLink
      to="/imoveis"
      class="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
    >
      Ver todos &rarr;
    </RouterLink>
  </div>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-12 gap-8"
  >
    <div v-for="imovel in filtered" :key="imovel.id" class="group">
      <div
        class="bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
      >
        <div
          :class="[
            iconColors[imovel.type],
            'flex items-center justify-center p-8',
          ]"
        >
          <component
            :is="icons[imovel.type]"
            class="w-16 h-16 opacity-80 group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div class="flex-1 flex flex-col p-6 gap-3">
          <div class="flex justify-between items-start gap-4">
            <typography
              variant="h3"
              class="font-bold text-lg text-gray-800 line-clamp-1"
              :title="imovel.title"
            >
              {{ imovel.title }}
            </typography>
            <span
              :class="[
                statusColors[imovel.status],
                'capitalize text-xs font-bold px-2 py-1 bg-gray-50 rounded-md border',
              ]"
            >
              {{ imovel.status }}
            </span>
          </div>

          <typography class="text-gray-500" variant="body2"
            >{{ imovel.neighborhood }}, {{ imovel.city }}</typography
          >

          <hr class="border-gray-100 my-2" />

          <div class="flex gap-4 text-gray-600 text-sm font-medium">
            <span>{{ imovel.bedrooms }} Quarto(s)</span>
            <span>&bull;</span>
            <span>{{ imovel.bathrooms }} Banheiro(s)</span>
            <span>&bull;</span>
            <span>{{ imovel.area }} m²</span>
          </div>

          <div class="flex items-center justify-between mt-auto pt-4">
            <typography
              class="text-xs uppercase tracking-wider text-gray-400 font-bold"
              >{{ imovel.type }}</typography
            >
            <typography
              variant="h3"
              class="text-green-600 font-extrabold text-xl"
            >
              R$ {{ imovel.price.toLocaleString("pt-BR") }}
            </typography>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
