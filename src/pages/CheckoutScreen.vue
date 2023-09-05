<template>
  <q-page class="q-mx-md-xl q-mx-sm-lg q-mx-xs-md">
    <div class="row bg-white shadow-1 q-pt-xl" style="min-height:750px;">
      <div
        class="col-md col-sm-6 col-xs-12 q-my-xl q-my-sm-xl q-my-xs-md text-center"
      >
        <div class="column q-mx-md-xl q-mx-sm-md q-mx-xs-md">
          <div class="row q-mx-md-md justify-between">
            <div class="row">
              <q-skeleton type="QSlider" class="q-mr-sm" v-if="loading" />
              <div
                v-else
                class="text-nightRider text-h6 text-weight-regular
 q-my-sm text-left wrap-anywhere"
                style=" overflow: hidden;
width:300px;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;"
              >
                {{ blooprintData['attributes']['name'] }}
              </div>
            </div>
            <div class="row">
              <q-skeleton type="QSlider" v-if="loading" />
              <div
                v-else
                class="text-nightRider text-h4 text-right text-bold q-my-sm"
              >
                {{ blooprintData['attributes']['currency'] }}
                {{ blooprintData['attributes']['price'] }}
              </div>
            </div>
          </div>
          <div class="q-mx-md-md full-width">
            <q-skeleton v-if="loading" class="q-mt-md" height="200px" square />
            <q-img
              v-else
              class="rounded-borders q-mt-sm"
              height="250px"
              contain
              :ratio="4 / 3"
              :src="
                blooprintData['attributes']['thumbnail']
                  ? blooprintData['attributes']['thumbnail']
                  : '~assets/NoImage.png'
              "
            >
              <template v-slot:error>
                <q-img src="~assets/NoImage.png" class="full-width" />
              </template>
            </q-img>
          </div>
        </div>
      </div>
      <div
        class="col-md col-sm-6 col-xs-12 q-my-xl q-my-xs-md q-mr-md-xl q-pr-sm-sm q-px-xs-md q-pr-md-xl"
      >
        <div v-if="loading">
          <q-skeleton type="QInput" class="q-mt-xl" />
          <q-skeleton type="QInput" class="q-mt-md" />
          <q-skeleton type="QInput" class="q-mt-md" />
          <q-skeleton type="QInput" class="q-mt-xs" />
          <div class="flex flex-center">
            <q-skeleton type="QBtn" class="q-mt-sm " />
          </div>
        </div>
        <CardInputFields v-else :blooprintData="blooprintData" />
      </div>
    </div>
  </q-page>
</template>
<script>
import CardInputFields from 'components/CardInputFields.vue'
import { mapActions } from 'vuex'

export default {
  meta() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      blooprintData: {},
      loading: true
    }
  },
  components: {
    CardInputFields
  },
  mounted() {
    this.fetchBlooprintDetails()
  },
  methods: {
    ...mapActions(['getBlooprintDetailsById']),
    async fetchBlooprintDetails() {
      this.loading = true
      let data = await this.getBlooprintDetailsById()
      this.blooprintData = data
      this.loading = false
    }
  }
}
</script>
