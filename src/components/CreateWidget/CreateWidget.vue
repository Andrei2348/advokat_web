<template>
  <div class="widget__wrapper">
    <div
      class="widget"
      :style="{ bottom: position.y + 'px', right: position.x + 'px' }"
      @mousedown="startDrag"
      @mouseup="stopDrag"
      @mousemove="onDrag"
    >
      <!-- @touchstart="startDrag"  
      @touchmove="onDrag"  
      @touchend="stopDrag"   -->
      <DropdownMenu
        class="widget__dropdown-menu"
        :title="'Создать:'"
        :menuItems="menuItems"
        menuIcon="create"
        :menuOpen="menuOpen"
        @createLawsuit="createLawsuit"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./CreateWidget.ts"></script>
<style lang="scss" scoped src="./CreateWidget.scss"></style>
