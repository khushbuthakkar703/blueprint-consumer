<template>
  <q-footer
    class="bg-whiteSmoke text-dimGrey absolute-bottom q-px-md-xl q-px-sm-lg q-px-xs-lg"
    style="z-index:1"
  >
    <q-separator class="text-secondary" />
    <div class="row q-py-md-lg q-py-sm-md q-py-xs-md">
      <div class="col text-body2 text-left">&#169; 2021, Blooprinted</div>
      <div
        class="col text-body2 text-right text-dimGrey remove-underline cursor-pointer"
        @click="onClickTerms"
      >
        Terms & Conditions
      </div>
      <span class="q-mx-md"> | </span>
      <div
        class="text-body2 text-right text-dimGrey remove-underline cursor-pointer"
        @click="onClickPrivacy"
      >
        Privacy Policy
      </div>
    </div>
    <q-dialog
      v-model="termsAndConditionsPopup"
      maximized
      no-esc-dismiss
      no-backdrop-dismiss
    >
      <q-card class="bg-whiteSmoke">
        <q-btn
          icon="close"
          class="q-mt-md q-mx-sm text-primary"
          flat
          round
          dense
          @click="termsAndConditionsPopup = false"
        />
        <Terms />
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="privacyPolicyPopup"
      maximized
      no-esc-dismiss
      no-backdrop-dismiss
    >
      <q-card class="bg-whiteSmoke">
        <q-btn
          icon="close"
          class="q-mt-md q-mx-sm text-primary"
          flat
          round
          dense
          @click="privacyPolicyPopup = false"
        />
        <PrivacyPolicy />
      </q-card>
    </q-dialog>
  </q-footer>
</template>
<script>
import Terms from 'pages/Terms.vue'
import PrivacyPolicy from 'pages/PrivacyPolicy.vue'
import { isMobileApp } from '../utils/common'

export default {
  data() {
    return { termsAndConditionsPopup: false, privacyPolicyPopup: false }
  },
  components: {
    Terms,
    PrivacyPolicy
  },

  methods: {
    onClickTerms() {
      if (isMobileApp()) {
        this.termsAndConditionsPopup = true
      } else {
        this.$router.push({ name: 'terms-and-conditions' })
      }
    },
    onClickPrivacy() {
      if (isMobileApp()) {
        this.privacyPolicyPopup = true
      } else {
        this.$router.push({ name: 'privacy-policy' })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
