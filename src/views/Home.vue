<template>
  <div class="home">
    <v-btn color="info" @click="login" v-if="$store.state.auth.login_user==null">Googleアカウントでログイン</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['login']),
  },
}
</script>
