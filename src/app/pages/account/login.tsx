"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { styles } from '@/app/styles/mainStyles';

const LoginPage: React.FC = () => {
  // Replace with your IdP's authorization endpoint URL and parameters
  const clientId = "SynopticumSPAWebApp";  // Use your actual client ID
  const redirectUri = encodeURIComponent("http://localhost:7000/pages/account/callback");  // Adjust your redirect URI
  const responseType = "code";  // OpenID uses 'code' as response type
  const scope = "openid profile email";  // Adjust scopes as needed

  const authorizationUrl =
    `https://your-identity-provider.com/authorize?client_id=${clientId}`
    +`&redirect_uri=${redirectUri}`
    +`&response_type=${responseType}`
    + `&scope=${scope}`;

  window.location.href = authorizationUrl;

  const handleLogin = () => {
    // Redirecting to an external authentication service (mock URL)
    window.location.href = "";
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <button onClick={handleLogin} style={styles.button}>
        Log In with OpenID
      </button>
    </div>
  );
};

export default LoginPage;
