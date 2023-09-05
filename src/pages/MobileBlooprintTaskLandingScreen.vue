<template>
  <q-page>
    <div class="q-my-sm row" v-if="loading">
      <q-skeleton type="QToolbar" class="full-width" />
    </div>
    <Header
      v-else
      :title="blooprintDetails['attributes']['name']"
      titleClass="text-subtitle2 q-pt-md"
      :back-target="navigateBackUrl"
      showBackIcon="true"
      @menu-click="onMenuClick"
      :settingsMenu="isBlooprintScheduledEarlier"
    />
    <div class="q-ma-md" v-if="loading">
      <div class="q-my-sm row">
        <q-skeleton class="q-mr-sm col-3" size="30px" />
        <q-skeleton class="col full-width" />
      </div>
      <div class="q-mt-sm q-mb-md row">
        <q-skeleton class="q-mr-sm col-3" type="circle" size="30px" />
        <q-skeleton class="col full-width" />
      </div>
      <q-skeleton class="rounded-borders q-mt-lg" height="100px" square />
      <q-skeleton class="q-mt-lg" height="130px" square />
      <q-skeleton class="q-mt-lg" height="130px" square />
      <q-skeleton class="q-mt-lg" type="QToolbar" />
      <q-skeleton class="q-mt-lg" type="QToolbar" />
      <q-skeleton class="q-mt-lg" height="100px" square />
    </div>
    <div class="q-ma-md" v-else>
      <div class="text-nightRider text-body1 word-break-break-word">
        <q-avatar
          class="q-mx-sm text-weight-bold bg-solitude"
          square
          size="35px"
          >{{ mileStoneSelected['attributes']['order'] }}</q-avatar
        >
        {{ mileStoneSelected['attributes']['name'] }}
      </div>
      <div class="text-nightRider row text-body1 q-ma-md">
        <div class="col word-break-break-word">
          <q-avatar
            size="16px"
            class="q-mr-md"
            color="primary"
            text-color="white"
          />
          {{ taskDetails['attributes']['name'] }}
        </div>
        <div class="col-3 text-right">
          {{ taskDetails['attributes']['days'] }} day{{
            taskDetails['attributes']['days'] > 1 ? 's' : ''
          }}
        </div>

        <!-- <div class="col-1 text-right" v-if="taskDetails.Attachment != ''">
          <q-icon name="attach_file" @click="viewAttachment" />
        </div> -->
      </div>
      <div
        v-for="tasks in taskDetails['attributes']['fields']"
        :key="tasks.order"
      >
        <div class="q-mt-sm" v-if="tasks.type == 'video'">
          <video id="video" width="100%" height="200px" controls muted>
            <source :src="tasks.value" type="video/mp4" />
          </video>
        </div>
        <div
          v-if="tasks.type == 'text'"
          class="q-mt-md text-dimGrey word-break-break-word"
        >
          {{ tasks.value }}
        </div>
        <div class="q-mt-md" v-if="tasks.type == 'attachment'">
          <q-icon color="primary" size="md" left name="description" />
          <a target="_blank" :href="tasks.value" class="anchor text-primary">{{
            getFileName(tasks.value)
          }}</a>
        </div>
        <div class="q-mt-md" v-if="tasks.type == 'divider'">
          <q-separator color="blue" class="q-my-md" />
        </div>
        <div class="q-mt-md" v-if="tasks.type == 'audio'">
          <audio controls id="audio" class="full-width" :src="tasks.value" />
        </div>
        <div class="q-mt-md img-style" v-if="tasks.type == 'image'">
          <q-img class="full-height" :ratio="16 / 9" :src="tasks.value" />
        </div>
      </div>
    </div>
    <q-dialog v-model="dialog" position="bottom" full-width>
      <q-card>
        <q-card-section class="row items-center no-wrap">
          <q-list dense padding class="rounded-borders">
            <q-item
              clickable
              v-ripple
              v-for="(item, i) of menuOptionList"
              :key="item['label']"
              @click="onItemSelect(item)"
            >
              <q-item-section class="text-primary q-my-sm">
                <div>
                  <q-icon
                    v-if="i == 0 && isTaskCompleted"
                    color="primary"
                    left
                    size="sm"
                    name="done"
                  />
                  {{ item['label'] }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- ******************** Schedule Popup *********************************** -->
    <q-dialog
      maximized
      no-esc-dismiss
      no-backdrop-dismiss
      v-model="schedulePopup"
    >
      <MobileScheduleTaskPopup
        :blooprintDetails="blooprintDetails"
        :mileStoneSelected="mileStoneSelected"
        :taskDetails="taskDetails"
        @on-manage-schedule-close="closeSchedulePopup"
      />
    </q-dialog>
  </q-page>
</template>
<script>
import Header from '../components/Header.vue'
import MobileScheduleTaskPopup from './MobileScheduleTaskPopup.vue'
import { mapActions } from 'vuex'
import { constants } from 'src/utils/common'

export default {
  data() {
    return {
      dialog: false,
      navigateBackUrl: '',
      menuOptionList: [
        { label: 'Mark as Complete', value: 'mark_as_complete' },
        { label: 'Manage Schedule', value: 'manage_schedule' }
      ],
      loading: true,
      blooprintDetails: {},
      blooprintMileStoneList: [],
      milestoneTasksList: [],
      taskDetails: {},
      mileStoneSelected: {},
      isTaskCompleted: false,
      schedulePopup: false,
      isBlooprintScheduledEarlier: true
    }
  },
  components: {
    Header,
    MobileScheduleTaskPopup
  },
  mounted() {
    this.navigateBackUrl = `/mobile/blooprints/${this.$router.history.current.params.blooprintId}`
    this.getBlooprintDetails()
  },
  methods: {
    ...mapActions([
      'getBlooprintDetailsById',
      'fetchAllMilestonesByBlooprintId',
      'fetchTasksDetails',
      'markTaskAsComplete',
      'fetchTaskStatus',
      'setToastMessage',
      'fetchBlooprintSchedule'
    ]),
    async getBlooprintDetails() {
      this.isLoading = true
      let data = await this.getBlooprintDetailsById()
      this.blooprintDetails = data
      if (data['attributes']['purchased']) {
        this.isLoading = false
        this.getMilestoneDetails()
        this.getTaskStatus()
        this.getBlooprintSchedule()
      } else {
        this.$router.replace({ name: constants.PAGE_404 })
      }
    },
    async getMilestoneDetails() {
      this.isLoading = true
      let data = await this.fetchAllMilestonesByBlooprintId()
      this.isLoading = false
      this.blooprintMileStoneList = data
      this.milestoneTasksList = []
      this.blooprintMileStoneList.forEach(milestone => {
        milestone['attributes']['tasks'].forEach(task => {
          this.milestoneTasksList.push({
            milestoneId: milestone['id'],
            milestoneName: milestone['attributes']['name'],
            taskId: task['id']
          })
        })
      })
      this.getTaskDetails()
    },
    async getTaskDetails() {
      this.loading = true
      let taskData = await this.fetchTasksDetails()
      if (taskData['id']) {
        this.loading = false
        this.taskDetails = taskData
      }
      this.fetchSelectedMilestoneDetails()
    },
    fetchSelectedMilestoneDetails() {
      this.blooprintMileStoneList.forEach(milestone => {
        milestone['attributes']['tasks'].forEach(task => {
          if (task['id'] == this.taskDetails['id']) {
            this.mileStoneSelected = milestone
          }
        })
      })
    },
    async getBlooprintSchedule() {
      let data = await this.fetchBlooprintSchedule(this.blooprintDetails['id'])
      if (data['attributes'] && data['attributes']['days'] == null) {
        this.isBlooprintScheduledEarlier = false
      }
    },
    getFileName(url) {
      let fileURL = url.substring(url.lastIndexOf('%2F') + 3, url.length)
      let fileName = fileURL.split('?alt')
      let decodedFileName = decodeURIComponent(fileName[0])
      return decodedFileName
    },
    async getTaskStatus() {
      let data = await this.fetchTaskStatus()
      if (data && data['attributes']) {
        this.isTaskCompleted = data['attributes']['status'] == 'done'
      }
    },
    onMenuClick() {
      this.dialog = true
    },
    onItemSelect(item) {
      if (item['value'] == 'mark_as_complete') {
        this.onMarkAsCompleteClick()
      } else if (item['value'] == 'manage_schedule') {
        if (!this.isBlooprintScheduledEarlier) {
          this.setToastMessage({
            type: 'negative',
            message: `Blooprint was not yet scheduled. So you cannot schedule the task now.`
          })
        } else {
          this.schedulePopup = true
        }
      }
      this.dialog = false
    },
    async onMarkAsCompleteClick() {
      if (!this.isTaskCompleted) {
        let params = {
          data: {
            type: 'schedule',
            attributes: {
              status: 'done'
            }
          }
        }
        let data = await this.markTaskAsComplete(params)
        if (data) {
          this.isTaskCompleted = true
        }
      } else {
        this.setToastMessage({
          type: 'positive',
          message: 'This task is already marked as complete'
        })
      }
    },
    closeSchedulePopup() {
      this.schedulePopup = false
    },
    viewAttachment() {
      window.open(this.taskDetails.Attachment)
    }
  }
}
</script>
<style src="@quasar/quasar-ui-qmediaplayer/dist/index.css"></style>

<style lang="scss" scoped>
.q-dialog__inner--bottom > div {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}
.medaiBorder {
  border: 1px solid $solitude;
  border-radius: 5px !important;
}
.anchor {
  text-decoration-color: $whiteSmoke;
}
</style>
<style lang="scss">
.q-dialog__inner--minimized {
  padding: 0px !important;
}
</style>
