<template>
  <div class="notes__panel-wrapper">
    <div class="notes__panel-header">
      <h2 class="notes__panel-title">Заметки</h2>
      <button class="notes__panel-close" @click="handleClose">
        <SvgIcon icon="x" />
      </button>
    </div>
    <div class="notes__panel-items-wrapper">
      <h3
        class="notes__panel-empty-message"
        v-if="!notesStore.notesList.length && !notesStore.isNoteLoading"
      >
        Список заметок пуст.
      </h3>
      <ul v-else class="notes__panel-items">
        <li
          v-for="item in notesStore.isNoteList"
          :key="item.id"
          class="notes__panel-item"
        >
          <span class="notes__panel-date">{{
            getFormatDate(item.updatedAt)
          }}</span>
          <div class="notes__panel-content-wrapper">
            <p class="notes__panel-content">{{ item.text }}</p>
            <button class="notes__panel-delete">
              <SvgIcon icon="trash" @click="handleDelete(item.id)" />
            </button>
          </div>
        </li>
      </ul>
      <div class="notes__panel-textarea">
        <FormElement
          tagName="textarea"
          class="notes__panel-textarea-input"
          v-model:value="textAreaValue"
          placeholder="Введите текст заметки"
          :rows="4"
          :cols="80"
          title="Добавить заметку"
          fieldName="value"
          :errorText="isErrorsExists ? [warningMessage] : null"
          type="value"
        />
        <button
          class="notes__panel-textarea-button"
          :disabled="buttonIsDisabled"
          @click="handleSendForm"
        >
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./NotesPanel.ts"></script>
<style lang="scss" scoped src="./NotesPanel.scss"></style>
