import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import studyroom from './studyroom'
import studyrooms from './studyrooms'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    studyrooms: studyrooms,
    studyroom: studyroom,
    user: user,
  },
})
