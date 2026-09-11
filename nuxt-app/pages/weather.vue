<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/40 to-indigo-50/60 py-12 px-4 sm:px-6">
        <div class="max-w-2xl mx-auto">

            <!-- Top Navigation / Header -->
            <div class="flex items-center justify-between mb-8">
                <div>
                    <NuxtLink to="/"
                        class="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition mb-2">
                        ← Back to Home
                    </NuxtLink>
                    <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Weather Forecast</h1>
                </div>

                <!-- Simulation Toggle for Rainy Days -->
                <button type="button" @click="forceRain = !forceRain"
                    class="text-xs font-semibold px-3 py-1.5 rounded-full border transition flex items-center gap-1.5 shadow-sm"
                    :class="forceRain
                        ? 'bg-blue-600 text-white border-blue-600 shadow-blue-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'" title="Toggle rain animation simulator">
                    <span>🌧️</span>
                    <span>{{ forceRain ? 'Simulating Rain (ON)' : 'Simulate Rain Effect' }}</span>
                </button>
            </div>

            <!-- City Search & Preset Buttons -->
            <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 mb-6">
                <form @submit.prevent="searchCity" class="flex gap-2">
                    <div class="relative flex-1">
                        <input v-model="cityInput" type="text"
                            placeholder="Search city (e.g. London, Paris, Tokyo, Seattle)..."
                            class="w-full px-4 py-2.5 pl-10 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition" />
                        <span class="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
                    </div>
                    <button type="submit"
                        class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm hover:shadow">
                        Search
                    </button>
                </form>

                <!-- Quick city chips -->
                <div class="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 text-xs">
                    <span class="text-slate-400 font-medium mr-1">Popular:</span>
                    <button v-for="preset in ['London', 'Cordoba', 'New York', 'Tokyo', 'Paris', 'Seattle']"
                        :key="preset" type="button" @click="selectCity(preset)"
                        class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition font-medium">
                        {{ preset }}
                    </button>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="pending" class="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-200/80">
                <div class="inline-block animate-spin text-3xl mb-3">⏳</div>
                <p class="text-slate-600 font-medium">Fetching live weather data for {{ city }}...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error || weatherData?.error"
                class="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
                <span class="text-3xl mb-2 block">⚠️</span>
                <h3 class="text-lg font-bold text-red-800 mb-1">Could not load weather</h3>
                <p class="text-sm text-red-600 mb-4">{{ weatherData?.message || error?.message || 'City not found' }}
                </p>
                <button @click="selectCity('London')"
                    class="text-xs font-semibold px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    Reset to London
                </button>
            </div>

            <!-- Weather Data Display Card -->
            <div v-else-if="weatherData"
                class="weather-card relative rounded-3xl p-6 sm:p-8 overflow-hidden shadow-xl border transition-all duration-500"
                :class="isRaining
                    ? 'bg-gradient-to-br from-slate-900 via-sky-950 to-slate-800 text-white border-sky-800/50'
                    : 'bg-gradient-to-br from-white via-blue-50/20 to-sky-50 text-slate-800 border-slate-200/80'">
                <!-- Rainy Days Pixel Particles Animation -->
                <div v-if="isRaining" class="rain-overlay" aria-hidden="true">
                    <span v-for="n in 36" :key="n" class="rain-pixel" :style="getRainPixelStyle(n)"></span>
                </div>

                <div class="relative z-10">
                    <!-- Card Header & Location -->
                    <div class="flex items-start justify-between">
                        <div>
                            <div class="flex items-center gap-2 mb-1">
                                <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                    {{ weatherData.city }}
                                </h2>
                                <span v-if="weatherData.country" class="text-xs font-bold px-2 py-0.5 rounded-full"
                                    :class="isRaining ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'">
                                    {{ weatherData.country }}
                                </span>
                            </div>
                            <p class="text-sm capitalize font-medium"
                                :class="isRaining ? 'text-slate-300' : 'text-slate-500'">
                                {{ weatherData.description }}
                            </p>
                        </div>

                        <!-- Weather Icon -->
                        <div class="flex flex-col items-center">
                            <img v-if="weatherData.icon"
                                :src="`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`"
                                :alt="weatherData.description" class="w-16 h-16 sm:w-20 sm:h-20 drop-shadow" />
                        </div>
                    </div>

                    <!-- Rain Advisory Banner -->
                    <div class="my-5 p-3.5 rounded-2xl flex items-center gap-3 text-sm transition-all" :class="isRaining
                        ? 'bg-sky-500/20 border border-sky-400/30 text-sky-200'
                        : 'bg-amber-50/80 border border-amber-200/60 text-amber-900'">
                        <span class="text-xl shrink-0">{{ rainAdvisory.icon }}</span>
                        <div>
                            <p class="font-bold text-xs uppercase tracking-wide opacity-80">{{ rainAdvisory.label }}</p>
                            <p class="font-medium text-xs sm:text-sm mt-0.5">{{ rainAdvisory.message }}</p>
                        </div>
                    </div>

                    <!-- Main Temperature Row -->
                    <div class="flex flex-wrap items-baseline gap-4 my-6">
                        <span class="text-6xl sm:text-7xl font-black tracking-tight"
                            :class="isRaining ? 'text-white' : 'text-slate-900'">
                            {{ weatherData.temperature }}°C
                        </span>
                        <div class="space-y-0.5 text-xs sm:text-sm font-medium"
                            :class="isRaining ? 'text-slate-300' : 'text-slate-500'">
                            <p>Feels like: <strong :class="isRaining ? 'text-white' : 'text-slate-800'">{{
                                    weatherData.feels_like }}°C</strong></p>
                            <p>Min: {{ weatherData.temp_min }}°C • Max: {{ weatherData.temp_max }}°C</p>
                        </div>
                    </div>

                    <!-- Extra Metrics Grid -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t"
                        :class="isRaining ? 'border-slate-700/60' : 'border-slate-100'">
                        <!-- Humidity -->
                        <div class="p-3.5 rounded-xl transition"
                            :class="isRaining ? 'bg-slate-800/60 border border-slate-700/40' : 'bg-white border border-slate-100 shadow-sm'">
                            <div class="flex items-center gap-1.5 text-xs mb-1"
                                :class="isRaining ? 'text-sky-300' : 'text-blue-600'">
                                <span>💧</span>
                                <span class="font-semibold uppercase tracking-wider text-[10px]">Humidity</span>
                            </div>
                            <p class="text-lg font-bold" :class="isRaining ? 'text-white' : 'text-slate-800'">
                                {{ weatherData.humidity }}%
                            </p>
                            <p class="text-[11px] mt-0.5" :class="isRaining ? 'text-slate-400' : 'text-slate-500'">
                                {{ weatherData.humidity > 70 ? 'High' : weatherData.humidity < 35 ? 'Dry' : 'Normal' }}
                                    </p>
                        </div>

                        <!-- Wind Speed -->
                        <div class="p-3.5 rounded-xl transition"
                            :class="isRaining ? 'bg-slate-800/60 border border-slate-700/40' : 'bg-white border border-slate-100 shadow-sm'">
                            <div class="flex items-center gap-1.5 text-xs mb-1"
                                :class="isRaining ? 'text-sky-300' : 'text-blue-600'">
                                <span>💨</span>
                                <span class="font-semibold uppercase tracking-wider text-[10px]">Wind</span>
                            </div>
                            <p class="text-lg font-bold" :class="isRaining ? 'text-white' : 'text-slate-800'">
                                {{ weatherData.wind_speed }} m/s
                            </p>
                            <p class="text-[11px] mt-0.5" :class="isRaining ? 'text-slate-400' : 'text-slate-500'">
                                Light breeze
                            </p>
                        </div>

                        <!-- Visibility -->
                        <div class="p-3.5 rounded-xl transition"
                            :class="isRaining ? 'bg-slate-800/60 border border-slate-700/40' : 'bg-white border border-slate-100 shadow-sm'">
                            <div class="flex items-center gap-1.5 text-xs mb-1"
                                :class="isRaining ? 'text-sky-300' : 'text-blue-600'">
                                <span>👁️</span>
                                <span class="font-semibold uppercase tracking-wider text-[10px]">Visibility</span>
                            </div>
                            <p class="text-lg font-bold" :class="isRaining ? 'text-white' : 'text-slate-800'">
                                {{ weatherData.visibility ? `${weatherData.visibility} km` : '10 km' }}
                            </p>
                            <p class="text-[11px] mt-0.5" :class="isRaining ? 'text-slate-400' : 'text-slate-500'">
                                Clear view
                            </p>
                        </div>

                        <!-- Pressure -->
                        <div class="p-3.5 rounded-xl transition"
                            :class="isRaining ? 'bg-slate-800/60 border border-slate-700/40' : 'bg-white border border-slate-100 shadow-sm'">
                            <div class="flex items-center gap-1.5 text-xs mb-1"
                                :class="isRaining ? 'text-sky-300' : 'text-blue-600'">
                                <span>🌡️</span>
                                <span class="font-semibold uppercase tracking-wider text-[10px]">Pressure</span>
                            </div>
                            <p class="text-lg font-bold" :class="isRaining ? 'text-white' : 'text-slate-800'">
                                {{ weatherData.pressure }} hPa
                            </p>
                            <p class="text-[11px] mt-0.5" :class="isRaining ? 'text-slate-400' : 'text-slate-500'">
                                Atmospheric
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const city = ref("London");
const cityInput = ref("London");
const forceRain = ref(false);

