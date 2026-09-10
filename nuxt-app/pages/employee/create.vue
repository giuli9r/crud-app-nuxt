<template>
    <div>
        <div class="container mx-auto mt-10">
            <h1 class="text-2xl font-bold mb-6">Create Employee</h1>
        </div>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <form @submit.prevent="createEmployee" class="mb-0 space-y-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="first-name">First Name</label>
                    <input id="first-name" type="text" v-model="employee.first_name" placeholder="First Name"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div>
                    <label for="last-name" class="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                    <input id="last-name"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" v-model="employee.last_name" placeholder="Last Name">
                </div>
                <div>
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input id="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email" v-model="employee.email" placeholder="Email">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Phone</label>
                    <input id="phone"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" v-model="employee.phone" placeholder="Phone">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="job-title">Job Title</label>
                    <input id="job-title"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" v-model="employee.job_title" placeholder="Job Title">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="department">Department</label>
                    <input id="department"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" v-model="employee.department" placeholder="Department">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="salary">Salary</label>
                    <input id="salary"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" v-model="employee.salary" placeholder="Salary">
                </div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create</button>
            </form>
            <NuxtLink to="/" class="text-blue-500 hover:text-blue-700 mt-6 block">
                Back to List</NuxtLink>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
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
    methods: {
        createEmployee() {
            const existingEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
            existingEmployees.push(this.employee);
            localStorage.setItem('employees', JSON.stringify(existingEmployees));
            this.$router.push('/');
            // this.goBackToEmployeeList();
        },
        // goBackToEmployeeList() {
        //     this.$router.push('/');
        // }
    }
}
</script>

<style lang="scss"></style>

<!-- How this works
 When a user fills out a form and hits create button the createEmployee methos is invoked  
 then takes the employee object and pushes it to the employees array in local storage
 then redirects the user to the (home page) employee list
-->
