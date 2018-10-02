import Vue from 'vue'
import Vuex from 'vuex'
import { getWorkbook, getSheet } from 'sheetsy'

Vue.use(Vuex)

const state = {
  showAlert: false,
  showNav: false,
  isLoading: true,
  loadingText: '',
  searchTerm: '',
  wbKey: '',
  workbook: {
    sheets: [] 
  },
  currentSheetId: '',
  headers: []
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
  },
  getLoadingText (state) {
    return state.loadingText 
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
    state.workbook.sheets.splice(0, 4)

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
    this.commit('setLoadingText')
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
  },
  setLoadingText (state, payload) {
    if (payload) {
      state.loadingText = payload  
    } else {
      state.loadingText = '' 
    }
  },
  initHeaders (state, payload) {
    state.headers = payload 
  }
}

const actions = {
  // Step 2
  async requestWorkbook ({ commit }) {
    commit('setLoading', true)
    commit('setLoadingText', 'Requesting Workbook')

    try {
      let wb = await getWorkbook(state.wbKey)
      commit('setWorkbook', { workbook: wb })
    } catch (err) {
      console.error(err)
      return err
    }
  },
  // Step 4
  setSheet({ commit, dispatch }, payload) {
    commit('setLoadingText', 'Requesting Worksheet')
    dispatch('requestWorksheetRows', payload)
  },
  // Step 5 
  async requestWorksheetRows ({ commit, state }, payload) {
    commit('setLoading', true)

    try {
      let sheet = await getSheet(state.wbKey, payload)
      if (!state.headers.length) {

        let hln = Object.keys(sheet.rows[0]).length / 2
        let headers = Object.keys(sheet.rows[0]).slice(hln).map(h => {
          switch (h) {
            case 'identifier':
            case 'definition':
            case 'parent':
              return { name: h, selected: true }
            default:
              return { name: h, selected: false }
          }
        })

        commit('initHeaders', headers) 
      }

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
