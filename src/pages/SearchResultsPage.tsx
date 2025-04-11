"use client";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar
} from "@ionic/react";
import {
  cartOutline,
  globeOutline,
  imageOutline,
  linkOutline,
  searchOutline,
  shareOutline,
  textOutline
} from "ionicons/icons";
import type React from "react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./SearchResultsPage.css";

interface LocationState {
  imageData: string;
}

const SearchResultsPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [imageData, setImageData] = useState<string | null>(null);
  const [activeSegment, setActiveSegment] = useState<string>("all");

  // Mock search results
  const visualMatches = [
    {
      id: 1,
      title: "Google Pixel 6 Pro",
      description:
        "The Google Pixel 6 Pro is a high-end smartphone with a 6.7-inch display, Google Tensor chip, and advanced camera system.",
      image: "/placeholder.svg?height=120&width=120",
      source: "Google Store",
      price: "$899"
    },
    {
      id: 2,
      title: "Google Pixel 6",
      description:
        "The Google Pixel 6 features a 6.4-inch display, Google Tensor chip, and dual camera system.",
      image: "/placeholder.svg?height=120&width=120",
      source: "Best Buy",
      price: "$599"
    },
    {
      id: 3,
      title: "Google Pixel 5",
      description:
        "The Google Pixel 5 is a 5G-capable smartphone with a 6-inch display and dual camera system.",
      image: "/placeholder.svg?height=120&width=120",
      source: "Amazon",
      price: "$699"
    }
  ];

  const webResults = [
    {
      id: 1,
      title: "Google Pixel - Wikipedia",
      description:
        "The Google Pixel is a line of consumer electronic devices developed by Google that run either Chrome OS or the Android operating system.",
      url: "https://en.wikipedia.org/wiki/Google_Pixel"
    },
    {
      id: 2,
      title: "Pixel phones - Google Store",
      description:
        "Meet the lineup of premium phones designed by Google. Pixel phones feature the best of Google, including the Google Assistant, stunning camera, and more.",
      url: "https://store.google.com/category/phones"
    },
    {
      id: 3,
      title: "Google Pixel 6 review - The Verge",
      description:
        "The Google Pixel 6 is the most significant upgrade to Google's smartphone line in years. It's a truly competitive flagship phone with a distinctive design.",
      url: "https://www.theverge.com/google-pixel-6-review"
    }
  ];

  const relatedImages = [
    {
      id: 1,
      image: "/placeholder.svg?height=100&width=100",
      alt: "Related image 1"
    },
    {
      id: 2,
      image: "/placeholder.svg?height=100&width=100",
      alt: "Related image 2"
    },
    {
      id: 3,
      image: "/placeholder.svg?height=100&width=100",
      alt: "Related image 3"
    },
    {
      id: 4,
      image: "/placeholder.svg?height=100&width=100",
      alt: "Related image 4"
    },
    {
      id: 5,
      image: "/placeholder.svg?height=100&width=100",
      alt: "Related image 5"
    },
    {
      id: 6,
      image: "/placeholder.svg?height=100&width=100",
      alt: "Related image 6"
    }
  ];

  useEffect(() => {
    if (location.state && (location.state as LocationState).imageData) {
      setImageData((location.state as LocationState).imageData);
    }
  }, [location.state]);

  const handleSegmentChange = (e: CustomEvent) => {
    setActiveSegment(e.detail.value);
  };

  const handleShare = () => {
    // In a real app, we would implement sharing functionality
    alert("Share functionality would be implemented here");
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handleShare}>
              <IonIcon icon={shareOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="results-container">
          {imageData && (
            <div className="query-image-container">
              <img
                src={imageData || "/placeholder.svg"}
                alt="Search query"
                className="query-image"
              />
            </div>
          )}

          <IonSegment
            value={activeSegment}
            onIonChange={handleSegmentChange}
            className="results-segment"
          >
            <IonSegmentButton value="all">
              <IonIcon icon={searchOutline} />
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="shopping">
              <IonIcon icon={cartOutline} />
              <IonLabel>Shopping</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="images">
              <IonIcon icon={imageOutline} />
              <IonLabel>Images</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="text">
              <IonIcon icon={textOutline} />
              <IonLabel>Text</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {(activeSegment === "all" || activeSegment === "shopping") && (
            <div className="results-section">
              <h2 className="section-title">Visual matches</h2>
              <div className="visual-matches">
                {visualMatches.map((match) => (
                  <IonCard key={match.id} className="match-card">
                    <div className="match-image-container">
                      <img
                        src={match.image || "/placeholder.svg"}
                        alt={match.title}
                        className="match-image"
                      />
                    </div>
                    <IonCardHeader>
                      <IonCardTitle>{match.title}</IonCardTitle>
                      <IonCardSubtitle>
                        {match.source} • {match.price}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p className="match-description">{match.description}</p>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            </div>
          )}

          {(activeSegment === "all" || activeSegment === "images") && (
            <div className="results-section">
              <div className="section-header">
                <h2 className="section-title">Similar images</h2>
                <IonButton
                  fill="clear"
                  size="small"
                  className="see-more-button"
                >
                  See more
                </IonButton>
              </div>
              <div className="similar-images">
                {relatedImages.map((img) => (
                  <div key={img.id} className="similar-image-container">
                    <img
                      src={img.image || "/placeholder.svg"}
                      alt={img.alt}
                      className="similar-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeSegment === "all" || activeSegment === "text") && (
            <div className="results-section">
              <h2 className="section-title">Web results</h2>
              <IonList className="web-results">
                {webResults.map((result) => (
                  <IonItem
                    key={result.id}
                    detail={false}
                    lines="full"
                    className="web-result-item"
                  >
                    <IonIcon
                      icon={globeOutline}
                      slot="start"
                      className="web-result-icon"
                    />
                    <IonLabel className="web-result-content">
                      <div className="web-result-url">{result.url}</div>
                      <h3 className="web-result-title">{result.title}</h3>
                      <p className="web-result-description">
                        {result.description}
                      </p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </div>
          )}

          <div className="results-section">
            <h2 className="section-title">Search actions</h2>
            <div className="search-actions">
              <IonChip className="action-chip">
                <IonIcon icon={textOutline} />
                <IonLabel>Copy text</IonLabel>
              </IonChip>
              <IonChip className="action-chip">
                <IonIcon icon={searchOutline} />
                <IonLabel>Search image</IonLabel>
              </IonChip>
              <IonChip className="action-chip">
                <IonIcon icon={linkOutline} />
                <IonLabel>Find source</IonLabel>
              </IonChip>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SearchResultsPage;
