<template>
  <q-header bordered elevated class="bg-primary">
    <q-toolbar class="q-my-sm">
      <div class="q-mx-md-xl q-mx-sm-xl q-mx-xs-md">
        <q-img
          class="cursor-pointer"
          @click="onLogoClick"
          style="width: 200px"
          src="~assets/AppName.svg"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>
<script>
export default {
  name: 'Header404',
  methods: {
    // ************ Navigate back to default page *****************************8
    onLogoClick() {
      this.$emit('on-header-icon-click')
    }
  }
}
</script>
