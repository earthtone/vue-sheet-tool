<template>
  <transition name="fade" change>  
    <div class="filterable-table" v-if="current">
      <header>
        <h1>{{ current.name }}</h1>
      </header>
      <input type="text" placeholder="Enter Search Text..." v-model="searchText" />
      <table class="data-table">
        <tr>
          <th v-for="header in getSheetHeaders" :key="header.index">{{header.name}}</th>
        </tr>
        <tr v-for="(datum, index) in filteredData" :key="index">
          <td v-for="header in getSheetHeaders" :key="header.index">
            {{datum[header.index]}} 
          </td>
        </tr>
      </table>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'filterable-table',
  props: ['current'],
  data() {
    return {
      searchText: '', 
      filterType: 'Identifier'
    } 
  },
  computed: {
    ...mapGetters(['getSheetHeaders', 'getSearchTerm']),
    filteredData () {
      if(!this.searchText){
        return this.current.rows
      } else {
        return this.current.rows.filter(r => {
          return this.isIncludedIdentifier(r) && this.isValid(r)
        })
      }
    }
  },
  methods: {
    isValid (row) {
      let validityIndex = this.$store.state.headers.find(h => h.name === 'Business?').index
      return !(/N/i.test(row[validityIndex]))
    },
    isIncludedIdentifier (row) {
      let identifierIndex = this.getSheetHeaders.find(h => h.name === 'Identifier').index
      return row[identifierIndex].toLowerCase().includes(this.searchText.toLowerCase())
    },
    isIncludedDefinition (row) {
      let definitionIndex = this.getSheetHeaders.find(h => h.name === 'Definition').index
      return row[definitionIndex].toLowerCase().includes(this.searchText.toLowerCase())
    }
  }
}
</script>

<style scoped>
.data-table {
  border-collapse: collapse; 
}
.data-table th, .data-table td {
  padding: 1em;
  text-align: left;
  vertical-align: top;
}

.data-table th {
  font-weight: bold; 
  /* min-width: 284px; */
}

.data-table tr {
  max-width: 33.33%; 
}

.data-table tr:nth-child(even) {
  background-color: #e8e8e8;  
  border-bottom: 1px solid #fff;
}

header {
  display: flex;
  justify-content: space-around; 
}

header > * {
  margin: 0.5em; 
}

header h1 {
  font-size: 2em; 
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

input[type=text] {
    width: 50%;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
    border: 0;
    border-bottom: 1px solid #000;
    margin: 0 1rem;
    font-size: 1.5rem;
}

input[type=text]:focus {
    width: 90%;
}
</style>
