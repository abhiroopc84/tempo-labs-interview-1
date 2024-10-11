import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      let { data: newsIds } = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      );

      newsIds.forEach(async (newsId) => {
        const { data: newsItem } = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`
        );
        setNews((prev) => [...prev, newsItem]);
      });
    };

    fetchNews();
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {news.map((newsItem) => (
          <div key={newsItem.id} style={{display: "flex", border: "2px solid black", padding: "2rem", borderRadius: "2rem"}}>
            {newsItem.title}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
