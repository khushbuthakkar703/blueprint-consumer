<template>
  <q-card class="following-list-popup bg-white relative-position">
    <q-btn
      icon="close"
      class="close-btn"
      flat
      round
      dense
      style="color: #152141"
      v-close-popup
    />
    <div class="text-fs-24-lh-32 f-w-600 text-regalBlue text-center q-ma-none">
      Following
    </div>
    <div class="list-container">
      <!------- loading screen ------->
      <div v-if="loading">
        <div
          class="row justify-between no-wrap list-item"
          v-for="i in 6"
          :key="i"
        >
          <div class="row no-wrap">
            <q-skeleton type="circle" size="80px" />
            <div style="margin-left: 10px; margin-top: 12px;">
              <q-skeleton
                type="rect"
                :width="$q.screen.lt.sm ? '100px' : '150px'"
              />
              <q-skeleton type="rect" width="90px" class="q-mt-md" />
            </div>
          </div>
          <q-skeleton
            style="margin-top: 12px"
            type="QBtn"
            class="q-ml-md"
            :width="$q.screen.lt.sm ? '70px' : '167px'"
          />
        </div>
      </div>
      <!------- no content screen ------->
      <div v-else-if="!loading && followList.length === 0">
        <div
          class="f-w-500 text-fs-14-lh-20 text-regalBlue text-center q-ma-none absolute-center"
        >
          When you follow people, you'll see them here.
        </div>
      </div>
      <!------- content screen ------->
      <div
        v-else
        class="list-item row no-wrap justify-between"
        v-for="(authorData, i) in followList"
        :key="i"
      >
        <div class="row no-wrap">
          <q-avatar
            class="cursor-pointer"
            :size="$q.screen.lt.sm ? '60px' : '80px'"
            @click="navigateToAuthorScreen(authorData.id)"
          >
            <q-img
              contain
              :src="
                authorData.attributes.picture
                  ? authorData.attributes.picture
                  : '../UserImage.svg'
              "
            />
          </q-avatar>
          <div class="user-details ellipsis">
            <div
              style="color:#101828"
              class="user-name q-ma-none f-w-600 cursor-pointer ellipsis"
              @click="navigateToAuthorScreen(authorData.id)"
            >
              {{
                authorData.attributes.firstName +
                  ' ' +
                  authorData.attributes.lastName
              }}
            </div>
            <div
              v-if="authorData.attributes.location"
              class="text-lynch f-w-500 text-fs-14-lh-20 q-mt-xs q-mx-none q-mb-none ellipsis"
            >
              {{ authorData.attributes.location }}
            </div>
          </div>
        </div>
        <q-btn
          :label="$q.screen.lt.sm ? '' : 'Unfollow'"
          class="btn-style f-w-600 bg-white text-primary text-body1"
          no-caps
          type="submit"
          no-wrap
          flat
          @click="onUnFollowClick(authorData)"
        >
          <div class="text-primary relative-position">
            <q-avatar
              class="user-icon-style"
              :style="$q.screen.lt.sm ? '' : 'margin-left:12px'"
              size="24px"
            >
              <img src="~assets/user-minus.svg" />
            </q-avatar>
          </div>
        </q-btn>
      </div>
    </div>
  </q-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      followList: [],
      loading: false
    }
  },

  computed: {
    ...mapGetters(['loggedInUserData'])
  },
  async mounted() {
    this.loading = true
    this.followList = await this.fetchFollowList()
    this.loading = false
  },
  methods: {
    ...mapActions(['fetchFollowList', 'unFollowAuthor']),
    // ************** Navigate to Authors's Screen ***********************
    navigateToAuthorScreen(authorID) {
      this.$router.push({
        name: 'author-view',
        params: {
          profileId: authorID
        }
      })
    },
    // ************* Triggeres Follow API when a Unfollow Button is Clicked ***************************
    async onUnFollowClick(authorDetails) {
      // ************ API to Un-follow ********************
      await this.unFollowAuthor({
        authorID: authorDetails['id']
      })
      this.followList = await this.fetchFollowList()
      this.$emit('onDeleteReview')
    }
  }
}
</script>
<style lang="scss" scoped>
.following-list-popup {
  padding: 40px 32px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 716px !important;
  max-width: 716px !important;
  min-height: 730px;
  .list-container {
    margin-top: 32px;
    .list-item {
      margin-bottom: 32px;
      .user-details {
        width: 300px;
        margin-top: 12px;
        margin-left: 30px;
        .user-name {
          font-size: 24px;
          line-height: 32px;
          @media only screen and (max-width: $breakpoint-xs-max) {
            font-size: 20px;
            line-height: 28px;
          }
        }
        @media only screen and (max-width: 717px) {
          width: 150px;
        }
        @media only screen and (max-width: $breakpoint-xs-max) {
          margin-left: 20px;
          margin-top: 6px;
        }
        @media only screen and (max-width: 360px) {
          width: 120px;
        }
      }
    }
    .user-icon-style {
      border-radius: initial !important;
    }
  }
}
.close-btn {
  position: absolute;
  right: 30px;
  top: 30px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    right: 20px;
    top: 20px;
  }
}
::v-deep {
  .btn-style {
    margin-top: 12px;
    border: 2px solid #1652f0;
    border-radius: 10px;
    height: 40px;
    width: 167px;
    padding: 0px 30px;
    .q-btn__wrapper {
      padding: 0px;
      min-height: 0px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      width: 25px;
      margin-top: 6px;
    }
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
  margin: 10px 0px;
}
</style>
