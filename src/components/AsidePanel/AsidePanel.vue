<template>
  <aside :class="['aside', { collapsed: isAsideCollapsed }]">
    <div class="aside__header">
      <router-link to="/"><SvgIcon icon="logo" /></router-link>
      <button class="aside__burger" @click="togglePanelHandler">
        <SvgIcon icon="menu" />
      </button>
    </div>
    <div class="aside__menu-items">
      <router-link
        v-for="item in menuItems"
        :to="item.route"
        :class="['aside__menu-item', { collapsed: isAsideCollapsed }]"
        :key="item.id"
        @click="selectMenuHandler()"
      >
        <SvgIcon :icon="item.icon" />
        <p class="aside__menu-item--text">{{ item.title }}</p>
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts" src="./AsidePanel.ts"></script>
<style lang="scss" scoped src="./AsidePanel.scss"></style>