// In Nuxt, server/api/ routes are fetched via /api/weather
const { data: weatherData, pending, error } = await useFetch(() => `/api/weather?city=${encodeURIComponent(city.value)}`);

// Search submission
const searchCity = () => {
    if (cityInput.value.trim()) {
        city.value = cityInput.value.trim();
    }
};

const selectCity = (name) => {
    cityInput.value = name;
    city.value = name;
};

// Check if currently raining
const isRaining = computed(() => {
    if (forceRain.value) return true;
    if (!weatherData.value) return false;
    const id = weatherData.value.weather_id;
    const main = (weatherData.value.weather_main || '').toLowerCase();
    const desc = (weatherData.value.description || '').toLowerCase();
    // OpenWeatherMap rain categories: 2xx (Thunderstorm), 3xx (Drizzle), 5xx (Rain)
    return (id >= 200 && id < 600) || main.includes('rain') || main.includes('drizzle') || desc.includes('rain');
});

// Advisory phrase based on conditions
const rainAdvisory = computed(() => {
    if (isRaining.value) {
        return {
            icon: '☔',
            label: 'Rain Warning',
            message: "Grab an umbrella! Rain is currently falling outside — keep dry and take care on the road."
        };
    }

    const clouds = weatherData.value?.clouds ?? 0;
    const main = (weatherData.value?.weather_main || '').toLowerCase();

    if (clouds > 60 || main.includes('cloud')) {
        return {
            icon: '☁️',
            label: 'Cloudy Outlook',
            message: "Overcast skies right now. Rain could be on its way, so keeping a light jacket or umbrella close is advised!"
        };
    }

    if (main.includes('clear')) {
        return {
            icon: '☀️',
            label: 'Dry & Clear',
            message: "Clear skies and no rain expected! Great weather to be outdoors."
        };
    }

    return {
        icon: '🌤️',
        label: 'Forecast Note',
        message: "Fair weather conditions. No immediate rain alerts in your area."
    };
});

