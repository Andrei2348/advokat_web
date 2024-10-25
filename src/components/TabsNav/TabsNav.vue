<template>
  <div class="tabs">
    <button
      v-for="tab in names"
      :key="tab"
      :class="['tabs__item', { active: tab === selectedTab }]"
      @click="clickOnTab(tab)"
      type="button"
    >
      {{ tab }}
    </button>
  </div>
  <div class="tabs__list" ref="list">
    <TableHead :items="headerItems" :class="$attrs.class" />
    <slot />
  </div>
</template>

<script lang="ts" src="./TabsNav.ts"></script>
<style lang="scss" scoped src="./TabsNav.scss"></style>
