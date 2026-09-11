<template>
  <main class="employees-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__content">
        <p class="eyebrow">Workforce Management</p>
        <h1>All Employees</h1>
        <p class="description">
          Browse, review, and manage your team members, departmental assignments, compensation, and contact details across the organization.
        </p>
        <div class="actions">
          <NuxtLink to="/employee/create" class="btn primary">
            + Add Employee
          </NuxtLink>
          <NuxtLink to="/employee/statistics" class="btn secondary">
            View Statistics
          </NuxtLink>
          <NuxtLink to="/" class="btn secondary">
            ← Home
          </NuxtLink>
        </div>
      </div>

      <div class="hero__card">
        <div class="card-badge">Live Directory</div>
        <h2>{{ employees.length }}</h2>
        <p>registered employees actively managed in the system.</p>
        <ul>
          <li>{{ departmentsCount }} active department{{ departmentsCount === 1 ? '' : 's' }}</li>
          <li>Instant search and filtering</li>
          <li>Full records and profile viewing</li>
        </ul>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="stat">
        <strong>{{ employees.length }}</strong>
        <span>Total Staff</span>
      </div>
      <div class="stat">
        <strong>{{ departmentsCount }}</strong>
        <span>Departments</span>
      </div>
      <div class="stat">
        <strong>${{ averageSalary }}</strong>
        <span>Average Salary</span>
      </div>
      <div class="stat">
        <strong>${{ totalPayroll }}</strong>
        <span>Total Payroll</span>
      </div>
    </section>

    <!-- Table Section -->
    <section class="directory-section">
      <div class="section-header">
        <div class="section-heading">
          <p class="eyebrow">Employee Directory</p>
          <h3>Team Members</h3>
        </div>
        <!-- Quick Search -->
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, department, or job..."
            class="search-input"
          />
        </div>
      </div>

      <!-- Table Card -->
      <div class="table-card">
        <div class="table-responsive">
          <table class="employees-table">
            <thead>
              <tr>
                <th scope="col" class="th-center">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Job Title</th>
                <th scope="col">Department</th>
                <th scope="col">Salary</th>
                <th scope="col" class="th-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(employee, index) in filteredEmployees"
                :key="employee.id || index"
                class="table-row"
              >
                <td class="td-center font-mono text-muted">{{ index + 1 }}</td>
                <td class="font-bold text-dark">{{ employee.first_name }}</td>
                <td class="font-bold text-dark">{{ employee.last_name }}</td>
                <td>
                  <a :href="'mailto:' + employee.email" class="email-link">
                    {{ employee.email }}
                  </a>
                </td>
                <td class="text-muted">{{ employee.phone || '—' }}</td>
                <td class="font-medium">{{ employee.job_title || '—' }}</td>
                <td>
                  <span class="dept-badge">
                    {{ employee.department || 'General' }}
                  </span>
                </td>
                <td class="salary-cell">
                  ${{ employee.salary ? Number(employee.salary).toLocaleString() : '0' }}
                </td>
                <td class="td-center">
                  <div class="action-buttons">
                    <NuxtLink
                      :to="'/view?id=' + employee.id"
                      class="btn-action view"
                      title="View Profile"
                    >
                      View
                    </NuxtLink>
                    <NuxtLink
                      :to="'/employee/' + employee.id"
                      class="btn-action edit"
                      title="Edit"
                    >
                      Edit
                    </NuxtLink>
                    <button
                      type="button"
                      class="btn-trash"
                      title="Delete Employee"
                      aria-label="Delete Employee"
                      @click="deleteEmployee(employee.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="trash-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="filteredEmployees.length === 0">
                <td colspan="9" class="empty-state">
                  <div class="empty-content">
                    <span class="empty-icon">👥</span>
                    <p class="empty-title">
                      {{ searchQuery ? 'No employees match your search.' : 'No employees found in the directory.' }}
                    </p>
                    <p class="empty-subtitle">
                      {{ searchQuery ? 'Try clearing or changing your search keywords.' : 'Get started by creating your first employee profile.' }}
                    </p>
                    <NuxtLink v-if="!searchQuery" to="/employee/create" class="btn primary mt-4">
                      + Add First Employee
                    </NuxtLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      employees: [],
      searchQuery: ''
    }
  },
  computed: {
    filteredEmployees() {
      if (!this.searchQuery.trim()) {
        return this.employees;
      }
      const q = this.searchQuery.toLowerCase();
      return this.employees.filter(emp => {
        const fullName = `${emp.first_name || ''} ${emp.last_name || ''}`.toLowerCase();
        const dept = (emp.department || '').toLowerCase();
        const title = (emp.job_title || '').toLowerCase();
        const email = (emp.email || '').toLowerCase();
        return fullName.includes(q) || dept.includes(q) || title.includes(q) || email.includes(q);
      });
    },
    departmentsCount() {
      const depts = new Set(
        this.employees
          .map(e => e.department)
          .filter(Boolean)
      );
      return depts.size;
    },
    averageSalary() {
      if (this.employees.length === 0) return 0;
      const total = this.employees.reduce((acc, curr) => acc + (Number(curr.salary) || 0), 0);
      return Math.round(total / this.employees.length).toLocaleString();
    },
    totalPayroll() {
      const total = this.employees.reduce((acc, curr) => acc + (Number(curr.salary) || 0), 0);
      return total.toLocaleString();
    }
  },
  mounted() {
    this.loadEmployees();
  },
  methods: {
    loadEmployees() {
      if (typeof window !== 'undefined' && localStorage.getItem('employees')) {
        try {
          this.employees = JSON.parse(localStorage.getItem('employees'));
        } catch (error) {
          console.error('Error reading employees from localStorage:', error);
        }
      }
    },
    deleteEmployee(id) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.employees = this.employees.filter(emp => emp.id != id);
        localStorage.setItem('employees', JSON.stringify(this.employees));
      }
    }
  }
}
</script>

