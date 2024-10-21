<template>
  <div class="events__container-wrapper">
    <ButtonsMobileSwipe
      :item="item"
      :placement="'taskTagSettings'"
      @deleteTaskTag="deleteLawsuitHandler"
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
      <div class="select__input-wrapper select__input-wrapper-tag">
        <p class="select__input-label">Название тэга<span>*</span></p>
        <FormElement
          :value="item.name"
          tagName="input"
          class="events__input"
          type="text"
          id="eventName"
          autocomplete="disabled"
          placeholder="Судебное заседание (истец)"
          @update:value="setTagName"
        />
      </div>
      <div class="select__input-wrapper">
        <p class="select__input-label">Цвет<span>*</span></p>
        <div class="events__color">
          <ColorPicker :currentColor="item.color" @changeColor="changeColor" />
        </div>

        <button
          class="events__delete-button"
          @click="deleteLawsuitHandler(item.id)"
        >
          <SvgIcon :icon="'trash04'" />
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./TagsForTasksItem.ts"></script>
<style lang="scss" scoped src="./TagsForTasksItem.scss"></style>
