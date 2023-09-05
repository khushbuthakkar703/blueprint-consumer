<template>
  <div class="full-width">
    <label class="flex f-w-600 text-fs-16 text-lh-24 text-regalBlue"
      >Select a start date</label
    >
    <div class="row">
      <q-input
        borderless
        class="border-input-field date-field f-w-500 text-regalBlue q-mt-xs q-pb-none"
        placeholder="MM-DD-YYYY HH:MM"
        readonly
        ref="dateField"
        v-model="startDate"
        lazy-rules
        input-class="f-w-600 text-regalBlue text-fs-16 text-lh-24"
        :rules="[val => (val && val != '') || 'Date and Time is required']"
        @click="$refs.dateCal.show()"
        style="max-height: 44px !important; padding-right: 14px !important; padding-left: 14px !important;"
      >
        <template v-slot:append>
          <q-icon
            @click="$refs.dateCal.show()"
            name="img:calender.svg"
            color="regalBlue"
            class="cursor-pointer"
          />
        </template>
      </q-input>
      <div>
        <q-popup-proxy
          ref="dateCal"
          transition-show="scale"
          transition-hide="scale"
          @hide="onDateTimeSelect"
          :breakpoint="1025"
        >
          <q-date
            v-model="startDate"
            mask="MM-DD-YYYY HH:mm"
            :options="disableDays"
          >
            <div class="row items-center justify-end">
              <q-btn @click="onDateSelect" label="Ok" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </div>
      <div>
        <q-popup-proxy
          ref="timeCal"
          transition-show="scale"
          transition-hide="scale"
          @hide="onDateTimeSelect"
          :breakpoint="1025"
        >
          <q-time v-model="startDate" mask="MM-DD-YYYY HH:mm" format24h>
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                @click="onDateTimeSelect"
                label="Ok"
                color="primary"
                flat
              />
            </div>
          </q-time>
        </q-popup-proxy>
      </div>
    </div>
    <div style="display: none">{{ isApplyButtonClicked }}</div>
  </div>
</template>
<script>
export default {
  name: 'DateandTimePicker',
  data() {
    return {
      startDate: '',
      disableDays(date) {
        let month = new Date().getMonth() + 1
        month = month < 10 ? '0' + month : month
        let day =
          new Date().getDate() > 10
            ? new Date().getDate()
            : '0' + new Date().getDate()
        let today = new Date().getFullYear() + '/' + month + '/' + day
        return date >= today
      }
    }
  },
  props: ['label', 'isApplyButtonClicked', 'dateSelected'],
  updated() {
    if (this.isApplyButtonClicked) {
      this.$refs.dateField.validate()
    }
  },
  mounted() {
    this.startDate = this.dateSelected
  },
  methods: {
    onDateSelect() {
      this.$refs.dateCal.hide()
      this.$refs.timeCal.show()
      this.$emit('on-date-time-select', this.startDate)
    },
    onDateTimeSelect() {
      this.$emit('on-date-time-select', this.startDate)
    }
  }
}
</script>
<style lang="scss" scoped>
.date-field {
  width: 454px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100%;
  }
}
</style>
