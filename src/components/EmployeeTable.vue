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
              :src="require('@/assets/' + employee.avatar)"
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

    return { employees };
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
.rounded {
  border-radius: 50%;
}
</style>
