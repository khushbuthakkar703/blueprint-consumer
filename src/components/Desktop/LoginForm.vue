<template>
  <div class="login-section">
    <q-form @submit="onLoginClick()" ref="login" class="form-margin">
      <div
        class="f-w-600 text-regalBlue text-fs-32 text-lh-36 gt-sm text-letter-space"
        style="margin-bottom:30px;"
      >
        Login
      </div>
      <div
        class="f-w-600 text-regalBlue text-fs-24-lh-28 lt-md text-letter-space"
        style="margin-bottom:20px;"
      >
        Login
      </div>
      <label class="f-w-600 text-regalBlue text-fs-16 text-lh-24 text-font"
        >Email</label
      >
      <q-input
        borderless
        v-model.trim="loginForm.email"
        placeholder="Enter Email Address"
        ref="email"
        class="
            border-input-field text-font
            input-style
            f-w-500
            text-body1 text-black
            q-mt-xs q-mb-lg q-px-md q-pb-none
          "
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Email is required',
          val => (val && checkEmailValidity(val)) || 'Enter valid Email'
        ]"
      />
      <label class="f-w-600 text-regalBlue text-fs-16 text-lh-24 text-font"
        >Password</label
      >
      <q-input
        :type="isPwd ? 'password' : 'text'"
        borderless
        v-model="loginForm.password"
        placeholder="Enter Password"
        class="
            border-input-field text-font
            input-style
            text-body1 text-black
            f-w-500
            q-mt-xs q-mb-lg q-px-md q-pb-none
          "
        ref="password"
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
      <div class="text-left">
        <a
          @click="navigateToForgotPass()"
          class="
              text-primary text-body1 text-font
              f-w-500
              text-underline
              cursor-pointer
            "
          >Forgotten Password?
        </a>
      </div>

      <div class="q-mt-sm">
        <q-btn
          type="submit"
          color="primary"
          label="Login"
          no-caps
          no-wrap
          unelevated
          class="
              q-px-xl text-font
              text-body1
              full-width
              q-mt-md q-pa-xs
              bg-primary
              f-w-600
              flat
              btn-border
              text-white text-center
            "
          ><div class="text-left">
            <q-avatar style="margin-left: 17px" class="arrow" size="14px">
              <img src="~assets/chevron-right.svg" />
            </q-avatar></div
        ></q-btn>
      </div>

      <q-btn
        unelevated
        class="
            q-mt-lg q-pa-xs text-font
            full-width
            google-btn-border
            text-body1 text-shuttleGrey
            flat
            relative-position
          "
        no-caps
        @click="signInWithGoogleClick()"
      >
        <img src="~assets/GoogleIcon.png" />
        <div class="q-ml-sm q-pl-xs f-w-400">Login with Google</div>
      </q-btn>
      <div class="text-black text-left f-w-400 text-body1 text-font q-mt-xl">
        Don’t have an account?
        <a
          class="
              text-underline text-primary text-body1
              f-w-500
              cursor-pointer
            "
          style="margin-left: 10px"
          @click="navigateToSignupScreen"
          >Sign up
        </a>
      </div>
    </q-form>
  </div>
</template>
<script>
import { emailPattern } from '../../utils/common'
import { mapActions } from 'vuex'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      mouseHover: false,
      isPwd: true
    }
  },
  methods: {
    ...mapActions(['userLogin', 'googleSignIn', 'setToastMessage']),
    // ************** To Check Email patter is valid or not ********************
    checkEmailValidity(val) {
      return emailPattern.test(val)
    },
    // ********************* Triggers when login button is clicked **************************
    onLoginClick() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      this.$refs.login.validate().then(res => {
        if (res) {
          let loginData = {
            email: this.loginForm.email,
            password: this.loginForm.password,
            requestFrom: 'buy-blooprint',
            blooprintId: this.$route.params['blooprintId']
          }
          this.userLogin(loginData)
        }
      })
    },
    signInWithGoogleClick() {
      let loginData = {
        requestFrom: 'buy-blooprint',
        blooprintId: this.$route.params['blooprintId']
      }
      this.googleSignIn(loginData)
    },
    navigateToForgotPass() {
      this.$router.push({ name: 'forgot-password' })
    },
    // ************** Navigate to Signup Screen ***********************
    navigateToSignupScreen() {
      this.$router.push({ name: 'signup-for-blooprint' })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-section {
  margin-top: 200px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 0px !important;
    margin-bottom: 0px;
  }
  @media only screen and (min-width: $breakpoint-md-min) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: $breakpoint-sm-min) {
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }
}
.form-margin {
  margin-bottom: 250px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin: 30px 15px 98px 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin: 30px 15px 98px 15px;
  }
}
.googleBtnDiv {
  left: 3px;
  top: 3px;
  bottom: 3px;
}
.btn-border {
  border-radius: 10px;
}
.input-style {
  width: 432px;
  height: 44px;
  padding: 0px 14px;
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
</style>
