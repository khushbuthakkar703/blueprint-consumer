<template>
  <q-page
    class="my-blooprint-p-style"
    :class="
      inProgressBlooprintList.length == 0 &&
      yetToBeginBlooprintList.length == 0 &&
      completedBlooprintList.length == 0
        ? this.isCompletedLoading &&
          this.isInprogressLoading &&
          this.isYetToBeginLoading
          ? 'viewrecords-bg'
          : 'norecords-bg'
        : 'viewrecords-bg'
    "
  >
    <div class="f-w-600 text-regalBlue heading-style text-letter-space">
      My blooprints
    </div>
    <MyBlooprintsNoDataScreen v-if="showNoBlooprintDataMsg()" />
    <div class="my-list-margin" v-else>
      <div v-if="isInprogressLoading">
        <div style="margin-bottom: 40px">
          <q-skeleton type="text" width="150px" />
        </div>
        <BlooprintSkeletonCard :totalCards="8" />
      </div>
      <div v-if="!isInprogressLoading && inProgressBlooprintList.length > 0">
        <div class="text-body1 text-regalBlue f-w-600 q-mb-md q-pb-xs">
          <span class="q-mr-xs">In progress</span>
          <q-icon class="text-primary q-pb-xs" size="28px" name="expand_more" />
        </div>
        <MyBlooprintDesktopDataCard
          :myBlooprintList="inProgressBlooprintList"
          :buttonText="'Continue'"
        />
        <div class="flex flex-center">
          <q-btn
            v-if="
              inProgressBlooprintList.length < totalInProgressRecordsCount &&
                !showInProgressSpinner
            "
            color="primary"
            class="text-body1 see-more-btn q-mb-lg"
            no-caps
            label="See more"
            @click="loadMoreInprogressRecords"
          />
          <q-spinner-ios
            v-if="showInProgressSpinner"
            class="items-center q-mb-lg"
            color="primary"
            size="50px"
          />
        </div>
      </div>
      <BlooprintSkeletonCard v-if="isYetToBeginLoading" :totalCards="8" />
      <div v-if="!isYetToBeginLoading && yetToBeginBlooprintList.length > 0">
        <div
          class="text-body1 text-regalBlue f-w-600 q-mb-md q-pb-xs yet-to-margin"
        >
          <span class="q-mr-xs">Yet to Begin</span>
          <q-icon class="text-primary q-pb-xs" size="28px" name="expand_more" />
        </div>
        <MyBlooprintDesktopDataCard
          :myBlooprintList="yetToBeginBlooprintList"
          :buttonText="'Start first task'"
        />
        <div class="flex flex-center">
          <q-btn
            v-if="
              yetToBeginBlooprintList.length < totalYetToBeginRecordsCount &&
                !showYetToBeginSpinner
            "
            color="primary"
            class="text-body1 see-more-btn q-mb-lg"
            no-caps
            label="See more"
            @click="loadMoreYetToBeginRecords"
          />
          <q-spinner-ios
            v-if="showYetToBeginSpinner"
            class="items-center q-mb-lg"
            color="primary"
            size="50px"
          />
        </div>
      </div>
      <BlooprintSkeletonCard v-if="isCompletedLoading" :totalCards="8" />
      <div v-if="!isCompletedLoading && completedBlooprintList.length > 0">
        <div
          class="text-body1 text-regalBlue f-w-600 q-mb-md q-pb-xs yet-to-margin"
        >
          <span class="q-mr-xs">Completed</span>
          <q-icon class="text-primary q-pb-xs" size="28px" name="expand_more" />
        </div>
        <MyBlooprintDesktopDataCard
          :myBlooprintList="completedBlooprintList"
          :buttonText="'Completed'"
        />
        <div class="flex flex-center">
          <q-btn
            v-if="
              completedBlooprintList.length < totalCompletedRecordsCount &&
                !showCompletedSpinner
            "
            color="primary"
            class="text-body1 see-more-btn"
            no-caps
            label="See more"
            @click="loadMoreCompletedRecords"
          />
          <q-spinner-ios
            v-if="showCompletedSpinner"
            class="items-center"
            color="primary"
            size="50px"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import BlooprintSkeletonCard from '../../components/Desktop/BlooprintSkeletonCard.vue'
import MyBlooprintsNoDataScreen from '../../components/Desktop/MyBlooprintsNoDataScreen.vue'
import MyBlooprintDesktopDataCard from '../../components/Desktop/MyBlooprintDesktopDataCard.vue'

import { mapActions, mapGetters } from 'vuex'

