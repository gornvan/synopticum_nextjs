"use client";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import { Forecast, SynopticumApiClient, WeatherSummary }
  from "@/app/apiClients/synopticum/SynopticumApiClient";
import ForecastsGrid from "./ForecastsGrid";
import NewForecastForm from "./NewForecastForm";

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

const ForecastsGridPage = () => {
  return <Container>
    <NewForecastForm country="Belarus" city="Minsk"></NewForecastForm>
    <ForecastsGrid></ForecastsGrid>
  </Container>
}


export default ForecastsGridPage;
