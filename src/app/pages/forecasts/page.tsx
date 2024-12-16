"use client";

import React from 'react';
import { mainStyles } from '@/app/styles/mainStyles';

import { FetchForecastsParams, Forecast, SynopticumApiClient, WeatherSummary }
  from '@/app/apiClients/synopticum/SynopticumApiClient';

import { useSession } from "next-auth/react"

// Fetching forecasts
async function getForecasts(client: SynopticumApiClient) {
  try {
    const params: FetchForecastsParams = {
      minTemperatureC: 1,
      maxTemperatureC: 20,
      pageSize: 50,
      pageNumber: 1,
    };
    const forecasts = await client.fetchForecasts("Belarus", "Minsk", params);
    console.log("Fetched forecasts:", forecasts);
  } catch (error) {
    console.error("Error fetching forecasts:", error);
  }
}

// Creating a forecast
async function postForecast(client: SynopticumApiClient) {
  try {
    const newForecast: Forecast = {
      date: "2025-01-01",
      temperatureC: 10,
      summary: WeatherSummary.Cool,
    };
    await client.createForecast("Belarus", "Minsk", newForecast);
    console.log("Forecast created successfully.");
  } catch (error) {
    console.error("Error creating forecast:", error);
  }
}



// HomePage Component
const ForecastsPage: React.FC = () => {
      const { data: sessionData, status: sessionStatus } = useSession();
      
        const client = new SynopticumApiClient(sessionData?.accessToken ?? "");
      
      if(sessionStatus == 'authenticated'){
        postForecast(client);
      }

      var forecasts = getForecasts(client);

      return (
      <div style={mainStyles.container}>
      </div>
    );
  };
  
export default ForecastsPage;