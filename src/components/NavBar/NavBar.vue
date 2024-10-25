<template>
  <div
    :class="['navbar', { collapsed: isAsideCollapsed }]"
    v-click-outside="closeSearchOnMobile"
  >
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
      <div
        v-if="
          !['lawsuit-details', 'client-details'].includes(String($route.name))
        "
        :class="['navbar__notification-wrapper', { active: isSearchOpen }]"
        @click="toggleSearchOnMobile"
      >
        <SvgIcon icon="filter" />
      </div>
      <div class="navbar__notification-wrapper">
        <SvgIcon icon="userSmart" />
      </div>
    </div>
    <!-- ====== -->

    <div
      :class="[
        'navbar__search-wrapper',
        { open: (isMobile || isTablet) && isSearchOpen },
      ]"
      v-if="
        !['lawsuit-details', 'client-details'].includes(String($route.name))
      "
      v-click-outside="filtersCloseHandler"
    >
      <div class="navbar__search-wrapper-header">
        <span class="navbar__search-wrapper-title">Фильтры</span>
        <SvgIcon
          v-if="isMobile || isTablet"
          class="navbar__search-wrapper-close"
          icon="x"
          @click="toggleSearchOnMobile"
        />
      </div>
      <ul v-if="filtersSelection.length" class="navbar__filters-items">
        <li
          v-for="(selection, index) of filtersSelection.slice(0, 3)"
          :key="JSON.stringify(selection)"
          class="navbar__filters-item"
        >
          <span>{{ selection.title }}: {{ selection.value }}</span>
          <button
            class="navbar__filters-item-remove"
            type="button"
            @click.stop="onRemoveFilterClick(index, selection.parameter)"
          >
            <SvgIcon :icon="'x'" />
          </button>
        </li>
      </ul>
      <form
        novalidate
        class="navbar__search-input--wrapper"
        @submit.prevent="submitHandlerComputed"
      >
        <span class="navbar__search-wrapper-title">Поиск по фразе</span>
        <div class="navbar__input-container">
          <input
            class="navbar__search-input"
            v-model="query"
            @mousedown="filtersOpenHandler"
            placeholder="Введите поисковую фразу"
          />
          <button
            class="navbar__search-button"
            :type="isMobile || isTablet ? 'button' : 'submit'"
          >
            <SvgIcon icon="search" />
          </button>
        </div>
        <SearchFilters
          v-show="filterContent?.filtersList && areFiltersOpen"
          :areButtonsShown="currentRoute.name !== 'clients-table'"
          :content="filterContent?.filtersList"
          :selectedFilters="filtersSelection"
          :valuesChange="onValuesChange"
          :resetSearchFields="resetSearchFields"
        />
        <SearchButtonsContainer
          v-if="currentRoute.name === 'clients-table'"
          :class="{ type_clients: currentRoute.name === 'clients-table' }"
          @onResetBtnClick="resetSearchFields"
        />
      </form>
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
        <SvgIcon icon="chevron-down" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./NavBar.ts"></script>
<style lang="scss" scoped src="./NavBar.scss"></style>
