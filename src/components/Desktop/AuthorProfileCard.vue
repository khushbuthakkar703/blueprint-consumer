<template>
  <div style="margin-top: 40px">
    <div class="f-w-600 text-fs-24-lh-28">
      <span class="gt-xs text-regalBlue">About the Creator</span>
      <span class="lt-sm text-black">About the Creator</span>
    </div>
    <q-card bordered class="creator-card">
      <q-card-section>
        <div class="row">
          <q-avatar
            size="7.5rem"
            class="cursor-pointer gt-sm"
            @click="navigateToAuthorScreen"
          >
            <img
              contain
              v-if="
                authorDetails.picture != '' && authorDetails.picture != null
              "
              :src="authorDetails.picture"
            />
            <img v-else src="~assets/UserImage.svg" />
          </q-avatar>
          <q-avatar
            size="6.25rem"
            class="cursor-pointer lt-md"
            @click="navigateToAuthorScreen"
          >
            <img
              contain
              v-if="
                authorDetails.picture != '' && authorDetails.picture != null
              "
              :src="authorDetails.picture"
            />
            <img v-else src="~assets/UserImage.svg" />
          </q-avatar>
          <div class="col" style="margin-left: 20px">
            <div
              class="f-w-600 author-name text-regalBlue word-break-break-word ellipsis cursor-pointer"
              @click="navigateToAuthorScreen"
            >
              {{ authorDetails.firstName }} {{ authorDetails.lastName }}
              <q-tooltip anchor="bottom middle" self="top middle">
                <div class="word-break-break-word">
                  {{ authorDetails.firstName }} {{ authorDetails.lastName }}
                </div>
              </q-tooltip>
            </div>
            <div
              class="q-mt-sm f-w-500 text-body1 text-comet word-break-break-word ellipsis"
            >
              {{ authorDetails.jobRole }}
            </div>
            <div
              class="q-mt-xs f-w-500 text-body1 text-comet word-break-break-word ellipsis"
            >
              {{ authorDetails.companyName }}
            </div>
          </div>
        </div>
        <div
          class="q-mt-lg f-w-500 text-regalBlue text-fs-14-lh-20 word-break-break-word"
          :class="$q.screen.lt.md ? 'ellipsis-7-lines' : 'ellipsis-6-lines'"
        >
          {{ authorDetails.yourself }}
        </div>
        <div
          v-if="authorDetails.yourself && authorDetails.yourself.length > 570"
          @click="navigateToAuthorScreen"
          class="text-primary cursor-pointer read-more-text"
        >
          Read more
        </div>
        <div class="row q-mt-lg">
          <div
            class="col-md col-sm-12 col-xs-12 q-mr-md-sm"
            v-if="authorDetails['connectToCommunity'] && showMessageButton"
          >
            <!-- v-if="authorDetails['connectToCommunity']" -->
            <q-btn
              color="primary"
              label="Message me"
              class="button-style f-w-600 text-white text-body1"
              no-caps
              type="submit"
              @click="onMessageMeClick"
            >
              <div class="relative-position">
                <q-avatar class="user-icon-style q-ml-sm" size="sm">
                  <img src="~assets/message-circle.svg" />
                </q-avatar>
              </div>
            </q-btn>
          </div>
          <div
            class="col-md col-sm-12 col-xs-12"
            :class="
              authorDetails['connectToCommunity']
                ? 'q-ml-md-sm q-mt-md-none q-mt-sm-md q-mt-xs-md'
                : null
            "
            v-if="showFollowButton"
          >
            <q-btn
              v-if="!authorDetails.currentUserFollowing"
              color="primary"
              label="Follow"
              class="button-style f-w-600 text-white text-body1"
              no-caps
              type="submit"
              @click="onFollowClick"
            >
              <div class="q-py-xs text-white relative-position">
                <q-avatar class="user-icon-style q-ml-sm" size="sm">
                  <img src="~assets/user-plus.svg" />
                </q-avatar>
              </div>
            </q-btn>
            <q-btn
              v-else
              label="Following"
              unelevated
              class="button-style following-btn-style f-w-600 bg-white text-primary text-body1"
              no-caps
              type="submit"
              @click="onFollowClick"
            >
              <div class="text-primary relative-position">
                <q-icon class="q-ml-sm" size="sm" name="task_alt" />
              </div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { firebaseAuth } from 'src/boot/firebase'
import { mapActions } from 'vuex'

export default {
  name: 'AuthorProfileCard',
  props: ['authorDetails'],
  computed: {
    showFollowButton() {
      return this.authorDetails.firebaseUID !== firebaseAuth.currentUser.uid
    },
    showMessageButton() {
      return this.authorDetails.firebaseUID !== firebaseAuth.currentUser.uid
    }
  },
  methods: {
    ...mapActions(['unFollowAuthor', 'followAuthor', 'storeAuthorDetails']),
    // ************** Navigate to Authors's Screen ***********************
    navigateToAuthorScreen() {
      this.$router.push({
        name: 'author-view',
        params: {
          profileId: this.authorDetails.id
        }
      })
    },
    onMessageMeClick() {
      this.storeAuthorDetails(this.authorDetails)
      this.$router.push({ name: 'message' }, () => {})
    },
    // ************* Triggeres Follow API when a Follow Button is Clicked ***************************
    async onFollowClick() {
      if (this.authorDetails['currentUserFollowing']) {
        // ************ API to Un-Follow ********************
        let followResponse = await this.unFollowAuthor({
          authorID: this.authorDetails['id']
        })
        if (followResponse) {
          this.authorDetails.currentUserFollowing = !followResponse
        }
      } else {
        // ************ API to Follow ********************
        let followResponse = await this.followAuthor({
          authorID: this.authorDetails['id']
        })
        if (followResponse) {
          this.authorDetails.currentUserFollowing = followResponse
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.creator-card {
  box-shadow: 0px 10px 20px $shadow;
  border-radius: 20px;
  margin-top: 16px;
  @media only screen and (min-width: $breakpoint-md-min) {
    max-width: 432px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 15px;
  }
  .q-card__section--vert {
    padding: 30px !important;
    @media only screen and (max-width: $breakpoint-sm-max) {
      padding: 20px !important;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      padding: 20px !important;
    }
  }
}
.author-name {
  font-size: 24px;
  line-height: 32px;
  margin-top: 16px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
    margin-top: 10px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 20px;
    line-height: 24px;
    margin-top: 10px;
  }
}
.button-style {
  height: 44px;
  border-radius: 10px;
  width: 177.5px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    height: auto;
  }
}
.following-btn-style {
  border: 2px solid $primary;
}

.user-icon-style {
  border-radius: initial !important;
}
.read-more-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  &:hover {
    text-decoration: underline;
  }
}
</style>
