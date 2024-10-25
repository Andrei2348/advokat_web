<template>
  <div :class="['clients', { collapsed: uxuiStore.asideCollapsed }]">
    <ClientTable ref="clientsList" />
  </div>
</template>

<script lang="ts" src="./ClientsPage.ts"></script>
<style lang="scss" src="./ClientsPage.scss"></style>
