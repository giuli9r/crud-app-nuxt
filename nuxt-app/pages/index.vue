<template>
    <div class="container mx-auto mt-10 px-4">
        <div class="flex items-center justify-between mb-8">
            <div class="flex space-x-4">
                <NuxtLink to="/employee/create"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
                    Add Employee
                </NuxtLink>
                <NuxtLink to="/employee/statistics"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
                    Statistics
                </NuxtLink>
            </div>
            <h1 class="text-3xl font-bold text-gray-800">Employee Management System</h1>
        </div>

        <!-- Responsive Table Wrapper -->
        <div class="overflow-x-auto shadow rounded-lg border border-gray-200">
            <table class="text-left w-full border-collapse bg-white">
                <thead class="bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th scope="col" class="py-3 px-4 font-bold uppercase text-xs text-gray-600">ID</th>
                        <th scope="col" class="py-3 px-4 font-bold uppercase text-xs text-gray-600">First Name</th>
                        <th scope="col" class="py-3 px-4 font-bold uppercase text-xs text-gray-600">Last Name</th>
                        <th scope="col" class="py-3 px-4 font-bold uppercase text-xs text-gray-600">Email</th>
                        <th scope="col" class="py-3 px-4 font-bold uppercase text-xs text-gray-600">Phone</th>
                        <th scope="col" class="py-3 px-4 font-bold uppercase text-xs text-gray-600">Job Title</th>
                        <th scope="col" class="py-3 px-4 font-bold uppercase text-xs text-gray-600">Department</th>
                        <th scope="col" class="py-3 px-4 font-bold uppercase text-xs text-gray-600">Salary</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(employee, index) in employees" :key="employee.id || index"
                        class="hover:bg-gray-50 transition">
                        <td class="py-3 px-4 text-sm text-gray-700">{{ index + 1 }}</td>
                        <td class="py-3 px-4 text-sm text-gray-700">{{ employee.first_name }}</td>
                        <td class="py-3 px-4 text-sm text-gray-700">{{ employee.last_name }}</td>
                        <td class="py-3 px-4 text-sm text-gray-700">{{ employee.email }}</td>
                        <td class="py-3 px-4 text-sm text-gray-700">{{ employee.phone }}</td>
                        <td class="py-3 px-4 text-sm text-gray-700">{{ employee.job_title }}</td>
                        <td class="py-3 px-4 text-sm text-gray-700">{{ employee.department }}</td>
                        <td class="py-3 px-4 text-sm text-gray-700">{{ employee.salary }}</td>
                    </tr>
                    <!-- Empty State -->
                    <tr v-if="employees.length === 0">
                        <td colspan="8" class="text-center py-8 text-gray-500 text-sm">
                            No employees found. Click "Add Employee" to create one.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            employees: []
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
        }
    }
}
</script>