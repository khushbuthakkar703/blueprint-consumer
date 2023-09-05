<template>
  <div class="milestone-screen-style">
    <div class="row">
      <div
        class="col f-w-600 milestone-text-style q-mt-md-xs q-mt-sm-sm q-mt-xs-sm text-regalBlue"
      >
        Milestones
      </div>
      <div class="col text-right" v-if="blooprintMileStoneList.length != 0">
        <q-btn
          :label="
            isAllMilestonesCompleted() && blooprintMileStoneList.length != 0
              ? 'Start again'
              : 'Next task'
          "
          color="primary"
          class="f-w-600  q-pl-xs text-white text-body1"
          :class="
            isAllMilestonesCompleted() && blooprintMileStoneList.length != 0
              ? 'start-again-btn'
              : 'next-task-btn'
          "
          no-caps
          unelevated
          :ripple="false"
          @click="openNextTask"
        >
          <div class="text-white relative-position">
            <q-icon
              class="right-arrow"
              :class="$q.screen.width < 365 ? 'q-ml-xs' : 'q-ml-sm'"
              size="sm"
              name="chevron_right"
            />
          </div>
        </q-btn>
      </div>
    </div>
    <div class="list-margin">
      <div v-if="isMileStoneLoading">
        <div v-for="i in 10" :key="i" class="">
          <q-skeleton type="QBtn" class="q-mb-md full-width" />
        </div>
      </div>
      <NoDataMessageDisplay
        v-if="!isMileStoneLoading && blooprintMileStoneList.length == 0"
      />
      <!-- ***************** MileStone List ********************************** -->
      <q-list
        v-else
        bordered
        class="milestone-list bg-white"
        v-for="(milestone, milestoneIndex) in blooprintMileStoneList"
        :key="milestone.id"
        :class="
          milestoneIndex + 1 == blooprintMileStoneList.length
            ? null
            : 'milestone-bottom'
        "
      >
        <q-expansion-item
          :ref="milestone.id"
          v-model="milestone.isOpened"
          :class="milestone.isOpened ? 'milestone-active' : null"
          @click="onMilestoneSelect(milestone)"
        >
          <template v-slot:header>
            <q-item-section
              avatar
              class="milestone-section-style"
              :class="
                milestone.isOpened ? 'q-pl-md-sm q-pl-sm-sm q-pl-xs-none' : null
              "
            >
              <div class="relative-position order-icon-style">
                <div class="absolute-center text-body1 f-w-600 text-black">
                  {{ milestoneIndex + 1 }}
                </div>
              </div>
            </q-item-section>
            <q-item-section
              class="f-w-600 text-body1 word-break-break-word"
              :class="{
                'text-manateeGrey': milestone.isOpened,
                'text-black': !milestone.isOpened,
                'text-start': $q.screen.gt.sm && $q.screen.width <= 1250
              }"
            >
              <span class="gt-xs">{{ milestone['attributes']['name'] }}</span>
              <span class="lt-sm text-black">
                {{ milestone['attributes']['name'] }}
              </span>
              <!-- <q-tooltip anchor="bottom middle" self="top middle">
                <div class="word-break-break-word">
                  {{ milestone['attributes']['name'] }}
                </div>
              </q-tooltip> -->
            </q-item-section>
            <q-item-section side class="milestone-item-side">
              <div class="row items-center gt-xs">
                <!-- Screen Size is Desktop and < 1250 -->
                <div
                  class="column items-end"
                  v-if="$q.screen.gt.sm && $q.screen.width <= 1250"
                >
                  <div class="f-w-500 text-black text-body1">
                    {{ milestone.attributes.tasks.length }}
                    {{
                      milestone.attributes.tasks.length > 1 ? 'tasks' : 'task'
                    }}
                  </div>
                  <div class="f-w-500 text-black text-body1">
                    {{
                      getTotalTaskDays(milestone) === 0 &&
                      getTotalTaskHours(milestone) === '' &&
                      getTotalTaskMinutes(milestone) === ''
                        ? '0 day'
                        : ''
                    }}
                    {{
                      getTotalTaskDays(milestone) >= 1
                        ? getTotalTaskDays(milestone)
                        : ''
                    }}
                    {{
                      getTotalTaskDays(milestone) > 1
                        ? 'days'
                        : 'day' && getTotalTaskDays(milestone) == 0
                        ? ''
                        : 'day'
                    }}
                    {{
                      getTotalTaskHours(milestone) > 0
                        ? getHours(milestone, null)
                        : ''
                    }}
                    {{
                      getTotalTaskMinutes(milestone) > 0 &&
                      getTotalTaskHours(milestone) > 0
                        ? ':'
                        : ''
                    }}
                    {{
                      getTotalTaskMinutes(milestone) === 0
                        ? ''
                        : getMinutes(milestone, null)
                    }}
                    {{
                      getTotalTaskHours(milestone) == 0 &&
                      getTotalTaskMinutes(milestone) > 0
                        ? getLabel(milestone, 'min')
                        : ''
                    }}
                    {{
                      getTotalTaskHours(milestone) > 0
                        ? getLabel(milestone, 'hr')
                        : ''
                    }}
                  </div>
                </div>
                <!-- Screen size >1250  -->
                <div
                  class="f-w-500 text-black text-body1"
                  v-if="$q.screen.width > 1250 || $q.screen.lt.md"
                >
                  {{ milestone.attributes.tasks.length }}
                  {{ milestone.attributes.tasks.length > 1 ? 'tasks' : 'task' }}
                </div>
                <q-avatar
                  size="8px"
                  class="q-mx-md"
                  color="primary"
                  v-if="$q.screen.width > 1250 || $q.screen.lt.md"
                />
                <div
                  class="f-w-500 text-black text-body1"
                  v-if="$q.screen.width > 1250 || $q.screen.lt.md"
                >
                  {{
                    getTotalTaskDays(milestone) === 0 &&
                    getTotalTaskHours(milestone) === '' &&
                    getTotalTaskMinutes(milestone) === ''
                      ? '0 day'
                      : ''
                  }}
                  {{
                    getTotalTaskDays(milestone) >= 1
                      ? getTotalTaskDays(milestone)
                      : ''
                  }}
                  {{
                    getTotalTaskDays(milestone) > 1
                      ? 'days'
                      : 'day' && getTotalTaskDays(milestone) == 0
                      ? ''
                      : 'day'
                  }}
                  {{
                    getTotalTaskHours(milestone) > 0
                      ? getHours(milestone, null)
                      : ''
                  }}
                  {{
                    getTotalTaskMinutes(milestone) > 0 &&
                    getTotalTaskHours(milestone) > 0
                      ? ':'
                      : ''
                  }}
                  {{
                    getTotalTaskMinutes(milestone) === 0
                      ? ''
                      : getMinutes(milestone, null)
                  }}
                  {{
                    getTotalTaskHours(milestone) == 0 &&
                    getTotalTaskMinutes(milestone) > 0
                      ? getLabel(milestone, 'min')
                      : ''
                  }}
                  {{
                    getTotalTaskHours(milestone) > 0
                      ? getLabel(milestone, 'hr')
                      : ''
                  }}
                </div>
                <q-icon
                  v-if="milestone.isCompleted"
                  size="1.5rem"
                  name="task_alt"
                  style="color: #039855; margin-left:32px"
                />
              </div>
              <div class="row items-center lt-sm">
                <div class="column items-end">
                  <div class="f-w-500 text-black text-fs-14-lh-20 q-mb-xs">
                    {{ milestone.attributes.tasks.length }}
                    {{
                      milestone.attributes.tasks.length > 1 ? 'tasks' : 'task'
                    }}
                  </div>
                  <div class="f-w-500 text-black text-fs-14-lh-20">
                    {{
                      getTotalTaskDays(milestone) === 0 &&
                      getTotalTaskHours(milestone) === '' &&
                      getTotalTaskMinutes(milestone) === ''
                        ? '0 day'
                        : ''
                    }}
                    {{
                      getTotalTaskDays(milestone) >= 1
                        ? getTotalTaskDays(milestone)
                        : ''
                    }}
                    {{
                      getTotalTaskDays(milestone) > 1
                        ? 'days'
                        : 'day' && getTotalTaskDays(milestone) == 0
                        ? ''
                        : 'day'
                    }}
                    {{
                      getTotalTaskHours(milestone) > 0
                        ? getHours(milestone, null)
                        : ''
                    }}
                    {{
                      getTotalTaskMinutes(milestone) > 0 &&
                      getTotalTaskHours(milestone) > 0
                        ? ':'
                        : ''
                    }}
                    {{
                      getTotalTaskMinutes(milestone) === 0
                        ? ''
                        : getMinutes(milestone, null)
                    }}
                    {{
                      getTotalTaskHours(milestone) == 0 &&
                      getTotalTaskMinutes(milestone) > 0
                        ? getLabel(milestone, 'min')
                        : ''
                    }}
                    {{
                      getTotalTaskHours(milestone) > 0
                        ? getLabel(milestone, 'hr')
                        : ''
                    }}
                  </div>
                </div>
                <q-icon
                  v-if="milestone.isCompleted"
                  size="1.5rem"
                  name="task_alt"
                  style="color: #039855;"
                  class="q-ml-md"
                />
              </div>
            </q-item-section>
            <q-separator style="border: 2px solid #E8EDF2;" />
          </template>
          <q-separator class="lt-sm" />
          <!-- ***************** Task List ********************************** -->
          <div class="row justify-center">
            <div v-if="milestone.attributes.video" class="main-container">
              <div class="video-container">
                <video controls="true" class="milestone-video">
                  <source :src="milestone.attributes.video" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          <div class="task-margin">
            <div class="f-w-600 text-body1 text-black word-break-break-word">
              {{ milestone.attributes.title }}
            </div>
            <div
              class="gt-sm q-mb-md-lg q-mb-sm-lg q-mb-xs-md f-w-500 text-body1 text-comet word-break-break-word "
            >
              <div class="q-mt-xs" v-if="milestone.attributes.description">
                {{ milestone.attributes.description }}
              </div>
            </div>
            <div
              class="lt-md q-mb-md-lg q-mb-sm-lg q-mb-xs-md f-w-500 text-body1 text-comet word-break-break-word"
            >
              <div class="q-mt-xs" v-if="milestone.attributes.description">
                {{ milestone.attributes.description }}
              </div>
            </div>
            <q-list
              bordered
              class="task-list"
              v-for="(task, taskIndex) in milestone.attributes.tasks"
              :key="task.id"
              :class="
                taskIndex + 1 == milestone.attributes.tasks.length
                  ? null
                  : 'q-mb-10'
              "
            >
              <q-expansion-item
                v-model="task.isOpened"
                :class="task.isOpened ? 'task-active' : null"
                :ref="task.id"
              >
                <template v-slot:header>
                  <q-item-section avatar class="text-start task-section-style">
                    <div class="relative-position order-icon-style">
                      <div
                        class="absolute-center text-body1 f-w-600 text-black"
                      >
                        {{ alphabet[taskIndex] }}
                      </div>
                    </div>
                  </q-item-section>
                  <q-item-section
                    class="f-w-600 text-black text-body1 word-break-break-word flex-task"
                  >
                    {{ task['name'] }}
                    <!-- <q-tooltip anchor="bottom middle" self="top middle">
                      <div class="word-break-break-word">
                        {{ task['name'] }}
                      </div>
                    </q-tooltip> -->
                    <div class="row items-center">
                      <div
                        class="f-w-500 text-black text-body1 "
                        :class="
                          $q.screen.width < 1250 ? 'text-fs-14-lh-20' : ''
                        "
                      >
                        <!-- {{ task.duration.days }}
                        {{ task.duration.days > 1 ? 'days' : 'day' }}
                        {{ task.duration.hours }}
                        {{ task.duration.hours > 1 ? 'hours' : 'hour' }}
                        {{ task.duration.minutes }}
                        {{ task.duration.minutes > 1 ? 'minutes' : 'minute' }} -->

                        {{
                          task['duration']['days'] > 0
                            ? task['duration']['days']
                            : ''
                        }}
                        {{
                          task['duration']['days'] > 1
                            ? 'days'
                            : 'day' && task['duration']['days'] == 0
                            ? ''
                            : 'day'
                        }}
                        <q-avatar
                          size="8px"
                          class="q-mx-md"
                          color="primary"
                          v-if="
                            (task['duration']['minutes'] > 0 ||
                              task['duration']['hours'] > 0) &&
                              task['duration']['days'] > 0
                          "
                        />
                        {{
                          task['duration']['hours'] > 0
                            ? getHours(
                                task['duration']['hours'],
                                task['duration']['minutes']
                              )
                            : ''
                        }}
                        {{
                          task['duration']['hours'] > 0 &&
                          task['duration']['minutes'] > 0
                            ? ':'
                            : ''
                        }}
                        {{
                          task['duration']['minutes'] > 0
                            ? getMinutes(
                                task['duration']['minutes'],
                                task['duration']['hours']
                              )
                            : ''
                        }}
                        {{
                          task['duration']['hours'] == 0 &&
                          task['duration']['minutes'] > 0
                            ? getLabel(task['duration']['minutes'], 'min')
                            : ''
                        }}
                        {{
                          task['duration']['hours'] > 0
                            ? getLabel(task['duration']['hours'], 'hr')
                            : ''
                        }}
                      </div>
                      <q-icon
                        v-if="task.completed"
                        size="1.5rem"
                        name="task_alt"
                        style="color: #039855;"
                        class="task-complete-icon-style"
                      />
                    </div>
                  </q-item-section>
                </template>
                <div
                  class="q-mt-xs q-mr-lg text-right"
                  style="margin-bottom: 12px"
                >
                  <q-btn
                    :label="task['completed'] ? 'Completed' : 'Start task'"
                    class="f-w-600 gt-sm next-task-btn text-white text-body1"
                    :class="
                      task['completed'] ? 'bg-shamrockGreen' : 'bg-primary'
                    "
                    no-caps
                    @click="onStartTaskClick(milestone, task, 'desktop')"
                  >
                    <div class="text-white relative-position">
                      <q-icon
                        class="q-ml-sm"
                        size="sm"
                        :name="task['completed'] ? 'task_alt' : 'chevron_right'"
                        :class="task['completed'] ? '' : 'right-arrow'"
                      />
                    </div>
                  </q-btn>
                  <q-btn
                    :label="task['completed'] ? 'Completed' : 'Start task'"
                    class="f-w-600 lt-md next-task-btn text-white text-body1"
                    :class="
                      task['completed'] ? 'bg-shamrockGreen' : 'bg-primary'
                    "
                    no-caps
                    @click="onStartTaskClick(milestone, task, 'mobile')"
                  >
                    <div class="text-white relative-position">
                      <q-icon
                        class="q-ml-sm"
                        size="sm"
                        :name="task['completed'] ? 'task_alt' : 'chevron_right'"
                        :class="task['completed'] ? '' : 'right-arrow'"
                      />
                    </div>
                  </q-btn>
                </div>
              </q-expansion-item>
            </q-list>
            <q-btn
              label="Close"
              class="f-w-600 close-btn text-primary bg-white text-body1"
              no-caps
              unelevated
              :ripple="false"
              type="submit"
              @click="closeMilestone(milestone)"
            >
            </q-btn>
          </div>
        </q-expansion-item>
      </q-list>
    </div>
    <TaskDetailsViewPopup
      v-if="showTaskPopup"
      :isMobileView="isMobileView"
      :blooprintDetails="blooprintDetails"
      :milestoneSelected="milestoneSelected"
      :taskSelected="taskSelected"
      @on-popup-close="onPopupClose"
    />
  </div>
