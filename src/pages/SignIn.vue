<template>
  <q-page class="bg-whiteSmoke">
    <div class="flex flex-center column q-px-md main">
      <div class="q-my-lg">
        <q-img
          class="q-mt-xl"
          style="width: 110px"
          src="~assets/AuthLogo1.svg"
        />
      </div>
      <div class="full-width">
        <h1 class="text-h6 text-charcoal q-my-lg">Sign in to your account</h1>
        <q-form @submit="onSignInClick()" ref="signIn">
          <q-input
            borderless
            ref="email"
            v-model.trim="loginForm.email"
            type="email"
            label="Email"
            color="primary"
            placeholder="Enter Email Address"
            label-color="grey"
            input-class="text-charcoal"
            class="border-secondary full-width rounded-borders q-mb-lg q-px-md q-pb-none bg-white"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Email is required',
              val => (val && checkEmailValidity(val)) || 'Enter valid Email'
            ]"
          />
          <q-input
            borderless
            ref="password"
            v-model="loginForm.password"
            :type="isPwd ? 'password' : 'text'"
            label="Password"
            color="primary"
            placeholder="Enter Password"
            label-color="grey"
            input-class="text-charcoal"
            class="border-secondary full-width rounded-borders q-mb-md q-px-md q-pb-none bg-white"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Password is required']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="text-right text-primary text-body2">
            <span @click="forgetPasswordModel = true"
              >Forgot your password?
            </span>
          </div>
          <!-- ************** Forgot Password Dialog ********************* -->
          <q-dialog v-model="forgetPasswordModel" persistent maximized>
            <q-card
              class="vertical-bottom"
              :class="isSubmitEmail ? 'bg-primary' : 'bg-whiteSmoke'"
            >
              <q-card-section class="row items-center q-pb-none">
                <q-icon
                  :class="isSubmitEmail ? 'text-white' : 'text-primary'"
                  size="md"
                  class="q-gutter-x-xs q-mt-md"
                  name="close"
                  @click="closePopup()"
                />
              </q-card-section>
              <q-card-section v-if="!isSubmitEmail" class="card-padding">
                <div class="text-h6 text-charcoal q-my-md q-mt-xl">
                  Forgot password?
                </div>
                <div class="text-body2 text-grey">
                  Enter your email below and we will send you a reset email.
                </div>
              </q-card-section>
              <q-card-section
                v-if="!isSubmitEmail"
                class="q-pt-xl card-padding card-margin"
              >
                <q-form @submit="onSubmitEmailClick">
                  <q-input
                    borderless
                    ref="recoveryEmail"
                    v-model.trim="recoveryEmail"
                    type="email"
                    label="Email"
                    color="primary"
                    placeholder="Email"
                    label-color="grey"
                    input-class="text-charcoal"
                    class="border-secondary bg-white rounded-borders q-mb-lg q-px-md q-pb-none"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Email is required',
                      val =>
                        (val && checkEmailValidity(val)) || 'Enter valid Email'
                    ]"
                  />
                  <q-btn
                    color="primary"
                    size="16px"
                    label="Submit"
                    class="full-width q-mb-md primary-btn-style flat"
                    no-caps
                    type="submit"
                  />
                </q-form>
              </q-card-section>
              <NotificationDialog
                v-if="isSubmitEmail"
                title="success"
                message="Now check your email for confirmation link."
              />
              <q-card-section v-if="isSubmitEmail" class="fixed-bottom q-pa-xl">
                <div class="text-white text-center q-my-sm text-body2">
                  Didn’t receive it?
                  <a
                    class="text-white text-underline q-pa-md"
                    @click="resendEmail"
                  >
                    Resend
                  </a>
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>
          <q-btn
            color="primary"
            label="Sign In"
            type="submit"
            no-caps
            size="16px"
            class="full-width q-mt-md q-pa-xs primary-btn-style flat"
          />
        </q-form>
        <div class="text-center">
          <h6 class="text-center full-width">
            <span class="q-px-lg bg-whiteSmoke">or</span>
          </h6>
          <q-img
            style="width: 80px"
            @click="signInWithGoogleClick()"
            src="~assets/GoogleIcon.svg"
          />
        </div>
      </div>

      <div
        class="q-gutter-y-md text-manatee q-pa-lg text-center q-my-sm text-body1"
      >
        Create an account
        <a
          @click="navigateToSignUp()"
          class="text-primary text-underline text-bold q-pa-sm"
        >
          Sign Up
        </a>
      </div>
    </div>
  </q-page>
</template>

<script>
import NotificationDialog from 'src/components/NotificationDialog.vue'
import { emailPattern } from '../utils/common'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      recoveryEmail: '',
      isPwd: true,
      forgetPasswordModel: false,
      isSubmitEmail: false
    }
  },
  components: {
    NotificationDialog
  },
  methods: {
    ...mapActions([
      'userLogin',
      'sendResetEmail',
      'googleSignIn',
      'setToastMessage',
      'googleSignInForMobile'
    ]),
    // ************** To Check Email patter is valid or not ********************
    checkEmailValidity(val) {
      return emailPattern.test(val)
    },

    // ************ Triggers when a Sign In button is clicked *******************
    onSignInClick() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      this.$refs.signIn.validate().then(success => {
        if (success) {
          let loginData = {
            email: this.loginForm.email,
            password: this.loginForm.password
          }

          this.userLogin(loginData)
        }
      })
    },
    async onSubmitEmailClick() {
      let params = {
        recoveryEmail: this.recoveryEmail,
        platform: 'mobile'
      }
      let response = await this.sendResetEmail(params)
      if (response) {
        this.isSubmitEmail = true
      }
    },
    resendEmail() {
      this.onSubmitEmailClick()
    },
    closePopup() {
      this.forgetPasswordModel = false
      this.isSubmitEmail = false
      this.recoveryEmail = ''
    },
    signInWithGoogleClick() {
      this.googleSignInForMobile()
    },
    navigateToSignUp() {
      this.$router.push({ name: 'signup' })
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
  }
}
</script>

<style lang="scss" scoped>
h6 {
  border-bottom: 1px solid $secondary;
  line-height: 0.1em;
  color: $primary;
}
.q-field--error {
  border: 1px solid $errorColor;
}
.page-size {
  height: 10vh;
}
.card-margin {
  margin-top: 30px;
}
@media only screen and (min-width: $breakpoint-xs) {
  .card-padding {
    padding-left: 20%;
    padding-right: 20%;
  }
  .main {
    max-width: 75%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
