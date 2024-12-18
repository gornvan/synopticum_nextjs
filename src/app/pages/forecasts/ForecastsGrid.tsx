import { Forecast, SynopticumApiClient, WeatherSummary } from "@/app/apiClients/synopticum/SynopticumApiClient";
import { useSynopticumApiClient } from "@/app/apiClients/synopticum/SynopticumApiClientProviderWrapper";
import GenericGrid from "@/app/components/genericGrid/GenericGrid";
import { CircularProgress, Typography, Alert, Container } from "@mui/material";
import { useEffect, useState } from "react";

const ForecastsGrid = () => {
    const [forecasts, setForecasts] = useState<Forecast[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const client = useSynopticumApiClient();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await client!.fetchForecasts("Belarus", "Minsk", {
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

export default ForecastsGrid;