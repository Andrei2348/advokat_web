<template>
  <div :class="['clients', { collapsed: uxuiStore.asideCollapsed }]">
    <span v-if="!allClients && isTableShown">Загрузка!</span>
    <ClientTable v-if="isTableShown" @client-click="onClientClick" />
    <ClientForm v-else />
  </div>
</template>

<script lang="ts" src="./ClientsPage.ts"></script>
<style lang="scss" src="./ClientsPage.scss"></style>
