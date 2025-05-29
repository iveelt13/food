"use client";
import axios from "axios";
import React, { createContext, useContext, ReactNode } from "react";

const BASE_URL = "http://localhost:8000/auth";

type UserContextType = {
  signUp: (data: { email: string; password: string }) => Promise<any>;
  signIn: (data: { email: string; password: string }) => Promise<any>;
  verifyUser: (token: string) => Promise<any>;
  requestPasswordReset: (email: string) => Promise<any>;
  verifyResetToken: (token: string) => Promise<any>;
  resetPassword: (data: { token: string; newPassword: string }) => Promise<any>;
};

const AuthContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const signUp = async (data: { email: string; password: string }) => {
    const res = await axios.post(`${BASE_URL}/sign-up`, data);
    return res.data;
  };

  const signIn = async (data: { email: string; password: string }) => {
    const res = await axios.post(`${BASE_URL}/sign-in`, data);
    return res.data;
  };

  const verifyUser = async (token: string) => {
    const res = await axios.get(`${BASE_URL}/verify-user?token=${token}`);
    return res.data;
  };

  const requestPasswordReset = async (email: string) => {
    const res = await axios.post(`${BASE_URL}/reset-password-request`, {
      email,
    });
    return res.data;
  };

  const verifyResetToken = async (token: string) => {
    const res = await axios.get(
      `${BASE_URL}/verify-reset-password-request?token=${token}`
    );
    return res.data;
  };

  const resetPassword = async (data: {
    token: string;
    newPassword: string;
  }) => {
    const res = await axios.post(`${BASE_URL}/reset-password`, data);
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        verifyUser,
        requestPasswordReset,
        verifyResetToken,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within UserContextProvider");
  return context;
};
