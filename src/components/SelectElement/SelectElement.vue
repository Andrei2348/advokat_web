<template>
  <div>
    <Multiselect
      id="selected"
      v-model="selected"
      :options="options"
      :label="label"
      :searchable="searchable"
      :clear-on-select="false"
      :allow-empty="allowEmpty"
      :placeholder="placeholder"
      :close-on-select="closeOnSelect"
      :show-labels="false"
      :multiple="multiple"
      :track-by="objectKey !== 'lawsuit' ? 'name' : 'opponent'"
      :option-height="104"
      @open="handleOpen"
      @close="handleClose"
    >
      <template #singleLabel="props">
        <div class="select__option-wrapper">
          <span
            v-if="props.option.color && typeof props.option.color === 'string'"
            :style="{ backgroundColor: props.option.color }"
            class="select__option-span"
          >
          </span>
          {{
            props.option.name
              ? props.option.name
              : objectKey === 'lawsuit'
                ? `${props.option.lawsuitCategory.name} ${props.option.opponent}`
                : props.option.name
          }}
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
          {{
            props.option && objectKey === 'lawsuit'
              ? `${props.option.lawsuitCategory.name} ${props.option.opponent}`
              : props.option.name
          }}
        </div>
      </template>
      <template #selection="{ values }">
        <span class="multiselect__single" v-if="values.length"
          >Выбраных тэгов {{ values.length }}</span
        >
      </template>
    </Multiselect>
  </div>
</template>

<script lang="ts" src="./SelectElement.ts"></script>
<style lang="scss" src="./SelectElement.scss"></style>
