<template>
  <div class="lawsuit__edit-container">
    <div class="lawsuit__common-wrapper">
      <!-- Левая панель -->
      <div class="lawsuit__client-wrapper">
        <div class="lawsuit__client-select">
          <label class="lawsuit__input-label" for="selectClient"
            >Клиент<span class="lawsuit__input-label-span">*</span>
          </label>
          <SelectElement
            id="selectClient"
            :options="customersList"
            label="name"
            placeholder="Выберите клиента"
            @dataChanged="dataChanged"
            :value="lawsuitStore?.selectedLawsuit?.customer || null"
            class="select__input"
            objectKey="customerId"
            required
          />
        </div>
        <button
          class="lawsuit__client-button lawsuit__client-button-create"
          :disabled="!!lawsuitStore?.selectedLawsuit?.id"
        >
          Создать нового клиента
          <SvgIcon icon="plus" class="lawsuit__button-icon" />
        </button>

        <div class="lawsuit__client-select">
          <label class="lawsuit__input-label" for="categorySelect"
            >Категория дела<span class="lawsuit__input-label-span"
              >*</span
            ></label
          >
          <SelectElement
            id="categorySelect"
            :options="categoriesList"
            label="name"
            placeholder="Выберите категорию дела"
            @dataChanged="dataChanged"
            class="select__input"
            objectKey="lawsuitCategoryId"
            :value="lawsuitStore?.selectedLawsuit?.lawsuitCategory || null"
          />
        </div>

        <div class="lawsuit__fabula-wrapper">
          <label class="lawsuit__input-label" for="opponentField"
            >Фабула дела<span class="lawsuit__input-label-span">*</span></label
          >
          <FormElement
            v-bind="$attrs"
            :value="lawsuitStore?.selectedLawsuitData?.plot || ''"
            tagName="textarea"
            class="lawsuit__fabula-textarea-input"
            @update:value="setPlotName"
            placeholder="Введите текст фабулы"
            :rows="7"
            :cols="80"
            fieldName="value"
            type="text"
          />
        </div>
      </div>
      <!-- Правая панель -->
      <div class="lawsuit__opponent--wrapper">
        <div class="lawsuit__input-wrap">
          <label class="lawsuit__input-label" for="opponentField"
            >Оппонент<span class="lawsuit__input-label-span">*</span></label
          >
          <FormElement
            :value="lawsuitStore?.selectedLawsuitData?.opponent || ''"
            required
            tagName="input"
            class="lawsuit__input"
            type="text"
            id="opponentField"
            autocomplete="disabled"
            placeholder="Имя оппонента"
            @update:value="setOpponentName"
          />
        </div>
        <div class="lawsuit__input-rating-wrapper">
          <p class="lawsuit__input-label">
            Рейтинг<span class="lawsuit__input-label-span">*</span>
          </p>
          <StarRating
            class="lawsuit__input-rating"
            :rating="lawsuitStore?.selectedLawsuitData?.rating || 1"
            objectKey="rating"
            @dataChanged="dataChanged"
          />
        </div>
        <div class="table__content-documents-wrapper">
          <DocumentSigningInfo
            documentTitle="Договор"
            :documentNumber="
              lawsuitStore?.selectedLawsuitData?.contractNumber || ''
            "
            documentNumberKey="contractNumber"
            documentTitlePlaceholder="Номер договора"
            :dateOfSigning="
              lawsuitStore?.selectedLawsuitData?.contractSigningDate || ''
            "
            dateOfSigningKey="contractSigningDate"
            :validityPeriod="
              lawsuitStore?.selectedLawsuitData?.contractValidity || ''
            "
            validityPeriodKey="contractValidity"
            @validityChanged="setContractValidate"
          />
          <DocumentSigningInfo
            documentTitle="Доверенность"
            :documentNumber="
              lawsuitStore?.selectedLawsuitData?.powerOfAttorney || ''
            "
            documentNumberKey="powerOfAttorney"
            documentTitlePlaceholder="Номер доверенности"
            :dateOfSigning="
              lawsuitStore?.selectedLawsuitData?.powerOfAttorneySigningDate ||
              ''
            "
            dateOfSigningKey="powerOfAttorneySigningDate"
            :validityPeriod="
              lawsuitStore?.selectedLawsuitData?.powerOfAttorneyValidity || ''
            "
            validityPeriodKey="powerOfAttorneyValidity"
            @validityChanged="setAttorneyValidate"
          />
        </div>
      </div>
      <button
        class="lawsuit__client-button lawsuit__client-button-save"
        @click="setDataHandler"
        :disabled="disableSaveButton"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./EditLawsuit.ts"></script>
<style lang="scss" scoped src="./EditLawsuit.scss"></style>
