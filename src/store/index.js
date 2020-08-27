import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import studyroom from './studyroom'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    studyroom: studyroom,
  },
})
