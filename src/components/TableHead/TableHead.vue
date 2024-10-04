<template>
  <div class="table__header">
    <div v-for="item in items" class="table__header-item" :key="item.id">
      <p class="table__header-item-text">
        {{ item.title }}
        <span class="table__header-item-span" v-if="item.important">*</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./TableHead.ts"></script>
<style lang="scss" scoped src="./TableHead.scss"></style>
