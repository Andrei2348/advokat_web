<template>
  <div
    :class="[
      'tasks',
      { collapsed: uxuiStore.asideCollapsed },
      { tasks_empty: !tasksStore.allTasks?.data },
    ]"
  >
    <TabsNav
      v-if="tasksStore.allTasks?.data"
      :names="tabs"
      :selected-tab="selectedTab"
      :header-items="tasksTableHeader"
      ref="tasksList"
      class="tasks__header"
      @changeTab="onTabClick"
    >
      <TaskEventItem
        v-for="item of taskItems"
        :key="item.id"
        :data="item"
        :is-in-tasks="true"
        @on-delete="deleteTask"
      />
      <div v-show="!taskItems?.length" class="tasks__text">
        Задачи отсутствуют
      </div>
    </TabsNav>
    <div v-else class="tasks__empty-container">
      <h2>Список дел пуст</h2>
      <p>Добавьте свое первое дело</p>
    </div>
  </div>
</template>

<script lang="ts" src="./TasksPage.ts"></script>
<style lang="scss" src="./TasksPage.scss"></style>
