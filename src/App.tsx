import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import type React from "react";
import { Redirect, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ImageSearchPage from "./pages/ImageSearchPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import TextSearchPage from "./pages/TextSearchPage";

// Ionic CSS
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";

// Theme and global styles
import "./theme/global.css";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/text-search" component={TextSearchPage} />
        <Route exact path="/image-search" component={ImageSearchPage} />
        <Route exact path="/search-results" component={SearchResultsPage} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
