<template>
  <div class="list-filter" ref="wrapper">
    <span class="list-filter__title">{{ multiple ? 'Клиенты' : 'Дела' }}</span>
    <template v-if="multiple">
      <label class="list-filter__input">
        Поиск по фразе
        <input
          v-model.trim="searchValue"
          type="text"
          placeholder="Введите поисковую фразу"
        />
        <SvgIcon icon="search" />
      </label>
      <div class="list-filter__options-wrapper">
        <label
          v-for="{ id, name } of searchedOptions"
          :key="id"
          class="list-filter__checkbox"
          :class="{
            checked: selectedValues.includes(id),
          }"
        >
          <input type="checkbox" @click="onMultipleValueSelect(id)" />
          {{ name }}
        </label>
      </div>
    </template>
    <template v-else>
      <div class="list-filter__options-wrapper">
        <label
          v-for="{ id, lawsuitCategory, opponent } of options"
          :key="id"
          class="list-filter__radio"
          :class="{ active: selectedValues.includes(id) }"
        >
          <input type="radio" @click="onSingleValueSelect(id)" />
          {{ lawsuitCategory.name }} {{ opponent }}
        </label>
      </div>
    </template>
    <div class="list-filter__btn-container">
      <button type="button" @click.stop="onAcceptBtnClick">Выбрать</button>
      <button type="button" @click.stop="onCancelBtnClick" class="cancel">
        Отменить
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./ListFilter.ts"></script>

<style scoped lang="scss" src="./ListFilter.scss"></style>
