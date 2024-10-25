<template>
  <table ref="list" class="client-table">
    <caption v-if="firstGroupTitle" class="client-table__title">
      {{
        firstGroupTitle
      }}
      год
    </caption>
    <thead class="client-table__head">
      <tr class="client-table__header">
        <th
          v-for="{ id, title, column, willBeSorting } of clientTableHeaderItems"
          :key="id"
          :class="[
            'client-table__header-item',
            { 'client-table__header-item_interactive': willBeSorting },
          ]"
          @click="sortingBtnClick(column)"
        >
          {{ title }}
          <SvgIcon v-if="willBeSorting" icon="Sort" />
        </th>
      </tr>
    </thead>
    <tbody class="client-table__categories-list">
      <tr
        v-if="
          !clients.sortedClientsWithoutLawsuit.length &&
          !Object.keys(statusedClientsWithLawsuit).length
        "
      >
        <td>
          <span class="client-table__message">Клиенты не найдены!</span>
        </td>
      </tr>
      <tr v-for="(val, key) in statusedClientsWithLawsuit" :key="key">
        <td>
          <h2 v-if="firstGroupTitle !== key" class="client-table__title">
            {{ key }} год
          </h2>
          <ul class="client-table__categories-list-clients">
            <li v-for="client of val" :key="client.id">
              <ClientItem :item="client" :is-active="client.isActive" />
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          <h2
            class="client-table__title"
            v-if="clients.sortedClientsWithoutLawsuit.length"
          >
            Без договора
          </h2>
          <ul class="client-table__categories-list-clients">
            <li
              v-for="client of clients.sortedClientsWithoutLawsuit"
              :key="client.id"
            >
              <ClientItem :item="client" />
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" src="./ClientTable.ts"></script>

<style lang="scss" scoped src="./ClientTable.scss"></style>
