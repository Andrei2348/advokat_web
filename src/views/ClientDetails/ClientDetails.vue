<template>
  <div :class="['client-details', { collapsed: isAsideCollapsed }]">
    <ClientForm />
  </div>
</template>

<script lang="ts" src="./ClientDetails.ts"></script>

<style scoped lang="scss" src="./ClientDetails.scss"></style>
