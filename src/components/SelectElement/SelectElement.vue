<template>
  <div>
    <Multiselect
      id="selected"
      v-model="selected"
      :options="options"
      :label="label"
      :searchable="false"
      :clear-on-select="false"
      :allow-empty="false"
      :close-on-select="true"
      :show-labels="false"
      :option-height="104"
      @open="handleOpen"
      @close="handleClose"
      :placeholder="placeholder"
      track-by="name"
    >
      <template #singleLabel="props">
        <div class="select__option-wrapper">
          <span
            v-if="props.option.color && typeof props.option.color === 'string'"
            :style="{ backgroundColor: props.option.color }"
            class="select__option-span"
          >
          </span>
          {{ props.option.name }}
          <SvgIcon icon="chevron-down" class="select__chevron" />
        </div>
      </template>

      <template #option="props">
        <div class="select__option-wrapper">
          <span
            v-if="props.option.color && typeof props.option.color === 'string'"
            :style="{ backgroundColor: props.option.color }"
            class="select__option-span"
          >
          </span>
          {{ props.option.name }}
        </div>
      </template>
    </Multiselect>
  </div>
</template>

<script lang="ts" src="./SelectElement.ts"></script>
<style lang="scss" src="./SelectElement.scss"></style>
