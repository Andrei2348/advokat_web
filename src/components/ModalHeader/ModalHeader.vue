<template>
  <div
    :class="[
      'modal__header',
      { config__header: uxuiStore.modalName.modalName === 'FormationAct' },
    ]"
  >
    <h2 class="modal__title" v-if="index">{{ modalsTitleNames[index] }}</h2>
    <button class="modal__close-button" @click="handleClose">
      <SvgIcon icon="x" class="modal__button-icon" />
    </button>
  </div>
</template>

<script lang="ts" src="./ModalHeader.ts"></script>
<style lang="scss" scoped src="./ModalHeader.scss"></style>
