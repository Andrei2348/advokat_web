<template>
  <div :class="['tooltip', { tooltip_visible: isVisible }]">
    <SvgIcon icon="chevron-down" />
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts" src="./TooltipComponent.ts"></script>

<style scoped lang="scss" src="./TolltipComponent.scss"></style>
