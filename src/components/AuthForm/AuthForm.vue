<template>
  <div class="auth-form">
    <span class="auth-form__logo">LOGO</span>
    <NotificationsComponent
      v-if="errorFields?.error"
      :text="errorFields?.error"
      status="error"
      size="small"
    />
    <div v-if="isLogin" class="auth-form__login">
      <span class="auth-form__login-title">Добро пожаловать</span>
      <template v-for="(v, k) in fieldsLogin" :key="k">
        <div class="auth-form__login-wrapper">
          <FormElement
            v-model:value="fieldsLogin[k]"
            title=""
            :errorText="errorFields?.errors ? errorFields.errors[k] : null"
            :fieldName="k"
            required
            tagName="input"
            class="auth-form__login-field"
            :type="fieldType(k)"
            autocomplete="disabled"
          />
          <button
            v-if="k === 'password' && fieldsLogin.password"
            class="auth-form__login-wrapper-button"
            @click="showPassword"
          >
            <SvgIcon :icon="isShowPassword ? 'eye' : 'eye-off'" />
          </button>
        </div>
      </template>
      <router-link :to="{ name: 'recoveryPassword' }" class="auth-form__link"
        >Забыли пароль?</router-link
      >
      <button
        @click="sendForm"
        :disabled="isLoginLoading"
        class="auth-form__enter"
      >
        Войти
      </button>
      <router-link
        :to="{ name: 'registration' }"
        class="auth-form__registration"
        >Регистрация</router-link
      >
    </div>
    <div v-else class="auth-form__code">
      <span class="auth-form__code-title">Введите код</span>
      <span class="auth-form__code-description"
        >На ваш телефон отправлен код подтверждения</span
      >
      <div class="auth-form__code-wrapper">
        <FormElement
          v-model:value="fieldsAuth.code"
          title=""
          :errorText="
            errorFields?.errors?.code ? errorFields?.errors?.code : null
          "
          fieldName="code"
          tagName="input"
          class="auth-form__login-field"
          type="text"
        />
      </div>
      <span v-if="timer" class="auth-form__code-subtitle">
        Запросить повторно можно через
      </span>
      <div v-if="timer" class="auth-form__code-timer">
        <SvgIcon icon="loader" />
        <span class="auth-form__code-time">{{ formatTimer }}</span>
      </div>
      <button v-else @click="sendForm" class="auth-form__code-resend">
        Выслать повторно
      </button>
      <button
        @click="sendSmsCode"
        :disabled="isSmsLoading"
        class="auth-form__enter"
      >
        Подтвердить
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./AuthForm.ts"></script>
<style lang="scss" scoped src="./AuthForm.scss"></style>
