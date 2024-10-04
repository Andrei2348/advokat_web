<template>
  <div :class="['settings', { collapsed: uxuiStore.asideCollapsed }]">
    <EventsList />
    <CaseCategory />
    <div class="settings__row-wrapper">
      <TagsForTasks />
      <WorkingDay />
    </div>
    <div class="settings__save-button-wrapper">
      <button
        class="settings__save-button"
        @click="saveDataHandler"
        :disabled="!isButtonEnabled"
      >
        Сохранить изменения
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./SettingsPage.ts"></script>
<style lang="scss" src="./SettingsPage.scss"></style>
