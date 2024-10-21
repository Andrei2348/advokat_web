<template>
  <div class="widget__wrapper">
    <div
      class="widget"
      @mousedown="startDrag"
      @mouseup="stopDrag"
      @mousemove="onDrag"
      :style="{ bottom: position.y + 'px', right: position.x + 'px' }"
    >
      <!-- @touchstart="startDrag"  
      @touchmove="onDrag"  
      @touchend="stopDrag"   -->
      <DropdownMenu
        class="widget__dropdown-menu"
        :title="'Создать:'"
        :menuItems="createMenuItems"
        menuIcon="create"
        @createLawsuit="createLawsuit"
        @createClient="createClient"
        @createTask="createTask"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./CreateWidget.ts"></script>
<style lang="scss" scoped src="./CreateWidget.scss"></style>
