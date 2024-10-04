<template>
  <div class="personal__wrapper" v-if='!userStore.isLoadingUserData'>
    <div class="personal__main">
      <h4 class="personal__subtitle">Основные данные</h4>
      <div class="personal__profile-wrapper">
        <FormElement
          title="Фамилия"
          :value="userStore?.userInfo?.lastname"
          required
          tagName="input"
          class="personal__input"
          type="text"
          autocomplete="disabled"
          fieldName="lastname"
          @update:value="setLastName"
        />
        <FormElement
          title="Имя"
          :value="userStore?.userInfo?.name"
          required
          tagName="input"
          class="personal__input"
          type="text"
          autocomplete="disabled"
          fieldName="name"
          @update:value="setUsername"
        />
        <FormElement
          title="Отчество"
          :value="userStore?.userInfo?.surname || ''"
          tagName="input"
          class="personal__input"
          type="text"
          autocomplete="disabled"
          fieldName="surname"
          @update:value="setSurname"
        />
      </div>
    </div>

    <div class="personal__contacts">
      <h4 class="personal__subtitle">Контактные данные</h4>
      <div class="personal__profile-wrapper">
        <FormElement
          title="Телефон"
          :value="userStore?.userInfo?.phone"
          required
          tagName="input"
          class="personal__input"
          type="text"
          fieldName="phone"
          disabled
        />
        <FormElement
          title="E-mail (логин)"
          :value="userStore?.userInfo?.email"
          required
          tagName="input"
          class="personal__input"
          type="text"
          fieldName="email"
          disabled
        />
        <div class="peronal__input-wrapper">
          <label class="personal__contacts-label" for="selectClient"
            >Тип пользователя<span class="personal__contacts-label-span"
              >*</span
            >
          </label>
          <SelectElement
            id="selectClient"
            :options="selectType"
            label="name"
            placeholder="Выберите клиента"
            :value="selectedType"
            class="select__input"
            objectKey="type"
            required
            @dataChanged="dataTypeSet"
          />
        </div>
      </div>
    </div>
    <div class="personal__buttons-wrapper">
      <button
        class="personal__button-save"
        @click="saveChangesHandler"
        :disabled="disabledFlagButton"
      >
        Сохранить изменения
      </button>
      <button
        @click="deleteUserHandler(userStore?.userInfo?.id)"
        class="personal__button-delete"
      >
        Удалить аккаунт
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./PersonalData.ts"></script>
<style lang="scss" scoped src="./PersonalData.scss"></style>
