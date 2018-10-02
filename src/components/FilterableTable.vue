<template>
  <transition name="fade" change>  
    <div class="filterable-table" v-if="current">
      <header>
        <h1>{{ current.name }}</h1>
      </header>
      <input type="text" placeholder="Search by Identifier..." v-model="searchText" />
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
        return this.current.rows.filter(r => this.isValid(r))
      } else {
        return this.current.rows.filter(r => {
          // return this.isIncludedIdentifier(r) && this.isValid(r)
          return this.isIncluded(r) && this.isValid(r)
        })
      }
    }
  },
  methods: {
    isValid (row) {
      return !(/N/i.test(row[11]))
    },
    isIncludedIdentifier (row) {
      return row[0].toLowerCase().includes(this.searchText.toLowerCase())
    },
    isIncludedDefinition (row) {
      return row[2].toLowerCase().includes(this.searchText.toLowerCase())
    },
    isIncluded (row) {
      // @TODO - WIP 
      var result = row.map(v => v.toLowerCase()).includes(this.searchText.toLowerCase())
      return result
    }
  }
}
</script>

<style scoped>
.data-table {
  width: 100%;
  overflow-x: scroll;
  border-collapse: collapse;
}
.data-table th, .data-table td {
  padding: 1em;
  text-align: left;
  vertical-align: top;
}

.data-table th {
  font-weight: bold; 
  text-transform: uppercase;
}

.data-table tr {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
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
