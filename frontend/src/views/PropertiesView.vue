<script setup lang="ts">
import type { Imovel } from "@/types/property";
import { computed, ref } from "vue";
import { usePropertyStore } from "@/stores/properties";
import { useRoute } from "vue-router";
import { iconColors, icons, removeAccents, statusColors } from "@/utils/string";

const { data } = usePropertyStore();
const search = ref("");
const route = useRoute();

const filtered = computed(() => {
  const searchQuery = route.query.search;
  if (searchQuery) {
    const query = String(searchQuery).toLowerCase();
    return data.filter((imovel: Imovel) => {
      return (
        removeAccents(imovel.city).toLowerCase().includes(query) ||
        removeAccents(imovel.neighborhood).toLowerCase().includes(query)
      );
    });
  }

  if (search.value) {
    const filteredSearch = String(search.value).toLowerCase();
    return data.filter((imovel: Imovel) => {
      return (
        removeAccents(imovel.city).toLowerCase().includes(filteredSearch) ||
        removeAccents(imovel.neighborhood)
          .toLowerCase()
          .includes(filteredSearch)
      );
    });
  }

  return data;
});

const statusChecked = computed(() => {
  const status = [...new Set(data.map((imovel) => imovel.status))];
  return status.map((stat) => {
    return {
      label: stat.charAt(0).toUpperCase() + stat.slice(1),
      checked: false,
    };
  });
});

const typesChecked = computed(() => {
  const types = [...new Set(data.map((imovel) => imovel.type))];
  return types.map((type) => {
    return {
      label: type.charAt(0).toUpperCase() + type.slice(1),
      checked: false,
    };
  });
});
</script>

<template>
  <div>
    <div
      class="flex items-center w-full max-w-lg p-1 shadow-md border border-gray-100 mt-4"
    >
      <input
        type="text"
        v-model="search"
        placeholder="Buscar por cidade ou bairro"
        class="flex-1 bg-transparent px-6 py-3 outline-none text-sm text-gray-700 w-full rounded-l-full"
      />
    </div>
    <div class="flex">
      <div>
        <li v-for="imovel in filtered" :key="imovel.id">
          <input type="checkbox" />
          <span></span>
        </li>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-8 gap-8">
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
    </div>
  </div>
</template>
