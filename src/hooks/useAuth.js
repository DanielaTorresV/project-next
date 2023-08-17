import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options).catch((error) => {
      console.log('An error ocurred:', error.response);
    });

    if (access_token) {
      const token = access_token.access_token;
      Cookie.set('token', token, {
        expires: 5,
      });
      const { data: user } = await axios.get(endPoints.auth.profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(user);
    }
  };

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = '/';
  };

  return {
    user,
    signIn,
    setError,
    logout,
  };
}
