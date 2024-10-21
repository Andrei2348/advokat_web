<template>
  <div class="dropdown" v-click-outside="close">
    <div class="dropdown__menu-button" @click="toggleMenuHandler">
      <SvgIcon :icon="menuIcon" />
    </div>
    <div class="dropdown__menu-wrapper">
      <div
        v-if="menuIsOpen"
        :class="[
          'dropdown__menu',
          menuPositionTop ? 'dropdown__menu-top' : 'dropdown__menu-bottom',
        ]"
      >
        <h4 class="dropdown__menu-title" v-if="title != ''">
          {{ title }}
        </h4>
        <ul class="dropdown__menu-items">
          <li
            v-for="item in menuItems"
            :class="['dropdown__menu-item', { empty: item.title === '' }]"
            :key="JSON.stringify(item)"
            :style="{ color: item.color }"
            @click="handleClick(item.function)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./DropdownMenu.ts"></script>
<style lang="scss" scoped src="./DropdownMenu.scss"></style>
