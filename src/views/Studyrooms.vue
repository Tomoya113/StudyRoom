<template>
  <div>
    <h1 class="display-1">自習室を探そう</h1>
    <div>
      <v-card tile width="250" height="250" v-for="studyroom in studyrooms" :key="studyroom.title">
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{studyroom.title}}</v-list-item-title>
          <v-list-item-subtitle>{{studyroom.subtitle}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-progress-linear
          color="teal"
          buffer-value="0"
          :value="studyroom.enterPeople/studyroom.maxPeople*100"
          stream
        ></v-progress-linear>
        <v-card-actions>
          <v-btn text>入室する</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      studyrooms: [
        { title: 'Room101', subtitle: '数学がんばろう', enterPeople: '10', maxPeople: '20' },
        { title: 'Room101', subtitle: '数学がんばろう', enterPeople: '10', maxPeople: '20' },
        { title: 'Room101', subtitle: '数学がんばろう', enterPeople: '10', maxPeople: '20' },
        { title: 'Room101', subtitle: '数学がんばろう', enterPeople: '10', maxPeople: '20' },
        { title: 'Room101', subtitle: '数学がんばろう', enterPeople: '10', maxPeople: '20' },
      ]
    }
  }
}
</script>