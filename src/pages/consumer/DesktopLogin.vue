<template>
  <q-page class="row bg-white flex">
    <div
      class="
        col-md-6 col-sm-6 col-xs-12
        justify-center
        q-mt-md-xl q-pt-md-xl
        row
      "
    >
      <q-form
        class="
          q-mt-md-sm
          q-mx-md-none
          q-mx-sm-lg
          q-mx-xs-lg
          q-px-md-none
          q-px-sm-md
          q-px-xs-md
          q-my-md-none
          q-my-sm-xl
          q-my-xs-xl
        "
        @submit="onLoginClick()"
        ref="login"
      >
        <div class="text-fs-32 gt-sm text-black f-w-600 q-mb-lg">Login</div>
        <div class="text-h5 lt-md text-black f-w-600 q-mb-lg">Login</div>
        <label class="text-regalBlue text-body1 f-w-600">Email</label>
        <q-input
          borderless
          v-model.trim="loginForm.email"
          placeholder="Enter Email Address"
          ref="email"
          class="
            border-input-field
            input-style
            f-w-500
            text-body1 text-black
            q-mt-xs q-mb-lg  q-pb-none
          "
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Email is required',
            val => (val && checkEmailValidity(val)) || 'Enter valid Email'
          ]"
        />
        <label class="text-regalBlue text-body1 f-w-600">Password</label>
        <q-input
          :type="isPwd ? 'password' : 'text'"
          borderless
          v-model="loginForm.password"
          placeholder="Enter Password"
          class="
            border-input-field
            input-style
            text-body1 text-black
            f-w-500
            q-mt-xs q-mb-lg  q-pb-none
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
              text-primary text-body1
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
              q-px-xl
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
            q-mt-lg q-pa-xs
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
        <div class="text-black text-left f-w-400 text-body1 q-mt-xl q-mb-sm">
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
    <div
      class="col-md-6 col-sm-6 col-xs-12 gt-xs image-margin q-pl-sm text-right"
    >
      <q-img src="~assets/DefaultLogo.png" />
    </div>
  </q-page>
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
            password: this.loginForm.password
          }
          this.userLogin(loginData)
        }
      })
    },
    signInWithGoogleClick() {
      this.googleSignIn()
    },
    navigateToForgotPass() {
      this.$router.push({ name: 'forgot-password' })
    },
    // ************** Navigate to Signup Screen ***********************
    navigateToSignupScreen() {
      this.$router.push({ name: 'register' })
      this.$emit('on-signup-click')
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
.image-margin {
  margin-bottom: 124px;
  margin-top: 70px;
  @media only screen and (max-width: $breakpoint-sm) {
    margin-top: 120px;
  }
}
.border-input-field {
  padding: 0 14px;
}
</style>
