<template>
  <q-page>
    <div class="message-header">
      <div class="f-w-600 text-body1 text-regalBlue">
        <q-icon
          class="right-arrow q-ml-sm cursor-pointer"
          style="margin-bottom: 2px"
          size="sm"
          name="chevron_left"
          @click="navigateBack"
        />
        <span class="cursor-pointer" @click="navigateBack">
          Back
        </span>
      </div>
    </div>
    <div class="msg-view-styles overflow-hidden">
      <chat
        v-if="currentUser"
        :currentUser="currentUser"
        :receiverID="receiverID"
        :getProfileInfo="getProfileInfo"
        :globalConfiguration="globalConfig"
        :inboxConfiguration="inboxConfiguration"
        :chatHeaderConfiguration="chatHeaderConfiguration"
      />
    </div>
  </q-page>
</template>

<script>
import { firebaseAuth } from 'boot/firebase'
import { mapActions, mapGetters } from 'vuex'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      globalConfig: {
        loadingIconColor: 'primary',
        height: '80vh',
        allowNewChats: false
      },
      inboxConfiguration: {
        activeChatColor: '#F2F7FF',
        activeChatTextColor: '#0052CD',
        unreadIndicatorColor: '#80B3FF'
      },
      chatHeaderConfiguration: {
        onlineIndicatorColor: '#12B76A',
        onlineIndicatorBgColor: '#ECFDF3',
        offlineIndicatorColor: '#D0D5DD',
        offlineIndicatorBgColor: '#F9FAFB',
        captionColor: '#667085'
      },
      from: null,
      userObject: {},
      receiverID: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.from = from
    })
  },
  computed: {
    ...mapGetters(['messageAuthorDetails']),

    currentUser() {
      return firebaseAuth.currentUser
    },

    getReceiverId() {
      return this.messageAuthorDetails.id
    }
  },
  async created() {
    if (!this.messageAuthorDetails['firebaseUID']) {
      // this.$router.push({ name: 'desktop-my-blooprints' })
    } else {
      this.receiverID = this.messageAuthorDetails['firebaseUID']
    }
  },
  destroyed() {
    this.storeAuthorDetails({})
  },
  methods: {
    ...mapActions([
      'setLoading',
      'storeAuthorDetails',
      'getProfileDetailsList'
    ]),

    navigateBack() {
      if (this.from && this.from.name) {
        this.$router.push({
          name: this.from.name,
          params: this.from.params
        })
      } else {
        this.$router.push({ name: 'desktop-my-blooprints' })
      }
    },
    async getUsersList(search = '', page = 1, limit = 10) {
      // ....
      // return an object with paginated list of users
    },
    async getProfileInfo(userIDs) {
      if (!Array.isArray(userIDs) || userIDs.length < 1) {
        return
      } else {
        if (
          userIDs.length == 1 &&
          userIDs[0] == this.messageAuthorDetails.firebaseUID
        ) {
          this.userObject = {
            [this.messageAuthorDetails.firebaseUID]: {
              name:
                this.messageAuthorDetails['firstName'] +
                ' ' +
                this.messageAuthorDetails['lastName'],
              photoURL: this.messageAuthorDetails['picture'],
              uid: this.messageAuthorDetails['firebaseUID'],
              caption: this.messageAuthorDetails['companyName']
            }
          }
          return this.userObject
        } else {
          let userData = {}
          let params = {
            data: []
          }
          if (
            this.messageAuthorDetails.firebaseUID &&
            !userIDs.includes(
              this.messageAuthorDetails.firebaseUID ||
                !userIDs.includes(this.messageAuthorDetails.id)
            )
          ) {
            params['data'].push({
              type: 'featured authors',
              id: this.messageAuthorDetails.firebaseUID,
              attributes: {}
            })
          }
          userIDs.map(item => {
            params['data'].push({
              type: 'featured authors',
              id: item,
              attributes: {}
            })
          })
          let data = await this.getProfileDetailsList(params)
          userData = {
            ...data,
            ...this.userObject
          }
          return userData
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.message-header {
  padding: 61px 18px 27px 18px;
  background: linear-gradient(
    to bottom,
    $solitudeBlue 0%,
    $solitudeBlue 112px,
    #ffffff 112px,
    #ffffff 100%
  );
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 61px 15px 27px 15px;
  }
}
.msg-view-styles {
  margin: 48px 52px 48px 52px;
  border-radius: 8px !important;
  border: 1px solid $grey-200;
  border: 1px solid $grey-200;
  box-shadow: 0px 4px 8px -2px rgba($grey-900, 0.1),
    0px 2px 4px -2px rgba($grey-900, 0.06);
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin: 20px 15px 20px 15px;
  }
}
</style>
