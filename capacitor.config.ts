import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.f31c129162a24a76ab8dab5161b73953",
  appName: "google-lens",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#202124"
    }
  }
};

export default config;
