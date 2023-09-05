<template>
  <q-page>
    <q-skeleton class="full-width" type="QToolbar" v-if="loading" />
    <Header
      v-else
      :title="headerTitle"
      titleClass="text-h6"
      :back-target="backTargetUrl"
      showBackIcon="true"
      wishlistMenu="true"
      :blooprint="blooprintData"
    />
    <div class="flex column q-ma-md">
      <q-skeleton
        class="q-mt-sm img-border"
        height="150px"
        v-if="loading"
        square
      />
      <q-img
        v-else
        :ratio="11 / 5"
        class="q-mt-sm full-width img-border"
        :src="blooprintData['attributes']['banner']"
      />
      <div class="q-mx-sm">
        <div class="row q-mt-sm">
          <div class="col-8 text-primary">
            <q-skeleton
              v-if="loading"
              type="text"
              width="50%"
              class="text-subtitle1"
            />
            <div
              v-else
              class="text-weight-bold text-nightRider word-break-break-word"
            >
              {{ blooprintData['attributes'].name }}
            </div>
          </div>
          <div class="col text-right">
            <q-skeleton
              v-if="loading"
              type="text"
              class="text-subtitle1 q-mr-sm"
            />
            <RatingIcon
              v-else
              color="primary"
              ratingClass="q-mr-sm"
              :ratingValue="ratingValue"
              iconSize="16px"
              :isReadOnly="isRatingReadOnly"
              @fetch-rating="fetchRating"
              @click="onRatingClick"
            />
          </div>
        </div>
        <q-skeleton v-if="loading" class="q-mt-xs q-mb-sm" type="text" />
        <div
          v-else
          class="text-grey q-mt-xs q-mb-sm text-caption word-break-break-word"
          @click="showAuthorProfile(blooprintData)"
        >
          Creator {{ blooprintData['attributes']['authorName'] }}
        </div>
        <q-skeleton v-if="loading" class="q-mt-sm q-mb-md" type="QInput" />
        <div v-else class="text-dimGrey q-mt-sm q-mb-md word-break-break-word">
          {{ blooprintData['attributes'].description }}
        </div>
        <div class="q-my-xs">
          <q-skeleton
            v-if="loading"
            class="q-mt-sm img-border"
            height="150px"
            square
          />

          <div v-else>
            <video
              v-if="blooprintData['attributes'].video"
              id="video"
              width="100%"
              height="200px"
              controls
              muted
            >
              <source
                :src="blooprintData['attributes'].video"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <div v-if="loading">
          <div class="q-my-sm row" v-for="i in 8" :key="i">
            <q-skeleton class="q-mr-sm col-3" size="30px" />
            <q-skeleton class="col full-width" />
          </div>
        </div>
        <div
          v-else
          class="text-nightRider q-my-sm text-body1"
          v-for="milestone in milestonesList"
          :key="milestone.id"
        >
          <q-list class="rounded-borders milestone-task">
            <q-expansion-item>
              <template v-slot:header>
                <q-item-section avatar class="no-padding">
                  <q-avatar
                    class="q-mr-sm text-charcoal text-weight-bold bg-solitude"
                    square
                    size="35px"
                    >{{ milestone.attributes.order }}
                  </q-avatar>
                </q-item-section>
                <q-item-section class="text-nightRider word-break-break-word">
                  {{ milestone.attributes.name }}
                </q-item-section>
              </template>
              <q-list class="rounded-borders">
                <q-item
                  v-ripple
                  v-for="task in milestone.attributes.tasks"
                  :key="task.id"
                >
                  <q-item-section class="row flex text-center justify-between">
                    <div
                      class="
                        row
                        text-nightRider
                        q-mt-xs q-pl-md-md q-pl-sm-sm q-pl-xs-sm
                      "
                      :class="
                        blooprintData['attributes']['purchased']
                          ? 'cursor-pointer'
                          : null
                      "
                      @click="onTaskSelect(task, milestone)"
                    >
                      <div class="col-md-1 col-sm-1 col-xs-2 text-left">
                        <q-avatar size="14px" color="primary" class="q-mr-md" />
                      </div>
                      <div
                        class="col-md-10 col-sm-10 col-xs-8 text-left word-break-break-word"
                      >
                        {{ task.name }}
                      </div>
                      <div class="col-md-1 col-sm-1 col-xs-2 text-right">
                        {{ task.days }}
                        <span>day</span>
                        <span :class="task.days > 1 ? null : 'invisible'"
                          >s
                        </span>
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import Header from 'components/Header.vue'
import { mapActions, mapGetters } from 'vuex'
import RatingIcon from 'components/RatingIcon.vue'

export default {
  data() {
    return {
      blooprintId: '',
      loading: true,
      blooprintData: {},
      isRatingReadOnly: true,
      headerTitle: '',
      ratingValue: 0,
      backTargetUrl: '/blooprint/feature',
      milestonesList: []
    }
  },
  components: {
    Header,
    RatingIcon
  },
  computed: {
    ...mapGetters(['navigateBackScreen', 'errorInGettingBlooprintById'])
  },
  mounted() {
    this.getBlooprintId()
    if (this.navigateBackScreen) {
      this.backTargetUrl = this.navigateBackScreen
    } else {
      this.backTargetUrl = `/blooprint/feature`
    }
  },
  methods: {
    ...mapActions([
      'getBlooprintDetailsById',
      'fetchAllMilestonesByBlooprintId',
      'isAPIResponseFailed'
    ]),
    //   ************** Method to fetch Blooprint Details By Id **********************
    async getBlooprintId() {
      this.loading = true
      this.blooprintId = this.$route.params['id']
      let data = await this.getBlooprintDetailsById()
      if (data['attributes']) {
        this.loading = false
        this.blooprintData = data
        this.headerTitle = this.blooprintData['attributes']['name']
        this.getAllMilestonesByBlooprintId()
      }
    },
    // **************** Method to fetch the Milestones List Based on ID ***************************
    async getAllMilestonesByBlooprintId() {
      this.loading = true
      let list = await this.fetchAllMilestonesByBlooprintId()
      this.loading = false
      this.milestonesList = list
    },
    fetchRating(event) {
      this.ratingValue = event['value']
    },
    onRatingClick() {
      this.$router.push({
        name: 'mobile-blooprint-reviews',
        params: {
          blooprintId: this.$router.history.current.params.blooprintId
        }
      })
    },
    showAuthorProfile(blooprint) {
      this.$router.push({
        name: 'profile',
        params: {
          profileId: blooprint['attributes']['authorID']
        }
      })
    },
    onTaskSelect(task, milestone) {
      if (this.blooprintData['attributes']['purchased']) {
        this.$router.push({
          name: 'mobile-blooprint-task-page',
          params: {
            blooprintId: this.blooprintData['id'],
            milestoneId: milestone['id'],
            taskId: task['id']
          }
        })
      }
    }
  },
  watch: {
    errorInGettingBlooprintById() {
      let error = !!this.errorInGettingBlooprintById.length
      this.isAPIResponseFailed(error)
    }
  }
}
</script>
<style lang="scss">
.img-border {
  border-radius: 8px;
}
.milestone-task {
  .q-item {
    padding: 0px 0px !important;
  }
}
</style>
