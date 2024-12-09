"use client";

import React from "react";

import { mainStyles } from '@/app/styles/mainStyles';

const LoginPage: React.FC = () => {
  // Replace with your IdP's authorization endpoint URL and parameters
  const clientId = "SynopticumSPAWebApp";  // Use your actual client ID
  const redirectUri = encodeURIComponent("http://localhost:7000/pages/account/callback");  // Adjust your redirect URI
  const responseType = "code";  // OpenID uses 'code' as response type
  const scope = "openid profile email";  // Adjust scopes as needed

  const handleLogin = () => {
    const authorizationUrl =
    `https://your-identity-provider.com/authorize?client_id=${clientId}`
    +`&redirect_uri=${redirectUri}`
    +`&response_type=${responseType}`
    + `&scope=${scope}`;

    window.location.href = authorizationUrl;
  };

  return (
    <div style={mainStyles.container}>
      <h1>Login</h1>
      <button onClick={handleLogin} style={mainStyles.button}>
        Log In with OpenID
      </button>
    </div>
  );
};

export default LoginPage;
