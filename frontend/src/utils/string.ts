import {
    House,
    Building2,
    Warehouse,
    DoorOpen,
    SquareUser,
} from "lucide-vue-next";

export function removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const statusColors: Record<string, string> = {
    disponivel: "text-green-600",
    vendido: "text-blue-600",
    alugado: "text-rose-600",
};

export const iconColors: Record<string, string> = {
    casa: "text-green-600 bg-green-50",
    apartamento: "text-blue-600 bg-blue-50",
    cobertura: "text-purple-600 bg-purple-50",
    studio: "text-orange-600 bg-orange-50",
    kitnet: "text-yellow-600 bg-yellow-50",
    sobrado: "text-teal-600 bg-teal-50",
    loft: "text-rose-600 bg-rose-50",
};

export const icons: Record<string, any> = {
    casa: House,
    apartamento: Building2,
    cobertura: Building2,
    studio: SquareUser,
    kitnet: DoorOpen,
    sobrado: House,
    loft: Warehouse,
};