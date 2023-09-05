<template>
  <q-card
    class="rating-dialog-card bg-white row justify-center"
    style="overflow-y:hidden !important;  max-width: 658px !important;"
  >
    <div class="f-w-600 text-fs-24-lh-32 text-regalBlue text-center">
      blooprint schedule
    </div>
    <div class="main-container">
      <DateandTimePicker
        v-if="displayDate"
        :dateSelected="dateSelected"
        :isApplyButtonClicked="isSaveButtonClick"
        @on-date-time-select="onDateTimeSelect"
      />
      <q-skeleton v-else height="50px" />
      <div class="q-mt-lg full-width">
        <label class="f-w-600 text-fs-16 text-lh-24 text-left text-regalBlue"
          >Choose the days that works for you</label
        >
        <div class="q-mt-xs flex">
          <div
            class="relative-position days-box text-manateeGrey text-capitalize cursor-pointer q-mr-sm"
            :class="items.selected ? 'selected' : ''"
            v-for="items in options"
            :key="items.label"
            @click="onClickDays(items)"
          >
            <span class="absolute-center f-w-600 text-fs-16 text-lh-24">
              {{ items.label.substring(0, 3) }}</span
            >
          </div>
        </div>
        <div
          class="text-error q-mt-sm q-ml-md text-lh-12 f-w-500"
          style="font-size: 12px"
          v-if="showAvailableDaysMsg && daysSelected.length == 0"
        >
          Available days is required
        </div>
        <div
          v-if="daysSelected.length"
          class="text-fs-14-lh-24-fw-400 text-comet q-mt-xs"
        >
          Schedule will be set for selected days.
        </div>
      </div>
      <div
        class="row items-center justify-between reverse-wrap buttons-container"
      >
        <label
          @click="onCancelClick"
          class="f-w-500 text-fs-16 text-lh-24 text-primary cursor-pointer"
          style="text-decoration: underline"
          >Cancel</label
        >
        <q-btn
          color="primary"
          no-caps
          unelevated
          class="button-width f-w-600 text-fs-16 text-lh-24"
          label="Set schedule"
          @click="onSaveClick"
        ></q-btn>
      </div>
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
import moment from 'moment-timezone'
export default {
  data() {
    return {
      daysSelected: [],
      options: [
        { label: 'Mondays', value: 1, selected: false },
        { label: 'Tuesdays', value: 2, selected: false },
        { label: 'Wednesdays', value: 3, selected: false },
        { label: 'Thursdays', value: 4, selected: false },
        { label: 'Fridays', value: 5, selected: false },
        { label: 'Saturdays', value: 6, selected: false },
        { label: 'Sundays', value: 0, selected: false }
      ],
      isScheduled: false,
      showAvailableDaysMsg: false,
      isSaveButtonClick: false,
      dateSelected: '',
      displayDate: false
    }
  },
  props: ['blooprintSelected'],
  components: {
    DateandTimePicker
  },
  computed: {
    ...mapGetters(['loggedInUserData'])
  },
  mounted() {
    this.getBlooprintSchedule()
  },
  methods: {
    ...mapActions([
      'scheduleBlooprint',
      'fetchBlooprintSchedule',
      'setToastMessage'
    ]),
    onDateSelect() {
      this.$refs.dateCal.hide()
      this.$refs.timeCal.show()
    },
    onDateTimeSelect(event) {
      this.dateSelected = event
    },
    onCancelClick() {
      this.$emit('schedule-popup-close', { isScheduled: this.isScheduled })
    },
    onClickDays(item) {
      if (this.daysSelected.includes(item.value)) {
        let index = this.daysSelected.indexOf(item.value)
        this.daysSelected.splice(index, 1)
        this.options = this.options.map(day => {
          if (item.value == day.value)
            return { label: day.label, value: day.value, selected: false }
          else return day
        })
      } else {
        this.daysSelected.push(item.value)
        this.options = this.options.map(day => {
          if (day.value === item.value)
            return { label: day.label, value: day.value, selected: true }
          return day
        })
      }
    },
    async getBlooprintSchedule() {
      let data = await this.fetchBlooprintSchedule(this.blooprintSelected['id'])
      this.displayDate = true
      if (data['attributes'] && data['attributes']['days'] != null) {
        this.daysSelected = data['attributes']['days']
        this.options = this.options.map(day => {
          if (this.daysSelected.includes(day.value)) {
            return { label: day.label, value: day.value, selected: true }
          } else return day
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

    async onSaveClick() {
      this.isSaveButtonClick = true
      this.showAvailableDaysMsg = this.daysSelected.length == 0
      if (this.daysSelected.length > 0 && this.dateSelected != '') {
        if (
          this.loggedInUserData['timeZone'] &&
          this.loggedInUserData['timeZone'] != ''
        ) {
          this.daysSelected.sort()
          let params = {
            blooprintId: this.blooprintSelected['id'],
            requestBody: {
              data: {
                type: 'schedule',
                attributes: {
                  startDate: convertDateToUTCFormat(
                    moment(this.dateSelected, 'MM-DD-YYYY HH:mm').format(
                      'YYYY-MM-DD HH:mm'
                    ),
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
            this.onCancelClick()
          }
        } else {
          this.setToastMessage({
            type: 'negative',
            message:
              'There is no timezone selected for this user. Please select a timezone to schedule the blooprint'
          })
          this.onCancelClick()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.rating-dialog-card {
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px $shadow;
}
.main-container {
  margin-top: 32px;
  @media only screen and (max-width: 324px) {
    margin-top: 24px;
  }
}
.days-box {
  width: 58px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid #b9bcc6;
  &.selected {
    background: #e8eefd;
    border: 1px solid #5c86f5;
    color: #152141;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-bottom: 4px;
  }
}
.buttons-container {
  margin-top: 40px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    justify-content: center;
    margin-top: 36px;
  }
  @media only screen and (max-width: 324px) {
    margin-top: 24px;
  }
}

.button-width {
  border-radius: 10px;
  width: 166px;
  height: 50px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 100%;
    margin-bottom: 16px;
  }
}
.text-error {
  color: #c10015;
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: $secondary;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  margin: 10px 0px;
}
</style>
