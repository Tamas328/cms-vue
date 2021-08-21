<template>
  <div class="new-employee-form">
    <form @submit.prevent="submitData">
      <div v-if="errors.length">
        <p v-for="error in errors" :key="error">
          {{ error }}
        </p>
      </div>
      <div class="col-lg-10 top10">
        <input
          type="text"
          placeholder="First name"
          v-model="enteredFirstName"
          class="form-control"
          v-on:keypress="isLetter($event)"
        />
      </div>
      <div class="col-lg-10 top10">
        <input
          type="text"
          placeholder="Last name"
          v-model="enteredLastName"
          class="form-control"
          v-on:keypress="isLetter($event)"
        />
      </div>
      <div class="col-lg-10 top10">
        <input
          type="text"
          placeholder="E-mail"
          v-model="enteredEmail"
          class="form-control"
        />
      </div>
      <div class="col-lg-10 top10">
        <select v-model="selectedGender" class="form-control">
          <option disabled value="">Gender</option>
          <option>Female</option>
          <option>Male</option>
          <option>Other</option>
          <option>Prefer not to say</option>
        </select>
      </div>
      <div class="col-lg-10 top10">
        <input type="date" v-model="enteredBirthdate" class="form-control" />
      </div>
      <div class="col-lg-10 top10">
        <input
          ref="fileUpload"
          type="file"
          class="form-control"
          @change="processImage($event)"
        />
      </div>
      <div class="col-lg-10 form-buttons">
        <button type="submit" class="btn btn-primary">Add employee</button>
        <button type="reset" @click="resetForm" class="btn btn-primary">
          Reset
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import moment from "moment";
import { projectFirestore } from "../firebase/config";
export default {
  emits: ["add-employee"],
  data() {
    return {
      myFile: null,
      processing: false,
      fileURL: null,
      errors: [],
      enteredFirstName: "",
      enteredLastName: "",
      enteredEmail: "",
      selectedGender: "",
      enteredBirthdate: "",
      enteredImage: "",
    };
  },
  methods: {
    async submitData() {
      const newEmployee = {
        firstName: this.enteredFirstName,
        lastName: this.enteredLastName,
        email: this.enteredEmail,
        gender: this.selectedGender,
        birthdate: moment(this.enteredBirthdate).format("D MMMM YYYY"),
        avatar: this.enteredImage.name,
        createdAt: new Date(),
      };

      if (!newEmployee.avatar) {
        newEmployee.avatar = "default.png";
      }

      await projectFirestore.collection("employees").add(newEmployee);

      this.enteredFirstName = "";
      this.enteredLastName = "";
      this.enteredEmail = "";
      this.selectedGender = "";
      this.enteredBirthdate = "";
      this.$refs.fileUpload.value = null;
    },
    processImage(event) {
      this.enteredImage = event.target.files[0];
    },
    resetForm() {
      this.enteredFirstName = "";
      this.enteredLastName = "";
      this.enteredEmail = "";
      this.selectedGender = "";
      this.enteredBirthdate = "";
      this.$refs.fileUpload.value = null;
    },
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-z]+$/.test(char)) return true;
      else e.preventDefault();
    },
  },
};
</script>
<style scoped>
.top10 {
  margin-top: 10px;
}

button {
  margin-top: 20px;
}

.btn-primary {
  background-color: #d3ac2b;
  border: 2px solid #d3ac2b;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1), 0 5px 5px 0 rgba(0, 0, 0, 0.12);
}

.btn-primary:hover {
  color: black;
  background-color: transparent;
  border: 2px solid #d3ac2b;
}

.form-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
