
import axios from "axios";

const Api_Key = import.meta.env.VITE_NEWS_API_KEY;

const Base_URL="https://newsapi.org/v2/top-headlines";
const EVERYTHING_URL = "https://newsapi.org/v2/everything";


export async function fetchNewsByCategory(category = "general"){
    try{
        const response = await axios.get(`${Base_URL}`,{
            params:{
                category,
                country:"us",
                apiKey:Api_Key
            },headers: { "Upgrade-Insecure-Requests": "1" },
        })
        return response.data.articles
    }
    catch(error){
        console.error("Error fetching news:",error)
        return[];
    }
}
export async function fetchNewsBySearch(query)
{
    try{
        const response = await axios.get(`${EVERYTHING_URL}`,{
            params:{
                q:query,
                apiKey:Api_Key
            }
        })
        return response.data.articles
    }
    catch(error){
        console.error("Error fetching news:",error)
        return []
    }

}