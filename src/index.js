import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";

import { getConfig } from "./config";



// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
};

ReactDOM.render(
  <React.StrictMode>
      <Auth0Provider {...providerConfig}>
    <ContextProvider>
        <App />
    </ContextProvider>
      </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
