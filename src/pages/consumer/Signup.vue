<template>
  <q-page class="row bg-white flex">
    <div
      class="col-md-6 col-sm-6 col-xs-12 justify-center q-mt-md-xl q-pt-md-xl row"
    >
      <router-link
        class="gt-sm back-button text-regalBlue f-w-600"
        :to="{ name: 'login' }"
        >Back</router-link
      >
      <SignupForm
        :requestFrom="'signupScreen'"
        @on-terms-privacy-click="onTermsPrivacyClick"
      />
    </div>
    <div
      class="col-md-6 col-sm-6 col-xs-12 gt-xs image-margin q-pl-sm text-right"
    >
      <q-img src="~assets/DefaultLogo.png" />
    </div>
    <q-dialog
      v-model="showPopupContent['displayPopup']"
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
          @click="onPopupClose"
        />
        <Terms v-if="showPopupContent['popupType'] == 'terms'" />
        <PrivacyPolicy
          v-if="showPopupContent['popupType'] == 'privacy_policy'"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex'
import SignupForm from '../../components/Desktop/SignupForm.vue'
import Terms from '../Terms.vue'
import PrivacyPolicy from '../PrivacyPolicy.vue'
import { isMobileApp } from '../../utils/common'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: { SignupForm, Terms, PrivacyPolicy },
  methods: {
    ...mapActions(['setToastMessage'])
  },
  data() {
    return {
      showPopupContent: {
        displayPopup: false,
        popupType: ''
      }
    }
  },
  mounted() {
    const {
      setToastMessage,
      $route: {
        query: { timeout }
      }
    } = this
    if (timeout && timeout === 'true') {
      setToastMessage({
        type: 'negative',
        message: 'Session time out',
        caption: 'Please login again'
      })
    }
  },
  methods: {
    onTermsPrivacyClick(event) {
      if (isMobileApp()) {
        this.showPopupContent = {
          displayPopup: true,
          popupType: event['popupType']
        }
      } else {
        window.open(window.location.origin + `/${event['popupType']}`)
      }
    },
    onPopupClose() {
      this.showPopupContent = {
        displayPopup: false,
        popupType: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.image-margin {
  margin-bottom: 124px;
  margin-top: 70px;
  @media only screen and (max-width: $breakpoint-sm) {
    margin-top: 160px;
  }
}
.back-button {
  position: absolute;
  top: 10px;
  left: 52px;
  font-size: 16px;
  text-decoration: none;
}
</style>
