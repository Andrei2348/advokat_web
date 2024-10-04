<template>
  <div class="auth-form">
    <span class="auth-form__logo">LOGO</span>
    <NotificationsComponent
      v-if="errorFields?.error"
      :text="errorFields?.error"
      status="error"
      size="small"
    />
    <NotificationsComponent
      v-if="recoveryData"
      text="На указанный E-mail отправлена инструкция, используйте её для восстановления пароля"
      status="done"
      size="large"
    />

    <div class="auth-form__code">
      <span class="auth-form__code-title">Восстановление пароля</span>
      <span class="auth-form__code-description"
        >На указанный E-mail будет отправлена инструкция по восстановлению
        пароля</span
      >
      <div class="auth-form__code-wrapper">
        <FormElement
          v-model:value="fields.email"
          title=""
          :errorText="
            errorFields?.errors?.email ? errorFields?.errors?.email : null
          "
          fieldName="email"
          tagName="input"
          class="auth-form__login-field"
          type="email"
        />
      </div>
      <button
        @click="sendForm"
        :disabled="isRecoveryLoading"
        class="auth-form__enter"
      >
        Восстановить
      </button>
      <router-link :to="{ name: 'login' }" class="auth-form__registration"
        >Отмена</router-link
      >
    </div>
  </div>
</template>

<script lang="ts" src="./RecoveryPassword.ts"></script>
<style lang="scss" scoped src="./RecoveryPassword.scss"></style>
