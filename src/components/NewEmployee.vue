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
        <input type="file" class="form-control" />
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
            enteredBirthdate: ''
        };
    },
    methods: {
        submitData() {
            this.$emit('add-employee');
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
</style>
