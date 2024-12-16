"use client";

import React from 'react';
import { mainStyles } from '@/app/styles/mainStyles';

import { useSession } from "next-auth/react"

// HomePage Component
const HomePage: React.FC = () => {
  const { data: sessionData, status } = useSession();

  return (
    <div style={mainStyles.container}>
      <header style={mainStyles.header}>
        <h1 style={mainStyles.title}>Welcome to Synopticum!</h1>
        <p style={mainStyles.intro}>
          The most advanced weather forecasting application! Get real-time weather data and forecasts for countries and cities around the world.
        </p>
        {sessionData?.user?.name ? (
          <h2 style={mainStyles.greeting}>Hello, {sessionData.user.name}! Welcome back to Synopticum!</h2>
        ) : (
          <h2 style={mainStyles.greeting}>Explore the world with accurate, real-time weather forecasts.</h2>
        )}
      </header>
      <section style={mainStyles.features}>
        <div style={mainStyles.featureBox}>
          <h3>Global Coverage</h3>
          <p>Access weather forecasts for thousands of cities and countries worldwide.</p>
        </div>
        <div style={mainStyles.featureBox}>
          <h3>Real-time Data</h3>
          <p>Stay up-to-date with the most accurate and current weather data.</p>
        </div>
        <div style={mainStyles.featureBox}>
          <h3>Customizable Alerts</h3>
          <p>Set alerts and notifications based on your preferred locations and weather conditions.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;