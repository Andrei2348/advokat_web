<template>
  <div class="color__picker-wrapper" v-click-outside="pickerCloseHandler">
    <button class="color__picker-button" @click="pickerVisibleHandler">
      <div
        v-if="currentColor"
        class="color__picker-fill-button"
        :style="{ backgroundColor: currentColor }"
      ></div>
      <SvgIcon v-else icon="palette" />
    </button>
    <div
      :class="[
        'color__picker',
        { visible: pickerVisible },
        menuPositionTop ? 'color__picker-top' : 'color__picker-bottom',
      ]"
    >
      <ColorPicker
        theme="light"
        :color="color"
        :sucker-hide="true"
        @changeColor="changeColor"
        :sucker-canvas="null"
        :sucker-area="[]"
      >
        <button class="color__picker-select-button" @click="selectColorHandler">
          Выбрать цвет
        </button>
      </ColorPicker>
    </div>
  </div>
</template>
<script lang="ts" src="./ColorPicker.ts"></script>
<style lang="scss" scoped src="./ColorPicker.scss"></style>
