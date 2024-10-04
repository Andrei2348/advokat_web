<template>
  <div class="lawsuit__wrapper">
    <label class="lawsuit__input-label" for="attorneyField">{{
      documentTitle
    }}</label>
    <div class="lawsuit__input-container">
      <FormElement
        :value="documentNumber"
        tagName="input"
        class="lawsuit__input"
        type="text"
        autocomplete="disabled"
        :placeholder="documentTitlePlaceholder"
        @update:value="setDocumentNumber"
      />
      <DateElement
        class="lawsuit__input"
        placeholder="Дата подписания"
        :objectKey="dateOfSigningKey"
        :value="dateOfSigning"
        @dataChanged="setDocumentDate"
        :disabled="disableDatesSigning"
      />
      <DateElement
        class="lawsuit__input"
        placeholder="Срок действия"
        :objectKey="validityPeriodKey"
        :value="validityPeriod"
        @dataChanged="setDocumentDate"
        :disabled="disableDatesPeriod"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./DocumentSigningInfo.ts"></script>
<style lang="scss" scoped src="./DocumentSigningInfo.scss"></style>
