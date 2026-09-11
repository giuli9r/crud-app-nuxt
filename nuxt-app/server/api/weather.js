export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const city = query.city || "London";
    const apiKey = "f86f752c495953de3f6b794163c39181";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return {
                error: true,
                message: "City not found",
                details: response.statusText
            }
        }

        const data = await response.json();
        return {
            city: data.name,
            country: data.sys?.country,
            temperature: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            temp_min: Math.round(data.main.temp_min),
            temp_max: Math.round(data.main.temp_max),
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind?.speed,
            visibility: data.visibility ? (data.visibility / 1000).toFixed(1) : null,
            clouds: data.clouds?.all,
            weather_main: data.weather?.[0]?.main || '',
            weather_id: data.weather?.[0]?.id || 800,
            description: data.weather?.[0]?.description || '',
            icon: data.weather?.[0]?.icon || '01d',
            raw: data
        }
    } catch (error) {
        return {
            error: true,
            message: "Failed to fetch weather data",
            details: error.message
        }
    }
});