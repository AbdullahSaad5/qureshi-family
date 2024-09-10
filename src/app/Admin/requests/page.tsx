import React from "react";
import Breadcrumb from "../components/BreadCrumbs/Breadcrumbs";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Request from "./requests";
function Requests() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Requests" />
      <Request />
    </DefaultLayout>
  );
}
export default Requests;
