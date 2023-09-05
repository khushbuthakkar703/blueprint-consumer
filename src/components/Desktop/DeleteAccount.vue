<template>
  <div>
    <div class="divider"></div>
    <div class="full-width full-height main-container">
      <div class="">
        <label class="q-mb-lg text-regalBlue delete-heading"
          >Delete Account</label
        >
        <div class="text-regalBlue text-fs-16 f-w-500 text-lh-24">
          This action is NON REVERSIBLE. All of your data and account
          information will be deleted immediately.
        </div>
        <q-btn
          no-caps
          flat
          label="Delete Account"
          class="bg-red delete-button q-mt-lg inline-block cursor-pointer"
          @click="confirmDelete = true"
        />
      </div>
      <q-dialog v-model="confirmDelete" persistent>
        <q-card class="delete-account-popup">
          <div class="full-width delete-popup">
            <label class="q-mb-md text-regalBlue text-fs-32 f-w-600 text-lh-36"
              >Delete Account</label
            >
          </div>
          <div class="cross-icon">
            <q-icon
              name="clear"
              class="text-regalBlue cursor-pointer"
              size="30px"
              v-close-popup
            />
          </div>
          <q-card-section class="row items-center q-pl-none q-pb-xl">
            <span
              style="color: #F04438;
"
            >
              <span class="delete-popup-message icon">
                <q-img
                  src="~assets/Warning-icon.svg"
                  style="width:28.9px; height:27px"
                />
              </span>

              <span class="delete-popup-message text f-w-500 text-fs-14-lh-20"
                >Are you ABSOLUTELY SURE you wish to delete your profile and
                account resources?
              </span>
            </span>
          </q-card-section>

          <q-card-actions
            class="row reverse-wrap justify-between q-pa-none"
            style="margin-top:12px"
          >
            <q-btn
              flat
              label="Cancel"
              color="primary"
              class="cancel-btn btn-height q-pa-xs border-primary q-px-lg text-capitalize border-radius-md f-w-600 text-fs-16 text-lh-24"
              v-close-popup
            />
            <q-btn
              label="Yes, Delete Account"
              color="red"
              class="delete-btn btn-height q-pa-sm q-px-md text-capitalize text-white border-radius-md f-w-600 text-fs-16 text-lh-24"
              v-close-popup
              no-wrap
              @click="deleteAccount"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DeleteAccount',
  data() {
    return {
      confirmDelete: false
    }
  },
  methods: {
    ...mapActions(['deleteUser']),
    deleteAccount() {
      this.deleteUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.delete-heading {
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
.delete-account-popup {
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.delete-account-wrapper {
  padding-top: 25px;
  padding-bottom: 25px;
}
.delete-button {
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-top: 28px;
  height: 50px;
  width: 184px;
  @media only screen and (max-width: $breakpoint-sm) {
    width: 100%;
    margin-bottom: 100px;
  }
}
.cross-icon {
  position: absolute;
  top: 25px;
  right: 25px;
}
.main-container {
  ::placeholder {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #8a90a0;
  }
  @media only screen and (max-width: $breakpoint-sm) {
    padding: 0 15px !important;
    background: #ffffff !important;
  }
}
.delete-popup {
  padding: 30px 0px 32px 0;
  @media screen and (max-width: 490px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
    label {
      font-size: 26px;
    }
  }
}
.delete-popup-message {
  display: inline-block;
  vertical-align: top;
  .text {
    @media screen and (max-width: 490px) {
      margin-left: 10px !important;
    }
  }
  &.icon {
    margin-top: 6px;
    width: 6%;
    @media screen and (max-width: 490px) {
      width: 11%;
      margin-top: 20px;
    }
  }
  &.text {
    width: 85%;
    margin-left: 17.91px;
    @media screen and (max-width: 490px) {
      width: 77%;
      line-height: 20px;
      padding-top: 15px;
    }
  }
}
.cancel-btn {
  border-width: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
}
.delete-btn {
  padding-top: 4px;
  padding-bottom: 4px;
  width: 221px;
  height: 50px;
  @media screen and (max-width: 490px) {
    width: 100%;
    margin-left: 0 !important;
    margin-bottom: 16px;
  }
}
.cancel-btn {
  height: 50px;
  width: 118px;
  border: 2px solid #d0d5dd;
  color: #344054 !important;
  @media screen and (max-width: 490px) {
    width: 100%;
  }
}
.divider {
  @media only screen and (max-width: $breakpoint-sm) {
    padding: 10px;
    margin: 10px 0;
    background: rgb(232, 237, 242);
  }
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  margin: 30px 0px;
}
</style>
