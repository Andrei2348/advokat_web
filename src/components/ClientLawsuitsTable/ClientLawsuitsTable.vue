<template>
  <table class="table" ref="list">
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
                    : 'Дата окончания отсутствует'
                }}
              </span>
              Заканчивается через:
              {{
                item.lawsuit.contractEndDays > 0
                  ? `${item.lawsuit.contractEndDays} ${getDaysWord(item.lawsuit.contractEndDays)}`
                  : '-'
              }}
            </p>
            <p class="table__lawsuit-item-category">
              {{ item.lawsuit.lawsuitCategory.name }}
            </p>
            <div class="table__lawsuit-item-footer">
              <span class="table__lawsuit-item-waste">Нет API</span>
              <span
                :class="['table__lawsuit-item-status', item.lawsuit?.status]"
                >{{
                  item.lawsuit?.status === 'planned' ? 'Активно' : 'Завершено'
                }}</span
              >
            </div>
          </article>
          <article v-else class="table__lawsuit-item">
            <div class="table__lawsuit-item-line"></div>
            <router-link
              :to="`/event/${item.event?.id}`"
              class="table__lawsuit-item-header"
            >
              <span>Дело</span>
              {{ item.event?.lawsuitEventCategory.name }}
            </router-link>
            <p class="table__lawsuit-item-end">
              <span>
                {{ item.event?.till ? getFormatDate(item.event?.till) : '' }}
              </span>
              Заканчивается через:
              {{
                item.event?.remainDays && item.event?.remainDays > 0
                  ? `${item.event.remainDays} ${getDaysWord(item.event?.remainDays)}`
                  : '-'
              }}
            </p>
            <p class="table__lawsuit-item-category">
              {{ item.event?.lawsuitEventCategory.name }}
            </p>
            <div class="table__lawsuit-item-footer">
              <span class="table__lawsuit-item-waste">Нет API</span>
              <span
                :class="['table__lawsuit-item-status', item.event?.status]"
                >{{
                  item.event?.status === 'planned' ? 'Активно' : 'Завершено'
                }}</span
              >
            </div>
          </article>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" src="./ClientLawsuitsTable.ts"></script>

<style scoped lang="scss" src="./ClientLawsuitsTable.scss"></style>
