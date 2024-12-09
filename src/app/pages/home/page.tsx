import React from 'react';
import Link from 'next/link';  // Import Link for internal navigation in Next.js
import { mainStyles } from '@/app/styles/mainStyles';
import { HomePageProps } from "./HomePageProps";
import UserProfileButton from "@/app/pages/account/components/userProfileButton/UserProfileButton";

// Hello page: accept the current user
// if user provided - show their name
// if null - show "Anonymous"

const Navigation: React.FC<HomePageProps> = ({user}) => {
  return (
    <nav style={mainStyles.navBar}>
      <ul style={mainStyles.navList}>
        <li>
          <Link href="/" style={mainStyles.navLink}>Home</Link>
        </li>
        <li>
          <Link href="/about" style={mainStyles.navLink}>About</Link>
        </li>
        <li>
          <Link href="/forecast" style={mainStyles.navLink}>Forecast</Link>
        </li>
        <li>
          <Link href="/contact" style={mainStyles.navLink}>Contact</Link>
        </li>
      </ul>
      <UserProfileButton user={user}/>
    </nav>
  );
};

// HomePage Component
const HomePage: React.FC<HomePageProps> = ({ user }) => {
  return (
    <div style={mainStyles.container}>
      <Navigation user={user}/>
      <header style={mainStyles.header}>
        <h1 style={mainStyles.title}>Welcome to Synopticum!</h1>
        <p style={mainStyles.intro}>
          The most advanced weather forecasting application! Get real-time weather data and forecasts for countries and cities around the world.
        </p>
        {user ? (
          <h2 style={mainStyles.greeting}>Hello, {user.name}! Welcome back to Synopticum!</h2>
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