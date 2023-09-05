<template>
  <q-page class="row flex flex-center">
    <div
      class="col-md-6 col-sm-12 col-xs-12 q-mt-xs-xl q-mt-md-none text-center"
    >
      <div class="flex-center row">
        <q-img class="col-md-2 col-sm-2 col-xs-2" src="~assets/AuthLogo1.svg" />
        <q-img
          class="col-md-8 col-sm-6 col-xs-8 q-mt-sm q-ml-xs-sm q-ml-sm-md q-ml-md-md"
          src="~assets/AuthLogo2.svg"
        />
      </div>
    </div>
    <div
      class="col-md-6 col-sm-9 col-xs-12 q-pl-md-md q-pr-md-xl q-my-xs-lg q-my-md-none"
    >
      <LoginDesktop v-if="isLoginScreen" @on-signup-click="openSignupPage" />
      <SignUpDesktop v-if="isSignupScreen" @on-login-click="openLoginPage" />
    </div>
  </q-page>
</template>
<script>
import LoginDesktop from './LoginDesktop.vue'
import SignUpDesktop from './SignUpDesktop.vue'
import { mapActions } from 'vuex'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: {
    LoginDesktop,
    SignUpDesktop
  },
  data() {
    return {
      isLoginScreen: false,
      isSignupScreen: false
    }
  },
  watch: {
    $route: 'navigateLoginRegscreens'
  },
  mounted() {
    this.navigateLoginRegscreens()
  },
  methods: {
    ...mapActions(['isRequestFromMobile']),
    navigateLoginRegscreens() {
      let routePath = this.$router.history.current.fullPath
      this.isRequestFromMobile(false)
      if (routePath.includes('login')) {
        this.openLoginPage()
      } else if (routePath.includes('register')) {
        this.openSignupPage()
      }
    },
    // ************** Method to display Signup Screen *************************
    openSignupPage() {
      this.isLoginScreen = false
      this.isSignupScreen = true
    },
    // ************** Method to display Login Screen *************************
    openLoginPage() {
      this.isLoginScreen = true
      this.isSignupScreen = false
    }
  }
}
</script>
<style lang="scss" scoped></style>
