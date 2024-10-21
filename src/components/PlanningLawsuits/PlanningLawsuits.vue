<template>
  <TabsNav
    class="planning__header"
    :names="tabs"
    :selectedTab="selectedTab"
    :header-items="lawsuitEventsHeader"
    @changeTab="changeTab"
  >
    <div v-if="selectedTab === 'Запланировано'">
      <div v-if="getItems?.plannedItems.length">
        <TaskEventItem
          v-for="item in getItems.plannedItems"
          :key="JSON.stringify(item)"
          :data="item"
          @on-delete="deleteEventTask"
        />
      </div>
      <div class="planning__empty-message" v-else>
        Пока ничего не запланировано
      </div>
    </div>
    <div v-if="selectedTab === 'Выполнено'">
      <div v-if="getItems?.finishedItems.length">
        <TaskEventItem
          v-for="item in getItems?.finishedItems"
          :key="JSON.stringify(item)"
          :data="item"
          @on-delete="deleteEventTask"
        />
      </div>
      <div class="planning__empty-message" v-else>
        Пока ничего не запланировано
      </div>
    </div>
  </TabsNav>
</template>

<script lang="ts" src="./PlanningLawsuits.ts"></script>
<style lang="scss" src="./PlanningLawsuits.scss"></style>
