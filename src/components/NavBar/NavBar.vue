<template>
  <div :class="['navbar', { collapsed: isAsideCollapsed }]">
    <!-- Smart -->
    <div class="navbar__burger-wrapper">
      <button class="navbar__burger" @click="togglePanelHandler">
        <SvgIcon :icon="'menu'" />
      </button>
    </div>

    <div class="navbar__smart-info">
      <p class="navbar__smart-info-text">{{ uxuiStore.currentPage }}</p>
    </div>

    <div class="navbar__smart-wrapper">
      <div class="navbar__notification-wrapper">
        <SvgIcon icon="filter" />
      </div>
      <div class="navbar__notification-wrapper">
        <DropdownMenu
          :menuItems="personMenu"
          menuIcon="userSmart"
          class="navbar__menu-dropdown"
          @profileHandler="navigateToProfileHandler"
        />
      </div>
    </div>
    <!-- ====== -->

    <div class="navbar__search-wrapper">
      <ul class="navbar__filters-items">
        <li class="navbar__filters-item">
          Категория дела: Гражданский процесс <SvgIcon :icon="'x'" />
        </li>
      </ul>

      <div class="navbar__search-input--wrapper">
        <input
          class="navbar__search-input"
          v-model="query"
          @input="onInputHandler"
          placeholder="Введите поисковую фразу"
        />
        <button class="navbar__search-button">
          <SvgIcon icon="search" />
        </button>
      </div>
    </div>

    <div class="navbar__buttons-wrapper">
      <div class="navbar__notification-wrapper">
        <SvgIcon icon="bell" />
        <!-- Если есть оповещения -->
        <span class="navbar__notification-marker"></span>
      </div>
      <div class="navbar__avatar-wrapper">
        <!--        <img src="../assets/images/avatar/Ellipse 1.jpg" alt="Avatar" />-->
      </div>
      <div class="navbar__logout-menu--wrapper">
        <DropdownMenu
          :menuItems="personMenu"
          menuIcon="chevron-down"
          class="navbar__menu-dropdown"
          @profileHandler="navigateToProfileHandler"
          @logoutHandler="logoutRequestHandler"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./NavBar.ts"></script>
<style lang="scss" scoped src="./NavBar.scss"></style>
