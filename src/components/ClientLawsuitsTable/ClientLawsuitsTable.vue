<template>
  <table class="table">
    <caption>
      Все дела клиента
    </caption>
    <thead class="table__header">
      <tr>
        <th v-for="item of clientLawsuitsTableConfig" :key="item">
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody class="table__lawsuit-list">
      <tr
        v-for="item of clientLawsuits.lawsuits"
        :key="item.type === 'lawsuit' ? item.lawsuit?.id : item.event?.id"
      >
        <td>
          <article v-if="item.lawsuit" class="table__lawsuit-item">
            <div class="table__lawsuit-item-line"></div>
            <router-link
              :to="`/lawsuit/${item.lawsuit.id}`"
              class="table__lawsuit-item-header"
            >
              <span>Дело</span>
              {{
                `${item.lawsuit?.lawsuitCategory.name} ${item.lawsuit.opponent}`
              }}
            </router-link>
            <p class="table__lawsuit-item-end">
              <span>
                {{
                  item.lawsuit.contractValidity
                    ? getFormatDate(item.lawsuit.contractValidity)
                    : 'Дата окончания отсутствует!'
                }}
              </span>
              Договор заканчивается через:
              {{
                item.lawsuit.contractValidity &&
                checkDateValidityByDays(item.lawsuit.contractValidity) < 0
                  ? `${Math.abs(checkDateValidityByDays(item.lawsuit.contractValidity))} дней`
                  : '-'
              }}
            </p>
            <p class="table__lawsuit-item-category">
              {{ item.lawsuit.lawsuitCategory.name }}
            </p>
            <span class="table__lawsuit-item-waste">Нет API</span>
            <span
              :class="[
                'table__lawsuit-item-status',
                {
                  'table__lawsuit-item-status_type_active':
                    item.lawsuit?.status === 'planned',
                  'table__lawsuit-item-status_type_finished':
                    item.lawsuit?.status === 'finished',
                },
              ]"
              >{{
                item.lawsuit?.status === 'planned' ? 'Активно' : 'Завершено'
              }}</span
            >
          </article>
          <article v-else class="table__lawsuit-item">
            <div class="table__lawsuit-item-line"></div>
            <router-link
              :to="`/lawsuit/${item.event?.id}`"
              class="table__lawsuit-item-header"
            >
              <span>Дело</span>
              {{ item.event?.lawsuitEventCategory.name }}
            </router-link>
            <p class="table__lawsuit-item-end">
              <span>
                {{ item.event?.till ? getFormatDate(item.event?.till) : '' }}
              </span>
              Договор заканчивается через:
              {{
                item.event?.till &&
                checkDateValidityByDays(item.event?.till) < 0
                  ? `${Math.abs(checkDateValidityByDays(item.event?.till))} дней`
                  : '-'
              }}
            </p>
            <p class="table__lawsuit-item-category">
              {{ item.event?.lawsuitEventCategory.name }}
            </p>
            <span class="table__lawsuit-item-waste">Нет API</span>
            <span
              :class="[
                'table__lawsuit-item-status',
                {
                  'table__lawsuit-item-status_type_active':
                    item.event?.status === 'planned',
                  'table__lawsuit-item-status_type_finished':
                    item.event?.status === 'finished',
                },
              ]"
              >{{
                item.event?.status === 'planned' ? 'Активно' : 'Завершено'
              }}</span
            >
          </article>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" src="./ClientLawsuitsTable.ts"></script>

<style scoped lang="scss" src="./ClientLawsuitsTable.scss"></style>
