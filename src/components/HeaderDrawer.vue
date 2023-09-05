<template>
  <q-drawer
    side="left"
    v-model="displayDrawerMenu"
    :show-if-above="false"
    :width="300"
    :breakpoint="1022"
    bordered
    overlay
    :no-swipe-backdrop="true"
    class="bg-grey-3"
    @hide="onDrawerHide"
  >
    <q-scroll-area class="fit">
      <q-item class="bg-primary" v-if="isUserLoggedIn">
        <q-item-section>
          <div class="row q-my-md">
            <div class="col-4">
              <q-avatar
                square
                v-if="hasProfilePicture(loggedInUserDetails)"
                size="75px"
              >
                <img :src="loggedInUserDetails.picture" />
              </q-avatar>
              <q-avatar square v-else size="75px">
                <img src="~assets/UserProfile.svg" />
              </q-avatar>
            </div>
            <div class="col-8">
              <div v-if="userName != ''" class="ellipsis text-white">
                {{
                  userName.length > 20
                    ? userName.substring(0, 20) + '...'
                    : userName
                }}
              </div>
              <div class="ellipsis text-white">
                {{ loggedInUserDetails.email }}
              </div>
              <div
                class="ellipsis q-mt-md text-white cursor-pointer"
                @click="onViewProfileClick"
              >
                View Profile
              </div>
            </div>
          </div>
        </q-item-section>
      </q-item>
      <q-list>
        <q-item clickable v-ripple v-for="item in tabsList" :key="item.name">
          <q-item-section @click="onTabSelect(item)" class="q-ml-sm">
            {{ item.label }}
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          v-for="item in menuItemList"
          :key="item.name"
        >
          <q-item-section @click="onMenuItemClick(item)" class="q-ml-sm">
            {{ item.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
export default {
  data() {
    return {
      displayDrawerMenu: true
    }
  },
  props: [
    'userName',
    'tabsList',
    'menuItemList',
    'isUserLoggedIn',
    'loggedInUserDetails'
  ],
  methods: {
    // ************* Triggers when Menu is Selected *******************
    onMenuItemClick(item) {
      this.displayDrawerMenu = false
      this.$emit('on-menu-item-select', item)
    },
    // ************* Triggers when Drawer hides *******************
    onDrawerHide() {
      this.displayDrawerMenu = false
      this.$emit('on-drawer-close')
    },
    // ************* Triggers when A Tab is selected *******************
    onTabSelect(item) {
      this.$router.push(item['routeTo'])
      this.onDrawerHide()
    },
    // ************ Method to check the user has Profile picture or not *********************
    hasProfilePicture(userData) {
      if (userData['picture']) {
        return userData['picture'] != '' && userData['picture'] != null
      } else {
        return false
      }
    },
    // ****************** Open My-Profile Screen ******************************8
    onViewProfileClick() {
      this.$router.push({ name: 'my-profile' })
    }
  }
}
</script>
<style lang="scss" scoped></style>
