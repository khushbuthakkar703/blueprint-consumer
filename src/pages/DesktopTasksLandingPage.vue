<template>
  <q-page>
    <DesktopTaskSkeleton v-if="isLoading" />
    <div class="row q-mx-md-xl q-mx-sm-lg q-mx-xs-lg" v-else>
      <div
        class="col-md-8 col-sm-12 col-xs-12 shadow-1 bg-white q-mb-xl q-pa-md-lg q-pa-sm-md q-pa-xs-md"
      >
        <div class="row q-mt-lg">
          <div class="col">
            <div
              class="text-bold text-nightRider word-break-break-word"
              style="font-size:32px"
            >
              {{ blooprintDetails['attributes']['name'] }}
            </div>
          </div>
          <div class="col text-right side-drawer">
            <q-btn
              class="lt-md"
              flat
              @click="displayDrawerMenu = !displayDrawerMenu"
              round
              dense
              icon="menu"
            />
          </div>
        </div>
        <div class="row q-mt-lg">
          <div
            class="col-md-9 col-sm-9 col-xs-12 text-nightRider text-body1 word-break-break-word"
          >
            <q-avatar
              class="q-mr-sm text-body1 text-charcoal text-weight-bold bg-solitude"
              square
              size="35px"
              >{{ mileStoneSelected['attributes']['order'] }}
            </q-avatar>
            {{ mileStoneSelected['attributes']['name'] }}
          </div>
          <div
            class="col-md col-sm col-xs-12 text-right"
            v-if="isBlooprintScheduledEarlier"
          >
            <q-btn
              no-caps
              flat
              outline
              label="Manage Schedule"
              class="text-dimGrey text-body2 bg-white border-secondary"
              @click="onMangeScheduleButtonClick"
            >
              <q-icon class="q-ml-xs" size="15px" name="calendar_today" />
            </q-btn>
          </div>
        </div>
        <div class="q-mt-sm text-body1 text-dimGrey word-break-break-word">
          <q-avatar size="14px" color="primary" class="q-ml-sm q-mr-md" />
          {{ blooprintTasksDetails['attributes']['name'] }}
          <div class="text-grey text-caption">
            <q-avatar size="14px" class="q-ml-sm q-mr-md" />
            {{ blooprintTasksDetails['attributes']['days'] }}
            {{
              blooprintTasksDetails['attributes']['days'] > 1 ? 'days' : 'day'
            }}
          </div>
          <div
            v-for="tasks in blooprintTasksDetails['attributes']['fields']"
            :key="tasks.order"
          >
            <div class="q-mt-md" v-if="tasks.type == 'video'">
              <video
                class="rounded-borders"
                id="video"
                width="100%"
                aspect-ratio="21/9"
                controls
                muted
              >
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
              <span
                class="cursor-pointer text-primary"
                @click="openFile(tasks.value)"
              >
                {{ getFileName(tasks.value) }}
              </span>
            </div>
            <div class="q-mt-md" v-if="tasks.type == 'divider'">
              <q-separator color="blue" class="q-my-md" />
            </div>
            <div class="q-mt-md" v-if="tasks.type == 'audio'">
              <audio
                controls
                id="audio"
                class="full-width"
                :src="tasks.value"
              />
            </div>
            <div class="q-mt-md img-style" v-if="tasks.type == 'image'">
              <q-img
                class="full-height full-width rounded-borders"
                fit="fill"
                :ratio="21 / 9"
                cover
                :src="tasks.value"
              />
            </div>
          </div>
          <div class="row q-mt-lg">
            <div
              class="col-md col-sm col-xs-12 q-mb-xs-sm"
              v-if="isBlooprintScheduledEarlier"
            >
              <q-btn
                no-caps
                flat
                outline
                size="16px"
                class="text-dimGrey text-body2 bg-white border-secondary"
                @click="onMarkAsCompleteClick"
              >
                <q-icon
                  v-if="isTaskCompleted"
                  color="primary"
                  left
                  name="done"
                />
                <div>Mark as Complete</div>
              </q-btn>
            </div>
            <div class="col-md col-sm col-xs-12 text-right">
              <q-btn
                no-caps
                flat
                outline
                label="Previous"
                class="text-dimGrey text-body2 bg-white border-secondary btn-width"
                @click="onPreviousClick"
                :disable="isPreviousButtonDisable"
              />
              <q-btn
                no-caps
                flat
                outline
                label="Next"
                class="text-dimGrey q-ml-sm text-body2 bg-white border-secondary btn-width"
                @click="onNextClick"
                :disable="isNextButtonDisable"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- **************** Blooprint MileStone List *************************** -->
      <div
        class="col-md-4 col-sm-12 col-xs-12 q-pl-md-xl q-py-lg"
        v-if="!isLoading"
      >
        <DesktopBlooprintMilestoneList
          class="gt-sm"
          :blooprintDetails="blooprintDetails"
          :blooprintMileStoneList="blooprintMileStoneList"
          :displayDrawerMenu="displayDrawerMenu"
        />
      </div>
      <q-drawer
        side="right"
        v-model="displayDrawerMenu"
        :show-if-above="false"
        :breakpoint="1022"
        bordered
        overlay
        :no-swipe-backdrop="true"
        class="bg-grey-3 drawer-width"
        @hide="onDrawerHide"
      >
        <q-scroll-area class="fit">
          <DesktopBlooprintMilestoneList
            class="q-px-sm-md q-px-xs-md"
            :blooprintDetails="blooprintDetails"
            :blooprintMileStoneList="blooprintMileStoneList"
            :displayDrawerMenu="displayDrawerMenu"
            @close-drawer-menu="closeDrawerMenu"
          />
        </q-scroll-area>
      </q-drawer>
    </div>
    <!-- ******************** Manage Blooprint Schedule Popup *********************************** -->
    <q-dialog
      no-esc-dismiss
      no-backdrop-dismiss
      v-model="openManageSchedulePopup"
      v-if="openManageSchedulePopup"
    >
      <q-card style=" width: 874px;max-width: 500px;">
        <q-card-section class="bg-white full-height">
          <div class="row relative-position">
            <div
              class="text-font text-nightRider text-bold q-ml-xs col-10 word-break-break-word"
            >
              Schedule {{ blooprintDetails['attributes']['name'] }}
            </div>
            <q-btn
              icon="close"
              class="text-nightRider"
              style="position:absolute; right:0"
              flat
              round
              dense
              @click="closeManageSchedulePopup"
            />
          </div>
          <div class="q-mx-md-xl q-mx-xs-lg q-mx-sm-lg q-px-md-xl q-px-xs-md">
            <DateandTimePicker
              :label="'Reschedule On'"
              :isApplyButtonClicked="isApplyButtonClicked"
              @on-date-time-select="onDateTimeSelect"
            />
            <q-btn
              unelevated
              label="Apply"
              type="submit"
              size="md"
              no-caps
              class="full-width q-my-md q-pa-xs flat bg-primary rounded-borders text-white"
              @click="onRescheduleClick"
            />
            <q-btn
              unelevated
              label="Change Complete Schedule"
              type="submit"
              size="md"
              no-caps
              class="full-width q-mb-md q-pa-xs flat bg-primary rounded-borders text-white"
              @click="changeCompleteSchedule"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog no-esc-dismiss no-backdrop-dismiss v-model="openSchedulePopup">
      <ScheduleBlooprintPopup
        requestFrom="desktop"
        :blooprintSelected="blooprintDetails"
        @schedule-popup-close="onSchedulePopupClose"
      />
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import DesktopTaskSkeleton from './DesktopTaskSkeleton.vue'
import DateandTimePicker from 'components/DateandTimePicker.vue'
import ScheduleBlooprintPopup from 'components/ScheduleBlooprintPopup.vue'
import DesktopBlooprintMilestoneList from './DesktopBlooprintMilestoneList.vue'
import { constants } from 'src/utils/common'
import { convertDateToUTCFormat } from '../utils/common'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      blooprintMileStoneList: [],
      blooprintDetails: {},
      blooprintTasksDetails: {},
      isLoading: true,
      mileStoneSelected: {},
      milestoneTasksList: [],
      isPreviousButtonDisable: false,
      isNextButtonDisable: false,
      openManageSchedulePopup: false,
      dateSelected: '',
      isApplyButtonClicked: false,
      openSchedulePopup: false,
      displayDrawerMenu: false,
      isTaskCompleted: false,
      isBlooprintScheduledEarlier: true
    }
  },
  components: {
    DesktopTaskSkeleton,
    DateandTimePicker,
    ScheduleBlooprintPopup,
    DesktopBlooprintMilestoneList
  },
  mounted() {
    this.getBlooprintDetails()
  },
  watch: {
    $route: 'getBlooprintDetails'
  },
  computed: {
    ...mapGetters(['loggedInUserData'])
  },
  methods: {
    ...mapActions([
      'fetchTasksDetails',
      'fetchAllMilestonesByBlooprintId',
      'getBlooprintDetailsById',
      'markTaskAsComplete',
      'fetchTaskStatus',
      'scheduleBlooprintTask',
      'fetchBlooprintSchedule',
      'setToastMessage'
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
      this.isLoading = true
      let data = await this.fetchTasksDetails()
      this.isLoading = false
      this.blooprintTasksDetails = data
      this.fetchSelectedMilestoneDetails()
    },
    fetchSelectedMilestoneDetails() {
      this.blooprintMileStoneList.forEach(milestone => {
        milestone['attributes']['tasks'].forEach(task => {
          if (task['id'] == this.blooprintTasksDetails['id']) {
            this.mileStoneSelected = milestone
          }
        })
      })
      this.disablePreviousButton()
      this.disableNextButton()
    },
    onTaskSelect(task, milestone) {
      if (this.blooprintDetails['attributes']['purchased']) {
        this.$router.push({
          name: 'desktop-blooprint-task-landing-page',
          params: {
            blooprintId: this.blooprintDetails['id'],
            milestoneId: milestone['id'],
            taskId: task['id']
          }
        })
      }
    },
    getFileName(url) {
      let fileURL = url.substring(url.lastIndexOf('%2F') + 3, url.length)
      let fileName = fileURL.split('?alt')
      let decodedFileName = decodeURIComponent(fileName[0])
      return decodedFileName
    },
    onPreviousClick() {
      let filterList = this.milestoneTasksList.findIndex(
        ele => ele.taskId == this.blooprintTasksDetails['id']
      )
      if (filterList > 0) {
        this.$router.push({
          name: 'desktop-blooprint-task-landing-page',
          params: {
            blooprintId: this.blooprintDetails['id'],
            milestoneId: this.milestoneTasksList[filterList - 1]['milestoneId'],
            taskId: this.milestoneTasksList[filterList - 1]['taskId']
          }
        })
      }
    },
    onNextClick() {
      let filterList = this.milestoneTasksList.findIndex(
        ele => ele.taskId == this.blooprintTasksDetails['id']
      )
      if (filterList < this.milestoneTasksList.length - 1) {
        this.$router.push({
          name: 'desktop-blooprint-task-landing-page',
          params: {
            blooprintId: this.blooprintDetails['id'],
            milestoneId: this.milestoneTasksList[filterList + 1]['milestoneId'],
            taskId: this.milestoneTasksList[filterList + 1]['taskId']
          }
        })
      }
    },
    disablePreviousButton() {
      let filterIndex = this.milestoneTasksList.findIndex(
        ele => ele.taskId == this.blooprintTasksDetails['id']
      )
      this.isPreviousButtonDisable = filterIndex == 0
    },
    disableNextButton() {
      let filterIndex = this.milestoneTasksList.findIndex(
        ele => ele.taskId == this.blooprintTasksDetails['id']
      )
      this.isNextButtonDisable =
        filterIndex + 1 == this.milestoneTasksList.length
    },
    async getTaskStatus() {
      let data = await this.fetchTaskStatus()
      if (data && data['attributes']) {
        this.isTaskCompleted = data['attributes']['status'] == 'done'
      }
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
      }
    },
    onDateTimeSelect(event) {
      this.dateSelected = event
    },
    onMangeScheduleButtonClick() {
      if (this.isBlooprintScheduledEarlier) {
        this.openManageSchedulePopup = true
      } else {
        this.setToastMessage({
          type: 'negative',
          message:
            'Blooprint was not yet scheduled. So you cannot schedule the task now.'
        })
      }
    },
    async getBlooprintSchedule() {
      let data = await this.fetchBlooprintSchedule(this.blooprintDetails['id'])
      if (data['attributes'] && data['attributes']['days'] == null) {
        this.isBlooprintScheduledEarlier = false
      }
    },
    async onRescheduleClick() {
      this.isApplyButtonClicked = true
      if (this.dateSelected != '') {
        let params = {
          data: {
            type: 'schedule',
            attributes: {
              startDate: convertDateToUTCFormat(
                this.dateSelected,
                this.loggedInUserData['timeZone']
              )
            }
          }
        }
        let data = await this.scheduleBlooprintTask(params)
        if (data) {
          this.openManageSchedulePopup = false
          this.dateSelected = ''
          this.isApplyButtonClicked = false
        }
      }
    },
    openFile(filePath) {
      window.open(filePath)
    },
    closeManageSchedulePopup() {
      this.isApplyButtonClicked = false
      this.openManageSchedulePopup = false
    },
    changeCompleteSchedule() {
      this.openManageSchedulePopup = false
      this.openSchedulePopup = true
    },
    // ******* Triggers when the popup is closed ******************************
    onSchedulePopupClose(event) {
      this.openSchedulePopup = false
    },
    // ************* Triggers when Drawer hides *******************
    onDrawerHide() {
      this.displayDrawerMenu = false
    },
    closeDrawerMenu(event) {
      this.displayDrawerMenu = false
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-width {
  width: 30%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 35%;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 45%;
  }
}
// .img-style {
//   // height: 250px;
//   // max-width: 600px;
//   @media only screen and (max-width: $breakpoint-sm-max) {
//     height: 300px;
//   }
//   @media only screen and (max-width: $breakpoint-xs-max) {
//     height: 300px;
//   }
// }
video {
  object-fit: cover;
  max-height: 400px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-height: 300px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    max-height: 300px;
  }
}
.side-drawer {
  position: fixed;
  right: 0;
  background: #dfe6ee;
  border-radius: 6px 0px 0px 6px;
  padding-right: 6px;
  border: 1px solid #bbbbbb;
}
.drawer-width {
  width: 80vw;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 80vw;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 46vw;
  }
}
</style>
