<template>
  <q-page>
    <Header
      title="My Blooprints"
      titleClass="text-h6"
      showBackIcon="false"
      @menu-click="onCalendarMenuClick"
      calendarMenu="true"
    ></Header>
    <div class="flex flex-center column main q-mt-md q-mb-xl" v-if="loading">
      <q-card
        flat
        bordered
        class="full-width text-body1 q-mb-md"
        v-for="i in 6"
        :key="i"
      >
        <div class="row">
          <div
            class="q-mx-md q-mt-md col"
            style="height: 120px; max-width: 120px"
          >
            <q-skeleton square width="100%" height="100%" animation="fade" />
          </div>
          <div class="col">
            <div class="q-mt-xl">
              <q-skeleton width="150px" />
            </div>
            <div class="q-mt-sm">
              <q-skeleton width="150px" />
            </div>
          </div>
        </div>

        <q-card-section>
          <q-skeleton height="100px" />
        </q-card-section>
        <div class="q-mx-md q-mb-md">
          <q-skeleton type="QBtn" class="full-width" />
          <q-separator color="secondary" />
          <q-skeleton type="QBtn" class="full-width" />
        </div>
      </q-card>
    </div>
    <div v-if="!loading">
      <div v-if="blooprintList.length == 0">
        <NoDataMessageDisplay />
      </div>
      <q-infinite-scroll
        :offset="250"
        @load="loadMoreRecords"
        ref="infiniteScroll"
      >
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
        <div class="column main q-mt-md q-mb-xl">
          <q-card
            flat
            bordered
            class="full-width text-body1 q-mb-md"
            v-for="blooprint in blooprintList"
            :key="blooprint['id']"
          >
            <div class="row">
              <div
                class="q-mx-md q-mt-md col"
                style="height: 120px; max-width: 120px"
              >
                <q-img
                  :src="blooprint['attributes']['thumbnail']"
                  spinner-color="white"
                  contain
                  class="full-width full-height img-border"
                  @click="showBlooprintDetails(blooprint)"
                />
              </div>
              <div class="col">
                <div class="q-mt-xl">
                  <div
                    class="text-nightRider text-bold text-body1 q-pr-md ellipsis-2-lines word-break-break-word"
                    @click="showBlooprintDetails(blooprint)"
                  >
                    {{ blooprint['attributes']['name'] }}
                  </div>
                </div>
                <div class="q-mt-sm">
                  <RatingIcon
                    class="q-mb-xs"
                    ratingClass="q-mb-xs"
                    color="primary"
                    :ratingValue="blooprint['attributes']['rating']"
                    iconSize="16px"
                    :isReadOnly="true"
                    isListView="list"
                  />
                </div>
              </div>
            </div>

            <q-card-section>
              <div
                class="text-dimGrey text-body2 ellipsis-3-lines word-break-break-word"
                @click="showBlooprintDetails(blooprint)"
              >
                {{ blooprint['attributes']['description'] }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="bg-solitude">
              <div
                @click="onScheduleClick(blooprint)"
                class="text-nightRider text-body2"
              >
                Schedule Blooprint
              </div>
            </q-card-section>
            <q-separator color="secondary" />
            <q-card-section class="bg-solitude">
              <div
                @click="onRateClick(blooprint)"
                class="text-nightRider text-body2"
              >
                Rate the Blooprint
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-infinite-scroll>
    </div>
    <!-- ******************** Warning Popup on Rating Deleted Blooprint *********************************** -->
    <q-dialog v-model="ratingDeletedBlooprintPopup">
      <Warning
        :message="
          'Unable to Rate and Write review for this Blooprint, the Author might have deleted this Blooprint'
        "
        :heading="'Unable to Rate and Review'"
      />
    </q-dialog>
    <!-- ******************** Rating and Review Popup *********************************** -->
    <q-dialog
      maximized
      no-esc-dismiss
      no-backdrop-dismiss
      v-model="ratingPopup"
    >
      <Rating
        @rating-close="onRatingPopupClose"
        requestFrom="mobile"
        :blooprintSelected="blooprintSelected"
      />
    </q-dialog>
    <!-- ******************** Schedule Blooprint Popup *********************************** -->
    <q-dialog
      maximized
      no-esc-dismiss
      no-backdrop-dismiss
      v-model="schedulePopup"
    >
      <ScheduleBlooprint
        @schedule-close="onSchedulePopupClose"
        :blooprintSelected="blooprintSelected"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import Header from 'components/Header.vue'
import RatingIcon from 'components/RatingIcon.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'
import Rating from './Rating.vue'
import ScheduleBlooprint from './ScheduleBlooprint.vue'
import { mapActions, mapGetters } from 'vuex'
import Warning from 'components/Warning.vue'

const BLOOPRINT_SHOW_LIMIT = 10

export default {
  name: 'SignUp',
  data() {
    return {
      loading: true,
      blooprintList: [],
      ratingPopup: false,
      blooprintSelected: {},
      schedulePopup: false,
      ratingDeletedBlooprintPopup: false
    }
  },
  components: {
    Header,
    RatingIcon,
    NoDataMessageDisplay,
    Rating,
    ScheduleBlooprint,
    Warning
  },
  mounted() {
    this.getMyBlooprintsData()
    this.updateBackNavigationScreen('/blooprint/my-blooprints')
  },
  computed: {
    ...mapGetters(['errorInGettingMyBlooprints'])
  },
  methods: {
    ...mapActions([
      'fetchMyBlooprintsList',
      'updateBackNavigationScreen',
      'isAPIResponseFailed'
    ]),
    // **************** Method to Fetch My-Blooprints List ***********************
    async getMyBlooprintsData() {
      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: 0
      }
      this.loading = true
      let data = await this.fetchMyBlooprintsList(params)
      if (data['data']) {
        this.blooprintList = data['data']
      }
      this.loading = false
    },
    // ************ On Scroll Pagination Load Blooprint Records *****************************
    async loadMoreRecords(index, done) {
      let myBlooprintsLengthBeforeLoad = this.blooprintList.length

      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: index * BLOOPRINT_SHOW_LIMIT
      }
      if (myBlooprintsLengthBeforeLoad > BLOOPRINT_SHOW_LIMIT) {
        let data = await this.fetchMyBlooprintsList(params)
        if (data['data'].length > 0) {
          this.blooprintList = this.blooprintList.concat(data['data'])
        }
        let myBlooprintsLengthAfterLoad = this.blooprintList.length

        if (myBlooprintsLengthBeforeLoad == myBlooprintsLengthAfterLoad) {
          if (myBlooprintsLengthBeforeLoad > 0) {
            this.noMoreResults = true
          }
          this.$refs.infiniteScroll.stop()
        }
      }
      done()
    },
    showBlooprintDetails(blooprint) {
      this.$router.push({
        name: 'mobile-blooprint-landing-page',
        params: {
          blooprintId: blooprint['id']
        }
      })
    },
    onScheduleClick(blooprint) {
      this.schedulePopup = true
      this.blooprintSelected = blooprint
    },
    onCalendarMenuClick() {
      this.$router.push({ name: 'mobile-calendar' })
    },
    onRateClick(blooprint) {
      let status = blooprint.attributes.status
      if (status === 'delete' || status === 'unpublish') {
        this.ratingDeletedBlooprintPopup = true
        return
      }
      this.ratingPopup = true
      this.blooprintSelected = blooprint
    },
    onRatingPopupClose(event) {
      this.ratingPopup = false
      this.blooprintSelected = {}
      if (event) {
        this.blooprintList = []
        this.getMyBlooprintsData()
      }
    },
    onSchedulePopupClose(event) {
      this.schedulePopup = false
    }
  },
  watch: {
    errorInGettingMyBlooprints() {
      let error = !!this.errorInGettingMyBlooprints.length
      this.isAPIResponseFailed(error)
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  padding-left: 5%;
  padding-right: 5%;
}
.img-border {
  border-radius: 6px;
}
</style>
