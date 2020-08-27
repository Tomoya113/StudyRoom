<template>
  <v-app>
    <SideNav />
  </v-app>
</template>

<script>
import firebase from 'firebase';
import SideNav from './components/SideNav';
import { mapActions } from 'vuex';

export default {
  name: 'App',

  components: {
    SideNav,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
      }
    });
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['setLoginUser']),
  },
};
</script>
