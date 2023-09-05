<template>
  <q-card class="bg-whiteSmoke full-height">
    <q-btn
      icon="close"
      class="q-mx-md q-mt-md text-primary"
      flat
      round
      dense
      @click="onMobileVerificationClose"
    />
    <q-card-section>
      <div class="flex flex-center column q-px-md q-my-lg">
        <div class="text-center container q-my-xl">
          <q-img style="width: 84px" src="~assets/AuthLogo1.svg" />
        </div>
        <div>
          <h1 class="text-h5 text-nightRider q-mt-lg q-mb-md">
            Verify your mobile
          </h1>
          <p class="text-dimGrey">
            We will send a text to verify your number. No fees will apply.
          </p>
          <div>
            <q-form
              @submit="submitMobileNumberVerification()"
              ref="mobileVerify"
            >
              <q-input
                v-model.trim="mobileNumber"
                ref="mobile"
                borderless
                placeholder="Enter your number"
                unmasked-value
                class="border-secondary text-grey bg-white rounded-borders q-mb-lg q-px-md q-pb-none "
                lazy-rules
                readonly
                :rules="[
                  val => (val && val.length > 0) || 'Mobile number is required',
                  val => (val && val.length == 10) || 'Enter valid number'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon class="q-pr-md text-body1 text-grey">
                    +{{
                      phoneDetails && phoneDetails['countryCallingCode']
                        ? phoneDetails['countryCallingCode']
                        : ''
                    }}
                  </q-icon>
                  <q-separator color="secondary" vertical />
                </template>
              </q-input>

              <q-btn
                label="Continue"
                type="submit"
                color="primary"
                no-caps
                size="16px"
                class="full-width q-mt-sm q-pa-xs flat primary-btn-style"
              />
            </q-form>
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- **************** OTP Popup Screen  *********************** -->
    <q-dialog
      v-model="displayOTPPopup"
      maximized
      no-esc-dismiss
      no-backdrop-dismiss
    >
      <q-card :class="isOTPVerifySuccess ? 'bg-primary' : 'bg-whiteSmoke'">
        <q-btn
          icon="close"
          class="q-mt-md q-mx-sm"
          :class="isOTPVerifySuccess ? 'text-white' : 'text-primary'"
          flat
          round
          dense
          @click="closePopup()"
        />
        <q-card-section v-if="!isOTPVerifySuccess" class="card-padding q-mt-xl">
          <h1 class="text-h5 text-nightRider">Enter verification code</h1>
          <p class="text-dimGrey">
            We sent you a verification code via SMS.
            <!-- on this {{ mobileNumber }} number. -->
          </p>
          <q-form @submit="verifyOTP()">
            <div class="row">
              <div class="col q-px-md" :key="i" v-for="(key, i) in otpForm">
                <q-input
                  borderless
                  v-model.trim="key.value"
                  :ref="`input${i}`"
                  data-length="1"
                  input-class="text-nightRider text-center text-h5"
                  class="border-bottom-secondary"
                  mask="#"
                  @input="handleActivationInput($event, i)"
                />
              </div>
            </div>
            <div class="q-py-md text-red text-center" v-if="otpStatus.hasError">
              {{ otpStatus.errorMsg }}
            </div>
            <q-btn
              color="primary"
              label="Verify"
              type="submit"
              no-caps
              size="16px"
              class="full-width q-mt-md q-pa-xs primary-btn-style flat"
            />
          </q-form>
        </q-card-section>

        <q-card-actions
          v-if="!isOTPVerifySuccess"
          align="center"
          class="text-manatee"
        >
          Didn’t receive it?
          <a class="text-primary text-style q-pa-sm" @click="onResendClick()">
            Resend
          </a>
        </q-card-actions>
        <NotificationDialog
          v-if="isOTPVerifySuccess"
          title="success"
          message="Mobile verified successfully."
        />
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import NotificationDialog from 'src/components/NotificationDialog.vue'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      mobileNumber: '',
      displayOTPPopup: false,
      otpForm: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
      isOTPVerifySuccess: false,
      otpStatus: {
        hasError: false,
        errorMsg: ''
      }
    }
  },
  props: ['phoneDetails'],
  components: {
    NotificationDialog
  },
  mounted() {
    if (this.phoneDetails) {
      this.mobileNumber = this.phoneDetails['nationalNumber']
    }
    this.isRequestFromMobile(true)
  },
  methods: {
    ...mapActions(['sendOTP', 'isRequestFromMobile']),
    // ************ Method to Send the OTP to Mobile Number *********************************
    async submitMobileNumberVerification() {
      let number =
        '+' +
        this.phoneDetails['countryCallingCode'] +
        ' - ' +
        this.mobileNumber
      let res = await this.sendOTP({
        type: 'number',
        phone: number,
        mobileCountryCode: this.phoneDetails['countryCode']
      })
      if (res['status'] == 200) {
        this.displayOTPPopup = true
      }
    },
    // *********** Triggers on OTP Value is entered *********************
    handleActivationInput(event, index) {
      if (event && event.trim() != '') {
        if (index < 3) {
          this.$refs[`input${parseInt(index + 1)}`][0].focus()
        }
      }
    },
    // ************ Triggers when Verify Button Is clicked ***************************
    async verifyOTP() {
      let otp = ''
      this.otpForm.forEach(item => {
        otp = otp + item['value'].toString()
      })
      if (otp.trim() !== '' && otp.length == 4) {
        this.otpStatus.hasError = false
        this.otpStatus.errorMsg = ''
        let res = await this.sendOTP({ type: 'otp', otp: otp })
        if (res && res['status'] == 200) {
          this.isOTPVerifySuccess = true
        } else {
          this.otpStatus.hasError = true
          this.otpStatus.errorMsg =
            'Entered OTP is wrong. Please recheck the OTP'
        }
      } else {
        this.otpStatus.hasError = true
        this.otpStatus.errorMsg = 'OTP is required'
      }
    },
    // ************ Triggers when OTP Popup Is closed ***************************
    closePopup() {
      this.otpForm.forEach(item => {
        item['value'] = ''
      })
      this.displayOTPPopup = false
      this.onMobileVerificationClose()
    },
    // ************ Triggers when the popup is closed ******************************
    onMobileVerificationClose() {
      this.$emit('on-popup-close', {
        type: 'close',
        isOTPVerifySuccess: this.isOTPVerifySuccess
      })
    },
    // *********** Triggers on Resend Text is clicked *****************************
    onResendClick() {
      let number =
        '+' +
        this.phoneDetails['countryCallingCode'] +
        ' - ' +
        this.mobileNumber
      this.sendOTP({
        type: 'number',
        phone: number,
        mobileCountryCode: this.phoneDetails['countryCode']
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.q-field--error {
  border: 1px solid $errorColor;
}
.text-style {
  text-decoration: underline;
}
@media only screen and (min-width: $breakpoint-xs) {
  .card-padding {
    padding-left: 20%;
    padding-right: 20%;
  }
}
</style>
