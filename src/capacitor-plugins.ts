// Import Capacitor plugins
import { Camera } from "@capacitor/camera"
import { SplashScreen } from "@capacitor/splash-screen"
import { StatusBar } from "@capacitor/status-bar"

// Initialize plugins that need early initialization
const initializeCapacitorPlugins = async () => {
  try {
    // Hide the splash screen
    await SplashScreen.hide()

    // Set status bar style
    await StatusBar.setStyle({ style: "dark" })

    // Request camera permissions early
    await Camera.requestPermissions()
  } catch (error) {
    console.error("Error initializing Capacitor plugins:", error)
  }
}

export { initializeCapacitorPlugins }
