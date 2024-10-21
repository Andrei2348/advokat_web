<template>
  <div
    class="list-selection"
    ref="selection"
    @click="onSelectionFieldsClick"
    v-click-outside="onSelectionClose"
  >
    <div class="list-selection__options">
      <span
        class="list-selection__options-placeholder"
        v-if="!valuesForDisplaying.length"
        >{{
          purpose === 'customerIds' ? 'Выберите клиентов' : 'Выберите дело'
        }}</span
      >
      <div
        v-for="value of valuesForDisplaying.slice(0, 2)"
        :key="value.id"
        class="list-selection__options-item"
      >
        <span :class="{ single: !data.modal.multiple }">
          {{
            purpose === 'customerIds'
              ? value.name
              : `${value.lawsuitCategory.name} ${value.opponent}`
          }}
        </span>
        <SvgIcon
          class="close"
          icon="x"
          @click.stop="onRemoveDisplayedOptionBtnClick(value.id)"
        />
      </div>
      <div
        v-show="data.modal.multiple ? valuesForDisplaying.length > 2 : false"
        class="list-selection__options-item"
      >
        ...ещё {{ valuesForDisplaying.slice(2).length }}
      </div>
    </div>
    <SvgIcon class="arrow" icon="chevron-right" />
    <ListFilter
      v-if="isModalVisible"
      ref="modal"
      :multiple="data.modal.multiple"
      :options="listOptions"
      :initialValue="selectedValues"
      :isOpen="isModalVisible"
      class="list-selection__modal"
      :style="{ top: getModalPosition.top, bottom: getModalPosition.bottom }"
      @update:value="onGetValues"
      @cancel="onSelectionClose"
    />
  </div>
</template>

<script lang="ts" src="./ListFilterSelection.ts"></script>

<style scoped lang="scss" src="./ListFilterSelection.scss"></style>
