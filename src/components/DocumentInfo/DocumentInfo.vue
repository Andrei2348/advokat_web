<template>
  <div class="document__info">
    <h3 class="document__info-title">{{ title }}<SvgIcon :icon="icon" /></h3>
    <div class="document__info-wrapper">
      <div class="document__info-inner">
        <span class="document__info-label">Номер</span>
        <p class="document__info-text">{{ number }}</p>
      </div>

      <div class="document__info-inner">
        <span class="document__info-label">Дата подписания</span>
        <p class="document__info-text">{{ getFormatDate(signingDate) }}</p>
      </div>

      <div class="document__info-inner">
        <span class="document__info-label">Срок действия</span>
        <p class="document__info-text">{{ getFormatDate(validity) }}</p>
      </div>

      <div class="document__info-inner">
        <span class="document__info-label">Срок/мес</span>
        <p class="document__info-text">{{ endMonths }}</p>
      </div>

      <div class="document__info-inner">
        <span class="document__info-label">Окончание/дн</span>
        <div class="document__info-text-wrapper">
          <p :class="['document__info-text', { active: endDays <= 10 }]">
            {{ endDays }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./DocumentInfo.ts"></script>
<style lang="scss" scoped src="./DocumentInfo.scss"></style>
