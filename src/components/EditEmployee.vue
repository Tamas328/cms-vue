<template>
  <div>
    <dialog open>
      <header>
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </header>
      <section>
        <slot></slot>
      </section>
      <slot name="actions"></slot>
    </dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    toEditEmployee: Object,
  },
  data() {
    return {
      eFirstName: "",
      eLastName: "",
      eEmail: "",
      eGender: "",
      eBirthdate: "",
      eImage: "default.png",
    };
  },
};
</script>

<style scoped>
div {
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  top: 0;
  left: 0;
  transform: translate(0, 0);
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
}

dialog {
  position: relative;
  overflow-y: auto;
  width: 500px;
  border-radius: 6px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 0 auto;
  padding: 0;
  margin: 1rem;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
}

@media (min-width: 576px) {
  dialog {
    min-width: 20rem;
    margin: 1.75rem auto;
  }
}

header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  align-items: center;
}
</style>
