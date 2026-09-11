<template>
  <main class="view-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__content">
        <p class="eyebrow">Employee Profile</p>
        <h1>{{ employee.first_name ? `${employee.first_name} ${employee.last_name}` : 'Employee Information' }}</h1>
        <p class="description">
          Review detailed employee profile, organizational placement, contact information, and role compensation.
        </p>
        <div class="actions">
          <NuxtLink to="/" class="btn secondary">
            ← Back to List
          </NuxtLink>
          <NuxtLink to="/employee/create" class="btn primary">
            + Add Another Employee
          </NuxtLink>
        </div>
      </div>

      <div class="hero__card">
        <div class="card-badge">Employee #{{ employee.id || 'N/A' }}</div>
        <h2>{{ employee.department || 'General' }}</h2>
        <p>{{ employee.job_title || 'Team Member' }}</p>
        <ul>
          <li><strong>First Name:</strong> {{ employee.first_name || '—' }}</li>
          <li><strong>Last Name:</strong> {{ employee.last_name || '—' }}</li>
          <li><strong>Email:</strong> {{ employee.email || '—' }}</li>
        </ul>
      </div>
    </section>

    <!-- Quick Stats Section -->
    <section class="stats">
      <div class="stat">
        <strong>{{ employee.department || '—' }}</strong>
        <span>Department</span>
      </div>
      <div class="stat">
        <strong>{{ employee.job_title || '—' }}</strong>
        <span>Job Title</span>
      </div>
      <div class="stat">
        <strong>{{ employee.salary ? `$${employee.salary}` : '—' }}</strong>
        <span>Salary</span>
      </div>
      <div class="stat">
        <strong>#{{ employee.id || '—' }}</strong>
        <span>Employee ID</span>
      </div>
    </section>

    <!-- Detailed Table Section -->
    <section class="table-section">
      <div class="section-heading">
        <p class="eyebrow">Detailed Record</p>
        <h3>Employee Information Table</h3>
      </div>

      <div class="table-card">
        <table class="styled-table">
          <thead>
            <tr>
              <th class="col-field">Field</th>
              <th class="col-value">Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="field-name"><span class="icon-dot">✦</span> ID</td>
              <td class="field-val"><strong>#{{ employee.id }}</strong></td>
            </tr>
            <tr>
              <td class="field-name"><span class="icon-dot">◎</span> First Name</td>
              <td class="field-val">{{ employee.first_name }}</td>
            </tr>
            <tr>
              <td class="field-name"><span class="icon-dot">◎</span> Last Name</td>
              <td class="field-val">{{ employee.last_name }}</td>
            </tr>
            <tr>
              <td class="field-name"><span class="icon-dot">✉</span> Email</td>
              <td class="field-val">
                <a :href="'mailto:' + employee.email" class="email-link">{{ employee.email }}</a>
              </td>
            </tr>
            <tr>
              <td class="field-name"><span class="icon-dot">☎</span> Phone</td>
              <td class="field-val">{{ employee.phone }}</td>
            </tr>
            <tr>
              <td class="field-name"><span class="icon-dot">💼</span> Job Title</td>
              <td class="field-val">{{ employee.job_title }}</td>
            </tr>
            <tr>
              <td class="field-name"><span class="icon-dot">🏢</span> Department</td>
              <td class="field-val">
                <span class="dept-badge">{{ employee.department }}</span>
              </td>
            </tr>
            <tr>
              <td class="field-name"><span class="icon-dot">💲</span> Salary</td>
              <td class="field-val salary-highlight">${{ employee.salary }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      employee: {}
    }
  },
  async mounted() {
    await this.loadEmployee();
  },
  methods: {
    loadEmployee() {
      const id = this.$route.query.id || this.$route.params.id;
      try {
        let employees = JSON.parse(localStorage.getItem('employees') || '[]');
        let empFound = employees.find(employee => employee.id == id);
        if (empFound) {
          this.employee = { ...empFound };
        } else {
          alert('Employee not found!');
          this.$router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
.view-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f7f8fc 0%, #eef2ff 100%);
  color: #111827;
  padding: 64px 24px 80px;
  font-family: Arial, Helvetica, sans-serif;
}

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
  font-size: 2.5rem;
  letter-spacing: -0.05em;
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
  font-weight: 500;
}

.hero__card li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4f46e5;
  font-size: 1.4rem;
  line-height: 1;
}

/* Quick Stats */
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
  font-size: 1.8rem;
  letter-spacing: -0.04em;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat span {
  display: block;
  margin-top: 8px;
  font-size: 0.94rem;
  color: #4b5563;
}

/* Table Section */
.table-section {
  max-width: 1180px;
  margin: 72px auto 0;
}

.section-heading {
  margin-bottom: 24px;
}

.section-heading h3 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
  letter-spacing: -0.06em;
}

.table-card {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.05);
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.styled-table thead tr {
  background: #f8fafc;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.styled-table th {
  padding: 18px 24px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}

.col-field {
  width: 32%;
}

.styled-table tbody tr {
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  transition: background-color 0.15s ease;
}

.styled-table tbody tr:last-child {
  border-bottom: none;
}

.styled-table tbody tr:hover {
  background: #f8fafc;
}

.styled-table td {
  padding: 18px 24px;
  font-size: 0.98rem;
}

.field-name {
  color: #4b5563;
  font-weight: 600;
}

.icon-dot {
  color: #4f46e5;
  margin-right: 8px;
  font-size: 1rem;
}

.field-val {
  color: #111827;
}

.dept-badge {
  display: inline-block;
  background: #eef2ff;
  color: #4338ca;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
}

.salary-highlight {
  font-weight: 700;
  color: #059669;
}

.email-link {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.email-link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .view-page {
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

  .col-field {
    width: 40%;
  }

  .styled-table td,
  .styled-table th {
    padding: 14px 16px;
    font-size: 0.9rem;
  }
}
</style>