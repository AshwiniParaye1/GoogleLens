import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

createRoot(document.getElementById("root")!).render(<App />);
