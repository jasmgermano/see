'use client';
import React, { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { AuthProvider } from "@/context/AuthContext";


export default function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
