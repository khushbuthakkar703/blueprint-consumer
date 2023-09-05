<template>
  <q-dialog v-model="showTaskPopup" persistent :maximized="isMobileView">
    <q-card class="task-dialog-card" :class="loading ? 'loading-class' : ''">
      <q-card-actions align="right" class="close-icon">
        <q-btn
          icon="close"
          flat
          round
          dense
          @click="onPopupClose('manual')"
          style="color: #152141"
          v-close-popup
        />
      </q-card-actions>
      <div class="scroll-area">
        <q-card-section class="row items-center q-pb-none">
          <div
            class="text-regalBlue f-w-600 task-title word-break-break-word ellipsis-2-lines"
          >
            {{ taskSelected['name'] }}
          </div>
        </q-card-section>
        <q-card-section>
          <div v-if="taskDetails['attributes']">
            <div
              v-for="(tasks, index) in taskDetails['attributes']['fields']"
              :key="tasks.order"
              :class="
                index + 1 == taskDetails['attributes']['fields'].length
                  ? null
                  : 'task-details-margin'
              "
            >
              <div class="img-video-container" v-if="tasks.type == 'video'">
                <video
                  id="video"
                  class="img-video-iframe"
                  controls
                  muted
                  style="border-radius: 20px;"
                >
                  <source :src="tasks.value" type="video/mp4" />
                </video>
              </div>
              <div
                v-if="tasks.type == 'text'"
                v-html="tasks.value"
                class="f-w-400 text-content-style text-black word-break-break-word"
              ></div>
              <div v-if="tasks.type == 'attachment'">
                <!-- <q-icon color="primary" size="md" left name="description" /> -->
                <q-avatar
                  class="q-mr-md text-primary attach-icon-style"
                  size="md"
                >
                  <img class="text-primary" src="~assets/attach-clip.svg" />
                </q-avatar>
                <a
                  target="_blank"
                  :href="tasks.value"
                  class="anchor text-primary word-break-break-word"
                  >{{ getFileName(tasks.value) }}</a
                >
              </div>
              <div v-if="tasks.type == 'divider'">
                <q-separator
                  style="height: 2px"
                  color="solitudeBlue"
                  class="q-my-md"
                />
              </div>
              <div v-if="tasks.type == 'audio'">
                <audio
                  controls
                  id="audio"
                  class="full-width"
                  :src="tasks.value"
                />
              </div>
              <div class="img-video-container" v-if="tasks.type == 'image'">
                <q-img class="img-video-iframe" :src="tasks.value" cover />
              </div>
            </div>
            <!-- High Resolution view -->
            <div class="row q-mt-xl btns-hide-low-resol">
              <div class="close-btn-p-r">
                <q-btn
                  label="Close"
                  class="f-w-600 close-button text-primary bg-white text-body1"
                  no-caps
                  unelevated
                  :ripple="false"
                  @click="onPopupClose('manual')"
                  v-close-popup
                >
                </q-btn>
              </div>
              <div class="col text-right">
                <q-btn
                  :label="isTaskCompleted ? 'Completed' : 'Task Complete'"
                  class="f-w-600 full-width task-complete-btn q-pl-xs text-white text-body1"
                  :class="isTaskCompleted ? 'bg-shamrockGreen' : 'bg-primary'"
                  no-caps
                  unelevated
                  :ripple="false"
                  @click="onMarkAsCompleteClick"
                >
                  <div class="text-white relative-position">
                    <q-icon
                      class="q-ml-sm"
                      :class="isTaskCompleted ? null : 'arrow'"
                      size="sm"
                      :name="isTaskCompleted ? 'task_alt' : 'chevron_right'"
                    />
                  </div>
                </q-btn>
              </div>
            </div>
            <!-- IPHONE  5 View -->
            <div class="row q-mt-xl btns-show-low-resol">
              <div class="col-12">
                <q-btn
                  label="Close"
                  class="f-w-600  close-button text-primary bg-white text-body1 full-width"
                  no-caps
                  unelevated
                  :ripple="false"
                  @click="onPopupClose('manual')"
                  v-close-popup
                >
                </q-btn>
              </div>
              <div class="col-12 q-mt-md">
                <q-btn
                  :label="isTaskCompleted ? 'Completed' : 'Task Complete'"
                  class="f-w-600 full-width task-complete-btn q-pl-xs text-white text-body1"
                  :class="isTaskCompleted ? 'bg-shamrockGreen' : 'bg-primary'"
                  no-caps
                  unelevated
                  :ripple="false"
                  @click="onMarkAsCompleteClick"
                >
                  <div class="text-white relative-position">
                    <q-icon
                      class="q-ml-sm"
                      :class="isTaskCompleted ? null : 'arrow'"
                      size="sm"
                      :name="isTaskCompleted ? 'task_alt' : 'chevron_right'"
                    />
                  </div>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'TaskDetailViewPopup',
  props: [
    'taskSelected',
    'milestoneSelected',
    'isMobileView',
    'blooprintDetails'
  ],
  data() {
    return {
      showTaskPopup: true,
      loading: true,
      taskDetails: {},
      isTaskCompleted: false
    }
  },
  mounted() {
    this.getTaskDetails()
    this.getTaskStatus()
  },
  methods: {
    ...mapActions([
      'fetchTasksDetails',
      'markTaskAsComplete',
      'fetchTaskStatus',
      'setToastMessage'
    ]),
    async getTaskDetails() {
      this.loading = true
      let taskData = await this.fetchTasksDetails({
        milestoneId: this.milestoneSelected['id'],
        taskId: this.taskSelected['id']
      })
      if (taskData['id']) {
        this.taskDetails = taskData
      }
      this.loading = false
    },
    getFileName(url) {
      let fileURL = url.substring(url.lastIndexOf('%2F') + 3, url.length)
      let fileName = fileURL.split('?alt')
      let decodedFileName = decodeURIComponent(fileName[0])
      return decodedFileName
    },
    async getTaskStatus() {
      let data = await this.fetchTaskStatus({
        taskId: this.taskSelected['id']
      })
      if (data && data['attributes']) {
        this.isTaskCompleted = data['attributes']['status'] == 'done'
      }
    },
    async onMarkAsCompleteClick() {
      if (this.blooprintDetails['attributes']['scheduled']) {
        if (!this.isTaskCompleted) {
          let params = {
            data: {
              type: 'schedule',
              attributes: {
                status: 'done'
              }
            },
            taskId: this.taskSelected['id']
          }
          let data = await this.markTaskAsComplete(params)
          if (data) {
            this.isTaskCompleted = true
          }
          this.onPopupClose('onupdate')
        } else {
          this.setToastMessage({
            type: 'positive',
            message: 'This task is already marked as complete'
          })
        }
      } else {
        this.onPopupClose('onupdate')
        this.$root.$emit('BlooprintProgressinfoCard')
      }
    },
    onPopupClose(type) {
      if (type == 'manual') {
        this.$emit('on-popup-close')
      } else {
        this.$emit('on-popup-close', { isTaskCompleted: this.isTaskCompleted })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.loading-class {
  min-height: 60vh;
  min-width: 80vh;
  @media only screen and (max-width: $breakpoint-md-max) {
    min-width: 70vh;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    min-width: 0px;
  }
}
.task-dialog-card {
  box-shadow: 0px 10px 20px $shadow;
  border-radius: 20px;
  padding: 21px 30px 30px 30px !important;
  .q-card__section--vert {
    padding: 0px !important;
  }
  .q-card__actions {
    padding: 0px !important;
  }
  @media only screen and (max-width: $breakpoint-md-max) {
    max-height: 90vh;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    max-height: none;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 7px 16px 16px 16px !important;
    max-height: none;
  }
  .scroll-area {
    @media only screen and (min-width: 1024px) {
      max-height: 70vh !important;
      overflow-y: auto !important;
      padding: 0px 30px;
    }
    &::-webkit-scrollbar-track {
      margin: 0px;
    }
  }
  @media only screen and (min-width: 1024px) {
    overflow-y: hidden !important;
    padding-right: 0px !important;
    padding-left: 0px !important;
  }
  .close-icon {
    @media only screen and (min-width: 1024px) {
      padding-right: 30px !important;
    }
  }
}
.task-title {
  font-size: 32px;
  line-height: 40px;
  margin-bottom: 32px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 24px;
  }
}
.text-content-style {
  font-size: 16px;
  line-height: 24px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 14px;
    line-height: 22px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 14px;
    line-height: 22px;
  }
}
.task-details-margin {
  margin-bottom: 32px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-bottom: 24px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-bottom: 24px;
  }
}

