<template>
  <div class="new-employee-form">
    <form @submit.prevent="submitData">
      <div
        class="col-lg-10 top10"
        :class="{ invalid: !enteredFirstName.isValid }"
      >
        <input
          type="text"
          placeholder="First name"
          v-model.trim="enteredFirstName.val"
          class="form-control"
          v-on:keypress="isLetter($event)"
          @blur="clearValidity('enteredFirstName')"
        />
      </div>
      <div
        class="col-lg-10 top10"
        :class="{ invalid: !enteredLastName.isValid }"
      >
        <input
          type="text"
          placeholder="Last name"
          v-model.trim="enteredLastName.val"
          class="form-control"
          v-on:keypress="isLetter($event)"
          @blur="clearValidity('enteredLastName')"
        />
      </div>
      <div class="col-lg-10 top10" :class="{ invalid: !enteredEmail.isValid }">
        <input
          type="text"
          placeholder="E-mail"
          v-model.trim="enteredEmail.val"
          class="form-control"
          @blur="clearValidity('enteredEmail')"
        />
      </div>
      <div
        class="col-lg-10 top10"
        :class="{ invalid: !selectedGender.isValid }"
      >
        <select
          v-model="selectedGender.val"
          class="form-control"
          @blur="clearValidity('selectedGender')"
        >
          <option disabled value="">Gender</option>
          <option>Female</option>
          <option>Male</option>
          <option>Other</option>
          <option>Prefer not to say</option>
        </select>
      </div>
      <div
        class="col-lg-10 top10"
        :class="{ invalid: !enteredBirthdate.isValid }"
      >
        <input
          type="date"
          v-model="enteredBirthdate.val"
          class="form-control"
          @blur="clearValidity('enteredBirthdate')"
          :max="maxDate"
          min="1920-01-01"
        />
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
        <button type="submit" class="btn btn-primary" v-if="!isPending">
          Add employee
        </button>
        <button class="btn btn-primary" v-else disabled>
          Saving...
        </button>
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
import useStorage from "@/firebase/useStorage";

export default {
  emits: ["add-employee"],
  data() {
    return {
      fileUp: useStorage(),
      isPending: false,
      maxDate: moment(new Date())
        .subtract(16, "years")
        .format("YYYY-MM-DD"),
      myFile: null,
      processing: false,
      fileURL: null,
      errors: [],
      enteredFirstName: {
        val: "",
        isValid: true,
      },
      enteredLastName: {
        val: "",
        isValid: true,
      },
      enteredEmail: {
        val: "",
        isValid: true,
      },
      selectedGender: {
        val: "",
        isValid: true,
      },
      enteredBirthdate: {
        val: "",
        isValid: true,
      },
      enteredImage: "",
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.enteredFirstName.val === "") {
        this.enteredFirstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.enteredLastName.val === "") {
        this.enteredLastName.isValid = false;
        this.formIsValid = false;
      }
      if (
        this.enteredEmail.val === "" ||
        !this.validateEmail(this.enteredEmail.val)
      ) {
        this.enteredEmail.isValid = false;
        this.formIsValid = false;
      }
      if (this.selectedGender.val === "") {
        this.selectedGender.isValid = false;
        this.formIsValid = false;
      }
      if (this.enteredBirthdate.val === "") {
        this.enteredBirthdate.isValid = false;
        this.formIsValid = false;
      }
    },
    validateEmail(email) {
      var mailFormat = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return email.match(mailFormat);
    },
    async submitData() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      if (!this.enteredImage.name) {
        await projectFirestore.collection("employees").add({
          firstName: this.enteredFirstName.val,
          lastName: this.enteredLastName.val,
          email: this.enteredEmail.val,
          gender: this.selectedGender.val,
          birthdate: moment(this.enteredBirthdate.val).format("D MMMM YYYY"),
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/cms-internship-87e6e.appspot.com/o/avatars%2Fdefault.png?alt=media&token=33c8ed34-951e-4bb0-b42f-e992364c5fef",
          createdAt: new Date(),
        });
      } else {
        this.isPending = true;
        await this.fileUp.uploadImage(this.enteredImage);
        await projectFirestore.collection("employees").add({
          firstName: this.enteredFirstName.val,
          lastName: this.enteredLastName.val,
          email: this.enteredEmail.val,
          gender: this.selectedGender.val,
          birthdate: moment(this.enteredBirthdate.val).format("D MMMM YYYY"),
          avatar: this.fileUp.url,
          createdAt: new Date(),
        });
        this.isPending = false;
      }

      this.enteredFirstName.val = "";
      this.enteredFirstName.isValid = true;
      this.enteredLastName.val = "";
      this.enteredLastName.isValid = true;
      this.enteredEmail.val = "";
      this.enteredEmail.isValid = true;
      this.selectedGender.val = "";
      this.selectedGender.isValid = true;
      this.enteredBirthdate.val = "";
      this.$refs.fileUpload.value = null;
    },
    processImage(event) {
      this.enteredImage = event.target.files[0];
    },
    resetForm() {
      this.enteredFirstName.val = "";
      this.enteredLastName.val = "";
      this.enteredEmail.val = "";
      this.selectedGender.val = "";
      this.enteredBirthdate.val = "";
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

.invalid input {
  border: 1px solid rgba(255, 0, 0, 0.25);
  background-color: rgba(255, 0, 0, 0.25);
}
.invalid select {
  border: 1px solid rgba(255, 0, 0, 0.25);
  background-color: rgba(255, 0, 0, 0.25);
}

.invalid option {
  background-color: white;
}
</style>
