<template>
  <div class="emp-table">
    <input
      id="search"
      type="text"
      v-model="search"
      placeholder="Search Employee"
    />
    <table class="table table-hover table-custom">
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
        <tr
          v-for="employee in filteredEmployees"
          :key="employee.id"
          class="centered"
        >
          <td>
            <img
              :src="employee.avatar"
              width="50"
              class="rounded"
              style="border-radius: 50%"
            />
          </td>
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.gender }}</td>
          <td>{{ employee.birthdate }}</td>
          <td>
            <font-awesome-icon
              size="lg"
              icon="user-edit"
              @click="$emit('edit', employee.id)"
            ></font-awesome-icon>
          </td>
          <td>
            <font-awesome-icon
              size="lg"
              icon="user-minus"
              @click="
                $emit(
                  'delete',
                  employee.id,
                  employee.firstName,
                  employee.lastName
                )
              "
            ></font-awesome-icon>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { projectFirestore } from "../firebase/config";

export default {
  emits: ["delete", "edit"],
  data() {
    const employees = ref([]);

    projectFirestore
      .collection("employees")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let docs = snap.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        employees.value = docs;
      });

    return { employees, search: "" };
  },
  computed: {
    filteredEmployees() {
      const value = this.search.toLowerCase().slice(1);
      return this.employees.filter((employee) => {
        return (
          (employee.firstName + " " + employee.lastName)
            .toLowerCase()
            .indexOf(value) > -1 ||
          (employee.lastName + " " + employee.firstName)
            .toLowerCase()
            .indexOf(value) > -1 ||
          employee.email.toLowerCase().indexOf(value) > -1
        );
      });
    },
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

.centered th {
  padding: 0.7rem 1rem 0.7rem 1rem;
}

.fa-user-minus:hover {
  color: darkred;
}

.fa-user-edit:hover {
  color: #d3ac2b;
}
.rounded {
  border-radius: 50%;
}

#search {
  font-size: 16px;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 24px;
  border: 1px solid #dfe1e5;
  background-color: #fff;
  box-shadow: none;
  padding-left: 20px;
}

#search:hover {
  box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.08);
  border: 1px solid transparent;
}

#search:focus {
  outline: none;
  box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.08);
  border: 1px solid transparent;
}
</style>
