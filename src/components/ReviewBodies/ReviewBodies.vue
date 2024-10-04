<template>
  <div class="review__bodies-container">
    <div class="review__bodies-inputs-wrapper">
      <button class="review__bodies-add-button" @click="addBodyHandler">
        Добавить орган рассмотрения
        <SvgIcon icon="plus" class="lawsuit__button-icon" />
      </button>
      <div
        class="review__bodies-table-items-empty"
        v-if="
          authoritiesList &&
          authoritiesList.length === 0 &&
          !isAuthoritiesLoading
        "
      >
        Список органов рассмотрения пуст
      </div>
      <div
        class="review__bodies-table-wrapper"
        v-if="
          authoritiesList && authoritiesList.length > 0 && !isAuthoritiesLoading
        "
      >
        <div class="review__bodies-table-items">
          <div class="review__bodies-table-item">Инстанция</div>
          <div class="review__bodies-table-item">Дело</div>
          <div class="review__bodies-table-item">Орган</div>
          <div class="review__bodies-table-item">Зал/Кабинет №</div>
          <div class="review__bodies-table-item">Судья/проц.лицо</div>
          <div class="review__bodies-table-item">Примечание</div>
        </div>
        <div
          class="review__bodies-table-item-content-wrapper"
          ref="scrollContainer"
        >
          <div
            v-for="(item, index) in authoritiesList.slice().reverse()"
            :key="item.id"
            class="review__bodies-table-item-content"
          >
            <ReviewItem :item="item" :index="index" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ReviewBodies.ts"></script>
<style lang="scss" scoped src="./ReviewBodies.scss"></style>
