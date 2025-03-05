
import axios from "axios";

const Api_Key = "949595b8a0de456a8b6ad9ccb313e46e";

const Base_URL="https://newsapi.org/v2/top-headlines";
const EVERYTHING_URL = "https://newsapi.org/v2/everything";


export async function fetchNewsByCategory(category = "general"){
    try{
        const response = await axios.get(`${Base_URL}`,{
            params:{
                category,
                country:"us",
                apiKey:Api_Key
            }
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