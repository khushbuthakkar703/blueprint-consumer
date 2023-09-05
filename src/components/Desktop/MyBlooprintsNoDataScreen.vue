<template>
  <div class="bg-primary no-blooprint-msg-screen">
    <div class="flex flex-center">
      <div class="text-white msg-heading f-w-600">
        Looks like you haven’t purchased any blooprints yet
      </div>
    </div>
    <div class="flex flex-center">
      <div class="text-white text-body1 q-mt-sm f-w-400">
        In just a few clicks you can unlock your potential with a blooprint
      </div>
    </div>
    <div class="flex flex-center">
      <q-btn
        color="white"
        label="Explore blooprints"
        no-caps
        no-wrap
        text-color="primary"
        class="f-w-600 row explore-btn"
        :to="{ name: 'explore-screen' }"
      >
        <div class="col q-py-xs text-left text-primary relative-position">
          <q-icon class="arrow q-ml-sm" size="28px" name="navigate_next" />
        </div>
      </q-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyBlooprintNoDataScreen'
}
</script>
<style lang="scss" scoped>
.no-blooprint-msg-screen {
  margin-top: 40px;
  padding: 48px 40px 56px;
  border-radius: 8px;
  margin-bottom: 238px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    margin-top: 60px;
  }
  @media only screen and (max-width: $breakpoint-xs-max) {
    margin-top: 80px;
    padding: 48px 20px 56px;
    margin-bottom: 100px;
  }
}
.msg-heading {
  font-size: 24px;
  line-height: 32px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    font-size: 16px;
    line-height: 24px;
  }
}
.explore-btn {
  border-radius: 10px;
  height: 50px;
  width: 228px;
  font-size: 16px;
  line-height: 24px;
  padding-left: 15px;
  margin-top: 28px;
  @media only screen and (max-width: $breakpoint-xs-max) {
    width: 210px;
    padding-left: 10px;
  }
}
</style>
