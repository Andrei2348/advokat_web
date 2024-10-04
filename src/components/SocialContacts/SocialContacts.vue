<template>
  <div class="social__contacts-wrapper">
    <button
      v-if="phoneNumber"
      @click="makeCall(phoneNumber)"
      class="social__contact-icon"
    >
      <SvgIcon icon="phone" />
    </button>
    <button
      v-if="emailAddress"
      @click="sendEmail(emailAddress)"
      class="social__contact-icon"
    >
      <SvgIcon icon="mail" />
    </button>
    <button
      v-if="whatsAppNumber"
      @click="openWhatsAppChat(whatsAppNumber)"
      class="social__contact-icon"
    >
      <SvgIcon icon="wa" />
    </button>
    <button
      v-if="telegramUsername"
      @click="openTelegramChat(telegramUsername)"
      class="social__contact-icon"
    >
      <SvgIcon icon="telegram" />
    </button>
  </div>
</template>

<script lang="ts" src="./SocialContacts.ts"></script>
<style lang="scss" scoped src="./SocialContacts.scss"></style>
