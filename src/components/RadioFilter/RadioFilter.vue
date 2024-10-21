<template>
  <div class="radio-filter">
    <span v-if="withTitle">{{ data.title }}</span>
    <label
      v-for="option of data?.options"
      :key="JSON.stringify(option)"
      @click="onOptionSelect(option.valueToPass, option.valueToShow)"
      :class="{ active: optionValue === option.valueToPass }"
    >
      <input type="radio" name="radio-input" :value="option.valueToPass" />
      {{ option.valueToShow }}
    </label>
  </div>
</template>

<script lang="ts" src="./RadioFilter.ts"></script>

<style scoped lang="scss" src="./RadioFilter.scss"></style>