</template>
<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll
import TaskDetailsViewPopup from 'components/Desktop/TaskDetailsViewPopup.vue'
import NoDataMessageDisplay from 'components/Desktop/NoDataMessageDisplay.vue'
import { mapActions } from 'vuex'
export default {
  name: 'DesktopMilestonesList',
  props: ['blooprintMileStoneList', 'blooprintDetails', 'isMileStoneLoading'],
  components: {
    TaskDetailsViewPopup,
    NoDataMessageDisplay
  },
  data() {
    return {
      alphabet: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'AA',
        'AB',
        'AC',
        'AD',
        'AE',
        'AF',
        'AG',
        'AH',
        'AI',
        'AJ',
        'AK',
        'AL',
        'AM',
        'AN',
        'AO',
        'AP',
        'AQ',
        'AR',
        'AS',
        'AT',
        'AU',
        'AV',
        'AW',
        'AX',
        'AY',
        'AZ'
      ],
      expanded: false,
      showTaskPopup: false,
      taskSelected: {},
      milestoneSelected: {},
      isMobileView: false,
      counter: 0,
      additionalHours: 0,
      additionalDays: 0
    }
  },
  updated() {
    if (
      !this.isMileStoneLoading &&
      this.blooprintMileStoneList.length > 0 &&
      this.counter == 0
    ) {
      this.counter++
      this.openNextTask()
    }
  },
  methods: {
    ...mapActions(['setToastMessage']),
    isAllMilestonesCompleted() {
      let count = 0
      this.blooprintMileStoneList.map(milestone => {
        if (milestone['isCompleted']) {
          count++
        }
      })
      return count == this.blooprintMileStoneList.length
    },
    getTotalTaskDays(milestone) {
      let totalDays = 0
      let extraHours = 0
      let totalMinutes = 0
      milestone.attributes.tasks.map(item => {
        totalDays = totalDays + item['duration']['days']
        totalMinutes = totalMinutes + item['duration']['minutes']
        extraHours = extraHours + item['duration']['hours']
      })
      const hrs = extraHours / 24
      let totalHours = extraHours + Math.floor(totalMinutes / 60)
      let seconds = Number(totalHours * 60 * 60) // total hours convert into second
      let totalAdditionalDays = Math.floor(seconds / (3600 * 24)) // total second convert into days
      return Math.floor(totalDays + totalAdditionalDays)
    },
    getTotalTaskHours(milestone) {
      let hours = 0
      let totalMinutes = 0
      milestone.attributes.tasks.map(item => {
        hours = hours + item['duration']['hours']
        totalMinutes = totalMinutes + item['duration']['minutes']
      })
      let totalHours = hours + Math.floor(totalMinutes / 60)
      let seconds = Number(totalHours * 60 * 60) // total hours convert into second
      // this.additionalDays = Math.floor(seconds / (3600*24)); // total second convert into days
      var hrs = Math.floor((seconds % (3600 * 24)) / 3600) // seconds convert into hours
      const hour = hrs > 0 ? hrs : ''
      return hour
    },
    getTotalTaskMinutes(milestone) {
      let totalMinutes = 0
      milestone.attributes.tasks.map(item => {
        totalMinutes = totalMinutes + item['duration']['minutes']
      })
      // this.additionalHours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60
      const minute = minutes > 0 ? minutes : ''
      return minute
    },
    retrieveTotalTaskDays(milestone) {
      return (
        (this.getTotalTaskDays(milestone) % 60) +
        Math.trunc(this.getTotalTaskHours(milestone) / 24)
      )
    },
    retrieveTotalTaskHours(milestone) {
      return (
        (this.getTotalTaskHours(milestone) % 24) +
        Math.trunc(this.getTotalTaskMinutes(milestone) / 60)
      )
    },
    onStartTaskClick(milestone, task, reqFrom) {
      if (this.blooprintDetails['attributes']['purchased']) {
        this.taskSelected = task
        this.milestoneSelected = milestone
        this.showTaskPopup = true
        this.isMobileView = reqFrom == 'mobile'
      } else {
        this.setToastMessage({
          type: 'negative',
          message: 'This blooprint is not yet purchased.'
        })
      }
    },
    // ************ Triggers when Close Milestone Button is clicked **********************
    closeMilestone(milestone) {
      milestone.attributes.tasks.map(task => {
        task.isOpened = false
      })
      milestone.isOpened = false
    },
    onPopupClose(event) {
      if (event && event['isTaskCompleted']) {
        this.$emit('on-task-complete', {
          taskSelected: this.taskSelected,
          milestoneSelected: this.milestoneSelected
        })
      }
      setTimeout(() => {
        this.taskSelected = {}
        this.milestoneSelected = {}
        this.showTaskPopup = false
      }, 200)
    },
    onMilestoneSelect(milestone) {
      if (milestone['isOpened']) {
        let count = milestone['isCompleted'] ? 1 : 0
        milestone['attributes']['tasks'].every(task => {
          if (!task['completed'] || count == 1) {
            if (!task['isOpened']) {
              task['isOpened'] = true
              return false
            }
            return true
          }
          return true
        })
      } else {
        milestone['attributes']['tasks'].forEach(task => {
          task['isOpened'] = false
        })
      }
    },
    // ************ Triggers when Next Task Button is clicked **********************
    openNextTask() {
      let isOpened = false
      let count = 0
      this.blooprintMileStoneList.map(milestone => {
        if (milestone['isCompleted']) {
          count++
        }
      })
      this.blooprintMileStoneList.every(milestone => {
        if (
          (!milestone['isCompleted'] &&
            count != this.blooprintMileStoneList.length) ||
          count == this.blooprintMileStoneList.length
        ) {
          if (milestone['isOpened']) {
            milestone['attributes']['tasks'].every(task => {
              if (
                !task['completed'] ||
                count == this.blooprintMileStoneList.length
              ) {
                if (!task['isOpened']) {
                  task['isOpened'] = true
                  isOpened = true
                  //scroll to task
                  this.$nextTick(() => {
                    let scrollRef = task.id
                    let parentRef = milestone.id
                    const ele = this.$refs[scrollRef][0].$el
                    const parentEle = this.$refs[parentRef][0].$el
                    const target = getScrollTarget(ele)
                    const offset = ele.offsetTop + parentEle.offsetTop
                    const duration = 2000
                    setScrollPosition(target, offset, duration)
                  })
                  return false
                }
                return true
              }
              return true
            })
          } else {
            if (!isOpened) {
              milestone['isOpened'] = true
              milestone['attributes']['tasks'].every(task => {
                if (
                  !task['completed'] ||
                  count == this.blooprintMileStoneList.length
                ) {
                  if (!task['isOpened']) {
                    task['isOpened'] = true
                    isOpened = true
                    return false
                  }
                  return true
                }
                return true
              })
              //scroll to milstone
              this.$nextTick(() => {
                let scrollRef = milestone.id
                const ele = this.$refs[scrollRef][0].$el
                const target = getScrollTarget(ele)
                const offset = ele.offsetTop
                const duration = 2000
                setScrollPosition(target, offset, duration)
              })
            }
            return false
          }
        }
        return true
      })
    },
    getNumberLeadingZero(number) {
      return number < 10 ? '0' + number : number
    },
    getHours(milestone, value) {
      const h =
        typeof milestone === 'number'
          ? milestone
          : this.getTotalTaskHours(milestone)
      const m =
        typeof milestone === 'number'
          ? value
          : this.getTotalTaskMinutes(milestone)
      return h
    },
    getMinutes(milestone, value) {
      const h =
        typeof milestone === 'number'
          ? value
          : this.getTotalTaskHours(milestone)
      const m =
        typeof milestone === 'number'
          ? milestone
          : this.getTotalTaskMinutes(milestone)
      if (h > 0 && m > 0) {
        return m < 10 ? '0' + m : m
      } else {
        return m
      }
    },
    getLabel(number, value) {
      const h =
        typeof number === 'number' ? number : this.getTotalTaskHours(number)
      const m =
        typeof number === 'number' ? number : this.getTotalTaskMinutes(number)
      if (value === 'min') {
        return m < 2 ? ' min' : 'mins'
      } else {
        return h < 2 ? ' hr' : 'hrs'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.text-start {
  justify-content: start;
}
.milestone-screen-style {
  @media only screen and (max-width: $breakpoint-md-max) {
    margin-top: 0px;
  }
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 32px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 32px;
  }
}
.milestone-text-style {
  font-size: 24px;
  line-height: 32px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    font-size: 20px;
    line-height: 24px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 20px;
    line-height: 24px;
  }
}
.list-margin {
  margin-top: 32px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 20px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 20px;
    margin-left: -15px;
    margin-right: -15px;
  }
}
.task-margin {
  margin: 8px 24px 24px 24px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin: 16px 15px 24px 15px;
  }
}
.task-section-style {
  min-width: auto !important;
  justify-content: start !important;
  padding-right: 24px;
  @media only screen and (max-width: 374px) {
    padding-right: 8px;
  }
}
.task-complete-icon-style {
  margin-left: 16px;
  @media only screen and (max-width: 374px) {
    margin-left: 5px;
  }
}
.milestone-section-style {
  min-width: auto !important;
  padding-right: 24px !important;
  justify-content: start !important;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding: 20px 0px;
    padding-right: 8px !important;
  }
}
.milestone-item-side {
  padding-left: 32px !important;
  justify-content: start !important;
  @media only screen and (max-width: $breakpoint-xs-max) {
    padding-left: 24px !important;
    padding-top: 14px !important;
    padding-bottom: 14px !important;
  }
}
.task-item-side {
  padding-left: 32px !important;
  justify-content: start !important;
}
::v-deep {
  .next-task-btn {
    border-radius: 5px;
    .q-btn__wrapper {
      padding: 8px 10px 8px 20px !important;
    }
  }
  .start-again-btn {
    border-radius: 5px;
    .q-btn__wrapper {
      padding: 8px 10px 8px 20px !important;
      @media only screen and (max-width: 359px) {
        padding: 8px 8px 8px 8px !important;
      }
    }
  }
  .milestone-list {
    border: 2px solid #e8edf2 !important;
    border-radius: 8px !important;
    .q-item {
      padding: 16px 24px 16px 16px !important;
      @media only screen and (max-width: $breakpoint-xs-max) {
        padding: 8px 16px 8px 16px !important;
      }
      .q-focusable {
        display: none !important;
      }
    }
  }
  .milestone-bottom {
    margin-bottom: 16px;
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin-bottom: 8px !important;
    }
  }
  .task-list {
    border: 2px solid #e8edf2 !important;
    border-radius: 4px !important;
    .q-item {
      padding: 12px 24px 12px 12px !important;
      @media only screen and (max-width: 374px) {
        padding: 12px 8px 12px 8px !important;
      }
      .q-focusable {
        display: none !important;
      }
    }
  }
  .q-mb-10 {
    margin-bottom: 10px;
  }
  .close-btn {
    border: 2px solid $primary;
    border-radius: 5px;
    margin-top: 32px;
    // width: 86px;
    // height: 40px;
    .q-btn__wrapper {
      padding: 8px 20px !important;
    }
    @media only screen and (max-width: $breakpoint-xs-max) {
      margin-top: 24px;
    }
  }
}

.milestone-active {
  border: 2px solid #8ba8f7;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 4px #e8eefd;
  border-radius: 8px;
}
.task-active {
  border: 2px solid #5c86f5;
  // box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 4px #e8eefd;
  border-radius: 4px;
}
.q-btn .right-arrow {
  transition: transform 0.3s;
}
.q-btn:hover .right-arrow {
  transition: transform 0.3s ease-out;
  transform: translateX(5px);
}
.order-icon-style {
  min-width: 32px;
  height: 32px;
  background: $lavenderBlue1;
  border: 4px solid #e8eefd;
  border-radius: 32px;
}
.main-container {
  padding-top: 8px;
  padding-bottom: 8px;
  width: 60%;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 90%;
  }
  .video-container {
    width: 100%;
    padding-top: 56.25%;
    height: 0px;
    position: relative;
    .milestone-video {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
.flex-task {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
