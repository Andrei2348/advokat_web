<template>
  <div :class="['home', { collapsed: uxuiStore.asideCollapsed }]">
    <LawsuitTable
      v-if="
        lawsuitStore && lawsuitStore?.isLawsuitData?.length && !isLawsuitLoading
      "
    />
    <div
      v-if="
        !isLawsuitLoading && lawsuitStore && !lawsuitStore.isLawsuitData?.length
      "
      class="home__message"
    >
      <h2 class="home__message-title">Список дел пуст</h2>
      <p class="home__message-text">Добавьте свое первое дело</p>
    </div>
  </div>
</template>

<script lang="ts" src="./HomePage.ts"></script>
<style lang="scss" scoped src="./HomePage.scss"></style>
