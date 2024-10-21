<template>
  <div class="date-range">
    <p class="date-range__title">{{ data.title }}</p>
    <div class="date-range__container">
      <div class="element">
        {{ data.from }}
        <DateElement
          ref="dateElementFrom"
          objectKey="from"
          placeholder="Дата от"
          @dataChanged="onValueChange"
        />
      </div>
      <div class="element">
        {{ data.to }}
        <DateElement
          ref="dateElementTo"
          objectKey="to"
          placeholder="Дата до"
          @dataChanged="onValueChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./DateRangeFilter.ts"></script>

<style scoped lang="scss" src="./DateRangeFilter.scss"></style>
