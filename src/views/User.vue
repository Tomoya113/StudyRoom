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
      <h2>{{ calendar_title }}</h2>
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
          <v-row class="fill-height">
            <template v-if="past && tracked[date]">
              <v-sheet
                v-for="(percent, i) in tracked[date]"
                :key="i"
                :title="`${study_info[date]}`"
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

    <!-- currentDisplayName変更用debug -->
    <div>
      <h3>自習室表示名</h3>
      <input v-model="displayName" placeholder="表示名" />
      <v-btn color="info" @click="updateName">表示名変更</v-btn>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      displayName: '',
      calendar_title: '',
      today: moment(new Date()).format('YYYY-MM-DD'),
      focus: '',
      type: 'month',
      studyLog: [],
      tracked: [],
      colors: ['#d5ffd5', '#aaffaa', '#72e272', '#008E74'],
      study_info: [],
    };
  },
  async created() {
    let bufUserName = this.currentDisplayName;
    if (bufUserName != '') {
      this.displayName = bufUserName;
    }
    this.studyLog = this.fetchStudyLog;
    var bufColor = {};
    var bufTime = {};
    this.studyLog.forEach((d) => {
      if (d.time < 15) {
        bufColor[d.day] = [100, 0, 0, 0];
      } else if (d.time < 30) {
        bufColor[d.day] = [0, 100, 0, 0];
      } else if (d.time < 60) {
        bufColor[d.day] = [0, 0, 100, 0];
      } else {
        bufColor[d.day] = [0, 0, 0, 100];
      }
      bufTime[d.day] = `勉強時間 ${d.time}分`;
    });
    this.tracked = bufColor;
    this.study_info = bufTime;
    this.studyLog = this.fetchStudyLog;
    var buf = {};
    var buff = {};
    this.studyLog.forEach((d) => {
      if (d.time < 15) {
        buf[d.day] = [100, 0, 0, 0];
      } else if (d.time < 30) {
        buf[d.day] = [0, 100, 0, 0];
      } else if (d.time < 60) {
        buf[d.day] = [0, 0, 100, 0];
      } else {
        buf[d.day] = [0, 0, 0, 100];
      }
      buff[d.day] = `勉強時間 ${d.time}分`;
    });
    this.tracked = buf;
    this.study_info = buff;
  },
  methods: {
    updateCalendar() {
      // Note: 表示月の変更
      this.calendar_title = this.$refs.calendar.title;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    updateName() {
      // TODO: this.displayNameのvalidationチェック
      if (this.currentDocId != null) {
        let bufData = {
          changeName: this.displayName,
          docId: this.currentDocId,
        };
        this.updateDisplayName(bufData);
      }
    },
    ...mapActions(['updateDisplayName', 'addStudyLog']),
  },
  computed: {
    ...mapGetters([
      'currentDisplayName',
      'currentDocId',
      'userId',
      'fetchStudyLog',
    ]),
  },
  watch: {
    currentDisplayName: function(newValue, oldValue) {
      if (this.displayName == '') {
        console.log('new: %s, old: %s', newValue, oldValue);
        this.displayName = newValue;
      }
    },
    fetchStudyLog: function(newValue, oldValue) {
      console.log('new: %s, old: %s', newValue, oldValue);
      this.studyLog = this.fetchStudyLog;
      var buf = {};
      var buff = {};
      this.studyLog.forEach((d) => {
        if (d.time < 15) {
          buf[d.day] = [100, 0, 0, 0];
        } else if (d.time < 30) {
          buf[d.day] = [0, 100, 0, 0];
        } else if (d.time < 60) {
          buf[d.day] = [0, 0, 100, 0];
        } else {
          buf[d.day] = [0, 0, 0, 100];
        }
        buff[d.day] = `勉強時間 ${d.time}分`;
      });
      this.tracked = buf;
      this.study_info = buff;
    },
  },
};
</script>

<style scoped lang="sass">
.calendar_top
  display: flex
  align-items: center
</style>
