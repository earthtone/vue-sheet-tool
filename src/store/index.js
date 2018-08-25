import Vue from 'vue'
import Vuex from 'vuex'
import { getWorkbook, getSheet } from 'sheetsy'

Vue.use(Vuex)

const state = {
  showAlert: false,
  showNav: false,
  isLoading: true,
  searchTerm: '',
  wbKey: '',
  workbook: {
    sheets: [] 
  },
  currentSheetId: '',
  headers: [
    { name: 'Identifier', selected: true },
    { name: 'Term', selected: false },
    { name: 'Definition', selected: true },
    { name: 'Source', selected: false },
    { name: 'Duplicate?', selected: false },
    { name: 'Synonyms', selected: false },
    { name: 'Hypernym', selected: false },
    { name: 'Notes', selected: false },
    { name: 'UTS Strategic Objective', selected: false },
    { name: 'UTS Domain', selected: false },
    { name: 'UTS Intent', selected: false },
    { name: 'Business?', selected: false },
    { name: 'Access', selected: false },
    { name: 'Use', selected: false },
    { name: 'Own', selected: false },
    { name: 'Systems', selected: false },
    { name: 'Parent', selected: true },
    { name: 'Data Element Type', selected: false },
    { name: 'Value', selected: false },
    { name: 'Status', selected: false },
    { name: 'Date Created', selected: false },
    { name: 'Date Changed', selected: false },
    { name: 'Approver', selected: false },
    { name: 'Approval Date', selected: false },
    { name: 'Release Date', selected: false },
    { name: 'Version Number', selected: false },
    { name: 'Change Records Number', selected: false }
  ]
}

const getters = {
  getKey (state) {
    return state.wbKey 
  },
  getSheetNames (state) {
    return state.workbook.sheets.map(sh => ({ name: sh.name, id: sh.id }))
  },
  getAllHeaders (state) {
    return state.headers.map((h, i) => Object.assign(h, {index: i }))
  },
  getSheetHeaders (state) {
    return state.headers
      .map((h, i) => Object.assign(h, { index: i }))
      .filter(h => h.selected)
  },
  getCurrentSheet (state) {
    var current = state.workbook.sheets.find(sh => sh.id === state.currentSheetId)
    return current
  },
  getSearchTerm (state) {
    return state.searchTerm 
  }, 
  getAlertState (state) {
    return state.showAlert 
  },
  getNavState (state) {
    return state.showNav 
  },
  getLoadingState (state) {
    return state.isLoading 
  }
}

const mutations = {
  // Step 1
  setKey (state, payload) {
    state.wbKey = payload.key 
    this.dispatch('requestWorkbook')
  },
  // Step 3
  setWorkbook (state, payload) {
    state.workbook = payload.workbook
    state.workbook.sheets.splice(0, 6)

    let defaultSheetId = state.workbook.sheets.find(sh => sh.name === 'D7 Staff').id
    this.dispatch('setSheet', defaultSheetId)
  },
  // Step 6
  setRows (state, payload) {
    let { id } = payload
    let index = state.workbook.sheets.findIndex(sh => sh.id === id)

    state.workbook.sheets[index] = {
      ...state.workbook.sheets[index],
      ...payload
    }

    this.commit('setCurrentSheet', id)
  },
  // Step 7
  setCurrentSheet (state, payload) {
    state.currentSheetId = payload
    this.commit('setLoading', false)
  },
  showAlert (state) {
    state.showAlert = true
    this.dispatch('hideAlert')
  },
  hideAlert (state) {
    state.showAlert = false 
  },
  setHeaders (state, payload) {
    state.headers[payload].selected = !state.headers[payload].selected
  },
  setMenu (state) {
    state.showNav = !state.showNav 
  },
  setSearchTerm (state, payload) {
    state.searchTerm = payload 
  },
  setLoading (state, payload) {
    if (payload) {
      state.isLoading = Boolean(payload) 
    } else {
      state.isLoading = !state.isLoading 
    }
  }
}

const actions = {
  // Step 2
  async requestWorkbook ({ commit }) {
    commit('setLoading', true)

    try {
      let wb = await getWorkbook(state.wbKey)
      commit('setWorkbook', { workbook: wb })
    } catch (err) {
      return err
    }
  },
  // Step 4
  setSheet({ dispatch }, payload) {
    dispatch('requestWorksheetRows', payload)
  },
  // Step 5 
  async requestWorksheetRows ({ commit }, payload) {
    commit('setLoading', true)

    try {
      let sheet = await getSheet(state.wbKey, payload)
      commit('setRows', { ...sheet, id: payload })
    } catch (err) {
      commit('showAlert')
      return err
    }
  },
  hideAlert ({ commit }) {
    commit('setLoading', false)

    setTimeout(() => {
      commit('hideAlert') 
    }, 1000)
  },
  updateHeaders ({ commit }, payload) {
    commit('setHeaders', payload) 
  },
  toggleMenu ({ commit }) {
    commit('setMenu') 
  },
  updateSearchTerm ({ commit }, payload) {
    commit('setSearchTerm', payload) 
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
