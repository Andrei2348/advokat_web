<template>
  <div class="events">
    <h2 class="events__title">Настройка тэгов для задач</h2>
    <TableHead :items="tagsItems" class="events__table" />
    <div
      v-for="item in tasksStore.tagsList"
      :key="item.id ? item.id : 565656565"
      class="events__items"
    >
      <TagsForTasksItem :item="item" />
    </div>
    <button
      class="events__header-button-create"
      @click="tasksStore.setEmptyTag()"
      :disabled="tasksStore.createTagsForTasksStatus"
    >
      Добавить тэг
      <SvgIcon icon="plus" class="events__header-button-icon" />
    </button>
  </div>
</template>

<script lang="ts" src="./TagsForTasks.ts"></script>
<style lang="scss" scoped src="./TagsForTasks.scss"></style>
