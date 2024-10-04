<template>
  <div :class="['profile', { collapsed: uxuiStore.asideCollapsed }]">
    <div class="profile__header">
      <h3 class="profile__title">Ваш профиль</h3>
      <button class="profile__logout-button" @click="logoutHandler">
        Выход
        <svgIcon icon="log-out" />
      </button>
    </div>
    <PersonalData />
    <div class="profile__bottom-wreapper">
      <PasswordChangeComponent />
    </div>
  </div>
</template>

<script lang="ts" src="./ProfilePage.ts"></script>
<style lang="scss" scoped src="./ProfilePage.scss"></style>
