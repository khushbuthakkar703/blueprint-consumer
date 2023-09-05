<template>
  <div class="bg-primary">
    <div class="row items-center q-py-md">
      <div class="col-2">
        <q-btn
          v-if="showBackIcon == 'true'"
          v-bind:to="backTarget"
          flat
          color="white"
          icon="keyboard_backspace"
          size="lg"
        />
        <div v-else style="height:51px"></div>
      </div>
      <div
        class="col-8 row text-white text-h6 text-center justify-center ellipsis-2-lines"
        :class="titleClass"
      >
        {{ title }}
      </div>
      <div class="col-2 row  text-subtitle1 justify-center">
        <q-icon
          v-if="settingsMenu"
          color="white"
          size="sm"
          name="more_vert"
          @click="$emit('menu-click', $event)"
        />
        <q-icon
          v-if="calendarMenu"
          color="white"
          size="sm"
          name="event"
          @click="$router.push({ name: 'mobile-calendar' })"
        />
        <WishlistIcon
          v-if="
            showWishlistIcon &&
              blooprint['attributes']['status'] !== 'delete' &&
              blooprint['attributes']['status'] !== 'unpublish'
          "
          :active="blooprint['attributes']['wishlist']"
          :blooprint="blooprint"
        />
        <a
          v-if="textMenu"
          class="justify-center text-white"
          style="text-decoration:none;"
          @click="onRightButtonClick()"
          >{{ rightButtonTitle }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import WishlistIcon from 'components/WishlistIcon.vue'

export default {
  name: 'Header',
  data() {
    return {
      showWishlistIcon: false
    }
  },
  props: [
    'title',
    'titleClass',
    'rightButtonTitle',
    'backTarget',
    'rTarget',
    'showBackIcon',
    'calendarMenu',
    'wishlistMenu',
    'settingsMenu',
    'textMenu',
    'blooprint'
  ],
  components: {
    WishlistIcon
  },
  mounted() {
    this.showWishList()
  },
  updated() {
    this.showWishList()
  },
  methods: {
    showWishList() {
      if (this.blooprint && this.blooprint['id']) {
        this.showWishlistIcon = this.wishlistMenu
      }
    },
    onRightButtonClick() {
      if (this.rightButtonTitle == 'Done') {
        this.$emit('done-click', true)
      } else {
        this.$router.push(this.rTarget)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.q-separator {
  background: $solitude;
}
</style>
