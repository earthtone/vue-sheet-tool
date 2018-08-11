import Vue from 'vue'
import Vuex from 'vuex'
import { getWorkbook, getSheet } from 'sheetsy'

Vue.use(Vuex)

const state = {
  wbKey: '',
  workbook: {
    sheets: [] 
  },
  currentSheet: {} 
}

const getters = {
  getKey (state) {
    return state.wbKey 
  },
  getSheetNames (state) {
    return state.workbook.sheets.map(sh => ({ name: sh.name, id: sh.id }))
  },
  getSheet (state) {
    return  state.workbook.sheets.find(sh => sh.id === state.currentSheet) 
  }
}

const mutations = {
  setKey (state, payload) {
    state.wbKey = payload.key 
    this.dispatch('requestWorkbook')
  },
  setWorkbook (state, payload) {
    state.workbook = payload.workbook
    this.dispatch('requestWorksheets')
  },
  setSheets (state, payload) {
    state.workbook.sheets.filter(sh => sh.name !== 'Pivot').forEach((sh, i) => {
      if (sh.name !== payload.sheets[i].name) return  
      Object.assign(sh, payload.sheets[i]) 
    })
  },
  setSheet (state, payload) {
    state.currentSheet = payload 
  }
}

const actions = {
  async requestWorkbook ({ commit }) {
    let wb = await getWorkbook(state.wbKey)
    commit('setWorkbook', { workbook: wb })
  },
  async requestWorksheets ({ commit }) {
    let sheets = await Promise.all(
      state.workbook.sheets
        .slice(0, state.workbook.sheets.findIndex(sh => sh.name === 'Pivot'))
        .map(sh => getSheet(state.wbKey, sh.id))
    )

    commit('setSheets', { sheets })
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