const BLOOPRINT_SHOW_LIMIT = 10
export default {
  name: 'DesktopMyBlooprints',
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      isInprogressLoading: true,
      isYetToBeginLoading: true,
      isCompletedLoading: true,
      inProgressBlooprintList: [],
      yetToBeginBlooprintList: [],
      completedBlooprintList: [],
      totalInProgressRecordsCount: 0,
      totalYetToBeginRecordsCount: 0,
      totalCompletedRecordsCount: 0,
      showInProgressSpinner: false,
      showYetToBeginSpinner: false,
      showCompletedSpinner: false,
      inProgressPageNo: 0,
      yetToBeginPageNo: 0,
      completedPageNo: 0
    }
  },
  components: {
    BlooprintSkeletonCard,
    MyBlooprintsNoDataScreen,
    MyBlooprintDesktopDataCard
  },
  mounted() {
    this.getYetToBeginBlooprintsData({
      limit: BLOOPRINT_SHOW_LIMIT,
      offset: 0,
      filter: 'yettobegin'
    })
    this.getInProgressBlooprintsData({
      limit: BLOOPRINT_SHOW_LIMIT,
      offset: 0,
      filter: 'inprogress'
    })
    this.getCompletedBlooprintsData({
      limit: BLOOPRINT_SHOW_LIMIT,
      offset: 0,
      filter: 'completed'
    })
  },
  methods: {
    ...mapActions(['fetchMyBlooprintsList']),
    // **************** Method to Fetch My-Blooprints List ***********************
    async getYetToBeginBlooprintsData(params) {
      this.isYetToBeginLoading = this.yetToBeginPageNo == 0
      this.showYetToBeginSpinner = this.yetToBeginPageNo > 0
      let data = await this.fetchMyBlooprintsList(params)
      this.showYetToBeginSpinner = false
      if (data['data']) {
        this.yetToBeginBlooprintList = data['data']
        this.totalYetToBeginRecordsCount = data['meta']['count']
      }
      this.isYetToBeginLoading = false
    },
    async getInProgressBlooprintsData(params) {
      this.isInprogressLoading = this.inProgressPageNo == 0
      this.showInProgressSpinner = this.inProgressPageNo > 0
      let data = await this.fetchMyBlooprintsList(params)
      if (data['data']) {
        this.inProgressBlooprintList = data['data']
        this.totalInProgressRecordsCount = data['meta']['count']
      }
      this.isInprogressLoading = false
      this.showInProgressSpinner = false
    },
    async getCompletedBlooprintsData(params) {
      this.isCompletedLoading = this.completedPageNo == 0
      this.showCompletedSpinner = this.completedPageNo > 0
      let data = await this.fetchMyBlooprintsList(params)
      if (data['data']) {
        this.completedBlooprintList = data['data']
        this.totalCompletedRecordsCount = data['meta']['count']
      }
      this.isCompletedLoading = false
      this.showCompletedSpinner = false
    },
    loadMoreYetToBeginRecords() {
      this.yetToBeginPageNo++
      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: this.yetToBeginPageNo * BLOOPRINT_SHOW_LIMIT,
        filter: 'yettobegin'
      }
      this.getYetToBeginBlooprintsData(params)
    },
    loadMoreInprogressRecords() {
      this.inProgressPageNo++
      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: this.inProgressPageNo * BLOOPRINT_SHOW_LIMIT,
        filter: 'inprogress'
      }
      this.getInProgressBlooprintsData(params)
    },

    loadMoreCompletedRecords() {
      this.completedPageNo++
      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: this.completedPageNo * BLOOPRINT_SHOW_LIMIT,
        filter: 'completed'
      }
      this.getCompletedBlooprintsData(params)
    },
    showNoBlooprintDataMsg() {
      return (
        this.inProgressBlooprintList.length == 0 &&
        this.yetToBeginBlooprintList.length == 0 &&
        this.completedBlooprintList.length == 0 &&
        !this.isCompletedLoading &&
        !this.isInprogressLoading &&
        !this.isYetToBeginLoading
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.my-blooprint-p-style {
  padding: 40px 52px 94px 52px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding: 30px 15px 70px 15px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 30px 15px 70px 15px;
  }
}
.norecords-bg {
  background: linear-gradient(
    to bottom,
    $solitudeBlue 0%,
    $solitudeBlue 250px,
    #ffffff 250px,
    #ffffff 100%
  );
  @media only screen and (max-width: $breakpoint-xs-max) {
    background: linear-gradient(
      to bottom,
      $solitudeBlue 0%,
      $solitudeBlue 96px,
      #ffffff 96px,
      #ffffff 100%
    );
  }
}
.viewrecords-bg {
  background: linear-gradient(
    to bottom,
    $solitudeBlue 0%,
    $solitudeBlue 460px,
    #ffffff 460px,
    #ffffff 100%
  );
  @media only screen and (max-width: $breakpoint-sm-max) {
    background: linear-gradient(
      to bottom,
      $solitudeBlue 0%,
      $solitudeBlue 445px,
      #ffffff 445px,
      #ffffff 100%
    );
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    background: linear-gradient(
      to bottom,
      $solitudeBlue 0px,
      $solitudeBlue 96px,
      #ffffff 96px,
      #ffffff 100%
    );
  }
}
.heading-style {
  font-size: 48px;
  line-height: 56px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 32px;
    line-height: 36px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 32px;
    line-height: 36px;
  }
}
.my-list-margin {
  margin-top: 40px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 50px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 50px;
  }
}
.yet-to-margin {
  margin-top: 0px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 10px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 10px;
  }
}
.see-more-btn {
  width: 220px;
  height: 50px;
  border-radius: 10px;
  font-weight: 600;
  margin-top: 0px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-weight: normal;
    margin-top: 20px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-weight: normal;
    margin-top: 20px;
  }
}
</style>
