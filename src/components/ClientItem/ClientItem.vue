<template>
  <div class="client-item">
    <ButtonsMobileSwipe
      :item="item"
      :placement="'client'"
      @open-client="onClientClick"
      @remove-client="onRemoveClick"
    />
    <article
      class="client-item__wrapper"
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
        :class="[
          'client-item__wrapper-status',
          { 'client-item__wrapper-status_active': isActive },
        ]"
      ></div>
      <div
        :class="[
          'client-item__column',
          {
            'client-item__column_status_active': isMobile && isActive,
            'client-item__column_status_inactive': isMobile && !isActive,
          },
        ]"
      >
        <span>Клиент</span>
        <p
          :class="[{ link: !isMobile }, 'client-item__column-text']"
          @click="onClientClick"
        >
          {{ item.name }}
        </p>
        <a :href="`tel:${item.phone}`" class="client-item__phone-btn">
          <SvgIcon icon="phone" />
        </a>
      </div>
      <div class="client-item__column">
        <span>Дело</span>
        <component
          :is="item.latestValidityLawsuit ? 'RouterLink' : 'p'"
          :class="[
            'client-item__column-text',
            {
              link:
                !isMobile &&
                item.latestValidityLawsuit?.lawsuitCategory.name &&
                item.latestValidityLawsuit?.opponent,
            },
          ]"
          :to="
            item.latestValidityLawsuit
              ? `lawsuit/${item.latestValidityLawsuit.id}`
              : ''
          "
        >
          {{
            item.latestValidityLawsuit?.lawsuitCategory.name &&
            item.latestValidityLawsuit?.opponent
              ? `${item.latestValidityLawsuit?.lawsuitCategory.name} ${item.latestValidityLawsuit?.opponent}`
              : 'Договор отсутствует'
          }}
        </component>
      </div>
      <p class="item-padding client-item__additional">
        {{
          item.lastActiveAt
            ? getFormatDate(item.lastActiveAt)
            : 'Данные отсутствуют'
        }}
      </p>
      <component
        :is="item.phone ? 'a' : 'p'"
        :href="`tel:${item.phone}`"
        :class="['item-padding client-item__additional', { link: item.phone }]"
      >
        {{ item.phone ? formatPhoneNumber(item.phone) : 'Отсутствует' }}
      </component>
      <component
        :is="item.email ? 'a' : 'p'"
        :href="`mailto:${item.email}`"
        :class="['item-padding client-item__additional', { link: item.email }]"
        >{{ item.email ?? 'Отсутствует' }}</component
      >
      <div v-if="!isMobile" class="client-item__menu-wrapper">
        <DropdownMenu
          :menu-items="menuItems"
          :menu-icon="'menudots'"
          @on-remove-click="onRemoveClick(item.id)"
        />
      </div>
    </article>
  </div>
</template>

<script lang="ts" src="./ClientItem.ts"></script>

<style lang="scss" scoped src="./ClientItem.scss"></style>
