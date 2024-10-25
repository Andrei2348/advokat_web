<template>
  <form class="task-form" novalidate @submit.prevent="submitHandler">
    <fieldset class="task-form__head">
      <div>
        <span>Задача<sup>*</sup></span>
        <span
          v-if="taskStatus"
          :class="[
            'task-form__head-status',
            {
              'task-form__head-status_type_planned':
                Object.keys(taskStatus)[0] === 'planned',
              'task-form__head-status_type_finished':
                Object.keys(taskStatus)[0] === 'finished',
            },
          ]"
        >
          {{ isTaskNew ? '' : Object.values(taskStatus)[0] }}
        </span>
      </div>
      <FormElement
        tagName="textarea"
        v-model:value="fields.theme"
        placeholder="Задача"
        :error-text="validationErrors?.theme"
      />
      <div class="task-form__checkbox-wrapper">
        <label
          :class="['task-form__checkbox', { checked: fields.isImportant }]"
        >
          <input type="checkbox" v-model="fields.isImportant" />
          Важная задача
        </label>
      </div>
    </fieldset>
    <fieldset class="task-form__middle">
      <div class="task-form__middle-time">
        <span>Дата<sup>*</sup>/Время</span>
        <div class="task-form__middle-time-inputs">
          <DateElement
            class="task-form__middle-time-picker"
            v-model:value="fields.date"
            object-key="date"
            :error-text="validationErrors?.deadline"
            @dataChanged="onValueChange"
          />
          <FormElement
            class="task-form__middle-time-hours"
            tagName="input"
            placeholder="00:00"
            v-model:value="fields.time"
            :maxLength="5"
            v-maska
            data-maska="A#:C#"
            data-maska-tokens="A:[0-2]|C:[0-5]"
            :error-text="validationErrors?.time"
          />
        </div>
      </div>
      <FormElement
        title="Стоимость, ₽"
        tagName="input"
        class="task-form__middle-time-cost"
        v-model:value.trim="fields.cost"
        v-maska
        data-maska-number-locale="ru"
        data-maska-number-fraction="2"
        data-maska-number-unsigned
        :error-text="validationErrors?.cost"
      />
    </fieldset>
    <label class="task-form__tag">
      <span> Тэг<sup>*</sup> </span>
      <SelectElement
        :value="selectInitialValues.tag"
        objectKey="tag"
        placeholder="Выберите тэг"
        class="task-form__tag-select"
        :options="selectTagOptions"
        @dataChanged="onValueChange"
      />
    </label>
    <fieldset class="task-form__lawsuit">
      <SelectElement
        :value="selectInitialValues.client"
        label="Клиент"
        objectKey="customer"
        placeholder="Выберите клиента"
        :allow-empty="true"
        :options="selectClientOptions"
        @dataChanged="onValueChange"
      />
      <SelectElement
        :value="selectInitialValues.lawsuit"
        label="Дело"
        objectKey="lawsuit"
        placeholder="Выберите дело"
        :allow-empty="true"
        :options="selectLawsuitOptions"
        @dataChanged="onValueChange"
      />
    </fieldset>
    <FormElement
      title="Примечание"
      tagName="textarea"
      :error-text="validationErrors?.comment"
      v-model:value="fields.comment"
    />
    <section v-if="!isTaskNew" class="task-form__info">
      <article v-if="lawsuitEvent" class="task-form__event">
        <div class="event-box">
          <span class="gray-text">Связанное событие</span>
          <p class="blue-text blue-text_link">
            {{ lawsuitEvent.theme }}
          </p>
        </div>
        <div class="task-form__event-bottom">
          <div class="event-box">
            <span class="gray-text">Место события</span>
            <p class="blue-text">{{ lawsuitEvent.place }}</p>
          </div>
          <div class="event-box">
            <span class="gray-text">Дата и время события</span>
            <p class="blue-text">
              {{ getTimezoneDate(lawsuitEvent.till).date }}
              {{ getTimezoneDate(lawsuitEvent.till).time }}
            </p>
          </div>
        </div>
        <button type="button" class="task-form__event-remove-btn">
          <SvgIcon icon="trash04" />
        </button>
      </article>
      <article v-else class="task-form__event">
        <span class="gray-text">Связанное событие</span>
        <div class="task-form__event-bottom">
          <p>Связанное событие отсутствует</p>
          <button type="button" class="task-form__event-add-btn">
            Добавить
            <SvgIcon icon="plus" />
          </button>
        </div>
      </article>
      <RouterLink
        v-if="previousLawsuitId"
        :to="`lawsuit/${previousLawsuitId}`"
        class="task-form__info-lawsuit"
        >Перейти в досье
        <SvgIcon icon="chevron-right" />
      </RouterLink>
    </section>
    <div class="task-form__btn-container">
      <div class="task-form__form-controls">
        <button :disabled="isSubmitBtnDisabled" type="submit">Сохранить</button>
        <button
          v-if="
            !isTaskNew && taskStatus && Object.keys(taskStatus)[0] === 'planned'
          "
          type="button"
          @click="onCompleteBtnClick"
        >
          Завершить
        </button>
      </div>
      <button
        v-if="!isTaskNew"
        type="button"
        class="task-form__delete-btn"
        @click="onDeleteTaskBtnClick"
      >
        Удалить задачу
      </button>
    </div>
  </form>
</template>

<script lang="ts" src="./TaskForm.ts"></script>

<style lang="scss" src="./TaskForm.scss"></style>
