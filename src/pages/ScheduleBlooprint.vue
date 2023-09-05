<template>
  <q-card flat class="bg-whiteSmoke full-height">
    <div class="q-pa-md q-mb-md">
      <div class="row justify-between flex items-start q-mb-xl">
        <q-icon
          class="text-primary col-1"
          size="sm"
          @click="closeScheduleScreen"
          name="close"
        ></q-icon>
        <div
          class="text-nightRider col-11 q-pl-md text-body1 text-weight-medium word-break-break-word"
        >
          Schedule {{ blooprintSelected['attributes']['name'] }}
        </div>
      </div>
      <div class="text-grey">Set my availability.</div>
      <div class="q-mt-sm">
        Availability
      </div>
      <div>
        <q-btn
          v-for="week in weekDaysList"
          unelevated
          :key="week['id']"
          style="width: 30pt; height: 30pt"
          class="q-mt-sm week-buttons"
          :class="week['isSelected'] ? 'bg-primary' : 'bg-lavenderBlue'"
          :text-color="week['isSelected'] ? 'white' : 'black'"
          :label="week['label']"
          @click="onWeekDaySelect(week)"
        />
      </div>
      <div
        class="text-errorColor q-mt-sm"
        style="font-size: 12px"
        v-if="showAvailableDaysMsg"
      >
        Available days is required
      </div>
      <div class="q-mt-md">
        <q-skeleton v-if="!displayDate" type="QInput" class="full-width" />
        <DateandTimePicker
          v-else
          :label="'Start Date & Time'"
          :dateSelected="dateSelected"
          :isApplyButtonClicked="isSaveButtonClick"
          @on-date-time-select="onDateTimeSelect"
        />
      </div>
      <div v-if="loading">
        <div class="q-my-sm row" v-for="i in 7" :key="i">
          <q-skeleton class="q-mr-sm col-3" size="30px" />
          <q-skeleton class="col full-width" />
        </div>
      </div>
      <div
        v-else
        class="text-charcoal q-my-sm text-body1"
        :class="i + 1 == mileStoneList.length ? 'q-mb-xl' : null"
        v-for="(milestone, i) in mileStoneList"
        :key="milestone['id']"
      >
        <div class="row">
          <div class="col">
            <q-avatar class="text-weight-bold bg-solitude" square size="30px">{{
              milestone['attributes']['order']
            }}</q-avatar>
          </div>
          <div class="col-11 q-pl-md word-break-break-word">
            {{ milestone['attributes']['name'] }}
          </div>
        </div>
        <div
          class="q-ma-sm row"
          v-for="task in milestone['attributes']['tasks']"
          :key="task['id']"
        >
          <div class="col-1">
            <q-icon
              class="q-mr-sm text-primary "
              name="radio_button_unchecked"
            />
          </div>
          <div class="col q-pl-sm text-body2 ellipsis-2-lines">
            {{ task['name'] }}
          </div>
          <div class="text-body2 text-right col-2">
            {{ task['days'] }}
            <span>Day</span>
            <span :class="task.days > 1 ? null : 'invisible'">s</span>
          </div>
        </div>
      </div>
      <q-page-sticky expand position="bottom">
        <q-btn
          style="border-radius: 0"
          color="primary"
          class="full-width"
          size="16px"
          no-caps
          @click="addToCalendar()"
          label="Add to Calendar"
        />
      </q-page-sticky>
    </div>
  </q-card>
</template>
<script>
import DateandTimePicker from 'components/DateandTimePicker.vue'
import { mapActions, mapGetters } from 'vuex'
import {
  formatDateToRespectiveTimeZone,
  convertDateToUTCFormat
} from '../utils/common'

export default {
  data() {
    return {
      startDate: '',
      displayDate: false,
      dateSelected: '',
      isSaveButtonClick: false,
      showAvailableDaysMsg: false,
      loading: true,
      weekDaysList: [
        { label: 'M', id: 1, isSelected: false },
        { label: 'T', id: 2, isSelected: false },
        { label: 'W', id: 3, isSelected: false },
        { label: 'T', id: 4, isSelected: false },
        { label: 'F', id: 5, isSelected: false },
        { label: 'S', id: 6, isSelected: false },
        { label: 'S', id: 0, isSelected: false }
      ],
      isDaysAvailable: false,
      daysSelected: [],
      mileStoneList: []
    }
  },
  components: {
    DateandTimePicker
  },
  props: ['blooprintSelected'],
  computed: {
    ...mapGetters(['loggedInUserData'])
  },
  mounted() {
    this.getMileStoneData()
    this.getBlooprintSchedule()
  },
  methods: {
    ...mapActions([
      'fetchAllMilestonesByBlooprintId',
      'fetchBlooprintSchedule',
      'scheduleBlooprint'
    ]),
    async getMileStoneData() {
      this.loading = true
      let data = await this.fetchAllMilestonesByBlooprintId({
        blooprintId: this.blooprintSelected['id']
      })
      this.loading = false
      if (data) {
        this.mileStoneList = data
      }
    },
    onDateTimeSelect(event) {
      this.dateSelected = event
    },
    // ***************** Triggers when a Week Day Is Selected *****************************
    onWeekDaySelect(week) {
      week['isSelected'] = !week['isSelected']
      this.daysSelected = []
      this.weekDaysList.forEach(item => {
        if (item['isSelected']) {
          this.daysSelected.push(item['id'])
        }
      })
      this.isDaysAvailable = this.daysSelected.length > 0
    },
    async getBlooprintSchedule() {
      let data = await this.fetchBlooprintSchedule(this.blooprintSelected['id'])
      this.displayDate = true
      if (data['attributes'] && data['attributes']['days'] != null) {
        this.daysSelected = data['attributes']['days']
        this.weekDaysList.forEach(item => {
          if (this.daysSelected.includes(item['id'])) {
            item['isSelected'] = true
          }
        })
        if (
          this.loggedInUserData['timeZone'] &&
          this.loggedInUserData['timeZone'] != ''
        ) {
          this.dateSelected = formatDateToRespectiveTimeZone(
            data['attributes']['startDate'],
            this.loggedInUserData['timeZone']
          )
        } else {
          this.setToastMessage({
            type: 'negative',
            message:
              'There is no timezone selected for this user. Please select a timezone to schedule the blooprint'
          })
        }
      }
    },
    async addToCalendar() {
      this.isSaveButtonClick = true
      this.showAvailableDaysMsg = this.daysSelected.length == 0
      if (this.daysSelected.length > 0 && this.dateSelected != '') {
        let params = {
          blooprintId: this.blooprintSelected['id'],
          requestBody: {
            data: {
              type: 'schedule',
              attributes: {
                startDate: convertDateToUTCFormat(
                  this.dateSelected,
                  this.loggedInUserData['timeZone']
                ),
                days: this.daysSelected
              }
            }
          }
        }
        let data = await this.scheduleBlooprint(params)
        this.isScheduled = data
        if (data) {
          this.closeScheduleScreen()
        }
      }
    },
    // ****************** Triggers when Cross Icon is clicked ***************************
    closeScheduleScreen() {
      this.$emit('schedule-close')
    }
  }
}
</script>
<style lang="scss" scoped>
.week-buttons {
  margin-right: 6px;
}
.skeleton-width {
  width: 210px;
}
@media only screen and (min-width: $xs-mobile) {
  .week-buttons {
    margin-right: 9px;
  }
}
@media only screen and (min-width: 410px) {
  .week-buttons {
    margin-right: 14px;
  }
}
@media only screen and (max-width: 330px) {
  .skeleton-width {
    width: 190px;
  }
}
</style>
