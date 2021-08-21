<template>
  <edit-employee v-if="showModal" title="Edit employee">
    <template #header>
      <h5 class="modal-title">Edit Employee</h5>
      <button
        type="button"
        class="close"
        aria-label="Close"
        style="background-color: transparent; border: none; margin: 0;"
        @click="closeModal"
      >
        <span style="font-size: 2rem;">&times;</span>
      </button>
    </template>
    <template #default>
      <div class="modal-body">
        <div class="col-lg-10 top10">
          <img
            :src="require('@/assets/' + this.toEditEmployee.avatar)"
            style="width: 250px; margin-bottom: 10px; border-radius: 50%"
          />
        </div>
        <div class="col-lg-10 top10">
          <input
            type="text"
            class="form-control"
            readonly
            :value="this.toEditEmployee.id"
          />
        </div>
        <div class="col-lg-10 top10">
          <input
            v-model="this.toEditEmployee.firstName"
            type="text"
            class="form-control"
            placeholder="First name"
          />
        </div>

        <div class="col-lg-10 top10">
          <input
            v-model="this.toEditEmployee.lastName"
            type="text"
            class="form-control"
            placeholder="Last name"
          />
        </div>

        <div class="col-lg-10 top10">
          <input
            type="email"
            class="form-control"
            email
            placeholder="Email"
            v-model="this.toEditEmployee.email"
          />
        </div>

        <div class="form-group col-lg-10 top10">
          <select v-model="this.toEditEmployee.gender" class="form-control">
            <option id="not-specified" value="Not specified" disabled>
              Gender
            </option>
            <option :selected="this.toEditEmployee.gender == 'Female'">
              Female
            </option>
            <option :selected="this.toEditEmployee.gender == 'Male'">
              Male
            </option>
            <option :selected="this.toEditEmployee.gender == 'Other'">
              Other
            </option>
            <option
              :selected="this.toEditEmployee.gender == 'Prefer not to say'"
            >
              Prefer not to say
            </option>
          </select>
        </div>

        <div class="col-lg-10 top10">
          <input
            type="date"
            class="form-control"
            required
            v-model="this.toEditEmployee.birthdate"
          />
        </div>

        <div class="col-lg-10 top10">
          <input type="file" class="form-control" @change="onAvatarChange" />
        </div>
      </div>
    </template>
    <template #actions>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">
          Close
        </button>
        <button type="button" class="btn btn-primary" @click="updateEmployee">
          Save changes
        </button>
      </div>
    </template>
  </edit-employee>
  <div class="main">
    <new-employee></new-employee>
    <employee-table
      @delete="deleteEmployee"
      @edit="editEmployee"
    ></employee-table>
  </div>
</template>

<script>
import moment from "moment";
import EmployeeTable from "./components/EmployeeTable.vue";
import { projectFirestore } from "./firebase/config";
import EditEmployee from "./components/EditEmployee.vue";

export default {
  components: { EmployeeTable, EditEmployee },
  data() {
    return {
      showModal: false,
      employees: [],
      toEditEmployee: {},
    };
  },
  methods: {
    async deleteEmployee(employeeID, firstName, lastName) {
      if (confirm("Delete employee: " + firstName + " " + lastName + "?")) {
        await projectFirestore
          .collection("employees")
          .doc(employeeID)
          .delete();
      }
    },
    async editEmployee(employeeID) {
      let employee = await projectFirestore
        .collection("employees")
        .doc(employeeID)
        .get();
      this.toEditEmployee = { ...employee.data(), id: employee.id };
      this.toEditEmployee.birthdate = moment(
        new Date(this.toEditEmployee.birthdate)
      ).format("yyyy-MM-DD");
      this.showModal = true;
      console.log(this.toEditEmployee);
    },
    closeModal() {
      this.showModal = false;
    },
    onAvatarChange(event) {
      this.toEditEmployee.avatar = event.target.files[0].name;
    },
    async updateEmployee() {
      await projectFirestore
        .collection("employees")
        .doc(this.toEditEmployee.id)
        .update({
          avatar: this.toEditEmployee.avatar,
          firstName: this.toEditEmployee.firstName,
          lastName: this.toEditEmployee.lastName,
          email: this.toEditEmployee.email,
          gender: this.toEditEmployee.gender,
          birthdate: moment(this.toEditEmployee.birthdate).format(
            "D MMMM YYYY"
          ),
        });
      this.closeModal();
    },
  },
};
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

h5 {
  margin: 0;
  margin-left: 1em;
  line-height: 1.5;
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.modal-body div {
  margin: 10px auto;
  text-align: center;
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
.btn-primary {
  background-color: #d3ac2b;
  border: 2px solid #d3ac2b;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1), 0 5px 5px 0 rgba(0, 0, 0, 0.12);
}

.btn-primary:hover,
.btn-primary:active,
.btn-primary:focus {
  color: black;
  background-color: transparent;
  border: 2px solid #d3ac2b;
}

.close {
  padding: 1rem;
  margin: 0rem 0rem 0rem auto;
}

.close:hover {
  color: gray;
}
</style>
