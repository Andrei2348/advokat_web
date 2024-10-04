<template>
  <div class="password__wrapper">
    <h4 class="password__subtitle">Изменение пароля</h4>
    <div class="password__input-wrapper">
      <label class="password__input-label" for="selectClient"
        >Действующий пароль<span class="password__input-label-span">*</span>
      </label>
      <FormElement
        title=""
        required
        tagName="input"
        class="auth-form__login-field"
        type="password"
        autocomplete="disabled"
      />
    </div>
    <div class="password__input-wrapper">
      <label class="password__input-label" for="selectClient"
        >Новый пароль<span class="password__input-label-span">*</span>
      </label>
      <FormElement
        title=""
        required
        tagName="input"
        type="password"
        autocomplete="disabled"
      />
      <span class="password__form-description"
        >Пароль должен состоять из 16 символов, содержать буквы, цифры и
        спецсимволы
      </span>
    </div>

    <div class="password__input-wrapper">
      <label class="password__input-label" for="selectClient"
        >Повторите новый пароль<span class="password__input-label-span">*</span>
      </label>
      <FormElement
        title=""
        required
        tagName="input"
        type="password"
        autocomplete="disabled"
      />
      <span class="password__form-description"
        >Пароль должен состоять из 16 символов, содержать буквы, цифры и
        спецсимволы
      </span>
    </div>
    <button class="password__button-save">Сохранить изменения</button>
  </div>
</template>

<script lang="ts" src="./PasswordChangeComponent.ts"></script>
<style lang="scss" scoped src="./PasswordChangeComponent.scss"></style>
