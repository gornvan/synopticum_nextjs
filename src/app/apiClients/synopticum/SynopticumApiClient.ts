
export enum WeatherSummary
{
    Liquifying = 0,
    Freezing = 1,
    Bracing = 2,
    Chilly = 3,
    Cool = 4,
    Mild = 5,
    Warm = 6,
    Hot = 7,
    Sweating = 8,
    Sweltering = 9,
    Scorching = 10
}

export interface Forecast {
  date: string; // ISO date string, e.g., "2025-01-01"
  temperatureC: number;
  summary: string | number; // Can be extended based on server response
}

export interface FetchForecastsParams {
  minTemperatureC: number;
  maxTemperatureC: number;
  pageSize: number;
  pageNumber: number;
}

export class SynopticumApiClient {
  private token: string;
  private baseUrl: string

  constructor(
    token: string,
    baseUrl: string = process.env.NEXT_PUBLIC_SYNOPTICUM_API_BASEURL || ""
  ) {
    if (!baseUrl) {
      throw new Error("API base URL must be provided or set in the environment variable NEXT_SYNOPTICUM_API_BASEURL.");
    }

    this.baseUrl = baseUrl;
    this.token = token;
  }

  /**
   * Reusable method for sending HTTP requests.
   * @param method HTTP method (GET, POST, etc.)
   * @param path Endpoint path relative to the base URL.
   * @param queryParams Optional query parameters.
   * @param body Optional request body.
   * @returns Parsed JSON response.
   */
  private async sendRequest<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    queryParams?: any,
    body?: any
  ): Promise<T> {
    // Construct the full URL with query parameters
    const url = new URL(`${this.baseUrl}${path}`);
    if (queryParams) {
      const searchParams = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
      url.search = searchParams.toString();
    }

    // Prepare request options
    const options: RequestInit = {
      method,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    // Perform the request
    const response = await fetch(url.toString(), options);

    // Handle errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP Error ${response.status}: ${response.statusText} - ${errorText}`
      );
    }

    // Parse and return JSON response
    const data: T = await response.json();
    return data;
  }

  /**
   * Fetch forecasts for a specific country and city with filtering options.
   */
  async fetchForecasts(
    country: string,
    city: string,
    params: FetchForecastsParams
  ): Promise<Forecast[]> {
    const path = `/WeatherForecast/countries/${country}/cities/${city}`;
    return this.sendRequest<Forecast[]>("GET", path, params);
  }

  /**
   * Post a new forecast for a specific country and city.
   */
  async createForecast(
    country: string,
    city: string,
    forecast: Forecast
  ): Promise<void> {
    if (!this.token) {
      throw new Error("Authentication token must be provided.");
    }
    const path = `/WeatherForecast/countries/${country}/cities/${city}`;
    await this.sendRequest<void>("POST", path, undefined, forecast);
  }
}
