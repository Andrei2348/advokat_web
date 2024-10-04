<template>
  <div class="auth-form">
    <span class="auth-form__logo">LOGO</span>
    <NotificationsComponent
      v-if="errorFields?.error"
      :text="errorFields?.error"
      status="error"
      size="small"
    />
    <div v-show="step === 'first'" class="auth-form__login">
      <span class="auth-form__login-title">Давайте познакомимся</span>
      <template v-for="(v, k) in fieldsFirstStep" :key="k">
        <div class="auth-form__login-wrapper">
          <FormElement
            v-if="k !== 'type'"
            v-model:value="fieldsFirstStep[k]"
            title=""
            :errorText="errorFields?.errors ? errorFields.errors[k] : null"
            :fieldName="k"
            :required="k !== 'surname'"
            tagName="input"
            class="auth-form__login-field"
            :type="fieldType(k)"
            autocomplete="disabled"
          />
          <div v-else class="auth-form__options">
            <label
              :class="[
                'auth-form__options-item',
                { active: fieldsFirstStep.type === 'advocate' },
              ]"
            >
              <input
                type="radio"
                value="advocate"
                v-model="fieldsFirstStep.type"
              />Адвокат</label
            >
            <label
              :class="[
                'auth-form__options-item',
                { active: fieldsFirstStep.type === 'lawyer' },
              ]"
            >
              <input
                type="radio"
                value="lawyer"
                v-model="fieldsFirstStep.type"
              />Юрист
            </label>
          </div>
        </div>
      </template>
      <button @click="nextStepHandler" class="auth-form__enter">
        Продолжить
      </button>
      <div class="auth-form__steps">
        <div class="auth-form__steps-item --current"></div>
        <button @click="nextStepHandler" class="auth-form__steps-item"></button>
      </div>
    </div>
    <div v-show="step === 'second'" class="auth-form__code">
      <span class="auth-form__login-title">Давайте познакомимся</span>
      <template v-for="(v, k) in fieldsSecondStep" :key="k">
        <div class="auth-form__login-wrapper">
          <FormElement
            v-model:value="fieldsSecondStep[k]"
            title=""
            v-maska
            :data-maska="k === 'phone' ? '+7 ### ### ## ##' : ''"
            :errorText="errorFields?.errors ? errorFields.errors[k] : null"
            :fieldName="k"
            tagName="input"
            required
            :class="[
              'auth-form__login-field',
              { '--withDescription': k === 'password' && fieldsSecondStep[k] },
            ]"
            :type="fieldType(k)"
            autocomplete="disabled"
          />
          <button
            v-if="
              (k === 'password' && fieldsSecondStep.password) ||
              (k === 'repeatPassword' && fieldsSecondStep.repeatPassword)
            "
            class="auth-form__login-wrapper-button"
            @click="showPassword(k)"
          >
            <SvgIcon
              :icon="
                (k === 'password' && isShowPassword) ||
                (k === 'repeatPassword' && isShowRepeatPassword)
                  ? 'eye'
                  : 'eye-off'
              "
            />
          </button>
          <span
            v-if="k === 'password' && fieldsSecondStep[k]"
            class="auth-form__login-description"
            >Пароль должен состоять из 16 символов, содержать буквы, цифры и
            спецсимволы</span
          >
        </div>
      </template>
      <button
        @click="sendForm"
        :disabled="isRegistrationLoading"
        class="auth-form__enter"
      >
        Продолжить
      </button>
      <button @click="backHandler" class="auth-form__registration">
        Назад
      </button>
      <div class="auth-form__steps">
        <button @click="backHandler" class="auth-form__steps-item"></button>
        <div class="auth-form__steps-item --current"></div>
      </div>
    </div>
    <div v-show="step === 'code'" class="auth-form__code">
      <span class="auth-form__code-title">Введите код</span>
      <div class="auth-form__code-description">
        На номер {{ fieldsSecondStep.phone }} отправлен код подтверждения
        <button @click="nextStepHandler" class="auth-form__code-phone">
          Изменить номер
        </button>
      </div>
      <div class="auth-form__code-wrapper">
        <FormElement
          v-model:value="fieldsCodeStep.code"
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
        :disabled="isCodeLoading"
        class="auth-form__enter"
      >
        Подтвердить
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./RegistrationForm.ts"></script>
<style lang="scss" scoped src="./RegistrationForm.scss"></style>
