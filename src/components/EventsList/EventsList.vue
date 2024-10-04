<template>
  <div class="events">
    <h2 class="events__title">Типы событий</h2>
    <TableHead :items="eventsItems" class="events__table" />
    <div
      v-for="item in eventsStore.eventsTypes"
      :key="item.id ? item.id : 565656565"
      class="events__items"
    >
      <EventsItem
        :item="item"
        :hoursOptions="hoursOptions"
        :daysOptions="daysOptions"
      />
    </div>
    <button
      class="events__header-button-create"
      @click="eventsStore.setEmptyEventsType()"
      :disabled="eventsStore.createEventsTypeStatus"
    >
      Создать нового клиента
      <SvgIcon icon="plus" class="events__header-button-icon" />
    </button>
  </div>
</template>

<script lang="ts" src="./EventsList.ts"></script>
<style lang="scss" scoped src="./EventsList.scss"></style>
