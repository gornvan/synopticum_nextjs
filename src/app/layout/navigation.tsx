"use client";

import Link from 'next/link';  // Import Link for internal navigation in Next.js
import UserProfileButton from "@/app/pages/account/components/userProfileButton/UserProfileButton";
import { mainStyles } from '@/app/styles/mainStyles';

const Navigation: React.FC = () => {
    return (
      <nav style={mainStyles.navBar}>
        <ul style={mainStyles.navList}>
          <li>
            <Link href="/" style={mainStyles.navLink}>Home</Link>
          </li>
          <li>
            <Link href="/pages/about" style={mainStyles.navLink}>About</Link>
          </li>
          <li>
            <Link href="/pages/forecasts" style={mainStyles.navLink}>Forecast</Link>
          </li>
          <li>
            <Link href="/pages/contact" style={mainStyles.navLink}>Contact</Link>
          </li>
        </ul>
        <UserProfileButton/>
      </nav>
    );
  };

export { Navigation };