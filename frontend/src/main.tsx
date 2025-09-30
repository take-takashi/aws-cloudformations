import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Amplify } from 'aws-amplify'
import type { ResourcesConfig } from 'aws-amplify'

const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COG_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COG_APP_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_COG_DOMAIN,
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: [import.meta.env.VITE_REDIRECT],
          redirectSignOut: [import.meta.env.VITE_REDIRECT],
          responseType: 'code',
        },
      },
    },
  },
};

Amplify.configure(amplifyConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
