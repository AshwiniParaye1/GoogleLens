"use client";

import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import {
  cameraOutline,
  homeOutline,
  menuOutline,
  micOutline,
  notificationsOutline,
  timeOutline
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

  const handleVoiceSearch = () => {
    history.push("/voice-search");
  };

  const handleAccountClick = () => {
    history.push("/account");
  };

  // Mock data for feed items
  const feedItems = [
    {
      id: 1,
      title:
        "This superstar was Ratan Tata's closest friend, shared same room, went for picnics, listened songs together",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-11%20at%206.16.26%E2%80%AFPM-EwUhCzRgH6QukUK3l1t4oqNuDnJGeY.png"
    }
  ];

  return (
    <IonPage className="dark-theme">
      <IonContent fullscreen>
        <div className="home-container">
          <div className="top-bar">
            <div className="beaker-icon">
              <span>⚗️</span>
            </div>
            <div className="search-widget">
              <div className="google-icon">G</div>
              <span>Search</span>
              <div className="star-icon">★</div>
            </div>
            <div className="avatar-container" onClick={handleAccountClick}>
              <div className="avatar">A</div>
            </div>
          </div>

          <div className="logo-container">
            <div className="google-logo">Google</div>
          </div>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search"
                className="search-input"
              />
              <div className="search-icons">
                <IonButton
                  fill="clear"
                  onClick={handleVoiceSearch}
                  className="mic-button"
                >
                  <IonIcon icon={micOutline} />
                </IonButton>
                <IonButton
                  fill="clear"
                  onClick={handleImageSearch}
                  className="lens-button"
                >
                  <IonIcon icon={cameraOutline} />
                </IonButton>
              </div>
            </div>
          </form>

          <div className="quick-access">
            <div className="quick-access-row">
              <div className="quick-access-item gold">
                <div className="quick-icon">
                  <span className="icon-text">📷</span>
                </div>
              </div>
              <div className="quick-access-item blue">
                <div className="quick-icon">
                  <span className="icon-text">🔤</span>
                </div>
              </div>
              <div className="quick-access-item green">
                <div className="quick-icon">
                  <span className="icon-text">🎓</span>
                </div>
              </div>
              <div className="quick-access-item red">
                <div className="quick-icon">
                  <span className="icon-text">🎵</span>
                </div>
              </div>
            </div>
          </div>

          <div className="weather-widgets">
            <div className="weather-widget">
              <div className="location">Gurugram</div>
              <div className="temp-container">
                <div className="temperature">30°</div>
                <div className="moon-icon">🌙</div>
              </div>
            </div>
            <div className="air-quality-widget">
              <div className="air-quality-title">Air quality · 170</div>
              <div className="air-quality-status">
                <span>Moderate</span>
                <span className="air-icon">💨</span>
              </div>
            </div>
          </div>

          <div className="feed-container">
            {feedItems.map((item) => (
              <div key={item.id} className="feed-card">
                <img src="/ratan-tata-img.jpeg" alt="" className="feed-image" />
                <div className="feed-content">
                  <div className="feed-title">{item.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bottom-nav">
            <div className="nav-item active">
              <IonIcon icon={homeOutline} />
            </div>
            <div className="nav-item">
              <IonIcon icon={timeOutline} />
            </div>
            <div className="nav-item">
              <IonIcon icon={notificationsOutline} />
            </div>
            <div className="nav-item">
              <IonIcon icon={menuOutline} />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
