<template>
  <div class="relative-position">
    <input
      type="file"
      @change="onImageUpload"
      accept=".jpg, image/*"
      ref="file"
      style="display: none"
      @click="onInputFileClick"
    />
    <q-avatar :size="$q.screen.gt.sm ? '150px' : '100px'">
      <q-img
        :src="userProfile.picture ? userProfile.picture : defaultPicture"
        class="profile-picture"
      >
        <template v-slot:loading>
          <div class="text-subtitle1 text-grey-9">
            <q-skeleton size="150px"></q-skeleton>
          </div>
        </template>
      </q-img>

      <div
        class="edit-profile-icon cursor-pointer"
        v-if="!userProfile.picture"
        @click="$refs.file.click()"
      >
        <q-img src="~assets/Edit Photo.svg" width="30px" height="30px" />
      </div>
      <div class="cursor-pointer edit-profile" v-else>
        <q-btn-dropdown
          dropdown-icon="img:EditPhoto.svg"
          content-class="user-dropdown-content menu-box-shadow border-radius-lg"
          size="17.5px"
          flat
          no-icon-animation
          :menu-offset="$q.screen.width > 330 ? [-10, 5] : [40, 0]"
          :menu-anchor="$q.screen.width > 330 ? 'bottom end' : 'bottom left'"
          :menu-self="$q.screen.width > 330 ? 'top end' : ''"
          auto-close
          unelevated
          :ripple="false"
          class="cursor-pointer dropdown-button"
        >
          <q-card>
            <q-card-section
              class="card-section"
              style="width: 264px; max-height: 140px; padding: 30px"
            >
              <div
                class="menu row items-center cursor-pointer"
                @click="$refs.file.click()"
              >
                <q-img
                  src="~assets/cameraupload.svg"
                  width="20px"
                  height="20px"
                ></q-img>
                <div
                  style="margin-left: 16px"
                  class="
                  f-w-600
                  text-fs-16 text-lh-24 text-regalBlue
                  hover-effect
                "
                >
                  Upload new profile
                </div>
              </div>

              <q-separator
                inset
                class="bg-solitude"
                style="height: 2px; margin: 16px 0px"
              />
              <div
                class="menu flex items-center cursor-pointer"
                @click="removeProfilepicture"
              >
                <q-img
                  src="~assets/deletepicture.svg"
                  width="20px"
                  height="20px"
                ></q-img>
                <div
                  style="margin-left: 16px"
                  class="
                  f-w-600
                  text-fs-16 text-lh-24 text-regalBlue
                  hover-effect
                "
                >
                  Remove picture
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-btn-dropdown>
      </div>
    </q-avatar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { file10MB } from '../../utils/common'
export default {
  name: 'EditProfilePicture',
  data() {
    return {
      defaultPicture: require('../../assets/ProfileIcon.svg')
    }
  },
  computed: {
    ...mapGetters(['userProfile', 'fileUrl'])
  },
  methods: {
    ...mapActions([
      'fileUploadToFirebase',
      'setToastMessage',
      'updateProfileData'
    ]),
    async removeProfilepicture() {
      const data = {
        picture: '',
        id: this.userProfile.id,
        requestFrom: 'editProfilePicture'
      }
      this.updateProfileData(data)
    },
    onInputFileClick(event) {
      event.target.value = ''
    },
    async onImageUpload(event) {
      if (event.target.files && event.target.files.length > 0) {
        let imageAdded = event.target.files[0]
        let fileName = imageAdded['name'].toLowerCase()
        if (
          fileName.endsWith('jpg') ||
          fileName.endsWith('jpeg') ||
          fileName.endsWith('png')
        ) {
          if (imageAdded['size'] > file10MB) {
            this.setToastMessage({
              type: 'negative',
              message: 'File size should not be greater than 10MB'
            })
          } else {
            let data = {
              file: imageAdded,
              type: 'image',
              from: 'profile'
            }
            this.fileUploadToFirebase(data)
          }
        } else {
          this.setToastMessage({
            type: 'negative',
            message: 'Upload valid Image File'
          })
        }
      }
    }
  },
  watch: {
    fileUrl(data) {
      this.updateProfileData({
        id: this.userProfile.id,
        picture: data.url,
        requestFrom: 'editProfilePicture'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  @media only screen and (max-width: $breakpoint-sm-max) {
    width: 100px !important;
    height: 100px !important;
  }
}
.edit-profile {
  position: absolute;
  bottom: -7px;
  right: -9px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    bottom: -8px;
    right: -20px;
  }
}

.card-section {
  width: 264px;
  @media only screen and (max-width: 330px) {
    max-width: 264px;
  }
}

.user-dropdown-content .q-card {
  border: 2px solid $solitude;
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.menu {
  .hover-effect {
    transition: color 0.3s;
    &:hover {
      color: $primary;
    }
  }
}

.edit-profile-icon {
  position: absolute;
  left: 112px;
  top: 112px;
  right: 8px;
  bottom: 8px;
  @media only screen and (max-width: $breakpoint-sm-max) {
    left: 70px;
    top: 70px;
  }
}

::v-deep {
  .q-btn--actionable {
    .q-focus-helper {
      visibility: hidden;
    }
  }
}
</style>
