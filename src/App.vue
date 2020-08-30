<template>
  <v-app>
    <RoomSideNav v-if="this.$route.name == 'Studyroom'" />
    <SideNav v-else />
  </v-app>
</template>

<script>
import firebase from 'firebase';
import SideNav from './components/SideNav';
import RoomSideNav from './components/RoomSideNav';
import { mapActions } from 'vuex';

export default {
  name: 'App',

  components: {
    SideNav,
    RoomSideNav,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
        this.initCurrentUser(user);
      } else {
        this.deleteLoginUser();
      }
    });
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['setLoginUser', 'deleteLoginUser', 'initCurrentUser']),
  },
};
</script>
