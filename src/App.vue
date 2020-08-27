<template>
  <v-app>
    <RoomSideNav v-if="this.$route.name == 'Studyroom'" />
    <SideNav v-else />
  </v-app>
</template>

<script>
import SideNav from './components/SideNav'
import RoomSideNav from './components/RoomSideNav'

export default {
  name: 'App',

  components: {
    SideNav,
    RoomSideNav
  },

  data: () => ({
    //
  }),
}
</script>
