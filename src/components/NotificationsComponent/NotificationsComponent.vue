<template>
  <div :class="['notifications', status, size]">
    <SvgIcon :icon="status === 'error' ? 'error' : 'done'" />
    <span>{{ text }}</span>
    <button v-if="isInMain" type="button" @click="uxuiStore.closeNotification">
      <SvgIcon icon="x" />
    </button>
  </div>
</template>

<script lang="ts" src="./NotificationsComponent.ts"></script>
<style lang="scss" scoped src="./NotificationsComponent.scss"></style>
