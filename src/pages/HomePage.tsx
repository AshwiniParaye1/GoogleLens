import AirQualityWidget from "@/components/AirQualityWidget";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import NewsFeed from "@/components/NewsFeed";
import QuickAccess from "@/components/QuickAccess";
import SearchBar from "@/components/SearchBar";
import WeatherWidget from "@/components/WeatherWidget";
import { newsItems } from "@/data/mockData";
import { useEffect } from "react";

// SVG for Google Logo
const GoogleLogo = () => (
  <div className="mb-8">
    <h1 className="text-5xl">Google</h1>
  </div>
);

const HomePage = () => {
  useEffect(() => {
    document.title = "Google";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-google-dark text-white">
      <Header />

      <main className="flex-1 pt-4 pb-20 flex flex-col items-center">
        <GoogleLogo />
        <SearchBar />
        <QuickAccess />

        <div className="grid grid-cols-2 gap-4 mt-8 px-4 w-full max-w-xl">
          <WeatherWidget />
          <AirQualityWidget />
        </div>

        <div className="px-4 mt-6 w-full max-w-xl">
          {newsItems.map(
            (news, index) => index === 0 && <NewsFeed key={news.id} />
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default HomePage;
