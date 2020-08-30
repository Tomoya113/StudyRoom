<template>
  <div>
    <!-- カレンダータイトル -->
    <div class="calendar_top">
      <h1 class="display-1" style="margin:30px">勉強の記録</h1>
      <v-btn fab text small color="grey darken-2" @click="prev">
        <v-icon small>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn fab text small color="grey darken-2" @click="next">
        <v-icon small>mdi-chevron-right</v-icon>
      </v-btn>
      <h2>{{calendar_title}}</h2>
    </div>

    <!-- calendar -->
    <v-sheet height="500">
        <v-calendar
         ref="calendar"
         v-model="focus"
         color="primary"
         :type="type"
         :now="today"
         :value="today"
         @change="updateCalendar"
       >
        <template v-slot:day="{ present, past, date }">
          <v-row
            class="fill-height"
          >
            <template v-if="past && tracked[date]">
              <v-sheet
                v-for="(percent, i) in tracked[date]"
                :key="i"
                :title="category[i]"
                :color="colors[i]"
                :width="`${percent}%`"
                height="100%"
                tile
              ></v-sheet>
            </template>
          </v-row>
        </template>
      </v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      calendar_title: '',
      today: moment(new Date).format('YYYY-MM-DD'),
      focus: '',
      type: 'month',
      tracked: [],
      colors: ['#1867c0', '#fb8c00'],
      category: ['目標達成率', '超過時間'],
    };
  },
  methods: {
    updateCalendar () {
     // Note: 表示月の変更
     this.calendar_title = this.$refs.calendar.title

     // TODO: trackedに下記のような情報を入れる。
     this.tracked =
     {
       '2020-08-09': [23,30],
       '2020-08-08': [10],
       '2020-07-08': [10],
     }

   },
   prev () {
    this.$refs.calendar.prev()
   },
   next () {
    this.$refs.calendar.next()
   },
  },
};
</script>

<style scoped lang="sass">
.calendar_top
  display: flex
  align-items: center
</style>
