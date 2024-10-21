<template>
  <div class="search-filters">
    <div class="search-filters__list">
      <template v-for="val in content" :key="JSON.stringify(val)">
        <component
          :is="val?.component"
          :data="val"
          :selectedFilters="selectedFilters"
          @update:value="$props.valuesChange"
        ></component>
      </template>
    </div>
    <SearchButtonsContainer
      v-if="areButtonsShown"
      class="filters"
      @onResetBtnClick="resetSearchFields"
    />
  </div>
</template>

<script lang="ts" src="./SearchFilters.ts"></script>

<style scoped lang="scss" src="./SearchFilters.scss"></style>
