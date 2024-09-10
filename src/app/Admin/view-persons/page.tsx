import DefaultLayout from "../components/layouts/DefaultLayout";
import React from "react";
import ViewPersonsList from "./ViewPersonsList";
function ViewPersons() {
  return (
    <DefaultLayout>
      <ViewPersonsList />
    </DefaultLayout>
  );
}

export default ViewPersons;
