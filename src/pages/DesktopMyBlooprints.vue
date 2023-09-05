<template>
  <q-page class="q-mx-md-lg q-my-md-xl q-ma-sm-lg q-ma-xs-md">
    <div class="text-nightRider q-px-sm text-h5 text-weight-medium">
      My Blooprints
      <q-separator width="120px" class="q-mt-xs" color="primary" size="2px" />
    </div>
    <BlooprintSkeletonCardWeb requestFrom="blooprint" v-if="loading" />
    <div
      v-else-if="!loading && errorInGettingMyBlooprints.length"
      class="absolute-center text-center text-subtitle1"
    >
      {{ errorInGettingMyBlooprints }}
    </div>
    <div v-if="!loading && errorInGettingMyBlooprints.length == 0">
      <div v-if="myBlooprintList.length == 0">
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
        <div class="row">
          <div
            class="col-md-6 col-sm-12 col-xs-12 q-mt-md q-px-sm"
            v-for="(list, index) in myBlooprintList"
            :key="index"
          >
            <DesktopBlooprintListCard
              requestFrom="blooprint"
              :key="index"
              :thumbnailImage="list.attributes.thumbnail"
              :authorName="list.attributes.authorName"
              :price="list.attributes.price"
              :currency="list.attributes.currency"
              :blooprintName="list.attributes.name"
              :blooprintDescription="list.attributes.description"
              :rating="list.attributes.rating"
              :blooprint="list"
            />
          </div>
        </div>
        <div
          class="no-more-results-msg border-bottom-secondary text-body1 text-h5 text-center text-manatee"
          v-if="noMoreResults && myBlooprintList.length != 0"
        >
          <span class="bg-whiteSmoke q-px-sm">No more results</span>
        </div>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>
<script>
import DesktopBlooprintListCard from 'components/DesktopBlooprintListCard.vue'
import BlooprintSkeletonCardWeb from 'components/BlooprintSkeletonCardWeb.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'
import { mapActions, mapGetters } from 'vuex'

const BLOOPRINT_SHOW_LIMIT = 10

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      loading: true,
      noMoreResults: false,
      myBlooprintList: []
    }
  },
  components: {
    DesktopBlooprintListCard,
    BlooprintSkeletonCardWeb,
    NoDataMessageDisplay
  },

  mounted() {
    this.getMyBlooprintsData()
  },
  computed: {
    ...mapGetters(['errorInGettingMyBlooprints'])
  },
  methods: {
    ...mapActions(['fetchMyBlooprintsList']),
    // **************** Method to Fetch My-Blooprints List ***********************
    async getMyBlooprintsData() {
      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: 0
      }
      this.loading = true
      let data = await this.fetchMyBlooprintsList(params)
      if (data['data']) {
        this.myBlooprintList = data['data']
      }
      this.loading = false
    },
    // ************ On Scroll Pagination Load Blooprint Records *****************************
    async loadMoreRecords(index, done) {
      let myBlooprintsLengthBeforeLoad = this.myBlooprintList.length

      let params = {
        limit: BLOOPRINT_SHOW_LIMIT,
        offset: index * BLOOPRINT_SHOW_LIMIT
      }
      if (myBlooprintsLengthBeforeLoad > BLOOPRINT_SHOW_LIMIT) {
        let data = await this.fetchMyBlooprintsList(params)
        if (data['data'].length > 0) {
          this.myBlooprintList = this.myBlooprintList.concat(data['data'])
        }
        let myBlooprintsLengthAfterLoad = this.myBlooprintList.length

        if (myBlooprintsLengthBeforeLoad == myBlooprintsLengthAfterLoad) {
          if (myBlooprintsLengthBeforeLoad > 0) {
            this.noMoreResults = true
          }
          this.$refs.infiniteScroll.stop()
        }
      }
      done()
    }
  }
}
</script>
