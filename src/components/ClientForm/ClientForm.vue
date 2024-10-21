<template>
  <div>
    <form
      :class="['client-form']"
      novalidate
      @submit.prevent="clientFormSubmitHandler"
    >
      <template v-for="(val, key) of fields" :key="key">
        <div v-if="key === 'phone'" class="client-form__date-wrapper">
          <span class="client-form__input-title">Дата рождения</span>
          <DateElement
            v-model:value="birthDate"
            :object-key="'birthday'"
            @dataChanged="onDataChange"
          />
        </div>
        <div>
          <span class="client-form__input-title"
            >{{ clientFormFields[key].title }}
            <sup v-if="clientFormFields[key].required">*</sup></span
          >
          <div class="client-form__input-wrapper">
            <div class="client-form__input-wrapper-input">
              <FormElement
                v-model:value="fields[key]"
                tagName="input"
                v-maska
                :data-maska="
                  key === 'phone' || key === 'telegram'
                    ? '+7 (###) ### ## ##'
                    : ''
                "
                :field-name="key"
                :type="clientFormFields[key].type"
                :placeholder="clientFormFields[key].placeholder"
                :max-length="clientFormFields[key].maxLength"
                ref="formElement"
              />
              <button
                class="client-form__input-wrapper-copy"
                type="button"
                @click="onCopyClick(fields[key])"
              >
                <SvgIcon icon="copy" />
              </button>
            </div>
            <span
              v-if="isUserNew || !clientFormFields[key].link"
              :class="[
                'client-form__input-wrapper-link',
                { 'client-form__input-wrapper-link_client': key === 'client' },
              ]"
            >
              <SvgIcon :icon="clientFormFields[key].icon" />
            </span>
            <a
              v-else
              :href="`${clientFormFields[key].link}${val}`"
              ref="link"
              :class="[
                'client-form__input-wrapper-link',
                'client-form__input-wrapper-link_active',
              ]"
            >
              <SvgIcon :icon="clientFormFields[key].icon" />
            </a>
          </div>
        </div>
      </template>
      <div class="client-form__btn-container">
        <button type="submit">
          {{ isUserNew ? 'Создать' : 'Сохранить изменения' }}
        </button>
        <button type="button" @click="onRemoveBtnClick">
          Удалить клиента
          <SvgIcon icon="trash04" />
        </button>
      </div>
    </form>
    <ClientLawsuitsTable v-if="!isUserNew && clientLawsuits?.length" />
  </div>
</template>

<script lang="ts" src="./ClientForm.ts"></script>

<style lang="sass" scoped src="./ClientForm.scss"></style>
