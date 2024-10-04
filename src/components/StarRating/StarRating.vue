<template>
  <div class="star-rating">
    <span
      v-for="star in maxStars"
      :key="star"
      :class="['star', { filled: star <= currentRating }]"
      @click="setRating(star)"
    >
      <SvgIcon :icon="'rating'" />
    </span>
  </div>
</template>

<script lang="ts" src="./StarRating.ts"></script>
<style lang="scss" scoped src="./StarRating.scss"></style>
