<template>
  <div
    class="
      border-columbia
      rounded-borders
      bg-primary
      q-ma-xs-md q-pa-xs-md q-ma-sm-lg q-pa-sm-lg q-ma-md-xl q-pa-md-xl
    "
  >
    <q-form
      class="q-px-xs-md q-px-sm-lg"
      @submit="userSignup()"
      ref="signUpForm"
    >
      <q-input
        borderless
        ref="first_name"
        v-model.trim="signupForm.firstName"
        label-color="white"
        input-class="text-white"
        class="border-bottom-columbia q-mb-lg q-pb-none"
        label="First Name *"
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
        borderless
        ref="last_name"
        v-model.trim="signupForm.lastName"
        label-color="white"
        input-class="text-white"
        class="border-bottom-columbia q-mb-lg q-pb-none"
        label="Last Name"
        maxlength="50"
        lazy-rules
        :rules="[
          val => checkUserNameValidity(val) || 'Please input valid Last Name'
        ]"
      />
      <q-input
        borderless
        ref="email"
        v-model="signupForm.email"
        label-color="white"
        input-class="text-white"
        class="border-bottom-columbia q-mb-lg q-pb-none"
        label="Email *"
        maxlength="50"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Email is required',
          val => (val && checkEmailValidity(val)) || 'Enter valid Email'
        ]"
      />
      <PasswordEmojiValidation
        :isbuttonClicked="isbuttonClicked"
        requestFrom="desktopSignup"
        label="Password *"
        @password-value="getPasswordValue"
      />
      <q-input
        ref="confirm_password"
        v-model="signupForm.confirm_password"
        borderless
        :type="isC_Pwd ? 'password' : 'text'"
        label="Confirm Password *"
        color="white"
        label-color="white"
        input-class="text-white"
        class="border-bottom-columbia q-mb-lg q-pb-none"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Confirm Password is required',
          val => (val && val == signupForm.password) || `Password didn't match`
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isC_Pwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            color="white"
            @click="isC_Pwd = !isC_Pwd"
          />
        </template>
      </q-input>
      <q-checkbox
        v-model="signupForm.terms"
        keep-color
        color="info"
        label="I agree to "
        class="text-white"
      />
      <a
        class="text-white text-underline cursor-pointer"
        @click="navigateToTerms()"
      >
        Terms & Conditions
      </a>
      <div
        class="q-px-sm text-negative"
        v-if="isbuttonClicked && !signupForm.terms"
      >
        Please agree the terms and conditions
      </div>
      <q-btn
        unelevated
        label="Signup"
        type="submit"
        size="md"
        class="full-width q-my-lg q-pa-xs flat btn-border text-white"
      />
      <div class="text-white q-mt-md">
        Already have an account?
        <a class="text-underline cursor-pointer" @click="navigateToLoginScreen"
          >LOGIN</a
        >
      </div>
    </q-form>
  </div>
</template>
<script>
import { emailPattern, userNamePattern } from '../utils/common'
import { mapActions } from 'vuex'
import PasswordEmojiValidation from './PasswordEmojiValidation'

export default {
  data() {
    return {
      signupForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm_password: '',
        terms: false
      },
      isC_Pwd: true,
      isbuttonClicked: false
    }
  },
  components: {
    PasswordEmojiValidation
  },
  methods: {
    ...mapActions(['createUserAccount']),
    // ************** To Check Email patter is valid or not ********************
    checkEmailValidity(val) {
      return emailPattern.test(val)
    },
    checkUserNameValidity(val) {
      return userNamePattern.test(val)
    },
    // ********************* Triggers when Signup button is clicked **************************
    userSignup() {
      this.isbuttonClicked = true
      this.$refs.first_name.validate()
      this.$refs.last_name.validate()
      this.$refs.email.validate()
      this.$refs.confirm_password.validate()
      this.$refs.signUpForm.validate().then(async success => {
        if (success && this.signupForm.terms) {
          let params = {
            ...this.signupForm,
            requestFrom: 'desktopSignup'
          }
          let userAccountCreatedSuccessfully = await this.createUserAccount(
            params
          )
        }
      })
    },
    // ************** Fetch the Password Value ***********************
    getPasswordValue(event) {
      this.signupForm.password = event
    },
    // ************** Navigate to Login Screen ***********************
    navigateToLoginScreen() {
      this.$router.push({ name: 'login' })
      this.$emit('on-login-click')
    },
    navigateToTerms() {
      window.open(window.location.origin + '/terms')
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-border {
  border: 2px solid $columbiaBlue;
}
.q-field--error {
  border-bottom: 1px solid $errorColor;
}
</style>
