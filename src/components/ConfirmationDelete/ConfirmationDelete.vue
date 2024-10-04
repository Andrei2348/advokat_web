<template>
  <div class="suggest__modal-container">
    <h3 class="suggest__modal-title">{{ uxuiStore.modalContent?.title }}</h3>
    <p class="suggest__modal-text">{{ uxuiStore.modalContent?.text }}</p>
    <div class="suggest__buttons-wrapper">
      <button
        class="suggest__button suggest__button-cancel"
        @click="handleCancel"
        :disableStatus="false"
      >
        Отмена
      </button>
      <button
        class="suggest__button suggest__button-confirm"
        @click="handleDelete"
        :disableStatus="false"
      >
        Удалить
      </button>
    </div>
  </div>
</template>
<script lang="ts" src="./ConfirmationDelete.ts"></script>
<style lang="scss" scoped src="./ConfirmationDelete.scss"></style>
