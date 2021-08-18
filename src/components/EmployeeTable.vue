<template>
  <div class="emp-table">
    <table class="table table-custom">
      <thead>
        <tr class="centered">
          <th scope="col">Avatar</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Sex</th>
          <th scope="col">Date of Birth</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody id="table-list" class="centered table-light">
        <tr v-for="employee in employees" :key="employee.id" class="centered">
          <td>
            <img :src="require('@/assets/' + employee.image)" width="50" />
          </td>
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.gender }}</td>
          <td>{{ employee.birthdate }}</td>
          <td>
            <font-awesome-icon icon="user-edit" size="lg"></font-awesome-icon>
          </td>
          <td>
            <font-awesome-icon
              @click="$emit('delete', employee.id)"
              icon="user-minus"
              size="lg"
            ></font-awesome-icon>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  emits: ["delete"],
  data() {
    return {
      employees: [],
    };
  },
  created() {
    axios
      .get(
        "https://cms-internship-default-rtdb.europe-west1.firebasedatabase.app/employees.json"
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const employees = [];
        for (const id in data) {
          employees.push({
            id: id,
            image: data[id].image,
            firstName: data[id].firstName,
            lastName: data[id].lastName,
            email: data[id].email,
            sex: data[id].sex,
            birthdate: data[id].birthdate,
          });
        }
        this.employees = employees;
      });
  },
};
</script>

<style scoped>
.table-custom {
  color: white;
  background-color: #333d51;
  letter-spacing: 0.75px;
}
.centered {
  text-align: center;
  vertical-align: middle;
}

.fa-user-minus:hover {
  color: darkred;
}

.fa-user-edit:hover {
  color: #d3ac2b;
}
</style>
