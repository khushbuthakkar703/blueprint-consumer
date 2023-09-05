<template>
  <div>
    <div class="full-width full-height main-container">
      <label class="text-regalBlue profile-heading">
        <img
          src="../../assets/profile-blue-icon.svg"
          class="lt-md profile-icon"
        />
        My Profile</label
      >
      <div v-if="!profileData.id">
        <div class="first-name">
          <q-skeleton type="text" class="q-my-sm" width="20%" />
          <q-skeleton type="QRange" />
        </div>
        <div class="last-name q-mt-lg">
          <q-skeleton type="text" class="q-my-sm" width="20%" />
          <q-skeleton type="QRange" />
        </div>
        <div class="last-name q-mt-lg">
          <div class="row items-center justify-between">
            <div style="width: 48%">
              <div>
                <q-skeleton type="text" class="q-my-sm" width="42%" />
              </div>
              <div>
                <q-skeleton type="QRange" />
              </div>
            </div>
            <div style="width: 48%">
              <div>
                <q-skeleton type="text" class="q-my-sm" width="42%" />
              </div>
              <div>
                <q-skeleton type="QRange" />
              </div>
            </div>
          </div>
        </div>
        <div class="last-name q-mt-lg">
          <q-skeleton type="text" class="q-my-sm" width="20%" />
          <q-skeleton type="QRange" />
        </div>
        <div class="row items-center justify-between">
          <q-skeleton type="rect" class="q-mt-lg" width="20%" />
          <q-skeleton type="QBtn" class="q-my-sm q-mt-lg" width="30%" />
        </div>
      </div>

      <q-form
        class="full-width"
        @submit.prevent="onSubmit"
        ref="userProfile"
        v-if="profileData.id"
      >
        <div class="first-name" style="">
          <label class="flex field-heading"
            >First Name <span class="text-red q-ml-xs">*</span></label
          >
          <q-input
            borderless
            class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs q-pb-none"
            placeholder="Enter First Name"
            v-model.trim="profileDetails.firstName"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'First name is required',
              val => checkUserNameValidity(val) || 'Enter valid First Name'
            ]"
            maxlength="50"
            style="max-height: 44px !important; padding-right: 14px !important; padding-left: 14px !important;"
            ref="fname"
          />
        </div>
        <div class="" style="margin-top: 24px">
          <label class="flex field-heading"
            >Last Name <span class="text-red q-ml-xs">*</span></label
          >
          <q-input
            borderless
            class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs q-pb-none"
            v-model.trim="profileDetails.lastName"
            placeholder="Enter Last Name"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Last name is required',
              val => checkUserNameValidity(val) || 'Enter valid Last Name'
            ]"
            maxlength="50"
            style="max-height: 44px !important; padding-right: 14px !important; padding-left: 14px !important;"
            ref="lname"
          />
        </div>
        <div
          class="flex justify-between no-wrap company-job"
          style="margin-top: 24px"
        >
          <div style="margin-right: 24px !important; " class="full-width">
            <label class="flex field-heading"
              >Company Name
              <span
                class="text-manateeGrey text-italic q-ml-xs"
                style="font-weight: normal !important"
              >
                — Optional</span
              >
            </label>
            <q-input
              dense
              borderless
              class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs  q-pb-none"
              placeholder="Enter Company Name"
              style="padding-right: 14px !important; padding-left: 14px !important;"
              v-model.trim="profileDetails.companyName"
            />
          </div>
          <div style="" class="full-width job-role">
            <label class="flex field-heading"
              >Job Role
              <span
                class="text-manateeGrey text-italic q-ml-xs"
                style="font-weight: normal !important"
              >
                — Optional</span
              ></label
            >
            <q-input
              dense
              borderless
              class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs  q-pb-none"
              style="padding-right: 14px !important; padding-left: 14px !important;"
              placeholder="Enter Job Role"
              v-model.trim="profileDetails.jobRole"
            />
          </div>
        </div>
        <div class="" style="margin-top: 24px">
          <label class="flex field-heading"
            >Timezone <span class="text-red q-ml-xs">*</span></label
          >
          <q-select
            dense
            borderless
            :options="timeZoneOptions"
            v-model="timeZone"
            class="border-input-field f-w-500 text-body1 text-regalBlue q-mt-xs  q-pb-none"
            style="padding-right: 14px !important; padding-left: 14px !important;"
            placeholder="Select Timezone"
            :stack-label="false"
            :rules="[val => (val && val.length > 0) || 'Timezone is required']"
            use-input
            input-debounce="0"
            hide-selected
            fill-input
            @filter="filterTimezone"
            :dropdown-icon="`img:${dropDownIcon}`"
            transition-hide="fade"
            transition-show="fade"
            :behavior="dropDownBehavior"
            lazy-rules
          >
            <template v-slot:selected>
              <template v-if="timeZone">
                {{ timeZone }}
              </template>
              <template v-else>
                Select timezone
              </template>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section>
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="flex justify-between btn-container">
          <label
            class="cancel-button text-primary cursor-pointer"
            @click="onCancel"
            >Cancel</label
          >
          <q-btn
            no-caps
            flat
            type="submit"
            label="Update Information"
            class="bg-primary update-button"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import {
  userNamePattern,
  getTimezones,
  getTimezoneString,
  removeFormatFromTimezoneString
} from '../../utils/common'
import { mapActions } from 'vuex'
export default {
  name: 'UserProfile',
  props: ['profileData'],
  data() {
    return {
      timeZone: '',
      timeZoneOptions: [],
      timeZones: [],
      profileDetails: {},
      dropDownIcon: require('../../assets/chevron-down-black.svg')
    }
  },
  computed: {
    dropDownBehavior() {
      return window.innerWidth > 1023 ? 'menu' : 'dialog'
    }
  },
  methods: {
    ...mapActions(['updateProfileData']),
    checkUserNameValidity(val) {
      return userNamePattern.test(val)
    },
    onSubmit() {
      this.$refs.fname.validate()
      this.$refs.lname.validate()
      this.$refs.userProfile.validate().then(res => {
        if (res) {
          const data = {
            firstName: this.profileDetails.firstName,
            lastName: this.profileDetails.lastName,
            companyName: this.profileDetails.companyName,
            jobRole: this.profileDetails.jobRole,
            id: this.profileDetails.id,
            timeZone: removeFormatFromTimezoneString(this.timeZone)
          }
          this.updateProfileData(data)
        }
      })
    },
    onCancel() {
      this.$router.push('explore')
    },
    filterTimezone(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.timeZoneOptions = this.timeZones.filter(
          v => v.toLocaleLowerCase().indexOf(needle) > -1
        )
      })
    }
  },
  async mounted() {
    this.timeZoneOptions = await getTimezones()
    this.timeZones = this.timeZoneOptions
    this.profileDetails = { ...this.profileData }
    this.timeZone = await getTimezoneString(this.profileDetails.timeZone)
  },
  watch: {
    async profileData() {
      this.profileDetails = { ...this.profileData }
      this.timeZone = await getTimezoneString(this.profileDetails.timeZone)
    }
  }
}
</script>

