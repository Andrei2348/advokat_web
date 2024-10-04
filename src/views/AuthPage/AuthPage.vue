<template>
  <div class="auth">
    <div class="auth__wrapper">
      <AuthForm v-if="isLogin" />
      <RegistrationForm v-else-if="isRegistration" />
      <RecoveryPassword v-else />
    </div>
  </div>
</template>

<script lang="ts" src="./AuthPage.ts"></script>
<style lang="scss" scoped src="./AuthPage.scss"></style>
