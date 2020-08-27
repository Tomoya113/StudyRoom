<template>
  <div class="home">
    <v-btn color="info" @click="login">Googleアカウントでログイン</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['login']),
  },
};
</script>
