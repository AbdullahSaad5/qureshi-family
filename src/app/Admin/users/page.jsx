import React from "react";
import Breadcrumb from "../components/BreadCrumbs/Breadcrumbs";
import DefaultLayout from "../components/layouts/DefaultLayout";

import UsersList from "./users";
function Users() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <UsersList />
    </DefaultLayout>
  );
}
export default Users;
