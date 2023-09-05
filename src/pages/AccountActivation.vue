<template>
  <q-page>
    <q-dialog
      v-model="displayPopup"
      maximized
      no-esc-dismiss
      no-backdrop-dismiss
    >
      <q-card class="bg-primary">
        <q-btn
          icon="close"
          class="text-white q-mt-md q-mx-sm"
          flat
          round
          dense
          @click="closePopup()"
        />
        <NotificationDialog
          v-if="apiResponseType != null"
          :title="apiResponseType['type']"
          :message="apiResponseType['message']"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NotificationDialog from 'src/components/NotificationDialog.vue'

export default {
  data() {
    return {
      displayPopup: false,
      url: ''
    }
  },
  mounted() {
    this.url = this.$route.path
    let params
    if (this.url.includes('email')) {
      params = {
        data: {
          type: 'email confirmation',
          attributes: {
            code: this.$route.params['code']
          }
        }
      }
      this.accountActivation(params)
    } else if (this.url.includes('password/reset')) {
      params = {
        data: {
          type: 'code verification',
          attributes: {
            code: this.$route.params['code']
          }
        }
      }
      this.resetPasswordVerification(params)
    }
  },
  methods: {
    ...mapActions(['accountActivation', 'resetPasswordVerification']),
    closePopup() {
      this.displayPopup = false
      if (this.apiResponseType['type'] == 'success') {
        if (this.url.includes('password/reset')) {
          this.$router.push('/reset-password')
        } else {
          this.$router.push('/user/profile')
        }
      } else {
        this.$router.push('/')
      }
    }
  },
  components: {
    NotificationDialog
  },
  computed: {
    ...mapGetters(['apiResponseType'])
  },
  watch: {
    apiResponseType(data) {
      if (data && data['type'] != '') {
        this.displayPopup = true
        let interval = setTimeout(() => {
          this.closePopup()
          clearInterval(interval)
        }, 3000)
      } else {
        this.displayPopup = false
      }
    }
  }
}
</script>
