<template>
  <div class="search-group">
    <p class="search-group__title">
      {{ data.title }}
    </p>
    <template v-for="val in data.filters" :key="JSON.stringify(val)">
      <span class="search-group__subtitle">{{ val.title }}</span>
      <component
        :ref="val.component === 'SelectElement' ? 'selectElement' : ''"
        :is="val.component"
        :options="selectOptions"
        :data="val"
        :withTitle="false"
        :placeholder="val.placeholder"
        objectKey="taskTagIds"
        :multiple="val.multiple"
        :closeOnSelect="val.closeOnSelect"
        :allowEmpty="true"
        :selectedFilters="selectedFilters"
        @update:value="onValueUpdate"
        @dataChanged="onSelectValueChange"
      />
    </template>
  </div>
</template>

<script lang="ts" src="./SearchFiltersGroup.ts"></script>

<style scoped lang="scss" src="./SearchFiltersGroup.scss"></style>
