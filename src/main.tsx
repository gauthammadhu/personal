import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ldb1utzs7gt2hlnu.us.auth0.com"
      clientId="9z6tUrrSwyGRg4lW0gboSnDAKjsSEeAT"
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/home`
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
