<template>
  <div class="events__container-wrapper">
    <ButtonsMobileSwipe
      :item="item"
      @deleteLawsuit="deleteEventHandler(item.id)"
      extremeIconLeft="edit2"
      extremeIconRight="trash04"
    />
    <div
      class="events__container"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @click="resetPosition"
      :class="{
        move__left: position === -1,
      }"
    >
      <div class="events__input-wrapper events__input-wrapper-type">
        <p class="events__input-label events__input-label-type">
          Тип события<span>*</span>
        </p>
        <FormElement
          :value="item.name"
          tagName="input"
          class="events__input"
          type="text"
          id="eventName"
          autocomplete="disabled"
          placeholder="Судебное заседание (истец)"
          @update:value="setEventName"
        />
      </div>

      <div class="events__color">
        <p class="events__input-label">Цвет<span>*</span></p>
        <ColorPicker :currentColor="item.color" @changeColor="changeColor" />
      </div>

      <div class="events__input-wrapper events__input-notify">
        <p class="events__input-label">Уведомлять за, ч</p>
        <SelectElement
          :value="setStartValue(item.notifyBeforeHours, hoursOptions)"
          id="notifyByHours"
          :options="hoursOptions"
          label="name"
          placeholder="Выберите значение"
          class="select__input events__select events__notify"
          objectKey="notifyBeforeHours"
          @dataChanged="notifyBeforeHandler"
        />
      </div>

      <div class="events__input-wrapper events__input-mark">
        <p class="events__input-label">Красная пометка, за дн</p>
        <SelectElement
          :value="setStartValue(item.markBeforeDays, daysOptions)"
          id="markBeforeDays"
          :options="daysOptions"
          label="name"
          placeholder="Выберите значение"
          class="select__input events__select events__mark"
          objectKey="markBeforeDays"
          @dataChanged="notifyBeforeHandler"
        />
      </div>

      <div class="events__checkbox-wrapper events__checkbox-fee">
        <p class="events__input-label events__input-label-checkbox">
          Стоимость
        </p>
        <label :class="['events__checkbox', { checked: isCheckedBillable }]">
          <input
            type="checkbox"
            :value="item.isBillable"
            v-model="isCheckedBillable"
          />
          Платное
        </label>
      </div>

      <div class="events__checkbox-wrapper events__checkbox-type">
        <p class="events__input-label events__input-label-checkbox">
          Видимость
        </p>
        <div class="events__checkbox-inner">
          <label
            :class="[
              'events__checkbox',
              { checked: selectedType === 'consultation' },
            ]"
          >
            <input
              type="radio"
              :value="'consultation'"
              v-model="selectedType"
              :disabled="selectedType !== null"
            />
            Показывать в архиве дел
          </label>
          <label
            :class="[
              'events__checkbox',
              { checked: selectedType === 'tribunal' },
            ]"
          >
            <input
              type="radio"
              :value="'tribunal'"
              v-model="selectedType"
              :disabled="selectedType !== null"
            />
            Суд/ процессуальное участие
          </label>
        </div>
        <button
          class="events__delete-button"
          @click="deleteEventHandler(item.id)"
        >
          <SvgIcon :icon="'trash04'" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./EventsItem.ts"></script>
<style lang="scss" scoped src="./EventsItem.scss"></style>
