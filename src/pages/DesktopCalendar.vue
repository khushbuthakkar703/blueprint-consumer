<template>
  <q-page>
    <div
      class="q-ma-md-xl q-ma-sm-lg q-ma-xs-md border-secondary calendar-view bg-white"
    >
      <FullCalendar
        class="lt-sm q-ma-md-xl q-ma-sm-lg q-ma-xs-md"
        id="calendar"
        :options="calendarOptionsXSView"
      />
      <FullCalendar
        id="calendar"
        class="gt-xs q-ma-md-xl q-ma-sm-lg q-ma-xs-md"
        :options="calendarOptionsSMView"
      />
    </div>
  </q-page>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { mapActions, mapGetters } from 'vuex'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import { formatDateToRespectiveTimeZone } from '../utils/common'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptionsXSView: {
        plugins: [dayGridPlugin, interactionPlugin, momentTimezonePlugin],
        initialView: 'dayGridMonth',
        buttonText: {
          today: 'Today'
        },
        handleWindowResize: true,
        aspectRatio: 0.8,
        eventTimeFormat: {
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short',
          omitZeroMinute: true
        },
        timeZone: 'UTC',
        eventSources: [
          {
            events: this.getAllTasksList,
            cache: false
          }
        ]
      },

      calendarOptionsSMView: {
        plugins: [dayGridPlugin, interactionPlugin, momentTimezonePlugin],
        initialView: 'dayGridMonth',
        buttonText: {
          today: 'Today'
        },
        handleWindowResize: true,
        aspectRatio: 1.5,
        eventTimeFormat: {
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short',
          omitZeroMinute: true
        },
        timeZone: 'UTC',
        eventSources: [
          {
            events: this.getAllTasksList,
            cache: false
          }
        ]
      },
      calendarDateInfo: {}
    }
  },
  computed: {
    ...mapGetters(['loggedInUserData'])
  },
  watch: {
    loggedInUserData(data) {
      if (data['timeZone']) {
        this.calendarOptionsXSView['timeZone'] = this.loggedInUserData[
          'timeZone'
        ]
        this.calendarOptionsSMView['timeZone'] = this.loggedInUserData[
          'timeZone'
        ]
      }
    }
  },
  mounted() {
    if (this.loggedInUserData['timeZone']) {
      this.calendarOptionsXSView['timeZone'] = this.loggedInUserData['timeZone']
      this.calendarOptionsSMView['timeZone'] = this.loggedInUserData['timeZone']
    }
  },
  methods: {
    ...mapActions(['fetchAllDesktopScheduledTasks']),
    async getAllTasksList(info, successCallback, failureCallback) {
      this.calendarDateInfo = info
      let params = {
        startDate: info['start'],
        endDate: info['end'],
        allDay: false
      }
      let filteredTaskList = []
      let taskList = await this.fetchAllDesktopScheduledTasks(params)

      let duplicateIndex = []
      if (taskList && taskList.length > 0) {
        // ********** Filtering the Duplicate Data **********************
        taskList.map(item => {
          let duplicateData = taskList.filter(
            i => i.title == item.title && i.start == item.start
          )
          let filterValue = {}
          if (duplicateData && duplicateData.length > 1) {
            if (
              duplicateData[1]['days'].includes(duplicateData[0]['days'][0])
            ) {
              filterValue = duplicateData[1]
            }
            let index = taskList.findIndex(
              i =>
                i.title == filterValue.title &&
                i.start == filterValue.start &&
                i.end == filterValue.end
            )
            if (index != -1) {
              duplicateIndex.push(index)
            }
          }
        })
        duplicateIndex = duplicateIndex.filter(this.fetchUniqueValues)
        // ******** Tasks List after removing the dupliactes ***********************
        for (let i = duplicateIndex.length - 1; i >= 0; i--) {
          taskList.splice(duplicateIndex[i], 1)
        }
        // ******** Separation of Consecutive Dates of 12 AM Time ***********************
        taskList.map(item => {
          let startDate = formatDateToRespectiveTimeZone(
            item['start'],
            this.loggedInUserData['timeZone']
          )
          let endDate = formatDateToRespectiveTimeZone(
            item['end'],
            this.loggedInUserData['timeZone']
          )
          let startTime = startDate.split(' ')

          if (
            (startDate != endDate && startTime[1] == '00:00') ||
            startDate == endDate
          ) {
            let eDate = item['end'].split('T')
            let eTime = eDate[1].split(':')
            filteredTaskList.push({
              title: item['title'],
              start: item['start'],
              end: eDate[0] + 'T' + eTime[0] + ':' + eTime[1] + ':' + '01Z'
            })
          } else {
            filteredTaskList.push({
              title: item['title'],
              start: item['start'],
              end: item['end']
            })
          }
        })
        let calendarStartDate = this.calendarDateInfo['startStr'].split('T')[0]
        // ********* Check for the Calendar Start Date is present in Event End Date *******************
        filteredTaskList.map(item => {
          let x = false
          let calstartDate = calendarStartDate.split('-')
          let currentStartDate = item['start'].split('T')
          let currentStart = item['start'].split('T')[0].split('-')
          let currentEnd = item['end'].split('T')[0].split('-')

          if (
            Number(calstartDate[1]) == Number(currentStart[1]) &&
            calstartDate != currentStartDate
          ) {
            for (
              let i = Number(currentStart[2]);
              i <= Number(currentEnd[2]);
              i++
            ) {
              if (i == calstartDate[2]) {
                item['start'] = calendarStartDate + 'T' + currentStartDate[1]
                break
              }
            }
          }
          if (item.end.includes(calendarStartDate)) {
            // ********** If Event End has Calendar Start Date then Update that event Start and End Dates ***********************
            let start = item['start'].split('T')
            item['start'] = calendarStartDate + 'T' + start[1]
            let eDate = item['end'].split('T')
            let eTime = eDate[1].split(':')
            item['end'] =
              eDate[0] + 'T' + eTime[0] + ':' + eTime[1] + ':' + '01Z'
          }
        })
        // ************ Passing the Final Filtered and Updated Data to calendar *****************
        successCallback(filteredTaskList)
      } else {
        failureCallback()
      }
    },
    // ********************** Method to fetch the Unique Items in the Array *************************
    fetchUniqueValues(value, index, self) {
      return self.indexOf(value) === index
    }
  }
}
</script>
<style lang="scss">
.calendar-view {
  .fc .fc-daygrid-day-top {
    display: flex;
    flex-direction: row !important;
  }
  .fc .fc-col-header-cell-cushion {
    display: inline-block;
    padding: 2px 4px;
    font-size: 16px;
    color: $dimGrey;
    text-transform: uppercase;
  }
  .fc .fc-toolbar-title {
    font-size: 18px;
    color: $nightRider;
    font-weight: bold;
  }
  .fc .fc-next-button {
    background: white;
    border: 1px solid $gainsBoro;
  }
  .fc .fc-prev-button {
    background: white;
    border: 1px solid $gainsBoro;
  }
  .fc .fc-button .fc-icon {
    color: #cccccc;
  }
  .fc .fc-today-button {
    background: white;
    border: 1px solid $gainsBoro;
    color: $nightRider;
  }
  .fc .fc-event-main-frame .fc-event-time {
    min-width: 50px;
  }
}
</style>
