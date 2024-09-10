"use client";

import LandingPage from "./LandingPage/page";
import { Metadata } from "next";

import { useContext } from "react";

import Header from "./components/LandingPage/Header";
import Footer from "./components/LandingPage/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <LandingPage />
      <Header />
    </>
  );
}
