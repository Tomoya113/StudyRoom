<template>
  <v-app>
    <v-navigation-drawer app mini-variant="true" expand-on-hover="true">
      <v-list-item>
        <v-list-item-title class="title">YAKITORI</v-list-item-title>
        <v-btn icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list nav>
        <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.url">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view />
    </v-content>

    <v-footer app>
      MADE BY YAKITORI.rb
      <!-- フッター -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    menus: [
      { title: 'Home', icon: 'mdi-home', url: '/' },
      { title: 'Study Room', icon: 'mdi-apps', url: '/studyrooms' },
      { title: 'About', icon: 'mdi-information-variant', url: '/about' },
      { title: 'Logout', icon: 'mdi-logout', url: '/logout' }
    ]
  })
}
</script>