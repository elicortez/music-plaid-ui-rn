import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [spotifyProfile, setSpotifyProfile] = useState(null);
  const [appBackedInfo, setAppBackedInfo] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser, spotifyProfile, setSpotifyProfile, appBackedInfo, setAppBackedInfo, topArtists, setTopArtists, userData, setUserData}}>
      {children}
    </AuthContext.Provider>
  );
};
