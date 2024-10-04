<template>
  <div class="popup">
    <div class="popup__wrapper">
      <div class="popup__content">
        <button class="popup__close" @click="popupClose">
          <SvgIcon icon="close" />
        </button>
        <div v-if="!emptyPopup" class="popup__header">
          <span>{{ header }}</span>
        </div>
        <slot name="body" />
        <div v-if="!emptyPopup" class="popup__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./AppPopup.ts"></script>
<style lang="scss" src="./AppPopup.scss"></style>
