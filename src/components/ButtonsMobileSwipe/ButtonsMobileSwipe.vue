<template>
  <div>
    <div class="swipe__wrapper swipe__wrapper_place_left">
      <button
        v-for="btn of rightSwipeBtnsOnPage"
        :key="JSON.stringify(btn)"
        :class="['swipe__btn', btn.class]"
        type="button"
        @click="btn.handler"
      >
        <SvgIcon :icon="btn.icon" />
      </button>
    </div>
    <div class="swipe__wrapper swipe__wrapper_place_right">
      <button
        v-for="btn of leftSwipeBtnsOnPage"
        :key="JSON.stringify(btn)"
        :class="['swipe__btn', btn.class]"
        type="button"
        @click="btn.handler"
      >
        <SvgIcon :icon="btn.icon" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./ButtonsMobileSwipe.ts"></script>
<style lang="scss" scoped src="./ButtonsMobileSwipe.scss"></style>
