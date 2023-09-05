<template>
  <div class="bg-whiteSmoke">
    <q-card flat class="full-height full-width" v-if="!changeSchedule">
      <q-card-section class="bg-whiteSmoke full-height">
        <div class="row q-mb-xl">
          <q-icon
            class="text-primary"
            size="sm"
            @click="closeSchedulePopup"
            name="close"
          ></q-icon>
          <div
            class="text-nightRider q-pl-lg text-body1 text-weight-medium word-break-break-word"
          >
            Schedule {{ blooprintDetails['attributes']['name'] }}
          </div>
        </div>
        <div class="q-mt-md">
          <div class="text-nightRider text-body2">Start Date & Time</div>
          <div class="text-grey text-body2 q-mt-sm">
            {{ blooprintScheduledDate }}
          </div>
          <!-- <q-skeleton v-if="!displayDate" type="QInput" class="full-width" /> -->
          <div class="text-charcoal q-my-sm text-body1 word-break-break-word">
            <q-avatar
              class="q-mr-sm text-weight-bold bg-solitude"
              square
              size="35px"
              >{{ mileStoneSelected['attributes']['order'] }}</q-avatar
            >
            {{ mileStoneSelected['attributes']['name'] }}
            <div class="q-ma-sm row">
              <div class="col-10 ellipsis-2-lines word-break-break-word">
                <q-avatar size="14px" color="primary" class="q-mr-md" />
                {{ taskDetails['attributes']['name'] }}
              </div>
              <div class="text-body2 col-2">
                {{ taskDetails['attributes']['days'] }} Days
              </div>
            </div>
          </div>
          <div class="q-ml-lg date-time-picker">
            <DateandTimePicker
              class="q-ml-md"
              :label="'Reschedule On'"
              :dateSelected="dateSelected"
              :isApplyButtonClicked="isApplyButtonClicked"
              @on-date-time-select="onDateTimeSelect"
            />
          </div>
          <q-page-sticky class="q-mx-md" position="bottom">
            <q-btn
              color="primary"
              class="full-width"
              size="16px"
              style="border-radius: 5px;"
              label="Apply"
              no-caps
              @click="onApplyClick"
            />
            <q-btn
              color="primary"
              class="full-width q-my-md"
              size="16px"
              style="border-radius: 5px;"
              label="Change Complete Schedule"
              no-caps
              @click="changeScheduleClick"
            />
          </q-page-sticky>
        </div>
      </q-card-section>
    </q-card>
    <ScheduleBlooprint
      v-else
      @schedule-close="closeSchedulePopup"
      :blooprintSelected="blooprintDetails"
    />
  </div>
</template>
<script>
import DateandTimePicker from 'components/DateandTimePicker.vue'
import ScheduleBlooprint from './ScheduleBlooprint.vue'
import { mapActions, mapGetters } from 'vuex'
import {
  formatDateToRespectiveTimeZone,
  convertDateToUTCFormat
} from '../utils/common'

export default {
  name: 'MobileScheduleTaskPopup',
  components: {
    DateandTimePicker,
    ScheduleBlooprint
  },
  data() {
    return {
      dateSelected: '',
      isApplyButtonClicked: false,
      blooprintScheduledDate: '',
      changeSchedule: false
    }
  },
  props: ['blooprintDetails', 'mileStoneSelected', 'taskDetails'],
  computed: {
    ...mapGetters(['loggedInUserData'])
  },
  mounted() {
    this.getBlooprintSchedule()
  },
  methods: {
    ...mapActions([
      'fetchBlooprintSchedule',
      'scheduleBlooprintTask',
      'setToastMessage'
    ]),
    async getBlooprintSchedule() {
      let data = await this.fetchBlooprintSchedule(this.blooprintDetails['id'])
      if (data['attributes'] && data['attributes']['days'] != null) {
        if (
          this.loggedInUserData['timeZone'] &&
          this.loggedInUserData['timeZone'] != ''
        ) {
          this.blooprintScheduledDate = formatDateToRespectiveTimeZone(
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
      } else {
        this.setToastMessage({
          type: 'negative',
          message:
            'Blooprint was not yet scheduled. So you cannot schedule the task now.'
        })
        this.closeSchedulePopup()
      }
    },
    onDateTimeSelect(event) {
      this.dateSelected = event
    },
    async onApplyClick() {
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
          this.closeSchedulePopup()
          this.dateSelected = ''
          this.isApplyButtonClicked = false
        }
      }
    },
    changeScheduleClick() {
      this.changeSchedule = true
    },
    closeSchedulePopup() {
      this.$emit('on-manage-schedule-close')
    }
  }
}
</script>
<style lang="scss" scoped>
.date-time-picker {
  @media only screen and (max-width: $breakpoint-xs-max) {
    height: 37vh !important;
  }
}
</style>
