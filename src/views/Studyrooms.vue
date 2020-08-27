<template>
  <div>
    <h1 class="display-1" style="margin:30px">自習室を探そう</h1>

    <v-container fluid>
      <v-card
        tile
        class="mx-auto studyroom-card"
        v-for="studyroom in studyrooms"
        :key="studyroom.title"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1 center">{{studyroom.title}}</v-list-item-title>
            <v-list-item-subtitle class="center">{{studyroom.subtitle}}</v-list-item-subtitle>

            <div style="margin-top:30px;margin-bottom:5px;">
              <p style="margin-bottom:3px;">入室人数</p>
              <!-- 入室状況のプロセスバーの表示 -->
              <v-progress-linear
                color="teal"
                :value="studyroom.enterPeople/studyroom.maxPeople*100"
              ></v-progress-linear>
              <p style="text-align:right">{{studyroom.enterPeople}}</p>
            </div>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-card-actions>
          <v-layout justify-center>
            <EnterRoomDialog
              v-if="studyroom.lock"
              :roomId="studyroom.roomId"
              :lock="studyroom.lock"
              :password="studyroom.password"
            ></EnterRoomDialog>
            <v-btn :href="`/studyroom/${studyroom.roomId}`" rounded color="primary" class="enter-btn" v-else>入室する</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import EnterRoomDialog from '../components/EnterRoomDialog'

export default {
  components: {
    EnterRoomDialog,
  },

  data () {
    return {
      // studyroomに仮のデータを入れているので、これをDBデータに入れ替えてほしい
      studyrooms: [
        { roomId: '32891', title: 'Room101', subtitle: '数学がんばろう', enterPeople: '10', maxPeople: '20', lock: false, password: null },
        { roomId: '48923', title: 'Room102', subtitle: '数学がんばろう', enterPeople: '20', maxPeople: '20', lock: false, password: null },
        { roomId: '21314', title: 'Room103', subtitle: '数学がんばろう', enterPeople: '12', maxPeople: '20', lock: true, password: 'password' },
        { roomId: '52432', title: 'Room104', subtitle: '数学がんばろう', enterPeople: '3', maxPeople: '20', lock: false, password: null },
        { roomId: '45232', title: 'Room105', subtitle: '数学がんばろう', enterPeople: '5', maxPeople: '20', lock: true, password: 'password' },
        { roomId: '64953', title: 'Room106', subtitle: '数学がんばろう', enterPeople: '5', maxPeople: '20', lock: false, password: null },
      ],
    }
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