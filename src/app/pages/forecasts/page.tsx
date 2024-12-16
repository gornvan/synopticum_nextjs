"use client";
import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import { useSession } from "next-auth/react"
import { Forecast, SynopticumApiClient, WeatherSummary }
  from "@/app/apiClients/synopticum/SynopticumApiClient";
import GenericGrid from "@/app/components/genericGrid/GenericGrid";

const ForecastsGridPage = () => {
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


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

const { data: sessionData, status: sessionStatus } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      
      const client = new SynopticumApiClient(sessionData?.accessToken ?? "");
      
      if(sessionStatus == 'authenticated'){
        postForecast(client);
      }

      try {
        const data = await client.fetchForecasts("Belarus", "Minsk", {
          minTemperatureC: 1,
          maxTemperatureC: 20,
          pageSize: 50,
          pageNumber: 1,
        });
        setForecasts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Enum mapping for the grid
  const enumMap = {
    summary: WeatherSummary,
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Weather Forecasts
      </Typography>
      {loading && <CircularProgress />}
      {error && (
        <Alert severity="error" style={{ marginBottom: "16px" }}>
          Error: {error}
        </Alert>
      )}
      {!loading && !error && <GenericGrid data={forecasts} enumMap={enumMap} />}
    </Container>
  );
};

export default ForecastsGridPage;
