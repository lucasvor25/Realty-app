import type { Imovel } from "@/types/property";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import db from "../../db.json";
import { removeAccents } from "@/utils/string.ts";

const availableFields = ["title", "city", "neighborhood", "type", "status"];

export const usePropertyStore = defineStore("property", () => {
    const data = ref<Imovel[]>(db.properties);

    const filtered = computed(() => {
        return data.value.filter((imovel: Imovel) => imovel.featured).slice(0, 6);
    });

    function searchProperties(term: string): boolean {
        if (!term.trim()) return false

        return data.value.some((imovel: Imovel) =>
            availableFields.some((field) =>
                removeAccents(imovel[field as keyof Imovel].toString())
                    .toLowerCase()
                    .includes(removeAccents(term).toLowerCase())
            )
        )
    }

    return { data, filtered, searchProperties };

})