.close-btn-p-r {
  padding-right: 40px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-right: 24px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-right: 24px;
  }
}
::v-deep {
  .task-complete-btn {
    border-radius: 10px;
    height: 44px;
    .q-btn__wrapper {
      padding: 10px 20px 10px 30px !important;
      @media only screen and (max-width: $breakpoint-sm-max) {
        padding: 8px 10px 8px 20px !important;
      }
      @media only screen and (max-width: $breakpoint-xs-max) {
        padding: 8px 10px 8px 20px !important;
      }
    }
    @media only screen and (max-width: $breakpoint-sm-max) {
      border-radius: 5px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      border-radius: 5px;
    }
  }
  .close-button {
    border: 2px solid $primary;
    border-radius: 10px;
    height: 44px;
    .q-btn__wrapper {
      padding: 8px 30px !important;
      @media only screen and (max-width: $breakpoint-sm-max) {
        padding: 8px 20px !important;
      }
      @media only screen and (max-width: $breakpoint-xs-max) {
        padding: 8px 20px !important;
      }
    }
    @media only screen and (max-width: $breakpoint-sm-max) {
      border-radius: 5px;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      border-radius: 5px;
    }
  }
}
.q-dialog__inner--minimized > div {
  max-width: 884px !important;
}
.skeleton-width {
  width: 700px;
  @media only screen and (max-width: $breakpoint-md-max) {
    width: 700px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: auto;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: auto;
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
  margin: 20px 0px;
}
.btns-hide-low-resol {
  // display: block;
  @media only screen and (max-width: 359px) {
    display: none;
  }
}
.btns-show-low-resol {
  display: none;
  @media only screen and (max-width: 359px) {
    display: block;
  }
}
.img-video-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  @media only screen and (max-width: $breakpoint-md-max) {
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-top: 75%; /* 4:3 Aspect Ratio */
  }
}
.img-video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.attach-icon-style {
  border-radius: initial !important;
}
</style>
<style lang="scss">
.q-dialog__backdrop {
  background: #152141;
  opacity: 0.7;
}
</style>