// Deterministic style generator for small floating blue pixel drops
const getRainPixelStyle = (i) => {
    const left = ((i * 17) % 98) + 1; // spread across 1% to 99%
    const duration = (1.1 + ((i * 7) % 12) / 10).toFixed(2); // 1.1s to 2.3s
    const delay = (((i * 13) % 25) / 10).toFixed(2); // 0s to 2.4s
    const width = i % 3 === 0 ? 3 : 2; // 2px or 3px pixel
    const height = 6 + ((i * 3) % 8); // 6px to 14px elongated pixel drop
    const opacity = (0.55 + ((i % 5) * 0.09)).toFixed(2);

    return {
        left: `${left}%`,
        width: `${width}px`,
        height: `${height}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity
    };
};
</script>

<style scoped>
/* Rain Particle Overlay */
.rain-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    border-radius: 1.5rem;
}

/* Small floating blue pixels */
.rain-pixel {
    position: absolute;
    top: -20px;
    background: #38bdf8;
    border-radius: 1px;
    box-shadow:
        0 0 5px #38bdf8,
        0 0 10px rgba(14, 165, 233, 0.6);
    animation-name: pixel-rain-fall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

@keyframes pixel-rain-fall {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
    }

    15% {
        opacity: 0.9;
    }

    85% {
        opacity: 0.8;
    }

    100% {
        transform: translateY(580px) translateX(-24px);
        opacity: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .rain-pixel {
        animation: none;
        display: none;
    }
}
</style>