<template>
  <div class="review__bodies-container">
    <FormElement
      :value="authorityStore?.authoritiesData?.lawsuitNumber || ''"
      required
      title="Дело"
      tagName="input"
      class="review__bodies-input"
      type="text"
      id="lawsuitField"
      autocomplete="disabled"
      placeholder="Дело"
      @update:value="setLawsuitNumber"
    />
    <FormElement
      :value="authorityStore?.authoritiesData?.lawsuitNumberLink || ''"
      title="Ссылка на дело"
      tagName="input"
      class="review__bodies-input"
      type="text"
      id="linkField"
      autocomplete="disabled"
      placeholder="Ссылка на дело"
      @update:value="setLawsuitLink"
    />

    <FormElement
      :value="authorityStore?.authoritiesData?.authority || ''"
      required
      title="Орган рассмотрения"
      tagName="input"
      class="review__bodies-input"
      type="text"
      id="reviewBodyField"
      autocomplete="disabled"
      placeholder="Орган рассмотрения"
      @update:value="setAuthorityValue"
    />
    <FormElement
      :value="authorityStore?.authoritiesData?.judge || ''"
      required
      title="Судья/проц.лицо"
      tagName="input"
      class="review__bodies-input"
      type="text"
      id="judgeField"
      autocomplete="disabled"
      placeholder="Судья/проц.лицо"
      @update:value="setJudgeName"
    />
    <FormElement
      :value="authorityStore?.authoritiesData?.cabinet || ''"
      required
      title="Зал/Кабинет"
      tagName="input"
      class="review__bodies-input"
      type="text"
      id="opponentField"
      autocomplete="disabled"
      placeholder="Зал/Кабинет"
      @update:value="setCabinetNumber"
    />
    <FormElement
      :value="authorityStore?.authoritiesData?.comment || ''"
      v-bind="$attrs"
      title="Примечание"
      tagName="textarea"
      class="review__bodies-textarea"
      placeholder="Примечание"
      :rows="5"
      :cols="80"
      fieldName="value"
      type="text"
      @update:value="setComment"
    />
    <button
      class="review__bodies-save-button"
      @click="saveRequestHandler"
      :disabled="disableSaveButton"
    >
      Сохранить
    </button>
  </div>
</template>

<script lang="ts" src="./EditReview.ts"></script>
<style lang="scss" scoped src="./EditReview.scss"></style>
