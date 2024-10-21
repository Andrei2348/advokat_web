<template>
  <div class="table">
    <div
      class="table__header"
      v-if="lawsuitStore.lawsuitData && lawsuitStore.lawsuitData.length > 0"
    >
      <div
        v-for="item in lawsuitItems"
        class="table__header-item"
        :key="item.id"
      >
        <p class="table__header-item-text">
          {{ item.title }} <SvgIcon icon="Sort" />
        </p>
      </div>
    </div>
    <div class="table__header-empty-list" v-else>
      <h3 class="table__header-empty-title">Список дел пуст</h3>
      <p class="table__header-empty-text">Добавьте свое первое дело</p>
    </div>
    <div
      v-for="item in lawsuitStore.lawsuitData"
      :key="item.id"
      class="table__items"
    >
      <LawsuitItem :item="item" />
    </div>
  </div>
</template>

<script lang="ts" src="./LawsuitTable.ts"></script>
<style lang="scss" scoped src="./LawsuitTable.scss"></style>
