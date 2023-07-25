import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../services/auth';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Call the getUserProfile service to fetch the user's profile data
    getUserProfile()
      .then((response) => {
        // Assuming the getUserProfile service returns the user object
        setUser(response.user);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        // Handle the error, show error message to the user, etc.
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more user profile information here as needed */}
    </div>
  );
};

export default UserProfile;
