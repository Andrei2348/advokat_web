<template>
  <div class="tab__nav" v-if="!mainStore.isMobile">
    <button
      v-for="tab in names"
      :key="tab.name"
      :class="['tab__nav-item', { active: tab.name === selectedTab }]"
      @click="clickOnTab(tab.name)"
    >
      {{ tab.name }}
    </button>
  </div>
  <div class="tab__content">
    <div class="tab__content-header" v-if="!mainStore.isMobile">
      <p
        v-for="item in lawsuitEventsHeader"
        class="tab__content-item"
        :key="item.id"
      >
        {{ item.title }}
      </p>
    </div>
    <slot name="tab-planning" />
  </div>
</template>

<script lang="ts" src="./TabsNav.ts"></script>
<style lang="scss" scoped src="./TabsNav.scss"></style>
