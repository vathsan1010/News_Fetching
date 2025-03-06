const API_KEY = "949595b8a0de456a8b6ad9ccb313e46e"; 

const BASE_URL = "https://newsapi.org/v2/top-headlines";
const EVERYTHING_URL = "https://newsapi.org/v2/everything";

export async function fetchNewsByCategory(category = "general") {
    try {
        const response = await fetch(`${BASE_URL}?category=${category}&country=us&apiKey=${API_KEY}`, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}

export async function fetchNewsBySearch(query) {
    try {
        const response = await fetch(`${EVERYTHING_URL}?q=${query}&apiKey=${API_KEY}`, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}
