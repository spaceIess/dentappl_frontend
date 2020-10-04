/* eslint-disable */

<template>
  <v-container id="signinup-form" class="fill-height">
    <!-- <Notification
      :message="snackbarMessage"
      :snackbar="snackbar"
      :type="snackbarType"
    /> -->
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="12" md="12" class="">
        <v-card class="evelation-12 card">
          <v-window v-model="step">
            <!--SignIn-->
            <v-window-item :value="1">
              <v-row class="">
                <v-col cols="6" md="6" class="pt-6 pb-6">
                  <v-card-text>
                    <v-form class="signup-form-form" @submit.prevent="signin">
                      <h1
                        class="text-center display-1 mb-10"
                        :class="`${bgColor}--text`"
                      >
                        Sign in
                      </h1>
                      <v-text-field
                        id="username"
                        v-model="phone"
                        label="Phone"
                        name="Phone"
                        type="text"
                        :color="bgColor"
                      />
                      <v-text-field
                        v-if="codeSent"
                        id="password"
                        v-model="code"
                        label="Code"
                        name="Code"
                        type="password"
                        :color="bgColor"
                      />
                      <div class="text-center mt-6">
                        <v-btn
                          type="submit"
                          large
                          :color="bgColor"
                          dark
                        >
                          Sign In
                        </v-btn>
                      </div>

                    </v-form>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="6"
                  md="4"
                  class="darken-2 vcenter"
                  :class="`${bgColor}`"
                >
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">No User?</h1>
                      <h5 class="text-center overline mb-3">
                        You can try out it for free
                      </h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn
                        @click="signinGuest"
                        large
                        :color="bgColor"
                        dark
                      >
                        Sign in as Guest
                      </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
       v-model="snackbar"
     >
       {{ snackbarMessage }}

       <!-- <template
        v-slot:action="{ attrs }"
       > -->
         <!-- <v-btn
           color="pink"
           text
           v-bind="attrs"
           @click="snackbar = false"
         >
           Close
         </v-btn> -->
       <!-- </template> -->
     </v-snackbar>
  </v-container>

</template>

<script>
// import Notification from './Notification'
import CONFIG from '~/config'

export default {
  layout: 'login',
  name: 'Signupform',
  // components: {
  //   Notification
  // },
  props: {
    source: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: 'indigo'
    },
    fgColor: {
      type: String,
      default: 'white'
    }
  },
  data: () => ({
    step: 1,
    phone: '',
    code: '',
    snackbarType: 'success',
    snackbarMessage: '',
    snackbar: false,
    codeSent: false
  }),
  methods: {
    async login () {
      const response = await this.$auth.loginWith('local', {
        data: {
          phone: this.phone,
          code: this.code,
          device_type: 'web',
          device_token: 'null',
          app_token: CONFIG.appToken
        }
      })
      this.$auth.setUser(response.data.payload.session.user)
      this.snackbarType = response.data.type
      this.snackbarMessage = response.data.message
      this.snackbar = true
      this.$router.push('/')
    },
    async signinGuest () {
      await this.catchError(this.login)
    },
    async sendCode () {
      await this.$axios.$post('/api/v2/sessions/send_code', {
        phone: this.phone,
        app_token: CONFIG.appToken
      })

      this.codeSent = true
    },
    async catchError (func, args) {
      try {
        await func()
      } catch (e) {
        this.snackbarType = 'error'
        this.snackbarMessage = 'Error signing you in'
        this.snackbar = true
      }
    },
    async signin () {
      const fn = this.codeSent ? this.login : this.sendCode
      await this.catchError(fn)
    }
  }
}
</script>

<style scoped lang="scss">
.v-input__icon--double .v-input__icon {
  margin-left: -4.25rem !important;
}

a.no-text-decoration {
  text-decoration: none;
}

#signinup-form {
  max-width: 75rem;
  margin-top: 10rem;
}

.signup-form-form {
  max-width: 75%;
  margin: 0 auto;
}

.card {
  overflow: hidden;
}

.vcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
