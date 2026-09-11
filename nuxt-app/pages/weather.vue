<template>
    <div class="container mx-auto mt-10 px-4 max-w-lg">
        <h1 class="text-2xl font-bold mb-6 text-gray-800">Weather Information</h1>

        <!-- Loading State -->
        <div v-if="pending" class="text-gray-500 py-4">
            Loading weather data...
        </div>

        <!-- Error State -->
        <div v-else-if="error || weatherData?.error" class="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
            <p class="font-semibold">Failed to load weather data.</p>
            <p class="text-sm">{{ error?.message || weatherData?.message }}</p>
        </div>

        <!-- Weather Data Card -->
        <div v-else-if="weatherData" class="bg-white shadow rounded-lg p-6 border border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-xl font-bold text-gray-900">{{ weatherData.city }}</h2>
                    <p class="text-gray-500 capitalize">{{ weatherData.description }}</p>
                </div>
                <img
                    v-if="weatherData.icon"
                    :src="`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`"
                    :alt="weatherData.description"
                    class="w-16 h-16"
                />
            </div>
            <div class="mt-4">
                <p class="text-4xl font-extrabold text-blue-600">{{ weatherData.temperature }}°C</p>
            </div>
        </div>

        <!-- Fallback Empty State -->
        <div v-else class="text-gray-500 py-4">
            <p>No weather data available</p>
        </div>
    </div>
</template>

<script setup>
const city = ref("London");

// In Nuxt, endpoints inside server/api/ are accessed via /api/*, NOT /server/api/*
const { data: weatherData, pending, error } = await useFetch(() => `/api/weather?city=${city.value}`);
</script>