<template>
  <label class="form-element">
    <span v-if="title" class="form-element__name">
      {{ title }}
    </span>
    <div class="form-element__wrapper">
      <component
        :is="tagName"
        v-bind="$attrs"
        :value="value"
        :disabled="disabled"
        :maxlength="innerParams?.maxLength"
        @input="onInput"
        :class="['form-element__field', { error: errorText }]"
      >
      </component>
      <span
        v-if="innerParams?.placeholder && !value"
        class="form-element__placeholder"
        >{{ innerParams.placeholder }}</span
      >
      <span v-if="errorText" class="form-element__error">
        <div class="form-element__error-list">
          <span v-for="(error, index) in errorText" :key="index">{{
            error
          }}</span>
        </div>
      </span>
    </div>
  </label>
</template>

<script lang="ts" src="./FormElement.ts"></script>
<style lang="scss" scoped src="./FormElement.scss"></style>
