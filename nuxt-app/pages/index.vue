<template>
    <div class="container mx-auto mt-10">
        <div class="flex items-center justify-between mb-8">
            <!-- <h1 class="text-2xl font-bold mb-6"> Employee</h1> -->
            <NuxtLink to="/employee/create"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Employee
            </NuxtLink>
            <h1 class="text-3xl front-bold ml-4"> Employee managment system</h1>
        </div>
        <table class="text-left w-full border-collapse">
            <thead>
                <tr clas="bg-gray-200">
                    <th
                        class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        First Name</th>
                    <th
                        class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        Last Name</th>
                    <th
                        class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        Email</th>
                    <th
                        class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        Phone</th>
                    <th
                        class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        Job Title</th>
                    <th
                        class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        Department</th>
                    <th
                        class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        Salary</th>
                    <th
                        class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                        Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employee, index) in employees" :key="employee.id" class="hover:bg-grey-lighter">
                    <td class="py-4 px-6 border-b border-grey-light">{{ index + 1 }}</td>
                    <td class="py-4 px-6 border-b border-grey-light">{{ employee.first_name }}</td>
                    <td class="py-4 px-6 border-b border-grey-light">{{ employee.last_name }}</td>
                    <td class="py-4 px-6 border-b border-grey-light">{{ employee.email }}</td>
                    <td class="py-4 px-6 border-b border-grey-light">{{ employee.phone }}</td>
                    <td class="py-4 px-6 border-b border-grey-light">{{ employee.job_title }}</td>
                    <td class="py-4 px-6 border-b border-grey-light">{{ employee.department }}</td>
                    <td class="py-4 px-6 border-b border-grey-light">{{ employee.salary }}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
export default {

    data() {
        return {
            employees: [],
        }
    },
    mounted() {
        this.loadEmployees();
    },
    methods: {
        async loadEmployees() {
            if (localStorage.getItem('employees')) {
                this.employees = JSON.parse(localStorage.getItem('employees'));
            }
            // this.items = await this.$axios.$get('/employees');
        }
    }


}
</script>

<style lang="scss" scoped></style>