<style scoped>
.employees-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f7f8fc 0%, #eef2ff 100%);
  color: #111827;
  padding: 64px 24px 80px;
  font-family: Arial, Helvetica, sans-serif;
}

/* Hero Section */
.hero {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  align-items: center;
}

.hero__content {
  max-width: 640px;
}

.eyebrow {
  margin: 0 0 16px;
  color: #4f46e5;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  font-weight: 700;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  line-height: 1.1;
  letter-spacing: -0.05em;
}

.description {
  margin-top: 20px;
  font-size: 1.08rem;
  line-height: 1.8;
  color: #4b5563;
}

.actions {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.btn {
  border: none;
  border-radius: 999px;
  padding: 14px 24px;
  font-size: 0.96rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.primary {
  background: #111827;
  color: #ffffff;
  box-shadow: 0 14px 30px rgba(17, 24, 39, 0.15);
}

.secondary {
  background: rgba(79, 70, 229, 0.08);
  color: #312e81;
}

.mt-4 {
  margin-top: 16px;
}

.hero__card {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 28px;
  padding: 28px 24px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
}

.card-badge {
  display: inline-block;
  background: #eef2ff;
  color: #4338ca;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 8px 14px;
  margin-bottom: 18px;
}

.hero__card h2 {
  margin: 0;
  font-size: 3rem;
  letter-spacing: -0.06em;
}

.hero__card p {
  margin-top: 8px;
  color: #4b5563;
  line-height: 1.7;
}

.hero__card ul {
  list-style: none;
  padding: 0;
  margin: 20px 0 0;
  display: grid;
  gap: 12px;
}

.hero__card li {
  position: relative;
  padding-left: 24px;
  color: #1f2937;
  font-weight: 600;
}

.hero__card li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4f46e5;
  font-size: 1.4rem;
  line-height: 1;
}

/* Stats Section */
.stats {
  max-width: 1180px;
  margin: 56px auto 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 20px;
}

.stat {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 20px;
  padding: 24px 18px;
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 2rem;
  letter-spacing: -0.05em;
  color: #111827;
}

.stat span {
  display: block;
  margin-top: 8px;
  font-size: 0.94rem;
  color: #4b5563;
}

/* Directory Section */
.directory-section {
  max-width: 1180px;
  margin: 72px auto 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.section-heading h3 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
  letter-spacing: -0.06em;
}

.search-box {
  width: 100%;
  max-width: 320px;
}

.search-input {
  width: 100%;
  padding: 12px 18px;
  font-size: 0.95rem;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 999px;
  background: #ffffff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
}

/* Table Card */
.table-card {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.05);
}

.table-responsive {
  overflow-x: auto;
  width: 100%;
}

.employees-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.employees-table thead tr {
  background: #f8fafc;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.employees-table th {
  padding: 18px 20px;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
  white-space: nowrap;
}

.th-center,
.td-center {
  text-align: center;
}

.table-row {
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  transition: background-color 0.15s ease;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: #f8fafc;
}

.employees-table td {
  padding: 16px 20px;
  font-size: 0.94rem;
  white-space: nowrap;
}

.font-bold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
  color: #374151;
}

.font-mono {
  font-family: monospace;
}

.text-dark {
  color: #111827;
}

.text-muted {
  color: #6b7280;
}

.email-link {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.email-link:hover {
  text-decoration: underline;
}

.dept-badge {
  display: inline-block;
  background: #eef2ff;
  color: #4338ca;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
}

.salary-cell {
  font-weight: 700;
  color: #059669;
}

/* Actions in Table */
.action-buttons {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn-action {
  padding: 6px 14px;
  font-size: 0.82rem;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  display: inline-block;
}

.btn-action.view {
  background: rgba(79, 70, 229, 0.08);
  color: #4338ca;
}

.btn-action.view:hover {
  background: rgba(79, 70, 229, 0.18);
  transform: translateY(-1px);
}

.btn-action.edit {
  background: #111827;
  color: #ffffff;
}

.btn-action.edit:hover {
  background: #1f2937;
  transform: translateY(-1px);
}

.btn-trash {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s, color 0.15s;
}

.btn-trash:hover {
  background: #fee2e2;
  color: #b91c1c;
}

.trash-icon {
  width: 18px;
  height: 18px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 56px 24px;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-icon {
  font-size: 2.8rem;
  margin-bottom: 12px;
}

.empty-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #111827;
}

.empty-subtitle {
  margin: 6px 0 0;
  font-size: 0.92rem;
  color: #6b7280;
}

/* Responsive */
@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-box {
    max-width: 100%;
  }
}

@media (max-width: 560px) {
  .employees-page {
    padding-top: 40px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }
}
</style>
