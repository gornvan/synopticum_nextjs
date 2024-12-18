"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SynopticumApiClient } from "@/app/apiClients/synopticum/SynopticumApiClient";

// Create a context for the SynopticumApiClient
interface ApiClientContextType {
  client: SynopticumApiClient | null;
}

const ApiClientContext = createContext<ApiClientContextType | undefined>(
  undefined
);

// Provider component
export const SynopticumApiClientProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: sessionData, status: sessionStatus } = useSession();
  const [client, setClient] = useState<SynopticumApiClient | null>(null);

  useEffect(() => {
    // Initialize client only when session is ready
    if (sessionStatus === "authenticated" && sessionData?.accessToken) {
      const newClient = new SynopticumApiClient(sessionData.accessToken);
      setClient(newClient);
    } else {
      setClient(null);
    }
  }, [sessionStatus, sessionData?.accessToken]);

  // Optionally handle loading state
  if (sessionStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <ApiClientContext.Provider value={{ client }}>
      {children}
    </ApiClientContext.Provider>
  );
};

// Custom hook for consuming the context
export const useSynopticumApiClient = () => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error(
      "useSynopticumApiClient must be used within a SynopticumApiClientProviderWrapper"
    );
  }
  return context.client;
};
