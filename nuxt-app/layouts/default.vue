<template>
    <header class="shadow-sm bg-white">
        <nav class="container mx-auto p-4 flex justify-between items-center">
            <ul class="flex">
                <li class="p-2">
                    <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li class="p-2">
                    <NuxtLink to="/about">About</NuxtLink>
                </li>
                <li class="p-2">
                    <NuxtLink to="/employee/employees">Employees</NuxtLink>
                </li>
            </ul>
            <v-btn color="" to="/weather">Check Weather!</v-btn>
        </nav>
    </header>
    <div class="container mx-auto p-4">
        <slot />
    </div>
</template>

<style scoped>
.router-link-active {
    font-weight: bold;
    color: #3c834e;
}
</style>