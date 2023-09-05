<template>
  <div>
    <div class="full-width full-height main-container">
      <label class="text-regalBlue profile-heading">
        <q-img
          src="../../assets/accounts-blue.svg"
          class="lt-md profile-icon text-primary"
        />
        Account</label
      >
      <q-form class="full-width" @submit="accountSubmit" ref="passwordForm">
        <div class="current-password-field">
          <label class="flex field-heading">Current password</label>

          <q-input
            :type="currentPasswordType ? 'password' : 'text'"
            borderless
            class="
              border-input-field
              f-w-500
              text-body1 text-regalBlue
              q-mt-xs q-px-md q-pb-none
            "
            placeholder="Enter Current Password"
            v-model="currentPassword"
            ref="currentPassword"
            style="max-height: 44px !important"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Current password is required'
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="currentPasswordType ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="currentPasswordType = !currentPasswordType"
              />
            </template>
          </q-input>
        </div>
        <div class="" style="margin-top: 24px">
          <label class="flex field-heading">New password</label>
          <q-input
            :type="newPasswordType ? 'password' : 'text'"
            borderless
            class="
              border-input-field
              f-w-500
              text-body1 text-regalBlue
              q-mt-xs q-px-md q-pb-none
            "
            v-model="newPassword"
            ref="newPassword"
            placeholder="Enter New Password"
            lazy-rules
            style="max-height: 44px !important"
            :rules="[
              val => (val && val.length > 0) || 'New password is required',
              val =>
                minLengthValidation(val) ||
                'Password length should be atleast 7 characters',
              val =>
                val !== currentPassword ||
                'New password should not match with current password'
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="newPasswordType ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="newPasswordType = !newPasswordType"
              />
            </template>
          </q-input>
        </div>
        <div style="margin-top: 24px">
          <div class="full-width">
            <label class="flex field-heading">Confirm new password </label>
            <q-input
              :type="newConfirmPasswordType ? 'password' : 'text'"
              borderless
              class="
                border-input-field
                f-w-500
                text-body1 text-regalBlue
                q-mt-xs q-px-md q-pb-none
              "
              placeholder="Confirm New Password"
              v-model="newConfirmPassword"
              ref="newConfirmPassword"
              style="max-height: 44px !important"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'Confirm new password is required',
                val =>
                  val === newPassword ||
                  'New password should match with confirm new password',
                val =>
                  minLengthValidation(val) ||
                  'Password length should be atleast 7 characters'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="
                    newConfirmPasswordType ? 'visibility_off' : 'visibility'
                  "
                  class="cursor-pointer"
                  @click="newConfirmPasswordType = !newConfirmPasswordType"
                />
              </template>
            </q-input>
          </div>
        </div>
        <div class="update-btn-wrap justify-between btn-container text-center">
          <div>
            <q-btn
              no-caps
              flat
              type="submit"
              label="Update Information"
              class="
                bg-primary
                update-button
                q-mt-lg
                inline-block
                cursor-pointer
              "
            />
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Account',
  data() {
    return {
      newConfirmPasswordType: true,
      currentPasswordType: true,
      newPasswordType: true,
      newConfirmPassword: '',
      currentPassword: '',
      confirmDelete: false,
      newPassword: ''
    }
  },
  methods: {
    ...mapActions(['updateLoginCredentials', 'fetchProfileInfo']),
    async accountSubmit() {
      let loginData = {
        email: this.userProfile.email,
        password: this.currentPassword,
        newPassword: this.newPassword
      }
      let passwordSuccess = await this.updateLoginCredentials(loginData)
      if (passwordSuccess) {
        this.$refs.passwordForm.reset()
        this.currentPassword = ''
        this.newPassword = ''
        this.newConfirmPassword = ''
      }
    },
    // ***************** Returns the Password Min Length Field Validation **********************
    minLengthValidation(val) {
      this.hasError = val && val.length < 7
      return val && val.length >= 7
    }
  },
  mounted() {
    // this.fetchProfileInfo()
  },
  computed: {
    ...mapGetters(['userProfile', 'toastMessage'])
  }
}
</script>

<style lang="scss" scoped>
.profile-icon {
  width: 24px !important;
  height: 24px !important;
  margin-right: 10px !important;
  margin-left: 0px !important;
}
.profile-heading {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    padding-top: 30px !important;
  }
}
.current-password-field {
  margin-top: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 20px;
  }
}
.field-heading {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: $regalBlue;
}
.update-btn-wrap {
  @media only screen and (max-width: $breakpoint-sm) {
    margin-bottom: 30px;
  }
  @media only screen and (min-width: $breakpoint-sm) {
    text-align: left;
  }
}
.update-button {
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-top: 30px;
  height: 50px;
  width: 220px;
  @media only screen and (max-width: $breakpoint-sm) {
    width: 100%;
  }
}
.q-field__bottom {
  font-size: 12px !important;
  line-height: 12px;
}
.main-container {
  ::placeholder {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #8a90a0;
  }
  @media only screen and (max-width: $breakpoint-sm) {
    padding: 0 15px !important;
    background: #ffffff !important;
  }
}
</style>
