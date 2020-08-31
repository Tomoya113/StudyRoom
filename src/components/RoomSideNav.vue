<template>
  <v-app>
    <!-- <v-navigation-drawer app mini-variant expand-on-hover>
      <v-list-item>
        <v-list-item-title class="title">Room101</v-list-item-title>
        <v-btn icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
    <v-divider />-->
    <!-- NOTE: チャット -->
    <!-- <v-list-item @click.stop="">
        <v-list-item-icon>
          <v-icon>mdi-message</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>チャット</v-list-item-title>
        </v-list-item-content>
    </v-list-item>-->

    <!-- TODO: @click.stopでのaction起動をできるようにする→コードがきれいになる -->
    <!-- NOTE: 表示名を変更 -->
    <!-- <v-list-item @click.stop="changeNameD">
        <v-list-item-icon>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>表示名を変更</v-list-item-title>
        </v-list-item-content>
    </v-list-item>-->

    <!-- NOTE: 合言葉を設定 -->
    <!-- <v-list-item @click.stop="changeLockD">
        <v-list-item-icon>
          <v-icon>mdi-lock</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>合言葉を設定</v-list-item-title>
        </v-list-item-content>
    </v-list-item>-->

    <!-- NOTE: 退出 -->
    <!-- <v-list-item @click.stop="changeRoomoutD">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>退出</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>-->

    <!-- <v-content>
      <router-view />
    </v-content> -->

    <v-footer app>
      MADE BY YAKITORI.rb
      <!-- フッター -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['changeNameD', 'changeLockD', 'changeRoomoutD']),
  },
};
</script>
