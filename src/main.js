import { createApp } from 'vue'

import App from './App.vue'
import NewEmployee from './components/NewEmployee.vue';
import EmployeeTable from './components/EmployeeTable.vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserMinus)
library.add(faUserEdit)

const app = createApp(App);

app.component('new-employee', NewEmployee);
app.component('employee-table', EmployeeTable)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app');
