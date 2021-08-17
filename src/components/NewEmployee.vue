<template>
  <div class="new-employee-form">
    <form @submit.prevent="submitData">
      <div class="col-lg-10 top10">
        <input
          type="text"
          placeholder="First name"
          v-model="enteredFirstName"
          class="form-control"
        />
      </div>
      <div class="col-lg-10 top10">
        <input
          type="text"
          placeholder="Last name"
          v-model="enteredLastName"
          class="form-control"
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
          type="file"
          class="form-control"
          @change="processImage($event)"
        />
      </div>
      <div class="col-lg-10">
        <button class="btn btn-primary">Add employee</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    emits: ['add-employee'],
    data() {
        return {
            enteredFirstName: '',
            enteredLastName: '',
            enteredEmail: '',
            selectedGender: '',
            enteredBirthdate: '',
            enteredImage: ''
        };
    },
    methods: {
        submitData() {
            this.$emit('add-employee', this.enteredFirstName, this.enteredLastName, this.enteredEmail, this.selectedGender, this.enteredBirthdate, this.enteredImage);
        },
        processImage(event) {
            this.enteredImage = event.target.files[0];
        }
    }
}
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
</style>
