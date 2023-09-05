<template>
  <div id="q-app">
    <OfflineMessage v-if="!isAppOnline" :status="isAppOnline" />
    <ApiFailureMessage v-else-if="isAPIFailed" @clicked="isAPIFailed = false" />
    <router-view v-else />
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import ApiFailureMessage from 'components/ApiFailureMessage.vue'
import OfflineMessage from 'components/OfflineMessage.vue'
//Carousel related imports
import { Swiper as SwiperClass } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import 'swiper/swiper-bundle.min.css'
//registering Carousel globally
Vue.use(getAwesomeSwiper(SwiperClass))
const { directive } = getAwesomeSwiper(SwiperClass)
Vue.directive('swiper', directive)

export default {
  name: 'App',
  data() {
    return {
      isAPIFailed: false,
      isAppOnline: true
    }
  },
  components: {
    ApiFailureMessage,
    OfflineMessage
  },
  computed: {
    ...mapGetters(['showLoading', 'toastMessage', 'isApiResonseFailed'])
  },
  watch: {
    showLoading(val) {
      if (val) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    },
    toastMessage(data) {
      if (data) {
        this.$q.notify({
          position: 'top',
          timeout: 2500,
          textColor: 'white',
          actions: [{ icon: 'close', color: 'white' }],
          ...data
        })
      }
    },
    isApiResonseFailed(data) {
      this.isAPIFailed = data
    },
    $route() {
      this.isAPIFailed = false
      this.isAPIResponseFailed(false)
    }
  },
  created() {
    window.addEventListener('load', () => {
      // now we listen for network status changes
      this.isAPIResponseFailed(false)
      this.isAppOnline = navigator.onLine
      window.addEventListener('online', () => {
        console.log('online')
        this.isAppOnline = true
      })

      window.addEventListener('offline', () => {
        console.log('offline')
        this.isAppOnline = false
      })
    })
  },
  methods: {
    ...mapActions(['isAPIResponseFailed'])
  }
}
</script>
