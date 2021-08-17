<template>
  <div class="main">
    <new-employee></new-employee>
    <employee-table></employee-table>
  </div>
</template>

<script>
import EmployeeTable from './components/EmployeeTable.vue'
export default {
  components: { EmployeeTable },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.new-employee-form {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-left: 5rem;
  width: 50%;
}

.emp-table {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-right: 5rem;
  margin-left: 1rem;
  width: 100%;
}
</style>
