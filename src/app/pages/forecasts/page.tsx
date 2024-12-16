"use client";

import React from 'react';
import { mainStyles } from '@/app/styles/mainStyles';

import { FetchForecastsParams, Forecast, SynopticumApiClient, WeatherSummary }
  from '@/app/apiClients/synopticum/SynopticumApiClient';

import { useSession } from "next-auth/react"
import GenericGrid from '@/app/components/genericGrid/GenericGrid';

// Fetching forecasts
async function getForecasts(client: SynopticumApiClient) {
  try {
    const params: FetchForecastsParams = {
      minTemperatureC: 1,
      maxTemperatureC: 20,
      pageSize: 50,
      pageNumber: 1,
    };
    return await client.fetchForecasts("Belarus", "Minsk", params);
  } catch (error) {
    console.error("Error fetching forecasts:", error);
    throw error;
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
const ForecastsPage: React.FC = async () => {
      const { data: sessionData, status: sessionStatus } = useSession();
      
        const client = new SynopticumApiClient(sessionData?.accessToken ?? "");
      
      if(sessionStatus == 'authenticated'){
        postForecast(client);
      }

      var forecasts = await getForecasts(client);

      return (
      <div style={mainStyles.container}>
        <GenericGrid data={forecasts}>
          
        </GenericGrid>
      </div>
    );
  };
  
export default ForecastsPage;