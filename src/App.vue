<template>
  <v-app>
    <AppBar v-if="this.$route.name !== 'Studyroom'" />
    <v-content style="height:100%">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import AppBar from './components/AppBar'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',

  components: {
    AppBar,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user)
        this.initCurrentUser(user)
      } else {
        this.deleteLoginUser()
      }
    })
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['setLoginUser', 'deleteLoginUser', 'initCurrentUser']),
  },
  computed: {
    ...mapGetters(['userName', 'photoURL']),
  },
}
</script>
