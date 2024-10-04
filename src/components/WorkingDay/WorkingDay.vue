<template>
  <div class="work" v-if="!userStore.isLoadingUserData">
    <h2 class="work__title">Настройка рабочего дня</h2>
    <div class="work__header">
      <div class="work__header-item">
        <p class="work__header-item-text">
          Продолжительность рабочего дня
          <span class="work__header-item-span">*</span>
        </p>

        <div class="work__input-wrapper">
          <FormElement
            :value="userStore.userInfo?.startWorkingTime ?? ''"
            tagName="input"
            class="work__input"
            type="time"
            id="eventName"
            autocomplete="off"
            placeholder="Начало рабочего дня"
            @update:value="setStartWorkingTime"
            v-maska="'##:##'"
          />

          <FormElement
            :value="
              (userStore.userInfo && userStore.userInfo.endWorkingTime) || ''
            "
            tagName="input"
            class="work__input"
            type="time"
            id="eventName"
            autocomplete="disabled"
            placeholder="Окончание рабочего дня"
            @update:value="setEndWorkingTime"
            v-maska="'##:##'"
          />
        </div>
      </div>

      <div class="work__header-item">
        <p class="work__header-item-text">
          Шаг, мин
          <span class="work__header-item-span">*</span>
        </p>
        <FormElement
          :value="String(userStore.userInfo?.workingTimeInterval || 60)"
          tagName="input"
          class="work__input"
          type="text"
          id="eventName"
          autocomplete="disabled"
          placeholder="Шаг, мин."
          @update:value="setWorkingTimeInterval"
          v-maska="'##'"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./WorkingDay.ts"></script>
<style lang="scss" scoped src="./WorkingDay.scss"></style>
