<template>
  <q-page class="column">
    <div
      class="column self-center items-center justify-center reset-password-container"
      v-if="!notificationPopup"
    >
      <div>
        <q-img
          src="~assets/ForgotPassword.svg"
          width="56px"
          height="56px"
          style="margin-bottom: 40px"
        ></q-img>
      </div>
      <div
        class="f-w-600 text-fs-32 text-lh-36 text-regalBlue text-letter-space"
        style="margin-bottom: 30px"
      >
        Set new password
      </div>
      <q-form @submit="onSignInClick" ref="deskResetPassword">
        <label
          class="f-w-600 text-fs-16 text-lh-24 text-regalBlue text-font"
          style="margin-bottom: 4px"
          >New password</label
        >
        <q-input
          borderless
          :type="isPwd ? 'password' : 'text'"
          placeholder="Enter New Password"
          input-class="text-manateeGrey"
          v-model="password"
          class="q-mt-xs q-mb-lg  q-pb-none password-fields"
          :rules="[
            val => (val && val.length > 0) || 'New password is required',
            val =>
              val.length >= 7 ||
              'Password length should be atleast 7 characters'
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
        <label
          class="f-w-600 text-fs-16 text-lh-24 text-regalBlue text-font"
          style="margin-bottom: 4px; margin-top:24px;"
          >Confirm new password</label
        >
        <q-input
          borderless
          :type="isCPwd ? 'password' : 'text'"
          placeholder="Confirm New Password"
          input-class="text-manateeGrey"
          ref="d_confirm_Password"
          v-model="confirmPassword"
          class="password-fields q-mt-xs  q-pb-none"
          :rules="[
            val =>
              (val && val.length > 0) || 'Confirm new password is required',
            val => val == this.password || `Password didn't match`
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isCPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isCPwd = !isCPwd"
            />
          </template>
        </q-input>
        <q-btn
          style="margin-bottom:40px; margin-top:30px"
          label="Reset password"
          type="submit"
          no-caps
          unelevated
          class="bg-primary f-w-600 text-body1 text-white reset-btn"
        />
      </q-form>

      <div class="flex cursor-pointer" @click="redirectToLogin">
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
      class="column self-center items-center justify-center reset-password-container-2"
      v-if="notificationPopup"
    >
      <div>
        <q-img
          src="~assets/PasswordSuccess.svg"
          width="56px"
          height="56px"
          style="margin-bottom: 40px;"
        ></q-img>
      </div>
      <div
        class="f-w-600 text-fs-32 text-lh-36 text-regalBlue text-letter-space"
        style="margin-bottom: 16px;"
      >
        Password reset
      </div>
      <div
        class="f-w-400 text-fs-16 text-lh-24 text-lynch text-center text-font"
        style="margin-bottom: 30px;"
      >
        Your new password has been successfully updated.<br />Click below to
        continue.
      </div>

      <q-btn
        label="Continue"
        no-caps
        unelevated
        class="bg-primary f-w-600 text-body1 text-white reset-btn"
        @click="redirectToLogin"
      />
    </div>
  </q-page>
</template>

<script>
import PasswordEmojiValidation from './PasswordEmojiValidation'
import { mapActions } from 'vuex'
import { constants, isMobileApp } from 'src/utils/common'

export default {
  name: 'ResetPassword',
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      notificationPopup: false,
      resetSuccess: true,
      isPwd: true,
      isCPwd: true
    }
  },
  methods: {
    ...mapActions(['resetPassword']),
    onSignInClick() {
      this.validatePassword('d_confirm_Password', 'deskResetPassword')
    },
    validatePassword(confPass, resetFrom) {
      this.$refs[confPass].validate()
      this.$refs[resetFrom].validate().then(async success => {
        if (success) {
          let codeURI = this.$route.query.secure
            ? this.$route.query.secure.replace(/ /g, '+')
            : ''
          const passwordInfo = {
            code: codeURI,
            password: this.password
          }

          let reseteStatus = await this.resetPassword(passwordInfo)
          if (reseteStatus) {
            this.showPopup(true)
          }
        }
      })
    },
    showPopup(status) {
      this.notificationPopup = status
    },

    redirectToLogin() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang="scss" scoped>
.reset-password-container {
  width: 60%;
  margin-top: 110px;
  margin-bottom: 448px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 80%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 90%;
    margin-bottom: 108px;
    margin-top: 40px;
  }
}

.reset-password-container-2 {
  width: 60%;
  margin-top: 110px;
  margin-bottom: 250px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 80%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 90%;
    margin-bottom: 108px;
    margin-top: 40px;
  }
}
.password-fields {
  border: 1px solid #b9bcc6;
  padding: 0px 14px;
  border-radius: 8px;
  width: 432px;
  height: 44px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 432px;
    width: 100%;
  }
}

.reset-btn {
  width: 432px;
  height: 50px;
  border-radius: 10px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-width: 432px;
    width: 100%;
  }
}
</style>
