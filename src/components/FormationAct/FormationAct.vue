<template>
  <div class="formation__act-container">
    <div class="formation__act-inputs-wrapper">
      <DateElement
        label="Период с"
        placeholder="Период с"
        objectKey="since"
        class="formation__act-since"
        @dataChanged="dataChange"
      />
      <DateElement
        label="Период по"
        placeholder="Период по"
        objectKey="till"
        class="formation__act-till"
        @dataChanged="dataChange"
      />
    </div>
    <button
      class="formation__act-button"
      @click="setFormRequest"
      :disabled="disableButton"
    >
      Оформить
    </button>
  </div>
</template>

<script lang="ts" src="./FormationAct.ts"></script>
<style lang="scss" scoped src="./FormationAct.scss"></style>
