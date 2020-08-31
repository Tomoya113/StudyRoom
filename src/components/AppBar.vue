<template>
  <div>
    <v-app-bar color="accent-4" dense dark>
      <v-toolbar-title>Study Room</v-toolbar-title>

      <v-spacer></v-spacer>
      <div v-if="$store.state.auth.login_user">
        <v-btn :to="{name: 'Home'}" text>ホーム</v-btn>
        <v-btn :to="{name: 'Studyrooms'}" text>自習室を探す</v-btn>
        <v-btn :to="{name: 'About'}" text>使い方</v-btn>
      </div>

      <v-menu left bottom offset-y open-on-hover v-if="$store.state.auth.login_user">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="navigatioToUserPage">
            <v-avatar size="36px">
              <img v-if="photoURL" alt="Avatar" :src="photoURL" />
              <v-icon v-else :color="message.color">account</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="navigatioToUserPage">
            <v-list-item-title>{{userName}}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="onLogout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-footer app>
      MADE BY YAKITORI.rb
      <!-- フッター -->
    </v-footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    menus: [
      { title: 'Home', icon: 'mdi-home', url: '/' },
      { title: 'Study Room', icon: 'mdi-apps', url: '/studyrooms' },
      { title: 'About', icon: 'mdi-information-variant', url: '/about' },
    ],
  }),
  methods: {
    ...mapActions(['logout']),
    navigatioToUserPage () {
      this.$router.push({ path: '/user' })
    },
    onLogout() {
      this.logout()
      this.$router.push({path: '/'})
    },
  },
  computed: {
    ...mapGetters(['userName', 'photoURL']),
  },
};
</script>
