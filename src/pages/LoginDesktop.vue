<template>
  <div
    class="border-columbia rounded-borders bg-primary q-ma-xs-md q-pa-xs-sm q-ma-sm-lg q-pa-sm-lg q-ma-md-lg q-pa-md-lg"
  >
    <q-form
      class="q-px-xs-md q-px-sm-lg q-px-md-xl"
      @submit="onLoginClick()"
      ref="login"
    >
      <q-input
        borderless
        v-model.trim="loginForm.email"
        placeholder="Enter Email Address"
        ref="email"
        label="Email"
        label-color="white"
        input-class="text-white"
        class="border-bottom-columbia q-mb-lg q-pb-none"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Email is required',
          val => (val && checkEmailValidity(val)) || 'Enter valid Email'
        ]"
      >
        <template v-slot:prepend>
          <q-icon color="white" name="person" />
        </template>
      </q-input>
      <q-input
        type="password"
        borderless
        v-model="loginForm.password"
        placeholder="Enter Password"
        input-class="text-white"
        label-color="white"
        class="border-bottom-columbia q-mb-lg q-pb-none"
        ref="password"
        label="Password"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Password is required']"
      >
        <template v-slot:prepend>
          <q-icon color="white" name="lock" />
        </template>
      </q-input>
      <div class="text-right">
        <a @click="navigateToForgotPass()" class="text-white cursor-pointer"
          >Forgot Password?
        </a>
      </div>
      <q-btn
        unelevated
        label="Login"
        type="submit"
        size="md"
        class="full-width q-my-md q-pa-xs flat btn-border text-white"
      />
    </q-form>

    <div class="q-px-xs-md q-px-sm-lg q-px-md-xl">
      <q-btn
        class="q-mt-md full-width bg-primary btn-border  text-white text-h6 relative-position"
        no-caps
        @click="signInWithGoogleClick()"
      >
        <div class="col-1 absolute googleBtnDiv">
          <q-img style="width: 50px" src="~assets/GoogleIcon.svg" />
        </div>
        <div class="col-11 justify-md-right justify-sm-right">
          Login with Google
        </div>
      </q-btn>
    </div>
    <div class="text-white q-mt-xl q-px-xs-md q-px-sm-lg q-px-md-xl">
      Don't have an account?
      <a class="text-underline cursor-pointer" @click="navigateToSignupScreen"
        >SIGN UP</a
      >
    </div>
  </div>
</template>
<script>
import { emailPattern } from '../utils/common'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
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
.q-field--error {
  border-bottom: 1px solid $errorColor;
}
.btn-border {
  border: 2px solid $columbiaBlue;
}
</style>
