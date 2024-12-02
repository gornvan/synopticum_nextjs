"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CallbackPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    // If there's no code, redirect to login or handle the error
    if (!code) {
      router.push("/login");
      return;
    }

    // Get environment variables
    const clientId = process.env.NEXT_PUBLIC_OPENID_CLIENT_ID;
    const clientSecret = process.env.OPENID_CLIENT_SECRET;  // This should be on the server side
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    // Validate that all required parameters are available
    if (!clientId || !clientSecret || !redirectUri) {
      console.error("Missing necessary environment variables for OpenID.");
      router.push("/login");
      return;
    }

    // Construct the URLSearchParams object for the token exchange request
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    // Send the request to your backend API for token exchange
    axios
      .post("/api/auth/token", params)
      .then((response) => {
        const { access_token, id_token, refresh_token } = response.data;

        // Store the tokens in sessionStorage or cookies
        sessionStorage.setItem("Session.Token", access_token);
        sessionStorage.setItem("Session.IDToken", id_token);
        sessionStorage.setItem("Session.RefreshToken", refresh_token);

        // Redirect the user to the home page
        router.push("/home");
      })
      .catch((error) => {
        console.error("Error exchanging authorization code for token:", error);
        router.push("/login");
      });
  }, [router]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default CallbackPage;
