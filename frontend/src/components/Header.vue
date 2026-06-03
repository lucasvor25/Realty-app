<script setup lang="ts">
import Button from "./Button.vue";

function irParaAdmin() {
  alert("botão admin clicado!");
}
</script>

<template>
  <header class="flex items-center justify-between h-14">
    <div>
      <h1>Realty app</h1>
    </div>
    <div class="flex gap-6 items-center">
      <nav class="flex gap-4">
        <RouterLink to="/" active-class="text-blue-600 font-medium">
          Home
        </RouterLink>
        <RouterLink to="/imoveis" active-class="text-blue-600 font-medium">
          Imóveis
        </RouterLink>
        <RouterLink to="/sobre" active-class="text-blue-600 font-medium">
          Sobre
        </RouterLink>
        <RouterLink to="/contato" active-class="text-blue-600 font-medium">
          Contato</RouterLink
        >
      </nav>
      <Button msg="Admin" @pressed="irParaAdmin" />
    </div>
  </header>
</template>

<!-- <style scoped>
.router-link-active {
  color: #2563eb;
  font-weight: 500;
}
</style> -->
