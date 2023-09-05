<template>
  <div>
    <q-form class="form-margin" @submit="onSignupClick()" ref="signup">
      <div class="signup-heading text-regalBlue f-w-600">
        Sign up
      </div>
      <label class="text-regalBlue text-body1 f-w-600">First Name</label>
      <q-input
        borderless
        v-model.trim="signupForm.fname"
        placeholder="Enter First Name"
        ref="fname"
        class="border-input-field input-style f-w-500 text-body1 text-regalBlue q-mt-xs q-mb-md-lg q-mb-sm-md q-mb-xs-md q-pb-none"
        maxlength="50"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'First Name is required',
          val => checkUserNameValidity(val) || 'Enter valid First Name'
        ]"
      />
      <label class="text-regalBlue text-body1 f-w-600">Last Name</label>
      <q-input
        borderless
        v-model.trim="signupForm.lname"
        placeholder="Enter Last Name"
        maxlength="50"
        ref="lname"
        class="border-input-field input-style f-w-500 text-body1 text-regalBlue q-mt-xs q-mb-md-lg q-mb-sm-md q-mb-xs-md q-pb-none"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Last Name is required',
          ,
          val => checkUserNameValidity(val) || 'Enter valid Last Name'
        ]"
      />
      <label class="text-regalBlue text-body1 f-w-600">Email Address</label>
      <q-input
        borderless
        v-model.trim="signupForm.email"
        placeholder="Enter Email Address"
        ref="email"
        class="border-input-field input-style f-w-500 text-body1 text-regalBlue q-mt-xs q-mb-md-lg q-mb-sm-md q-mb-xs-md q-pb-none"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Email is required',
          val => (val && checkEmailValidity(val)) || 'Enter valid Email'
        ]"
      />
      <label class="text-regalBlue text-body1 f-w-600">Password</label>
      <q-input
        borderless
        :type="isPwd ? 'password' : 'text'"
        v-model="signupForm.password"
        placeholder="Enter Password"
        class="border-input-field input-style text-body1 text-regalBlue f-w-500 q-mt-xs q-pb-none"
        ref="password"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Password is required',
          val =>
            val.length >= 7 || 'Password length should be atleast 7 characters'
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-btn
        unelevated
        type="submit"
        size="md"
        no-caps
        class="full-width q-mt-30 bg-primary f-w-600 text-body1 flat btn-border text-white"
        style="height: 50px;"
      >
        <div class="col-6 text-center f-w-600 text-body1">
          Sign up
        </div>
      </q-btn>
      <div
        class="text-regalBlue text-center privacy-text f-w-400 q-mt-20 text-left"
      >
        By clicking the "Sign up" button, you are signing up to a blooprint, and
        you agree to blooprints's
        <span
          class="text-primary text-underline cursor-pointer f-w-600"
          @click="navigateToTermsPolicyScreen('terms')"
        >
          Terms of Use
        </span>
        and
        <span
          class="text-primary text-underline cursor-pointer f-w-600"
          @click="navigateToTermsPolicyScreen('privacy')"
        >
          Privacy Policy
        </span>
        .
      </div>
      <div
        class="text-regalBlue text-center f-w-400 text-body1"
        :class="
          requestFrom == 'paymentSignupScreen'
            ? 'payment-account-margin'
            : 'signup-account-margin'
        "
      >
        Already have an account?
        <a
          class="text-underline text-primary text-body1 f-w-500 cursor-pointer"
          style="margin-left: 10px"
          @click="navigateToLoginScreen"
          >Login
        </a>
      </div>
    </q-form>
  </div>
</template>
<script>
import { emailPattern, userNamePattern } from '../../utils/common'

import { mapActions } from 'vuex'
export default {
  name: 'SignupForm',
  data() {
    return {
      isPwd: true,
      signupForm: {
        fname: '',
        lname: '',
        email: '',
        password: ''
      }
    }
  },
  props: ['requestFrom'],
  methods: {
    ...mapActions(['createUserAccount', 'googleSignUpForMobile']),
    // ************** To Check Email patter is valid or not ********************
    checkEmailValidity(val) {
      return emailPattern.test(val)
    },
    checkUserNameValidity(val) {
      return userNamePattern.test(val)
    },
    // ********************* Triggers when login button is clicked **************************
    onSignupClick() {
      this.$refs.fname.validate()
      this.$refs.lname.validate()
      this.$refs.email.validate()
      this.$refs.password.validate()
      this.$refs.signup.validate().then(async res => {
        if (res) {
          let registerData = {
            firstName: this.signupForm.fname,
            lastName: this.signupForm.lname,
            email: this.signupForm.email,
            password: this.signupForm.password,
            requestFrom: this.requestFrom
          }
          let data = await this.createUserAccount(registerData)
          if (data) {
            if (this.requestFrom == 'paymentSignupScreen') {
              this.$router.push({
                name: 'blooprint-payment',
                params: {
                  blooprintId: this.$route.params['blooprintId']
                }
              })
            }
          }
        }
      })
    },
    navigateToForgotPass() {
      this.$router.push({ name: 'forgot-password' })
    },
    navigateToLoginScreen() {
      if (this.$route.path.includes('register')) {
        this.$router.push({ name: 'login' })
      } else {
        this.$router.push({ name: 'login-for-blooprint' })
      }
    },
    navigateToTermsPolicyScreen(type) {
      this.$emit('on-terms-privacy-click', { popupType: type })
    }
  }
}
</script>

<style lang="scss" scoped>
.q-mt-20 {
  margin-top: 20px;
}
.q-mt-30 {
  margin-top: 30px;
}
.form-margin {
  margin-top: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin: 30px 15px 0px 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin: 30px 15px 0px 15px;
  }
}
.signup-heading {
  font-size: 32px;
  line-height: 36px;
  margin-bottom: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 20px;
  }
}
.googleBtnDiv {
  left: 3px;
  top: 3px;
  bottom: 3px;
}
.q-field--focused {
  border: 1px solid $primary !important;
}
.q-field--error {
  border: 1px solid $errorColor !important;
}
.btn-border {
  border-radius: 10px;
}
.input-style {
  width: 432px;
  height: 44px;
  padding-left: 14px;
  padding-right: 14px;
  @media only screen and (max-width: $breakpoint-md-max) {
    width: 432px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: auto;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: auto;
  }
}
.google-btn-border {
  border: 1px solid $solitudeBlue;
  border-radius: 5px;
}
.payment-account-margin {
  margin-top: 40px;
  margin-bottom: 194px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 30px;
    margin-bottom: 98px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 30px;
    margin-bottom: 98px;
  }
}
.signup-account-margin {
  margin-top: 40px;
  margin-bottom: 194px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 30px;
    margin-bottom: 108px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 30px;
    margin-bottom: 108px;
  }
}
.privacy-text {
  max-width: 431px;
  font-size: 12px;
  line-height: 18px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-width: 900px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 431px;
  }
}
</style>
