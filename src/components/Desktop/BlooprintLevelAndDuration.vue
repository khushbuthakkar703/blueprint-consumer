<template>
  <div class="row container">
    <div class="col-md-4 col-sm-12 col-xs-12">
      <div class="level bg-white row justify-center">
        <div class="icon">
          <img
            class="img-style"
            style="width: 42px"
            v-if="level === 'advanced'"
            src="~assets/advanced-level.svg"
          />
          <img
            class="img-style"
            style="width: 42px"
            v-else-if="level === 'intermediate'"
            src="~assets/intermediate-level.svg"
          />
          <img
            class="img-style"
            style="width: 42px"
            v-else
            src="~assets/beginner-level.svg"
          />
        </div>
        <div
          class="col-12 text-center subheading text-regalBlue text-capitalize"
        >
          {{ level }} Level
        </div>
      </div>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12">
      <div class="duration bg-white row justify-center">
        <div class="icon">
          <img
            class="img-style"
            style="width: 40px; height: 40px"
            src="~assets/calender.svg"
          />
        </div>
        <div
          class="col-12 text-center subheading text-regalBlue text-capitalize"
        >
          Duration
          {{ getDuration() }}
        </div>
      </div>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12">
      <div class="reviews bg-white row justify-center">
        <div class="icon">
          <img
            class="img-style"
            v-if="reviews > 0"
            src="~assets/reviews-star.svg"
          />
          <img class="img-style" v-else src="~assets/no-reviews-star.svg" />
        </div>
        <div
          v-if="reviews > 0"
          class="col-12 text-center subheading text-regalBlue"
        >
          {{ rating }}/5 ({{ reviews }}
          {{ reviews > 1 ? 'reviews' : 'review' }})
        </div>
        <div v-else class="col-12 text-center subheading text-regalBlue">
          No Reviews Yet
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['level', 'duration', 'hours', 'minutes', 'rating', 'reviews'],
  methods: {
    getDuration() {
      let extraHours = this.hours / 24
      let extraHrs = this.minutes / (3600 * 24)
      const days = Math.ceil(this.duration + extraHours + extraHrs)
      return days > 1 ? `${days} days` : `${days} day`
    },
    getHours() {
      const hours = this.hours
      let extraHrs = Math.floor(this.minutes / (3600 * 24))
      const days = Math.floor(hours + extraHrs)
      return days > 0
        ? days + ':' + this.minutes + ' Hrs'
        : this.minutes + ' Min'
    }
  }
}
</script>

<style lang="scss" scoped>
.img-style {
  width: 40px;
  height: 40px;
}
.container {
  filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.1));
  margin-top: 60px;
  @media only screen and (max-width: $breakpoint-xs) {
    margin-top: 30px;
  }
}
.subheading {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 20px;
  padding: 0px 10px;
}
.reviews {
  border-radius: 10px;
  height: 100%;
  .icon {
    margin-top: 16px;
    width: 40px;
    height: 40px;
  }
  .subheading {
    margin-top: 16px;
  }
}
.duration {
  margin-right: 20px;
  border-radius: 10px;
  height: 100%;
  .icon {
    margin-top: 16px;
    width: 40px;
    height: 40px;
  }
  .subheading {
    margin-top: 16px;
  }
  @media only screen and (max-width: $breakpoint-sm) {
    margin-right: 0px;
    margin-bottom: 20px;
    height: auto;
  }
}
.level {
  border-radius: 10px;
  margin-right: 20px;
  height: 100%;
  .icon {
    margin-top: 18.5px;
    width: 40px;
    height: 40px;
  }
  .subheading {
    margin-top: 16px;
  }
  @media only screen and (max-width: $breakpoint-sm) {
    margin-right: 0px;
    margin-bottom: 20px;
    height: auto;
  }
}
</style>
