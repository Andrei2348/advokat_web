<template>
  <div class="table">
    <div class="table__header">
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
