import { fetchNewsByCategory,fetchNewsBySearch } from "../services/newsService";
import { useState,useEffect } from "react";
import "../components/Home.css"

export default function Home() {
    const[news,setNews]=useState([])
    const[category,setCategory]=useState("general")
    const[searchQuery,setSearchQuery]=useState("")
    const[bookmark,setBookmark]=useState([])
    useEffect(()=>{
      const getNews=   async ()=>{
        const article = await fetchNewsByCategory(category)
        setNews(article)
      }
      getNews()
    },[category])
    
    const handleSearch = async (e)=>{
        e.preventDefault();
        if(searchQuery.trim()==="")return;
        const searchResults =await fetchNewsBySearch(searchQuery)
        setNews(searchResults)
    }
    
    useEffect(()=>{
      const savedBookmark=JSON.parse(localStorage.getItem("bookmark"))||[]
      setBookmark(savedBookmark)
    },[])
    
     const handleBookmark=(article)=>{
             const updateBookmark = [...bookmark,article]
             setBookmark(updateBookmark)
             localStorage.setItem("bookmark",JSON.stringify(updateBookmark))
     }
    
     const removeBookmark =(title)=>{
           const updateBookmark=bookmark.filter((article)=>article.title !== title)
           setBookmark(updateBookmark)
           localStorage.setItem("bookmark",JSON.stringify(updateBookmark))
     }
  return (
    <div className="container">
      <h1>News Listing Page</h1>
      
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search news..."
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        className="search-input"
        />
        <button type="submit">Search</button>
      </form>
      
      <div className="category-buttons">
        {
            ["general","sports","technology","health"].map((cat)=>(
            <button key={cat} onClick={()=>setCategory(cat)}>{cat.toUpperCase()}</button>
        ))
        }
        </div>
        <div  className="news-container">
            {news.length > 0 ? (
              news.map((article,index)=>(
                <div key={index} className="news-item">
                    <img src={article.urlToImage} alt={article.title}/>
                    <h3>{article.title}</h3>
                    <p>{article.source.name}</p>
                    <button onClick={() => handleBookmark(article)}>Bookmark</button>
                </div>
              ))
            ):(
                <p style={{color:"white"}}>Loading news...</p>
            )}
        </div>
        <h2 style={{color:"white"}}>Bookmarked Articles</h2>
        <div className="bookmark-container">
          {bookmark.length>0 ?(
          <div className="bookmark-grid">  
            {bookmark.map((article,index)=>(
              <div key={index} className="bookmark-item">
                <img src={article.urlToImage} alt={article.title} style={{ width: "100%" }}/>
                <h3>{article.title}</h3>
                <p>{article.source.name}</p>
                <button onClick={() => removeBookmark(article.title)}>Remove</button>
              </div>
            ))}
            </div>
          ):(
            <p style={{color:"white"}} >No bookmarks yet.</p>
          )}

        </div>
        </div>
  )}
