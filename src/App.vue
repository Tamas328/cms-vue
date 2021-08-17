<template>
  <div class="main">
    <new-employee @add-employee="addEmployee"></new-employee>
    <employee-table
      :employees="employees"
      @delete="deleteEmployee"
    ></employee-table>
  </div>
</template>

<script>
import moment from 'moment'
import EmployeeTable from './components/EmployeeTable.vue'

export default {
  components: { EmployeeTable },
  data() {
    return {
      employees: []
    }
  },
  methods: {
    addEmployee(firstName, lastName, email, gender, birthdate, image) {
      const newEmployee = {
        id: new Date().toISOString(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        birthdate: moment(birthdate).format('D MMMM YYYY'),
        image: image.name,
      };
      this.employees.push(newEmployee);
    },
    deleteEmployee(employeeID) {
      this.employees = this.employees.filter((employee) => employee.id !== employeeID);
    }
  }
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

body {
  background-color: #f4f3ea;
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
