<template>
  <div class="events">
    <h2 class="events__title">Категория дел</h2>
    <TableHead :items="casesItems" class="events__table" />
    <div
      v-for="item in lawsuitStore.lawsuitCategories"
      :key="item.id ? item.id : 565656565"
      class="events__items"
    >
      <CaseItem
        :item="item"
        :hoursOptions="hoursOptions"
        :daysOptions="daysOptions"
      />
    </div>
    <button
      class="events__header-button-create"
      @click="lawsuitStore.setEmptyLawsuitCategory()"
      :disabled="lawsuitStore.createLawsuitCategoryStatus"
    >
      Добавить категорию дела
      <SvgIcon icon="plus" class="events__header-button-icon" />
    </button>
  </div>
</template>

<script lang="ts" src="./CaseCategory.ts"></script>
<style lang="scss" scoped src="./CaseCategory.scss"></style>
