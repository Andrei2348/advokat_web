<template>
  <div class="lawsuit__event-container">
    <ButtonsMobileSwipe 
      :item="data" 
      extremeIconLeft="doneSwipe"
      averageIconLeft="listSwipe"
      extremeIconRight="fileMinusSwipe"
      averageIconRight="trash04"
      @editLawsuit="changeStatus(!isChecked)"
      @averageRight="deleteEventTask(data?.event?.id || data?.task?.id, data?.type)"
    />
    <div
      class="lawsuit__event-wrapper"
      v-if="status === sign"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @click="resetPosition"
      :class="{
        move__left: position === -1,
        move__right: position === 1,
      }"
      >
      <div class="lawsuit__event-checkbox-wrapper">
        <label :class="['lawsuit__event-checkbox', { checked: isChecked }]">
          <input
            type="checkbox"
            :value="status === 'finished'"
            v-model="isChecked"
          />
        </label>
      </div>
      <div
        class="lawsuit__event-task-color"
        :style="{
          backgroundColor:
            data.event?.lawsuitEventCategory.color || data.task?.taskTag.color,
        }"
      ></div>
      <div class="lawsuit__event-item lawsuit__event-task">
        {{ data?.event?.theme || data?.task?.theme }}
      </div>
      <div class="lawsuit__event-item lawsuit__event-date">
        {{ getFullFormatDate(data?.event?.till || data?.task?.deadline) }}
        <span
          class="lawsuit__event-date-day-remain"
          v-if="displayDaysDifference"
        >
          {{ displayDaysDifference }}
        </span>
      </div>
      <div class="lawsuit__event-item lawsuit__event-hours">3</div>
      <div class="lawsuit__event-item lawsuit__event-status-wrapper">
        <div class="lawsuit__event-status">
          <SvgIcon
            icon="fire"
            @click="changeImportance"
            :class="['status__icon', { important: isImportant }]"
          />
          <p :class="['lawsuit__event-status-text', { finished: isChecked }]">
            {{ statusText }}
          </p>
        </div>
        <span
          v-if="data?.event?.cost || data?.task?.cost"
          class="lawsuit__event-cost"
        >
          {{ data?.event?.cost || data?.task?.cost }} рублей
        </span>
      </div>
      <div class="lawsuit__event-item lawsuit__event-note">
        {{ data?.event?.comment || data?.task?.comment }}
      </div>

      <div class="lawsuit__event-buttons-wrapper">
        <div class="lawsuit__event-button"><SvgIcon icon="calendar" /></div>
        <div class="lawsuit__event-button"><SvgIcon icon="fileMinus" /></div>
        <div class="lawsuit__event-button"><SvgIcon icon="bookmark" /></div>
        <DropdownMenu
          :menuItems="lawsuitItemsMenu"
          :menuIcon="'menudots'"
          class="lawsuit__event-menu"
          @deleteEventTask="
            deleteEventTask(data?.event?.id || data?.task?.id, data?.type)
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./LawsuitEvent.ts"></script>
<style lang="scss" scoped src="./LawsuitEvent.scss"></style>
