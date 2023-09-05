<template>
  <q-page>
    <!-- <div class="text-right">
      <q-btn
        no-caps
        flat
        outline
        class="text-dimGrey q-mt-sm text-body2 bg-white border-secondary"
      >
        <div class="text-dimGrey">Share</div>
        <q-icon color="primary" right name="share" />
      </q-btn>
    </div> -->
    <div class="q-my-md img-style rounded-borders" @click="closeDrawerMenu">
      <q-img
        fit="fill"
        class="full-height rounded-borders"
        cover
        :ratio="21 / 9"
        :src="blooprintDetails['attributes']['thumbnail']"
      />
    </div>
    <div
      class="text-nightRider text-bold text-body1 word-break-break-word"
      :class="displayDrawerMenu ? 'q-mx-sm' : null"
      @click="closeDrawerMenu"
    >
      {{ blooprintDetails['attributes']['name'] }}
    </div>
    <div
      class="text-nightRider text-grey text-caption q-ml-md-none q-ml-sm-sm q-ml-xs-sm word-break-break-word"
    >
      Creator {{ blooprintDetails['attributes']['authorName'] }}
    </div>
    <div
      class="q-mt-sm text-dimGrey text-body2 word-break-break-word"
      :class="displayDrawerMenu ? 'q-mx-sm' : null"
      @click="closeDrawerMenu"
    >
      {{ blooprintDetails['attributes']['description'] }}
    </div>
    <div class="q-mt-md">
      <q-list
        class="milestone-task"
        v-for="milestone in blooprintMileStoneList"
        :key="milestone.id"
      >
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar class="text-nightRider flex flex-center">
              <q-avatar
                class="text-weight-bold bg-solitude"
                square
                size="30px"
                >{{ milestone['attributes']['order'] }}</q-avatar
              >
            </q-item-section>
            <q-item-section
              class="text-nightRider text-body1 text-bold word-break-break-word"
            >
              {{ milestone['attributes']['name'] }}
            </q-item-section>
          </template>
          <q-list dense class="rounded-borders">
            <q-item
              v-ripple
              dense
              v-for="task in milestone.attributes.tasks"
              :key="task.id"
            >
              <q-item-section
                class="row flex text-center justify-between"
                :class="
                  blooprintDetails['attributes']['purchased']
                    ? 'cursor-pointer'
                    : null
                "
                @click="onTaskSelect(task, milestone)"
              >
                <div
                  class="row text-charcoal text-left word-break-break-word text-body1 q-pl-md-md q-pl-sm-md q-pl-xs-md"
                >
                  <div class="col-1">
                    <q-avatar size="12px" color="indigo-10" />
                  </div>
                  <div class="col q-ml-xs-md">
                    {{ task.name }}
                  </div>
                  <div class="col-3 text-right">
                    {{ task.days }}
                    <span>day</span>
                    <span :class="task.days > 1 ? null : 'invisible'">s</span>
                  </div>
                </div>
                <!-- <div class="row q-ml-sm q-pl-xl text-grey text-caption">
                  <div class="col-sm col-xs-8 text-left">
                    Scheduled for
                  </div>
                  <div class="col-sm-3 col-xs-4 text-right">
                    {{ task.days }} day{{ task.days > 1 ? 's' : '' }}
                  </div>
                </div> -->
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'DesktopBlooprintMilestoneList',
  data() {
    return {}
  },
  props: ['blooprintDetails', 'blooprintMileStoneList', 'displayDrawerMenu'],
  methods: {
    onTaskSelect(task, milestone) {
      if (this.blooprintDetails['attributes']['purchased']) {
        this.$router.push({
          name: 'desktop-blooprint-task-landing-page',
          params: {
            blooprintId: this.blooprintDetails['id'],
            milestoneId: milestone['id'],
            taskId: task['id']
          }
        })
      }
      this.closeDrawerMenu()
    },
    closeDrawerMenu() {
      this.$emit('close-drawer-menu')
    }
  }
}
</script>
<style lang="scss" scoped>
.img-style {
  height: 216px;
  max-width: 600px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    height: 300px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    height: 300px;
  }
}
</style>
<style lang="scss">
.milestone-task {
  .q-item {
    padding: 0px 0px !important;
  }
}
</style>
