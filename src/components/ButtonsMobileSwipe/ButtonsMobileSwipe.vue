<template>
  <div>
    <button
      class="table__content-mobile table__content-mobile-edit"
      @click="editLawsuitHandler()"
    >
      <SvgIcon :icon="extremeIconLeft" />
    </button>
    <button 
      class="table__content-mobile table__content-default-left"
      @click="averageLeftHandler()"
      >
      <svgIcon :icon="averageIconLeft" />
    </button>
    <button 
      class="table__content-mobile table__content-default-right"
      @click="averageRightHandler()"
      >
      <svgIcon :icon="averageIconRight" />
    </button>
    <button
      class="table__content-mobile table__content-mobile-delete"
      @click="deleteLawsuitHandler()"
    >
      <SvgIcon :icon="extremeIconRight" />
    </button>
  </div>
</template>

<script lang="ts" src="./ButtonsMobileSwipe.ts"></script>
<style lang="scss" scoped src="./ButtonsMobileSwipe.scss"></style>
