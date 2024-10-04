import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SocialContacts',
  props: {
    phoneNumber: {
      type: String,
      required: false,
      default: null,
    },
    emailAddress: {
      type: String,
      required: false,
      default: null,
    },
    telegramUsername: {
      type: String,
      required: false,
      default: null,
    },
    whatsAppNumber: {
      type: String,
      required: false,
      default: null,
    },
  },

  setup() {
    async function copyToClipboard(text: string): Promise<void> {
      try {
        await navigator.clipboard.writeText(text)
      } catch (error) {
        console.error('Failed to copy text: ', error)
      }
    }

    function canMakeCalls(): boolean {
      return (
        typeof window !== 'undefined' &&
        !!window.location.protocol.match(
          /^(http:|https:|tel:|sip:|mailto:|ftp:|file:|data:|blob:|chrome-extension:|chrome-search:|chrome-untrusted:)/,
        )
      )
    }

    async function makeCall(phoneNumber: string): Promise<void> {
      if (canMakeCalls()) {
        window.location.href = `tel:${phoneNumber}`
      } else {
        await copyToClipboard(phoneNumber)
        alert(`Номер телефона ${phoneNumber} скопирован в буфер обмена`)
      }
    }

    function sendEmail(emailAddress: string): void {
      window.location.href = `mailto:${emailAddress}`
    }

    function openTelegramChat(username: string | undefined): void {
      if (username) {
        window.open(`https://t.me/${username}`, '_blank')
      }
    }

    function openWhatsAppChat(whatsAppNumber: string): void {
      const url = `https://wa.me/${whatsAppNumber}`
      window.open(url, '_blank')
    }

    return {
      makeCall,
      sendEmail,
      openTelegramChat,
      openWhatsAppChat,
    }
  },
})
