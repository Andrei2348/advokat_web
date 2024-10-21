<template>
  <div class="table-head">
    <div
      v-for="item in items"
      class="table-head__item"
      :key="JSON.stringify(item)"
    >
      <p class="table-head__item-text">
        {{ item.title }}
        <span class="table-head__item-span" v-if="item.important">*</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./TableHead.ts"></script>
<style lang="scss" scoped src="./TableHead.scss"></style>
