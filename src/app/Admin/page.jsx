"use client";

import { Metadata } from "next";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Breadcrumb from "./components/BreadCrumbs/Breadcrumbs";
import { useContext } from "react";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Dashboard" />
        <div className="text-center text-3xl font-bold">Home Page</div>
      </DefaultLayout>
    </>
  );
}
