<template>
  <div style="margin-top: 30px; margin-bottom: 60px">
    <div
      v-for="(milestone, i) in milestonesList"
      :key="milestone.id"
      class="milestone row no-wrap justify-between bg-white"
      style="border-radius: 8px; border: 2px solid #e8edf2"
    >
      <div class="col">
        <div class="row no-wrap">
          <div
            style="
              min-width: 32px;
              height: 32px;
              background: #b9cbfb;
              border: 4px solid #e8eefd;
              border-radius: 32px;
            "
            class="relative-position"
          >
            <div
              class="absolute-center"
              style="font-size: 16px; font-weight: 600; line-height: 24px"
            >
              {{ i + 1 }}
            </div>
          </div>
          <div
            class="
              milestone-container milestone-name
              row
              items-center
              word-break-break-word
            "
          >
            {{ milestone['attributes']['name'] }}
          </div>
        </div>
      </div>
      <div class="task-and-day-container">
        <div
          class="text-right"
          :class="[
            $q.screen.width < 1274
              ? 'column items-end'
              : 'row justify-end items-center'
          ]"
        >
          <div class="task-and-day-text">
            {{
              milestone.attributes.tasks.length +
                ' task' +
                (milestone.attributes.tasks.length > 1 ? 's' : '')
            }}
          </div>
          <div
            class="bg-primary dot"
            style="
              height: 8px;
              width: 8px;
              border-radius: 8px;
              margin: 0px 16px;
            "
          ></div>
          <div class="task-and-day-text">
            {{
              totalMileStoneDays(milestone.attributes.tasks) === 0 &&
              totalMileStoneHours(milestone.attributes.tasks) === '' &&
              totalMileStoneMinutes(milestone.attributes.tasks) === ''
                ? '0 day'
                : ''
            }}
            {{
              totalMileStoneDays(milestone.attributes.tasks) > 0
                ? totalMileStoneDays(milestone.attributes.tasks)
                : ''
            }}
            {{
              totalMileStoneDays(milestone.attributes.tasks) > 1
                ? 'days'
                : 'day' && totalMileStoneDays(milestone.attributes.tasks) == 0
                ? ''
                : 'day'
            }}
            {{
              totalMileStoneHours(milestone.attributes.tasks) > 0
                ? getHours(milestone.attributes.tasks, null)
                : ''
            }}
            {{
              totalMileStoneHours(milestone.attributes.tasks) > 0 &&
              totalMileStoneMinutes(milestone.attributes.tasks) > 0
                ? ':'
                : ''
            }}
            {{
              totalMileStoneMinutes(milestone.attributes.tasks) === ''
                ? ''
                : getMinutes(milestone.attributes.tasks, null)
            }}
            {{
              totalMileStoneHours(milestone.attributes.tasks) == 0 &&
              totalMileStoneMinutes(milestone.attributes.tasks) > 0
                ? getLabel(milestone.attributes.tasks, 'min')
                : ''
            }}
            {{
              totalMileStoneHours(milestone.attributes.tasks) > 0
                ? getLabel(milestone.attributes.tasks, 'hr')
                : ''
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['milestonesList'],
  data() {
    return {
      additionalHours: 0,
      additionalDays: 0
    }
  },
  methods: {
    // ***************** Method to retreive Total Tasks Days *********************
    totalMileStoneDays(tasks) {
      let totalDays = 0
      let extraHours = 0
      let totalMinutes = 0
      if (tasks) {
        tasks.forEach(item => {
          totalDays = totalDays + item['duration']['days']
          extraHours = extraHours + item['duration']['hours']
          totalMinutes = totalMinutes + item['duration']['minutes']
        })
      }
      const hrs = extraHours / 24
      let totalHours = extraHours + Math.floor(totalMinutes / 60)
      let seconds = Number(totalHours * 60 * 60) // total hours convert into second
      let totalAdditionalDays = Math.floor(seconds / (3600 * 24)) // total second convert into days
      return totalDays + totalAdditionalDays
    },
    totalMileStoneHours(tasks) {
      let hours = 0
      let totalMinutes = 0
      if (tasks) {
        tasks.forEach(item => {
          hours = hours + item['duration']['hours']
          totalMinutes = totalMinutes + item['duration']['minutes']
        })
      }
      let totalHours = hours + Math.floor(totalMinutes / 60)
      let seconds = Number(totalHours * 60 * 60) // total hours convert into second
      // this.additionalDays = Math.floor(seconds / (3600*24)); // total second convert into days
      let hrs = Math.floor((seconds % (3600 * 24)) / 3600) // seconds convert into hours
      const hour = hrs > 0 ? hrs : ''
      return hour
    },
    totalMileStoneMinutes(tasks) {
      let totalMinutes = 0
      if (tasks) {
        tasks.forEach(item => {
          totalMinutes = totalMinutes + item['duration']['minutes']
        })
      }
      // this.additionalHours = Math.floor(totalMinutes / 60);
      let minutes = totalMinutes % 60
      const minute = minutes > 0 ? minutes : ''
      return minute
    },
    getTotalTaskDays(milestone) {
      let totalDays = 0
      milestone.attributes.tasks.map(item => {
        totalDays = totalDays + item['duration']['days']
      })
      return totalDays
    },
    getTotalTaskHours(milestone) {
      let totalHours = 0
      milestone.attributes.tasks.map(item => {
        totalHours = totalHours + item['duration']['hours']
      })
      return totalHours
    },
    getTotalTaskMinutes(milestone) {
      let totalMinutes = 0
      milestone.attributes.tasks.map(item => {
        totalMinutes = totalMinutes + item['duration']['minutes']
      })
      return totalMinutes
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
    retrieveTotalTaskMinutes(milestone) {
      return this.getTotalTaskMinutes(milestone) % 59
    },
    getHours(milestone, value) {
      const h =
        typeof milestone === 'number'
          ? milestone
          : this.totalMileStoneHours(milestone)
      const m =
        typeof milestone === 'number'
          ? value
          : this.totalMileStoneMinutes(milestone)
      return h
    },
    getMinutes(milestone, value) {
      const h =
        typeof milestone === 'number'
          ? value
          : this.totalMileStoneHours(milestone)
      const m =
        typeof milestone === 'number'
          ? milestone
          : this.totalMileStoneMinutes(milestone)
      if (h > 0 && m > 0) {
        return m < 10 ? '0' + m : m
      } else {
        return m
      }
    },
    getLabel(number, value) {
      const h =
        typeof number === 'number' ? number : this.totalMileStoneHours(number)
      const m =
        typeof number === 'number' ? number : this.totalMileStoneMinutes(number)
      if (value === 'min') {
        return m < 2 ? ' min' : ' mins'
      } else {
        return h < 2 ? ' hr' : ' hrs'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.milestone {
  padding: 16px;
  margin-bottom: 10px;
  @media only screen and (max-width: $breakpoint-xs) {
    margin-bottom: 8px;
    padding: 24px 16px;
  }
  .milestone-name {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin: 0px 24px;
    @media only screen and (max-width: $breakpoint-xs) {
      margin: 0px 8px;
    }
  }
  .task-and-day-container {
    margin-right: 8px;
  }
  .task-and-day-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    @media only screen and (max-width: $breakpoint-xs) {
      font-size: 14px;
      line-height: 20px;
      margin: 2px 0px;
    }
  }
  .dot {
    @media only screen and (max-width: 1274px) {
      display: none;
    }
  }
}
</style>
