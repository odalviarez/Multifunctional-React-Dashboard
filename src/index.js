import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./config";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  //onRedirectCallback,
};

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Auth0Provider {...providerConfig}>
        <App />
      </Auth0Provider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.unregister();
reportWebVitals();
