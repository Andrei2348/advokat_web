<template>
  <div :class="['task-event']">
    <ButtonsMobileSwipe
      :placement="'task'"
      :item="data"
      :is-task="isTask(data)"
      @complete-task="toggleIsChecked"
      @add-task-to-the-day="changeTaskDayPresence"
      @add-task-to-report="changeReportPresence"
      @remove-task-from-report="changeReportPresence"
      @remove-task="onDeleteBtnClick"
    />
    <div
      :class="[
        'task-event__wrapper',
        {
          'task-event__wrapper_task': isInTasks,
          move__left: position === -1,
          move__right_type_task: position === 1 && isTask(data),
          move__right_type_event: position === 1 && !isTask(data),

          'task-event__wrapper_late':
            displayDaysDifference && displayDaysDifference.difference < 0,
        },
      ]"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @click="resetPosition"
    >
      <div class="task-event__checkbox-wrapper">
        <label :class="['task-event__checkbox', { checked: isChecked }]">
          <input type="checkbox" v-model="isChecked" />
        </label>
      </div>
      <div
        class="task-event__task-color"
        :style="{
          backgroundColor:
            'lawsuitEvent' in data
              ? data.taskTag.color
              : data.lawsuitEventCategory.color,
        }"
      ></div>
      <div
        :class="['element task-event__theme', { link: isTask(data) }]"
        @click="isTask(data) ? onTaskThemeClick() : ''"
      >
        {{ data.theme }}
      </div>
      <div class="element task-event__date">
        {{ `${getDateAndTime().date} ${getDateAndTime().time ?? ''}` }}
        <span
          :class="[
            'task-event__date-day-remain',
            {
              'task-event__date-day-remain_late':
                displayDaysDifference && displayDaysDifference.difference < 0,
            },
          ]"
          v-if="displayDaysDifference"
        >
          {{
            isMobile
              ? `(${displayDaysDifference.text})`
              : displayDaysDifference.text
          }}
        </span>
      </div>
      <div v-if="!isMobile" class="element task-event__hours">
        {{ displayHoursDifference }}
      </div>
      <div class="element task-event__status-wrapper">
        <div class="task-event__status">
          <SvgIcon
            icon="fire"
            @click="changeImportance"
            :class="['status__icon', { important: isImportant }]"
          />
          <p :class="['task-event__status-text', { finished: isChecked }]">
            {{ statusText[status] }}
          </p>
        </div>
        <span v-if="data.cost" class="task-event__cost">
          {{ data.cost }} {{ isMobile ? '&#8381;' : 'рублей' }}
        </span>
      </div>
      <div v-if="isInTasks" class="element task-event__client">
        {{
          isTask(data) && data.customer
            ? data.customer.name
            : 'Дело не закреплено'
        }}
      </div>
      <div v-if="isInTasks && !isMobile" class="element">
        {{
          isTask(data) && data.lawsuit
            ? `${data.lawsuit.lawsuitCategory?.name} ${data.lawsuit.opponent}`
            : 'Дело не закреплено'
        }}
      </div>
      <div v-if="!isMobile" class="element task-event__note">
        {{ data.comment ?? 'Отсутствует' }}
      </div>

      <div class="task-event__buttons-wrapper">
        <div
          v-show="isTask(data) && data.lawsuitEvent"
          class="task-event__container"
          @mouseover="tooltipsShown.calendar = true"
          @mouseleave="tooltipsShown.calendar = false"
        >
          <SvgIcon icon="calendar" />
          <TooltipComponent
            text="Есть привязанное событие"
            :is-visible="tooltipsShown.calendar"
          />
        </div>
        <div
          v-show="!data.includeInReport"
          class="task-event__container"
          @mouseover="tooltipsShown.report = true"
          @mouseleave="tooltipsShown.report = false"
        >
          <SvgIcon icon="fileMinus" />
          <TooltipComponent
            :text="isTask(data) ? 'Не включена в акт' : 'Не включено в акт'"
            :is-visible="tooltipsShown.report"
          />
        </div>
        <div
          v-show="isTask(data) && data.toDoDate"
          class="task-event__container"
          @mouseover="tooltipsShown.day = true"
          @mouseleave="tooltipsShown.day = false"
        >
          <SvgIcon icon="bookmark" />
          <TooltipComponent text="В моем дне" :is-visible="tooltipsShown.day" />
        </div>
      </div>
      <DropdownMenu
        v-if="!isMobile"
        :menuItems="itemsMenu(data)"
        :menuIcon="'menudots'"
        class="task-event__menu"
        @deleteEventTask="onDeleteBtnClick"
        @deleteTask="onDeleteBtnClick"
        @changeReportPresence="changeReportPresence"
        @changeTaskDayPresence="changeTaskDayPresence"
        @toggleIsChecked="toggleIsChecked"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./TaskEventItem.ts"></script>
<style lang="scss" scoped src="./TaskEventItem.scss"></style>