<style lang="scss" scoped>
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
.cancel-button {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 43px;
  align-items: center;
  text-decoration-line: underline;
}
.q-field__bottom {
  font-size: 12px !important;
  line-height: 12px;
}
.company-job {
  @media only screen and (max-width: $breakpoint-sm-max) {
    display: flex;
    flex-direction: column !important;
    .job-role {
      margin-top: 24px;
    }
  }
}
.btn-container {
  @media only screen and (max-width: $breakpoint-sm-max) {
    display: flex;
    flex-direction: column !important;
    justify-content: center !important;
    .cancel-button {
      order: 2;
      align-self: center !important;
      margin-top: 24px;
    }
    .update-button {
      width: 100% !important;
      order: 1;
    }
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    .cancel-button {
      margin-bottom: 100px;
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
    // box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }
}
.profile-icon {
  width: 24px !important;
  height: 24px !important;
  margin-right: 10px !important;
  margin-left: 0px !important;
}
.first-name {
  margin-top: 30px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 20px !important;
  }
}
.q-select__dialog {
  margin-top: 5vh !important;
  height: 100vh !important;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: $secondary;
    border-radius: 10px;
  }
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 10px;
}
body.platform-android:not(.native-mobile)
  .q-dialog__inner--top
  .q-select__dialog {
  max-height: 100vh !important;
}
</style>
