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
         @change="updateRange"
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
      events: [],
      tracked: {
        '2020-08-09': [23, 45, 10],
        '2019-01-08': [10],
        '2019-01-07': [0, 78, 5],
        '2019-01-06': [0, 0, 50],
        '2019-01-05': [0, 10, 23],
        '2019-01-04': [2, 90],
        '2019-01-03': [10, 32],
        '2019-01-02': [80, 10, 10],
        '2019-01-01': [20, 25, 10],
      },
      colors: ['#1867c0', '#fb8c00', '#000000'],
      category: ['Development', 'Meetings', 'Slacking'],
    };
  },
  methods: {
    updateRange ({ start, end }) {
     // const events = []
     start = end
     end = start

     //const min = new Date(`${start.date}T00:00:00`)
     //const max = new Date(`${end.date}T23:59:59`)
     //const days = (max.getTime() - min.getTime()) / 86400000
     // const eventCount = this.rnd(days, days + 20)
     /*
     for (let i = 0; i < eventCount; i++) {
       const allDay = this.rnd(0, 3) === 0
       const firstTimestamp = this.rnd(min.getTime(), max.getTime())
       const first = new Date(firstTimestamp - (firstTimestamp % 900000))
       const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
       const second = new Date(first.getTime() + secondTimestamp)

       events.push({
         name: this.names[this.rnd(0, this.names.length - 1)],
         start: first,
         end: second,
         color: this.colors[this.rnd(0, this.colors.length - 1)],
         timed: !allDay,
       })
     }
     */

     // this.events = events
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
