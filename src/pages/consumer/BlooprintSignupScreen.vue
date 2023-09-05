<template>
  <q-page :class="$q.screen.width > 1023 ? 'row' : 'column'">
    <div class="col-md-6 col-sm-12 col-xs-12 bg-solitudeBlue lhs-padding">
      <BlooprintInfoInSignupScreen
        :isLoading="isLoading"
        :progressValue="progressValue"
        :blooprintDetails="blooprintDetails"
        :screenType="screenType"
        :showStepWizard="showStepWizard"
        :showPaymentForm="showPaymentForm"
        :cardDetails="cardDetails"
        :isLoginPage="isLoginPage"
        @show-old-card="showOldCardDetails"
      />
    </div>
    <div class="col-md-6 col-sm-12 col-xs-12 bg-white">
      <div
        :class="isLoginPage ? 'login-section' : 'signup-section'"
        v-if="!isSignupSuccess"
      >
        <div>
          <div class="gt-sm" style="margin-bottom: 71px" v-if="!isLoginPage">
            <q-linear-progress
              color="primary"
              size="10px"
              :value="progressValue"
              class="progress-style"
            />
            <div class="f-w-600 text-body1 text-black">
              Step 1. Create Account
            </div>
          </div>
          <SignupForm
            v-if="!isLoginPage"
            :requestFrom="'paymentSignupScreen'"
            @on-terms-privacy-click="onTermsPrivacyClick"
          />
          <LoginForm v-if="isLoginPage" />
        </div>
      </div>
      <div
        :class="
          showStepWizard ? 'payment-section' : 'payment-section-without-step'
        "
        v-if="isSignupSuccess"
      >
        <div>
          <div class="gt-sm" style="margin-bottom: 71px" v-if="showStepWizard">
            <q-linear-progress
              color="primary"
              size="10px"
              :value="progressValue"
              class="progress-style"
            />
            <div class="f-w-600 text-body1 text-black">
              <span v-if="progressValue == 0.75">Step 2. Payment</span>
              <span v-else>{{ screenType }}</span>
            </div>
          </div>
          <PaymentCardForSignup
            v-if="screenType == 'payment'"
            :blooprintDetails="blooprintDetails"
            @on-terms-privacy-click="onTermsPrivacyClick"
            @on-payment-complete="onPaymentComplete"
            :showStepWizard="showStepWizard"
            :showPaymentForm="showPaymentForm"
            @on-new-card-open="onNewCardOpen"
            @get-card-details="getCardDetails"
          />
          <PaymentSuccess
            v-if="screenType == 'Success'"
            :paymentInfo="paymentInfo"
          />
          <PaymentDecline
            v-if="screenType == 'Failed'"
            :paymentInfo="paymentInfo"
          />
        </div>
      </div>
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
import LoginForm from '../../components/Desktop/LoginForm.vue'
import BlooprintInfoInSignupScreen from '../../components/Desktop/BlooprintInfoInSignupScreen.vue'
import SignupForm from '../../components/Desktop/SignupForm.vue'
import PaymentCardForSignup from '../../components/Desktop/PaymentCardForSignup.vue'
import Terms from '../Terms.vue'
import PrivacyPolicy from '../PrivacyPolicy.vue'
import PaymentSuccess from '../PaymentSuccess.vue'
import PaymentDecline from '../PaymentDecline.vue'

import { isMobileApp, isLogin } from '../../utils/common'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      blooprintDetails: {},
      isLoading: true,
      progressValue: 0.25,
      isLoginPage: false,
      isSignupSuccess: false,
      screenType: 'payment',
      showPopupContent: {
        displayPopup: false,
        popupType: ''
      },
      paymentInfo: {},
      showStepWizard: true,
      showPaymentForm: false,
      cardDetails: {}
    }
  },
  components: {
    BlooprintInfoInSignupScreen,
    SignupForm,
    PaymentCardForSignup,
    Terms,
    PrivacyPolicy,
    PaymentSuccess,
    PaymentDecline,
    LoginForm
  },
  watch: {
    $route: 'checkToDisplaySignupOrPayment'
  },
  mounted() {
    this.getBlooprintDetails()
    this.checkToDisplaySignupOrPayment()
  },
  methods: {
    ...mapActions(['getBlooprintDetailsById']),
    checkToDisplaySignupOrPayment() {
      let selectedRoute = this.$router.history.current.fullPath
      if (selectedRoute.includes('payment/blooprints')) {
        if (isLogin()) {
          this.isSignupSuccess = true
          this.progressValue = 0.75
          this.showStepWizard = true
        } else {
          this.$router.push({
            name: 'signup-for-blooprint',
            params: {
              blooprintId: this.$route.params['blooprintId']
            }
          })
        }
      } else if (selectedRoute.includes('signup/blooprints')) {
        if (isLogin()) {
          this.$router.push({
            name: 'explore-screen'
          })
        } else {
          this.isLoginPage = false
          this.isSignupSuccess = false
          this.progressValue = 0.25
        }
      } else if (selectedRoute.includes('checkout/blooprints')) {
        if (isLogin()) {
          this.showStepWizard = false
          this.isSignupSuccess = true
        } else {
          this.isSignupSuccess = false
          this.progressValue = 0.25
        }
      } else if (selectedRoute.includes('login/blooprints')) {
        if (isLogin()) {
          this.$router.push({
            name: 'blooprint landing page',
            params: {
              blooprintId: this.$route.params['blooprintId']
            }
          })
        }
        this.isLoginPage = true
        this.isSignupSuccess = false
        //this.showStepWizard = false
      }
    },

    async getBlooprintDetails() {
      this.isLoading = true
      let data = await this.getBlooprintDetailsById()
      if (data['attributes']) {
        this.blooprintDetails = data
        this.isLoading = false
        if (this.blooprintDetails.attributes.purchased)
          return this.$router.push({
            name: 'explore-screen'
          })
      }
      this.isLoading = false
    },
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
    },
    onPaymentComplete(event) {
      this.progressValue = 1
      this.screenType = event['type']
      this.paymentInfo = event
    },
    onNewCardOpen() {
      this.showPaymentForm = true
    },
    showOldCardDetails() {
      this.showPaymentForm = false
    },
    getCardDetails(data) {
      this.cardDetails = data
    }
  }
}
</script>
<style lang="scss" scoped>
.lhs-padding {
  padding-top: 29px;
  padding-left: 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-top: 23px;
    padding-left: 15px;
    padding-right: 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 23px;
    padding-left: 15px;
    padding-right: 15px;
  }
}
::v-deep {
  .progress-style {
    margin: 8px 0px;
    border-radius: 5px;
    opacity: 1 !important;
    height: 5px;
    .q-linear-progress__track {
      opacity: 1 !important;
    }
    .q-linear-progress__track--light {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
.signup-section {
  @media only screen and (min-width: $breakpoint-md-min) {
    margin-top: 92px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: $breakpoint-sm-min) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
}
.payment-section {
  @media only screen and (min-width: $breakpoint-md-min) {
    margin-top: 92px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: $breakpoint-sm-min) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
}
.payment-section-without-step {
  @media only screen and (min-width: $breakpoint-md-min) {
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: $breakpoint-sm-min) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
