<template>
  <div class="events__container-wrapper">
    <ButtonsMobileSwipe
      :item="item"
      @deleteLawsuit="deleteLawsuitCategoryHandler(item.id)"
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
      <div class="select__input-wrapper select__input-wrapper-category">
        <p class="select__input-label">Категория дела<span>*</span></p>
        <FormElement
          :value="item.name"
          tagName="input"
          class="events__input"
          type="text"
          id="eventName"
          autocomplete="disabled"
          placeholder="Судебное заседание (истец)"
          @update:value="setLawsuitCategoryName"
        />
      </div>

      <div class="select__input-wrapper select__input-wrapper-color">
        <p class="select__input-label">Цвет<span>*</span></p>
        <div class="events__color">
          <ColorPicker :currentColor="item.color" @changeColor="changeColor" />
        </div>
      </div>

      <div class="select__input-wrapper select__input-wrapper-hours">
        <p class="select__input-label">Уведомлять за, ч</p>
        <SelectElement
          :value="setStartValue(item.notifyBeforeHours, hoursOptions)"
          :options="hoursOptions"
          id="notifyByHours"
          label="name"
          placeholder="Выберите значение"
          class="select__input events__select"
          objectKey="notifyBeforeHours"
          @dataChanged="notifyBeforeHandler"
        />
      </div>

      <div class="select__input-wrapper select__input-wrapper-days">
        <p class="select__input-label">Красная пометка, за дн</p>
        <SelectElement
          :value="setStartValue(item.markBeforeDays, daysOptions)"
          id="markBeforeDays"
          :options="daysOptions"
          label="name"
          placeholder="Выберите значение"
          class="select__input events__select"
          objectKey="markBeforeDays"
          @dataChanged="notifyBeforeHandler"
        />

        <button
          class="events__delete-button"
          @click="deleteLawsuitCategoryHandler(item.id)"
        >
          <SvgIcon :icon="'trash04'" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./CaseItem.ts"></script>
<style lang="scss" scoped src="./CaseItem.scss"></style>
