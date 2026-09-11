export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const city = query.city || "London";
    const apiKey = "f86f752c495953de3f6b794163c39181";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
        console.log(data);
        return {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon
        }
    } catch (error) {
        return {
            error: true,
            message: "Failed to fetch weather data",
            details: error.message
        }
    }
});