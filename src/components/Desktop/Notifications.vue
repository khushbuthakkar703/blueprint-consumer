<template>
  <div class="full-width full-height main-container">
    <label class="text-regalBlue notifications-heading">
      <img
        src="../../assets/notifications-blue.svg"
        class="lt-md notification-icon"
      />
      Notifications</label
    >
    <div v-if="loading">
      <div class="email-address">
        <q-skeleton type="text" class="q-my-sm" width="20%" />
        <q-skeleton type="QRange" />
      </div>
      <q-skeleton type="rect" class="q-my-sm" width="40%" />
      <div class="text-regalBlue" style="margin-top: 45px">
        <div
          style="margin-right: 24px !important; margin-top: 18px;"
          class="full-width"
        >
          <q-skeleton type="rect" class="q-my-sm" width="25%" />
        </div>
        <div
          style="margin-right: 24px !important; margin-top: 18px;"
          class="text-regalBlue full-width"
        >
          <q-skeleton type="rect" class="q-my-sm" width="22%" />
        </div>
        <div
          style="margin-right: 24px !important; margin-top: 18px;"
          class="text-regalBlue full-width"
        >
          <q-skeleton type="rect" class="q-my-sm" width="40%" />
        </div>
      </div>
      <div class="phone-number" style="margin-top: 50px;">
        <q-skeleton type="text" class="q-my-sm" width="15%" />
        <q-skeleton type="QRange" />
      </div>
      <q-skeleton type="rect" class="q-my-sm" width="40%" />
      <q-skeleton type="QBtn" class="q-my-sm q-mt-lg" width="30%" />
    </div>
    <q-form
      v-if="!loading"
      class="full-width"
      @submit.prevent="onSubmit"
      ref="userNotification"
    >
      <div class="email-address">
        <label class="flex field-heading">Email Address</label>
        <q-input
          ref="email"
          borderless
          class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs q-px-14 q-pb-none"
          placeholder="Enter Email Address"
          v-model.trim="notificationObj.email"
          disable
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Email Address is required',
            val => isEmailValid(val) || 'Please input valid email address'
          ]"
          maxlength="50"
          style="max-height: 44px !important"
        />
      </div>
      <div class="text-regalBlue q-mt-md">
        <q-toggle
          dense
          class="f-w-500 text-fs-16"
          label="I would like to receive email notifications"
          v-model="notificationObj.emailNotification"
        />
      </div>
      <div class="notification-updates text-regalBlue" style="margin-top: 22px">
        <div style="margin-right: 24px !important; " class="full-width">
          <q-checkbox
            class="f-w-500 text-fs-16"
            v-model="notificationObj.weeklyUpdate"
            label="Weekly updates"
            :disable="!notificationObj.emailNotification"
          />
        </div>

        <div
          style="margin-right: 24px !important; "
          class="text-regalBlue full-width"
        >
          <q-checkbox
            class="f-w-500 text-fs-16"
            v-model="notificationObj.monthlyOffers"
            label="Monthly Offers"
            :disable="!notificationObj.emailNotification"
          />
        </div>

        <div
          style="margin-right: 24px !important; "
          class="text-regalBlue full-width"
        >
          <q-checkbox
            class="f-w-500 text-fs-16"
            v-model="notificationObj.blooprintAlert"
            label="When a Creator I follow publishes a new blooprint"
            :disable="!notificationObj.emailNotification"
          />
        </div>
      </div>

      <div style="" class="text-regalBlue full-width phone-number">
        <label class="flex field-heading">Phone number</label>
        <q-input
          ref="phone"
          dense
          borderless
          class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs q-px-14 q-pb-none"
          placeholder="Enter Phone number"
          v-model.trim="notificationObj.mobileNumber"
          :disable="!notificationObj.mobileNotification"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Phone number is required'
          ]"
        />
      </div>

      <div class="text-regalBlue" style="margin-top: 16px">
        <q-toggle
          dense
          class="f-w-500 text-fs-16"
          label="I would like to receive mobile notifications"
          v-model="notificationObj.mobileNotification"
        />
      </div>

      <div class="update-btn-wrap justify-between btn-container text-center">
        <div>
          <q-btn
            no-caps
            flat
            type="submit"
            label="Update Information"
            class="bg-primary update-button q-mt-lg inline-block cursor-pointer"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Notifications',
  props: ['profileData'],
  data() {
    return {
      notificationObj: {
        emailNotification: false,
        mobileNotification: false,
        monthlyOffers: false,
        weeklyUpdate: false,
        blooprintAlert: false,
        email: '',
        mobileNumber: ''
      },
      loading: true,
      requestType: 'save',
      notificationId: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  mounted() {
    this.getUserNotificationInfo()
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  methods: {
    ...mapActions([
      'fetchProfileInfo',
      'fetchUserNotificationIno',
      'saveUserNotificationIno',
      'updateUserNotificationIno'
    ]),
    isEmailValid: function(email) {
      return email == '' ? '' : this.reg.test(email) ? true : false
    },
    async getUserNotificationInfo() {
      let data = await this.fetchUserNotificationIno()
      if (data['id']) {
        this.notificationId = data['id']
        this.requestType = 'update'
        this.notificationObj = {
          ...this.notificationObj,
          ...data['attributes']
        }
      } else {
        this.requestType = 'save'
      }
      if (!this.userProfile.email) {
        await this.fetchProfileInfo()
      }
      this.notificationObj.email = this.userProfile.email
      this.loading = false
    },
    onSubmit() {
      if (this.notificationObj['emailNotification']) {
        this.$refs.email.validate()
      }
      if (this.notificationObj['mobileNotification']) {
        this.$refs.phone.validate()
      }
      this.$refs.userNotification.validate().then(res => {
        if (res) {
          if (this.requestType == 'save') {
            this.saveUserNotification()
          }
          if (this.requestType == 'update') {
            this.updateUserNotification()
          }
        }
      })
    },
    async saveUserNotification() {
      let params = {
        data: {
          type: 'profiles',
          attributes: {
            ...this.notificationObj
          }
        }
      }
      delete params.data.attributes.email
      let data = await this.saveUserNotificationIno(params)
      if (data) {
        this.getUserNotificationInfo()
      }
    },
    updateUserNotification() {
      let params = {
        data: {
          type: 'profiles',
          attributes: {
            ...this.notificationObj
          }
        },
        id: this.notificationId
      }
      delete params.data.attributes.email
      this.updateUserNotificationIno(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.q-px-14 {
  padding-left: 14px;
  padding-right: 14px;
}
.notifications-heading {
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
.field-heading {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: $regalBlue;
}
.update-button {
  // padding: 10px 30px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-top: 30px;
  width: 220px;
  height: 50px;
}

::v-deep {
  .q-field__bottom {
    font-size: 12px !important;
    line-height: 12px !important;
    padding: 5px 12px 0 !important;
  }
}

.phone-number {
  margin-top: 32px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 24px;
  }
}

.notification-updates {
  margin-left: -10px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    display: flex;
    flex-direction: column !important;
    margin-left: 0px;
  }
}
.btn-container {
  @media only screen and (max-width: $breakpoint-sm-max) {
    display: flex;
    flex-direction: column !important;
    justify-content: center !important;
    .update-button {
      width: 100% !important;
      order: 1;
    }
  }
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
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 0 15px !important;
    background: #ffffff !important;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }
}
.notification-icon {
  width: 24px !important;
  height: 24px !important;
  margin-right: 10px !important;
  margin-left: 0px !important;
}
.email-address {
  margin-top: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 20px !important;
  }
}
.update-btn-wrap {
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
    margin-bottom: 100px;
  }
}
</style>
