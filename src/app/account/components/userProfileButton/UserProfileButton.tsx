"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaSignInAlt, FaCog } from "react-icons/fa"; // Using Font Awesome icons for UI
import { mainStyles } from '@/app/styles/mainStyles';


const UserProfileButton: React.FC<UserProfileButtonProps> = ({ user }) => {
    const router = useRouter();

    const handleLoginClick = () => {
      router.push("/pages/account/login");
    };

    const handleProfileClick = () => {
      router.push("/pages/account/settings");
    };

    return (
      <div style={styles.userProfileContainer}>
        {user && user.token ? (
          // If the user is logged in, show the profile settings button
          <div style={styles.profileContainer}>
            <button style={mainStyles.button} onClick={handleProfileClick}>
              <FaCog style={mainStyles.icon} />
              <span style={styles.username}>{user.name}</span>
              <span className="tooltip">Profile settings</span>
            </button>
          </div>
        ) : (
          // If the user is anonymous, show the login button
          <div style={styles.loginContainer}>
            <button style={mainStyles.button} onClick={handleLoginClick}>
              <FaSignInAlt style={mainStyles.icon} />
              Login
            </button>
          </div>
        )}
      </div>
    );
  };

const styles = {
    username: {
        marginRight: "8px",
        fontWeight: "bold",
    },
    profileContainer: {
        display: "flex",
        alignItems: "center",
    },
    loginContainer: {
        display: "flex",
        alignItems: "center",
    },
    userProfileContainer: {
        marginLeft: "auto", // Push the UserProfileButton to the far right
        display: "flex",
        alignItems: "center",
      },
}


export default UserProfileButton;
