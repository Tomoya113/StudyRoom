<template>
  <div>
    <h1 class="display-1" style="margin:30px">自習室を探そう</h1>

    <v-container fluid class="d-flex justify-center flex-wrap">
      <v-card
        tile
        class="mx-auto studyroom-card"
        v-for="room in this.rooms"
        :key="room.title"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1 center">{{room.title}}</v-list-item-title>
            <v-list-item-subtitle class="center" v-if="room.subtitle">{{room.subtitle}}</v-list-item-subtitle>
            <v-list-item-subtitle class="center" v-else style="color:#ffffff">color</v-list-item-subtitle>

            <div style="margin-top:30px;margin-bottom:5px;">
              <p style="margin-bottom:3px;">入室人数</p>
              <!-- 入室状況のプロセスバーの表示 -->
              <v-progress-linear
                color="teal"
                :value="room.activeUsers/room.maxCount*100"
              ></v-progress-linear>
              <p style="text-align:right">{{room.activeUsers}}</p>
            </div>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-card-actions>
          <v-layout justify-center>
            <EnterRoomDialog
              v-if="room.password"
              :roomId="room.roomId"
            ></EnterRoomDialog>
            <v-btn :href="`/studyroom/${room.roomId}`" rounded color="primary" class="enter-btn" v-else>入室する</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import EnterRoomDialog from '../components/EnterRoomDialog';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    EnterRoomDialog,
  },
  created () {
    this.setRoomInformation();
    },
  methods: {
    ...mapActions(['setRoomInformation'])
  },
  computed: {
    ...mapGetters(['rooms'])
  }
}
</script>

<style scoped lang="sass">
.headline
  width: 100%
  margin-top: 20px

.studyroom-card
  width: 250px
  height: 250px
  border-radius: 50px!important
  margin: 30px!important
  float: left
  border-radius: 50px!important

.center
  text-align: center

.enter-btn
  margin-top: 4px
  margin-right: 8px
</style>