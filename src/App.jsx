import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css"; // Alag CSS file ka import

const App = () => {
  const [newsData, setNewsData] = useState([]);
  const [topic, setTopic] = useState("Corruption");
  const [country, setCountry] = useState("PK");

  const getNewsAxios = async (q, country) => {
    const apiKey = "pub_63098609a3378b785028af87b129ad054fc13";
    const url = `https://newsdata.io/api/1/news`;

    try {
      const response = await axios.get(
        `${url}?apikey=${apiKey}&q=${q}&country=${country}&language=en`
      );
      setNewsData(response.data.results || []);
    } catch (error) {
      console.error("Error fetching the news:", error);
    }
  };

  useEffect(() => {
    getNewsAxios(topic, country);
  }, [topic, country]);

  return (
    <div className="container">
      <h1 className="heading">News App</h1>
      <div className="filters">
        <label htmlFor="topic">
          Topic:
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="dropdown"
          >
            <option value="Corruption">Corruption</option>
            <option value="Sport">Sport</option>
            <option value="Education">Education</option>
            <option value="Technology">Technology</option>
            <option value="Politics">Politics</option>
            <option value="Terrorism">Terrorism</option>
          </select>
        </label>

        <label htmlFor="country">
          Country:
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="dropdown"
          >
            <option value="PK">Pakistan</option>
            <option value="IN">India</option>
            <option value="US">USA</option>
          </select>
        </label>
      </div>

      <div className="news-container">
        {newsData.map((news, index) => (
          <div key={index} className="news-card">
            {news.image_url ? (
              <img src={news.image_url} alt={news.title} className="news-image" />
            ) : (
              <p className="no-image">No Image Available</p>
            )}
            <h3 className="news-title">{news.title}</h3>
            <p className="news-description">
              {news.description || "No description available"}
            </p>
            {news.source_url && (
              <a
                href={news.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-link"
              >
                Read More
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
