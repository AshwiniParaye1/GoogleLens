"use client";

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonSearchbar,
  IonToolbar
} from "@ionic/react";
import {
  cameraOutline,
  compassOutline,
  imageOutline,
  mailOutline,
  micOutline,
  newspaperOutline,
  personCircleOutline,
  searchOutline,
  videocamOutline
} from "ionicons/icons";
import type React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      history.push(`/text-search?q=${encodeURIComponent(searchText)}`);
    }
  };

  const handleImageSearch = () => {
    history.push("/image-search");
  };

  const handleMicSearch = () => {
    // In a real app, we would implement speech recognition here
    alert("Microphone functionality would be implemented here");
  };

  // Mock data for feed items
  const feedItems = [
    {
      id: 1,
      title: "Google introduces new AI features",
      source: "Tech News",
      time: "2 hours ago",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 2,
      title: "How to optimize your React applications",
      source: "Dev Community",
      time: "4 hours ago",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 3,
      title: "The future of mobile development with Capacitor",
      source: "Ionic Blog",
      time: "1 day ago",
      image: "/placeholder.svg?height=100&width=100"
    }
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={personCircleOutline} className="profile-icon" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="home-container">
          <div className="logo-container">
            <img src="/google-logo.png" alt="Google" className="google-logo" />
          </div>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                placeholder="Search or type URL"
                className="google-searchbar"
              />
              <div className="search-icons">
                <IonButton fill="clear" onClick={handleMicSearch}>
                  <IonIcon icon={micOutline} />
                </IonButton>
                <IonButton fill="clear" onClick={handleImageSearch}>
                  <IonIcon icon={cameraOutline} />
                </IonButton>
              </div>
            </div>
          </form>

          <div className="quick-access">
            <IonGrid>
              <IonRow>
                <IonCol size="3">
                  <div className="quick-access-item">
                    <div className="quick-icon">
                      <IonIcon icon={compassOutline} />
                    </div>
                    <div className="quick-label">Discover</div>
                  </div>
                </IonCol>
                <IonCol size="3">
                  <div className="quick-access-item">
                    <div className="quick-icon">
                      <IonIcon icon={searchOutline} />
                    </div>
                    <div className="quick-label">Search</div>
                  </div>
                </IonCol>
                <IonCol size="3">
                  <div className="quick-access-item">
                    <div className="quick-icon">
                      <IonIcon icon={newspaperOutline} />
                    </div>
                    <div className="quick-label">News</div>
                  </div>
                </IonCol>
                <IonCol size="3">
                  <div className="quick-access-item">
                    <div className="quick-icon">
                      <IonIcon icon={mailOutline} />
                    </div>
                    <div className="quick-label">Gmail</div>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="3">
                  <div className="quick-access-item">
                    <div className="quick-icon">
                      <IonIcon icon={imageOutline} />
                    </div>
                    <div className="quick-label">Images</div>
                  </div>
                </IonCol>
                <IonCol size="3">
                  <div className="quick-access-item">
                    <div className="quick-icon">
                      <IonIcon icon={videocamOutline} />
                    </div>
                    <div className="quick-label">Videos</div>
                  </div>
                </IonCol>
                <IonCol size="3">
                  <div className="quick-access-item">
                    <div className="quick-icon">
                      <IonIcon icon={compassOutline} />
                    </div>
                    <div className="quick-label">Maps</div>
                  </div>
                </IonCol>
                <IonCol size="3">
                  <div className="quick-access-item">
                    <div className="quick-icon">
                      <IonIcon icon={compassOutline} />
                    </div>
                    <div className="quick-label">More</div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          <div className="feed-container">
            <h2 className="feed-title">For you</h2>
            {feedItems.map((item) => (
              <IonCard key={item.id} className="feed-card">
                <IonCardContent>
                  <div className="feed-item">
                    <div className="feed-content">
                      <h3 className="feed-item-title">{item.title}</h3>
                      <div className="feed-meta">
                        <span className="feed-source">{item.source}</span>
                        <span className="feed-time">{item.time}</span>
                      </div>
                    </div>
                    <div className="feed-image">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                      />
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
