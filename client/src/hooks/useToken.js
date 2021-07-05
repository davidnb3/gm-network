import { useState } from 'react';

export default function useToken() {
  // First checks if token exists inside SS
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  };

  // Token state
  const [token, setToken] = useState(getToken());
  
  // Saves token to SS and token state
  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    token: token,
    setToken: saveToken
  }
}