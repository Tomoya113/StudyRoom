<template>
  <v-app>
    <v-navigation-drawer app mini-variant expand-on-hover>
      <v-list-item>
        <v-list-item-title class="title">Room101</v-list-item-title>
        <v-btn icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list nav>
        <v-list-item
          v-for="menu in menus"
          :key="menu.title"
          @click="menu.action"
        >
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
      { title: 'チャット', icon: 'mdi-message', action: 'chat' },
      { title: '表示名を変更', icon: 'mdi-pencil', action: 'changeName' },
      { title: '合言葉を設定', icon: 'mdi-lock', action: 'lock' },
      { title: '退出', icon: 'mdi-logout', action: 'roomout' },
    ],
  }),
}
</script>
