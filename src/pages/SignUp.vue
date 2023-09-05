<template>
  <q-page class="bg-whiteSmoke">
    <div class="flex flex-center column main q-px-md q-my-xl main-class">
      <div class="text-center container q-mt-xl">
        <q-img style="width: 110px" src="~assets/AuthLogo1.svg" />
      </div>
      <div class="q-my-sm full-width">
        <h1 class="text-h6 text-center text-charcoal">Create An Account.</h1>
      </div>
      <div class="q-mb-md full-width">
        <q-form @submit="onCreateAccountClick()" ref="signUpForm">
          <q-input
            ref="first_name"
            v-model.trim="signUp.firstName"
            borderless
            label="First Name *"
            color="primary"
            label-color="grey"
            input-class="text-charcoal"
            class="border-secondary bg-white q-mb-lg q-px-md rounded-borders q-pb-none"
            maxlength="50"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'First Name is required',
              val =>
                (val && checkUserNameValidity(val)) ||
                'Please input valid First Name'
            ]"
          />
          <q-input
            ref="last_name"
            v-model.trim="signUp.lastName"
            borderless
            label="Last Name"
            color="primary"
            label-color="grey"
            input-class="text-charcoal"
            class="border-secondary bg-white q-mb-lg q-px-md rounded-borders q-pb-none"
            maxlength="50"
            lazy-rules
            :rules="[
              val =>
                checkUserNameValidity(val) || 'Please input valid Last Name'
            ]"
          />
          <q-input
            ref="email"
            v-model.trim="signUp.email"
            borderless
            label="Your Email *"
            color="primary"
            label-color="grey"
            input-class="text-charcoal"
            class="border-secondary bg-white q-mb-lg q-px-md rounded-borders q-pb-none"
            maxlength="50"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Email is required',
              val => (val && checkEmailValidity(val)) || 'Enter valid Email'
            ]"
          />
          <PasswordEmojiValidation
            :isbuttonClicked="isbuttonClicked"
            label="Create A Strong Password *"
            @password-value="getPasswordValue"
          />

          <q-input
            ref="confirm_password"
            v-model="signUp.confirm_password"
            borderless
            :type="isC_Pwd ? 'password' : 'text'"
            label="Confirm Password *"
            color="primary"
            label-color="grey"
            input-class="text-charcoal"
            class="border-secondary bg-white q-mb-lg q-px-md rounded-borders q-pb-none"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Confirm Password is required',
              val => (val && val == signUp.password) || `Password didn't match`
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isC_Pwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isC_Pwd = !isC_Pwd"
              />
            </template>
          </q-input>
          <q-checkbox v-model="signUp.terms" keep-color color="blue-2" />
          <span class="text-grey">
            I agree to
          </span>
          <span
            class="text-primary text-underline"
            @click="termsAndConditionsPopup = true"
          >
            Terms & conditions
          </span>
          <div
            class="q-px-sm text-negative"
            v-if="isbuttonClicked && !signUp.terms"
          >
            Please agree the terms and conditions
          </div>
          <q-btn
            color="primary"
            size="16px"
            type="submit"
            label="Create an account"
            class="primary-btn-style flat full-width q-mt-lg"
            style="text-transform: none"
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
      <div class="q-my-md">
        <label class="text-manatee"
          >Already have an account?
          <a
            @click="navigateToSignIn()"
            class="q-px-md text-primary text-bold text-underline"
          >
            Sign In
          </a>
        </label>
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
  </q-page>
</template>

<script>
import PasswordEmojiValidation from './PasswordEmojiValidation'
import { emailPattern, userNamePattern } from 'src/utils/common'
import { mapActions } from 'vuex'
import Terms from './Terms.vue'

export default {
  name: 'SignUp',
  data() {
    return {
      signUp: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm_password: '',
        terms: false
      },
      isPwd: true,
      isC_Pwd: true,
      isbuttonClicked: false,
      termsAndConditionsPopup: false
    }
  },
  components: {
    PasswordEmojiValidation,
    Terms
  },
  methods: {
    ...mapActions(['createUserAccount', 'googleSignUpForMobile']),
    // ************** To Check Email patter is valid or not ********************
    checkEmailValidity(val) {
      return emailPattern.test(val)
    },
    checkUserNameValidity(val) {
      return userNamePattern.test(val)
    },
    // ************ Triggers when Create an Account button is clicked *******************
    onCreateAccountClick() {
      this.isbuttonClicked = true
      this.$refs.email.validate()
      this.$refs.confirm_password.validate()
      this.$refs.signUpForm.validate().then(success => {
        if (success && this.signUp.terms) {
          let registerData = {
            firstName: this.signUp.firstName,
            lastName: this.signUp.lastName,
            email: this.signUp.email,
            password: this.signUp.password,
            requestFrom: 'mobileSignup'
          }
          this.createUserAccount(registerData)
        }
      })
    },
    getPasswordValue(event) {
      this.signUp.password = event
    },
    navigateToSignIn() {
      this.$router.push({ name: 'signin' })
    },
    signInWithGoogleClick() {
      this.googleSignUpForMobile()
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  min-height: 500px !important;
}
.q-field--error {
  border: 1px solid $errorColor;
}
h6 {
  border-bottom: 1px solid $secondary;
  line-height: 0.1em;
  color: $primary;
}
@media only screen and (min-width: $breakpoint-xs) {
  .main-class {
    max-width: 75%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
