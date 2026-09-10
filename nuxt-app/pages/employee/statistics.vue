<template>
  <div class="employee-page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Management</p>
        <h1>Statistics</h1>
      </div>
      <button class="primary-btn">+ Add employee</button>
    </header>

    <section class="stats">
      <div class="stat-card">
        <span>Total staff</span>
        <strong>128</strong>
      </div>
      <div class="stat-card">
        <span>Active</span>
        <strong>119</strong>
      </div>
      <div class="stat-card">
        <span>On leave</span>
        <strong>9</strong>
      </div>
    </section>

    <section class="content-grid">
      <div class="table-card">
        <h2>Employee list</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.id">
              <td>{{ employee.first_name }} {{ employee.last_name }}</td>
              <td>{{ employee.job_title }}</td>
              <td>{{ employee.department }}</td>
              <td>
                <span class="status active">
                  Active
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <aside class="form-card">
        <h2>Add employee</h2>
        <form>
          <label>
            Full name
            <input type="text" v-model="employee.first_name" />
          </label>
          <label>
            Last Name
            <input type="text" v-model="employee.last_name" />
          </label>
          <label>
            Email
            <input type="email" v-model="employee.email" />
          </label>
          <label>
            Role
            <input type="text" v-model="employee.job_title" />
          </label>
          <label>
            Department
            <select v-model="employee.department">
              <option selected>Design</option>
              <option>Engineering</option>
              <option>Marketing</option>
            </select>
          </label>
          <label>
            Phone
            <input type="text" v-model="employee.phone" />
          </label>
          <label>
            Salary
            <input type="text" v-model="employee.salary" />
          </label>
          <button type="button" class="primary-btn" @click="createEmployee">Save employee</button>
        </form>
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [],
      employee: {
        id: Date.now(),
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        job_title: '',
        department: '',
        salary: ''
      }
    }
  },
  mounted() {
    this.getEmployees();
  },
  methods: {
    getEmployees() {
      const employees = JSON.parse(localStorage.getItem('employees') || '[]');
      this.employees = employees;
    },
    createEmployee() {
      const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      existingEmployees.push(this.employee);
      localStorage.setItem('employees', JSON.stringify(existingEmployees));
      this.getEmployees();
      this.employee = {
        id: Date.now(),
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        job_title: '',
        department: '',
        salary: ''
      }
    }
  }
}

</script>

<style scoped>
.employee-page {
  min-height: 100vh;
  background: #f5f7fb;
  color: #111827;
  padding: 48px 24px;
  font-family: Arial, Helvetica, sans-serif;
}

.page-header,
.stats,
.content-grid {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  font-weight: 700;
  color: #4f46e5;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.primary-btn {
  background: #111827;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 600;
  cursor: pointer;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 18px;
  margin-bottom: 28px;
}

.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
}

.stat-card span {
  display: block;
  color: #6b7280;
  font-size: 0.9rem;
}

.stat-card strong {
  display: block;
  margin-top: 8px;
  font-size: 2rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr;
  gap: 24px;
}

.table-card,
.form-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
  padding: 24px;
}

h2 {
  margin-top: 0;
  margin-bottom: 18px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 14px 12px;
  border-bottom: 1px solid #e5e7eb;
}

th {
  color: #6b7280;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.status {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.status.active {
  background: #dcfce7;
  color: #166534;
}

.status.on leave {
  background: #fef3c7;
  color: #92400e;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #374151;
  font-weight: 600;
}

input,
select {
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 0.96rem;
}

@media (max-width: 780px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
}
</style>
