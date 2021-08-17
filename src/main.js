import { createApp } from 'vue'
import App from './App.vue'
import NewEmployee from './components/NewEmployee.vue';
import EmployeeTable from './components/EmployeeTable.vue';

const app = createApp(App);

app.component('new-employee', NewEmployee);
app.component('employee-table', EmployeeTable);

app.mount('#app');
