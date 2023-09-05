<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-pull-to-refresh bg-color="primary" color="white" @refresh="refresh">
        <router-view />
        <q-page-sticky
          expand
          position="bottom"
          v-if="showTabs"
          style="z-index:1"
        >
          <div class="full-width bg-white">
            <q-tabs
              v-model="activeTab"
              stretch
              mobile-arrows
              narrow-indicator
              no-caps
              class="text-primary dense"
            >
              <q-route-tab
                name="Featured"
                :to="{ name: 'feature-blooprint' }"
                :icon="activeTab == 'Featured' ? 'star' : 'star_outline'"
                :class="
                  activeTab == 'Featured' ? 'text-primary' : 'text-manatee'
                "
                label="Featured"
                @click="onTabChange('Featured')"
              />
              <q-route-tab
                name="Calendar"
                :to="{ name: 'mobile-calendar' }"
                :icon="activeTab == 'Calendar' ? 'event' : 'event'"
                :class="
                  activeTab == 'Calendar' ? 'text-primary' : 'text-manatee'
                "
                label="Calendar"
                @click="onTabChange('Calendar')"
              />
              <q-route-tab
                name="My Blooprints"
                :to="{ name: 'my-blooprints' }"
                label=""
                :class="
                  activeTab == 'My Blooprints'
                    ? 'text-primary q-tab__label'
                    : 'text-manatee q-tab__label'
                "
                @click="onTabChange('My Blooprints')"
              >
                <q-icon size="sm">
                  <img
                    v-if="activeTab == 'My Blooprints'"
                    src="~assets/BlooprintActive.svg"
                    width="100%"
                  />
                  <img
                    v-else
                    src="~assets/BlooprintInactive.svg"
                    width="100%"
                  />
                </q-icon>
                <span class="q-tab__label">My Blooprints</span>
              </q-route-tab>

              <q-route-tab
                name="Wishlist"
                :to="{ name: 'mobile-wishlist' }"
                :icon="activeTab == 'Wishlist' ? 'favorite' : 'favorite_border'"
                :class="
                  activeTab == 'Wishlist' ? 'text-primary' : 'text-manatee'
                "
                label="Wishlist"
                @click="onTabChange('Wishlist')"
              />
              <q-route-tab
                name="Account"
                :to="accountRoute"
                class="text-manatee"
                icon="person_outline"
                label="Account"
              />
            </q-tabs>
          </div>
        </q-page-sticky>
      </q-pull-to-refresh>
    </q-page-container>
  </q-layout>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeTab: 'Featured',
      showTabs: true,
      allowedRouteList: [
        '/blooprint/feature',
        '/blooprint/my-blooprints',
        '/mobile/blooprints/wishlist',
        '/mobile/blooprints/calendar'
      ],
      accountRoute: `/profiles`
    }
  },
  mounted() {
    this.isRequestFromMobile(true)
    this.fetchLoggedInUserDetails()
    this.checkTabsAccess()
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  watch: {
    userProfile(data) {
      this.accountRoute = `/profiles/${data['id']}/view`
    }
  },
  // **************** Triggers on DOM Changes *****************************
  updated() {
    this.checkTabsAccess()
  },
  methods: {
    ...mapActions(['fetchLoggedInUserDetails', 'isRequestFromMobile']),
    // *************** Method to check whether to display Tabs or Not **********************
    checkTabsAccess() {
      let currentRoute = this.$router.currentRoute.path
      if (this.allowedRouteList.includes(currentRoute)) {
        this.showTabs = true
      } else {
        this.showTabs = false
      }
      this.isRequestFromMobile(true)
    },
    refresh(done) {
      setTimeout(() => {
        window.location.reload()
        done()
      }, 1000)
    },
    onTabChange(tabName) {
      this.activeTab = tabName
    }
  }
}
</script>
<style lang="scss">
.q-tab {
  padding: 0 10px !important;
}
.q-tab__label {
  font-size: 12px !important;
}
.q-tab__icon {
  font-size: 20px !important;
}
</style>
