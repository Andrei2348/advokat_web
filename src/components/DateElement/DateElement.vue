<template>
  <div>
    <label class="date__label" v-if="label">{{ label }}</label>
    <VueDatePicker
      class="picker"
      v-model="date"
      id="datePicker"
      :format="format"
      :text-input="textInputOptions"
      locale="ru-RU"
      :space-confirm="true"
      position="right"
      auto-apply
      no-today
      required
      :ui="uiOptions"
      :day-class="getDayClass"
      :enable-time-picker="false"
      :six-weeks="true"
      :placeholder="placeholder"
      :year-range="[2020, 2040]"
      :disabled="disabled"
    >
      <template #input-icon>
        <SvgIcon icon="calendar" class="picker__icon" />
      </template>
    </VueDatePicker>
  </div>
</template>

<script lang="ts" src="./DateElement.ts"></script>
<style lang="scss" src="./DateElement.scss"></style>
