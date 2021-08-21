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
      <menu>
        <slot name="actions"></slot>
      </menu>
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
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
}

dialog {
  position: absolute;
  overflow-y: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 0 auto;
  padding: 0;
}

header {
  color: black;
  width: 100%;
  padding: 1rem;
}

header h2 {
  display: flex;
  justify-content: flex-start;
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  margin: 0;
  padding: 1rem;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
