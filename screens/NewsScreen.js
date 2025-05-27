import { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { GlobalLayout } from "../components/Layout";
import { GlobalStyles } from "../styles/global";

export default function NewsScreen() {
  const [articles, setArticles] = useState([]);
  const [headline, setHeadline] = useState("Loading...");
  const globalStyles = GlobalStyles();

  const setRandomHeadline = (articles) => {
    if (!articles || articles.length === 0) {
      setHeadline("No headlines available.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomArticle = articles[randomIndex];

    if (randomArticle?.title) {
      setHeadline(randomArticle.title);
    } else {
      setHeadline("Headline not available.");
    }
  };

  const fetchArticles = async () => {
    try {
      const API_KEY = process.env.EXPO_PUBLIC_NEWS_KEY;
      const newsURL = `https://newsapi.org/v2/top-headlines?country=au&apiKey=${API_KEY}`;
      const response = await fetch(newsURL);
      const data = await response.json();

      const articles = data.articles;
      if (!articles || articles.length === 0) {
        setHeadline("No news found.");
        return;
      }

      setArticles(articles);
      setRandomHeadline(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setHeadline("Error loading news.");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <GlobalLayout>
      <TouchableOpacity onPress={() => setRandomHeadline(articles)} style={styles.touchable}>
        <Text style={globalStyles.text}>{headline}</Text>
      </TouchableOpacity>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  touchable: {
    height: "100%",
    justifyContent: "center",
  },
});
