<template>
  <div class="table__content-item-container">
    <ButtonsMobileSwipe
      :item="item"
      :placement="'lawsuit'"
      @editLawsuit="editLawsuit"
      @deleteLawsuit="deleteLawsuit"
    />
    <div
      class="table__content-item-wrapper"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @click="resetPosition"
      :class="{
        move__left: position === -1,
        move__right: position === 1,
      }"
    >
      <div
        class="table__content-category--color"
        :style="{ backgroundColor: item.lawsuitCategory.color }"
      ></div>

      <div
        class="table__content-item table__content-customer"
        :class="{ select__delete: position === -1 }"
      >
        <span class="table__content-span">Клиент</span>
        <router-link
          class="table__content-item-link"
          :to="`/lawsuit/${item.id}`"
          v-if="item.customer && item.customer.name"
        >
          <p class="table__content-item-text">
            {{ item.customer.name }}
          </p>
        </router-link>
        <p v-else class="table__content-item-text"></p>
      </div>

      <div class="table__content-item table__content-opponent">
        <span class="table__content-span">Оппонент</span>
        <p class="table__content-item-text" v-if="item.opponent">
          {{ item.opponent }}
        </p>
      </div>

      <div class="table__content-item table__content-item-rating">
        <StarRating
          :rating="item.rating"
          objectKey="rating"
          @dataChanged="dataChanged"
        />
      </div>

      <div class="table__content-item table__content-item-days">
        <span
          v-if="
            item.lawsuitEvents &&
            item.lawsuitEvents.length > 0 &&
            item.lawsuitEvents[item.lawsuitEvents.length - 1].till !== null
          "
          class="table__content-span"
          >Ближайшее событие</span
        >
        <p
          class="table__content-item-text"
          v-if="
            item.lawsuitEvents &&
            item.lawsuitEvents.length > 0 &&
            item.lawsuitEvents[item.lawsuitEvents.length - 1].till !== null
          "
        >
          {{
            getFormatDate(
              item.lawsuitEvents[item.lawsuitEvents.length - 1].till || '',
            )
          }}
          <span
            class="table__content-item-days-difference"
            v-if="displayDaysDifference"
          >
            {{ displayDaysDifference.text }}
          </span>
        </p>
      </div>

      <div
        :class="[
          'table__content-item',
          'table__content-item-category',
          { visible: showInfoFlag },
        ]"
      >
        <span class="table__content-span">Категория дела</span>
        {{ item.lawsuitCategory.name }}
      </div>

      <div
        :class="[
          'table__content-item',
          'table__content-item-instance',
          { visible: showInfoFlag },
        ]"
      >
        <span class="table__content-span">Инстанция</span>
        Инстанция
      </div>
      <div
        :class="[
          'table__content-item',
          'table__content-item-events',
          { visible: showInfoFlag },
        ]"
      >
        <span class="table__content-span">Событий</span>
        {{ item.lawsuitEventsCount }}
      </div>

      <div
        :class="[
          'table__content-item',
          'table__content-task',
          { visible: showInfoFlag },
        ]"
      >
        <span class="table__content-span">Задач</span>
        <p class="table__content-item-text">5</p>
        <div class="table__content-menu">
          <DropdownMenu
            :menuItems="createMenuItems(item.status)"
            :menuIcon="'menudots'"
            class="table__content-menu-dropdown"
            @deleteLawsuit="deleteLawsuit(item.id)"
            @editLawsuit="editLawsuit(item)"
            @finishLawsuit="finishLawsuit({ id: item.id, status: item.status })"
          />
        </div>
      </div>

      <div class="table__content-buttons-wrapper">
        <div
          class="table__content-actions-wrapper"
          @click="toggleNotesPanelHandler(item)"
        >
          <SvgIcon :icon="'notes'" class="table__content-notes" />
        </div>

        <div
          class="table__content-show-info"
          @click="toggleBottomShowPanelHandler()"
        >
          <SvgIcon
            icon="chevron-down"
            class="table__content-chevron"
            :class="{ active: showInfoFlag }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./LawsuitItem.ts"></script>
<style lang="scss" scoped src="./LawsuitItem.scss"></style>

status": "planned
