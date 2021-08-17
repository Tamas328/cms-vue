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
            <img
              :src="'https://firebasestorage.googleapis.com/v0/b/cms-internship.appspot.com/o/avatar1.png?alt=media&token=17127a58-40e0-485a-9558-52be85523f3c'"
              width="50"
            />
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
            <font-awesome-icon icon="user-minus" size="lg"></font-awesome-icon>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    props: ['employees']
}
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
