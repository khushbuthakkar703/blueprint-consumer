<template>
  <q-page class="column">
    <div
      class="
        forgot-password-container
        column
        self-center
        items-center
        justify-center
      "
      v-if="!notificationPopup"
    >
      <div>
        <q-img
          src="~assets/ForgotPassword.svg"
          width="56px"
          height="56px"
          style="margin-bottom: 40px;"
        ></q-img>
      </div>

      <div
        class="f-w-600 text-fs-32 text-lh-36 text-regalBlue text-letter-space"
        style="margin-bottom: 16px;"
      >
        Forgot password?
      </div>
      <div class="f-w-400 text-fs-16 text-lh-24 text-lynch text-font">
        No worries, we’ll send you reset instructions.
      </div>
      <q-form @submit="onSubmit()" style="margin-top: 30px;">
        <label
          class="f-w-600 text-fs-16 text-lh-24 text-regalBlue"
          style="margin-bottom:4px"
          >Email</label
        >
        <q-input
          borderless
          v-model.trim="email"
          placeholder="Enter Email Address"
          ref="email"
          class="
            border-input-field text-font 
            f-w-500
            text-body1 text-black
            q-mt-xs q-pb-none
          "
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Email is required',
            val => (val && checkEmailValidity(val)) || 'Enter valid Email'
          ]"
          style="padding: 0px 14px; height: 44px; margin-bottom: 30px"
        />
        <q-btn
          label="Reset password"
          type="submit"
          no-caps
          unelevated
          class="bg-primary f-w-600 text-body1 text-white reset-btn"
        />
      </q-form>
      <div
        class="flex cursor-pointer"
        style="margin-top:40px"
        @click="redirectToLogin"
      >
        <div>
          <q-img
            src="~assets/LeftArrow.svg"
            width="11.68px"
            height="11.68px"
          ></q-img>
        </div>
        <div
          style="margin-left: 14.17px"
          class="f-w-400 text-fs-16 text-lh-24 text-regalBlue text-font"
        >
          Back to login
        </div>
      </div>
    </div>
    <div
      class="
        forgot-password-container-2
        column
        self-center
        items-center
        justify-center
      "
      v-if="notificationPopup"
    >
      <div>
        <q-img
          src="~assets/Email.svg"
          width="56px"
          height="56px"
          style="margin-bottom: 40px;"
        ></q-img>
      </div>
      <div
        class="f-w-600 text-fs-32 text-lh-36 text-regalBlue text-letter-space"
        style="margin-bottom: 16px;"
      >
        Check your email
      </div>
      <div
        class="f-w-400 text-fs-16 text-lh-24 text-lynch text-center text-font"
      >
        We sent a password reset link to
        <div class="f-w-700 text-center">{{ email }}</div>
      </div>
      <div
        style="margin-top:30px"
        class="f-w-400 text-fs-16 text-lh-24 text-center text-font"
      >
        Didn’t receive the email? <br class="lt-sm" />
        <span
          class="f-w-500 text-primary cursor-pointer text-font"
          style="text-decoration: underline; margin-left:10px;"
          @click="onResend"
          >Click to resend</span
        >
      </div>
      <div
        class="flex cursor-pointer"
        style="margin-top:30px"
        @click="closePopup"
      >
        <div>
          <q-img
            src="~assets/LeftArrow.svg"
            width="11.68px"
            height="11.68px"
          ></q-img>
        </div>
        <div
          style="margin-left: 14.17px"
          class="f-w-400 text-fs-16 text-lh-24 text-regalBlue text-font"
        >
          Back
        </div>
      </div>
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
      email: '',
      notificationPopup: false,
      from: null
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.from = from
    })
  },
  methods: {
    ...mapActions(['sendResetEmail']),
    checkEmailValidity(val) {
      return emailPattern.test(val)
    },
    async onSubmit() {
      this.$refs.email.validate()
      let params = {
        recoveryEmail: this.email,
        platform: 'desktop'
      }
      let response = await this.sendResetEmail(params)
      if (response) {
        this.showPopup(true)
      }
    },
    onResend() {
      let params = {
        recoveryEmail: this.email,
        platform: 'desktop'
      }
      this.sendResetEmail(params)
    },
    closePopup() {
      this.showPopup(false)
      this.email = ''
    },
    showPopup(status) {
      this.notificationPopup = status
    },
    redirectToLogin() {
      if (this.from.name === 'login-for-blooprint') {
        this.$router.push(this.from.path)
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.forgot-password-container {
  width: 60%;
  margin-top: 110px;
  margin-bottom: 306px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 80%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 90%;
    margin-top: 40px;
    margin-bottom: 108px;
  }
}
.forgot-password-container-2 {
  width: 60%;
  margin-top: 110px;
  margin-bottom: 420px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 80%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 90%;
    margin-top: 40px;
    margin-bottom: 108px;
  }
}
.reset-btn {
  height: 50px;
  border-radius: 10px;

  width: 432px;

  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 432px;
    width: 100%;
  }
}

.change-email-btn {
  border: 1px solid #e8edf2;
  border-radius: 5px;
  width: 434px;
  height: 54px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 432px;
    width: 100%;
  }
}
</style>
