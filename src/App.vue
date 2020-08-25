<template>
  <v-app>
    <SideNav />
  </v-app>
</template>

<script>
import SideNav from './components/SideNav'

export default {
  name: 'App',

  components: {
    SideNav,
  },

  data: () => ({
    //
  }),
}
</script>
