<template>
  <div>
    <q-input
      ref="password"
      v-model.trim="password"
      borderless
      :type="isPwd ? 'password' : 'text'"
      :label="label"
      :color="requestFrom == 'desktopSignup' ? 'white' : 'primary'"
      :label-color="requestFrom == 'desktopSignup' ? 'white' : 'grey'"
      :input-class="
        requestFrom == 'desktopSignup' ? 'text-white' : 'text-charcoal'
      "
      :class="
        requestFrom == 'desktopSignup'
          ? hasError
            ? 'border-bottom-columbia error-bottom-border'
            : 'border-bottom-columbia '
          : hasError
          ? 'border-secondary bg-white q-px-md rounded-borders error-full-border'
          : 'border-secondary bg-white q-px-md rounded-borders'
      "
      class="q-mb-lg q-pb-none"
      @change="onPasswordChange()"
      lazy-rules
      :rules="[
        val => requiredValidation(val) || 'Password is required',
        val =>
          minLengthValidation(val) ||
          'Password length should be atleast 7 characters'
      ]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          :color="requestFrom == 'desktopSignup' ? 'white' : null"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isPwd: true,
      password: '',
      hasError: false
    }
  },
  components: {},
  props: ['isbuttonClicked', 'label', 'requestFrom'],
  watch: {
    isbuttonClicked: function(newVal, oldVal) {
      if (newVal) {
        this.$refs.password.validate()
      }
    }
  },
  methods: {
    //   ************** Triggers when the input value changes *************************
    onPasswordChange() {
      this.$emit('password-value', this.password)
    },
    // ***************** Returns the Password Required Field Validation **********************
    requiredValidation(val) {
      this.hasError = !(val && val.length > 0)
      return val && val.length > 0
    },
    // ***************** Returns the Password Min Length Field Validation **********************
    minLengthValidation(val) {
      this.hasError = val && val.length < 7
      return val && val.length >= 7
    }
  }
}
</script>

<style lang="scss" scoped>
.error-full-border {
  border: 1px solid $errorColor;
}
.error-bottom-border {
  border-bottom: 1px solid $errorColor;
}
input {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
<style lang="scss">
.example-emojies {
  .po-password-strength-bar {
    border-radius: 2px;
    transition: all 0.2s linear;
    position: absolute;
    right: 10px;
    font-size: 20px;
    margin-top: auto;
    top: 5px;
    background-color: transparent !important;
  }

  .po-password-strength-bar.risky {
    &:before {
      content: '😱';
    }
  }

  .po-password-strength-bar.guessable {
    &:before {
      content: '😣';
    }
  }

  .po-password-strength-bar.weak {
    &:before {
      content: '🤨';
    }
  }

  .po-password-strength-bar.safe {
    &:before {
      content: '🙂';
    }
  }

  .po-password-strength-bar.secure {
    &:before {
      content: '😁';
    }
  }
}
</style>
