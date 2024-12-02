import Image from "next/image";

import React from 'react';
import Link from 'next/link';  // Import Link for internal navigation in Next.js
import { styles } from '@/app/styles/mainStyles';
import { HomePageProps } from "./HomePageProps";

// Hello page: accept the current user
// if user provided - show their name
// if null - show "Anonymous"

const Navigation: React.FC = () => {
  return (
    <nav style={styles.navBar}>
      <ul style={styles.navList}>
        <li>
          <Link href="/" style={styles.navLink}>Home</Link>
        </li>
        <li>
          <Link href="/about" style={styles.navLink}>About</Link>
        </li>
        <li>
          <Link href="/forecast" style={styles.navLink}>Forecast</Link>
        </li>
        <li>
          <Link href="/contact" style={styles.navLink}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

// HomePage Component
const HomePage: React.FC<HomePageProps> = ({ user }) => {
  return (
    <div style={styles.container}>
      <Navigation />
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to Synopticum!</h1>
        <p style={styles.intro}>
          The most advanced weather forecasting application! Get real-time weather data and forecasts for countries and cities around the world.
        </p>
        {user ? (
          <h2 style={styles.greeting}>Hello, {user.name}! Welcome back to Synopticum!</h2>
        ) : (
          <h2 style={styles.greeting}>Explore the world with accurate, real-time weather forecasts.</h2>
        )}
      </header>
      <section style={styles.features}>
        <div style={styles.featureBox}>
          <h3>Global Coverage</h3>
          <p>Access weather forecasts for thousands of cities and countries worldwide.</p>
        </div>
        <div style={styles.featureBox}>
          <h3>Real-time Data</h3>
          <p>Stay up-to-date with the most accurate and current weather data.</p>
        </div>
        <div style={styles.featureBox}>
          <h3>Customizable Alerts</h3>
          <p>Set alerts and notifications based on your preferred locations and weather conditions.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;