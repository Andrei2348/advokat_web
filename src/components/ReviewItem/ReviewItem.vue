<template>
  <div class="review__table-items-container">
    <ButtonsMobileSwipe
      class="review__table-items-swipe"
      :item="item"
      @editLawsuit="editAuthorities"
      @deleteLawsuit="deleteAuthorities"
      extremeIconLeft="edit2"
      extremeIconRight="trash04"
    />
    <div
      class="review__table-items"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @click="resetPosition"
      :class="{
        move__left: position === -1,
        move__right: position === 1,
      }"
    >
      <div class="review__table-item review__table-item-instance">
        {{ index + 1 }}
      </div>

      <div class="review__table-item review__table-item-lawsuit">
        <span class="review__table-item-span">Дело</span>
        <template v-if="item.lawsuitNumberLink">
          <a
            class="review__table-item-link"
            :href="item.lawsuitNumberLink"
            target="_blank"
          >
            {{ item.lawsuitNumber }}
          </a>
        </template>
        <template v-else>
          {{ item.lawsuitNumber }}
        </template>
      </div>

      <div class="review__table-item review__table-item-bodies">
        <span class="review__table-item-span">Орган</span>
        {{ item.authority }}
      </div>
      <div
        class="review__table-item review__table-item-wide"
        v-if="item.cabinet"
      >
        <span class="review__table-item-span">Зал, кабинет №</span>
        {{ item.cabinet }}
      </div>
      <div class="review__table-item review__table-item-wide" v-if="item.judge">
        <span class="review__table-item-span">Судья</span>
        {{ item.judge }}
      </div>
      <div class="review__table-item review__table-comment" v-if="item.comment">
        <span class="review__table-item-span">Примечание</span>
        {{ item.comment }}
      </div>

      <div class="review__table-menu">
        <DropdownMenu
          :menuItems="lawsuitAuthoritiesMenu"
          :menuIcon="'menudots'"
          class="review__table-menu-dropdown"
          @deleteAuthorities="
            item.id != null ? deleteAuthorities(item.id) : null
          "
          @editAuthorities="editAuthorities(item)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ReviewItem.ts"></script>
<style lang="scss" scoped src="./ReviewItem.scss"></style>
