<template>
  <div>
    <h1>User</h1>
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

    <!-- button -->
    <v-btn
      fab
      small
      absolute
      left
      color="primary"
      @click="prev"
    >
      <v-icon dark>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn
      fab
      small
      absolute
      right
      color="primary"
      @click="next"
    >
      <v-icon dark>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      today: moment(new Date).format('YYYY-MM-DD'),
      focus: '',
      type: 'month',
      tracked: [],
      colors: ['#1867c0', '#fb8c00', '#000000'],
      category: ['目標達成率'],
    };
  },
  methods: {
    updateCalendar () {

     // TODO: trackedに下記のような情報を入れる。
     this.tracked =
     {
       '2020-08-09': [23],
       '2019-08-08': [10],
       '2019-01-07': [80],
       '2019-01-06': [100],
       '2019-01-05': [100],
       '2019-01-04': [50],
       '2019-01-03': [10],
       '2019-01-02': [80],
       '2019-01-01': [20],
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
</style>
