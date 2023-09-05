<template>
  <div class="bg-white row overflow-hidden creator-section">
    <div class="col-4">
      <q-avatar
        class="creator-avatar cursor-pointer"
        size="150px"
        @click="navigateToAuthorScreen(authorId)"
      >
        <q-img :src="picture" />
      </q-avatar>
      <div class="image-wrapper" @click="navigateToAuthorScreen(authorId)">
        <q-img
          class="gt-sm creator-image cursor-pointer"
          :ratio="1"
          height="100%"
          :contain="picture.includes('User')"
          :src="picture"
        />
      </div>
    </div>
    <div class="creator-details col-md-7 col-sm-12 col-xs-12">
      <div
        @click="navigateToAuthorScreen(authorId)"
        class="
          creator-name
          text-capitalize text-regalBlue
          cursor-pointer
          ellipsis
        "
      >
        {{ authorName }}
      </div>
      <div class="job-company gt-xs text-comet">
        <span v-if="jobTitle">{{ jobTitle }}</span>
        {{ jobTitle && companyName ? '-' : '' }}
        <span v-if="companyName">{{ companyName }}</span>
      </div>
      <div class="job-company lt-sm text-comet">
        <span v-if="jobTitle">{{ jobTitle }}</span>
        {{ jobTitle && companyName ? '-' : '' }}
        <span v-if="companyName">{{ companyName }}</span>
      </div>
      <div class="description text-regalBlue">
        <div class="gt-xs ellipsis-4-lines">
          {{ description }}
        </div>
        <div class="lt-sm ellipsis-8-lines">
          {{ description }}
        </div>
        <div
          @click="navigateToAuthorScreen(authorId)"
          v-if="description !== undefined && description.length > 276"
          class="text-primary read-more-text cursor-pointer q-mt-sm"
        >
          Read more
        </div>
      </div>
      <div class="location text-capitalize text-comet">
        {{ location }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'picture',
    'authorName',
    'description',
    'location',
    'authorId',
    'jobTitle',
    'companyName'
  ],
  methods: {
    // ************** Navigate to Authors's Screen ***********************
    navigateToAuthorScreen(authorID) {
      this.$router.push({
        name: 'author-view',
        params: {
          profileId: authorID
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.creator-section {
  border-radius: 20px;
  margin-top: 30px;
  @media only screen and (max-width: 1400px) {
    padding: 20px;
  }
  .creator-details {
    padding: 30px;
    @media only screen and (max-width: 1400px) {
      width: 100%;
      padding: 0px;
    }
  }
  .creator-name {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    @media only screen and (max-width: 1400px) {
      margin-top: 30px;
    }
    @media only screen and (max-width: $breakpoint-xs) {
      margin-top: 20px;
      margin-bottom: 4px;
      font-size: 20px;
      line-height: 24px;
    }
  }
  .image-wrapper {
    height: 319px;
    @media only screen and (max-width: 1400px) {
      height: auto;
    }
  }
  .creator-image {
    @media only screen and (max-width: 1400px) {
      display: none;
    }
  }
  .creator-avatar {
    display: none;
    @media only screen and (max-width: 1400px) {
      display: inline;
    }
  }
  .job-company {
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    @media only screen and (max-width: $breakpoint-xs) {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .description {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin: 20px 0px;
  }
  .location {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  .read-more-text {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
