"use client";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonThumbnail,
  IonToolbar
} from "@ionic/react";
import {
  cameraOutline,
  closeOutline,
  documentTextOutline,
  imageOutline,
  mapOutline,
  micOutline,
  newspaperOutline,
  videocamOutline
} from "ionicons/icons";
import type React from "react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./TextSearchPage.css";

const TextSearchPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";

  const [searchText, setSearchText] = useState(initialQuery);
  const [isListening, setIsListening] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Mock categories for search filters
  const categories = [
    { id: "all", name: "All", icon: null },
    { id: "images", name: "Images", icon: imageOutline },
    { id: "videos", name: "Videos", icon: videocamOutline },
    { id: "news", name: "News", icon: newspaperOutline },
    { id: "maps", name: "Maps", icon: mapOutline },
    { id: "docs", name: "Documents", icon: documentTextOutline }
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = (query: string) => {
    // Mock search results
    const mockResults = [
      {
        id: 1,
        title: `Result for "${query}" - Wikipedia`,
        description: `This is a sample search result for "${query}". It contains information that would typically be found on a search results page.`,
        url: "https://en.wikipedia.org",
        thumbnail: "/placeholder.svg?height=60&width=60"
      },
      {
        id: 2,
        title: `${query} - Official Website`,
        description: `Official website for ${query}. Learn more about ${query} and discover related content.`,
        url: `https://www.${query.toLowerCase().replace(/\s+/g, "")}.com`,
        thumbnail: "/placeholder.svg?height=60&width=60"
      },
      {
        id: 3,
        title: `${query} News and Updates`,
        description: `Latest news and updates about ${query}. Stay informed with the most recent developments.`,
        url: "https://news.google.com",
        thumbnail: "/placeholder.svg?height=60&width=60"
      },
      {
        id: 4,
        title: `Learn about ${query} - Educational Resource`,
        description: `Educational resources and learning materials about ${query}. Perfect for students and researchers.`,
        url: "https://www.khanacademy.org",
        thumbnail: "/placeholder.svg?height=60&width=60"
      },
      {
        id: 5,
        title: `${query} Reviews and Ratings`,
        description: `User reviews and ratings for ${query}. See what others are saying and share your own experience.`,
        url: "https://www.trustpilot.com",
        thumbnail: "/placeholder.svg?height=60&width=60"
      }
    ];

    setSearchResults(mockResults);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      performSearch(searchText);
      history.push(`/text-search?q=${encodeURIComponent(searchText)}`);
    }
  };

  const handleClear = () => {
    setSearchText("");
    setSearchResults([]);
  };

  const handleMicSearch = () => {
    setIsListening(true);

    // In a real app, we would implement speech recognition here
    // For this demo, we'll simulate speech recognition after a delay
    setTimeout(() => {
      setIsListening(false);
      setSearchText("voice search demo");
      performSearch("voice search demo");
    }, 2000);
  };

  const handleImageSearch = () => {
    history.push("/image-search");
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // In a real app, we would filter results based on the selected category
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="search-page-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                placeholder="Search or type URL"
                className="google-searchbar"
                showCancelButton="never"
              />

              <div className="search-icons">
                {searchText && (
                  <IonButton fill="clear" onClick={handleClear}>
                    <IonIcon icon={closeOutline} />
                  </IonButton>
                )}
                <IonButton
                  fill="clear"
                  onClick={handleMicSearch}
                  className={isListening ? "listening" : ""}
                >
                  <IonIcon icon={micOutline} />
                </IonButton>
                <IonButton fill="clear" onClick={handleImageSearch}>
                  <IonIcon icon={cameraOutline} />
                </IonButton>
              </div>
            </div>
          </form>

          <div className="categories-container">
            <div className="categories-scroll">
              {categories.map((category) => (
                <IonChip
                  key={category.id}
                  className={
                    activeCategory === category.id
                      ? "category-chip active"
                      : "category-chip"
                  }
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.icon && <IonIcon icon={category.icon} />}
                  <IonLabel>{category.name}</IonLabel>
                </IonChip>
              ))}
            </div>
          </div>

          {isListening && (
            <div className="listening-indicator">
              <div className="listening-animation"></div>
              <div className="listening-text">Listening...</div>
            </div>
          )}

          {searchResults.length > 0 && (
            <IonList className="search-results">
              {searchResults.map((result) => (
                <IonItem
                  key={result.id}
                  detail={false}
                  lines="full"
                  className="search-result-item"
                >
                  <IonThumbnail slot="start" className="result-thumbnail">
                    <img
                      src={result.thumbnail || "/placeholder.svg"}
                      alt={result.title}
                    />
                  </IonThumbnail>
                  <IonLabel className="result-content">
                    <div className="result-url">{result.url}</div>
                    <h3 className="result-title">{result.title}</h3>
                    <p className="result-description">{result.description}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TextSearchPage;
