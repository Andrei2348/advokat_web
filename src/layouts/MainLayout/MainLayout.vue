<template>
  <div class="main">
    <!--    header-->
    <NavBar />
    <AsidePanel />
    <transition name="notes">
      <component :is="Notes" />
    </transition>
    <component v-if="uxuiStore.modalName.modalName !== ''" :is="ModalLayer">
      <template
        #modal__header
        v-if="uxuiStore.modalName.modalName !== 'ConfirmationDelete'"
      >
        <ModalHeader :index="uxuiStore.modalName?.index" />
      </template>
    </component>
    <main>
      <slot />
    </main>
    <CreateWidget />
    <!--    footer-->
  </div>
</template>

<script lang="ts" src="./MainLayout.ts"></script>
<style lang="scss" scoped src="./MainLayout.scss"></style>
