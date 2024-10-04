<template>
  <div class="planning__wrapper">
    <h2 class="planning__title">Планирование</h2>
    <TabsNav :names="tabs" :selectedTab="selectedTab" @changeTab="changeTab">
      <template v-slot:tab-planning>
        <div class="planning__list" v-if="mainStore.isMobile || selectedTab === 'Запланировано'">
          <div v-if="getPlannedItems(lawsuitStore.lawsuitEvents).length > 0">
            <LawsuitEvent
              v-for="(item, index) in getPlannedItems(
                lawsuitStore.lawsuitEvents,
              )"
              :key="index"
              :data="item"
              :sign="'planned'"
            />
          </div>
          <div
            class="planning__empty-message"
            v-if="
              getPlannedItems(lawsuitStore.lawsuitEvents).length === 0 &&
              !mainStore.isMobile
            "
          >
            Пока ничего не запланировано
          </div>
        </div>

        <div class="planning__list" v-if="mainStore.isMobile || selectedTab === 'Выполнено'">
          <div v-if="getFinishedItems(lawsuitStore.lawsuitEvents).length > 0">
            <LawsuitEvent
              v-for="(item, index) in getFinishedItems(
                lawsuitStore.lawsuitEvents,
              )"
              :key="index"
              :data="item"
              :sign="'finished'"
            />
          </div>
          <div
            class="planning__empty-message"
            v-if="
              getFinishedItems(lawsuitStore.lawsuitEvents).length === 0 &&
              !mainStore.isMobile
            "
          >
            Пока ничего не выполнено
          </div>
        </div>
      </template>
    </TabsNav>
  </div>
</template>


<script lang="ts" src="./PlanningLawsuits.ts"></script>
<style lang="scss" scoped src="./PlanningLawsuits.scss"></style>
